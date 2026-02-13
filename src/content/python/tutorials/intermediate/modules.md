---
title: "Modules & Packages"
description: "Organize your code by splitting it into multiple files. Import built-in modules and create your own."
difficulty: "Intermediate"
duration: "20 min"
prerequisites: ["functions"]
id: "modules"
---

# Modules & Packages

As your program grows, putting everything in one file becomes messy. Modules allow you to organize code into separate files.

## What is a Module?

A module is simply a Python file (`.py`) containing functions, classes, and variables.

### Creating a Module

Save this code as `mymodule.py`:

```python
def greet(name):
    print(f"Hello, {name}!")

person1 = {
    "name": "John",
    "age": 36
}
```

### Importing a Module

Now, in `main.py` (in the same folder):

```python
import mymodule

mymodule.greet("Alice")
print(mymodule.person1["age"])
```

### Import Variations

```python
# Import specific items
from mymodule import greet
greet("Bob")

# Import everything (Not recommended)
from mymodule import *

# Alias (Rename)
import mymodule as mm
mm.greet("Charlie")

# Alias specific item
from mymodule import person1 as p1
print(p1["name"])
```

---

## Built-in Modules

Python comes with "batteries included" - a massive standard library.

### Common Modules

*   `math`: Mathematical functions.
*   `random`: Generate random numbers.
*   `datetime`: Work with dates and times.
*   `os` / `sys`: Interact with the operating system.

```python
import math
import random
import datetime

print(math.sqrt(16))      # 4.0
print(random.randint(1, 10)) # Random number 1-10
print(datetime.datetime.now()) # Current time
```

---

## What is a Package?

A **package** is a directory containing multiple modules. It must contain a special file named `__init__.py` (which can be empty).

Structure:
```
my_package/
    __init__.py
    module1.py
    module2.py
main.py
```

Usage:
```python
from my_package import module1
from my_package.module2 import some_function
```

---

## The `if __name__ == "__main__":` block

You will see this often. It checks if the script is being run directly or imported.

```python
def main():
    print("Main code running")

if __name__ == "__main__":
    main()
```

*   If you run `python myscript.py`, `main()` runs.
*   If you `import myscript`, `main()` does **NOT** run (prevents side effects).

---

## Installing Third-Party Packages (pip)

The Python Package Index (PyPI) hosts over 300,000 packages. You install them using `pip`.

```bash
pip install requests
```

Usage:
```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)
```

---

## Practice Exercises 🏋️‍♂️

1.  **Math Helper:** Create a module `shapes.py` with functions to calculate the area of a circle and a square. Import and use it in `main.py`.
2.  **Dice Roller:** Use the `random` module to simulate rolling two 6-sided dice. Print the result.
3.  **Days Until Birthday:** Use `datetime` to calculate how many days represent until your next birthday.

---

## What's Next?

You have officially completed the critical parts of Python! Next, we will cover **Error Handling** (which we've already peeked at), and then move to **Advanced Python** concepts like Decorators!
