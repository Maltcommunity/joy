---
hologram: true
title: Availability
name: joy-availability
category: maltjoy core View
---

## Status colors
```ui_example
<joy-availability label="Availability"></joy-availability>
<joy-availability label="Availability" status="AVAILABLE_AND_VERIFIED"></joy-availability>
<joy-availability label="Availability" status="AVAILABLE_SOON"></joy-availability>
<joy-availability label="Availability" status="NOT_AVAILABLE"></joy-availability>
<joy-availability label="Availability" status="NOT_AVAILABLE_WITH_DATE"></joy-availability>
```

## Only DOT usage

```ui_example
<joy-availability status="AVAILABLE"></joy-availability>
<joy-availability status="AVAILABLE_AND_VERIFIED"></joy-availability>
<joy-availability status="AVAILABLE_SOON"></joy-availability>
<joy-availability status="NOT_AVAILABLE"></joy-availability>
<joy-availability status="NOT_AVAILABLE_WITH_DATE"></joy-availability>
```

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                  | Type                                                                                                                | Default |
| ----------- | ------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ------- |
| `isPartial` | `is-partial` | isPartial dot, define fill or stroke dot display             | `boolean`                                                                                                           | `false` |
| `label`     | `label`      | Text Availability content, if null, only dot will be display | `null \| string`                                                                                                    | `null`  |
| `status`    | `status`     | Status Availability, define color                            | `"" \| "AVAILABLE" \| "AVAILABLE_AND_VERIFIED" \| "AVAILABLE_SOON" \| "NOT_AVAILABLE" \| "NOT_AVAILABLE_WITH_DATE"` | `''`    |


## CSS Custom Properties

| Name                                  | Description                                                                                                      |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `--availability-background`           | Background of the availability (when label given)                                                                |
| `--availability-dot-background-color` | Availability dot background color. Basically the same than border color, but can be overriden to be transparent. |
| `--availability-dot-border-color`     | Availability dot border color                                                                                    |
| `--availability-dot-size`             | Dot size in pixel                                                                                                |
| `--availability-text-color`           | Availability text color (for the label)                                                                          |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
