---
id: "pointers"
language: "cpp"
level: "intermediate"
title: "Pointers and References"
description: "Understand memory addresses, pointers, dereferencing, and references."
duration: "30 min"
order: 1
prerequisites: ["functions"]
---

# Pointers and References

To understand C++, you must understand pointers. A pointer is a variable that stores the memory address as its value.

## The Address-of Operator (&)

You can get the memory address of a variable using the `&` operator.

```cpp
string food = "Pizza";
cout << &food; // Outputs the memory address (e.g., 0x6dfed4)
```

## Creating Pointers

A pointer variable points to a data type (like `int` or `string`) of the same type, and is created with the `*` operator.

```cpp
string food = "Pizza";
string* ptr = &food; // A pointer variable that stores the address of food

cout << food;  // Outputs "Pizza"
cout << &food; // Outputs address
cout << ptr;   // Outputs address
```

## Dereferencing (*)

Use the `*` operator to get the value of the variable the pointer points to.

```cpp
cout << *ptr; // Outputs "Pizza"
```

## References

A reference variable is a "reference" to an existing variable, and it is created with the `&` operator.

```cpp
string food = "Pizza";
string &meal = food; // reference to food

cout << food;  // Outputs Pizza
cout << meal;  // Outputs Pizza
```
