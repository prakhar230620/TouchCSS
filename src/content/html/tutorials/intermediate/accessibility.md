---
id: accessibility
language: html
level: intermediate
title: Web Accessibility (a11y)
description: Making your web pages usable by everyone, including people with disabilities.
duration: 15 mins
order: 2
prerequisites: ['semantic-html']
---

# Web Accessibility

Web accessibility (often abbreviated as a11y) is the practice of ensuring there are no barriers that prevent interaction with, or access to, websites on the World Wide Web by people with physical disabilities, situational disabilities, and socio-economic restrictions on bandwidth and speed.

## Semantic HTML

Using correct HTML elements for their intended purpose is the foundation of accessibility.
Screen readers use semantic information to navigate the page.

*   Use `<button>` for buttons, not `<div>` with click handlers.
*   Use `<nav>` for navigation.
*   Use `<h1>` through `<h6>` for document structure.

## ARIA (Accessible Rich Internet Applications)

WAI-ARIA provides a framework for adding attributes to identify features for user interaction, how they relate to each other, and their current state.

```html
<div role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
```

## Alt Text for Images

Always provide text alternatives for non-text content.

```html
<img src="chart.png" alt="Chart showing sales growth from 2020 to 2024">
```

## Keyboard Navigation

Ensure all interactive elements can be accessed via the keyboard (Tab key).
Focus states should be clearly visible.
