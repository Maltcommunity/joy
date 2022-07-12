# joy-selectable-item-group



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
