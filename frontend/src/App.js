import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupUser from "./components/SignupUser";
import SignupDriver from "./components/SignupDriver";
import UserDashboard from "./components/UserDashboard";
import DriverDashboard from "./components/DriverDashboard";
import SchedulePickup from "./components/SchedulePickup";
function App() {
  return (
    <Router>
      <Routes>
        {/* Default route shows LandingPage */}
        <Route path="/" element={<LandingPage />} />

        {/* Login page on separate route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-user" element={<SignupUser />} />
        <Route path="/register-driver" element={<SignupDriver />} /> 
        <Route path="/dashboard" element={<UserDashboard />} /> 
        <Route path="/driver-dashboard" element={<DriverDashboard />} /> 
        <Route path="/schedule" element={<SchedulePickup />} /> 


      </Routes>
    </Router>
)};

export default App;
