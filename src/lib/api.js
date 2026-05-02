/**
 * Centralized API utility for standard fetch with production-ready features:
 * - Environment-aware base URL
 * - Automatic JSON parsing with safe fallback
 * - Integrated error logging
 * - Default credentials handling
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiFetch = async (path, options = {}) => {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  const { silent, ...fetchOptions } = options;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      credentials: fetchOptions.credentials || 'include',
      headers: defaultHeaders,
    });

    // Extract content-type to handle non-JSON responses safely
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      if (!silent) {
        console.error(`[API Error] ${response.status} ${url}:`, data);
      }
      
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return { data, response };
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn(`[API Abort] ${url}`);
    } else if (!silent && !error.status) {
      // Only log as "Network Error" if it doesn't have a status (i.e., fetch itself failed)
      console.error(`[API Network Error] ${url}:`, error);
    }
    throw error;
  }
};
