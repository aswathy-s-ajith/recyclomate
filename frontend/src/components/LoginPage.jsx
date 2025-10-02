import React, { useState } from 'react';

const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f2f5',
  },
  loginHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  logoText: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#333',
  },
  loginTitle: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#333',
  },
  loginForm: {
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
  loginInput: {
    width: '100%',
    padding: '15px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  loginSelect: {
    width: '100%',
    padding: '15px',
    fontSize: '1em',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23888"><path d="M7 10l5 5 5-5z"/></svg>')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '15px',
  },
  loginButton: {
    padding: '15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  loginButtonHover: {
    backgroundColor: '#45a049',
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('User');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password, userType });
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginHeader}>
        {/* You need a logo component or image here. Using a placeholder for now. */}
        <span role="img" aria-label="Recycling Symbol" style={{ fontSize: '50px', marginRight: '10px' }}>♻️</span>
        <span style={styles.logoText}>RecycloMate</span>
      </div>
      <h2 style={styles.loginTitle}>Login</h2>
      <form onSubmit={handleLogin} style={styles.loginForm}>
        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.loginInput}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.loginInput}
          />
        </div>
        <div style={styles.inputGroup}>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            style={styles.loginSelect}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Agent">Agent</option>
          </select>
        </div>
        <button type="submit" style={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;