---
title: "Introduction to C"
description: "Understand the history of C, how compilation works, and write your first Hello World program."
difficulty: "Beginner"
duration: "20 min"
prerequisites: []
id: "intro-to-c"
---

# Introduction to C

Welcome to C! 🛠️

C is often called the "Mother of all languages." Created in 1972 by Dennis Ritchie at Bell Labs, it was designed to build the Unix operating system. Today, it still powers mostly everything from your microwave to the Windows kernel.

## Why Learn C?

1.  **Understand the Machine:** C gives you a mental model of how computer memory and processors work.
2.  **Performance:** C code compiles directly to machine code, making it incredibly fast.
3.  **Foundation:** Languages like C++, Java, JavaScript, and Python borrow syntax and concepts from C.

---

## How C Works (The Compiler)

Unlike Python (which is interpreted line-by-line), C is **compiled**.

1.  **Source Code (`.c`)**: You write the code.
2.  **Compiler (gcc/clang)**: Translates the code into machine instructions (0s and 1s).
3.  **Executable (`.exe` or `a.out`)**: You run this file.

---

## Your First Program: Hello World

Let's write a program that prints text to the screen.

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

### Breakdown

1.  `#include <stdio.h>`: This is a **Preprocessor Directive**. It tells the compiler to include the "Standard Input Output" library. We need this to use `printf`.
2.  `int main() { ... }`: This is the **Main Function**. Every C program starts execution here.
3.  `printf("Hello, World!\n");`: A function from `stdio.h` that prints formatted text. `\n` creates a new line.
4.  `return 0;`: Ends the program and tells the OS that everything went okay (Exit Code 0).
5.  `;`: Semicolons are **mandatory** at the end of every statement.

---

## Comments

Comments are ignored by the compiler.

```c
// This is a single-line comment

/*
   This is a
   multi-line comment
*/
```

---

## Common Pitfalls for Beginners

*   **Missing Semicolons:** Forgot a `;`? The compiler will yell at you.
*   **Case Sensitivity:** `Main` is different from `main`. C requires `main()`.
*   **Compilation Errors:** You won't see the output until you fix ALL errors.

---

## Practice Exercises 🏋️‍♂️

1.  **Name Printer:** Write a program that prints your name on the first line and your age on the second line.
2.  **The Box:** Use multiple `printf` statements to draw a square using asterisks `*`.
    ```
    ****
    *  *
    ****
    ```

---

## What's Next?
Now that you have your environment set up, let's learn how to store data using **Variables & Data Types**.
