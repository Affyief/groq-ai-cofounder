# AI Co-Founder

An AI-powered startup idea validator that helps entrepreneurs validate their ideas with comprehensive market analysis, risk assessment, and actionable recommendations.

## Overview

AI Co-Founder is a full-stack application that uses the GROQ API to provide instant validation reports for startup ideas. Users can submit their ideas in plain text and receive detailed analysis including:

- **Go/No-Go Recommendations**: Clear verdict on idea viability
- **Target Audience Analysis**: Detailed insights into ideal customers
- **First Customer Suggestions**: Specific early adopter segments
- **Risk & Opportunity Assessment**: Comprehensive evaluation of challenges and advantages
- **Market Insights**: Current market landscape and trends
- **Competitor Analysis**: Overview of existing solutions
- **Action Plan**: Concrete next steps to pursue the idea

## Features

### Backend
- Node.js/Express REST API
- GROQ AI integration for intelligent analysis
- MongoDB for data persistence
- Session-based user tracking
- Report history management

### Frontend
- Modern React UI with Vite
- TailwindCSS for responsive design
- Real-time validation with loading states
- Report history browsing
- Intuitive user experience

## Project Structure

```
groq-ai-cofounder/
├── backend/              # Node.js Express API
│   ├── config/          # Database configuration
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # GROQ API integration
│   └── server.js        # Express server
├── frontend/            # React application
│   ├── src/
│   │   ├── api/        # API client
│   │   ├── components/ # React components
│   │   └── App.jsx     # Main application
│   └── ...
├── render.yaml          # Render deployment config
├── netlify.toml         # Netlify deployment config
├── vercel.json          # Vercel deployment config
└── Procfile            # Heroku deployment config
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- GROQ API key (sign up at https://groq.com)

### 1. Clone the Repository

```bash
git clone https://github.com/Affyief/groq-ai-cofounder.git
cd groq-ai-cofounder
```

### 2. Setup Backend

```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Edit .env and add your credentials:
# - GROQ_API_KEY: Your GROQ API key
# - MONGODB_URI: Your MongoDB connection string
# - SESSION_SECRET: A random secret key

# Start the backend server
npm run dev
```

The backend will run on http://localhost:5000

### 3. Setup Frontend

```bash
cd ../frontend
npm install

# Copy environment variables
cp .env.example .env

# Edit .env if needed (default points to http://localhost:5000)

# Start the frontend
npm run dev
```

The frontend will run on http://localhost:5173

### 4. Access the Application

Open your browser and navigate to http://localhost:5173

## Environment Variables

### Backend (.env)
```
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=mongodb://localhost:27017/ai-cofounder
SESSION_SECRET=your_session_secret_here
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Deployment

### Backend Deployment

#### Option 1: Render.com

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
4. Add environment variables from backend `.env`
5. Deploy

#### Option 2: Heroku

```bash
heroku create your-app-name
heroku config:set GROQ_API_KEY=your_key
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set SESSION_SECRET=your_secret
git push heroku main
```

### Frontend Deployment

#### Option 1: Netlify

1. Connect your GitHub repository to Netlify
2. Configure:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`
3. Add environment variable: `VITE_API_URL` with your backend URL
4. Deploy

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Option 2: Vercel

1. Connect your GitHub repository to Vercel
2. Vercel auto-detects configuration from `vercel.json`
3. Add environment variable: `VITE_API_URL` with your backend URL
4. Deploy

Or use Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

## API Endpoints

### Health Check
- `GET /health` - Check API status

### Session
- `GET /api/ideas/session` - Get current session info

### Ideas & Reports
- `POST /api/ideas/validate` - Submit idea for validation
  ```json
  {
    "idea": "Your startup idea here"
  }
  ```
- `GET /api/ideas/reports` - Get all reports for current session
- `GET /api/ideas/reports/:reportId` - Get specific report

## Usage

1. **Submit Your Idea**: Enter your startup idea in the text area (minimum 10 characters)
2. **Wait for Analysis**: The AI will analyze your idea (typically 5-15 seconds)
3. **Review Report**: Get comprehensive insights including recommendation, target audience, risks, opportunities, and next steps
4. **Browse History**: Access previous reports from the "Previous Reports" section
5. **Submit More Ideas**: Click "New Idea" to validate another concept

## Technologies Used

- **Frontend**: React 18, Vite, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **AI**: GROQ API (Mixtral-8x7b model)
- **Session Management**: express-session with connect-mongo
- **Deployment**: Render/Heroku (backend), Netlify/Vercel (frontend)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
