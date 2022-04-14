---
hologram: true
title: Select
name: joy-select
category: Webcomponents
---

<joy-tag variant="important">WIP</joy-tag>

```ui_example
<joy-select icon="filter">
    <joy-select-option disabled selected>Choose your option...</joy-select-option>
    <joy-select-option value="first">First option</joy-select-option>
    <joy-select-option value="second">Second option</joy-select-option>
    <joy-select-option value="third">Third option</joy-select-option>
    <joy-select-option value="fourth">Fourth option</joy-select-option>
    <joy-select-option value="fifth">Fifth option</joy-select-option>
</joy-select>
```

## States 

```ui_example
<joy-select icon="filter" disabled>
    <joy-select-option disabled selected>Choose your option...</joy-select-option>
    <joy-select-option value="first">First option</joy-select-option>
    <joy-select-option value="second">Second option</joy-select-option>
    <joy-select-option value="third">Third option</joy-select-option>
</joy-select>
```

```ui_example
<joy-select icon="filter" invalid invalid-message="The field is required, please select a value">
    <joy-select-option disabled selected>Choose your option...</joy-select-option>
    <joy-select-option value="first">First option</joy-select-option>
    <joy-select-option value="second">Second option</joy-select-option>
    <joy-select-option value="third">Third option</joy-select-option>
</joy-select>
```

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                  | Type                  | Default               |
| ---------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | --------------------- |
| `closeOnBlur`    | `close-on-blur`   | By default, the dropdown is closed if you focusout the select. For debugging purpose or specific behavior, you can toggle off this option. * | `boolean`             | `true`                |
| `disabled`       | `disabled`        | Disabled state. *                                                                                                                            | `boolean`             | `false`               |
| `icon`           | `icon`            | Pick an icon displayed before the label. *                                                                                                   | `string / undefined` | `undefined`           |
| `invalid`        | `invalid`         | Invalid state. *                                                                                                                             | `boolean`             | `false`               |
| `invalidMessage` | `invalid-message` | Invalid state message. *                                                                                                                     | `string`              | `'Field is required'` |
| `name`           | `name`            | Select name attribute to be found by parent form. *                                                                                          | `string`              | `'select'`            |
| `required`       | `required`        | Mandatory or not. *                                                                                                                          | `boolean`             | `false`               |
| `value`          | `value`           | Select actual value. *                                                                                                                       | `string`              | `''`                  |


## Events

| Event         | Description | Type                              |
| ------------- | ----------- | --------------------------------- |
| `valueChange` |             | `CustomEvent<{ value: string; }>` |


## Dependencies

### Depends on

- [joy-icon](../icon)
- [joy-form-error](../form-error)

### Graph
```mermaid
graph TD;
  joy-select --> joy-icon
  joy-select --> joy-form-error
  joy-form-error --> joy-icon
  style joy-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
