
import {
    Cpu,
    Layers,
    Box,
    Database,
    MonitorSmartphone,
    Gamepad2,
    Check
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function CPPFeatures() {
    const features = [
        {
            icon: Cpu,
            title: "High Performance",
            description: "C++ is known for its speed and efficiency, making it ideal for resource-constrained applications."
        },
        {
            icon: Layers,
            title: "Object-Oriented",
            description: "Supports classes, inheritance, polymorphism, encapsulation, and abstraction."
        },
        {
            icon: Database,
            title: "Standard Template Library (STL)",
            description: "A powerful set of C++ template classes to provide general-purpose classes and functions."
        },
        {
            icon: Box,
            title: "Memory Management",
            description: "Gives you complete control over memory allocation and deallocation."
        },
        {
            icon: MonitorSmartphone,
            title: "System Programming",
            description: "Used for developing operating systems, drivers, kernels, and embedded systems."
        },
        {
            icon: Gamepad2,
            title: "Game Development",
            description: " The primary language for game engines like Unreal Engine due to its performance."
        }
    ];

    return (
        <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Why Learn C++?</h2>
                <p className="text-muted-foreground text-lg">
                    C++ powers the world's most critical systems, from game engines and operating systems
                    to high-frequency trading platforms and browsers.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                    <Card key={feature.title} className="bg-card hover:shadow-md transition-all">
                        <CardHeader>
                            <feature.icon className="h-10 w-10 text-blue-600 mb-2" />
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                {feature.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-16 bg-muted/30 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center">What You'll Master</h3>
                <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
                    {[
                        "Pointers and Memory Management",
                        "Object-Oriented Programming (OOP)",
                        "Generic Programming with Templates",
                        "File Handling and Streams",
                        "Data Structures and Algorithms",
                        "Modern C++ (C++11/14/17/20) Features"
                    ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
