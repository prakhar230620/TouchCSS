
'use server';
/**
 * @fileOverview Converts standard CSS to Tailwind CSS utility classes.
 *
 * - convertCssToTailwind - A function that handles the CSS to Tailwind conversion.
 * - ConvertCssToTailwindInput - The input type for the convertCssToTailwind function.
 * - ConvertCssToTailwindOutput - The return type for the convertCssToTailwind function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConvertCssToTailwindInputSchema = z.object({
  cssToConvert: z.string().describe('The standard CSS code snippet to convert to Tailwind CSS.'),
});
export type ConvertCssToTailwindInput = z.infer<typeof ConvertCssToTailwindInputSchema>;

const ConvertCssToTailwindOutputSchema = z.object({
  tailwindClasses: z.string().describe('The equivalent Tailwind CSS utility classes.'),
});
export type ConvertCssToTailwindOutput = z.infer<typeof ConvertCssToTailwindOutputSchema>;

export async function convertCssToTailwind(input: ConvertCssToTailwindInput): Promise<ConvertCssToTailwindOutput> {
  return convertCssToTailwindFlow(input);
}

const prompt = ai.definePrompt({
  name: 'convertCssToTailwindPrompt',
  input: {schema: ConvertCssToTailwindInputSchema},
  output: {schema: ConvertCssToTailwindOutputSchema},
  prompt: `You are an expert CSS and Tailwind CSS developer. Your task is to convert the given standard CSS code into its equivalent Tailwind CSS utility classes.

Provide only the Tailwind classes as a single string, suitable for use in an HTML class attribute. Do not include any HTML structure, explanations, or apologies.

Focus on accurate conversion of properties like display, flex, grid, padding, margin, colors (use generic Tailwind color names like bg-blue-500, text-red-600, rather than var(--primary) unless the CSS explicitly uses variables that map directly to Tailwind theme concepts), typography, borders, shadows, etc.
For CSS variables like 'var(--primary)', if it's a common theme variable, you can map it to a conceptual Tailwind class like 'bg-primary' or 'text-primary'. If it's a custom variable, try to infer its purpose or use a JIT arbitrary value if necessary.
Handle pseudo-classes like :hover, :focus by prefixing the utility classes (e.g., hover:bg-blue-700).

CSS to convert:
\`\`\`css
{{{cssToConvert}}}
\`\`\`

Respond with only the Tailwind classes. For example, if the CSS is '.my-class { color: blue; padding: 1rem; }', your output should be 'text-blue-500 p-4'.
If the CSS defines multiple selectors or complex rules, try to provide the most direct Tailwind equivalent for the primary selector, or a set of classes that achieve the same visual result.
If a direct conversion isn't possible or too complex for simple utility classes, state that "Direct Tailwind conversion is complex for this snippet."
`,
});

const convertCssToTailwindFlow = ai.defineFlow(
  {
    name: 'convertCssToTailwindFlow',
    inputSchema: ConvertCssToTailwindInputSchema,
    outputSchema: ConvertCssToTailwindOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
