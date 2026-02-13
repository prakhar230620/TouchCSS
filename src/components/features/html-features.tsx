"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayoutTemplate, FormInput, FileVideo, Palette, Copy, CheckCircle } from "lucide-react";
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const CodeBlock: React.FC<{ language: string; children: string; className?: string }> = ({ language, children, className }) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const textToCopy = children.trim();
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(textToCopy);
                setCopied(true);
                toast({
                    title: "Copied to clipboard!",
                    description: "Code has been copied.",
                    duration: 2000,
                });
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };
    return (
        <div className={cn("my-4 rounded-lg bg-muted/70 shadow-sm border border-border/50 overflow-hidden", className)}>
            <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/50">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{language}</span>
                <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs h-7 text-muted-foreground hover:text-foreground hover:bg-muted">
                    {copied ? <CheckCircle className="mr-1.5 h-3.5 w-3.5 text-green-500" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                </Button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto bg-muted/10"><code className={`language-${language} text-foreground/90 whitespace-pre-wrap`}>{children.trim()}</code></pre>
        </div>
    );
};

const SemanticHTMLSection = () => (
    <Card className="shadow-lg">
        <CardHeader>
            <div className="flex items-center gap-3 mb-2">
                <LayoutTemplate className="w-7 h-7 text-orange-600" />
                <CardTitle className="text-2xl text-orange-700 dark:text-orange-500">Semantic HTML</CardTitle>
            </div>
            <CardDescription>Use meaningful tags to structure your content for better accessibility and SEO.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">Semantic HTML elements clearly describe their meaning to both the browser and the developer (e.g., <code className="text-foreground">&lt;header&gt;</code>, <code className="text-foreground">&lt;article&gt;</code> vs non-semantic <code className="text-foreground">&lt;div&gt;</code>).</p>

            <div className="border rounded-lg overflow-hidden flex flex-col md:flex-row h-64 text-xs font-mono text-white text-center">
                <div className="bg-slate-700 p-2 w-full flex items-center justify-center border-b md:border-b-0 md:border-r border-white/20">&lt;header&gt;</div>
                <div className="flex-1 flex flex-col w-full">
                    <div className="flex-1 flex w-full">
                        <div className="bg-slate-600 flex-[3] p-4 flex flex-col gap-2 justify-center items-center border-r border-white/20">
                            <span>&lt;main&gt;</span>
                            <div className="bg-slate-500 w-full p-2 rounded">&lt;article&gt;</div>
                            <div className="bg-slate-500 w-full p-2 rounded">&lt;section&gt;</div>
                        </div>
                        <div className="bg-slate-700 flex-1 p-2 flex items-center justify-center">&lt;aside&gt;</div>
                    </div>
                    <div className="bg-slate-800 p-2 shrink-0 border-t border-white/20">&lt;footer&gt;</div>
                </div>
            </div>

            <CodeBlock language="html">{`
<body>
  <header>
    <nav>...</nav>
  </header>
  <main>
    <article>
      <h1>Blog Post Title</h1>
      <p>Content goes here...</p>
    </article>
    <aside>
      <p>Related links...</p>
    </aside>
  </main>
  <footer>
    <p>&copy; 2024 My Website</p>
  </footer>
</body>`}</CodeBlock>
        </CardContent>
    </Card>
);

const FormsSection = () => (
    <Card className="shadow-lg">
        <CardHeader>
            <div className="flex items-center gap-3 mb-2">
                <FormInput className="w-7 h-7 text-blue-600" />
                <CardTitle className="text-2xl text-blue-700 dark:text-blue-500">Advanced Forms</CardTitle>
            </div>
            <CardDescription>HTML5 introduced many new input types that provide native validation and better UX.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 border p-4 rounded-lg bg-background/50">
                    <h4 className="font-semibold text-sm">Native Input Types</h4>
                    <div className="space-y-2">
                        <Label>Color Picker (<code className="text-xs">&lt;input type="color"&gt;</code>)</Label>
                        <div className="flex gap-2">
                            <input type="color" className="h-9 w-16 p-0 border-0 rounded cursor-pointer" defaultValue="#3b82f6" />
                            <span className="text-xs text-muted-foreground self-center">Click to pick</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Date Picker (<code className="text-xs">&lt;input type="date"&gt;</code>)</Label>
                        <Input type="date" className="w-full" />
                    </div>
                    <div className="space-y-2">
                        <Label>Range Slider (<code className="text-xs">&lt;input type="range"&gt;</code>)</Label>
                        <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    </div>
                </div>
                <CodeBlock language="html" className="mt-0">{`
<label for="color">Choose color:</label>
<input type="color" id="color" name="color" value="#ff0000">

<label for="bday">Birthday:</label>
<input type="date" id="bday" name="bday">

<label for="vol">Volume (0-100):</label>
<input type="range" id="vol" name="vol" min="0" max="100">`}</CodeBlock>
            </div>
        </CardContent>
    </Card>
);

const MultimediaSection = () => (
    <Card className="shadow-lg">
        <CardHeader>
            <div className="flex items-center gap-3 mb-2">
                <FileVideo className="w-7 h-7 text-purple-600" />
                <CardTitle className="text-2xl text-purple-700 dark:text-purple-500">Multimedia</CardTitle>
            </div>
            <CardDescription>Embed audio and video directly without plugins.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
                <div className="rounded-lg bg-black/5 p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">Audio Element Preview (Controls enabled)</p>
                    <audio controls className="w-full max-w-md mx-auto">
                        <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <CodeBlock language="html">{`
<audio controls>
  <source src="horse.mp3" type="audio/mpeg">
  Your browser does not support the audio tag.
</audio>

<video width="320" height="240" controls poster="poster.jpg">
  <source src="movie.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>`}</CodeBlock>
            </div>
        </CardContent>
    </Card>
);

const CanvasSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw simple animation or shape
        let animationFrameId: number;
        let t = 0;

        const render = () => {
            // Clear
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Fade out

            // Draw moving circle
            const x = canvas.width / 2 + Math.cos(t) * 50;
            const y = canvas.height / 2 + Math.sin(t) * 30;

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.fillStyle = `hsl(${t * 50 % 360}, 70%, 50%)`;
            ctx.fill();

            t += 0.05;
            animationFrameId = requestAnimationFrame(render);
        };

        // Initial clear to transparent if needed, or white
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <Palette className="w-7 h-7 text-pink-600" />
                    <CardTitle className="text-2xl text-pink-700 dark:text-pink-500">HTML5 Canvas</CardTitle>
                </div>
                <CardDescription>Draw graphics, animations, and games using JavaScript.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">The <code className="text-foreground">&lt;canvas&gt;</code> element is a container for graphics. You must use JavaScript to actually draw the graphics.</p>
                <div className="flex justify-center border rounded-lg bg-background p-4">
                    <canvas ref={canvasRef} width={300} height={150} className="border border-dashed bg-white dark:bg-black rounded" />
                </div>
                <CodeBlock language="html">{`
<canvas id="myCanvas" width="200" height="100"></canvas>

<script>
  const c = document.getElementById("myCanvas");
  const ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  ctx.stroke();
</script>`}</CodeBlock>
            </CardContent>
        </Card>
    );
};

export function HTMLFeatures() {
    return (
        <div className="space-y-12">
            <Tabs defaultValue="semantic" className="w-full">
                <TabsList>
                    <TabsTrigger value="semantic">Semantic HTML</TabsTrigger>
                    <TabsTrigger value="forms">Forms</TabsTrigger>
                    <TabsTrigger value="media">Multimedia</TabsTrigger>
                    <TabsTrigger value="canvas">Canvas</TabsTrigger>
                </TabsList>
                <TabsContent value="semantic"><SemanticHTMLSection /></TabsContent>
                <TabsContent value="forms"><FormsSection /></TabsContent>
                <TabsContent value="media"><MultimediaSection /></TabsContent>
                <TabsContent value="canvas"><CanvasSection /></TabsContent>
            </Tabs>
        </div>
    );
}
