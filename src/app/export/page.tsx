
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileCode, Braces, Share, FileArchive, FileJson, ClipboardCopy, Zap, Palette as PaletteIcon, RefreshCw, Loader2, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription as ShadcnFormDescription } from "@/components/ui/form";
import type { ConvertCssToTailwindInput, ConvertCssToTailwindOutput } from "@/ai/flows/convert-css-to-tailwind-flow";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const exampleCss = `.my-element {
  background-color: var(--primary);
  color: var(--primary-foreground);
  padding: 1rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.my-element:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.1);
}`;

const cssToTailwindFormSchema = z.object({
  cssCode: z.string().min(10, {
    message: "CSS code must be at least 10 characters.",
  }).max(2000, {
    message: "CSS code must not exceed 2000 characters.",
  }),
});
type CssToTailwindFormValues = z.infer<typeof cssToTailwindFormSchema>;


export default function ExportPage() {
  const { toast } = useToast();
  const [tailwindOutput, setTailwindOutput] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState<string | null>(null);

  const form = useForm<CssToTailwindFormValues>({
    resolver: zodResolver(cssToTailwindFormSchema),
    defaultValues: {
      cssCode: "",
    },
    mode: "onChange",
  });

  const handleCopyCss = () => {
    navigator.clipboard.writeText(exampleCss)
      .then(() => {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              CSS Copied!
            </div>
          ),
          description: "Example CSS copied to clipboard.",
        });
      })
      .catch(err => {
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Copy Failed
            </div>
          ),
          description: "Could not copy CSS to clipboard.",
        });
      });
  };

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Feature Coming Soon!",
      description: `${featureName} is under development. Please check back later.`,
    });
  };

  async function onCssToTailwindSubmit(values: CssToTailwindFormValues) {
    setIsConverting(true);
    setConversionError(null);
    setTailwindOutput(null);

    try {
      const input: ConvertCssToTailwindInput = { cssToConvert: values.cssCode };
      const response = await fetch('/api/flows/convertCssToTailwindFlow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json() as ConvertCssToTailwindOutput;
      setTailwindOutput(result.tailwindClasses);
      toast({
        title: (
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Conversion Successful!
          </div>
        ),
        description: "CSS converted to Tailwind classes.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setConversionError(errorMessage);
      toast({
        variant: "destructive",
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Conversion Error
          </div>
        ),
        description: errorMessage,
      });
    } finally {
      setIsConverting(false);
    }
  }


  return (
    <div className="space-y-12 md:space-y-16">
      <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary md:text-6xl">
          Export Your Creations
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Easily grab your styles and components in various formats to integrate seamlessly into your projects.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300 transform hover:-translate-y-1">
          <CardHeader className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><FileCode className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">CSS Code Exporter</CardTitle>
            </div>
            <CardDescription className="text-base">One-tap CSS copy utility, formatted and ready for use.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-3">
            <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto max-h-48 shadow-inner border">
              <code className="text-muted-foreground whitespace-pre-wrap font-mono">
                {exampleCss}
              </code>
            </pre>
            <Button className="w-full text-sm" onClick={handleCopyCss}>
              <ClipboardCopy className="mr-2 h-4 w-4" /> Copy Example CSS
            </Button>
          </CardContent>
           <CardFooter className="p-4 bg-secondary/20 rounded-b-2xl">
            <p className="text-xs text-muted-foreground">Export generated styles from the build tools here.</p>
          </CardFooter>
        </Card>

        {/* CSS to Tailwind Converter Card */}
        <Card className="lg:col-span-2 rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300 transform hover:-translate-y-1">
          <CardHeader className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-accent/10 rounded-full"><Braces className="w-8 h-8 text-accent" /></div>
              <CardTitle className="text-2xl">AI CSS to Tailwind Converter</CardTitle>
            </div>
            <CardDescription className="text-base">Paste standard CSS, get equivalent Tailwind utility classes. Powered by AI.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onCssToTailwindSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cssCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cssCode" className="text-md font-semibold">Enter CSS Code</FormLabel>
                      <FormControl>
                        <Textarea
                          id="cssCode"
                          placeholder="e.g., .my-button { color: blue; padding: 10px; }"
                          className="min-h-[120px] rounded-lg shadow-inner bg-background/80 font-mono text-sm"
                          {...field}
                        />
                      </FormControl>
                      <ShadcnFormDescription className="text-xs">
                        Paste your CSS snippet here. Max 2000 characters.
                      </ShadcnFormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isConverting || !form.formState.isValid} 
                  className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground text-sm"
                >
                  {isConverting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Converting...</>
                  ) : (
                    <><RefreshCw className="mr-2 h-4 w-4" />Convert to Tailwind</>
                  )}
                </Button>
              </form>
            </Form>

            {conversionError && (
              <Alert variant="destructive" className="mt-4 rounded-lg">
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle>Conversion Failed</AlertTitle>
                <AlertDescription>{conversionError}</AlertDescription>
              </Alert>
            )}

            {tailwindOutput && !isConverting && (
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-2 text-foreground">Tailwind Output:</h3>
                <Textarea
                  value={tailwindOutput}
                  readOnly
                  className="min-h-[120px] rounded-lg bg-muted/50 font-mono text-sm shadow-inner border"
                  placeholder="Tailwind classes will appear here..."
                />
                <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={() => {
                    navigator.clipboard.writeText(tailwindOutput);
                    toast({ title: "Copied Tailwind classes!"});
                }}>
                  <ClipboardCopy className="mr-1.5 h-3 w-3"/> Copy Tailwind
                </Button>
              </div>
            )}
          </CardContent>
        </Card>


        <Card className="rounded-2xl shadow-xl hover:shadow-primary/15 transition-shadow duration-300 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><Download className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">Download Design Kit</CardTitle>
            </div>
            <CardDescription className="text-base">Get your styles as a .zip (HTML+CSS), Tailwind Config, or JSON theme file.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-3">
            <ul className="space-y-2.5 text-sm">
                <li className="flex items-center justify-between gap-2 p-3 bg-secondary/40 hover:bg-secondary/60 rounded-lg transition-colors cursor-pointer" onClick={() => handleFeatureClick("Download HTML+CSS (.zip)")}>
                  <div className="flex items-center gap-2.5">
                    <FileArchive className="w-5 h-5 text-primary/90" /> HTML + CSS (.zip)
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground"/>
                </li>
                <li className="flex items-center justify-between gap-2 p-3 bg-secondary/40 hover:bg-secondary/60 rounded-lg transition-colors cursor-pointer" onClick={() => handleFeatureClick("Download Tailwind Config")}>
                   <div className="flex items-center gap-2.5">
                    <FileJson className="w-5 h-5 text-primary/90" /> Tailwind Config File
                   </div>
                   <Download className="w-4 h-4 text-muted-foreground"/>
                </li>
                <li className="flex items-center justify-between gap-2 p-3 bg-secondary/40 hover:bg-secondary/60 rounded-lg transition-colors cursor-pointer" onClick={() => handleFeatureClick("Download Theme Variables")}>
                   <div className="flex items-center gap-2.5">
                    <PaletteIcon className="w-5 h-5 text-primary/90" /> Theme Variables (JSON/CSS)
                   </div>
                   <Download className="w-4 h-4 text-muted-foreground"/>
                </li>
            </ul>
            <Button className="w-full mt-4 text-sm" onClick={() => handleFeatureClick("Download Full Kit")} disabled>
              <Download className="mr-2 h-4 w-4" /> Download Full Kit (Soon)
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12 md:mt-16 p-8 bg-card/80 rounded-3xl shadow-inner">
        <Share className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-semibold mb-3 text-primary">Seamless Exporting is Key!</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-lg">
          We're building robust export functionalities to make integrating your designs into any project effortless and efficient.
        </p>
      </div>
    </div>
  );
}
