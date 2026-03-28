// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title StreamPay
 * @notice Real-time creator monetization with pay-to-watch and investor revenue sharing
 * @dev Deployed on Monad Testnet (Chain ID: 10143)
 */
contract StreamPay {
    // ─── Constants ────────────────────────────────────────────────
    uint256 public constant CREATOR_SHARE = 90; // 90% to creator
    uint256 public constant INVESTOR_POOL_SHARE = 10; // 10% to investors
    uint256 public constant BASIS_POINTS = 100;

    // ─── State ────────────────────────────────────────────────────
    /// @notice Accumulated earnings claimable by creators
    mapping(address => uint256) public creatorBalance;

    /// @notice Total MON invested in each creator
    mapping(address => uint256) public totalInvestedInCreator;

    /// @notice Amount each investor has staked in a creator
    mapping(address => mapping(address => uint256)) public investorStake;
    // investorStake[creator][investor] = amount

    /// @notice Accrued investor earnings (claimable)
    mapping(address => mapping(address => uint256)) public investorEarnings;
    // investorEarnings[creator][investor] = claimable amount

    /// @notice List of investors per creator (for enumeration)
    mapping(address => address[]) public creatorInvestors;

    /// @notice Tracks if address is already an investor of creator
    mapping(address => mapping(address => bool)) public isInvestor;

    /// @notice Total platform earnings (informational)
    uint256 public totalPlatformEarnings;

    // ─── Events ───────────────────────────────────────────────────
    event PaymentMade(
        address indexed viewer,
        address indexed creator,
        uint256 totalAmount,
        uint256 creatorAmount,
        uint256 investorPoolAmount
    );

    event InvestmentMade(
        address indexed investor,
        address indexed creator,
        uint256 amount
    );

    event CreatorWithdrawal(address indexed creator, uint256 amount);

    event InvestorWithdrawal(
        address indexed investor,
        address indexed creator,
        uint256 amount
    );

    // ─── Core Functions ───────────────────────────────────────────

    /**
     * @notice Pay a creator to watch their content
     * @param creator The creator's address
     * Revenue is split: 90% to creator, 10% distributed to investors
     */
    function payCreator(address creator) external payable {
        require(creator != address(0), "Invalid creator address");
        require(msg.value > 0, "Payment must be > 0");
        require(creator != msg.sender, "Cannot pay yourself");

        uint256 payment = msg.value;
        uint256 investorPoolAmount = 0;
        uint256 creatorAmount = payment;

        // Only split if creator has investors
        if (totalInvestedInCreator[creator] > 0) {
            investorPoolAmount = (payment * INVESTOR_POOL_SHARE) / BASIS_POINTS;
            creatorAmount = payment - investorPoolAmount;

            // Distribute investor pool proportionally
            _distributeToInvestors(creator, investorPoolAmount);
        }

        creatorBalance[creator] += creatorAmount;
        totalPlatformEarnings += payment;

        emit PaymentMade(
            msg.sender,
            creator,
            payment,
            creatorAmount,
            investorPoolAmount
        );
    }

    /**
     * @notice Invest in a creator to earn a share of their future revenue
     * @param creator The creator to invest in
     */
    function investInCreator(address creator) external payable {
        require(creator != address(0), "Invalid creator address");
        require(msg.value > 0, "Investment must be > 0");
        require(creator != msg.sender, "Cannot invest in yourself");

        if (!isInvestor[creator][msg.sender]) {
            creatorInvestors[creator].push(msg.sender);
            isInvestor[creator][msg.sender] = true;
        }

        investorStake[creator][msg.sender] += msg.value;
        totalInvestedInCreator[creator] += msg.value;

        emit InvestmentMade(msg.sender, creator, msg.value);
    }

    /**
     * @notice Creator withdraws their accumulated earnings
     */
    function withdrawCreatorEarnings() external {
        uint256 amount = creatorBalance[msg.sender];
        require(amount > 0, "No earnings to withdraw");

        creatorBalance[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit CreatorWithdrawal(msg.sender, amount);
    }

    /**
     * @notice Investor withdraws their earned revenue share from a creator
     * @param creator The creator whose revenue share to claim
     */
    function withdrawInvestorEarnings(address creator) external {
        uint256 amount = investorEarnings[creator][msg.sender];
        require(amount > 0, "No earnings to withdraw");

        investorEarnings[creator][msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit InvestorWithdrawal(msg.sender, creator, amount);
    }

    // ─── View Functions ───────────────────────────────────────────

    /// @notice Get total investment pool for a creator
    function getCreatorInvestmentPool(address creator) external view returns (uint256) {
        return totalInvestedInCreator[creator];
    }

    /// @notice Get an investor's stake in a creator
    function getInvestorStake(address creator, address investor) external view returns (uint256) {
        return investorStake[creator][investor];
    }

    /// @notice Get an investor's claimable earnings from a creator
    function getInvestorEarnings(address creator, address investor) external view returns (uint256) {
        return investorEarnings[creator][investor];
    }

    /// @notice Get number of investors for a creator
    function getInvestorCount(address creator) external view returns (uint256) {
        return creatorInvestors[creator].length;
    }

    /// @notice Get all investors for a creator
    function getCreatorInvestors(address creator) external view returns (address[] memory) {
        return creatorInvestors[creator];
    }

    /// @notice Calculate investor's ownership percentage (in basis points, e.g. 1000 = 10%)
    function getInvestorShare(address creator, address investor) external view returns (uint256) {
        uint256 total = totalInvestedInCreator[creator];
        if (total == 0) return 0;
        return (investorStake[creator][investor] * 10000) / total;
    }

    // ─── Internal ─────────────────────────────────────────────────

    /**
     * @dev Distributes revenue share to all investors proportionally
     */
    function _distributeToInvestors(address creator, uint256 pool) internal {
        uint256 total = totalInvestedInCreator[creator];
        if (total == 0) return;

        address[] memory investors = creatorInvestors[creator];
        uint256 distributed = 0;

        for (uint256 i = 0; i < investors.length; i++) {
            address investor = investors[i];
            uint256 stake = investorStake[creator][investor];
            if (stake == 0) continue;

            uint256 share;
            if (i == investors.length - 1) {
                // Last investor gets the remainder to avoid rounding dust
                share = pool - distributed;
            } else {
                share = (pool * stake) / total;
            }

            investorEarnings[creator][investor] += share;
            distributed += share;
        }
    }

    // ─── Fallback ─────────────────────────────────────────────────
    receive() external payable {}
}
