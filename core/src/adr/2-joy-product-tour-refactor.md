---
hologram: true
title: Why joy-product-tour needed an almost complete refactoring
name: 1-joy-product-tour-refactoring
category: ADR
---

## Date (dd/mm/yyyy): 22/06/2022
## Release: `1.0.0-rc.3`


## Context 

At the time speaking, `joy-product-tour` is still experimental but has 2 instances in production that work pretty well.
The issue that pushed us to a refactoring comes from a conflict in specific stacking contexts. Indeed, if no z-index is given to any product-tour parent, it's working perfectly.

We first chose to inject the product tour next to the element it is supposed to highlight. It caused overlap glitches with our main navigation bar, 
so we concluded that injecting it at the highest DOM level should be the better solution and more bug-proof.

So, both product-tour and its backdrop needs to be dissociated from the highlighted target.

## Solution 

We chose to apply the same logic than [intro.js](https://introjs.com/) well-known package (having 3 DOM elements to create the highlight effect) :

- the product-tour itself
- the fullscreen overlay/backdrop
- and a spotlight element, which wraps the actual area to highlight 


Let's focus on the last one first, because it's the most important. The first element has not changed, so we won't talk about it.

### The spotlight (joy-product-tour-spotlight)

The spotlight has one role : cover and highlight the targeted content.
We first wanted to use a combination of `mix-blend-mode: hard-light` and our `joy-backdrop` (already used in `joy-dialog`). The effect was quite convincing, but we faced a simple problem :
This CSS trick only works when used from a parent (mix-blend-mode) to a child.

Our `joy-backdrop` needs to have a `position: fixed` and the spotlight, a `position: absolute` to keep following the target as we scroll. 
But unfortunately, the spotlight inherits the fixed position, the absolute position is overridden. 
Setting an absolute position to the backdrop is not a clean solution as we needed to recalculate its height everytime the page is resized. It's impossible to catch all the events that make the page resizing (async component injection, responsive...).

The actual solution is kind of hacky, but the best we found so far : 
We create the `joy-product-tour-spotlight` and give it the same dimensions as the target (plus some padding), as well as the same coordinates.
Then we apply a high `z-index` and a `box-shadow` CSS property with a huge spread value in order to cover all the page : 

```css
:host {
    /* .... */
    z-index: var(--joy-core-z-index-backdrop);
    box-shadow: 0 0 0 10000px var(--joy-color-overlay);
}
```

**It's working** ! And as you can guess, we don't need an actual `joy-backdrop` anymore, as box-shadow already do the job.
But.... if we keep it like so we can still interact with background page, because box-shadow area is not an actual element.

### The overlay

Previously we used the joy-backdrop, but to prevent adding specific product-tour CSS, we chose not to use it anymore.
To replace it, we now inject right **before** the spotlight a simple `<div>` element with inline style, whose **z-index is the same than the spotlight** to be placed below it: 

```html
<div class="joy-product-tour--overlay" 
     style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: var(--joy-core-z-index-backdrop);">
</div>
```

See ? It's just a simple div covering all the screen, but without any background-color. It prevents interacting with the page and keeps the element highlighted.


## Limitations

Like the [introjs](https://introjs.com) we talked about earlier, it works if you are able to place your `joy-product-tour` at the highest DOM level, or if you don't have any stacking context.
We strongly recommend to follow this rule.

**Another issue**: if your highlighted element has a parent with a `z-index` (lower than the one used to display our webcomponent), the overlay element will actually overlap your target, making in non-interactive anymore.
The only solution then is to add the `disable-overlay` property on the `joy-product-tour`.

It won't change the style, but you'll be able to interact with the whole page by not creating any overlay. You won't be able as well to catch custom events by clicking on the backdrop, as the area is not clickable anymore.
Not perfect then, but you can pick the solution you prefer.






