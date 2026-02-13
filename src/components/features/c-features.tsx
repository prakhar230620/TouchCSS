import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Terminal, Layers, Box, Wrench, Code2 } from "lucide-react";

export function CFeatures() {
    const features = [
        {
            icon: Cpu,
            title: "Low-Level Access",
            description: "Interact directly with memory and hardware. Understand how computers actually work under the hood.",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            icon: Terminal,
            title: "Performance",
            description: "Blazing fast execution. C is the language of choice for operating systems, game engines, and embedded systems.",
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            icon: Layers,
            title: "Portability",
            description: "Write once, compile anywhere. C code runs on everything from supercomputers to washing machines.",
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        },
        {
            icon: Box,
            title: "Memory Management",
            description: "Take full control of memory allocation. Learn about pointers, stacks, and heaps manually.",
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            icon: Wrench,
            title: "Embedded Systems",
            description: "The standard for IoT and microcontrollers. If it has a chip, it probably runs C.",
            color: "text-red-500",
            bg: "bg-red-500/10"
        },
        {
            icon: Code2,
            title: "Standard Library",
            description: "A compact but powerful set of tools for I/O, string manipulation, and math operations.",
            color: "text-cyan-500",
            bg: "bg-cyan-500/10"
        }
    ];

    return (
        <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <Badge variant="outline" className="mb-4">Why learn C?</Badge>
                <h2 className="text-3xl font-bold mb-4">The Mother of All Languages</h2>
                <p className="text-muted-foreground text-lg">
                    Build a rock-solid foundation in computer science.
                    Mastering C makes learning every other language easier.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                        <CardHeader>
                            <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                {feature.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-16 bg-muted/30 rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl font-bold mb-4">Powering the World</h3>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 opacity-70 grayscale hover:grayscale-0 transition-all">
                    <span className="text-xl font-bold flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Windows</span>
                    <span className="text-xl font-bold flex items-center gap-2"><div className="w-3 h-3 bg-gray-800 rounded-full"></div> Linux</span>
                    <span className="text-xl font-bold flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Android</span>
                    <span className="text-xl font-bold flex items-center gap-2"><div className="w-3 h-3 bg-gray-500 rounded-full"></div> macOS</span>
                    <span className="text-xl font-bold flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> Arduino</span>
                </div>
            </div>
        </section>
    );
}
