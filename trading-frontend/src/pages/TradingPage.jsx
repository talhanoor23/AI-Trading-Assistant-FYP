import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TradingPage() {
  const [data, setData] = useState([]);
  const [running, setRunning] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(
      "ws://127.0.0.1:8000/trading/ws"
    );

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onclose = () => {
      setConnected(false);
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      setData((prev) => [
        msg,
        ...prev.slice(0, 20),
      ]);
    };

    return () => ws.close();
  }, []);

  const startBot = async () => {
    try {
      await api.post("/trading/start");
      setRunning(true);
    } catch {
      alert("Failed to start bot");
    }
  };

  const stopBot = async () => {
    try {
      await api.post("/trading/stop");
      setRunning(false);
    } catch {
      alert("Failed to stop bot");
    }
  };

  return (
    <div style={container}>

      {/* HEADER */}
      <div style={header}>

        <div>
          <div style={title}>
            Trading Bot Dashboard
          </div>

          <div style={subtitle}>
            Real-time AI trading execution monitor
          </div>
        </div>

        <div
          style={{
            ...statusBadge,
            background: connected
              ? "rgba(34,197,94,0.15)"
              : "rgba(239,68,68,0.15)",

            color: connected
              ? "#22c55e"
              : "#ef4444",
          }}
        >
          {connected
            ? "● LIVE"
            : "● DISCONNECTED"}
        </div>

      </div>

      {/* CONTROL PANEL */}
      <div style={controls}>

        <button
          onClick={startBot}
          disabled={running}
          style={{
            ...actionButton,
            opacity: running ? 0.5 : 1,
          }}
        >
          ▶ Start Bot
        </button>

        <button
          onClick={stopBot}
          disabled={!running}
          style={{
            ...stopButton,
            opacity: !running ? 0.5 : 1,
          }}
        >
          ■ Stop Bot
        </button>

      </div>

      {/* STATS */}
      <div style={statsGrid}>

        <div style={statCard}>
          <div style={statLabel}>
            Total Signals
          </div>

          <div style={statValue}>
            {data.length}
          </div>
        </div>

        <div style={statCard}>
          <div style={statLabel}>
            Bot Status
          </div>

          <div
            style={{
              ...statValue,
              color: running
                ? "#22c55e"
                : "#ef4444",
            }}
          >
            {running ? "RUNNING" : "STOPPED"}
          </div>
        </div>

        <div style={statCard}>
          <div style={statLabel}>
            WebSocket
          </div>

          <div
            style={{
              ...statValue,
              color: connected
                ? "#22c55e"
                : "#ef4444",
            }}
          >
            {connected
              ? "CONNECTED"
              : "OFFLINE"}
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div style={tableContainer}>

        <table style={table}>

          <thead>

            <tr>

              <th style={th}>
                Price
              </th>

              <th style={th}>
                Action
              </th>

              <th style={th}>
                Total Value
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((d, i) => (
              <tr key={i} style={tr}>

                <td style={td}>
                  ${d.price}
                </td>

                <td
                  style={{
                    ...td,
                    color:
                      d.action === "BUY"
                        ? "#22c55e"
                        : "#ef4444",

                    fontWeight: "700",
                  }}
                >
                  {d.action}
                </td>

                <td style={td}>
                  ${d.total_value}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const container = {
  padding: "24px",

  minHeight: "100vh",

  background:
    "linear-gradient(180deg, #020617 0%, #0f172a 100%)",

  color: "white",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  marginBottom: "28px",
};

const title = {
  fontSize: "30px",
  fontWeight: "900",
};

const subtitle = {
  marginTop: "6px",

  color: "#94a3b8",
  fontSize: "14px",
};

const statusBadge = {
  padding: "10px 16px",

  borderRadius: "999px",

  fontSize: "13px",
  fontWeight: "700",
};

const controls = {
  display: "flex",
  gap: "14px",

  marginBottom: "24px",
};

const actionButton = {
  padding: "14px 22px",

  border: "none",
  borderRadius: "14px",

  background:
    "linear-gradient(135deg, #22c55e, #16a34a)",

  color: "white",

  fontWeight: "800",
  fontSize: "15px",

  cursor: "pointer",

  boxShadow:
    "0 10px 24px rgba(34,197,94,0.28)",
};

const stopButton = {
  padding: "14px 22px",

  border: "none",
  borderRadius: "14px",

  background:
    "linear-gradient(135deg, #ef4444, #dc2626)",

  color: "white",

  fontWeight: "800",
  fontSize: "15px",

  cursor: "pointer",

  boxShadow:
    "0 10px 24px rgba(239,68,68,0.28)",
};

const statsGrid = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",

  gap: "18px",

  marginBottom: "30px",
};

const statCard = {
  padding: "22px",

  borderRadius: "20px",

  background: "#111827",

  border:
    "1px solid rgba(255,255,255,0.06)",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.18)",
};

const statLabel = {
  color: "#94a3b8",

  fontSize: "13px",

  marginBottom: "12px",
};

const statValue = {
  fontSize: "28px",
  fontWeight: "900",
};

const tableContainer = {
  overflowX: "auto",

  borderRadius: "20px",

  background: "#111827",

  border:
    "1px solid rgba(255,255,255,0.06)",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.18)",
};

const table = {
  width: "100%",

  borderCollapse: "collapse",
};

const th = {
  textAlign: "left",

  padding: "18px",

  fontSize: "13px",
  fontWeight: "700",

  color: "#94a3b8",

  borderBottom:
    "1px solid rgba(255,255,255,0.06)",
};

const tr = {
  transition: "0.2s ease",
};

const td = {
  padding: "18px",

  borderBottom:
    "1px solid rgba(255,255,255,0.04)",

  fontSize: "14px",
};




// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function TradingPage() {
//   const [data, setData] = useState([]);
//   const [running, setRunning] = useState(false);

//   useEffect(() => {
//     const ws = new WebSocket("ws://127.0.0.1:8000/trading/ws");

//     ws.onmessage = (event) => {
//       const msg = JSON.parse(event.data);
//       setData((prev) => [msg, ...prev.slice(0, 20)]);
//     };

//     return () => ws.close();
//   }, []);

//   const startBot = async () => {
//     await api.post("/trading/start");
//     setRunning(true);
//   };

//   const stopBot = async () => {
//     await api.post("/trading/stop");
//     setRunning(false);
//   };

//   return (
//     <div>
//       <h2>📈 Trading Bot</h2>

//       <div style={{ marginBottom: "20px" }}>
//         <button onClick={startBot} disabled={running}>
//           Start Bot
//         </button>

//         <button onClick={stopBot} disabled={!running}>
//           Stop Bot
//         </button>
//       </div>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Price</th>
//             <th>Action</th>
//             <th>Total Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((d, i) => (
//             <tr key={i}>
//               <td>{d.price}</td>
//               <td>{d.action}</td>
//               <td>{d.total_value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }