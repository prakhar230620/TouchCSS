---
id: "modules"
language: "javascript"
level: "intermediate"
title: "Modules - Organizing Code"
description: "Import and Export functionality between files"
duration: "20 min"
order: 7
prerequisites: ["es6-features"]
---

# Modules - Organizing Code

As applications grow, putting all code in one file becomes messy. **ES6 Modules** allow you to split code into separate files and share functionality.

## Why Modules?

1. **Maintainability:** Smaller files are easier to manage.
2. **Reusability:** Write a standard utility once, use everywhere.
3. **Namespace:** Variables in a module don't pollute the global scope.

## Enabling Modules

In HTML, you must use `type="module"`:

```html
<script type="module" src="main.js"></script>
```

**Note:** Modules need a server to run (won't work if you just open `index.html` from file explorer due to CORS).

## Exporting

You can export variables, functions, or classes.

### 1. Named Exports
Export specific items. You can have many per file.

`mathUtils.js`:
```javascript
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

### 2. Default Exports
Export one main thing from a file.

`User.js`:
```javascript
export default class User {
    constructor(name) {
        this.name = name;
    }
}
```

## Importing

### 1. Importing Named Exports
Use curly braces `{ }`. Names must match exactly.

`main.js`:
```javascript
import { add, PI } from './mathUtils.js';

console.log(add(10, 5));
console.log(PI);
```

**Renaming imports:**
```javascript
// Resolve name collisions
import { add as sum } from './mathUtils.js'; 
sum(10, 20);
```

### 2. Importing Default Exports
No curly braces. You can name it whatever you want.

`main.js`:
```javascript
import UserProfile from './User.js';

const user = new UserProfile("Alice");
```

### 3. Importing Everything

```javascript
import * as MathTools from './mathUtils.js';

MathTools.add(1, 2);
MathTools.subtract(5, 3);
```

## Common Patterns

### Aggregating Exports (Barreling)

Create an `index.js` in a folder to export everything from that folder.

`components/index.js`:
```javascript
export { default as Header } from './Header.js';
export { default as Footer } from './Footer.js';
export { Button } from './Button.js';
```

`App.js`:
```javascript
import { Header, Footer, Button } from './components';
```

## Dynamic Imports

Load code only when needed (Lazy Loading). Returns a Promise.

```javascript
if (userClickedSettings) {
    const module = await import('./settings.js');
    module.openSettings();
}
```

## Top Level Await

In modules, you can use `await` outside of async functions.

```javascript
// data.js
const response = await fetch('data.json');
export const data = await response.json();
```

## Key Takeaways

✅ **Split Code:** Break logic into small files.  
✅ **Named Exports:** `{ export }` for utilities.  
✅ **Default Exports:** One main component per file.  
✅ **type="module":** Required in HTML script tag.  
✅ **Relative Paths:** Always use `./` or `../` and extension (in vanilla JS).

---

**Next Lesson:** Advanced JS - Closures & Scope!
