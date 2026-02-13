---
id: microdata
language: html
level: advanced
title: Microdata & Structured Data
description: Helping search engines understand your content with Schema.org.
duration: 20 mins
order: 1
prerequisites: ['seo-basics']
---

# Microdata

Microdata is a WHATWG HTML specification used to nest metadata within existing content on web pages. Search engines, web crawlers, and browsers can extract and process Microdata from a web page and use it to provide a richer browsing experience for users.

## Schema.org

Schema.org provides a collection of shared vocabularies webmasters can use to mark up their pages in ways that can be understood by the major search engines.

### Example: Markup a Person

```html
<div itemscope itemtype="https://schema.org/Person">
  <span itemprop="name">Jane Doe</span>
  <img src="janedoe.jpg" itemprop="image" alt="Photo of Jane Doe"/>
  <span itemprop="jobTitle">Professor</span>
  <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
    <span itemprop="streetAddress">20341 Whitworth Institute 405 N. Whitworth</span>
    <span itemprop="addressLocality">Seattle</span>,
    <span itemprop="addressRegion">WA</span>
    <span itemprop="postalCode">98052</span>
  </div>
  <a href="http://www.janedoe.com" itemprop="url">janedoe.com</a>
</div>
```

## JSON-LD

While Microdata uses HTML attributes, JSON-LD (JavaScript Object Notation for Linked Data) is often preferred by Google as it separates the data from the HTML structure.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jane Doe",
  "jobTitle": "Professor",
  "url": "http://www.janedoe.com"
}
</script>
```
