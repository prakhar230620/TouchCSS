
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, PlusCircle, Trash2, Pipette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from '@/lib/utils';

interface ColorStop {
  id: string;
  color: string;
  position: number; // 0-100
}

// Define fixed IDs for initial stops
const INITIAL_STOP_1_ID = 'initial-color-stop-1';
const INITIAL_STOP_2_ID = 'initial-color-stop-2';

export function GradientEditor() {
  const { toast } = useToast();
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90); // For linear gradient
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: INITIAL_STOP_1_ID, color: '#7C3AED', position: 0 }, // Primary
    { id: INITIAL_STOP_2_ID, color: '#F59E0B', position: 100 }, // Accent
  ]);
  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});
  const [generatedCss, setGeneratedCss] = useState('');

  const generateGradientCss = useCallback(() => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${stops})`;
    } else {
      // Basic radial gradient, can be expanded with shape/position controls
      return `radial-gradient(circle, ${stops})`;
    }
  }, [gradientType, angle, colorStops]);

  useEffect(() => {
    const css = generateGradientCss();
    setPreviewStyle({ background: css });
    setGeneratedCss(`background-image: ${css};`);
  }, [generateGradientCss]);

  const addColorStop = () => {
    if (colorStops.length >= 5) { // Limit color stops for simplicity
        toast({ title: "Limit Reached", description: "You can add a maximum of 5 color stops.", variant: "destructive"});
        return;
    }
    // Add new stop slightly offset from the last one, or in the middle if possible
    const lastPosition = colorStops.length > 0 ? colorStops[colorStops.length - 1].position : 0;
    const newPosition = Math.min(100, lastPosition < 90 ? Math.floor(lastPosition + (100-lastPosition)/2) : 50);
    
    setColorStops([...colorStops, { id: crypto.randomUUID(), color: '#FFFFFF', position: newPosition }]);
  };

  const removeColorStop = (id: string) => {
    if (colorStops.length <= 2) { // Keep at least two stops
        toast({ title: "Minimum Reached", description: "A gradient needs at least 2 color stops.", variant: "destructive"});
        return;
    }
    setColorStops(colorStops.filter(stop => stop.id !== id));
  };

  const updateColorStop = (id: string, field: 'color' | 'position', value: string | number) => {
    setColorStops(colorStops.map(stop => 
      stop.id === id ? { ...stop, [field]: field === 'position' ? Number(value) : value } : stop
    ));
  };
  
  const handleCopyCss = () => {
    navigator.clipboard.writeText(generatedCss);
    toast({
      title: "CSS Copied!",
      description: "Gradient CSS copied to clipboard.",
    });
  };

  const resetValues = () => {
    setGradientType('linear');
    setAngle(90);
    setColorStops([
        { id: INITIAL_STOP_1_ID, color: '#7C3AED', position: 0 },
        { id: INITIAL_STOP_2_ID, color: '#F59E0B', position: 100 },
    ]);
    toast({
      title: "Editor Reset",
      description: "Gradient values reset to defaults.",
    });
  };

  return (
    <Card className="border-accent/30 shadow-lg bg-card/80 mt-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center justify-between text-accent-darker">
          <span className="flex items-center gap-2"><Pipette className="w-6 h-6"/> Gradient Editor</span>
          <Button variant="ghost" size="icon" onClick={resetValues} className="text-muted-foreground hover:text-accent">
            <RefreshCw className="w-5 h-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        {/* Controls Column */}
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium">Gradient Type</Label>
            <RadioGroup defaultValue="linear" onValueChange={(value: 'linear' | 'radial') => setGradientType(value)} className="mt-2 flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="linear" id="g-linear" />
                <Label htmlFor="g-linear" className="font-normal">Linear</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="radial" id="g-radial" />
                <Label htmlFor="g-radial" className="font-normal">Radial</Label>
              </div>
            </RadioGroup>
          </div>

          {gradientType === 'linear' && (
            <div>
              <Label htmlFor="angle" className="text-sm font-medium">Angle ({angle}°)</Label>
              <Slider
                id="angle"
                value={[angle]}
                onValueChange={(val) => setAngle(val[0])}
                min={0}
                max={360}
                step={1}
                className="mt-1 [&>span]:bg-accent"
              />
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium">Color Stops</Label>
                <Button variant="outline" size="sm" onClick={addColorStop} className="text-xs h-7 border-accent/50 text-accent hover:bg-accent/10 hover:text-accent" disabled={colorStops.length >= 5}>
                    <PlusCircle className="mr-1.5 h-3.5 w-3.5"/> Add Stop
                </Button>
            </div>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 rounded-md bg-muted/30 p-3 border">
              {colorStops.map((stop, index) => (
                <div key={stop.id} className="p-3 bg-background rounded-md shadow-sm border border-border/50">
                  <div className="flex items-center justify-between gap-3 mb-2">
                     <Input
                        type="color"
                        value={stop.color}
                        onChange={(e) => updateColorStop(stop.id, 'color', e.target.value)}
                        className="p-0.5 h-9 w-12 rounded-sm border-input"
                      />
                    <div className="flex-1">
                        <Label htmlFor={`pos-${stop.id}`} className="text-xs font-normal sr-only">Position ({stop.position}%)</Label>
                        <Slider
                            id={`pos-${stop.id}`}
                            value={[stop.position]}
                            onValueChange={(val) => updateColorStop(stop.id, 'position', val[0])}
                            min={0}
                            max={100}
                            step={1}
                            className="[&>span]:bg-accent"
                        />
                    </div>
                     <Button variant="ghost" size="icon" onClick={() => removeColorStop(stop.id)} className="h-8 w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10" disabled={colorStops.length <= 2}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">{stop.color} at {stop.position}%</p>
                </div>
              ))}
            </div>
             {colorStops.length >= 5 && <p className="text-xs text-destructive text-center mt-1">Maximum 5 color stops.</p>}
             {colorStops.length <= 2 && <p className="text-xs text-destructive text-center mt-1">Minimum 2 color stops.</p>}
          </div>
        </div>

        {/* Preview & Output Column */}
        <div className="space-y-4">
          <div 
            className="w-full h-48 rounded-lg border-2 border-dashed border-border bg-background shadow-inner flex items-center justify-center"
            style={previewStyle}
            data-ai-hint="gradient preview area"
          >
            <span className={cn("text-sm p-2 rounded bg-black/20 text-white/80 select-none", Object.keys(previewStyle).length === 0 && "opacity-50")}>
                Preview Area
            </span>
          </div>
          
          <div>
            <Label htmlFor="generatedGradientCss" className="text-sm font-medium">Generated CSS</Label>
            <Textarea
              id="generatedGradientCss"
              value={generatedCss}
              readOnly
              className="mt-1 min-h-[70px] font-mono text-xs bg-muted/50"
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

    