---
hologram: true
title: Checkbox Wrapper
name: joy_checkbox_wrapper
category: Webcomponents
---

## Default

```ui_example
<joy-checkbox>I am a checkbox</joy-checkbox>
<joy-checkbox checked>I am a checked checkbox</joy-checkbox>
<joy-checkbox disabled>I am a disabled checkbox</joy-checkbox>
<joy-checkbox disabled checked>I am a disabled and checked checkbox</joy-checkbox>
```


## Advanced example 
```ui_example
<joy-checkbox>
    <p slot="checkbox-content">Display super Malter</p>
    <small slot="checkbox-content">This is a small sub-text</small>
    <joy-badge-level slot="checkbox-content" type="supermalter" super-malter-level="3"></joy-badge-level>
    <a slot="checkbox-content" href="https://malt.fr" target="_blank">Learn more</a>
</joy-checkbox>
```


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                 | Type                  | Default     |
| ---------- | ---------- | --------------------------------------------------------------------------- | --------------------- | ----------- |
| `checked`  | `checked`  | Checkbox activated or not                                                   | `boolean`             | `false`     |
| `disabled` | `disabled` | Disabled state                                                              | `boolean`             | `false`     |
| `name`     | `name`     | It will be applied as the hidden input name attribute (for the actual form) | `string`              | `''`        |
| `value`    | `value`    | Input value. TODO : check if we really need it as we use a checkbox system  | `string \| undefined` | `undefined` |


## Events

| Event               | Description                                                                                                                             | Type                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `joyCheckboxChange` | Clicking on the component will fire this customEvent. use @joyCheckboxChange in Vue apps, and onJoyCheckboxChange for plain JavaScript. | `CustomEvent<boolean>` |


## Methods

### `updateValue(newValue: boolean) => Promise<void>`

Update checkbox value from outside the component

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
