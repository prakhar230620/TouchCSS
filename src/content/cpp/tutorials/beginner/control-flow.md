---
id: "control-flow"
language: "cpp"
level: "beginner"
title: "Control Flow"
description: "Master If-Else statements, Switch cases, and Loops in C++."
duration: "25 min"
order: 3
prerequisites: ["variables-types"]
---

# Control Flow

Control flow statements allow your program to make decisions and repeat actions.

## If ... Else

Use `if` to specify a block of code to be executed, if a specified condition is true.

```cpp
int time = 20;
if (time < 18) {
  cout << "Good day.";
} else {
  cout << "Good evening.";
}
// Outputs "Good evening."
```

## Switch Statement

Use `switch` to select one of many code blocks to be executed.

```cpp
int day = 4;
switch (day) {
  case 1:
    cout << "Monday";
    break;
  case 2:
    cout << "Tuesday";
    break;
  // ...
  default:
    cout << "Weekend";
}
```

## Loops

### While Loop

Loops through a block of code as long as a specified condition is true.

```cpp
int i = 0;
while (i < 5) {
  cout << i << "\n";
  i++;
}
```

### For Loop

When you know exactly how many times you want to loop through a block of code, use the `for` loop.

```cpp
for (int i = 0; i < 5; i++) {
  cout << i << "\n";
}
```
