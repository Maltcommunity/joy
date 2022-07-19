---
hologram: true
title: Toggle
name: joy-toggle
category: maltjoy core Forms
---

## Default

```ui_example
<joy-toggle>I am not checked</joy-toggle>
```

## Checked

```ui_example
<joy-toggle checked>I am checked</joy-toggle>
```

## Disabled

```ui_example
<joy-toggle disabled checked>I am disabled</joy-toggle>
```

## Given input name

```ui_example
<joy-toggle name="my-input-name">I have a custom input name</joy-toggle>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                 | Type                  | Default     |
| ---------- | ---------- | --------------------------------------------------------------------------- | --------------------- | ----------- |
| `checked`  | `checked`  | Toggle activated or not                                                     | `boolean`             | `false`     |
| `disabled` | `disabled` | Disabled state                                                              | `boolean`             | `false`     |
| `name`     | `name`     | It will be applied as the hidden input name attribute (for the actual form) | `string`              | `''`        |
| `value`    | `value`    | Input value. TODO : check if we really need it as we use a checkbox system  | `string \| undefined` | `undefined` |


## Events

| Event              | Description                                           | Type                   |
| ------------------ | ----------------------------------------------------- | ---------------------- |
| `joytoggle-change` | Clicking on the component will fire this customEvent. | `CustomEvent<boolean>` |
| `valueChange`      | Clicking on the component will fire this customEvent. | `CustomEvent<boolean>` |


## Methods

### `updateValue(newValue: boolean) => Promise<void>`

Update toggle value from outside the component

#### Returns

Type: `Promise<void>`




## CSS Custom Properties

| Name              | Description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| `--toggle-height` | Use this prop to override the toggle symbol height. It'll resize homothetically |
| `--toggle-width`  | Use this prop to override the toggle symbol width. It'll resize homothetically  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
