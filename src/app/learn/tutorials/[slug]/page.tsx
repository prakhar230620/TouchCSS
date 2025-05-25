
"use client";

import type { NextPage } from "next";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
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
    <div className="my-4 rounded-lg bg-muted/50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs font-semibold text-muted-foreground uppercase">{language}</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs h-7">
          {copied ? <CheckCircle className="mr-1.5 h-4 w-4 text-green-500" /> : <Copy className="mr-1.5 h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
};

const P: React.FC<{ children: ReactNode }> = ({ children }) => <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>;
const H3: React.FC<{ children: ReactNode }> = ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-primary-dark">{children}</h3>;
const UL: React.FC<{ children: ReactNode }> = ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1 text-foreground/90">{children}</ul>;
const LI: React.FC<{ children: ReactNode }> = ({ children }) => <li>{children}</li>;
const Strong: React.FC<{ children: ReactNode }> = ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>;
const Code: React.FC<{ children: ReactNode }> = ({ children }) => <code className="px-1 py-0.5 bg-muted rounded text-sm font-mono text-accent-dark">{children}</code>;


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
            <P>Flexbox, short for Flexible Box Layout, is a one-dimensional layout model that offers an efficient way to lay out, align, and distribute space among items in a container, even when their size is unknown or dynamic.</P>
            <H3>Why Use Flexbox?</H3>
            <UL>
              <LI>Simplifies complex layouts that were traditionally hard with floats or positioning.</LI>
              <LI>Aligns items easily (vertically and horizontally).</LI>
              <LI>Creates flexible and responsive components without media queries in some cases.</LI>
              <LI>Manages the order and spacing of elements effectively.</LI>
            </UL>
            <H3>Core Concepts</H3>
            <P>Flexbox consists of two main components:</P>
            <UL>
              <LI><Strong>Flex Container:</Strong> The parent element that you declare <Code>display: flex;</Code> or <Code>display: inline-flex;</Code> on.</LI>
              <LI><Strong>Flex Items:</Strong> The direct children of the flex container.</LI>
            </UL>
            <CodeBlock language="css">{
`/* To make an element a flex container */
.flex-container {
  display: flex; /* or inline-flex */
}`
            }</CodeBlock>
            <P>Understanding these two components and their associated properties is key to mastering Flexbox.</P>
          </>
        ),
      },
      {
        id: "container-items",
        title: "Flex Containers & Items",
        content: (
          <>
            <P>Once you declare an element as a flex container, you can use various properties to control its behavior and the layout of its items.</P>
            <H3>Flex Container Properties</H3>
            <UL>
              <LI><Code>flex-direction</Code>: Defines the main axis (row, row-reverse, column, column-reverse).</LI>
              <LI><Code>flex-wrap</Code>: Controls whether flex items wrap to new lines (nowrap, wrap, wrap-reverse).</LI>
              <LI><Code>flex-flow</Code>: A shorthand for <Code>flex-direction</Code> and <Code>flex-wrap</Code>.</LI>
              <LI><Code>justify-content</Code>: Aligns flex items along the main axis.</LI>
              <LI><Code>align-items</Code>: Aligns flex items along the cross axis.</LI>
              <LI><Code>align-content</Code>: Aligns lines of flex items when there's extra space on the cross axis (only applies if <Code>flex-wrap: wrap;</Code> is set and there are multiple lines).</LI>
            </UL>
            <CodeBlock language="css">{
`/* Example flex container properties */
.container {
  display: flex;
  flex-direction: row; /* Main axis is horizontal, left to right */
  flex-wrap: wrap;     /* Items will wrap to new lines if needed */
  justify-content: space-around; /* Distribute space around items */
  align-items: center;      /* Center items vertically on each line */
}`
            }</CodeBlock>
            <H3>Flex Item Properties</H3>
            <UL>
              <LI><Code>order</Code>: Controls the visual order of flex items.</LI>
              <LI><Code>flex-grow</Code>: Defines the ability of a flex item to grow if necessary.</LI>
              <LI><Code>flex-shrink</Code>: Defines the ability of a flex item to shrink if necessary.</LI>
              <LI><Code>flex-basis</Code>: Defines the default size of an element before remaining space is distributed.</LI>
              <LI><Code>flex</Code>: A shorthand for <Code>flex-grow</Code>, <Code>flex-shrink</Code>, and <Code>flex-basis</Code>.</LI>
              <LI><Code>align-self</Code>: Allows individual flex items to override the <Code>align-items</Code> value of the container.</LI>
            </UL>
            <CodeBlock language="css">{
`/* Example flex item properties */
.item-1 {
  order: 2;         /* This item will appear second visually */
  flex-grow: 1;     /* This item can grow to take up available space */
  align-self: flex-start; /* Align this specific item to the start of the cross axis */
}

.item-2 {
  order: 1;
  flex-shrink: 0;   /* This item won't shrink below its flex-basis */
  flex-basis: 100px;/* Initial size of 100px */
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
            <P>Alignment is one of Flexbox's superpowers. It provides powerful control over how items are positioned and how space is distributed.</P>
            <H3><Code>justify-content</Code> (Main Axis Alignment)</H3>
            <P>This property aligns flex items along the main axis of the current line of the flex container.</P>
            <UL>
              <LI><Code>flex-start</Code> (default): Items are packed toward the start of the main axis.</LI>
              <LI><Code>flex-end</Code>: Items are packed toward the end of the main axis.</LI>
              <LI><Code>center</Code>: Items are centered along the main axis.</LI>
              <LI><Code>space-between</Code>: Items are evenly distributed; first item at the start, last item at the end.</LI>
              <LI><Code>space-around</Code>: Items are evenly distributed with equal space around them.</LI>
              <LI><Code>space-evenly</Code>: Items are distributed so that the spacing between any two items (and the space to the edges) is equal.</LI>
            </UL>
            <H3><Code>align-items</Code> (Cross Axis Alignment - Single Line)</H3>
            <P>This property aligns flex items along the cross axis of the current line.</P>
            <UL>
              <LI><Code>stretch</Code> (default): Items stretch to fill the container's cross-axis size (still respect min/max-width/height).</LI>
              <LI><Code>flex-start</Code>: Items are packed toward the start of the cross axis.</LI>
              <LI><Code>flex-end</Code>: Items are packed toward the end of the cross axis.</LI>
              <LI><Code>center</Code>: Items are centered along the cross axis.</LI>
              <LI><Code>baseline</Code>: Items are aligned such that their baselines align.</LI>
            </UL>
            <H3><Code>align-content</Code> (Cross Axis Alignment - Multiple Lines)</H3>
            <P>This property aligns a flex container's lines within when there is extra space in the cross-axis, similar to how <Code>justify-content</Code> aligns individual items within the main-axis. <Strong>This property only takes effect on multi-line flexible containers</Strong> (where <Code>flex-wrap: wrap;</Code> or <Code>flex-wrap: wrap-reverse;</Code> is set).</P>
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
  height: 200px; /* Needed to demonstrate align-items */
  border: 1px solid #ccc;
  
  /* Main axis alignment */
  justify-content: space-between; 
  
  /* Cross axis alignment (for single line) */
  align-items: center; 
}

.item {
  width: 50px;
  height: 50px;
  background-color: var(--primary-light);
  border: 1px solid var(--primary);
  text-align: center;
  line-height: 50px;
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
            <P>Let's see Flexbox in action with a couple of common use cases.</P>
            <H3>Example 1: Centering an Item</H3>
            <P>To perfectly center an item within its parent:</P>
            <CodeBlock language="html">{
`<!-- HTML -->
<div class="parent">
  <div class="child">Centered Content</div>
</div>`
            }</CodeBlock>
            <CodeBlock language="css">{
`/* CSS */
.parent {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center;    /* Centers vertically */
  height: 200px;          /* Give parent some height */
  border: 1px solid #ccc;
}

.child {
  padding: 20px;
  background-color: var(--accent-light);
  border: 1px solid var(--accent);
}`
            }</CodeBlock>

            <H3>Example 2: Simple Navigation Bar</H3>
            <P>Creating a basic horizontal navigation bar where items are spaced out.</P>
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
  background-color: var(--muted);
  padding: 10px;
  border-radius: var(--radius);
}

.navbar a {
  padding: 10px 15px;
  text-decoration: none;
  color: var(--foreground);
  border-radius: calc(var(--radius) - 4px);
}

.navbar a:hover {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

/* Spacing items: */
/* Option 1: justify-content (if items should fill space) */
/* .navbar { justify-content: space-around; } */

/* Option 2: margin on items (for fixed spacing) */
.navbar a:not(:last-child) {
  margin-right: 10px;
}`
            }</CodeBlock>
            <P>These are just a few examples. Flexbox is incredibly versatile and can be used for a wide range of layout tasks.</P>
          </>
        ),
      },
    ],
  },
  // Placeholder for other tutorials - content can be added later
  {
    slug: "grid", title: "Mastering CSS Grid Systems", description: "Learn two-dimensional layouts for complex designs.", icon: ListChecks, chapters: [
      { id: "grid-intro", title: "Grid Basics", content: <P>Content for Grid Basics coming soon...</P> },
      { id: "grid-areas", title: "Defining Grid Areas", content: <P>Content for Defining Grid Areas coming soon...</P> },
    ]
  },
  {
    slug: "animations", title: "CSS Animations & Transitions", description: "Bring your UIs to life with smooth animations.", icon: Wind, chapters: [
      { id: "animations-intro", title: "Keyframes & Animation Properties", content: <P>Content for Keyframes & Animation Properties coming soon...</P> },
    ]
  },
  {
    slug: "responsive", title: "Responsive Design Principles", description: "Build websites that adapt to any screen size.", icon: Target, chapters: [
      { id: "responsive-intro", title: "Media Queries", content: <P>Content for Media Queries coming soon...</P> },
    ]
  },
  {
    slug: "selectors", title: "Advanced Selectors & Specificity", description: "Target elements precisely and manage CSS conflicts.", icon: PaletteIcon, chapters: [
      { id: "selectors-intro", title: "Attribute Selectors", content: <P>Content for Attribute Selectors coming soon...</P> },
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
      setCurrentChapterIndex(0); // Reset to first chapter on tutorial change
    } else {
      // Handle tutorial not found, e.g., redirect or show 404
      router.push("/learn"); 
    }
  }, [slug, router]);

  if (!tutorial) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LayoutGrid className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Loading Tutorial...</p>
      </div>
    );
  }

  const currentChapter = tutorial.chapters[currentChapterIndex];

  const goToChapter = (index: number) => {
    setCurrentChapterIndex(index);
    setIsMobileNavOpen(false); // Close mobile nav on chapter selection
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
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-var(--header-height,10rem))] gap-0">
      {/* Sidebar for Desktop / Accordion Trigger for Mobile */}
      <aside className="lg:w-80 lg:border-r border-border bg-card lg:sticky lg:top-0 lg:h-screen">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link href="/learn" className="text-primary hover:underline flex items-center text-sm">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Learn
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            <ListChecks className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Chapter Navigation (Accordion Style) */}
        <div className={`lg:hidden ${isMobileNavOpen ? 'block' : 'hidden'}`}>
          <Accordion type="single" collapsible defaultValue={`chapter-${currentChapterIndex}`} className="w-full p-2">
            <AccordionItem value="chapters-mobile">
              <AccordionTrigger className="px-2 py-3 text-base font-semibold hover:bg-muted/50 rounded-md">
                Chapters
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                {tutorial.chapters.map((chapter, index) => (
                  <Button
                    key={chapter.id}
                    variant={currentChapterIndex === index ? "secondary" : "ghost"}
                    className={`w-full justify-start text-left h-auto py-2.5 px-3 mb-1 ${currentChapterIndex === index ? 'font-semibold bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                    onClick={() => goToChapter(index)}
                  >
                    <span className="truncate">{chapter.title}</span>
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Desktop Chapter Navigation */}
        <ScrollArea className="hidden lg:block h-[calc(100vh-100px)]"> {/* Adjust height as needed */}
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <TutorialIcon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-primary-dark">{tutorial.title}</h2>
                <p className="text-xs text-muted-foreground">{tutorial.description}</p>
              </div>
            </div>
            <nav className="space-y-1.5">
              {tutorial.chapters.map((chapter, index) => (
                <Button
                  key={chapter.id}
                  variant={currentChapterIndex === index ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left h-auto py-2.5 px-3 ${currentChapterIndex === index ? 'font-semibold bg-primary/10 text-primary shadow-sm' : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'}`}
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
      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-background">
        <ScrollArea className="h-[calc(100vh-var(--header-height,12rem))] lg:h-auto"> {/* Adjust for footer/nav */}
          <Card className="rounded-xl shadow-lg overflow-hidden bg-card">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-card to-accent/5 p-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-primary-dark">{currentChapter.title}</CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Chapter {currentChapterIndex + 1} of {tutorial.chapters.length} in "{tutorial.title}"
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 prose prose-sm sm:prose-base max-w-none dark:prose-invert text-foreground leading-relaxed">
              {currentChapter.content}
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-between items-center">
            <Button
              onClick={prevChapter}
              disabled={currentChapterIndex === 0}
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
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


    