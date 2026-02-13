---
id: "flexbox"
language: "css"
level: "intermediate"
title: "Flexbox Mastery"
description: "Master modern 1D layouts with CSS Flexbox"
duration: "35 min"
order: 1
prerequisites: ["display-positioning"]
---

# Flexbox Mastery

Flexbox revolutionized how we create layouts in CSS. Before Flexbox, developers used floats, tables, and positioning hacks to create layouts. Flexbox makes it simple, intuitive, and powerful!

## What is Flexbox and Why Does It Matter?

**Flexbox** (Flexible Box Layout) is a one-dimensional layout system designed to distribute space and align items within a container. "One-dimensional" means it handles layout in **one direction at a time** - either as a row OR as a column.

### The Problem Flexbox Solves

Before Flexbox, common layout challenges were difficult:

❌ **Old way problems:**
- Vertical centering required complex hacks
- Equal-height columns needed JavaScript or table layouts
- Responsive navigation was complicated
- Spacing between items required manual calculations

✅ **Flexbox solutions:**
- Perfect centering with 2 lines of code
- Equal heights automatically
- Responsive layouts naturally
- Automatic spacing with `gap`

### Real-World Analogy

Think of Flexbox like arranging books on a shelf:
- The shelf is the **flex container**
- The books are **flex items**
- You can arrange books **left-to-right** (row) or **top-to-bottom** (column)
- You can space them evenly, push them to one side, or center them
- Books can be different sizes but still align nicely

## The Flexbox Mental Model

Flexbox has two key concepts:

### 1. Flex Container (Parent)

The element with `display: flex` becomes a flex container:

```css
.container {
  display: flex;  /* This is the magic! */
}
```

**What happens:**
- Creates a flex formatting context
- Direct children become flex items automatically
- You can now use flex properties to control layout

### 2. Flex Items (Children)

Direct children of a flex container become flex items:

```html
<div class="container">
  <div class="item">Item 1</div>  <!-- Flex item -->
  <div class="item">Item 2</div>  <!-- Flex item -->
  <div class="item">Item 3</div>  <!-- Flex item -->
</div>
```

**Important:** Only **direct children** become flex items, not nested elements!

## Flex Axes: Main and Cross

Understanding axes is crucial for mastering Flexbox:

### Main Axis

The **main axis** is the primary direction items flow:
- `flex-direction: row` → Main axis is horizontal →
- `flex-direction: column` → Main axis is vertical ↓

### Cross Axis

The **cross axis** is perpendicular to the main axis:
- If main is horizontal, cross is vertical
- If main is vertical, cross is horizontal

**Why this matters:** Different properties control different axes!
- `justify-content` → Controls main axis
- `align-items` → Controls cross axis

## Part 1: Flex Container Properties

These properties go on the parent (flex container).

### 1. flex-direction

Controls the direction items flow:

```css
.container {
  display: flex;
  flex-direction: row;  /* Default */
}
```

**All Options:**

```css
flex-direction: row;            /* → Left to right (default) */
flex-direction: row-reverse;    /* ← Right to left */
flex-direction: column;         /* ↓ Top to bottom */
flex-direction: column-reverse; /* ↑ Bottom to top */
```

**Real Example:**
```css
/* Desktop: Horizontal navigation */
.nav {
  display: flex;
  flex-direction: row;
}

/* Mobile: Vertical navigation */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
  }
}
```

### 2. justify-content (Main Axis Alignment)

Controls how items are distributed along the **main axis**:

```css
.container {
  display: flex;
  justify-content: center;  /* Center items */
}
```

**All Options Explained:**

```css
/* Pack items at the start */
justify-content: flex-start;
/* [Item1][Item2][Item3]________________ */

/* Pack items at the end */
justify-content: flex-end;
/* ________________[Item1][Item2][Item3] */

/* Center items */
justify-content: center;
/* ________[Item1][Item2][Item3]________ */

/* Space between items */
justify-content: space-between;
/* [Item1]________[Item2]________[Item3] */

/* Space around items */
justify-content: space-around;
/* __[Item1]____[Item2]____[Item3]__ */

/* Even space everywhere */
justify-content: space-evenly;
/* ___[Item1]___[Item2]___[Item3]___ */
```

**When to use each:**
- `flex-start`: Left-aligned content
- `flex-end`: Right-aligned content (login buttons)
- `center`: Centered content (hero sections)
- `space-between`: Navigation bars, toolbars
- `space-around`: Card layouts
- `space-evenly`: Button groups

### 3. align-items (Cross Axis Alignment)

Controls how items align on the **cross axis**:

```css
.container {
  display: flex;
  align-items: center;  /* Vertically center */
}
```

**All Options:**

```css
/* Stretch to fill container (default) */
align-items: stretch;

/* Align to top (in row mode) */
align-items: flex-start;

/* Align to bottom (in row mode) */
align-items: flex-end;

/* Center items */
align-items: center;

/* Align text baselines */
align-items: baseline;
```

**Visual Example:**
```css
/* Navbar with logo and links vertically centered */
.navbar {
  display: flex;
  justify-content: space-between;  /* Horizontal spacing */
  align-items: center;              /* Vertical centering */
  height: 60px;
}
```

### 4. flex-wrap

Controls whether items wrap to new lines:

```css
.container {
  display: flex;
  flex-wrap: wrap;  /* Allow wrapping */
}
```

**Options:**

```css
flex-wrap: nowrap;       /* Single line (default) */
flex-wrap: wrap;         /* Multi-line, wrap down */
flex-wrap: wrap-reverse; /* Multi-line, wrap up */
```

**Real Use Case:**
```css
/* Responsive card grid */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px;  /* Minimum 300px, wrap if needed */
}
```

### 5. gap (Spacing Between Items)

Modern way to add space between flex items:

```css
.container {
  display: flex;
  gap: 20px;  /* 20px space between all items */
}

/* Separate row and column gaps */
.container {
  display: flex;
  gap: 20px 10px;  /* row-gap column-gap */
  
  /* Or individually */
  row-gap: 20px;
  column-gap: 10px;
}
```

**Why gap is better than margin:**
- No margin on first/last items needed
- Cleaner code
- Automatically adjusts when wrapping

### 6. align-content (Multi-line Alignment)

Controls spacing between **lines** when wrapping:

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
```

**Only works when:** `flex-wrap: wrap` and multiple lines exist.

## Part 2: Flex Item Properties

These properties go on the children (flex items).

### 1. flex-grow

Controls how much an item can **grow** relative to other items:

```css
.item {
  flex-grow: 1;  /* Can grow to fill space */
}
```

**How it works:**
- `flex-grow: 0` → Don't grow (default)
- `flex-grow: 1` → Grow equally with others
- `flex-grow: 2` → Grow twice as much as items with `flex-grow: 1`

**Example:**
```css
.sidebar {
  flex-grow: 0;  /* Fixed width */
  width: 250px;
}

.main-content {
  flex-grow: 1;  /* Takes remaining space */
}
```

### 2. flex-shrink

Controls how much an item can **shrink** when space is limited:

```css
.item {
  flex-shrink: 1;  /* Can shrink (default) */
  flex-shrink: 0;  /* Don't shrink */
}
```

**Use case:**
```css
.logo {
  flex-shrink: 0;  /* Logo never shrinks */
  width: 150px;
}

.nav-links {
  flex-shrink: 1;  /* Nav can shrink if needed */
}
```

### 3. flex-basis

Sets the **initial size** before growing or shrinking:

```css
.item {
  flex-basis: 200px;   /* Start at 200px */
  flex-basis: 33.33%;  /* Start at 33.33% */
  flex-basis: auto;    /* Based on content size */
}
```

**Think of it as:** The "ideal" or "starting" size.

### 4. flex (Shorthand)

Combines `flex-grow`, `flex-shrink`, and `flex-basis`:

```css
.item {
  flex: 1;  /* flex: 1 1 0%; */
  /* grow: 1, shrink: 1, basis: 0% */
}

.item {
  flex: 0 0 auto;
  /* Don't grow, don't shrink, auto basis */
}

.item {
  flex: 1 1 300px;
  /* Grow, shrink, start at 300px */
}
```

**Common Patterns:**
```css
flex: 1;       /* Equal width, flexible */
flex: 0;       /* Don't grow/shrink */
flex: auto;    /* flex: 1 1 auto */
flex: none;    /* flex: 0 0 auto */
```

### 5. align-self

Overrides `align-items` for a specific item:

```css
.container {
  display: flex;
  align-items: flex-start;
}

.special-item {
  align-self: flex-end;  /* This one aligns differently */
}
```

### 6. order

Changes visual order without changing HTML:

```css
.item1 { order: 2; }
.item2 { order: 1; }  /* Appears first */
.item3 { order: 3; }
```

**Default:** All items have `order: 0`

## Practical Real-World Patterns

### Pattern 1: Perfect Centering

```css
.center-everything {
  display: flex;
  justify-content: center;  /* Horizontal */
  align-items: center;       /* Vertical */
  min-height: 100vh;
}
```

### Pattern 2: Navigation Bar

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-logo {
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
```

### Pattern 3: Card Grid (Responsive)

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  flex: 1 1 300px;  /* Grow, shrink, min 300px */
  max-width: 400px;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
```

### Pattern 4: Sticky Footer

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;  /* Pushes footer down */
}

footer {
  flex-shrink: 0;
}
```

### Pattern 5: Form Layout

```css
.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-field {
  flex: 1;  /* Equal width fields */
}

.form-field--small {
  flex: 0 0 100px;  /* Fixed 100px */
}
```

## Flexbox vs Grid: When to Use What?

| Use Flexbox When | Use Grid When |
|------------------|---------------|
| One-dimensional layout | Two-dimensional layout |
| Content determines layout | Layout determines content |
| Navigation bars | Page layouts |
| Button groups | Photo galleries |
| Cards in a row | Dashboard layouts |
| Form fields | Magazine layouts |

## Key Takeaways

✅ Flexbox is **one-dimensional** (row OR column)  
✅ `display: flex` creates a flex container  
✅ Use `justify-content` for main axis alignment  
✅ Use `align-items` for cross axis alignment  
✅ `flex: 1` makes items grow equally  
✅ `gap` adds space between items cleanly  
✅ Perfect for components and small layouts  
✅ Use Grid for complex 2D layouts

## Practice Exercise

Build a complete page header with:
1. Logo on the left (fixed width, never shrinks)
2. Navigation links in the center (flexible)
3. Search bar in the middle-right (grows to fill)
4. Login button on the right (fixed width)
5. All items vertically centered
6. On mobile (<768px): Stack vertically

**Bonus:** Add a sub-navigation that wraps when space is limited!

---

**Next Lesson:** CSS Grid - Master 2D Layouts!
