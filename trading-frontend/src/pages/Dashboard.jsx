import {
  FaBitcoin,
  FaEthereum,
  FaArrowTrendUp,
  FaSignal,
  FaRobot,
  FaChartColumn,
} from "react-icons/fa6";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

import chatImg from "../assets/img5.avif";
import swingImg from "../assets/im4.jpg";
import adrImg from "../assets/im2.jpg";
import endImg from "../assets/WhatsApp1.jpeg";
import lastImg from "../assets/WhatsApp3.jpeg";
import v1 from "../assets/v2.mp4";

/* ================= DATA ================= */

const performanceData = [
  { day: "Mon", value: 4000 },
  { day: "Tue", value: 5200 },
  { day: "Wed", value: 4800 },
  { day: "Thu", value: 6100 },
  { day: "Fri", value: 7200 },
  { day: "Sat", value: 6800 },
  { day: "Sun", value: 8200 },
];

/* ================= MAIN DASHBOARD ================= */

export default function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  return (
    <div className="dashboard-container">
      {/* PREMIUM BACKGROUND EFFECTS */}

      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      <div className="bg-grid"></div>

      {/* ================= HERO ================= */}
      <div className="hero-section">

        <div className="hero-badge">
          AI Powered Trading Platform
        </div>

        <h1 className="hero-title">
          Welcome back,
          <span> {user || "Trader"}</span>
        </h1>

        {/* QUICK STATS */}
        <div className="quick-stats">
          <QuickStat label="Bot" value="Active" />
          <QuickStat label="Symbol" value="BTC/USD" />
          <QuickStat label="Signals" value="12" />
        </div>

      </div>

      {/* ================= LIVE TICKER ================= */}

<div className="ticker-wrapper">

  <div className="ticker-track">

    <span>BTC/USD ▲ 67,420 +2.14%</span>

    <span>ETH/USD ▲ 3,540 +1.27%</span>

    <span>SOL/USD ▲ 182 +4.10%</span>

    <span>NASDAQ ▲ 18,420 +0.84%</span>

    <span>S&P 500 ▲ 5,420 +0.66%</span>

    <span>GOLD ▼ 2,340 -0.18%</span>

    <span>AI SIGNALS ACTIVE</span>

    <span>MARKET TREND: BULLISH</span>

  </div>

</div>

      {/* ================= FEATURE CARDS (MOVED HERE 🔥 UNDER WELCOME) ================= */}
      <div className="dashboard-grid">

        <FeatureCard
          title="AI Agent"
          icon={<FaRobot />}
          image={chatImg}
          onClick={() => navigate("/chat")}
        />

        <FeatureCard
          title="Swing CSV"
          icon={<FaArrowTrendUp />}
          image={swingImg}
          onClick={() => navigate("/swing")}
        />

        <FeatureCard
          title="ADR Analyzer"
          icon={<FaChartColumn />}
          image={adrImg}
          onClick={() => navigate("/adr")}
        />

      </div>

      {/* ================= MARKET WIDGETS ================= */}
      <div className="market-grid">

        <MarketWidget
          icon={<FaBitcoin />}
          title="Bitcoin"
          value="$67,420"
          change="+2.14%"
        />

        <MarketWidget
          icon={<FaEthereum />}
          title="Ethereum"
          value="$3,540"
          change="+1.27%"
        />

        <MarketWidget
          icon={<FaSignal />}
          title="AI Confidence"
          value="89%"
          change="Strong"
        />

        <MarketWidget
          icon={<FaArrowTrendUp />}
          title="Market Trend"
          value="Bullish"
          change="Live"
        />

      </div>

      {/* ================= PERFORMANCE CHART ================= */}
      <div className="chart-section">

        <div className="chart-header">

          <div>
            <div className="chart-label">Portfolio Performance</div>
            <div className="chart-value">+18.42%</div>
          </div>

          <div className="chart-profit">
            +$12,430
          </div>

        </div>

        <div className="chart-container">

          <ResponsiveContainer width="100%" height={320}>

            <AreaChart data={performanceData}>

              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
</linearGradient>
              </defs>

              <Tooltip
  contentStyle={{
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "14px",
    color: "#0f172a"
  }}
              />

              <Area
  type="monotone"
  dataKey="value"
  stroke="#3b82f6"
  strokeWidth={4}
  fill="url(#colorProfit)"
/>

            </AreaChart>

          </ResponsiveContainer>

        </div>
      </div>

      {/* ================= AI SIGNAL + ACTIVITY ================= */}
      <div className="signals-layout">

        <div className="signal-card">

          <div className="signal-header">

            <div>
              <div className="signal-label">AI Signal</div>
              <div className="signal-main">BUY BTC/USD</div>
            </div>

            <div className="signal-badge buy">HIGH</div>

          </div>

          <div className="signal-progress">
            <div className="signal-progress-fill" style={{ width: "89%" }} />
          </div>

          <div className="signal-footer">
            <span>Confidence</span>
            <strong>89%</strong>
          </div>

        </div>

        <div className="activity-card">

          <div className="activity-title">
            Recent Activity
          </div>

          <ActivityItem pair="BTC/USD" type="BUY" price="$67,420" />
          <ActivityItem pair="ETH/USD" type="SELL" price="$3,540" />
          <ActivityItem pair="SOL/USD" type="BUY" price="$182" />

        </div>

      </div>
      {/* ================= TRADING VIDEO ================= */}

<div className="video-section">

  <div className="section-header">
    Live Market Visualization
  </div>

  <div className="video-wrapper">

    <video autoPlay muted loop playsInline className="trading-video">
  <source src={v1} type="video/mp4" />
</video>

  </div>

</div>

      {/* ================= ANALYSIS =================
      <div className="analysis-section">

        <div className="section-header">
          Performance Analysis
        </div>

        <img src={endImg} alt="analysis" className="analysis-image" />

      </div>

      <div className="analysis-section">

        <div className="section-header">
          Accuracy Metrics
        </div>

        <img src={lastImg} alt="accuracy" className="analysis-image" />

      </div> */}

    </div>
  );
}

/* ================= COMPONENTS ================= */

function ActivityItem({ pair, type, price }) {
  return (
    <div className="activity-item">

      <div>
        <div className="activity-pair">{pair}</div>
        <div className="activity-price">{price}</div>
      </div>

      <div className={`activity-type ${type === "BUY" ? "buy" : "sell"}`}>
        {type}
      </div>

    </div>
  );
}

function FeatureCard({ title, image, icon, onClick }) {
  return (
    <div className="feature-card" onClick={onClick}>

      <div className="feature-top">
        <div className="feature-icon">{icon}</div>
        <div className="feature-arrow">↗</div>
      </div>

      <div className="feature-title">{title}</div>

      <img src={image} alt={title} />

    </div>
  );
}

function QuickStat({ label, value }) {
  return (
    <div className="quick-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MarketWidget({ icon, title, value, change }) {
  return (
    <div className="market-widget">

      <div className="market-top">
        <div className="market-icon">{icon}</div>
        <div className="market-change">{change}</div>
      </div>

      <div className="market-title">{title}</div>
      <div className="market-value">{value}</div>

    </div>
  );
}





// import {
//   FaBitcoin,
//   FaEthereum,
//   FaArrowTrendUp,
//   FaSignal,
//   FaRobot,
//   FaChartColumn,
// } from "react-icons/fa6";

// import {
//   AreaChart,
//   Area,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";


// import { useNavigate } from "react-router-dom";

// import "../styles/dashboard.css";


// import chatImg from "../assets/img5.avif";
// import swingImg from "../assets/im4.jpg";
// import adrImg from "../assets/im2.jpg";
// import endImg from "../assets/WhatsApp1.jpeg";
// import lastImg from "../assets/WhatsApp3.jpeg";

// const performanceData = [
//   { day: "Mon", value: 4000 },
//   { day: "Tue", value: 5200 },
//   { day: "Wed", value: 4800 },
//   { day: "Thu", value: 6100 },
//   { day: "Fri", value: 7200 },
//   { day: "Sat", value: 6800 },
//   { day: "Sun", value: 8200 },
// ];

// export default function Dashboard() {

//   const navigate = useNavigate();

//   const user = localStorage.getItem("user");

//   return (
//     <div className="dashboard-container">

//       {/* HERO */}

//       <div className="hero-section">

//         <div className="hero-badge">
//           AI Powered Trading Platform
//         </div>

//         <h1 className="hero-title">
//           Welcome back,
//           <span> {user || "Trader"}</span>
//         </h1>

//         <div className="quick-stats">

//           <QuickStat
//             label="Bot"
//             value="Active"
//           />

//           <QuickStat
//             label="Symbol"
//             value="BTC/USD"
//           />

//           <QuickStat
//             label="Signals"
//             value="12"
//           />

//         </div>

//       </div>
//       {/* MARKET WIDGETS */}

// <div className="market-grid">

//   <MarketWidget
//     icon={<FaBitcoin />}
//     title="Bitcoin"
//     value="$67,420"
//     change="+2.14%"
//   />

//   <MarketWidget
//     icon={<FaEthereum />}
//     title="Ethereum"
//     value="$3,540"
//     change="+1.27%"
//   />

//   <MarketWidget
//     icon={<FaSignal />}
//     title="AI Confidence"
//     value="89%"
//     change="Strong"
//   />

//   <MarketWidget
//     icon={<FaArrowTrendUp />}
//     title="Market Trend"
//     value="Bullish"
//     change="Live"
//   />

// </div>

// /* ACTIVITY ITEM */

// function ActivityItem({
//   pair,
//   type,
//   price,
// }) {
//   return (
//     <div className="activity-item">

//       <div>

//         <div className="activity-pair">
//           {pair}
//         </div>

//         <div className="activity-price">
//           {price}
//         </div>

//       </div>

//       <div
//         className={
//           type === "BUY"
//             ? "activity-type buy"
//             : "activity-type sell"
//         }
//       >
//         {type}
//       </div>

//     </div>
//   );
// }

// {/* PERFORMANCE CHART */}

// <div className="chart-section">

//   <div className="chart-header">

//     <div>
//       <div className="chart-label">
//         Portfolio Performance
//       </div>

//       <div className="chart-value">
//         +18.42%
//       </div>
//     </div>

//     <div className="chart-profit">
//       +$12,430
//     </div>

//   </div>

//   <div className="chart-container">

//     <ResponsiveContainer
//       width="100%"
//       height={320}
//     >

//       <AreaChart data={performanceData}>

//         <defs>

//           <linearGradient
//             id="colorProfit"
//             x1="0"
//             y1="0"
//             x2="0"
//             y2="1"
//           >

//             <stop
//               offset="0%"
//               stopColor="#66fcf1"
//               stopOpacity={0.4}
//             />

//             <stop
//               offset="100%"
//               stopColor="#66fcf1"
//               stopOpacity={0}
//             />

//           </linearGradient>

//         </defs>

//         <Tooltip
//           contentStyle={{
//             background: "#111827",
//             border: "1px solid rgba(255,255,255,0.08)",
//             borderRadius: "14px",
//             color: "#fff",
//           }}
//         />

//         <Area
//           type="monotone"
//           dataKey="value"
//           stroke="#66fcf1"
//           strokeWidth={4}
//           fill="url(#colorProfit)"
//         />

//       </AreaChart>

//     </ResponsiveContainer>

//   </div>

// </div>

// {/* AI SIGNAL PANEL */}

// <div className="signals-layout">

//   {/* LEFT */}

//   <div className="signal-card">

//     <div className="signal-header">

//       <div>
//         <div className="signal-label">
//           AI Signal
//         </div>

//         <div className="signal-main">
//           BUY BTC/USD
//         </div>
//       </div>

//       <div className="signal-badge buy">
//         HIGH
//       </div>

//     </div>

//     <div className="signal-progress">

//       <div
//         className="signal-progress-fill"
//         style={{ width: "89%" }}
//       />

//     </div>

//     <div className="signal-footer">

//       <span>Confidence</span>

//       <strong>89%</strong>

//     </div>

//   </div>

//   {/* RIGHT */}

//   <div className="activity-card">

//     <div className="activity-title">
//       Recent Activity
//     </div>

//     <ActivityItem
//       pair="BTC/USD"
//       type="BUY"
//       price="$67,420"
//     />

//     <ActivityItem
//       pair="ETH/USD"
//       type="SELL"
//       price="$3,540"
//     />

//     <ActivityItem
//       pair="SOL/USD"
//       type="BUY"
//       price="$182"
//     />

//   </div>

// </div>

//       {/* FEATURES */}

//       <div className="dashboard-grid">

//         <FeatureCard
//           title="AI Agent"
//           icon={<FaRobot />}
//           image={chatImg}
//           onClick={() => navigate("/chat")}
//         />

//         <FeatureCard
//           title="Swing CSV"
//           icon={<FaArrowTrendUp />}
//           image={swingImg}
//           onClick={() => navigate("/swing")}
//         />

//         <FeatureCard
//           title="ADR Analyzer"
//           icon={<FaChartColumn />}
//           image={adrImg}
//           onClick={() => navigate("/adr")}
//         />

//       </div>

//       {/* MODEL SECTIONS */}

//       <div className="analysis-section">

//         <div className="section-header">
//           Performance Analysis
//         </div>

//         <img
//           src={endImg}
//           alt="analysis"
//           className="analysis-image"
//         />

//       </div>

//       <div className="analysis-section">

//         <div className="section-header">
//           Accuracy Metrics
//         </div>

//         <img
//           src={lastImg}
//           alt="accuracy"
//           className="analysis-image"
//         />

//       </div>

//     </div>
//   );
// }

// /* FEATURE CARD */

// function FeatureCard({
//   title,
//   image,
//   icon,
//   onClick,
// }) {
//   return (
//     <div
//       className="feature-card"
//       onClick={onClick}
//     >

//       <div className="feature-top">

//         <div className="feature-icon">
//           {icon}
//         </div>

//         <div className="feature-arrow">
//           ↗
//         </div>

//       </div>

//       <div className="feature-title">
//         {title}
//       </div>

//       <img src={image} alt={title} />

//     </div>
//   );
// }

// /* QUICK STAT */

// function QuickStat({ label, value }) {
//   return (
//     <div className="quick-stat">

//       <span>{label}</span>

//       <strong>{value}</strong>

//     </div>
//   );
// }

// /* MARKET WIDGET */

// function MarketWidget({
//   icon,
//   title,
//   value,
//   change,
// }) {
//   return (
//     <div className="market-widget">

//       <div className="market-top">

//         <div className="market-icon">
//           {icon}
//         </div>

//         <div className="market-change">
//           {change}
//         </div>

//       </div>

//       <div className="market-title">
//         {title}
//       </div>

//       <div className="market-value">
//         {value}
//       </div>

//     </div>
//   );
// }





// // import { useNavigate } from "react-router-dom";

// // import "../styles/dashboard.css";

// // import chatImg from "../assets/img5.avif";
// // import swingImg from "../assets/im4.jpg";
// // import adrImg from "../assets/im2.jpg";
// // import endImg from "../assets/WhatsApp1.jpeg";
// // import lastImg from "../assets/WhatsApp3.jpeg";

// // export default function Dashboard() {
// //   const navigate = useNavigate();

// //   const user = localStorage.getItem("user");

// //   return (
// //     <div className="dashboard-container">

// //       {/* HERO */}
// //       <div className="hero-section">

// //         <h1 className="hero-title">
// //           Welcome to <span>Invest Smart</span>
// //         </h1>

// //         <p className="hero-subtitle">
// //           AI-powered trading workspace designed for smart investors,
// //           quantitative analysis, ADR evaluation, swing trading insights,
// //           and intelligent market assistance.
// //         </p>

// //       </div>

// //       {/* FEATURE CARDS */}
// //       <div className="dashboard-grid">

// //         <FeatureCard
// //           title="AI Trading Agent"
// //           desc="Interact with an intelligent market assistant for trading insights and analysis."
// //           image={chatImg}
// //           onClick={() => navigate("/chat")}
// //         />

// //         <FeatureCard
// //           title="Swing CSV Generator"
// //           desc="Generate structured swing trading datasets and export professional CSV reports."
// //           image={swingImg}
// //           onClick={() => navigate("/swing")}
// //         />

// //         <FeatureCard
// //           title="ADR Analyzer"
// //           desc="Analyze volatility, risk movement, and trading opportunities using ADR calculations."
// //           image={adrImg}
// //           onClick={() => navigate("/adr")}
// //         />

// //       </div>

// //       {/* OVERVIEW */}
// //       <div style={{ marginTop: "45px" }}>
// //         <h2>Platform Overview</h2>

// //         <div className="stats-grid">

// //           <Stat title="AI Requests" value="12" />

// //           <Stat title="Latest Symbol" value="BTC/USD" />

// //           <Stat title="Bot Status" value="ACTIVE" />

// //         </div>
// //       </div>

// //       {/* ANALYSIS */}
// //       <div className="analysis-section">

// //         <h2 className="analysis-title">
// //           Model Performance Analysis
// //         </h2>

// //         <img
// //           src={endImg}
// //           alt="analysis"
// //           className="analysis-image"
// //         />

// //       </div>

// //       {/* ACCURACY */}
// //       <div className="analysis-section">

// //         <h2 className="analysis-title">
// //           Model Accuracy
// //         </h2>

// //         <img
// //           src={lastImg}
// //           alt="accuracy"
// //           className="analysis-image"
// //         />

// //       </div>

// //     </div>
// //   );
// // }

// // /* FEATURE CARD */

// // function FeatureCard({ title, desc, image, onClick }) {
// //   return (
// //     <div className="feature-card" onClick={onClick}>

// //       <div>
// //         <div className="feature-title">
// //           {title}
// //         </div>

// //         <div className="feature-desc">
// //           {desc}
// //         </div>
// //       </div>

// //       <img src={image} alt={title} />

// //     </div>
// //   );
// // }

// // /* STAT */

// // function Stat({ title, value }) {
// //   return (
// //     <div className="stat-card">

// //       <div className="stat-value">
// //         {value}
// //       </div>

// //       <div className="stat-title">
// //         {title}
// //       </div>

// //     </div>
// //   );
// // }




// // // import { useNavigate } from "react-router-dom";
// // // import chatImg from "../assets/img5.avif";
// // // import swingImg from "../assets/im4.jpg";
// // // import adrImg from "../assets/im2.jpg";
// // // import endImg from "../assets/WhatsApp1.jpeg";
// // // import lastImg from "../assets/WhatsApp3.jpeg";

// // // export default function Dashboard() {
// // //   const navigate = useNavigate();
// // //   const user = localStorage.getItem("user");

// // //   return (
// // //     <div style={{ padding: "25px" }}>

// // //       {/* Header */}
// // //       <div style={{ marginBottom: "30px" }}>
// // //         <h1 style={{ margin: 0 }}>
// // //           Welcome, <span style={{ color: "var(--primary)" }}>{user || "Trader"}</span>
// // //         </h1>
// // //         <p style={{ color: "var(--muted)" }}>
// // //           Your trading tools dashboard
// // //         </p>
// // //       </div>

// // //       {/* Feature Cards */}
// // //       <div style={gridStyle}>

// // //         <Card
// // //           title="Agent Chat"
// // //           desc="AI trading assistant"
// // //           color="#10b981"
// // //           image={chatImg}
// // //           onClick={() => navigate("/chat")}
// // //         />

// // //         <Card
// // //           title="Swing CSV"
// // //           desc="Download swing data"
// // //           color="#f7b731"
// // //           image={swingImg}
// // //           onClick={() => navigate("/swing")}
// // //         />

// // //         <Card
// // //           title="ADR Analyzer"
// // //           desc="Volatility & trade quality"
// // //           color="#ef4444"
// // //           image={adrImg}
// // //           onClick={() => navigate("/adr")}
// // //         />

// // //       </div>

// // //       {/* Stats */}
// // //       <div style={{ marginTop: "40px" }}>
// // //         <h2>Overview</h2>

// // //         <div style={gridStyle}>
// // //           <Stat title="Requests" value="12" />
// // //           <Stat title="Last Symbol" value="BTC/USD" />
// // //           <Stat title="Status" value="Active" />
// // //         </div>
// // //       </div>

// // // <div style={{ marginTop: "40px", width: "100%", paddingBottom: "20px" }}>
// // //   <h2 style={{ 
// // //     color: "#fff", 
// // //     marginBottom: "15px", 
// // //     fontSize: "24px", 
// // //     fontWeight: "600",
// // //     letterSpacing: "0.5px" 
// // //   }}>
// // //     Model Performance Analysis
// // //   </h2>
// // //   <img 
// // //     src={endImg} 
// // //     alt="Model Performance" 
// // //     style={{
// // //       width: "100%",
// // //       height: "370px",
// // //       objectFit: "cover",
// // //       borderRadius: "15px",
// // //       display: "block",
// // //       border: "1px solid rgba(255, 255, 255, 0.1)" // Subtle border adds depth
// // //     }} 
// // //   />
// // // </div>

// // // <div style={{ marginTop: "40px", width: "100%", paddingBottom: "20px" }}>
// // //   <h2 style={{ 
// // //     color: "#fff", 
// // //     marginBottom: "15px", 
// // //     fontSize: "24px", 
// // //     fontWeight: "600",
// // //     letterSpacing: "0.5px" 
// // //   }}>
// // //     Model Accuracy
// // //   </h2>
// // //   <img 
// // //     src={lastImg} 
// // //     alt="Model Performance" 
// // //     style={{
// // //       width: "100%",
// // //       height: "350px",
// // //       objectFit: "cover",
// // //       borderRadius: "15px",
// // //       display: "block",
// // //       border: "1px solid rgba(255, 255, 255, 0.1)" // Subtle border adds depth
// // //     }} 
// // //   />
// // // </div>


// // //     </div>
    
// // //   );
// // // }

// // // // function Card({ title, desc, color, onClick }) {
// // // //   return (
// // // //     <div
// // // //       onClick={onClick}
// // // //       style={{
// // // //         padding: "20px",
// // // //         borderRadius: "14px",
// // // //         background: "var(--card)",
// // // //         border: "1px solid var(--border)",
// // // //         cursor: "pointer",
// // // //         transition: "0.3s",
// // // //       }}
// // // //       onMouseEnter={(e) => {
// // // //         e.currentTarget.style.transform = "translateY(-5px)";
// // // //         e.currentTarget.style.borderColor = color;
// // // //       }}
// // // //       onMouseLeave={(e) => {
// // // //         e.currentTarget.style.transform = "translateY(0)";
// // // //         e.currentTarget.style.borderColor = "var(--border)";
// // // //       }}
// // // //     >
// // // //       <h3 style={{ color, marginBottom: "10px" }}>{title}</h3>
// // // //       <p style={{ color: "var(--muted)" }}>{desc}</p>
// // // //     </div>
// // // //   );
// // // // }
// // // function Card({ title, desc, color, image, onClick }) {
// // //   return (
// // //     <div
// // //       onClick={onClick}
// // //       style={{
// // //         padding: "20px",
// // //         borderRadius: "14px",
// // //         background: "var(--card)",
// // //         border: "1px solid var(--border)",
// // //         cursor: "pointer",
// // //         transition: "0.3s",
// // //         display: "flex",
// // //         flexDirection: "column",
// // //         justifyContent: "space-between",
// // //         minHeight: "140px",
// // //       }}
// // //       onMouseEnter={(e) => {
// // //         e.currentTarget.style.transform = "translateY(-6px)";
// // //         e.currentTarget.style.borderColor = color;
// // //         e.currentTarget.style.boxShadow = `0 10px 20px ${color}30`;
// // //       }}
// // //       onMouseLeave={(e) => {
// // //         e.currentTarget.style.transform = "translateY(0)";
// // //         e.currentTarget.style.borderColor = "var(--border)";
// // //         e.currentTarget.style.boxShadow = "none";
// // //       }}
// // //     >
// // //       {/* Top Content */}
// // //       <div>
// // //         <h3 style={{ color, marginBottom: "8px" }}>{title}</h3>
// // //         <p style={{ color: "var(--muted)", fontSize: "14px" }}>
// // //           {desc}
// // //         </p>
// // //       </div>

// // //       {/* Image */}
// // //       <div style={{ textAlign: "right", marginTop: "10px" }}>
// // //         <img
// // //           src={image}
// // //           alt={title}
// // //           style={{
// // //     marginTop: "10px",
// // //     width: "100%",
// // //     height: "250px",
// // //     backgroundImage: `url(${image})`,
// // //     backgroundSize: "cover",
// // //     backgroundPosition: "center",
// // //     borderRadius: "10px",
// // //     opacity: 0.9,
// // //   }}
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Stat({ title, value }) {
// // //   return (
// // //     <div
// // //       style={{
// // //         padding: "20px",
// // //         borderRadius: "12px",
// // //         background: "var(--card)",
// // //         border: "1px solid var(--border)",
// // //       }}
// // //     >
// // //       <h3 style={{ color: "var(--primary)", margin: 0 }}>{value}</h3>
// // //       <p style={{ color: "var(--muted)", marginTop: "5px" }}>{title}</p>
// // //     </div>
// // //   );
// // // }

// // // const gridStyle = {
// // //   display: "grid",
// // //   gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
// // //   gap: "20px",
// // // };


