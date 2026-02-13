"use client";

import { experiments } from "@/lib/experiments-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Code2, Trophy } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export default function ExperimentsPage() {
    const { languageConfig } = useLanguage();

    const allowedLanguages = ['javascript', 'html', 'python', 'c', 'cpp'];

    if (!allowedLanguages.includes(languageConfig.id)) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Experiments</h1>
                <p>Experiments are currently only available for JavaScript, HTML, Python, C, and C++.</p>
                <div className="mt-8">
                    <Button asChild>
                        <Link href={`/${languageConfig.id}/learn`}>Back to Learning</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const filteredExperiments = experiments.filter(exp => {
        if (languageConfig.id === 'html') return exp.category === 'HTML';
        if (languageConfig.id === 'javascript') return exp.category !== 'HTML' && exp.category !== 'Python' && exp.category !== 'C' && exp.category !== 'CPP';
        if (languageConfig.id === 'python') return exp.category === 'Python';
        if (languageConfig.id === 'c') return exp.category === 'C';
        if (languageConfig.id === 'cpp') return exp.category === 'CPP';
        return false;
    });

    return (
        <div className="space-y-8 container mx-auto pb-16">
            <div className="text-center py-8">
                <Badge variant="secondary" className="mb-4">Hands-on Practice</Badge>
                <h1 className="text-4xl font-extrabold mb-4">{languageConfig.displayName} Experiments</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Apply your knowledge by building real mini-projects.
                    {languageConfig.id === 'html'
                        ? ' From basic forms to complex semantic layouts.'
                        : ' From DOM manipulation to complete games.'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExperiments.map((exp) => (
                    <ExperimentCard key={exp.id} experiment={exp} language={languageConfig.id} />
                ))}
            </div>
        </div>
    );
}

function ExperimentCard({ experiment, language }: { experiment: any, language: string }) {
    const difficultyColor = {
        Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };

    return (
        <Card className="hover:shadow-lg transition-all border-border/50">
            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{experiment.category}</Badge>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColor[experiment.difficulty as keyof typeof difficultyColor]}`}>
                        {experiment.difficulty}
                    </span>
                </div>
                <CardTitle className="text-xl flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-primary" />
                    {experiment.title}
                </CardTitle>
                <CardDescription>
                    {experiment.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                    {experiment.concept}
                </div>
                <Button className="w-full" asChild>
                    <Link href={`/${language}/experiments/${experiment.id}`}>
                        Start Project
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
