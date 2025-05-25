
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Lightbulb, Palette as PaletteIcon, Zap, Code, Brush, Layers, Sparkles as SparklesIcon } from "lucide-react"; // Added Layers
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-20 md:space-y-24">
      <header className="text-center py-10 sm:py-12 md:py-16">
        <Zap className="w-16 h-16 sm:w-20 sm:h-20 text-primary mx-auto mb-6 animate-pulse" />
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-primary">
          TouchCSS Studio
        </h1>
        <p className="mt-6 text-lg sm:text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
          Visually build stunning UIs, master CSS interactively, and supercharge your development workflow.
        </p>
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
          <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
            <Link href="/build">Start Building <Rocket className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg shadow-sm hover:shadow-accent/20 transition-all duration-300 transform hover:scale-105">
            <Link href="/learn">Learn CSS <Lightbulb className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5">
          <CardHeader className="items-center text-center p-6">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Brush className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Visual CSS Editors</CardTitle>
            <CardDescription>
              Craft complex styles with intuitive editors. Perfect for shadows, gradients, typography, and more.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center p-6 pt-0">
            <Button variant="secondary" className="w-full rounded-lg" asChild>
              <Link href="/build">Try Visual Editors</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5">
          <CardHeader className="items-center text-center p-6">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
             <Lightbulb className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Interactive Learning</CardTitle>
            <CardDescription>
              Engage with guided tutorials, hands-on exercises, and AI explanations to deeply understand CSS concepts.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center p-6 pt-0">
            <Button variant="secondary" className="w-full rounded-lg" asChild>
              <Link href="/learn">Explore Tutorials</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5">
          <CardHeader className="items-center text-center p-6">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Layers className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Explore CSS Features</CardTitle>
            <CardDescription>
              Discover hover effects, transitions, animations, and other modern CSS techniques with examples.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center p-6 pt-0">
            <Button variant="secondary" className="w-full rounded-lg" asChild>
              <Link href="/additional-features">See Features</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="text-center py-12 sm:py-16 bg-card/80 rounded-3xl shadow-inner">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">Ready to Elevate Your CSS Game?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
          Whether you're a beginner or a pro, TouchCSS Studio empowers your creativity and efficiency.
        </p>
        <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-7 text-xl shadow-lg hover:shadow-accent/30 transition-all duration-300 transform hover:scale-105">
          <Link href="/tools/explain-css">
            Try AI CSS Explainer <SparklesIcon className="ml-2 h-6 w-6"/>
          </Link>
        </Button>
      </section>

      <section className="py-10 sm:py-12">
        <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl font-semibold text-foreground">Powered by Modern Technologies</h2>
            <p className="text-muted-foreground mt-2 text-lg">We leverage the best tools to bring you a seamless experience.</p>
        </div>
        <div className="flex justify-center items-center gap-x-6 gap-y-4 sm:gap-x-8 md:gap-x-12 flex-wrap grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <Image src="https://placehold.co/120x50.png?text=Next.js" alt="Next.js Logo" width={120} height={50} data-ai-hint="NextJS logo" />
            <Image src="https://placehold.co/100x50.png?text=React" alt="React Logo" width={100} height={50} data-ai-hint="React logo"/>
            <Image src="https://placehold.co/150x50.png?text=TailwindCSS" alt="Tailwind CSS Logo" width={150} height={50} data-ai-hint="TailwindCSS logo" />
            <Image src="https://placehold.co/110x50.png?text=Genkit" alt="Genkit Logo" width={110} height={50} data-ai-hint="Genkit logo" />
            <Image src="https://placehold.co/120x50.png?text=ShadCN+UI" alt="ShadCN UI Logo" width={120} height={50} data-ai-hint="ShadcnUI logo" />
        </div>
    </section>
    </div>
  );
}
