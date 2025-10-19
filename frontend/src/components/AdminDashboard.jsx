import React, { useState, useEffect } from 'react';
import { Recycle, Users, Truck, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

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
    maxWidth: '1400px',
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
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  userName: {
    color: '#374151',
  },
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
  avatarText: {
    color: '#374151',
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '480px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  modalCloseButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.1rem',
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
  mainContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },
  pageTitle: {
    fontSize: '2.5em',
    marginBottom: '30px',
    color: '#333',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  statIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    color: '#6b7280',
    fontSize: '0.9em',
    marginBottom: '5px',
  },
  statValue: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#111827',
  },
  tabContainer: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
    borderBottom: '2px solid #e5e7eb',
  },
  tab: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '3px solid transparent',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: '500',
    color: '#6b7280',
    transition: 'all 0.3s',
  },
  activeTab: {
    color: '#4CAF50',
    borderBottomColor: '#4CAF50',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '1.5em',
    marginBottom: '20px',
    color: '#333',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    borderBottom: '2px solid #4CAF50',
  },
  tableHeaderCell: {
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb',
  },
  tableCell: {
    padding: '12px',
    color: '#555',
  },
  select: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '0.9em',
    cursor: 'pointer',
    backgroundColor: 'white',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: '500',
    marginRight: '8px',
  },
  dangerButton: {
    padding: '8px 16px',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontWeight: '500',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.85em',
    fontWeight: '600',
  },
  pendingBadge: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
  },
  completedBadge: {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
  },
  availableBadge: {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
  },
  unavailableBadge: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
};

function AdminDashboard() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // dynamic state
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    pendingPickups: 0,
    completedPickups: 0,
  });

  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [pickups, setPickups] = useState([
    { id: 1, type: 'Plastic', user: 'john_doe', date: '2025-10-20', status: 'Pending', assignedDriver: null },
    { id: 2, type: 'Paper', user: 'jane_smith', date: '2025-10-19', status: 'Pending', assignedDriver: null },
    { id: 3, type: 'Glass', user: 'bob_wilson', date: '2025-10-18', status: 'Completed', assignedDriver: 'Mike Johnson' },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [usersRes, driversRes, pickupsRes] = await Promise.all([
          fetch('http://localhost:5000/api/users/admin/users', { headers }),
          fetch('http://localhost:5000/api/users/admin/drivers', { headers }),
          fetch('http://localhost:5000/api/users/admin/pickups', { headers }),
        ]);

        if (!usersRes.ok) {
          const uErr = await usersRes.json().catch(() => ({}));
          throw new Error(uErr.message || 'Failed to fetch users');
        }
        if (!driversRes.ok) {
          const dErr = await driversRes.json().catch(() => ({}));
          throw new Error(dErr.message || 'Failed to fetch drivers');
        }

  const usersData = await usersRes.json();
  const driversData = await driversRes.json();
  const pickupsData = await pickupsRes.json();

  setUsers(usersData.users || []);
  setDrivers(driversData.drivers || []);
  setPickups(pickupsData.pickups || []);

        // Update stats from fetched data
        setStats(prev => ({
          ...prev,
          totalUsers: (usersData.users || []).length,
          totalDrivers: (driversData.drivers || []).length,
        }));
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError(err.message || 'Failed to fetch admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
  };

  const handleAssignDriver = async (pickupId, driverId) => {
    try {
      // find driver by id
      const driver = drivers.find(d => d.id === driverId);
      if (!driver) return alert('Driver not found');

      const token = localStorage.getItem('token');
      // NOTE: backend route is mounted at /api/users/admin/:pickupId/assign
      const res = await fetch(`http://localhost:5000/api/users/admin/${pickupId}/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ driverId: driver.id }),
      });

      const contentType = res.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        // fallback: read text and show a friendly error (prevents JSON parse of HTML)
        const text = await res.text();
        throw new Error(`Server returned non-JSON response: ${text.slice(0, 200)}`);
      }

      if (!res.ok) {
        throw new Error(data.message || 'Assign failed');
      }

      const updated = data.pickup || data;
      // prefer driver.id (or _id) as the assigned value so select value matches
      const assignedValue = driver.id || driver._id;
      // Update the pickup in local state. Support both `id` and `_id` shapes and compare as strings.
      setPickups(prev => prev.map(p => {
        const pId = p.id || p._id;
        const updatedId = updated.id || updated._id;
        if (pId && updatedId && String(pId) === String(updatedId)) {
          return { ...updated, assignedDriver: assignedValue };
        }
        return p;
      }));
    } catch (err) {
      console.error('Error assigning driver:', err);
      alert(err.message || 'Error assigning driver');
    }
  };

  const handleStatusUpdate = (pickupId, newStatus) => {
    // Call backend to mark completed
    if (newStatus === 'Completed') {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:5000/api/pickups/${pickupId}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({}),
      })
        .then(async res => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Complete failed');
          // update pickup status locally
          setPickups(prev => prev.map(p => p.id === data.pickup._id ? { ...p, status: 'Completed' } : p));
        })
        .catch(err => alert(err.message || 'Error updating status'));
    } else {
      setPickups(pickups.map(p => p.id === pickupId ? { ...p, status: newStatus } : p));
    }
  };

  // Helper: given a pickup.assignedDriver (which may be username, id, or object), return driver id or ''
  const getAssignedDriverId = (pickup) => {
    const a = pickup.assignedDriver;
    if (!a) return '';
    // object case
    if (typeof a === 'object') return a.id || a._id || '';
    // string case: if matches one of our drivers' ids, return that
    const byId = drivers.find(d => String(d.id) === String(a) || String(d._id) === String(a));
    if (byId) return String(byId.id || byId._id);
    // string case: if matches a driver's name/username, return that driver's id
    const byName = drivers.find(d => String(d.name) === String(a) || String(d.username) === String(a));
    if (byName) return String(byName.id || byName._id);
    // otherwise, if it looks like an ObjectId, return it
    if (/^[0-9a-fA-F]{24}$/.test(String(a))) return String(a);
    return '';
  };

  const getAssignedDriverName = (pickup) => {
    const a = pickup.assignedDriver;
    if (!a) return 'N/A';
    if (typeof a === 'object') return a.username || a.name || String(a.id || a._id);
    // string: check drivers list first
    const byId = drivers.find(d => String(d.id) === String(a) || String(d._id) === String(a));
    if (byId) return byId.name || byId.username || String(byId.id);
    // check by name
    const byName = drivers.find(d => String(d.name) === String(a) || String(d.username) === String(a));
    if (byName) return byName.name || byName.username;
    // otherwise assume it's already a username string
    return String(a);
  };

  const renderOverview = () => (
    <>
      <h2 style={styles.pageTitle}>Admin Dashboard Overview</h2>
      {loading && <p>Loading admin data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#dbeafe' }}>
            <Users style={{ width: '30px', height: '30px', color: '#2563eb' }} />
          </div>
          <div style={styles.statInfo}>
            <p style={styles.statLabel}>Total Users</p>
            <p style={styles.statValue}>{stats.totalUsers}</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#dcfce7' }}>
            <Truck style={{ width: '30px', height: '30px', color: '#16a34a' }} />
          </div>
          <div style={styles.statInfo}>
            <p style={styles.statLabel}>Total Drivers</p>
            <p style={styles.statValue}>{stats.totalDrivers}</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#fef3c7' }}>
            <Clock style={{ width: '30px', height: '30px', color: '#d97706' }} />
          </div>
          <div style={styles.statInfo}>
            <p style={styles.statLabel}>Pending Pickups</p>
            <p style={styles.statValue}>{pickups.filter(p=>p.status && p.status.toLowerCase()==='pending').length || stats.pendingPickups}</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#dcfce7' }}>
            <CheckCircle style={{ width: '30px', height: '30px', color: '#16a34a' }} />
          </div>
          <div style={styles.statInfo}>
            <p style={styles.statLabel}>Completed Pickups</p>
            <p style={styles.statValue}>{pickups.filter(p=>p.status && p.status.toLowerCase()==='completed').length || stats.completedPickups}</p>
          </div>
        </div>
      </div>
    </>
  );

  const renderUsers = () => (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Users Management</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>ID</th>
              <th style={styles.tableHeaderCell}>Username</th>
              <th style={styles.tableHeaderCell}>Email</th>
              <th style={styles.tableHeaderCell}>Eco Points</th>
              <th style={styles.tableHeaderCell}>Pickups</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{user.id}</td>
                <td style={styles.tableCell}>{user.username}</td>
                <td style={styles.tableCell}>{user.email}</td>
                <td style={styles.tableCell}>{user.ecoPoints}</td>
                <td style={styles.tableCell}>{user.pickups}</td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.button}
                    onClick={() => { setSelectedUser(user); setShowUserModal(true); }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDrivers = () => (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Drivers Management</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>ID</th>
              <th style={styles.tableHeaderCell}>Name</th>
              <th style={styles.tableHeaderCell}>Assigned Pickups</th>
              <th style={styles.tableHeaderCell}>Availability</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{driver.id}</td>
                <td style={styles.tableCell}>{driver.name}</td>
                <td style={styles.tableCell}>{driver.assignedPickups}</td>
                <td style={styles.tableCell}>
                  <span style={{
                    ...styles.statusBadge,
                    ...(driver.available ? styles.availableBadge : styles.unavailableBadge)
                  }}>
                    {driver.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.button}
                    onClick={() => alert(`Edit ${driver.name}`)}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.dangerButton}
                    onClick={() => alert(`Remove ${driver.name}`)}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPickups = () => (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Pickups Management</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>ID</th>
              <th style={styles.tableHeaderCell}>Type</th>
              <th style={styles.tableHeaderCell}>User</th>
              <th style={styles.tableHeaderCell}>Date</th>
              <th style={styles.tableHeaderCell}>Status</th>
              <th style={styles.tableHeaderCell}>Assigned Driver</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pickups.map((pickup) => (
              <tr key={pickup.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{pickup.id}</td>
                <td style={styles.tableCell}>{pickup.type}</td>
                <td style={styles.tableCell}>{pickup.user}</td>
                <td style={styles.tableCell}>{pickup.date}</td>
                <td style={styles.tableCell}>
                  <span style={{
                    ...styles.statusBadge,
                    ...(pickup.status === 'Completed' ? styles.completedBadge : styles.pendingBadge)
                  }}>
                    {pickup.status}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  {pickup.status === 'Pending' ? (
                    <select
                      style={styles.select}
                      value={getAssignedDriverId(pickup)}
                      onChange={(e) => handleAssignDriver(pickup.id, e.target.value)}
                    >
                      <option value="">Select Driver</option>
                      {drivers.filter(d => d.available).map((driver) => (
                        <option key={driver.id} value={String(driver.id || driver._id)}>
                          {driver.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    getAssignedDriverName(pickup)
                  )}
                </td>
                <td style={styles.tableCell}>
                  {pickup.status === 'Pending' && (
                    <button
                      style={styles.button}
                      onClick={() => handleStatusUpdate(pickup.id, 'Completed')}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                    >
                      Complete
                    </button>
                  )}
                  <button
                    style={styles.dangerButton}
                    onClick={() => alert(`Cancel pickup ${pickup.id}`)}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoContainer}>
            <div style={styles.logoIcon}>
              <Recycle style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
            </div>
            <h1 style={styles.logoText}>RecycloMate Admin</h1>
          </div>
          <div style={styles.userSection}>
            <span style={styles.userName}>Hi, Admin</span>
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
                      handleLogout();
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
        {/* Tabs */}
        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'overview' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'users' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'drivers' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('drivers')}
          >
            Drivers
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'pickups' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('pickups')}
          >
            Pickups
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'drivers' && renderDrivers()}
        {activeTab === 'pickups' && renderPickups()}
      </main>
      {/* User details modal */}
      {showUserModal && selectedUser && (
        <div style={styles.modalOverlay} onClick={() => setShowUserModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0 }}>{selectedUser.username}</h3>
              <button style={styles.modalCloseButton} onClick={() => setShowUserModal(false)}>✕</button>
            </div>
            <div>
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Eco Points:</strong> {selectedUser.ecoPoints}</p>
              <p><strong>Pickups:</strong> {selectedUser.pickups}</p>
            </div>
            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <button
                style={styles.button}
                onClick={() => setShowUserModal(false)}
                onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;