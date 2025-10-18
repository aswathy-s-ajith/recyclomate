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
  errorMessage: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    marginBottom: '10px',
    textAlign: 'center',
  },
  loginRow: {
    marginTop: '14px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
  },
  loginLink: {
    marginLeft: '6px',
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

const SignupUser = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'User', // 👈 fixed role
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
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      setSuccess('✅ Account created successfully! You can now log in.');
      setFormData({
        email: '',
        username: '',
        password: '',
        phoneNumber: '',
        address: '',
        role: 'User',
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

      <h2 style={styles.signupTitle}>Sign Up as User</h2>

      <form onSubmit={handleSubmit} style={styles.signupForm}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {success && <div style={styles.successMessage}>{success}</div>}

        <div style={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.signupInput}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.signupInput}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.signupInput}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={styles.signupInput}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={styles.signupInput}
          />
        </div>

        <div style={styles.inputGroup}>
            <label style={{ marginBottom: '5px', color: '#555', fontWeight: '500' }}>Role</label>
            <input
                type="text"
                name="role"
                value="User"
                readOnly // 👈 prevents editing
                style={{
                ...styles.signupInput,
                backgroundColor: '#e9ecef', // light gray to indicate read-only
                cursor: 'not-allowed'
                }}
            />
        </div>

        

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

export default SignupUser;
