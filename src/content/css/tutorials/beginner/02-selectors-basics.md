---
id: "selectors-basics"
language: "css"
level: "beginner"
title: "CSS Selectors & Specificity"
description: "Master the art of selecting and targeting HTML elements"
duration: "25 min"
order: 2
prerequisites: ["intro-to-css"]
---

# CSS Selectors & Specificity

Selectors are one of the most important concepts in CSS. They tell CSS **which HTML elements** you want to style. Think of selectors as a way to point at specific elements on your page and say "I want to change YOU!"

## Why Selectors Matter

Imagine you have a webpage with 50 paragraphs. What if you only want to style paragraphs inside a specific section? Or maybe you want all buttons to look the same except one special button? **Selectors** give you this power and precision.

## Types of Basic Selectors

### 1. Element Selector (Type Selector)

The **element selector** selects ALL elements of a specific type.

```css
p {
  color: black;
  font-size: 16px;
}
```

**What this does:**
- Finds every single `<p>` element on the page
- Makes all paragraph text black and 16 pixels in size

**When to use:** When you want consistent styling across all elements of the same type.

**Example:**
```css
h1 {
  font-size: 36px;
  color: #333;
}

button {
 background-color: blue;
  color: white;
  padding: 10px 20px;
}
```

### 2. Class Selector

The **class selector** selects ALL elements with a specific class name. Classes are reusable and can be applied to multiple elements.

```css
.highlight {
  background-color: yellow;
  padding: 5px;
}
```

**HTML:**
```html
<p class="highlight">This paragraph is highlighted</p>
<span class="highlight">This span is also highlighted</span>
```

**What this does:**
- Finds any element with `class="highlight"`
- Applies yellow background and padding to all of them

**Key Points:**
- Start with a dot (`.`) in CSS
- Can be used on multiple elements
- One element can have multiple classes: `<div class="card highlight rounded">`

**Real-world example:**
```css
.btn {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: blue;
  color: white;
}

.btn-danger {
  background-color: red;
  color: white;
}
```

### 3. ID Selector

The **ID selector** selects ONE unique element with a specific ID. IDs should be unique - only ONE element on the page should have a particular ID.

```css
#header {
  font-size: 24px;
  background-color: lightgray;
  padding: 20px;
}
```

**HTML:**
```html
<div id="header">Website Header</div>
```

**What this does:**
- Finds the ONE element with `id="header"`
- Applies the styles to it

**Key Points:**
- Start with a hash (#) in CSS
- Should be unique on the page
- More specific than classes (higher priority)

**When to use IDs vs Classes:**
- **ID**: Navigation bar, main content area, footer (unique elements)
- **Class**: Buttons, cards, text styles (reusable elements)

### 4. Universal Selector

The **universal selector** (`*`) selects EVERY element on the page.

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**What this does:**
- Applies styles to every single element
- Commonly used to reset default browser styles

**Warning:** Use sparingly as it affects performance on large pages.

## Combining Selectors

### Descendant Selector (Space)

Selects elements that are **anywhere inside** another element (not just direct children).

```css
div p {
  color: blue;
}
```

**HTML:**
```html
<div>
  <p>This is blue</p>
  <section>
    <p>This is also blue (nested deeper)</p>
  </section>
</div>
<p>This is NOT blue (outside the div)</p>
```

### Child Selector (>)

Selects elements that are **direct children** only.

```css
div > p {
  color: red;
}
```

**HTML:**
```html
<div>
  <p>This is red (direct child)</p>
  <section>
    <p>This is NOT red (not a direct child)</p>
  </section>
</div>
```

### Adjacent Sibling Selector (+)

Selects an element that comes **immediately after** another element.

```css
h1 + p {
  font-size: 20px;
  font-weight: bold;
}
```

**HTML:**
```html
<h1>Title</h1>
<p>This paragraph is styled (comes right after h1)</p>
<p>This paragraph is NOT styled</p>
```

### General Sibling Selector (~)

Selects ALL siblings that come after an element.

```css
h1 ~ p {
  color: gray;
}
```

### Multiple Selectors (Comma)

Apply the same styles to multiple selectors.

```css
h1, h2, h3 {
  font-family: Arial, sans-serif;
  color: #333;
}
```

**What this does:** All h1, h2, AND h3 elements get the same font and color.

## Attribute Selectors

Select elements based on their HTML attributes.

### Basic Attribute Selector

```css
input[type="text"] {
  border: 1px solid gray;
  padding: 5px;
}
```

Styles all text input fields.

### Starts With (^=)

```css
a[href^="https"] {
  color: green;
}
```

Styles links that start with "https".

### Ends With ($=)

```css
img[src$=".png"] {
  border: 2px solid blue;
}
```

Styles images ending with ".png".

### Contains (*=)

```css
a[href*="youtube"] {
  color: red;
}
```

Styles links containing "youtube" anywhere in the URL.

## Pseudo-Classes

Pseudo-classes select elements based on their **state** or **position**.

### Interactive States

```css
a:link {
  color: blue;  /* Unvisited link */
}

a:visited {
  color: purple;  /* Visited link */
}

a:hover {
  color: red;  /* When user hovers */
  text-decoration: underline;
}

a:active {
  color: orange;  /* When being clicked */
}

input:focus {
  outline: 2px solid blue;  /* When input is selected */
  background-color: #f0f0f0;
}

button:disabled {
  opacity: 0.5;  /* Disabled button */
  cursor: not-allowed;
}
```

### Position-based Pseudo-classes

```css
li:first-child {
  font-weight: bold;  /* First item in list */
}

li:last-child {
  border-bottom: none;  /* Last item */
}

li:nth-child(odd) {
  background-color: #f0f0f0;  /* Odd rows */
}

li:nth-child(even) {
  background-color: white;  /* Even rows */
}

p:nth-child(3) {
  color: red;  /* Third paragraph */
}
```

## Pseudo-Elements

Pseudo-elements style specific **parts** of an element.

```css
p::first-line {
  font-weight: bold;  /* First line of paragraph */
}

p::first-letter {
  font-size: 2em;  /* Drop cap effect */
  color: red;
}

p::before {
  content: "→ ";  /* Add content before */
  color: blue;
}

p::after {
  content: " ✓";  /* Add content after */
  color: green;
}
```

## CSS Specificity - Understanding Priority

When multiple CSS rules target the same element, **specificity** determines which style wins.

### The Specificity Hierarchy

Think of specificity like a scoring system:

| Selector Type | Points | Example |
|---------------|--------|---------|
| Element/Pseudo-element | 1 | `p`, `div`, `::before` |
| Class/Pseudo-class/Attribute | 10 | `.class`, `:hover`, `[type]` |
| ID | 100 | `#header` |
| Inline Style | 1000 | `style="color: red;"` |

### Calculating Specificity

```css
/* Specificity: 1 (element) */
p {
  color: black;
}

/* Specificity: 10 (class) - WINS over element */
.text {
  color: blue;
}

/* Specificity: 100 (ID) - WINS over class */
#main {
  color: red;
}

/* Specificity: 11 (element + class) */
p.text {
  color: green;
}

/* Specificity: 111 (ID + class + element) */
#main .text p {
  color: purple;
}
```

### Real Example

```html
<p class="intro" id="welcome">What color am I?</p>
```

```css
p { color: black; }           /* 1 point */
.intro { color: blue; }        /* 10 points */
#welcome { color: red; }       /* 100 points - WINS! */
```

**Result:** The text will be RED because ID has the highest specificity.

### The !important Override

```css
p {
  color: black !important;
}

#welcome {
  color: red;  /* This won't work! */
}
```

`!important` overrides everything, but **avoid using it** as it makes debugging difficult.

## Best Practices

✅ **Use classes** for styling most elements  
✅ **Use IDs** sparingly, mainly for JavaScript or unique sections  
✅ **Keep specificity low** to make CSS easier to maintain  
✅ **Avoid !important** unless absolutely necessary  
✅ **Use meaningful names** like `.btn-primary` instead of `.blue-button`

## Interactive Practice

**Challenge:** What color will this text be?

```html
<style>
  p { color: black; }
  .highlight { color: blue; }
  #special { color: red; }
  p.highlight { color: green; }
</style>

<p class="highlight" id="special">What color am I?</p>
```

**Answer:** RED! The ID selector (#special = 100 points) beats everything else.

## Practice Exercise

Create a webpage with:
1. A navigation bar with links
2. Style links to be blue
3. Make links turn red on hover
4. Give the first link in the nav a bold font
5. Create a class `.active` that makes link background yellow
6. Use the ID `#logo` to style the nav logo

**Bonus:** Add :nth-child to create alternating row colors!

---

**Next Lesson:** Box Model - Understanding how CSS calculates element size and spacing!
