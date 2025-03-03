import { ethers } from "hardhat";

async function main() {
  const ReportingSystem = await ethers.getContractFactory("ReportingSystem");
  const contract = await ReportingSystem.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`Contract deployed to: ${address}`);

  const [owner] = await ethers.getSigners();
  await contract.createReport("Initial report");
  console.log("Report created by:", owner.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
