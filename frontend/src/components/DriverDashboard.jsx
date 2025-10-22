import React, { useEffect, useState } from 'react';
import { Recycle, Bell, Calendar as LucideCalendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NotificationsModal from './NotificationsModal';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' },
  headerContent: { maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  logoIcon: { backgroundColor: '#22c55e', width: '2.5rem', height: '2.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' },
  userSection: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  notificationIcon: { cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', transition: 'background-color 0.2s', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  userAvatarContainer: { position: 'relative' },
  userAvatar: { width: '2.5rem', height: '2.5rem', backgroundColor: '#d1d5db', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  avatarText: { color: '#374151', fontWeight: '600' },
  dropdown: { position: 'absolute', top: '3rem', right: '0', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '0.5rem', padding: '0.5rem', minWidth: '150px', zIndex: 1000 },
  dropdownButton: { width: '100%', padding: '0.75rem 1rem', textAlign: 'left', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '0.875rem', color: '#374151', borderRadius: '0.25rem', transition: 'background-color 0.2s' },
  mainContent: { maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' },
  gridContainer: { display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' },
  welcomeSection: { marginBottom: '1.5rem' },
  welcomeTitle: { fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem', lineHeight: '1.2' },
  welcomeSubtext: { color: '#6b7280', marginBottom: '1.5rem' },
  card: { backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem' },
  cardTitle: { fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' },
  statValue: { fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' },
  pickupItem: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' },
  calendarPickupsContainer: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },
  calendarWrapper: { flex: '1 1 300px' },
  pickupsWrapper: { flex: '2 1 400px' },
  dateHeader: { fontSize: '1rem', fontWeight: '600', color: '#22c55e', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
};

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [driver, setDriver] = useState(null);
  const [assignedPickups, setAssignedPickups] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/drivers/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setDriver(data.driver || {});
        else console.error(data.message);

        const resPickups = await fetch('http://localhost:5000/api/pickups/assigned', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resPickups.ok) {
          const d = await resPickups.json();
          setAssignedPickups(Array.isArray(d) ? d : d.pickups || []);
        }
      } catch (err) {
        console.error('Error fetching driver data:', err);
      }
    };
    fetchData();
  }, [navigate]);

  if (!driver) return <div style={{ textAlign: 'center', marginTop: '20%' }}>Loading...</div>;

  const completedPickups = assignedPickups.filter(p => p.status === 'Completed').length;
  const totalWaste = assignedPickups
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + (Number(p.weight) || 0), 0);
  const efficiency = assignedPickups.length ? ((completedPickups / assignedPickups.length) * 100).toFixed(1) : 'N/A';

  const pickupsForSelectedDate = selectedDate
    ? assignedPickups.filter(p => new Date(p.date).toDateString() === selectedDate.toDateString())
    : assignedPickups;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoContainer}>
            <div style={styles.logoIcon}>
              <Recycle style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <h1 style={styles.logoText}>RecycloMate</h1>
          </div>
          <div style={styles.userSection}>
            <div style={styles.notificationIcon} onClick={() => setShowNotifications(true)}>
              <Bell size={20} color="#374151" />
            </div>
            <NotificationsModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
            <div style={styles.userAvatarContainer}>
              <div style={styles.userAvatar} onClick={() => setShowDropdown(!showDropdown)}>
                <span style={styles.avatarText}>{driver.username?.[0]?.toUpperCase() || 'D'}</span>
              </div>
              {showDropdown && (
                <div style={styles.dropdown}>
                  <button style={styles.dropdownButton} onClick={() => { setShowDropdown(false); navigate('/driver-profile'); }}>Edit Profile</button>
                  <button style={styles.dropdownButton} onClick={() => { setShowDropdown(false); localStorage.removeItem('token'); navigate('/login'); }}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.gridContainer}>
          <div style={styles.welcomeSection}>
            <h2 style={styles.welcomeTitle}>Welcome back, {driver.username || 'Driver'}!</h2>
            <p style={styles.welcomeSubtext}>Ready for your next collection?</p>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ ...styles.card, flex: '1 1 200px' }}>
              <h3 style={styles.cardTitle}>Completed Pickups</h3>
              <p style={styles.statValue}>{completedPickups}</p>
            </div>
            <div style={{ ...styles.card, flex: '1 1 200px' }}>
              <h3 style={styles.cardTitle}>Total Waste Collected (kg)</h3>
              <p style={styles.statValue}>{totalWaste}</p>
            </div>
            <div style={{ ...styles.card, flex: '1 1 200px' }}>
              <h3 style={styles.cardTitle}>Efficiency</h3>
              <p style={styles.statValue}>{efficiency !== 'N/A' ? `${efficiency}%` : 'N/A'}</p>
            </div>
          </div>

          {/* Calendar + Pickups combined */}
          <div style={{ ...styles.card, ...styles.calendarPickupsContainer }}>
            <div style={styles.calendarWrapper}>
              <h3 style={styles.cardTitle}>Schedule Overview</h3>
              <Calendar
                onClickDay={date => setSelectedDate(date)}
                value={selectedDate}
                tileContent={({ date, view }) => {
                  if (view === 'month') {
                    const hasPickup = assignedPickups.some(p => new Date(p.date).toDateString() === date.toDateString());
                    return hasPickup ? <span role="img" aria-label="pickup" style={{ color: 'green', fontSize: '1.2em' }}>🛻</span> : null;
                  }
                  return null;
                }}
              />
            </div>

            <div style={styles.pickupsWrapper}>
              <h3 style={styles.cardTitle}>My Pickups</h3>
              {selectedDate && (
                <div style={styles.dateHeader}>
                  <LucideCalendar size={18} />
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              )}
              {pickupsForSelectedDate.length > 0 ? pickupsForSelectedDate.map((pickup, i) => (
                <div key={i} style={{ ...styles.pickupItem, flexDirection: 'column', alignItems: 'flex-start' }}>
                  <p><strong>Location:</strong> {pickup.address || pickup.location || '-'}</p>
                  <p><strong>Status:</strong> {pickup.status || '-'}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {['Accepted', 'In Progress', 'Completed'].map(status => (
                      <button
                        key={status}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.25rem',
                          border: 'none',
                          backgroundColor: pickup.status === status ? '#22c55e' : '#e5e7eb',
                          color: pickup.status === status ? 'white' : '#374151',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onClick={async () => {
                          const token = localStorage.getItem('token');
                          try {
                            const res = await fetch(`http://localhost:5000/api/pickups/${pickup._id}/status`, {
                              method: 'PATCH',
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify({ status }),
                            });
                            if (res.ok) {
                              setAssignedPickups(prev => prev.map(p => p._id === pickup._id ? { ...p, status } : p));
                            }
                          } catch (err) {
                            console.error('Failed to update status:', err);
                          }
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )) : <p>No pickups{selectedDate ? ' on this date' : ''}</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;