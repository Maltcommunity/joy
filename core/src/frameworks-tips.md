---
hologram: true
title: Vue tips
name: vue_tips
category: _README
---

## blur/focus listeners

For `joy-input`, `joy-textarea` or any other custom-element using a text field, if you need to listen to `blur` events like so :

```vue
<joy-input @blur="doSomething"></joy-input>
```

It won't work as blur events do not bubble up by default. See <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event">MDN docs</a>.

### You have then 2 options :

* using `@blur.capture` to actually capture the event from the native input, to the custom-element
* using `@focusout`, as focusous events actually bubble up

For @focus event, it's the same :

* use `@focus.capture` to actually capture the event from the native input, to the custom-element
* use `@focusin`, as the event actually bubble up

<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event" target="_blank">Reference</a>
