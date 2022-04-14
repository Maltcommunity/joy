---
hologram: true
title: Tab
name: joy-tab-button
category: Webcomponents
---

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute  | Description                                                                                                     | Type                  | Default     |
| ------------------ | ---------- | --------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `heapId`           | `heap-id`  | "data-heap" attribute to set on the link if an {@link href} prop is passed or on the host otherwise..           | `string / undefined` | `undefined` |
| `href`             | `href`     | If your tab is a link, give the URL                                                                             | `string / undefined` | `undefined` |
| `selected`         | `selected` | Tab selection state                                                                                             | `boolean`             | `false`     |
| `tab` _(required)_ | `tab`      | A tab id or name must be provided for each `joy-button-tab`. It's used internally to reference the selected tab | `string`              | `undefined` |


## Events

| Event               | Description                                                                                                                      | Type                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `joyTabButtonClick` | Event used by joy-tabs parent component. Prefer using joyTabSelected event from joy-tabs if you want to listen to any tab change | `CustomEvent<{ selectedTab: string; href: string; }>` |


## Methods

### `selectTabButton(status: boolean) => Promise<void>`

Set the tabulation selected or not

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
