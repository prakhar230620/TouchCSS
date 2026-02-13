"use client";

import { AICodeExplainer } from "@/components/ai-code-explainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function AIExplainerPage() {
    const { languageConfig } = useLanguage();

    return (
        <div className="max-w-3xl mx-auto py-8">
            <Card className="rounded-2xl shadow-xl overflow-hidden border-primary/20 bg-card">
                <CardHeader className="bg-primary/10 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <div className="p-3 bg-primary/20 rounded-full">
                            <BrainCircuit className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-3xl sm:text-4xl font-bold text-primary">
                                AI {languageConfig.displayName} Explainer
                            </CardTitle>
                            <CardDescription className="text-md sm:text-lg text-muted-foreground mt-1">
                                Paste any {languageConfig.displayName} code snippet and get a clear, human-readable explanation.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                    <AICodeExplainer />
                </CardContent>
            </Card>
            <p className="text-center text-sm text-muted-foreground mt-8 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                Powered by KeyCodeX AI (Gemini & Groq)
            </p>
        </div>
    );
}
