import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route shows LandingPage */}
        <Route path="/" element={<LandingPage />} />

        {/* Login page on separate route */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
