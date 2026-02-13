---
id: "stl"
language: "cpp"
level: "intermediate"
title: "Standard Template Library (STL)"
description: "Learn to use Vectors, Maps, and other powerful data structures."
duration: "30 min"
order: 3
prerequisites: ["oop-cpp"]
---

# Standard Template Library (STL)

The STL is a set of C++ template classes to provide common programming data structures and functions like lists, stacks, arrays, etc.

## Vectors

A `vector` is a dynamic array that can resize itself automatically when an element is inserted or deleted.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Create a vector called cars that will store strings
    vector<string> cars = {"Volvo", "BMW", "Ford", "Mazda"};

    // Add an element
    cars.push_back("Tesla");

    // Access elements
    cout << cars[0]; // Volvo

    // Iterate
    for (string car : cars) {
        cout << car << "\n";
    }
    
    return 0;
}
```

## Maps

A `map` stores elements in key-value pairs.

```cpp
#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> people;
    
    people["John"] = 32;
    people["Adele"] = 45;
    
    cout << "John is " << people["John"] << " years old.";
    
    return 0;
}
```
