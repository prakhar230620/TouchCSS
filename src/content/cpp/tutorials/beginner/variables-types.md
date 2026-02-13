---
id: "variables-types"
language: "cpp"
level: "beginner"
title: "Variables and Data Types"
description: "Learn about C++ variables involved int, float, double, char, bool and string."
duration: "20 min"
order: 2
prerequisites: ["intro-to-cpp"]
---

# Variables and Data Types

In C++, variables are containers for storing data values. C++ is a strongly typed language, meaning every variable must have a declared type.

## Basic Data Types

| Type | Description | Size (Typical) | Example |
| :--- | :--- | :--- | :--- |
| `int` | Integers (whole numbers) | 4 bytes | `int age = 21;` |
| `float` | Floating point numbers | 4 bytes | `float price = 19.99;` |
| `double` | Double precision float | 8 bytes | `double pi = 3.14159;` |
| `char` | Single character | 1 byte | `char grade = 'A';` |
| `bool` | Boolean (true/false) | 1 byte | `bool isPassed = true;` |
| `string` | Text string (requires `<string>`) | Variable | `string name = "Alice";` |

## Declaring Variables

Syntax: `type variableName = value;`

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int myNum = 5;
    double myFloatNum = 5.99;
    char myLetter = 'D';
    string myText = "Hello";
    bool myBoolean = true;

    cout << "Number: " << myNum << endl;
    cout << "String: " << myText << endl;
    return 0;
}
```

## User Input

You can use `cin` (Character Input) to get user input.

```cpp
int x;
cout << "Type a number: "; 
cin >> x; // Get user input from the keyboard
cout << "Your number is: " << x;
```
