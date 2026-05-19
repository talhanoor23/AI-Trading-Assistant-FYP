import { useState } from "react";
import api from "../api/axios";
import Card from "../components/Card";

export default function ADRPage() {
  const [symbol, setSymbol] = useState("BTC/USD");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const coins = ["BTC/USD", "ETH/USD", "SOL/USD", "BNB/USD", "XRP/USD"];

  const analyze = async (selectedSymbol = symbol) => {
    setLoading(true);
    setResult(null);

    try {
      const res = await api.post("/agent/adr_analyze", {
        symbol: selectedSymbol,
      });

      setResult(res.data);
      setSymbol(selectedSymbol);
    } catch (err) {
      alert("Error fetching ADR data");
    }

    setLoading(false);
  };

  return (
    <div className="adr-page">

      {/* PREMIUM HEADER */}
      <div className="adr-header">
        <div className="adr-title">ADR Analyzer</div>
        <div className="adr-subtitle">
          Volatility & Range Intelligence Dashboard
        </div>
      </div>

      {/* QUICK SELECT */}
      <Card title="Quick Select Market">
        <div className="coin-grid">
          {coins.map((c) => (
            <button
              key={c}
              className={`coin-btn ${symbol === c ? "active" : ""}`}
              onClick={() => {
  setSymbol(c);
  setResult(null); // 🔥 clear previous result
}}
            >
              {c.split("/")[0]}
            </button>
          ))}
        </div>
      </Card>

      {/* INPUT SECTION */}
      <Card title="Custom Symbol">
        <div className="form-grid">
          <input
            className="input"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter symbol e.g. BTC/USD"
          />

          <button className="button" onClick={() => analyze()}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </Card>

      {/* RESULT SECTION */}
      {result && (
        <Card title="ADR Results">
          <div className="adr-grid">

            <div className="adr-card blue">
              <h4>ADR 1</h4>
              <p>{result.adr_1}</p>
            </div>

            <div className="adr-card purple">
              <h4>ADR 3</h4>
              <p>{result.adr_3}</p>
            </div>

            <div className="adr-card green">
              <h4>ADR 5</h4>
              <p>{result.adr_5}</p>
            </div>

            <div className="adr-card red">
              <h4>Trade Quality</h4>
              <p>{result.trade_quality}</p>
            </div>

          </div>
        </Card>
      )}

    </div>
  );
}



// import { useState } from "react";
// import api from "../api/axios";
// import Card from "../components/Card";

// export default function ADRPage() {
//   const [symbol, setSymbol] = useState("BTC/USD");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const analyze = async () => {
//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await api.post("/agent/adr_analyze", { symbol });
//       setResult(res.data);
//     } catch {
//       alert("Error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div>

//       <h2 style={{ marginBottom: 20 }}>ADR Analyzer</h2>

//       <Card title="Input">

//         <div style={{ display: "flex", gap: 10 }}>

//           <input
//             value={symbol}
//             onChange={(e) => setSymbol(e.target.value)}
//             style={{
//               padding: 8,
//               borderRadius: 6,
//               border: "1px solid #333",
//               background: "#111",
//               color: "white"
//             }}
//           />

//           <button
//             onClick={analyze}
//             style={{
//               padding: "8px 14px",
//               background: "#2563eb",
//               color: "white",
//               border: "none",
//               borderRadius: 6,
//               cursor: "pointer"
//             }}
//           >
//             {loading ? "Analyzing..." : "Analyze"}
//           </button>

//         </div>

//       </Card>


//       {result && (
//         <Card title="Result">

//           <div style={{ lineHeight: "28px" }}>

//             <p>ADR 1 : {result.adr_1}</p>
//             <p>ADR 3 : {result.adr_3}</p>
//             <p>ADR 5 : {result.adr_5}</p>
//             <p>Trade Quality : {result.trade_quality}</p>

//           </div>

//         </Card>
//       )}

//     </div>
//   );
// }





// // import { useState } from "react";
// // import api from "../api/axios";
// // import Card from "../components/Card";

// // export default function ADRPage() {
// //   const [symbol, setSymbol] = useState("BTC/USD");
// //   const [result, setResult] = useState(null);

// //   const analyze = async () => {
// //     try {
// //       const res = await api.post("/agent/adr_analyze", { symbol });
// //       setResult(res.data);
// //     } catch {
// //       alert("Error");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>ADR Analyzer</h2>

// //       <Card title="Input">
// //         <input
// //           value={symbol}
// //           onChange={(e) => setSymbol(e.target.value)}
// //         />

// //         <br /><br />

// //         <button onClick={analyze}>Analyze</button>
// //       </Card>

// //       {result && (
// //         <Card title="Result">
// //           <p>ADR1: {result.adr_1}</p>
// //           <p>ADR3: {result.adr_3}</p>
// //           <p>ADR5: {result.adr_5}</p>
// //           <p>Quality: {result.trade_quality}</p>
// //         </Card>
// //       )}
// //     </div>
// //   );
// // }



