/**
 * Environment configuration
 * Centralized environment variables management
 */

interface EnvironmentConfig {
  api: {
    baseUrl: string;
    timeout: number;
  };
  app: {
    name: string;
    version: string;
    debugMode: boolean;
  };
}

/**
 * Get environment variable with fallback
 */
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  return import.meta.env[key] || defaultValue;
};

/**
 * Get boolean environment variable
 */
const getBooleanEnvVar = (key: string, defaultValue: boolean = false): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true';
};

/**
 * Get number environment variable
 */
const getNumberEnvVar = (key: string, defaultValue: number = 0): number => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Environment configuration object
 */
export const environment: EnvironmentConfig = {
  api: {
    baseUrl: getEnvVar('VITE_API_BASE_URL', 'https://jsonplaceholder.typicode.com'),
    timeout: getNumberEnvVar('VITE_API_TIMEOUT', 10000),
  },
  app: {
    name: getEnvVar('VITE_APP_NAME', 'React Technical Challenge'),
    version: getEnvVar('VITE_APP_VERSION', '1.0.0'),
    debugMode: getBooleanEnvVar('VITE_DEBUG_MODE', false),
  },
};

/**
 * Validate required environment variables
 */
export const validateEnvironment = (): void => {
  const requiredVars = ['VITE_API_BASE_URL'];
  
  const missingVars = requiredVars.filter(varName => !getEnvVar(varName));
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
};

export default environment;
