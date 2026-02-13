"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { generateAIResponse } from "@/lib/ai-providers";
import { getAIProvider, getAPIKey, hasAPIKey } from "@/lib/api-key-storage";
import { useToast } from "@/hooks/use-toast";
import { AISettingsDialog } from "@/components/ai-settings-dialog";
import { useLanguage } from "@/contexts/language-context";

export function AICodeExplainer() {
    const [code, setCode] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const { toast } = useToast();
    const { languageConfig } = useLanguage();

    const handleExplain = async () => {
        if (!code.trim()) return;

        if (!hasAPIKey()) {
            setShowSettings(true);
            return;
        }

        setIsLoading(true);
        setExplanation('');

        try {
            const provider = getAIProvider();
            const apiKey = getAPIKey(provider);

            if (!apiKey) throw new Error("API Key not found");

            const prompt = `
      You are an expert ${languageConfig.displayName} Tutor.
      Explain the following ${languageConfig.displayName} code in simple terms:
      
      \`\`\`${languageConfig.id}
      ${code}
      \`\`\`
      
      Focus on key concepts and best practices. Format with Markdown.
      `;

            const response = await generateAIResponse(provider, apiKey, prompt);
            setExplanation(response.text);
        } catch (error: any) {
            console.error(error);
            toast({
                title: "AI Error",
                description: error.message || "Failed to explain code.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <AISettingsDialog
                open={showSettings}
                onOpenChange={setShowSettings}
            />

            <div className="space-y-2">
                <label className="text-sm font-medium">Paste your {languageConfig.displayName} code:</label>
                <Textarea
                    placeholder={`e.g. \n${languageConfig.id === 'css' ? '.container { display: flex; }' : 'function hello() { return "world"; }'}`}
                    className="min-h-[150px] font-mono text-sm"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>

            <Button
                onClick={handleExplain}
                disabled={isLoading || !code.trim()}
                className="w-full sm:w-auto"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                    </>
                ) : (
                    <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Explain Code
                    </>
                )}
            </Button>

            {explanation && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Explanation</h3>
                        <Button variant="ghost" size="sm" onClick={() => {
                            navigator.clipboard.writeText(explanation);
                            toast({ title: "Copied to clipboard" });
                        }}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="bg-muted/50 p-6 rounded-lg prose dark:prose-invert max-w-none text-sm">
                        <div className="whitespace-pre-wrap">{explanation}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
