import { useState } from "react";
import "./index.css";

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
    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // ✅ Debug log – shows what the backend returned
      console.log("✅ Received from API:", data);

      setReport(data);
    } catch (error) {
      console.error("❌ Error fetching valuation:", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Equipment Valuation Tool</h1>

      <input
        name="year"
        placeholder="Year"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="model"
        placeholder="Model"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <select
        name="type"
        onChange={handleChange}
        value={form.type}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="Tractor">Tractor</option>
        <option value="Mower">Mower</option>
      </select>
      <input
        name="hours"
        placeholder="Hours"
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        name="attachments"
        placeholder="Attachments"
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      ></textarea>

      <button
        onClick={generateReport}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Get Valuation
      </button>

      {report && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Valuation Report</h2>
          <p>
            <strong>Trade-In:</strong> {report.tradeInRange}
          </p>
          <p>
            <strong>Retail:</strong> {report.retailRange}
          </p>
          <p>
            <strong>Dealer:</strong> {report.dealerRange}
          </p>

          <h3 className="mt-4 font-semibold">Suggestions:</h3>
          <ul className="list-disc list-inside">
            {report.suggestions &&
              report.suggestions.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
          </ul>

          <h3 className="mt-4 font-semibold">Market Outlook:</h3>
          {report.marketOutlook && (
            <>
              <p>
                <strong>Best Strategy:</strong>{" "}
                {report.marketOutlook.bestStrategy}
              </p>
              <p>
                <strong>Strongest Months:</strong>{" "}
                {report.marketOutlook.strongestMonths}
              </p>
              <p>
                <strong>Secondary:</strong> {report.marketOutlook.secondary}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
