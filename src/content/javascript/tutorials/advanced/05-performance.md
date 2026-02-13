---
id: "performance"
language: "javascript"
level: "advanced"
title: "JS Performance"
description: "Optimization techniques like Debouncing, Throttling, and Memory Management"
duration: "30 min"
order: 5
prerequisites: ["events", "closures-scope"]
---

# JavaScript Performance Optimization

Writing code that works is step one. Writing code that runs fast and silky smooth is step two.

## 1. Debouncing

**Scenario:** Search bar.
If a user types "Javascript", `input` event fires 10 times. Fetching API 10 times is wasteful.

**Solution:** Wait until user *stops* typing for X milliseconds.

```javascript
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout); // Cancel previous timer
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const handleSearch = debounce((text) => {
    console.log("Searching API for:", text);
}, 500);

// User types fast:
// "J" -> Clear -> Wait 500ms
// "Ja" -> Clear -> Wait 500ms
// ... "Javascript" -> Wait 500ms -> FIRE! (Only once)
```

## 2. Throttling

**Scenario:** Scrolling / Resizing.
Events fire hundreds of times per second. `debounce` waits for stop, but `throttle` ensures it runs at most once every X milliseconds.

**Solution:** Run immediately, then ignore updates for X ms.

```javascript
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

window.addEventListener('scroll', throttle(() => {
    console.log("Checking scroll position...");
}, 200));
```

## 3. Memory Leaks

JavaScript handles memory automatically (Garbage Collection), but you can accidentally keep things alive.

### Common Leaks:
1. **Global Variables:** Accidental globals never clear.
2. **Uncleared Intervals:** `setInterval` keeps running forever if not cleared.
3. **Detached DOM Nodes:** JS references to removed HTML elements.

```javascript
// BAD
const elements = [];
function createLeak() {
    const hugeString = new Array(100000).join('x');
    elements.push(hugeString); // Keeps growing forever
}

// GOOD: Clean up listeners
useEffect(() => {
    const handler = () => {};
    window.addEventListener('resize', handler);
    
    // Cleanup function
    return () => window.removeEventListener('resize', handler);
});
```

## 4. Document Fragments (Batch DOM Updates)

Touching the DOM is slow. Adding 1000 items one by one causes 1000 "reflows" (layout calculations).

**Bad:**
```javascript
const list = document.getElementById('list');
for (let i = 0; i < 1000; i++) {
    const item = document.createElement('li'); // Reflow here?
    list.appendChild(item); // 1000 separate updates
}
```

**Good (DocumentFragment):**
```javascript
const fragment = document.createDocumentFragment(); // Virtual DOM node
for (let i = 0; i < 1000; i++) {
    const item = document.createElement('li');
    fragment.appendChild(item); // No reflow! Just JS memory.
}
list.appendChild(fragment); // 1 Reflow (Adds all at once)
```

## 5. Web Workers (Multithreading)

JS is single-threaded. Heavy calculations block the UI (freeze).

**Solution:** Run heavy logic in a Web Worker (separate thread).

`worker.js`:
```javascript
self.onmessage = function(e) {
    // Heavy calculation
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) sum += i;
    self.postMessage(sum);
};
```

`main.js`:
```javascript
const worker = new Worker('worker.js');
worker.postMessage("Start");
worker.onmessage = function(e) {
    console.log("Result:", e.data); // UI never froze!
};
```

## Key Takeaways

✅ **Debounce:** Group calls (Search bars).  
✅ **Throttle:** Rate limit calls (Scroll/Resize).  
✅ **Fragments:** Batch DOM updates.  
✅ **Workers:** Background threads for CPU tasks.  
✅ **Cleanup:** Remove listeners and intervals.

---

**Course Complete!** 🎉 
You have mastered modern JavaScript from zero to advanced optimization!
