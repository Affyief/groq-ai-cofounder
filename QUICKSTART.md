# Quick Start Guide

Get the AI Co-Founder application up and running in 5 minutes!

## Prerequisites

- Node.js v18 or higher ([Download](https://nodejs.org/))
- MongoDB ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- GROQ API Key ([Sign up at groq.com](https://groq.com))

## Step 1: Clone the Repository

```bash
git clone https://github.com/Affyief/groq-ai-cofounder.git
cd groq-ai-cofounder
```

## Step 2: Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

**Edit `backend/.env` file:**

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=mongodb://localhost:27017/ai-cofounder
SESSION_SECRET=your_random_secret_key_here
NODE_ENV=development
```

**Start the backend:**

```bash
npm run dev
```

✅ Backend should be running at http://localhost:5000

## Step 3: Set Up Frontend

Open a **new terminal** window:

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

**The default `.env` file should work:**

```env
VITE_API_URL=http://localhost:5000
```

**Start the frontend:**

```bash
npm run dev
```

✅ Frontend should be running at http://localhost:5173

## Step 4: Test the Application

1. Open your browser and go to http://localhost:5173
2. You should see the AI Co-Founder homepage
3. Enter a startup idea in the text area:
   ```
   A mobile app that connects local farmers directly with consumers for fresh produce delivery
   ```
4. Click "Validate My Idea"
5. Wait 5-15 seconds for the AI to analyze your idea
6. View your comprehensive validation report!

## Common Issues

### MongoDB Connection Error

**Problem:** Backend shows "Error: Cannot connect to MongoDB"

**Solutions:**
1. Make sure MongoDB is running:
   ```bash
   # For local MongoDB
   mongod
   
   # Or check if service is running
   sudo systemctl status mongod
   ```

2. If using MongoDB Atlas:
   - Update `MONGODB_URI` in `backend/.env` with your Atlas connection string
   - Ensure your IP is whitelisted in Atlas Network Access

### GROQ API Error

**Problem:** "Failed to validate idea with GROQ API"

**Solutions:**
1. Verify your GROQ API key is correct in `backend/.env`
2. Check if you have API quota remaining at https://groq.com
3. Ensure there are no typos in the API key

### CORS Error

**Problem:** Frontend shows "CORS policy" error in browser console

**Solutions:**
1. Ensure backend is running on port 5000
2. Check that `VITE_API_URL` in `frontend/.env` matches backend URL
3. Clear browser cache and reload

### Port Already in Use

**Problem:** "Error: listen EADDRINUSE: address already in use"

**Solutions:**
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port in backend/.env
PORT=5001
```

## Next Steps

### Customize Your Instance

1. **Change Branding:**
   - Edit `frontend/src/App.jsx` to update the title and description
   - Modify colors in `frontend/tailwind.config.js`

2. **Adjust AI Model:**
   - Edit `backend/services/groqService.js`
   - Change model from `mixtral-8x7b-32768` to another GROQ model
   - Adjust `temperature` and `max_tokens` parameters

3. **Add Authentication:**
   - Currently uses simple session management
   - Consider adding OAuth, JWT, or other auth methods

### Deploy to Production

See detailed deployment guides in the main README.md:

- **Backend:** Deploy to Render.com or Heroku
- **Frontend:** Deploy to Netlify or Vercel

### Development Tips

**Backend Hot Reload:**
```bash
npm run dev  # Auto-restarts on file changes
```

**Frontend Hot Reload:**
```bash
npm run dev  # Already includes hot module replacement
```

**View Logs:**
```bash
# Backend logs appear in terminal
# Frontend logs appear in browser console (F12)
```

## Architecture Overview

```
┌─────────────────┐
│   User Browser  │
│   (React App)   │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│  Express API    │
│  (Node.js)      │
└────────┬────────┘
         │
    ┌────┴─────┐
    │          │
    ▼          ▼
┌────────┐ ┌────────┐
│MongoDB │ │ GROQ   │
│Database│ │  API   │
└────────┘ └────────┘
```

## Project Structure

```
groq-ai-cofounder/
├── backend/
│   ├── config/          # Database setup
│   ├── models/          # Data models
│   ├── routes/          # API endpoints
│   ├── services/        # GROQ integration
│   ├── .env            # Environment variables
│   └── server.js       # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── api/       # API client
│   │   └── App.jsx    # Main app component
│   ├── .env           # Environment variables
│   └── package.json   # Dependencies
└── README.md          # Full documentation
```

## Support

- 📖 **Full Documentation:** See [README.md](README.md)
- 🧪 **Testing Guide:** See [TESTING.md](TESTING.md)
- 🐛 **Issues:** [GitHub Issues](https://github.com/Affyief/groq-ai-cofounder/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/Affyief/groq-ai-cofounder/discussions)

## What's Next?

After successfully running the app:

1. ✅ Test with different startup ideas
2. ✅ Review the validation reports
3. ✅ Check previous reports functionality
4. ✅ Deploy to production (see README.md)
5. ✅ Customize for your needs
6. ✅ Share feedback and contribute!

---

**Happy Building! 🚀**
