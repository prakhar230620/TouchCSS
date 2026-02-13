---
title: "Control Flow"
description: "Learn how to make decisions (if/else) and repeat actions (loops) to create dynamic programs."
difficulty: "Beginner"
duration: "30 min"
prerequisites: ["variables-types"]
id: "control-flow"
---

# Control Flow

Programs aren't just a list of instructions from top to bottom. Sometimes we need to jump around, make choices, or repeat things. This is called **Control Flow**.

## 1. Boolean Logic

Before we make decisions, we need to understand how computers compare things. Comparison operators return `True` or `False`.

*   `==` : Equal to (Note: `=` is assignment, `==` is specific comparison)
*   `!=` : Not equal to
*   `>`  : Greater than
*   `<`  : Less than
*   `>=` : Greater than or equal to
*   `<=` : Less than or equal to

```python
x = 10
print(x == 10)  # True
print(x > 20)   # False
print(x != 5)   # True
```

### Logical Operators
Combine multiple conditions.
*   `and` : Both must be true
*   `or`  : At least one must be true
*   `not` : Reverses the boolean

```python
age = 25
has_ticket = True

# Can enter if over 18 AND has ticket
can_enter = age >= 18 and has_ticket
```

---

## 2. Conditional Statements (if, elif, else)

Logic allows your program to react differently to different data.

### The Basic `if`
```python
temperature = 35

if temperature > 30:
    print("It's a hot day!")
    print("Drink water.") # Runs only if condition is True

print("End of program") # Always runs
```

### The `else` clause
```python
age = 16

if age >= 18:
    print("You can vote!")
else:
    print("You are too young to vote.")
```

### The `elif` (else if) clause
Handle multiple possibilities.

```python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
```

**Note:** Python checks conditions from top to bottom. The first one that is `True` wins, and the rest are ignored.

---

## 3. Loops (Repetition)

Loops let us repeat code without copying and pasting.

### The `while` Loop
Repeats AS LONG AS a condition is true.

```python
count = 1

while count <= 5:
    print(f"Count is {count}")
    count = count + 1 # Don't forget this! Or you get an infinite loop 💀

print("Blastoff!")
```

### The `for` Loop
Iterates over a sequence (like a list, a string, or a range of numbers). This is the most common loop in Python.

#### Loop through numbers (`range`)
```python
# Prints 0 to 4 (5 is excluded)
for i in range(5):
    print(i)

# Prints 1 to 10
for i in range(1, 11):
    print(i)

# Steps by 2 (2, 4, 6, 8, 10)
for i in range(2, 11, 2):
    print(i)
```

#### Loop through a String
```python
word = "Python"
for char in word:
    print(char)
```

---

## 4. Break and Continue

*   `break`: Exits the loop immediately.
*   `continue`: Skips the current iteration and jumps to the next one.

```python
# Finding the first even number
for n in range(1, 10):
    if n % 2 == 0:
        print(f"Found even number: {n}")
        break # Stops after finding the first one (2)

# Skipping odd numbers
for n in range(1, 6):
    if n % 2 != 0:
        continue # Skip the rest of code for this number
    print(f"Even: {n}")
```

---

## 5. Match Case (Python 3.10+)

Similar to `switch` in other languages.

```python
status = 404

match status:
    case 200:
        print("OK")
    case 404:
        print("Not Found")
    case 500:
        print("Server Error")
    case _:
        print("Unknown Status") # Default case
```

---

## Practice Exercises 🏋️‍♂️

1.  **Grade Calculator:** Ask the user for a percentage (0-100). Print their letter grade (A, B, C, D, F) using `if/elif/else`.
2.  **Password Checker:** Ask the user to enter a password. Keep asking until they enter the correct secret password ("python123"). Use a `while` loop.
3.  **Sum of Numbers:** Use a `for` loop to calculate the sum of all numbers from 1 to 100. (Result should be 5050).
4.  **FizzBuzz:** Print numbers 1 to 20. If divisible by 3, print "Fizz". If divisible by 5, print "Buzz". If both, "FizzBuzz".

---

## What's Next?

 loops are powerful, but code gets messy if you put everything in one place. Up next: **Functions** - how to organize reusable blocks of code.
