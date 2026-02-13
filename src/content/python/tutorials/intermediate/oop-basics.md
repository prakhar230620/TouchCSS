---
title: "OOP Basics"
description: "Understand Object-Oriented Programming: Classes, Objects, Attributes, Methods, and Inheritance."
difficulty: "Intermediate"
duration: "30 min"
prerequisites: ["functions"]
id: "oop-basics"
---

# Object-Oriented Programming (OOP)

Python is an Object-Oriented language. This means it models real-world things using **Objects**.

## What is an Object?

An object is a collection of data (variables) and methods (functions) that act on that data.
*   **Class:** The blueprint or template (e.g., "Car").
*   **Object:** An instance of the class (e.g., "My Red Toyota").

---

## creating a Class

Use the `class` keyword. By convention, class names use `CapitalizedWords`.

```python
class Dog:
    # The Constructor Method
    # Runs automatically when you create a new object
    def __init__(self, name, breed):
        self.name = name   # Attribute
        self.breed = breed # Attribute

    # A Custom Method
    def bark(self):
        return f"{self.name} says Woof!"
```

### Creating Objects (Instantiation)

```python
dog1 = Dog("Buddy", "Golden Retriever")
dog2 = Dog("Rex", "German Shepherd")

print(dog1.name)  # Buddy
print(dog2.breed) # German Shepherd
print(dog1.bark()) # Buddy says Woof!
```

---

## The `self` Parameter

You noticed `self` in the methods above.
*   `self` represents the **current instance** of the class.
*   It allows the code to distinguish between `dog1`'s name and `dog2`'s name.
*   You must include it as the first parameter in methods, but you don't pass it when calling the method.

---

## Encapsulation (Private Attributes)

Sometimes you want to hide data so it can't be changed directly. In Python, we use double underscores `__` to make variables "private".

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance # Private attribute

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited ${amount}")

    def get_balance(self):
        return self.__balance

account = BankAccount(100)
account.deposit(50)
print(account.get_balance()) # 150

# print(account.__balance) # AttributeError! Cannot access directly.
```

---

## Inheritance

Inheritance allows a class to take attributes and methods from another class.
*   **Parent Class (Base Class):** The class being inherited from.
*   **Child Class (Derived Class):** The class that inherits.

```python
# Parent Class
class Animal:
    def speak(self):
        print("Some generic sound")

# Child Class
class Cat(Animal):
    def speak(self):
        print("Meow")

class Dog(Animal):
    def speak(self):
        print("Woof")

my_cat = Cat()
my_cat.speak() # Meow (Overridden method)
```

### The `super()` Function
Use `super()` to call methods from the parent class.

```python
class Bird(Animal):
    def __init__(self, name, can_fly):
        super().__init__() # Call parent constructor (if it existed)
        self.name = name
        self.can_fly = can_fly
```

---

## Polymorphism

Polymorphism means "many forms". It allows different classes to be treated as instances of the same general class.

```python
animals = [Cat(), Dog(), Cat()]

for animal in animals:
    animal.speak() 
    # Works even though they are different types!
    # Output: Meow, Woof, Meow
```

---

## Practice Exercises 🏋️‍♂️

1.  **Student Class:** Create a class `Student` with attributes `name` and `grades` (a list). Add a method `average_grade()` that returns the average score.
2.  **RPG Character:** Create a parent class `Character` with `health` and `damage`. Create child classes `Warrior` (high health) and `Mage` (high damage). Override an `attack()` method.
3.  **Library System:** Design a `Book` class with title, author, and `is_checked_out` status. Add methods to `borrow()` and `return_book()`.

---

## What's Next?

Classes are the backbone of strict Python applications. Next, let's learn how to organize code into **Modules and Packages**.
