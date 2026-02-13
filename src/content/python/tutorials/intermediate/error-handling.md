---
title: "Error Handling"
description: "Write robust code by handling exceptions gracefully using try, except, finally, and raising custom errors."
difficulty: "Intermediate"
duration: "25 min"
prerequisites: ["modules"]
id: "error-handling"
---

# Error Handling (Exceptions)

Errors are inevitable. A file might be missing, the internet might go down, or a user might enter text when you asked for a number.

If you don't handle these errors, your program crashes. Python uses **Exceptions** to manage these situations gracefully.

## The Crash (Uncaught Exception)

```python
# Division by zero error
print(10 / 0)
print("This line will never run.") 
```

Output:
```
ZeroDivisionError: division by zero
(Program crashes immediately)
```

---

## The Solution: try...except

We can wrap risky code in a `try` block. If an error occurs, Python jumps to the `except` block instead of crashing.

```python
try:
    print(10 / 0)
except:
    print("Oops! You can't divide by zero.")

print("The program continues...")
```

Output:
```
Oops! You can't divide by zero.
The program continues...
```

### Catching Specific Exceptions

It is good practice to catch *specific* errors rather than a generic `except`.

```python
try:
    num = int(input("Enter a number: "))
    result = 100 / num
    print(f"Result: {result}")

except ValueError:
    print("That's not a valid number!")

except ZeroDivisionError:
    print("You can't enter zero!")

except Exception as e:
    # Catch-all for unexpected errors (stores error in variable e)
    print(f"Something else went wrong: {e}")
```

---

## The `else` Block

Runs code only if NO exception occurred.

```python
try:
    print("Trying specific operation...")
    result = 10 / 2
except ZeroDivisionError:
    print("Division failed.")
else:
    print("Success! Result is:", result)
    # Good place for logic that depends on the try block succeeding
```

## The `finally` Block

Runs **ALWAYS**, whether an error happened or not. This is typically used for cleanup (closing files, identifying database connections, etc.).

```python
try:
    f = open("data.txt")
    content = f.read()
except FileNotFoundError:
    print("File not found.")
finally:
    print("This runs no matter what.")
    # f.close() (if f was opened)
```

---

## Raising Exceptions

Sometimes *you* want to trigger an error when something violates your program's rules. Use the `raise` keyword.

```python
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative!")
    print(f"Age set to {age}")

try:
    set_age(-5)
except ValueError as e:
    print(f"Error: {e}")
```

---

## Creating Custom Exceptions

You can create your own error types by inheriting from the built-in `Exception` class (requires OOP knowledge).

```python
class InsufficientFundsError(Exception):
    pass

def withdraw(amount, balance):
    if amount > balance:
        raise InsufficientFundsError("Not enough money!")
    return balance - amount

try:
    withdraw(100, 50)
except InsufficientFundsError as e:
    print(f"Transaction failed: {e}")
```

---

## Common Built-in Exceptions

*   `IndexError`: Accessing a list index that doesn't exist.
*   `KeyError`: Accessing a dictionary key that doesn't exist.
*   `TypeError`: Operation on wrong type (e.g., `len(5)`).
*   `ValueError`: Function receives right type but wrong value (e.g., `int("hello")`).
*   `ImportError`: Module not found.

---

## Best Practices

1.  **Be Specific:** Avoid bare `except:` clauses. They catch everything, including SystemExit (Ctrl+C), which makes it hard to stop your program.
2.  **Keep Try Blocks Small:** Only wrap the line that might fail.
3.  **Use Finally for Cleanup:** Ensure resources are released.
4.  **Don't Hide Errors:** Don't just `except: pass`. Log the error or print a warning so debugging is possible.

---

## Practice Exercises 🏋️‍♂️

1.  **Safe Input:** Write a function `get_integer()` that asks the user for a number. If they enter text, print "Invalid input, try again" and loop until they enter a valid integer.
2.  **List Access:** Write a program with a list of fruits. Ask the user for an index `i`. Print the fruit at index `i`. Handle the `IndexError` gracefully if they pick a number out of range.
3.  **Calculator with Safety:** Create a division calculator that handles both `ZeroDivisionError` and `ValueError` (if user enters text).

---

## Conclusion

Error handling distinguishes professional code from amateur scripts. Your programs should never crash unexpectedly; they should inform the user of the problem and either recover or exit cleanly.

**Next Steps:**
This concludes the Intermediate module! You now know core Python, data structures, OOP, file handling, and error management. Ready for **Advanced Python**? We'll explore Decorators, Generators, and Async programming!
