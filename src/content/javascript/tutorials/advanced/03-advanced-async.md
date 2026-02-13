---
id: "advanced-async"
language: "javascript"
level: "advanced"
title: "Advanced Async"
description: "Parallel execution, Race conditions, and Promise combinators"
duration: "30 min"
order: 3
prerequisites: ["async-basics", "fetch-api"]
---

# Advanced Async Patterns

You know how to use `await` to wait for one thing. But what if you need to fetch data from 3 sources at once? Or race two servers?

## 1. Sequential vs Parallel

**Sequential (Slow):**
Wait for A, then wait for B. Total time = Time A + Time B.

```javascript
async function getSequential() {
    const user = await fetchUser(); // Takes 2s
    const posts = await fetchPosts(); // Takes 2s
    // Total wait: 4 seconds
}
```

**Parallel (Fast):**
Start A and B together. Wait for both. Total time = Max(Time A, Time B).

```javascript
async function getParallel() {
    const userPromise = fetchUser(); // Starts now!
    const postsPromise = fetchPosts(); // Starts now!
    
    const user = await userPromise;
    const posts = await postsPromise;
    // Total wait: 2 seconds!
}
```

## 2. Promise.all()

The cleanest way to run things in parallel. It takes an array of Promises and returns a new Promise that resolves when **ALL** work efficiently.

```javascript
async function getAllData() {
    try {
        const [user, posts, friends] = await Promise.all([
            fetchUser(),
            fetchPosts(),
            fetchFriends()
        ]);
        
        console.log(user, posts, friends);
        
    } catch (error) {
        // If ANY promise fails, Promise.all rejects immediately!
        console.error("One failed, so all failed:", error);
    }
}
```

**Use case:** Initial page load where you need User Profile + Notifications + Feed before rendering.

## 3. Promise.allSettled()

Like `all`, but waits for everything to finish, regardless of success or failure. Use this if you don't want one failure to crash everything.

```javascript
const results = await Promise.allSettled([
    fetch('/critical-data'), // Succeeds
    fetch('/optional-data')  // Fails (404)
]);

results.forEach(result => {
    if (result.status === 'fulfilled') {
        console.log("Got data:", result.value);
    } else {
        console.log("Failed:", result.reason);
    }
});
```

## 4. Promise.race()

Returns the result of the **first** promise that settles (wins the race).

**Use case:** Timeout pattern.

```javascript
const fetchData = fetch('/data');
const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error("Timeout!")), 5000)
);

try {
    // If fetch takes > 5s, timeout wins and throws error
    const data = await Promise.race([fetchData, timeout]);
    console.log(data);
} catch (err) {
    console.log(err.message); // "Timeout!"
}
```

## 5. Async Iteration (for await...of)

Looping through an array of promises or async data.

```javascript
const urls = ['/url1', '/url2', '/url3'];

// Bad: forEach with async (Doesn't wait!)
// urls.forEach(async url => { ... }); 

// Good: for...of
for (const url of urls) {
    const response = await fetch(url); // Waits for each one (Sequential)
    console.log(response);
}

// Parallel Map + Promise.all
const promises = urls.map(url => fetch(url));
const responses = await Promise.all(promises);
```

## 6. Microtasks vs Macrotasks

Async isn't all equal.

- **Microtasks:** Promises, queueMicrotask. (High Priority - run immediately after current code).
- **Macrotasks:** setTimeout, setInterval, I/O. (Low Priority - run next event loop tick).

```javascript
console.log(1);

setTimeout(() => console.log(2), 0); // Macrotask

Promise.resolve().then(() => console.log(3)); // Microtask

console.log(4);

// Output: 1, 4, 3, 2
// Microtasks always run before Macrotasks!
```

## Key Takeaways

✅ **Parallel:** Trigger promises before awaiting them.  
✅ **Promise.all:** Wait for multiple tasks (fail fast).  
✅ **Promise.allSettled:** Wait for multiple tasks (resilient).  
✅ **Promise.race:** First one wins (good for timeouts).  
✅ **Microtasks:** Promises have higher priority than timers.

---

**Next Lesson:** Error Handling - Writing Robust Code!
