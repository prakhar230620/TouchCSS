---
id: "advanced-selectors"
language: "css"
level: "advanced"
title: "Advanced Selectors & Pseudo-elements"
description: "Master complex selectors, pseudo-classes, and pseudo-elements"
duration: "30 min"
order: 3
prerequisites: ["container-queries"]
---

# Advanced CSS Selectors

Master advanced selectors for powerful, precise styling!

## Advanced Pseudo-Classes

### :is() - Matches Any

```css
/* Instead of: */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', sans-serif;
}

/* Use: */
:is(h1, h2, h3, h4, h5, h6) {
  font-family: 'Poppins', sans-serif;
}

/* Complex example */
:is(article, section, aside) :is(h1, h2, h3) {
  margin-top: 2rem;
}
```

### :where() - Zero Specificity

```css
/* Same as :is() but with 0 specificity */
:where(h1, h2, h3) {
  color: blue;
}

h1 {
  color: red;  /* This wins! */
}
```

### :not() - Negation

```css
/* All buttons except disabled */
button:not(:disabled) {
  cursor: pointer;
}

/* All inputs except checkboxes and radios */
input:not([type="checkbox"]):not([type="radio"]) {
  padding: 8px;
}

/* Multiple negations */
li:not(:first-child):not(:last-child) {
  border-bottom: 1px solid #ddd;
}
```

### :has() - Parent Selector

```css
/* Card that has an image */
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* Form with errors */
form:has(.error) {
  border: 2px solid red;
}

/* Heading followed by paragraph */
h2:has(+ p) {
  margin-bottom: 0.5rem;
}

/* Article without images */
article:not(:has(img)) {
  text-align: center;
}
```

### Structural Pseudo-Classes

```css
/* Nth-child patterns */
li:nth-child(odd) { background: #f5f5f5; }
li:nth-child(even) { background: white; }
li:nth-child(3n) { /* Every 3rd item */ }
li:nth-child(3n+1) { /* 1st, 4th, 7th... */ }

/* Nth-of-type */
p:nth-of-type(2) { /* 2nd paragraph */ }
div:nth-of-type(odd) { /* Odd divs only */ }

/* First and last */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }

/* Only child */
p:only-child {
  /* Paragraph is the only child */
  text-align: center;
}

/* Only of type */
img:only-of-type {
  /* Only image in container */
  margin: 0 auto;
}
```

### :empty

```css
/* Elements with no children */
.message:empty {
  display: none;
}

.container:empty::before {
  content: "No items available";
  color: #999;
}
```

### Form Pseudo-Classes

```css
/* Input states */
input:focus { outline: 2px solid blue; }
input:disabled { opacity: 0.5; }
input:read-only { background: #f5f5f5; }

/* Validation */
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:required { border-left: 3px solid blue; }
input:optional { border-left: 3px solid gray; }

/* Checkboxes and radios */
input:checked { background: blue; }
input:indeterminate { background: orange; }

/* In-range and out-of-range */
input[type="number"]:in-range { border-color: green; }
input[type="number"]:out-of-range { border-color: red; }

/* Placeholder */
input:placeholder-shown { font-style: italic; }
```

## Advanced Attribute Selectors

### Exact Match

```css
[data-theme="dark"] {
  background: #1a1a1a;
}
```

### Starts With

```css
/* Links starting with https */
a[href^="https"] {
  color: green;
}

/* Classes starting with icon- */
[class^="icon-"] {
  display: inline-block;
  width: 16px;
}
```

### Ends With

```css
/* PDF links */
a[href$=".pdf"]::after {
  content: " 📄";
}

/* Image files */
img[src$=".svg"] {
  /* SVG-specific styles */
}
```

### Contains

```css
/* Elements with 'error' in class */
[class*="error"] {
  color: red;
}

/* Links containing 'download' */
a[href*="download"] {
  font-weight: bold;
}
```

### Case-Insensitive

```css
/* Match regardless of case */
a[href$=".PDF" i] {
  /* Matches .pdf, .PDF, .Pdf, etc. */
}
```

### Whitespace-Separated

```css
/* Class list contains 'active' */
[class~="active"] {
  /* Matches class="card active" */
}
```

### Language/Dash-Separated

```css
/* Language attribute */
[lang|="en"] {
  /* Matches en, en-US, en-GB, etc. */
}
```

## Pseudo-Elements

### ::before and ::after

```css
.button::before {
  content: "→ ";
}

.button::after {
  content: " ←";
}

/* Decorative elements */
.quote::before {
  content: """;
  font-size: 3rem;
  color: #ccc;
}

/* Icons */
.external-link::after {
  content: " ↗";
}

/* Clearfix */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

### ::first-letter

```css
p::first-letter {
  font-size: 3rem;
  font-weight: bold;
  float: left;
  margin-right: 0.5rem;
  line-height: 1;
}
```

### ::first-line

```css
p::first-line {
  font-weight: bold;
  color: #3F51B5;
  text-transform: uppercase;
}
```

### ::selection

```css
::selection {
  background: #3F51B5;
  color: white;
}

/* Firefox */
::-moz-selection {
  background: #3F51B5;
  color: white;
}
```

### ::marker

```css
/* Custom list markers */
li::marker {
  content: "✓ ";
  color: green;
  font-size: 1.2em;
}

/* Styled counters */
ol {
  counter-reset: item;
}

ol li::marker {
  content: counter(item) ". ";
  color: #3F51B5;
  font-weight: bold;
}

ol li {
  counter-increment: item;
}
```

### ::placeholder

```css
input::placeholder {
  color: #999;
  font-style: italic;
  opacity: 0.7;
}
```

## Combinators

### Descendant (Space)

```css
/* All p inside article */
article p {
  line-height: 1.6;
}
```

### Child (>)

```css
/* Direct children only */
nav > ul > li {
  display: inline-block;
}
```

### Adjacent Sibling (+)

```css
/* p immediately after h2 */
h2 + p {
  margin-top: 0;
  font-weight: bold;
}
```

### General Sibling (~)

```css
/* All p after h2 */
h2 ~ p {
  color: #666;
}
```

## Complex Selector Patterns

### Card with Image Layout

```css
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.card:not(:has(img)) {
  text-align: center;
  padding: 2rem;
}
```

### Zebra Striping (Skip First)

```css
tr:nth-child(n+2):nth-child(odd) {
  background: #f5f5f5;
}
```

### First 3 Items

```css
li:nth-child(-n+3) {
  font-weight: bold;
}
```

### Last 3 Items

```css
li:nth-last-child(-n+3) {
  opacity: 0.7;
}
```

### All Except First and Last

```css
li:not(:first-child):not(:last-child) {
  border-bottom: 1px solid #ddd;
}
```

## Practical Examples

### Star Rating

```css
.stars {
  display: inline-flex;
}

.star {
  color: gold;
}

.star:not(.active) {
  color: #ccc;
}

/* Hover effect */
.stars:hover .star {
  color: #ccc;
}

.star:hover,
.star:hover ~ .star {
  color: gold;
}
```

### Breadcrumb Separator

```css
.breadcrumb li:not(:last-child)::after {
  content: " / ";
  margin: 0 0.5rem;
  color: #999;
}
```

### External Links

```css
a[href^="http"]:not([href*="yourdomain.com"])::after {
  content: " ↗";
  font-size: 0.8em;
}
```

### Required Field Indicator

```css
label:has(+ input:required)::after {
  content: " *";
  color: red;
}
```

### Custom Checkbox

``css
input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #3F51B5;
  border-radius: 4px;
  position: relative;
}

input[type="checkbox"]:checked::before {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #3F51B5;
}
```

### Tooltip

```css
[data-tooltip] {
  position: relative;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

[data-tooltip]:hover::after {
  opacity: 1;
}
```

## Browser Support Considerations

```css
/* Feature detection */
@supports selector(:has(*)) {
  .container:has(.child) {
    /* :has() supported */
  }
}

@supports not selector(:has(*)) {
  .container {
    /* Fallback styles */
  }
}
```

## Performance Tips

✅ **Keep selectors simple** when possible  
✅ **Avoid universal selectors** in complex chains  
✅ **Use classes** for better performance  
❌ **Avoid** deeply nested selectors

```css
/* ✅ Good */
.card-title { }

/* ❌ Avoid */
div > div > div > span.title { }
```

## Key Takeaways

✅ `:is()` simplifies complex selectors  
✅ `:has()` = parent selector (game changer!)  
✅ `:not()` for exclusions  
✅ `:where()` for zero-specificity  
✅ `::before` and `::after` for decorative content  
✅ Attribute selectors are powerful  
✅ Structural pseudo-classes for patterns  
✅ Combine selectors thoughtfully

## Practice Exercise

Create a complex article layout using advanced selectors:
- First paragraph larger and bold (::first-line)
- Drop cap on first letter (::first-letter)
- External links with icon (attribute selector + ::after)
- Custom list markers (::marker)
- Blockquote with decorative quotes (::before/::after)
- Zebra striping on tables
- Form with required field indicators
- Show validation states with :valid/:invalid
- Use :has() for conditional layouts

---

**Congratulations! You've completed the CSS Advanced Course!**
