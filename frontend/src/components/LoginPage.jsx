import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
  signupRow: {
    marginTop: '14px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
  },
  signupLink: {
    marginLeft: '6px',
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('User');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, userType })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      setSuccess("✅ Login successful!");
      console.log("User logged in:", data);

      // Store JWT in localStorage (optional, if backend returns a token)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginHeader}>
        <span role="img" aria-label="Recycling Symbol" style={{ fontSize: '50px', marginRight: '10px' }}>♻️</span>
        <span style={styles.logoText}>RecycloMate</span>
      </div>
      <h2 style={styles.loginTitle}>Login</h2>
      <form onSubmit={handleLogin} style={styles.loginForm}>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {success && <div style={styles.successMessage}>{success}</div>}

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <div style={styles.signupRow}>
          <span>Dont have an account ?</span>
          <Link to="/register-user" style={styles.signupLink}>Sign up .</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
