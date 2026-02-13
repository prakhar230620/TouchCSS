import { CSSFeatures } from "@/components/features/css-features";
import { JSFeatures } from "@/components/features/js-features";
import { HTMLFeatures } from "@/components/features/html-features";
import { PythonFeatures } from "@/components/features/python-features";
import { CFeatures } from "@/components/features/c-features";
import { CPPFeatures } from "@/components/features/cpp-features";
import { ToyBrick, Sparkles, FileCode, Code2, Wrench, Cpu } from "lucide-react";

export async function generateStaticParams() {
    return [
        { language: 'css' },
        { language: 'javascript' },
        { language: 'html' },
        { language: 'python' },
        { language: 'c' },
        { language: 'cpp' }
    ];
}

export default async function FeaturesPage({ params }: { params: Promise<{ language: string }> }) {
    const { language } = await params;

    const isJS = language.toLowerCase() === 'javascript';
    const isHTML = language.toLowerCase() === 'html';
    const isPython = language.toLowerCase() === 'python';
    const isC = language.toLowerCase() === 'c';


    const isCPP = language.toLowerCase() === 'cpp';

    return (
        <div className="space-y-12 md:space-y-16">
            <header className="text-center">
                <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4 shadow-md">
                    {isJS ? <Sparkles className="w-12 h-12" /> : isHTML ? <FileCode className="w-12 h-12" /> : isPython ? <Code2 className="w-12 h-12" /> : isC ? <Wrench className="w-12 h-12" /> : isCPP ? <Cpu className="w-12 h-12" /> : <ToyBrick className="w-12 h-12" />}
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary md:text-6xl capitalize">
                    {isJS ? 'JavaScript' : isCPP ? 'C++' : language.toUpperCase()} Features
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                    {isJS
                        ? "Explore powerful modern JavaScript concepts like ES6+, Async/Await, and DOM manipulation."
                        : isHTML
                            ? "Master the building blocks of the web with Semantic HTML, Forms, and APIs."
                            : isPython
                                ? "Dive into the world of AI, Data Science, and Automation with Python."
                                : isC
                                    ? "Master memory management, pointers, and high-performance system programming."
                                    : isCPP
                                        ? "Build high-performance applications with OOP, STL, and modern C++ features."
                                        : "Explore various CSS techniques for interactivity, motion, and advanced styling."}
                </p>
            </header>

            {isJS ? <JSFeatures /> : isHTML ? <HTMLFeatures /> : isPython ? <PythonFeatures /> : isC ? <CFeatures /> : isCPP ? <CPPFeatures /> : <CSSFeatures />}
        </div>
    );
}
