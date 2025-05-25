'use server';
/**
 * @fileOverview Centralized AI instance creation with OpenAI SDK structure
 * This file defines and exports the AI functionality for API integration.
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
