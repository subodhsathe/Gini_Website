# 🎵 Quick Start Guide - Gini's Website

## 30-Second Setup

### For Windows Users:
1. Extract/navigate to the project folder
2. Double-click **`start.bat`**
3. Wait 30-60 seconds for servers to start
4. Open http://localhost:3000 in your browser

### For Mac/Linux Users:
```bash
chmod +x start.sh
./start.sh
```

---

## What You'll See

### Home Page
- Beautiful gradient background with purple tones
- Two main sections:
  - **Ask Gini a Question** - Post questions on the left
  - **Suggest a Song** - Recommend songs on the right
- Navigation bar with Admin button

### Features Available

#### 1. Questions Section
- Fill in your name, email, and question
- Click "Post Question" to submit
- See latest 10 questions below
- Click "👍 Like" to rate a question
- Top 5 liked questions go to Gini's dashboard

#### 2. Songs Section
- Fill in your name, email, song title, and artist
- Start typing song title to search (like Spotify)
- Click a result to select it
- Click "Suggest Song" to submit
- See latest 10 suggestions below
- Click "👍 Like" to rate a song
- Top 5 liked songs go to Gini's dashboard

#### 3. Admin Dashboard
- Click "Admin" button in top right
- Enter password: `@Gini_Subodh$5263`
- View top 5 questions and songs
- See which fans engaged most

---

## Ports Used

- **Frontend**: http://localhost:3000 (React App)
- **Backend**: http://localhost:5000 (API Server)
- **Database**: MongoDB Atlas (Cloud)

---

## Keyboard Shortcuts

- Press **Ctrl+C** in either terminal to stop servers
- Close terminal windows to stop both frontend and backend

---

## If Something Goes Wrong

### Servers Won't Start
1. Check if Node.js is installed: `node --version`
2. Make sure ports 3000 and 5000 are free
3. Try manual start (see below)

### Manual Start (Both Terminals)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm start
```

### Database Connection Error
- Verify internet connection
- Check MongoDB credentials in `server/.env`
- Email: subodhssathe@gmail.com
- Password: subodh1234

### Page Won't Load
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+F5)
- Wait 10 seconds for backend to start

---

## Project Files Overview

```
gini/
├── server/              ← Backend (Node.js)
│   └── .env            ← MongoDB & settings
├── src/                ← Frontend (React)
│   ├── App.js          ← Main app
│   └── components/     ← Questions, Songs, Admin
├── start.bat           ← Easy startup (Windows)
├── start.sh            ← Easy startup (Mac/Linux)
└── INSTALLATION.md     ← Full setup guide
```

---

## Admin Password

**Only Gini can login with:**
- Password: `@Gini_Subodh$5263`

Change this in `server/.env` if needed.

---

## First Time Tips

1. **Create a test question** to see the system work
2. **Try the song search** - start typing and see results
3. **Like some questions/songs** to see the count increase
4. **Login as admin** to see the top items

---

## Feature Highlights

✨ **Beautiful UI**
- Gradient purple background
- Smooth animations
- Responsive design (works on phone too)

🎤 **Questions Feature**
- Ask anything about Gini
- See latest 10 questions
- Rate by liking

🎵 **Songs Feature**
- Suggest songs to Gini
- Search while typing
- Rate suggestions

📊 **Admin Dashboard**
- Secure login
- Top 5 questions
- Top 5 songs
- Fan engagement tracking

---

## Need More Help?

See **INSTALLATION.md** for:
- Full installation steps
- Troubleshooting guide
- API documentation
- Deployment instructions

---

## MongoDB Credentials (Already Configured)

```
Email: subodhssathe@gmail.com
Password: subodh1234
Database: gini_website
Cluster: cluster0
```

Access MongoDB at: https://www.mongodb.com/cloud/atlas

---

## That's it! 🎉

Your website is now running and ready for fans!

Happy streaming! 🎵
