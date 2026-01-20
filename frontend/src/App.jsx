import { useState, useEffect } from 'react';
import IdeaForm from './components/IdeaForm';
import ValidationReport from './components/ValidationReport';
import ReportHistory from './components/ReportHistory';
import { apiClient } from './api/client';

function App() {
  const [currentReport, setCurrentReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showNewIdeaForm, setShowNewIdeaForm] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await apiClient.getReports();
      setReports(data.reports || []);
    } catch (err) {
      console.error('Error loading reports:', err);
    }
  };

  const handleSubmitIdea = async (idea) => {
    setIsLoading(true);
    setError('');
    
    try {
      const report = await apiClient.validateIdea(idea);
      setCurrentReport(report);
      setShowNewIdeaForm(false);
      await loadReports();
    } catch (err) {
      setError(err.message || 'Failed to validate idea. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectReport = (report) => {
    setCurrentReport(report);
    setShowNewIdeaForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewIdea = () => {
    setCurrentReport(null);
    setShowNewIdeaForm(true);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                AI Co-Founder
              </h1>
              <p className="mt-1 text-gray-600">Your AI-powered startup idea validator</p>
            </div>
            {currentReport && (
              <button
                onClick={handleNewIdea}
                className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                + New Idea
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Show Form or Report */}
        {showNewIdeaForm ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Validate Your Startup Idea
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get instant AI-powered insights, market analysis, and recommendations 
                to help you decide if your idea is worth pursuing.
              </p>
            </div>
            <IdeaForm onSubmit={handleSubmitIdea} isLoading={isLoading} />
            
            {reports.length > 0 && (
              <div className="mt-16">
                <ReportHistory reports={reports} onSelectReport={handleSelectReport} />
              </div>
            )}
          </>
        ) : (
          <ValidationReport report={currentReport} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            Powered by GROQ AI • Built with React & TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
