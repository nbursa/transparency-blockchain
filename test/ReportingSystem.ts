import { expect } from "chai";
import { ethers } from "hardhat";

describe("ReportingSystem", function () {
  it("Should create and update a report", async function () {
    const ReportingSystem = await ethers.getContractFactory("ReportingSystem");
    const contract = await ReportingSystem.deploy();
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
