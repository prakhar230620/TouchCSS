---
id: "display-positioning"
language: "css"
level: "beginner"
title: "Display & Positioning"
description: "Learn how to control element layout and positioning"
duration: "30 min"
order: 5
prerequisites: ["intro-to-css", "selectors-basics", "box-model"]
---

# Display & Positioning

Understanding `display` and `position` properties is crucial for creating layouts. These properties control **how elements behave** in the document flow and **where they appear** on the page.

## Part 1: The Display Property

The `display` property determines how an element behaves in relation to other elements.

### 1. Block Elements

**Block elements** take up the full width available and start on a new line.

```css
div {
  display: block;
}
```

**Characteristics:**
- Takes full width (by default)
- Starts on a new line
- Can have width and height
- Stacks vertically

**Common block elements:** `div`, `p`, `h1-h6`, `section`, `article`, `header`, `footer`

**Example:**
```html
<div style="background: lightblue;">Block 1</div>
<div style="background: lightgreen;">Block 2</div>
<!-- They stack vertically -->
```

### 2. Inline Elements

**Inline elements** only take up as much width as needed and don't start on a new line.

```css
span {
  display: inline;
}
```

**Characteristics:**
- Only as wide as content
- Stays on the same line
- **Cannot** have width/height set
- Flows with text

**Common inline elements:** `span`, `a`, `strong`, `em`, `img`, `button`

**Example:**
```html
<span style="background: yellow;">Inline 1</span>
<span style="background: pink;">Inline 2</span>
<!-- They appear side by side -->
```

**Important:** Inline elements ignore `width`, `height`, and vertical `margin`/`padding` (top/bottom).

### 3. Inline-Block

**Inline-block** combines the best of both worlds!

```css
.box {
  display: inline-block;
  width: 100px;
  height: 100px;
}
```

**Characteristics:**
- Flows like inline (side by side)
- Can have width and height like block
- Respects all margins and padding

**Use cases:**
- Navigation menus
- Image galleries
- Button groups

**Example:**
```css
.nav-item {
  display: inline-block;
  width: 100px;
  padding: 10px;
  margin: 5px;
  background-color: #3498db;
}
```

### 4. None

Completely removes element from the page (not just visually):

```css
.hidden {
  display: none;
}
```

**vs visibility: hidden:**
```css
.invisible {
  visibility: hidden;  /* Hidden but still takes space */
}

.gone {
  display: none;  /* Completely removed from layout */
}
```

### 5. Flex (Modern Layout)

Creates a flexible container for laying out items:

```css
.container {
  display: flex;
}
```

We'll cover Flexbox in detail in an intermediate lesson!

### 6. Grid (Modern Layout)

Creates a grid-based layout:

```css
.container {
  display: grid;
}
```

We'll cover Grid in detail in an intermediate lesson!

### Display Property Comparison

| Property | Takes full width? | Starts new line? | Width/Height? | Use case |
|----------|------------------|------------------|---------------|----------|
| `block` | ✅ Yes | ✅ Yes | ✅ Yes | Sections, containers |
| `inline` | ❌ No | ❌ No | ❌ No | Text, links |
| `inline-block` | ❌ No | ❌ No | ✅ Yes | Navs, buttons |
| `flex` | ✅ Yes | ✅ Yes | ✅ Yes | Flexible layouts |
| `grid` | ✅ Yes | ✅ Yes | ✅ Yes | Grid layouts |
| `none` | N/A | N/A | N/A | Hide elements |

## Part 2: The Position Property

The `position` property controls WHERE an element appears and HOW it behaves when scrolling.

### 1. Static (Default)

Default positioning - elements follow normal document flow:

```css
.box {
  position: static;  /* Default, rarely written */
}
```

**Characteristics:**
- Follows normal flow
- `top`, `right`, `bottom`, `left` have no effect
- Not affected by `z-index`

### 2. Relative

Positioned **relative to its normal position**:

```css
.box {
  position: relative;
  top: 20px;     /* Move 20px down from normal position */
  left: 10px;    /* Move 10px right from normal position */
}
```

**Characteristics:**
- Stays in document flow (leaves space where it was)
- Can use `top`, `right`, `bottom`, `left` to offset
- Creates positioning context for absolute children
- Affected by `z-index`

**Example:**
```css
.badge {
  position: relative;
  top: -5px;  /* Move up slightly */
  left: 2px;  /* Move right */
}
```

### 3. Absolute

Completely **removed from document flow**, positioned relative to nearest positioned ancestor:

```css
.parent {
  position: relative;  /* Creates positioning context */
}

.child {
  position: absolute;
  top: 10px;
  right: 10px;
}
```

**Characteristics:**
- Removed from flow (doesn't leave space)
- Positioned relative to nearest `position: relative/absolute/fixed` ancestor
- If no positioned ancestor, uses `<body>`
- Can use `top`, `right`, `bottom`, `left`
- Affected by `z-index`

**Common Use Cases:**
```css
/* Notification badge */
.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  border-radius: 50%;
}

/* Close button */
.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Overlay */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
```

### 4. Fixed

Positioned relative to the **viewport** (browser window):

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
```

**Characteristics:**
- Removed from flow
- Stays in view when scrolling (doesn't move)
- Positioned relative to viewport
- Can use `top`, `right`, `bottom`, `left`
- Affected by `z-index`

**Common Use Cases:**
```css
/* Sticky header */
.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* Back to top button */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

/* Fixed sidebar */
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  width: 250px;
}
```

### 5. Sticky

A hybrid of `relative` and `fixed`:

```css
.table-header {
  position: sticky;
  top: 0;
  background: white;
}
```

**Characteristics:**
- Acts like `relative` until scroll threshold
- Then "sticks" like `fixed`
- Stays within parent container
- Requires `top`, `right`, `bottom`, or `left`

**Example:**
```css
/* Sticky navigation */
nav {
  position: sticky; 
  top: 0;  /* Sticks to top when scrolled */
  z-index: 100;
}

/* Sticky table headers */
th {
  position: sticky;
  top: 0;
  background: #f0f0f0;
}
```

## The Z-Index Property

Controls stacking order of positioned elements (higher = on top):

```css
.modal-overlay {
  position: fixed;
  z-index: 1000;
}

.modal {
  position: fixed;
  z-index: 1001;  /* Above overlay */
}

.tooltip {
  position: absolute;
  z-index: 9999;  /* Above everything */
}
```

**Key Rules:**
- Only works on positioned elements (`relative`, `absolute`, `fixed`, `sticky`)
- Higher number = on top
- Parent with lower z-index can't have children above siblings

## Centering Elements

### Horizontal Centering

#### Block Element:
```css
.container {
  width: 800px;
  margin: 0 auto;  /* Center horizontally */
}
```

#### Inline/Inline-Block:
```css
.parent {
  text-align: center;
}

.child {
  display: inline-block;
}
```

### Vertical Centering

#### Using Absolute Position:
```css
.parent {
  position: relative;
  height: 400px;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

#### Using Flexbox (Modern):
```css
.parent {
  display: flex;
  justify-content: center;  /* Horizontal */
  align-items: center;       /* Vertical */
  height: 400px;
}
```

## Common Patterns

### Card with Absolute Badge

```css
.card {
  position: relative;
  padding: 20px;
  border: 1px solid #ddd;
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
}
```

### Fixed Navigation

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

/* Add padding to body to prevent content hiding */
body {
  padding-top: 60px;  /* Height of navbar */
}
```

### Modal Overlay

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 8px;
  z-index: 1001;
  max-width: 500px;
  width: 90%;
}
```

## Best Practices

✅ Use `position: relative` on parent for absolute children  
✅ Use `z-index` strategically (don't go too high needlessly)  
✅ `position: fixed` for sticky headers/footers  
✅ `display: flex` for modern layouts (covered later)  
✅ Account for fixed element heights in page layout  
✅ Test sticky positioning across browsers

## Troubleshooting

**Problem:** Absolute element not positioning correctly  
**Solution:** Ensure parent has `position: relative`

**Problem:** Z-index not working  
**Solution:** Element must have `position` other than `static`

**Problem:** Fixed element too wide  
**Solution:** Set `left: 0; right: 0;` or specific width

## Practice Exercise

Create a card component with:
1. Card container with relative positioning
2. "New" badge in top-right corner (absolute)
3. Card should be `inline-block` with set dimensions
4. Add a sticky "Back to Top" button (fixed bottom-right)
5. Practice z-index by overlapping elements

**Bonus:** Create a modal with overlay using fixed positioning!

---

**Next Up:** Flexbox - The modern way to create flexible layouts!
