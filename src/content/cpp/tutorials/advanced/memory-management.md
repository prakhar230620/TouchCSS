---
id: "memory-management"
language: "cpp"
level: "advanced"
title: "Memory Management"
description: "Master Stack vs Heap, new/delete, and Smart Pointers."
duration: "40 min"
order: 1
prerequisites: ["templates"]
---

# Memory Management

C++ gives you full control over memory allocation. Understanding the stack and heap is crucial.

## Stack vs Heap

*   **Stack:** Automatic memory management. Variables declared inside functions are on the stack. Fast access, but limited size.
*   **Heap:** Dynamic memory. You generally control allocation and deallocation. Slower access, but flexible size.

## New and Delete

In modern C++, avoid raw calls to `new` and `delete` when possible. Use smart pointers.

```cpp
int* ptr = new int; // Allocate integer on heap
*ptr = 10;
delete ptr; // Free memory. CRITICAL! Forgetting this causes leaks.
```

## Smart Pointers (Modern C++)

Include `<memory>` to use smart pointers. They automatically delete memory when they go out of scope.

### unique_ptr

Owns the object exclusively. Cannot be copied, only moved.

```cpp
#include <memory>

int main() {
    std::unique_ptr<int> p1(new int(5));
    // or better:
    auto p2 = std::make_unique<int>(10);
    
    // No need to call delete
    return 0;
}
```

### shared_ptr

Ownership is shared. The object is deleted only when the last `shared_ptr` pointing to it is destroyed.

```cpp
std::shared_ptr<int> p1 = std::make_shared<int>(20);
std::shared_ptr<int> p2 = p1; // Now both point to the same int
```
