# AI Co-Founder Backend

Backend API server for the AI Co-Founder startup idea validator application.

## Features

- Express.js REST API
- GROQ API integration for AI-powered idea validation
- MongoDB for data persistence
- Session management for user tracking
- Comprehensive validation reports with:
  - Go/No-Go recommendations
  - Target audience analysis
  - First customer suggestions
  - Risk and opportunity assessment
  - Market insights
  - Competitor analysis
  - Recommended next steps

## Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- GROQ API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your credentials:
```
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=mongodb://localhost:27017/ai-cofounder
SESSION_SECRET=your_session_secret_here
NODE_ENV=development
```

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Check if the API is running

### Session Management
- `GET /api/ideas/session` - Get current session info

### Idea Validation
- `POST /api/ideas/validate` - Submit an idea for validation
  - Body: `{ "idea": "Your startup idea here" }`
  
- `GET /api/ideas/reports` - Get all reports for current session

- `GET /api/ideas/reports/:reportId` - Get a specific report by ID

## Deployment

### Render.com

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: Add all variables from `.env`

### Heroku

1. Create a new Heroku app:
```bash
heroku create your-app-name
```

2. Set environment variables:
```bash
heroku config:set GROQ_API_KEY=your_key
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set SESSION_SECRET=your_secret
```

3. Deploy:
```bash
git push heroku main
```

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database configuration
├── models/
│   ├── User.js           # User model
│   └── IdeaReport.js     # Idea report model
├── routes/
│   └── ideas.js          # API routes
├── services/
│   └── groqService.js    # GROQ API integration
├── .env                   # Environment variables (not in git)
├── .env.example          # Example environment variables
├── package.json          # Dependencies and scripts
└── server.js             # Express server setup
```
