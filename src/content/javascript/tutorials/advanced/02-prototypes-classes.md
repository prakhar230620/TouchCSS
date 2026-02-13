---
id: "prototypes-classes"
language: "javascript"
level: "advanced"
title: "Prototypes & Classes"
description: "Master Object-Oriented JavaScript and Prototypal Inheritance"
duration: "40 min"
order: 2
prerequisites: ["objects-basics", "functions-basics"]
---

# Prototypes & Classes - Object Oriented JS

JavaScript is a **prototype-based** language. Even though ES6 introduced `class`, it's just syntax sugar over prototypes.

## 1. Prototype Chain

Every object in JavaScript has a hidden property `[[Prototype]]` (accessible via `__proto__`) that links to another object. This is the **chain**.

When you access a property:
1. JS looks on the object itself.
2. If not found, it looks at the prototype.
3. If not found, it looks at the prototype's prototype...
4. Until it hits `null` (end of chain).

```javascript
const animal = {
    eats: true
};

const rabbit = {
    jumps: true,
    __proto__: animal // Inherits from animal
};

console.log(rabbit.jumps); // true (Own property)
console.log(rabbit.eats);  // true (Inherited from animal!)
```

## 2. Constructor Functions (The Old Way)

Before ES6 classes, we used functions to create objects.

```javascript
function User(name) {
    // 'this' refers to the new object being created
    this.name = name;
    this.isAdmin = false;
}

// Add method to prototype (Shared by all instances!)
User.prototype.sayHi = function() {
    console.log(`Hi, I am ${this.name}`);
};

const user1 = new User("Jack");
const user2 = new User("Jill");

user1.sayHi(); // "Hi, I am Jack"
```

**Why prototype?** If we put `sayHi` inside the function `this.sayHi = ...`, every user object would carry its own copy of the function (memory waste). Using `prototype`, they share one function reference.

## 3. ES6 Classes (The Modern Way)

Cleaner syntax, same underlying mechanism.

```javascript
class User {
    // Constructor: Called when using 'new'
    constructor(name) {
        this.name = name;
    }
    
    // Method (Added to User.prototype automatically)
    sayHi() {
        console.log(`Hi, ${this.name}`);
    }
    
    // Getter
    get uppercaseName() {
        return this.name.toUpperCase();
    }
}

const user = new User("Alice");
user.sayHi();
```

## 4. Inheritance (`extends`)

Classes can inherit from other classes keywords `extends` and `super`.

```javascript
class Animal {
    constructor(name) {
        this.name = name;
        this.speed = 0;
    }
    
    run(speed) {
        this.speed = speed;
        console.log(`${this.name} runs at ${speed}mph`);
    }
}

class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} hides!`);
    }
}

const bunny = new Rabbit("Bunny");
bunny.run(5); // Inherited from Animal
bunny.hide(); // Defined in Rabbit
```

### Overriding Methods

```javascript
class Rabbit extends Animal {
    // Override parent method
    run(speed) {
        super.run(speed); // Call parent method
        this.hide(); // Do extra stuff
    }
}
```

## 5. Static Properties/Methods

Belong to the class itself, not instances.

```javascript
class MathUtils {
    static add(a, b) {
        return a + b;
    }
}

console.log(MathUtils.add(5, 5)); // 10
// const m = new MathUtils(); m.add(5,5) // Error!
```

## 6. Private Fields (#)

New feature (ES2022) for true privacy.

```javascript
class CoffeeMachine {
    #waterLimit = 200; // Private (starts with #)
    
    checkWater(value) {
        if (value < 0) throw new Error("Negative water");
        if (value > this.#waterLimit) throw new Error("Too much");
    }
}

const machine = new CoffeeMachine();
// machine.#waterLimit = 1000; // Syntax Error! Private
```

## Key Takeaways

✅ **Prototypes:** The mechanism behind inheritance.  
✅ **Classes:** Modern syntax for constructors.  
✅ **Extends:** Create child classes easily.  
✅ **Super:** Access parent methods.  
✅ **Static:** Helper methods on the class (not object).

## Practice Exercise

1. Create class `Vehicle` with `speed` and `move()`.
2. Create subclass `Car` that extends `Vehicle`.
3. Add a private property `#fuel`.
4. Add method `refuel()` to increase fuel and `drive()` that decreases it.

---

**Next Lesson:** Advanced Async - Concurrency & Patterns!
