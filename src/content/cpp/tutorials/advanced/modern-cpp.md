---
id: "modern-cpp"
language: "cpp"
level: "advanced"
title: "Modern C++ Features"
description: "Explore auto, range-based loops, and lambda expressions."
duration: "25 min"
order: 3
prerequisites: ["move-semantics"]
---

# Modern C++ Features

C++11, C++14, C++17, and C++20 introduced many features to make C++ easier and safer.

## The `auto` Keyword

Let the compiler deduce the type of a variable.

```cpp
auto x = 5; // int
auto y = 3.14; // double
auto name = "John"; // const char*
```

## Range-based For Loop

Simpler syntax for iterating over arrays and containers.

```cpp
std::vector<int> numbers = {1, 2, 3};
for (int num : numbers) {
    std::cout << num << "\n";
}
```

## Lambda Expressions

Anonymous functions that can be defined inline.

```cpp
auto hello = []() {
  std::cout << "Hello World!";
};

hello();

// Taking parameters
auto add = [](int a, int b) {
  return a + b;
};

std::cout << add(3, 4); // 7
```
