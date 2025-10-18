import React, { useState } from "react";

function PickupAgentProfile() {
  const [agentInfo, setAgentInfo] = useState({
    name: "John Doe",
    email: "john.agent@example.com",
    phone: "+91 9876543210",
    profilePic: "",
    available: true,
  });

  const [assignedPickups] = useState([
    {
      id: 1,
      date: "2025-10-19",
      time: "10:00 AM - 12:00 PM",
      wasteTypes: ["Plastic", "Glass"],
      address: "123 Main St, City A",
      status: "Pending",
    },
    {
      id: 2,
      date: "2025-10-20",
      time: "02:00 PM - 04:00 PM",
      wasteTypes: ["Paper"],
      address: "456 Park Ave, City B",
      status: "Completed",
    },
  ]);

  // Styles
  const cardStyle = {
    padding: "20px",
    marginBottom: "30px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    borderTop: "5px solid #4CAF50",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const headingStyle = { marginBottom: "15px", color: "#4CAF50" };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "8px",
    margin: "5px 0 10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const greenButtonStyle = {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "5px",
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  const handleProfileSave = () => {
    alert("Profile updated successfully!");
  };

  const toggleAvailability = () => {
    setAgentInfo({ ...agentInfo, available: !agentInfo.available });
  };

  const totalPickups = assignedPickups.length;
  const pendingPickups = assignedPickups.filter(p => p.status === "Pending").length;
  const completedPickups = totalPickups - pendingPickups;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#4CAF50" }}>My Profile</h1>

      {/* Agent Info */}
      <div style={{ ...cardStyle, display: "flex", alignItems: "center" }}>
        <img
          src={agentInfo.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          style={{ borderRadius: "50%", width: "100px", height: "100px", marginRight: "20px", border: "2px solid #4CAF50" }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: "0 0 10px 0" }}>{agentInfo.name}</h2>
          <p style={{ margin: "2px 0" }}>Email: {agentInfo.email}</p>
          <p style={{ margin: "2px 0" }}>Phone: {agentInfo.phone}</p>
          <p style={{ margin: "5px 0" }}>
            Status: <strong style={{ color: agentInfo.available ? "#4CAF50" : "#f44336" }}>
              {agentInfo.available ? "Available" : "Unavailable"}
            </strong>
          </p>
          <button style={greenButtonStyle} onClick={toggleAvailability}>
            Toggle Availability
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>Performance Metrics</h3>
        <p>Total Pickups: <strong>{totalPickups}</strong></p>
        <p>Pending Pickups: <strong>{pendingPickups}</strong></p>
        <p>Completed Pickups: <strong>{completedPickups}</strong></p>
      </div>

      {/* Assigned Pickups */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>Assigned Pickups</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ padding: "8px" }}>Date</th>
              <th style={{ padding: "8px" }}>Time</th>
              <th style={{ padding: "8px" }}>Waste Type</th>
              <th style={{ padding: "8px" }}>Address</th>
              <th style={{ padding: "8px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {assignedPickups.map((pickup) => (
              <tr key={pickup.id} style={{ borderBottom: "1px solid #eee", textAlign: "center" }}>
                <td style={{ padding: "8px" }}>{pickup.date}</td>
                <td style={{ padding: "8px" }}>{pickup.time}</td>
                <td style={{ padding: "8px" }}>{pickup.wasteTypes.join(", ")}</td>
                <td style={{ padding: "8px" }}>{pickup.address}</td>
                <td style={{ padding: "8px", color: pickup.status === "Completed" ? "#4CAF50" : "#333", fontWeight: "bold" }}>
                  {pickup.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Account Settings */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>Account Settings</h3>
        <input
          type="text"
          placeholder="Name"
          value={agentInfo.name}
          onChange={(e) => setAgentInfo({ ...agentInfo, name: e.target.value })}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={agentInfo.email}
          onChange={(e) => setAgentInfo({ ...agentInfo, email: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Phone"
          value={agentInfo.phone}
          onChange={(e) => setAgentInfo({ ...agentInfo, phone: e.target.value })}
          style={inputStyle}
        />
        <button style={greenButtonStyle} onClick={handleProfileSave}>Save Profile</button>
      </div>

      {/* Logout */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <button onClick={handleLogout} style={{ ...greenButtonStyle, padding: "10px 20px" }}>Logout</button>
      </div>
    </div>
  );
}

export default PickupAgentProfile;
