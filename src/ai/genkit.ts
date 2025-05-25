
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {NextJsPlugin} from '@genkit-ai/next'; // Import the NextJsPlugin

// Import flows that need to be exposed as API routes by NextJsPlugin
import '@/ai/flows/check-css-exercise-flow';
import '@/ai/flows/convert-css-to-tailwind-flow';
import '@/ai/flows/explain-css';


export const ai = genkit({
  plugins: [
    googleAI(),
    NextJsPlugin(), // Add the NextJsPlugin here
  ],
  model: 'googleai/gemini-2.0-flash',
});
