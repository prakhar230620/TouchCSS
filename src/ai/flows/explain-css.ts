'use server';
/**
 * @fileOverview Explains CSS snippets in plain English using Genkit.
 *
 * - explainCss (exported wrapper for potential direct calls, though NextJsPlugin uses the flow by name)
 * - ExplainCssInputSchema, ExplainCssInput (input type for the flow)
 * - ExplainCssOutputSchema, ExplainCssOutput (output type for the flow)
 * - explainCssFlow (the Genkit flow definition)
 */

import {ai} from '@/ai/instance';
import {z} from 'genkit';

export const ExplainCssInputSchema = z.object({
  cssCode: z.string().min(5, "CSS code must be at least 5 characters.").max(3000, "CSS code must not exceed 3000 characters.").describe('The CSS code snippet to explain.'),
});
export type ExplainCssInput = z.infer<typeof ExplainCssInputSchema>;

export const ExplainCssOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the CSS code.'),
});
export type ExplainCssOutput = z.infer<typeof ExplainCssOutputSchema>;

const explainCssPrompt = ai.definePrompt({
  name: 'explainCssPrompt',
  input: {schema: ExplainCssInputSchema},
  output: {schema: ExplainCssOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest', // Specify the model
  prompt: `You are an expert CSS programming tutor. Your goal is to explain the provided CSS code snippet in plain, easy-to-understand English.
Be concise but thorough. Address the following for each rule or significant part of the CSS:
1.  What element(s) does the selector target?
2.  What does each CSS property do to those elements?
3.  Explain any complex values or units simply.
4.  If there are multiple rules, explain them sequentially.

Keep the tone friendly and educational, as if explaining to someone learning CSS.

CSS code to explain:
\`\`\`css
{{{cssCode}}}
\`\`\`

Provide your explanation below:`,
  // Optional: Configure safety settings to be less restrictive if needed for code examples.
  // Refer to Genkit documentation for details on safety settings.
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  },
});

export const explainCssFlow = ai.defineFlow(
  {
    name: 'explainCssFlow', // This name is used for the API route: /api/flows/explainCssFlow
    inputSchema: ExplainCssInputSchema,
    outputSchema: ExplainCssOutputSchema,
  },
  async (input: ExplainCssInput) => {
    console.log('explainCssFlow invoked with input:', input.cssCode); // Server-side log

    const {output} = await explainCssPrompt(input);

    if (!output) {
      console.error('AI failed to provide an explanation. Input was:', input.cssCode);
      throw new Error("The AI failed to provide an explanation for the CSS code. The model might have returned an empty response or an error.");
    }
    console.log('AI explanation generated:', output.explanation.substring(0,100) + "...");
    return output;
  }
);

// Optional: A wrapper function if you need to call the flow programmatically from server-side code elsewhere.
export async function explainCss(input: ExplainCssInput): Promise<ExplainCssOutput> {
  return explainCssFlow(input);
}
