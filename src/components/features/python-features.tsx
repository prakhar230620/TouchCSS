import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Database, BrainCircuit, Server, Activity, FileJson } from "lucide-react";

export function PythonFeatures() {
    const features = [
        {
            icon: Terminal,
            title: "Simplicity & Readability",
            description: "Write clear, logical code for small and large-scale projects. Python's syntax is designed to be readable and intuitive.",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            icon: BrainCircuit,
            title: "AI & Machine Learning",
            description: "The #1 choice for AI. Access powerful libraries like TensorFlow, PyTorch, and Scikit-learn for intelligent applications.",
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            icon: Server,
            title: "Web Development",
            description: "Build robust backends with Django, Flask, and FastAPI. Handle requests, databases, and authentication with ease.",
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        },
        {
            icon: Database,
            title: "Data Science",
            description: "Analyze and visualize data using Pandas, NumPy, and Matplotlib. Turn raw data into actionable insights.",
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            icon: Activity,
            title: "Automation & Scripting",
            description: "Automate repetitive tasks, web scraping, and system administration with powerful scripting capabilities.",
            color: "text-red-500",
            bg: "bg-red-500/10"
        },
        {
            icon: FileJson,
            title: "Versatile Standard Library",
            description: "Batteries included. Python comes with a rich standard library for everything from file I/O to network protocols.",
            color: "text-cyan-500",
            bg: "bg-cyan-500/10"
        }
    ];

    return (
        <section className="space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <Badge variant="outline" className="mb-4">Why Python?</Badge>
                <h2 className="text-3xl font-bold mb-4">A Language for Everything</h2>
                <p className="text-muted-foreground text-lg">
                    From web apps to artificial intelligence, Python powers the modern world.
                    Its versatility and ease of use make it the perfect language to learn.
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
                <h3 className="text-2xl font-bold mb-4">Python in the Real World</h3>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 opacity-70 grayscale hover:grayscale-0 transition-all">
                    {/* Brand placeholders or text logos */}
                    <span className="text-xl font-bold flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Google</span>
                    <span className="text-xl font-bold flex items-center gap-2"><div className="w-3 h-3 bg-red-600 rounded-full"></div> Netflix</span>
                    <span className="text-xl font-bold flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Spotify</span>
                    <span className="text-xl font-bold flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> Instagram</span>
                    <span className="text-xl font-bold flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-full"></div> Dropbox</span>
                </div>
            </div>
        </section>
    );
}
