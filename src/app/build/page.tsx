
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DraftingCompass, Layers, SlidersHorizontal, Type, Code, Eye, Zap, Settings, Move, Maximize, CircleDot, Sparkles, Pipette, Bot, Paintbrush, MountainSnow, Shapes, Blend, Film, Scaling, Wand2, CaseSensitive, Grid, Sigma, Palette as PaletteIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { BoxShadowEditor } from "@/components/tools/box-shadow-editor";
import { GradientEditor } from "@/components/tools/gradient-editor";
import { TransformEditor } from "@/components/tools/transform-editor";
import { TypographyEditor } from "@/components/tools/typography-editor";
import { FilterEffectsEditor } from "@/components/tools/filter-effects-editor";
import { AnimationEditor } from "@/components/tools/animation-editor";
import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export default function BuildPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      <Card className="rounded-2xl shadow-xl hover:shadow-secondary/15 transition-shadow duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-card via-card to-secondary/5">
        <CardHeader className="p-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-secondary/10 rounded-xl text-secondary-dark shadow-sm"><Layers className="w-8 h-8" /></div>
            <div>
              <CardTitle className="text-2xl font-semibold text-secondary-darker">Visual CSS Editors</CardTitle>
              <CardDescription className="text-base text-muted-foreground">Fine-tune styles with intuitive visual controls. Perfect for shadows, gradients, transforms, and more.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-8">
          {isClient ? <BoxShadowEditor /> : <Skeleton className="h-[390px] w-full rounded-lg" />}
          {isClient ? <GradientEditor /> : <Skeleton className="h-[500px] w-full rounded-lg mt-8" />}
          
          <div className="mt-12 space-y-10">
            <h3 className="text-xl font-semibold text-secondary-darker border-b pb-2 mb-6">Advanced Visual Editors</h3>
            {isClient ? <TransformEditor /> : <Skeleton className="h-[420px] w-full rounded-lg" />}
            {isClient ? <TypographyEditor /> : <Skeleton className="h-[420px] w-full rounded-lg mt-8" />}
            {isClient ? <FilterEffectsEditor /> : <Skeleton className="h-[420px w-full rounded-lg mt-8" />}
            {isClient ? <AnimationEditor /> : <Skeleton className="h-[420px] w-full rounded-lg mt-8" />}
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-secondary/5 rounded-b-2xl mt-2">
            <p className="text-xs text-muted-foreground text-center w-full">More features and refinements are on the way!</p>
        </CardFooter>
      </Card>

      {/* Removed Global Style Theme Generator and CSS Experiment Sandbox sections */}

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
