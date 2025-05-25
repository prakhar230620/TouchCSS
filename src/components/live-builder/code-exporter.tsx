
"use client";

import React, { useState } from 'react';
import type { CanvasComponent } from './live-component-builder';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Code, ClipboardCopy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface CodeExporterProps {
  components: CanvasComponent[];
}

function generateHtml(components: CanvasComponent[]): string {
  return components.map(comp => {
    const styleString = Object.entries(comp.styles)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
      .join(' ');

    let content = '';
    if (comp.type === 'Text' && comp.props.textContent) {
      content = comp.props.textContent;
    } else if (comp.type === 'Button' && comp.props.buttonText) {
      content = comp.props.buttonText;
    }

    switch (comp.type) {
      case 'Box':
        return `<div style="${styleString}"></div>`;
      case 'Text':
        return `<p style="${styleString}">${content}</p>`;
      case 'Button':
        return `<button style="${styleString}">${content}</button>`;
      default:
        return '';
    }
  }).join('\n');
}

export function CodeExporter({ components }: CodeExporterProps) {
  const { toast } = useToast();
  const [generatedCode, setGeneratedCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerateAndShowCode = () => {
    const html = generateHtml(components);
    const fullCode = `<div class="canvas-container">\n${html.split('\n').map(line => `  ${line}`).join('\n')}\n</div>`;
    setGeneratedCode(fullCode);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedCode)
        .then(() => {
          setIsCopied(true);
          toast({ title: "Code Copied!", description: "HTML structure copied to clipboard." });
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(err => {
          toast({ title: "Copy Failed", description: "Could not copy code.", variant: "destructive" });
        });
    }
  };

  return (
    <Dialog onOpenChange={(open) => { if(open) handleGenerateAndShowCode(); else setGeneratedCode(''); }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full text-xs">
          <Code className="mr-2 h-4 w-4" /> View & Export Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Code2 className="w-5 h-5"/>Generated HTML & Inline Styles</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          <Textarea
            value={generatedCode}
            readOnly
            className="min-h-[250px] font-mono text-xs bg-muted/50 border rounded-md"
            placeholder="Generated code will appear here..."
          />
        </div>
        <DialogFooter className="sm:justify-between gap-2">
           <p className="text-xs text-muted-foreground flex-1 text-left">Note: This is a basic export with inline styles. For production, consider using CSS classes.</p>
           <div className="flex gap-2">
            <DialogClose asChild>
                <Button type="button" variant="secondary" size="sm">
                    Close
                </Button>
            </DialogClose>
            <Button onClick={handleCopyCode} size="sm" variant="default" disabled={!generatedCode}>
                {isCopied ? <CheckCircle className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}
                {isCopied ? 'Copied!' : 'Copy Code'}
            </Button>
           </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

    