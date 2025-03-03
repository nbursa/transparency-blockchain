import express from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const contractAddress = process.env.CONTRACT_ADDRESS!;
const contractABI = require("./ReportingSystem.json").abi;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

interface Report {
  reporter: string;
  description: string;
  timestamp: number;
}

app.post("/report", async (req, res) => {
  try {
    const { description } = req.body;
    const tx = await contract.createReport(description);
    await tx.wait();
    res.status(200).send({ message: "Report submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to submit report" });
  }
});

app.get("/api/reports", async (req, res) => {
  try {
    const totalReports = await contract.getTotalReports();
    const reports: Report[] = [];

    for (let i = 0; i < totalReports; i++) {
      const [reporter, description, timestamp] = await contract.getReport(i);
      reports.push({ reporter, description, timestamp: Number(timestamp) });
    }

    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch reports" });
  }
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
