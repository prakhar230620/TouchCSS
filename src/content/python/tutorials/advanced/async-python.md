---
title: "Async Python"
description: "Introduction to Asynchronous Programming. Learn asyncio, async/await, and how to write non-blocking code."
difficulty: "Advanced"
duration: "40 min"
prerequisites: ["decorators", "generators"]
id: "async-python"
---

# Asynchronous Python (async/await)

Traditionally, Python is **synchronous**: it runs one line at a time. If one line takes 5 seconds (like downloading a file), the whole program freezes for 5 seconds.

**Asynchronous** programming allows the program to handle other tasks while waiting for long operations to finish.

## Synchronous vs Asynchronous

### Synchronous (Blocking)
```python
import time

def brew_coffee():
    print("Start brewing...")
    time.sleep(2) # Waits for 2 seconds
    print("Coffee ready!")

def toast_bread():
    print("Start toasting...")
    time.sleep(2)
    print("Toast ready!")

# Takes 4 seconds total
brew_coffee()
toast_bread()
```

### Asynchronous (Non-Blocking)
We use the `asyncio` library and `async/await` keywords.

```python
import asyncio

async def brew_coffee():
    print("Start brewing...")
    await asyncio.sleep(2) # Non-blocking wait
    print("Coffee ready!")

async def toast_bread():
    print("Start toasting...")
    await asyncio.sleep(2)
    print("Toast ready!")

async def main():
    # Run both at the same time
    await asyncio.gather(brew_coffee(), toast_bread())

# Takes ~2 seconds total!
asyncio.run(main())
```

---

## Key Concepts

### 1. Coroutine
A function defined with `async def`. It doesn't run immediately; it returns a coroutine object. It must be `await`ed.

```python
async def say_hello():
    pass
```

### 2. Event Loop
The engine that runs coroutines. `asyncio.run(main())` starts the loop.

### 3. Await
Pauses the current coroutine and yields control back to the event loop. "I can't continue until this is done, go do other work."

---

## Real World Example: HTTP Requests

Fetching data from 3 websites. Synchronously, it takes `Time A + Time B + Time C`. Asynchronously, it takes `Max(Time A, B, C)`.

*Note: The `requests` library is synchronous. For async, we use `aiohttp`.*

```python
import asyncio
# import aiohttp (Requires install)

async def fetch_url(url):
    print(f"Fetching {url}...")
    await asyncio.sleep(1) # Simulating network delay
    print(f"Done {url}")
    return "Data"

async def main():
    urls = ["google.com", "apple.com", "microsoft.com"]
    
    # Create tasks
    tasks = [fetch_url(url) for url in urls]
    
    # Run all
    await asyncio.gather(*tasks)

asyncio.run(main())
```

---

## Common Pitfalls

1.  **Using `time.sleep`:** This blocks the ENTIRE event loop. Always use `asyncio.sleep`.
2.  **Forgetting `await`:** If you call a coroutine without `await`, it won't run.
3.  **Mixing Sync/Async:** If you have CPU-heavy code (calculating huge numbers), async won't help. Async is for I/O (network, files).

---

## Practice Exercises 🏋️‍♂️

1.  **Async Timer:** Write an async function `countdown(name, seconds)` that prints a countdown. Run two countdowns simultaneously ("Rocket A" for 5s, "Rocket B" for 3s).
2.  **Simulated Download:** Create a coroutine `download_file(file_name)` that takes a random amount of time (1-3s) to complete. Run 5 downloads concurrently.

---

## What's Next?

You now understand concurrency! Finally, we will learn how to verify your code works correctly using **Unit Testing**.
