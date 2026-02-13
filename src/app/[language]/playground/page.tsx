"use client";

import { CodePlayground } from "@/components/code-playground";
import { useLanguage } from "@/contexts/language-context";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PlaygroundPage() {
    const { languageConfig } = useLanguage();

    const initialCode = languageConfig.id === "javascript"
        ? "// Try writing some JavaScript!\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));\n"
        : languageConfig.id === "css"
            ? "/* CSS Playground Coming Soon */\nbody { background: #f0f0f0; }"
            : languageConfig.id === "python"
                ? "# Try writing some Python!\n\ndef greet(name):\n    return f'Hello, {name}!'\n\nprint(greet('World'))\n"
                : languageConfig.id === "c"
                    ? "#include <stdio.h>\n\nint main() {\n    printf(\"Hello from C!\\n\");\n    return 0;\n}"
                    : languageConfig.id === "cpp"
                        ? "#include <iostream>\n\nint main() {\n    std::cout << \"Hello from C++!\" << std::endl;\n    return 0;\n}"
                        : "<!-- Write your HTML here -->\n<h1>Hello, HTML!</h1>\n<p>This is a live preview.</p>\n<button onclick=\"alert('Clicked!')\">Click Me</button>";

    /* Language check removed to allow HTML/CSS/JS/Python/C/CPP */
    if (['java', 'r', 'sql', 'typescript'].includes(languageConfig.id)) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Playground</h1>
                <p>The playground for {languageConfig.displayName} is coming soon.</p>
                <div className="mt-8">
                    <Button asChild>
                        <Link href="/javascript/playground">Go to JS Playground</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/${languageConfig.id}/learn`}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learn
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold">{languageConfig.displayName} Playground</h1>
            </div>

            <p className="text-muted-foreground">
                Write code, see output, and get AI help instantly.
            </p>

            <div className="mt-4">
                <CodePlayground initialCode={initialCode} />
            </div>
        </div>
    );
}
