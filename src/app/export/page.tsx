import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileCode, Braces, Share, FileArchive, FileJson, ClipboardCopy, Zap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function ExportPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">
          Export Your Creations
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Easily grab your styles and components in various formats to integrate seamlessly into your projects.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><FileCode className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">CSS Code Exporter</CardTitle>
            </div>
            <CardDescription>One-tap CSS copy utility, automatically formatted and optimized for production use.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto max-h-40">
              <code className="text-muted-foreground">
{`.my-element {
  background-color: var(--primary);
  color: var(--primary-foreground);
  padding: 1rem;
  border-radius: var(--radius);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`}
              </code>
            </pre>
            <Button className="w-full" disabled><ClipboardCopy className="mr-2 h-4 w-4" /> Copy CSS (Soon)</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><Braces className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">CSS to Tailwind Converter</CardTitle>
            </div>
            <CardDescription>Paste standard CSS, get equivalent Tailwind utility classes. Streamline your Tailwind adoption.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea placeholder="Paste your CSS here..." className="h-24 bg-background/70" readOnly />
            <div className="text-center text-muted-foreground">&darr; Converts To &darr;</div>
            <Textarea placeholder="bg-primary text-primary-foreground p-4 rounded-lg shadow-md..." className="h-24 bg-background/70" readOnly />
            <Button variant="secondary" className="w-full" disabled>Convert CSS (Soon)</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-full"><Download className="w-8 h-8 text-primary" /></div>
              <CardTitle className="text-2xl">Download Design Kit</CardTitle>
            </div>
            <CardDescription>Get your styles as a .zip (HTML+CSS), Tailwind Config, or JSON theme file for easy integration.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 p-2 bg-secondary/30 rounded-md"><FileArchive className="w-5 h-5 text-primary/80" /> HTML + CSS (.zip)</li>
                <li className="flex items-center gap-2 p-2 bg-secondary/30 rounded-md"><FileJson className="w-5 h-5 text-primary/80" /> Tailwind Config File</li>
                <li className="flex items-center gap-2 p-2 bg-secondary/30 rounded-md"><Palette className="w-5 h-5 text-primary/80" /> Theme Variables (JSON/CSS)</li>
            </ul>
            <Button className="w-full mt-2" disabled><Download className="mr-2 h-4 w-4" /> Download Kit (Soon)</Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-16 p-8 bg-accent/10 rounded-3xl shadow-inner">
        <Share className="w-12 h-12 text-accent mx-auto mb-4" />
        <h2 className="text-3xl font-semibold mb-3 text-accent">Seamless Exporting is Coming!</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          We're building robust export functionalities to make integrating your designs into any project effortless and efficient.
        </p>
      </div>
    </div>
  );
}
