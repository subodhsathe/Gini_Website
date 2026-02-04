import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ token, onLogout }) => {
  const [topQuestions, setTopQuestions] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopItems();
  }, []);

  const fetchTopItems = async () => {
    try {
      setLoading(true);
      const [questionsRes, songsRes] = await Promise.all([
        axios.get('/api/questions/top'),
        axios.get('/api/songs/top'),
      ]);
      setTopQuestions(questionsRes.data);
      setTopSongs(songsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchTopItems();
  };

  return (
    <div>
      <div className="admin-header">
        <h1>✨ Gini's Dashboard</h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={refreshData}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🔄 Refresh
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            fontSize: '18px',
            color: '#667eea',
          }}
        >
          Loading dashboard...
        </div>
      ) : (
        <div className="dashboard-grid">
          <div className="dashboard-section">
            <h2>🔝 Top 5 Questions</h2>
            {topQuestions.length === 0 ? (
              <p style={{ color: '#999' }}>No questions yet</p>
            ) : (
              topQuestions.map((question, index) => (
                <div
                  key={question._id}
                  style={{
                    padding: '15px',
                    borderBottom: '1px solid #eee',
                    marginBottom: '10px',
                  }}
                >
                  <div
                    style={{
                      background: '#667eea',
                      color: 'white',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px',
                      fontWeight: 'bold',
                    }}
                  >
                    {index + 1}
                  </div>
                  <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    {question.question}
                  </p>
                  <p
                    style={{
                      color: '#667eea',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    ❤️ {question.likes} likes
                  </p>
                  <small style={{ color: '#999' }}>
                    {new Date(question.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))
            )}
          </div>

          <div className="dashboard-section">
            <h2>🔝 Top 5 Song Suggestions</h2>
            {topSongs.length === 0 ? (
              <p style={{ color: '#999' }}>No songs suggested yet</p>
            ) : (
              topSongs.map((song, index) => (
                <div
                  key={song._id}
                  style={{
                    padding: '15px',
                    borderBottom: '1px solid #eee',
                    marginBottom: '10px',
                  }}
                >
                  <div
                    style={{
                      background: '#667eea',
                      color: 'white',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px',
                      fontWeight: 'bold',
                    }}
                  >
                    {index + 1}
                  </div>
                  <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    🎵 {song.songTitle}
                  </p>
                  <p
                    style={{
                      color: '#667eea',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    ❤️ {song.likes} likes
                  </p>
                  <small style={{ color: '#999' }}>
                    {new Date(song.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
