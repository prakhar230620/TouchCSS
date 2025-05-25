
// This file ensures flows are imported for their side-effect of registering
// with the 'ai' instance from 'instance.ts'.
// It also re-exports the 'ai' instance for other parts of the application that might need it.

import { ai } from '@/ai/instance'; // Import the configured ai instance

// Import flows for their side-effect of registering with the 'ai' instance.
// The NextJsPlugin, initialized in 'instance.ts', will pick these up.
// import '@/ai/flows/check-css-exercise-flow'; // Removed
import '@/ai/flows/convert-css-to-tailwind-flow';
import '@/ai/flows/explain-css';

export { ai }; // Re-export the ai instance
