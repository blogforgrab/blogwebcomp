// API base URL configuration
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://apiblog.grabatoz.ae' 
  : '';

// Helper function to create API URLs
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  if (import.meta.env.PROD) {
    return `${API_BASE_URL}/${cleanEndpoint}`;
  } else {
    // In development, use relative URLs which will be proxied by Vite
    return `/${cleanEndpoint}`;
  }
};

// Helper function for making API requests with proper error handling
export const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include credentials for CORS
      mode: 'cors', // Explicitly set CORS mode
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
};
