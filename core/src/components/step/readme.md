---
hologram: true
title: Step
name: joy-step
category: Webcomponents
---

<joy-highlight>
    For full implementation documentation, please refer to <a href="#joy_stepper">this doc</a>
</joy-highlight>

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                        | Type                         | Default        |
| ----------- | ----------- | ---------------------------------- | ---------------------------- | -------------- |
| `completed` | `completed` | If the step is completed. *        | `boolean`                    | `false`        |
| `direction` | `direction` | Used to change style for mobile. * | `"horizontal" \| "vertical"` | `'horizontal'` |
| `ongoing`   | `ongoing`   | If the step is ongoing. *          | `boolean`                    | `false`        |
| `size`      | `size`      | Default or small. *                | `"default" \| "small"`       | `'default'`    |


## Methods

### `setCompleted() => Promise<void>`

Marks the step as completed

#### Returns

Type: `Promise<void>`



### `setDirection(direction: Direction) => Promise<void>`

Marks the direction as vertical or horizontal

#### Returns

Type: `Promise<void>`



### `setOnGoing() => Promise<void>`

Marks the step as ongoing

#### Returns

Type: `Promise<void>`




## CSS Custom Properties

| Name                               | Description                  |
| ---------------------------------- | ---------------------------- |
| `--stepper-border-color`           | Default steps border color   |
| `--stepper-border-color-completed` | Completed steps border color |
| `--stepper-text-color`             | Steps font color             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
