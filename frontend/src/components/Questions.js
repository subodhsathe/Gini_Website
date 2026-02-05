import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Questions = () => {
  const [formData, setFormData] = useState({
    question: '',
  });
  const [questions, setQuestions] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [loading, setLoading] = useState(false);

  // Initialize user ID on mount
  useEffect(() => {
    if (!userId) {
      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setUserId(newUserId);
      localStorage.setItem('userId', newUserId);
    }
    fetchLatestQuestions();
  }, []);

  const fetchLatestQuestions = async () => {
    try {
      const response = await axios.get('/api/questions/latest');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({
      question: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question.trim()) {
      alert('Please enter your question');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/questions/create', {
        question: formData.question,
      });
      setFormData({ question: '' });
      alert('Question posted successfully!');
      fetchLatestQuestions();
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Error posting question');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (questionId, isLiked) => {
    try {
      if (isLiked) {
        await axios.post(`/api/questions/${questionId}/unlike`, {
          userId,
        });
      } else {
        await axios.post(`/api/questions/${questionId}/like`, {
          userId,
        });
      }
      fetchLatestQuestions();
    } catch (error) {
      console.error('Error updating like:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="section">
      <h2>Ask Gini a Question</h2>

      <h3 style={{"margin-bottom": "24px", "color": "#0000ff"}}>Top 5 questions are sent to Gini's Dashboard!</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Question</label>
          <textarea
            value={formData.question}
            onChange={handleInputChange}
            placeholder="Ask your question here..."
            rows="4"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Question'}
        </button>
      </form>

      <div style={{ marginTop: '40px' }}>
        <h3>Latest Questions ({questions.length}) (max: latest 10)</h3>
        {questions.length === 0 ? (
          <p style={{ color: '#999' }}>No questions yet. Be the first to ask!</p>
        ) : (
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {questions.map((question) => {
              const isLiked = question.likedBy.includes(userId);
              return (
                <div
                  key={question._id}
                  style={{
                    padding: '15px',
                    marginBottom: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <p style={{ marginBottom: '10px', fontSize: '15px', wordBreak: 'break-word' }}>
                    {question.question}
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
                      {new Date(question.createdAt).toLocaleDateString()}
                    </small>
                    <button
                      onClick={() => handleLike(question._id, isLiked)}
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
                      ❤️ {question.likes}
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

export default Questions;
