
"use client";

import type { NextPage } from "next";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image"; // Added import for Next Image
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronLeft, ChevronRight, LayoutGrid, Layers3, ListChecks, Wind, Target, Palette as PaletteIcon, Copy, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface TutorialChapter {
  id: string;
  title: string;
  content: ReactNode;
}

interface Tutorial {
  slug: string;
  title: string;
  description: string;
  icon: React.ElementType;
  chapters: TutorialChapter[];
}

// Helper component for code blocks
const CodeBlock: React.FC<{ language: string; children: string }> = ({ language, children }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    toast({
      title: (
        <div className="flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-green-500" /> Copied to clipboard!
        </div>
      ),
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg bg-muted/70 shadow-sm border border-border/50">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{language}</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs h-7 text-muted-foreground hover:text-foreground hover:bg-muted">
          {copied ? <CheckCircle className="mr-1.5 h-4 w-4 text-green-500" /> : <Copy className="mr-1.5 h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className={`language-${language} text-foreground/90`}>{children}</code>
      </pre>
    </div>
  );
};

const P: React.FC<{ children: ReactNode }> = ({ children }) => <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>;
const H3: React.FC<{ children: ReactNode }> = ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-4 text-primary-dark border-b border-primary/20 pb-2">{children}</h3>;
const UL: React.FC<{ children: ReactNode }> = ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1.5 text-foreground/90">{children}</ul>;
const LI: React.FC<{ children: ReactNode }> = ({ children }) => <li>{children}</li>;
const Strong: React.FC<{ children: ReactNode }> = ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>;
const Code: React.FC<{ children: ReactNode }> = ({ children }) => <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono text-accent-dark shadow-sm border border-border/30">{children}</code>;
const ImageContainer: React.FC<{ src: string; alt: string; width: number; height: number; "data-ai-hint": string; caption?: string }> = ({ src, alt, width, height, "data-ai-hint": aiHint, caption }) => (
  <figure className="my-6 flex flex-col items-center">
    <Image src={src} alt={alt} width={width} height={height} className="rounded-lg border-2 border-border shadow-md" data-ai-hint={aiHint} />
    {caption && <figcaption className="mt-2 text-xs text-muted-foreground italic">{caption}</figcaption>}
  </figure>
);


const tutorialsData: Tutorial[] = [
  {
    slug: "flexbox",
    title: "Understanding Flexbox Layouts",
    description: "Master one-dimensional layouts for flexible UIs.",
    icon: Layers3,
    chapters: [
      {
        id: "intro",
        title: "Introduction to Flexbox",
        content: (
          <>
            <P>Flexbox, short for Flexible Box Layout, is a one-dimensional layout model that offers an efficient way to lay out, align, and distribute space among items in a container, even when their size is unknown or dynamic. It's a cornerstone of modern CSS for building responsive and adaptive user interfaces.</P>
            <ImageContainer src="https://placehold.co/500x250.png" alt="Diagram of Flex Container with Flex Items" width={500} height={250} data-ai-hint="flexbox diagram" caption="A flex container (parent) holding several flex items (children)." />
            <H3>Why Use Flexbox?</H3>
            <UL>
              <LI>Simplifies complex layouts that were traditionally hard with floats or positioning.</LI>
              <LI>Aligns items easily (vertically and horizontally within their container).</LI>
              <LI>Creates flexible and responsive components, often without needing media queries for simple adjustments.</LI>
              <LI>Manages the order and spacing of elements effectively, regardless of their source order in HTML.</LI>
            </UL>
            <H3>Core Concepts</H3>
            <P>Flexbox consists of two main components, as illustrated above:</P>
            <UL>
              <LI><Strong>Flex Container:</Strong> The parent element that you declare <Code>display: flex;</Code> or <Code>display: inline-flex;</Code> on. This element establishes a "flex formatting context."</LI>
              <LI><Strong>Flex Items:</Strong> The direct children of the flex container. These items automatically become flexible and can be manipulated by flexbox properties.</LI>
            </UL>
            <CodeBlock language="css">{
`/* To make an element a flex container */
.flex-container {
  display: flex; /* Establishes a block-level flex container */
}

.inline-flex-container {
  display: inline-flex; /* Establishes an inline-level flex container */
}`
            }</CodeBlock>
            <P>Understanding these two components and their associated properties is key to mastering Flexbox. We'll explore these properties in the upcoming chapters.</P>
          </>
        ),
      },
      {
        id: "container-items",
        title: "Flex Containers & Items",
        content: (
          <>
            <P>Once you declare an element as a flex container, you gain access to a powerful set of properties to control its behavior and the layout of its items. Similarly, flex items have their own set of properties.</P>
            
            <H3>Flex Container Properties</H3>
            <P>These properties are set on the parent element (the flex container).</P>
            <UL>
              <LI><Code>flex-direction</Code>: Defines the main axis along which flex items are laid out. Possible values are <Code>row</Code> (default), <Code>row-reverse</Code>, <Code>column</Code>, and <Code>column-reverse</Code>.</LI>
              <ImageContainer src="https://placehold.co/600x200.png" alt="Flex direction row vs column" width={600} height={200} data-ai-hint="flex direction" caption="Visualizing flex-direction: row (left) and column (right)." />

              <LI><Code>flex-wrap</Code>: Controls whether flex items are forced onto a single line or can wrap onto multiple lines if they exceed the container's width. Values: <Code>nowrap</Code> (default), <Code>wrap</Code>, <Code>wrap-reverse</Code>.</LI>
              <ImageContainer src="https://placehold.co/500x200.png" alt="Flex wrap example" width={500} height={200} data-ai-hint="flex wrap" caption="flex-wrap: wrap allows items to move to a new line." />

              <LI><Code>flex-flow</Code>: A shorthand for <Code>flex-direction</Code> and <Code>flex-wrap</Code>. Example: <Code>flex-flow: row wrap;</Code></LI>
              <LI><Code>justify-content</Code>: Aligns flex items along the main axis. (More on this in the next chapter!)</LI>
              <LI><Code>align-items</Code>: Aligns flex items along the cross axis. (More on this in the next chapter!)</LI>
              <LI><Code>align-content</Code>: Aligns lines of flex items when there's extra space on the cross axis (only applies if <Code>flex-wrap: wrap;</Code> is set and there are multiple lines).</LI>
            </UL>
            <CodeBlock language="css">{
`/* Example flex container properties */
.container {
  display: flex;
  flex-direction: row; /* Main axis is horizontal, left to right */
  flex-wrap: wrap;     /* Items will wrap to new lines if needed */
  /* justify-content and align-items will be covered next! */
}`
            }</CodeBlock>

            <H3>Flex Item Properties</H3>
            <P>These properties are set on the children elements (the flex items).</P>
            <UL>
              <LI><Code>order</Code>: Controls the visual order of flex items. Default is 0. Items with lower order values appear first.</LI>
              <LI><Code>flex-grow</Code>: Defines the ability of a flex item to grow if necessary, relative to other items. It's a unitless proportion.</LI>
              <LI><Code>flex-shrink</Code>: Defines the ability of a flex item to shrink if necessary, relative to other items. Default is 1.</LI>
              <LI><Code>flex-basis</Code>: Defines the default size of an element before remaining space is distributed. It can be a length (e.g., <Code>20%</Code>, <Code>100px</Code>) or <Code>auto</Code>.</LI>
              <LI><Code>flex</Code>: A shorthand for <Code>flex-grow</Code>, <Code>flex-shrink</Code>, and <Code>flex-basis</Code>. Example: <Code>flex: 1 0 100px;</Code></LI>
              <LI><Code>align-self</Code>: Allows individual flex items to override the <Code>align-items</Code> value of the container for themselves.</LI>
            </UL>
            <CodeBlock language="css">{
`/* Example flex item properties */
.item-1 {
  order: 2;         /* This item will appear second visually, despite HTML order */
  flex-grow: 1;     /* This item can grow to take up available space */
  align-self: flex-start; /* Align this specific item to the start of the cross axis */
}

.item-2 {
  order: 1;
  flex-shrink: 0;   /* This item won't shrink below its flex-basis */
  flex-basis: 100px;/* Initial size of 100px before distribution */
}`
            }</CodeBlock>
          </>
        ),
      },
      {
        id: "alignment",
        title: "Aligning & Justifying Content",
        content: (
          <>
            <P>Alignment is one of Flexbox's superpowers. It provides powerful control over how items are positioned and how space is distributed along both the main and cross axes.</P>
            
            <H3><Code>justify-content</Code> (Main Axis Alignment)</H3>
            <P>This property aligns flex items along the main axis of the current line of the flex container. The main axis is determined by <Code>flex-direction</Code>.</P>
            <ImageContainer src="https://placehold.co/600x250.png" alt="justify-content examples" width={600} height={250} data-ai-hint="justify content" caption="Examples of justify-content: flex-start, center, space-between." />
            <UL>
              <LI><Code>flex-start</Code> (default): Items are packed toward the start of the main axis.</LI>
              <LI><Code>flex-end</Code>: Items are packed toward the end of the main axis.</LI>
              <LI><Code>center</Code>: Items are centered along the main axis.</LI>
              <LI><Code>space-between</Code>: Items are evenly distributed; first item at the start, last item at the end. Space is only between items.</LI>
              <LI><Code>space-around</Code>: Items are evenly distributed with equal space around them (half space at ends).</LI>
              <LI><Code>space-evenly</Code>: Items are distributed so that the spacing between any two items (and the space to the edges) is equal.</LI>
            </UL>

            <H3><Code>align-items</Code> (Cross Axis Alignment - Single Line)</H3>
            <P>This property aligns flex items along the cross axis of the current line. The cross axis is perpendicular to the main axis.</P>
            <ImageContainer src="https://placehold.co/600x250.png" alt="align-items examples" width={600} height={250} data-ai-hint="align items" caption="Examples of align-items: flex-start, center, stretch."/>
            <UL>
              <LI><Code>stretch</Code> (default): Items stretch to fill the container's cross-axis size (respecting min/max-width/height).</LI>
              <LI><Code>flex-start</Code>: Items are packed toward the start of the cross axis.</LI>
              <LI><Code>flex-end</Code>: Items are packed toward the end of the cross axis.</LI>
              <LI><Code>center</Code>: Items are centered along the cross axis.</LI>
              <LI><Code>baseline</Code>: Items are aligned such that their text baselines align.</LI>
            </UL>

            <H3><Code>align-content</Code> (Cross Axis Alignment - Multiple Lines)</H3>
            <P>This property aligns a flex container's lines within when there is extra space in the cross-axis, similar to how <Code>justify-content</Code> aligns individual items within the main-axis. <Strong>This property only takes effect on multi-line flexible containers</Strong> (where <Code>flex-wrap: wrap;</Code> or <Code>flex-wrap: wrap-reverse;</Code> is set and there are multiple lines of items).</P>
            <ImageContainer src="https://placehold.co/500x300.png" alt="align-content example" width={500} height={300} data-ai-hint="align content" caption="align-content distributes space between multiple lines of flex items."/>
            <UL>
                <LI><Code>stretch</Code> (default): Lines stretch to take up the remaining space.</LI>
                <LI><Code>flex-start</Code>: Lines packed to the start of the container.</LI>
                <LI><Code>flex-end</Code>: Lines packed to the end of the container.</LI>
                <LI><Code>center</Code>: Lines packed to the center of the container.</LI>
                <LI><Code>space-between</Code>: Lines evenly distributed; the first line is at the start of the container while the last one is at the end.</LI>
                <LI><Code>space-around</Code>: Lines evenly distributed with equal space around each line.</LI>
            </UL>
            <CodeBlock language="css">{
`/* Example alignment */
.container {
  display: flex;
  flex-wrap: wrap; /* Enable wrapping for align-content to have an effect */
  height: 300px; /* Needed to demonstrate align-items and align-content */
  border: 1px solid var(--border);
  
  /* Main axis alignment */
  justify-content: space-between; 
  
  /* Cross axis alignment (for single line or all lines if align-content is not set) */
  align-items: center; 

  /* Cross axis alignment (for multiple lines, overrides align-items if applicable) */
  align-content: space-around;
}

.item {
  width: 80px; /* Example width */
  height: 80px; /* Example height */
  background-color: hsl(var(--primary) / 0.2); /* Lighter primary */
  border: 1px solid hsl(var(--primary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--primary-foreground));
  font-weight: bold;
}`
            }</CodeBlock>
          </>
        ),
      },
      {
        id: "examples",
        title: "Practical Examples",
        content: (
          <>
            <P>Let's see Flexbox in action with a couple of common use cases. These examples demonstrate how the properties we've discussed come together to solve real-world layout problems.</P>
            
            <H3>Example 1: Perfectly Centering an Item</H3>
            <P>To perfectly center an item (both horizontally and vertically) within its parent container is a classic layout challenge made simple with Flexbox.</P>
            <div className="my-6 p-4 border rounded-lg bg-background shadow-md">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px', border: '1px dashed hsl(var(--border))', backgroundColor: 'hsl(var(--muted)/0.5)'}}>
                <div style={{ padding: '20px', backgroundColor: 'hsl(var(--accent)/0.8)', border: '1px solid hsl(var(--accent))', color: 'hsl(var(--accent-foreground))', borderRadius: 'var(--radius)' }}>Centered Content</div>
              </div>
            </div>
            <CodeBlock language="html">{
`<!-- HTML -->
<div class="parent-container">
  <div class="child-element">Centered Content</div>
</div>`
            }</CodeBlock>
            <CodeBlock language="css">{
`/* CSS */
.parent-container {
  display: flex;
  justify-content: center; /* Centers horizontally (along the main axis) */
  align-items: center;    /* Centers vertically (along the cross axis) */
  height: 200px;          /* Give parent some height to see vertical centering */
  border: 1px solid #ccc; /* For visualization */
}

.child-element {
  padding: 20px;
  background-color: lightblue; /* For visualization */
}`
            }</CodeBlock>

            <H3>Example 2: Responsive Navigation Bar</H3>
            <P>Creating a basic horizontal navigation bar where items are spaced out and adapt nicely.</P>
             <div className="my-6 p-4 border rounded-lg bg-background shadow-md">
              <nav style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'hsl(var(--muted))', padding: '10px', borderRadius: 'var(--radius)'}}>
                <a href="#" style={{padding: '8px 12px', textDecoration: 'none', color: 'hsl(var(--foreground))', borderRadius: 'calc(var(--radius) - 4px)'}}>Home</a>
                <a href="#" style={{padding: '8px 12px', textDecoration: 'none', color: 'hsl(var(--foreground))', borderRadius: 'calc(var(--radius) - 4px)'}}>About</a>
                <a href="#" style={{padding: '8px 12px', textDecoration: 'none', color: 'hsl(var(--foreground))', borderRadius: 'calc(var(--radius) - 4px)'}}>Services</a>
                <a href="#" style={{padding: '8px 12px', textDecoration: 'none', color: 'hsl(var(--foreground))', borderRadius: 'calc(var(--radius) - 4px)'}}>Contact</a>
              </nav>
            </div>
            <CodeBlock language="html">{
`<!-- HTML -->
<nav class="navbar">
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Services</a>
  <a href="#">Contact</a>
</nav>`
            }</CodeBlock>
            <CodeBlock language="css">{
`/* CSS */
.navbar {
  display: flex;
  background-color: #f0f0f0; /* Light gray background */
  padding: 10px;
  border-radius: 8px;
}

.navbar a {
  padding: 10px 15px;
  text-decoration: none;
  color: #333; /* Dark text */
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.navbar a:hover {
  background-color: #ddd; /* Slightly darker on hover */
}

/* Spacing items: */

/* Option 1: Using justify-content for dynamic spacing */
/* .navbar { justify-content: space-around; } /* Or space-between */

/* Option 2: Using margins for fixed spacing (often preferred for navs) */
.navbar a:not(:last-child) {
  margin-right: 10px; /* Space between items */
}

/* Option 3: Using flex-grow on items to fill space */
/*
.navbar a {
  flex-grow: 1;
  text-align: center; /* If items should take equal width */
/* }
*/`
            }</CodeBlock>
            <P>These are just a few examples. Flexbox is incredibly versatile and can be used for a wide range of layout tasks, from small component details to overall page structures. Experiment with these properties to get a feel for their power!</P>
          </>
        ),
      },
    ],
  },
  {
    slug: "grid", title: "Mastering CSS Grid Systems", description: "Learn two-dimensional layouts for complex designs.", icon: ListChecks, chapters: [
      { id: "grid-intro", title: "Grid Basics", content: <P>Content for Grid Basics coming soon... Imagine a diagram showing a grid container with rows and columns, and items placed within the grid cells. We'll cover properties like <Code>display: grid</Code>, <Code>grid-template-columns</Code>, and <Code>grid-template-rows</Code>.</P> },
      { id: "grid-areas", title: "Defining Grid Areas", content: <P>Content for Defining Grid Areas coming soon... This will explore <Code>grid-template-areas</Code> for more semantic layout definitions. Picture a diagram where different sections of a webpage (header, sidebar, main, footer) are mapped to named grid areas.</P> },
    ]
  },
  {
    slug: "animations", title: "CSS Animations & Transitions", description: "Bring your UIs to life with smooth animations.", icon: Wind, chapters: [
      { id: "animations-intro", title: "Keyframes & Animation Properties", content: <P>Content for Keyframes & Animation Properties coming soon... We'll dive into <Code>@keyframes</Code>, <Code>animation-name</Code>, <Code>animation-duration</Code>, and more. Expect visuals of simple animations like fades or movements.</P> },
    ]
  },
  {
    slug: "responsive", title: "Responsive Design Principles", description: "Build websites that adapt to any screen size.", icon: Target, chapters: [
      { id: "responsive-intro", title: "Media Queries", content: <P>Content for Media Queries coming soon... This chapter will show how to use <Code>@media</Code> rules to apply different styles based on screen size. Visuals will depict how a layout changes across desktop, tablet, and mobile.</P> },
    ]
  },
  {
    slug: "selectors", title: "Advanced Selectors & Specificity", description: "Target elements precisely and manage CSS conflicts.", icon: PaletteIcon, chapters: [
      { id: "selectors-intro", title: "Attribute Selectors", content: <P>Content for Attribute Selectors coming soon... Learn to select elements based on their attributes (e.g., <Code>input[type="text"]</Code>). We'll include examples and short explanations of how these selectors work.</P> },
    ]
  },
];


const TutorialPage: NextPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const foundTutorial = tutorialsData.find((t) => t.slug === slug);
    if (foundTutorial) {
      setTutorial(foundTutorial);
      setCurrentChapterIndex(0); 
    } else {
      router.push("/learn"); 
    }
  }, [slug, router]);

  useEffect(() => {
    // Scroll to top of content area when chapter changes
    const contentArea = document.getElementById("tutorial-content-area");
    if (contentArea) {
      contentArea.scrollTop = 0;
    }
  }, [currentChapterIndex, slug]);


  if (!tutorial) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <LayoutGrid className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Loading Tutorial...</p>
      </div>
    );
  }

  const currentChapter = tutorial.chapters[currentChapterIndex];

  const goToChapter = (index: number) => {
    setCurrentChapterIndex(index);
    setIsMobileNavOpen(false); 
  };

  const nextChapter = () => {
    if (currentChapterIndex < tutorial.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const TutorialIcon = tutorial.icon;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-var(--header-height,8rem)-5rem)] gap-0"> {/* Adjusted min-height for nav bar */}
      {/* Sidebar for Desktop / Accordion Trigger for Mobile */}
      <aside className="lg:w-80 lg:border-r border-border bg-card lg:sticky lg:top-[var(--header-height,4rem)] lg:h-[calc(100vh-var(--header-height,4rem)-5rem)]"> {/* Adjusted sticky top and height */}
        <div className="p-4 border-b border-border flex items-center justify-between h-16">
          <Link href="/learn" className="text-primary hover:underline flex items-center text-sm">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Learn
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            aria-label="Toggle chapter navigation"
          >
            <ListChecks className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Chapter Navigation (Accordion Style) */}
        <div className={`lg:hidden ${isMobileNavOpen ? 'block' : 'hidden'} border-b border-border`}>
          <Accordion type="single" collapsible defaultValue={`chapter-${currentChapterIndex}`} className="w-full p-2">
            <AccordionItem value="chapters-mobile" className="border-b-0">
              <AccordionTrigger className="px-2 py-3 text-base font-semibold hover:bg-muted/50 rounded-md hover:no-underline">
                Chapters
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                {tutorial.chapters.map((chapter, index) => (
                  <Button
                    key={chapter.id}
                    variant={currentChapterIndex === index ? "secondary" : "ghost"}
                    className={`w-full justify-start text-left h-auto py-2.5 px-3 mb-1 text-sm ${currentChapterIndex === index ? 'font-semibold bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => goToChapter(index)}
                  >
                    <span className="truncate">{index + 1}. {chapter.title}</span>
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Desktop Chapter Navigation */}
        <ScrollArea className="hidden lg:block h-[calc(100%-4rem)]"> {/* Adjust height for header div */}
          <div className="p-4">
            <div className="flex items-start gap-3 mb-5">
              <div className="p-2.5 bg-primary/10 rounded-lg text-primary mt-0.5">
                <TutorialIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-primary-dark">{tutorial.title}</h2>
                <p className="text-xs text-muted-foreground leading-snug">{tutorial.description}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {tutorial.chapters.map((chapter, index) => (
                <Button
                  key={chapter.id}
                  variant={currentChapterIndex === index ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left h-auto py-2.5 px-3 text-sm ${currentChapterIndex === index ? 'font-semibold bg-primary/10 text-primary shadow-sm' : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'}`}
                  onClick={() => goToChapter(index)}
                >
                  <span className="truncate">{index + 1}. {chapter.title}</span>
                </Button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-background">
         <ScrollArea id="tutorial-content-area" className="h-[calc(100vh-var(--header-height,4rem)-5rem-4rem)] lg:h-[calc(100vh-var(--header-height,4rem)-5rem)] p-4 sm:p-6 md:p-8"> {/* Adjusted for footer/nav and pagination */}
          <Card className="rounded-xl shadow-lg overflow-hidden bg-card border border-border/50">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-accent/5 p-6 border-b border-border/50">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-primary-dark">{currentChapter.title}</CardTitle>
              <CardDescription className="text-muted-foreground mt-1.5">
                Chapter {currentChapterIndex + 1} of {tutorial.chapters.length} in "{tutorial.title}"
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 prose prose-sm sm:prose-base max-w-none dark:prose-invert text-foreground leading-relaxed">
              {currentChapter.content}
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-between items-center sticky bottom-0 bg-background py-4 border-t border-border lg:border-t-0 lg:static lg:py-0 lg:bg-transparent">
            <Button
              onClick={prevChapter}
              disabled={currentChapterIndex === 0}
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Page {currentChapterIndex + 1} of {tutorial.chapters.length}
            </span>
            <Button
              onClick={nextChapter}
              disabled={currentChapterIndex === tutorial.chapters.length - 1}
              variant="default"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default TutorialPage;

    