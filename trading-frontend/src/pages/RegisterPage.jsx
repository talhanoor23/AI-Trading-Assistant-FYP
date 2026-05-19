import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import bgImage from "../assets/im3.jpg";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await api.post("/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully");

      navigate("/login");

    } catch (err) {
      console.log(err.response?.data);

      alert(
        err.response?.data?.detail ||
        "Register failed"
      );
    }

    setLoading(false);
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >

      {/* DARK OVERLAY */}
      <div className="register-overlay" />

      {/* MAIN CONTENT */}
      <div className="register-container">

        {/* BRAND SECTION */}
        <div className="brand-section">

          <div className="brand-logo">
            INVEST SMART
          </div>

          <div className="brand-subtitle">
            Smart investing starts with intelligent analysis,
            real-time insights, and AI-powered trading tools.
          </div>

        </div>

        {/* REGISTER CARD */}
        <div className="register-box">

          <Card title="Create Account">

            <div className="register-form">

              <input
                className="input"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                className="input"
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                className="button register-button"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Register"}
              </button>

              <div className="login-footer">
                Already have an account?{" "}
                <a href="/login">
                  Login
                </a>
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

// export default function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       await api.post("/register", {
//         name,
//         email,
//         password,
//       });

//       alert("Registered successfully");
//       navigate("/login");

//     } catch (err) {
//       console.log(err.response?.data);
//       alert("Register failed");
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Register</h2>

//       <input
//         placeholder="Name"
//         onChange={(e) => setName(e.target.value)}
//       />

//       <br /><br />

//       <input
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <br /><br />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={handleRegister}>
//         Register
//       </button>

//     </div>
//   );
// }