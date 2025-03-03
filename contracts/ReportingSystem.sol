// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReportingSystem {
    struct Report {
        address reporter;
        string description;
        uint256 timestamp;
    }

    Report[] public reports;

    event ReportCreated(address indexed reporter, string description, uint256 timestamp);
    event ReportUpdated(uint256 index, string newDescription, uint256 timestamp);

    function createReport(string memory _description) public {
        reports.push(Report(msg.sender, _description, block.timestamp));
        emit ReportCreated(msg.sender, _description, block.timestamp);
    }

    function updateReport(uint256 index, string memory _newDescription) public {
        require(index < reports.length, "Report does not exist");
        require(msg.sender == reports[index].reporter, "Only the reporter can update the report");

        reports[index].description = _newDescription;
        reports[index].timestamp = block.timestamp;
        emit ReportUpdated(index, _newDescription, block.timestamp);
    }

    function getReport(uint256 index) public view returns (address, string memory, uint256) {
        Report memory report = reports[index];
        return (report.reporter, report.description, report.timestamp);
    }

    function getTotalReports() public view returns (uint256) {
        return reports.length;
    }
}