
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Zap, MousePointerClick, Film, ToyBrick, Palette as PaletteIcon, Move, Variable as VariableIcon, Settings2, Lightbulb, Copy, CheckCircle } from "lucide-react";
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast"; // Added import

const CodeBlock: React.FC<{ language: string; children: string; className?: string }> = ({ language, children, className }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = children.trim();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for insecure contexts or old browsers
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast({
        title: <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" />Copied to clipboard!</div>,
        description: "CSS code has been copied.",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        title: "Copy Failed",
        description: "Could not copy the code. Please try again or copy manually.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  return (
    <div className={cn("my-4 rounded-lg bg-muted/70 shadow-sm border border-border/50 overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/50">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{language}</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs h-7 text-muted-foreground hover:text-foreground hover:bg-muted">
          {copied ? <CheckCircle className="mr-1.5 h-3.5 w-3.5 text-green-500" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto bg-muted/10"><code className={`language-${language} text-foreground/90 whitespace-pre-wrap`}>{children.trim()}</code></pre>
    </div>
  );
};

const HoverEffectsSection = () => (
  <Card className="shadow-lg">
    <CardHeader>
      <div className="flex items-center gap-3 mb-2">
        <MousePointerClick className="w-7 h-7 text-primary" />
        <CardTitle className="text-2xl text-primary-dark">CSS Hover Effects</CardTitle>
      </div>
      <CardDescription>Make your UI interactive and engaging with hover effects.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">1. Basic Color & Background Change</h3>
        <p className="text-sm text-muted-foreground mb-2">The simplest hover effect. Change background color, text color, or border color.</p>
        <div className="flex gap-4 items-center justify-center p-6 bg-background rounded-lg border shadow-inner">
          <Button className="transition-all duration-300 ease-out hover:bg-accent hover:text-accent-foreground hover:shadow-lg">Hover Me (BG)</Button>
          <a href="#" className="text-primary transition-colors duration-300 hover:text-accent hover:underline">Hover Link (Color)</a>
        </div>
        <CodeBlock language="css">{`
.my-button:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
  box-shadow: 0 4px 15px hsla(var(--accent)/0.3);
}

.my-link:hover {
  color: hsl(var(--accent));
  text-decoration: underline;
}`}</CodeBlock>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">2. Transform Effects (Scale, Translate)</h3>
        <p className="text-sm text-muted-foreground mb-2">Add subtle motion to elements on hover.</p>
        <div className="flex gap-4 items-center justify-center p-6 bg-background rounded-lg border shadow-inner">
          <Button className="transition-transform duration-300 ease-out hover:scale-110">Scale Me</Button>
          <Button className="transition-transform duration-300 ease-out hover:-translate-y-1">Move Me Up</Button>
        </div>
        <CodeBlock language="css">{`
.scale-button:hover {
  transform: scale(1.1);
}

.translate-button:hover {
  transform: translateY(-4px); /* Moves up by 4 pixels */
}`}</CodeBlock>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">3. Shadow & Glow Effects</h3>
        <p className="text-sm text-muted-foreground mb-2">Enhance depth and focus with shadows.</p>
        <div className="flex gap-4 items-center justify-center p-6 bg-background rounded-lg border shadow-inner">
          <div
            className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-primary/50"
            data-ai-hint="interactive box hover"
          >
            Hover Shadow
          </div>
        </div>
        <CodeBlock language="css">{`
.shadow-box:hover {
  box-shadow: 0 8px 25px hsla(var(--primary)/0.4);
  /* For a glow effect, you might use a lighter shadow color or multiple shadows */
}`}</CodeBlock>
      </div>
    </CardContent>
  </Card>
);

const TransitionsSection = () => {
  const [transitionTargetStyle, setTransitionTargetStyle] = useState<React.CSSProperties>({});
  const [currentTransition, setCurrentTransition] = useState('all 0.5s ease');

  const transitionExamples = [
    { label: 'Width (0.5s ease)', css: 'width 0.5s ease', styleChange: { width: '200px' } },
    { label: 'Color (0.3s linear)', css: 'background-color 0.3s linear', styleChange: { backgroundColor: 'hsl(var(--accent))' } },
    { label: 'Transform (0.4s ease-in-out)', css: 'transform 0.4s ease-in-out', styleChange: { transform: 'translateX(50px) rotate(10deg)' } },
    { label: 'All (0.5s ease)', css: 'all 0.5s ease', styleChange: { width: '150px', backgroundColor: 'hsl(var(--destructive))', transform: 'scale(1.1)' } },
  ];

  const applyTransition = (example: typeof transitionExamples[0]) => {
    setCurrentTransition(example.css);
    // Reset first to trigger transition if properties are the same
    setTransitionTargetStyle({});
    setTimeout(() => {
      setTransitionTargetStyle(example.styleChange);
    }, 50); // Small delay to ensure reset is processed
  };

  return (
  <Card className="shadow-lg">
    <CardHeader>
      <div className="flex items-center gap-3 mb-2">
        <Move className="w-7 h-7 text-accent" />
        <CardTitle className="text-2xl text-accent-dark">CSS Transitions</CardTitle>
      </div>
      <CardDescription>Smoothly animate changes in CSS properties over a specified duration.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-sm text-muted-foreground">Transitions provide a way to control animation speed when changing CSS properties. Instead of property changes taking effect immediately, you can cause changes in a property's value to occur over a period of time.</p>

      <div className="border p-4 rounded-lg bg-background shadow-inner">
        <h4 className="text-md font-semibold mb-2">Interactive Demo:</h4>
        <div className="flex items-center justify-center h-32 bg-muted rounded-md mb-4">
          <div
            className="w-24 h-16 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-xs"
            style={{ transition: currentTransition, ...transitionTargetStyle }}
            data-ai-hint="transition effect box"
          >
            Target
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
          {transitionExamples.map(ex => (
            <Button key={ex.label} variant="outline" size="sm" onClick={() => applyTransition(ex)} className="text-xs h-auto py-1.5">
              {ex.label}
            </Button>
          ))}
        </div>
        <Button size="sm" variant="secondary" onClick={() => setTransitionTargetStyle({})} className="w-full sm:w-auto text-xs">Reset Target</Button>
        <p className="text-xs text-muted-foreground mt-3">Current transition: <code className="bg-muted px-1 py-0.5 rounded">{currentTransition}</code></p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1">Key Transition Properties:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li><code className="font-semibold text-foreground">transition-property</code>: Specifies the name(s) of the CSS properties to which transitions should be applied (e.g., <code className="text-foreground">width</code>, <code className="text-foreground">background-color</code>, <code className="text-foreground">all</code>).</li>
          <li><code className="font-semibold text-foreground">transition-duration</code>: Defines the length of time a transition animation should take to complete (e.g., <code className="text-foreground">0.5s</code>, <code className="text-foreground">300ms</code>).</li>
          <li><code className="font-semibold text-foreground">transition-timing-function</code>: Describes how the intermediate values of the CSS properties being animated are calculated. Common values: <code className="text-foreground">ease</code>, <code className="text-foreground">linear</code>, <code className="text-foreground">ease-in</code>, <code className="text-foreground">ease-out</code>, <code className="text-foreground">ease-in-out</code>, <code className="text-foreground">cubic-bezier(...)</code>.</li>
          <li><code className="font-semibold text-foreground">transition-delay</code>: Specifies a delay (in seconds or milliseconds) before the transition will start.</li>
        </ul>
      </div>
      <CodeBlock language="css">{`
.element {
  width: 100px;
  height: 100px;
  background-color: blue;
  /* Shorthand: property duration timing-function delay */
  transition: all 0.5s ease-in-out 0.1s;
}

.element:hover {
  width: 150px;
  background-color: red;
  transform: rotate(45deg);
}`}</CodeBlock>
    </CardContent>
  </Card>
)};

const AnimationsSection = () => (
  <Card className="shadow-lg">
    <CardHeader>
      <div className="flex items-center gap-3 mb-2">
        <Film className="w-7 h-7 text-destructive" />
        <CardTitle className="text-2xl text-destructive-dark">CSS Keyframe Animations</CardTitle>
      </div>
      <CardDescription>Create complex, multi-step animations using <code className="text-sm">@keyframes</code>.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-sm text-muted-foreground">While transitions are for simple state changes, CSS animations allow for more complex sequences. You define stages (keyframes) of an animation and then apply it to an element.</p>

      <div className="border p-4 rounded-lg bg-background shadow-inner">
        <h4 className="text-md font-semibold mb-2">Example Animations:</h4>
        <div className="grid sm:grid-cols-2 gap-6 items-center justify-center py-6">
          <div className="flex flex-col items-center">
            <style>{`
              @keyframes pulseEffect {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
              }
              .pulse-demo { animation: pulseEffect 1.5s ease-in-out infinite; }
            `}</style>
            <div className="w-20 h-20 bg-destructive rounded-full pulse-demo mb-2" data-ai-hint="pulsing animation circle"></div>
            <p className="text-xs text-muted-foreground">Pulsing Effect</p>
          </div>
          <div className="flex flex-col items-center">
             <style>{`
              @keyframes slideInEffect {
                from { transform: translateX(-50px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              .slide-in-demo {
                animation: slideInEffect 0.7s ease-out forwards;
                background-color: hsl(var(--accent));
                color: hsl(var(--accent-foreground));
                padding: 0.5rem 1rem;
                border-radius: var(--radius);
              }
            `}</style>
            <div className="slide-in-demo" data-ai-hint="slide in animation text">Slide In Text</div>
            <p className="text-xs text-muted-foreground mt-2">Slide-In Effect</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1">Defining <code className="font-mono">@keyframes</code>:</h3>
        <p className="text-sm text-muted-foreground mb-2">You define the animation's steps using percentages from <code className="text-foreground">0%</code> (or <code className="text-foreground">from</code>) to <code className="text-foreground">100%</code> (or <code className="text-foreground">to</code>).</p>
        <CodeBlock language="css">{`
@keyframes myAnimationName {
  0% { /* or 'from' */
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
    opacity: 0.5;
  }
  100% { /* or 'to' */
    opacity: 1;
    transform: translateY(0);
  }
}`}</CodeBlock>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">Applying Animations:</h3>
        <p className="text-sm text-muted-foreground mb-2">Use properties like <code className="text-foreground">animation-name</code>, <code className="text-foreground">animation-duration</code>, <code className="text-foreground">animation-iteration-count</code>, etc., or the shorthand <code className="text-foreground">animation</code> property.</p>
        <CodeBlock language="css">{`
.animated-element {
  /* Shorthand: name duration timing-function delay iteration-count direction fill-mode */
  animation: myAnimationName 2s ease-out 0.5s infinite alternate forwards;
}`}</CodeBlock>
      </div>
    </CardContent>
  </Card>
);

const CustomPropertiesSection = () => (
  <Card className="shadow-lg">
    <CardHeader>
      <div className="flex items-center gap-3 mb-2">
        <VariableIcon className="w-7 h-7 text-green-600" />
        <CardTitle className="text-2xl text-green-700 dark:text-green-500">CSS Custom Properties (Variables)</CardTitle>
      </div>
      <CardDescription>Define reusable values in your stylesheets for easier theming and maintenance.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-sm text-muted-foreground">Custom properties (also known as CSS Variables) allow you to store specific values to be reused throughout a document. They are set using custom property notation (e.g., <code className="font-semibold text-foreground">--main-color: black;</code>) and are accessed using the <code className="font-semibold text-foreground">var()</code> function (e.g., <code className="font-semibold text-foreground">color: var(--main-color);</code>).</p>

      <div>
        <h3 className="text-lg font-semibold mb-2">Defining Custom Properties</h3>
        <p className="text-sm text-muted-foreground mb-2">Custom properties are typically defined on the <code className="text-foreground">:root</code> pseudo-class to make them globally available, or on specific elements for local scope.</p>
        <CodeBlock language="css">{`
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --base-font-size: 16px;
  --default-padding: 15px;
  --border-radius: 5px;
}

/* Locally scoped variable */
.card-component {
  --card-background: white;
  background-color: var(--card-background);
}`}</CodeBlock>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Using Custom Properties</h3>
        <p className="text-sm text-muted-foreground mb-2">Use the <code className="text-foreground">var()</code> function to apply the value of a custom property. You can also provide a fallback value if the variable is not defined.</p>
        <div className="p-6 bg-background rounded-lg border shadow-inner space-y-3">
          <style>{`
            .custom-prop-demo-box {
              --box-bg: var(--demo-box-color, hsl(var(--primary))); /* Fallback to primary */
              --box-text: hsl(var(--primary-foreground));
              background-color: var(--box-bg);
              color: var(--box-text);
              padding: 1rem;
              border-radius: var(--radius);
              text-align: center;
            }
            .custom-prop-demo-box.themed {
              --demo-box-color: hsl(var(--accent)); /* Override for this class */
            }
          `}</style>
          <div className="custom-prop-demo-box" data-ai-hint="blue box">Default Themed Box</div>
          <div className="custom-prop-demo-box themed" data-ai-hint="orange box">Accent Themed Box</div>
        </div>
        <CodeBlock language="css">{`
.element {
  color: var(--primary-color);
  font-size: var(--base-font-size);
  padding: var(--default-padding);
  border: 1px solid var(--primary-color, black); /* Fallback to black */
}

body {
  background-color: var(--bg-color, white); /* Use --bg-color or white if not set */
}`}</CodeBlock>
      </div>

       <div>
        <h3 className="text-lg font-semibold mb-2">Benefits of Custom Properties</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li><strong className="text-foreground">Theming:</strong> Easily change the look and feel of a site by updating a few root variables (e.g., for dark mode).</li>
          <li><strong className="text-foreground">Readability and Maintainability:</strong> Makes CSS more understandable by giving semantic names to values.</li>
          <li><strong className="text-foreground">DRY (Don't Repeat Yourself):</strong> Reduces repetition of common values.</li>
          <li><strong className="text-foreground">Dynamic Changes with JavaScript:</strong> Custom property values can be read and updated with JavaScript.</li>
        </ul>
      </div>
    </CardContent>
  </Card>
);


const MoreFeaturesSection = () => (
  <Card className="shadow-lg">
    <CardHeader>
      <div className="flex items-center gap-3 mb-2">
        <Zap className="w-7 h-7 text-secondary" />
        <CardTitle className="text-2xl text-secondary-dark">More Advanced CSS Concepts</CardTitle>
      </div>
      <CardDescription>A glimpse into other powerful CSS features to explore for modern web development.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-sm text-muted-foreground">CSS is a vast and ever-evolving language. Beyond the topics covered, here are some other advanced areas that offer exciting possibilities for web UIs:</p>

      <div>
        <h3 className="text-lg font-semibold mb-1 text-secondary-darker">Container Queries</h3>
        <p className="text-sm text-muted-foreground">Container Queries (<code className="text-foreground">@container</code>) allow you to style elements based on the size or characteristics of their nearest query container, rather than the entire viewport. This is a game-changer for creating truly modular and context-aware components.</p>
        <CodeBlock language="css">{`
/* Example: A card component that changes layout based on its container's width */
.card-container {
  container-type: inline-size; /* Define this as a query container */
  container-name: my-card;
}

.card-content {
  /* Default styles for smaller containers */
  display: block;
}

@container my-card (min-width: 400px) {
  .card-content {
    /* Styles for when the .card-container is at least 400px wide */
    display: flex;
    gap: 1rem;
  }
}`}</CodeBlock>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1 text-secondary-darker">Scroll-driven Animations</h3>
        <p className="text-sm text-muted-foreground">This emerging CSS feature allows you to link animations to the scroll position of an element or the entire viewport. You can create effects like parallax scrolling, progress bars that update on scroll, or elements that animate into view as the user scrolls, all without JavaScript.</p>
        <p className="text-xs text-muted-foreground mt-1">Key properties include <code className="text-foreground">animation-timeline</code>, <code className="text-foreground">scroll-timeline</code>, and <code className="text-foreground">view-timeline</code>. Browser support is evolving, so check compatibility.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1 text-secondary-darker">3D Transforms</h3>
        <p className="text-sm text-muted-foreground">While 2D transforms (<code className="text-foreground">translate</code>, <code className="text-foreground">scale</code>, <code className="text-foreground">rotate</code>, <code className="text-foreground">skew</code>) are common, CSS also supports 3D transformations. This allows you to create depth and perspective effects on the web page using functions like <code className="text-foreground">rotate3d()</code>, <code className="text-foreground">translate3d()</code>, <code className="text-foreground">scale3d()</code>, and properties like <code className="text-foreground">perspective</code> and <code className="text-foreground">transform-style</code>.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1 text-secondary-darker">Advanced Selectors & Specificity</h3>
        <p className="text-sm text-muted-foreground">Mastering selectors like <code className="text-foreground">:is()</code>, <code className="text-foreground">:where()</code>, <code className="text-foreground">:has()</code>, and understanding CSS specificity deeply allows for more precise and maintainable stylesheets. Check out our dedicated tutorial on this topic!</p>
      </div>

      <p className="text-sm text-muted-foreground mt-4 border-t pt-4">These topics often involve more complex setups and a deeper understanding of CSS rendering. As you continue your CSS journey, exploring these areas will unlock even more creative potential!</p>
    </CardContent>
  </Card>
);


export default function AdditionalFeaturesPage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <header className="text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4 shadow-md">
          <ToyBrick className="w-12 h-12" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary md:text-6xl">
          CSS Additional Features
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Explore various CSS techniques for interactivity, motion, and advanced styling.
        </p>
      </header>

      <Tabs defaultValue="hover-effects" className="w-full">
        <div className="overflow-x-auto py-1 mb-6">
          <TabsList className="gap-2"> {/* Removed grid, w-full from TabsList, relies on default inline-flex */}
            <TabsTrigger value="hover-effects" className="whitespace-nowrap flex-shrink-0">
              <MousePointerClick className="mr-2 h-4 w-4 sm:hidden md:inline-block"/>Hover Effects
            </TabsTrigger>
            <TabsTrigger value="transitions" className="whitespace-nowrap flex-shrink-0">
              <Move className="mr-2 h-4 w-4 sm:hidden md:inline-block"/>Transitions
            </TabsTrigger>
            <TabsTrigger value="animations" className="whitespace-nowrap flex-shrink-0">
              <Film className="mr-2 h-4 w-4 sm:hidden md:inline-block"/>Animations
            </TabsTrigger>
            <TabsTrigger value="custom-properties" className="whitespace-nowrap flex-shrink-0">
              <VariableIcon className="mr-2 h-4 w-4 sm:hidden md:inline-block"/>Custom Props
            </TabsTrigger>
            <TabsTrigger value="more-features" className="whitespace-nowrap flex-shrink-0">
              <Zap className="mr-2 h-4 w-4 sm:hidden md:inline-block"/>More Concepts
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="hover-effects">
          <HoverEffectsSection />
        </TabsContent>
        <TabsContent value="transitions">
          <TransitionsSection />
        </TabsContent>
        <TabsContent value="animations">
          <AnimationsSection />
        </TabsContent>
        <TabsContent value="custom-properties">
          <CustomPropertiesSection />
        </TabsContent>
        <TabsContent value="more-features">
          <MoreFeaturesSection />
        </TabsContent>
      </Tabs>

       <div className="text-center mt-12 md:mt-16 p-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-3xl shadow-inner border border-border/30">
        <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-semibold mb-3 text-primary-dark">Master the Art of CSS!</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-lg">
          Continue exploring, experimenting, and building beautiful, responsive web experiences.
        </p>
      </div>
    </div>
  );
}

