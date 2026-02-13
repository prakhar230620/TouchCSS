---
id: "es6-features"
language: "javascript"
level: "intermediate"
title: "Modern JS (ES6+)"
description: "Destructuring, Spread, Rest, and Template Literals"
duration: "25 min"
order: 6
prerequisites: ["variables-datatypes"]
---

# Modern JavaScript (ES6+)

ECMAScript 2015 (ES6) introduced features that made writing JavaScript cleaner and more powerful.

## 1. Template Literals

Better strings with backticks `` ` ``.

```javascript
const name = "Alice";
const age = 25;

// Old
const oldGreeting = "Hello " + name + ", you are " + age;

// New (Interpolation)
const newGreeting = `Hello ${name}, you are ${age}`;

// Multiline
const html = `
    <div>
        <h1>Title</h1>
    </div>
`;
```

## 2. Destructuring

Unpack values from arrays or properties from objects into distinct variables.

### Object Destructuring

```javascript
const user = {
    id: 1,
    username: "dev_jane",
    email: "jane@example.com",
    role: "admin"
};

// Extract specific properties
const { username, email } = user;

console.log(username); // "dev_jane"

// Renaming
const { role: userRole } = user;
console.log(userRole); // "admin"

// Default Values
const { country = "Unknown" } = user; 
```

### Array Destructuring

```javascript
const coords = [10, 20, 30];

const [x, y] = coords;
console.log(x); // 10
console.log(y); // 20

// Skipping
const [first, , third] = ["a", "b", "c"];
console.log(third); // "c"
```

## 3. Spread Operator (...)

Expands an iterable (like an array) into individual elements.

```javascript
const oldNums = [1, 2, 3];
const newNums = [4, 5];

// Combine arrays
const combined = [...oldNums, ...newNums]; 
// [1, 2, 3, 4, 5]

// Copy array (Shallow copy)
const copy = [...oldNums];

// Objects
const baseUser = { name: "Alice" };
const fullUser = { ...baseUser, age: 30, active: true };
// { name: "Alice", age: 30, active: true }
```

## 4. Rest Parameter (...)

Collects multiple arguments into an array. Looks like spread, but works in function definitions.

```javascript
function sum(...numbers) {
    // numbers is an array: [1, 2, 3, 4]
    return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

## 5. Default Parameters

```javascript
function greet(name = "Guest") {
    return `Hello ${name}`;
}

console.log(greet()); // "Hello Guest"
```

## 6. Short Circuit & Nullish Coalescing

### Nullish Coalescing (??)
Returns right-hand side ONLY if left is `null` or `undefined` (not 0 or "").

```javascript
const count = 0;

// Logical OR (||) treats 0 as false
console.log(count || 10); // 10 (Wrong if 0 is valid!)

// Nullish (??)
console.log(count ?? 10); // 0 (Correct!)
```

### Optional Chaining (?.)
Safely access nested properties.

```javascript
const user = { name: "Alice" }; // No address

// Old way (Crash!)
// console.log(user.address.street); // Error

// New way
console.log(user.address?.street); // undefined (No crash)
```

## Key Takeaways

✅ **Template Literals:** `${var}` for strings.  
✅ **Destructuring:** `{ name } = obj` extracts data deeply.  
✅ **Spread:** `...arr` expands arrays/objects.  
✅ **Rest:** `...args` gathers arguments.  
✅ **Optional Chaining:** `obj?.prop` prevents errors.

## Practice Exercise

1. Create object `person` with `name`, `age`, `city`.
2. Destructure `city` into a variable `currentCity`.
3. Create a new object `employee` that copies `person` and adds `job`.
4. Write function `logFirst` that uses rest operator to take multiple args and logs only the first.

---

**Next Lesson:** Modules - Organizing code!
