"use client";

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
    children: string;
    className?: string;
    language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Extract language from className (e.g., "language-css" -> "css")
    const lang = className?.replace('language-', '') || language || 'code';

    return (
        <div className="relative group my-4">
            <div className="flex items-center justify-between bg-muted border border-border rounded-t-lg px-4 py-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                    {lang}
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-8 px-2 text-xs"
                >
                    {copied ? (
                        <>
                            <Check className="h-3 w-3 mr-1" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                        </>
                    )}
                </Button>
            </div>
            <pre className="bg-muted/50 border border-t-0 border-border rounded-b-lg overflow-x-auto p-4">
                <code className={`${className} text-sm`}>{children}</code>
            </pre>
        </div>
    );
}
