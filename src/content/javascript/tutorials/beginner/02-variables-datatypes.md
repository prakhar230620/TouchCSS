---
id: "variables-datatypes"
language: "javascript"
level: "beginner"
title: "Variables & Data Types"
description: "Learn how to store and work with different types of data"
duration: "25 min"
order: 2
prerequisites: ["intro-to-javascript"]
---

# Variables & Data Types

Variables are **containers** that store data values. Think of them like labeled boxes where you can put information and retrieve it later!

## What is a Variable?

A variable is a named storage location in your computer's memory. It has:
- A **name** (identifier)
- A **value** (the data it holds)
- A **type** (what kind of data)

### Real-World Analogy

Think of variables like labeled boxes in a warehouse:
- **Box label** = Variable name (`age`, `name`, `price`)
- **Contents** = Value (25, "Alice", 19.99)
- **Box type** = Data type (number, string, etc.)

## Declaring Variables

JavaScript has three ways to declare variables:

### 1. `let` (Modern, Block-Scoped)

```javascript
let age = 25;
let name = "Alice";

age = 26;  // Can be changed ✅
console.log(age);  // Outputs: 26
```

**Use `let` when:**
- Value will change
- Variable is block-scoped
- Most common choice

### 2. `const` (Constant, Cannot Change)

```javascript
const PI = 3.14159;
const birthYear = 1995;

birthYear = 2000;  // ❌ ERROR! Cannot reassign const
```

**Use `const` when:**
- Value should never change
- Best practice: use by default
- More predictable code

### 3. `var` (Old Way, Avoid)

```javascript
var oldWay = "Don't use this";
```

**Avoid `var` because:**
- Function-scoped (confusing)
- Can be redeclared
- Hoisting issues
- Use `let` or `const` instead

## Variable Naming Rules

### Must Follow

```javascript
// ✅ Valid names
let firstName = "John";
let age23 = 23;
let _private = "data";
let $jquery = "selector";

// ❌ Invalid names
let 2names = "error";     // Can't start with number
let first-name = "error";  // No hyphens
let let = "error";         // Can't use keywords
```

### Best Practices

```javascript
// ✅ Good naming (camelCase)
let firstName = "John";
let totalPrice = 99.99;
let isLoggedIn = true;

// ❌ Poor naming
let x = "John";           // Not descriptive
let FIRSTNAME = "John";   // Wrong convention
let first_name = "John";  // snake_case (use in Python)
```

**Naming Conventions:**
- Use **camelCase** for variables: `firstName`, `totalPrice`
- Use **PascalCase** for classes: `UserProfile`, `ShoppingCart`
- Use **UPPER_CASE** for constants: `MAX_SIZE`, `API_KEY`
- Be descriptive: `userAge` better than `a`

## Data Types in JavaScript

JavaScript has **7 primitive data types** and **1 object type**:

### 1. Number

All numbers (integers and decimals) are type `number`:

```javascript
let age = 25;                // Integer
let price = 19.99;           // Decimal  
let negative = -10;          // Negative
let billion = 1e9;           // Scientific notation (1,000,000,000)

// Special number values
let infinity = Infinity;
let notANumber = NaN;        // "Not a Number"

console.log(typeof age);     // Outputs: "number"
```

**Math operations:**
```javascript
let sum = 10 + 5;           // 15 (addition)
let difference = 10 - 5;    // 5 (subtraction)
let product = 10 * 5;       // 50 (multiplication)
let quotient = 10 / 5;      // 2 (division)
let remainder = 10 % 3;     // 1 (modulus)
let power = 2 ** 3;         // 8 (exponentiation)
```

### 2. String

Text data enclosed in quotes:

```javascript
let single = 'Hello';        // Single quotes
let double = "World";        // Double quotes
let template = `Hi there!`;  // Template literals (backticks)

// String concatenation
let fullName = "John" + " " + "Doe";  // "John Doe"

// Template literals (best!)
let name = "Alice";
let greeting = `Hello, ${name}!`;     // "Hello, Alice!"
let math = `2 + 2 = ${2 + 2}`;        // "2 + 2 = 4"

console.log(typeof fullName);  // Outputs: "string"
```

**String properties & methods:**
```javascript
let text = "JavaScript";

console.log(text.length);          // 10 (length)
console.log(text.toUpperCase());   // "JAVASCRIPT"
console.log(text.toLowerCase());   // "javascript"
console.log(text[0]);              // "J" (first character)
console.log(text.includes("Script")); // true
console.log(text.slice(0, 4));     // "Java"
```

### 3. Boolean

True or false values:

```javascript
let isActive = true;
let isCompleted = false;

// Boolean from comparisons
let isAdult = age >= 18;      // true if age is 18+
let hasAccess = score > 50;   // true if score > 50

console.log(typeof isActive);  // Outputs: "boolean"
```

**Common uses:**
```javascript
// Conditions
if (isActive) {
    console.log("User is active");
}

// Logical operations
let canVote = isAdult && isCitizen;  // Both must be true
let needsHelp = isChild || isElderly;  // Either can be true
let opposite = !isActive;            // Inverts boolean
```

### 4. Undefined

Variable declared but not assigned:

```javascript
let username;
console.log(username);  // Outputs: undefined
console.log(typeof username);  // Outputs: "undefined"
```

### 5. Null

Intentionally empty value:

```javascript
let selectedItem = null;  // Explicitly no value
console.log(selectedItem);  // Outputs: null
console.log(typeof selectedItem);  // Outputs: "object" (bug in JS!)
```

**Undefined vs Null:**
```javascript
let notAssigned;          // undefined (forgotten)
let intentionallyEmpty = null;  // null (on purpose)
```

### 6. Symbol (Advanced)

Unique identifiers (covered in advanced lessons):

```javascript
let id = Symbol('id');
```

### 7. BigInt (For Huge Numbers)

For numbers larger than `Number.MAX_SAFE_INTEGER`:

```javascript
let huge = 123456789012345678901234567890n;  // Note the 'n'
console.log(typeof huge);  // Outputs: "bigint"
```

## Type Checking

Use `typeof` operator to check data type:

```javascript
console.log(typeof 42);           // "number"
console.log(typeof "hello");      // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (quirk!)
console.log(typeof {name: "John"});  // "object"
console.log(typeof [1, 2, 3]);    // "object"
```

## Type Conversion

### Automatic (Implicit) Conversion

JavaScript automatically converts types:

```javascript
console.log("5" + 3);      // "53" (string, concatenation)
console.log("5" - 3);      // 2 (number, subtraction)
console.log("5" * "2");    // 10 (both converted to numbers)
console.log(true + 1);     // 2 (true = 1)
console.log(false + 1);    // 1 (false = 0)
```

### Manual (Explicit) Conversion

Convert types intentionally:

```javascript
// To Number
let str = "123";
let num = Number(str);       // 123
let num2 = parseInt("123");  // 123 (integer)
let num3 = parseFloat("12.5");  // 12.5 (decimal)
let num4 = +"456";           // 456 (shorthand)

// To String
let number = 123;
let text = String(number);   // "123"
let text2 = number.toString();  // "123"
let text3 = "" + number;     // "123" (concatenation trick)

// To Boolean
let bool = Boolean(1);       // true
let bool2 = Boolean(0);      // false
let bool3 = Boolean("");     // false (empty string)
let bool4 = Boolean("hi");   // true (non-empty)
let bool5 = !!value;         // Boolean conversion (double negation)
```

**Falsy values** (convert to `false`):
```javascript
Boolean(0)          // false
Boolean("")         // false
Boolean(null)       // false
Boolean(undefined)  // false
Boolean(NaN)        // false
```

**Truthy values** (everything else):
```javascript
Boolean(1)          // true
Boolean("hello")    // true
Boolean([])         // true
Boolean({})         // true
Boolean(-1)         // true
```

## Working with Variables

### Declaration and Assignment

```javascript
//Declare first, assign later
let age;
age = 25;

// Declare and assign together
let name = "Alice";

// Multiple declarations
let x = 5, y = 10, z = 15;

// Constants must be initialized
const PI = 3.14159;  // ✅ Good
// const VALUE;      // ❌ Error!
```

### Reassignment

```javascript
let score = 100;
score = 150;  // ✅ Allowed with let
score = score + 50;  // 200
score += 50;  // 250 (shorthand)

const MAX_SCORE = 1000;
// MAX_SCORE = 2000;  // ❌ Error! Cannot reassign const
```

### Scope

```javascript
// Global scope
let globalVar = "I'm global";

function myFunction() {
    // Function scope
    let functionVar = "I'm in function";
    console.log(globalVar);  // ✅ Can access
}

console.log(functionVar);  // ❌ Error! Not accessible

// Block scope (let & const)
{
    let blockVar = "I'm in block";
}
console.log(blockVar);  // ❌ Error!

// var is function-scoped (confusing!)
{
    var oldVar = "I escape blocks";
}
console.log(oldVar);  // ✅ Works (but shouldn't!)
```

## Practical Examples

### User Information

```javascript
const username = "johndoe";
let loginCount = 0;
let isSubscribed = true;
let lastLogin = null;  // Not logged in yet

loginCount = loginCount + 1;  // Increment
console.log(`${username} has logged in ${loginCount} times`);
```

### Shopping Cart

```javascript
let productName = "Laptop";
let price = 999.99;
let quantity = 2;
let inStock = true;

let total = price * quantity;  // 1999.98
console.log(`Total: $${total.toFixed(2)}`);  // "Total: $1999.98"
```

### Form Validation

```javascript
let email = "user@example.com";
let password = "secret123";
let age = 25;

let isValidEmail = email.includes("@");  // true
let isStrongPassword = password.length >= 8;  // true
let isAdult = age >= 18;  // true

let canRegister = isValidEmail && isStrongPassword && isAdult;
console.log(`Can register: ${canRegister}`);  // "Can register: true"
```

## Common Mistakes to Avoid

### 1. Using Variables Before Declaration

```javascript
console.log(name);  // ❌ ReferenceError
let name = "Alice";
```

### 2. Reassigning const

```javascript
const PI = 3.14;
PI = 3.14159;  // ❌ TypeError
```

### 3. Type Confusion

```javascript
let result = "5" + 3;  // "53" (concatenation, not addition!)
let correct = Number("5") + 3;  // 8 ✅
```

### 4. Using var

```javascript
var count = 10;  // ❌ Use let or const instead
```

## Key Takeaways

✅ Use `let` for variables that change  
✅ Use `const` for values that don't change (default choice)  
✅ Avoid `var` (old and confusing)  
✅ Use descriptive names in camelCase  
✅ JavaScript has 7 primitive types + objects  
✅ Strings, numbers, and booleans are most common  
✅ `typeof` checks the data type  
✅ Be aware of automatic type conversion  
✅ Null = intentional empty, undefined = not assigned  

## Practice Exercise

Create a user profile:

```javascript
// 1. Create variables for:
//    - firstName and lastName (const)
//    - age (let, can change)
//    - isStudent (boolean)
//    - favoriteColor (string)

// 2. Create a fullName variable combining first and last

// 3. Check if user is adult (age >= 18)

// 4. Create a greeting message using template literals

// 5. Change the age and update greeting

// 6. Log all information to console
```

**Bonus:** Calculate birth year from age!

---

**Next Lesson:** Operators & Expressions - Performing calculations and comparisons!
