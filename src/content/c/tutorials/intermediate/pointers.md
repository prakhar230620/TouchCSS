---
title: "Pointers"
description: "Demystify the most feared concept in C. Learn about memory addresses, referencing (&), and dereferencing (*)."
difficulty: "Intermediate"
duration: "35 min"
prerequisites: ["variables-types"]
id: "pointers"
---

# Pointers

Pointers are the superpower of C. They allow you to manipulate memory directly.

## What is a Pointer?

A pointer is a variable that stores the **memory address** of another variable.

### Memory Address
Every variable lives at a specific location in your RAM (e.g., address `0x7ffee4`). You can see this address using the reference operator `&`.

```c
int num = 10;
printf("Value: %d\n", num);      // 10
printf("Address: %p\n", &num);   // 0x7ffd... (Hexadecimal address)
```

## Declaring a Pointer

Use the asterisk `*` to declare a pointer.

```c
int *ptr; // A pointer to an integer
```

## Assigning and Using Pointers

1.  **Reference (`&`)**: Get the address.
2.  **Dereference (`*`)**: Go to the address and get/change value.

```c
int a = 5;
int *p = &a; // p points to a

printf("Value of a: %d\n", a);      // 5
printf("Address of a: %p\n", &a);   // 0x123...
printf("Value of p: %p\n", p);      // 0x123... (Same as &a)
printf("Value *p points to: %d\n", *p); // 5 (Dereferencing)

// Changing value via pointer
*p = 20; 
printf("New value of a: %d\n", a);  // 20
```

---

## Why Use Pointers?

1.  **Pass by Reference:** Functions can modify original variables.
2.  **Dynamic Memory:** Essential for creating data structures (Lists, Trees).
3.  **Arrays & Strings:** In C, arrays act very much like pointers.

### Pass by Reference Example

```c
void addOne(int *n) {
    *n = *n + 1; // Change the value AT the address
}

int main() {
    int x = 10;
    addOne(&x); // Pass the address of x
    printf("%d", x); // 11
    return 0;
}
```

---

## Common Pitfalls (Segfaults)

*   **Uninitialized Pointers:** Using `int *p; *p = 5;` without assigning `p` to a valid address crashes the program (Segmentation Fault).
*   **NULL Pointers:** Always initialize unused pointers to `NULL`.

```c
int *ptr = NULL;
if (ptr != NULL) {
    // Safe to use
}
```

---

## Practice Exercises 🏋️‍♂️

1.  **Pointer Swap:** Write a function `swap(int *a, int *b)` that swaps the values of two variables using pointers.
2.  **Address Printer:** Print the memory addresses of three different variables. Notice how close they are in memory.

---

## What's Next?
Now that you know pointers, you can understand how C handles lists of data using **Arrays**.
