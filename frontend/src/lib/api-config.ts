// API base URL - must be set via NEXT_PUBLIC_API_BASE_URL environment variable at build time
// For static export, this must be an absolute URL to your backend server
// Example: https://your-backend-api.railway.app or https://api.yourdomain.com
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

// Helper function to get full API URL
export function getApiUrl(endpoint: string): string {
  // If endpoint already starts with http, return as-is
  if (endpoint.startsWith("http")) {
    return endpoint;
  }
  
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  
  return `${API_BASE_URL}/${cleanEndpoint}`;
}

