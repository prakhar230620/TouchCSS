
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function BoxShadowEditor() {
  const [offsetX, setOffsetX] = useState(4);
  const [offsetY, setOffsetY] = useState(4);
  const [blurRadius, setBlurRadius] = useState(8);
  const [spreadRadius, setSpreadRadius] = useState(0);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowOpacity, setShadowOpacity] = useState(0.2); // Opacity from 0 to 1

  const [generatedCss, setGeneratedCss] = useState('');
  const [shadowValue, setShadowValue] = useState(''); // For the style prop
  const { toast } = useToast();

  useEffect(() => {
    const colorHex = shadowColor.startsWith('#') ? shadowColor.slice(1) : shadowColor;
    const r = parseInt(colorHex.substring(0, 2), 16);
    const g = parseInt(colorHex.substring(2, 4), 16);
    const b = parseInt(colorHex.substring(4, 6), 16);
    
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${shadowOpacity.toFixed(2)})`;
    const currentShadowValue = `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${rgbaColor}`;
    
    setShadowValue(currentShadowValue);
    const css = `box-shadow: ${currentShadowValue};`;
    setGeneratedCss(css);
  }, [offsetX, offsetY, blurRadius, spreadRadius, shadowColor, shadowOpacity]);

  const handleCopyCss = () => {
    navigator.clipboard.writeText(generatedCss);
    toast({
      title: "CSS Copied!",
      description: "Box shadow CSS copied to clipboard.",
    });
  };

  const resetValues = () => {
    setOffsetX(4);
    setOffsetY(4);
    setBlurRadius(8);
    setSpreadRadius(0);
    setShadowColor('#000000');
    setShadowOpacity(0.2);
     toast({
      title: "Editor Reset",
      description: "Box shadow values reset to defaults.",
    });
  };

  return (
    <Card className="border-primary/30 shadow-lg bg-card/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center justify-between text-primary-dark">
          Box Shadow Editor
          <Button variant="ghost" size="icon" onClick={resetValues} className="text-muted-foreground hover:text-primary">
            <RefreshCw className="w-5 h-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5 p-1">
          <div>
            <Label htmlFor="offsetX" className="text-sm font-medium">Offset X ({offsetX}px)</Label>
            <Slider
              id="offsetX"
              value={[offsetX]}
              onValueChange={(val) => setOffsetX(val[0])}
              min={-50}
              max={50}
              step={1}
              className="[&>span]:bg-primary"
            />
          </div>
          <div>
            <Label htmlFor="offsetY" className="text-sm font-medium">Offset Y ({offsetY}px)</Label>
            <Slider
              id="offsetY"
              value={[offsetY]}
              onValueChange={(val) => setOffsetY(val[0])}
              min={-50}
              max={50}
              step={1}
              className="[&>span]:bg-primary"
            />
          </div>
          <div>
            <Label htmlFor="blurRadius" className="text-sm font-medium">Blur Radius ({blurRadius}px)</Label>
            <Slider
              id="blurRadius"
              value={[blurRadius]}
              onValueChange={(val) => setBlurRadius(val[0])}
              min={0}
              max={100}
              step={1}
              className="[&>span]:bg-primary"
            />
          </div>
          <div>
            <Label htmlFor="spreadRadius" className="text-sm font-medium">Spread Radius ({spreadRadius}px)</Label>
            <Slider
              id="spreadRadius"
              value={[spreadRadius]}
              onValueChange={(val) => setSpreadRadius(val[0])}
              min={-50}
              max={50}
              step={1}
              className="[&>span]:bg-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <Label htmlFor="shadowColor" className="text-sm font-medium">Shadow Color</Label>
              <Input
                id="shadowColor"
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="p-1 h-10 mt-1"
              />
            </div>
            <div>
                <Label htmlFor="shadowOpacity" className="text-sm font-medium">Opacity ({(shadowOpacity * 100).toFixed(0)}%)</Label>
                <Slider
                    id="shadowOpacity"
                    value={[shadowOpacity]}
                    onValueChange={(val) => setShadowOpacity(val[0])}
                    min={0}
                    max={1}
                    step={0.01}
                    className="[&>span]:bg-primary mt-2.5"
                />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center rounded-lg bg-background h-48 shadow-inner border border-border"
               style={{ boxShadow: shadowValue }}
               data-ai-hint="box shadow preview"
          >
            <p className="text-sm text-muted-foreground p-4 text-center select-none">
                Preview Area
            </p>
          </div>
          
          <div>
            <Label htmlFor="generatedCss" className="text-sm font-medium">Generated CSS</Label>
            <Textarea
              id="generatedCss"
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
