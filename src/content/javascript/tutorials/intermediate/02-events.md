---
id: "events"
language: "javascript"
level: "intermediate"
title: "Events - Interactive Web"
description: "Handle user interactions like clicks, inputs, and key presses"
duration: "30 min"
order: 2
prerequisites: ["dom-manipulation"]
---

# Events - Interactive Web

Events are things that happen to HTML elements. JavaScript can "listen" for these events and react.

## Event Listeners

 The modern way to handle events is `addEventListener`.

```javascript
const btn = document.querySelector('button');

// Syntax: element.addEventListener(event, function)
btn.addEventListener('click', function() {
    alert("Button Clicked!");
});
```

**Why usage `addEventListener`?**
- You can attach multiple listeners to the same element.
- It's cleaner than HTML attributes (`onclick="..."`).
- Supports options like capturing (advanced).

## Common Events

### Mouse Events
- `click`: Pressed and released.
- `dblclick`: Double clicked.
- `mouseenter` / `mouseleave`: Hover in/out.
- `mousemove`: Mouse is moving over element.

### Keyboard Events
- `keydown`: Key pressed down (fires repeatedly if held).
- `keyup`: Key released.
- `keypress`: Character entered (deprecated, use keydown).

```javascript
document.addEventListener('keydown', (e) => {
    console.log(`Key pressed: ${e.key}`);
    
    if (e.key === "Enter") {
        console.log("Form submitted!");
    }
});
```

### Form Events
- `submit`: Form submitted (usually needs `preventDefault`).
- `input`: Value changed (fires immediately, good for instant search).
- `change`: Value changed (fires after blur/enter).
- `focus` / `blur`: Element gains/loses focus.

## The Event Object (e)

The callback function receives an **Event Object** containing details about what happened.

```javascript
btn.addEventListener('click', (e) => {
    console.log(e.target); // The element clicked
    console.log(e.type);   // "click"
    console.log(e.clientX); // Mouse X coordinate
});
```

## Preventing Default Behavior

Some elements have default browser actions (e.g., links navigate, forms reload page). We can stop this.

```javascript
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // STOPS page reload
    console.log("Form handled via JS!");
});

const link = document.querySelector('a');
link.addEventListener('click', (e) => {
    e.preventDefault(); // STOPS navigation
    console.log("Link disabled");
});
```

## Event Bubbling and Capturing

Events don't just happen on one element; they travel through the DOM tree.

### Bubbling (Default)
Event starts at the target and bubbles **UP** to parents.

```html
<div class="parent">
    <button class="child">Click</button>
</div>
```

```javascript
// Clicking button triggers BOTH
document.querySelector('.child').addEventListener('click', () => console.log('Child'));
document.querySelector('.parent').addEventListener('click', () => console.log('Parent'));
// Output: Child -> Parent
```

**Stopping Propagation:**
```javascript
document.querySelector('.child').addEventListener('click', (e) => {
    e.stopPropagation(); // Stops bubbling
    console.log('Child only');
});
```

## Event Delegation (Performance Pattern)

Instead of adding 100 listeners to 100 list items, add **one** listener to the parent.

```html
<ul id="list">
    <li>Item 1</li>
    <li>Item 2</li>
    <!-- ... -->
</ul>
```

```javascript
const list = document.querySelector('#list');

list.addEventListener('click', (e) => {
    // Check if clicked element is an LI
    if (e.target.tagName === 'LI') {
        console.log(`Clicked on ${e.target.textContent}`);
        e.target.classList.toggle('completed');
    }
});
```

**Benefits:**
- Better performance (less memory).
- Works for elements added dynamically in the future!

## removing Event Listeners

Use `removeEventListener`. Note: You must use a named function (not an anonymous arrow function).

```javascript
function handleClick() {
    console.log("Clicked");
}

btn.addEventListener('click', handleClick);

// Later...
btn.removeEventListener('click', handleClick);
```

## Key Takeaways

✅ **Listen:** `addEventListener` is the standard.  
✅ **Object:** The `e` event object holds details.  
✅ **Control:** `preventDefault()` stops browser defaults.  
✅ **Flow:** Events bubble up; `stopPropagation()` stops them.  
✅ **Delegation:** Listen on parents for better performance.

## Practice Exercise

1. Create a button "Counter".
2. Add a click listener that increments a variable count.
3. Update the button text to show the count.
4. Add a "Reset" button that sets count to 0.

---

**Next Lesson:** Async JavaScript - Working with time and data!
