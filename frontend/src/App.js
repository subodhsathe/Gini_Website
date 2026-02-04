import React, { useState, useEffect } from 'react';
import './App.css';
import Questions from './components/Questions';
import Songs from './components/Songs';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import VideoHero from './components/VideoHero';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [adminToken, setAdminToken] = useState(null);

  // Redirect to dashboard when logged in
  useEffect(() => {
    if (adminToken) {
      setCurrentPage('dashboard');
    }
  }, [adminToken]);

  const handleLoginSuccess = (token) => {
    setAdminToken(token);
  };

  const handleLogout = () => {
    setAdminToken(null);
    setCurrentPage('home');
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {adminToken ? (
        <div>
          <nav className="navbar">
            <h1>🎵 GINI</h1>
            <div className="navbar-links">
              <button onClick={() => handleNavigation('dashboard')}>
                Dashboard
              </button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </nav>

          {currentPage === 'dashboard' && (
            <div className="admin-container">
              <AdminDashboard token={adminToken} onLogout={handleLogout} />
            </div>
          )}
        </div>
      ) : (
        <>
          {currentPage === 'login' ? (
            <AdminLogin onLoginSuccess={handleLoginSuccess} />
          ) : (
            <>
              <nav className="navbar">
                <h1>🎵 GINI - Singer Songwriter</h1>
                <div className="navbar-links">
                  <a href="https://www.youtube.com/@thisisgini" target="_blank" rel="noopener noreferrer" className="youtube-link" title="Visit YouTube Channel">
                    <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/this.is.gini/" target="_blank" rel="noopener noreferrer" className="instagram-link" title="Visit Instagram">
                    <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                  </a>
                  <button onClick={() => handleNavigation('home')}>Home</button>
                  <button onClick={() => handleNavigation('login')}>
                    Admin
                  </button>
                </div>
              </nav>

              <div className="container">
                <div className="hero">
                  <div className="hero-content">
                    <h2>✨ GINI ✨</h2>
                    <p>Indie Singer • Songwriter • Artist</p>
                    <p style={{ fontSize: '16px', marginTop: '10px', fontStyle: 'italic' }}>
                      Crafting beautiful melodies and heartfelt stories
                    </p>
                  </div>
                </div>

                <div className="background-section">
                  <VideoHero src="/videos/GiniVideo1.mp4" />
                </div>

                <div className="main-content">
                  <Questions />
                  <Songs />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;

