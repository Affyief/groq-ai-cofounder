# AI Co-Founder Frontend

React frontend application for the AI Co-Founder startup idea validator.

## Features

- Modern, responsive UI built with React and TailwindCSS
- Real-time idea validation with loading states
- Comprehensive validation report display with:
  - Go/No-Go recommendation badges
  - Target audience insights
  - First customer suggestions
  - Risk and opportunity analysis
  - Market insights
  - Competitor analysis
  - Recommended next steps
- Report history with ability to view previous validations
- Session persistence

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Fetch API for backend communication

## Setup

### Prerequisites

- Node.js (v18 or higher)
- Backend API running (see backend README)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your backend API URL:
```
VITE_API_URL=http://localhost:5000
```

### Running the App

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── client.js         # API client for backend communication
│   ├── components/
│   │   ├── IdeaForm.jsx      # Form for submitting ideas
│   │   ├── ValidationReport.jsx  # Displays validation report
│   │   └── ReportHistory.jsx # Shows previous reports
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles with Tailwind
├── public/                    # Static assets
├── index.html                # HTML template
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── vite.config.js            # Vite configuration
```

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set the following build settings:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`
3. Add environment variable: `VITE_API_URL` with your backend URL

Alternatively, you can use the Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect the configuration from `vercel.json`
3. Add environment variable: `VITE_API_URL` with your backend URL

Alternatively, you can use the Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:5000)

## Features Walkthrough

### Submit an Idea
1. Enter your startup idea in the text area (minimum 10 characters)
2. Click "Validate My Idea"
3. Wait for the AI to analyze your idea (usually 5-15 seconds)

### View Validation Report
The report includes:
- Clear recommendation badge (GO, NO-GO, or PROCEED WITH CAUTION)
- Executive summary
- Target audience analysis
- First customer suggestions
- Key risks and opportunities
- Market insights
- Competitor analysis
- Recommended next steps

### Access Previous Reports
- Click on any report in the "Previous Reports" section
- All reports are saved to your session
- Click "New Idea" to submit another idea
