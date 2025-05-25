import { NextRequest } from 'next/server';
import { explainCssFlow } from '@/ai/flows/explain-css';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();
    const result = await explainCssFlow(input);
    
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in explainCssFlow API route:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    const status = errorMessage.includes('must be at least') || errorMessage.includes('must not exceed') 
      ? 400  // Validation errors
      : 500; // Server errors

    return new Response(
      JSON.stringify({
        error: 'Failed to process CSS explanation request',
        details: errorMessage,
      }),
      {
        status,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
