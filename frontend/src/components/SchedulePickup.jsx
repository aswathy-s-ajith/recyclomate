import React, { useState } from "react";

function SchedulePickup() {
  // Example saved addresses
  const savedAddresses = [
    "123 Main St, City A",
    "456 Park Ave, City B",
    "789 Oak Rd, City C",
  ];

  // Example dates and time slots
  const availableDates = ["2025-10-19", "2025-10-20", "2025-10-21"];
  const timeSlots = ["10:00 AM - 12:00 PM", "02:00 PM - 04:00 PM", "05:00 PM - 07:00 PM"];

  // Waste options without Organic Waste
  const wasteOptions = ["Plastic", "Paper", "Glass", "Metal", "E-Waste"];

  const [selectedWaste, setSelectedWaste] = useState([]);
  const [wasteDetail, setWasteDetail] = useState("");
  const [address, setAddress] = useState(savedAddresses[0]);
  const [pickupDate, setPickupDate] = useState(availableDates[0]);
  const [pickupTime, setPickupTime] = useState(timeSlots[0]);

  const handleCheckboxChange = (waste) => {
    setSelectedWaste((prev) =>
      prev.includes(waste)
        ? prev.filter((item) => item !== waste)
        : [...prev, waste]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submitted Successfully!");
    // No redirect yet
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Schedule Pickup</h2>

      {/* Waste Type Checkboxes */}
      <label>
        Select Waste Type:
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
            maxHeight: "120px",
            overflowY: "auto",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        >
          {wasteOptions.map((waste) => (
            <div key={waste}>
              <input
                type="checkbox"
                id={waste}
                checked={selectedWaste.includes(waste)}
                onChange={() => handleCheckboxChange(waste)}
              />
              <label htmlFor={waste} style={{ marginLeft: "8px" }}>
                {waste}
              </label>
            </div>
          ))}
        </div>
      </label>

      {/* Optional Waste Detail */}
      <label>
        Waste Detail (optional):
        <input
          type="text"
          value={wasteDetail}
          onChange={(e) => setWasteDetail(e.target.value)}
          placeholder="Enter any specific details"
          style={{ width: "100%", padding: "8px", margin: "5px 0 15px 0" }}
        />
      </label>

      {/* Address Dropdown */}
      <label>
        Select Address:
        <select
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "5px 0 15px 0" }}
        >
          {savedAddresses.map((addr, idx) => (
            <option key={idx} value={addr}>
              {addr}
            </option>
          ))}
        </select>
      </label>

      {/* Date Dropdown */}
      <label>
        Select Pickup Date:
        <select
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "5px 0 15px 0" }}
        >
          {availableDates.map((date, idx) => (
            <option key={idx} value={date}>
              {date}
            </option>
          ))}
        </select>
      </label>

      {/* Time Dropdown */}
      <label>
        Select Pickup Time:
        <select
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "5px 0 15px 0" }}
        >
          {timeSlots.map((slot, idx) => (
            <option key={idx} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Schedule Pickup
      </button>

      <div style={{ marginTop: "15px" }}>
        <strong>Selected Waste:</strong> {selectedWaste.join(", ") || "None"}
      </div>
    </form>
  );
}

export default SchedulePickup;
