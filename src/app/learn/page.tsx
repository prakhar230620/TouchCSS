import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpenText, Puzzle, Brain, CheckCircle, ListChecks, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const tutorialTopics = [
  { title: "Understanding Flexbox Layouts", icon: ListChecks, status: "Coming Soon" },
  { title: "Mastering CSS Grid Systems", icon: ListChecks, status: "Coming Soon" },
  { title: "CSS Animations & Transitions 101", icon: ListChecks, status: "Coming Soon" },
  { title: "Responsive Design Principles", icon: ListChecks, status: "Coming Soon" },
  { title: "Advanced Selectors & Specificity", icon: ListChecks, status: "Coming Soon" },
];

export default function LearnPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">
          Learn CSS Interactively
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Master CSS concepts through guided tutorials, hands-on exercises, AI-powered insights, and practical examples.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><BookOpenText className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">Guided Tutorials</CardTitle>
            </div>
            <CardDescription>Step-by-step walkthroughs of core CSS properties and modern techniques.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tutorialTopics.map(topic => (
              <div key={topic.title} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <topic.icon className="w-5 h-5 text-primary/80" />
                  <span className="text-sm">{topic.title}</span>
                </div>
                <span className="text-xs text-muted-foreground px-2 py-1 bg-background rounded-md">{topic.status}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4" disabled>Explore All Tutorials</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><Puzzle className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">Interactive Exercises</CardTitle>
            </div>
            <CardDescription>Put your knowledge to the test with hands-on coding challenges and get instant feedback.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-dashed border-border rounded-lg text-center">
              <Image src="https://placehold.co/300x150.png?text=Exercise+Preview" alt="Interactive Exercise Placeholder" width={300} height={150} className="rounded-md mx-auto mb-3" data-ai-hint="coding exercise" />
              <p className="text-sm text-muted-foreground mb-2">Example: "Style this button to match the design."</p>
              <Button className="w-full" disabled>Try a Sample Exercise</Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">More exercises on various topics are under development!</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><Brain className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">AI CSS Explainer</CardTitle>
            </div>
            <CardDescription>Get any CSS snippet explained in plain English by our intelligent assistant. Understand complex code instantly.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Image src="https://placehold.co/300x150.png?text=AI+Explainer+UI" alt="AI Explainer Placeholder" width={300} height={150} className="rounded-md mx-auto mb-3" data-ai-hint="AI interface" />
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/tools/explain-css">Try the AI Explainer <Zap className="ml-2 h-4 w-4"/></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mt-16 p-8 bg-card/80 rounded-3xl shadow-inner">
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-semibold mb-3 text-primary">Your Learning Journey Starts Here!</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          We're continuously adding new content, tutorials, and exercises. Stay tuned for exciting updates to supercharge your CSS skills!
        </p>
      </div>
    </div>
  );
}
