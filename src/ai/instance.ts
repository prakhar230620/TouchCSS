'use server';
/**
 * @fileOverview DEPRECATED - Server-side AI instance
 * @deprecated This file is no longer used. The app now uses client-side AI integration.
 * All AI functionality has moved to client-side with user-provided API keys.
 * See: src/lib/ai-providers.ts for the new implementation.
 * 
 * This file is kept for reference only and may be removed in future versions.
 */

import OpenAI from 'openai';

// Initialize client with OpenAI's SDK but pointing to GROQ's API
const ai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1', // GROQ's OpenAI-compatible endpoint
});

// Helper function to make chat completions
export async function createCompletion(prompt: string, options: {
  temperature?: number;
  maxTokens?: number;
  model?: string;
} = {}) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY environment variable is not set');
  }

  try {
    const completion = await ai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: options.model || "llama-3.3-70b-versatile",
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 2048,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
}
