import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Leaf, Recycle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  logoIcon: {
    backgroundColor: '#22c55e',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' },
  userSection: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  userName: { color: '#374151' },
  userAvatar: {
    width: '2.5rem',
    height: '2.5rem',
    backgroundColor: '#d1d5db',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#374151', fontWeight: '600' },
  mainContent: { maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' },
  gridContainer: { display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' },
  welcomeSection: { marginBottom: '1.5rem' },
  welcomeTitle: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '0.5rem',
    lineHeight: '1.2',
  },
  welcomeSubtext: { color: '#6b7280', marginBottom: '1.5rem' },
  scheduleButton: {
    backgroundColor: '#22c55e',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: { fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  statCardContent: { display: 'flex', alignItems: 'center', gap: '1rem' },
  statIcon: {
    backgroundColor: '#22c55e',
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: { color: '#6b7280', fontSize: '0.875rem' },
  statValue: { fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' },
  pickupItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' },
  pickupIcon: {
    backgroundColor: '#dcfce7',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  pickupLabel: { fontSize: '0.875rem', color: '#6b7280' },
  pickupValue: { fontWeight: '500', color: '#111827' },
  viewAllButton: {
    color: '#22c55e',
    fontWeight: '500',
    marginTop: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' },
  nextPickupCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
  },
  nextPickupContent: { display: 'flex', alignItems: 'center', gap: '1rem' },
  nextPickupText: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#111827',
  },
  ecoImpactContent: { display: 'flex', alignItems: 'center', gap: '2rem' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' },
  legendDot: { width: '1rem', height: '1rem', borderRadius: '50%' },
  chartContainer: { position: 'relative', width: '12rem', height: '12rem' },
  userAvatarContainer: {
    position: 'relative',
  },
  userAvatar: {
    width: '2.5rem',
    height: '2.5rem',
    backgroundColor: '#d1d5db',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  dropdown: {
    position: 'absolute',
    top: '3rem',
    right: '0',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    minWidth: '150px',
    zIndex: 1000,
  },
  dropdownButton: {
    width: '100%',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: '#374151',
    borderRadius: '0.25rem',
    transition: 'background-color 0.2s',
  },
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [nextPickup, setNextPickup] = useState(null);
  const [ecoImpact, setEcoImpact] = useState(null);

  // Fetch logged-in user data
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
          setUser(data.user);
          setNextPickup(data.nextPickup);
          setEcoImpact(data.ecoImpact);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [navigate]);

  if (!user || !nextPickup || !ecoImpact) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}>Loading...</div>;
  }

  const StatCard = ({ icon: Icon, label, value }) => (
    <div style={styles.statCard}>
      <div style={styles.statCardContent}>
        <div style={styles.statIcon}>
          <Icon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
        </div>
        <div>
          <p style={styles.statLabel}>{label}</p>
          <p style={styles.statValue}>{value}</p>
        </div>
      </div>
    </div>
  );

  const total = ecoImpact.plastic + ecoImpact.paper + ecoImpact.glass;
  const plasticPercent = (ecoImpact.plastic / total) * 100;
  const paperPercent = (ecoImpact.paper / total) * 100;
  const glassPercent = (ecoImpact.glass / total) * 100;

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
          <span style={styles.userName}>Hi, {user.name}</span>
    <div style={styles.userAvatarContainer}>
      <div 
        style={styles.userAvatar}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span style={styles.avatarText}>A</span>
      </div>
      {showDropdown && (
        <div style={styles.dropdown}>
          <button
            style={styles.dropdownButton}
            onClick={() => {
              setShowDropdown(false);
              navigate('/edit-profile');
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Edit Profile
          </button>
          <button
            style={styles.dropdownButton}
            onClick={() => {
              setShowDropdown(false);
              // Clear any auth tokens/user data here
              localStorage.removeItem('token'); // if you're using localStorage
              navigate('/');
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Logout
          </button>
        </div>
      )}
    </div>
</div>
        </div>
      </header>

      <main style={styles.mainContent}>
        <div style={{ ...styles.gridContainer, gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 1fr' : '1fr' }}>
          {/* Left Column */}
          <div>
            <div style={styles.welcomeSection}>
              <h2 style={styles.welcomeTitle}>
                Welcome back,<br />{user.username}!
              </h2>
              <p style={styles.welcomeSubtext}>Ready to recycle smart today</p>
              <button
                style={styles.scheduleButton}
                onClick={() => navigate('/schedule')}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#16a34a')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#22c55e')}
              >
                Schedule a New Pickup
              </button>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Upcoming Pickup</h3>
              <div>
                <div style={styles.pickupItem}>
                  <div style={styles.pickupIcon}>
                    <Recycle style={{ width: '1.25rem', height: '1.25rem', color: '#16a34a' }} />
                  </div>
                  <div>
                    <p style={styles.pickupLabel}>Type</p>
                    <p style={styles.pickupValue}>{nextPickup.type}</p>
                  </div>
                </div>
                <div style={styles.pickupItem}>
                  <div style={styles.pickupIcon}>
                    <MapPin style={{ width: '1.25rem', height: '1.25rem', color: '#16a34a' }} />
                  </div>
                  <div>
                    <p style={styles.pickupLabel}>Address</p>
                    <p style={styles.pickupValue}>{nextPickup.address}</p>
                  </div>
                </div>
                <div style={styles.pickupItem}>
                  <div style={styles.pickupIcon}>
                    <Calendar style={{ width: '1.25rem', height: '1.25rem', color: '#16a34a' }} />
                  </div>
                  <div>
                    <p style={styles.pickupLabel}>Date & Time</p>
                    <p style={styles.pickupValue}>
                      {nextPickup.date}, {nextPickup.time}
                    </p>
                  </div>
                </div>
              </div>
              <button
                style={styles.viewAllButton}
                onMouseOver={(e) => (e.target.style.color = '#16a34a')}
                onMouseOut={(e) => (e.target.style.color = '#22c55e')}
              >
                View All Pickups
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={styles.statsGrid}>
              <StatCard icon={Recycle} label="Total Pickups" value={user.totalPickups || 0} />
              <StatCard icon={Leaf} label="Eco Points" value={user.ecoPoints || 0} />
            </div>

            <div style={styles.nextPickupCard}>
              <div style={styles.nextPickupContent}>
                <div style={styles.statIcon}>
                  <Calendar style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={styles.statLabel}>Next Pickup</p>
                  <p style={styles.nextPickupText}>
                    {nextPickup.date} <X style={{ width: '1.25rem', height: '1.25rem' }} /> {nextPickup.time}
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Your Eco Impact</h3>
              <div style={styles.ecoImpactContent}>
                <div style={{ flex: 1 }}>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendDot, backgroundColor: '#22c55e' }}></div>
                    <span style={{ color: '#374151' }}>Plastic</span>
                  </div>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendDot, backgroundColor: '#2dd4bf' }}></div>
                    <span style={{ color: '#374151' }}>Paper</span>
                  </div>
                  <div style={styles.legendItem}>
                    <div style={{ ...styles.legendDot, backgroundColor: '#fb923c' }}></div>
                    <span style={{ color: '#374151' }}>Glass</span>
                  </div>
                </div>
                <div style={styles.chartContainer}>
                  <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20"
                      strokeDasharray={`${plasticPercent * 2.51} ${251 - plasticPercent * 2.51}`} />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2dd4bf" strokeWidth="20"
                      strokeDasharray={`${paperPercent * 2.51} ${251 - paperPercent * 2.51}`}
                      strokeDashoffset={-plasticPercent * 2.51} />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#fb923c" strokeWidth="20"
                      strokeDasharray={`${glassPercent * 2.51} ${251 - glassPercent * 2.51}`}
                      strokeDashoffset={-(plasticPercent + paperPercent) * 2.51} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
