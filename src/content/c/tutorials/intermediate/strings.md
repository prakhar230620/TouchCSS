---
title: "Strings"
description: "Strings in C are not objects; they are character arrays. Learn to manipulate them using the string.h library."
difficulty: "Intermediate"
duration: "25 min"
prerequisites: ["arrays"]
id: "strings"
---

# Strings in C

Unlike Python or Java, C does not have a "String" class. A string in C is just an **array of characters** terminated by a **Null Character** (`\0`).

## Creating Strings

```c
char name[] = "Alice"; 
// In memory: ['A', 'l', 'i', 'c', 'e', '\0']
// Size is 6 bytes (5 chars + 1 null terminator)

char greeting[20] = "Hello"; // Pre-allocating extra space
```

**Important:** The `\0` tells C where the string stops. Without it, functions like `printf` would keep printing random memory junk until they crash.

## Printing and Input

```c
char name[50];

printf("Enter name: ");
scanf("%s", name); // NOTE: No & needed for strings (arrays)
// Problem: scanf stops at whitespace (can't read "John Doe")

printf("Hello, %s!\n", name);
```

To read full lines, use `fgets`.

```c
fgets(name, 50, stdin); // Safe reading
```

---

## The `string.h` Library

Used for string manipulation.

```c
#include <string.h>

char s1[] = "Hello";
char s2[] = "World";

// Reference:
// strlen(s)    - Returns length (excluding \0)
// strcpy(dst, src) - Copies src to dst
// strcat(dst, src) - Concatenates (joins) src to end of dst
// strcmp(s1, s2)   - Compares strings (0 if equal)

printf("Length: %lu\n", strlen(s1)); // 5

char full[20];
strcpy(full, s1);
strcat(full, " ");
strcat(full, s2);
printf("%s\n", full); // Hello World
```

---

## Practice Exercises 🏋️‍♂️

1.  **Length Calculator:** Write your own version of `strlen()` using a while loop.
2.  **Password Check:** Ask user for password. Compare it with "secret123" using `strcmp`.
3.  **Vowel Counter:** Count the number of vowels in a given string.

---

## What's Next?
So far we only stored single types. What if we want to mix types? Enter **Structures**.
