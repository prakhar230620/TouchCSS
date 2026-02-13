
import { getExperiment, experiments } from "@/lib/experiments-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Code, HelpCircle } from "lucide-react";
import { CodePlayground } from "@/components/code-playground";

export async function generateStaticParams() {
    return experiments.map((exp) => ({
        id: exp.id,
    }));
}

export default async function ExperimentPage({ params }: { params: Promise<{ language: string, id: string }> }) {
    const { language, id } = await params;
    const experiment = getExperiment(id);

    if (!experiment) {
        notFound();
    }

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            {/* Header */}
            <div className="border-b bg-background p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/${language}/experiments`}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            {experiment.title}
                            <Badge variant="outline">{experiment.difficulty}</Badge>
                        </h1>
                        <p className="text-sm text-muted-foreground">{experiment.description}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <HelpCircle className="mr-2 h-4 w-4" /> Hint
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="mr-2 h-4 w-4" /> Submit
                    </Button>
                </div>
            </div>

            {/* Split View */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 bg-muted/20">
                {/* Instructions Panel */}
                <div className="md:col-span-1 border-r bg-background p-6 overflow-y-auto">
                    <div className="prose dark:prose-invert text-sm">
                        <h3>Instructions</h3>
                        <p>Build the <strong>{experiment.title}</strong> by following these steps:</p>

                        <div className="bg-muted p-4 rounded-md my-4 border">
                            <h4 className="mt-0 text-sm font-semibold uppercase text-muted-foreground">Core Concepts</h4>
                            <p className="mb-0">{experiment.concept}</p>
                        </div>

                        <h4>Challenges:</h4>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Check the starter code comments</li>
                            <li>Use your knowledge of {experiment.category}</li>
                            <li>Try to complete it within {experiment.time}</li>
                        </ul>

                        <div className="mt-8">
                            <h4 className="text-muted-foreground">Need help?</h4>
                            <p className="text-xs">Use the AI Assistant tab in the editor if you get stuck!</p>
                        </div>
                    </div>
                </div>

                {/* Editor Panel */}
                <div className="md:col-span-3 h-full p-0">
                    <div className="h-full">
                        <CodePlayground
                            initialCode={experiment.starterCode}
                            html={experiment.html}
                            hint={experiment.hint}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
