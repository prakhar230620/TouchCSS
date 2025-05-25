import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Lightbulb, Palette } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-8">
        <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">
          Welcome to TouchCSS Studio
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          The ultimate platform to visually build, learn, and master CSS. Designed for touchscreens, tablets, and desktops.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/build">Start Building</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/learn">Learn CSS <Lightbulb className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Rocket className="w-10 h-10 text-primary mb-4" />
            <CardTitle className="text-2xl">Visual CSS Editors</CardTitle>
            <CardDescription>
              Intuitively craft complex styles with drag-and-slider based editors for shadows, gradients, typography, and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/build">Try Visual Editors</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Lightbulb className="w-10 h-10 text-primary mb-4" />
            <CardTitle className="text-2xl">Interactive Learning</CardTitle>
            <CardDescription>
              Engage with guided tutorials, real-time code previews, and AI explanations to deepen your CSS knowledge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/learn">Explore Tutorials</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Palette className="w-10 h-10 text-primary mb-4" />
            <CardTitle className="text-2xl">Build & Export</CardTitle>
            <CardDescription>
              Construct UI components, generate themes, and export your work as clean HTML/CSS, Tailwind, or JSON.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/export">See Export Options</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
       <section className="text-center py-8">
          <h2 className="text-3xl font-semibold mb-4">Ready to Dive In?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Whether you're a beginner or a seasoned pro, TouchCSS Studio offers tools to enhance your workflow and creativity.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/tools/explain-css">
              Try AI CSS Explainer
            </Link>
          </Button>
        </section>
    </div>
  );
}
