---
title: "Testing"
description: "Write reliable code with Unit Tests. Learn the 'unittest' and 'pytest' frameworks to catch bugs early."
difficulty: "Advanced"
duration: "30 min"
prerequisites: ["oop-basics", "functions"]
id: "testing"
---

# Testing in Python

"It works on my machine" is not a guarantee. Testing automatically verifies that your code behaves as expected.

## Manual vs Automated Testing

*   **Manual:** You run the program, type inputs, and check logs. Slow, error-prone.
*   **Automated:** You write code that tests your code. Fast, repeatable.

---

## The `unittest` Module

Python has a built-in module called `unittest`.

### 1. The Code to Test
Save as `math_ops.py`:
```python
def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

### 2. The Test File
Save as `test_math_ops.py`:

```python
import unittest
import math_ops

class TestMathOperations(unittest.TestCase):

    def test_add(self):
        result = math_ops.add(10, 5)
        self.assertEqual(result, 15)
        self.assertEqual(math_ops.add(-1, 1), 0)

    def test_divide(self):
        self.assertEqual(math_ops.divide(10, 2), 5)
        
        # Testing for exceptions
        with self.assertRaises(ValueError):
            math_ops.divide(10, 0)

if __name__ == '__main__':
    unittest.main()
```

Run it via terminal:
```bash
python test_math_ops.py
```

Output:
```
..
----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK
```

---

## The `pytest` Framework

`pytest` is a third-party tool that is much more popular because it is simpler. (Requires `pip install pytest`).

With pytest, you don't need classes.

```python
# test_simple.py
import math_ops
import pytest

def test_add():
    assert math_ops.add(2, 3) == 5

def test_divide_error():
    with pytest.raises(ValueError):
        math_ops.divide(1, 0)
```

Running it:
```bash
pytest
```

---

## Concepts

### Assertions
Statements that check if a condition is true.
*   `assertEqual(a, b)`
*   `assertTrue(x)`
*   `assertIn(item, list)`

### Setup and Teardown
Code that runs before and after each test (e.g., creating a temporary database).

```python
class TestDatabase(unittest.TestCase):
    def setUp(self):
        print("Connecting to DB...")
    
    def tearDown(self):
        print("Closing DB...")
    
    def test_query(self):
        print("Running query...")
```

---

## Test Driven Development (TDD)

A development philosophy:
1.  **Red:** Write a failing test for a feature you haven't written yet.
2.  **Green:** Write just enough code to make the test pass.
3.  **Refactor:** Clean up the code while ensuring tests still pass.

---

## Practice Exercises 🏋️‍♂️

1.  **Palindrome Tester:** Write a function `is_palindrome(text)`. Write tests checking "racecar" (True), "hello" (False), and "A man a plan a canal Panama" (True - ignore spaces/case).
2.  **Shopping Cart:** Create a `Cart` class. Write tests for `add_item`, `remove_item`, and `calculate_total`.

---

## Course Conclusion

Congratulations! 🎓

You have completed the entire Python learning path. From print statements to Asynchronous programming and Unit Testing.

**Next Steps:**
*   Build Projects! (Check the Experiments section).
*   Learn a Web Framework (Django/Flask).
*   Explore Data Science (Pandas).

Happy Coding!
