---
id: "css-grid"
language: "css"
level: "intermediate"
title: "CSS Grid Layout"
description: "Master powerful 2D layouts with CSS Grid"
duration: "40 min"
order: 2
prerequisites: ["flexbox"]
---

# CSS Grid Layout

CSS Grid is the most powerful layout system available in CSS. While Flexbox excels at one-dimensional layouts, Grid handles **two-dimensional layouts** - controlling both rows AND columns simultaneously. This makes it perfect for complex page layouts!

## What is CSS Grid and Why It Matters?

Before Grid, creating complex layouts required:
- Float-based hacks
- Table layouts (bad for semantics)
- Absolute positioning tricks
- JavaScript calculations
- Framework workarounds

**Grid changed everything!** Now you can create magazine-style layouts, dashboards, and complex page structures with pure CSS.

### Real-World Analogy

Think of CSS Grid like a **spreadsheet** or **table**:
- You can define rows and columns
- Items can span multiple cells (like merging cells in Excel)
- Everything stays perfectly aligned
- Responsive changes are easy

## The Grid Mental Model

### Creating a Grid

```css
.container {
  display: grid;
}
```

**What happens:**
- Creates a grid formatting context
- Direct children become grid items automatically
- You can now define rows, columns, and placement

### Grid Terminology

Understanding these terms is crucial:

- **Grid Container**: The parent element with `display: grid`
- **Grid Items**: Direct children of the grid container
- **Grid Lines**: The dividing lines that create rows and columns
- **Grid Track**: The space between two grid lines (a row or column)
- **Grid Cell**: Single unit (like a cell in a spreadsheet)
- **Grid Area**: Rectangular space spanning multiple cells

## Part 1: Def defining the Grid Structure

### 1. Defining Columns

```css
.grid {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  /* 3 columns, each exactly 200px wide */
}
```

**Different sizing methods:**

```css
/* Fixed pixels */
grid-template-columns: 200px 300px 400px;

/* Percentages */
grid-template-columns: 33.33% 33.33% 33.33%;

/* Mixed units */
grid-template-columns: 200px 50% auto;
```

### 2. The fr Unit (Fractional Units)

The `fr` unit represents a **fraction of available space** - Grid's secret weapon!

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* 3 equal columns that fill available space */
}
```

**How fr works:**

```css
/* First column gets 2 parts, others get 1 part each */
grid-template-columns: 2fr 1fr 1fr;
/* If container is 800px wide:
   - Column 1: 400px (2/4 of space)
   - Column 2: 200px (1/4 of space)
   - Column 3: 200px (1/4 of space)
*/
```

**Mixing fr with fixed units:**

```css
grid-template-columns: 250px 1fr 1fr;
/* First column: Fixed 250px
   Remaining space divided equally between column 2 and 3 */
```

**Why fr is better than percentages:**
- Automatically accounts for gaps
- Works with mixed units
- Simpler calculations

### 3. The repeat() Function

Avoid repetition with `repeat()`:

```css
/* Instead of this */
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

/* Write this */
grid-template-columns: repeat(5, 1fr);
```

**Advanced repeat patterns:**

```css
/* Repeating complex patterns */
grid-template-columns: repeat(3, 1fr 2fr);
/* Results in: 1fr 2fr 1fr 2fr 1fr 2fr */

/* Mixed with other values */
grid-template-columns: 200px repeat(3, 1fr) 200px;
/* Results in: 200px 1fr 1fr 1fr 200px */
```

### 4. Defining Rows

Works exactly like columns:

```css
.grid {
  display: grid;
  grid-template-rows: 100px 200px 100px;
  /* 3 rows with specific heights */
  
  grid-template-rows: repeat(3, 150px);
  /* 3 rows, each 150px */
  
  grid-template-rows: auto 1fr auto;
  /* Header auto, main flexible, footer auto */
}
```

### 5. Gap (Gutters/Spacing)

Add space between grid items:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;  /* 20px gap between all items */
}

/* Different gaps for rows and columns */
.grid {
  row-gap: 30px;     /* Vertical spacing */
  column-gap: 20px;  /* Horizontal spacing */
  
  /* Shorthand */
  gap: 30px 20px;  /* row-gap column-gap */
}
```

## Part 2: Placing Grid Items

### Method 1: Grid Line Numbers

Grid lines are numbered starting from 1:

```css
.item {
  grid-column-start: 1;
  grid-column-end: 3;  /* Spans from line 1 to line 3 (2 columns) */
  
  grid-row-start: 1;
  grid-row-end: 2;
}

/* Shorthand */
.item {
  grid-column: 1 / 3;  /* start / end */
  grid-row: 1 / 2;
}
```

**Negative line numbers** count from the end:

```css
.item {
  grid-column: 1 / -1;  /* Spans all columns */
}
```

### Method 2: span Keyword

```css
.item {
  grid-column: span 2;  /* Spans 2 columns from current position */
  grid-row: span 3;     /* Spans 3 rows */
  
  /* Can also specify start + span */
  grid-column: 2 / span 3;  /* Start at line 2, span 3 columns */
}
```

### Method 3: Named Grid Areas (Semantic & Powerful!)

This is one of Grid's most beautiful features:

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header  header"
    "sidebar content ads"
    "footer  footer  footer";
  gap: 20px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.ads     { grid-area: ads; }
.footer  { grid-area: footer; }
```

**Benefits:**
- Visual representation in code
- Semantic naming
- Easy to understand layout
- Simple responsive changes

## Auto-Placement & Responsive Grids

### auto-fill vs auto-fit

Two magical keywords for responsive grids:

#### auto-fill

Creates as many columns as fit, keeps empty tracks:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
/* Automatically creates columns based on available space
   Minimum 250px, maximum 1fr
   Empty tracks remain if items don't fill all columns */
```

#### auto-fit

Like auto-fill, but collapses empty tracks:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
/* Same as auto-fill, but stretches items to fill space
   when there are fewer items than columns */
```

**When to use:**
- `auto-fill`: When you want consistent column count
- `auto-fit`: When you want items to grow and fill space

### minmax() Function

Sets minimum and maximum sizes:

```css
.grid {
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  /* Each column: minimum 200px, maximum 1fr */
  
  grid-template-rows: minmax(100px, auto);
  /* Rows: minimum 100px, grows with content */
}
```

## Alignment Properties

Grid has powerful alignment options:

### Align Items (Vertical alignment within cells)

```css
.grid {
  align-items: start;   /* Top of cell */
  align-items: end;     /* Bottom of cell */
  align-items: center;  /* Middle of cell */
  align-items: stretch; /* Fill cell height (default) */
}
```

### Justify Items (Horizontal alignment within cells)

```css
.grid {
  justify-items: start;   /* Left of cell */
  justify-items: end;     /* Right of cell */
  justify-items: center;  /* Center of cell */
  justify-items: stretch; /* Fill cell width (default) */
}
```

### Individual Item Alignment

```css
.item {
  align-self: end;     /* Override align-items for this item */
  justify-self: center; /* Override justify-items for this item */
}
```

### Align/Justify Content (Entire grid within container)

```css
.grid {
  /* Vertical alignment of entire grid */
  align-content: start | end | center | space-between | space-around;
  
  /* Horizontal alignment of entire grid */
  justify-content: start | end | center | space-between | space-around;
}
```

## Real-World Patterns

### Pattern 1: Responsive Card Grid (No Media Queries!)

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
/* Automatically responsive - adds/removes columns as needed! */
```

### Pattern 2: Dashboard Layout

```css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
  gap: 0;
}

.sidebar { grid-area: sidebar; background: #2c3e50; }
.header  { grid-area: header;  background: #ecf0f1; }
.main    { grid-area: main;    background: #fff; }
.footer  { grid-area: footer;  background: #34495e; }
```

### Pattern 3: Magazine Layout

```css
.magazine {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 1rem;
}

.article-featured {
  grid-column: span 2;
  grid-row: span 2;
}

.article-tall {
  grid-row: span 2;
}

.article-wide {
  grid-column: span 2;
}
```

### Pattern 4: Holy Grail Layout

```css
.page {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "left   main   right"
    "footer footer footer";
  min-height: 100vh;
  gap: 1rem;
}

header { grid-area: header; }
.left-sidebar { grid-area: left; }
main { grid-area: main; }
.right-sidebar { grid-area: right; }
footer { grid-area: footer; }
```

## Advanced Techniques

### Overlapping Grid Items

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.background {
  grid-column: 1 / 3;
  grid-row: 1;
  z-index: 1;
}

.overlay {
  grid-column: 1 / 3;
  grid-row: 1;
  z-index: 2;
}
```

### Implicit vs Explicit Grid

**Explicit**: Rows/columns you define  
**Implicit**: Auto-created rows/columns

```css
.grid {
  /* Explicit: Define 3 columns */
  grid-template-columns: repeat(3, 1fr);
  
  /* Implicit: Auto-created rows will be 200px */
  grid-auto-rows: 200px;
  
  /* Direction for auto-placement */
  grid-auto-flow: row;  /* Default: fill rows first */
  grid-auto-flow: column;  /* Fill columns first */
  grid-auto-flow: dense;  /* Fill gaps automatically */
}
```

## Grid vs Flexbox Decision Guide

| Use Grid When | Use Flexbox When |
|---------------|------------------|
| 2D layout (rows AND columns) | 1D layout (row OR column) |
| Layout-first design | Content-first design |
| Complex page layouts | Component layouts |
| Magazine/dashboard layouts | Navigation bars |
| Need precise placement | Need flexible flow |
| Overlapping elements | Simple alignment |

**Can use together!** Grid for page layout, Flexbox for components inside grid cells.

## Key Takeaways

✅ Grid is **two-dimensional** - controls rows AND columns  
✅ `fr` units create flexible, responsive layouts  
✅ `repeat()` saves repetition  
✅ `auto-fit` / `auto-fill` + `minmax()` = responsive magic  
✅ Named grid areas create semantic, readable layouts  
✅ Perfect for page layouts, dashboards, galleries  
✅ Combine with Flexbox for ultimate layout power

## Practice Exercise

Create a complete blog page layout:
1. Full-width header with logo and nav (use Grid for structure, Flexbox for nav items)
2. 3-column layout: sidebar (250px), main content (flexible), ads (300px)
3. Main content area with article cards in a responsive grid
4. Full-width footer
5. On mobile (<768px): Stack sidebar, content, ads vertically

**Bonus:** Add a "featured" article that spans 2 columns and 2 rows!

---

**Next Lesson:** CSS Transitions & Transforms - Adding Motion to Your Designs!
