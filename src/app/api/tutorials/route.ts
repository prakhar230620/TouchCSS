import { getAllTutorials } from '@/lib/tutorial-loader';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');

    if (!language) {
        return NextResponse.json({ error: 'Language required' }, { status: 400 });
    }

    const tutorials = getAllTutorials(language);
    return NextResponse.json(tutorials);
}
