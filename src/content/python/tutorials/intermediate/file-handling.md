---
title: "File Handling"
description: "Read from and write to files using Python. Learn about file modes, context managers (with), and working with CSVs."
difficulty: "Intermediate"
duration: "20 min"
prerequisites: ["oop-basics"]
id: "file-handling"
---

# File Handling

Programs need to save data so it persists after the program closes. Python makes working with files incredibly easy.

## Opening a File

Use the built-in `open()` function.

```python
file = open("example.txt", "r") # 'r' means Read mode
content = file.read()
print(content)
file.close() # Always close the file!
```

### File Modes
*   `'r'`: **Read** (Default). Error if file doesn't exist.
*   `'w'`: **Write**. Creates a new file or **overwrites** existing one.
*   `'a'`: **Append**. Adds data to the end of the file.
*   `'x'`: **Create**. Error if file already exists.
*   `'b'`: **Binary**. For images, audio, etc. (e.g., `'wb'`).

---

## The `with` Statement (Context Manager)

Forgetting to close a file leads to memory leaks and corrupted data. 
The `with` statement automatically closes the file for you, even if an error occurs. **Always use this.**

```python
with open("example.txt", "r") as file:
    content = file.read()
    print(content)
# File is automatically closed here
```

---

## Writing to a File

```python
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]

with open("output.txt", "w") as f:
    f.write("Hello, World!\n")
    f.writelines(lines) # Write a list of strings
```

## Appending to a File

```python
with open("log.txt", "a") as f:
    f.write("New log entry...\n")
```

---

## Reading Line by Line

For large files, don't read the whole thing into memory with `.read()`. Process it line by line.

```python
with open("big_data.txt", "r") as f:
    for line in f:
        print(line.strip()) # .strip() removes the newline character
```

---

## Checking if File Exists

Use the `os` module.

```python
import os

if os.path.exists("example.txt"):
    os.remove("example.txt") # Delete file
    print("File deleted.")
else:
    print("The file does not exist.")
```

---

## Working with JSON

JSON is the standard format for data exchange (APIs, config files).

```python
import json

data = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Writing JSON
with open("data.json", "w") as f:
    json.dump(data, f, indent=4)

# Reading JSON
with open("data.json", "r") as f:
    loaded_data = json.load(f)
    print(loaded_data["name"]) # Alice
```

---

## Practice Exercises 🏋️‍♂️

1.  **Diary App:** Write a program that asks the user for a diary entry and appends it to `diary.txt` with a timestamp.
2.  **Word Counter:** Read a text file and count how many words are in it.
3.  **Config Loader:** Create a `config.json` file with some settings (e.g., `theme: dark`). Write a Python script to read this setting and print "Theme is set to [value]".

---

## What's Next?

You can now persist data! Next, we'll learn how to split your code into multiple files using **Modules and Packages**.
