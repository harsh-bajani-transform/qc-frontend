/**
 * Centralized environment variables
 * Access this module instead of process.env directly throughout the application
 */
const env = {
  // Python backend URL (public, accessible from client)
  pythonBackendUrl: process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL,
  
  // Node.js backend URL (public, accessible from client)
  nodeBackendUrl: process.env.NEXT_PUBLIC_NODE_BACKEND_URL,
  
  // Vercel URL (optional)
  getBaseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  
  // Add more env vars here as needed
} as const;

/**
 * Get the Python backend URL (public)
 * This can be accessed from both client and server
 * Throws an error if not configured
 */
export function getPythonBackendUrl(): string {
  const url = env.pythonBackendUrl;
  if (!url) {
    throw new Error(
      "Python Backend URL is not configured. Please set NEXT_PUBLIC_PYTHON_BACKEND_URL in your environment variables."
    );
  }
  return url;
}



/**
 * Get the Node.js backend URL (public)
 * This can be accessed from both client and server
 * Throws an error if not configured
 */
export function getNodeBackendUrl(): string {
  const url = env.nodeBackendUrl;
  if (!url) {
    throw new Error(
      "Node.js Backend URL is not configured. Please set NEXT_PUBLIC_NODE_BACKEND_URL in your environment variables."
    );
  }
  return url;
}

/**
 * Get the Vercel URL (optional)
 */
export function getBaseUrl(): string | undefined {
  return env.getBaseUrl;
}

/**
 * Export all environment variables as a typed object
 * Use this for accessing env vars throughout the application
 */
export const envVars = {
  pythonBackendUrl: getPythonBackendUrl,
  nodeBackendUrl: getNodeBackendUrl,
  baseUrl: getBaseUrl,
} as const;

