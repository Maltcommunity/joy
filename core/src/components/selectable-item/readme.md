# joy-selectable-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                      | Type                  | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `checked`  | `checked`  | Checked state *                                                                                                                                  | `boolean`             | `false`     |
| `disabled` | `disabled` | Disabled state *                                                                                                                                 | `boolean`             | `false`     |
| `name`     | `name`     | Name property for form participation *                                                                                                           | `string \| undefined` | `undefined` |
| `value`    | `value`    | If you use this component with a joy-checkbox as slot: set the value only on the joy-checkbox, it will be automatically applied to it's parent * | `string \| undefined` | `undefined` |


## Events

| Event                        | Description | Type                                                                     |
| ---------------------------- | ----------- | ------------------------------------------------------------------------ |
| `joy-selectable-item-change` |             | `CustomEvent<{ element: HTMLJoySelectableItemElement; value: string; }>` |
| `value-change`               |             | `CustomEvent<{ element: HTMLJoySelectableItemElement; value: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*