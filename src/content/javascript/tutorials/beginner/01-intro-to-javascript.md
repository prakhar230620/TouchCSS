---
id: "intro-to-javascript"
language: "javascript"
level: "beginner"
title: "Introduction to JavaScript"
description: "Learn what JavaScript is, where it runs, and write your first script"
duration: "20 min"
order: 1
prerequisites: []
---

# Introduction to JavaScript

Welcome to JavaScript! JavaScript is the programming language that makes websites interactive and dynamic. If HTML is the skeleton and CSS is the skin, JavaScript is the **brain and muscles** that bring everything to life!

## What is JavaScript?

**JavaScript** is a high-level, interpreted programming language primarily used to create interactive web pages. It's one of the three core technologies of the web, alongside HTML and CSS.

### Real-World Analogy

Think of a website like a house:
- **HTML** = The structure (walls, rooms, doors)
- **CSS** = The decoration (paint, furniture, style)
- **JavaScript** = The functionality (lights that turn on, doors that open, alarm systems)

Without JavaScript, websites would be static documents - you couldn't click buttons, submit forms, or see animations. JavaScript makes websites **alive**!

## Where Does JavaScript Run?

JavaScript runs in two main environments:

### 1. Browser (Client-Side)

JavaScript runs directly in your web browser:
- **Chrome** - Uses V8 engine
- **Firefox** - Uses SpiderMonkey engine
- **Safari** - Uses JavaScriptCore engine
- **Edge** - Uses V8 engine

**What it can do:**
- Respond to user clicks and interactions
- Modify webpage content dynamically
- Validate form inputs
- Create animations
- Make network requests (AJAX/Fetch)
- Store data locally

### 2. Server (Node.js)

JavaScript can also run on servers using **Node.js**:
- Build backend applications
- Create APIs
- Handle databases
- File system operations

**For this course**, we'll focus on **browser JavaScript** - the foundation for all JavaScript.

## A Brief History

- **1995** - Created by Brendan Eich in just 10 days at Netscape
- **1997** - Standardized as ECMAScript
- **2015** - ES6/ES2015 - Major update with modern features
- **Today** - Updated yearly, one of the most popular languages

## Why Learn JavaScript?

✅ **Essential for web development** - Every website uses it  
✅ **Easy to start** - Runs in any browser, no setup needed  
✅ **Versatile** - Frontend, backend, mobile apps, games  
✅ **Huge community** - Millions of resources and libraries  
✅ **High demand** - Top job market skill  
✅ **Interactive** - See results immediately  

## Your First JavaScript Code!

Let's write your first JavaScript! We'll use the browser console.

### Opening the Developer Console

**Chrome/Edge:**
- Windows: `Ctrl + Shift + J` or `F12`
- Mac: `Cmd + Option + J`

**Firefox:**
- Windows: `Ctrl + Shift + K`
- Mac: `Cmd + Option + K`

**Safari:**
- Enable Developer menu in Preferences
- `Cmd + Option + C`

### Hello, World!

Type this in the console and press Enter:

```javascript
console.log("Hello, World!");
```

**Congratulations!** You just ran your first JavaScript code! 🎉

**What happened:**
- `console.log()` is a function that prints messages
- The text appears in the console
- This is the programmer's best friend for debugging!

### Try More Examples

```javascript
// Math calculations
console.log(5 + 3);           // Outputs: 8
console.log(10 * 2);          // Outputs: 20

// Text (strings)
console.log("Hello" + " " + "JavaScript");  // Outputs: Hello JavaScript

// Questions
console.log(5 > 3);           // Outputs: true
console.log(10 === 5);        // Outputs: false
```

## Adding JavaScript to HTML

There are three ways to add JavaScript to a webpage:

### 1. Inline JavaScript (Not Recommended)

```html
<button onclick="alert('Button clicked!')">Click Me</button>
```

**Avoid this** - mixes HTML and JavaScript, hard to maintain.

### 2. Internal JavaScript

Add JavaScript inside `<script>` tags in HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Welcome!</h1>
    <button id="myBtn">Click Me</button>

    <script>
        // JavaScript code here
        const button = document.getElementById('myBtn');
        button.addEventListener('click', function() {
            alert('Hello from JavaScript!');
        });
    </script>
</body>
</html>
```

**Good for:** Small scripts, learning, quick prototypes.

### 3. External JavaScript (Best Practice! ⭐)

Create a separate `.js` file:

**index.html:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Welcome!</h1>
    <button id="myBtn">Click Me</button>
    
    <script src="script.js"></script>
</body>
</html>
```

**script.js:**
```javascript
const button = document.getElementById('myBtn');
button.addEventListener('click', function() {
    alert('Hello from JavaScript!');
});
```

**Why external files are best:**
✅ Separation of concerns  
✅ Reusability  
✅ Caching  
✅ Easier to maintain  
✅ Better organization  

## Script Placement: Where to Put `<script>`?

### Before `</body>` (Recommended)

```html
<body>
    <!-- Your HTML content -->
    
    <script src="script.js"></script>
</body>
```

**Why:** Ensures HTML loads before JavaScript runs.

### In `<head>` with `defer`

```html
<head>
    <script src="script.js" defer></script>
</head>
```

**`defer`** - Loads script in parallel, executes after HTML is parsed.

### In `<head>` with `async`

```html
<head>
    <script src="script.js" async></script>
</head>
```

**`async`** - Loads and executes as soon as possible (order not guaranteed).

## JavaScript Syntax Basics

### Comments

```javascript
// This is a single-line comment

/*
  This is a
  multi-line comment
*/

console.log("Hello");  // Comment after code
```

**Use comments to:**
- Explain complex code
- Document your functions
- Temporarily disable code
- Leave notes for yourself

### Semicolons

```javascript
console.log("Hello");  // Semicolon at end (optional but recommended)
console.log("World")   // Works without semicolon
```

**Best practice:** Use semicolons for clarity and consistency.

### Case Sensitivity

```javascript
let name = "Alice";
let Name = "Bob";      // Different variable!
let NAME = "Charlie";  // Also different!

console.log(name);     // Outputs: Alice
```

JavaScript is **case-sensitive** - `name`, `Name`, and `NAME` are different!

## Basic Output Methods

### 1. Console Output

```javascript
console.log("Debug message");       // General logging
console.error("Error message");     // Red error message
console.warn("Warning message");    // Yellow warning
console.table([{a: 1}, {a: 2}]);   // Display as table
```

### 2. Alert Box

```javascript
alert("This is an alert!");
```

Displays a pop-up message. **Use sparingly** - annoying for users.

### 3. Changing HTML Content

```javascript
document.getElementById('demo').innerHTML = "Hello, JavaScript!";
```

Modifies webpage content directly.

### 4. Writing to Document

```javascript
document.write("Hello!");
```

**Avoid this** - can overwrite entire page if used after page loads.

## What Can JavaScript Do? Real Examples

### 1. Interactive Buttons

```javascript
const button = document.querySelector('button');
button.addEventListener('click', () => {
    button.textContent = 'Clicked!';
    button.style.backgroundColor = 'green';
});
```

### 2. Form Validation

```javascript
const email = document.getElementById('email').value;
if (!email.includes('@')) {
    alert('Please enter a valid email!');
}
```

### 3. Dynamic Content

```javascript
const time = new Date().getHours();
let greeting;

if (time < 12) {
    greeting = "Good morning!";
} else if (time < 18) {
    greeting = "Good afternoon!";
} else {
    greeting = "Good evening!";
}

document.getElementById('greeting').textContent = greeting;
```

### 4. Animations

```javascript
let position = 0;
setInterval(() => {
    position += 5;
    document.getElementById('box').style.left = position + 'px';
}, 50);
```

## JavaScript vs Other Languages

| Feature | JavaScript | Python | Java |
|---------|-----------|---------|------|
| **Typing** | Dynamic | Dynamic | Static |
| **Use Case** | Web primarily | General purpose | Enterprise apps |
| **Syntax** | C-style | Readable | Verbose |
| **Speed** | Fast (JIT) | Slower | Very fast |
| **Learning Curve** | Easy | Easy | Moderate |

## Development Tools

### Browser DevTools

Every modern browser has built-in developer tools:

**Elements Tab** - Inspect HTML/CSS  
**Console Tab** - Run JavaScript, see errors  
**Sources Tab** - Debug JavaScript code  
**Network Tab** - Monitor requests  
**Application Tab** - View storage  

### Code Editors

Popular choices for writing JavaScript:
- **VS Code** - Most popular, free, powerful
- **Sublime Text** - Fast, lightweight
- **WebStorm** - Powerful IDE (paid)
- **Atom** - Customizable, free

## Key Takeaways

✅ JavaScript makes websites interactive  
✅ Runs in browsers and servers (Node.js)  
✅ Essential skill for web development  
✅ Easy to start - use browser console  
✅ External `.js` files are best practice  
✅ Place `<script>` before `</body>` or use `defer`  
✅ Use `console.log()` for debugging  
✅ JavaScript is case-sensitive  

## Practice Exercise

Create your first interactive webpage:

1. Create `index.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>My First JavaScript</title>
</head>
<body>
    <h1>Welcome to JavaScript!</h1>
    <button id="changeBtn">Click to Change Color</button>
    <p id="message">Hello, World!</p>
    
    <script src="script.js"></script>
</body>
</html>
```

2. Create `script.js`:
```javascript
// Your code here:
// 1. Select the button
// 2. Add click event
// 3. Change message text
// 4. Change background color
```

**Challenge:** Make the button change the page background to a random color!

---

**Next Lesson:** Variables & Data Types - Storing and working with data!
