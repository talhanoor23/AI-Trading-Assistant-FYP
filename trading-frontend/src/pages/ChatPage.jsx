import { useState, useRef, useEffect } from "react";
import api from "../api/axios";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    const userMsg = {
      role: "user",
      text: userMessage,
    };

    setMessages((prev) => [...prev, userMsg]);

    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/agent/chat", {
        message: userMessage,
      });

      const botMsg = {
        role: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Unable to fetch AI response.",
        },
      ]);
    }

    setLoading(false);
  };

  // ENTER TO SEND
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={container}>

      {/* CHAT AREA */}
      <div style={chatBox}>

        {messages.length === 0 && (
          <div style={welcomeBox}>

            <div style={welcomeTitle}>
              INVEST SMART AI
            </div>

            <div style={welcomeText}>
              Ask about trading, crypto markets,
              swing analysis, indicators, strategy,
              market sentiment, and AI insights.
            </div>

          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...messageRow,
              justifyContent:
                msg.role === "user"
                  ? "flex-end"
                  : "flex-start",
            }}
          >

            <div
              style={{
                ...bubble,
                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                    : "#111827",

                color: "white",

                borderBottomRightRadius:
                  msg.role === "user" ? "4px" : "18px",

                borderBottomLeftRadius:
                  msg.role === "bot" ? "4px" : "18px",
              }}
            >

              <div style={roleLabel}>
                {msg.role === "user"
                  ? "You"
                  : "AI Assistant"}
              </div>

              <FormattedText text={msg.text} />

            </div>

          </div>
        ))}

        {loading && (
          <div style={loadingBox}>

            <div style={typingDots}>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>

            <div style={loadingText}>
              AI is analyzing market data...
            </div>

          </div>
        )}

        <div ref={chatEndRef} />

      </div>

      {/* INPUT AREA */}
      <div style={inputWrapper}>

        <textarea
          placeholder="Ask about trading, crypto, indicators, strategies..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          style={textarea}
        />

        <button
          onClick={sendMessage}
          style={button}
        >
          Send
        </button>

      </div>

    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////
// TEXT FORMATTER
////////////////////////////////////////////////////////////////////////////////

function FormattedText({ text }) {
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");

  formatted = formatted.replace(
    /(?:⭐|\*)\s?(.*?)(<br\/>|$)/g,
    "• $1<br/>"
  );

  return (
    <div
      style={{ lineHeight: 1.7 }}
      dangerouslySetInnerHTML={{
        __html: formatted,
      }}
    />
  );
}

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////

const container = {
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 60px)",

  background:
    "linear-gradient(180deg, #020617 0%, #0f172a 100%)",

  overflow: "hidden",
};

const header = {
  height: "78px",

  padding: "0 24px",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  borderBottom: "1px solid rgba(255,255,255,0.06)",

  background: "rgba(15,23,42,0.85)",

  backdropFilter: "blur(10px)",
};

const headerTitle = {
  color: "white",
  fontSize: "20px",
  fontWeight: "800",
};

const headerSub = {
  color: "#94a3b8",
  fontSize: "13px",
  marginTop: "4px",
};

const statusBadge = {
  padding: "8px 14px",

  borderRadius: "999px",

  background: "rgba(34,197,94,0.12)",
  color: "#22c55e",

  fontSize: "12px",
  fontWeight: "700",
};

const chatBox = {
  flex: 1,

  overflowY: "auto",

  padding: "24px",

  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const messageRow = {
  display: "flex",
};

const bubble = {
  maxWidth: "72%",

  padding: "16px 18px",

  borderRadius: "18px",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.18)",

  fontSize: "15px",
};

const roleLabel = {
  fontSize: "12px",
  fontWeight: "700",

  opacity: 0.7,

  marginBottom: "8px",

  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const inputWrapper = {
  padding: "18px 24px",
  marginBottom : "30px",

  borderTop:
    "1px solid rgba(255,255,255,0.06)",

  background: "#0f172a",

  display: "flex",
  gap: "14px",
  alignItems: "flex-end",
};

const textarea = {
  flex: 1,

  minHeight: "64px",
  maxHeight: "180px",

  resize: "none",

  padding: "16px",

  borderRadius: "18px",

  border: "1px solid rgba(255,255,255,0.08)",

  background: "#111827",

  color: "white",

  fontSize: "15px",

  outline: "none",
};

const button = {
  height: "64px",

  padding: "0 28px",

  border: "none",
  borderRadius: "18px",

  background:
    "linear-gradient(135deg, #3b82f6, #8b5cf6)",

  color: "white",

  fontWeight: "800",
  fontSize: "15px",

  cursor: "pointer",

  boxShadow:
    "0 10px 24px rgba(59,130,246,0.28)",

  transition: "0.25s ease",
};

const loadingBox = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",

  paddingLeft: "6px",
};

const loadingText = {
  color: "#94a3b8",
  fontSize: "13px",
};

const typingDots = {
  color: "#3b82f6",
  fontSize: "32px",
  lineHeight: "10px",
};

const welcomeBox = {
  margin: "auto",

  maxWidth: "680px",

  textAlign: "center",

  padding: "40px",
};

const welcomeTitle = {
  fontSize: "48px",
  fontWeight: "900",

  color: "white",

  letterSpacing: "2px",

  marginBottom: "16px",
};

const welcomeText = {
  color: "#94a3b8",

  fontSize: "18px",
  lineHeight: "1.8",
};



// import { useState } from "react";
// import api from "../api/axios";

// export default function ChatPage() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!message) return;

//     const userMsg = { role: "user", text: message };

//     setMessages((prev) => [...prev, userMsg]);
//     setMessage("");
//     setLoading(true);

//     try {
//       const res = await api.post("/agent/chat", {
//         message,
//       });

//       const botMsg = {
//         role: "bot",
//         text: res.data.reply,
//       };

//       setMessages((prev) => [...prev, botMsg]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", text: "Error getting response" },
//       ]);
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={container}>

//       <div style={chatBox}>
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             style={{
//               ...bubble,
//               alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
//               background:
//                 msg.role === "user"
//                   ? "var(--primary)"
//                   : "var(--card)",
//               color: msg.role === "user" ? "#000" : "var(--text)",
//             }}
//           >
//             <FormattedText text={msg.text} />
//           </div>
//         ))}

//         {loading && (
//           <div style={{ color: "var(--muted)" }}>Thinking...</div>
//         )}
//         {loading && (
//           <div style={{ color: "var(--muted)" }}>Fetching Real Time Data...</div>
//         )}
//       </div>
      

//       {/* INPUT */}
//       <div style={inputBox}>
//         <textarea
//           placeholder="Ask something about trading..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           style={textarea}
//         />

//         <button onClick={sendMessage} style={button}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// ////////////////////////////////////////////////////////////////////////////////
// // 🔥 TEXT FORMATTER (bold + bullets + stars)
// ////////////////////////////////////////////////////////////////////////////////

// // function FormattedText({ text }) {
// //   // Convert **bold** and * bullet and ⭐
// //   const formatted = text
// //     .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
// //     .replace(/\n/g, "<br/>"); // line breaks

// //   return (
// //     <div
// //       dangerouslySetInnerHTML={{ __html: formatted }}
// //     />
// //   );
// // }

// function FormattedText({ text }) {
//   let formatted = text
//     .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
//     .replace(/\n/g, "<br/>");

//   // Convert lines starting with ⭐ or * into bullets
//   formatted = formatted.replace(
//     /(?:⭐|\*)\s?(.*?)(<br\/>|$)/g,
//     "• $1<br/>"
//   );

//   return (
//     <div dangerouslySetInnerHTML={{ __html: formatted }} />
//   );
// }

// ////////////////////////////////////////////////////////////////////////////////
// // 🎨 STYLES
// ////////////////////////////////////////////////////////////////////////////////

// // const container = {
// //   display: "flex",
// //   flexDirection: "column",
// //   height: "calc(100vh - 60px)",
// // };
// const container = {
//   display: "flex",
//   flexDirection: "column",
//   height: "calc(95vh - 60px)", // minus topbar
//   overflow: "hidden",           // 🔥 prevents outer scroll
// };

// // const chatBox = {
// //   flex: 1,
// //   padding: "20px",
// //   display: "flex",
// //   flexDirection: "column",
// //   gap: "12px",
// //   overflowY: "auto",
// // };
// const chatBox = {
//   flex: 1,
//   padding: "20px",
//   display: "flex",
//   flexDirection: "column",
//   gap: "12px",
//   overflowY: "auto", // 🔥 scroll only messages
// };

// const bubble = {
//   maxWidth: "60%",
//   padding: "12px 16px",
//   borderRadius: "12px",
//   lineHeight: "1.5",
// };

// // const inputBox = {
// //   display: "flex",
// //   gap: "10px",
// //   padding: "15px",
// //   borderTop: "1px solid var(--border)",
// //   background: "var(--card)",
// // };

// const inputBox = {
//   display: "flex",
//   gap: "12px",
//   padding: "15px",
//   borderTop: "1px solid var(--border)",
//   background: "var(--card)",
//   borderRadius: "20px",
// };

// // const textarea = {
// //   flex: 1,
// //   padding: "10px",
// //   borderRadius: "8px",
// //   border: "1px solid var(--border)",
// //   background: "transparent",
// //   color: "var(--text)",
// // };

// const textarea = {
//   flex: 1,
//   padding: "14px",
//   borderRadius: "10px",
//   border: "1px solid var(--border)",
//   background: "transparent",
//   color: "var(--text)",
//   fontSize: "15px",   // 🔥 bigger text
//   minHeight: "60px",  // 🔥 bigger input
// };

// // const button = {
// //   padding: "10px 20px",
// //   borderRadius: "8px",
// //   border: "none",
// //   background: "var(--primary)",
// //   cursor: "pointer",
// // };

// const button = {
//   padding: "12px 20px",
//   borderRadius: "10px",
//   border: "none",
//   background: "var(--primary)",
//   cursor: "pointer",
//   fontWeight: "bold",
// };



// // import { useState } from "react";
// // import api from "../api/axios";
// // import Card from "../components/Card";

// // export default function ChatPage() {

// //   const [message, setMessage] = useState("");
// //   const [reply, setReply] = useState("");
// //   const [loading, setLoading] = useState(false);


// //   const sendMessage = async () => {

// //     if (!message) return;

// //     setLoading(true);
// //     setReply("");

// //     try {

// //       const res = await api.post(
// //         "/agent/chat",
// //         { message }
// //       );

// //       setReply(res.data.reply);

// //     } catch {

// //       setReply("Error");

// //     }

// //     setLoading(false);
// //   };


// //   return (

// //     <div>

// //       <div className="page-title">
// //         AI Chat
// //       </div>


// //       <Card title="Message">

// //         <textarea
// //           className="textarea"
// //           value={message}
// //           onChange={(e) =>
// //             setMessage(e.target.value)
// //           }
// //         />

// //         <br /><br />

// //         <button
// //           className="button"
// //           onClick={sendMessage}
// //         >
// //           {loading ? "Sending..." : "Send"}
// //         </button>

// //       </Card>


// //       {reply && (

// //         <Card title="Reply">

// //           <div className="result-box">
// //             {reply}
// //           </div>

// //         </Card>

// //       )}

// //     </div>

// //   );
// // }







// // // import { useState } from "react";
// // // import api from "../api/axios";
// // // import Card from "../components/Card";

// // // export default function ChatPage() {

// // //   const [message, setMessage] = useState("");
// // //   const [reply, setReply] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const sendMessage = async () => {

// // //     if (!message) return;

// // //     setLoading(true);
// // //     setReply("");

// // //     try {

// // //       const res = await api.post("/agent/chat", {
// // //         message
// // //       });

// // //       setReply(res.data.reply);

// // //     } catch {

// // //       setReply("Error");

// // //     }

// // //     setLoading(false);
// // //   };


// // //   return (

// // //     <div>

// // //       <h2 style={{ marginBottom: 20 }}>Chat AI</h2>


// // //       <Card title="Message">

// // //         <textarea
// // //           value={message}
// // //           onChange={(e) => setMessage(e.target.value)}
// // //           placeholder="Ask anything..."
// // //           style={{
// // //             width: "100%",
// // //             height: 120,
// // //             padding: 10,
// // //             borderRadius: 6,
// // //             background: "#111",
// // //             color: "white",
// // //             border: "1px solid #333"
// // //           }}
// // //         />

// // //         <br /><br />

// // //         <button
// // //           onClick={sendMessage}
// // //           style={{
// // //             padding: "8px 14px",
// // //             background: "#2563eb",
// // //             color: "white",
// // //             border: "none",
// // //             borderRadius: 6,
// // //             cursor: "pointer"
// // //           }}
// // //         >
// // //           {loading ? "Sending..." : "Send"}
// // //         </button>

// // //       </Card>


// // //       {reply && (

// // //         <Card title="Reply">

// // //           <div
// // //             style={{
// // //               whiteSpace: "pre-wrap",
// // //               lineHeight: "24px"
// // //             }}
// // //           >
// // //             {reply}
// // //           </div>

// // //         </Card>

// // //       )}

// // //     </div>
// // //   );
// // // }




// // // // import { useState } from "react";
// // // // import api from "../api/axios";

// // // // export default function ChatPage() {
// // // //   const [message, setMessage] = useState("");
// // // //   const [reply, setReply] = useState("");

// // // //   const sendMessage = async () => {
// // // //     if (!message) return;

// // // //     try {
// // // //       const res = await api.post("/agent/chat", {
// // // //         message: message
// // // //       });

// // // //       setReply(res.data.reply);
// // // //       setMessage(""); // clear input
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       setReply("Error: Unable to get response");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div style={{ padding: "20px" }}>
// // // //       <h2>Agent Chat</h2>

// // // //       <textarea
// // // //         placeholder="Type your message..."
// // // //         value={message}
// // // //         onChange={(e) => setMessage(e.target.value)}
// // // //         style={{ width: "100%", height: "100px" }}
// // // //       />

// // // //       <br /><br />

// // // //       <button onClick={sendMessage}>Send</button>

// // // //       <div style={{ marginTop: "20px", background: "#1c1f26", color: "white", padding: "15px", borderRadius: "8px" }}>
// // // //         <strong>Reply:</strong>
// // // //         <p>{reply}</p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }