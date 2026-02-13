---
id: "conditionals"
language: "javascript"
level: "beginner"  
title: "Conditionals - Making Decisions"
description: "Learn if/else statements, switch cases, and ternary operators"
duration: "25 min"
order: 4
prerequisites: ["operators-expressions"]
---

# Conditionals - Making Decisions

Conditionals allow your code to make decisions and execute different code based on conditions. They're the foundation of program logic!

## The if Statement

Execute code only when a condition is true:

```javascript
let age = 18;

if (age >= 18) {
    console.log("You can vote!");
}
```

**How it works:**
1. Evaluate the condition in parentheses
2. If `true`, execute the code block
3. If `false`, skip the code block

### Real-World Examples

```javascript
// Temperature check
let temperature = 35;
if (temperature > 30) {
    console.log("It's hot outside!");
}

// Login check
let isLoggedIn = true;
if (isLoggedIn) {
    showDashboard();
}

// Form validation
let username = "john";
if (username.length < 3) {
    showError("Username too short");
}
```

## The if-else Statement

Execute one block if true, another if false:

```javascript
let age = 16;

if (age >= 18) {
    console.log("You can vote!");
} else {
    console.log("Too young to vote");
}
```

**Flowchart:**
```
Condition? 
  ├─ Yes → Execute if block
  └─ No  → Execute else block
```

### Practical Examples

```javascript
// Even or odd
let number = 7;
if (number % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}

// Price calculation
let isMember = true;
let price;

if (isMember) {
    price = 10;  // Member discount
} else {
    price = 15;  // Regular price
}

// Password strength
let password = "secret";
if (password.length >= 8) {
    console.log("Strong password");
} else {
    console.log("Weak password");
}
```

## The else-if Statement

Test multiple conditions:

```javascript
let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");  // This runs!
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}
```

**Important:** Conditions are checked top-to-bottom, first match wins!

### Grade Calculator

```javascript
let marks = 78;
let grade;

if (marks >= 90) {
    grade = 'A+';
} else if (marks >= 80) {
    grade = 'A';
} else if (marks >= 70) {
    grade = 'B';
} else if (marks >= 60) {
    grade = 'C';
} else if (marks >= 50) {
    grade = 'D';
} else {
    grade = 'F';
}

console.log(`Your grade: ${grade}`);
```

### Age Categories

```javascript
let age = 25;
let category;

if (age < 13) {
    category = "Child";
} else if (age < 20) {
    category = "Teenager";
} else if (age < 60) {
    category = "Adult";
} else {
    category = "Senior";
}
```

## Nested if Statements

Put if statements inside other if statements:

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        console.log("You can drive!");
    } else {
        console.log("Get a license first");
    }
} else {
    console.log("Too young to drive");
}
```

**Better with logical operators:**
```javascript
// Same logic, cleaner!
if (age >= 18 && hasLicense) {
    console.log("You can drive!");
} else if (age >= 18) {
    console.log("Get a license first");
} else {
    console.log("Too young to drive");
}
```

### Access Control

```javascript
let isLoggedIn = true;
let isPremium = false;
let age = 25;

if (isLoggedIn) {
    if (isPremium) {
        showPremiumContent();
    } else if (age >= 18) {
        showAdultContent();
    } else {
        showRegularContent();
    }
} else {
    showLoginPage();
}
```

## The switch Statement

Cleaner for multiple exact value checks:

```javascript
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of work week");
        break;
    case "Friday":
        console.log("Almost weekend!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Regular day");
}
```

**Important:** Use `break` to exit after each case!

### Without break (Fall-through)

```javascript
let grade = 'B';

switch (grade) {
    case 'A':
        console.log("Excellent!");
        // No break - continues to next case!
    case 'B':
        console.log("Good job!");
        // Both messages print for 'A'!
        break;
    case 'C':
        console.log("Average");
        break;
}
```

### Menu Selection

```javascript
let choice = 2;

switch (choice) {
    case 1:
        console.log("You selected: New Game");
        startNewGame();
        break;
    case 2:
        console.log("You selected: Load Game");
        loadGame();
        break;
    case 3:
        console.log("You selected: Settings");
        openSettings();
        break;
    default:
        console.log("Invalid choice");
}
```

## Ternary Operator

Shorthand for simple if-else:

**Syntax:** `condition ? valueIfTrue : valueIfFalse`

```javascript
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";

// Equivalent to:
let status;
if (age >= 18) {
    status = "Adult";
} else {
    status = "Minor";
}
```

### Practical Uses

```javascript
// Quick assignments
let discount = isMember ? 0.2 : 0;
let price = quantity > 10 ? 9.99 : 12.99;
let message = isOnline ? "Available" : "Offline";

// In template literals
console.log(`Status: ${isActive ? "Active" : "Inactive"}`);

// In JSX/React
return <div>{isLoggedIn ? <Dashboard /> : <Login />}</div>;

// Function returns
function getGreeting(time) {
    return time < 12 ? "Good morning" : "Good afternoon";
}
```

### Nested Ternary (Use Sparingly!)

```javascript
let age = 25;
let category = age < 13 ? "child" :
               age < 20 ? "teen" :
               age < 60 ? "adult" : "senior";

// Better readability with if-else for complex logic!
```

## Truthy and Falsy Values

JavaScript converts values to boolean in conditions:

**Falsy values** (become `false`):
```javascript
if (0) { }                  // false
if ("") { }                 // false (empty string)
if (null) { }               // false
if (undefined) { }          // false
if (NaN) { }                // false
if (false) { }              // false
```

**Truthy values** (everything else):
```javascript
if (1) { }                  // true
if ("hello") { }            // true
if ([]) { }                 // true (empty array!)
if ({}) { }                 // true (empty object!)
if (-1) { }                 // true
```

### Practical Uses

```javascript
// Check if variable exists and has value
let username = "";
if (username) {  // false if empty
    console.log(`Hello, ${username}`);
} else {
    console.log("Please enter username");
}

// Default values
let name = username || "Guest";  // Uses "Guest" if username is falsy

// Null/undefined checks
if (user) {
    console.log(user.name);  // Safe - only if user exists
}
```

## Comparison Best Practices

### Always Use Strict Equality

```javascript
// ❌ Avoid loose equality
if (age == "18") {  // true even if age is number
    console.log("Just turned 18");
}

// ✅ Use strict equality
if (age === 18) {
    console.log("Just turned 18");
}
```

### Compare with caution

```javascript
// Number comparisons
if (score > 90) { }  // ✅ Clear

// String comparisons (case-sensitive!)
if (username === "admin") { }  // Must match exactly

// Case-insensitive
if (username.toLowerCase() === "admin") { }  // ✅ Better

// Type checking
if (typeof value === "string") { }
if (Array.isArray(items)) { }
```

## Common Patterns

### Range Checking

```javascript
let age = 25;

// Check if in range  
if (age >= 18 && age <= 65) {
    console.log("Working age");
}

// Check if outside range
if (age < 18 || age > 65) {
    console.log("Not working age");
}
```

### Multiple Conditions

```javascript
// All must be true
if (username && password && age >= 18) {
    createAccount();
}

// At least one must be true
if (isAdmin || isModerator || isOwner) {
    showAdminPanel();
}
```

### Negation

```javascript
// Instead of checking for false
if (isActive === false) { }

// Use negation
if (!isActive) { }  // Cleaner!

// Check if NOT empty
if (username !== "") { }
if (username) { }  // Even better!
```

## Complete Examples

### Login System

```javascript
function login(username, password) {
    if (!username || !password) {
        return "Please enter username and password";
    }
    
    if (username.length < 3) {
        return "Username too short";
    }
    
    if (password.length < 8) {
        return "Password must be 8+ characters";
    }
    
    // Check credentials (simplified)
    if (username === "admin" && password === "admin123") {
        return "Login successful!";
    } else {
        return "Invalid credentials";
    }
}
```

### Shopping Cart Discount

```javascript
let totalPrice = 150;
let quantity = 6;
let isMember = true;

let discount = 0;

if (isMember) {
    discount = 0.10;  // 10% member discount
}

if (quantity >= 5) {
    discount += 0.05;  // Additional 5% for bulk
}

if (totalPrice > 100) {
    discount += 0.05;  // Additional 5% for large order
}

let finalPrice = totalPrice * (1 - discount);
console.log(`Final price: $${finalPrice.toFixed(2)}`);
```

### Temperature Converter

```javascript
function convertTemperature(value, unit) {
    if (unit === "C") {
        return (value * 9/5) + 32 + "°F";
    } else if (unit === "F") {
        return (value - 32) * 5/9 + "°C";
    } else {
        return "Invalid unit. Use 'C' or 'F'";
    }
}

console.log(convertTemperature(25, "C"));  // "77°F"
```

## Key Takeaways

✅ `if` - Execute code when condition is true  
✅ `else` - Execute code when condition is false  
✅ `else if` - Test multiple conditions  
✅ `switch` - Match exact values (don't forget `break`)  
✅ Ternary `? :` - Shorthand for simple if-else  
✅ Use `===` not `==` for comparisons  
✅ Falsy: `0`, `""`, `null`, `undefined`, `NaN`, `false`  
✅ Everything else is truthy  

## Practice Exercise

Create a ticket pricing system:

```javascript
// Rules:
// - Age < 5: Free
// - Age 5-12: $10  
// - Age 13-17: $15
// - Age 18-64: $20
// - Age 65+: $15 (senior discount)
// - Members get 20% off (except free tickets)
// - Weekends: +$5 (except free tickets)

function calculateTicketPrice(age, isMember, isWeekend) {
    // Your code here
}

// Test cases
console.log(calculateTicketPrice(4, false, false));   // 0
console.log(calculateTicketPrice(10, false, false));  // 10
console.log(calculateTicketPrice(25, true, false));   // 16
console.log(calculateTicketPrice(25, false, true));   // 25
```

---

**Next Lesson:** Loops - Repeating code efficiently!
