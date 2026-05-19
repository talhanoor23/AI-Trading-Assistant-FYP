import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

import "../styles/layout.css";

export default function DashboardLayout() {
  return (
    <div className="main-layout">

      <Sidebar />

      <div className="layout-content">

        <Topbar />

        <div>
          <Outlet />
        </div>

      </div>

    </div>
  );
}



// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import { Outlet } from "react-router-dom";

// export default function DashboardLayout() {
//   return (
//     <div style={{ display: "flex" }}>

//       <Sidebar />

//       <div style={{ flex: 1 }}>

//         <Topbar />

//         <div style={{ padding: "20px" }}>
//           <Outlet />
//         </div>

//       </div>

//     </div>
//   );
// }
