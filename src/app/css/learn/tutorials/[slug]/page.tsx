
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronLeft, ChevronRight, LayoutGrid, Layers3, ListChecks, Wind, Target, Palette as PaletteIcon, Copy, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

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

// Helper components for rich content
const CodeBlock: React.FC<{ language: string; children: string; className?: string }> = ({ language, children, className }) => {
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
    <div className={cn("my-6 rounded-lg bg-muted/70 shadow-sm border border-border/50 overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-muted/30">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{language}</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs h-7 text-muted-foreground hover:text-foreground hover:bg-muted">
          {copied ? <CheckCircle className="mr-1.5 h-4 w-4 text-green-500" /> : <Copy className="mr-1.5 h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto bg-muted/10">
        <code className={`language-${language} text-foreground/90`}>{children}</code>
      </pre>
    </div>
  );
};

const P: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => <p className={cn("mb-4 leading-relaxed text-foreground/90", className)}>{children}</p>;
const H3: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => <h3 className={cn("text-xl font-semibold mt-8 mb-4 text-primary-dark border-b border-primary/20 pb-2", className)}>{children}</h3>;
const H4: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => <h4 className={cn("text-lg font-semibold mt-6 mb-3 text-primary", className)}>{children}</h4>;
const UL: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => <ul className={cn("list-disc pl-6 mb-4 space-y-1.5 text-foreground/90", className)}>{children}</ul>;
const LI: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => <li>{children}</li>;
const BoldText: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => <strong className={cn("font-semibold text-foreground", className)}>{children}</strong>;
const Code: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => <code className={cn("px-1.5 py-0.5 bg-muted rounded text-sm font-mono text-accent-dark shadow-sm border border-border/30", className)}>{children}</code>;
const ImageContainer: React.FC<{ src: string; alt: string; width: number; height: number; "data-ai-hint": string; caption?: string; className?: string }> = ({ src, alt, width, height, "data-ai-hint": aiHint, caption, className }) => (
  <figure className={cn("my-6 flex flex-col items-center", className)}>
    <Image src={src} alt={alt} width={width} height={height} className="rounded-lg border-2 border-border shadow-md" data-ai-hint={aiHint} />
    {caption && <figcaption className="mt-2 text-xs text-muted-foreground italic text-center">{caption}</figcaption>}
  </figure>
);
const Tip: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("my-4 p-4 border-l-4 border-accent bg-accent/10 rounded-r-md text-accent-darker", className)}>
    <BoldText>Tip:</BoldText> {children}
  </div>
);

// Interactive Flex Container for demos
const InteractiveFlexContainer: React.FC<{
  containerProps: React.CSSProperties;
  items: { style?: React.CSSProperties; text: string }[];
  height?: string;
  className?: string;
}> = ({ containerProps, items, height = '150px', className }) => {
  return (
    <div
      className={cn("flex items-center justify-center p-2 my-4 border border-dashed border-border rounded-lg bg-background shadow-inner min-h-[100px]", className)}
      style={{ height }}
    >
      <div style={{ display: 'flex', ...containerProps, width: '100%', height: '100%' }} className="bg-muted/30 p-1 rounded">
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              margin: '2px',
              backgroundColor: 'hsl(var(--primary)/0.7)',
              color: 'hsl(var(--primary-foreground))',
              borderRadius: 'calc(var(--radius) / 2)',
              textAlign: 'center',
              minWidth: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              ...item.style,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};


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
            <P>Welcome to the world of Flexbox! Short for <BoldText>Flexible Box Layout</BoldText>, Flexbox is a powerful one-dimensional layout model in CSS. It provides an efficient way to arrange, align, and distribute space among items within a container, even when their sizes are unknown or change dynamically. Think of it as giving your elements superpowers to intelligently manage their positions and dimensions.</P>
            <ImageContainer src="https://placehold.co/600x300.png" alt="Diagram of Flex Container with Flex Items along a single axis" width={600} height={300} data-ai-hint="flexbox diagram axis" caption="A flex container (parent) directs its flex items (children) along a primary axis." />

            <H3>Why is Flexbox a Game Changer?</H3>
            <P>Before Flexbox, creating complex and responsive layouts often involved cumbersome techniques like floats, table display hacks, or complex positioning. Flexbox simplifies these tasks significantly:</P>
            <UL>
              <LI>Builds <BoldText>complex layouts</BoldText> with ease that were previously challenging.</LI>
              <LI>Effortlessly <BoldText>aligns items</BoldText> both vertically and horizontally within their parent.</LI>
              <LI>Creates inherently <BoldText>flexible and responsive components</BoldText>, often minimizing the need for media queries for simple adjustments.</LI>
              <LI>Manages the <BoldText>order and spacing</BoldText> of elements effectively, which can even be different from their order in the HTML source.</LI>
              <LI>Perfect for <BoldText>component-level layouts</BoldText> within an application (e.g., navigation bars, form controls, card components).</LI>
            </UL>

            <H3>The Two Pillars: Flex Containers and Flex Items</H3>
            <P>Understanding Flexbox boils down to grasping two fundamental concepts:</P>
            <UL>
              <LI><BoldText>Flex Container:</BoldText> This is the parent HTML element. You activate Flexbox by setting its <Code>display</Code> property to <Code>flex</Code> or <Code>inline-flex</Code>. This creates a "flex formatting context" for its direct children.</LI>
              <LI><BoldText>Flex Items:</BoldText> These are the direct children of a flex container. As soon as their parent becomes a flex container, they automatically become flex items and gain special flex properties.</LI>
            </UL>
            <CodeBlock language="css">{
              `/* To make an element a flex container */
.flex-container {
  display: flex; /* Establishes a block-level flex container */
}

/* Or, for an inline-level flex container */
.inline-flex-container {
  display: inline-flex; /* Items flow with surrounding text, then flex internally */
}`
            }</CodeBlock>
            <P>In the upcoming chapters, we'll dive deep into the properties available for both flex containers and flex items, unlocking the full potential of this layout model. Get ready to transform how you build UIs!</P>
            <Tip>While Flexbox is for one-dimensional layouts (either a row or a column), its counterpart, CSS Grid, is designed for two-dimensional layouts (rows and columns simultaneously). They often work great together!</Tip>
          </>
        ),
      },
      {
        id: "container-items",
        title: "Flex Containers & Flex Items",
        content: (
          <>
            <P>Now that you know how to create a flex context, let's explore the specific properties that bring Flexbox to life. We'll look at properties for the <BoldText>flex container</BoldText> (the parent) and properties for the <BoldText>flex items</BoldText> (the children).</P>

            <H3>Flex Container Properties</H3>
            <P>These properties are set on the parent element to control the overall flow and alignment of its children.</P>

            <H4><Code>flex-direction</Code></H4>
            <P>This defines the <BoldText>main axis</BoldText>, determining the direction flex items are placed in the flex container. Think of it as setting the primary flow of your items.</P>
            <UL>
              <LI><Code>row</Code> (default): Left to right (in LTR languages).</LI>
              <LI><Code>row-reverse</Code>: Right to left.</LI>
              <LI><Code>column</Code>: Top to bottom.</LI>
              <LI><Code>column-reverse</Code>: Bottom to top.</LI>
            </UL>
            <ImageContainer src="https://placehold.co/600x250.png" alt="Visual examples of flex-direction row and column" width={600} height={250} data-ai-hint="flex direction example" caption="Illustrating flex-direction: row (items arranged horizontally) vs. column (items arranged vertically)." />
            <CodeBlock language="css">{
              `.container {
  display: flex;
  flex-direction: column; /* Items will stack vertically */
}`
            }</CodeBlock>

            <H4><Code>flex-wrap</Code></H4>
            <P>By default, flex items try to fit onto one line. <Code>flex-wrap</Code> controls whether they should wrap onto multiple lines if they exceed the container's space.</P>
            <UL>
              <LI><Code>nowrap</Code> (default): All items on a single line (may cause overflow).</LI>
              <LI><Code>wrap</Code>: Items wrap onto multiple lines, top to bottom.</LI>
              <LI><Code>wrap-reverse</Code>: Items wrap onto multiple lines, bottom to top.</LI>
            </UL>
            <ImageContainer src="https://placehold.co/550x200.png" alt="Flex items wrapping to a new line" width={550} height={200} data-ai-hint="flex wrap example" caption="flex-wrap: wrap allows items to flow onto subsequent lines." />
            <CodeBlock language="css">{
              `.container {
  display: flex;
  flex-wrap: wrap; /* Items will wrap if they don't fit on one line */
  width: 200px; /* Container width to demonstrate wrapping */
}`
            }</CodeBlock>

            <H4><Code>flex-flow</Code></H4>
            <P>This is a shorthand property for setting both <Code>flex-direction</Code> and <Code>flex-wrap</Code> in one declaration.</P>
            <CodeBlock language="css">{
              `.container {
  display: flex;
  flex-flow: row wrap; /* Equivalent to flex-direction: row; and flex-wrap: wrap; */
}`
            }</CodeBlock>

            <H4><Code>justify-content</Code>, <Code>align-items</Code>, <Code>align-content</Code></H4>
            <P>These crucial properties control alignment and space distribution. We'll dedicate the entire next chapter to them as they are fundamental to mastering Flexbox!</P>

            <H3>Flex Item Properties</H3>
            <P>These properties are applied directly to the children of the flex container, giving you granular control over individual items.</P>

            <H4><Code>order</Code></H4>
            <P>Allows you to change the visual order of flex items, independent of their source order in the HTML. Items with lower <Code>order</Code> values appear first. The default is 0.</P>
            <CodeBlock language="css">{
              `.item-A { order: 2; } /* Will appear after item-B if item-B has order: 1 */
.item-B { order: 1; }`
            }</CodeBlock>

            <H4><Code>flex-grow</Code></H4>
            <P>Dictates how much a flex item can <BoldText>grow</BoldText> relative to other items if there's extra space in the flex container. It's a unitless proportion. Default is 0 (does not grow).</P>
            <InteractiveFlexContainer
              containerProps={{ width: '300px' }}
              items={[
                { text: 'Item 1 (grow 1)', style: { flexGrow: 1 } },
                { text: 'Item 2 (grow 2)', style: { flexGrow: 2 } },
                { text: 'Item 3', style: { flexGrow: 0 } }, /* Default no grow */
              ]}
              height="80px"
            />
            <CodeBlock language="css">{
              `.item-can-grow {
  flex-grow: 1; /* This item will take up available space */
}
.item-grows-more {
  flex-grow: 2; /* This item will take up twice as much space as one with flex-grow: 1 */
}`
            }</CodeBlock>

            <H4><Code>flex-shrink</Code></H4>
            <P>Defines the ability of a flex item to <BoldText>shrink</BoldText> relative to other items if there isn't enough space in the container. Default is 1 (can shrink).</P>
            <CodeBlock language="css">{
              `.item-no-shrink {
  flex-shrink: 0; /* This item will not shrink smaller than its basis size */
}`
            }</CodeBlock>

            <H4><Code>flex-basis</Code></H4>
            <P>Specifies the <BoldText>initial main size</BoldText> of a flex item before free space is distributed according to <Code>flex-grow</Code> or <Code>flex-shrink</Code>. It can be a length (e.g., <Code>20%</Code>, <Code>100px</Code>), or <Code>auto</Code> (item's intrinsic size).</P>
            <CodeBlock language="css">{
              `.item {
  flex-basis: 150px; /* This item wants to be 150px wide (if row) or tall (if column) initially */
}`
            }</CodeBlock>

            <H4><Code>flex</Code></H4>
            <P>A shorthand for <Code>flex-grow</Code>, <Code>flex-shrink</Code>, and <Code>flex-basis</Code> in that order. Common values:</P>
            <UL>
              <LI><Code>flex: 0 1 auto;</Code> (default: can't grow, can shrink, basis is auto)</LI>
              <LI><Code>flex: 1 1 auto;</Code> (can grow, can shrink, basis is auto - often written as <Code>flex: auto</Code>)</LI>
              <LI><Code>flex: 1 0 auto;</Code> (can grow, cannot shrink)</LI>
              <LI><Code>flex: none;</Code> (equivalent to <Code>flex: 0 0 auto;</Code> - inflexible)</LI>
              <LI><Code>flex: 1;</Code> (equivalent to <Code>flex: 1 1 0%;</Code> - item takes proportional share of space)</LI>
            </UL>
            <CodeBlock language="css">{
              `.item {
  flex: 1 0 100px; /* grow: 1, shrink: 0, basis: 100px */
}`
            }</CodeBlock>

            <H4><Code>align-self</Code></H4>
            <P>Allows a single flex item to override the <Code>align-items</Code> value set on the flex container for itself. Possible values are similar to <Code>align-items</Code> (e.g., <Code>flex-start</Code>, <Code>flex-end</Code>, <Code>center</Code>, <Code>stretch</Code>, <Code>baseline</Code>).</P>
            <ImageContainer src="https://placehold.co/400x150.png" alt="One item aligning itself differently" width={400} height={150} data-ai-hint="align self example" caption="align-self allows an individual item to break from the group's cross-axis alignment." />
            <CodeBlock language="css">{
              `.container {
  display: flex;
  align-items: center; /* All items center by default */
}
.special-item {
  align-self: flex-start; /* This specific item aligns to the start */
}`
            }</CodeBlock>
            <Tip>Remember: container properties control the group, item properties control individuals. Experimentation is key to truly understanding their interplay!</Tip>
          </>
        ),
      },
      {
        id: "alignment",
        title: "Aligning & Justifying Content",
        content: (
          <>
            <P>Alignment is where Flexbox truly shines, offering robust control over how items are positioned and how space is distributed. We'll cover three core properties: <Code>justify-content</Code> for main axis alignment, <Code>align-items</Code> for cross axis alignment of items in a single line, and <Code>align-content</Code> for aligning multiple lines of items on the cross axis.</P>

            <H3><Code>justify-content</Code>: Main Axis Alignment</H3>
            <P>This property defines how flex items are distributed along the <BoldText>main axis</BoldText> of the flex container. The main axis is determined by <Code>flex-direction</Code> (<Code>row</Code> or <Code>column</Code>).</P>
            <ImageContainer src="https://placehold.co/700x400.png" alt="Visual examples of justify-content values" width={700} height={400} data-ai-hint="justify content flexbox diagrams" caption="Illustrating common justify-content values like flex-start, center, space-between, space-around, and space-evenly." />
            <UL>
              <LI><Code>flex-start</Code> (default): Items are packed toward the start of the main axis.</LI>
              <LI><Code>flex-end</Code>: Items are packed toward the end of the main axis.</LI>
              <LI><Code>center</Code>: Items are centered along the main axis.</LI>
              <LI><Code>space-between</Code>: Items are evenly distributed; the first item is at the start, the last item at the end. Space is only *between* items.</LI>
              <LI><Code>space-around</Code>: Items are evenly distributed with equal space *around* them (meaning half the space at the very beginning and end compared to between items).</LI>
              <LI><Code>space-evenly</Code>: Items are distributed so that the spacing between any two items (and the space to the edges of the container) is equal.</LI>
            </UL>
            <H4>Interactive Example: <Code>justify-content</Code></H4>
            <InteractiveFlexContainer
              containerProps={{ justifyContent: 'space-between', flexDirection: 'row' }}
              items={[{ text: '1' }, { text: '2' }, { text: '3' }]}
              height="80px"
            />
            <P className="text-sm text-center text-muted-foreground -mt-2 mb-4">Above: <Code>justify-content: space-between;</Code></P>
            <CodeBlock language="css">{
              `.container {
  display: flex;
  flex-direction: row; /* Main axis is horizontal */
  justify-content: center; /* Items will be centered horizontally */
  border: 1px solid var(--border);
  height: 100px; /* For visualization */
}`
            }</CodeBlock>

            <H3><Code>align-items</Code>: Cross Axis Alignment (Single Line)</H3>
            <P>This property aligns flex items along the <BoldText>cross axis</BoldText> of the current line. The cross axis is always perpendicular to the main axis.</P>
            <ImageContainer src="https://placehold.co/700x350.png" alt="Visual examples of align-items values" width={700} height={350} data-ai-hint="align items flexbox diagrams" caption="Examples of align-items: flex-start, center, stretch, baseline." />
            <UL>
              <LI><Code>stretch</Code> (default): Flex items stretch to fill the container's height (if <Code>flex-direction: row</Code>) or width (if <Code>flex-direction: column</Code>), respecting their min/max sizes.</LI>
              <LI><Code>flex-start</Code>: Items are packed toward the start of the cross axis.</LI>
              <LI><Code>flex-end</Code>: Items are packed toward the end of the cross axis.</LI>
              <LI><Code>center</Code>: Items are centered along the cross axis.</LI>
              <LI><Code>baseline</Code>: Items are aligned such that their text baselines align. This is useful when items have different font sizes.</LI>
            </UL>
            <H4>Interactive Example: <Code>align-items</Code></H4>
            <InteractiveFlexContainer
              containerProps={{ alignItems: 'center', flexDirection: 'row' }}
              items={[
                { text: 'Tall', style: { height: '60px', fontSize: '0.7rem' } },
                { text: 'Short', style: { height: '30px', fontSize: '0.7rem' } },
                { text: 'Medium', style: { height: '45px', fontSize: '0.7rem' } }
              ]}
              height="100px"
            />
            <P className="text-sm text-center text-muted-foreground -mt-2 mb-4">Above: <Code>align-items: center;</Code></P>
            <CodeBlock language="css">{
              `.container {
  display: flex;
  flex-direction: row; /* Cross axis is vertical */
  align-items: center; /* Items will be centered vertically */
  height: 150px; /* Must have a defined height for align-items to work in row direction */
  border: 1px solid var(--border);
}`
            }</CodeBlock>
            <Tip>For <Code>align-items: stretch;</Code> to have an effect, flex items usually must not have a fixed size on the cross axis (e.g., no <Code>height</Code> if <Code>flex-direction: row</Code>).</Tip>

            <H3><Code>align-content</Code>: Cross Axis Alignment (Multiple Lines)</H3>
            <P>This property comes into play when you have <BoldText>multiple lines of flex items</BoldText> (i.e., when <Code>flex-wrap: wrap;</Code> is active and items have wrapped). It aligns these lines within the flex container when there's extra space in the cross-axis, similar to how <Code>justify-content</Code> aligns items on the main axis.</P>
            <P><BoldText>Important:</BoldText> <Code>align-content</Code> has no effect when there's only one line of flex items.</P>
            <ImageContainer src="https://placehold.co/600x400.png" alt="align-content distributing space between multiple lines" width={600} height={400} data-ai-hint="align content flexbox diagrams" caption="align-content distributes space between multiple lines of flex items (e.g., space-between, center)." />
            <UL>
              <LI><Code>stretch</Code> (default): Lines stretch to take up the remaining space.</LI>
              <LI><Code>flex-start</Code>: Lines packed to the start of the container's cross axis.</LI>
              <LI><Code>flex-end</Code>: Lines packed to the end of the container's cross axis.</LI>
              <LI><Code>center</Code>: Lines packed to the center of the container's cross axis.</LI>
              <LI><Code>space-between</Code>: Lines evenly distributed; the first line is at the start, the last one at the end.</LI>
              <LI><Code>space-around</Code>: Lines evenly distributed with equal space around each line.</LI>
              <LI><Code>space-evenly</Code>: Lines are distributed so that the spacing between any two lines (and the space to the edges) is equal.</LI>
            </UL>
            <CodeBlock language="css">{
              `/* Example for align-content */
.container-multi-line {
  display: flex;
  flex-wrap: wrap; /* Crucial for align-content */
  height: 300px;   /* Must have enough height to see line distribution */
  align-content: space-around; /* Distributes space around the lines of items */
  border: 1px solid var(--border);
}

.container-multi-line .item {
  width: 80px; /* Example width to force wrapping */
  height: 50px; /* Example height */
  background-color: hsl(var(--secondary)/0.5);
  border: 1px solid hsl(var(--secondary));
  margin: 5px;
}`
            }</CodeBlock>
            <P>Mastering these three alignment properties (<Code>justify-content</Code>, <Code>align-items</Code>, and <Code>align-content</Code>) is the key to unlocking truly flexible and precise layouts with Flexbox. Don't hesitate to experiment with different values in a code editor to see their effects firsthand!</P>
          </>
        ),
      },
      {
        id: "examples",
        title: "Practical Examples",
        content: (
          <>
            <P>Theory is great, but Flexbox truly comes alive when you see it in action. Let's walk through a few common UI patterns and see how Flexbox makes them straightforward to implement.</P>

            <H3>Example 1: Perfect Centering</H3>
            <P>A classic challenge: centering an element both horizontally and vertically within its parent. Flexbox makes this trivial.</P>
            <div className="my-6 p-4 border rounded-lg bg-background shadow-md">
              <h4 className="text-center text-sm font-medium mb-2 text-muted-foreground">Live Preview: Perfectly Centered</h4>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px', border: '1px dashed hsl(var(--border))', backgroundColor: 'hsl(var(--muted)/0.5)', borderRadius: 'var(--radius)' }}>
                <div style={{ padding: '20px', backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))', borderRadius: 'var(--radius)', boxShadow: '0 4px 12px hsla(var(--foreground)/0.1)' }}>Centered Box</div>
              </div>
            </div>
            <CodeBlock language="html">{
              `<!-- HTML Structure -->
<div class="parent-container">
  <div class="child-element">Centered Box</div>
</div>`
            }</CodeBlock>
            <CodeBlock language="css">{
              `/* CSS for Perfect Centering */
.parent-container {
  display: flex;
  justify-content: center; /* Centers horizontally (along main axis by default) */
  align-items: center;    /* Centers vertically (along cross axis by default) */

  height: 200px;          /* Parent needs a defined height for vertical centering */
  border: 1px solid #ccc;
  background-color: #f0f0f0;
}

.child-element {
  padding: 20px;
  background-color: dodgerblue;
  color: white;
  border-radius: 5px;
}`
            }</CodeBlock>
            <P>With just three CSS properties on the parent, the child is perfectly centered. No more complex margin calculations or absolute positioning tricks!</P>

            <H3>Example 2: Responsive Navigation Bar</H3>
            <P>Creating a navigation bar where the logo is on the left and navigation links are grouped to the right. This pattern is very common.</P>
            <div className="my-6 p-4 border rounded-lg bg-background shadow-md">
              <h4 className="text-center text-sm font-medium mb-2 text-muted-foreground">Live Preview: Navigation Bar</h4>
              <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'hsl(var(--card))', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))' }}>
                <div style={{ fontWeight: 'bold', color: 'hsl(var(--primary))', fontSize: '1.2rem' }}>Logo.</div>
                <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
                  <li><a href="#" style={{ textDecoration: 'none', color: 'hsl(var(--foreground))', padding: '0.5rem' }}>Home</a></li>
                  <li><a href="#" style={{ textDecoration: 'none', color: 'hsl(var(--foreground))', padding: '0.5rem' }}>About</a></li>
                  <li><a href="#" style={{ textDecoration: 'none', color: 'hsl(var(--foreground))', padding: '0.5rem' }}>Services</a></li>
                  <li><a href="#" style={{ padding: '0.5rem 1rem', textDecoration: 'none', backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderRadius: 'calc(var(--radius) - 4px)' }}>Contact</a></li>
                </ul>
              </nav>
            </div>
            <CodeBlock language="html">{
              `<!-- HTML Structure -->
<nav class="navbar">
  <div class="logo">Logo.</div>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#" class="nav-cta">Contact</a></li>
  </ul>
</nav>`
            }</CodeBlock>
            <CodeBlock language="css">{
              `/* CSS for Navigation Bar */
.navbar {
  display: flex;
  justify-content: space-between; /* Pushes logo to left, links to right */
  align-items: center;           /* Vertically aligns items in the center */
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  color: #2563eb; /* Primary color */
}

.nav-links {
  display: flex; /* Makes <li> items flex items within the <ul> */
  align-items: center; /* Align link items vertically */
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem; /* Space between link items */
}

.nav-links a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem;
  border-radius: 4px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.nav-links a:not(.nav-cta):hover {
  color: #2563eb;
}

.nav-links .nav-cta {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
}
.nav-links .nav-cta:hover {
  background-color: #1d4ed8;
}`
            }</CodeBlock>
            <P><Code>justify-content: space-between;</Code> on the main <Code>nav</Code> element does the heavy lifting, pushing the logo and the `ul` to opposite ends. The `ul` itself is also a flex container to arrange its `li` items.</P>

            <H3>Example 3: Card Layout with Footer</H3>
            <P>Often, you need a card component where the main content takes up available space, and a footer sticks to the bottom, regardless of content height.</P>
            <div className="my-6 p-4 border rounded-lg bg-background shadow-md">
              <h4 className="text-center text-sm font-medium mb-2 text-muted-foreground">Live Preview: Card with Sticky Footer</h4>
              <div style={{ display: 'flex', flexDirection: 'column', width: '280px', height: '350px', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', backgroundColor: 'hsl(var(--card))', boxShadow: '0 4px 12px hsla(var(--foreground)/0.08)', overflow: 'hidden' }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>
                  <h5 style={{ margin: 0, fontWeight: '600', color: 'hsl(var(--card-foreground))' }}>Card Title</h5>
                </div>
                <div style={{ padding: '1rem', flexGrow: 1, color: 'hsl(var(--card-foreground))', fontSize: '0.9rem', overflowY: 'auto' }}>
                  <p>This is the main content of the card. If it's short, the footer still stays at the bottom.</p>
                  <p>If the content is long enough to scroll, it will, and the footer remains fixed below it.</p>
                </div>
                <div style={{ padding: '1rem', borderTop: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--muted)/0.5)' }}>
                  <button style={{ width: '100%', padding: '0.5rem', border: 'none', backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderRadius: 'calc(var(--radius) - 4px)', cursor: 'pointer' }}>Action</button>
                </div>
              </div>
            </div>

            <CodeBlock language="html">{
              `<!-- HTML Structure -->
<div class="card">
  <div class="card-header">Card Title</div>
  <div class="card-content">
    <p>Main content of the card...</p>
  </div>
  <div class="card-footer">
    <button>Action</button>
  </div>
</div>`
            }</CodeBlock>
            <CodeBlock language="css">{
              `/* CSS for Card with Sticky Footer */
.card {
  display: flex;
  flex-direction: column; /* Stack header, content, and footer vertically */
  width: 300px;
  height: 400px; /* Card needs a defined height for this to work well */
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  overflow: hidden; /* In case content is too long */
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.card-content {
  padding: 1rem;
  flex-grow: 1; /* This is the magic! Content area takes available space */
  overflow-y: auto; /* Allow content to scroll if it's too long */
}

.card-footer {
  padding: 1rem;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
}

.card-footer button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.card-footer button:hover {
  background-color: #0056b3;
}`
            }</CodeBlock>
            <P>By setting <Code>flex-direction: column</Code> on the card and <Code>flex-grow: 1</Code> on the content area, the content expands to fill any available vertical space, pushing the footer to the bottom.</P>
            <Tip>These examples are just scratching the surface. Flexbox is incredibly versatile. The best way to learn is to build! Try recreating UI components you see on websites using Flexbox.</Tip>
          </>
        ),
      },
    ],
  },
  {
    slug: "grid", title: "Mastering CSS Grid Systems", description: "Learn two-dimensional layouts for complex designs.", icon: ListChecks,
    chapters: [
      {
        id: "grid-intro",
        title: "Introduction to CSS Grid",
        content: (
          <>
            <P>CSS Grid Layout is a powerful two-dimensional layout system for the web. Unlike Flexbox, which is primarily for one-dimensional layouts (rows OR columns), Grid excels at arranging content in both rows AND columns simultaneously. This makes it ideal for overall page layouts, complex component structures, and any design requiring precise control over a grid.</P>
            <ImageContainer src="https://placehold.co/600x350.png" alt="Diagram showing a grid container with rows and columns" width={600} height={350} data-ai-hint="CSS Grid basic diagram" caption="A CSS Grid container manages items in a two-dimensional grid." />
            <H3>Key Concepts of CSS Grid</H3>
            <UL>
              <LI><BoldText>Grid Container:</BoldText> The parent element on which you apply <Code>display: grid;</Code> or <Code>display: inline-grid;</Code>.</LI>
              <LI><BoldText>Grid Items:</BoldText> The direct children of the grid container. They automatically become grid items and can be placed within the grid.</LI>
              <LI><BoldText>Grid Lines:</BoldText> The dividing lines that make up the structure of the grid. They can be horizontal or vertical.</LI>
              <LI><BoldText>Grid Tracks:</BoldText> The space between two adjacent grid lines. These are your columns or rows.</LI>
              <LI><BoldText>Grid Cells:</BoldText> The smallest unit of a grid, formed by the intersection of a row and a column track.</LI>
              <LI><BoldText>Grid Areas:</BoldText> A rectangular space defined by one or more grid cells, potentially spanning multiple rows or columns. Items can be placed into these named areas.</LI>
            </UL>
            <CodeBlock language="css">{
              `/* To make an element a grid container */
.grid-container {
  display: grid;

  /* Define columns: 3 columns, first 1fr, second 2fr, third 1fr */
  grid-template-columns: 1fr 2fr 1fr;

  /* Define rows: 2 rows, first 100px high, second auto height */
  grid-template-rows: 100px auto;

  /* Define gap between grid cells */
  gap: 10px; /* shorthand for row-gap and column-gap */
}`
            }</CodeBlock>
            <P>The <Code>fr</Code> unit (fractional unit) is commonly used in Grid to represent a fraction of the available space in the grid container. This makes creating flexible and responsive grids very intuitive.</P>
            <Tip>Grid and Flexbox are not mutually exclusive! They are often used together. Grid for the overall page layout, and Flexbox for aligning items within a grid cell or for smaller component layouts.</Tip>
          </>
        )
      },
      {
        id: "grid-tracks",
        title: "Defining Grid Tracks",
        content: (
          <>
            <P>Defining the structure of your grid involves specifying the size and number of your columns and rows. This is done using <Code>grid-template-columns</Code> and <Code>grid-template-rows</Code> properties on the grid container.</P>
            <H3><Code>grid-template-columns</Code> and <Code>grid-template-rows</Code></H3>
            <P>These properties accept a space-separated list of track sizes. You can use various units:</P>
            <UL>
              <LI><BoldText>Length units:</BoldText> <Code>px</Code>, <Code>em</Code>, <Code>rem</Code>, etc. (e.g., <Code>100px 200px 50px</Code> for three columns).</LI>
              <LI><BoldText>Percentage units:</BoldText> <Code>%</Code> (e.g., <Code>25% 50% 25%</Code>).</LI>
              <LI><BoldText><Code>fr</Code> unit:</BoldText> Represents a fraction of the available space in the grid container after accounting for fixed-size tracks. (e.g., <Code>1fr 2fr 1fr</Code> means the second column will be twice as wide as the first and third).</LI>
              <LI><BoldText><Code>auto</Code> keyword:</BoldText> The track will be sized based on the content of its items.</LI>
              <LI><BoldText><Code>minmax()</Code> function:</BoldText> Defines a size range, greater than or equal to min and less than or equal to max (e.g., <Code>minmax(100px, 1fr)</Code> means the track will be at least 100px but can grow to take 1fr of space).</LI>
              <LI><BoldText><Code>repeat()</Code> notation:</BoldText> Useful for defining multiple tracks of the same size (e.g., <Code>repeat(3, 1fr)</Code> is the same as <Code>1fr 1fr 1fr</Code>).</LI>
            </UL>
            <ImageContainer src="https://placehold.co/700x300.png" alt="CSS Grid track sizing examples" width={700} height={300} data-ai-hint="CSS Grid track sizing units" caption="Various ways to define column and row sizes using different units." />
            <CodeBlock language="css">{
              `.container {
  display: grid;
  /* 3 columns: 1st fixed, 2nd takes remaining space, 3rd auto-sized */
  grid-template-columns: 150px 1fr auto;

  /* 2 rows: both auto-sized based on content */
  grid-template-rows: auto auto;

  /* Using repeat() and minmax() for responsive columns */
  /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
}`
            }</CodeBlock>
            <H3>Grid Gaps</H3>
            <P>You can define spacing between grid tracks using:</P>
            <UL>
              <LI><Code>column-gap</Code>: Specifies the gap between columns.</LI>
              <LI><Code>row-gap</Code>: Specifies the gap between rows.</LI>
              <LI><Code>gap</Code>: A shorthand for <Code>row-gap column-gap</Code>. If only one value is provided, it applies to both row and column gaps.</LI>
            </UL>
            <ImageContainer src="https://placehold.co/500x250.png" alt="CSS Grid with gaps between tracks" width={500} height={250} data-ai-hint="CSS Grid gap property" caption="Illustrating row-gap, column-gap, and the shorthand gap property." />
            <CodeBlock language="css">{
              `.container-with-gaps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 100px);

  /* 20px gap between rows, 15px gap between columns */
  /* row-gap: 20px; */
  /* column-gap: 15px; */

  gap: 20px 15px; /* shorthand: row-gap column-gap */
  /* gap: 10px; */ /* If only one value, applies to both */
}`
            }</CodeBlock>
            <Tip>The <Code>fr</Code> unit is incredibly powerful for creating fluid layouts. It distributes space *after* accounting for gaps and fixed-size tracks.</Tip>
          </>
        )
      },
      {
        id: "grid-placement",
        title: "Placing Items in the Grid",
        content: (
          <>
            <P>Once you've defined your grid structure, you need to place items into it. Grid offers several ways to do this, from automatic placement to explicit positioning using grid lines or named areas.</P>
            <H3>Line-based Placement</H3>
            <P>You can position items by specifying the grid lines they should start and end on. Grid lines are numbered automatically, starting from 1.</P>
            <UL>
              <LI><Code>grid-column-start</Code>: Defines the starting column line.</LI>
              <LI><Code>grid-column-end</Code>: Defines the ending column line.</LI>
              <LI><Code>grid-row-start</Code>: Defines the starting row line.</LI>
              <LI><Code>grid-row-end</Code>: Defines the ending row line.</LI>
            </UL>
            <P>Shorthands:</P>
            <UL>
              <LI><Code>grid-column: start-line / end-line;</Code></LI>
              <LI><Code>grid-row: start-line / end-line;</Code></LI>
              <LI><Code>grid-area: row-start / column-start / row-end / column-end;</Code> (a more general shorthand)</LI>
            </UL>
            <ImageContainer src="https://placehold.co/600x400.png" alt="Item spanning multiple grid cells using line numbers" width={600} height={400} data-ai-hint="CSS Grid line placement" caption="An item spanning from column line 1 to 3, and row line 1 to 2." />
            <CodeBlock language="css">{
              `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 100px);
  gap: 10px;
}

.item-1 {
  /* Start at column line 1, end at column line 3 (spans 2 columns) */
  grid-column-start: 1;
  grid-column-end: 3;
  /* Equivalent: grid-column: 1 / 3; */

  /* Start at row line 1, end at row line 2 (spans 1 row) */
  grid-row-start: 1;
  grid-row-end: 2;
  /* Equivalent: grid-row: 1 / 2; */

  background-color: hsl(var(--accent)/0.7);
}

.item-2 {
  /* Spanning using 'span' keyword */
  grid-column: 2 / span 2; /* Start at col 2, span 2 columns */
  grid-row: 2 / span 1;    /* Start at row 2, span 1 row */
  background-color: hsl(var(--primary)/0.7);
}`
            }</CodeBlock>
            <P>You can also use the <Code>span</Code> keyword to specify how many tracks an item should span, e.g., <Code>grid-column: 1 / span 2;</Code>.</P>

            <H3>Named Grid Lines</H3>
            <P>You can name your grid lines in <Code>grid-template-columns</Code> and <Code>grid-template-rows</Code> for more semantic placement.</P>
            <CodeBlock language="css">{
              `.container {
  display: grid;
  grid-template-columns: [main-start] 1fr [content-start] 2fr [content-end] 1fr [main-end];
  grid-template-rows: [header-start] auto [header-end content-start] 1fr [content-end footer-start] auto [footer-end];
}
.header {
  grid-column: main-start / main-end; /* Span all columns */
  grid-row: header-start / header-end;
}
.content {
  grid-column: content-start / content-end;
  grid-row: content-start / content-end;
}`
            }</CodeBlock>
            <P>We'll explore an even more powerful way to name regions in the next chapter: <BoldText>Grid Template Areas</BoldText>.</P>
            <Tip>Negative line numbers can be used to count from the end of the grid. For example, <Code>-1</Code> refers to the last explicit grid line.</Tip>
          </>
        )
      },
      {
        id: "grid-areas",
        title: "Defining Grid Areas",
        content: (
          <>
            <P><Code>grid-template-areas</Code> provides a visual and intuitive way to define the layout of a grid container. You can name different sections of your layout and then assign grid items to these named areas.</P>
            <H3>Using <Code>grid-template-areas</Code></H3>
            <P>First, you define a template by providing strings representing the rows of your grid. Each string represents a row, and the words within the string represent the named areas in that row's columns.</P>
            <UL>
              <LI>A period (<Code>.</Code>) signifies an empty cell.</LI>
              <LI>Repeating a name horizontally or vertically makes that area span across those cells.</LI>
              <LI>All rows must have the same number of columns in the template definition.</LI>
            </UL>
            <ImageContainer src="https://placehold.co/600x400.png" alt="CSS Grid Template Areas visualized" width={600} height={400} data-ai-hint="CSS Grid areas diagram" caption="A common webpage layout defined using grid-template-areas." />
            <CodeBlock language="css">{
              `/* Grid Container */
.site-layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr; /* Define column structure */
  grid-template-rows: auto 1fr auto;   /* Define row structure */
  gap: 15px;
  min-height: 400px; /* For visualization */

  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
}

/* Grid Items */
.site-header { grid-area: header; background-color: hsl(var(--primary)/0.3); }
.site-nav    { grid-area: nav;    background-color: hsl(var(--accent)/0.3); }
.site-main   { grid-area: main;   background-color: hsl(var(--secondary)/0.3); }
.site-aside  { grid-area: aside;  background-color: hsl(var(--muted)/0.5); }
.site-footer { grid-area: footer; background-color: hsl(var(--primary)/0.2); }`
            }</CodeBlock>
            <P>Then, you assign individual grid items to these named areas using the <Code>grid-area</Code> property on the item itself:</P>
            <CodeBlock language="css">{
              `.item-header {
  grid-area: header;
}
.item-sidebar {
  grid-area: nav; /* Assuming 'nav' was defined in grid-template-areas */
}`
            }</CodeBlock>
            <H3>Advantages of Grid Template Areas</H3>
            <UL>
              <LI><BoldText>Readability:</BoldText> The layout structure is very clear directly in the CSS.</LI>
              <LI><BoldText>Maintainability:</BoldText> It's easier to visualize and modify the layout.</LI>
              <LI><BoldText>Responsiveness:</BoldText> You can redefine <Code>grid-template-areas</Code> within media queries to completely change the layout for different screen sizes without altering item placement logic heavily.</LI>
            </UL>
            <Tip>When using <Code>grid-template-areas</Code>, the number of columns defined implicitly by your area strings must match the number of columns defined by <Code>grid-template-columns</Code> (if explicitly set).</Tip>
          </>
        )
      },
      {
        id: "grid-alignment",
        title: "Aligning Items in Grid",
        content: (
          <>
            <P>Similar to Flexbox, CSS Grid provides powerful alignment capabilities for both the grid items within their cells/areas and for the grid tracks themselves within the container.</P>
            <H3>Aligning Grid Items (<Code>justify-items</Code> & <Code>align-items</Code>)</H3>
            <P>These properties are set on the <BoldText>grid container</BoldText> and define the default alignment for all items within their respective grid cells or areas.</P>
            <UL>
              <LI><Code>justify-items</Code>: Aligns items along the inline (row) axis within their cell. Values: <Code>start</Code>, <Code>end</Code>, <Code>center</Code>, <Code>stretch</Code> (default).</LI>
              <LI><Code>align-items</Code>: Aligns items along the block (column) axis within their cell. Values: <Code>start</Code>, <Code>end</Code>, <Code>center</Code>, <Code>stretch</Code> (default).</LI>
            </UL>
            <ImageContainer src="https://placehold.co/600x300.png" alt="justify-items and align-items example" width={600} height={300} data-ai-hint="CSS Grid item alignment" caption="justify-items controls horizontal alignment, align-items controls vertical alignment within cells." />
            <CodeBlock language="css">{
              `.container {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  grid-template-rows: repeat(2, 100px);
  border: 1px solid var(--border);

  justify-items: center; /* Center all items horizontally in their cells */
  align-items: end;    /* Align all items to the bottom of their cells */
}`
            }</CodeBlock>

            <H3>Aligning Individual Items (<Code>justify-self</Code> & <Code>align-self</Code>)</H3>
            <P>These properties are set on <BoldText>individual grid items</BoldText> to override the default alignment set by <Code>justify-items</Code> and <Code>align-items</Code> on the container.</P>
            <UL>
              <LI><Code>justify-self</Code>: Aligns a specific item along the inline (row) axis. Values: <Code>start</Code>, <Code>end</Code>, <Code>center</Code>, <Code>stretch</Code>.</LI>
              <LI><Code>align-self</Code>: Aligns a specific item along the block (column) axis. Values: <Code>start</Code>, <Code>end</Code>, <Code>center</Code>, <Code>stretch</Code>.</LI>
            </UL>
            <CodeBlock language="css">{
              `.item-special {
  justify-self: start;  /* Override container's justify-items for this item */
  align-self: stretch; /* Override container's align-items for this item */
}`
            }</CodeBlock>

            <H3>Aligning the Grid Tracks (<Code>justify-content</Code> & <Code>align-content</Code>)</H3>
            <P>When the total size of your grid tracks is smaller than the grid container, you can use <Code>justify-content</Code> and <Code>align-content</Code> to distribute the tracks themselves within the container. These properties work very similarly to their Flexbox counterparts.</P>
            <UL>
              <LI><Code>justify-content</Code>: Distributes grid tracks along the inline (row) axis if the sum of column widths is less than the container width. Values: <Code>start</Code>, <Code>end</Code>, <Code>center</Code>, <Code>space-around</Code>, <Code>space-between</Code>, <Code>space-evenly</Code>.</LI>
              <LI><Code>align-content</Code>: Distributes grid tracks along the block (column) axis if the sum of row heights is less than the container height. Values are the same as <Code>justify-content</Code>.</LI>
            </UL>
            <ImageContainer src="https://placehold.co/700x350.png" alt="justify-content and align-content in CSS Grid" width={700} height={350} data-ai-hint="CSS Grid content alignment" caption="Distributing grid tracks within the container when there's extra space." />
            <CodeBlock language="css">{
              `.container {
  display: grid;
  width: 600px;
  height: 400px;
  grid-template-columns: repeat(2, 100px); /* Total width 200px + gap */
  grid-template-rows: repeat(2, 50px);    /* Total height 100px + gap */
  gap: 10px;
  border: 1px solid var(--border);

  justify-content: center; /* Center the 200px wide grid horizontally in 600px */
  align-content: space-around; /* Distribute the 100px high grid vertically in 400px */
}`
            }</CodeBlock>
            <Tip>Understanding the difference between aligning *items within cells* (<Code>*-items</Code>, <Code>*-self</Code>) and aligning *the grid itself within the container* (<Code>*-content</Code>) is crucial for mastering Grid layout.</Tip>
          </>
        )
      },
    ]
  },
  {
    slug: "animations", title: "CSS Animations & Transitions", description: "Bring your UIs to life with smooth animations.", icon: Wind,
    chapters: [
      {
        id: "transitions-intro",
        title: "Introduction to CSS Transitions",
        content: (
          <>
            <P>CSS Transitions allow you to create smooth animations between different states of an element. Instead of property changes happening instantly, transitions make them occur over a specified duration, creating a more polished and engaging user experience.</P>
            <ImageContainer src="https://placehold.co/500x250.png" alt="Element transitioning from one state to another" width={500} height={250} data-ai-hint="CSS transition example animation" caption="A box smoothly changing its background color and size on hover." />
            <H3>How Transitions Work</H3>
            <P>Transitions are typically triggered by changes in an element's state, such as <Code>:hover</Code>, <Code>:focus</Code>, <Code>:active</Code>, or when a class is added/removed via JavaScript.</P>
            <P>The core properties for defining transitions are:</P>
            <UL>
              <LI><BoldText><Code>transition-property</Code>:</BoldText> Specifies the CSS property(s) to transition. You can list multiple properties (e.g., <Code>background-color, transform</Code>) or use <Code>all</Code> to transition all animatable properties.</LI>
              <LI><BoldText><Code>transition-duration</Code>:</BoldText> Defines how long the transition should take, in seconds (<Code>s</Code>) or milliseconds (<Code>ms</Code>).</LI>
              <LI><BoldText><Code>transition-timing-function</Code>:</BoldText> Describes the acceleration curve of the transition. Common values include <Code>ease</Code> (default), <Code>linear</Code>, <Code>ease-in</Code>, <Code>ease-out</Code>, <Code>ease-in-out</Code>, and <Code>cubic-bezier()</Code> for custom curves.</LI>
              <LI><BoldText><Code>transition-delay</Code>:</BoldText> Specifies a delay before the transition starts.</LI>
            </UL>
            <H3>Shorthand <Code>transition</Code> Property</H3>
            <P>You can combine these properties using the shorthand <Code>transition</Code> property. The order is generally: <Code>property duration timing-function delay</Code>.</P>
            <CodeBlock language="css">{
              `/* Example of a button transitioning its background color and transform */
.my-button {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  /* Define the transition */
  /* transition-property: background-color, transform; */
  /* transition-duration: 0.3s, 0.2s; */
  /* transition-timing-function: ease-out; */
  /* transition-delay: 0s; */

  /* Shorthand: transition for background-color and transform */
  transition: background-color 0.3s ease-out, transform 0.2s ease-in-out;
  /* Or transition all properties: */
  /* transition: all 0.3s ease-out; */
}

.my-button:hover {
  background-color: hsl(var(--accent));
  transform: translateY(-2px) scale(1.05);
}`
            }</CodeBlock>
            <P>In this example, when you hover over the button, its <Code>background-color</Code> will smoothly change over 0.3 seconds, and its <Code>transform</Code> (moving up and scaling) will transition over 0.2 seconds.</P>
            <Tip>Not all CSS properties are animatable. Properties like <Code>display</Code> or <Code>position</Code> (when changing values like <Code>static</Code> to <Code>absolute</Code>) generally cannot be transitioned smoothly. Refer to MDN documentation for a list of animatable properties.</Tip>
          </>
        )
      },
      {
        id: "animations-keyframes",
        title: "Keyframes & CSS Animations",
        content: (
          <>
            <P>While transitions are great for simple state changes, CSS Animations offer more control for complex, multi-step animations. Animations are defined using <Code>@keyframes</Code> rules and then applied to elements using animation properties.</P>
            <H3>Defining <Code>@keyframes</Code></H3>
            <P>A <Code>@keyframes</Code> rule defines the stages of an animation sequence. You specify CSS styles at different points (keyframes) during the animation. Keyframes can be defined using percentages (from <Code>0%</Code> to <Code>100%</Code>) or the keywords <Code>from</Code> (equivalent to <Code>0%</Code>) and <Code>to</Code> (equivalent to <Code>100%</Code>).</P>
            <ImageContainer src="https://placehold.co/600x300.png" alt="Timeline showing keyframes in an animation" width={600} height={300} data-ai-hint="CSS keyframes animation timeline" caption="An animation sequence defined with @keyframes, showing styles at 0%, 50%, and 100%." />
            <CodeBlock language="css">{
              `/* Define a simple fade-in and move-up animation */
@keyframes fadeInMoveUp {
  from { /* 0% */
    opacity: 0;
    transform: translateY(20px);
  }
  to { /* 100% */
    opacity: 1;
    transform: translateY(0);
  }
}

/* Define a more complex pulsing animation */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}`
            }</CodeBlock>
            <H3>Applying Animations</H3>
            <P>Once <Code>@keyframes</Code> are defined, you apply them to an element using animation properties:</P>
            <UL>
              <LI><BoldText><Code>animation-name</Code>:</BoldText> Specifies the name of the <Code>@keyframes</Code> rule to apply.</LI>
              <LI><BoldText><Code>animation-duration</Code>:</BoldText> The length of time one cycle of the animation takes.</LI>
              <LI><BoldText><Code>animation-timing-function</Code>:</BoldText> The acceleration curve (same values as transitions).</LI>
              <LI><BoldText><Code>animation-delay</Code>:</BoldText> Delay before the animation starts.</LI>
              <LI><BoldText><Code>animation-iteration-count</Code>:</BoldText> How many times the animation should repeat (e.g., <Code>3</Code>, <Code>infinite</Code>).</LI>
              <LI><BoldText><Code>animation-direction</Code>:</BoldText> Whether the animation should play forwards, backwards, or alternate (e.g., <Code>normal</Code>, <Code>reverse</Code>, <Code>alternate</Code>, <Code>alternate-reverse</Code>).</LI>
              <LI><BoldText><Code>animation-fill-mode</Code>:</BoldText> Specifies the styles applied to the element before the animation starts and after it ends (e.g., <Code>none</Code>, <Code>forwards</Code>, <Code>backwards</Code>, <Code>both</Code>).</LI>
              <LI><BoldText><Code>animation-play-state</Code>:</BoldText> Allows pausing and resuming an animation (e.g., <Code>running</Code>, <Code>paused</Code>).</LI>
            </UL>
            <H3>Shorthand <Code>animation</Code> Property</H3>
            <P>Similar to transitions, there's an <Code>animation</Code> shorthand. A common order is: <Code>name duration timing-function delay iteration-count direction fill-mode play-state</Code>.</P>
            <CodeBlock language="css">{
              `.element-to-animate {
  /* Apply the fadeInMoveUp animation */
  /* animation-name: fadeInMoveUp; */
  /* animation-duration: 1s; */
  /* animation-timing-function: ease-out; */
  /* animation-fill-mode: forwards; */ /* Keeps the 'to' state styles after animation ends */

  /* Shorthand */
  animation: fadeInMoveUp 1s ease-out forwards;
}

.pulsing-element {
  animation: pulse 1.5s ease-in-out infinite; /* Loop the pulse animation */
}`
            }</CodeBlock>
            <Tip>Use animations for more complex sequences that aren't just simple state-to-state changes. Transitions are often better for hover effects or toggling UI elements.</Tip>
          </>
        )
      },
      {
        id: "animations-performance",
        title: "Animation Performance & Best Practices",
        content: (
          <>
            <P>While CSS animations and transitions are powerful, it's important to use them wisely to ensure smooth performance and avoid janky experiences, especially on less powerful devices.</P>
            <H3>Understanding the Browser's Rendering Pipeline</H3>
            <P>Browsers typically go through several steps to render changes on a page: Style Calculation, Layout, Paint, and Composite Layers. Some CSS properties are "cheaper" to animate than others because they can be handled primarily by the compositor, bypassing layout and paint recalculations.</P>
            <ImageContainer src="https://placehold.co/700x300.png" alt="Browser rendering pipeline steps" width={700} height={300} data-ai-hint="browser rendering pipeline diagram" caption="Simplified browser rendering pipeline: Style -> Layout -> Paint -> Composite." />
            <H3>Properties to Animate for Smoothness</H3>
            <P>For the smoothest animations, prioritize animating these properties:</P>
            <UL>
              <LI><BoldText><Code>transform</Code>:</BoldText> (e.g., <Code>translate</Code>, <Code>scale</Code>, <Code>rotate</Code>, <Code>skew</Code>). Changes to transform are often handled by the GPU and are very efficient.</LI>
              <LI><BoldText><Code>opacity</Code>:</BoldText> Changing opacity is also usually handled by the compositor and is very performant.</LI>
            </UL>
            <P>Animating properties like <Code>width</Code>, <Code>height</Code>, <Code>margin</Code>, <Code>padding</Code>, <Code>top</Code>, <Code>left</Code>, or <Code>box-shadow</Code> can be more expensive as they often trigger layout recalculations (reflow) and repainting, which can lead to choppiness.</P>
            <CodeBlock language="css">{
              `/* Good: Animating transform and opacity */
.smooth-animation {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.smooth-animation:hover {
  transform: translateX(10px);
  opacity: 0.8;
}

/* Less Performant: Animating width and margin */
.janky-animation {
  width: 100px;
  margin-left: 0;
  transition: width 0.3s ease, margin-left 0.3s ease;
}
.janky-animation:hover {
  width: 150px;
  margin-left: 20px; /* Triggers layout changes */
}`
            }</CodeBlock>
            <H3>Hardware Acceleration</H3>
            <P>Animating <Code>transform</Code> (especially 3D transforms like <Code>translateZ(0)</Code> or <Code>translate3d(0,0,0)</Code>) and <Code>opacity</Code> often promotes the animated element to its own layer, allowing the GPU to handle its compositing. This is known as hardware acceleration.</P>
            <P>The <Code>will-change</Code> property can be used to hint to the browser about properties you intend to animate, allowing it to optimize ahead of time. However, use it sparingly, as overusing it can consume more resources.</P>
            <CodeBlock language="css">{
              `.element-getting-ready-to-animate {
  /* Hint to the browser that transform and opacity will change */
  will-change: transform, opacity;
}

/* A common trick to promote an element to its own layer (use judiciously) */
.force-hardware-acceleration {
  transform: translateZ(0);
}`
            }</CodeBlock>
            <H3>Other Best Practices</H3>
            <UL>
              <LI><BoldText>Keep animations simple and purposeful:</BoldText> Don't over-animate. Animations should enhance UX, not distract.</LI>
              <LI><BoldText>Test on various devices:</BoldText> Performance can vary significantly.</LI>
              <LI><BoldText>Use browser developer tools:</BoldText> Chrome DevTools (Performance and Layers panels) can help identify animation bottlenecks.</LI>
              <LI><BoldText>Respect <Code>prefers-reduced-motion</Code>:</BoldText> Provide alternatives or disable non-essential animations for users who prefer reduced motion.</LI>
            </UL>
            <CodeBlock language="css">{
              `/* Example for prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    transition: none;
  }
}`
            }</CodeBlock>
            <Tip>When striving for smooth animations, think "move and fade" (<Code>transform</Code> and <Code>opacity</Code>) before thinking "resize and reflow."</Tip>
          </>
        )
      }
    ]
  },
  {
    slug: "responsive", title: "Responsive Design Principles", description: "Build websites that adapt to any screen size.", icon: Target,
    chapters: [
      {
        id: "responsive-intro",
        title: "What is Responsive Web Design?",
        content: (
          <>
            <P>Responsive Web Design (RWD) is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. Content, design, and performance are necessary across all devices to ensure usability and satisfaction.</P>
            <ImageContainer src="https://placehold.co/700x300.png" alt="Website layout adapting to desktop, tablet, and mobile screens" width={700} height={300} data-ai-hint="responsive design examples screens" caption="A single website adapting its layout across different screen sizes." />
            <H3>Core Principles of RWD</H3>
            <P>Ethan Marcotte, who coined the term, identified three main technical ingredients:</P>
            <UL>
              <LI><BoldText>Fluid Grids:</BoldText> Using relative units like percentages or <Code>fr</Code> units for layout widths, rather than fixed pixel values. This allows the layout to expand or contract with the screen size.</LI>
              <LI><BoldText>Flexible Images/Media:</BoldText> Ensuring that images, videos, and other media scale within their containing elements, often using <Code>max-width: 100%;</Code> and <Code>height: auto;</Code>.</LI>
              <LI><BoldText>Media Queries:</BoldText> Applying different CSS rules based on the characteristics of the device, such as its width, height, orientation, or resolution.</LI>
            </UL>
            <H3>The Viewport Meta Tag</H3>
            <P>To ensure your responsive design works correctly on mobile devices, you <BoldText>must</BoldText> include the viewport meta tag in the <Code>&lt;head&gt;</Code> of your HTML document. This tag tells the browser how to control the page's dimensions and scaling.</P>
            <CodeBlock language="html">{
              `<!-- Add this to the <head> of your HTML -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">`
            }</CodeBlock>
            <UL>
              <LI><Code>width=device-width</Code>: Sets the width of the viewport to the width of the device's screen.</LI>
              <LI><Code>initial-scale=1.0</Code>: Sets the initial zoom level when the page is first loaded by the browser.</LI>
            </UL>
            <P>Without this tag, mobile browsers often render the page at a typical desktop screen width and then scale it down, making text tiny and requiring users to zoom in.</P>
            <H3>Mobile-First vs. Desktop-First</H3>
            <P>There are two common approaches to designing and coding responsive sites:</P>
            <UL>
              <LI><BoldText>Mobile-First:</BoldText> Start designing and coding for the smallest screen size first, then use media queries to add complexity and adjust the layout for larger screens. This often leads to cleaner, more performant code for mobile devices.</LI>
              <LI><BoldText>Desktop-First (Graceful Degradation):</BoldText> Start with the desktop layout and then use media queries to simplify or adjust the layout for smaller screens. This was more common in the early days of RWD.</LI>
            </UL>
            <P>The mobile-first approach is generally recommended today due to the prevalence of mobile browsing.</P>
            <Tip>Responsive design is not just about screen size; it's about creating the best possible experience for users regardless of their device or context.</Tip>
          </>
        )
      },
      {
        id: "responsive-media-queries",
        title: "Media Queries",
        content: (
          <>
            <P>Media queries are the cornerstone of responsive web design. They allow you to apply specific CSS rules only when certain conditions about the user's device or viewport are met. This enables you to tailor your layout, typography, and other styles for different screen sizes and capabilities.</P>
            <H3>Basic Syntax</H3>
            <P>A media query consists of a media type (optional, defaults to <Code>all</Code>) and one or more expressions involving media features, such as <Code>width</Code>, <Code>height</Code>, or <Code>orientation</Code>.</P>
            <CodeBlock language="css">{
              `/* Basic Media Query Structure */
@media media-type and (media-feature: value) {
  /* CSS rules to apply when the condition is true */
  .selector {
    property: value;
  }
}

/* Example: Change background color for screens wider than 600px */
@media screen and (min-width: 600px) {
  body {
    background-color: lightblue;
  }
}

/* Example: Styles for printing */
@media print {
  body {
    font-family: serif;
    color: black;
  }
  .no-print {
    display: none; /* Hide elements not meant for printing */
  }
}`
            }</CodeBlock>
            <H3>Common Media Features for RWD</H3>
            <UL>
              <LI><BoldText><Code>width</Code> (and <Code>min-width</Code>, <Code>max-width</Code>):</BoldText> Based on the viewport width. This is the most commonly used feature for RWD.</LI>
              <LI><BoldText><Code>height</Code> (and <Code>min-height</Code>, <Code>max-height</Code>):</BoldText> Based on the viewport height.</LI>
              <LI><BoldText><Code>orientation</Code>:</BoldText> <Code>portrait</Code> or <Code>landscape</Code>.</LI>
              <LI><BoldText><Code>aspect-ratio</Code> (and <Code>min-aspect-ratio</Code>, <Code>max-aspect-ratio</Code>):</BoldText> Ratio of viewport width to height.</LI>
              <LI><BoldText><Code>resolution</Code> (and <Code>min-resolution</Code>, <Code>max-resolution</Code>):</BoldText> Pixel density of the output device (e.g., for high-DPI screens like Retina displays).</LI>
            </UL>
            <ImageContainer src="https://placehold.co/700x250.png" alt="Visual breakpoints for media queries" width={700} height={250} data-ai-hint="media query breakpoints responsive" caption="Common breakpoints used in media queries to target different device categories (e.g., mobile, tablet, desktop)." />
            <H3>Logical Operators</H3>
            <P>You can combine multiple media features using logical operators:</P>
            <UL>
              <LI><BoldText><Code>and</Code>:</BoldText> Combines multiple media features. All conditions must be true.</LI>
              <LI><BoldText><Code>not</Code>:</BoldText> Negates a media query. (Use with caution as it can have specificity implications).</LI>
              <LI><BoldText><Code>only</Code>:</BoldText> Prevents older browsers that don't support media queries with media features from applying the styles. It's often used for good measure, e.g., <Code>@media only screen and ...</Code></LI>
              <LI><BoldText>Comma ( <Code>,</Code> ):</BoldText> Acts as an OR operator. If any of the comma-separated queries are true, the styles apply.</LI>
            </UL>
            <CodeBlock language="css">{
              `/* Apply styles if screen is between 600px and 900px wide */
@media (min-width: 600px) and (max-width: 900px) {
  .my-element {
    font-size: 18px;
  }
}

/* Apply styles if screen is less than 600px OR in landscape mode */
@media (max-width: 599px), (orientation: landscape) {
  .sidebar {
    display: none;
  }
}`
            }</CodeBlock>
            <H3>Choosing Breakpoints</H3>
            <P>Breakpoints are the points at which your layout changes. Instead of designing for specific device widths (which are constantly changing), it's better to:</P>
            <UL>
              <LI>Start with your content.</LI>
              <LI>Resize your browser window.</LI>
              <LI>Identify where your content starts to look "broken" or could be improved.</LI>
              <LI>Add a breakpoint at that point to make adjustments.</LI>
            </UL>
            <P>However, common starting points often align with general device categories (e.g., ~320px for small mobile, ~768px for tablets, ~1024px for small desktops).</P>
            <Tip>Use <Code>min-width</Code> for a mobile-first approach (styles apply from that width upwards) and <Code>max-width</Code> for a desktop-first approach (styles apply up to that width). Combining them creates ranges.</Tip>
          </>
        )
      },
      {
        id: "responsive-fluid-units",
        title: "Fluid Layouts & Relative Units",
        content: (
          <>
            <P>A core tenet of responsive web design is the use of fluid layouts, which adapt to the available screen space. This is primarily achieved by using relative units for sizing and spacing elements, rather than fixed pixel values.</P>
            <H3>Why Relative Units?</H3>
            <P>Fixed units like pixels (<Code>px</Code>) create rigid layouts that don't adapt well. If a container is 300px wide, it will always be 300px wide, regardless of whether the screen is 320px or 1200px wide. Relative units, on the other hand, size elements in relation to something else, allowing them to scale.</P>
            <ImageContainer src="https://placehold.co/600x300.png" alt="Comparison of fixed vs. fluid layout" width={600} height={300} data-ai-hint="fluid layout vs fixed layout" caption="A fluid layout (right) adapts to screen size, while a fixed layout (left) may break or cause scrolling." />
            <H3>Common Relative Units</H3>
            <UL>
              <LI><BoldText>Percentages (<Code>%</Code>):</BoldText> Relative to the same property of the parent element (e.g., <Code>width: 50%;</Code> makes an element half the width of its parent). Percentages for <Code>padding</Code> and <Code>margin</Code> are often relative to the *width* of the containing block, which can be tricky for vertical spacing.</LI>
              <LI><BoldText>Viewport Units (<Code>vw</Code>, <Code>vh</Code>, <Code>vmin</Code>, <Code>vmax</Code>):</BoldText>
                <UL>
                  <LI><Code>vw</Code> (Viewport Width): 1vw = 1% of the viewport width.</LI>
                  <LI><Code>vh</Code> (Viewport Height): 1vh = 1% of the viewport height.</LI>
                  <LI><Code>vmin</Code>: 1vmin = 1% of the smaller viewport dimension (width or height).</LI>
                  <LI><Code>vmax</Code>: 1vmax = 1% of the larger viewport dimension.</LI>
                </UL>
                These are excellent for full-screen elements or sizing things relative to the overall screen real estate.
              </LI>
              <LI><BoldText>Font-relative Units (<Code>em</Code>, <Code>rem</Code>):</BoldText>
                <UL>
                  <LI><Code>em</Code>: Relative to the font-size of the element itself (for font-size) or the font-size of the parent element (for other properties like padding, margin, width). Can lead to compounding if nested deeply.</LI>
                  <LI><Code>rem</Code> (Root em): Relative to the font-size of the root (<Code>&lt;html&gt;</Code>) element. This provides a more predictable global sizing unit for typography and spacing, as it doesn't compound.</LI>
                </UL>
                <Code>rem</Code> is generally preferred for consistent scaling of typography and UI elements based on a single root font size.
              </LI>
              <LI><BoldText>Fractional Units (<Code>fr</Code>) in CSS Grid:</BoldText> As covered in the Grid tutorial, <Code>fr</Code> units distribute available space within a grid container, making them inherently fluid.</LI>
            </UL>
            <CodeBlock language="css">{
              `.container {
  width: 80%; /* Takes 80% of its parent's width */
  margin: 0 auto; /* Center the container */
}
.full-height-section {
  height: 100vh; /* Takes the full viewport height */
}
html {
  font-size: 16px; /* Base font size for rem calculations */
}
h1 {
  font-size: 2.5rem; /* 2.5 * 16px = 40px */
  padding: 1rem;     /* 16px padding */
}
.sidebar {
  width: 20em; /* Width relative to its own font-size or parent's font-size */
}`
            }</CodeBlock>
            <H3>Fluid Grids with Flexbox and Grid</H3>
            <P>Both Flexbox and CSS Grid are designed to create fluid layouts naturally.</P>
            <UL>
              <LI><BoldText>Flexbox:</BoldText> Properties like <Code>flex-grow</Code>, <Code>flex-shrink</Code>, and <Code>flex-basis</Code> (especially with <Code>auto</Code> or percentage values) allow flex items to adapt to available space.</LI>
              <LI><BoldText>CSS Grid:</BoldText> The <Code>fr</Code> unit, <Code>auto</Code>, and functions like <Code>repeat(auto-fit, minmax(...))</Code> are fundamental to creating responsive grid structures.</LI>
            </UL>
            <Tip>Combine relative units with media queries for fine-tuned control. For example, you might have a sidebar that is <Code>30%</Code> wide on large screens but <Code>100%</Code> wide (and stacked) on small screens.</Tip>
          </>
        )
      },
      {
        id: "responsive-images",
        title: "Flexible Images & Media",
        content: (
          <>
            <P>Images and other media (like videos or iframes) are crucial parts of web content, but they can easily break responsive layouts if not handled correctly. Flexible media ensures that these elements scale appropriately within their containers.</P>
            <H3>The Basic Technique: <Code>max-width: 100%</Code></H3>
            <P>The most common and straightforward way to make images responsive is to apply the following CSS:</P>
            <CodeBlock language="css">{
              `img, video, iframe {
  max-width: 100%;
  height: auto;
}`
            }</CodeBlock>
            <UL>
              <LI><Code>max-width: 100%;</Code>: Ensures the image will never be wider than its containing element. If the container shrinks, the image shrinks with it.</LI>
              <LI><Code>height: auto;</Code>: Maintains the image's aspect ratio as it scales. If you set a fixed height, the image might get distorted.</LI>
            </UL>
            <ImageContainer src="https://placehold.co/600x300.png" alt="Responsive image scaling within its container" width={600} height={300} data-ai-hint="responsive image scaling" caption="An image scaling down gracefully as its container narrows, thanks to max-width: 100%." />
            <H3>Art Direction with the <Code>&lt;picture&gt;</Code> Element</H3>
            <P>Sometimes, simply scaling an image isn't enough. You might want to show a different crop or an entirely different image for different screen sizes or resolutions. This is known as "art direction." The <Code>&lt;picture&gt;</Code> element allows you to provide multiple sources for an image.</P>
            <CodeBlock language="html">{
              `<picture>
  <source media="(min-width: 900px)" srcset="large-image.jpg">
  <source media="(min-width: 600px)" srcset="medium-image.jpg">
  <img src="small-image.jpg" alt="A descriptive alt text for the image">
</picture>`
            }</CodeBlock>
            <P>The browser will choose the first <Code>&lt;source&gt;</Code> element whose <Code>media</Code> query matches. The <Code>&lt;img&gt;</Code> element is a fallback for browsers that don't support <Code>&lt;picture&gt;</Code> or if no media queries match.</P>

            <H3>Resolution Switching with <Code>srcset</Code> and <Code>sizes</Code></H3>
            <P>To serve different image sizes for different screen resolutions (e.g., for Retina displays) or viewport widths, you can use the <Code>srcset</Code> and <Code>sizes</Code> attributes on the <Code>&lt;img&gt;</Code> tag.</P>
            <CodeBlock language="html">{
              `<!-- Resolution switching for different pixel densities -->
<img srcset="image-1x.jpg 1x, image-2x.jpg 2x, image-3x.jpg 3x"
     src="image-1x.jpg" alt="Description">

<!-- Viewport width-based switching -->
<img srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 500px) 100vw, (max-width: 900px) 50vw, 33vw"
     src="medium.jpg" alt="Description">`
            }</CodeBlock>
            <UL>
              <LI><Code>srcset</Code>: Provides a list of image sources and their intrinsic widths (e.g., <Code>small.jpg 480w</Code>) or pixel density descriptors (e.g., <Code>image-2x.jpg 2x</Code>).</LI>
              <LI><Code>sizes</Code>: Tells the browser how wide the image will be displayed at different viewport widths (using media conditions). This helps the browser pick the most appropriate image from <Code>srcset</Code>.</LI>
            </UL>
            <H3>Responsive Background Images</H3>
            <P>For background images, you can use media queries to serve different images or adjust properties like <Code>background-size</Code> and <Code>background-position</Code>.</P>
            <CodeBlock language="css">{
              `.hero-section {
  background-image: url('small-hero.jpg');
  background-size: cover;
  background-position: center;
}

@media (min-width: 768px) {
  .hero-section {
    background-image: url('large-hero.jpg');
  }
}`
            }</CodeBlock>
            <Tip>Always provide meaningful <Code>alt</Code> text for your images for accessibility. For purely decorative images, an empty <Code>alt=""</Code> is appropriate.</Tip>
          </>
        )
      }
    ]
  },
  {
    slug: "selectors", title: "Advanced Selectors & Specificity", description: "Target elements precisely and manage CSS conflicts.", icon: PaletteIcon,
    chapters: [
      {
        id: "selectors-intro",
        title: "Introduction to CSS Selectors",
        content: (
          <>
            <P>CSS Selectors are patterns that select HTML elements so they can be styled. Mastering selectors is fundamental to writing efficient and maintainable CSS. They allow you to target elements with precision, from simple type selectors to complex combinations.</P>
            <H3>Basic Selector Types</H3>
            <UL>
              <LI><BoldText>Type Selector (or Element Selector):</BoldText> Selects all elements of a given type. Example: <Code>p</Code> selects all <Code>&lt;p&gt;</Code> elements.</LI>
              <LI><BoldText>Class Selector:</BoldText> Selects all elements with a given class attribute. Example: <Code>.my-class</Code> selects all elements with <Code>class="my-class"</Code>.</LI>
              <LI><BoldText>ID Selector:</BoldText> Selects a single element with a given ID attribute. IDs must be unique per page. Example: <Code>#unique-id</Code> selects the element with <Code>id="unique-id"</Code>.</LI>
              <LI><BoldText>Universal Selector (<Code>*</Code>):</BoldText> Selects all elements. Often used in resets or with other selectors.</LI>
              <LI><BoldText>Attribute Selector:</BoldText> Selects elements based on the presence or value of an attribute. We'll cover these in more detail.</LI>
            </UL>
            <ImageContainer src="https://placehold.co/600x250.png" alt="Examples of basic CSS selectors" width={600} height={250} data-ai-hint="CSS selectors basic examples" caption="Visual representation of type, class, and ID selectors targeting HTML elements." />
            <CodeBlock language="css">{
              `/* Type Selector */
p {
  color: blue;
}

/* Class Selector */
.highlight {
  background-color: yellow;
}

/* ID Selector */
#main-header {
  font-size: 2em;
}

/* Universal Selector (use with caution) */
* {
  box-sizing: border-box; /* Common use case */
}`
            }</CodeBlock>
            <H3>Grouping Selectors</H3>
            <P>You can apply the same styles to multiple selectors by grouping them with a comma.</P>
            <CodeBlock language="css">{
              `h1, h2, h3 {
  font-family: 'Arial', sans-serif;
  color: navy;
}`
            }</CodeBlock>
            <P>This chapter serves as a quick review. The following chapters will dive into more advanced selectors like attribute selectors, pseudo-classes, pseudo-elements, and combinators, which give you much finer control over element selection.</P>
            <Tip>While ID selectors are very specific, they are less reusable than class selectors. For general styling, prefer classes. Use IDs for unique page landmarks or JavaScript hooks if necessary.</Tip>
          </>
        )
      },
      {
        id: "selectors-attribute",
        title: "Attribute Selectors",
        content: (
          <>
            <P>Attribute selectors allow you to target elements based on the presence or value of their HTML attributes. This provides a powerful way to select elements without relying solely on classes or IDs.</P>
            <H3>Syntax Overview</H3>
            <UL>
              <LI><Code>[attribute]</Code>: Selects elements that have the specified <Code>attribute</Code>, regardless of its value. <br />Example: <Code>a[target]</Code> selects all <Code>&lt;a&gt;</Code> tags with a <Code>target</Code> attribute.</LI>
              <LI><Code>[attribute="value"]</Code>: Selects elements where <Code>attribute</Code> has an exact value of <Code>"value"</Code>. <br />Example: <Code>input[type="text"]</Code> selects input fields of type text.</LI>
              <LI><Code>[attribute~="value"]</Code>: Selects elements where <Code>attribute</Code>'s value is a space-separated list, and one of those values is exactly <Code>"value"</Code>. <br />Example: <Code>img[class~="icon"]</Code> selects images if "icon" is one of their classes (e.g., <Code>class="image icon featured"</Code>).</LI>
              <LI><Code>[attribute|="value"]</Code>: Selects elements where <Code>attribute</Code>'s value is exactly <Code>"value"</Code> or starts with <Code>"value"</Code> immediately followed by a hyphen (<Code>-</Code>). Often used for language subcodes. <br />Example: <Code>p[lang|="en"]</Code> selects paragraphs with <Code>lang="en"</Code> or <Code>lang="en-US"</Code>.</LI>
              <LI><Code>[attribute^="value"]</Code>: Selects elements where <Code>attribute</Code>'s value <BoldText>starts with</BoldText> <Code>"value"</Code>. <br />Example: <Code>a[href^="https://"]</Code> selects links whose href starts with "https://".</LI>
              <LI><Code>[attribute$="value"]</Code>: Selects elements where <Code>attribute</Code>'s value <BoldText>ends with</BoldText> <Code>"value"</Code>. <br />Example: <Code>a[href$=".pdf"]</Code> selects links whose href ends with ".pdf".</LI>
              <LI><Code>[attribute*="value"]</Code>: Selects elements where <Code>attribute</Code>'s value <BoldText>contains</BoldText> the substring <Code>"value"</Code>. <br />Example: <Code>img[alt*="important"]</Code> selects images whose alt text contains "important".</LI>
            </UL>
            <ImageContainer src="https://placehold.co/700x350.png" alt="Examples of different attribute selectors" width={700} height={350} data-ai-hint="CSS attribute selectors syntax" caption="Demonstrating how different attribute selectors target specific elements." />
            <CodeBlock language="css">{
              `/* Style links that open in a new tab */
a[target="_blank"] {
  background-image: url('external-link-icon.png');
  background-repeat: no-repeat;
  background-position: right center;
  padding-right: 18px;
}

/* Style all disabled input fields */
input[disabled] {
  background-color: #eee;
  opacity: 0.7;
  cursor: not-allowed;
}

/* Style images whose src contains 'thumbnail' */
img[src*="thumbnail"] {
  border: 2px solid blue;
}

/* Add a PDF icon to links ending in .pdf */
a[href$=".pdf"]::before {
  content: "📄 ";
}`
            }</CodeBlock>
            <H3>Case Sensitivity (Optional <Code>i</Code> flag)</H3>
            <P>By default, attribute value matching is case-sensitive. You can add an <Code>i</Code> flag before the closing bracket <Code>]</Code> to make the matching case-insensitive for that specific selector (though browser support might vary for this flag historically, it's well-supported in modern browsers).</P>
            <CodeBlock language="css">{
              `/* Case-insensitive match for type="Text" or "text" or "TEXT" */
input[type="text" i] {
  border-color: green;
}`
            }</CodeBlock>
            <Tip>Attribute selectors are particularly useful for styling form elements, links based on their destinations, or elements with specific data attributes (<Code>data-*</Code>).</Tip>
          </>
        )
      },
      {
        id: "selectors-pseudo-classes",
        title: "Pseudo-classes",
        content: (
          <>
            <P>Pseudo-classes are keywords added to selectors that specify a special state of the selected element(s). They don't select based on the document tree structure like type or attribute selectors, but rather on external factors or states that are not directly present in the HTML source, such as link visitation status, user interaction, or an element's position in a sequence.</P>
            <H3>Common Pseudo-classes</H3>
            <UL>
              <LI><BoldText>Link Pseudo-classes:</BoldText>
                <UL>
                  <LI><Code>:link</Code> - Selects unvisited links.</LI>
                  <LI><Code>:visited</Code> - Selects visited links. (Styling options are limited for privacy reasons).</LI>
                </UL>
              </LI>
              <LI><BoldText>User Action Pseudo-classes:</BoldText>
                <UL>
                  <LI><Code>:hover</Code> - Selects an element when the user mouses over it.</LI>
                  <LI><Code>:active</Code> - Selects an element when it is being activated (e.g., clicked).</LI>
                  <LI><Code>:focus</Code> - Selects an element when it has keyboard focus (e.g., an input field or a link navigated to via Tab).</LI>
                  <LI><Code>:focus-within</Code> - Selects an element if it or any of its descendants has focus.</LI>
                  <LI><Code>:focus-visible</Code> - Selects an element when it has focus and the browser heuristically determines that the focus indicator should be visible (e.g., after tabbing, not after a mouse click on some elements).</LI>
                </UL>
              </LI>
              <LI><BoldText>Input Pseudo-classes (for form elements):</BoldText>
                <UL>
                  <LI><Code>:enabled</Code> - Selects enabled form elements.</LI>
                  <LI><Code>:disabled</Code> - Selects disabled form elements.</LI>
                  <LI><Code>:checked</Code> - Selects checked radio buttons or checkboxes.</LI>
                  <LI><Code>:indeterminate</Code> - Selects checkboxes in an indeterminate state.</LI>
                  <LI><Code>:required</Code> / <Code>:optional</Code> - Selects form elements based on the `required` attribute.</LI>
                  <LI><Code>:valid</Code> / <Code>:invalid</Code> - Selects form elements based on their validation state.</LI>
                  <LI><Code>:in-range</Code> / <Code>:out-of-range</Code> - For inputs with min/max attributes.</LI>
                </UL>
              </LI>
              <LI><BoldText>Structural & Positional Pseudo-classes:</BoldText>
                <UL>
                  <LI><Code>:root</Code> - Selects the root element of the document (usually <Code>&lt;html&gt;</Code>).</LI>
                  <LI><Code>:empty</Code> - Selects elements that have no children (including text nodes).</LI>
                  <LI><Code>:nth-child(n)</Code> - Selects elements based on their position among siblings. <Code>n</Code> can be a number, keyword (<Code>odd</Code>, <Code>even</Code>), or a formula (<Code>2n+1</Code>).</LI>
                  <LI><Code>:nth-last-child(n)</Code> - Same as <Code>:nth-child</Code>, but counts from the last element.</LI>
                  <LI><Code>:first-child</Code> - Selects the first child element among its siblings.</LI>
                  <LI><Code>:last-child</Code> - Selects the last child element among its siblings.</LI>
                  <LI><Code>:only-child</Code> - Selects an element that is the only child of its parent.</LI>
                  <LI><Code>:nth-of-type(n)</Code> - Similar to <Code>:nth-child</Code>, but only considers elements of the same type.</LI>
                  <LI><Code>:first-of-type</Code>, <Code>:last-of-type</Code>, <Code>:only-of-type</Code> - Similar logic for element types.</LI>
                </UL>
              </LI>
              <LI><BoldText>Logical Pseudo-classes:</BoldText>
                <UL>
                  <LI><Code>:not(selector)</Code> - Selects elements that do *not* match the provided selector. Example: <Code>p:not(.special)</Code> selects all paragraphs except those with class "special".</LI>
                  <LI><Code>:is(selector-list)</Code> - Selects any element that matches any of the selectors in the comma-separated list. Useful for grouping. Example: <Code>:is(header, main, footer) p</Code>.</LI>
                  <LI><Code>:where(selector-list)</Code> - Similar to <Code>:is()</Code>, but <Code>:where()</Code> and its arguments do not contribute to the specificity of the selector (always has zero specificity).</LI>
                </UL>
              </LI>
            </UL>
            <ImageContainer src="https://placehold.co/700x400.png" alt="Demonstration of various pseudo-classes" width={700} height={400} data-ai-hint="CSS pseudo classes examples" caption="Examples: :hover changing button style, :nth-child styling table rows, :focus highlighting an input." />
            <CodeBlock language="css">{
              `/* Style links */
a:link { color: blue; }
a:visited { color: purple; } /* Limited styling for privacy */
a:hover { text-decoration: underline; }
a:active { color: red; }

/* Style focused input fields */
input:focus {
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 2px hsl(var(--ring));
}

/* Style every odd table row */
tr:nth-child(odd) {
  background-color: #f9f9f9;
}

/* Style paragraphs that are not the first child */
p:not(:first-child) {
  margin-top: 1em;
}`
            }</CodeBlock>
            <Tip>The order of link pseudo-classes (LVHA-rule: <Code>:link</Code>, <Code>:visited</Code>, <Code>:hover</Code>, <Code>:active</Code>) can be important due to specificity. A common mnemonic is "LoVe HAte".</Tip>
          </>
        )
      },
      {
        id: "selectors-pseudo-elements",
        title: "Pseudo-elements",
        content: (
          <>
            <P>Pseudo-elements are keywords added to a selector that let you style a specific part of the selected element(s). They behave as if you've added a new element to the DOM, but they are purely for styling purposes and don't actually modify the document structure.</P>
            <P>Pseudo-elements are denoted by a double colon (<Code>::</Code>) prefix (e.g., <Code>::before</Code>), although a single colon (<Code>:</Code>) is accepted by browsers for backward compatibility with older pseudo-elements from CSS2.</P>
            <H3>Common Pseudo-elements</H3>
            <UL>
              <LI><BoldText><Code>::before</Code> and <Code>::after</Code>:</BoldText> Create a pseudo-element that is the first or last child of the selected element, respectively. They are often used to insert cosmetic content (using the <Code>content</Code> property) or for decorative styling. The <Code>content</Code> property is required for them to be rendered.</LI>
              <LI><BoldText><Code>::first-letter</Code>:</BoldText> Selects the first letter of the first line of a block-level element.</LI>
              <LI><BoldText><Code>::first-line</Code>:</BoldText> Selects the first line of a block-level element.</LI>
              <LI><BoldText><Code>::selection</Code>:</BoldText> Styles the portion of a document that has been highlighted by the user (e.g., by clicking and dragging the mouse across text).</LI>
              <LI><BoldText><Code>::placeholder</Code>:</BoldText> Styles the placeholder text in an input or textarea element.</LI>
              <LI><BoldText><Code>::marker</Code>:</BoldText> Styles the marker box of a list item (e.g., the bullet or number).</LI>
            </UL>
            <ImageContainer src="https://placehold.co/600x350.png" alt="Examples of pseudo-elements like ::before, ::first-letter" width={600} height={350} data-ai-hint="CSS pseudo elements examples" caption="Visuals: using ::before to add an icon, ::first-letter for a drop cap, ::selection for custom text highlight." />
            <CodeBlock language="css">{
              `/* Add quotation marks around blockquotes */
blockquote::before {
  content: "“";
  font-size: 3em;
  color: hsl(var(--muted-foreground));
  margin-right: 0.1em;
}
blockquote::after {
  content: "”";
  font-size: 3em;
  color: hsl(var(--muted-foreground));
  margin-left: 0.1em;
}

/* Style the first letter of every paragraph */
p::first-letter {
  font-size: 1.5em;
  font-weight: bold;
  color: hsl(var(--primary));
  float: left; /* Common for drop caps */
  margin-right: 0.1em;
}

/* Custom text selection color */
::selection {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

/* Style input placeholders */
input::placeholder {
  color: hsl(var(--muted-foreground));
  font-style: italic;
}

/* Style list item markers */
ul li::marker {
  color: hsl(var(--primary));
  font-size: 1.2em;
}`
            }</CodeBlock>
            <H3>Important Notes for <Code>::before</Code> and <Code>::after</Code></H3>
            <UL>
              <LI>They are inline by default.</LI>
              <LI>The <Code>content</Code> property is required, even if it's empty (<Code>content: "";</Code>) for them to be generated.</LI>
              <LI>They are not part of the DOM, so they cannot be targeted by JavaScript directly as if they were real elements.</LI>
              <LI>They are often used for creating decorative shapes, custom bullets, tooltips, or clearfixes.</LI>
            </UL>
            <Tip>Pseudo-elements are powerful for adding stylistic embellishments without cluttering your HTML with extra elements.</Tip>
          </>
        )
      },
      {
        id: "selectors-combinators",
        title: "Combinators",
        content: (
          <>
            <P>Combinators are symbols used in CSS selectors to define the relationship between different parts of a selector. They allow you to select elements based on their position relative to other elements in the document tree.</P>
            <H3>Types of Combinators</H3>
            <UL>
              <LI><BoldText>Descendant Combinator (space):</BoldText> <Code>A B</Code> - Selects all elements <Code>B</Code> that are descendants (children, grandchildren, etc.) of element <Code>A</Code>.
                <br />Example: <Code>article p</Code> selects all <Code>&lt;p&gt;</Code> elements inside any <Code>&lt;article&gt;</Code> element.
              </LI>
              <LI><BoldText>Child Combinator (<Code>&gt;</Code>):</BoldText> <Code>A &gt; B</Code> - Selects all elements <Code>B</Code> that are direct children of element <Code>A</Code>.
                <br />Example: <Code>ul &gt; li</Code> selects all <Code>&lt;li&gt;</Code> elements that are direct children of a <Code>&lt;ul&gt;</Code>.
              </LI>
              <LI><BoldText>Adjacent Sibling Combinator (<Code>+</Code>):</BoldText> <Code>A + B</Code> - Selects element <Code>B</Code> if it immediately follows element <Code>A</Code>, and both are children of the same parent.
                <br />Example: <Code>h2 + p</Code> selects the first <Code>&lt;p&gt;</Code> element that immediately follows an <Code>&lt;h2&gt;</Code> element.
              </LI>
              <LI><BoldText>General Sibling Combinator (<Code>~</Code>):</BoldText> <Code>A ~ B</Code> - Selects all elements <Code>B</Code> that follow element <Code>A</Code> (though not necessarily immediately), and both are children of the same parent.
                <br />Example: <Code>h2 ~ p</Code> selects all <Code>&lt;p&gt;</Code> elements that come after an <Code>&lt;h2&gt;</Code> and share the same parent.
              </LI>
            </UL>
            <ImageContainer src="https://placehold.co/700x450.png" alt="Visual examples of CSS combinators" width={700} height={450} data-ai-hint="CSS combinators relationship diagram" caption="Illustrating descendant, child, adjacent sibling, and general sibling combinators." />
            <CodeBlock language="css">{
              `/* Style paragraphs inside a div with class "content" */
.content p {
  line-height: 1.6;
}

/* Style only direct list items of an ordered list */
ol > li {
  font-weight: bold;
}

/* Add margin-top to a paragraph immediately following an h3 */
h3 + p {
  margin-top: 0.5em;
}

/* Style all images that are siblings following an element with class "figure-caption" */
.figure-caption ~ img {
  border: 1px solid #ccc;
  margin-top: 5px;
}`
            }</CodeBlock>
            <P>Understanding combinators is crucial for writing targeted CSS rules and avoiding overly broad selectors that might unintentionally affect other elements.</P>
            <Tip>Be mindful of selector performance. Overly complex descendant selectors (e.g., <Code>div div div span a</Code>) can be less performant than more direct selectors, though modern browsers are highly optimized.</Tip>
          </>
        )
      },
      {
        id: "selectors-specificity",
        title: "Understanding Specificity",
        content: (
          <>
            <P>CSS Specificity is the set of rules browsers use to determine which CSS style declarations are applied to an element when multiple declarations target the same element and property. It's a common source of confusion and frustration if not understood well.</P>
            <H3>How Specificity is Calculated</H3>
            <P>Specificity is generally calculated as a three-part (or sometimes four-part) "score." Higher scores win. The parts are often represented as (A, B, C):</P>
            <UL>
              <LI><BoldText>A (IDs):</BoldText> Count 1 for each ID selector (<Code>#example</Code>).</LI>
              <LI><BoldText>B (Classes, Attributes, Pseudo-classes):</BoldText> Count 1 for each class selector (<Code>.example</Code>), attribute selector (<Code>[type="text"]</Code>), or pseudo-class (<Code>:hover</Code>).</LI>
              <LI><BoldText>C (Types, Pseudo-elements):</BoldText> Count 1 for each type selector (<Code>div</Code>) or pseudo-element (<Code>::before</Code>).</LI>
            </UL>
            <P>The universal selector (<Code>*</Code>) and combinators (<Code>+</Code>, <Code>&gt;</Code>, <Code>~</Code>, space) do not add to specificity. The negation pseudo-class <Code>:not()</Code> itself doesn't add specificity, but the selectors *inside* <Code>:not()</Code> do.</P>
            <ImageContainer src="https://placehold.co/600x300.png" alt="Specificity calculation examples" width={600} height={300} data-ai-hint="CSS specificity calculation weight" caption="Comparing specificity scores: ID selectors are most powerful, followed by classes/attributes, then types." />
            <H4>Comparing Specificity Scores</H4>
            <P>When comparing, think of it like a version number: 1-0-0 is more specific than 0-10-0. A selector with a higher value in column A wins, regardless of B and C. If A is equal, compare B. If A and B are equal, compare C.</P>
            <UL>
              <LI><Code>p</Code> - Specificity: (0,0,1)</LI>
              <LI><Code>.my-class</Code> - Specificity: (0,1,0)</LI>
              <LI><Code>#my-id</Code> - Specificity: (1,0,0)</LI>
              <LI><Code>div.my-class p</Code> - Specificity: (0,1,2) (div=1, .my-class=1, p=1)</LI>
              <LI><Code>a:hover</Code> - Specificity: (0,1,1) (a=1, :hover=1)</LI>
            </UL>
            <H3>Special Cases</H3>
            <UL>
              <LI><BoldText>Inline Styles:</BoldText> Styles applied directly in an HTML element's <Code>style</Code> attribute (e.g., <Code>&lt;p style="color: red;"&gt;</Code>) have higher specificity than any selector in external or internal stylesheets. Think of it as (1,0,0,0) if adding a fourth column for inline styles.</LI>
              <LI><BoldText><Code>!important</Code>:</BoldText> If a style declaration has <Code>!important</Code> appended (e.g., <Code>color: green !important;</Code>), it will override almost any other declaration, regardless of specificity. <Code>!important</Code> should be used very sparingly as it makes debugging difficult and breaks the natural cascade.</LI>
              <LI><BoldText>Source Order:</BoldText> If two selectors have the exact same specificity, the one that appears later in the CSS (or later in the linked stylesheets) wins.</LI>
            </UL>
            <CodeBlock language="css">{
              `/* Example of Specificity Conflicts */
p { color: blue; }                 /* (0,0,1) */
.content p { color: green; }       /* (0,1,1) - Wins over the first one */
#main .content p { color: red; }   /* (1,1,1) - Wins over the second one */

/* If this was in HTML: <p style="color: purple;">...</p> */
/* The inline style (purple) would win over all above selectors. */

/* If one rule was: p { color: orange !important; } */
/* The !important rule (orange) would win over inline and other selectors (except another !important of higher specificity). */`
            }</CodeBlock>
            <H3>Best Practices</H3>
            <UL>
              <LI>Try to keep specificity as low as possible while still effectively targeting elements.</LI>
              <LI>Favor classes for styling over IDs where possible, as classes are more reusable.</LI>
              <LI>Avoid overly qualifying selectors (e.g., <Code>div.my-class</Code> instead of just <Code>.my-class</Code> if not necessary).</LI>
              <LI>Avoid <Code>!important</Code> unless absolutely necessary (e.g., overriding third-party styles or for utility classes that must always win).</LI>
              <LI>Understand the cascade and source order.</LI>
            </UL>
            <Tip>Browser developer tools are invaluable for inspecting applied styles and understanding specificity conflicts. They usually show which rules are being overridden and why.</Tip>
          </>
        )
      }
    ]
  },
];


export default function TutorialPage() {
  const params = useParams();
  const router = useRouter();

  const slugFromParams = params?.slug;
  const slug = Array.isArray(slugFromParams) ? slugFromParams[0] : slugFromParams;


  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundTutorial = tutorialsData.find((t) => t.slug === slug);
      if (foundTutorial) {
        setTutorial(foundTutorial);
        // Ensure chapter index is reset or valid if tutorial changes
        const chapterHash = window.location.hash.substring(1);
        const initialChapterIndex = foundTutorial.chapters.findIndex(ch => ch.id === chapterHash);
        setCurrentChapterIndex(initialChapterIndex >= 0 ? initialChapterIndex : 0);

      } else {
        // If slug is present but no tutorial found, redirect to learn page
        router.push("/learn");
      }
    } else if (params && Object.keys(params).length > 0 && !slug) {
      // This case might occur if the route is /learn/tutorials/ but no slug is provided
      // or if params exist but slug is undefined for some reason.
      router.push("/learn");
    }
    // If no slug and no params, it implies this page shouldn't be rendered directly or is in an invalid state.
    // However, Next.js handles route mismatches by showing a 404, so direct handling here might be redundant
    // unless specific UI for "no slug" is desired before a 404.
  }, [slug, router, params]);

  // Update URL hash when chapter changes
  useEffect(() => {
    if (tutorial && tutorial.chapters[currentChapterIndex]) {
      const chapterId = tutorial.chapters[currentChapterIndex].id;
      // Non-blocking update to hash, doesn't trigger full navigation
      window.history.replaceState(null, '', `#${chapterId}`);
    }
  }, [currentChapterIndex, tutorial]);


  // Scroll to top of content area when chapter changes
  useEffect(() => {
    const contentArea = document.getElementById("tutorial-content-area");
    if (contentArea) {
      contentArea.scrollTop = 0;
    }
  }, [currentChapterIndex, slug]); // Also scroll when slug changes (new tutorial loaded)


  if (!tutorial || !slug) {
    // Added a more robust loading state for initial render or if slug/tutorial isn't ready
    return (
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-var(--header-height,4rem)-var(--bottom-nav-height,5rem))] gap-0">
        {/* Skeleton Sidebar */}
        <aside className="lg:w-80 lg:border-r border-border bg-card lg:sticky lg:top-[var(--header-height,4rem)] lg:h-[calc(100vh-var(--header-height,4rem)-var(--bottom-nav-height,5rem))]">
          <div className="p-4 border-b border-border flex items-center justify-between h-16">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-6 lg:hidden" />
          </div>
          <div className="p-4 space-y-3 hidden lg:block">
            <div className="flex items-start gap-3 mb-5">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-9 w-full" />)}
          </div>
        </aside>
        {/* Skeleton Main Content */}
        <main className="flex-1 bg-background">
          <div className="h-[calc(100vh-var(--header-height,4rem)-var(--bottom-nav-height,5rem)-var(--pagination-height,4rem))] lg:h-[calc(100vh-var(--header-height,4rem)-var(--bottom-nav-height,5rem))] p-0 lg:m-2">
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border/50 h-full overflow-hidden">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-6" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-5/6 mb-3" />
              <Skeleton className="h-32 w-full my-6" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  const currentChapter = tutorial.chapters[currentChapterIndex];
  if (!currentChapter) { // Graceful handling if chapter index is somehow out of bounds
    return (
      <div className="flex items-center justify-center h-[calc(100vh-(var(--header-height,4rem))-var(--bottom-nav-height,5rem))]">
        <LayoutGrid className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Error loading chapter...</p>
      </div>
    );
  }


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
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-var(--header-height,4rem)-var(--bottom-nav-height,5rem))] gap-0">
      {/* Sidebar for Desktop / Accordion Trigger for Mobile */}
      <aside className="lg:w-80 lg:flex-shrink-0 lg:border-r border-border bg-card lg:sticky lg:top-[var(--header-height,4rem)] lg:h-[calc(100vh-var(--header-height,4rem)-var(--bottom-nav-height,5rem))]">
        <div className="p-4 border-b border-border flex items-center justify-between h-16"> {/* Fixed height for header */}
          <Button asChild variant="link" className="text-primary hover:underline p-0 h-auto text-sm">
            <Link href="/learn" >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Learn
            </Link>
          </Button>
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
                Chapters ({currentChapterIndex + 1}/{tutorial.chapters.length})
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
      <main className="flex-1 bg-background overflow-hidden"> {/* Added overflow-hidden to main */}
        <div className="flex flex-col h-[calc(100vh-var(--header-height,4rem)-var(--bottom-nav-height,5rem))] lg:h-full"> {/* Flex container for scroll + pagination */}
          <ScrollArea
            id="tutorial-content-area"
            className="flex-grow" // Takes up available space
          >
            <Card className="w-full rounded-none lg:rounded-xl shadow-none lg:shadow-lg overflow-hidden bg-card border-0 lg:border border-border/50 m-0 lg:m-2">
              <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-accent/5 p-4 sm:p-6 border-b border-border/50">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-primary-dark">{currentChapter.title}</CardTitle>
                <CardDescription className="text-muted-foreground mt-1.5">
                  Chapter {currentChapterIndex + 1} of {tutorial.chapters.length} in "{tutorial.title}"
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 text-foreground leading-relaxed">
                {/* This inner div applies prose styling and ensures full width for the content */}
                <div className="w-full prose prose-sm sm:prose-base dark:prose-invert !max-w-none overflow-x-hidden">
                  {currentChapter.content}
                </div>
              </CardContent>
            </Card>
          </ScrollArea>

          {/* Sticky Pagination Bar */}
          <div
            className="flex-shrink-0 flex justify-between items-center sticky bottom-0 bg-background/80 backdrop-blur-sm py-3 px-4 border-t border-border lg:static lg:bg-transparent lg:border-t-0 lg:mt-auto"
            style={{ ['--pagination-height' as string]: '4rem' }}
          >
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
        </div>
      </main>
    </div>
  );
}


