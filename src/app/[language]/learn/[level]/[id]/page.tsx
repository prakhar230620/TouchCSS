
import { getTutorial } from '@/lib/tutorial-loader';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { TutorialContent } from '@/components/tutorial-content';
import { CompleteLessonButton } from '@/components/complete-lesson-button';

interface TutorialPageProps {
    params: Promise<{
        language: string;
        level: string;
        id: string;
    }>;
}

export default async function TutorialPage({ params }: TutorialPageProps) {
    const { language, level, id } = await params;
    const tutorial = getTutorial(language, level, id);

    if (!tutorial) {
        notFound();
    }

    const levelColors: any = {
        beginner: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
        intermediate: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
        advanced: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
    };

    return (
        <div className="max-w-4xl mx-auto pb-16">
            <div className="mb-8">
                <Link
                    href={`/${language}/learn`}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to {language.charAt(0).toUpperCase() + language.slice(1)} Tutorials
                </Link>

                <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className={levelColors[level] || ''}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Badge>
                    <div className="flex items-center text-muted-foreground text-sm">
                        <Clock className="mr-1 h-3 w-3" />
                        {tutorial.duration}
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    {tutorial.title}
                </h1>

                <p className="text-xl text-muted-foreground">
                    {tutorial.description}
                </p>
            </div>

            <TutorialContent content={tutorial.content} />

            <div className="mt-16 flex justify-between pt-8 border-t">
                <Button variant="outline" asChild>
                    <Link href={`/${language}/learn`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Overview
                    </Link>
                </Button>

                {/* 
                  TODO: Logic to find next tutorial would go here.
                  For now just linking back to list or next lesson if we had that data.
                */}
                <CompleteLessonButton languageId={language} lessonId={id} />
            </div>
        </div>
    );
}

import { CheckCircle } from 'lucide-react';
