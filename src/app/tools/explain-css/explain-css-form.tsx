"use client";

import type { ExplainCssInput, ExplainCssOutput } from "@/ai/flows/explain-css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Wand2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  cssCode: z.string().min(10, {
    message: "CSS code must be at least 10 characters.",
  }).max(2000, {
    message: "CSS code must not exceed 2000 characters.",
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
  });

  async function onSubmit(values: ExplainCssFormValues) {
    setIsLoading(true);
    setError(null);
    setExplanation(null);

    try {
      const input: ExplainCssInput = { cssCode: values.cssCode };
      // The Genkit Next.js plugin exposes flows at /api/flows/[flowName]
      const response = await fetch('/api/flows/explainCssFlow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json() as ExplainCssOutput;
      setExplanation(result.explanation);
      toast({
        title: "Explanation Generated!",
        description: "The AI has explained the CSS code.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error Generating Explanation",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="cssCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cssCode" className="text-lg font-semibold">Enter CSS Code</FormLabel>
                <FormControl>
                  <Textarea
                    id="cssCode"
                    placeholder="e.g., .my-class {\n  display: flex;\n  align-items: center;\n}"
                    className="min-h-[150px] rounded-lg shadow-inner bg-background/50 focus:ring-primary focus:border-primary"
                    {...field}
                    aria-describedby="cssCode-description"
                  />
                </FormControl>
                <p id="cssCode-description" className="text-sm text-muted-foreground">
                  Paste the CSS snippet you want to understand.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto rounded-lg text-base py-3 px-6">
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
        <Alert variant="destructive" className="rounded-lg">
          <AlertTitle className="font-semibold">Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {explanation && (
        <Card className="mt-8 rounded-2xl shadow-lg bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary">AI Explanation</CardTitle>
            <CardDescription>Here's what the AI thinks about your CSS:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm sm:prose max-w-none text-foreground leading-relaxed whitespace-pre-wrap p-4 bg-background rounded-lg shadow-inner">
              {explanation}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">Generated by TouchCSS Studio AI.</p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
