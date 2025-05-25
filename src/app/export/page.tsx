import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, FileCode, Braces, Share } from "lucide-react";

export default function ExportPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Export Your Creations
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Easily grab your styles and components in various formats to integrate into your projects.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <FileCode className="w-8 h-8 text-accent" />
              <CardTitle>CSS Code Exporter</CardTitle>
            </div>
            <CardDescription>One-tap CSS copy utility, automatically formatted.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">(Coming Soon)</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Braces className="w-8 h-8 text-accent" />
              <CardTitle>CSS to Tailwind Converter</CardTitle>
            </div>
            <CardDescription>Paste CSS, get equivalent Tailwind classes.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">(Coming Soon)</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Download className="w-8 h-8 text-accent" />
              <CardTitle>Download Design Kit</CardTitle>
            </div>
            <CardDescription>Get your styles as .zip (HTML+CSS), Tailwind Config, or JSON.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">(Coming Soon)</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12 p-6 bg-card rounded-2xl shadow-md">
        <Share className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-3">Seamless Exporting on the Horizon!</h2>
        <p className="text-muted-foreground">
          We're building robust export functionalities to make integrating your designs effortless.
        </p>
      </div>
    </div>
  );
}
