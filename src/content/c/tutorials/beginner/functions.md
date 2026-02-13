---
title: "Functions"
description: "Learn how to define functions, pass arguments by value, and return data in C."
difficulty: "Beginner"
duration: "25 min"
prerequisites: ["control-flow"]
id: "functions"
---

# Functions in C

Functions allow you to break your code into reusable blocks.

## Function Syntax

```c
return_type function_name(parameter_type parameter_name) {
    // code
    return value;
}
```

## Creating a Function

In C, it is best practice to **declare** (prototype) the function before `main()` and **define** it after `main()`, or just define it before `main()`.

```c
#include <stdio.h>

// Function Declaration
int add(int a, int b);

int main() {
    int result = add(5, 3);
    printf("Result: %d\n", result);
    return 0;
}

// Function Definition
int add(int a, int b) {
    return a + b;
}
```

## Void Functions

If a function doesn't return anything, use `void`.

```c
void sayHello(char name[]) {
    printf("Hello, %s!\n", name);
}

int main() {
    sayHello("Alice"); // Hello, Alice!
    return 0;
}
```

## Pass by Value

By default, C passes a **copy** of the variable to the function. Changing the parameter inside the function does NOT affect the original variable.

```c
void increment(int x) {
    x = x + 1;
}

int main() {
    int num = 10;
    increment(num);
    printf("%d\n", num); // Still 10!
    return 0;
}
```

*To change the original, we need **Pointers**, which we will cover in the Intermediate module.*

---

## Scope

Variables declared inside a function are **local** to that function.

```c
void test() {
    int x = 5; // Local
}

int main() {
    // printf("%d", x); // Error! 'x' is undefined here.
    return 0;
}
```

---

## Recursion

Functions can call themselves.

```c
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

---

## Practice Exercises 🏋️‍♂️

1.  **Max Function:** Write a function `int max(int a, int b)` that returns the larger of two numbers.
2.  **Square Function:** Write a `void` function `printSquare(int n)` that prints `n * n`.
3.  **Is Prime:** Write a function that returns `1` (true) if a number is prime, and `0` (false) otherwise.

---

## Conclusion of Beginner Module

You have survived the basics of C! It wasn't so scary, right? 
Warning: The next module introduces **Pointers**, the most notorious and powerful feature of C.
