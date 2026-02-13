---
id: "intro-to-cpp"
language: "cpp"
level: "beginner"
title: "Introduction to C++"
description: "Get started with C++, a high-performance programming language."
duration: "15 min"
order: 1
prerequisites: []
---

# Introduction to C++

C++ is a powerful, high-performance programming language created by Bjarne Stroustrup. It is an extension of the C language and adds object-oriented features.

## Why Learn C++?

*   **Performance:** C++ executes code very fast, making it ideal for games and real-time systems.
*   **Control:** It gives you complete control over memory and hardware.
*   **Popularity:** Used by major tech companies, game engines (Unreal), and operating systems (Windows, Linux).

## Your First C++ Program

Here is the classic "Hello, World!" program in C++:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

### Explanation

1.  `#include <iostream>`: This line imports the Input/Output Stream library, which allows us to print text to the screen.
2.  `int main() { ... }`: This is the entry point of the program. Execution starts here.
3.  `std::cout`: "Character Output". Used to print to the console.
4.  `<<`: The insertion operator. It sends the text "Hello, World!" to `cout`.
5.  `std::endl`: Inserts a newline character.
6.  `return 0;`: Indicates that the program finished successfully.

## Practice

Try changing the message in the `std::cout` statement to print your name!
