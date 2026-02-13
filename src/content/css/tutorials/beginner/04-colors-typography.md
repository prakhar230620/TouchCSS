---
id: "colors-typography"
language: "css"
level: "beginner"
title: "Colors & Typography"
description: "Master colors, fonts, and text styling in CSS"
duration: "30 min"
order: 4
prerequisites: ["intro-to-css", "selectors-basics", "box-model"]
---

# Colors & Typography

Colors and typography are what make websites visually appealing and readable. Good color choices and typography can make or break a website's user experience!

## Part 1: Colors in CSS

### Understanding Color Values

CSS offers multiple ways to define colors. Each method has its own use cases.

### 1. Named Colors

CSS has 140+ predefined color names:

```css
h1 {
  color: red;
  background-color: lightblue;
  border-color: navy;
}
```

**Common Named Colors:**
- `red`, `blue`, `green`, `yellow`, `purple`, `pink`
- `black`, `white`, `gray`
- `lightgray`, `darkgray`, `silver`
- `navy`, `teal`, `olive`, `maroon`
- `orange`, `violet`, `indigo`, `coral`

**When to use:** Quick prototyping, simple projects, or common colors.

### 2. Hexadecimal (Hex) Colors

Hex colors are the most common method in web development:

```css
h1 {
  color: #ff0000;  /* Red */
  color: #00ff00;  /* Green */
  color: #0000ff;  /* Blue */
  color: #333333;  /* Dark Gray */
  color: #fff;     /* Shorthand for #ffffff (White) */
}
```

**How Hex Works:**
- Format: `#RRGGBB` (Red, Green, Blue)
- Each pair is a value from 00 to FF (0 to 255 in decimal)
- `#ff0000` = Full red, no green, no blue
- `#00ff00` = No red, full green, no blue
- `#0000ff` = No red, no green, full blue

**Shorthand:**
- `#fff` = `#ffffff` (white)
- `#000` = `#000000` (black)
- `#f00` = `#ff0000` (red)

**Hex with Transparency (Alpha):**
```css
color: #ff000080;  /* Red with 50% opacity */
color: #00ff0033;  /* Green with 20% opacity */
```

### 3. RGB Colors

RGB (Red, Green, Blue) uses decimal values:

```css
h1 {
  color: rgb(255, 0, 0);    /* Red */
  color: rgb(0, 255, 0);    /* Green */
  color: rgb(0, 0, 255);    /* Blue */
  color: rgb(128, 128, 128); /* Gray */
}
```

**RGB Values:**
- Each value ranges from 0 to 255
- `rgb(255, 0, 0)` = Full red
- `rgb(0, 0, 0)` = Black
- `rgb(255, 255, 255)` = White

### 4. RGBA (RGB with Alpha/Transparency)

Add transparency to colors:

```css
.overlay {
  background-color: rgba(0, 0, 0, 0.5);  /* Black with 50% opacity */
}

.button {
  background-color: rgba(52, 152, 219, 0.8);  /* Blue with 80% opacity */
}
```

**Alpha Value:**
- Ranges from 0 to 1
- `0` = Fully transparent
- `0.5` = 50% transparent
- `1` = Fully opaque (no transparency)

**Real-World Use Cases:**
```css
/* Dark overlay on images */
.image-overlay {
  background-color: rgba(0, 0, 0, 0.6);
}

/* Frosted glass effect */
.glass {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}
```

### 5. HSL Colors (Hue, Saturation, Lightness)

HSL is more intuitive for creating color schemes:

```css
h1 {
  color: hsl(0, 100%, 50%);    /* Red */
  color: hsl(120, 100%, 50%);  /* Green */
  color: hsl(240, 100%, 50%);  /* Blue */
}
```

**Understanding HSL:**
- **Hue**: Color on the color wheel (0-360 degrees)
  - 0° = Red
  - 120° = Green
  - 240° = Blue
- **Saturation**: Color intensity (0%-100%)
  - 0% = Gray
  - 100% = Full color
- **Lightness**: How light/dark (0%-100%)
  - 0% = Black
  - 50% = Normal
  - 100% = White

**Creating Color Variations:**
```css
.primary {
  background-color: hsl(220, 80%, 50%);  /* Blue */
}

.primary-light {
  background-color: hsl(220, 80%, 70%);  /* Lighter blue */
}

.primary-dark {
  background-color: hsl(220, 80%, 30%);  /* Darker blue */
}

.primary-pale {
  background-color: hsl(220, 30%, 50%);  /* Pale blue */
}
```

### 6. HSLA (HSL with Alpha)

```css
.banner {
  background-color: hsla(220, 80%, 50%, 0.7);  /* Blue with transparency */
}
```

## Color Properties

### Basic Color Properties

```css
element {
  color: #333;                    /* Text color */
  background-color: #f0f0f0;      /* Background color */
  border-color: #ddd;             /* Border color */
  outline-color: blue;            /* Outline color */
}
```

### Gradients

Create smooth color transitions:

**Linear Gradient:**
```css
.banner {
  background: linear-gradient(to right, red, blue);
  /* Gradient from left to right */
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Diagonal gradient */
}

.card {
  background: linear-gradient(to bottom, 
    #ffffff 0%, 
    #f0f0f0 100%
  );
  /* Top to bottom gradient */
}
```

**Radial Gradient:**
```css
.circle {
  background: radial-gradient(circle, yellow, orange, red);
  /* Circular gradient from center */
}
```

## Color Best Practices

### 1. Contrast for Readability

Always ensure enough contrast between text and background:

```css
/* Good contrast ✅ */
.good {
  color: #333;
  background-color: #ffffff;
}

/* Poor contrast ❌ */
.bad {
  color: #ccc;
  background-color: #ddd;
}
```

**WCAG Standards:**
- Normal text: Contrast ratio of at least 4.5:1
- Large text: Contrast ratio of at least 3:1

### 2. Color Palettes

Create harmonious color schemes:

```css
:root {
  --primary: #3498db;      /* Main brand color */
  --secondary: #2ecc71;    /* Complementary color */
  --accent: #e74c3c;       /* Call-to-action color */
  --text: #333333;         /* Main text color */
  --text-light: #666666;   /* Secondary text */
  --background: #ffffff;   /* Background */
  --border: #e0e0e0;       /* Borders */
}
```

## Part 2: Typography

Typography is the art of arranging text to make it readable and appealing.

### Font Properties

### 1. font-family

```css
body {
  font-family: Arial, Helvetica, sans-serif;
  /* Try Arial first, then Helvetica, then any sans-serif */
}

h1 {
  font-family: 'Georgia', 'Times New Roman', serif;
  /* Serif fonts for headings */
}

code {
  font-family: 'Courier New', monospace;
  /* Monospace for code */
}
```

**Font Families:**
- **Serif**: Georgia, Times New Roman (formal, traditional)
- **Sans-serif**: Arial, Helvetica, Verdana (modern, clean)
- **Monospace**: Courier New, Consolas (code, fixed-width)
- **Cursive**: Brush Script, Comic Sans (decorative)
- **Fantasy**: Impact, Papyrus (display, headings)

### 2. Google Fonts

Use beautiful web fonts for free:

**In HTML:**
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

**In CSS:**
```css
body {
  font-family: 'Roboto', sans-serif;
}
```

**Popular Google Fonts:**
- Roboto, Open Sans, Lato (clean, modern)
- Montserrat, Poppins (headings)
- Playfair Display, Merriweather (elegant)

### 3. font-size

```css
body {
  font-size: 16px;  /* Base size */
}

h1 {
  font-size: 48px;
  font-size: 3rem;  /* 3 × root font size */
  font-size: 3em;   /* 3 × parent font size */
}

p {
  font-size: 1rem;  /* Recommended: use rem */
}

.small {
  font-size: 0.875rem;  /* 14px if base is 16px */
}
```

**Size Units:**
- `px` - Fixed pixels
- `rem` - Relative to root font size (best!)
- `em` - Relative to parent font size
- `%` - Percentage of parent

**Typography Scale:**
```css
.text-xs { font-size: 0.75rem; }   /* 12px */
.text-sm { font-size: 0.875rem; }  /* 14px */
.text-base { font-size: 1rem; }    /* 16px */
.text-lg { font-size: 1.125rem; }  /* 18px */
.text-xl { font-size: 1.25rem; }   /* 20px */
.text-2xl { font-size: 1.5rem; }   /* 24px */
.text-3xl { font-size: 1.875rem; } /* 30px */
.text-4xl { font-size: 2.25rem; }  /* 36px */
```

### 4. font-weight

```css
p {
  font-weight: normal;  /* 400 */
  font-weight: bold;    /* 700 */
  font-weight: 300;     /* Light */
  font-weight: 600;     /* Semi-bold */
  font-weight: 900;     /* Extra bold */
}
```

**Weight Values:**
- 100-300: Thin to Light
- 400: Normal
- 500-600: Medium to Semi-bold
- 700: Bold
- 800-900: Extra bold to Black

### 5. font-style

```css
em {
  font-style: italic;
}

.normal {
  font-style: normal;
}

.oblique {
  font-style: oblique;
}
```

### 6. line-height

Controls spacing between lines of text:

```css
body {
  line-height: 1.6;  /* 1.6 × font size */
}

h1 {
  line-height: 1.2;  /* Tight for headings */
}

p {
  line-height: 1.8;  /* Comfortable for reading */
}
```

**Best Practices:**
- Body text: 1.5 to 1.8
- Headings: 1.2 to 1.4
- Tight spaces: 1.0 to 1.2

### 7. text-align

```css
h1 {
  text-align: left;     /* Default */
  text-align: center;   /* Centered */
  text-align: right;    /* Right-aligned */
  text-align: justify;  /* Justified (avoid for web) */
}
```

### 8. text-decoration

```css
a {
  text-decoration: none;  /* Remove underline */
}

.underline {
  text-decoration: underline;
}

.line-through {
  text-decoration: line-through;  /* Strike-through */
}

.overline {
  text-decoration: overline;
}
```

### 9. text-transform

```css
.uppercase {
  text-transform: uppercase;  /* ALL CAPS */
}

.lowercase {
  text-transform: lowercase;  /* all lowercase */
}

.capitalize {
  text-transform: capitalize;  /* First Letter Capital */
}
```

### 10. letter-spacing & word-spacing

```css
h1 {
  letter-spacing: 2px;  /* Space between letters */
}

.spaced {
  word-spacing: 5px;    /* Space between words */
}

.tight {
  letter-spacing: -0.5px;  /* Tighter spacing */
}
```

## Advanced Typography

### Text Shadow

```css
h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  /* x-offset, y-offset, blur, color */
}

.glow {
  text-shadow: 0 0 10px #fff, 0 0 20px #fff;
}
```

### Web-Safe Font Stacks

```css
body {
  /* System font stack (modern) */
  font-family: -apple-system, BlinkMacSystemFont, 
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
    'Open Sans', 'Helvetica Neue', sans-serif;
}
```

## Complete Typography Example

```css
:root {
  --font-sans: 'Inter', Arial, sans-serif;
  --font-serif: 'Merriweather', Georgia, serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
}

body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  line-height: 1.3;
  font-weight: 700;
  color: #222;
}

h1 { font-size: 2.5rem; margin-bottom: 1rem; }
h2 { font-size: 2rem; margin-bottom: 0.875rem; }
h3 { font-size: 1.5rem; margin-bottom: 0.75rem; }

p {
  margin-bottom: 1rem;
  max-width: 65ch;  /* Optimal reading width */
}

code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background-color: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
}
```

## Accessibility Guidelines

✅ **Minimum font size**: 16px for body text  
✅ **Line height**: 1.5 minimum for body text  
✅ **Contrast**: 4.5:1 ratio minimum  
✅ **Line length**: 50-75 characters per line  
✅ **Avoid**: All caps for long text, pure black on pure white

## Practice Exercise

Create a blog post design with:
1. A primary color (#3498db) and accent color (#e74c3c)
2. Heading in serif font, body in sans-serif
3. Body text at 18px with 1.7 line height
4. Gradient background for header
5. Proper color contrast (test with contrast checker)
6. Add hover effects on links

**Bonus:** Create a dark mode version!

---

**Next Lesson:** Display & Positioning - Controlling element layout and flow!
