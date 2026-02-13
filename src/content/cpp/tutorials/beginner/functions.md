---
id: "functions"
language: "cpp"
level: "beginner"
title: "Functions"
description: "Learn how to define, call, and overload functions in C++."
duration: "20 min"
order: 4
prerequisites: ["control-flow"]
---

# Functions

A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function.

## Creating a Function

```cpp
void myFunction() {
  cout << "I just got executed!";
}

int main() {
  myFunction(); // call the function
  return 0;
}
```

## Parameters and Return Values

```cpp
int sum(int a, int b) {
    return a + b;
}

int main() {
    int result = sum(5, 3);
    cout << result; // Outputs 8
    return 0;
}
```

## Function Overloading

With function overloading, multiple functions can have the same name with different parameters.

```cpp
int plusFunc(int x, int y) {
  return x + y;
}

double plusFunc(double x, double y) {
  return x + y;
}

int main() {
  int myNum1 = plusFunc(8, 5);
  double myNum2 = plusFunc(4.3, 6.26);
  return 0;
}
```

This makes your code cleaner and easier to read.
