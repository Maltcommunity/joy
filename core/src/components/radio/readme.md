---
hologram: true
title: Radio
name: joy_radio
category: Webcomponents
---

```ui_example
<joy-radio-group name="my-radio" value="first">
    <joy-radio value="first">First value</joy-radio>
    <joy-radio value="second">Second value</joy-radio>
    <joy-radio value="third">Third value</joy-radio>
    <joy-radio value="fourth">Fourth value</joy-radio>
</joy-radio-group>
```

<joy-highlight level="warning" display-icon>
    <joy-text>
        Please refer to <a href="#joy_radio_group">this docs, for radio group examples.</a>
    </joy-text>
</joy-highlight>

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                     | Type      | Default        |
| ---------- | ---------- | --------------------------------------------------------------- | --------- | -------------- |
| `disabled` | `disabled` | If `true`, the user cannot interact with the radio.             | `boolean` | `false`        |
| `name`     | `name`     | The name of the control, which is submitted with the form data. | `string`  | `this.inputId` |
| `value`    | `value`    | the value of the radio.                                         | `any`     | `undefined`    |


## Events

| Event           | Description              | Type                |
| --------------- | ------------------------ | ------------------- |
| `joyRadioBlur`  | When radio is blurred *  | `CustomEvent<void>` |
| `joyRadioClick` | When radio is selected * | `CustomEvent<void>` |
| `joyRadioFocus` | When radio is focused *  | `CustomEvent<void>` |


## Slots

| Slot        | Description        |
| ----------- | ------------------ |
| `"default"` | Text of your radio |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*