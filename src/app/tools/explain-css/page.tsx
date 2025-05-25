import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExplainCssForm } from "./explain-css-form";
import { BrainCircuit } from "lucide-react";

export default function ExplainCssPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="rounded-2xl shadow-xl overflow-hidden">
        <CardHeader className="bg-primary/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <BrainCircuit className="w-10 h-10 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold text-primary">AI CSS Explainer</CardTitle>
              <CardDescription className="text-md text-muted-foreground">
                Paste any CSS code snippet and get a clear, human-readable explanation powered by AI.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ExplainCssForm />
        </CardContent>
      </Card>
    </div>
  );
}
