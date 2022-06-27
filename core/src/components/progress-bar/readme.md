---
hologram: true
title: Progress Bar
name: joy-progress-bar
category: Webcomponents
---

### Desktop mode 
```ui_example
<joy-progress-bar steps="5" current-step="2"></joy-progress-bar>
```


### Mobile mode
The color will be automatically updated on mobile.
No need to use the mode props.

```ui_example
<joy-progress-bar mode="mobile" steps="5" current-step="2"></joy-progress-bar>
```

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                             | Type                    | Default     |
| ------------- | -------------- | --------------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `currentStep` | `current-step` | Current step number.                                                                    | `number \| undefined`   | `undefined` |
| `mode`        | `mode`         | Activate specific color mode. Documentation purpose.                                    | `"desktop" \| "mobile"` | `'desktop'` |
| `percentage`  | `percentage`   | Progress bar percentage, percentage usage will override steps & currentStep definition. | `number \| undefined`   | `undefined` |
| `steps`       | `steps`        | Total number of steps.                                                                  | `number \| undefined`   | `undefined` |


## CSS Custom Properties

| Name                          | Description                        |
| ----------------------------- | ---------------------------------- |
| `--progress-bar-color`        | Foreground color                   |
| `--progress-bar-color-mobile` | Foreground color for mobile device |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
