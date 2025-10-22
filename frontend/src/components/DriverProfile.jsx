import React, { useEffect, useState } from "react";

function DriverProfile() {
  const [driverInfo, setDriverInfo] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    profilePic: "",
    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
    serviceArea: "",
    password: "",
    isAvailable: false,
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/drivers/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.driver) {
          setDriverInfo({
            username: data.driver.username || "",
            email: data.driver.email || "",
            phoneNumber: data.driver.phoneNumber || "",
            profilePic: data.driver.profilePic || "",
            vehicleType: data.driver.vehicleType || "",
            vehicleNumber: data.driver.vehicleNumber || "",
            licenseNumber: data.driver.licenseNumber || "",
            serviceArea: data.driver.serviceArea || "",
            password: "",
            isAvailable: data.driver.isAvailable || false,
          });
        }
      } catch (err) {
        console.error("Error fetching driver profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setDriverInfo({ ...driverInfo, [e.target.name]: e.target.value });
  };

  const handleAvailabilityToggle = () => {
    setDriverInfo({ ...driverInfo, isAvailable: !driverInfo.isAvailable });
  };

  const handleProfileSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in");
    try {
      const payload = { ...driverInfo };
      if (!payload.password) delete payload.password; // Only send password if changed
      const res = await fetch("http://localhost:5000/api/drivers/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Save profile error:", err);
      alert(err.message || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const cardStyle = {
    padding: "20px",
    marginBottom: "30px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    borderTop: "5px solid #4CAF50",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };
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

  return (
    <div style={{
      maxWidth: "900px",
      margin: "20px auto",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f4f4",
      padding: "20px",
      borderRadius: "8px",
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#4CAF50" }}>Driver Profile</h1>
      <div style={{ ...cardStyle, display: "flex", alignItems: "center" }}>
        <img
          src={driverInfo.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          style={{ borderRadius: "50%", width: "100px", height: "100px", marginRight: "20px", border: "2px solid #4CAF50" }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: "0 0 10px 0" }}>{driverInfo.username}</h2>
          <p style={{ margin: "2px 0" }}>Email: {driverInfo.email}</p>
          <p style={{ margin: "2px 0" }}>Phone: {driverInfo.phoneNumber}</p>
        </div>
        <div style={{ textAlign: "center", marginLeft: "20px" }}>
          <div style={{ marginBottom: "10px", fontWeight: "bold", color: driverInfo.isAvailable ? "#4CAF50" : "#999" }}>
            {driverInfo.isAvailable ? "● Available" : "● Unavailable"}
          </div>
          <button
            onClick={handleAvailabilityToggle}
            style={{
              ...greenButtonStyle,
              backgroundColor: driverInfo.isAvailable ? "#f44336" : "#4CAF50",
              padding: "10px 20px",
            }}
          >
            {driverInfo.isAvailable ? "Go Unavailable" : "Go Available"}
          </button>
        </div>
      </div>
      <div style={cardStyle}>
        <h3 style={{ marginBottom: "15px", color: "#4CAF50" }}>Vehicle Information</h3>
        {editMode ? (
          <>
            <input type="text" name="vehicleType" placeholder="Vehicle Type" value={driverInfo.vehicleType} onChange={handleChange} style={inputStyle} />
            <input type="text" name="vehicleNumber" placeholder="Vehicle Number" value={driverInfo.vehicleNumber} onChange={handleChange} style={inputStyle} />
            <input type="text" name="licenseNumber" placeholder="License Number" value={driverInfo.licenseNumber} onChange={handleChange} style={inputStyle} />
            <input type="text" name="serviceArea" placeholder="Service Area" value={driverInfo.serviceArea} onChange={handleChange} style={inputStyle} />
          </>
        ) : (
          <>
            <p>Type: {driverInfo.vehicleType}</p>
            <p>Number: {driverInfo.vehicleNumber}</p>
            <p>License: {driverInfo.licenseNumber}</p>
            <p>Service Area: {driverInfo.serviceArea}</p>
          </>
        )}
      </div>
      <div style={cardStyle}>
        <h3 style={{ marginBottom: "15px", color: "#4CAF50" }}>Account Settings</h3>
        {editMode ? (
          <>
            <input type="text" name="username" placeholder="Username" value={driverInfo.username} onChange={handleChange} style={inputStyle} />
            <input type="email" name="email" placeholder="Email" value={driverInfo.email} onChange={handleChange} style={inputStyle} />
            <input type="text" name="phoneNumber" placeholder="Phone" value={driverInfo.phoneNumber} onChange={handleChange} style={inputStyle} />
            <input type="text" name="profilePic" placeholder="Profile Photo URL" value={driverInfo.profilePic} onChange={handleChange} style={inputStyle} />
            <input type="password" name="password" placeholder="New Password" value={driverInfo.password} onChange={handleChange} style={inputStyle} />
            <button style={greenButtonStyle} onClick={handleProfileSave}>Save Profile</button>
            <button style={{ ...greenButtonStyle, backgroundColor: "#ccc", color: "#333" }} onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <button style={greenButtonStyle} onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <button onClick={handleLogout} style={{ ...greenButtonStyle, padding: "10px 20px" }}>Logout</button>
      </div>
    </div>
  );
}

export default DriverProfile;