export default function ReportHistory({ reports, onSelectReport }) {
  if (!reports || reports.length === 0) {
    return null;
  }

  const getRecommendationBadge = (recommendation) => {
    const colors = {
      'GO': 'bg-green-100 text-green-800',
      'NO-GO': 'bg-red-100 text-red-800',
      'PROCEED WITH CAUTION': 'bg-yellow-100 text-yellow-800'
    };

    return colors[recommendation] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Previous Reports</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div
              key={report.reportId}
              className="p-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              onClick={() => onSelectReport(report)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(report.createdAt)}
                  </p>
                  <p className="text-gray-900 line-clamp-2 mb-3">
                    {report.idea}
                  </p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRecommendationBadge(report.validationReport.recommendation)}`}>
                    {report.validationReport.recommendation}
                  </span>
                </div>
                <svg
                  className="ml-4 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
