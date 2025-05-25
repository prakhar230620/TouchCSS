
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DraftingCompass, Rows, Palette, SquareTerminal, Layers, SlidersHorizontal, Type, Code, Eye, Zap, Settings, Move, Maximize, CircleDot, Sparkles, Pipette } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BuildPage() {
  const { toast } = useToast();

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Feature Coming Soon!",
      description: `${featureName} is currently under active development. Check back soon!`,
    });
  };

  return (
    <div className="space-y-12 md:space-y-16">
      <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary md:text-6xl">
          Build & Experiment with CSS
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Visually construct UI components, generate themes, and experiment freely. Bring your designs to life effortlessly.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300 transform hover:-translate-y-1">
          <CardHeader className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><DraftingCompass className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">Visual CSS Editors</CardTitle>
            </div>
            <CardDescription className="text-base">Fine-tune styles with intuitive visual controls. Perfect for shadows, gradients, transforms, and more.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-6">
            {/* Mock Shadow Editor */}
            <div className="p-4 border rounded-lg bg-card/50 shadow-sm">
              <h4 className="font-semibold mb-3 text-lg flex items-center gap-2"><Layers className="w-5 h-5 text-primary/80"/>Box Shadow Editor</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="offsetX" className="text-xs">Offset X</Label>
                  <Slider defaultValue={[2]} max={50} step={1} id="offsetX" disabled />
                </div>
                <div>
                  <Label htmlFor="offsetY" className="text-xs">Offset Y</Label>
                  <Slider defaultValue={[4]} max={50} step={1} id="offsetY" disabled />
                </div>
                <div>
                  <Label htmlFor="blurRadius" className="text-xs">Blur Radius</Label>
                  <Slider defaultValue={[8]} max={50} step={1} id="blurRadius" disabled />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="shadowColor" className="text-xs whitespace-nowrap">Color:</Label>
                  <Input type="color" id="shadowColor" defaultValue="#000000" className="h-8 p-1" disabled />
                  <div className="w-16 h-8 rounded bg-black/10 ml-auto ring-1 ring-inset ring-border"></div>
                </div>
              </div>
               <Button variant="outline" className="w-full mt-4 text-sm" onClick={() => handleFeatureClick("Shadow Editor")}>Launch Shadow Editor</Button>
            </div>
             <p className="text-xs text-muted-foreground text-center">More editors for gradients, transforms, typography coming soon!</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300 transform hover:-translate-y-1">
          <CardHeader className="p-6">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-3 bg-primary/10 rounded-full"><Rows className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">Live Component Builder</CardTitle>
            </div>
             <CardDescription className="text-base">Assemble UI components and customize their styles visually. Export HTML + CSS.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <div className="p-4 border-dashed border-2 border-border rounded-lg h-64 flex flex-col items-center justify-center bg-background/30" data-ai-hint="drag drop UI builder">
              <Move className="w-12 h-12 text-muted-foreground mb-3"/>
              <p className="text-muted-foreground text-center">Drag & drop UI elements here.</p>
              <p className="text-xs text-muted-foreground mt-1">(Button, Card, Input, etc.)</p>
            </div>
            <div className="flex justify-around items-center text-xs text-muted-foreground pt-2">
                <span className="flex items-center gap-1"><Settings className="w-4 h-4 text-primary/80"/>Configure</span>
                <span className="flex items-center gap-1"><Eye className="w-4 h-4 text-primary/80"/>Preview</span>
                <span className="flex items-center gap-1"><Code className="w-4 h-4 text-primary/80"/>Export</span>
            </div>
            <Button className="w-full mt-2 text-sm" onClick={() => handleFeatureClick("Component Builder")}>Start Building Components</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300 transform hover:-translate-y-1">
          <CardHeader className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><Palette className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">Global Style Theme Generator</CardTitle>
            </div>
            <CardDescription className="text-base">Create custom design systems: pick fonts, define color palettes, set spacing, and generate theme files.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <div className="p-4 border rounded-lg bg-card/50 shadow-sm space-y-3" data-ai-hint="theme generator UI">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Primary Color:</Label>
                <div className="flex items-center gap-2">
                   <Input type="color" defaultValue="#6A0DAD" className="h-8 w-10 p-0.5" disabled />
                   <span className="text-xs font-mono p-1 bg-muted rounded">#6A0DAD</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Font Family:</Label>
                <span className="text-xs p-1 bg-muted rounded">Inter, sans-serif</span>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Border Radius:</Label>
                <span className="text-xs p-1 bg-muted rounded">0.75rem</span>
              </div>
              <Image src="https://placehold.co/400x200.png?text=Theme+Preview" alt="Theme Preview Placeholder" width={400} height={200} className="rounded-md border mt-2" data-ai-hint="website theme preview"/>
            </div>
            <Button variant="secondary" className="w-full mt-2 text-sm" onClick={() => handleFeatureClick("Theme Generator")}>Generate Your Theme</Button>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300 transform hover:-translate-y-1">
          <CardHeader className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><SquareTerminal className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">CSS Experiment Sandbox</CardTitle>
            </div>
            <CardDescription className="text-base">A blank canvas for free play. Drag UI elements, apply styles visually, and test ideas quickly.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
             <div className="p-4 border-dashed border-2 border-border rounded-lg h-64 flex items-center justify-center bg-background/30" data-ai-hint="CSS sandbox canvas">
                <Maximize className="w-12 h-12 text-muted-foreground"/>
             </div>
            <p className="text-xs text-muted-foreground text-center">Your creative CSS playground awaits.</p>
            <Button variant="ghost" className="w-full mt-2 text-sm" onClick={() => handleFeatureClick("Experiment Mode")}>Enter Experiment Mode</Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12 md:mt-16 p-8 bg-accent/10 rounded-3xl shadow-inner">
        <Sparkles className="w-12 h-12 text-accent mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-semibold mb-3 text-accent">Unleash Your Creativity!</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-lg">
          Our workshop is buzzing as we craft these powerful building tools. Get ready to design and innovate like never before!
        </p>
      </div>
    </div>
  );
}
