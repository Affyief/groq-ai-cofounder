const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiClient {
  async validateIdea(idea) {
    const response = await fetch(`${API_BASE_URL}/api/ideas/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ idea }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to validate idea');
    }

    return response.json();
  }

  async getReports() {
    const response = await fetch(`${API_BASE_URL}/api/ideas/reports`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch reports');
    }

    return response.json();
  }

  async getReport(reportId) {
    const response = await fetch(`${API_BASE_URL}/api/ideas/reports/${reportId}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch report');
    }

    return response.json();
  }

  async getSession() {
    const response = await fetch(`${API_BASE_URL}/api/ideas/session`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch session');
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
