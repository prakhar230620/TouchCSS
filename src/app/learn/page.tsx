import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenText, Puzzle, Brain } from "lucide-react";

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Learn CSS Interactively
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Master CSS concepts through guided tutorials, hands-on exercises, and AI-powered insights.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BookOpenText className="w-8 h-8 text-accent" />
              <CardTitle>Guided Tutorials</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Step-by-step walkthroughs of core CSS properties and techniques.
              (Coming Soon)
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Puzzle className="w-8 h-8 text-accent" />
              <CardTitle>Interactive Exercises</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Put your knowledge to the test with hands-on coding challenges.
              (Coming Soon)
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-8 h-8 text-accent" />
              <CardTitle>AI CSS Explainer</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get any CSS snippet explained in plain English by our AI assistant.
              <a href="/tools/explain-css" className="text-primary hover:underline block mt-2">Try it now!</a>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mt-12 p-6 bg-card rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-3">More Learning Resources Coming Soon!</h2>
        <p className="text-muted-foreground">
          We're actively developing new modules on Flexbox, Grid, Animations, Responsive Design, and more. Stay tuned!
        </p>
      </div>
    </div>
  );
}
