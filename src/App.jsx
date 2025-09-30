import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    year: "",
    model: "",
    type: "Tractor",
    hours: "",
    attachments: "",
  });

  const [report, setReport] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateReport = async () => {
    const response = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setReport(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Equipment Valuation Tool</h1>
      <input name="year" placeholder="Year" onChange={handleChange} /><br />
      <input name="model" placeholder="Model" onChange={handleChange} /><br />
      <input name="type" placeholder="Type" onChange={handleChange} /><br />
      <input name="hours" placeholder="Hours" onChange={handleChange} /><br />
      <textarea name="attachments" placeholder="Attachments" onChange={handleChange}></textarea><br />
      <button onClick={generateReport}>Get Valuation</button>

      {report && (
        <div>
          <h2>Valuation Report</h2>
          <p>Trade-In: {report.tradeInRange}</p>
          <p>Retail: {report.retailRange}</p>
          <p>Dealer: {report.dealerRange}</p>
        </div>
      )}
    </div>
  );
}

export default App;