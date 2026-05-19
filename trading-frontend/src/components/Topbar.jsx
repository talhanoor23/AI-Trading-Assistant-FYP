import { useNavigate } from "react-router-dom";

export default function Topbar() {

  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="topbar">

      {/* LEFT */}

      <div className="topbar-left">

        <h2>
          Trading Dashboard
        </h2>

        <p>
          AI-driven analytics and intelligent market tools
        </p>

      </div>

      {/* RIGHT */}

      <div className="topbar-right">

        <div className="market-status">
          Market Active
        </div>

        {/* USER */}

        <div className="user-box">

          <div className="avatar">
            {user ? user[0].toUpperCase() : "U"}
          </div>

          <div className="user-info">

            <h4>
              {user || "Trader"}
            </h4>

            <p>
              Premium Member
            </p>

          </div>

        </div>

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

    </div>
  );
}





// import { useNavigate } from "react-router-dom";

// export default function Topbar() {
//   const navigate = useNavigate();
//   const user = localStorage.getItem("user");

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div style={topbarStyle}>
      
//       {/* Left */}
//       <h3 style={{ margin: 0 }}>Dashboard</h3>

//       {/* Right */}
//       <div style={rightSection}>
//         <div style={userBox}>
//           <div style={avatar}>
//             {user ? user[0].toUpperCase() : "U"}
//           </div>
//           <span>{user || "User"}</span>
//         </div>

//         <button onClick={logout} style={logoutBtn}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// /* STYLES */

// // const topbarStyle = {
// //   height: "60px",
// //   background: "var(--card)",
// //   color: "var(--text)",
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "space-between",
// //   padding: "0 20px",
// //   borderBottom: "1px solid var(--border)",
// //   boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
// // };
// const topbarStyle = {
//   height: "60px",
//   background: "var(--topbar-bg)",   // 👈 contrast gradient
//   color: "var(--text)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   padding: "0 20px",
//   borderBottom: "1px solid var(--topbar-border)",
//   boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
// };

// const rightSection = {
//   display: "flex",
//   alignItems: "center",
//   gap: "15px",
// };

// const userBox = {
//   display: "flex",
//   alignItems: "center",
//   gap: "8px",
// };

// const avatar = {
//   width: "32px",
//   height: "32px",
//   borderRadius: "50%",
//   background: "var(--primary)",
//   color: "black",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontWeight: "bold",
// };

// const logoutBtn = {
//   background: "#ef4444",
//   border: "none",
//   padding: "6px 12px",
//   color: "white",
//   cursor: "pointer",
//   borderRadius: "6px",
// };