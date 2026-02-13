---
title: "Structures"
description: "Group related variables under a single name using 'struct'. Learn about typedef and accessing members."
difficulty: "Intermediate"
duration: "30 min"
prerequisites: ["pointers"]
id: "structures"
---

# Structures (`struct`)

Arrays allow you to store multiples of the *same* type. Structures allow you to group *different* types (e.g., a Student has a name (string), age (int), and gpa (float)).

## Defining a Struct

```c
struct Student {
    char name[50];
    int age;
    float gpa;
};
```

## Using a Struct

```c
int main() {
    struct Student s1;

    // Assigning values
    strcpy(s1.name, "John");
    s1.age = 20;
    s1.gpa = 3.5;

    // Accessing values (Dot Operator)
    printf("Name: %s, GPA: %.2f\n", s1.name, s1.gpa);

    return 0;
}
```

## Structs and Pointers (The Arrow Operator `->`)

When you have a *pointer* to a struct, you convert access from `(*ptr).age` to `ptr->age`.

```c
struct Student s1 = {"Alice", 22, 3.9};
struct Student *ptr = &s1;

printf("Age: %d\n", ptr->age); // Preferred way
```

---

## Valid `typedef`

`typedef` creates a shortcut alias so you don't have to type `struct` every time.

```c
typedef struct {
    int x;
    int y;
} Point;

int main() {
    Point p1; // No 'struct' keyword needed
    p1.x = 10;
    return 0;
}
```

---

## Practice Exercises 🏋️‍♂️

1.  **Book Inventory:** Create a struct `Book` with title, author, and price. Create an array of 3 books and print the details of the most expensive one.
2.  **Distance Calc:** Create a struct `Point` (x, y). Write a function that takes two Points and returns the distance between them (formula: `sqrt((x2-x1)^2 + (y2-y1)^2)`).

---

## Conclusion of Intermediate Module
You now know how to organize complex data. We are entering the **Advanced** zone: Manual Memory Management!
