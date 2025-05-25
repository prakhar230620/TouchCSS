'use server';
/**
 * @fileOverview Explains CSS snippets in plain English using GROQ AI.
 */

import { z } from 'zod';
import { createCompletion } from '@/ai/instance';

// Schema validation functions
async function validateInput(input: any) {
  return z.object({
    cssCode: z.string()
      .min(5, "CSS code must be at least 5 characters.")
      .max(3000, "CSS code must not exceed 3000 characters.")
  }).parseAsync(input);
}

async function validateOutput(output: any) {
  return z.object({
    explanation: z.string()
  }).parseAsync(output);
}

export async function explainCssFlow(input: { cssCode: string }) {
  try {
    // Validate input
    const validatedInput = await validateInput(input);

    const prompt = `You are an expert CSS programming tutor. Your goal is to explain the provided CSS code snippet in plain, easy-to-understand English.
Be concise but thorough. Address the following for each rule or significant part of the CSS:
1. What element(s) does the selector target?
2. What does each CSS property do to those elements?
3. Explain any complex values or units simply.
4. If there are multiple rules, explain them sequentially.

Keep the tone friendly and educational, as if explaining to someone learning CSS.

CSS code to explain:
\`\`\`css
${validatedInput.cssCode}
\`\`\`

Provide your explanation below:`;

    const explanation = await createCompletion(prompt, {
      temperature: 0.7,
      maxTokens: 2048,
      model: "llama-3.3-70b-versatile"
    });

    if (!explanation) {
      throw new Error('No explanation was generated');
    }

    // Validate output
    return validateOutput({ explanation });
  } catch (error) {
    console.error('Error in explainCssFlow:', error);
    throw error instanceof Error ? error : new Error('Failed to generate CSS explanation');
  }
}
