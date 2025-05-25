// This file ensures flows are imported for their side-effect of registering
// with the 'ai' instance from 'instance.ts'.
// It also re-exports the 'ai' instance for other parts of the application that might need it.

import { ai } from '@/ai/instance'; // Import the configured ai instance

// Import flows for their side-effect of registering with the 'ai' instance.
// The NextJsPlugin, initialized in 'instance.ts', will pick these up.
import '@/ai/flows/explain-css';
// Ensure other re-implemented flows are imported here as well.

export { ai }; // Re-export the ai instance
