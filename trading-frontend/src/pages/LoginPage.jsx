import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import bgImage from "../assets/im3.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", email);

      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* DARK OVERLAY */}
      <div className="login-overlay" />

      {/* CONTENT */}
      <div className="login-container">

        {/* BRANDING SECTION */}
        <div className="brand-section">

          <div className="brand-logo">
            INVEST SMART
          </div>

          <div className="brand-subtitle">
            AI-Powered Trading Intelligence Platform
          </div>

        </div>

        {/* LOGIN CARD */}
        <div className="login-box">

          <Card title="Welcome Back">

            <div className="login-form">

              <input
                className="input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="button login-button"
                onClick={handleLogin}
              >
                Login
              </button>

              <div className="login-footer">
                No account? <a href="/register">Create Account</a>
              </div>

            </div>

          </Card>

        </div>

      </div>
    </div>
  );
}


// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import Card from "../components/Card";

// export default function LoginPage() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {

//       const res = await api.post("/login", {
//         email: email,
//         password: password
//       });

//       localStorage.setItem("token", res.data.access_token);
//       localStorage.setItem("user", email);

//       navigate("/");

//     } catch {
//       alert("Login failed");
//     }
//   };

//   return (

//     <div className="login-container">

//       <Card title="Login">

//         <div className="form-grid">

//           <input
//             className="input"
//             placeholder="Email"
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             className="input"
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             className="button"
//             onClick={handleLogin}
//           >
//             Login
//           </button>

//           <div className="login-footer">
//             No account? <a href="/register">Sign up</a>
//           </div>

//         </div>

//       </Card>

//     </div>
//   );
// }




// // import { useState } from "react";
// // import api from "../api/axios";
// // import { useNavigate } from "react-router-dom";

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = async () => {
// //     try {
// //       const res = await api.post("/login", {
// //         email: email,
// //         password: password,
// //       });

// //       localStorage.setItem("token", res.data.access_token);
// //       localStorage.setItem("user", email);
// //       navigate("/");
// //     } catch (err) {
// //       alert("Login failed");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>

// //       <input
// //         placeholder="Email"
// //         onChange={(e) => setEmail(e.target.value)}
// //       />

// //       <br /><br />

// //       <input
// //         type="password"
// //         placeholder="Password"
// //         onChange={(e) => setPassword(e.target.value)}
// //       />

// //       <br /><br />

// //       <button onClick={handleLogin}>
// //         Login
// //       </button>
// //       <p>
// //         No account? <a href="/register">Sign up</a>
// //       </p>
// //     </div>
// //   );
// // }