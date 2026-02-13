---
title: "Preprocessor"
description: "Understand macros, header guards, and conditional compilation (#define, #include, #ifdef)."
difficulty: "Advanced"
duration: "20 min"
prerequisites: ["intro-to-c"]
id: "preprocessor"
---

# The Preprocessor

The Preprocessor runs **before** the compiler. It modifies your source code. All commands start with `#`.

## `#include`
Pastes the contents of another file.
*   `<file>`: Standard library (e.g., `<stdio.h>`).
*   `"file"`: Local file (e.g., `"myheader.h"`).

## `#define` (Macros)

Text replacement.

```c
#define PI 3.14159
#define BUFFER_SIZE 1024

// Function-like macro (Faster than function, but careful!)
#define SQUARE(x) ((x) * (x))

int main() {
    float area = PI * SQUARE(5);
}
```

## Conditional Compilation

Compile code only if certain conditions are met (useful for cross-platform code).

```c
#define WINDOWS 1

#ifdef WINDOWS
    printf("Running on Windows logic...\n");
#else
    printf("Running on Linux logic...\n");
#endif
```

## Header Guards

Prevents a header file from being included twice.

```c
#ifndef MYHEADER_H
#define MYHEADER_H

// Declarations here...

#endif
```

---

## Course Conclusion

CONGRATULATIONS! 🎓

You have mastered the C Programming Language. From pointer arithmetic to memory allocation. You now possess the knowledge to understand how software truly interacts with hardware.

**Next Steps:**
*   **Data Structures:** Build Linked Lists using your pointer skills.
*   **Operating Systems:** How Linux or Windows works.
*   **Embedded:** Program an Arduino.

Happy Coding!
