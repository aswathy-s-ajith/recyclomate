import React, { useEffect, useState } from 'react';
import { Calendar, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' },
  headerContent: { maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  logoIcon: { backgroundColor: '#22c55e', width: '2.5rem', height: '2.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' },
  userSection: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  userName: { color: '#374151' },
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
  scheduleButton: { backgroundColor: '#22c55e', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '500', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' },
  card: { backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem' },
  cardTitle: { fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' },
  statValue: { fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' },
  pickupItem: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' },
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [ecoPoints, setEcoPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user || {});
          setPickups(data.pickups || []);
          setEcoPoints(data.ecoPoints || 0);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [navigate]);

  if (!user) return <div style={{ textAlign: 'center', marginTop: '20%' }}>Loading...</div>;

  const upcomingPickups = pickups.filter(p => p.status === 'Pending');
  const completedPickups = pickups.filter(p => p.status === 'Completed');

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
          <div style={styles.userSection}>
            <span style={styles.userName}>Hi, {user.username || 'User'}</span>
            <div style={styles.userAvatarContainer}>
              <div style={styles.userAvatar} onClick={() => setShowDropdown(!showDropdown)}>
                <span style={styles.avatarText}>{user.username?.[0]?.toUpperCase() || 'U'}</span>
              </div>
              {showDropdown && (
                <div style={styles.dropdown}>
                  <button style={styles.dropdownButton} onClick={() => { setShowDropdown(false); navigate('/edit-profile'); }}>Edit Profile</button>
                  <button style={styles.dropdownButton} onClick={() => { setShowDropdown(false); localStorage.removeItem('token'); navigate('/login'); }}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.gridContainer}>
          {/* Welcome Section */}
          <div style={styles.welcomeSection}>
            <h2 style={styles.welcomeTitle}>Welcome back, {user.username || 'User'}!</h2>
            <p style={styles.welcomeSubtext}>Ready to recycle smart today</p>
            <button style={styles.scheduleButton} onClick={() => navigate('/schedule')}>Schedule Pickup</button>
          </div>

          {/* Upcoming Pickups */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Upcoming Pickups</h3>
            {upcomingPickups.length > 0 ? upcomingPickups.map((pickup, index) => (
              <div key={index} style={styles.pickupItem}>
                <Calendar />
                <div>
                  <p>Type: {pickup.type || '-'}</p>
                  <p>Address: {pickup.address || '-'}</p>
                  <p>Date & Time: {pickup.date ? `${pickup.date}, ${pickup.time || '-'}` : '-'}</p>
                </div>
              </div>
            )) : <p>No upcoming pickups</p>}
          </div>

          {/* Completed Pickups */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Completed Pickups</h3>
            {completedPickups.length > 0 ? completedPickups.map((pickup, index) => (
              <div key={index} style={styles.pickupItem}>
                <Calendar />
                <div>
                  <p>Type: {pickup.type || '-'}</p>
                  <p>Address: {pickup.address || '-'}</p>
                  <p>Date & Time: {pickup.date ? `${pickup.date}, ${pickup.time || '-'}` : '-'}</p>
                </div>
              </div>
            )) : <p>No completed pickups yet</p>}
          </div>

          {/* Eco Points */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Eco Points</h3>
            <p style={styles.statValue}>{ecoPoints}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
