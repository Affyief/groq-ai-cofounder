import mongoose from 'mongoose';

const ideaReportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true,
    unique: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  idea: {
    type: String,
    required: true
  },
  validationReport: {
    recommendation: {
      type: String,
      enum: ['GO', 'NO-GO', 'PROCEED WITH CAUTION'],
      required: true
    },
    summary: String,
    targetAudience: String,
    firstCustomers: String,
    risks: [String],
    opportunities: [String],
    marketInsights: String,
    competitorAnalysis: String,
    recommendedNextSteps: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const IdeaReport = mongoose.model('IdeaReport', ideaReportSchema);
