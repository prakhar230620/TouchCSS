
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
  model: 'googleai/gemini-2.0-flash',
});
