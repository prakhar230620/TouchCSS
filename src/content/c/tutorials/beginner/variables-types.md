---
title: "Variables & Data Types"
description: "Learn about C's static typing: int, float, char, and double. Understand declarations vs definitions."
difficulty: "Beginner"
duration: "25 min"
prerequisites: ["intro-to-c"]
id: "variables-types"
---

# Variables & Data Types

In C, you must specify the **type** of every variable before you use it. This is called **Static Typing**.

## Declaring Variables

Syntax: `type variable_name = value;`

```c
int age = 25;
float height = 5.9;
char grade = 'A';
```

---

## Basic Data Types

### 1. Integer (`int`)
Whole numbers. Uses 4 bytes typically (-2 billion to +2 billion).

```c
int count = 10;
int negative = -50;
```

### 2. Float (`float`)
Decimal numbers. Uses 4 bytes. Precision is about 6-7 decimal digits.

```c
float pi = 3.14;
```

### 3. Double (`double`)
Double-precision float. Uses 8 bytes. More precise (15 decimal digits). Use this for math.

```c
double atomic_weight = 1.00784;
```

### 4. Character (`char`)
A single character. Uses 1 byte. Enclosed in **single quotes** `'`.

```c
char letter = 'B';
char symbol = '#';
```

**Note:** C does NOT have a built-in `string` type! Strings are arrays of characters (we'll see this later).

---

## Format Specifiers (`printf`)

To print variables, you must use **placeholders** (format specifiers) in `printf`.

*   `%d`: Integer (Decimal)
*   `%f`: Float / Double
*   `%c`: Character
*   `%s`: String (technically array of char)

```c
#include <stdio.h>

int main() {
    int age = 20;
    float price = 10.99;
    char rank = 'S';

    printf("I am %d years old.\n", age);
    printf("The price is $%.2f.\n", price); // %.2f restricts to 2 decimal places
    printf("Rank: %c\n", rank);
    
    return 0;
}
```

---

## Constants

If a variable should never change, declare it as constant using `const`.

```c
const float PI = 3.14159;
// PI = 3.0; // Error: assignment of read-only variable 'PI'
```

---

## Sizeof Operator

You can check how many bytes a type uses.

```c
printf("Int size: %lu bytes\n", sizeof(int));
printf("Double size: %lu bytes\n", sizeof(double));
```

---

## Practice Exercises 🏋️‍♂️

1.  **Bio Card:** Create variables for `age`, `height`, and `initial`. Print them in a formatted sentence: "Age: 25, Height: 5.9, Initial: J".
2.  **Rectangle Area:** Define `width` and `height` as integers. Calculate `area` and print it.
3.  **Temperature:** Store a temperature in Celsius (float). Convert it to Fahrenheit (F = C * 9/5 + 32) and print both.

---

## What's Next?
Data is useless without logic. Next up: **Control Flow (If/Else & Loops)**.
