---
hologram: true
title: Tags Input
name: joy-tags-input
category: maltjoy core Forms
---


```ui_example
<joy-tags-input>Enter your skills</joy-tags-input>
```

```ui_example
<joy-tags-input 
    sortable-tags 
    suggestions-label="Suggestions :"
    suggestions="['Java', 'Kotlin', 'Maven']">
    Enter your skills
</joy-tags-input>
```


## With default values

```ui_example
<joy-tags-input id="toto" validation="email" placeholder="Write and press enter to add" values="['test@valid-email.com']">
    <span slot="tags-input-label">Please enter emails lists</span>
</joy-tags-input>
```

## Invalid example 
<joy-highlight level="warning" display-icon>
    To deal with form error display, you need to use tags-input 'joyTagsError" custom event.
    Listen to this event and show/hide the form error with the specific translation you need, according to the type of error returned by the event detail.
</joy-highlight>

```ui_example
<joy-tags-input validation="email" placeholder="Write and press enter to add" values="['test@valid-email.com', 'test@not-valid-email']">
    <span slot="tags-input-label">Please enter emails lists</span>
</joy-tags-input>

<joy-form-error no-html-error-text="One of given emails is not valid."></joy-form-error>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                             | Type                                                                                           | Default                 |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------- |
| `invalid`          | `invalid`           | Invalid state                                                                                                           | `boolean`                                                                                      | `false`                 |
| `name`             | `name`              | form name for our tags input                                                                                            | `string \| undefined`                                                                          | `undefined`             |
| `placeholder`      | `placeholder`       | Placeholder used for the input                                                                                          | `string`                                                                                       | `'Add your items here'` |
| `size`             | `size`              | Size for your tags. Check Tag documentation for available values                                                        | `"large" \| "medium" \| "small" \| "xsmall"`                                                   | `'small'`               |
| `sortableTags`     | `sortable-tags`     | Allows to resort tag list with drag&drop                                                                                | `boolean`                                                                                      | `false`                 |
| `suggestions`      | `suggestions`       | Suggestion of values. Allows to directly pick them instead of typing.                                                   | `string \| undefined`                                                                          | `undefined`             |
| `suggestionsLabel` | `suggestions-label` | Suggestion label. Not mandatory.                                                                                        | `string \| undefined`                                                                          | `undefined`             |
| `validation`       | `validation`        | Validation type : if 'email' is given, it will create a specific check before actually adding the tag. Default to none. | `"email" \| "none"`                                                                            | `'none'`                |
| `values`           | `values`            | Saved values for the tags list. Must be an array like string eg. ['first', 'second'].                                   | `string \| undefined`                                                                          | `undefined`             |
| `variant`          | `variant`           | Variant/color type for your tags. Check Tag documentation for available values                                          | `"important" \| "inactive" \| "pending" \| "pricing" \| "primary" \| "secondary" \| "special"` | `'primary'`             |


## Events

| Event                           | Description                                                                                           | Type                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `joy-tags-input-add-suggestion` | Triggered when we click on a tag suggestion                                                           | `CustomEvent<string>`                                                |
| `joy-tags-input-blur`           | On input blur                                                                                         | `CustomEvent<void>`                                                  |
| `joy-tags-input-error`          | When the tags list is on error. According to the returned ErrorType, you can display the right error. | `CustomEvent<ErrorType.DUPLICATED_ENTRY \| ErrorType.INVALID_EMAIL>` |
| `joy-tags-input-focus`          | On input focus                                                                                        | `CustomEvent<void>`                                                  |
| `joy-tags-input-update`         | When the tags list is updated                                                                         | `CustomEvent<string[]>`                                              |


## Methods

### `getValues() => Promise<string[]>`

Get the array of values contained in the tag input

#### Returns

Type: `Promise<string[]>`




## Dependencies

### Depends on

- [joy-label](../label)
- [joy-tags-list](../tags-list)
- [joy-tag](../tag)

### Graph
```mermaid
graph TD;
  joy-tags-input --> joy-label
  joy-tags-input --> joy-tags-list
  joy-tags-input --> joy-tag
  joy-tag --> joy-icon
  style joy-tags-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
