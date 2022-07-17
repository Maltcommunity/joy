---
hologram: true
title: Selectable item group
name: joy-selectable-item-group
category: Webcomponents
---

<joy-tag variant="special">EXPERIMENTAL</joy-tag>
<joy-link href="#joy-selectable-item">Please see selectable-item docs for items API</joy-link>

## Single choice

```ui_example
<joy-selectable-item-group>
    <joy-selectable-item disabled value="0-2">
        Entry-level
    </joy-selectable-item>
    <joy-selectable-item value="2-7">
        Intermediate
    </joy-selectable-item>
    <joy-selectable-item checked value="7+">
        Senior
    </joy-selectable-item>
</joy-selectable-item-group>
```

### Single choice with full-width layout

```ui_example
<joy-selectable-item-group full-width>
    <joy-selectable-item disabled value="0-2">
        Entry-level
    </joy-selectable-item>
    <joy-selectable-item value="2-7">
        Intermediate
    </joy-selectable-item>
    <joy-selectable-item checked value="7+">
        Senior
    </joy-selectable-item>
</joy-selectable-item-group>
```

### Multiple choice

```ui_example
<joy-selectable-item-group multiple>
    <joy-selectable-item>
        <joy-checkbox value="1">Category title 1</joy-checkbox>
    </joy-selectable-item>
    <joy-selectable-item checked>
        <joy-checkbox value="2">Category title 2</joy-checkbox>
    </joy-selectable-item>
    <joy-selectable-item>
        <joy-checkbox value="3">Category title 3</joy-checkbox>
    </joy-selectable-item>
    </joy-selectable-item>
    <joy-selectable-item>
        <joy-checkbox value="4">Category title 4</joy-checkbox>
    </joy-selectable-item>
        <joy-selectable-item>
        <joy-checkbox value="5">Category title 5</joy-checkbox>
    </joy-selectable-item>
</joy-selectable-item-group>
```


<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                                          | Type                  | Default     |
| ----------- | ------------ | -------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `fullWidth` | `full-width` | If set to true, css flex rule will by applied in order to take all horizontal space available *                      | `boolean`             | `false`     |
| `multiple`  | `multiple`   | If multiple is set to true, it means you'll have to add joy-checkbox items. If not, a hidden radio box is included * | `boolean`             | `false`     |
| `value`     | `value`      | Selected item *                                                                                                      | `string \| undefined` | `undefined` |


## Events

| Event                              | Description | Type                                        |
| ---------------------------------- | ----------- | ------------------------------------------- |
| `joy-selectable-item-group-change` |             | `CustomEvent<HTMLJoySelectableItemElement>` |


## Methods

### `getSelectedItemsValue() => Promise<string | (string | undefined)[] | undefined>`



#### Returns

Type: `Promise<string | (string | undefined)[] | undefined>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
