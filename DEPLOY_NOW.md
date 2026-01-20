# Quick Deployment Guide - Get a URL in Minutes!

## 🚀 Fastest Way to Get a Live URL

### Option 1: One-Click Deploy to Render (Recommended - 5 minutes)

#### Backend (Render.com)

1. **Go to:** https://render.com/
2. **Sign up/Login** with GitHub
3. **Click:** "New +" → "Web Service"
4. **Connect** this repository: `Affyief/groq-ai-cofounder`
5. **Configure:**
   - Name: `ai-cofounder-backend`
   - Branch: `copilot/create-backend-for-ai-consultant`
   - Root Directory: (leave empty)
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
6. **Add Environment Variables:**
   - `NODE_ENV` = `production`
   - `GROQ_API_KEY` = `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`
   - `MONGODB_URI` = (see MongoDB setup below)
   - `SESSION_SECRET` = (click "Generate" button)
7. **Click:** "Create Web Service"

**Your backend URL will be:** `https://ai-cofounder-backend-XXXX.onrender.com`

#### MongoDB (Free - 2 minutes)

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Sign up** (free)
3. **Create** a free cluster (M0)
4. **Create** database user
5. **Allow** network access from anywhere (0.0.0.0/0)
6. **Copy** connection string
7. **Paste** as `MONGODB_URI` in Render

#### Frontend (Netlify)

1. **Go to:** https://app.netlify.com/
2. **Sign up/Login** with GitHub
3. **Click:** "Add new site" → "Import an existing project"
4. **Select** this repository
5. **Configure:**
   - Branch: `copilot/create-backend-for-ai-consultant`
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`
6. **Add Environment Variable:**
   - `VITE_API_URL` = (your Render backend URL)
7. **Deploy**

**Your frontend URL will be:** `https://your-site-name.netlify.app`

---

### Option 2: Vercel + Render (Alternative - 5 minutes)

#### Backend on Render (same as above)

#### Frontend on Vercel

1. **Go to:** https://vercel.com/
2. **Sign up/Login** with GitHub
3. **Click:** "Add New Project"
4. **Import** this repository
5. **Configure:**
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Add Environment Variable:**
   - `VITE_API_URL` = (your Render backend URL)
7. **Deploy**

**Your frontend URL will be:** `https://your-project.vercel.app`

---

### Option 3: Local Testing (If you want to test immediately)

If you want to test locally before deploying:

```bash
# 1. Clone the repo
git clone https://github.com/Affyief/groq-ai-cofounder.git
cd groq-ai-cofounder
git checkout copilot/create-backend-for-ai-consultant

# 2. Setup MongoDB locally or use MongoDB Atlas (free)
# Download MongoDB: https://www.mongodb.com/try/download/community
# Or use Atlas: https://www.mongodb.com/cloud/atlas

# 3. Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and GROQ API key
npm run dev
# Backend runs at: http://localhost:5000

# 4. Setup Frontend (in new terminal)
cd frontend
npm install
npm run dev
# Frontend runs at: http://localhost:5173
```

---

## 🎯 Complete Deployment URLs

After deploying, you'll have:

- **Backend API:** `https://ai-cofounder-backend-XXXX.onrender.com`
- **Frontend App:** `https://your-site-name.netlify.app`
- **Test URL:** Just open the frontend URL in your browser!

---

## ⚡ Quick Start Commands (After Deployment)

Test your deployed backend:
```bash
# Health check
curl https://your-backend-url.onrender.com/health

# Validate an idea
curl -X POST https://your-backend-url.onrender.com/api/ideas/validate \
  -H "Content-Type: application/json" \
  -d '{"idea": "A mobile app connecting pet owners with local pet sitters"}'
```

---

## 🐛 Troubleshooting

**Backend won't start?**
- Check MongoDB connection string
- Verify GROQ API key is correct
- Check Render logs

**Frontend can't connect to backend?**
- Verify `VITE_API_URL` matches your backend URL
- Check CORS settings in backend
- Look at browser console for errors

**Need help?**
- Check `DEPLOYMENT.md` for detailed instructions
- Check `TROUBLESHOOTING.md` (if it exists)
- Review Render/Netlify deployment logs

---

## 🎉 You're All Set!

Once deployed:
1. Open your frontend URL
2. Enter a startup idea
3. Click "Validate My Idea"
4. Get instant AI-powered validation!

---

**Estimated Total Time: 10-15 minutes**
