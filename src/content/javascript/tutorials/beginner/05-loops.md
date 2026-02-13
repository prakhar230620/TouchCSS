---
id: "loops"
language: "javascript"
level: "beginner"
title: "Loops - Repeating Code"
description: "Master for, while, do-while loops and loop control"
duration: "25 min"
order: 5
prerequisites: ["conditionals"]
---

# Loops - Repeating Code

Loops allow you to execute the same code multiple times without repeating yourself. Essential for working with collections and repetitive tasks!

## Why Loops?

**Without loops:**
```javascript
console.log(1);
console.log(2);
console.log(3);
// ... tedious and error-prone!
```

**With loops:**
```javascript
for (let i = 1; i <= 100; i++) {
    console.log(i);
}
```

## The for Loop

Most common loop - when you know how many times to repeat:

**Syntax:**
```javascript
for (initialization; condition; increment) {
    // Code to repeat
}
```

**Basic example:**
```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
// Outputs: 0, 1, 2, 3, 4
```

**How it works:**
1. **Initialization**: `let i = 0` (runs once)
2. **Condition**: `i < 5` (checked each iteration)
3. **Code block**: Executes if condition is true
4. **Increment**: `i++` (after each iteration)
5. Repeat steps 2-4 until condition is false

### Counting Examples

```javascript
// Count 1 to 10
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

// Count backwards
for (let i = 10; i >= 1; i--) {
    console.log(i);
}

// Count by 2s
for (let i = 0; i <= 20; i += 2) {
    console.log(i);  //0, 2, 4, 6...
}

// Multiplication table
for (let i = 1; i <= 10; i++) {
    console.log(`5 × ${i} = ${5 * i}`);
}
```

### Looping Through Arrays

```javascript
let fruits = ["apple", "banana", "orange"];

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
// Outputs: apple, banana, orange

// With index
for (let i = 0; i < fruits.length; i++) {
    console.log(`${i + 1}. ${fruits[i]}`);
}
// 1. apple
// 2. banana
// 3. orange
```

## The while Loop

Repeat while a condition is true - when you don't know iterations in advance:

```javascript
let count = 0;

while (count < 5) {
    console.log(count);
    count++;
}
// Outputs: 0, 1, 2, 3, 4
```

**How it works:**
1. Check condition
2. If true, execute code block
3. Repeat steps 1-2

### Practical Examples

```javascript
// Wait for user input
let password = "";
while (password !== "secret") {
    password = prompt("Enter password:");
}
console.log("Access granted!");

// Process items until done
let items = [1, 2, 3, 4, 5];
while (items.length > 0) {
    let item = items.pop();
    console.log(`Processing: ${item}`);
}

// Game loop
let health = 100;
while (health > 0) {
    health -= 10;
    console.log(`Health: ${health}`);
}
console.log("Game Over!");
```

## The do-while Loop

Like while, but **always runs at least once**:

```javascript
let i = 5;

do {
    console.log(i);
    i++;
} while (i < 5);
// Outputs: 5 (runs once even though condition is false!)
```

**Difference:**
```javascript
// while loop - might not run at all
let x = 10;
while (x < 5) {
    console.log(x);  // Never runs
}

// do-while - runs at least once
let y = 10;
do {
    console.log(y);  // Runs once!
} while (y < 5);
```

### Validation Example

```javascript
let age;
do {
    age = parseInt(prompt("Enter your age (1-120):"));
} while (age < 1 || age > 120 || isNaN(age));
console.log(`Age confirmed: ${age}`);
```

## Loop Control Statements

### break - Exit Loop Early

```javascript
// Find first even number
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log(`Found even number: ${i}`);
        break;  // Exits loop immediately!
    }
}
// Outputs: Found even number: 2

// Search in array
let numbers = [1, 5, 7, 10, 15];
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === 10) {
        console.log("Found 10 at index " + i);
        break;
    }
}
```

### continue - Skip Current Iteration

```javascript
// Skip odd numbers
for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) {
        continue;  // Skip to next iteration
    }
    console.log(i);
}
// Outputs: 2, 4, 6, 8, 10

// Skip specific values
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        continue;  // Skip 3
    }
    console.log(i);
}
// Outputs: 1, 2, 4, 5
```

## Nested Loops

Loops inside loops:

```javascript
// Multiplication table
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`${i} × ${j} = ${i * j}`);
    }
}

// Pattern printing
for (let i = 1; i <= 5; i++) {
    let line = "";
    for (let j = 1; j <= i; j++) {
        line += "*";
    }
    console.log(line);
}
// Output:
// *
// **
// ***
// ****
// *****
```

### Grid Processing

```javascript
let grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        console.log(`[${row}][${col}] = ${grid[row][col]}`);
    }
}
```

## Modern Loop Methods

### for...of Loop (Arrays)

Easiest way to loop through array values:

```javascript
let fruits = ["apple", "banana", "orange"];

for (let fruit of fruits) {
    console.log(fruit);
}
// apple, banana, orange

// Works with strings too!
for (let char of "Hello") {
    console.log(char);
}
// H, e, l, l, o
```

### for...in Loop (Objects)

Loop through object properties:

```javascript
let person = {
    name: "John",
    age: 30,
    city: "New York"
};

for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
// name: John
// age: 30
// city: New York
```

## Infinite Loops (Avoid!)

Loops that never end - will crash your program!

```javascript
// ❌ Never do this!
while (true) {
    console.log("Forever!");
}

// ❌ This too!
for (let i = 0; i < 10; i--) {  // i decreases!
    console.log(i);
}

// ✅ Always have an exit condition
let count = 0;
while (true) {
    console.log(count);
    count++;
    if (count >= 10) break;  // Safe exit
}
```

## Practical Examples

### Sum of Numbers

```javascript
let sum = 0;
for (let i = 1; i <= 100; i++) {
    sum += i;
}
console.log(`Sum of 1-100: ${sum}`);  // 5050
```

### Factorial

```javascript
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorial(5));  // 120 (5 × 4 × 3 × 2 × 1)
```

### Find Maximum

```javascript
let numbers = [5, 12, 3, 18, 7];
let max = numbers[0];

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
        max = numbers[i];
    }
}
console.log(`Maximum: ${max}`);  // 18
```

### FizzBuzz Challenge

```javascript
for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}
```

## Performance Tips

```javascript
// ✅ Cache array length
let arr = [1, 2, 3, 4, 5];
for (let i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i]);
}

// ❌ Don't recalculate every iteration
for (let i = 0; i < arr.length; i++) {  // length checked each time
    console.log(arr[i]);
}
```

## Common Mistakes

### Off-by-One Errors

```javascript
// ❌ Misses last element
for (let i = 0; i < arr.length - 1; i++) {
    console.log(arr[i]);
}

// ✅ Correct
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

### Modifying Loop Variable Inside

```javascript
// ❌ Confusing
for (let i = 0; i < 10; i++) {
    i += 2;  // Don't do this!
}

// ✅ Be explicit
for (let i = 0; i < 10; i += 3) {
    console.log(i);
}
```

## Key Takeaways

✅ `for` - Know how many iterations  
✅ `while` - Repeat while condition true  
✅ `do-while` - Run at least once  
✅ `for...of` - Loop through array values  
✅ `for...in` - Loop through object keys  
✅ `break` - Exit loop early  
✅ `continue` - Skip current iteration  
✅ Always avoid infinite loops!  

## Practice Exercise

Create these programs:

```javascript
// 1. Print even numbers from 1 to 20

// 2. Calculate sum of all numbers in array
let nums = [5, 10, 15, 20, 25];

// 3. Find all prime numbers from 1 to 50

// 4. Reverse a string using a loop
let text = "Hello";

// 5. Count vowels in a string
let sentence = "JavaScript is awesome";

// 6. Create a countdown timer (10 to 0)
```

**Bonus:** Create a simple guessing game where user has 5 attempts to guess a number!

---

**Next Lesson:** Functions - Creating reusable code blocks!
