---
id: "objects-basics"
language: "javascript"
level: "beginner"
title: "Objects - Real World Data"
description: "Model real-world entities using JavaScript Objects"
duration: "30 min"
order: 8
prerequisites: ["arrays"]
---

# Objects - Real World Data

While arrays store lists, **Objects** store keyed collections of various data. They allow us to model real-world things like users, products, or cars.

## Creating an Object

We use **Key-Value pairs** inside curly braces `{}`.

```javascript
const user = {
    firstName: "John",    // Property (Key: Value)
    lastName: "Doe",
    age: 30,
    isActive: true,
    hobbies: ["reading", "gaming"], // Array inside object
    address: {            // Object inside object
        city: "New York",
        zip: 10001
    }
};
```

## Accessing Properties

### 1. Dot Notation (Common)

```javascript
console.log(user.firstName); // "John"
console.log(user.address.city); // "New York"
```

### 2. Bracket Notation (Dynamic)

Useful when the key has spaces or is stored in a variable.

```javascript
console.log(user["lastName"]); // "Doe"

let key = "age";
console.log(user[key]); // 30
```

## Modifying Objects

Objects are mutable (changeable), even if declared with `const`.

```javascript
const car = {
    brand: "Toyota",
    model: "Corolla"
};

// Update property
car.model = "Camry";

// Add new property
car.year = 2022;

// Delete property
delete car.brand;

console.log(car); // { model: "Camry", year: 2022 }
```

## Object Methods

Functions inside objects are called **methods**.

```javascript
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    // Shorthand syntax (ES6)
    subtract(a, b) {
        return a - b;
    }
};

console.log(calculator.add(5, 3)); // 8
```

## The `this` Keyword

How does an object access its own data? Using `this`.

```javascript
const person = {
    name: "Alice",
    greet() {
        // 'this' refers to the 'person' object
        console.log(`Hello, I am ${this.name}`);
    }
};

person.greet(); // "Hello, I am Alice"
```

⚠️ **Warning:** Arrow functions handle `this` differently (they inherit it from the surrounding scope). Avoid using arrow functions for object methods if you need `this`.

## Iterating Over Objects

Arrays utilize `for...of`. Objects utilize `for...in`.

```javascript
const settings = {
    theme: "dark",
    notifications: true,
    volume: 80
};

for (let key in settings) {
    console.log(`${key}: ${settings[key]}`);
}
// theme: dark
// notifications: true
// volume: 80
```

## Object vs Array

| Arrays `[]` | Objects `{}` |
| :--- | :--- |
| Indexed list (0, 1, 2) | Keyed collection (name, age) |
| Order matters | Order doesn't matter |
| Iterating lists | Modeling entities |

```javascript
// Array of Objects (Very common pattern!)
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

console.log(users[1].name); // "Bob"
```

## Key Takeaways

✅ **Structure:** Key-value pairs.  
✅ **Access:** Dot notation (`obj.key`) or Bracket notation (`obj['key']`).  
✅ **Methods:** Functions stored inside objects.  
✅ **Nested:** Objects can contain arrays and other objects.

## Practice Exercise

1. Create an object named `book` with properties: title, author, year.
2. Add a method `getSummary` that returns a string like "Title by Author (Year)".
3. Change the year to the current year.
4. Console log the summary.

---

**Next Lesson:** DOM Manipulation - Changing the webpage!
