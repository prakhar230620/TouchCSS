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
    googleAI(), // This will use GOOGLE_API_KEY from .env
    NextJsPlugin(),
  ],
  logLevel: 'debug', // Recommended for development
  enableTracingAndMetrics: true, // Recommended for development
});
