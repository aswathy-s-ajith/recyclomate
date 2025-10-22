import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DriverProfile from "./components/DriverProfile";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import UserDashboard from "./components/UserDashboard";
import DriverDashboard from "./components/DriverDashboard";
import SchedulePickup from "./components/SchedulePickup";
import AdminDashboard from "./components/AdminDashboard";
import UserProfile from "./components/UserProfile";
import DriverSchedule from "./components/DriverSchedule";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route shows LandingPage */}
        <Route path="/" element={<LandingPage />} />

        {/* Login page on separate route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<UserDashboard />} /> 
        <Route path="/driver-dashboard" element={<DriverDashboard />} /> 
        <Route path="/schedule" element={<SchedulePickup />} /> 
  <Route path="/edit-profile" element={<UserProfile />} /> 
        <Route path="/admin" element={<AdminDashboard/>} /> 
    <Route path="/driver-profile" element={<DriverProfile />} />
        <Route path="/driver-schedule" element={<DriverSchedule />} />

      </Routes>
    </Router>
)};

export default App;
