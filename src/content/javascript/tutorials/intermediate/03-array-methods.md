---
id: "array-methods"
language: "javascript"
level: "intermediate"
title: "Array Methods - Functional JS"
description: "Master powerful methods like map, filter, reduce, and find"
duration: "35 min"
order: 3
prerequisites: ["functions-basics", "arrays"]
---

# Array Methods - Functional Power

Modern JavaScript provides powerful methods to transform, filter, and analyze arrays without using traditional `for` loops. These are essential for writing clean, declarative code.

## 1. `map()` - Transform Elements

Creates a **new array** by calling a function on every element.

```javascript
const numbers = [1, 2, 3, 4];

// Double each number
const doubled = numbers.map(num => num * 2);

console.log(doubled); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4] (Original unchanged)
```

**Real World Use:** Extracting data from objects.
```javascript
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];

const names = users.map(user => user.name);
console.log(names); // ["Alice", "Bob"]
```

## 2. `filter()` - Select Elements

Creates a **new array** with elements that pass a test (return true).

```javascript
const scores = [85, 42, 90, 30, 75];

// Get passing scores (>= 50)
const passing = scores.filter(score => score >= 50);

console.log(passing); // [85, 90, 75]
```

**Real World Use:** Removing items.
```javascript
const products = [
    { id: 1, name: "Phone", inStock: true },
    { id: 2, name: "Mouse", inStock: false },
    { id: 3, name: "Laptop", inStock: true }
];

const available = products.filter(p => p.inStock);
console.log(available); // Phone and Laptop objects
```

## 3. `reduce()` - Accumulate Values

Reduces an array to a **single value** (like a sum, average, or object).

```javascript
const prices = [10, 20, 30];

// items: Accumulator (running total)
// price: Current value
// 0: Initial value
const total = prices.reduce((total, price) => {
    return total + price;
}, 0);

console.log(total); // 60
```

**Without Reduce (Old Way):**
```javascript
let sum = 0;
for (let price of prices) {
    sum += price;
}
```

## 4. `find()` and `findIndex()`

- `find()`: Returns the **first element** that matches.
- `findIndex()`: Returns the **index** of the first match.

```javascript
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

const user = users.find(u => u.id === 2);
console.log(user.name); // "Bob"

const index = users.findIndex(u => u.name === "Charlie");
console.log(index); // 2
```

## 5. `some()` and `every()`

Return a boolean (`true`/`false`).

- `some()`: Do **any** elements pass?
- `every()`: Do **all** elements pass?

```javascript
const ages = [18, 25, 15, 30];

const hasMinor = ages.some(age => age < 18); // true
const allAdults = ages.every(age => age >= 18); // false
```

## 6. `sort()` - Sorting Arrays

**Warning:** Sorts in place (mutates original) and converts to strings by default!

```javascript
const letters = ["b", "c", "a"];
letters.sort();
console.log(letters); // ["a", "b", "c"]

// Numeric Sort Issue
const nums = [5, 20, 100];
nums.sort(); 
// ["100", "20", "5"] ❌ (Alphabetical sort!)

// Correct Numeric Sort
nums.sort((a, b) => a - b); // Ascending
// [5, 20, 100] ✅

nums.sort((a, b) => b - a); // Descending
// [100, 20, 5] ✅
```

## Chaining Methods

Since `map` and `filter` return arrays, you can chain them!

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// Get even numbers, then double them
const result = numbers
    .filter(n => n % 2 === 0) // [2, 4, 6]
    .map(n => n * 2);         // [4, 8, 12]

console.log(result);
```

## Key Takeaways

✅ `map`: Transform 1-to-1.  
✅ `filter`: Select subset.  
✅ `reduce`: Combine into one value.  
✅ `find`: Get specific item.  
✅ Don't abuse `forEach` if you want to transform data (use `map`).

## Practice Exercise

1. Create array of numbers `[10, 25, 30, 45, 50]`.
2. Filter out numbers less than 30.
3. Map remaining numbers to be doubled.
4. Calculate sum using reduce.

---

**Next Lesson:** Asynchronous JavaScript - Promises & Async/Await!
