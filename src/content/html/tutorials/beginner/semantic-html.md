---
id: semantic-html
language: html
level: beginner
title: Semantic HTML
description: Writing meaningful HTML for better accessibility and SEO.
duration: 15 mins
order: 4
prerequisites: ['basic-tags']
---

# Semantic HTML

Semantic HTML means using correct HTML elements for their intended purpose as much as possible.

## What are Semantic Elements?

A semantic element clearly describes its meaning to both the browser and the developer.

Examples of **non-semantic** elements: `<div>` and `<span>` - Tells nothing about its content.
Examples of **semantic** elements: `<form>`, `<table>`, and `<article>` - Clearly defines its content.

## Common Semantic Elements in HTML5

*   `<article>`
*   `<aside>`
*   `<details>`
*   `<figcaption>`
*   `<figure>`
*   `<footer>`
*   `<header>`
*   `<main>`
*   `<mark>`
*   `<nav>`
*   `<section>`
*   `<summary>`
*   `<time>`

### Example Layout

```html
<header>
  <h1>My Website</h1>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
  </nav>
</header>

<main>
  <section>
    <h2>About Us</h2>
    <p>We are a company...</p>
  </section>
  
  <article>
    <h2>Latest News</h2>
    <p>Today we launched...</p>
  </article>
</main>

<footer>
  <p>&copy; 2024 All rights reserved.</p>
</footer>
```
