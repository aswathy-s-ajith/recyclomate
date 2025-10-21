import React, { useEffect, useState } from "react";
import ActivityMetricsChart from "./ActivityMetricsChart";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile
        const resProfile = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataProfile = await resProfile.json();
        if (resProfile.ok) setUser(dataProfile.user || dataProfile);

        // Fetch pickups
        const resPickups = await fetch(
          "http://localhost:5000/api/pickups/user-pickups",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const dataPickups = await resPickups.json();
        if (resPickups.ok) setPickups(dataPickups);

        // Fetch eco-points
        const resPoints = await fetch("http://localhost:5000/api/users/ecopoints", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataPoints = await resPoints.json();
        if (resPoints.ok) setEcoPoints(dataPoints.ecoPoints);

      } catch (error) {
        console.error("Error fetching user dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return <div style={styles.loading}>Loading your dashboard...</div>;

  if (!user)
    return <div style={styles.error}>No user data found.</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome back, {user.username || "User"}!</h2>
      <p style={styles.subtitle}>Here’s your recycling journey so far 🌱</p>

      {/* Summary Cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Pickups</h3>
          <p style={styles.statValue}>{pickups.length}</p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Completed Pickups</h3>
          <p style={styles.statValue}>
            {pickups.filter((p) => p.status === "Completed").length}
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Eco Points</h3>
          <p style={styles.statValue}>{ecoPoints}</p>
        </div>
      </div>

      {/* Your Impact Section */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Your Impact</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ flex: "1 1 200px" }}>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#22c55e" }}>
              {pickups.filter(p => p.status === "Completed").length}
            </p>
            <p style={{ color: "#6b7280" }}>Pickups Completed</p>
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#3b82f6" }}>
              {pickups.reduce((sum, p) => sum + (Number(p.weight) || 0), 0).toFixed(1)} kg
            </p>
            <p style={{ color: "#6b7280" }}>Total Waste Recycled</p>
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#f59e0b" }}>
              {(pickups.reduce((sum, p) => sum + (Number(p.weight) || 0), 0) * 1.2).toFixed(1)} kg
            </p>
            <p style={{ color: "#6b7280" }}>Estimated CO₂ Saved</p>
          </div>
        </div>
      </div>

      {/* Monthly Activity Chart */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Monthly Activity</h3>
        <ActivityMetricsChart pickups={pickups} />
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "1000px", margin: "auto" },
  title: { fontSize: "1.8rem", fontWeight: "bold" },
  subtitle: { color: "#6b7280", marginBottom: "1rem" },
  loading: { textAlign: "center", marginTop: "20%" },
  error: { textAlign: "center", color: "red", marginTop: "20%" },
  cardsContainer: { display: "flex", flexWrap: "wrap", gap: "1.5rem" },
  card: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
    flex: "1 1 280px",
  },
  cardTitle: { fontSize: "1rem", color: "#6b7280", marginBottom: "0.5rem" },
  statValue: { fontSize: "2rem", fontWeight: "bold", color: "#22c55e" },
};

export default UserDashboard;
