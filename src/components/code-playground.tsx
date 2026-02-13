"use client";

import { useState, useEffect, useRef } from "react";
import { MonacoEditor } from "./monaco-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Trash2, Wand2, Loader2, Lightbulb, Eye, Terminal, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateAIResponse } from "@/lib/ai-providers";
import { getAIProvider, getAPIKey, hasAPIKey } from "@/lib/api-key-storage";
import { useLanguage } from "@/contexts/language-context";
import { AISettingsDialog } from "@/components/ai-settings-dialog";

interface CodePlaygroundProps {
    initialCode?: string;
    html?: string;
    hint?: string;
}

export function CodePlayground({
    initialCode = "// Write your JavaScript here\nconsole.log('Hello, World!');",
    html,
    hint
}: CodePlaygroundProps) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState(html ? "preview" : "console");
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const playgroundRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const { languageConfig } = useLanguage();

    // Reset preview when code changes? No, only on run.
    // Actually, effective preview update requires DOM injection.

    const runCode = async () => {
        setOutput([]);
        if (activeTab === 'ai') setActiveTab(html ? 'preview' : 'console');

        // JavaScript / HTML (Browser Execution)
        if (languageConfig.id === 'javascript' || languageConfig.id === 'html') {
            const originalLog = console.log;
            const originalError = console.error;
            const logs: any[] = [];

            console.log = (...args) => {
                logs.push({ type: 'log', content: args.map(arg => String(arg)).join(' ') });
                setOutput([...logs]);
            };

            console.error = (...args) => {
                logs.push({ type: 'error', content: args.map(arg => String(arg)).join(' ') });
                setOutput([...logs]);
            };

            try {
                if (html && playgroundRef.current) {
                    const previewContainer = playgroundRef.current.querySelector('#preview-container');
                    if (previewContainer) {
                        previewContainer.innerHTML = html;
                    }
                }

                setTimeout(() => {
                    try {
                        const run = new Function(code);
                        run();
                    } catch (error: any) {
                        console.error(error.message);
                    }
                }, 50);

            } catch (error: any) {
                console.error(error.message);
            } finally {
                console.log = originalLog;
                console.error = originalError;
            }
        }
        // Python / Others (AI Simulation)
        else {
            if (!hasAPIKey()) {
                toast({
                    title: "API Key Required",
                    description: "Please configure your AI API key to run this code.",
                    variant: "destructive"
                });
                setShowSettings(true);
                return;
            }

            // Simulate loading output
            setOutput([{ type: 'log', content: 'Running code via Cloud Runner...' }]);

            try {
                const provider = getAIProvider();
                const apiKey = getAPIKey(provider);
                if (!apiKey) throw new Error("API Key not found");

                const prompt = `
                You are a Code Execution Engine for ${languageConfig.displayName}.
                
                Code to Execute:
                \`\`\`${languageConfig.id}
                ${code}
                \`\`\`
                
                Instructions:
                1. Simulate the execution of this code exactly as a standard interpreter/compiler would.
                2. Return ONLY the output (stdout/stderr).
                3. If there is an error, output the error message exactly.
                4. Do NOT add any markdown formatting or explanations. Just the raw output.
                `;

                const response = await generateAIResponse(provider, apiKey, prompt);

                // Clear "Running..." message and show result
                setOutput([{ type: 'log', content: response.text }]);

            } catch (error: any) {
                setOutput([{ type: 'error', content: `Execution Error: ${error.message}` }]);
            }
        }
    };

    const askAi = async () => {
        if (!code.trim()) return;

        if (!hasAPIKey()) {
            setShowSettings(true);
            return;
        }

        setIsAiLoading(true);
        setActiveTab("ai");
        setAiResponse(null);

        try {
            const provider = getAIProvider();
            const apiKey = getAPIKey(provider);

            if (!apiKey) throw new Error("API Key not found");

            const prompt = `
            You are an expert ${languageConfig.displayName} Tutor.
            The user is working on a coding playground.
            
            Current Code:
            \`\`\`${languageConfig.id}
            ${code}
            \`\`\`
            
            Query: Explain this code, point out any potential errors, and suggest improvements. Be concise.
            `;

            const response = await generateAIResponse(provider, apiKey, prompt);
            setAiResponse(response.text);
        } catch (error: any) {
            toast({
                title: "AI Error",
                description: error.message || "Failed to get AI response",
                variant: "destructive"
            });
        } finally {
            setIsAiLoading(false);
        }
    };

    const showHint = () => {
        if (hint) {
            toast({
                title: "💡 Hint",
                description: hint,
                duration: 6000,
            });
        }
    };

    return (
        <div ref={playgroundRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px] w-full">
            {/* Editor Side */}
            <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background shadow-sm">
                <div className="bg-muted/50 p-2 flex items-center justify-between border-b shrink-0">
                    <span className="text-sm font-medium ml-2 flex items-center gap-2">
                        <Terminal className="h-4 w-4" /> Code Editor
                    </span>
                    <div className="flex gap-2 items-center">
                        {hint && (
                            <Button size="sm" variant="ghost" onClick={showHint} className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20">
                                <Lightbulb className="h-4 w-4 mr-1" /> Hint
                            </Button>
                        )}

                        <AISettingsDialog
                            open={showSettings}
                            onOpenChange={setShowSettings}
                            trigger={
                                <Button size="sm" variant="ghost" title="AI Settings">
                                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            }
                        />

                        <Button size="sm" variant="ghost" onClick={() => setCode(initialCode)} title="Reset Code">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" onClick={runCode} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                            <Play className="h-4 w-4" /> Run
                        </Button>
                    </div>
                </div>
                <div className="flex-1 min-h-0">
                    <MonacoEditor
                        value={code}
                        onChange={(val) => setCode(val || "")}
                        language={languageConfig.id}
                    />
                </div>
            </div>

            {/* Output Side */}
            <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                    <div className="bg-muted p-1 border-b">
                        <TabsList className="w-full justify-start">
                            {(html || languageConfig.id === 'html') && (
                                <TabsTrigger value="preview" className="gap-2">
                                    <Eye className="h-3 w-3" /> Preview
                                </TabsTrigger>
                            )}
                            <TabsTrigger value="console" className="gap-2">
                                <Terminal className="h-3 w-3" /> Console
                            </TabsTrigger>
                            <TabsTrigger value="ai" className="gap-2">
                                <Wand2 className="h-3 w-3" /> AI Assistant
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {(html || languageConfig.id === 'html') && (
                        <TabsContent value="preview" className="flex-1 p-0 m-0 overflow-auto bg-white dark:bg-zinc-900 relative">
                            {/* Preview Container */}
                            <div
                                id="preview-container"
                                className="w-full h-full p-4 overflow-auto"
                                dangerouslySetInnerHTML={{ __html: html || (languageConfig.id === 'html' ? code : "") }}
                            />
                        </TabsContent>
                    )}

                    <TabsContent value="console" className="flex-1 p-0 m-0 overflow-auto bg-black text-white font-mono text-sm">
                        {output.length === 0 ? (
                            <div className="p-4 text-gray-500 italic">
                                {(html || languageConfig.id === 'html') ? "Run the code to interact with the preview." : "Run the code to see output..."}
                            </div>
                        ) : (
                            <div className="p-4 space-y-1">
                                {output.map((log, i) => (
                                    <div key={i} className={`p-1 border-b border-gray-800 ${log.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                                        <span className="opacity-50 mr-2">&gt;</span>
                                        {log.content}
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="ai" className="flex-1 p-0 m-0 overflow-auto bg-muted/20">
                        <div className="p-4">
                            {!aiResponse && !isAiLoading && (
                                <div className="text-center py-10">
                                    <Wand2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">AI Code Assistant</h3>
                                    <p className="text-muted-foreground mb-6 text-sm max-w-xs mx-auto">
                                        Stuck? I can explain this code, find bugs, or suggest improvements.
                                    </p>
                                    <Button onClick={askAi} disabled={!code.trim()}>
                                        <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
                                        Analyze Code
                                    </Button>
                                </div>
                            )}

                            {isAiLoading && (
                                <div className="flex flex-col items-center justify-center py-10 gap-4">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <p className="text-sm text-muted-foreground">Analyzing code...</p>
                                </div>
                            )}

                            {aiResponse && (
                                <div className="prose dark:prose-invert text-sm max-w-none">
                                    <div className="bg-card p-4 rounded-lg border shadow-sm markdown-body">
                                        {/* Simple text display for now, could be Markdown */}
                                        <div className="whitespace-pre-wrap">{aiResponse}</div>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <Button variant="outline" size="sm" onClick={askAi}>
                                            Regenerate
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
