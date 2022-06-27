---
hologram: true
title: Radio
name: joy-radio
category: Webcomponents
---


<joy-highlight level="warning" display-icon>
    <joy-text>
        Please refer to <a href="#joy_radio_group">this docs, for radio group examples.</a><br/>
        <strong>joy-radio</strong> is not meant to be used alone, please use it with a joy-radio-group wrapper
    </joy-text>
</joy-highlight>


```ui_example
<joy-radio-group name="my-radio" value="first">
    <joy-radio value="first">First value</joy-radio>
    <joy-radio value="second">Second value</joy-radio>
    <joy-radio value="third" disabled>Third value</joy-radio>
    <joy-radio value="fourth">Fourth value</joy-radio>
</joy-radio-group>
```

## Type
```ui_example
<joy-radio-group name="my-radio" value="first">
    <joy-radio type="outline" value="first">First value</joy-radio>
    <joy-radio type="outline" value="second">Second value</joy-radio>
    <joy-radio type="outline" value="third" disabled>Third value</joy-radio>
    <joy-radio type="outline" value="fourth"><joy-icon name="rocket"></joy-icon>Fourth value</joy-radio>
</joy-radio-group>
```

## Expandable
```ui_example
<joy-radio-group name="my-radio" value="first">
    <joy-radio type="outline" value="first">First value <div slot="expandable-content">I'm a expandable content !</div></joy-radio>
    <joy-radio type="outline" value="second">Second value <div slot="expandable-content">I'm a expandable content ! <div><p>With a paragraph !</p></div></div></joy-radio>
    <joy-radio type="outline" value="third" disabled>Third value <div slot="expandable-content">I'm a expandable content !</div></joy-radio>
    <joy-radio type="outline" value="fourth"><joy-icon name="rocket"></joy-icon>Fourth value <div slot="expandable-content">I'm a expandable content !</div></joy-radio>
</joy-radio-group>
```

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute  | Description                                          | Type                     | Default     |
| ------------------- | ---------- | ---------------------------------------------------- | ------------------------ | ----------- |
| `checked`           | `checked`  | If `true`, the radio is selected.                    | `boolean`                | `false`     |
| `disabled`          | `disabled` | If `true`, the user cannot interact with the radio.  | `boolean`                | `false`     |
| `name` _(required)_ | `name`     | Field name. Given by parent component                | `string`                 | `undefined` |
| `required`          | `required` | Field is required                                    | `boolean`                | `false`     |
| `type`              | `type`     | Defines the type of the radio 'default' or 'outline' | `"default" \| "outline"` | `'default'` |
| `value`             | `value`    | the value of the radio.                              | `any`                    | `undefined` |


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


## CSS Custom Properties

| Name                                 | Description                         |
| ------------------------------------ | ----------------------------------- |
| `--radio-border-color-focus`         | keyboard focus outline color        |
| `--radio-circle-color`               | default radio button color          |
| `--radio-circle-color-disabled`      | disabled radio button color         |
| `--radio-circle-color-focus`         | focus radio button color            |
| `--radio-circle-color-hover`         | hover radio button color            |
| `--radio-circle-color-invalid`       | invalid radio button color          |
| `--radio-circle-color-invalid-hover` | invalid radio button color on hover |
| `--radio-color`                      | the radio label color               |
| `--radio-color-disabled`             | disabled radio label color          |
| `--radio-size`                       | override the radio width/height     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
