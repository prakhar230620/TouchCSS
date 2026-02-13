import { getTutorial } from '@/lib/tutorial-loader';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { TutorialContent } from '@/components/tutorial-content';

interface TutorialPageProps {
    params: {
        level: string;
        id: string;
    };
}

export default async function TutorialPage({ params }: TutorialPageProps) {
    const { level, id } = await params;
    const tutorial = getTutorial('css', level, id);

    if (!tutorial) {
        notFound();
    }

    const levelColors = {
        beginner: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800',
        intermediate: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
        advanced: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
    };

    return (
        <div className="max-w-5xl mx-auto pb-32">
            {/* Header */}
            <div className="mb-8 pb-6 border-b">
                <Link href="/css/learn">
                    <Button variant="ghost" size="sm" className="mb-6 -ml-2">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to CSS Lessons
                    </Button>
                </Link>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Badge variant="outline" className={`${levelColors[tutorial.level]} text-sm px-3 py-1`}>
                        {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{tutorial.duration}</span>
                    </div>
                    {tutorial.prerequisites.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <BookOpen className="w-4 h-4" />
                            <span>{tutorial.prerequisites.length} prerequisite(s)</span>
                        </div>
                    )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {tutorial.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    {tutorial.description}
                </p>
            </div>

            {/* Content - Now using client component */}
            <TutorialContent content={tutorial.content} />

            {/* Fixed Bottom Navigation */}
            <div className="fixed bottom-20 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border shadow-lg z-40">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center gap-4">
                        <Link href="/css/learn" className="flex-1 max-w-xs">
                            <Button variant="outline" className="w-full">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                All Lessons
                            </Button>
                        </Link>

                        <Link href="/css/build" className="flex-1 max-w-xs">
                            <Button className="w-full">
                                Practice with Editors
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
