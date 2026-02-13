---
id: "oop-cpp"
language: "cpp"
level: "intermediate"
title: "Object-Oriented Programming"
description: "Dive into Classes, Objects, Constructors, and Inheritance."
duration: "35 min"
order: 2
prerequisites: ["pointers"]
---

# Object-Oriented Programming (OOP)

C++ is an object-oriented programming language. OOP is faster and easier to execute, and provides a clear structure for the programs.

## Classes and Objects

A **Class** is a blueprint (like a car design). An **Object** is an instance of the class (like a specific car).

```cpp
class Car {       // The class
  public:         // Access specifier
    string brand; // Attribute
    string model; // Attribute
    int year;     // Attribute
    
    // Method inside class
    void honk() {
        cout << "Beep beep!";
    }
};

int main() {
  Car myCar;      // Create an object of Car
  myCar.brand = "BMW";
  myCar.model = "X5";
  myCar.year = 1999;

  cout << myCar.brand << " " << myCar.model;
  myCar.honk();
  return 0;
}
```

## Access Specifiers

*   `public` - members are accessible from outside the class
*   `private` - members cannot be accessed (or viewed) from outside the class
*   `protected` - members cannot be accessed from outside the class, however, they can be accessed in inherited classes.

## Constructors

A constructor in C++ is a special method that is automatically called when an object of a class is created.

```cpp
class Car {
  public:
    Car() { // Constructor
      cout << "Car created!";
    }
};
```
