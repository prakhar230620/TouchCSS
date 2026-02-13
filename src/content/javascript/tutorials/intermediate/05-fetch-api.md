---
id: "fetch-api"
language: "javascript"
level: "intermediate"
title: "Fetch API - Networking"
description: "Learn how to make HTTP requests to get data from servers"
duration: "30 min"
order: 5
prerequisites: ["async-basics"]
---

# Fetch API - Networking

Most modern apps rely on external data (APIs). The **Fetch API** allows JavaScript to make HTTP requests to servers.

## Basic GET Request

By default, `fetch` makes a GET request (retrieving data).

```javascript
fetch('https://api.example.com/data')
    .then(response => {
        // First, check if network request was OK
        if (!ok) {
            throw new Error('Network response was not ok');
        }
        // Parse JSON body
        return response.json(); 
    })
    .then(data => {
        // Use the data
        console.log(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
```

## Using Async/Await (Cleaner)

```javascript
async function loadUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();
        console.log(`Name: ${user.name}`);
        
    } catch (error) {
        console.error("Failed to load user:", error);
    }
}

loadUserData();
```

## HTTP Methods (POST, PUT, DELETE)

To send data (e.g., login, create post), we need options.

### Sending Data (POST)

```javascript
async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json', // Tell server we send JSON
            'Authorization': 'Bearer my-token-123' // Auth headers
        },
        body: JSON.stringify(userData) // Convert JS Object to JSON string
    });
    
    return await response.json();
}

createUser({ name: "Alice", email: "alice@example.com" });
```

## JSON (JavaScript Object Notation)

The standard format for API data. It looks like a JS object but keys are strings.

```json
{
    "name": "Alice",
    "age": 25,
    "skills": ["JS", "CSS"]
}
```

- `JSON.stringify(obj)`: JS Object -> JSON String (Sending to server)
- `JSON.parse(str)`: JSON String -> JS Object (Reading from server)
- `response.json()`: Helper method in Fetch that reads stream and parses JSON.

## Handling Errors

Fetch only rejects on **network failure** (e.g., offline). It does **NOT** reject on HTTP errors like 404 (Not Found) or 500 (Server Error).

**Always check `response.ok`:**

```javascript
const res = await fetch('/api/missing');

if (res.ok) {
    // Success (Status 200-299)
} else {
    // Failure (Status 404, 500, etc.)
    console.log("Error status:", res.status);
}
```

## Real World Pattern: Loading State

When fetching, UI should show feedback.

```javascript
async function showProfile() {
    const container = document.querySelector('#profile');
    
    // 1. Show Loading
    container.innerHTML = 'Loading...';
    
    try {
        const res = await fetch('https://api.github.com/users/octocat');
        const data = await res.json();
        
        // 2. Show Data
        container.innerHTML = `
            <h1>${data.name}</h1>
            <img src="${data.avatar_url}" width="100" />
        `;
    } catch (err) {
        // 3. Show Error
        container.innerHTML = 'Failed to load profile.';
    }
}
```

## Key Takeaways

✅ `fetch()` returns a Promise.  
✅ Always convert response using `.json()`.  
✅ Use `async/await` for readable code.  
✅ Use `JSON.stringify()` when sending bodies.  
✅ Handle errors with `try/catch` AND check `response.ok`.

## Practice Exercise

1. Fetch a todo item from `https://jsonplaceholder.typicode.com/todos/1`.
2. Log the title.
3. If `completed` is true, log "Done", else "Pending".

---

**Next Lesson:** ES6 Features - Modern Syntax!
