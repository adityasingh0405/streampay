const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying StreamPay to Monad Testnet...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📦 Deploying with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(
    "💰 Account balance:",
    hre.ethers.formatEther(balance),
    "MON\n"
  );

  const StreamPay = await hre.ethers.getContractFactory("StreamPay");
  const streamPay = await StreamPay.deploy();

  await streamPay.waitForDeployment();

  const address = await streamPay.getAddress();

  console.log("✅ StreamPay deployed to:", address);
  console.log(
    "🔍 View on explorer: https://testnet.monadexplorer.com/address/" + address
  );
  console.log("\n📋 Copy this address to frontend/lib/contract.ts");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deploy failed:", error);
    process.exit(1);
  });
