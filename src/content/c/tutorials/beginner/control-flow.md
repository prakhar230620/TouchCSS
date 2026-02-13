---
title: "Control Flow"
description: "Master if statements, switch cases, standard while loops, and for loops in C."
difficulty: "Beginner"
duration: "30 min"
prerequisites: ["variables-types"]
id: "control-flow"
---

# Control Flow

C provides standard control structures to dictate the flow of execution.

## 1. Conditions (if/else)

```c
#include <stdio.h>

int main() {
    int score = 85;

    if (score >= 90) {
        printf("Grade: A\n");
    } else if (score >= 80) {
        printf("Grade: B\n");
    } else {
        printf("Grade: F\n");
    }

    return 0;
}
```

**Note:** C uses curly braces `{}` to define blocks.

## 2. Switch Statement

Useful for checking a single variable against multiple constants.

```c
int day = 3;

switch (day) {
    case 1:
        printf("Monday\n");
        break; // Don't forget break!
    case 2:
        printf("Tuesday\n");
        break;
    case 3:
        printf("Wednesday\n");
        break;
    default:
        printf("Invalid day\n");
}
```

## 3. Loops

### For Loop
Best when you know how many times to iterate.

```c
// Print numbers 0 to 4
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}
// Output: 0 1 2 3 4
```

### While Loop
Best when looping based on a condition.

```c
int count = 1;
while (count <= 5) {
    printf("%d\n", count);
    count++; // Increment
}
```

### Do-While Loop
Executes AT LEAST once.

```c
int n = 10;
do {
    printf("Executed once even though condition is false!\n");
} while (n < 5);
```

---

## Break and Continue

*   `break`: Exits condition/loop immediately.
*   `continue`: Skips to next iteration.

```c
for (int i = 0; i < 10; i++) {
    if (i == 5) continue; // Skip 5
    if (i == 8) break;    // Stop at 8
    printf("%d ", i);
}
// Output: 0 1 2 3 4 6 7
```

---

## Practice Exercises 🏋️‍♂️

1.  **Even or Odd:** Write a program that checks if a number variable is even or odd using `%` and `if/else`.
2.  **Countdown:** Use a `while` loop to print numbers from 10 down to 1 ("Liftoff!").
3.  **Summation:** Use a `for` loop to calculate the sum of numbers from 1 to 100.

---

## What's Next?
Loops and variables are great, but efficient code needs structure. Next: **Functions**.
