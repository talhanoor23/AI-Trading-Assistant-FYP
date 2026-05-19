import { useState } from "react";
import api from "../api/axios";
import Card from "../components/Card";

export default function SwingPage() {
  const [symbol, setSymbol] = useState("BTC/USD");
  const [interval, setInterval] = useState("5min");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [lookback, setLookback] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [csvData, setCsvData] = useState([]); // 🔥 NEW

  const coins = ["BTC/USD", "ETH/USD", "SOL/USD", "BNB/USD", "XRP/USD"];

  const handleSymbolChange = (value) => {
    setSymbol(value);
    setError("");
    setCsvData([]); // clear old table when symbol changes
  };

  // 🔥 CSV PARSER
  const parseCSV = (text) => {
    const rows = text.trim().split("\n").map((r) => r.split(","));
    return rows;
  };

  const downloadCSV = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post(
        "/agent/swing_csv",
        {
          symbol,
          interval,
          start_date: start,
          end_date: end,
          lookback: Number(lookback),
        },
        {
          responseType: "blob",
        }
      );

      // =========================
      // 1. DOWNLOAD FILE (same)
      // =========================
      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "swings.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();

      // =========================
      // 2. SHOW IN TABLE (NEW)
      // =========================
      const text = await res.data.text();
      const parsed = parseCSV(text);
      setCsvData(parsed);

    } catch {
      setError("Failed to generate CSV");
    }

    setLoading(false);
  };

  return (
    <div className="swing-page">

      {/* HEADER */}
      <div className="swing-header">
        <div className="swing-title">Swing CSV Generator</div>
        <div className="swing-subtitle">
          Market swing detection & export tool
        </div>
      </div>

      {/* QUICK COINS */}
      <Card title="Quick Select Market">
        <div className="coin-grid">
          {coins.map((c) => (
            <button
              key={c}
              className={`coin-btn ${symbol === c ? "active" : ""}`}
              onClick={() => handleSymbolChange(c)}
            >
              {c.split("/")[0]}
            </button>
          ))}
        </div>
      </Card>

      {/* PARAMETERS */}
      <Card title="Parameters">
        <div className="form-grid swing-grid">

          <input
            className="input"
            value={symbol}
            onChange={(e) => handleSymbolChange(e.target.value)}
          />

          <input
            className="input"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />

          <input
            className="input"
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <input
            className="input"
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />

          <input
            className="input"
            type="number"
            value={lookback}
            onChange={(e) => setLookback(e.target.value)}
          />

          <button className="button" onClick={downloadCSV}>
            {loading ? "Generating..." : "Download CSV"}
          </button>

        </div>

        {error && <div className="error-text">{error}</div>}
      </Card>

      {/* =========================
          CSV TABLE PREVIEW (NEW)
      ========================= */}
      {csvData.length > 0 && (
        <Card title="CSV Preview">

          <div className="table-wrapper">

            <table className="csv-table">

              <thead>
                <tr>
                  {csvData[0].map((head, i) => (
                    <th key={i}>{head}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {csvData.slice(1).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </Card>
      )}

    </div>
  );
}



// import { useState } from "react";
// import api from "../api/axios";
// import Card from "../components/Card";

// export default function SwingPage() {

//   const [symbol, setSymbol] = useState("BTC/USD");
//   const [interval, setInterval] = useState("5min");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [lookback, setLookback] = useState(1);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");


//   const downloadCSV = async () => {

//     setLoading(true);
//     setError("");

//     try {

//       const res = await api.post(
//         "/agent/swing_csv",
//         {
//           symbol,
//           interval,
//           start_date: start,
//           end_date: end,
//           lookback: Number(lookback)
//         },
//         {
//           responseType: "blob"
//         }
//       );

//       const url =
//         window.URL.createObjectURL(
//           new Blob([res.data])
//         );

//       const link =
//         document.createElement("a");

//       link.href = url;
//       link.setAttribute(
//         "download",
//         "swings.csv"
//       );

//       document.body.appendChild(link);
//       link.click();

//     } catch {

//       setError("Error");

//     }

//     setLoading(false);
//   };


//   return (

//     <div>

//       <div className="page-title">
//         Swing CSV Generator
//       </div>


//       <Card title="Parameters">

//         <div className="form-grid">

//           <input
//             className="input"
//             value={symbol}
//             onChange={(e) =>
//               setSymbol(e.target.value)
//             }
//           />

//           <input
//             className="input"
//             value={interval}
//             onChange={(e) =>
//               setInterval(e.target.value)
//             }
//           />

//           <input
//             className="input"
//             type="date"
//             value={start}
//             onChange={(e) =>
//               setStart(e.target.value)
//             }
//           />

//           <input
//             className="input"
//             type="date"
//             value={end}
//             onChange={(e) =>
//               setEnd(e.target.value)
//             }
//           />

//           <input
//             className="input"
//             type="number"
//             value={lookback}
//             onChange={(e) =>
//               setLookback(e.target.value)
//             }
//           />

//           <button
//             className="button"
//             onClick={downloadCSV}
//           >
//             {loading
//               ? "Generating..."
//               : "Download CSV"}
//           </button>

//           {error && (
//             <div style={{ color: "red" }}>
//               {error}
//             </div>
//           )}

//         </div>

//       </Card>

//     </div>

//   );
// }





// import { useState } from "react";
// import api from "../api/axios";
// import Card from "../components/Card";

// export default function SwingPage() {

//   const [symbol, setSymbol] = useState("BTC/USD");
//   const [interval, setInterval] = useState("5min");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [lookback, setLookback] = useState(1);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");


//   const downloadCSV = async () => {

//     setError("");
//     setLoading(true);

//     try {

//       const res = await api.post(
//         "/agent/swing_csv",
//         {
//           symbol,
//           interval,
//           start_date: start,
//           end_date: end,
//           lookback: Number(lookback)
//         },
//         {
//           responseType: "blob"
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([res.data]));

//       const link = document.createElement("a");

//       link.href = url;
//       link.setAttribute("download", "swings.csv");

//       document.body.appendChild(link);
//       link.click();

//     } catch {

//       setError("Error generating CSV");

//     }

//     setLoading(false);
//   };


//   return (

//     <div>

//       <h2 style={{ marginBottom: 20 }}>
//         Swing CSV Generator
//       </h2>


//       <Card title="Parameters">

//         <div style={{ display: "grid", gap: 10, maxWidth: 400 }}>

//           <input
//             value={symbol}
//             onChange={(e) => setSymbol(e.target.value)}
//             placeholder="BTC/USD"
//           />

//           <input
//             value={interval}
//             onChange={(e) => setInterval(e.target.value)}
//             placeholder="5min"
//           />

//           <input
//             type="date"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//           />

//           <input
//             type="date"
//             value={end}
//             onChange={(e) => setEnd(e.target.value)}
//           />

//           <input
//             type="number"
//             value={lookback}
//             onChange={(e) => setLookback(e.target.value)}
//           />


//           <button
//             onClick={downloadCSV}
//             style={{
//               padding: 8,
//               background: "#2563eb",
//               color: "white",
//               border: "none",
//               borderRadius: 6
//             }}
//           >
//             {loading ? "Generating..." : "Download CSV"}
//           </button>


//           {error && (
//             <div style={{ color: "red" }}>
//               {error}
//             </div>
//           )}

//         </div>

//       </Card>

//     </div>
//   );
// }

