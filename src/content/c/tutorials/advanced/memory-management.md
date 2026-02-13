---
title: "Memory Management"
description: "Take control of the Heap. Learn malloc, calloc, realloc, and free to allocate dynamic memory."
difficulty: "Advanced"
duration: "40 min"
prerequisites: ["pointers"]
id: "memory-management"
---

# Memory Management

In C, you have manual control over memory. With great power comes great responsibility (to avoid memory leaks).

## Stack vs Heap

*   **Stack:** Where local variables live. Automatically managed. Size is fixed and small.
*   **Heap:** Where dynamic memory lives. Manually managed. Large and flexible.

## Dynamic Allocation (`stdlib.h`)

### `malloc` (Memory Allocation)
Allocates a block of memory of specified size. Returns a `void*` pointer.

```c
#include <stdlib.h>

int *ptr = (int*) malloc(5 * sizeof(int)); // Array of 5 ints
```

### `calloc` (Contiguous Allocation)
Like malloc, but initializes memory to **zero**.

```c
int *ptr = (int*) calloc(5, sizeof(int));
```

### `realloc`
Resizes specific memory block.

```c
ptr = (int*) realloc(ptr, 10 * sizeof(int)); // Now holds 10 ints
```

### `free`
**CRITICAL:** When you are done, you MUST free the memory.

```c
free(ptr);
ptr = NULL; // Good practice to prevent "dangling pointer" usage
```

---

## Memory Leaks

If you forget to `free()`, that memory stays occupied until your program ends. In long-running programs (servers, games), this crashes the system.

```c
void leak() {
    // Allocates memory every time called
    int *p = malloc(100); 
    // Forgotten free(p)!
}
```

---

## Practice Exercises 🏋️‍♂️

1.  **Dynamic Array:** Ask the user "How many numbers?". Use `malloc` to create an array of that exact size.
2.  **String Resizer:** Create a string with malloc. Use `realloc` to make it larger to hold a concatenated sentence.

---

## What's Next?
Now that we can manage RAM, let's persist data to the Disk using **File I/O**.
