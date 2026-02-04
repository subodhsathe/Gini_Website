const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const songRoutes = require('./routes/songRoutes');

dotenv.config();

const app = express();

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:3000',
  'https://gini-website.onrender.com',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/songs', songRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'frontend', 'build');
  app.use(express.static(buildPath));

  // For client-side routing, send index.html for unknown routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🎵 Gini Server running on port ${PORT}`);
});

// In development, redirect unknown routes to the CRA dev server if available
if (process.env.NODE_ENV !== 'production') {
  const http = require('http');

  const checkPort = (port) => new Promise((resolve) => {
    const options = { hostname: '127.0.0.1', port, path: '/', method: 'GET', timeout: 500 };
    const req = http.request(options, (res) => {
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });

  app.use(async (req, res, next) => {
    // If any API route matched, skip
    if (req.path.startsWith('/api')) return next();

    const portsToTry = [3000, 5000, 5001];
    for (const p of portsToTry) {
      // skip the server port itself
      if (Number(p) === Number(PORT)) continue;
      // eslint-disable-next-line no-await-in-loop
      const ok = await checkPort(p);
      if (ok) {
        const target = `http://localhost:${p}${req.originalUrl}`;
        return res.redirect(target);
      }
    }

    // No frontend detected, respond with helpful message
    res.status(502).send('Frontend dev server not found. Start the client with `npm run client`.');
  });
}
