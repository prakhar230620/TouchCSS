
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpenText, Puzzle, Brain, CheckCircle, ListChecks, Zap, PlayCircle, Target, Wind, Palette, Layers3, ArrowRight, GraduationCap, Goal, Lightbulb, Navigation, GalleryVerticalEnd, PanelTopOpen, Sparkles as SparklesIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils";


const tutorialTopics = [
  { id: "flexbox", title: "Understanding Flexbox Layouts", icon: Layers3, description: "Master one-dimensional layouts for flexible UIs.", chapters: ["Introduction to Flexbox", "Flex Containers & Items", "Aligning & Justifying Content", "Practical Examples"] },
  { id: "grid", title: "Mastering CSS Grid Systems", icon: ListChecks, description: "Learn two-dimensional layouts for complex designs.", chapters: ["Grid Basics", "Defining Grid Tracks", "Placing Items", "Grid Areas", "Alignment in Grid"] },
  { id: "animations", title: "CSS Animations & Transitions", icon: Wind, description: "Bring your UIs to life with smooth animations.", chapters: ["Intro to Transitions", "Keyframes & Animations", "Performance & Best Practices"] },
  { id: "responsive", title: "Responsive Design Principles", icon: Target, description: "Build websites that adapt to any screen size.", chapters: ["What is RWD?", "Media Queries", "Fluid Layouts & Units", "Flexible Media"] },
  { id: "selectors", title: "Advanced Selectors & Specificity", icon: Palette, description: "Target elements precisely and manage CSS conflicts.", chapters: ["Intro to Selectors", "Attribute Selectors", "Pseudo-classes", "Pseudo-elements", "Combinators", "Specificity"] },
];

const exerciseTopics = [
  { 
    id: "style-nav", 
    title: "Style a Navigation Bar", 
    icon: Navigation,
    difficulty: "Easy", 
    description: "Build a responsive navigation bar using Flexbox, a common component in web design.",
    concepts: ["Flexbox", "Basic Styling", "Responsive"], 
    learningGoals: [
      "Use flex properties to align items in a row.",
      "Space items evenly in a navigation bar.",
      "Apply basic styling for links and hover effects.",
      "Make the navigation bar collapse on smaller screens (conceptual)."
    ] 
  },
  { 
    id: "product-card",
    title: "Create a Product Card", 
    icon: GalleryVerticalEnd,
    difficulty: "Medium", 
    description: "Design and implement a visually appealing product card, a staple in e-commerce UIs.",
    concepts: ["Box Model", "Typography", "Flexbox/Grid", "Images"],
    learningGoals: [
      "Structure card content effectively with HTML.",
      "Apply padding, margins, and borders.",
      "Style text elements for readability.",
      "Arrange elements within the card using Flexbox or Grid."
    ]
  },
  { 
    id: "modal-dialog",
    title: "Implement a Modal Dialog", 
    icon: PanelTopOpen,
    difficulty: "Hard", 
    description: "Develop a modal dialog box that appears over the main content, often used for alerts or forms.",
    concepts: ["Positioning", "Transitions", "z-index", "Accessibility (ARIA)"],
    learningGoals: [
      "Use absolute/fixed positioning to overlay content.",
      "Create smooth show/hide transitions.",
      "Manage stacking order with z-index.",
      "Understand basic accessibility considerations for modals."
    ]
  }
];

export default function LearnPage() {
  const { toast } = useToast();

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Interactive Exercise Coming Soon!",
      description: `The interactive environment for "${featureName}" is under development. Check back soon!`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-12 md:space-y-16">
      <header className="text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4 shadow-md">
          <GraduationCap className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary md:text-6xl">
          Learn CSS Interactively
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Master CSS concepts through guided tutorials, hands-on exercises, AI-powered insights, and practical examples.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-2 rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300 bg-gradient-to-br from-card via-card to-primary/5">
          <CardHeader className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-sm"><BookOpenText className="w-8 h-8" /></div>
              <CardTitle className="text-2xl md:text-3xl font-semibold text-primary-dark">Guided Tutorials</CardTitle>
            </div>
            <CardDescription className="text-base text-muted-foreground">Step-by-step walkthroughs of core CSS properties and modern techniques.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Accordion type="single" collapsible className="w-full">
              {tutorialTopics.map(topic => (
                <AccordionItem value={topic.id} key={topic.id} className="border-b border-border/70 mb-2 last:mb-0 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="hover:bg-secondary/30 data-[state=open]:bg-secondary/50 p-4 rounded-t-lg data-[state=closed]:rounded-lg text-left transition-colors">
                    <div className="flex items-center gap-3 w-full">
                      <div className="p-2 bg-primary/10 rounded-md text-primary"><topic.icon className="w-5 h-5" /></div>
                      <span className="text-lg font-medium text-foreground flex-1">{topic.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-background/30 rounded-b-lg shadow-inner">
                    <p className="text-muted-foreground mb-3 text-sm">{topic.description}</p>
                    <ul className="space-y-1.5 mb-4">
                      {topic.chapters.map(chapter => (
                         <li key={chapter} className="flex items-center gap-2 text-sm">
                           <PlayCircle className="w-4 h-4 text-primary/80 shrink-0"/> 
                           <span className="text-muted-foreground">{chapter}</span>
                         </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2 text-sm py-2.5">
                      <Link href={`/learn/tutorials/${topic.id}`}>
                        Start Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="rounded-2xl shadow-xl hover:shadow-accent/15 transition-shadow duration-300 bg-gradient-to-br from-card via-card to-accent/5">
            <CardHeader className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-accent/10 rounded-xl text-accent-dark shadow-sm"><Puzzle className="w-8 h-8" /></div>
                <CardTitle className="text-2xl md:text-3xl font-semibold text-accent-darker">Interactive Exercises</CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">Put your knowledge to the test with hands-on coding challenges.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              {exerciseTopics.map(exercise => {
                const ExerciseIcon = exercise.icon;
                return (
                  <Card key={exercise.id} className="overflow-hidden rounded-xl shadow-lg hover:shadow-accent/20 transition-shadow bg-card/80 border border-accent/30">
                    <CardHeader className="p-4 bg-accent/5 border-b border-accent/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg text-accent-dark shadow-sm">
                          <ExerciseIcon className="w-6 h-6"/>
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold text-accent-darker">{exercise.title}</CardTitle>
                          <Badge variant="outline" className={cn(
                            "mt-1 text-xs",
                            exercise.difficulty === "Easy" && "border-green-500/50 text-green-700 bg-green-500/10",
                            exercise.difficulty === "Medium" && "border-yellow-500/50 text-yellow-700 bg-yellow-500/10",
                            exercise.difficulty === "Hard" && "border-red-500/50 text-red-700 bg-red-500/10"
                          )}>{exercise.difficulty}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <p className="text-sm text-muted-foreground">{exercise.description}</p>
                      <div>
                        <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5">Concepts Covered:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {exercise.concepts.map(concept => (
                            <Badge key={concept} variant="secondary" className="text-xs bg-secondary/70 text-secondary-foreground/80">{concept}</Badge>
                          ))}
                        </div>
                      </div>
                       <div>
                        <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 flex items-center"><Goal className="w-3.5 h-3.5 mr-1 text-green-600"/>Learning Goals:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          {exercise.learningGoals.map(goal => <li key={goal}>{goal}</li>)}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 bg-accent/5 border-t border-accent/20">
                      <Button 
                        className="w-full text-sm bg-accent hover:bg-accent/90 text-accent-foreground" 
                        onClick={() => handleFeatureClick(exercise.title)}
                      >
                        <SparklesIcon className="mr-2 h-4 w-4"/>
                        Start Exercise
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
               <p className="text-xs text-muted-foreground text-center pt-2">More exercises are under development!</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-xl hover:shadow-secondary/15 transition-shadow duration-300 bg-gradient-to-br from-card via-card to-secondary/5">
            <CardHeader className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-secondary/10 rounded-xl text-secondary-dark shadow-sm"><Brain className="w-8 h-8" /></div>
                <CardTitle className="text-2xl md:text-3xl font-semibold text-secondary-darker">AI CSS Explainer</CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">Get any CSS snippet explained in plain English by our AI assistant.</CardDescription>
            </CardHeader>
            <CardContent className="text-center p-6 pt-0">
              <Image src="https://placehold.co/300x150.png" alt="AI Explainer Illustration" width={300} height={150} className="rounded-lg mx-auto mb-4 border shadow-sm" data-ai-hint="AI interface abstract" />
              <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base">
                <Link href="/tools/explain-css">Try the AI Explainer <Lightbulb className="ml-2 h-5 w-5"/></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="text-center mt-12 md:mt-16 p-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-3xl shadow-inner border border-border/50">
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-semibold mb-3 text-primary-dark">Your Learning Journey Starts Here!</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-lg">
          We're continuously adding new content, tutorials, and exercises. Stay tuned for exciting updates!
        </p>
      </div>
    </div>
  );
}

