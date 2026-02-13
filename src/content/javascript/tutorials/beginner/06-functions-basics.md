---
id: "functions-basics"
language: "javascript"
level: "beginner"
title: "Functions - Reusable Code"
description: "Learn how to define functions, return values, and use arrow functions"
duration: "30 min"
order: 6
prerequisites: ["loops"]
---

# Functions - Reusable Code

Functions are the building blocks of JavaScript applications. They allow you to bundle code into reusable logic blocks.

## What is a Function?

A function is a block of code designed to perform a specific task. You define it once, and then "call" (execute) it whenever you need it.

### Real-World Analogy

Think of a function like a **recipe**:
- **Recipe Definition:** Instructions to bake a cake (inputs: flour, eggs, sugar).
- **Function Call:** Actually baking the cake. You can bake it as many times as you want with different ingredients (chocolate, vanilla).

## Function Declaration

The standard way to define a function:

```javascript
function sayHello() {
    console.log("Hello, World!");
}
```

**Calling the function:**
```javascript
sayHello(); // Outputs: "Hello, World!"
sayHello(); // Outputs: "Hello, World!" (Again)
```

## Parameters and Arguments

Functions become powerful when they accept data.

- **Parameters:** Placeholders defined in the function
- **Arguments:** Actual values passed when calling the function

```javascript
// name is a parameter
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet("Alice"); // "Alice" is an argument
greet("Bob");   // "Bob" is an argument
```

### Multiple Parameters

```javascript
function add(a, b) {
    console.log(a + b);
}

add(5, 3); // Outputs: 8
```

### Default Parameters (ES6)

What if someone forgets an argument?

```javascript
function greet(name = "Guest") {
    console.log(`Welcome, ${name}`);
}

greet();        // Outputs: "Welcome, Guest"
greet("John");  // Outputs: "Welcome, John"
```

## Return Values

Functions don't just print to console; they often **return** a result to use later.

```javascript
function multiply(x, y) {
    let result = x * y;
    return result; // Sends value back
    
    // Code after return NEVER runs!
    console.log("Unreachable"); 
}

let answer = multiply(4, 5); // answer stores 20
console.log(answer + 5);      // Outputs: 25
```

## Function Expressions

You can store functions in variables:

```javascript
const subtract = function(a, b) {
    return a - b;
};

console.log(subtract(10, 4)); // Outputs: 6
```

## Arrow Functions (Modern JS)

A concise way to write functions, introduced in ES6.

```javascript
// Traditional
const add = function(a, b) {
    return a + b;
};

// Arrow Function
const addArrow = (a, b) => {
    return a + b;
};

// Shorthand (Implicit Return for one-liners)
const multiply = (a, b) => a * b;
const square = x => x * x; // Parentheses optional for single parameter
```

**When to use Arrow Functions?**
- Callbacks (like in array methods)
- Short, simple functions
- They handle `this` keyword differently (advanced topic)

## Scope

Scope determines where variables are accessible.

### Global Scope
Variables declared outside any function.

```javascript
let globalName = "Universal";

function show() {
    console.log(globalName); // Accessible
}
```

### Local (Function) Scope
Variables declared inside a function are **local**.

```javascript
function secret() {
    let password = "123"; // Local
}

console.log(password); // Error: password is not defined
```

## Practical Example: Calculator

```javascript
const calculate = (num1, num2, operator) => {
    switch(operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : "Error: Div by zero";
        default: return "Invalid operator";
    }
};

console.log(calculate(10, 5, '+')); // 15
console.log(calculate(10, 0, '/')); // Error: Div by zero
```

## Key Takeaways

✅ **Reuse:** Write once, run anywhere.  
✅ **Modular:** Break complex problems into small functions.  
✅ **Return:** Functions can output data.  
✅ **Arrow Functions:** Cleaner syntax for modern code.  
✅ **Scope:** Understanding where variables live is crucial.

## Practice Exercise

1. Write a function `celsiusToFahrenheit` that takes a number and returns the converted value.
2. Write a function `isEven` that returns true if a number is even.
3. Create an arrow function `max` that takes two numbers and returns the larger one.

---

**Next Lesson:** Arrays - Managing lists of data!
