---
title: "Functions"
description: "Write reusable, modular code using functions, parameters, return values, and scopes."
difficulty: "Beginner"
duration: "25 min"
prerequisites: ["control-flow"]
id: "functions"
---

# Functions in Python

A function is a block of code that only runs when it is called. You can pass data, known as parameters, into a function. A function can return data as a result.

## Why Use Functions?
*   **Reusability:** Write once, use many times.
*   **Organization:** Break complex problems into smaller, manageable pieces (Modular Programming).
*   **Maintenance:** Fix a bug in one place, and it updates everywhere.

## Defining a Function

Use the `def` keyword.

```python
def say_hello():
    print("Hello from a function!")

# Calling the function
say_hello()
say_hello()
```

---

## Parameters and Arguments

You can pass information into functions.

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
greet("Bob")
```

### Multiple Arguments
```python
def add(a, b):
    print(f"Sum: {a + b}")

add(5, 3) # Sum: 8
```

### Keyword Arguments
You can specify which parameter is which, so order doesn't matter.

```python
def describe_pet(animal_type, pet_name):
    print(f"I have a {animal_type} named {pet_name}.")

describe_pet(pet_name="Harry", animal_type="Hamster")
```

### Default Arguments
If we call the function without an argument, it uses the default value.

```python
def greet(name="User"):
    print(f"Hello, {name}!")

greet("Sarah") # Hello, Sarah!
greet()        # Hello, User!
```

---

## Return Values

Often, we don't just want to print something; we want the function to calculate a value and give it back to us.

```python
def square(number):
    return number * number

result = square(4)
print(result) # 16

# You can use the result in other expressions
print(square(5) + square(2)) # 25 + 4 = 29
```

**Note:** When `return` is executed, the function stops immediately.

---

## Variable Scope (Global vs Local)

Variables created inside a function are **local** (they exist only inside). Variables outside are **global**.

```python
x = 100 # Global

def my_func():
    x = 5 # Local variable, distinct from global x
    print(f"Inside: {x}")

my_func()
print(f"Outside: {x}") 

# Output:
# Inside: 5
# Outside: 100
```

To modify a global variable inside a function, use the `global` keyword (but use this sparingly!).

```python
count = 0

def increment():
    global count
    count += 1

increment()
print(count) # 1
```

---

## Advanced Functions

### *args (Arbitrary Arguments)
If you don't know how many arguments will be passed, add a `*`.

```python
def sum_all(*numbers):
    total = 0
    for n in numbers:
        total += n
    return total

print(sum_all(1, 2, 3))       # 6
print(sum_all(10, 20, 30, 40)) # 100
```

### Lambda Functions
Small anonymous functions. Syntax: `lambda arguments : expression`.

```python
double = lambda x: x * 2

print(double(5)) # 10
```

Commonly used with functions like `map` or `filter`.

```python
numbers = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, numbers))
print(squared) # [1, 4, 9, 16]
```

---

## Practice Exercises 🏋️‍♂️

1.  **Area Calculator:** Write a function `calculate_area(length, width)` that returns the area of a rectangle.
2.  **Even Checker:** Write a function `is_even(n)` that returns `True` if `n` is even, and `False` otherwise.
3.  **Max Finder:** Write a function `find_max(a, b, c)` that takes three numbers and returns the largest one (without using the built-in `max()` function).
4.  **Temperature Converter:** Convert your previous temperature script into a function `celsius_to_fahrenheit(c)`.

---

## Conclusion of Beginner Module

You have mastered the basics of Python! You can now store data, control logic, loop through tasks, and organize code into functions.

**What's Next?**
Level up to **Intermediate Python**! We will start with **OOP Basics (Object Oriented Programming)**, where we model real-world objects in code.
