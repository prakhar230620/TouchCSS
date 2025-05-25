
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

export function FilterEffectsEditor() {
  const [blur, setBlur] = useState(0); // px
  const [brightness, setBrightness] = useState(100); // %
  const [contrast, setContrast] = useState(100); // %
  const [grayscale, setGrayscale] = useState(0); // %
  const [hueRotate, setHueRotate] = useState(0); // deg
  const [invert, setInvert] = useState(0); // %
  const [saturate, setSaturate] = useState(100); // %
  const [sepia, setSepia] = useState(0); // %

  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});
  const [generatedCss, setGeneratedCss] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const filters = [];
    if (blur > 0) filters.push(`blur(${blur}px)`);
    if (brightness !== 100) filters.push(`brightness(${brightness}%)`);
    if (contrast !== 100) filters.push(`contrast(${contrast}%)`);
    if (grayscale > 0) filters.push(`grayscale(${grayscale}%)`);
    if (hueRotate !== 0) filters.push(`hue-rotate(${hueRotate}deg)`);
    if (invert > 0) filters.push(`invert(${invert}%)`);
    if (saturate !== 100) filters.push(`saturate(${saturate}%)`);
    if (sepia > 0) filters.push(`sepia(${sepia}%)`);
    
    const filterValue = filters.join(' ');
    setPreviewStyle({ filter: filterValue });
    setGeneratedCss(filterValue ? `filter: ${filterValue};` : '/* No filters applied */');
  }, [blur, brightness, contrast, grayscale, hueRotate, invert, saturate, sepia]);

  const handleCopyCss = () => {
     if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(generatedCss);
        toast({
            title: "CSS Copied!",
            description: "Filter effects CSS copied to clipboard.",
        });
    }
  };

  const resetValues = () => {
    setBlur(0);
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setHueRotate(0);
    setInvert(0);
    setSaturate(100);
    setSepia(0);
    toast({
      title: "Editor Reset",
      description: "Filter values reset to defaults.",
    });
  };

  return (
    <Card className="border-accent/20 shadow-lg bg-card/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center justify-between text-accent-darker">
          <span className="flex items-center gap-2"><Wand2 className="w-6 h-6"/> Filter Effects Editor</span>
          <Button variant="ghost" size="icon" onClick={resetValues} className="text-muted-foreground hover:text-accent-darker">
            <RefreshCw className="w-5 h-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        <div className="space-y-3 p-1 max-h-[350px] overflow-y-auto pr-2">
          <div>
            <Label htmlFor="blur" className="text-xs">Blur ({blur}px)</Label>
            <Slider id="blur" value={[blur]} onValueChange={(v) => setBlur(v[0])} min={0} max={20} step={0.1} className="mt-1 [&>span]:bg-accent" />
          </div>
          <div>
            <Label htmlFor="brightness" className="text-xs">Brightness ({brightness}%)</Label>
            <Slider id="brightness" value={[brightness]} onValueChange={(v) => setBrightness(v[0])} min={0} max={200} step={1} className="mt-1 [&>span]:bg-accent" />
          </div>
          <div>
            <Label htmlFor="contrast" className="text-xs">Contrast ({contrast}%)</Label>
            <Slider id="contrast" value={[contrast]} onValueChange={(v) => setContrast(v[0])} min={0} max={200} step={1} className="mt-1 [&>span]:bg-accent" />
          </div>
          <div>
            <Label htmlFor="grayscale" className="text-xs">Grayscale ({grayscale}%)</Label>
            <Slider id="grayscale" value={[grayscale]} onValueChange={(v) => setGrayscale(v[0])} min={0} max={100} step={1} className="mt-1 [&>span]:bg-accent" />
          </div>
          <div>
            <Label htmlFor="hueRotate" className="text-xs">Hue Rotate ({hueRotate}deg)</Label>
            <Slider id="hueRotate" value={[hueRotate]} onValueChange={(v) => setHueRotate(v[0])} min={0} max={360} step={1} className="mt-1 [&>span]:bg-accent" />
          </div>
           <div>
            <Label htmlFor="invert" className="text-xs">Invert ({invert}%)</Label>
            <Slider id="invert" value={[invert]} onValueChange={(v) => setInvert(v[0])} min={0} max={100} step={1} className="mt-1 [&>span]:bg-accent" />
          </div>
           <div>
            <Label htmlFor="saturate" className="text-xs">Saturate ({saturate}%)</Label>
            <Slider id="saturate" value={[saturate]} onValueChange={(v) => setSaturate(v[0])} min={0} max={300} step={1} className="mt-1 [&>span]:bg-accent" />
          </div>
           <div>
            <Label htmlFor="sepia" className="text-xs">Sepia ({sepia}%)</Label>
            <Slider id="sepia" value={[sepia]} onValueChange={(v) => setSepia(v[0])} min={0} max={100} step={1} className="mt-1 [&>span]:bg-accent" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center rounded-lg bg-muted h-48 shadow-inner border border-border overflow-hidden">
            <Image 
                src="https://placehold.co/200x150/F59E0B/FFFFFF.png" // Accent background, white text placeholder
                alt="Filter Preview Image" 
                width={200} 
                height={150} 
                style={previewStyle} 
                className="object-cover transition-all duration-100 ease-out" // Faster transition
                data-ai-hint="colorful abstract photo"
            />
          </div>
          
          <div>
            <Label htmlFor="generatedFilterCss" className="text-sm font-medium">Generated CSS</Label>
            <Textarea
              id="generatedFilterCss"
              value={generatedCss}
              readOnly
              className="mt-1 min-h-[60px] font-mono text-xs bg-muted/50"
              rows={3}
            />
            <Button onClick={handleCopyCss} variant="outline" size="sm" className="mt-2 w-full sm:w-auto">
              <Copy className="mr-2 h-4 w-4" /> Copy CSS
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
