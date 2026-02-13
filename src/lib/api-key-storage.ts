/**
 * Client-side API key storage utility
 * Stores API keys in browser localStorage
 */

export type AIProvider = 'gemini' | 'groq';

const STORAGE_KEYS = {
  PROVIDER: 'touchcss_ai_provider',
  GEMINI_API_KEY: 'touchcss_gemini_api_key',
  GROQ_API_KEY: 'touchcss_groq_api_key',
} as const;

/**
 * Get the currently selected AI provider
 */
export function getAIProvider(): AIProvider {
  if (typeof window === 'undefined') return 'gemini';
  return (localStorage.getItem(STORAGE_KEYS.PROVIDER) as AIProvider) || 'gemini';
}

/**
 * Set the AI provider preference
 */
export function setAIProvider(provider: AIProvider): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PROVIDER, provider);
}

/**
 * Get API key for a specific provider
 */
export function getAPIKey(provider: AIProvider): string | null {
  if (typeof window === 'undefined') return null;
  
  const key = provider === 'gemini' 
    ? STORAGE_KEYS.GEMINI_API_KEY 
    : STORAGE_KEYS.GROQ_API_KEY;
  
  return localStorage.getItem(key);
}

/**
 * Set API key for a specific provider
 */
export function setAPIKey(provider: AIProvider, apiKey: string): void {
  if (typeof window === 'undefined') return;
  
  const key = provider === 'gemini' 
    ? STORAGE_KEYS.GEMINI_API_KEY 
    : STORAGE_KEYS.GROQ_API_KEY;
  
  localStorage.setItem(key, apiKey.trim());
}

/**
 * Clear API key for a specific provider
 */
export function clearAPIKey(provider: AIProvider): void {
  if (typeof window === 'undefined') return;
  
  const key = provider === 'gemini' 
    ? STORAGE_KEYS.GEMINI_API_KEY 
    : STORAGE_KEYS.GROQ_API_KEY;
  
  localStorage.removeItem(key);
}

/**
 * Clear all stored data (provider selection and API keys)
 */
export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(STORAGE_KEYS.PROVIDER);
  localStorage.removeItem(STORAGE_KEYS.GEMINI_API_KEY);
  localStorage.removeItem(STORAGE_KEYS.GROQ_API_KEY);
}

/**
 * Check if an API key is configured for the current provider
 */
export function hasAPIKey(provider?: AIProvider): boolean {
  const targetProvider = provider || getAIProvider();
  const apiKey = getAPIKey(targetProvider);
  return !!apiKey && apiKey.length > 0;
}

/**
 * Get configuration status for all providers
 */
export function getConfigurationStatus(): {
  currentProvider: AIProvider;
  geminiConfigured: boolean;
  groqConfigured: boolean;
} {
  return {
    currentProvider: getAIProvider(),
    geminiConfigured: hasAPIKey('gemini'),
    groqConfigured: hasAPIKey('groq'),
  };
}
