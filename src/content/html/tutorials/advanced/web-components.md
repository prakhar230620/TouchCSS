---
id: web-components
language: html
level: advanced
title: Web Components
description: Creating reusable custom elements with Shadow DOM.
duration: 25 mins
order: 2
prerequisites: ['html5-apis']
---

# Web Components

Web Components are a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

## Three Main Technologies

1.  **Custom Elements**: Use JavaScript APIs to define a new HTML element.
2.  **Shadow DOM**: Use this to ensure the style and behavior of your component are hidden and separate from other code on the page.
3.  **HTML Templates**: The `<template>` and `<slot>` elements enable you to write markup templates that are not displayed in the rendered page.

### Example: A Simple Custom Element

```html
<!-- Define the component -->
<template id="my-paragraph">
  <style>
    p {
      color: white;
      background-color: #666;
      padding: 5px;
    }
  </style>
  <p>My web component</p>
</template>

<my-paragraph></my-paragraph>

<script>
  class MyParagraph extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById('my-paragraph');
      const templateContent = template.content;

      // Attach Shadow DOM
      this.attachShadow({mode: 'open'}).appendChild(
        templateContent.cloneNode(true)
      );
    }
  }

  // Register the new element
  customElements.define('my-paragraph', MyParagraph);
</script>
```
