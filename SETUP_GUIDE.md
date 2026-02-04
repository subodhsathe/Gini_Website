# 🎵 Gini Website - Complete Setup Guide

## Step 1: MongoDB Atlas Setup (IMPORTANT!)

### Create MongoDB Project and Cluster

1. **Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**

2. **Sign In with Google**
   - Email: `subodhssathe@gmail.com`
   - Password: `subodh1234`

3. **Create a New Project**
   - Click **Create Project**
   - Name: `gini_website`
   - Click **Create Project**

4. **Create a Cluster**
   - Click **Create Cluster** (or **Create Database**)
   - Choose **M0 Free** tier
   - Cloud Provider: **AWS**
   - Region: Select closest to you (e.g., ap-south-1 for India)
   - Cluster Name: `GiniCluster`
   - Click **Create Cluster**
   - Wait 2-3 minutes for deployment

5. **Create Database User**
   - Go to **Security → Database Access**
   - Click **+ Add New Database User**
   - Username: `gini_admin`
   - Password: `Gini@Admin123`
   - Click **Add User**

6. **Whitelist Your IP**
   - Go to **Security → Network Access**
   - Click **+ Add IP Address**
   - Click **Add Current IP Address**
   - Or manually add your IP

7. **Get Connection String**
   - Click **Databases** → Your Cluster → **Connect**
   - Select **Drivers**
   - Copy the connection string
   - Replace `<username>:<password>@` with `gini_admin:Gini%40Admin123@`
   - Replace `<dbname>` with `gini_website`

8. **Update server/.env**
   ```
   MONGODB_URI=mongodb+srv://gini_admin:Gini%40Admin123@GiniCluster.xxxxx.mongodb.net/gini_website?retryWrites=true&w=majority
   ```
   Replace `xxxxx` with your actual cluster ID.

---

## Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

---

## Step 3: Start the Project

### Terminal 1 - Start Backend Server
```bash
cd server
npm start
```
You should see: `🎵 Gini Server running on port 5000`

### Terminal 2 - Start React Frontend
```bash
npm start
```
React will open in your browser at `http://localhost:3000`

---

## Features Implemented

✅ **Questions**
- Fans can ask questions (form with just question text)
- Latest 10 questions displayed on home page
- Like/Unlike functionality (no accounts needed)
- Top 10 questions in Gini's Dashboard

✅ **Song Suggestions**
- Fans can suggest songs (form with just song title)
- Latest 10 songs displayed on home page
- Like/Unlike functionality
- Top 10 songs in Gini's Dashboard

✅ **Admin Dashboard**
- Only Gini can login with password: `@Gini_Subodh$5263`
- Shows top 10 questions with likes
- Shows top 10 song suggestions with likes
- Refresh button to update data

---

## API Endpoints

### Questions
- `GET /api/questions/latest` - Get latest 10 questions
- `GET /api/questions/top` - Get top 10 by likes
- `POST /api/questions/create` - Create new question
- `POST /api/questions/:id/like` - Like a question
- `POST /api/questions/:id/unlike` - Unlike a question

### Songs
- `GET /api/songs/latest` - Get latest 10 songs
- `GET /api/songs/top` - Get top 10 by likes
- `POST /api/songs/create` - Create new song
- `POST /api/songs/:id/like` - Like a song
- `POST /api/songs/:id/unlike` - Unlike a song

### Auth
- `POST /api/auth/login` - Admin login with password

---

## Troubleshooting

**MongoDB Connection Error?**
- Verify `.env` file has correct connection string
- Check IP is whitelisted in MongoDB Atlas Network Access
- Ensure database user exists with correct password

**Port 5000 already in use?**
- Change `PORT` in `server/.env`
- Update proxy in `package.json`

**Forms not submitting?**
- Ensure backend server is running
- Check browser console for errors
- Verify MongoDB connection is active

---

## Project Structure
```
gini/
├── public/
│   └── images/ videos/
├── src/
│   ├── components/
│   │   ├── Questions.js
│   │   ├── Songs.js
│   │   ├── AdminLogin.js
│   │   ├── AdminDashboard.js
│   │   └── VideoHero.js
│   ├── App.js
│   └── App.css
├── server/
│   ├── models/
│   │   ├── Question.js
│   │   └── Song.js
│   ├── routes/
│   │   ├── questionRoutes.js
│   │   ├── songRoutes.js
│   │   └── authRoutes.js
│   ├── db.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── package.json
```

---

**All set! 🚀 Your Gini Website is ready to go!**
