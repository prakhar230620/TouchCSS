---
title: "Arrays"
description: "Store multiple values in a single variable. Learn about 1D arrays, 2D matrices, and their relationship with pointers."
difficulty: "Intermediate"
duration: "25 min"
prerequisites: ["variables-types"]
id: "arrays"
---

# Arrays

An array is a collection of variables of the **same type** stored in contiguous memory locations.

## Declaring and Initializing

```c
// Declaration
int numbers[5]; // Array of 5 integers

// Initialization
int scores[] = {90, 85, 70, 95, 100}; // Size inferred as 5
```

## Accessing Elements

Indexing starts at **0**.

```c
printf("%d", scores[0]); // 90
printf("%d", scores[4]); // 100

scores[2] = 88; // Update value
```

---

## Looping Through Arrays

```c
for (int i = 0; i < 5; i++) {
    printf("Score %d: %d\n", i, scores[i]);
}
```

## Arrays and Pointers

The name of the array acts as a pointer to the **first element**.

```c
int arr[3] = {10, 20, 30};
int *ptr = arr; // No & needed

printf("%d", *ptr); // 10
printf("%d", *(ptr + 1)); // 20 (Pointer Arithmetic)
```

---

## Multidimensional Arrays

You can create arrays of arrays (Values in rows and columns).

```c
int matrix[2][3] = {
    {1, 2, 3}, // Row 0
    {4, 5, 6}  // Row 1
};

printf("%d", matrix[1][2]); // 6 (Row 1, Col 2)
```

Nested loops are used to iterate 2D arrays.

```c
for (int row = 0; row < 2; row++) {
    for (int col = 0; col < 3; col++) {
        printf("%d ", matrix[row][col]);
    }
    printf("\n");
}
```

---

## Practice Exercises 🏋️‍♂️

1.  **Array Sum:** Create an array of 5 integers. Write a loop to calculate their sum.
2.  **Max Element:** Find the largest number in an array `[12, 45, 2, 67, 34]`.
3.  **Reverse Array:** Print an array in reverse order.

---

## What's Next?
In C, strings are just special arrays. Let's look at **Strings**.
