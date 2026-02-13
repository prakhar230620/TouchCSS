---
id: "responsive-design"
language: "css"
level: "intermediate"
title: "Responsive Design & Media Queries"
description: "Create websites that look great on all devices"
duration: "30 min"
order: 5
prerequisites: ["animations"]
---

# Responsive Design

Make your websites look perfect on phones, tablets, and desktops!

## What is Responsive Design?

Responsive design means your website adapts to different screen sizes automatically.

## Media Queries

Media queries let you apply different styles based on device characteristics.

### Basic Syntax

```css
@media (condition) {
  /* Styles for matching devices */
}
```

### Screen Width

```css
/* Mobile First Approach (Recommended) */
.container {
  width: 100%;  /* Mobile default */
}

@media (min-width: 768px) {
  .container {
    width: 750px;  /* Tablet and up */
  }
}

@media (min-width: 1024px) {
  .container {
    width: 1000px;  /* Desktop */
  }
}
```

## Common Breakpoints

```css
/* Extra small devices (phones, less than 576px) */
/* No media query needed (mobile first) */

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) { }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { }

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { }

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { }
```

## Media Query Features

### Width and Height

```css
@media (min-width: 600px) and (max-width: 900px) {
  /* Tablets only */
}

@media (min-height: 800px) {
  /* Tall screens */
}
```

### Orientation

```css
@media (orientation: portrait) {
  /* Vertical orientation */
}

@media (orientation: landscape) {
  /* Horizontal orientation */
}
```

### Aspect Ratio

```css
@media (aspect-ratio: 16/9) {
  /* Widescreen displays */
}
```

### Resolution

```css
@media (min-resolution: 2dppx) {
  /* Retina/High-DPI screens */
  .logo {
    background-image: url('logo@2x.png');
  }
}
```

### Prefers Color Scheme

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #ffffff;
  }
}

@media (prefers-color-scheme: light) {
  body {
    background: #ffffff;
    color: #000000;
  }
}
```

### Prefers Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Responsive Units

### Viewport Units

```css
.hero {
  width: 100vw;   /* 100% of viewport width */
  height: 100vh;  /* 100% of viewport height */
}

.sidebar {
  width: 25vw;    /* 25% of viewport width */
}
```

### Percentage

```css
.column {
  width: 50%;     /* 50% of parent */
}
```

### rem (Root EM)

```css
html {
  font-size: 16px;  /* Root size */
}

h1 {
  font-size: 2rem;  /* 32px (2 × 16px) */
}

@media (min-width: 768px) {
  html {
    font-size: 18px;  /* Larger base on tablets */
  }
  /* h1 now automatically 36px (2 × 18px) */
}
```

### em (Relative to Parent)

```css
.parent {
  font-size: 16px;
}

.child {
  font-size: 1.5em;  /* 24px (1.5 × 16px) */
}
```

## Responsive Patterns

### Responsive Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* Automatically responsive! */
```

### Responsive Flexbox

```css
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.flex-item {
  flex: 1 1 300px;  /* Minimum 300px, flexible */
}
```

### Mobile Navigation

```css
/* Mobile: Vertical Stack */
.nav {
  display: flex;
  flex-direction: column;
}

/* Desktop: Horizontal */
@media (min-width: 768px) {
  .nav {
    flex-direction: row;
    justify-content: space-between;
  }
}
```

### Hide/Show Elements

```css
/* Hide desktop menu on mobile */
.desktop-menu {
  display: none;
}

@media (min-width: 768px) {
  .desktop-menu {
    display: flex;
  }
  
  .mobile-menu {
    display: none;
  }
}
```

## Practical Examples

### Responsive Container

```css
.container {
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

@media (min-width: 576px) {
  .container { max-width: 540px; }
}

@media (min-width: 768px) {
  .container { max-width: 720px; }
}

@media (min-width: 992px) {
  .container { max-width: 960px; }
}

@media (min-width: 1200px) {
  .container { max-width: 1140px; }
}
```

### Responsive Typography

```css
html {
  font-size: 14px;
}

@media (min-width: 768px) {
  html { font-size: 16px; }
}

@media (min-width: 1200px) {
  html { font-size: 18px; }
}

/* Using clamp() for fluid typography */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /* Min 1.5rem, preferred 5vw, max 3rem */
}
```

### Responsive Images

```css
img {
  max-width: 100%;
  height: auto;
  /* Never exceeds container, maintains aspect ratio */
}

/* Art Direction */
.hero-image {
  background-image: url('mobile.jpg');
}

@media (min-width: 768px) {
  .hero-image {
    background-image: url('desktop.jpg');
  }
}
```

### Responsive Card Layout

```css
.cards {
  display: grid;
  grid-template-columns: 1fr;  /* 1 column on mobile */
  gap: 20px;
}

@media (min-width: 576px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);  /* 2 columns */
  }
}

@media (min-width: 992px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);  /* 3 columns */
  }
}

@media (min-width: 1200px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);  /* 4 columns */
  }
}
```

### Responsive Sidebar Layout

```css
.layout {
  display: flex;
  flex-direction: column;  /* Stack on mobile */
}

.sidebar {
  width: 100%;
}

.main-content {
  width: 100%;
}

@media (min-width: 768px) {
  .layout {
    flex-direction: row;  /* Side by side */
  }
  
  .sidebar {
    width: 250px;
    flex-shrink: 0;
  }
  
  .main-content {
    flex: 1;
  }
}
```

## Modern CSS Features

### Container Queries (New!)

```css
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-title {
    font-size: 2rem;
  }
}
```

### clamp() Function

```css
.text {
  font-size: clamp(1rem, 2.5vw, 2rem);
  /* Responsive between 1rem and 2rem */
}

.container {
  width: clamp(300px, 80%, 1200px);
  /* Responsive width with min/max */
}
```

### min() and max()

```css
.box {
  width: min(90%, 1200px);
  /* Whichever is smaller */
}

.text {
  font-size: max(16px, 1rem);
  /* Whichever is larger */
}
```

## Mobile-First Approach

```css
/* ✅ Recommended: Mobile First */
.element {
  /* Mobile styles (default) */
  font-size: 14px;
}

@media (min-width: 768px) {
  .element {
    /* Tablet and up */
    font-size: 16px;
  }
}

/* ❌ Avoid: Desktop First */
.element {
  font-size: 16px;
}

@media (max-width: 768px) {
  .element {
    font-size: 14px;
  }
}
```

## Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Essential for responsive design! -->
```

## Testing Responsive Design

1. **Browser DevTools** - Responsive mode
2. **Real Devices** - Test on actual phones/tablets
3. **Online Tools** - Responsinator, BrowserStack
4. **Common Sizes** - 320px (mobile), 768px (tablet), 1024px (desktop)

## Best Practices

✅ **Mobile First** - Start with mobile, enhance for larger screens  
✅ **Fluid Layouts** - Use percentages and fr units  
✅ **Flexible Images** - `max-width: 100%`  
✅ **Readable Text** - Minimum 16px font size  
✅ **Touch Targets** - Minimum 44×44px for buttons  
✅ **Test on Real Devices** - Simulators aren't perfect

## Common Pitfalls

❌ Fixed pixel widths  
❌ Forgetting viewport meta tag  
❌ Too many breakpoints  
❌ Inconsistent spacing  
❌ Horizontal scrolling on mobile

## Key Takeaways

✅ Use `@media` for different screen sizes  
✅ Mobile-first approach recommended  
✅ Use flexible units (%, rem, vw, vh)  
✅ Grid/Flexbox make responsive layouts easy  
✅ Test on multiple devices  
✅ `clamp()` for fluid typography  
✅ Viewport meta tag is essential

## Practice Exercise

Create a responsive blog layout:
- Full-width on mobile (< 768px)
- 2 columns on tablet (768px - 1024px)
- 3 columns with sidebar on desktop (> 1024px)
- Responsive navigation (hamburger menu on mobile)
- Fluid typography
- Touch-friendly buttons (minimum 44px)

---

**Next Lesson:** CSS Custom Properties (Variables)
