export default function Card({ title, children }) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        backdropFilter: "blur(10px)",
        background: "rgba(20, 25, 35, 0.7)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "white"
      }}
    >
      <h3 style={{ marginBottom: 15 }}>{title}</h3>
      {children}
    </div>
  );
}

// export default function Card({ title, children }) {
//   return (
//     <div
//       style={{
//         background: "white",
//         padding: "20px",
//         borderRadius: "10px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         marginBottom: "20px",
//       }}
//     >
//       {title && <h3>{title}</h3>}
//       {children}
//     </div>
//   );
// }









// // export default function Card({ title, children }) {
// //   return (
// //     <div
// //       style={{
// //         background: "white",
// //         padding: "20px",
// //         borderRadius: "10px",
// //         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //         marginBottom: "20px",
// //       }}
// //     >
// //       {title && <h3>{title}</h3>}
// //       {children}
// //     </div>
// //   );
// // }