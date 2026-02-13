---
id: "animations"
language: "css"
level: "intermediate"
title: "CSS Animations with @keyframes"
description: "Create complex custom animations with CSS keyframes"
duration: "30 min"
order: 4
prerequisites: ["transitions-transforms"]
---

# CSS Animations

Create complex, repeating animations with @keyframes!

## @keyframes Rule

Define custom animations using keyframes.

### Basic Syntax

```css
@keyframes animation-name {
  from { /* Starting state */ }
  to { /* Ending state */ }
}
```

### Percentage Syntax

```css
@keyframes slide-in {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}
```

### Multiple Keyframes

```css
@keyframes bounce {
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}
```

## Animation Properties

### animation-name

```css
.element {
  animation-name: bounce;
}
```

### animation-duration

```css
.element {
  animation-duration: 2s;     /* 2 seconds */
  animation-duration: 500ms;  /* 500 milliseconds */
}
```

### animation-timing-function

```css
.element {
  animation-timing-function: linear;
  animation-timing-function: ease;
  animation-timing-function: ease-in;
  animation-timing-function: ease-out;
  animation-timing-function: ease-in-out;
  animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
}
```

### animation-delay

```css
.element {
  animation-delay: 1s;  /* Wait 1 second before starting */
}
```

### animation-iteration-count

```css
.element {
  animation-iteration-count: 3;        /* Run 3 times */
  animation-iteration-count: infinite; /* Run forever */
}
```

### animation-direction

```css
.element {
  animation-direction: normal;    /* Forward */
  animation-direction: reverse;   /* Backward */
  animation-direction: alternate; /* Forward then backward */
  animation-direction: alternate-reverse;
}
```

### animation-fill-mode

```css
.element {
  animation-fill-mode: none;      /* Reset after animation */
  animation-fill-mode: forwards;  /* Stay at end state */
  animation-fill-mode: backwards; /* Apply first keyframe before animation */
  animation-fill-mode: both;      /* Both forwards and backwards */
}
```

### animation-play-state

```css
.element {
  animation-play-state: running;  /* Default */
  animation-play-state: paused;   /* Pause animation */
}

.element:hover {
  animation-play-state: paused;   /* Pause on hover */
}
```

## Shorthand Syntax

```css
.element {
  animation: name duration timing-function delay iteration-count direction fill-mode;
  
  /* Example */
  animation: bounce 2s ease-in-out 0s infinite alternate both;
}
```

## Practical Animations

### Fade In

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 1s ease-in;
}
```

### Slide In from Left

```css
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideInLeft 0.5s ease-out;
}
```

### Bounce

```css
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.bounce {
  animation: bounce 2s infinite;
}
```

### Pulse

```css
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
```

### Rotation

```css
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: rotate 1s linear infinite;
}
```

### Loading Dots

```css
@keyframes loading {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.dot {
  animation: loading 1.4s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}
```

### Shake

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.shake {
  animation: shake 0.8s;
}
```

### Progress Bar

```css
@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}

.progress-bar {
  animation: progress 3s ease-in-out forwards;
}
```

### Typing Effect

```css
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}

.typewriter {
  overflow: hidden;
  border-right: 2px solid;
  white-space: nowrap;
  animation: typing 3.5s steps(40) 1s forwards,
             blink 0.75s step-end infinite;
}
```

### Floating Effect

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.float {
  animation: float 3s ease-in-out infinite;
}
```

## Complex Animations

### Card Flip

```css
@keyframes flipIn {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
  to {
    transform: perspective(400px) rotate3d(0, 0, 0, 0);
    opacity: 1;
  }
}

.flip-in {
  animation: flipIn 0.6s;
}
```

### Gradient Animation

```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background: linear-gradient(270deg, #3F51B5, #2196F3, #00BCD4);
  background-size: 600% 600%;
  animation: gradientShift 5s ease infinite;
}
```

### Heartbeat

```css
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  10%, 30% { transform: scale(0.9); }
  20%, 40% { transform: scale(1.1); }
}

.heartbeat {
  animation: heartbeat 1.3s ease-in-out infinite;
}
```

## Multiple Animations

```css
.element {
  animation: 
    fadeIn 1s ease-in,
    slideUp 1s ease-out,
    pulse 2s ease-in-out infinite;
}
```

## Animation Events (JavaScript)

```javascript
element.addEventListener('animationstart', () => {
  console.log('Animation started');
});

element.addEventListener('animationend', () => {
  console.log('Animation ended');
});

element.addEventListener('animationiteration', () => {
  console.log('Animation repeated');
});
```

## Performance Optimization

### Use Transform and Opacity

✅ **Good (GPU accelerated):**
```css
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

❌ **Avoid (causes repaints):**
```css
@keyframes slideIn {
  from { left: -100%; }
  to { left: 0; }
}
```

### will-change Property

```css
.animated {
  will-change: transform;
}
```

## Common Patterns

### Entrance Animations

```css
/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Zoom In */
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Loading Indicators

```css
/* Spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Dots */
@keyframes bounce-dots {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
```

### Attention Seekers

```css
/* Wiggle */
@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

/* Flash */
@keyframes flash {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}
```

## Key Takeaways

✅ `@keyframes` defines custom animations  
✅ Use percentages for complex animations  
✅ `animation-fill-mode: forwards` keeps end state  
✅ `infinite` for repeating animations  
✅ Only animate `transform` and `opacity` for performance  
✅ Use `will-change` for optimization  
✅ Combine with transitions for best UX

## Practice Exercise

Create a loading screen with:
- Spinning logo (360° rotation)
- "Loading" text with typing effect
- Three pulsing dots with staggered delays
- Fade out animation when complete
- All animations smooth and professional

---

**Next Lesson:** Responsive Design with Media Queries
