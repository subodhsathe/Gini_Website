# 📁 Project Structure & Files Guide

## Your Complete Gini Website Project

```
H:\Gini's Website\gini/
│
├── 📋 SETUP & DOCUMENTATION
│   ├── 🔴 00_READ_ME_FIRST.md          ⭐ START HERE!
│   ├── SETUP_MONGODB_NOW.md            ← Complete MongoDB setup
│   ├── MONGODB_VISUAL_GUIDE.md         ← Step-by-step with clicks
│   ├── MONGODB_SETUP.md                ← Detailed MongoDB guide
│   ├── QUICKSTART.md                   ← Quick start reference
│   ├── INSTALLATION.md                 ← Full installation guide
│   └── README.md                       ← Original React README
│
├── 🔧 STARTUP SCRIPTS
│   ├── start.bat                       ← Start both servers (Windows)
│   ├── start.sh                        ← Start both servers (Mac/Linux)
│   └── test-mongodb.bat                ← Test MongoDB connection
│
├── ⚙️ CONFIGURATION
│   ├── package.json                    ← Frontend dependencies
│   └── .gitignore                      ← Git ignore rules
│
├── 🎨 FRONTEND (React)
│   ├── public/
│   │   ├── index.html                  ← Main HTML
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   └── src/
│       ├── App.js                      ← Main App component
│       ├── App.css                     ← Beautiful styling ✨
│       ├── App.test.js
│       ├── index.js                    ← React entry point
│       ├── index.css                   ← Global styles
│       ├── logo.svg
│       ├── reportWebVitals.js
│       ├── setupTests.js
│       │
│       └── components/                 ← React Components
│           ├── Questions.js            ← Questions feature
│           ├── Songs.js                ← Songs suggestion feature
│           ├── AdminLogin.js           ← Admin login page
│           └── AdminDashboard.js       ← Admin dashboard
│
└── 🖥️ BACKEND (Node.js + Express)
    └── server/
        ├── 📋 package.json             ← Backend dependencies
        ├── ⚙️ .env                     ← ⭐ UPDATE THIS with MongoDB URI
        ├── .env.example                ← Example .env file
        │
        ├── server.js                   ← Main server file
        ├── db.js                       ← MongoDB connection
        ├── test-mongodb.js             ← Connection test script
        │
        ├── models/                     ← Database Models
        │   ├── Question.js             ← Question schema
        │   ├── Song.js                 ← Song schema
        │   └── Admin.js                ← Admin user schema
        │
        ├── controllers/                ← Business Logic
        │   ├── questionController.js   ← Question endpoints
        │   ├── songController.js       ← Song endpoints
        │   └── authController.js       ← Auth endpoints
        │
        ├── routes/                     ← API Routes
        │   ├── questionRoutes.js       ← /api/questions
        │   ├── songRoutes.js           ← /api/songs
        │   └── authRoutes.js           ← /api/auth
        │
        └── middleware/                 ← Middleware
            └── auth.js                 ← JWT authentication
```

---

## 📍 Important Files You Need to Update

### 1. **server/.env** ⚠️ MOST IMPORTANT
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.mongodb.net/gini_website?retryWrites=true&w=majority
↑ Replace this with your MongoDB connection string!
```

**Where to get it:**
1. Log in to MongoDB Atlas
2. Click "Databases" → "Connect"
3. Select "Connect your application"
4. Copy the connection string
5. Paste it here, replacing USERNAME and PASSWORD

---

## 🔌 API Endpoints

All endpoints are in `server/routes/`:

### Questions API
- `GET /api/questions/latest` - Get latest 10 questions
- `POST /api/questions/create` - Create new question
- `PUT /api/questions/like/:id` - Like a question
- `GET /api/questions/top` - Get top 5 (Admin)

### Songs API
- `GET /api/songs/latest` - Get latest 10 songs
- `POST /api/songs/create` - Create song suggestion
- `GET /api/songs/search?query=` - Search songs
- `PUT /api/songs/like/:id` - Like a song
- `GET /api/songs/top` - Get top 5 (Admin)

### Auth API
- `POST /api/auth/login` - Admin login
- `POST /api/auth/initialize` - Initialize admin (run once)

---

## 🎨 Frontend Components

Located in `src/components/`:

### Questions.js
- Form to ask questions
- Display latest 10 questions
- Like button for each question

### Songs.js
- Form to suggest songs
- Search while typing
- Display latest 10 suggestions
- Like button for each song

### AdminLogin.js
- Secure login form
- Password: `@Gini_Subodh$5263`

### AdminDashboard.js
- Show top 5 questions
- Show top 5 songs
- Logout button

---

## 🗄️ Database Models

Located in `server/models/`:

### Question.js
```javascript
{
  question: String,
  fanName: String,
  fanEmail: String,
  likes: Number,
  likedBy: [String],
  createdAt: Date
}
```

### Song.js
```javascript
{
  songTitle: String,
  artist: String,
  fanName: String,
  fanEmail: String,
  spotifyUrl: String,
  likes: Number,
  likedBy: [String],
  createdAt: Date
}
```

### Admin.js
```javascript
{
  username: String,
  password: String (hashed),
  createdAt: Date
}
```

---

## 🚀 How to Use Files

### Step 1: Setup
```
Read: 00_READ_ME_FIRST.md
Then: SETUP_MONGODB_NOW.md
```

### Step 2: Configure
```
Edit: server/.env
With: Your MongoDB connection string
```

### Step 3: Test
```
Run: test-mongodb.bat (Windows)
Or: node test-mongodb.js (all platforms)
```

### Step 4: Start Servers
```
Option A: Double-click start.bat (Windows)
Option B: ./start.sh (Mac/Linux)
Option C: Manual in two terminals
  Terminal 1: cd server && npm run dev
  Terminal 2: npm start
```

### Step 5: Access
```
Frontend: http://localhost:3000
Backend: http://localhost:5000
```

---

## 📊 File Sizes & Descriptions

| File | Type | Purpose |
|------|------|---------|
| App.js | Component | Main app router |
| App.css | CSS | All styling (2000+ lines) |
| Questions.js | Component | Questions feature |
| Songs.js | Component | Songs feature |
| AdminLogin.js | Component | Login page |
| AdminDashboard.js | Component | Admin page |
| server.js | Backend | Express server |
| db.js | Backend | MongoDB connection |
| test-mongodb.js | Backend | Connection tester |

---

## 🔐 Security

### Admin Password
- Stored in: `server/.env` as `GINI_PASSWORD`
- Default: `@Gini_Subodh$5263`
- JWT Token expires: 24 hours
- Change in production!

### Database
- MongoDB Atlas (Cloud)
- Credentials in: `server/.env`
- User: `gini_admin` (you create this)
- Password: What you set in MongoDB

---

## 📚 Documentation Files

| File | Read When |
|------|-----------|
| 00_READ_ME_FIRST.md | Starting setup |
| SETUP_MONGODB_NOW.md | Creating MongoDB |
| MONGODB_VISUAL_GUIDE.md | Need step-by-step |
| MONGODB_SETUP.md | Need detailed help |
| QUICKSTART.md | Running servers |
| INSTALLATION.md | Full documentation |

---

## ✅ Verification Checklist

After setup, verify:

- [ ] MongoDB account created at atlas.mongodb.com
- [ ] Database cluster created and "Active"
- [ ] Database user created (gini_admin)
- [ ] Network access allows connections
- [ ] Connection string in server/.env
- [ ] `node test-mongodb.js` shows ✅ SUCCESS
- [ ] Backend starts on port 5000
- [ ] Frontend starts on port 3000
- [ ] Can ask questions on website
- [ ] Can suggest songs
- [ ] Can like items
- [ ] Admin login works
- [ ] Top 5 items show in dashboard

---

## 🎯 Quick Navigation

**I need to...**
- Start the website → Read `QUICKSTART.md`
- Set up MongoDB → Read `SETUP_MONGODB_NOW.md`
- See step-by-step → Read `MONGODB_VISUAL_GUIDE.md`
- Full installation → Read `INSTALLATION.md`
- Test connection → Run `test-mongodb.bat`
- Understand code → Look at files in `src/` and `server/`

---

## 💡 Pro Tips

1. Keep `server/.env` secret (has database password)
2. Restart servers after changing `.env`
3. Use "Allow access from anywhere" for development
4. MongoDB free tier is perfect for this project
5. Node.js v14+ is required

---

**Everything is ready! Just set up MongoDB and you're done! 🎉**
