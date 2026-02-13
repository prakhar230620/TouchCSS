---
id: "templates"
language: "cpp"
level: "intermediate"
title: "Templates"
description: "Write generic code with Function and Class Templates."
duration: "25 min"
order: 4
prerequisites: ["stl"]
---

# Templates

Templates are the foundation of generic programming, which involves writing code in a way that is independent of any particular type. A template is a blueprint or formula for creating a generic class or a function.

## Function Templates

Start with the keyword `template` and `typename` (or `class`).

```cpp
#include <iostream>
using namespace std;

template <typename T>
T myMax(T x, T y) {
  return (x > y) ? x : y;
}

int main() {
  cout << myMax<int>(3, 7) << endl;  // Call myMax for int
  cout << myMax<double>(3.0, 7.0) << endl; // call myMax for double
  cout << myMax<char>('g', 'e') << endl;   // call myMax for char

  return 0;
}
```

## Class Templates

```cpp
template <typename T>
class Box {
private:
    T value;
public:
    void setValue(T v) { value = v; }
    T getValue() { return value; }
};

int main() {
    Box<int> intBox;
    intBox.setValue(10);
    
    Box<string> strBox;
    strBox.setValue("Hello");
    
    return 0;
}
```
