
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
const Strong: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => <strong className={cn("font-semibold text-foreground", className)}>{children}</strong>;
const Code: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => <code className={cn("px-1.5 py-0.5 bg-muted rounded text-sm font-mono text-accent-dark shadow-sm border border-border/30", className)}>{children}</code>;
const ImageContainer: React.FC<{ src: string; alt: string; width: number; height: number; "data-ai-hint": string; caption?: string; className?: string }> = ({ src, alt, width, height, "data-ai-hint": aiHint, caption, className }) => (
  <figure className={cn("my-6 flex flex-col items-center", className)}>
    <Image src={src} alt={alt} width={width} height={height} className="rounded-lg border-2 border-border shadow-md" data-ai-hint={aiHint} />
    {caption && <figcaption className="mt-2 text-xs text-muted-foreground italic text-center">{caption}</figcaption>}
  </figure>
);
const Tip: React.FC<{ children: ReactNode; className?: string }> = ({children, className}) => (
  <div className={cn("my-4 p-4 border-l-4 border-accent bg-accent/10 rounded-r-md text-accent-darker", className)}>
    <Strong>Tip:</Strong> {children}
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
            <P>Welcome to the world of Flexbox! Short for <Strong>Flexible Box Layout</Strong>, Flexbox is a powerful one-dimensional layout model in CSS. It provides an efficient way to arrange, align, and distribute space among items within a container, even when their sizes are unknown or change dynamically. Think of it as giving your elements superpowers to intelligently manage their positions and dimensions.</P>
            <ImageContainer src="https://placehold.co/600x300.png" alt="Diagram of Flex Container with Flex Items along a single axis" width={600} height={300} data-ai-hint="flexbox diagram axis" caption="A flex container (parent) directs its flex items (children) along a primary axis." />
            
            <H3>Why is Flexbox a Game Changer?</H3>
            <P>Before Flexbox, creating complex and responsive layouts often involved cumbersome techniques like floats, table display hacks, or complex positioning. Flexbox simplifies these tasks significantly:</P>
            <UL>
              <LI>Builds <Strong>complex layouts</Strong> with ease that were previously challenging.</LI>
              <LI>Effortlessly <Strong>aligns items</Strong> both vertically and horizontally within their parent.</LI>
              <LI>Creates inherently <Strong>flexible and responsive components</Strong>, often minimizing the need for media queries for simple adjustments.</LI>
              <LI>Manages the <Strong>order and spacing</Strong> of elements effectively, which can even be different from their order in the HTML source.</LI>
              <LI>Perfect for <Strong>component-level layouts</Strong> within an application (e.g., navigation bars, form controls, card components).</LI>
            </UL>
            
            <H3>The Two Pillars: Flex Containers and Flex Items</H3>
            <P>Understanding Flexbox boils down to grasping two fundamental concepts:</P>
            <UL>
              <LI><Strong>Flex Container:</Strong> This is the parent HTML element. You activate Flexbox by setting its <Code>display</Code> property to <Code>flex</Code> or <Code>inline-flex</Code>. This creates a "flex formatting context" for its direct children.</LI>
              <LI><Strong>Flex Items:</Strong> These are the direct children of a flex container. As soon as their parent becomes a flex container, they automatically become flex items and gain special flex properties.</LI>
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
            <P>Now that you know how to create a flex context, let's explore the specific properties that bring Flexbox to life. We'll look at properties for the <Strong>flex container</Strong> (the parent) and properties for the <Strong>flex items</Strong> (the children).</P>
            
            <H3>Flex Container Properties</H3>
            <P>These properties are set on the parent element to control the overall flow and alignment of its children.</P>

            <H4><Code>flex-direction</Code></H4>
            <P>This defines the <Strong>main axis</Strong>, determining the direction flex items are placed in the flex container. Think of it as setting the primary flow of your items.</P>
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
            <P>Dictates how much a flex item can <Strong>grow</Strong> relative to other items if there's extra space in the flex container. It's a unitless proportion. Default is 0 (does not grow).</P>
            <InteractiveFlexContainer 
              containerProps={{width: '300px'}}
              items={[
                { text: 'Item 1 (grow 1)', style: { flexGrow: 1 } },
                { text: 'Item 2 (grow 2)', style: { flexGrow: 2 } },
                { text: 'Item 3', style: { flexGrow: 0} }, /* Default no grow */
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
            <P>Defines the ability of a flex item to <Strong>shrink</Strong> relative to other items if there isn't enough space in the container. Default is 1 (can shrink).</P>
             <CodeBlock language="css">{
`.item-no-shrink {
  flex-shrink: 0; /* This item will not shrink smaller than its basis size */
}`
            }</CodeBlock>

            <H4><Code>flex-basis</Code></H4>
            <P>Specifies the <Strong>initial main size</Strong> of a flex item before free space is distributed according to <Code>flex-grow</Code> or <Code>flex-shrink</Code>. It can be a length (e.g., <Code>20%</Code>, <Code>100px</Code>), or <Code>auto</Code> (item's intrinsic size).</P>
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
            <ImageContainer src="https://placehold.co/400x150.png" alt="One item aligning itself differently" width={400} height={150} data-ai-hint="align self example" caption="align-self allows an individual item to break from the group's cross-axis alignment."/>
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
            <P>This property defines how flex items are distributed along the <Strong>main axis</Strong> of the flex container. The main axis is determined by <Code>flex-direction</Code> (<Code>row</Code> or <Code>column</Code>).</P>
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
            <P>This property aligns flex items along the <Strong>cross axis</Strong> of the current line. The cross axis is always perpendicular to the main axis.</P>
            <ImageContainer src="https://placehold.co/700x350.png" alt="Visual examples of align-items values" width={700} height={350} data-ai-hint="align items flexbox diagrams" caption="Examples of align-items: flex-start, center, stretch, baseline."/>
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
                { text: 'Tall', style: { height: '60px', fontSize: '0.7rem'} }, 
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
            <P>This property comes into play when you have <Strong>multiple lines of flex items</Strong> (i.e., when <Code>flex-wrap: wrap;</Code> is active and items have wrapped). It aligns these lines within the flex container when there's extra space in the cross-axis, similar to how <Code>justify-content</Code> aligns items on the main axis.</P>
            <P><Strong>Important:</Strong> <Code>align-content</Code> has no effect when there's only one line of flex items.</P>
            <ImageContainer src="https://placehold.co/600x400.png" alt="align-content distributing space between multiple lines" width={600} height={400} data-ai-hint="align content flexbox diagrams" caption="align-content distributes space between multiple lines of flex items (e.g., space-between, center)."/>
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
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px', border: '1px dashed hsl(var(--border))', backgroundColor: 'hsl(var(--muted)/0.5)', borderRadius: 'var(--radius)'}}>
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
                <div style={{fontWeight: 'bold', color: 'hsl(var(--primary))', fontSize: '1.2rem'}}>Logo.</div>
                <ul style={{display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0}}>
                  <li><a href="#" style={{textDecoration: 'none', color: 'hsl(var(--foreground))', padding: '0.5rem'}}>Home</a></li>
                  <li><a href="#" style={{textDecoration: 'none', color: 'hsl(var(--foreground))', padding: '0.5rem'}}>About</a></li>
                  <li><a href="#" style={{textDecoration: 'none', color: 'hsl(var(--foreground))', padding: '0.5rem'}}>Services</a></li>
                  <li><a href="#" style={{padding: '0.5rem 1rem', textDecoration: 'none', backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderRadius: 'calc(var(--radius) - 4px)'}}>Contact</a></li>
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
                  <h5 style={{margin:0, fontWeight: '600', color: 'hsl(var(--card-foreground))' }}>Card Title</h5>
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
    slug: "grid", title: "Mastering CSS Grid Systems", description: "Learn two-dimensional layouts for complex designs.", icon: ListChecks, chapters: [
      { id: "grid-intro", title: "Grid Basics", content: <><P>Content for Grid Basics coming soon... Imagine a diagram showing a grid container with rows and columns, and items placed within the grid cells. We'll cover properties like <Code>display: grid</Code>, <Code>grid-template-columns</Code>, and <Code>grid-template-rows</Code>.</P><ImageContainer src="https://placehold.co/600x300.png" alt="Basic CSS Grid Layout" width={600} height={300} data-ai-hint="CSS Grid diagram" /></> },
      { id: "grid-areas", title: "Defining Grid Areas", content: <><P>Content for Defining Grid Areas coming soon... This will explore <Code>grid-template-areas</Code> for more semantic layout definitions. Picture a diagram where different sections of a webpage (header, sidebar, main, footer) are mapped to named grid areas.</P><ImageContainer src="https://placehold.co/600x400.png" alt="CSS Grid Areas Layout" width={600} height={400} data-ai-hint="CSS Grid areas diagram" /></> },
    ]
  },
  {
    slug: "animations", title: "CSS Animations & Transitions", description: "Bring your UIs to life with smooth animations.", icon: Wind, chapters: [
      { id: "animations-intro", title: "Keyframes & Animation Properties", content: <><P>Content for Keyframes & Animation Properties coming soon... We'll dive into <Code>@keyframes</Code>, <Code>animation-name</Code>, <Code>animation-duration</Code>, and more. Expect visuals of simple animations like fades or movements.</P><ImageContainer src="https://placehold.co/500x250.png" alt="CSS Animation Example" width={500} height={250} data-ai-hint="CSS animation keyframes" /></> },
    ]
  },
  {
    slug: "responsive", title: "Responsive Design Principles", description: "Build websites that adapt to any screen size.", icon: Target, chapters: [
      { id: "responsive-intro", title: "Media Queries", content: <><P>Content for Media Queries coming soon... This chapter will show how to use <Code>@media</Code> rules to apply different styles based on screen size. Visuals will depict how a layout changes across desktop, tablet, and mobile.</P><ImageContainer src="https://placehold.co/700x300.png" alt="Responsive Design Media Queries" width={700} height={300} data-ai-hint="responsive design media query" /></> },
    ]
  },
  {
    slug: "selectors", title: "Advanced Selectors & Specificity", description: "Target elements precisely and manage CSS conflicts.", icon: PaletteIcon, chapters: [
      { id: "selectors-intro", title: "Attribute Selectors", content: <><P>Content for Attribute Selectors coming soon... Learn to select elements based on their attributes (e.g., <Code>input[type="text"]</Code>). We'll include examples and short explanations of how these selectors work.</P><ImageContainer src="https://placehold.co/500x200.png" alt="CSS Attribute Selector Example" width={500} height={200} data-ai-hint="CSS attribute selector" /></> },
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
        setCurrentChapterIndex(initialChapterIndex >=0 ? initialChapterIndex : 0);

      } else {
        router.push("/learn"); 
      }
    } else if (params && Object.keys(params).length > 0 && !slug) {
      // This case might occur if the route is /learn/tutorials/ but no slug is provided
      // or if params exist but slug is undefined for some reason.
      router.push("/learn");
    }
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
                <div className="bg-card p-6 rounded-xl shadow-lg border border-border/50 h-full">
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
              <Card className="rounded-none lg:rounded-xl shadow-none lg:shadow-lg overflow-hidden bg-card border-0 lg:border border-border/50 m-0 lg:m-2">
                <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-accent/5 p-4 sm:p-6 border-b border-border/50">
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-primary-dark">{currentChapter.title}</CardTitle>
                  <CardDescription className="text-muted-foreground mt-1.5">
                    Chapter {currentChapterIndex + 1} of {tutorial.chapters.length} in "{tutorial.title}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 text-foreground leading-relaxed">
                  <div className="prose prose-sm sm:prose-base dark:prose-invert !max-w-none">
                    {currentChapter.content}
                  </div>
                </CardContent>
              </Card>
            </ScrollArea>

            {/* Sticky Pagination Bar */}
            <div 
                className="flex-shrink-0 flex justify-between items-center sticky bottom-0 bg-background/80 backdrop-blur-sm py-3 px-4 border-t border-border lg:static lg:py-4 lg:px-6 lg:bg-transparent lg:border-t-0 lg:mt-auto"
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

