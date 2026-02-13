---
id: "arrays"
language: "javascript"
level: "beginner"
title: "Arrays - Lists of Data"
description: "Learn how to store, access, and manipulate lists of data"
duration: "30 min"
order: 7
prerequisites: ["functions-basics"]
---

# Arrays - Lists of Data

Variables store one value. **Arrays** store lists of values.

## Creating Arrays

```javascript
// Array Literal (Recommended)
let fruits = ["Apple", "Banana", "Cherry"];

// Numbers
let scores = [98, 85, 76, 100];

// Mixed types (Allowed in JS)
let mixed = ["Hello", 42, true, null];
```

## Accessing Elements

Arrays are **zero-indexed** (counting starts at 0).

```javascript
let colors = ["Red", "Green", "Blue"];

console.log(colors[0]); // "Red"
console.log(colors[1]); // "Green"
console.log(colors[2]); // "Blue"
console.log(colors[3]); // undefined (doesn't exist)
```

## Modifying Arrays

```javascript
let cars = ["Ford", "Toyota"];

// Change value
cars[0] = "Tesla";
console.log(cars); // ["Tesla", "Toyota"]

// Length property
console.log(cars.length); // 2
```

## Common Array Methods

JavaScript provides built-in methods to manipulate arrays.

### Adding Elements

```javascript
let nums = [1, 2, 3];

// push() - Add to END
nums.push(4); 
console.log(nums); // [1, 2, 3, 4]

// unshift() - Add to START
nums.unshift(0);
console.log(nums); // [0, 1, 2, 3, 4]
```

### Removing Elements

```javascript
// pop() - Remove from END
let last = nums.pop();
console.log(last); // 4
console.log(nums); // [0, 1, 2, 3]

// shift() - Remove from START
let first = nums.shift();
console.log(first); // 0
console.log(nums); // [1, 2, 3]
```

### Finding Elements

```javascript
let pets = ["Cat", "Dog", "Fish"];

console.log(pets.indexOf("Dog")); // 1
console.log(pets.includes("Fish")); // true
console.log(pets.includes("Bird")); // false
```

### Slicing and Splicing

```javascript
// slice(start, end) - Copy part of array (doesn't change original)
let letters = ["a", "b", "c", "d"];
let sub = letters.slice(1, 3); // ["b", "c"] - end index not included

// splice(index, removeCount, item1, ...) - Change contents
letters.splice(1, 1, "x"); // Remove 1 item at index 1, add "x"
console.log(letters); // ["a", "x", "c", "d"]
```

## Looping Through Arrays

1. **Standard for loop:**
```javascript
let heroes = ["Batman", "Superman", "Flash"];

for (let i = 0; i < heroes.length; i++) {
    console.log(heroes[i]);
}
```

2. **for...of loop (Easier):**
```javascript
for (let hero of heroes) {
    console.log(hero);
}
```

3. **forEach() Method:**
```javascript
heroes.forEach((hero, index) => {
    console.log(`${index}: ${hero}`);
});
```

## Multidimensional Arrays (2D)

Arrays inside arrays!

```javascript
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matrix[1][1]); // 5 (Row 1, Column 1)
```

## Practice Example: Shopping List

```javascript
let cart = [];

function addItem(item) {
    cart.push(item);
    console.log(`${item} added.`);
}

function removeLast() {
    let removed = cart.pop();
    console.log(`${removed} removed.`);
}

addItem("Milk");
addItem("Eggs");
console.log(cart); // ["Milk", "Eggs"]
removeLast();
console.log(cart); // ["Milk"]
```

## Key Takeaways

✅ **Zero-indexed:** First item is always at index 0.  
✅ **Dynamic:** Arrays can grow and shrink.  
✅ **Methods:** `push`, `pop`, `shift`, `unshift` are essential.  
✅ **Iteration:** Use loops to process all items.

## Practice Exercise

1. Create an array of your favorite movies.
2. Add a new movie to the start and end.
3. Remove the second movie.
4. Loop through and print them in uppercase.

---

**Next Lesson:** Objects - Storing complex data!
