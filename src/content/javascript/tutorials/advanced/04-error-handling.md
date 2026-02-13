---
id: "error-handling"
language: "javascript"
level: "advanced"
title: "Error Handling"
description: "Master try/catch, custom errors, and debugging strategies"
duration: "30 min"
order: 4
prerequisites: ["async-basics"]
---

# Error Handling - Bulletproof Code

Errors happen (Network down, bad input, bugs). Good code crashes gracefully or recovers. Bad code leaves the user staring at a broken screen.

## 1. The try...catch statement

Wrap dangerous code in a `try` block. If it fails, `catch` handles it.

```javascript
try {
    // Dangerous code
    let user = JSON.parse("Invalid JSON String"); // Throws Error
    console.log(user); // Skipped
} catch (error) {
    // Handling
    console.log("Parsing failed, using default user.");
    // error.name, error.message, error.stack
    console.error(error.message);
}
```

**Without try/catch:** The script stops immediately (Crash).

## 2. The `finally` block

Code that runs **always**, regardless of success or failure. Perfect for cleanup (closing connections, hiding loading spinners).

```javascript
let isLoading = true;

try {
    await fetchData();
} catch (err) {
    showError(err);
} finally {
    isLoading = false; // Always runs!
    console.log("Cleanup done");
}
```

## 3. Throwing Errors

You can generate your own errors using `throw`.

```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero!"); 
    }
    return a / b;
}

try {
    divide(10, 0);
} catch (err) {
    alert(err.message); // "Cannot divide by zero!"
}
```

## 4. Custom Error Types

Extending the built-in Error class for specific scenarios.

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function register(username) {
    if (username.length < 3) {
        throw new ValidationError("Username too short");
    }
}

try {
    register("Jo");
} catch (err) {
    if (err instanceof ValidationError) {
        console.log("Input error:", err.message);
    } else {
        console.log("System error:", err.message);
    }
}
```

## 5. Async Error Handling

### In Async/Await
Use `try/catch` inside the function.

```javascript
async function login() {
    try {
        await api.login();
    } catch (err) {
        console.log("Login failed");
    }
}
```

### In Top-Level Code (Global Safety)

What if you forget a try/catch? Use global handlers.

```javascript
// Catches unhandled logic errors
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Global Crash:", message);
    // Send to logging service (Sentry, LogRocket)
};

// Catches unhandled Promise rejections
window.addEventListener('unhandledrejection', event => {
    console.error("Promise failed:", event.reason);
});
```

## 6. Defensive Programming

Validate before execution to avoid errors.

```javascript
function printUser(user) {
    // Guard clause
    if (!user || !user.name) {
        console.warn("Invalid user object");
        return;
    }
    
    console.log(user.name.toUpperCase());
}
```

## Key Takeaways

✅ **Try/Catch:** Wrap code that might crash.  
✅ **Finally:** Cleanup code that always runs.  
✅ **Throw:** Create intentional errors when logic is invalid.  
✅ **Custom Errors:** Classes extending `Error` for specific types.  
✅ **Global Handlers:** Safety net for unhandled crashes.

---

**Next Lesson:** Performance - Optimization Techniques!
