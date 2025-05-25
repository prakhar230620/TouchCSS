import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DraftingCompass, Rows, Palette, SquareTerminal, Layers, SlidersHorizontal, Type, Code, Eye, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BuildPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">
          Build & Experiment with CSS
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Visually construct UI components, generate themes, and experiment freely on a blank canvas. Bring your designs to life effortlessly.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><DraftingCompass className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">Visual CSS Editors</CardTitle>
            </div>
            <CardDescription>Fine-tune box shadows, border radius, gradients, typography, transforms, and the box model with intuitive visual controls.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Image src="https://placehold.co/600x300.png?text=Visual+Editor+Interface" alt="Visual Editor Placeholder" width={600} height={300} className="rounded-lg border" data-ai-hint="UI editor interface" />
            <div className="flex justify-around items-center text-xs text-muted-foreground pt-2">
                <span className="flex items-center gap-1"><Layers className="w-4 h-4 text-primary/80"/>Properties</span>
                <span className="flex items-center gap-1"><SlidersHorizontal className="w-4 h-4 text-primary/80"/>Controls</span>
                <span className="flex items-center gap-1"><Eye className="w-4 h-4 text-primary/80"/>Live Preview</span>
            </div>
            <Button variant="outline" className="w-full mt-2" disabled>Launch Shadow Editor (Soon)</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
               <div className="p-3 bg-primary/10 rounded-full"><Rows className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">Live Component Builder</CardTitle>
            </div>
             <CardDescription>Assemble ready-made UI components (buttons, cards, forms) and customize their styles visually. Export full HTML + CSS.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Image src="https://placehold.co/600x300.png?text=Component+Builder+UI" alt="Component Builder Placeholder" width={600} height={300} className="rounded-lg border" data-ai-hint="component builder" />
             <p className="text-xs text-muted-foreground text-center">Drag, drop, and style. It's that simple.</p>
            <Button className="w-full" disabled>Start Building Components (Soon)</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><Palette className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">Global Style Theme Generator</CardTitle>
            </div>
            <CardDescription>Create custom design systems: pick fonts, define color palettes, set global spacing, and generate ready-to-use theme files.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Image src="https://placehold.co/600x300.png?text=Theme+Generator+Mockup" alt="Theme Generator Placeholder" width={600} height={300} className="rounded-lg border" data-ai-hint="theme generator" />
            <p className="text-xs text-muted-foreground text-center">Define your brand's look and feel consistently.</p>
            <Button variant="secondary" className="w-full" disabled>Generate Your Theme (Soon)</Button>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><SquareTerminal className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">"Experiment" Mode</CardTitle>
            </div>
            <CardDescription>A blank canvas for free play. Drag UI elements, apply styles visually, and test ideas quickly. Add text, boxes, images, buttons.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Image src="https://placehold.co/600x300.png?text=Experiment+Canvas+Area" alt="Experiment Mode Placeholder" width={600} height={300} className="rounded-lg border" data-ai-hint="sandbox canvas" />
            <p className="text-xs text-muted-foreground text-center">Your creative CSS playground awaits.</p>
            <Button variant="ghost" className="w-full" disabled>Enter Experiment Mode (Soon)</Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-16 p-8 bg-accent/10 rounded-3xl shadow-inner">
        <Zap className="w-12 h-12 text-accent mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-semibold mb-3 text-accent">Unleash Your Creativity Soon!</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Our workshop is buzzing as we craft these powerful building tools. Get ready to design and innovate like never before!
        </p>
      </div>
    </div>
  );
}
