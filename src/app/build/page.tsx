
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DraftingCompass, Rows, Palette, SquareTerminal, Layers, SlidersHorizontal, Type, Code, Eye, Zap, Settings, Move, Maximize, CircleDot, Sparkles, Pipette, Bot, Paintbrush } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { BoxShadowEditor } from "@/components/tools/box-shadow-editor";
import { GradientEditor } from "@/components/tools/gradient-editor"; // New import
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function BuildPage() {
  const { toast } = useToast();

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Feature Coming Soon!",
      description: `${featureName} is currently under active development. Check back soon!`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-12 md:space-y-16">
      <header className="text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4 shadow-md">
          <DraftingCompass className="w-12 h-12" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary md:text-6xl">
          Build & Experiment
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Visually construct UI components, generate themes, and experiment freely. Bring your designs to life effortlessly.
        </p>
      </header>

      {/* Visual CSS Editors Card */}
      <Card className="rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader className="p-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-sm"><Layers className="w-8 h-8" /></div>
            <div>
              <CardTitle className="text-2xl font-semibold text-primary-dark">Visual CSS Editors</CardTitle>
              <CardDescription className="text-base text-muted-foreground">Fine-tune styles with intuitive visual controls. Perfect for shadows, gradients, transforms, and more.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-8">
          <BoxShadowEditor />
          <GradientEditor /> 
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <Card className="rounded-xl shadow-lg hover:shadow-secondary/20 transition-shadow duration-300 bg-card/80 border border-secondary/30">
                <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary/10 rounded-lg text-secondary-dark shadow-sm"><Maximize className="w-6 h-6"/></div>
                        <CardTitle className="text-lg font-semibold text-secondary-darker">Transform Editor</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-xs text-muted-foreground mb-3">Adjust 2D & 3D transforms like translate, rotate, scale, and skew with live previews.</p>
                    <Button variant="outline" className="w-full text-xs" onClick={() => handleFeatureClick("Transform Editor")}>
                        Open Editor (Soon)
                    </Button>
                </CardContent>
            </Card>

            <Card className="rounded-xl shadow-lg hover:shadow-secondary/20 transition-shadow duration-300 bg-card/80 border border-secondary/30">
                <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary/10 rounded-lg text-secondary-dark shadow-sm"><Type className="w-6 h-6"/></div>
                        <CardTitle className="text-lg font-semibold text-secondary-darker">Typography Controls</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-xs text-muted-foreground mb-3">Manage font families, sizes, weights, letter spacing, and line heights visually.</p>
                    <Button variant="outline" className="w-full text-xs" onClick={() => handleFeatureClick("Typography Editor")}>
                        Open Editor (Soon)
                    </Button>
                </CardContent>
            </Card>

            <Card className="rounded-xl shadow-lg hover:shadow-secondary/20 transition-shadow duration-300 bg-card/80 border border-secondary/30 sm:col-span-2">
                <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary/10 rounded-lg text-secondary-dark shadow-sm"><CircleDot className="w-6 h-6"/></div>
                        <CardTitle className="text-lg font-semibold text-secondary-darker">Filter Effects Editor</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-xs text-muted-foreground mb-3">Apply and adjust CSS filters like blur, brightness, contrast, sepia, hue-rotate, and more.</p>
                    <Button variant="outline" className="w-full text-xs" onClick={() => handleFeatureClick("Filter Effects Editor")}>
                        Open Editor (Soon)
                    </Button>
                </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-primary/5 rounded-b-2xl mt-2">
            <p className="text-xs text-muted-foreground text-center w-full">More advanced visual editors are on the way!</p>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-2xl shadow-xl hover:shadow-secondary/15 transition-shadow duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-card via-card to-secondary/5">
          <CardHeader className="p-6">
            <div className="flex items-center gap-4 mb-3">
               <div className="p-3 bg-secondary/10 rounded-xl text-secondary-dark shadow-sm"><Rows className="w-8 h-8" /></div>
              <div>
                <CardTitle className="text-2xl font-semibold text-secondary-darker">Live Component Builder</CardTitle>
                <CardDescription className="text-base text-muted-foreground">Assemble UI components and customize their styles visually. Export HTML + CSS.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <div className="p-6 border-dashed border-2 border-border rounded-xl h-72 flex flex-col items-center justify-center bg-background/50 shadow-inner" data-ai-hint="drag drop UI builder interactive">
              <Move className="w-16 h-16 text-muted-foreground/70 mb-4"/>
              <p className="text-muted-foreground text-center font-medium">Drag & drop UI elements here</p>
              <p className="text-xs text-muted-foreground mt-1">(Button, Card, Input, Avatar, etc.)</p>
              <div className="mt-6 w-full space-y-2">
                <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md text-xs"><span>Selected: None</span> <Button size="sm" variant="ghost" disabled>Properties</Button></div>
                <div className="h-32 bg-muted/30 rounded-md border flex items-center justify-center text-muted-foreground/50 text-sm">Preview Area</div>
              </div>
            </div>
            <div className="flex justify-around items-center text-xs text-muted-foreground pt-2 gap-4">
                <span className="flex items-center gap-1.5 p-2 bg-muted/50 rounded-md"><Settings className="w-4 h-4 text-secondary-dark"/>Configure</span>
                <span className="flex items-center gap-1.5 p-2 bg-muted/50 rounded-md"><Eye className="w-4 h-4 text-secondary-dark"/>Live Preview</span>
                <span className="flex items-center gap-1.5 p-2 bg-muted/50 rounded-md"><Code className="w-4 h-4 text-secondary-dark"/>Export Code</span>
            </div>
            <Button className="w-full mt-3 text-base py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground" onClick={() => handleFeatureClick("Component Builder")}>
              <Paintbrush className="mr-2"/> Start Building Components
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-accent/15 transition-shadow duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-card via-card to-accent/5">
          <CardHeader className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-accent/10 rounded-xl text-accent-dark shadow-sm"><Palette className="w-8 h-8" /></div>
              <div>
                <CardTitle className="text-2xl font-semibold text-accent-darker">Global Style Theme Generator</CardTitle>
                <CardDescription className="text-base text-muted-foreground">Create custom design systems: pick fonts, define color palettes, set spacing, and generate theme files.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <div className="p-6 border rounded-xl bg-background/50 shadow-inner space-y-4" data-ai-hint="theme generator settings UI">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Primary Color:</Label>
                <div className="flex items-center gap-2">
                   <Input type="color" defaultValue="#7C3AED" className="h-8 w-10 p-0.5 rounded-md border-input" disabled />
                   <span className="text-xs font-mono p-1.5 bg-muted rounded-md">#7C3AED</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Font Family:</Label>
                 <Button variant="outline" size="sm" className="text-xs" disabled>Geist, sans-serif</Button>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Border Radius:</Label>
                <Button variant="outline" size="sm" className="text-xs" disabled>0.75rem</Button>
              </div>
              <Image src="https://placehold.co/400x200.png" alt="Theme Preview Placeholder" width={400} height={200} className="rounded-lg border-2 border-border mt-3 shadow-sm" data-ai-hint="website color theme palette"/>
            </div>
            <Button className="w-full mt-3 text-base py-3 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => handleFeatureClick("Theme Generator")}>
                <Bot className="mr-2" /> Generate with AI Assist
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="rounded-2xl shadow-xl hover:shadow-destructive/10 transition-shadow duration-300 transform hover:-translate-y-1 bg-gradient-to-tr from-card via-card to-destructive/5">
          <CardHeader className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-destructive/5 rounded-xl text-destructive-dark shadow-sm"><SquareTerminal className="w-8 h-8" /></div>
              <div>
                <CardTitle className="text-2xl font-semibold text-destructive-darker">CSS Experiment Sandbox</CardTitle>
                <CardDescription className="text-base text-muted-foreground">A blank canvas for free play. Drag UI elements, apply styles visually, and test ideas quickly without constraints.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
             <div className="p-6 border-dashed border-2 border-border rounded-xl h-80 flex flex-col items-center justify-center bg-background/50 shadow-inner relative overflow-hidden" data-ai-hint="CSS interactive sandbox UI">
                <div className="absolute top-4 left-4 flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs" disabled><Layers className="mr-1.5 w-3.5 h-3.5"/> Elements</Button>
                    <Button variant="outline" size="sm" className="text-xs" disabled><SlidersHorizontal className="mr-1.5 w-3.5 h-3.5"/> Styles</Button>
                </div>
                <Maximize className="w-16 h-16 text-muted-foreground/70 my-4"/>
                <p className="text-muted-foreground font-medium">Your Creative CSS Playground</p>
                <p className="text-xs text-muted-foreground mt-1">Drag, drop, style, and innovate.</p>
                 <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button variant="ghost" size="icon" disabled><Code className="w-4 h-4"/></Button>
                    <Button variant="ghost" size="icon" disabled><Eye className="w-4 h-4"/></Button>
                </div>
             </div>
            <Button variant="ghost" className="w-full mt-3 text-base py-3 text-destructive-darker hover:bg-destructive/10 hover:text-destructive-darker" onClick={() => handleFeatureClick("Experiment Mode")}>
              Enter Sandbox Mode
            </Button>
          </CardContent>
        </Card>


      <div className="text-center mt-12 md:mt-16 p-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-3xl shadow-inner border border-border/30">
        <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-semibold mb-3 text-primary-dark">Unleash Your Creativity!</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-lg">
          Our workshop is buzzing as we craft these powerful building tools. Get ready to design and innovate like never before!
        </p>
      </div>
    </div>
  );
}

    