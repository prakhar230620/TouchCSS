---
id: "operators-expressions"
language: "javascript"
level: "beginner"
title: "Operators & Expressions"
description: "Master arithmetic, comparison, logical, and assignment operators"
duration: "25 min"
order: 3
prerequisites: ["variables-datatypes"]
---

# Operators & Expressions

Operators are symbols that perform operations on values and variables. They're the tools that make JavaScript dynamic and powerful!

## What is an Operator?

An **operator** is a symbol that tells JavaScript to perform a specific operation. An **expression** is a combination of values, variables, and operators that JavaScript evaluates to produce a result.

```javascript
5 + 3  // Expression that evaluates to 8
```

**Think of it like math class:**
- `5 + 3` is an expression
- `+` is the operator
- `5` and `3` are operands
- `8` is the result

## Arithmetic Operators

Perform mathematical calculations:

### Basic Math Operations

```javascript
let a = 10;
let b = 3;

console.log(a + b);  // 13 (Addition)
console.log(a - b);  // 7 (Subtraction)
console.log(a * b);  // 30 (Multiplication)
console.log(a / b);  // 3.333... (Division)
console.log(a % b);  // 1 (Modulus/Remainder)
console.log(a ** b); // 1000 (Exponentiation: 10³)
```

### Modulus Operator (%)

Returns the **remainder** after division:

```javascript
console.log(10 % 3);   // 1 (10 ÷ 3 = 3 remainder 1)
console.log(15 % 4);   // 3 (15 ÷ 4 = 3 remainder 3)
console.log(20 % 5);   // 0 (20 ÷ 5 = 4 remainder 0)

// Practical use: Check if even or odd
let number = 7;
if (number % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");  // This runs!
}
```

### Increment and Decrement

```javascript
let count = 5;

// Increment (add 1)
count++;      // count is now 6
++count;      // count is now 7

// Decrement (subtract 1)
count--;      // count is now 6
--count;      // count is now 5

// Difference between prefix and postfix
let x = 5;
let y = x++;  // y = 5, then x becomes 6 (postfix)
let z = ++x;  // x becomes 7, then z = 7 (prefix)
```

**When to use:**
```javascript
// Loop counters
for (let i = 0; i < 10; i++) {  // i++ increments each loop
    console.log(i);
}

// Click counters
let clicks = 0;
button.addEventListener('click', () => {
    clicks++;
    console.log(`Clicked ${clicks} times`);
});
```

## Assignment Operators

Assign values to variables:

### Basic Assignment

```javascript
let x = 10;  // Assigns 10 to x
```

### Compound Assignment

Shorthand for common operations:

```javascript
let score = 100;

score = score + 10;  // Long way
score += 10;         // Short way (same thing!)

// All compound operators:
score += 20;   // score = score + 20  (120)
score -= 10;   // score = score - 10  (110)
score *= 2;    // score = score * 2   (220)
score /= 4;    // score = score / 4   (55)
score %= 50;   // score = score % 50  (5)
score **= 2;   // score = score ** 2  (25)
```

**Real-world examples:**
```javascript
let balance = 1000;
balance += 500;    // Deposit
balance -= 200;    // Withdrawal

let quantity = 1;
quantity++;        // Add to cart

let total = 0;
total += price * quantity;  // Calculate total
```

## Comparison Operators

Compare values and return `true` or `false`:

### Equality Operators

```javascript
// Loose equality (==) - converts types
console.log(5 == "5");    // true (string converted to number)
console.log(0 == false);  // true (false converted to 0)

// Strict equality (===) - no conversion, checks type too
console.log(5 === "5");   // false (different types)
console.log(5 === 5);     // true (same value AND type)

// Inequality
console.log(5 != "5");    // false (loose)
console.log(5 !== "5");   // true (strict)
```

**Always use strict equality (===) unless you have a specific reason!**

```javascript
// ✅ Good practice
if (age === 18) {
    console.log("Just turned 18!");
}

// ❌ Avoid
if (age == "18") {  // Could lead to bugs
    console.log("Maybe 18?");
}
```

### Relational Operators

```javascript
let age = 25;
let price = 100;

console.log(age > 18);     // true (greater than)
console.log(age < 30);     // true (less than)
console.log(price >= 100); // true (greater than or equal)
console.log(price <= 99);  // false (less than or equal)
```

**Practical uses:**
```javascript
// Age verification
if (age >= 18) {
    console.log("Access granted");
}

// Price comparison
if (currentPrice < originalPrice) {
    console.log("On sale!");
}

// Score grading
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
}
```

## Logical Operators

Combine boolean expressions:

### AND Operator (&&)

**Both** conditions must be true:

```javascript
let age = 25;
let hasLicense = true;

// Can drive only if BOTH are true
let canDrive = age >= 18 && hasLicense;  // true

console.log(true && true);    // true
console.log(true && false);   // false
console.log(false && true);   // false
console.log(false && false);  // false
```

**Real example:**
```javascript
if (username.length > 0 && password.length >= 8) {
    console.log("Valid login");
}

if (isLoggedIn && isPremium) {
    showPremiumContent();
}
```

### OR Operator (||)

**At least one** condition must be true:

```javascript
let isWeekend = true;
let isHoliday = false;

let canSleepIn = isWeekend || isHoliday;  // true

console.log(true || true);    // true
console.log(true || false);   // true
console.log(false || true);   // true
console.log(false || false);  // false
```

**Real example:**
```javascript
if (role === "admin" || role === "moderator") {
    showAdminPanel();
}

if (age < 5 || age > 65) {
    applyDiscount();
}
```

### NOT Operator (!)

**Inverts** the boolean value:

```javascript
let isRaining = false;
let isSunny = !isRaining;  // true

console.log(!true);   // false
console.log(!false);  // true
console.log(!!true);  // true (double negation)

// Practical use
if (!isLoggedIn) {
    showLoginPage();
}

if (!userInput) {  // Check if empty
    showError("Required field");
}
```

### Short-Circuit Evaluation

Logical operators stop evaluating when result is determined:

```javascript
// AND (&&) - stops at first false
let result = false && expensiveFunction();  // Doesn't call function!

// OR (||) - stops at first true  
let name = username || "Guest";  // Uses "Guest" if username is falsy

// Practical: Default values
let port = process.env.PORT || 3000;
let greeting = userGreeting || "Hello!";

// Function calls
isLoggedIn && loadUserData();  // Only loads if logged in
hasError || processData();     // Only processes if no error
```

## String Operators

### Concatenation (+)

```javascript
let firstName = "John";
let lastName = "Doe";

let fullName = firstName + " " + lastName;  // "John Doe"

// Concatenation with numbers
let message = "I have " + 5 + " apples";  // "I have 5 apples"

// Template literals (better!)
let greeting = `Hello, ${firstName} ${lastName}!`;
let info = `Score: ${score}, Level: ${level}`;
```

### Compound Assignment (+=)

```javascript
let text = "Hello";
text += " World";  // text = text + " World"
console.log(text);  // "Hello World"

// Building HTML
let html = "<div>";
html += "<h1>Title</h1>";
html += "<p>Content</p>";
html += "</div>";
```

## Operator Precedence

Order matters! JavaScript follows math rules (PEMDAS):

```javascript
let result = 5 + 3 * 2;  // 11 (not 16!)
// Multiplication happens first: 3 * 2 = 6, then 5 + 6 = 11

// Use parentheses to control order
let correct = (5 + 3) * 2;  // 16 ✅

// More examples
let a = 10 + 5 * 2;      // 20 (5*2=10, then 10+10)
let b = (10 + 5) * 2;    // 30 (10+5=15, then 15*2)
let c = 10 / 2 + 3;      // 8 (10/2=5, then 5+3)
let d = 10 / (2 + 3);    // 2 (2+3=5, then 10/5)
```

**Precedence order (high to low):**
1. Parentheses: `()`
2. Exponentiation: `**`
3. Multiplication/Division/Modulus: `*`, `/`, `%`
4. Addition/Subtraction: `+`, `-`
5. Comparison: `<`, `>`, `<=`, `>=`
6. Equality: `==`, `===`
7. Logical AND: `&&`
8. Logical OR: `||`
9. Assignment: `=`, `+=`, etc.

## Type Coercion

JavaScript automatically converts types:

```javascript
// Number + String = String (concatenation)
console.log(5 + "5");     // "55"
console.log("Score: " + 100);  // "Score: 100"

// String - Number = Number (subtraction)
console.log("10" - 5);    // 5
console.log("20" * "2");  // 40

// Boolean to Number
console.log(true + 1);    // 2 (true = 1)
console.log(false + 5);   // 5 (false = 0)

// String to Boolean
if ("hello") {            // "hello" is truthy
    console.log("This runs!");
}
```

**Be careful with:**
```javascript
console.log(0 == false);     // true (loose equality)
console.log("" == false);    // true
console.log([] == false);    // true (!)
console.log({} == false);    // false

// Use strict equality to avoid confusion
console.log(0 === false);    // false ✅
```

## Ternary Operator (Conditional)

Shorthand for if-else:

```javascript
// Syntax: condition ? valueIfTrue : valueIfFalse

let age = 20;
let status = age >= 18 ? "Adult" : "Minor";  // "Adult"

// Traditional if-else equivalent:
let status;
if (age >= 18) {
    status = "Adult";
} else {
    status = "Minor";
}

// More examples
let price = isMember ? 10 : 15;
let greeting = isLoggedIn ? `Welcome, ${username}` : "Please log in";
let discount = quantity > 10 ? 0.2 : 0;

// Nested (avoid if complex)
let category = age < 13 ? "child" : age < 18 ? "teen" : "adult";
```

## Practical Examples

### Calculate Total Price

```javascript
let price = 29.99;
let quantity = 3;
let taxRate = 0.08;

let subtotal = price * quantity;  // 89.97
let tax = subtotal * taxRate;      // 7.1976
let total = subtotal + tax;        // 97.1676

console.log(`Total: $${total.toFixed(2)}`);  // "Total: $97.17"
```

### Validate Form Input

```javascript
let username = "john";
let password = "secret123";
let age = 25;

let isUsernameValid = username.length >= 3 && username.length <= 20;
let isPasswordValid = password.length >= 8;
let isAgeValid = age >= 18 && age <= 120;

let canRegister = isUsernameValid && isPasswordValid && isAgeValid;

if (!canRegister) {
    console.log("Please fix errors");
}
```

### Calculate Discount

```javascript
let originalPrice = 100;
let discountPercent = 20;

let discountAmount = originalPrice * (discountPercent / 100);  // 20
let finalPrice = originalPrice - discountAmount;  // 80

// One-liner
let final = originalPrice * (1 - discountPercent / 100);  // 80
```

### Check Eligibility

```javascript
let age = 25;
let income = 50000;
let creditScore = 720;

let isEligible = age >= 21 && income >= 30000 && creditScore >= 650;

console.log(isEligible ? "Approved" : "Denied");  // "Approved"
```

## Common Mistakes

### 1. Using = instead of ===

```javascript
if (score = 100) {  // ❌ Assignment, not comparison!
    // Always true (assigns 100 to score)
}

if (score === 100) {  // ✅ Correct
    // Compares score to 100
}
```

### 2. Confusing + with concatenation

```javascript
let result = "5" + 3;  // "53" (concatenation)
let correct = Number("5") + 3;  // 8 ✅
```

### 3. Forgetting operator precedence

```javascript
let wrong = 5 + 3 * 2;  // 11 (not 16)
let right = (5 + 3) * 2;  // 16 ✅
```

## Key Takeaways

✅ Arithmetic operators: `+`, `-`, `*`, `/`, `%`, `**`  
✅ Comparison operators: `===`, `!==`, `>`, `<`, `>=`, `<=`  
✅ Logical operators: `&&` (AND), `||` (OR), `!` (NOT)  
✅ Use `===` not `==` (strict equality)  
✅ Use `++` and `--` for increment/decrement  
✅ Template literals better than string concatenation  
✅ Parentheses control operator precedence  
✅ Ternary operator for simple conditions  

## Practice Exercise

Create a calculator program:

```javascript
// 1. Create variables for two numbers
// 2. Calculate and log:
//    - Sum
//    - Difference
//    - Product
//    - Quotient
//    - Remainder
// 3. Compare the numbers (which is larger?)
// 4. Check if first number is even or odd
// 5. Use ternary for: "Positive" or "Negative"
```

**Bonus:** Create a discount calculator that applies 10% off if quantity > 5!

---

**Next Lesson:** Conditionals - Making decisions with if/else statements!
