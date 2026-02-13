---
title: "Introduction to Python"
description: "Start your journey with Python: Installation, your first script, and understanding why it's the world's most popular language."
difficulty: "Beginner"
duration: "20 min"
prerequisites: []
id: "intro-to-python"
---

# Introduction to Python

Welcome to the world of Python! 🐍

Python is more than just a programming language; it's a powerful tool used by scientists, web developers, AI researchers, and automation engineers around the globe. Known for its simplicity and readability, Python lets you focus on solving problems rather than fighting with syntax.

## Why Python?

Before we write code, let's understand why Python is the #1 choice for beginners and experts alike:

### 1. Readable & English-like
Python consumes less space and is more readable than languages like C++ or Java.
*   **Java:** `public static void main(String[] args) { System.out.println("Hello"); }`
*   **Python:** `print("Hello")`

### 2. Versatile
You can use Python for:
*   🕸️ **Web Development** (Django, Flask)
*   📊 **Data Science** (Pandas, NumPy)
*   🤖 **AI & Machine Learning** (TensorFlow, PyTorch)
*   ⚙️ **Automation** (Scripts to automate boring tasks)
*   🎮 **Game Dev** (Pygame)

### 3. Massive Community
If you get stuck, chances are someone else has already solved your problem. Libraries (pre-written code) exist for almost anything you can imagine.

---

## Setting Up Your Environment

To write Python, you usually need to install it on your computer.

### Installation
1.  Go to [python.org](https://www.python.org/downloads/).
2.  Download the latest version (e.g., Python 3.12+).
3.  **IMPORTANT:** During installation, check the box that says **"Add Python to PATH"**.

### The REPL (Interactive Shell)
Once installed, you can open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and type:

```bash
python
```

You will see the `>>>` prompt. This is the **REPL** (Read-Eval-Print Loop). You can type Python code here and it runs instantly!

---

## Your First Program: Hello World

It is a tradition in programming to start by making the computer say "Hello, World!".

In your editor or REPL, type:

```python
print("Hello, World!")
```

**Output:**
```
Hello, World!
```

### Breakdown
*   `print()` is a built-in **function** that displays text to the screen.
*   `"Hello, World!"` is a **string** (text enclosed in quotes).
*   Standard formatting: Python uses parentheses `()` for functions in Python 3.

---

## Comments: documenting Your Code

Comments are lines of text in your code that the computer ignores. They are for **humans** to read.

### Single-line Comments
Use the hash symbol `#`.

```python
# This is a comment. Python ignores this.
print("This code runs.") # You can add comments at the end of a line
```

### Multi-line Comments
Technically, Python doesn't have a specific multi-line comment syntax, but we often use triple quotes `"""` for documentation.

```python
"""
This is a multi-line string.
It is often used as a comment block
to explain complex logic at the start of a file.
"""
print("Code running...")
```

---

## Simple Math

Python is an excellent calculator. You can perform arithmetic directly.

```python
print(5 + 3)    # Addition: 8
print(10 - 2)   # Subtraction: 8
print(4 * 2)    # Multiplication: 8
print(16 / 2)   # Division: 8.0 (Always returns a float)
print(10 // 3)  # Floor Division: 3 (Removes the decimal)
print(10 % 3)   # Modulo (Remainder): 1
print(2 ** 3)   # Exponentiation (Power): 8 (2 * 2 * 2)
```

**Try it:** Open the Playground and calculate how many seconds are in a year! 
`(365 * 24 * 60 * 60)`

---

## Variables (A Sneak Peek)

We will cover variables in depth in the next lesson, but here is the basic idea. Variables are like boxes where you store data.

```python
name = "Alice"
age = 25

print(name)  # Output: Alice
print(age)   # Output: 25

# You can combine them
print(name, "is", age, "years old.")
```

Unlike other languages, you don't need to declare the "type" (like `int` or `string`). Python figures it out for you!

---

## Typical Pitfalls for Beginners

### 1. Indentation Error
Python uses **indentation** (spaces) to define blocks of code. If you add random spaces, Python will crash.

```python
# Bad
print("Hello")
  print("World") # IndentationError: unexpected indent
```

### 2. Case Sensitivity
Python distinguishes between uppercase and lowercase.

```python
print("Hi") # Works
Print("Hi") # NameError: name 'Print' is not defined
```

---

## Practice Exercises 🏋️‍♂️

1.  **Bio Printer:** Write a program that prints your Name, Age, and Favorite Hobby on three separate lines.
2.  **The Calculator:** Calculate the result of `(50 + 25) * 3` using Python.
3.  **Art:** Try to print a triangle using asterisks `*` using multiple print statements.
    ```
    *
    **
    ***
    ```

---

## What's Next?

Congratulations! You've written your first Python code. 🚀

In the next lesson, we will dive deep into **Variables & Data Types**, where we learn how to store and manipulate information.
