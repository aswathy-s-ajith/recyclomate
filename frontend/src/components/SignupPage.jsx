import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  signupContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f2f5',
  },
  signupHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  logoText: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#333',
  },
  signupTitle: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#333',
  },
  signupForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  signupInput: {
    width: '100%',
    padding: '15px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  signupButton: {
    padding: '15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  errorMessage: { color: 'red', marginBottom: '10px', textAlign: 'center' },
  successMessage: { color: 'green', marginBottom: '10px', textAlign: 'center' },
  loginRow: { marginTop: '14px', textAlign: 'center', fontSize: '14px', color: '#555' },
  loginLink: { marginLeft: '6px', color: '#4CAF50', textDecoration: 'none', fontWeight: '600' },
  roleSelect: { width: '100%', padding: '15px', fontSize: '1em', borderRadius: '8px', marginBottom: '20px' },
};

const Signup = () => {
  const [role, setRole] = useState('user'); // user or agent
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    address: '',
    vehicleNumber: '',
    licenseNumber: '',
    vehicleType: '',
    serviceArea: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.username.trim()) return 'Username is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) return 'Invalid email';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';

    if (role === 'agent') {
      if (!formData.vehicleNumber.trim()) return 'Vehicle number is required';
      if (!formData.licenseNumber.trim()) return 'License number is required';
      if (!formData.vehicleType.trim()) return 'Vehicle type is required';
      if (!formData.serviceArea.trim()) return 'Service area is required';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    try {
      const endpoint = role === 'user' ? 'register-user' : 'register-driver';
      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: role === 'user' ? 'User' : 'Driver' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      setSuccess(`✅ ${role === 'user' ? 'User' : 'Driver'} account created successfully!`);
      setFormData({
        email: '',
        username: '',
        password: '',
        phoneNumber: '',
        address: '',
        vehicleNumber: '',
        licenseNumber: '',
        vehicleType: '',
        serviceArea: '',
      });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.signupContainer}>
      <div style={styles.signupHeader}>
        <span role="img" aria-label="Recycling Symbol" style={{ fontSize: '50px', marginRight: '10px' }}>♻️</span>
        <span style={styles.logoText}>RecycloMate</span>
      </div>

      <h2 style={styles.signupTitle}>Sign Up</h2>

      <form onSubmit={handleSubmit} style={styles.signupForm}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {success && <div style={styles.successMessage}>{success}</div>}

        {/* Role Selection */}
        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.roleSelect}>
          <option value="user">User</option>
          <option value="agent">Agent</option>
        </select>

        {/* Common Fields */}
        <div style={styles.inputGroup}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={styles.signupInput} />
        </div>
        <div style={styles.inputGroup}>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required style={styles.signupInput} />
        </div>
        <div style={styles.inputGroup}>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={styles.signupInput} />
        </div>
        <div style={styles.inputGroup}>
          <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} style={styles.signupInput} />
        </div>

        {/* User-only Fields */}
        {role === 'user' && (
          <div style={styles.inputGroup}>
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} style={styles.signupInput} />
          </div>
        )}

        {/* Agent-only Fields */}
        {role === 'agent' && (
          <>
            <div style={styles.inputGroup}>
              <input type="text" name="serviceArea" placeholder="Service Area" value={formData.serviceArea} onChange={handleChange} style={styles.signupInput} />
            </div>
            <div style={styles.inputGroup}>
              <input type="text" name="vehicleNumber" placeholder="Vehicle Number" value={formData.vehicleNumber} onChange={handleChange} style={styles.signupInput} />
            </div>
            <div style={styles.inputGroup}>
              <input type="text" name="licenseNumber" placeholder="License Number" value={formData.licenseNumber} onChange={handleChange} style={styles.signupInput} />
            </div>
            <div style={styles.inputGroup}>
              <input type="text" name="vehicleType" placeholder="Vehicle Type (e.g., Truck, Van, Bike)" value={formData.vehicleType} onChange={handleChange} style={styles.signupInput} />
            </div>
          </>
        )}

        <button type="submit" style={styles.signupButton} disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <div style={styles.loginRow}>
          <span>Already have an account?</span>
          <Link to="/login" style={styles.loginLink}>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;