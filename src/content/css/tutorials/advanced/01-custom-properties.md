---
id: "custom-properties"
language: "css"
level: "advanced"
title: "CSS Custom Properties (Variables)"
description: "Master CSS variables for dynamic, maintainable stylesheets"
duration: "25 min"
order: 1
prerequisites: ["responsive-design"]
---

# CSS Custom Properties

CSS variables make your code maintainable, themeable, and dynamic!

## What are Custom Properties?

Custom properties (CSS variables) let you store values that can be reused throughout your stylesheet.

### Basic Syntax

```css
:root {
  --primary-color: #3F51B5;
  --spacing: 20px;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing);
}
```

## Defining Variables

### Global Variables (Root)

```css
:root {
  --primary-color: #3F51B5;
  --secondary-color: #FF4081;
  --font-family: 'Arial', sans-serif;
  --border-radius: 8px;
}
```

### Scoped Variables

```css
.card {
  --card-padding: 20px;
  --card-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
}
```

## Using Variables

### var() Function

```css
.element {
  color: var(--primary-color);
  /* Uses the variable value */
}
```

### Fallback Values

```css
.element {
  color: var(--undefined-color, #000);
  /* Uses #000 if variable doesn't exist */
}
```

### Nested Variables

```css
:root {
  --base-size: 16px;
  --large-size: calc(var(--base-size) * 2);  /* 32px */
}
```

## Practical Examples

### Color System

```css
:root {
  /* Primary Colors */
  --primary: #3F51B5;
  --primary-light: #7986CB;
  --primary-dark: #303F9F;
  
  /* Secondary Colors */
  --secondary: #FF4081;
  --secondary-light: #FF80AB;
  --secondary-dark: #F50057;
  
  /* Neutral Colors */
  --gray-100: #F5F5F5;
  --gray-200: #EEEEEE;
  --gray-300: #E0E0E0;
  --gray-800: #424242;
  --gray-900: #212121;
  
  /* Semantic Colors */
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #F44336;
  --info: #2196F3;
}

.button-primary {
  background: var(--primary);
  color: white;
}

.alert-success {
  background: var(--success);
  color: white;
}
```

### Spacing System

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
}

.card {
  padding: var(--space-lg);
  margin-bottom: var(--space-md);
}

.button {
  padding: var(--space-sm) var(--space-md);
}
```

### Typography System

```css
:root {
  --font-family-base: 'Inter', sans-serif;
  --font-family-heading: 'Poppins', sans-serif;
  --font-family-mono: 'Fira Code', monospace;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

h1 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
}
```

## Dynamic Theming

### Light/Dark Mode

```css
:root {
  --bg: #FFFFFF;
  --text: #212121;
  --border: #E0E0E0;
}

[data-theme="dark"] {
  --bg: #212121;
  --text: #FFFFFF;
  --border: #424242;
}

body {
  background: var(--bg);
  color: var(--text);
}

.card {
  border: 1px solid var(--border);
}
```

```javascript
// Toggle theme
document.documentElement.setAttribute('data-theme', 'dark');
```

### Multiple Themes

```css
:root {
  --primary: #3F51B5;
}

[data-theme="red"] {
  --primary: #F44336;
}

[data-theme="green"] {
  --primary: #4CAF50;
}

[data-theme="purple"] {
  --primary: #9C27B0;
}

.button {
  background: var(--primary);
}
```

## Responsive Variables

```css
:root {
  --container-width: 100%;
  --font-size: 14px;
}

@media (min-width: 768px) {
  :root {
    --container-width: 750px;
    --font-size: 16px;
  }
}

@media (min-width: 1200px) {
  :root {
    --container-width: 1140px;
    --font-size: 18px;
  }
}

.container {
  max-width: var(--container-width);
}

body {
  font-size: var(--font-size);
}
```

## calc() with Variables

```css
:root {
  --base-size: 16px;
  --multiplier: 1.5;
}

.heading {
  font-size: calc(var(--base-size) * var(--multiplier));
  /* 24px */
}

.container {
  width: calc(100% - var(--space-lg) * 2);
  /* Full width minus padding on both sides */
}
```

## JavaScript Integration

```javascript
// Get variable value
const root = document.documentElement;
const primaryColor = getComputedStyle(root)
  .getPropertyValue('--primary-color');

// Set variable value
root.style.setProperty('--primary-color', '#FF0000');

// Remove variable
root.style.removeProperty('--primary-color');
```

### Dynamic Color Generation

```javascript
// User selects a color
function updateTheme(color) {
  document.documentElement.style.setProperty('--primary', color);
  
  // Generate lighter version
  document.documentElement.style.setProperty(
    '--primary-light',
    lighten(color, 20)
  );
}
```

## Advanced Patterns

### Component-Level Variables

```css
.card {
  --card-bg: white;
  --card-padding: 20px;
  --card-radius: 8px;
  
  background: var(--card-bg);
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}

.card--dark {
  --card-bg: #212121;
  /* Inherits other variables */
}
```

### State-Based Variables

```css
.button {
  --button-bg: var(--primary);
  background: var(--button-bg);
  transition: background 0.3s;
}

.button:hover {
  --button-bg: var(--primary-dark);
}

.button:disabled {
  --button-bg: var(--gray-300);
}
```

### Animation with Variables

```css
@keyframes slide {
  from { transform: translateX(var(--start, 0)); }
  to { transform: translateX(var(--end, 100px)); }
}

.element {
  --start: -100px;
  --end: 0;
  animation: slide 1s;
}
```

## Design System Example

```css
:root {
  /* Colors */
  --primary: #3F51B5;
  --secondary: #FF4081;
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #F44336;
  
  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-base: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-base: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  
  /* Transitions */
  --transition-fast: 150ms;
  --transition-base: 300ms;
  --transition-slow: 500ms;
}
```

## Best Practices

✅ **Use `:root` for global variables**  
✅ **Name variables descriptively** (`--primary-color` not `--blue`)  
✅ **Group related variables**  
✅ **Use fallback values for safety**  
✅ **Combine with calc() for flexibility**  
✅ **Update via JavaScript for dynamic UIs**

## Common Use Cases

### 1. Theming
```css
[data-theme="ocean"] {
  --primary: #006994;
  --secondary: #0091B3;
}
```

### 2. Component Variants
```css
.button--large {
  --button-size: 48px;
}
```

### 3. Responsive Sizing
```css
@media (min-width: 768px) {
  :root {
    --container-padding: 40px;
  }
}
```

### 4. Animation Parameters
```css
.animated {
  --animation-duration: 1s;
  animation: fade var(--animation-duration);
}
```

## Key Takeaways

✅ Custom properties are reusable values  
✅ Use `var()` to access them  
✅ Can be updated with JavaScript  
✅ Perfect for theming and design systems  
✅ Scoped to elements (cascade)  
✅ Support calc() and other functions  
✅ Fallback values prevent errors

## Practice Exercise

Create a complete design system with:
- Color palette (primary, secondary, neutrals)
- Spacing scale (8pt grid system)
- Typography system (fonts, sizes, weights)
- Light/Dark mode support
- Component using these variables
- JavaScript theme switcher

---

**Next Lesson:** Container Queries - Component-Based Responsive Design
