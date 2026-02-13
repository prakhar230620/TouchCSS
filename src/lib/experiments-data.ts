
export interface Experiment {
    id: string;
    title: string;
    description: string;
    category: 'DOM' | 'API' | 'Game' | 'Utility' | 'HTML' | 'Python' | 'C' | 'CPP';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    time: string;
    concept: string;
    starterCode: string;
    solutionCode: string;
    html?: string;
    hint?: string;
}

export const experiments: Experiment[] = [
    // --- DOM Manipulation ---
    {
        id: 'color-flipper',
        title: 'Color Flipper',
        description: 'Create a button that changes the background color to a random hex code when clicked.',
        category: 'DOM',
        difficulty: 'Easy',
        time: '15 min',
        concept: 'Event Listeners & CSS manipulation',
        html: `<div class="container" style="text-align: center; margin-top: 50px;">
    <h2>Background Color: <span class="color">#FFFFFF</span></h2>
    <button class="btn btn-hero" id="btn" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Click Me</button>
</div>`,
        hint: `Use document.getElementById('btn') to select the button and document.body.style.backgroundColor to change the color.`,
        starterCode: `// 1. Select the button and body
// 2. Add a click event listener
// 3. Generate a random color (Hex or RGB)
// 4. Update body background`,
        solutionCode: `const btn = document.getElementById('btn');
const color = document.querySelector('.color');
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

btn.addEventListener('click', function() {
    let hexColor = '#';
    for(let i = 0; i < 6; i++){
        hexColor += hex[Math.floor(Math.random() * hex.length)];
    }
    color.textContent = hexColor;
    document.body.style.backgroundColor = hexColor;
});`
    },
    {
        id: 'counter-app',
        title: 'Counter App',
        description: 'Build a counter with Increment, Decrement, and Reset buttons.',
        category: 'DOM',
        difficulty: 'Easy',
        time: '10 min',
        concept: 'State management in DOM',
        html: `<div style="text-align: center; margin-top: 50px;">
    <h1>Counter</h1>
    <span id="value" style="font-size: 80px; font-weight: bold;">0</span>
    <div style="margin-top: 20px;">
        <button class="btn decrease" style="margin: 5px; padding: 10px;">Decrease</button>
        <button class="btn reset" style="margin: 5px; padding: 10px;">Reset</button>
        <button class="btn increase" style="margin: 5px; padding: 10px;">Increase</button>
    </div>
</div>`,
        hint: `Select all buttons using querySelectorAll('.btn') and assume e.currentTarget.classList to check which button was clicked.`,
        starterCode: `let count = 0;
// Select elements
// Add listeners for Increase, Decrease, Reset
// Update the <span> value`,
        solutionCode: `let count = 0;
const value = document.getElementById('value');
const btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const styles = e.currentTarget.classList;
        if (styles.contains('decrease')) {
            count--;
        } else if (styles.contains('increase')) {
            count++;
        } else {
            count = 0;
        }
        value.textContent = count;
        value.style.color = count > 0 ? "green" : count < 0 ? "red" : "black";
    });
});`
    },
    {
        id: 'modal',
        title: 'Simple Modal',
        description: 'Create a popup modal that opens on button click and closes when clicking X or outside.',
        category: 'DOM',
        difficulty: 'Medium',
        time: '25 min',
        concept: 'Class manipulation & conditional logic',
        html: `<div style="text-align: center; margin-top: 100px;">
    <button class="modal-btn" style="padding: 10px 20px;">Open Modal</button>
</div>
<div class="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: grid; place-items: center; visibility: hidden; z-index: -10;">
    <div class="modal-container" style="background: white; width: 90vw; max-width: 500px; height: 30vh; border-radius: 5px; text-align: center; position: relative;">
        <h3>Modal Content</h3>
        <button class="close-btn" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; font-size: 2rem; cursor: pointer; color: red;">X</button>
    </div>
</div>
<style>.open-modal { visibility: visible !important; z-index: 10 !important; }</style>`,
        hint: `Toggle a class (e.g., .open-modal) on the overlay div. Use classList.add() and classList.remove().`,
        starterCode: `// Select modal, open button, close button
// Add click events to toggle "open-modal" class`,
        solutionCode: `const modal = document.querySelector('.modal-overlay');
const openBtn = document.querySelector('.modal-btn');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', () => {
    modal.classList.add('open-modal');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('open-modal');
});`
    },
    {
        id: 'todo-list',
        title: 'Todo List',
        description: 'Add items to a list, mark them as checked, and delete them.',
        category: 'DOM',
        difficulty: 'Medium',
        time: '40 min',
        concept: 'DOM Creation & Event Delegation',
        html: `<div style="max-width: 500px; margin: 50px auto; padding: 20px; background: white; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1); color: black;">
    <h3>Todo List</h3>
    <form id="todo-form" style="display: flex; gap: 5px;">
        <input type="text" id="todo-input" placeholder="e.g. Learn CSS" style="flex: 1; padding: 5px;">
        <button type="submit" style="padding: 5px 10px;">Add</button>
    </form>
    <ul id="todo-list" style="list-style: none; padding: 0; margin-top: 20px;">
        <!-- Items go here -->
    </ul>
</div>`,
        hint: `Use document.createElement('li') to create new items. Add event listeners to the parent <ul> for delete buttons (event delegation).`,
        starterCode: `// 1. Select form and list
// 2. Listen for submit
// 3. Create new <li> element
// 4. Append to list`,
        solutionCode: `const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value;
    if(!text) return;
    
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.padding = '5px 0';
    li.style.borderBottom = '1px solid #ccc';
    li.innerHTML = \`
        <span>\${text}</span>
        <button class="delete-btn" style="color: red; border: none; background: none; cursor: pointer;">x</button>
    \`;
    todoList.appendChild(li);
    todoInput.value = '';
});

todoList.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }
});`
    },
    {
        id: 'digital-clock',
        title: 'Digital Clock',
        description: 'Show accurate current time updating every second.',
        category: 'DOM',
        difficulty: 'Easy',
        time: '15 min',
        concept: 'setInterval & Date object',
        html: `<div id="clock" style="font-size: 60px; font-family: monospace; text-align: center; margin-top: 100px;"></div>`,
        hint: `Use new Date() to get time and setInterval(func, 1000) to update it every second.`,
        starterCode: `function showTime() {
    // Get current date
    // Extract hours, minutes, seconds
    // Display in DOM
}
// Run every second`,
        solutionCode: `function showTime() {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let session = "AM";
    
    if(h == 0){ h = 12; }
    if(h > 12){ h = h - 12; session = "PM"; }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    const time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("clock").innerText = time;
    setTimeout(showTime, 1000);
}
showTime();`
    },

    // --- API Integration ---
    {
        id: 'random-user',
        title: 'Random User Generator',
        description: 'Fetch user data from randomuser.me API and display profile.',
        category: 'API',
        difficulty: 'Medium',
        time: '30 min',
        concept: 'Fetch API & JSON',
        html: `<div style="text-align: center; margin-top: 50px;">
    <img id="avatar" src="" alt="" style="border-radius: 50%; width: 150px; height: 150px; display: block; margin: 0 auto 20px;">
    <h3 id="title">User Name</h3>
    <button id="btn" style="padding: 10px 20px; cursor: pointer;">Get Random User</button>
</div>`,
        hint: `Fetch(url).then(res => res.json()).then(data => ...). Don't forget async/await makes it cleaner!`,
        starterCode: `const url = 'https://randomuser.me/api/';
// Fetch data
// Extract name, email, image
// Update DOM`,
        solutionCode: `const url = 'https://randomuser.me/api/';
const btn = document.getElementById('btn');
const img = document.getElementById('avatar');
const title = document.getElementById('title');

async function getUser() {
    const res = await fetch(url);
    const data = await res.json();
    const person = data.results[0];
    
    img.src = person.picture.large;
    title.textContent = \`\${person.name.first} \${person.name.last}\`;
}

btn.addEventListener('click', getUser);
getUser();`
    },
    {
        id: 'quote-generator',
        title: 'Random Quote',
        description: 'Fetch and display a random inspirational quote.',
        category: 'API',
        difficulty: 'Easy',
        time: '20 min',
        concept: 'Async/Await',
        html: `<div style="max-width: 600px; margin: 50px auto; text-align: center; padding: 20px; background: #f0f0f0; border-radius: 10px; color: #333;">
    <h3 id="text">Loading...</h3>
    <p id="author" style="font-style: italic;"></p>
    <button onclick="getQuote()" style="margin-top: 20px; padding: 10px 20px;">New Quote</button>
</div>`,
        hint: `Use await fetch('https://api.quotable.io/random') and display content and author from the JSON response.`,
        starterCode: `const url = "https://api.quotable.io/random";
// Fetch quote
// Display text and author`,
        solutionCode: `const text = document.getElementById('text');
const author = document.getElementById('author');

async function getQuote() {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    text.textContent = data.content;
    author.textContent = "- " + data.author;
}
// Note: getQuote is called by the button onclick in HTML, but good to init here too
getQuote();`
    },
    {
        id: 'weather-app',
        title: 'Mini Weather App',
        description: 'Input city name and fetch weather data (Mock API or OpenWeather).',
        category: 'API',
        difficulty: 'Hard',
        time: '45 min',
        concept: 'API params & Error Handling',
        html: `<div style="max-width: 400px; margin: 50px auto; text-align: center;">
    <input type="text" placeholder="Enter city (mock)" style="padding: 10px; width: 70%;">
    <button style="padding: 10px;">Search</button>
    <div class="weather" style="margin-top: 20px;">
        <h2 class="city">New York</h2>
        <h1 class="temp">22°C</h1>
    </div>
</div>`,
        hint: `Since we don't have a real API key here, mock the fetch or just console.log the url construction!`,
        starterCode: `// Use a mock URL if no API key
// Fetch weather
// Handle 404 city not found`,
        solutionCode: `// Pseudocode for API handling
async function checkWeather(city) {
    try {
        console.log("Fetching weather for " + city);
        // const response = await fetch(apiUrl + city + \`&appid=\${apiKey}\`);
        // ... handling logic
    } catch (err) {
        console.log(err);
    }
}`
    },

    // --- Games ---
    {
        id: 'tic-tac-toe',
        title: 'Tic Tac Toe',
        description: 'Classic 3x3 game with win logic.',
        category: 'Game',
        difficulty: 'Hard',
        time: '1 hour',
        html: `<div style="display: grid; grid-template-columns: repeat(3, 100px); gap: 5px; margin: 50px auto; width: 310px;">
    <div class="cell" style="width: 100px; height: 100px; bg: #ddd; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; border: 1px solid #ccc;"></div>
    <div class="cell" style="width: 100px; height: 100px; bg: #ddd; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; border: 1px solid #ccc;"></div>
    <div class="cell" style="width: 100px; height: 100px; bg: #ddd; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; border: 1px solid #ccc;"></div>
    <div class="cell" style="width: 100px; height: 100px; bg: #ddd; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; border: 1px solid #ccc;"></div>
    <div class="cell" style="width: 100px; height: 100px; bg: #ddd; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; border: 1px solid #ccc;"></div>
    <div class="cell" style="width: 100px; height: 100px; bg: #ddd; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; border: 1px solid #ccc;"></div>
    <div class="cell" style="width: 100px; height: 100px; bg: #ddd; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; border: 1px solid #ccc;"></div>
    <div class="cell" style="width: 100px; height: 100px; bg: #ddd; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; border: 1px solid #ccc;"></div>
    <div class="cell" style="width: 100px; height: 100px; bg: #ddd; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; border: 1px solid #ccc;"></div>
</div>`,
        concept: 'Arrays, Logic, Game Loop',
        starterCode: `// Array of 9 nulls
// Check win conditions
// Switch player`,
        solutionCode: `// Complex logic for win checking
const checkWin = () => {
    // ...
}`
    },
    {
        id: 'guess-number',
        title: 'Guess the Number',
        description: 'Computer picks 1-100, user guesses with Higher/Lower hints.',
        category: 'Game',
        difficulty: 'Medium',
        time: '30 min',
        concept: 'Conditional Logic',
        html: `<div style="text-align: center; margin-top: 50px;">
    <h3>Guess a number between 1-100</h3>
    <input type="number" id="guess" style="padding: 10px;">
    <button onclick="check()" style="padding: 10px;">Guess</button>
    <p id="message"></p>
</div>`,
        starterCode: `const target = Math.floor(Math.random() * 100) + 1;
// Check user guess
// Give feedback`,
        solutionCode: `let target = Math.floor(Math.random() * 100) + 1;
let guesses = 0;
// logic here`
    },
    {
        id: 'rock-paper-scissors',
        title: 'Rock Paper Scissors',
        description: 'Play against the computer.',
        category: 'Game',
        difficulty: 'Medium',
        time: '30 min',
        concept: 'Randomization & Logic',
        html: `<div style="text-align: center; margin-top: 50px;">
    <button onclick="play('rock')">Rock</button>
    <button onclick="play('paper')">Paper</button>
    <button onclick="play('scissors')">Scissors</button>
    <p id="result"></p>
</div>`,
        starterCode: `const choices = ['rock', 'paper', 'scissors'];
// Computer picks random
// Compare vs user input`,
        solutionCode: `function play(userChoice) {
    // logic
}`
    },

    // --- Utilities ---
    {
        id: 'calculator',
        title: 'Calculator',
        description: 'Working calculator with basic math operations.',
        category: 'Utility',
        difficulty: 'Hard',
        time: '45 min',
        concept: 'String parsing or Logic',
        html: `<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; max-width: 200px; margin: 50px auto;">
    <input id="display" style="grid-column: span 4; padding: 10px;">
    <button>7</button><button>8</button><button>9</button><button>/</button>
    <button>4</button><button>5</button><button>6</button><button>*</button>
    <button>1</button><button>2</button><button>3</button><button>-</button>
    <button>0</button><button>.</button><button>=</button><button>+</button>
</div>`,
        starterCode: `// Handle button clicks
// Build string or perform math`,
        solutionCode: `function calculate(expression) {
    // Basic implementation using eval() or parser
    try {
        return eval(expression);
    } catch {
        return "Error";
    }
}`
    },
    {
        id: 'stopwatch',
        title: 'Stopwatch',
        description: 'Start, Stop, Reset with milliseconds.',
        category: 'Utility',
        difficulty: 'Medium',
        time: '30 min',
        concept: 'setInterval & Formatting',
        html: `<div style="text-align: center; margin-top: 50px;">
    <h1 id="time">00:00:00</h1>
    <button onclick="start()">Start</button>
    <button onclick="stop()">Stop</button>
    <button onclick="reset()">Reset</button>
</div>`,
        starterCode: `let ms = 0, s = 0, m = 0;
// Timer logic`,
        solutionCode: `let startTime;
// implementation`
    },
    {
        id: 'password-generator',
        title: 'Password Generator',
        description: 'Generate secure passwords with custom length and charset.',
        category: 'Utility',
        difficulty: 'Medium',
        time: '25 min',
        concept: 'String manipulation & Random',
        html: `<div style="text-align: center; margin-top: 50px;">
    <input type="number" id="length" value="12" style="padding: 5px; width: 60px;">
    <button onclick="generate()">Generate</button>
    <p id="password" style="font-family: monospace; font-size: 20px; background: #eee; padding: 10px; display: inline-block;"></p>
</div>`,
        starterCode: `const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
// Combine based on options`,
        solutionCode: `function generate() {
    // impl
}`
    },
    {
        id: 'word-count',
        title: 'Word Counter',
        description: 'Count words and characters in a textarea in real-time.',
        category: 'Utility',
        difficulty: 'Easy',
        time: '15 min',
        concept: 'Input events & Regex',
        html: `<div style="max-width: 500px; margin: 50px auto;">
    <textarea id="textInput" style="width: 100%; height: 100px; padding: 10px;"></textarea>
    <p>Words: <span id="wordCount">0</span> Characters: <span id="charCount">0</span></p>
</div>`,
        starterCode: `// Listen for input
// Split string by spaces
// Update counts`,
        solutionCode: `textInput.addEventListener('input', () => {
    const text = textInput.value;
    charCount.innerText = text.length;
    wordCount.innerText = text.trim().split(/\\s+/).filter(w => w).length;
});`
    },
    // --- HTML Structure ---
    {
        id: 'contact-form',
        title: 'Contact Form',
        description: 'Build a semantic contact form with proper labels and input types.',
        category: 'HTML',
        difficulty: 'Easy',
        time: '20 min',
        concept: 'Forms & Accessibility',
        html: `<div style="max-width: 400px; margin: 30px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
    <h2>Contact Us</h2>
    <form id="contactForm" style="display: flex; flex-direction: column; gap: 10px;">
        <!-- Add your inputs here -->
    </form>
</div>`,
        hint: `Use <label> with 'for' attribute matching input 'id'. Use types like 'email', 'tel', and 'textarea'.`,
        starterCode: `// No JS needed for structure, but you can add validation
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted!');
});`,
        solutionCode: `<label for="name">Name</label>
<input type="text" id="name" required>

<label for="email">Email</label>
<input type="email" id="email" required>

<label for="message">Message</label>
<textarea id="message" rows="4"></textarea>

<button type="submit">Send</button>`
    },
    {
        id: 'semantic-blog',
        title: 'Semantic Blog Layout',
        description: 'Create a blog post layout using semantic HTML5 tags.',
        category: 'HTML',
        difficulty: 'Medium',
        time: '25 min',
        concept: 'Semantic HTML',
        html: `<div style="max-width: 600px; margin: 0 auto; line-height: 1.6;">
    <!-- Use header, main, article, section, footer -->
    <div style="background: #eee; padding: 20px;">Header Area</div>
    <div style="padding: 20px;">Main Content Area</div>
    <div style="background: #333; color: white; padding: 20px;">Footer Area</div>
</div>`,
        hint: `Replace divs with <header>, <nav>, <main>, <article>, and <footer> tags.`,
        starterCode: `// Focus on the HTML structure in the template above. 
// No JS required for this task.`,
        solutionCode: `<header>
    <h1>My Awesome Blog</h1>
    <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
    </nav>
</header>
<main>
    <article>
        <h2>The Future of Web Dev</h2>
        <p>Content goes here...</p>
    </article>
</main>
<footer>
    &copy; 2024 Tech Blog
</footer>`
    },
    // --- Python Experiments ---
    {
        id: 'py-calculator',
        title: 'Simple Calculator',
        description: 'Build a CLI-based calculator that performs basic arithmetic.',
        category: 'Python',
        difficulty: 'Easy',
        time: '15 min',
        concept: 'Functions & Input',
        starterCode: `# Define functions for add, sub, mul, div
# Take user input
# Print result`,
        solutionCode: `def add(x, y): return x + y
def subtract(x, y): return x - y

print("Select operation:")
print("1.Add 2.Subtract")

choice = input("Enter choice(1/2): ")
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

if choice == '1':
    print(num1, "+", num2, "=", add(num1, num2))
elif choice == '2':
    print(num1, "-", num2, "=", subtract(num1, num2))
else:
    print("Invalid Input")`
    },
    {
        id: 'py-number-guess',
        title: 'Number Guessing Game',
        description: 'Write a program where the user guesses a secret number.',
        category: 'Python',
        difficulty: 'Medium',
        time: '20 min',
        concept: 'Loops & Random Module',
        starterCode: `import random
# Generate random number
# Loop until user guesses correctly`,
        solutionCode: `import random

number = random.randint(1, 100)
guesses = 0

while True:
    guess = int(input("Guess a number between 1 and 100: "))
    guesses += 1
    
    if guess < number:
        print("Too low!")
    elif guess > number:
        print("Too high!")
    else:
        print(f"Correct! You guessed it in {guesses} tries.")
        break`
    },
    {
        id: 'py-text-analyzer',
        title: 'Text Analyzer',
        description: 'Count words, characters, and find the most common word in a string.',
        category: 'Python',
        difficulty: 'Medium',
        time: '30 min',
        concept: 'String Manipulation & Dictionaries',
        starterCode: `text = "This is a sample text to analyze code."
# Count words
# Count characters
# Find frequency`,
        solutionCode: `text = "python is amazing and python is easy"
words = text.split()
print("Word count:", len(words))

frequency = {}
for word in words:
    frequency[word] = frequency.get(word, 0) + 1
    
print("Frequency:", frequency)`
    },
    // --- C Experiments ---
    {
        id: 'c-hello-world',
        title: 'Hello World',
        description: 'Your first C program. Learn to print to the console.',
        category: 'C',
        difficulty: 'Easy',
        time: '5 min',
        concept: 'Basic Syntax & Output',
        starterCode: `// Include the standard input/output library
// Define the main function
// Print "Hello, World!"`,
        solutionCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
    },
    {
        id: 'c-calculator',
        title: 'C Calculator',
        description: 'Build a CLI calculator using switch statements.',
        category: 'C',
        difficulty: 'Medium',
        time: '20 min',
        concept: 'Control Flow & User Input',
        starterCode: `#include <stdio.h>

int main() {
    char op;
    double first, second;
    // 1. Get operator input
    // 2. Get two numbers
    // 3. Use switch statement to calculate
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int main() {
    char op;
    double first, second;
    printf("Enter an operator (+, -, *, /): ");
    scanf("%c", &op);
    printf("Enter two operands: ");
    scanf("%lf %lf", &first, &second);

    switch (op) {
    case '+':
        printf("%.1lf + %.1lf = %.1lf", first, second, first + second);
        break;
    case '-':
        printf("%.1lf - %.1lf = %.1lf", first, second, first - second);
        break;
    case '*':
        printf("%.1lf * %.1lf = %.1lf", first, second, first * second);
        break;
    case '/':
        printf("%.1lf / %.1lf = %.1lf", first, second, first / second);
        break;
    default:
        printf("Error! operator is not correct");
    }

    return 0;
}`
    },
    {
        id: 'c-pointer-swap',
        title: 'Pointer Swap',
        description: 'Swap two numbers using pointers (Pass by Reference).',
        category: 'C',
        difficulty: 'Hard',
        time: '25 min',
        concept: 'Pointers & Memory Addresses',
        starterCode: `#include <stdio.h>

// TODO: Implement swap function taking pointers
void swap() {
    
}

int main() {
    int x = 5, y = 10;
    
    printf("Before: x=%d, y=%d\\n", x, y);
    // Call swap
    printf("After: x=%d, y=%d\\n", x, y);
    
    return 0;
}`,
        solutionCode: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;
    
    printf("Before: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After: x=%d, y=%d\\n", x, y);
    
    return 0;
}`
    },
    // --- C++ Experiments ---
    {
        id: 'cpp-hello-world',
        title: 'Hello World C++',
        description: 'Your first C++ program using iostream.',
        category: 'CPP',
        difficulty: 'Easy',
        time: '5 min',
        concept: 'Basic Syntax & I/O',
        starterCode: `// Include iostream
// Use standard namespace (optional)
// Write main function`,
        solutionCode: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`
    },
    {
        id: 'cpp-class-demo',
        title: 'Simple Class',
        description: 'Create a Student class with public properties.',
        category: 'CPP',
        difficulty: 'Medium',
        time: '15 min',
        concept: 'Classes & Objects',
        starterCode: `#include <iostream>
#include <string>

// Define class Student
// Public: name, age
// Method: display()

int main() {
    // Create object
    // Set values
    // Call display
    return 0;
}`,
        solutionCode: `#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int age;

    void display() {
        cout << "Name: " << name << ", Age: " << age << endl;
    }
};

int main() {
    Student s1;
    s1.name = "John";
    s1.age = 20;
    
    s1.display();
    
    return 0;
}`
    },
    {
        id: 'cpp-vector-sum',
        title: 'Vector Sum',
        description: 'Calculate sum of elements in a vector.',
        category: 'CPP',
        difficulty: 'Medium',
        time: '15 min',
        concept: 'STL Vectors',
        starterCode: `#include <iostream>
#include <vector>

int main() {
    // Declare vector
    // Add elements
    // Iterate and sum
    return 0;
}`,
        solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    
    for (int num : numbers) {
        sum += num;
    }
    
    cout << "Sum: " << sum << endl;
    return 0;
}`
    }
];

export function getExperiment(id: string) {
    return experiments.find(e => e.id === id);
}
