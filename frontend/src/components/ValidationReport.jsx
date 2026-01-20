export default function ValidationReport({ report }) {
  if (!report) return null;

  const { idea, validationReport, createdAt } = report;
  const {
    recommendation,
    summary,
    targetAudience,
    firstCustomers,
    risks,
    opportunities,
    marketInsights,
    competitorAnalysis,
    recommendedNextSteps
  } = validationReport;

  const getRecommendationColor = (rec) => {
    switch (rec) {
      case 'GO':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'NO-GO':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'PROCEED WITH CAUTION':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Validation Report</h2>
          <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
        </div>
        
        {/* Recommendation Badge */}
        <div className={`inline-flex items-center px-6 py-3 rounded-full border-2 font-bold text-lg ${getRecommendationColor(recommendation)}`}>
          {recommendation === 'GO' && '✓ '}
          {recommendation === 'NO-GO' && '✗ '}
          {recommendation === 'PROCEED WITH CAUTION' && '⚠ '}
          {recommendation}
        </div>
      </div>

      {/* Your Idea */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Idea</h3>
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg italic">
          "{idea}"
        </p>
      </div>

      {/* Summary */}
      {summary && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h3>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Target Audience */}
      {targetAudience && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Target Audience</h3>
          <p className="text-gray-700 leading-relaxed">{targetAudience}</p>
        </div>
      )}

      {/* First Customers */}
      {firstCustomers && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">👥 First Potential Customers</h3>
          <p className="text-gray-700 leading-relaxed">{firstCustomers}</p>
        </div>
      )}

      {/* Risks and Opportunities */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Risks */}
        {risks && risks.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">⚠️ Key Risks</h3>
            <ul className="space-y-3">
              {risks.map((risk, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700 leading-relaxed">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Opportunities */}
        {opportunities && opportunities.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🚀 Key Opportunities</h3>
            <ul className="space-y-3">
              {opportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700 leading-relaxed">{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Market Insights */}
      {marketInsights && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Market Insights</h3>
          <p className="text-gray-700 leading-relaxed">{marketInsights}</p>
        </div>
      )}

      {/* Competitor Analysis */}
      {competitorAnalysis && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔍 Competitor Analysis</h3>
          <p className="text-gray-700 leading-relaxed">{competitorAnalysis}</p>
        </div>
      )}

      {/* Recommended Next Steps */}
      {recommendedNextSteps && recommendedNextSteps.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">✅ Recommended Next Steps</h3>
          <ol className="space-y-3">
            {recommendedNextSteps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-600 font-semibold mr-3">{index + 1}.</span>
                <span className="text-gray-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
