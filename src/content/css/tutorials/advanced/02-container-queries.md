---
id: "container-queries"
language: "css"
level: "advanced"
title: "Container Queries"
description: "Modern responsive design based on container size, not viewport"
duration: "25 min"
order: 2
prerequisites: ["custom-properties"]
---

# Container Queries

The future of responsive design - style elements based on their container's size!

## What are Container Queries?

Container queries allow you to apply styles based on the size of a parent container, not the viewport.

### Traditional Problem

```css
/* Media Query - based on viewport */
@media (min-width: 768px) {
  .card {
    display: flex;
  }
}
/* Card changes at 768px regardless of container width */
```

### Container Query Solution

```css
/* Container Query - based on parent size */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
/* Card changes when its container reaches 400px */
```

## Setting Up a Container

### container-type

```css
.container {
  container-type: inline-size;  /* Width-based */
}

.container {
  container-type: size;  /* Width AND height */
}

.container {
  container-type: normal;  /* Default, no queries */
}
```

### container-name

```css
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

@container sidebar (min-width: 300px) {
  /* Only applies to .sidebar container */
  .widget {
    padding: 20px;
  }
}
```

### Shorthand

```css
.container {
  container: sidebar / inline-size;
  /* name / type */
}
```

## Container Query Syntax

```css
@container (condition) {
  /* Styles */
}

@container container-name (condition) {
  /* Styles for specific container */
}
```

## Container Query Units

```css
.element {
  /* Container query units */
  width: 50cqw;   /* 50% of container width */
  height: 30cqh;  /* 30% of container height */
  font-size: 5cqi;  /* 5% of inline size */
  padding: 2cqb;    /* 2% of block size */
  
  /* cqmin and cqmax */
  margin: 1cqmin;  /* 1% of smaller dimension */
  gap: 2cqmax;     /* 2% of larger dimension */
}
```

## Practical Examples

### Responsive Card Component

```css
.card-wrapper {
  container-type: inline-size;
}

.card {
  padding: 1rem;
  background: white;
  border-radius: 8px;
}

/* Small container */
@container (max-width: 400px) {
  .card {
    display: block;
  }
  
  .card-image {
    width: 100%;
    margin-bottom: 1rem;
  }
}

/* Medium container */
@container (min-width: 400px) and (max-width: 600px) {
  .card {
    display: flex;
    gap: 1rem;
  }
  
  .card-image {
    width: 150px;
    flex-shrink: 0;
  }
}

/* Large container */
@container (min-width: 600px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
  }
}
```

### Sidebar Widget

```css
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

.widget {
  padding: 1rem;
  background: #f5f5f5;
}

/* Narrow sidebar */
@container sidebar (max-width: 250px) {
  .widget-title {
    font-size: 1rem;
  }
  
  .widget-description {
    display: none;  /* Hide on narrow sidebar */
  }
}

/* Wide sidebar */
@container sidebar (min-width: 250px) {
  .widget {
    padding: 1.5rem;
  }
  
  .widget-title {
    font-size: 1.25rem;
  }
}
```

### Product Grid

```css
.products {
  container-type: inline-size;
  display: grid;
  gap: 1rem;
}

/* Grid adjusts based on available space */
@container (max-width: 400px) {
  .products {
    grid-template-columns: 1fr;
  }
}

@container (min-width: 400px) and (max-width: 700px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container (min-width: 700px) {
  .products {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Navigation Component

```css
nav {
  container-type: inline-size;
}

.nav-list {
  display: flex;
  gap: 1rem;
}

/* Compact navigation */
@container (max-width: 500px) {
  .nav-list {
    flex-direction: column;
  }
  
  .nav-icon {
    display: block;
  }
  
  .nav-text {
    font-size: 0.875rem;
  }
}

/* Full navigation */
@container (min-width: 500px) {
  .nav-list {
    flex-direction: row;
  }
  
  .nav-icon {
    display: none;
  }
}
```

## Container Query Length Units

```css
.container {
  container-type: size;
}

.element {
  /* Responsive sizing based on container */
  width: 80cqw;        /* 80% of container width */
  height: 50cqh;       /* 50% of container height */
  font-size: 5cqi;     /* 5% of inline size (width in LTR) */
  padding: 3cqb;       /* 3% of block size (height) */
  margin: 2cqmin;      /* 2% of smaller dimension */
  border-radius: 1cqmax; /* 1% of larger dimension */
}
```

### Fluid Typography

```css
.card {
  container-type: inline-size;
}

.card-title {
  font-size: clamp(1rem, 5cqi, 2rem);
  /* Scales with container, min 1rem, max 2rem */
}
```

## Combining with Media Queries

```css
/* Page layout with media queries */
@media (min-width: 768px) {
  .content {
    display: grid;
    grid-template-columns: 300px 1fr;
  }
}

/* Component layout with container queries */
.sidebar {
  container-type: inline-size;
}

@container (max-width: 250px) {
  .sidebar-widget {
    /* Compact widget */
  }
}
```

## Style Queries (Experimental)

```css
/* Query based on CSS properties */
@container style(--theme: dark) {
  .button {
    background: white;
    color: black;
  }
}
```

## Browser Support

```css
/* Feature detection */
@supports (container-type: inline-size) {
  .container {
    container-type: inline-size;
  }
  
  /* Container query styles */
}

/* Fallback for older browsers */
@supports not (container-type: inline-size) {
  /* Media query fallback */
  @media (min-width: 768px) {
    .card {
      display: flex;
    }
  }
}
```

## Best Practices

✅ **Use for components, not page layouts**
```css
/* Good: Component-level */
.card-container {
  container-type: inline-size;
}

/* Avoid: Whole page */
body {
  container-type: inline-size;  /* Usually not needed */
}
```

✅ **Name containers for clarity**
```css
.sidebar {
  container-name: sidebar;
}

@container sidebar (min-width: 300px) {
  /* Clear which container */
}
```

✅ **Combine with CSS Grid/Flexbox**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid-item {
  container-type: inline-size;
}
```

## Real-World Use Cases

### 1. Reusable Card Component

```css
.card-container {
  container-type: inline-size;
}

/* Card adapts to any container width */
@container (min-width: 400px) {
  .card { display: flex; }
}
```

### 2. Dashboard Widgets

```css
.widget-wrapper {
  container-type: inline-size;
}

/* Widget layout changes based on available space */
@container (max-width: 300px) {
  .widget-stats { flex-direction: column; }
}
```

### 3. Responsive Forms

```css
.form-container {
  container-type: inline-size;
}

@container (min-width: 500px) {
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

## Common Patterns

### Card Stack to Side-by-Side

```css
.card-wrapper {
  container-type: inline-size;
}

.card {
  display: flex;
  flex-direction: column;
}

@container (min-width: 500px) {
  .card {
    flex-direction: row;
    gap: 2rem;
  }
}
```

### Show/Hide Elements

```css
@container (max-width: 300px) {
  .optional-content {
    display: none;
  }
}

@container (min-width: 300px) {
  .optional-content {
    display: block;
  }
}
```

## Performance Considerations

✅ Container queries are performant (GPU-accelerated)  
✅ No JavaScript required  
✅ Works with existing layouts  
❌ Don't overuse - keep queries simple

## Key Takeaways

✅ Container queries = responsive design based on container  
✅ Use `container-type: inline-size` for width-based  
✅ Container query units (cqw, cqh, cqi, cqb)  
✅ Perfect for reusable components  
✅ Name containers for clarity  
✅ Combine with Grid/Flexbox  
✅ Better than media queries for components

## Practice Exercise

Create a responsive product card that:
- Uses container queries (not media queries)
- Stacks vertically in narrow containers (< 350px)
- Shows side-by-side in medium containers (350-600px)
- Uses grid layout in wide containers (> 600px)
- Hides secondary info in narrow containers
- Uses container query units for spacing
- Works in any container size

---

**Next Lesson:** Advanced CSS Selectors & Pseudo-elements
