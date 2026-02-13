"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, CheckCircle, Lock } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { LanguageId } from "@/lib/language-config";
// import { getAllTutorials } from "@/lib/tutorial-loader"; // Removed server-side import
import { useState, useEffect } from "react";

export default function LearnPage() {
    const { languageConfig } = useLanguage();
    const [tutorials, setTutorials] = useState<any>(null);

    // Fetch tutorials securely on client side or use Server Component pattern (better)
    // For now keeping it client side as this is a "use client" component
    // In a real app we should pass this data from a Server Component parent
    useEffect(() => {
        // We can't use fs in client component. This component should actually be a Server Component!
        // But context usage forces it to be client. 
        // Quick fix: Fetch from API or assume data structure. 
        // ACTUALLY: The best way is to make THIS component Server Side and pass data, 
        // but it uses `useLanguage`.

        // Alternative: Create an API route. 
        // OR: Since we are in local dev, maybe refactor to get data in a parent SC.

        // Let's rely on an API route that we will create.
        fetch(`/api/tutorials?language=${languageConfig.id}`)
            .then(res => res.json())
            .then(data => setTutorials(data))
            .catch(err => console.error(err));

    }, [languageConfig.id]);

    if (!tutorials) return <div className="p-8 text-center">Loading lessons...</div>;

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                    Learn {languageConfig.displayName}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Master {languageConfig.displayName} with interactive tutorials.
                </p>
            </div>

            {/* Learning Path */}
            <div className="space-y-8">
                {/* Beginner */}
                {tutorials.beginner && (
                    <LevelSection
                        title="Getting Started"
                        level="beginner"
                        tutorials={tutorials.beginner}
                        color="green"
                        langId={languageConfig.id}
                    />
                )}

                {/* Intermediate */}
                {tutorials.intermediate && (
                    <LevelSection
                        title="Level Up"
                        level="intermediate"
                        tutorials={tutorials.intermediate}
                        color="blue"
                        langId={languageConfig.id}
                    />
                )}

                {/* Advanced */}
                {tutorials.advanced && (
                    <LevelSection
                        title="Master Level"
                        level="advanced"
                        tutorials={tutorials.advanced}
                        color="purple"
                        langId={languageConfig.id}
                    />
                )}
            </div>
        </div>
    );
}

function LevelSection({ title, level, tutorials, color, langId }: any) {
    if (!tutorials || tutorials.length === 0) return null;

    const colorClasses: any = {
        green: "bg-green-500/10 text-green-600 border-green-600",
        blue: "bg-blue-500/10 text-blue-600 border-blue-600",
        purple: "bg-purple-500/10 text-purple-600 border-purple-600"
    };

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className={colorClasses[color]}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                </Badge>
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tutorials.map((tutorial: any) => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} langId={langId} level={level} />
                ))}
            </div>
        </div>
    );
}

function TutorialCard({ tutorial, langId, level }: { tutorial: any, langId: string, level: string }) {
    const { completedLessons } = useLanguage();
    const isCompleted = completedLessons[langId as LanguageId]?.includes(tutorial.id);

    return (
        <Card className={`hover:shadow-lg transition-all ${isCompleted ? 'border-green-500/50 bg-green-50/5 dark:bg-green-900/10' : ''}`}>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            {isCompleted ? <CheckCircle className="h-5 w-5 text-green-500" /> : <BookOpen className="h-5 w-5 text-primary" />}
                            {tutorial.title}
                        </CardTitle>
                        <CardDescription className="mt-1">{tutorial.duration}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Button className="w-full" variant={isCompleted ? "outline" : "default"} asChild>
                    <Link href={`/${langId}/learn/${level}/${tutorial.id}`}>
                        {isCompleted ? (
                            <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Review Lesson
                            </>
                        ) : (
                            <>
                                <Play className="mr-2 h-4 w-4" />
                                Start Lesson
                            </>
                        )}
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
