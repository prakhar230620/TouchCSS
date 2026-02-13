---
title: "Generators"
description: "Learn how to work with large data streams efficiently using Iterators, Generators, and the 'yield' keyword."
difficulty: "Advanced"
duration: "25 min"
prerequisites: ["control-flow"]
id: "generators"
---

# Generators & Iterators

When working with large lists (e.g., millions of items), storing them all in memory is inefficient and can crash your program. **Generators** provide a way to iterate over data without loading it all at once.

## The Problem with Lists

```python
def square_numbers(nums):
    result = []
    for i in nums:
        result.append(i * i)
    return result

# If range is huge, this list consumes massive RAM
my_nums = square_numbers(range(1000000))
```

## The Generator Solution (`yield`)

A generator function looks like a normal function but uses `yield` instead of `return`.

```python
def square_numbers_gen(nums):
    for i in nums:
        yield i * i

my_nums = square_numbers_gen(range(5))

print(my_nums) # <generator object ...>
```

It doesn't return a list. It returns a **generator object**. To get the values, you iterate over it.

```python
for num in my_nums:
    print(num)
```

### How `yield` Works
When `yield` is hit:
1.  The function produces the value.
2.  The function **pauses** and saves its state.
3.  When next called, it resumes exactly where it left off.

---

## Using `next()`

You can manually get the next item from a generator using `next()`.

```python
def simple_gen():
    yield 1
    yield 2
    yield 3

gen = simple_gen()

print(next(gen)) # 1
print(next(gen)) # 2
print(next(gen)) # 3
# print(next(gen)) # StopIteration Error
```

---

## Generator Expressions

Similar to list comprehensions, but with parentheses `()` instead of brackets `[]`.

```python
# List Comprehension (creates full list in RAM)
my_list = [x*x for x in range(10)]

# Generator Expression (Lazy evaluation)
my_gen = (x*x for x in range(10))

for n in my_gen:
    print(n)
```

---

## Why Use Generators?
1.  **Memory Efficient:** Only one item in memory at a time. Perfect for reading huge files or infinite streams.
2.  **Infinite Sequences:** You can represent infinite data.

```python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
for i in range(10):
    print(next(fib))
# Can go on forever without crashing memory
```

---

## Practice Exercises 🏋️‍♂️

1.  **Countdown:** Write a generator `countdown(n)` that yields numbers from n down to 0.
2.  **Large File Reader:** Write a generator function that reads a file line by line (simulating `open` behaviour) but yields only lines that contain a specific keyword.
3.  **Even Numbers:** create a generator expression that yields even numbers from 0 to 100.

---

## What's Next?

Generators help with efficiency. Up next, **Async Python** (Concurrency), which helps with speed when waiting for network operations.
