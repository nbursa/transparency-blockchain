import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/reports`);
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error(error);
        setError((error as Error).message);
      }
    };
    fetchReports();
  }, [backendUrl]);

  const createReport = async () => {
    try {
      const response = await fetch(`${backendUrl}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit report");
      }
      setDescription("");
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <h1>Reporting System</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Report description"
      />
      <button onClick={createReport}>Create Report</button>
      <ul>
        {reports.map((report, index) => (
          <li key={index}>
            {report.description} (by {report.reporter} at{" "}
            {new Date(report.timestamp * 1000).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
