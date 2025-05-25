
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExplainCssForm } from "./explain-css-form";
import { BrainCircuit, Sparkles } from "lucide-react";

export default function ExplainCssPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="rounded-2xl shadow-xl overflow-hidden border-primary/20 bg-card">
        <CardHeader className="bg-primary/10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="p-3 bg-primary/20 rounded-full">
              <BrainCircuit className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl sm:text-4xl font-bold text-primary">AI CSS Explainer</CardTitle>
              <CardDescription className="text-md sm:text-lg text-muted-foreground mt-1">
                Paste any CSS code snippet and get a clear, human-readable explanation powered by our AI.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <ExplainCssForm />
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground mt-8 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-accent" />
        Powered by TouchCSS Studio AI
      </p>
    </div>
  );
}
