import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DraftingCompass, Rows, Palette, SquareTerminal } from "lucide-react";

export default function BuildPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Build & Experiment with CSS
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Visually construct UI components, generate themes, and experiment freely on a blank canvas.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <DraftingCompass className="w-8 h-8 text-accent" />
              <CardTitle>Visual CSS Editors</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Fine-tune box shadows, border radius, gradients, typography, transforms, and the box model with intuitive visual controls. (Coming Soon)
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
               <Rows className="w-8 h-8 text-accent" />
              <CardTitle>Live Component Builder</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Assemble ready-made UI components and customize their styles visually. Export full HTML + CSS. (Coming Soon)
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Palette className="w-8 h-8 text-accent" />
              <CardTitle>Global Style Theme Generator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Create custom design systems: pick fonts, color palettes, set global spacing, and generate theme files. (Coming Soon)
            </p>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <SquareTerminal className="w-8 h-8 text-accent" />
              <CardTitle>"Experiment" Mode</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
             A blank canvas for free play. Drag UI elements and apply styles visually. Add text, boxes, images, buttons. (Coming Soon)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12 p-6 bg-card rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Powerful Building Tools Under Development!</h2>
        <p className="text-muted-foreground">
          Our workshop is busy crafting these features. Get ready to unleash your creativity!
        </p>
      </div>
    </div>
  );
}
