"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription as ShadcnFormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Wand2, AlertTriangle, Sparkles, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { getAIProvider, getAPIKey, hasAPIKey } from "@/lib/api-key-storage";
import { generateAIResponse, getProviderName } from "@/lib/ai-providers";
import { AISettingsDialog } from "@/components/ai-settings-dialog";

const formSchema = z.object({
  cssCode: z.string().min(5, {
    message: "CSS code must be at least 5 characters.",
  }).max(3000, {
    message: "CSS code must not exceed 3000 characters.",
  }),
});

type ExplainCssFormValues = z.infer<typeof formSchema>;

export function ExplainCssForm() {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [usedProvider, setUsedProvider] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<ExplainCssFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cssCode: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: ExplainCssFormValues) {
    // Check if API key is configured
    const provider = getAIProvider();
    const apiKey = getAPIKey(provider);

    if (!apiKey || !hasAPIKey()) {
      setError(`No API key configured for ${getProviderName(provider)}. Please configure your API key in settings.`);
      toast({
        title: "API Key Required",
        description: `Please configure your ${getProviderName(provider)} API key in settings to use the AI explainer.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setExplanation(null);
    setUsedProvider(null);

    try {
      const prompt = `You are an expert CSS programming tutor. Your goal is to explain the provided CSS code snippet in plain, easy-to-understand English.
Be concise but thorough. Address the following for each rule or significant part of the CSS:
1. What element(s) does the selector target?
2. What does each CSS property do to those elements?
3. Explain any complex values or units simply.
4. If there are multiple rules, explain them sequentially.

Keep the tone friendly and educational, as if explaining to someone learning CSS.

CSS code to explain:
\`\`\`css
${values.cssCode}
\`\`\`

Provide your explanation below:`;

      const result = await generateAIResponse(provider, apiKey, prompt, {
        temperature: 0.7,
        maxTokens: 2048,
      });

      setExplanation(result.text);
      setUsedProvider(getProviderName(result.provider));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const provider = getAIProvider();
  const isConfigured = hasAPIKey();

  return (
    <div className="space-y-8">
      {/* API Key Status Banner */}
      {mounted && !isConfigured && (
        <Alert variant="destructive">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-semibold">API Key Not Configured</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-3">You need to configure an API key to use the AI CSS Explainer.</p>
            <AISettingsDialog
              trigger={
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Configure API Key
                </Button>
              }
            />
          </AlertDescription>
        </Alert>
      )}

      {/* Current Provider Badge */}
      {isConfigured && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Using AI Provider:</span>
            <Badge variant="outline" className="font-semibold">
              {getProviderName(provider)}
            </Badge>
          </div>
          <AISettingsDialog
            trigger={
              <Button variant="ghost" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Change Settings
              </Button>
            }
          />
        </div>
      )}

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
            disabled={isLoading || !form.formState.isValid || !isConfigured}
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
                Explain CSS with AI
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
          <CardFooter className="p-4 bg-secondary/30 rounded-b-2xl flex items-center justify-between">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-accent" />
              Generated by TouchCSS Studio AI
            </p>
            {usedProvider && (
              <Badge variant="outline" className="text-xs">
                {usedProvider}
              </Badge>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
