
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, Scaling } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';

export function TransformEditor() {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);

  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});
  const [generatedCss, setGeneratedCss] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const transformValue = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg) skewX(${skewX}deg) skewY(${skewY}deg)`;
    setPreviewStyle({ transform: transformValue });
    setGeneratedCss(`transform: ${transformValue};`);
  }, [translateX, translateY, scale, rotate, skewX, skewY]);

  const handleCopyCss = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(generatedCss);
        toast({
            title: "CSS Copied!",
            description: "Transform CSS copied to clipboard.",
        });
    }
  };

  const resetValues = () => {
    setTranslateX(0);
    setTranslateY(0);
    setScale(1);
    setRotate(0);
    setSkewX(0);
    setSkewY(0);
    toast({
      title: "Editor Reset",
      description: "Transform values reset to defaults.",
    });
  };

  return (
    <Card className="border-secondary/30 shadow-lg bg-card/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center justify-between text-secondary-darker">
          <span className="flex items-center gap-2"><Scaling className="w-6 h-6"/> Transform Editor</span>
          <Button variant="ghost" size="icon" onClick={resetValues} className="text-muted-foreground hover:text-secondary">
            <RefreshCw className="w-5 h-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        <div className="space-y-4 p-1">
          <div>
            <Label htmlFor="translateX" className="text-xs">Translate X ({translateX}px)</Label>
            <Slider id="translateX" value={[translateX]} onValueChange={(v) => setTranslateX(v[0])} min={-100} max={100} step={1} className="mt-1 [&>span]:bg-secondary-dark" />
          </div>
          <div>
            <Label htmlFor="translateY" className="text-xs">Translate Y ({translateY}px)</Label>
            <Slider id="translateY" value={[translateY]} onValueChange={(v) => setTranslateY(v[0])} min={-100} max={100} step={1} className="mt-1 [&>span]:bg-secondary-dark" />
          </div>
          <div>
            <Label htmlFor="scale" className="text-xs">Scale ({scale.toFixed(2)})</Label>
            <Slider id="scale" value={[scale]} onValueChange={(v) => setScale(v[0])} min={0.1} max={3} step={0.05} className="mt-1 [&>span]:bg-secondary-dark" />
          </div>
          <div>
            <Label htmlFor="rotate" className="text-xs">Rotate ({rotate}deg)</Label>
            <Slider id="rotate" value={[rotate]} onValueChange={(v) => setRotate(v[0])} min={0} max={360} step={1} className="mt-1 [&>span]:bg-secondary-dark" />
          </div>
          <div>
            <Label htmlFor="skewX" className="text-xs">Skew X ({skewX}deg)</Label>
            <Slider id="skewX" value={[skewX]} onValueChange={(v) => setSkewX(v[0])} min={-45} max={45} step={1} className="mt-1 [&>span]:bg-secondary-dark" />
          </div>
          <div>
            <Label htmlFor="skewY" className="text-xs">Skew Y ({skewY}deg)</Label>
            <Slider id="skewY" value={[skewY]} onValueChange={(v) => setSkewY(v[0])} min={-45} max={45} step={1} className="mt-1 [&>span]:bg-secondary-dark" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center rounded-lg bg-background h-48 shadow-inner border border-border overflow-hidden p-4">
            <div 
                className="w-24 h-24 bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-medium rounded-md transition-transform duration-300 ease-out"
                style={previewStyle}
                data-ai-hint="transform preview box"
            >
                Preview
            </div>
          </div>
          
          <div>
            <Label htmlFor="generatedTransformCss" className="text-sm font-medium">Generated CSS</Label>
            <Textarea
              id="generatedTransformCss"
              value={generatedCss}
              readOnly
              className="mt-1 min-h-[60px] font-mono text-xs bg-muted/50"
              rows={2}
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

    