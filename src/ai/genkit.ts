
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {NextJsPlugin} from '@genkit-ai/next'; // Import the NextJsPlugin

export const ai = genkit({
  plugins: [
    googleAI(),
    NextJsPlugin(), // Add the NextJsPlugin here
  ],
  model: 'googleai/gemini-2.0-flash',
});
