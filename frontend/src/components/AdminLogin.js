import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { password });
      localStorage.setItem('adminToken', response.data.token);
      onLoginSuccess(response.data.token);
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>🎵 Gini's Dashboard</h2>
        <h3 style={{"margin-bottom": "24px", "color": "#0000ff"}}>Only Gini can login to this dashboard</h3>
        {error && <p style={{ color: '#ff6b6b', marginBottom: '20px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the password"
              disabled={loading}
              autoFocus
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
