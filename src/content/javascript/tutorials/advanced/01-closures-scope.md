---
id: "closures-scope"
language: "javascript"
level: "advanced"
title: "Closures & Scope"
description: "Understand Lexical Scoping and the power of Closures"
duration: "35 min"
order: 1
prerequisites: ["functions-basics"]
---

# Closures & Scope

This is often considered the "hardest" part of JavaScript, but it's the most powerful. Mastering closures distinguishes a junior dev from a senior dev.

## 1. Scope Review

Scope = Visibility of variables.

### Lexical Scope
JavaScript looks "outward". An inner function can access variables in its outer function, but not vice versa.

```javascript
function outer() {
    let outerVar = "I am outer";
    
    function inner() {
        // Can access outerVar because of Lexical Scope
        console.log(outerVar);
    }
    
    inner();
}
```

## 2. What is a Closure?

A **closure** is a function combined with its **lexical environment**.

In simple terms: **A function remembers variables from around it, even when executed elsewhere.**

```javascript
function createCounter() {
    let count = 0; // "Private" variable
    
    return function() {
        count++; // It remembers 'count' reference!
        return count;
    };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = createCounter(); // New environment
console.log(counter2()); // 1 (Independent)
```

**Why is this magic?** 
Normally, when `createCounter` finishes running, `count` should be garbage collected and deleted. But because the returned function *closes over* `count`, JS keeps it alive in memory.

## 3. Practical Uses

### Data Privacy (Encapsulation)

In other languages like Java, we have `private` variables. In JS, we use closures.

```javascript
function createBankInfo(balance) {
    let _balance = balance; // Private
    
    return {
        deposit(amount) {
            _balance += amount;
            console.log(`Deposited ${amount}`);
        },
        getBalance() {
            return _balance;
        }
        // No way to direct access _balance!
    };
}

const myAccount = createBankInfo(100);
myAccount.deposit(50);
console.log(myAccount.getBalance()); // 150
// console.log(myAccount._balance); // undefined
```

### Function Factories (Currying)

Creating specific functions from generic ones.

```javascript
function multiplyBy(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### Event Listeners & Loops (Classic Interview Question)

**The Problem:**
```javascript
for (var i = 1; i <= 3; i++) {
    setTimeout(() => {
        console.log(i); // Prints 4, 4, 4 !!
    }, 1000);
}
```
*Why?* `var` is function scoped. By the time the timeouts run, loop has finished and `i` is 4.

**The Fix (Closure/Let):**
```javascript
// 'let' creates a new binding (scope) for every iteration
for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
        console.log(i); // Prints 1, 2, 3
    }, 1000);
}
```

## 4. Performance & Memory

Closures hold references to variables. If you create huge closures and attach them to global objects, they are never cleaned up, leading to **Memory Leaks**.

**Best Practice:** Only close over what you need. If a variable isn't used in the inner function, JS engines are smart enough to optimize it away—but be careful with DOM nodes.

## Key Takeaways

✅ **Lexical Scope:** Inner functions see outer variables.  
✅ **Closure:** Function + Environment. It "remembers" data.  
✅ **Use Cases:** Private data, Factories, Partial Application.  
✅ **Pitfall:** Loop variables with `var` (Use `let`).

---

**Next Lesson:** Prototypes & Classes - Object Oriented Programming!
