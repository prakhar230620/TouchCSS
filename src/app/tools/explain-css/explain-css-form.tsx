
"use client";

import type { ExplainCssInput, ExplainCssOutput } from "@/ai/flows/explain-css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription as ShadcnFormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Wand2, AlertTriangle, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  cssCode: z.string().min(10, {
    message: "CSS code must be at least 10 characters.",
  }).max(3000, {
    message: "CSS code must not exceed 3000 characters.",
  }),
});

type ExplainCssFormValues = z.infer<typeof formSchema>;

export function ExplainCssForm() {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ExplainCssFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cssCode: "",
    },
    mode: "onChange", 
  });

  async function onSubmit(values: ExplainCssFormValues) {
    setIsLoading(true);
    setError(null);
    setExplanation(null);

    try {
      const input: ExplainCssInput = { cssCode: values.cssCode };
      const response = await fetch('/api/flows/explainCssFlow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        let errorDetail = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetail = errorData.message || errorData.error || errorDetail;
        } catch (e) {
          // If response is not JSON, use the status text or the generic message
          errorDetail = response.statusText || errorDetail;
          console.error("AI CSS Explainer: Failed to parse error response as JSON. Status:", response.status, "Response Text:", await response.text().catch(() => "Could not read response text."));
        }
        // For common server errors, provide a hint about API key or server issues.
        if (response.status === 500 || response.status === 401 || response.status === 403) {
            console.error(`AI CSS Explainer: Server error ${response.status}. This might be due to an issue with the Genkit flow execution, the AI model, or API key configuration.`);
        }
        throw new Error(errorDetail);
      }

      const result = await response.json() as ExplainCssOutput;
      setExplanation(result.explanation);
      toast({
        title: (
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Explanation Generated!
          </div>
        ),
        description: "The AI has successfully explained the CSS code.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Error Generating Explanation
          </div>
        ),
        description: "Could not get explanation. " + errorMessage + (errorMessage.includes("HTTP error") ? " Please ensure the server is running and accessible." : " Check console for details."),
      });
      console.error("AI CSS Explainer Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="cssCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cssCode" className="text-lg font-semibold text-foreground">Enter CSS Code</FormLabel>
                <FormControl>
                  <Textarea
                    id="cssCode"
                    placeholder="e.g., .my-class {\n  display: flex;\n  align-items: center;\n  background: #007bff;\n}"
                    className="min-h-[180px] rounded-lg shadow-inner bg-background/80 focus:ring-primary focus:border-primary text-sm leading-relaxed font-mono"
                    {...field}
                    aria-describedby="cssCode-description cssCode-message"
                  />
                </FormControl>
                <ShadcnFormDescription id="cssCode-description" className="text-sm text-muted-foreground">
                  Paste the CSS snippet you want the AI to explain. Max 3000 characters.
                </ShadcnFormDescription>
                <FormMessage id="cssCode-message" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !form.formState.isValid} 
            className="w-full sm:w-auto rounded-lg text-base py-3 px-6 sm:px-8 shadow-md hover:shadow-primary/30 transition-shadow duration-300 bg-primary hover:bg-primary/90"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Explaining...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                Explain CSS
              </>
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive" className="rounded-lg border-destructive/70 bg-destructive/10 mt-6">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <AlertTitle className="font-semibold text-destructive">Error Occurred</AlertTitle>
          <AlertDescription className="text-destructive/90">{error}</AlertDescription>
        </Alert>
      )}

      {explanation && !isLoading && (
        <Card className="mt-8 rounded-2xl shadow-lg bg-card border-primary/20">
          <CardHeader className="bg-primary/5 p-6 rounded-t-2xl">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-primary flex items-center gap-2">
              <Wand2 className="h-5 w-5 sm:h-6 sm:w-6" />
              AI Explanation
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm sm:text-base">Here's what our AI assistant understands about your CSS:</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-sm sm:prose-base max-w-none text-foreground leading-relaxed whitespace-pre-wrap p-4 bg-background/70 rounded-lg shadow-inner border border-border">
              {explanation}
            </div>
          </CardContent>
          <CardFooter className="p-4 bg-secondary/30 rounded-b-2xl">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent" />
              Generated by TouchCSS Studio AI.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
