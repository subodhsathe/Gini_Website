import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Songs = () => {
  const [formData, setFormData] = useState({
    songTitle: '',
  });
  const [songs, setSongs] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [loading, setLoading] = useState(false);

  // Initialize user ID on mount
  useEffect(() => {
    if (!userId) {
      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setUserId(newUserId);
      localStorage.setItem('userId', newUserId);
    }
    fetchLatestSongs();
  }, []);

  const fetchLatestSongs = async () => {
    try {
      const response = await axios.get('/api/songs/latest');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({
      songTitle: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.songTitle.trim()) {
      alert('Please enter a song title');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/songs/create', {
        songTitle: formData.songTitle,
      });
      setFormData({ songTitle: '' });
      alert('Song suggestion posted successfully!');
      fetchLatestSongs();
    } catch (error) {
      console.error('Error creating song:', error);
      alert('Error posting song');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (songId, isLiked) => {
    try {
      if (isLiked) {
        await axios.post(`/api/songs/${songId}/unlike`, {
          userId,
        });
      } else {
        await axios.post(`/api/songs/${songId}/like`, {
          userId,
        });
      }
      fetchLatestSongs();
    } catch (error) {
      console.error('Error updating like:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="section">
      <h2>Suggest a Song to Gini</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Song Title</label>
          <input
            type="text"
            value={formData.songTitle}
            onChange={handleInputChange}
            placeholder="Enter song title..."
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Posting...' : 'Suggest Song'}
        </button>
      </form>

      <div style={{ marginTop: '40px' }}>
        <h3>Latest Suggestions ({songs.length})</h3>
        {songs.length === 0 ? (
          <p style={{ color: '#999' }}>No songs suggested yet. Be the first!</p>
        ) : (
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {songs.map((song) => {
              const isLiked = song.likedBy.includes(userId);
              return (
                <div
                  key={song._id}
                  style={{
                    padding: '15px',
                    marginBottom: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <p style={{ marginBottom: '10px', fontSize: '15px', fontWeight: 'bold', wordBreak: 'break-word' }}>
                    🎵 {song.songTitle}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <small style={{ color: '#999', flex: '1 1 auto' }}>
                      {new Date(song.createdAt).toLocaleDateString()}
                    </small>
                    <button
                      onClick={() => handleLike(song._id, isLiked)}
                      style={{
                        background: isLiked ? '#667eea' : '#f0f0f0',
                        color: isLiked ? 'white' : '#333',
                        border: 'none',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        flex: '0 0 auto',
                      }}
                    >
                      ❤️ {song.likes}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Songs;
