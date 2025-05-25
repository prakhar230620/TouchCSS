
'use server';
/**
 * @fileOverview Centralized Genkit AI instance creation.
 * This file defines and exports the 'ai' object configured with necessary plugins.
 * Flows should import 'ai' from this file.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {NextJsPlugin} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    googleAI(),
    NextJsPlugin(), // Initialize NextJsPlugin with the ai instance
  ],
  // Removed global model configuration to simplify initialization
  // model: 'googleai/gemini-1.5-flash-latest', 
});

