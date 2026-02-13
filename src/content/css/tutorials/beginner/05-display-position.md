---
id: "display-position"
language: "css"
level: "beginner"
title: "Display & Positioning"
description: "Control element layout with display and position properties"
duration: "25 min"
order: 5
prerequisites: ["colors-typography"]
---

# Display & Positioning

Learn how to control where elements appear on your page!

## Display Property

The `display` property determines how an element behaves in the layout.

### Block Elements

```css
div, p, h1, section {
  display: block;
}
```

**Characteristics:**
- ✅ Takes full width available
- ✅ Starts on a new line
- ✅ Can set width and height
- ✅ Examples: `<div>`, `<p>`, `<h1>`

### Inline Elements

```css
span, a, strong {
  display: inline;
}
```

**Characteristics:**
- ✅ Only takes needed width
- ✅ Stays on same line
- ❌ Cannot set width/height
- ✅ Examples: `<span>`, `<a>`, `<strong>`

### Inline-Block

```css
.button {
  display: inline-block;
}
```

**Best of both worlds:**
- ✅ Stays on same line (like inline)
- ✅ Can set width/height (like block)
- ✅ Perfect for buttons, badges

### None (Hide Element)

```css
.hidden {
  display: none;
  /* Completely removes from layout */
}
```

### Flex & Grid

```css
.container {
  display: flex;  /* Modern layout */
}

.grid-container {
  display: grid;  /* 2D layout */
}
```

## Position Property

Control precisely where elements appear!

### Static (Default)

```css
div {
  position: static;
  /* Normal document flow */
}
```

### Relative

```css
.box {
  position: relative;
  top: 20px;
  left: 30px;
  /* Moves relative to normal position */
}
```

**Use case:** Slightly adjust element position

### Absolute

```css
.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  /* Positioned relative to nearest positioned ancestor */
}
```

**Characteristics:**
- ❌ Removed from normal flow
- ✅ Positioned relative to parent
- ✅ Perfect for overlays, badges

### Fixed

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* Stays in place when scrolling */
}
```

**Use case:** Sticky headers, floating buttons

### Sticky

```css
.sidebar {
  position: sticky;
  top: 20px;
  /* Sticks when scrolling past */
}
```

**Modern solution for:**
- Sticky navigation
- Table headers
- Section headings

## Z-Index (Stacking Order)

```css
.modal {
  position: absolute;
  z-index: 1000;
  /* Higher z-index = on top */
}

.overlay {
  position: fixed;
  z-index: 999;
  /* Below modal */
}
```

## Practical Examples

### Centered Card

```css
.card {
  width: 300px;
  margin: 0 auto;
  /* Centers horizontally */
}
```

### Notification Badge

```css
.notification {
  position: relative;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
}
```

```html
<div class="notification">
  <span>Messages</span>
  <span class="badge">5</span>
</div>
```

### Fixed Header

```css
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 100;
}

body {
  padding-top: 60px;
  /* Prevent content from hiding under header */
}
```

### Centered Overlay

```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
}
```

### Sticky Sidebar

```css
.sidebar {
  position: sticky;
  top: 80px;  /* Below fixed header */
  height: fit-content;
}
```

## Positioning Context

**Important:** `absolute` positions relative to the nearest **positioned** ancestor!

```css
.parent {
  position: relative;  /* Creates positioning context */
}

.child {
  position: absolute;
  top: 0;
  right: 0;
  /* Positioned relative to .parent, not body */
}
```

## Common Patterns

### Center Absolutely

```css
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Perfect center */
}
```

### Full-Screen Overlay

```css
.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
```

### Corner Badge

```css
.container {
  position: relative;
}

.corner-badge {
  position: absolute;
  top: 0;
  right: 0;
}
```

## Key Differences

| Property | In Flow? | Scrolls? | Use Case |
|----------|----------|----------|----------|
| Static | ✅ Yes | ✅ Yes | Default |
| Relative | ✅ Yes | ✅ Yes | Small adjustments |
| Absolute | ❌ No | ✅ Yes | Precise positioning |
| Fixed | ❌ No | ❌ No | Fixed headers |
| Sticky | ✅ Yes | Sometimes | Sticky headers |

## Accessibility Tips

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
}

.skip-link:focus {
  top: 0;
  /* Keyboard users can skip to content */
}
```

## Key Takeaways

✅ Block = full width, new line  
✅ Inline = content width, same line  
✅ Inline-block = best of both  
✅ Relative = adjusts from normal position  
✅ Absolute = precise positioning  
✅ Fixed = stays during scroll  
✅ Sticky = modern sticky positioning  
✅ Z-index controls stacking order

## Practice Exercise

Create a card with:
- Relative positioning
- Absolute badge in top-right corner
- Centered content
- Shadow effect
- Bonus: Make it sticky on scroll!

---

**Next Lesson:** Flexbox - Modern 1D Layout
