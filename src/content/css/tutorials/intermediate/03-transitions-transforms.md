---
id: "transitions-transforms"
language: "css"
level: "intermediate"
title: "CSS Transitions & Transforms"
description: "Add smooth animations and transformations to your elements"
duration: "25 min"
order: 3
prerequisites: ["css-grid"]
---

# CSS Transitions & Transforms

Bring your designs to life with smooth transitions and powerful transforms!

## CSS Transitions

Transitions allow you to change property values smoothly over a specified duration.

### Basic Syntax

```css
.button {
  background-color: blue;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: red;
  /* Smoothly transitions from blue to red */
}
```

### Transition Properties

```css
.element {
  transition-property: all;        /* What to animate */
  transition-duration: 0.3s;       /* How long */
  transition-timing-function: ease; /* How it moves */
  transition-delay: 0s;            /* Wait before starting */
}
```

### Shorthand

```css
.element {
  transition: property duration timing-function delay;
  transition: all 0.3s ease 0s;
}
```

### Multiple Transitions

```css
.card {
  transition: 
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.2s ease-in-out;
}
```

### Timing Functions

```css
.element {
 transition-timing-function: linear;      /* Constant speed */
  transition-timing-function: ease;        /* Slow start, fast, slow end */
  transition-timing-function: ease-in;     /* Slow start */
  transition-timing-function: ease-out;    /* Slow end */
  transition-timing-function: ease-in-out; /* Slow start and end */
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## CSS Transforms

Transforms let you rotate, scale, skew, or translate an element.

### Translate (Move)

```css
.box {
  transform: translateX(50px);   /* Move right */
  transform: translateY(-20px);  /* Move up */
  transform: translate(50px, -20px); /* Both */
}
```

### Scale (Resize)

```css
.box {
  transform: scale(1.5);         /* 150% size */
  transform: scale(2, 0.5);      /* Width 2x, height 0.5x */
  transform: scaleX(1.2);        /* Only width */
  transform: scaleY(0.8);        /* Only height */
}
```

### Rotate

```css
.box {
  transform: rotate(45deg);      /* Clockwise 45° */
  transform: rotate(-90deg);     /* Counter-clockwise 90° */
}
```

### Skew

```css
.box {
  transform: skewX(20deg);       /* Horizontal skew */
  transform: skewY(10deg);       /* Vertical skew */
  transform: skew(20deg, 10deg); /* Both */
}
```

### Multiple Transforms

```css
.box {
  transform: translate(50px, 100px) rotate(45deg) scale(1.5);
  /* Order matters! */
}
```

## Transform Origin

```css
.box {
  transform-origin: center center;  /* Default */
  transform-origin: top left;
  transform-origin: 50% 50%;
  transform-origin: 100px 50px;
  
  transform: rotate(45deg);
  /* Rotates around the specified point */
}
```

## Practical Examples

### Hover Button Effect

```css
.button {
  background-color: #3F51B5;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: #303F9F;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.button:active {
  transform: translateY(0);
}
```

### Card Hover Effect

```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
```

### Menu Icon Animation

```css
.menu-icon {
  display: inline-block;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.menu-icon:hover {
  transform: rotate(90deg);
}
```

### Image Zoom on Hover

```css
.image-container {
  overflow: hidden;
  border-radius: 8px;
}

.image-container img {
  transition: transform 0.3s ease;
  display: block;
  width: 100%;
}

.image-container:hover img {
  transform: scale(1.1);
}
```

### Flip Card

```css
.card {
  perspective: 1000px;
}

.card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
```

### Smooth Dropdown

```css
.dropdown-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.dropdown:hover .dropdown-content {
  max-height: 500px;
}
```

### Loading Spinner

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

## 3D Transforms

### 3D Translate

```css
.box {
  transform: translateZ(50px);     /* Towards viewer */
  transform: translate3d(10px, 20px, 30px);
}
```

### 3D Rotate

```css
.box {
  transform: rotateX(45deg);       /* Around X axis */
  transform: rotateY(45deg);       /* Around Y axis */
  transform: rotateZ(45deg);       /* Around Z axis */
}
```

### Perspective

```css
.container {
  perspective: 1000px;  /* Depth perception */
}

.box {
  transform: rotateY(45deg);
}
```

## Performance Tips

### Use Transform for Animations

✅ **Good (GPU accelerated):**
```css
.box {
  transform: translate(100px, 0);
}
```

❌ **Avoid (CPU intensive):**
```css
.box {
  left: 100px;  /* Causes reflow */
}
```

### Will-Change Property

```css
.animated {
  will-change: transform, opacity;
  /* Hints browser to optimize */
}
```

## Common Patterns

### Pulse Effect

```css
.pulse {
  transition: transform 0.3s ease;
}

.pulse:hover {
  transform: scale(1.1);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
```

### Bounce Effect

```css
.bounce:hover {
  animation: bounce 0.5s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

### Shake Effect

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s;
}
```

## Key Takeaways

✅ Transitions = smooth property changes  
✅ Transforms = visual manipulation  
✅ Use `transform` for performance  
✅ `ease` timing feels most natural  
✅ Combinetransforms (order matters!)  
✅ 0.3s is a good default duration  
✅ Only animate `transform` and `opacity` when possible

## Practice Exercise

Create an interactive card that:
- Lifts up on hover (translateY + box-shadow)  
- Scales slightly (1.05)  
- Transitions smoothly (0.3s ease)  
- Rotates image inside slightly  
- Has a click button that pulses

---

**Next Lesson:** CSS Animations with @keyframes
