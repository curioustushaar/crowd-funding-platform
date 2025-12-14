const { task } = require("hardhat/config");

task("deploy", "Deploy CrowdFunding contract")
  .setAction(async (taskArgs, hre) => {
    console.log("🚀 Deploying CrowdFunding contract to Sepolia...");
    
    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
    const crowdFunding = await CrowdFunding.deploy();

    await crowdFunding.deployed();

    console.log("✅ CrowdFunding contract deployed successfully!");
    console.log("\n📋 Contract Details:");
    console.log("   Address: " + crowdFunding.address);
    console.log("   Network: Sepolia");
    console.log("   RPC: https://ethereum-sepolia-rpc.publicnode.com");
    console.log("\n💾 Update this address in client/src/context/index.jsx line 11");
  });

module.exports = {};
