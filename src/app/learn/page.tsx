
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpenText, Puzzle, Brain, CheckCircle, ListChecks, Zap, PlayCircle, Target, Wind, Palette, Layers3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const tutorialTopics = [
  { id: "flexbox", title: "Understanding Flexbox Layouts", icon: Layers3, description: "Master one-dimensional layouts for flexible UIs.", chapters: ["Introduction to Flexbox", "Flex Containers & Items", "Aligning & Justifying Content", "Practical Examples"] },
  { id: "grid", title: "Mastering CSS Grid Systems", icon: ListChecks, description: "Learn two-dimensional layouts for complex designs.", chapters: ["Grid Basics", "Defining Grid Areas", "Responsive Grids", "Grid vs. Flexbox"] },
  { id: "animations", title: "CSS Animations & Transitions", icon: Wind, description: "Bring your UIs to life with smooth animations.", chapters: ["Keyframes & Animation Properties", "Transition Effects", "Performance Considerations", "Creative Use Cases"] },
  { id: "responsive", title: "Responsive Design Principles", icon: Target, description: "Build websites that adapt to any screen size.", chapters: ["Media Queries", "Fluid Grids & Images", "Mobile-First Approach", "Viewport Configuration"] },
  { id: "selectors", title: "Advanced Selectors & Specificity", icon: Palette, description: "Target elements precisely and manage CSS conflicts.", chapters: ["Attribute Selectors", "Pseudo-classes & Pseudo-elements", "Combinators", "Understanding Specificity"] },
];

const exerciseTopics = [
  { title: "Style a Navigation Bar", difficulty: "Easy", concepts: ["Flexbox", "Basic Styling"] },
  { title: "Create a Product Card", difficulty: "Medium", concepts: ["Grid", "Box Model", "Typography"] },
  { title: "Implement a Modal Dialog", difficulty: "Hard", concepts: ["Positioning", "Transitions", "JavaScript (for toggle)"] }
];

export default function LearnPage() {
  const { toast } = useToast();

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Feature Coming Soon!",
      description: `${featureName} is currently under development. Stay tuned!`,
    });
  };

  return (
    <div className="space-y-12 md:space-y-16">
      <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary md:text-6xl">
          Learn CSS Interactively
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Master CSS concepts through guided tutorials, hands-on exercises, AI-powered insights, and practical examples.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300">
          <CardHeader className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><BookOpenText className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl md:text-3xl">Guided Tutorials</CardTitle>
            </div>
            <CardDescription className="text-base">Step-by-step walkthroughs of core CSS properties and modern techniques.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Accordion type="single" collapsible className="w-full">
              {tutorialTopics.map(topic => (
                <AccordionItem value={topic.id} key={topic.id} className="border-b-0 mb-2 last:mb-0">
                  <AccordionTrigger className="bg-card hover:bg-secondary/50 p-4 rounded-lg shadow-sm data-[state=open]:bg-secondary/60 data-[state=open]:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <topic.icon className="w-6 h-6 text-primary/90" />
                      <span className="text-lg font-medium text-left">{topic.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 bg-background/50 rounded-b-lg mt-0 shadow-inner">
                    <p className="text-muted-foreground mb-3">{topic.description}</p>
                    <ul className="space-y-1.5">
                      {topic.chapters.map(chapter => (
                         <li key={chapter} className="flex items-center gap-2 text-sm">
                           <PlayCircle className="w-4 h-4 text-primary/70"/> 
                           {chapter}
                           <Button variant="ghost" size="sm" className="ml-auto h-7 text-xs" onClick={() => handleFeatureClick(`Tutorial: ${chapter}`)}>
                            Start
                           </Button>
                         </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button variant="outline" className="w-full mt-6" onClick={() => handleFeatureClick("All Tutorials")}>Explore All Tutorials</Button>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300">
            <CardHeader className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-primary/10 rounded-full"><Puzzle className="w-8 h-8 text-primary" /></div>
                <CardTitle className="text-2xl md:text-3xl">Interactive Exercises</CardTitle>
              </div>
              <CardDescription className="text-base">Put your knowledge to the test with hands-on coding challenges.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              {exerciseTopics.map(exercise => (
                <div key={exercise.title} className="p-4 border border-dashed border-border rounded-lg bg-card/50">
                  <h4 className="font-semibold text-md mb-1">{exercise.title}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Difficulty: {exercise.difficulty}</span>
                    <span>Concepts: {exercise.concepts.join(', ')}</span>
                  </div>
                  <Button className="w-full text-sm" onClick={() => handleFeatureClick(`Exercise: ${exercise.title}`)}>Try Exercise</Button>
                </div>
              ))}
               <p className="text-xs text-muted-foreground text-center pt-2">More exercises are under development!</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300">
            <CardHeader className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-primary/10 rounded-full"><Brain className="w-8 h-8 text-primary" /></div>
                <CardTitle className="text-2xl md:text-3xl">AI CSS Explainer</CardTitle>
              </div>
              <CardDescription className="text-base">Get any CSS snippet explained in plain English by our AI assistant.</CardDescription>
            </CardHeader>
            <CardContent className="text-center p-6 pt-0">
              <Image src="https://placehold.co/300x150.png" alt="AI Explainer Illustration" width={300} height={150} className="rounded-lg mx-auto mb-4 border shadow-sm" data-ai-hint="AI interface abstract" />
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base">
                <Link href="/tools/explain-css">Try the AI Explainer <Zap className="ml-2 h-5 w-5"/></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="text-center mt-12 md:mt-16 p-8 bg-card/80 rounded-3xl shadow-inner">
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-semibold mb-3 text-primary">Your Learning Journey Starts Here!</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-lg">
          We're continuously adding new content, tutorials, and exercises. Stay tuned for exciting updates!
        </p>
      </div>
    </div>
  );
}
