import React, { useState, useEffect } from "react";
import { Recycle } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '1rem 1.5rem',
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoIcon: {
    backgroundColor: '#22c55e',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#111827',
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  formContainer: {
    maxWidth: '500px',
    width: '100%',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    fontSize: '2em',
    marginBottom: '30px',
    color: '#333',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  checkboxContainer: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '12px',
    maxHeight: '150px',
    overflowY: 'auto',
    marginTop: '8px',
    backgroundColor: '#fafafa',
  },
  checkboxItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 0',
  },
  checkbox: {
    marginRight: '10px',
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  checkboxLabel: {
    cursor: 'pointer',
    color: '#333',
  },
  submitButton: {
    width: '100%',
    padding: '15px',
    marginTop: '25px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: '500',
  },
  selectedWasteBox: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f0f9f0',
    borderRadius: '8px',
    border: '1px solid #c6e6c6',
  },
  selectedWasteLabel: {
    fontWeight: 'bold',
    color: '#2d5f2d',
    marginBottom: '5px',
  },
  selectedWasteText: {
    color: '#555',
  },
};

function SchedulePickup() {
  // Addresses fetched from backend
  const [addresses, setAddresses] = useState([]);

  // Example dates and time slots
  const availableDates = ["2025-10-19", "2025-10-20", "2025-10-21"];
  const timeSlots = ["10:00 AM - 12:00 PM", "02:00 PM - 04:00 PM", "05:00 PM - 07:00 PM"];

<<<<<<< HEAD
  // All waste options including new categories
  const wasteOptions = ["Plastic", "Paper", "Glass", "Metal", "E-Waste", "Organic Waste", "Sanitary Napkin"];
=======
  // Waste options without Organic Waste
  const wasteOptions = ["Plastic", "Paper", "Glass", "Metal", "E-Waste","Sanitary napkin"];
>>>>>>> 8b8cfa5833009a842614db5ddb9568c712fc622f

  const [selectedWaste, setSelectedWaste] = useState([]);
  const [wasteDetail, setWasteDetail] = useState("");
  const [address, setAddress] = useState("");
  // Fetch user addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.user && Array.isArray(data.user.addresses)) {
          setAddresses(data.user.addresses);
          setAddress(data.user.addresses[0] || "");
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };
    fetchAddresses();
  }, []);
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
    const token = localStorage.getItem("token"); // ✅ get token

      if (!token) {
        alert("You must be logged in to schedule a pickup!");
        return;
      }
    const pickupData = {
      type: selectedWaste, // matches backend
      wasteDetail,         // optional
      address,
      date: pickupDate,
      time: pickupTime,
    };
    console.log('Pickup scheduled:', pickupData);
    alert("Pickup Scheduled Successfully!");
    // Add your API call here
    fetch("http://localhost:5000/api/pickups/schedule", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(pickupData),
    });

  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoContainer}>
            <div style={styles.logoIcon}>
              <Recycle style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <h1 style={styles.logoText}>RecycloMate</h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <div style={styles.formWrapper}>
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Schedule Pickup</h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Waste Type *</label>
            <div style={styles.checkboxContainer}>
              {wasteOptions.map((waste) => (
                <div key={waste} style={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id={waste}
                    checked={selectedWaste.includes(waste)}
                    onChange={() => handleCheckboxChange(waste)}
                    style={styles.checkbox}
                  />
                  <label htmlFor={waste} style={styles.checkboxLabel}>
                    {waste}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Waste Detail (optional)</label>
            <input
              type="text"
              value={wasteDetail}
              onChange={(e) => setWasteDetail(e.target.value)}
              placeholder="Enter any specific details"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Address *</label>
            <select
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={styles.select}
              disabled={addresses.length === 0}
            >
              {addresses.length === 0 ? (
                <option value="">No addresses found. Please add an address in your profile.</option>
              ) : (
                addresses.map((addr, idx) => (
                  <option key={idx} value={addr}>
                    {addr}
                  </option>
                ))
              )}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Pickup Date *</label>
            <select
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              style={styles.select}
            >
              {availableDates.map((date, idx) => (
                <option key={idx} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Pickup Time *</label>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              style={styles.select}
            >
              {timeSlots.map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            style={styles.submitButton}
            onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Schedule Pickup
          </button>

          {selectedWaste.length > 0 && (
            <div style={styles.selectedWasteBox}>
              <div style={styles.selectedWasteLabel}>Selected Waste Types:</div>
              <div style={styles.selectedWasteText}>
                {selectedWaste.join(", ")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SchedulePickup;