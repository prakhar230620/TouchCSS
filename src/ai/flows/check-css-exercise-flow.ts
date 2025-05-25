
'use server';
/**
 * @fileOverview An AI agent that checks a user's CSS solution for an exercise.
 *
 * - checkCssExercise - A function that handles the CSS exercise checking process.
 * - CheckCssExerciseInput - The input type for the checkCssExercise function.
 * - CheckCssExerciseOutput - The return type for the checkCssExercise function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckCssExerciseInputSchema = z.object({
  userCss: z.string().describe("The user's submitted CSS code for the exercise."),
  initialHtml: z.string().describe("The initial HTML structure provided for the exercise."),
  solutionCss: z.string().describe("The model solution CSS for the exercise."),
  learningGoals: z.array(z.string()).describe("The learning goals for this specific exercise."),
  targetDescription: z.string().describe("A textual description of what the styled HTML should look like or achieve."),
  exerciseTitle: z.string().describe("The title of the exercise being checked.")
});
export type CheckCssExerciseInput = z.infer<typeof CheckCssExerciseInputSchema>;

const CheckCssExerciseOutputSchema = z.object({
  overallAssessment: z.enum(["Correct", "Partially Correct", "Needs Improvement", "Good Alternative"]).describe("A high-level assessment of the user's solution."),
  detailedFeedback: z.string().describe("Detailed textual feedback explaining the assessment, highlighting correct aspects, and identifying areas for improvement."),
  metLearningGoals: z.array(z.string()).describe("A list of learning goals that the AI determines the user's solution successfully met."),
  missedOrPartialGoals: z.array(z.string()).describe("A list of learning goals that the AI determines were missed or only partially met, with brief explanations if possible."),
  suggestionsForImprovement: z.array(z.string()).describe("Specific, actionable suggestions to improve the user's CSS or better meet the exercise objectives."),
  score: z.number().min(0).max(100).optional().describe("An optional numerical score (0-100) representing the perceived correctness or completeness.")
});
export type CheckCssExerciseOutput = z.infer<typeof CheckCssExerciseOutputSchema>;

export async function checkCssExercise(input: CheckCssExerciseInput): Promise<CheckCssExerciseOutput> {
  return checkCssExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkCssExercisePrompt',
  input: {schema: CheckCssExerciseInputSchema},
  output: {schema: CheckCssExerciseOutputSchema},
  prompt: `You are an expert CSS programming tutor evaluating a student's solution for a CSS exercise titled "{{exerciseTitle}}".
The student was given the following initial HTML structure:
\`\`\`html
{{{initialHtml}}}
\`\`\`

The learning goals for this exercise are:
{{#each learningGoals}}
- {{{this}}}
{{/each}}

The target output is described as: "{{targetDescription}}".

The student submitted the following CSS:
\`\`\`css
{{{userCss}}}
\`\`\`

Here is the model solution CSS for reference:
\`\`\`css
{{{solutionCss}}}
\`\`\`

Your task is to:
1.  Analyze the student's CSS ('userCss') in the context of the 'initialHtml'.
2.  Determine how well it achieves the 'targetDescription' and meets the 'learningGoals'.
3.  Compare the student's approach to the 'solutionCss'. The student's solution might be a valid alternative even if different.
4.  Provide an 'overallAssessment': "Correct" if it perfectly meets goals and target; "Partially Correct" if some goals/targets are met but others missed or flawed; "Needs Improvement" if it's largely incorrect or misses key goals; "Good Alternative" if it's correct but significantly different from the model solution in a positive way.
5.  Write 'detailedFeedback': Be encouraging and constructive. Explain what the student did well and what could be improved. If there are errors (syntax, logical), point them out clearly.
6.  Identify 'metLearningGoals': List which of the original learning goals the student's solution clearly demonstrates.
7.  Identify 'missedOrPartialGoals': List which learning goals were not met, or only partially met, and briefly explain why.
8.  Offer 'suggestionsForImprovement': Provide specific, actionable advice. For example, "Consider using 'justify-content: space-between;' on the '.navbar' to achieve even spacing." or "The 'padding' on your '.button' could be increased for better visual balance."
9.  (Optional) Provide a 'score' from 0 to 100 based on overall correctness, completeness, and adherence to learning goals.

Focus on conceptual understanding and practical application of CSS as per the learning goals.
Do not just say if it matches the solution CSS; evaluate its effectiveness independently.
If the user's CSS is very minimal or clearly doesn't address the problem, state that in the feedback.
Structure your response strictly according to the 'CheckCssExerciseOutputSchema'.
`,
});

const checkCssExerciseFlow = ai.defineFlow(
  {
    name: 'checkCssExerciseFlow',
    inputSchema: CheckCssExerciseInputSchema,
    outputSchema: CheckCssExerciseOutputSchema,
  },
  async (input) => {
    // Basic validation: if user CSS is too short, provide a default "Needs Improvement"
    if (input.userCss.trim().length < 10) {
      return {
        overallAssessment: "Needs Improvement",
        detailedFeedback: "Your CSS solution appears to be incomplete. Please write more CSS to address the exercise requirements.",
        metLearningGoals: [],
        missedOrPartialGoals: input.learningGoals,
        suggestionsForImprovement: ["Make sure to apply styles to the elements defined in the initial HTML.", "Refer to the learning goals and target description."],
        score: 5,
      };
    }

    const {output} = await prompt(input);
    if (!output) {
        throw new Error("The AI failed to provide an analysis for the CSS exercise.");
    }
    return output;
  }
);
