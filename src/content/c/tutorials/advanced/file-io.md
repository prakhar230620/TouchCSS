---
title: "File I/O"
description: "Read and write external files in C using fopen, fprintf, and fscanf."
difficulty: "Advanced"
duration: "25 min"
prerequisites: ["structures"]
id: "file-io"
---

# File I/O

Reading and writing files is handled by `FILE` pointers.

## Opening a File

```c
#include <stdio.h>

FILE *fptr;
fptr = fopen("data.txt", "w"); // "w" for write, "r" for read, "a" for append

if (fptr == NULL) {
    printf("Error opening file!\n");
    return 1;
}
```

## Writing to File (`fprintf`)

Works exactly like `printf`, but takes the file pointer first.

```c
fprintf(fptr, "Hello File!\n");
fprintf(fptr, "Score: %d\n", 100);

fclose(fptr); // ALWAYS CLOSE FILES
```

## Reading from File (`fscanf` / `fgets`)

```c
fptr = fopen("data.txt", "r");
char buffer[100];

// Reads until whitespace
fscanf(fptr, "%s", buffer); 

// Better: Reads whole line
while (fgets(buffer, 100, fptr)) {
    printf("%s", buffer);
}

fclose(fptr);
```

---

## Binary Files (`fread` / `fwrite`)

To store raw data (structs, images), use binary mode `"wb"` / `"rb"`.

```c
struct Player { int id; int score; };
struct Player p1 = {1, 500};

FILE *f = fopen("save.dat", "wb");
fwrite(&p1, sizeof(struct Player), 1, f);
fclose(f);
```

---

## Practice Exercises 🏋️‍♂️

1.  **Note Taker:** Write a program that takes user input lines and saves them to `notes.txt`.
2.  **File Copy:** Write a program that copies the contents of `source.txt` to `destination.txt`.

---

## What's Next?
One final secret of C: The **Preprocessor**.
