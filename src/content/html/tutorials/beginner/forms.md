---
id: forms
language: html
level: beginner
title: HTML Forms
description: Learn how to create forms to collect user input.
duration: 20 mins
order: 3
prerequisites: ['basic-tags']
---

# HTML Forms

An HTML form is used to collect user input. The user input is most often sent to a server for processing.

## The `<form>` Element

The HTML `<form>` element is used to create an HTML form for user input:

```html
<form>
.
form elements
.
</form>
```

## The `<input>` Element

The `<input>` element is the most used form element.
An `<input>` element can be displayed in many ways, depending on the `type` attribute.

```html
<form>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname">
</form>
```

### Common Input Types

*   `<input type="text">`: Displays a single-line text input field
*   `<input type="radio">`: Displays a radio button (for selecting one of many choices)
*   `<input type="checkbox">`: Displays a checkbox (for selecting zero or more of many choices)
*   `<input type="submit">`: Displays a submit button (for submitting the form)
*   `<input type="button">`: Displays a clickable button
