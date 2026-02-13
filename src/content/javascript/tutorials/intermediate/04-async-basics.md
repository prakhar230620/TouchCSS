---
id: "async-basics"
language: "javascript"
level: "intermediate"
title: "Async JavaScript"
description: "Understand Callbacks, Promises, and the Event Loop"
duration: "40 min"
order: 4
prerequisites: ["functions-basics"]
---

# Asynchronous JavaScript - Time & Tasks

JavaScript is **single-threaded**, meaning it can do only one thing at a time. But what if we need to fetch data from a server or wait for a timer? We can't block the whole page!

This is where **Asynchronous JavaScript** comes in.

## Sync vs Async

**Synchronous (Blocker):**
```javascript
console.log("Start");
alert("I block everything!"); // Page freezes until you click OK
console.log("End");
```

**Asynchronous (Non-Blocking):**
```javascript
console.log("Start");

setTimeout(() => {
    console.log("I happen later");
}, 2000); // Wait 2 seconds

console.log("End");

// Output:
// Start
// End
// I happen later (after 2s)
```

## 1. Callbacks (The Old Way)

Passing a function to run *after* a task is done.

```javascript
function loadData(callback) {
    setTimeout(() => {
        console.log("Data Loaded");
        callback();
    }, 1000);
}

loadData(() => {
    console.log("Processing Data...");
});
```

**The Problem: Callback Hell** 🍝
Nested callbacks become hard to read.
```javascript
step1(() => {
    step2(() => {
        step3(() => {
            // ...
        });
    });
});
```

## 2. Promises (The Better Way)

A **Promise** represents a future value (Success or Failure).

States:
1. **Pending:** In progress.
2. **Resolved (Fulfilled):** Success!
3. **Rejected:** Error!

```javascript
const getData = new Promise((resolve, reject) => {
    let success = true;
    
    setTimeout(() => {
        if (success) {
            resolve("Data Received");
        } else {
            reject("Connection Failed");
        }
    }, 1000);
});

// Consuming the Promise
getData
    .then(data => {
        console.log(data); // "Data Received"
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        console.log("Done");
    });
```

## 3. Async / Await (The Modern Way)

Syntactic sugar over Promises. Makes async code look synchronous!

```javascript
// Keyword 'async' implies the function returns a Promise
async function fetchData() {
    try {
        console.log("Fetching...");
        
        // 'await' pauses execution until Promise resolves
        // (Note: Doesn't block the main thread!)
        let response = await getData; 
        
        console.log(response); // "Data Received"
    } catch (error) {
        console.error("Error:", error); // Catches rejections
    }
}

fetchData();
```

## The Event Loop (Mental Model)

Imagine JavaScript Runtime as:

1. **Call Stack:** Where code executes (Single Thread).
2. **Web APIs:** Browser features (Timer, Fetch, DOM).
3. **Task Queue:** Where callbacks wait.
4. **Event Loop:** Checks Stack. If empty, moves Task from Queue to Stack.

**Example Tracing:**
```javascript
console.log(1);

setTimeout(() => console.log(2), 0); // Sent to Web API -> Queue

console.log(3);

// Stack: log(1) -> done
// Stack: setTimeout -> hands off to API
// Stack: log(3) -> done
// Stack empty! Event Loop moves log(2) from Queue.
// Stack: log(2) -> done

// Output: 1, 3, 2
```

## Key Takeaways

✅ **Sync:** Code runs line-by-line (blocking).  
✅ **Async:** Code starts now, finishes later (non-blocking).  
✅ **Callback:** Function passed to run later.  
✅ **Promise:** Object tracing async success/failure.  
✅ **Async/Await:** Cleanest syntax for handling Promises.

## Practice Exercise

1. Create a function `wait(ms)` that returns a Promise resolving after `ms` milliseconds.
2. Use `await wait(2000)` to log "Hello" after 2 seconds.
3. Chain two waits to log "World" 1 second after "Hello".

---

**Next Lesson:** Fetch API - Talking to Servers!
