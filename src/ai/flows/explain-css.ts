
'use server'; // Corrected: 'use server' should be a string literal

/**
 * @fileOverview Explains CSS snippets in plain English.
 *
 * - explainCss - A function that handles the CSS explanation process.
 * - ExplainCssInput - The input type for the explainCss function.
 * - ExplainCssOutput - The return type for the explainCss function.
 */

import {ai} from '@/ai/instance';
import {z} from 'genkit';

const ExplainCssInputSchema = z.object({
  cssCode: z.string().describe('The CSS code snippet to explain.'),
});
export type ExplainCssInput = z.infer<typeof ExplainCssInputSchema>;

const ExplainCssOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the CSS code.'),
});
export type ExplainCssOutput = z.infer<typeof ExplainCssOutputSchema>;

export async function explainCss(input: ExplainCssInput): Promise<ExplainCssOutput> {
  // This wrapper function is typically what client-side components would call if not using the /api/flows route directly.
  // For diagnosing 404s on the API route, the flow's own logic is more critical.
  // However, for completeness, ensuring it can work:
  // return explainCssFlow(input); // Original call
  console.log("explainCss wrapper function called with input:", input.cssCode); // Server-side log
  // This simplified return is if you were calling this function directly, not the flow via API.
  // The flow itself (below) is what the API route executes.
  return { explanation: `Simplified explanation from wrapper for: ${input.cssCode}` };
}

// Temporarily removed prompt for extreme simplification to debug 404 issues.
/*
const prompt = ai.definePrompt({
  name: 'explainCssPrompt',
  input: {schema: ExplainCssInputSchema},
  output: {schema: ExplainCssOutputSchema},
  prompt: `You are a CSS expert. Explain the following CSS code in plain English:\n\nCSS code:\n{{{cssCode}}}`,
});
*/

const explainCssFlow = ai.defineFlow(
  {
    name: 'explainCssFlow', // Ensure this name is exact and matches the API call path
    inputSchema: ExplainCssInputSchema,
    outputSchema: ExplainCssOutputSchema,
  },
  async (input: ExplainCssInput) => {
    console.log('explainCssFlow (simplified version) invoked on server with input CSS:', input.cssCode); // Server-side log

    // Directly return a valid output matching the schema, bypassing the LLM for now.
    // This helps determine if the issue is with the route registration or the LLM interaction.
    return {
      explanation: `This is a diagnostic, simplified explanation for the CSS: "${input.cssCode}". The AI prompt and LLM call are currently bypassed for testing the API route. If you see this, the API route is working.`,
    };
  }
);
