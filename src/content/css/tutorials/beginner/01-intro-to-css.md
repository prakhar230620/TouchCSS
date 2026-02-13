---
id: "intro-to-css"
language: "css"
level: "beginner"
title: "Introduction to CSS"
description: "Learn what CSS is and how it styles web pages"
duration: "15 min"
order: 1
prerequisites: []
---

# Introduction to CSS

Welcome to your first CSS lesson! CSS (Cascading Style Sheets) is the language that makes websites beautiful and user-friendly.

## What is CSS?

**CSS** stands for **Cascading Style Sheets**. Think of HTML as the skeleton of a webpage - it defines the structure and content. CSS is like the clothing, makeup, and decoration that makes the skeleton look good!

Without CSS, every website would look like a boring text document from the 1990s - just black text on a white background with blue underlined links. CSS transforms these plain pages into modern, colorful, and engaging websites.

### Why "Cascading"?

The word "cascading" means that styles can come from different places and "flow down" like a waterfall. When multiple styles apply to the same element, CSS has rules to decide which style wins. Don't worry - we'll cover this in detail later!

## What Can CSS Do?

CSS is incredibly powerful and controls almost everything you see on a website:

### 🎨 **Visual Styling**
- **Colors** - Text color, background color, border color
- **Fonts** - Font family, size, weight, style
- **Spacing** - Margins, padding, line height
- **Borders** - Style, width, radius (rounded corners)

### 📐 **Layout & Positioning**
- **Positioning** - Where elements appear on the page
- **Flexbox** - Modern layout system for rows and columns
- **Grid** - Two-dimensional layout system
- **Responsive Design** - Making sites work on all screen sizes

### ✨ **Visual Effects**
- **Animations** - Moving elements smoothly
- **Transitions** - Smooth changes between states
- **Transforms** - Rotating, scaling, skewing elements
- **Shadows** - Box shadows and text shadows

## How CSS Works - The Basics

CSS works by **selecting** HTML elements and **applying rules** to them. Let's break this down:

### The CSS Syntax

Every CSS rule follows this pattern:

```css
selector {
  property: value;
  another-property: another-value;
}
```

Let's understand each part:

- **Selector** - Tells CSS which HTML element(s) to style
- **Property** - What aspect you want to change (color, size, etc.)
- **Value** - What you want to change it to
- **Curly braces { }** - Wraps all the styling rules
- **Semicolon ;** - Ends each property-value pair

### Real Example

```css
h1 {
  color: blue;
  font-size: 32px;
  font-weight: bold;
}
```

**What this does:**
- Finds all `<h1>` heading elements on the page
- Makes their text color blue
- Sets their font size to 32 pixels
- Makes them bold

### Another Example

```css
p {
  color: #333333;
  line-height: 1.6;
  margin-bottom: 20px;
}
```

**What this does:**
- Finds all `<p>` paragraph elements
- Makes text dark gray (hex color #333333)
- Adds comfortable spacing between lines (1.6 times the font size)
- Adds 20 pixels of space below each paragraph

## Three Ways to Add CSS to Your Webpage

You can add CSS to HTML in three different ways. Each has its own use case:

### 1. Inline CSS (Not Recommended)

Add CSS directly to an HTML element using the `style` attribute:

```html
<h1 style="color: blue; font-size: 32px;">Hello World</h1>
```

**When to use:** Almost never! It's hard to maintain and reuse.

**Example:**
```html
<p style="color: red; font-weight: bold;">This is a red, bold paragraph.</p>
```

### 2. Internal CSS (Good for Single Pages)

Add CSS inside a `<style>` tag in the HTML `<head>`:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h1 {
      color: blue;
      font-size: 32px;
    }
    p {
      color: gray;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is a paragraph.</p>
</body>
</html>
```

**When to use:** Small projects, single-page websites, or email templates.

### 3. External CSS (Best Practice! ⭐)

Create a separate `.css` file and link it to your HTML:

**styles.css:**
```css
h1 {
  color: blue;
  font-size: 32px;
}

p {
  color: gray;
  line-height: 1.5;
}
```

**index.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Hello World</h1>
  <p>This is a paragraph.</p>
</body>
</html>
```

**Why this is best:**
✅ **Reusability** - Use the same CSS file on multiple pages  
✅ **Organization** - Keep HTML and CSS separate  
✅ **Performance** - Browser can cache the CSS file  
✅ **Maintainability** - Easy to find and update styles

## Colors in CSS

CSS offers multiple ways to specify colors:

### Named Colors
```css
color: red;
color: blue;
color: lightgreen;
```

### Hex Colors (Most Common)
```css
color: #ff0000;  /* Red */
color: #0000ff;  /* Blue */
color: #333333;  /* Dark Gray */
```

### RGB Colors
```css
color: rgb(255, 0, 0);  /* Red */
color: rgba(255, 0, 0, 0.5);  /* Semi-transparent Red */
```

## Comments in CSS

Use comments to add notes in your code:

```css
/* This is a single-line comment */

/*
  This is a
  multi-line comment
  for longer explanations
*/

h1 {
  color: blue; /* This makes the heading blue */
}
```

## Your First CSS Code!

Let's practice! Try modifying this code:

```css
h1 {
  color: red;
  font-size: 48px;
  text-align: center;
}

p {
  color: #555555;
  font-size: 18px;
  line-height: 1.6;
}
```

**Experiment:**
- Change `red` to `blue`, `green`, or `#ff6b6b`
- Try different font sizes like `24px`, `36px`, `64px`
- Change text-align to `left`, `right`, or `justify`

## Key Takeaways

✅ **CSS** stands for Cascading Style Sheets  
✅ CSS **styles** HTML elements to make them look good  
✅ CSS uses **selectors** to choose which elements to style  
✅ CSS syntax: `selector { property: value; }`  
✅ **External stylesheets** are the best practice for real projects  
✅ CSS controls colors, fonts, layouts, animations, and more!

## What's Next?

In the next lesson, you'll learn about **CSS Selectors** - the different ways to target and select HTML elements for styling. This is a crucial skill for writing effective CSS!

---

**Practice Exercise:** 

Create an HTML file with:
- A heading (`<h1>`)
- Two paragraphs (`<p>`)
- Create an external CSS file
- Style the heading with a color and larger font size
- Style the paragraphs with a different color and comfortable line spacing

**Bonus Challenge:** Try adding a background color to the whole page using the `body` selector!
