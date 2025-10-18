import React, { useState } from "react";

function UserProfile() {
  const [userInfo, setUserInfo] = useState({
    name: "Azeen Fathima",
    email: "azeem@example.com",
    phone: "+91 9876543210",
    profilePic: "",
  });

  const [addresses, setAddresses] = useState([
    { address: "123 Main St, City A", isDefault: true },
    { address: "456 Park Ave, City B", isDefault: false },
    { address: "789 Oak Rd, City C", isDefault: false },
  ]);

  const [pickupHistory] = useState([
    {
      id: 1,
      date: "2025-10-19",
      time: "10:00 AM - 12:00 PM",
      wasteTypes: ["Plastic", "Glass"],
      wasteDetail: "Some plastic bottles",
      address: "123 Main St, City A",
      status: "Completed",
    },
    {
      id: 2,
      date: "2025-10-21",
      time: "02:00 PM - 04:00 PM",
      wasteTypes: ["Paper"],
      wasteDetail: "",
      address: "456 Park Ave, City B",
      status: "Pending",
    },
  ]);

  const [ecoPoints] = useState({
    total: 120,
    earnedThisMonth: 20,
    redeemed: 50,
  });

  const [newAddress, setNewAddress] = useState("");

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

  const smallButtonStyle = {
    padding: "4px 8px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "5px",
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  const handleProfileSave = () => {
    alert("Profile updated successfully!");
  };

  const handleAddAddress = () => {
    if (newAddress.trim() !== "") {
      setAddresses([...addresses, { address: newAddress, isDefault: false }]);
      setNewAddress("");
    }
  };

  const handleDeleteAddress = (index) => {
    const updated = [...addresses];
    const removedDefault = updated[index].isDefault;
    updated.splice(index, 1);
    if (removedDefault && updated.length > 0) {
      updated[0].isDefault = true; // set first address as default if default was deleted
    }
    setAddresses(updated);
  };

  const handleEditAddress = (index) => {
    const updated = prompt("Edit Address:", addresses[index].address);
    if (updated !== null && updated.trim() !== "") {
      const newAddresses = [...addresses];
      newAddresses[index].address = updated;
      setAddresses(newAddresses);
    }
  };

  const handleSetDefault = (index) => {
    const updated = addresses.map((addr, idx) => ({
      ...addr,
      isDefault: idx === index,
    }));
    setAddresses(updated);
  };

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

      {/* User Info */}
      <div style={{ ...cardStyle, display: "flex", alignItems: "center" }}>
        <img
          src={userInfo.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          style={{ borderRadius: "50%", width: "100px", height: "100px", marginRight: "20px", border: "2px solid #4CAF50" }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: "0 0 10px 0" }}>{userInfo.name}</h2>
          <p style={{ margin: "2px 0" }}>Email: {userInfo.email}</p>
          <p style={{ margin: "2px 0" }}>Phone: {userInfo.phone}</p>
        </div>
      </div>

      {/* Eco Points */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>Eco Points</h3>
        <p>Total Points: <strong>{ecoPoints.total}</strong></p>
        <p>Points Earned This Month: <strong>{ecoPoints.earnedThisMonth}</strong></p>
        <p>Points Redeemed: <strong>{ecoPoints.redeemed}</strong></p>
      </div>

      {/* Pickup History */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>Pickup History</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ padding: "8px" }}>Date</th>
              <th style={{ padding: "8px" }}>Time</th>
              <th style={{ padding: "8px" }}>Waste Type</th>
              <th style={{ padding: "8px" }}>Details</th>
              <th style={{ padding: "8px" }}>Address</th>
              <th style={{ padding: "8px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {pickupHistory.map((pickup) => (
              <tr key={pickup.id} style={{ borderBottom: "1px solid #eee", textAlign: "center" }}>
                <td style={{ padding: "8px" }}>{pickup.date}</td>
                <td style={{ padding: "8px" }}>{pickup.time}</td>
                <td style={{ padding: "8px" }}>{pickup.wasteTypes.join(", ")}</td>
                <td style={{ padding: "8px" }}>{pickup.wasteDetail || "-"}</td>
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

        {/* Update Profile */}
        <div style={{ marginBottom: "15px" }}>
          <h4>Update Profile Info</h4>
          <input
            type="text"
            placeholder="Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Phone"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            style={inputStyle}
          />
          <button style={greenButtonStyle} onClick={handleProfileSave}>Save Profile</button>
        </div>

        {/* Manage Addresses */}
        <div>
          <h4>Saved Addresses</h4>
          <ul>
            {addresses.map((addr, idx) => (
              <li key={idx} style={{ marginBottom: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                  {addr.address} {addr.isDefault && <strong>(Default)</strong>}
                </span>
                <div>
                  {!addr.isDefault && <button style={smallButtonStyle} onClick={() => handleSetDefault(idx)}>Set Default</button>}
                  <button style={smallButtonStyle} onClick={() => handleEditAddress(idx)}>Edit</button>
                  <button style={{ ...smallButtonStyle, backgroundColor: "#f44336" }} onClick={() => handleDeleteAddress(idx)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="New Address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            style={inputStyle}
          />
          <button style={greenButtonStyle} onClick={handleAddAddress}>Add New Address</button>
        </div>
      </div>

      {/* Logout */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <button onClick={handleLogout} style={{ ...greenButtonStyle, padding: "10px 20px" }}>Logout</button>
      </div>
    </div>
  );
}

export default UserProfile;
