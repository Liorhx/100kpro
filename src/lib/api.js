// Only use VITE_API_URL as an absolute prefix in production if it's set
// In development, we use relative paths so the Vite proxy handles the request
const API_BASE_URL = import.meta.env.PROD ? (import.meta.env.VITE_API_URL || '') : '';

export const apiFetch = async (path, options = {}) => {
  // Ensure path starts with /api if it doesn't have a protocol
  const normalizedPath = (!path.startsWith('http') && !path.startsWith('/')) ? `/${path}` : path;
  const url = normalizedPath.startsWith('http') ? normalizedPath : `${API_BASE_URL}${normalizedPath}`;
  const { silent, ...fetchOptions } = options;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      credentials: 'include',
      headers: defaultHeaders,
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'API request failed');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return { data };
  } catch (error) {
    if (!silent) {
      console.error(`[API Network Error] ${path}:`, error.message);
    }
    throw error;
  }
};
