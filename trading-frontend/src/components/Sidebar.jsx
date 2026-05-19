import { NavLink } from "react-router-dom";

import {
  FaChartBar,
  FaRobot,
  FaTable,
  FaHome,
  FaChartLine,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="sidebar">

      <div>

        {/* LOGO */}

        <div className="logo-wrapper">

          <h1 className="logo-title">
            Invest Smart
          </h1>

          <div className="logo-subtitle">
            AI Powered Trading & Market Intelligence Platform
          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="sidebar-nav">

          <NavItem
            to="/"
            icon={<FaHome />}
            label="Dashboard"
          />

                   <NavItem
            to="/chat"
            icon={<FaRobot />}
            label="AI Trading Agent"
          />

          <NavItem
            to="/adr"
            icon={<FaChartBar />}
            label="ADR Analyzer"
          />

          <NavItem
            to="/swing"
            icon={<FaTable />}
            label="Swing CSV"
          />


          <NavItem
            to="/trading"
            icon={<FaChartLine />}
            label="Trading Bot"
          />

        </nav>

      </div>

      {/* FOOTER */}

      <div className="sidebar-footer">

        <div className="footer-title">
          Smart Market Insights
        </div>

        <div className="footer-text">
          Advanced AI-powered tools for modern traders,
          volatility analysis, swing trading, and market automation.
        </div>

      </div>

    </div>
  );
}

/* NAV ITEM */

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "nav-item active"
          : "nav-item"
      }
    >
      <span className="nav-icon">
        {icon}
      </span>

      <span>
        {label}
      </span>
    </NavLink>
  );
}






// import { NavLink } from "react-router-dom";
// import { FaChartBar, FaRobot, FaTable, FaHome } from "react-icons/fa";
// import { FaChartLine } from "react-icons/fa";


// export default function Sidebar() {
//   return (
//     <div style={sidebarStyle}>
//       <h2 style={logoStyle}>AI Trader</h2>

//       <nav style={navStyle}>
//         <NavItem to="/" icon={<FaHome />} label="Dashboard" />
//         <NavItem to="/adr" icon={<FaChartBar />} label="ADR Analyzer" />
//         <NavItem to="/swing" icon={<FaTable />} label="Swing CSV" />
//         <NavItem to="/chat" icon={<FaRobot />} label="AI Chat" />
//         <NavItem to="/trading" icon={<FaChartLine />} label="Trading Bot" />
//       </nav>
//     </div>
//   );
// }

// function NavItem({ to, icon, label }) {
//   return (
//     <NavLink
//       to={to}
//       style={({ isActive }) => ({
//         ...linkStyle,
//         background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
//         borderLeft: isActive ? "3px solid var(--primary)" : "3px solid transparent",
//       })}
//     >
//       {icon}
//       {label}
//     </NavLink>
//   );
// }

// /* STYLES */

// const sidebarStyle = {
//   width: "230px",
//   background: "#0f172a",
//   color: "white",
//   minHeight: "100vh",
//   padding: "20px 15px",
//   borderRight: "1px solid #1f2937",
// };

// const logoStyle = {
//   marginBottom: "30px",
//   fontSize: "20px",
//   fontWeight: "bold",
// };

// const navStyle = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "8px",
// };

// const linkStyle = {
//   color: "#cbd5e1",
//   textDecoration: "none",
//   display: "flex",
//   gap: "12px",
//   alignItems: "center",
//   padding: "10px 12px",
//   borderRadius: "8px",
//   transition: "0.2s",
// };