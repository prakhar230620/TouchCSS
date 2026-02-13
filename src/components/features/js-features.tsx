"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Box, Cpu, Braces, Layers, CheckCircle, Copy } from "lucide-react";
import React, { useState } from 'react';
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

const ES6Features = () => (
    <Card className="shadow-lg">
        <CardHeader>
            <div className="flex items-center gap-3 mb-2">
                <Braces className="w-7 h-7 text-yellow-500" />
                <CardTitle className="text-2xl text-yellow-600 dark:text-yellow-400">ES6+ Features</CardTitle>
            </div>
            <CardDescription>Modern JavaScript syntax that makes coding cleaner and more efficient.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Arrow Functions & Template Literals</h3>
                <p className="text-sm text-muted-foreground mb-2">Write shorter functions and cleaner strings.</p>
                <CodeBlock language="javascript">{`
// Old way
function greet(name) {
  return "Hello " + name + "!";
}

// ES6 Arrow Function
const greet = (name) => \`Hello \${name}!\`;

console.log(greet("Developer")); // Output: Hello Developer!
`}</CodeBlock>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Destructuring</h3>
                <p className="text-sm text-muted-foreground mb-2">Extract values from arrays or properties from objects.</p>
                <CodeBlock language="javascript">{`
const user = { name: "Alex", age: 25, role: "Admin" };

// Extract properties
const { name, role } = user;

console.log(name); // Alex
console.log(role); // Admin
`}</CodeBlock>
            </div>
        </CardContent>
    </Card>
);

const AsyncFeatures = () => (
    <Card className="shadow-lg">
        <CardHeader>
            <div className="flex items-center gap-3 mb-2">
                <Cpu className="w-7 h-7 text-blue-500" />
                <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Async / Await</CardTitle>
            </div>
            <CardDescription>Handle asynchronous operations like API calls with ease.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">Async/Await provides a way to write asynchronous code that looks synchronous, avoiding "callback hell".</p>
            <CodeBlock language="javascript">{`
async function fetchUserData() {
  try {
    const response = await fetch("https://api.example.com/user");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchUserData();
`}</CodeBlock>
        </CardContent>
    </Card>
);

const DOMFeatures = () => (
    <Card className="shadow-lg">
        <CardHeader>
            <div className="flex items-center gap-3 mb-2">
                <Layers className="w-7 h-7 text-green-500" />
                <CardTitle className="text-2xl text-green-600 dark:text-green-400">DOM Manipulation</CardTitle>
            </div>
            <CardDescription>Interact with the HTML page structure dynamically.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <CodeBlock language="javascript">{`
// Select an element
const btn = document.querySelector("#myBtn");

// Add class
btn.classList.add("active");

// Handle click
btn.addEventListener("click", () => {
    document.body.style.backgroundColor = "lightblue";
});
`}</CodeBlock>
        </CardContent>
    </Card>
);

export function JSFeatures() {
    return (
        <div className="space-y-12">
            <Tabs defaultValue="es6" className="w-full">
                <TabsList>
                    <TabsTrigger value="es6">ES6+</TabsTrigger>
                    <TabsTrigger value="async">Async/Await</TabsTrigger>
                    <TabsTrigger value="dom">DOM</TabsTrigger>
                </TabsList>
                <TabsContent value="es6"><ES6Features /></TabsContent>
                <TabsContent value="async"><AsyncFeatures /></TabsContent>
                <TabsContent value="dom"><DOMFeatures /></TabsContent>
            </Tabs>
        </div>
    );
}
