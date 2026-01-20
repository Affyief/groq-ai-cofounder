# Testing Guide

## Overview

This document provides instructions for testing the AI Co-Founder application locally and in production.

## Prerequisites

Before testing, ensure you have:
- Node.js v18+ installed
- MongoDB running (local or cloud)
- GROQ API key
- Backend and frontend dependencies installed

## Local Testing

### 1. Backend Testing

#### Start the Backend Server

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

The backend should start on http://localhost:5000

#### Test Backend Endpoints

**Health Check:**
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "AI Co-Founder API is running",
  "timestamp": "2024-01-20T10:00:00.000Z"
}
```

**Validate an Idea:**
```bash
curl -X POST http://localhost:5000/api/ideas/validate \
  -H "Content-Type: application/json" \
  -d '{"idea": "A mobile app that connects pet owners with local pet sitters and dog walkers on demand"}'
```

Expected response should include:
- `reportId`: Unique ID for the report
- `idea`: The submitted idea
- `validationReport`: Object containing recommendation, summary, target audience, etc.
- `createdAt`: Timestamp

**Get Reports:**
```bash
curl http://localhost:5000/api/ideas/reports
```

**Get Session Info:**
```bash
curl http://localhost:5000/api/ideas/session
```

### 2. Frontend Testing

#### Start the Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed (default is http://localhost:5000)
npm run dev
```

The frontend should start on http://localhost:5173

#### Manual UI Testing Checklist

- [ ] Page loads without errors
- [ ] Header displays "AI Co-Founder" title
- [ ] Idea submission form is visible
- [ ] Textarea accepts input (minimum 10 characters)
- [ ] Submit button is disabled when loading
- [ ] Loading spinner appears during validation
- [ ] Validation report displays after submission
- [ ] Report shows recommendation badge (GO/NO-GO/PROCEED WITH CAUTION)
- [ ] All report sections render correctly:
  - [ ] Executive Summary
  - [ ] Target Audience
  - [ ] First Potential Customers
  - [ ] Key Risks
  - [ ] Key Opportunities
  - [ ] Market Insights
  - [ ] Competitor Analysis
  - [ ] Recommended Next Steps
- [ ] "New Idea" button appears after report is displayed
- [ ] "New Idea" button resets to form view
- [ ] Previous reports section displays when available
- [ ] Clicking on previous report displays that report
- [ ] Responsive design works on different screen sizes

### 3. Integration Testing

#### Test Full Flow

1. **Submit First Idea:**
   - Enter: "A SaaS platform that uses AI to help small businesses automate their customer support"
   - Click "Validate My Idea"
   - Wait for response
   - Verify report appears with all sections

2. **Submit Second Idea:**
   - Click "New Idea"
   - Enter: "An e-commerce marketplace for sustainable fashion brands"
   - Click "Validate My Idea"
   - Verify new report appears

3. **View Previous Reports:**
   - Click "New Idea"
   - Scroll down to "Previous Reports" section
   - Verify both reports are listed
   - Click on first report
   - Verify correct report displays

4. **Test Session Persistence:**
   - Refresh the page
   - Click "New Idea" and scroll to "Previous Reports"
   - Verify reports are still available (if sessions are working)

## Production Testing

### Backend (Deployed to Render/Heroku)

Replace `http://localhost:5000` with your production URL in all curl commands above.

Example:
```bash
curl https://your-app-name.onrender.com/health
```

### Frontend (Deployed to Netlify/Vercel)

1. Visit your deployed frontend URL
2. Run through the Manual UI Testing Checklist above
3. Use browser DevTools to check:
   - Console for errors
   - Network tab to verify API calls to backend
   - Application tab to verify session storage

### Cross-Origin Testing

Ensure CORS is properly configured:
1. Open browser DevTools
2. Go to Console tab
3. Submit an idea
4. Check for CORS errors
5. If errors appear, update backend `server.js` CORS configuration

## Performance Testing

### Backend Response Times

Test API response times:
```bash
time curl -X POST http://localhost:5000/api/ideas/validate \
  -H "Content-Type: application/json" \
  -d '{"idea": "Test idea"}'
```

Expected: 5-20 seconds (depending on GROQ API response time)

### Frontend Load Time

1. Open DevTools
2. Go to Network tab
3. Refresh page
4. Check "Load" time (should be < 2 seconds)
5. Check "DOMContentLoaded" time (should be < 1 second)

## Troubleshooting

### Backend Issues

**MongoDB Connection Failed:**
- Verify MongoDB is running: `mongosh` or check MongoDB Atlas
- Check `MONGODB_URI` in `.env`
- Ensure network access is allowed (for MongoDB Atlas)

**GROQ API Errors:**
- Verify `GROQ_API_KEY` in `.env`
- Check API quota/limits at https://groq.com
- Review backend logs for specific error messages

**Session Issues:**
- Verify MongoDB connection (sessions are stored in MongoDB)
- Check browser cookies are enabled
- Clear browser cookies and try again

### Frontend Issues

**API Calls Failing:**
- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check browser console for CORS errors
- Verify network connectivity

**Build Errors:**
- Clear `node_modules`: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite && npm run build`
- Check for TypeScript/ESLint errors

**Styling Issues:**
- Verify TailwindCSS is installed: `npm list tailwindcss`
- Check `tailwind.config.js` content paths
- Verify `@tailwindcss/postcss` is installed
- Clear build cache and rebuild

## Automated Testing

Currently, the application does not include automated tests. For future development, consider adding:

### Backend Tests
- Unit tests for GROQ service
- Integration tests for API endpoints
- Database model tests

### Frontend Tests
- Component tests with React Testing Library
- E2E tests with Playwright or Cypress
- Visual regression tests

### Example Test Structure

```
backend/
  tests/
    unit/
      groqService.test.js
    integration/
      ideas.test.js

frontend/
  tests/
    unit/
      components/
        IdeaForm.test.jsx
        ValidationReport.test.jsx
    e2e/
      validation-flow.test.js
```

## Monitoring

For production deployments, consider implementing:

1. **Backend Monitoring:**
   - Error logging (e.g., Sentry)
   - Performance monitoring (e.g., New Relic)
   - Uptime monitoring (e.g., UptimeRobot)

2. **Frontend Monitoring:**
   - Error tracking (e.g., Sentry)
   - Analytics (e.g., Google Analytics)
   - Performance monitoring (e.g., Lighthouse CI)

3. **Database Monitoring:**
   - MongoDB Atlas monitoring
   - Query performance analysis
   - Storage usage tracking

## Security Testing

### Backend Security

- [ ] API keys are not exposed in responses
- [ ] Environment variables are properly configured
- [ ] Session cookies are httpOnly and secure in production
- [ ] Input validation is working (test with empty/invalid inputs)
- [ ] Rate limiting is in place (if implemented)

### Frontend Security

- [ ] No sensitive data in client-side code
- [ ] XSS protection (React handles this by default)
- [ ] HTTPS is enforced in production
- [ ] Dependencies are up to date (run `npm audit`)

## Success Criteria

The application is ready for production when:

- ✅ All backend endpoints return expected responses
- ✅ Frontend UI displays correctly on desktop and mobile
- ✅ End-to-end validation flow works smoothly
- ✅ Reports are saved and retrievable
- ✅ No console errors in browser
- ✅ No server errors in logs
- ✅ Build process completes successfully
- ✅ Deployment configuration is tested
- ✅ Basic security measures are in place
- ✅ Performance is acceptable (< 20s for validation)
