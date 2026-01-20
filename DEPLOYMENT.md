# Deployment Checklist

Use this checklist to ensure a smooth deployment to production.

## Pre-Deployment

### Backend Preparation

- [ ] All environment variables are documented in `.env.example`
- [ ] No sensitive data (API keys, secrets) in Git history
- [ ] Database indexes are created for frequently queried fields
- [ ] Error handling is comprehensive
- [ ] Logging is configured for production
- [ ] CORS settings allow only production frontend URL
- [ ] Session secret is strong and unique
- [ ] Backend builds/starts without errors locally

### Frontend Preparation

- [ ] All API endpoints point to production backend URL
- [ ] No console.log statements in production code
- [ ] Error boundaries are in place
- [ ] Loading states are implemented for all async operations
- [ ] Build completes without warnings/errors
- [ ] Production build is tested locally (`npm run build && npm run preview`)
- [ ] Browser compatibility is verified (Chrome, Firefox, Safari, Edge)
- [ ] Responsive design tested on mobile and desktop

### Database Preparation

- [ ] MongoDB production instance is set up (Atlas recommended)
- [ ] Database user has appropriate permissions (read/write, not admin)
- [ ] IP whitelist is configured (0.0.0.0/0 for cloud deployments)
- [ ] Connection string is secured
- [ ] Backup strategy is in place
- [ ] Database indexes are optimized

### Security

- [ ] HTTPS is enforced
- [ ] Environment variables are never committed to Git
- [ ] API keys are rotated and production-ready
- [ ] Rate limiting is considered (optional for MVP)
- [ ] Input validation is in place
- [ ] Dependencies are up to date (`npm audit`)
- [ ] CORS is properly configured
- [ ] Session cookies are secure and httpOnly

## Backend Deployment

### Option 1: Render.com

1. **Create Account:**
   - [ ] Sign up at https://render.com
   - [ ] Connect GitHub account

2. **Create Web Service:**
   - [ ] Click "New +" → "Web Service"
   - [ ] Select your repository
   - [ ] Configure settings:
     - Name: `ai-cofounder-backend`
     - Environment: `Node`
     - Region: Choose closest to your users
     - Branch: `main` (or your production branch)
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`

3. **Environment Variables:**
   - [ ] Add `GROQ_API_KEY`
   - [ ] Add `MONGODB_URI` (use MongoDB Atlas URL)
   - [ ] Add `SESSION_SECRET` (use Render's "Generate" feature)
   - [ ] Add `NODE_ENV=production`
   - [ ] Add `PORT=5000` (optional, Render auto-assigns)

4. **Deploy:**
   - [ ] Click "Create Web Service"
   - [ ] Wait for build to complete
   - [ ] Test health endpoint: `https://your-app.onrender.com/health`

5. **Post-Deployment:**
   - [ ] Copy the deployed URL (e.g., `https://ai-cofounder-backend.onrender.com`)
   - [ ] Update CORS in `backend/server.js` if needed
   - [ ] Test API endpoints with curl or Postman

### Option 2: Heroku

1. **Install Heroku CLI:**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   
   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login and Create App:**
   ```bash
   heroku login
   heroku create ai-cofounder-backend
   ```

3. **Set Environment Variables:**
   ```bash
   heroku config:set GROQ_API_KEY=your_key
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set SESSION_SECRET=your_secret
   heroku config:set NODE_ENV=production
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

5. **Verify:**
   ```bash
   heroku open
   heroku logs --tail
   ```

## Frontend Deployment

### Option 1: Netlify

1. **Create Account:**
   - [ ] Sign up at https://www.netlify.com
   - [ ] Connect GitHub account

2. **Import Project:**
   - [ ] Click "Add new site" → "Import an existing project"
   - [ ] Select your repository
   - [ ] Configure settings:
     - Build command: `cd frontend && npm run build`
     - Publish directory: `frontend/dist`

3. **Environment Variables:**
   - [ ] Go to Site settings → Environment variables
   - [ ] Add `VITE_API_URL` with your backend URL (e.g., `https://ai-cofounder-backend.onrender.com`)

4. **Deploy:**
   - [ ] Click "Deploy site"
   - [ ] Wait for build to complete
   - [ ] Site will be live at a Netlify URL

5. **Custom Domain (Optional):**
   - [ ] Go to Domain settings
   - [ ] Add custom domain
   - [ ] Configure DNS records
   - [ ] SSL certificate is automatically provisioned

6. **Post-Deployment:**
   - [ ] Test the deployed site
   - [ ] Verify API calls work (check browser console)
   - [ ] Update backend CORS to allow your Netlify URL

### Option 2: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd frontend
   vercel --prod
   ```

4. **Configure:**
   - [ ] Follow prompts to link project
   - [ ] Add environment variable: `VITE_API_URL=https://your-backend-url`
   - [ ] Deployment completes automatically

5. **Alternative - Dashboard:**
   - [ ] Go to https://vercel.com
   - [ ] Click "Add New Project"
   - [ ] Import from GitHub
   - [ ] Configure root directory to `frontend`
   - [ ] Add environment variables
   - [ ] Deploy

## Post-Deployment Testing

### Backend Tests

- [ ] Health check works: `curl https://your-backend-url/health`
- [ ] Validate idea endpoint works (use Postman or curl)
- [ ] Reports are saved to database
- [ ] Session management works
- [ ] Error responses are proper (test with invalid inputs)

### Frontend Tests

- [ ] Site loads without errors
- [ ] Can submit an idea
- [ ] Validation report displays correctly
- [ ] Previous reports show up
- [ ] Mobile view works properly
- [ ] No console errors
- [ ] All links work

### Integration Tests

- [ ] Frontend can communicate with backend
- [ ] CORS is configured correctly
- [ ] Sessions persist across requests
- [ ] Reports are saved and retrievable
- [ ] Multiple users can use the app simultaneously

## Monitoring Setup

### Backend Monitoring

- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure uptime monitoring (e.g., UptimeRobot)
- [ ] Set up performance monitoring (optional)
- [ ] Configure log aggregation (Render/Heroku provides built-in logs)

### Frontend Monitoring

- [ ] Set up error tracking (e.g., Sentry)
- [ ] Add analytics (e.g., Google Analytics)
- [ ] Monitor Core Web Vitals (e.g., Lighthouse CI)

### Database Monitoring

- [ ] MongoDB Atlas monitoring is enabled
- [ ] Set up alerts for storage usage
- [ ] Monitor connection pool
- [ ] Configure automated backups

## Performance Optimization

### Backend

- [ ] Enable gzip compression
- [ ] Set up caching headers (if needed)
- [ ] Optimize database queries
- [ ] Consider adding rate limiting
- [ ] Monitor response times

### Frontend

- [ ] Images are optimized (if any added)
- [ ] Code splitting is enabled (Vite does this automatically)
- [ ] Unused dependencies are removed
- [ ] Build size is reasonable (<500KB recommended)
- [ ] Lazy loading is implemented for components (if needed)

## Rollback Plan

### If Backend Deployment Fails

1. Check deployment logs
2. Verify environment variables
3. Test MongoDB connection
4. Rollback to previous version if needed:
   ```bash
   # Render: Use dashboard to rollback
   # Heroku: heroku releases:rollback
   ```

### If Frontend Deployment Fails

1. Check build logs
2. Verify API URL is correct
3. Test locally with production backend URL
4. Rollback:
   ```bash
   # Netlify: Use dashboard to rollback
   # Vercel: vercel --prod (redeploy previous version)
   ```

## Maintenance

### Regular Tasks

- [ ] Monitor error logs weekly
- [ ] Check uptime statistics
- [ ] Review MongoDB storage usage monthly
- [ ] Update dependencies quarterly (`npm update`)
- [ ] Rotate API keys annually
- [ ] Review and optimize database indexes

### Security Updates

- [ ] Enable GitHub security alerts
- [ ] Run `npm audit` regularly
- [ ] Keep Node.js version updated
- [ ] Review access logs for suspicious activity

## Documentation

- [ ] Update README with production URLs
- [ ] Document any production-specific configurations
- [ ] Create user guide if needed
- [ ] Document API endpoints (consider Swagger/OpenAPI)

## Success Criteria

Deployment is successful when:

- ✅ Backend API is accessible and responding
- ✅ Frontend site loads and is functional
- ✅ Users can submit ideas and receive validation reports
- ✅ Reports are saved and retrievable
- ✅ No critical errors in logs
- ✅ Performance is acceptable (validation < 20 seconds)
- ✅ Mobile view works correctly
- ✅ HTTPS is enforced
- ✅ Monitoring is active

## Support Contacts

- **Render Support:** https://render.com/docs
- **Heroku Support:** https://help.heroku.com
- **Netlify Support:** https://docs.netlify.com
- **Vercel Support:** https://vercel.com/docs
- **MongoDB Atlas Support:** https://docs.atlas.mongodb.com

---

**Congratulations on deploying your AI Co-Founder MVP! 🎉**
