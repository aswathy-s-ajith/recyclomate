import React, { useEffect, useState } from "react";
import { Bell } from 'lucide-react';
import NotificationsModal from './NotificationsModal';

function DriverDashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [agentInfo, setAgentInfo] = useState(null);
  const [assignedPickups, setAssignedPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriverData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        // Fetch driver profile
        const resProfile = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataProfile = await resProfile.json();

        if (!resProfile.ok) {
          console.error("Error fetching driver info:", dataProfile.message || dataProfile);
          setLoading(false);
          return;
        }

        setAgentInfo({
          username: dataProfile.user.username,
          email: dataProfile.user.email,
          phoneNumber: dataProfile.user.phoneNumber,
          address: dataProfile.user.address,
          profilePic: dataProfile.user.profilePic || "",
          available: dataProfile.user.available ?? true,
        });

        // Fetch assigned pickups
        const resPickups = await fetch("http://localhost:5000/api/pickups/assigned", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataPickups = await resPickups.json();
        setAssignedPickups(Array.isArray(dataPickups) ? dataPickups : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setAssignedPickups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, []);


  
  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!agentInfo) return <p style={{ textAlign: "center" }}>No driver data found.</p>;

  // Metrics
  const totalPickups = assignedPickups.length;
  const pendingPickups = assignedPickups.filter(p => p.status !== "Completed").length;
  const completedPickups = totalPickups - pendingPickups;

  const cardStyle = {
    padding: "20px",
    marginBottom: "30px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    borderTop: "5px solid #4CAF50",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const headingStyle = { marginBottom: "15px", color: "#4CAF50" };
  const greenButtonStyle = {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "5px",
  };

  const toggleAvailability = () => {
    setAgentInfo({ ...agentInfo, available: !agentInfo.available });
  };

  const handleCompletePickup = async (pickupId, ecoPoints) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/pickups/${pickupId}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ecoPoints }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to mark completed");
        return;
      }

      // Update UI
      setAssignedPickups(prev =>
        prev.map(p => (p._id === pickupId ? { ...p, status: "Completed", ecoPoints: data.ecoPoints } : p))
      );
      alert(`Pickup completed! ${data.ecoPoints} points added to user. Total: ${data.userEcoPoints}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while completing pickup");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "8px" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#4CAF50", margin: 0 }}>Driver Dashboard</h1>
        <div 
          onClick={() => setShowNotifications(true)}
          style={{ 
            marginLeft: "20px",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.2s"
          }}
        >
          <Bell size={24} color="#374151" />
        </div>
      </div>
      <NotificationsModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      {/* Driver Info */}
      <div style={{ ...cardStyle, display: "flex", alignItems: "center" }}>
        <img
          src={agentInfo.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          style={{ borderRadius: "50%", width: "100px", height: "100px", marginRight: "20px", border: "2px solid #4CAF50" }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: "0 0 10px 0" }}>{agentInfo.username}</h2>
          <p>Email: {agentInfo.email}</p>
          <p>Phone: {agentInfo.phoneNumber || "Not provided"}</p>
          <p>Address: {agentInfo.address || "Not provided"}</p>
          <p>Status: <strong style={{ color: agentInfo.available ? "#4CAF50" : "#f44336" }}>{agentInfo.available ? "Available" : "Unavailable"}</strong></p>
          <button style={greenButtonStyle} onClick={toggleAvailability}>Toggle Availability</button>
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
        {assignedPickups.length === 0 ? (
          <p>No pickups assigned yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc" }}>
                <th style={{ padding: "8px" }}>Date</th>
                <th style={{ padding: "8px" }}>Time</th>
                <th style={{ padding: "8px" }}>Type</th>
                <th style={{ padding: "8px" }}>Address</th>
                <th style={{ padding: "8px" }}>Status</th>
                <th style={{ padding: "8px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignedPickups.map((pickup) => (
                <tr key={pickup._id} style={{ borderBottom: "1px solid #eee", textAlign: "center" }}>
                  <td>{pickup.date}</td>
                  <td>{pickup.time}</td>
                  <td>{Array.isArray(pickup.type) ? pickup.type.join(", ") : pickup.type}</td>
                  <td>{pickup.address}</td>
                  <td style={{ color: pickup.status === "Completed" ? "#4CAF50" : "#333", fontWeight: "bold" }}>{pickup.status}</td>
                  <td>
                    {pickup.status !== "Completed" && (
                      <div>
                        <input
                          type="number"
                          placeholder="Eco points"
                          min={0}
                          style={{ width: "60px", marginRight: "5px" }}
                          onChange={(e) => pickup.manualEcoPoints = Number(e.target.value)}
                        />
                        <button
                          style={{ ...greenButtonStyle, padding: "5px 10px" }}
                          onClick={() => handleCompletePickup(pickup._id, pickup.manualEcoPoints || 0)}
                        >
                          Complete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DriverDashboard;
