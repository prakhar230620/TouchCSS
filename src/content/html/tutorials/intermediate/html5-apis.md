---
id: html5-apis
language: html
level: intermediate
title: HTML5 APIs
description: Introduction to Geolocation, Drag and Drop, and Local Storage.
duration: 20 mins
order: 1
prerequisites: ['semantic-html']
---

# HTML5 APIs

HTML5 isn't just about tags; it brings powerful JavaScript APIs that integrate closely with the markup.

## Geolocation API

The Geolocation API allows the user to provide their location to web applications if they desire.

```html
<button onclick="getLocation()">Try It</button>
<p id="demo"></p>

<script>
var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}
</script>
```

## Drag and Drop API

HTML Drag and Drop interfaces enable applications to use drag-and-drop features in browsers.

The user selects a draggable element, drags it to a droppable element, and releases it to drop it.

```html
<div class="dropzone" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69">
```

## Web Storage API

With web storage, web applications can store data locally within the user's browser.

*   `window.localStorage` - stores data with no expiration date
*   `window.sessionStorage` - stores data for one session (data is lost when the browser tab is closed)
