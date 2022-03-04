---
hologram: true
title: Checkbox
name: joy_checkbox
category: Webcomponents
---

## Default

```ui_example
<joy-checkbox value="first">I am a checkbox</joy-checkbox>
<joy-checkbox value="first"><p>I am a checkbox <a href="#" target="_blank">with a link</a></p></joy-checkbox>
<joy-checkbox checked value="second">I am a checked checkbox</joy-checkbox>
<joy-checkbox disabled value="third">I am a disabled checkbox</joy-checkbox>
<joy-checkbox disabled checked value="fourth">I am a disabled and checked checkbox</joy-checkbox>
```

## Advanced example 
```ui_example
<joy-checkbox value="advanced">
    <p slot="checkbox-content">Display super Malter</p>
    <small slot="checkbox-content">This is a small sub-text</small>
    <joy-badge-level slot="checkbox-content" type="supermalter" super-malter-level="3"></joy-badge-level>
    <a slot="checkbox-content" href="https://malt.fr" target="_blank">Learn more</a>
</joy-checkbox>
```

## HTML fallback 
If using the webcomponent is too complex for your case, use this plain CSS implementation.

```ui_example
<label class="joy-checkbox">
    <input name="my-html-input" class="joy-checkbox__input" type="checkbox" aria-checked="false" />
    <div class="joy-checkbox__content-wrapper">
        I am a plain HTML checkbox
    </div>
</label>

<label class="joy-checkbox">
    <input name="my-html-input" class="joy-checkbox__input" type="checkbox" aria-checked="true" checked />
    <div class="joy-checkbox__content-wrapper">
        I am a plain HTML checkbox
    </div>
</label>

<label class="joy-checkbox">
    <input name="my-html-input" class="joy-checkbox__input" type="checkbox" aria-checked="false" disabled />
    <div class="joy-checkbox__content-wrapper">
        I am a plain disabled HTML checkbox
    </div>
</label>

<label class="joy-checkbox">
    <input name="my-html-input" class="joy-checkbox__input" type="checkbox" aria-checked="true" disabled checked />
    <div class="joy-checkbox__content-wrapper">
        I am a plain disabled HTML checkbox
    </div>
</label>
```


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                           | Type      | Default |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `checked`  | `checked`  | Checkbox activated or not                                                                                             | `boolean` | `false` |
| `disabled` | `disabled` | Disabled state                                                                                                        | `boolean` | `false` |
| `name`     | `name`     | It will be applied as the hidden input name attribute (for the actual form)                                           | `string`  | `''`    |
| `value`    | `value`    | Input value. Input value != checked state ! If you need to get the state checked/not checked, simply use checked prop | `string`  | `'on'`  |


## Events

| Event               | Description                                                                                                                             | Type                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `joyCheckboxChange` | Clicking on the component will fire this customEvent. use @joyCheckboxChange in Vue apps, and onJoyCheckboxChange for plain JavaScript. | `CustomEvent<boolean>` |


## Methods

### `updateValue(newValue: boolean) => Promise<void>`

Update checkbox state from outside the component

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
