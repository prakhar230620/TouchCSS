---
id: canvas
language: html
level: advanced
title: HTML5 Canvas
description: Advanced graphics and animation with the Canvas API.
duration: 25 mins
order: 3
prerequisites: ['html5-apis']
---

# HTML5 Canvas

The HTML `<canvas>` element is used to draw graphics on a web page via scripting (usually JavaScript).

## The Element

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

## Drawing Context

To draw on the canvas, you need a drawing context.

```javascript
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
```

## Drawing Shapes

```javascript
// Draw a red rectangle
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);

// Draw a line
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

// Draw a circle
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();
```

## Images and Text

```javascript
ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);

// Draw Image
var img = document.getElementById("scream");
ctx.drawImage(img, 10, 10);
```

Canvas is widely used for game development, data visualization (charts), and image editing in the browser.
