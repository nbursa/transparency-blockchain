import { expect } from "chai";
import { ethers } from "hardhat";

describe("CorruptionReporting", function () {
  it("Should create and update a report", async function () {
    const CorruptionReporting = await ethers.getContractFactory(
      "CorruptionReporting"
    );
    const contract = await CorruptionReporting.deploy();
    await contract.waitForDeployment();

    const [owner] = await ethers.getSigners();
    await contract.createReport("Initial report");

    let [reporter, description, timestamp] = await contract.getReport(0);
    expect(description).to.equal("Initial report");

    await contract.updateReport(0, "Updated report");
    [reporter, description, timestamp] = await contract.getReport(0);
    expect(description).to.equal("Updated report");
  });
});
