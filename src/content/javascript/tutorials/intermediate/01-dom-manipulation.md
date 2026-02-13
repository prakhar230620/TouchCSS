---
id: "dom-manipulation"
language: "javascript"
level: "intermediate"
title: "DOM Manipulation"
description: "Learn how to select and modify HTML elements with JavaScript"
duration: "35 min"
order: 1
prerequisites: ["objects-basics"]
---

# DOM Manipulation - Controlling the Page

The **DOM** (Document Object Model) is the bridge between JavaScript and HTML. It treats the HTML document as a tree structure of objects that you can modify.

## What is the DOM?

When a webpage loads, the browser creates a **Document Object Model**. 
- **Document:** The entire web page.
- **Objects:** Every HTML element (`<h1>`, `<div>`, `<body>`) is an object in JS.
- **Model:** The tree structure (Parent-Child relationships).

## Selecting Elements

Before you change an element, you must select it.

### 1. `querySelector()` (Best Practice)
Selects the **first** match using CSS selectors.

```javascript
const title = document.querySelector('h1');      // Tag
const btn = document.querySelector('.btn-main'); // Class
const header = document.querySelector('#header'); // ID
```

### 2. `querySelectorAll()`
Selects **all** matches (returns a NodeList, similar to an array).

```javascript
const items = document.querySelectorAll('.list-item');

// You can loop through them
items.forEach(item => {
    console.log(item.textContent);
});
```

### 3. Old Methods (Still common)
- `document.getElementById('id')`
- `document.getElementsByClassName('class')`
- `document.getElementsByTagName('tag')`

## Changing Content

```javascript
const heading = document.querySelector('h1');

// textContent (Visible text only)
heading.textContent = "New Title";

// innerText (Aware of styling)
heading.innerText = "New Title";

// innerHTML (Parses HTML tags - Be careful of security!)
heading.innerHTML = "<span style='color:red'>New</span> Title";
```

## Styling Elements

You can modify CSS directly via the `style` property. Properties use camelCase (e.g., `backgroundColor` instead of `background-color`).

```javascript
const box = document.querySelector('.box');

box.style.backgroundColor = "blue";
box.style.fontSize = "20px";
box.style.display = "none"; // Hides element
```

### Better Way: Classes

Instead of manual styles, toggle CSS classes (separation of concerns).

```javascript
// Add class
box.classList.add('active');

// Remove class
box.classList.remove('hidden');

// Toggle class (Add if missing, remove if present)
box.classList.toggle('dark-mode');

// Check class
if (box.classList.contains('active')) {
    console.log("It's active!");
}
```

## Attributes

Get and set HTML attributes like `src`, `href`, `id`, `alt`.

```javascript
const img = document.querySelector('img');

// Get
console.log(img.getAttribute('src'));

// Set
img.setAttribute('src', 'new-image.jpg');
img.setAttribute('alt', 'New description');

// Standard properties often work directly
img.src = "new-image.jpg";
img.id = "main-image";
```

## Creating and Removing Elements

### Creating Elements

```javascript
// 1. Create content
const newPara = document.createElement('p');
newPara.textContent = "This is a dynamic paragraph.";

// 2. Select parent
const container = document.querySelector('.container');

// 3. Append to parent
container.appendChild(newPara);
// Or prepend (add to start)
container.prepend(newPara);
```

### Removing Elements

```javascript
const oldItem = document.querySelector('.obsolete');
oldItem.remove(); // Removes itself
// OR
oldItem.parentElement.removeChild(oldItem); // Old way
```

## Traversing the DOM

Moving around the tree relative to an element.

```javascript
const item = document.querySelector('.item');

// Go Up
console.log(item.parentElement);

// Go Down
console.log(item.children); // HTMLCollection
console.log(item.firstElementChild);

// Go Sideways
console.log(item.nextElementSibling);
console.log(item.previousElementSibling);
```

## Key Takeaways

✅ **Selection:** `querySelector` is your best friend.  
✅ **Manipulation:** `textContent` for text, `classList` for styles.  
✅ **Creation:** `createElement` + `appendChild`.  
✅ **Traversal:** Move up/down/sideways in the tree.

## Practice Exercise

1. Create an HTML file with an empty `<div>` with id "app".
2. Step 1: Using JS, create an `<h1>` with text "Hello DOM".
3. Step 2: Append it to the div.
4. Step 3: Change its color to purple.
5. Step 4: Add a class "title" to it.

---

**Next Lesson:** Events - Making pages interactive!
