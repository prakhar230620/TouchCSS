---
title: "Variables & Data Types"
description: "Master the fundamentals of storing data: Strings, Integers, Floats, Booleans, and Type Casting."
difficulty: "Beginner"
duration: "25 min"
prerequisites: ["intro-to-python"]
id: "variables-types"
---

# Variables & Data Types

In the previous lesson, we printed text. Now, let's learn how to remember it.

## What is a Variable?

Think of a variable as a **labeled box** inside the computer's memory. You put data in it, and you can retrieve it later using the label (name).

```python
player_name = "Mario"
score = 100
level = 1
```

Here, `player_name`, `score`, and `level` are variables.

### Rules for Naming Variables
*   ✅ **Allowed:** Letters (`a-z`, `A-Z`), Numbers (`0-9`), Underscores (`_`).
*   ❌ **Not Allowed:** Cannot start with a number (`1st_place` is bad).
*   ❌ **No Spaces:** Use underscores instead (`my_variable`, not `my variable`).
*   ⚠️ **Case Sensitive:** `Score` and `score` are different variables.
*   ⚠️ **Keywords:** Avoid words like `print`, `if`, `while`.

**Best Practice:** Use `snake_case` for Python variable names (all lowercase with underscores).

---

## Basic Data Types

Python has several built-in types to store different kinds of data.

### 1. Strings (`str`)
Text data enclosed in quotes.

```python
msg = "Hello Python"
char = 'A'  # Single quotes work too
multi_line = """This is a
multi-line string."""
```

### 2. Integers (`int`)
Whole numbers without decimals.

```python
count = 10
year = 2024
negative = -5
```

### 3. Floats (`float`)
Numbers with decimals (floating-point numbers).

```python
pi = 3.14159
temperature = 98.6
gravity = 9.8
```

### 4. Booleans (`bool`)
Logical values representing True or False. Note the capital 'T' and 'F'.

```python
is_admin = True
is_game_over = False
```

---

## Checking Data Types

You can check the type of any variable using the `type()` function.

```python
x = 10
y = 10.5
z = "10"

print(type(x)) # <class 'int'>
print(type(y)) # <class 'float'>
print(type(z)) # <class 'str'>
```

---

## Dynamic Typing

Python is **dynamically typed**, meaning you don't declare the type explicitly. You can even change the type later (though it's not always recommended).

```python
x = 10       # x is an int
print(x)

x = "Hello"  # Now x is a str
print(x)
```

---

## Type Casting (Conversion)

Sometimes you need to convert one type to another.

### String to Integer
```python
age_str = "25"
age_num = int(age_str)
print(age_num + 5) # Output: 30
```

### Integer to String
```python
score = 99
# print("Score: " + score) # ERROR! Cannot combine string and int directly
print("Score: " + str(score)) # Output: Score: 99
```

### Float to Integer
Converts by just chopping off the decimal (truncating).

```python
pi = 3.99
print(int(pi)) # Output: 3 (NOT 4)
```

---

## String Formatting (f-strings)

The modern way to combine variables with text is using **f-strings** (formatted string literals). Just put an `f` before the quote and use `{}` for variables.

```python
name = "Alice"
age = 30
height = 1.75

# The Old Way (Comma)
print("Name:", name, "Age:", age)

# The f-string Way (Recommended)
print(f"Name: {name}, Age: {age}, Height: {height}m")

# You can even do math inside!
print(f"Next year, {name} will be {age + 1}.")
```

---

## Input from User

To make programs interactive, often we want input from the user.

```python
name = input("Enter your name: ")
print(f"Hello, {name}!")
```

**CRITICAL NOTE:** `input()` **ALWAYS** returns a STRING.

```python
# Bad Example
age = input("Enter age: ")
# print(age + 1) # Error! Cannot add int to string.

# Good Example
age = int(input("Enter age: ")) # Convert immediately
print(f"In 5 years you will be {age + 5}.")
```

---

## Practice Exercises 🏋️‍♂️

1.  **The Swapper:** Create two variables, `a = 5` and `b = 10`. Write code to swap their values so `a` becomes 10 and `b` becomes 5. Print the result.
2.  **Temperature Converter:** Ask the user for a temperature in Celsius. Convert it to Fahrenheit using the formula `F = (C * 9/5) + 32`. Print the result.
3.  **Mad Libs:** Ask the user for a noun, a verb, and an adjective. Combine them into a funny sentence using an f-string.

---

## What's Next?

Now that we can store data, we need to make decisions based on that data. Up next: **Control Flow (If/Else & Loops)!**
