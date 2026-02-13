---
title: "Decorators"
description: "Master one of Python's most powerful features. Learn how to modify the behavior of functions using @decorators."
difficulty: "Advanced"
duration: "35 min"
prerequisites: ["functions"]
id: "decorators"
---

# Decorators

Decorators are a significant part of Python. They allow you to modify the behavior of a function or class without changing its source code. You'll see them often in frameworks like Flask, Django, and FastAPI.

## First, Functions are Objects

In Python, functions are "first-class citizens". This means:
1.  They can be assigned to variables.
2.  They can be passed as arguments.
3.  They can be returned from other functions.

```python
def shout(text):
    return text.upper()

def whisper(text):
    return text.lower()

def greet(func):
    # 'func' is a function passed as an argument
    greeting = func("Hello World") 
    print(greeting)

greet(shout)   # HELLO WORLD
greet(whisper) # hello world
```

---

## Creating a Simple Decorator

A decorator is a function that takes another function to "decorate".

```python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

def say_whee():
    print("Whee!")

# Manual decoration
say_whee = my_decorator(say_whee)

say_whee()
```

Output:
```
Something is happening before the function is called.
Whee!
Something is happening after the function is called.
```

### The `@` Syntax (Syntactic Sugar)

Instead of `say_whee = my_decorator(say_whee)`, we use `@`:

```python
@my_decorator
def say_whee():
    print("Whee!")

say_whee() # Same result!
```

---

## Decorating Functions with Arguments

If the function we are decorating takes arguments, our inner `wrapper` needs to accept them using `*args` and `**kwargs`.

```python
def do_twice(func):
    def wrapper(*args, **kwargs):
        func(*args, **kwargs)
        func(*args, **kwargs)
    return wrapper

@do_twice
def greet(name):
    print(f"Hello {name}")

greet("World")
```

Output:
```
Hello World
Hello World
```

---

## Real World Example: Timing Code

A very common use case is measuring how long a function takes to run.

```python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} ran in {end - start} seconds")
        return result
    return wrapper

@timer
def heavy_computation():
    total = 0
    for i in range(1000000):
        total += i
    return total

heavy_computation()
```

---

## Using `functools.wraps`

When you decorate a function, it loses its identity (name, docstring). Use `@wraps` to fix this.

```python
from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        """Wrapper function"""
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def example():
    """This is the example function"""
    pass

print(example.__name__) # 'example' (Without wraps, it would be 'wrapper')
print(example.__doc__)  # 'This is the example function'
```

---

## Practice Exercises 🏋️‍♂️

1.  **Logger:** Create a decorator `@log_execution` that prints "Starting [function_name]..." before execution and "Finished [function_name]" after.
2.  **Authentication:** Write a `@require_admin` decorator. It should check a global variable `user_role`. If it's not "admin", print "Access Denied" and don't run the function. If it is "admin", run it.
3.  **Positive Only:** Write a decorator that checks if the argument passed to a function is positive. If not, raise a ValueError.

---

## What's Next?

Decorators are metaprogramming magic. Next, we will look at **Generators**, a way to handle huge datasets efficiently.
