
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw, CaseSensitive, Pipette } from 'lucide-react'; // Using CaseSensitive for Typography
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const commonFontFamilies = [
  "Arial, sans-serif",
  "'Times New Roman', serif",
  "'Courier New', monospace",
  "Verdana, sans-serif",
  "Georgia, serif",
  "Tahoma, sans-serif",
  "'Trebuchet MS', sans-serif",
  "'Lucida Console', monospace",
  "'Comic Sans MS', cursive", // For fun!
  "system-ui, sans-serif"
];

const fontWeights = [
  { label: "Thin (100)", value: "100" },
  { label: "Extra Light (200)", value: "200" },
  { label: "Light (300)", value: "300" },
  { label: "Normal (400)", value: "400" },
  { label: "Medium (500)", value: "500" },
  { label: "Semi Bold (600)", value: "600" },
  { label: "Bold (700)", value: "700" },
  { label: "Extra Bold (800)", value: "800" },
  { label: "Black (900)", value: "900" },
];

export function TypographyEditor() {
  const [fontFamily, setFontFamily] = useState<string>(commonFontFamilies[0]);
  const [fontSize, setFontSize] = useState(16); // in px
  const [fontWeight, setFontWeight] = useState<string>("400");
  const [lineHeight, setLineHeight] = useState(1.5); // unitless
  const [letterSpacing, setLetterSpacing] = useState(0); // in px
  const [textColor, setTextColor] = useState('#333333');
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right" | "justify">("left");
  const [textDecoration, setTextDecoration] = useState<"none" | "underline" | "overline" | "line-through">("none");

  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});
  const [generatedCss, setGeneratedCss] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const style: React.CSSProperties = {
      fontFamily: fontFamily,
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight,
      lineHeight: lineHeight,
      letterSpacing: `${letterSpacing}px`,
      color: textColor,
      textAlign: textAlign,
      textDecoration: textDecoration,
    };
    setPreviewStyle(style);

    const cssLines = [
      `font-family: ${fontFamily};`,
      `font-size: ${fontSize}px;`,
      `font-weight: ${fontWeight};`,
      `line-height: ${lineHeight.toFixed(1)};`,
      `letter-spacing: ${letterSpacing}px;`,
      `color: ${textColor};`,
      `text-align: ${textAlign};`,
      `text-decoration: ${textDecoration};`,
    ];
    setGeneratedCss(cssLines.join('\n'));

  }, [fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textColor, textAlign, textDecoration]);

  const handleCopyCss = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(generatedCss);
        toast({
            title: "CSS Copied!",
            description: "Typography CSS copied to clipboard.",
        });
    }
  };

  const resetValues = () => {
    setFontFamily(commonFontFamilies[0]);
    setFontSize(16);
    setFontWeight("400");
    setLineHeight(1.5);
    setLetterSpacing(0);
    setTextColor('#333333');
    setTextAlign("left");
    setTextDecoration("none");
    toast({
      title: "Editor Reset",
      description: "Typography values reset to defaults.",
    });
  };

  return (
    <Card className="border-primary/20 shadow-lg bg-card/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center justify-between text-primary-dark">
          <span className="flex items-center gap-2"><CaseSensitive className="w-6 h-6"/> Typography Editor</span>
          <Button variant="ghost" size="icon" onClick={resetValues} className="text-muted-foreground hover:text-primary-dark">
            <RefreshCw className="w-5 h-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        <div className="space-y-3 p-1 max-h-[350px] overflow-y-auto pr-2">
          <div>
            <Label htmlFor="fontFamily" className="text-xs">Font Family</Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger id="fontFamily" className="w-full mt-1 h-9 text-xs [&>span]:truncate">
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                {commonFontFamilies.map(font => (
                  <SelectItem key={font} value={font} className="text-xs" style={{fontFamily: font}}>{font.split(',')[0].replace(/'/g, '')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="fontSize" className="text-xs">Font Size ({fontSize}px)</Label>
              <Slider id="fontSize" value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} min={8} max={72} step={1} className="mt-1 [&>span]:bg-primary" />
            </div>
            <div>
              <Label htmlFor="fontWeight" className="text-xs">Font Weight</Label>
               <Select value={fontWeight} onValueChange={setFontWeight}>
                <SelectTrigger id="fontWeight" className="w-full mt-1 h-9 text-xs">
                  <SelectValue placeholder="Select weight" />
                </SelectTrigger>
                <SelectContent>
                  {fontWeights.map(weight => (
                    <SelectItem key={weight.value} value={weight.value} className="text-xs">{weight.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="lineHeight" className="text-xs">Line Height ({lineHeight.toFixed(1)})</Label>
              <Slider id="lineHeight" value={[lineHeight]} onValueChange={(v) => setLineHeight(v[0])} min={0.8} max={3} step={0.1} className="mt-1 [&>span]:bg-primary" />
            </div>
            <div>
              <Label htmlFor="letterSpacing" className="text-xs">Letter Spacing ({letterSpacing}px)</Label>
              <Slider id="letterSpacing" value={[letterSpacing]} onValueChange={(v) => setLetterSpacing(v[0])} min={-5} max={10} step={0.1} className="mt-1 [&>span]:bg-primary" />
            </div>
          </div>

          <div>
            <Label htmlFor="textColor" className="text-xs">Text Color</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input id="textColor" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="p-1 h-9 w-12 rounded-sm border-input" />
              <Input type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-9 text-xs flex-1" placeholder="#RRGGBB" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="textAlign" className="text-xs">Text Align</Label>
              <Select value={textAlign} onValueChange={(v: "left" | "center" | "right" | "justify") => setTextAlign(v)}>
                <SelectTrigger id="textAlign" className="w-full mt-1 h-9 text-xs">
                  <SelectValue placeholder="Align text" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left" className="text-xs">Left</SelectItem>
                  <SelectItem value="center" className="text-xs">Center</SelectItem>
                  <SelectItem value="right" className="text-xs">Right</SelectItem>
                  <SelectItem value="justify" className="text-xs">Justify</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="textDecoration" className="text-xs">Decoration</Label>
              <Select value={textDecoration} onValueChange={(v: "none" | "underline" | "overline" | "line-through") => setTextDecoration(v)}>
                <SelectTrigger id="textDecoration" className="w-full mt-1 h-9 text-xs">
                  <SelectValue placeholder="Decoration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" className="text-xs">None</SelectItem>
                  <SelectItem value="underline" className="text-xs">Underline</SelectItem>
                  <SelectItem value="overline" className="text-xs">Overline</SelectItem>
                  <SelectItem value="line-through" className="text-xs">Line-through</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div 
            className="flex items-center justify-center rounded-lg bg-background h-48 shadow-inner border border-border p-4 overflow-auto" // Changed overflow-hidden to overflow-auto
            data-ai-hint="typography preview text"
          >
            <p style={previewStyle} className="break-words max-w-full">
              The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
            </p>
          </div>
          
          <div>
            <Label htmlFor="generatedTypographyCss" className="text-sm font-medium">Generated CSS</Label>
            <Textarea
              id="generatedTypographyCss"
              value={generatedCss}
              readOnly
              className="mt-1 min-h-[120px] font-mono text-xs bg-muted/50"
              rows={8} // Increased rows
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
