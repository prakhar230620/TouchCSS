
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, Film, Play, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface Keyframe {
  id: string;
  percentage: number; // 0-100
  properties: string; // e.g., "transform: translateX(10px); opacity: 0.5;"
}

const initialKeyframes: Keyframe[] = [
  { id: 'kf-start', percentage: 0, properties: 'transform: translateX(0px) rotate(0deg);\nopacity: 1;' },
  { id: 'kf-end', percentage: 100, properties: 'transform: translateX(50px) rotate(45deg);\nopacity: 0.5;' },
];

export function AnimationEditor() {
  const [animationName, setAnimationName] = useState('myAnimation');
  const [duration, setDuration] = useState(2); // seconds
  const [timingFunction, setTimingFunction] = useState('ease');
  const [delay, setDelay] = useState(0); // seconds
  const [iterationCount, setIterationCount] = useState('1'); // 'infinite' or number
  const [direction, setDirection] = useState('normal');
  const [fillMode, setFillMode] = useState('forwards');
  const [keyframes, setKeyframes] = useState<Keyframe[]>(initialKeyframes);
  
  const [previewKey, setPreviewKey] = useState(0); // Used to force re-render of preview
  const [generatedCss, setGeneratedCss] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const keyframesCss = keyframes
      .sort((a, b) => a.percentage - b.percentage)
      .map(kf => `  ${kf.percentage}% {\n    ${kf.properties.split('\n').map(p => `  ${p.trim()}`).join('\n    ')}\n  }`)
      .join('\n');

    const animationProperty = `${animationName} ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode}`;
    
    const css = `@keyframes ${animationName} {\n${keyframesCss}\n}\n\n.animated-element {\n  animation: ${animationProperty};\n}`;
    setGeneratedCss(css);

  }, [animationName, duration, timingFunction, delay, iterationCount, direction, fillMode, keyframes]);

  const handleCopyCss = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(generatedCss);
        toast({
            title: "CSS Copied!",
            description: "Animation CSS copied to clipboard.",
        });
    }
  };

  const resetValues = () => {
    setAnimationName('myAnimation');
    setDuration(2);
    setTimingFunction('ease');
    setDelay(0);
    setIterationCount('1');
    setDirection('normal');
    setFillMode('forwards');
    setKeyframes(initialKeyframes);
    triggerPreviewReset();
    toast({
      title: "Editor Reset",
      description: "Animation values reset to defaults.",
    });
  };

  const triggerPreviewReset = () => {
    setPreviewKey(prev => prev + 1); // Change key to force re-render and restart animation
  };

  const addKeyframe = () => {
    if (keyframes.length >= 5) {
      toast({ title: "Limit Reached", description: "Maximum 5 keyframes allowed.", variant: "destructive"});
      return;
    }
    const newPercentage = keyframes.length > 0 ? Math.min(100, keyframes[keyframes.length - 1].percentage + 20) : 50;
    setKeyframes([...keyframes, { id: crypto.randomUUID(), percentage: newPercentage, properties: '/* Add styles here */' }]);
  };

  const removeKeyframe = (id: string) => {
    if (keyframes.length <= 2) {
      toast({ title: "Minimum Reached", description: "At least 2 keyframes needed.", variant: "destructive"});
      return;
    }
    setKeyframes(keyframes.filter(kf => kf.id !== id));
  };

  const updateKeyframe = (id: string, field: 'percentage' | 'properties', value: string | number) => {
    setKeyframes(keyframes.map(kf => 
      kf.id === id ? { ...kf, [field]: field === 'percentage' ? Math.max(0, Math.min(100, Number(value))) : value } : kf
    ));
  };


  const timingFunctions = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'step-start', 'step-end'];
  const directions = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
  const fillModes = ['none', 'forwards', 'backwards', 'both'];


  return (
    <Card className="border-destructive/20 shadow-lg bg-card/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center justify-between text-destructive-darker">
          <span className="flex items-center gap-2"><Film className="w-6 h-6"/> Animation Editor</span>
          <Button variant="ghost" size="icon" onClick={resetValues} className="text-muted-foreground hover:text-destructive">
            <RefreshCw className="w-5 h-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        {/* Controls Column */}
        <div className="space-y-3 p-1 max-h-[450px] overflow-y-auto pr-2">
          <div>
            <Label htmlFor="animationName" className="text-xs">Animation Name</Label>
            <Input id="animationName" type="text" value={animationName} onChange={e => setAnimationName(e.target.value.replace(/\s+/g, '-') || 'myAnimation')} className="mt-1 h-8 text-xs" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="duration" className="text-xs">Duration ({duration}s)</Label>
              <Slider id="duration" value={[duration]} onValueChange={v => setDuration(v[0])} min={0.1} max={10} step={0.1} className="mt-1 [&>span]:bg-destructive"/>
            </div>
            <div>
              <Label htmlFor="delay" className="text-xs">Delay ({delay}s)</Label>
              <Slider id="delay" value={[delay]} onValueChange={v => setDelay(v[0])} min={0} max={5} step={0.1} className="mt-1 [&>span]:bg-destructive"/>
            </div>
          </div>
           <div>
            <Label htmlFor="timingFunction" className="text-xs">Timing Function</Label>
            <Select value={timingFunction} onValueChange={setTimingFunction}>
              <SelectTrigger id="timingFunction" className="w-full mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{timingFunctions.map(tf => <SelectItem key={tf} value={tf} className="text-xs">{tf}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="iterationCount" className="text-xs">Iterations</Label>
              <Input id="iterationCount" type="text" value={iterationCount} onChange={e => setIterationCount(e.target.value || '1')} className="mt-1 h-8 text-xs" placeholder="1 or infinite"/>
            </div>
             <div>
              <Label htmlFor="direction" className="text-xs">Direction</Label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger id="direction" className="w-full mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{directions.map(d => <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fillMode" className="text-xs">Fill Mode</Label>
              <Select value={fillMode} onValueChange={setFillMode}>
                <SelectTrigger id="fillMode" className="w-full mt-1 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{fillModes.map(fm => <SelectItem key={fm} value={fm} className="text-xs">{fm}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between items-center mb-1">
                <Label className="text-xs font-medium">Keyframes</Label>
                <Button variant="outline" size="xs" onClick={addKeyframe} className="text-xs h-6 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive" disabled={keyframes.length >= 5}>
                    Add Keyframe
                </Button>
            </div>
            <div className="space-y-2">
              {keyframes.map(kf => (
                <div key={kf.id} className="p-2 bg-muted/50 rounded-md border border-border/50 space-y-1">
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={kf.percentage} 
                      onChange={e => updateKeyframe(kf.id, 'percentage', e.target.value)} 
                      className="h-7 w-16 text-xs" 
                      min="0" max="100" 
                      aria-label="Keyframe percentage"
                    />
                    <span className="text-xs">%</span>
                    <Textarea 
                      value={kf.properties} 
                      onChange={e => updateKeyframe(kf.id, 'properties', e.target.value)} 
                      className="flex-1 text-xs min-h-[40px] font-mono" 
                      rows={2}
                      placeholder="e.g., transform: scale(1.2);"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeKeyframe(kf.id)} className="h-7 w-7 text-destructive/70 hover:text-destructive hover:bg-destructive/10" disabled={keyframes.length <= 2}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview & Output Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-center rounded-lg bg-background h-48 shadow-inner border border-border p-4 relative">
            <style>
              {`
                @keyframes ${animationName}-${previewKey} {
                  ${keyframes.map(kf => `${kf.percentage}% { ${kf.properties} }`).join('\n')}
                }
                .preview-animated-element-${previewKey} {
                  animation-name: ${animationName}-${previewKey};
                  animation-duration: ${duration}s;
                  animation-timing-function: ${timingFunction};
                  animation-delay: ${delay}s;
                  animation-iteration-count: ${iterationCount};
                  animation-direction: ${direction};
                  animation-fill-mode: ${fillMode};
                }
              `}
            </style>
            <Square 
              className={`w-16 h-16 text-destructive preview-animated-element-${previewKey}`}
              data-ai-hint="animation preview object"
            />
             <Button variant="outline" size="sm" onClick={triggerPreviewReset} className="absolute top-2 right-2 text-xs h-7">
                <Play className="mr-1.5 h-3.5 w-3.5"/> Replay
            </Button>
          </div>
          
          <div>
            <Label htmlFor="generatedAnimationCss" className="text-sm font-medium">Generated CSS</Label>
            <Textarea
              id="generatedAnimationCss"
              value={generatedCss}
              readOnly
              className="mt-1 min-h-[120px] font-mono text-xs bg-muted/50"
              rows={6}
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

    