---
hologram: true
title: Introducing append-backdrop property into joy-dialog
name: 1-joy-dialog-append-backdrop
category: ADR
---

## Date (dd/mm/yyyy): 13/05/2022
## Release: `1.0.0-rc.2`


## Context 

We have introduced a new `append-backdrop` property for our `joy-dialog` component.
The goal was to solve a very specific problem (that happens very often though), especially when it comes to mobile rendering.

While migrating a legacy modal (old component name) component, we noticed that we simply used to hide the parent element containing the modal trigger and the modal itself for mobile devices, to keep UI lightest as possible.

Originally, we chose to inject our `joy-backdrop` at the root of `<body>`. When clicking on dismiss or confirm CTAs the dialog is destroyed, and then the backdrop.
The dialog handles it internally.

But when a parent element containing our dialog is hidden by some way (display none, visibility, whatever...), the internal function that destroys the backdrop is not called !
The result is that we had the dialog hidden, but not the backdrop.

## Solution 

First, we started to think about using IntersectionObserver API. It does work with component visibility, but unfortunately not with invisibility (and display properties, to be more specific).
And to be honest, it was quite overkill.

The easiest, lightest solution was then to choose where to inject the `joy-backdrop`, with 2 choices : 

- directly at body root (default)
- next to the `joy-dialog` itself

When injecting the `joy-backdrop` next to the `joy-dialog` - if any parent element is hidden (with CSS or JavaScript) - both dialog and backdrop are hidden correctly.

The default property value still injects the backdrop on body root. To inject it next to the dialog, please use : 

```html
<joy-dialog append-backdrop="sibling"></joy-dialog>
```


