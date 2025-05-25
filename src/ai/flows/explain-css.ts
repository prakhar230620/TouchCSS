
'use server'; // Corrected: 'use server' should be a string literal

/**
 * @fileOverview Explains CSS snippets in plain English.
 *
 * - explainCss - A function that handles the CSS explanation process.
 * - ExplainCssInput - The input type for the explainCss function.
 * - ExplainCssOutput - The return type for the explainCss function.
 */

import {ai} from '@/ai/instance'; // Changed import from @/ai/genkit to @/ai/instance
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
  return explainCssFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCssPrompt',
  input: {schema: ExplainCssInputSchema},
  output: {schema: ExplainCssOutputSchema},
  prompt: `You are a CSS expert. Explain the following CSS code in plain English:\n\nCSS code:\n{{{cssCode}}}`,
});

const explainCssFlow = ai.defineFlow(
  {
    name: 'explainCssFlow',
    inputSchema: ExplainCssInputSchema,
    outputSchema: ExplainCssOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("The AI failed to provide an explanation for the CSS code.");
    }
    return output;
  }
);
