
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronLeft, Eye, EyeOff, Sparkles, Lightbulb, Copy, CheckCircle, Target as TargetIcon, Info, Loader2, Code2Icon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Types
interface Exercise {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  concepts: string[];
  learningGoals: string[];
  initialHtml: string;
  targetOutput: {
    desktopImage: string;
    desktopHint: string;
    mobileImage?: string;
    mobileHint?: string;
  };
  solutionCss: string;
  hints?: string[];
  icon: React.ElementType; // Added for consistency with learn page
}

interface ExerciseData {
  [key: string]: Exercise;
}

// Data for exercises
const exerciseData: ExerciseData = {
  "style-nav": {
    id: "style-nav",
    title: "Style a Navigation Bar",
    icon: Code2Icon, // Placeholder, ideally import specific icon
    difficulty: "Easy",
    description: "Build a responsive navigation bar using Flexbox, a common component in web design.",
    concepts: ["Flexbox", "Basic Styling", "Responsive"],
    learningGoals: [
      "Use flex properties to align items in a row.",
      "Space items evenly in a navigation bar.",
      "Apply basic styling for links and hover effects.",
      "Make the navigation bar collapse on smaller screens (conceptual)."
    ],
    initialHtml: `
<nav class="navbar">
  <div class="logo">MyLogo</div>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
    targetOutput: {
      desktopImage: "https://placehold.co/600x100.png",
      desktopHint: "Desktop navigation bar styled",
      mobileImage: "https://placehold.co/300x200.png",
      mobileHint: "Mobile navigation bar stacked or with hamburger"
    },
    solutionCss: `
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar .logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.navbar ul li a {
  text-decoration: none;
  color: var(--foreground);
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.navbar ul li a:hover {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

/* Basic concept for mobile */
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }
  .navbar ul {
    flex-direction: column;
    width: 100%;
    margin-top: 0.5rem;
  }
  .navbar ul li {
    width: 100%;
  }
  .navbar ul li a {
    display: block;
    text-align: center;
  }
}`,
    hints: [
      "Use `display: flex` on the main `nav` element.",
      "`justify-content: space-between` can help push the logo and links apart.",
      "Style the `ul` as a flex container too for the links.",
      "Don't forget basic styling for links (padding, text-decoration, hover states).",
    ],
  },
  "product-card": {
    id: "product-card",
    title: "Create a Product Card",
    icon: Code2Icon, // Placeholder
    difficulty: "Medium",
    description: "Design and implement a visually appealing product card, a staple in e-commerce UIs.",
    concepts: ["Box Model", "Typography", "Flexbox/Grid", "Images"],
    learningGoals: [
      "Structure card content effectively with HTML.",
      "Apply padding, margins, and borders for visual appeal.",
      "Style text elements for readability and hierarchy.",
      "Arrange elements within the card using Flexbox or Grid.",
      "Implement hover effects for interactivity."
    ],
    initialHtml: `
<div class="product-card">
  <img src="https://placehold.co/300x200.png" alt="Product Image" data-ai-hint="modern product photo">
  <h3>Awesome Gadget</h3>
  <p class="price">$99.99</p>
  <p class="description">This is a fantastic gadget that will solve all your problems. Highly recommended!</p>
  <button>Add to Cart</button>
</div>`,
    targetOutput: {
      desktopImage: "https://placehold.co/350x450.png",
      desktopHint: "Styled product card with image, title, price, description and button",
    },
    solutionCss: `
.product-card {
  width: 300px;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 1.5rem;
  background-color: hsl(var(--card));
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  transform: translateY(-5px);
}

.product-card img {
  width: 100%;
  height: auto; /* Maintain aspect ratio */
  max-height: 200px; /* Optional: constrain image height */
  object-fit: cover; /* Ensures image covers the area well */
  border-radius: calc(var(--radius) - 4px);
  border: 1px solid hsl(var(--border));
}

.product-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: hsl(var(--foreground));
  margin: 0;
}

.product-card .price {
  font-size: 1.25rem;
  font-weight: bold;
  color: hsl(var(--primary));
  margin: 0;
}

.product-card .description {
  font-size: 0.9rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.5;
  flex-grow: 1; /* Allows description to take up space if card has fixed height */
  margin: 0;
}

.product-card button {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: none;
  padding: 0.75rem 1rem;
  border-radius: calc(var(--radius) - 2px);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.product-card button:hover {
  background-color: hsl(var(--primary) / 0.9);
}`,
    hints: [
      "Set a `width` and `border` for the card.",
      "Use `padding` to create space inside the card.",
      "Consider `display: flex` and `flex-direction: column` for the card itself.",
      "Make sure the image scales correctly using `width: 100%; height: auto;`.",
      "Style the button with distinct colors and a hover effect.",
    ],
  },
  "modal-dialog": {
    id: "modal-dialog",
    title: "Implement a Modal Dialog",
    icon: Code2Icon, // Placeholder
    difficulty: "Hard",
    description: "Develop a modal dialog box that appears over the main content, often used for alerts or forms.",
    concepts: ["Positioning", "Transitions", "z-index", "Accessibility (ARIA basics)"],
    learningGoals: [
      "Use `position: fixed` or `position: absolute` to overlay content.",
      "Center the modal on the screen.",
      "Create smooth show/hide transitions (conceptual, JS often handles state).",
      "Manage stacking order with `z-index`.",
      "Understand basic accessibility considerations like `role=\"dialog\"`."
    ],
    initialHtml: `
<div class="modal-overlay">
  <div class="modal-content" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
    <h2 id="modalTitle">Modal Title</h2>
    <p id="modalDescription">This is the content of the modal dialog. You can put forms, messages, or any other content here.</p>
    <button class="close-button" aria-label="Close modal">&times;</button>
    <button class="action-button">Confirm Action</button>
  </div>
</div>
<!-- Add a button to toggle the modal (JS would handle this) -->
<!-- <button id="openModalButton">Open Modal</button> -->
`,
    targetOutput: {
      desktopImage: "https://placehold.co/500x300.png",
      desktopHint: "Modal dialog overlaying page content, centered",
    },
    solutionCss: `
/* For demonstration, we'll assume the modal is always visible. JS would toggle a class. */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent backdrop */
  display: flex; /* For centering the modal content */
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure it's on top */
  opacity: 1;
  visibility: visible;
  /* transition: opacity 0.3s ease, visibility 0.3s ease; */ /* For JS-driven transitions */
}

/* Styles for when modal is hidden (toggled by JS) */
/*
.modal-overlay.hidden {
  opacity: 0;
  visibility: hidden;
}
*/

.modal-content {
  background-color: hsl(var(--card));
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  width: 90%;
  max-width: 500px; /* Max width for the modal */
  position: relative; /* For positioning the close button */
  transform: scale(1);
  /* transition: transform 0.3s ease; */ /* For "zoom" effect */
}

/*
.modal-overlay.hidden .modal-content {
  transform: scale(0.9);
}
*/

.modal-content h2 {
  margin-top: 0;
  font-size: 1.75rem;
  color: hsl(var(--foreground));
}

.modal-content p {
  font-size: 1rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.modal-content .close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: hsl(var(--muted-foreground));
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}
.modal-content .close-button:hover {
  color: hsl(var(--foreground));
}

.modal-content .action-button {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: calc(var(--radius) - 2px);
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.modal-content .action-button:hover {
  background-color: hsl(var(--primary) / 0.9);
}
`,
    hints: [
      "Use `position: fixed` for the overlay to cover the whole screen.",
      "Use `display: flex; align-items: center; justify-content: center;` on the overlay to center the modal.",
      "The modal content itself needs background, padding, and border-radius.",
      "The close button can be positioned absolutely within the modal content.",
      "A high `z-index` is needed for the overlay.",
    ],
  },
};


// Helper: CodeBlock
const CodeBlock: React.FC<{ language: string; children: string; className?: string, showCopy?: boolean }> = ({ language, children, className, showCopy = true }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children.trim());
    setCopied(true);
    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle className="mr-1 h-5 w-5 text-green-500" /> Code Copied!
        </div>
      ),
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("my-4 rounded-lg bg-muted/70 shadow-sm border border-border/50 overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/50">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{language}</span>
        {showCopy && (
          <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs h-7 text-muted-foreground hover:text-foreground hover:bg-muted">
            {copied ? <CheckCircle className="mr-1.5 h-4 w-4 text-green-500" /> : <Copy className="mr-1.5 h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        )}
      </div>
      <pre className="p-4 text-sm overflow-x-auto bg-muted/10">
        <code className={`language-${language} text-foreground/90 whitespace-pre-wrap`}>{children.trim()}</code>
      </pre>
    </div>
  );
};

// Helper: ImageContainer - Basic version for exercises
const ImageContainer: React.FC<{ src: string; alt: string; width: number; height: number; "data-ai-hint": string; caption?: string; className?: string }> = ({ src, alt, width, height, "data-ai-hint": aiHint, caption, className }) => (
  <figure className={cn("my-4 flex flex-col items-center", className)}>
    <Image src={src} alt={alt} width={width} height={height} className="rounded-lg border-2 border-border shadow-md object-contain" data-ai-hint={aiHint} />
    {caption && <figcaption className="mt-2 text-xs text-muted-foreground italic text-center">{caption}</figcaption>}
  </figure>
);


export default function ExercisePage() {
  const router = useRouter();
  const params = useParams();

  const [currentExercise, setCurrentExercise] = useState<Exercise | null | undefined>(undefined); // undefined: loading, null: not found
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (params.id) {
      const exerciseId = Array.isArray(params.id) ? params.id[0] : (params.id as string);
      const foundExercise = exerciseData[exerciseId];
      setCurrentExercise(foundExercise || null);
    } else {
      // params.id might not be available on initial render
      setCurrentExercise(undefined);
    }
  }, [params.id]);

  if (currentExercise === undefined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--header-height,8rem)-var(--bottom-nav-height,5rem))] p-4 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Loading Exercise...</p>
      </div>
    );
  }

  if (currentExercise === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--header-height,8rem)-var(--bottom-nav-height,5rem))] p-4 text-center">
        <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
        <p className="text-xl font-semibold text-destructive">Exercise Not Found</p>
        <p className="text-muted-foreground mt-2">The exercise you are looking for does not exist or could not be loaded.</p>
        <Button asChild variant="link" className="mt-6 text-primary">
          <Link href="/learn"><ChevronLeft className="mr-2 h-4 w-4"/>Back to Learn Page</Link>
        </Button>
      </div>
    );
  }

  const exercise = currentExercise; // For convenience

  const handleSubmitAttempt = () => {
    toast({
        title: "Submission Received (Conceptual)",
        description: "Live checking and feedback features are coming soon!",
        variant: "default"
    });
  }

  const DifficultyBadge: React.FC<{ difficulty: "Easy" | "Medium" | "Hard" }> = ({ difficulty }) => {
    return (
      <Badge
        className={cn(
          "text-xs font-semibold",
          difficulty === "Easy" && "border-green-400 bg-green-500/10 text-green-700 dark:text-green-400",
          difficulty === "Medium" && "border-yellow-400 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
          difficulty === "Hard" && "border-red-400 bg-red-500/10 text-red-700 dark:text-red-400"
        )}
        variant="outline"
      >
        {difficulty}
      </Badge>
    );
  };


  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <Button asChild variant="outline" size="sm" className="mb-6 text-muted-foreground hover:text-foreground">
        <Link href="/learn">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to All Exercises
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-xl rounded-2xl border-primary/20">
        <CardHeader className="bg-primary/5 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-3xl font-bold text-primary">{exercise.title}</CardTitle>
              <CardDescription className="text-muted-foreground mt-1 text-base">{exercise.description}</CardDescription>
            </div>
            <DifficultyBadge difficulty={exercise.difficulty} />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-1.5">Concepts Covered:</h3>
            <div className="flex flex-wrap gap-2">
              {exercise.concepts.map(concept => (
                <Badge key={concept} variant="secondary" className="text-xs">{concept}</Badge>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 grid md:grid-cols-2 gap-8">
          {/* Left Column: Task & Target */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center"><TargetIcon className="mr-2 h-5 w-5 text-accent"/>Your Task</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground text-sm">
                {exercise.learningGoals.map(goal => <li key={goal}>{goal}</li>)}
              </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-foreground mb-2">Initial HTML</h2>
                <CodeBlock language="html" showCopy={true}>{exercise.initialHtml}</CodeBlock>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Target Output</h2>
              <div className="space-y-4">
                <ImageContainer
                  src={exercise.targetOutput.desktopImage}
                  alt="Target Output - Desktop View"
                  width={500}
                  height={exercise.id === "product-card" ? 400 : 250}
                  data-ai-hint={exercise.targetOutput.desktopHint}
                  caption="Desktop/Default View"
                  className="bg-muted/30 p-2 rounded-md"
                />
                {exercise.targetOutput.mobileImage && (
                  <ImageContainer
                    src={exercise.targetOutput.mobileImage}
                    alt="Target Output - Mobile View"
                    width={250}
                    height={exercise.id === "style-nav" ? 180 : 300}
                    data-ai-hint={exercise.targetOutput.mobileHint || exercise.targetOutput.desktopHint + " mobile"}
                    caption="Mobile View (Conceptual)"
                    className="bg-muted/30 p-2 rounded-md"
                  />
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Solution & Hints */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Your CSS Solution</h2>
              <Textarea
                placeholder="Write your CSS solution here..."
                className="min-h-[200px] font-mono text-sm bg-background/70 border-input focus:border-primary"
                aria-label="CSS Solution Input"
              />
              <Button onClick={handleSubmitAttempt} className="mt-3 w-full sm:w-auto bg-primary hover:bg-primary/90">
                <Sparkles className="mr-2 h-4 w-4"/>Submit My Attempt
              </Button>
               <p className="text-xs text-muted-foreground mt-2">Note: Live checking is coming soon. Use this space for practice.</p>
            </section>

            {exercise.hints && exercise.hints.length > 0 && (
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="hints" className="border rounded-lg bg-card shadow-sm">
                        <AccordionTrigger className="hover:bg-secondary/30 data-[state=open]:bg-secondary/50 px-4 py-3 rounded-t-lg data-[state=closed]:rounded-lg text-left transition-colors font-semibold text-foreground">
                            <div className="flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-yellow-500"/> Need a Hint?
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-background/30 rounded-b-lg">
                             <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                                {exercise.hints.map((hint, index) => <li key={index}>{hint}</li>)}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}

            <section>
              <Button
                onClick={() => setShowSolution(!showSolution)}
                variant="outline"
                className="w-full sm:w-auto border-accent/70 text-accent hover:bg-accent/10 hover:text-accent"
              >
                {showSolution ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                {showSolution ? "Hide Solution CSS" : "View Solution CSS"}
              </Button>
              {showSolution && (
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Model Solution:</h3>
                  <CodeBlock language="css">{exercise.solutionCss}</CodeBlock>
                </div>
              )}
            </section>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-secondary/20 rounded-b-2xl">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5"/>
                Practice regularly to master these concepts!
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}


    