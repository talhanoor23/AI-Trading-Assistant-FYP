import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Layout from "./components/Layout";

import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./auth/PrivateRoute";
import TradingPage from "./pages/TradingPage";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import SwingPage from "./pages/SwingPage";
import ADRPage from "./pages/ADRPage";
import "./styles/dashboard.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/adr" element={<ADRPage />} />
          <Route path="/swing" element={<SwingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/trading" element={<TradingPage />} />
        </Route>


        {/* protected layout */}
        {/* <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="swing" element={<SwingPage />} />
          <Route path="adr" element={<ADRPage />} />
        </Route> */}

      </Routes>
    </BrowserRouter>
  );
}