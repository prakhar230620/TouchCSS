"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Move, Sparkles, Type, Sliders, Wand2, FlaskConical, Play, ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { experiments } from "@/lib/experiments-data"; // We can reuse this data

export default function BuildPage() {
    const { languageConfig, currentLanguage } = useLanguage();

    interface EditorItem {
        id: string;
        title: string;
        description: string;
        icon: React.ElementType;
        href: string;
        comingSoon?: boolean;
    }

    // Visual editors configuration based on language
    const getEditors = (): EditorItem[] => {
        if (currentLanguage === 'css') {
            return [
                {
                    id: 'box-shadow',
                    title: 'Box Shadow Editor',
                    description: 'Design complex box shadows with real-time preview',
                    icon: Sparkles,
                    href: '/build/box-shadow',
                },
                {
                    id: 'gradient',
                    title: 'Gradient Generator',
                    description: 'Create beautiful gradients visually',
                    icon: Palette,
                    href: '/build/gradient',
                },
                {
                    id: 'transform',
                    title: 'Transform Editor',
                    description: 'Visualize and build CSS transforms',
                    icon: Move,
                    href: '/build/transform',
                },
                {
                    id: 'typography',
                    title: 'Typography Editor',
                    description: 'Fine-tune fonts and text styles',
                    icon: Type,
                    href: '/build/typography',
                },
                {
                    id: 'filter',
                    title: 'Filter Editor',
                    description: 'Apply and preview CSS filters',
                    icon: Sliders,
                    href: '/build/filter',
                },
                {
                    id: 'animation',
                    title: 'Animation Editor',
                    description: 'Build CSS animations visually',
                    icon: Wand2,
                    href: '/build/animation',
                },
            ];
        } else if (currentLanguage === 'javascript') {
            return [
                // Future visual builders
                {
                    id: 'function-builder',
                    title: 'Function Builder',
                    description: 'Build JavaScript functions visually',
                    icon: Wand2,
                    href: '#',
                    comingSoon: true,
                },
                {
                    id: 'dom-manipulator',
                    title: 'DOM Manipulator',
                    description: 'Visual DOM tree editing',
                    icon: Sparkles,
                    href: '#',
                    comingSoon: true,
                },
            ];
        }
        return [];
    };

    const editors = getEditors();
    const hasVisualEditors = editors.length > 0 && currentLanguage === 'css'; // Only CSS has working visual editors right now
    const hasExperiments = currentLanguage === 'javascript' || currentLanguage === 'html' || currentLanguage === 'python' || currentLanguage === 'c' || currentLanguage === 'cpp'; // All supported with experiments

    const featuredExperiments = experiments.filter(exp => {
        if (currentLanguage === 'html') return exp.category === 'HTML';
        if (currentLanguage === 'python') return exp.category === 'Python';
        if (currentLanguage === 'c') return exp.category === 'C';
        if (currentLanguage === 'cpp') return exp.category === 'CPP';
        if (currentLanguage === 'javascript') return exp.category !== 'HTML' && exp.category !== 'Python' && exp.category !== 'C' && exp.category !== 'CPP';
        return false;
    }).slice(0, 6); // Show up to 6 for now

    return (
        <div className="space-y-12 pb-16">
            {/* Hero Section */}
            <div className="text-center py-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                    Build with {languageConfig.displayName}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Create, experiment, and build real projects.
                </p>
            </div>

            {hasExperiments && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <FlaskConical className="h-6 w-6 text-primary" />
                            Hands-on Experiments
                        </h2>
                        <Button variant="ghost" asChild>
                            <Link href={`/${currentLanguage}/experiments`}>
                                View All <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredExperiments.map((exp) => (
                            <Card key={exp.id} className="hover:shadow-md transition-all">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Code2 className="h-5 w-5 text-green-500" />
                                        {exp.title}
                                    </CardTitle>
                                    <CardDescription>{exp.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full" asChild>
                                        <Link href={`/${currentLanguage}/experiments/${exp.id}`}>
                                            Start Project
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="bg-muted/30 p-8 rounded-xl text-center border border-dashed">
                        <h3 className="text-xl font-semibold mb-2">Want to practice freely?</h3>
                        <p className="text-muted-foreground mb-6">Use the playground to write and execute any code.</p>
                        <Button size="lg" variant="default" asChild>
                            <Link href={`/${currentLanguage}/playground`}>
                                <Play className="mr-2 h-5 w-5" /> Open Code Editor
                            </Link>
                        </Button>
                    </div>
                </div>
            )}

            {/* Visual Editors Section */}
            {editors.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Wand2 className="h-6 w-6 text-purple-500" />
                        Visual Tools
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {editors.map((editor) => (
                            <Card
                                key={editor.id}
                                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block h-full"
                            >
                                <CardHeader>
                                    <editor.icon className="h-10 w-10 text-primary mb-3" />
                                    <CardTitle className="flex items-center justify-between text-lg">
                                        {editor.title}
                                        {editor.comingSoon && (
                                            <span className="text-[10px] uppercase tracking-wider bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded font-bold">
                                                Soon
                                            </span>
                                        )}
                                    </CardTitle>
                                    <CardDescription>{editor.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild={!editor.comingSoon} disabled={editor.comingSoon} variant="outline" className="w-full">
                                        {editor.comingSoon ? (
                                            <span>Under Development</span>
                                        ) : (
                                            <Link href={editor.href}>Open Tool</Link>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!hasVisualEditors && !hasExperiments && (
                <div className="text-center py-16 bg-muted/20 rounded-xl">
                    <Wand2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Tools for {languageConfig.displayName} are continuously being added.
                    </p>
                </div>
            )}
        </div>
    );
}
