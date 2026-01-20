import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User.js';
import { IdeaReport } from '../models/IdeaReport.js';
import { validateIdeaWithGroq } from '../services/groqService.js';

const router = express.Router();

// Submit an idea for validation
router.post('/validate', async (req, res) => {
  try {
    const { idea } = req.body;
    
    if (!idea || idea.trim().length === 0) {
      return res.status(400).json({ error: 'Idea is required' });
    }

    // Get or create session ID
    let sessionId = req.session.userId;
    if (!sessionId) {
      sessionId = uuidv4();
      req.session.userId = sessionId;
      
      // Create user if doesn't exist
      await User.findOneAndUpdate(
        { sessionId },
        { 
          sessionId,
          lastActive: new Date()
        },
        { upsert: true, new: true }
      );
    } else {
      // Update last active time
      await User.findOneAndUpdate(
        { sessionId },
        { lastActive: new Date() }
      );
    }

    // Validate idea with GROQ
    const validationReport = await validateIdeaWithGroq(idea);

    // Generate unique report ID
    const reportId = uuidv4();

    // Save report to database
    const ideaReport = new IdeaReport({
      reportId,
      sessionId,
      idea,
      validationReport
    });

    await ideaReport.save();

    res.json({
      reportId,
      idea,
      validationReport,
      createdAt: ideaReport.createdAt
    });

  } catch (error) {
    console.error('Error validating idea:', error);
    res.status(500).json({ 
      error: 'Failed to validate idea', 
      message: error.message 
    });
  }
});

// Get all reports for the current session
router.get('/reports', async (req, res) => {
  try {
    const sessionId = req.session.userId;
    
    if (!sessionId) {
      return res.json({ reports: [] });
    }

    const reports = await IdeaReport.find({ sessionId })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({ reports });

  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reports',
      message: error.message 
    });
  }
});

// Get a specific report by ID
router.get('/reports/:reportId', async (req, res) => {
  try {
    const { reportId } = req.params;
    const sessionId = req.session.userId;

    if (!sessionId) {
      return res.status(401).json({ error: 'No active session' });
    }

    const report = await IdeaReport.findOne({ 
      reportId, 
      sessionId 
    }).select('-__v');

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json(report);

  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ 
      error: 'Failed to fetch report',
      message: error.message 
    });
  }
});

// Get session info
router.get('/session', async (req, res) => {
  try {
    const sessionId = req.session.userId;
    
    if (!sessionId) {
      return res.json({ 
        hasSession: false,
        sessionId: null 
      });
    }

    const user = await User.findOne({ sessionId });
    
    res.json({ 
      hasSession: true,
      sessionId,
      user: user ? {
        username: user.username,
        createdAt: user.createdAt,
        lastActive: user.lastActive
      } : null
    });

  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ 
      error: 'Failed to fetch session',
      message: error.message 
    });
  }
});

export default router;
