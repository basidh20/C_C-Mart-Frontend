// API configuration
export const API_BASE_URL = 'http://localhost:8080/api';
export const BACKEND_BASE_URL = 'http://localhost:8080';

// HTTP client with default configuration
const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  },
};

// Utility function to get full image URL
export const getImageUrl = (imagePath: string | null): string => {
  if (!imagePath) {
    return 'https://via.placeholder.com/300x200?text=No+Image';
  }
  return `${BACKEND_BASE_URL}${imagePath}`;
};

export default apiClient;