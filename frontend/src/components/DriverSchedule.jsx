import React from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Dummy data for upcoming pickups
const upcomingPickups = [
  { date: new Date(2025, 9, 22), location: "Main St" },
  { date: new Date(2025, 9, 25), location: "Elm Ave" },
  { date: new Date(2025, 9, 28), location: "Oak Blvd" },
];

function tileContent({ date, view }) {
  if (view === "month") {
    const pickup = upcomingPickups.find(
      (p) =>
        p.date.getFullYear() === date.getFullYear() &&
        p.date.getMonth() === date.getMonth() &&
        p.date.getDate() === date.getDate()
    );
    return pickup ? (
      <span role="img" aria-label="pickup" style={{ color: "green", fontSize: "1.2em" }}>🛻</span>
    ) : null;
  }
  return null;
}

const DriverSchedule = () => {
  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Upcoming Pickups</h2>
      <Calendar
        tileContent={tileContent}
      />
      <ul style={{ marginTop: "1.5rem" }}>
        {upcomingPickups.map((pickup, idx) => (
          <li key={idx} style={{ marginBottom: "0.5rem" }}>
            <strong>{pickup.date.toLocaleDateString()}</strong> - {pickup.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverSchedule;
