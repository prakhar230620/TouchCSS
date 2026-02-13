---
id: "move-semantics"
language: "cpp"
level: "advanced"
title: "Move Semantics"
description: "Optimize performance with R-values and std::move."
duration: "30 min"
order: 2
prerequisites: ["memory-management"]
---

# Move Semantics

Introduced in C++11, move semantics allow resources (like dynamic memory) to be "moved" from one object to another without copying. This is a massive performance boost.

## L-values and R-values

*   **L-value:** An object that has a name and an address (e.g., `x`, `ptr`).
*   **R-value:** A temporary value that does not have a name (e.g., `5`, `"hello"`, `x + y`).

## std::move

`std::move` casts an L-value to an R-value, allowing it to be moved.

```cpp
#include <utility>
#include <vector>
#include <string>

int main() {
    std::string str = "Hello";
    std::vector<std::string> v;
    
    // Copy str into vector (slow if string is huge)
    v.push_back(str); 
    
    // Move str into vector (fast)
    // str is now in a valid but unspecified state (effectively empty)
    v.push_back(std::move(str)); 
    
    return 0;
}
```

## Move Constructor

You can define a move constructor in your classes to handle efficient resource transfer.

```cpp
class MyClass {
public:
    // Move constructor
    MyClass(MyClass&& other) noexcept {
        // Steal resources from 'other'
        this->data = other.data;
        other.data = nullptr;
    }
};
```
