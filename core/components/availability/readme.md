---
hologram: true
title: Availability
name: joy-availability
category: Webcomponents
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
| `label`     | `label`      | Text Availability content, if null, only dot will be display | `null / string`                                                                                                    | `null`  |
| `status`    | `status`     | Status Availability, define color                            | `"" / "AVAILABLE" / "AVAILABLE_AND_VERIFIED" / "AVAILABLE_SOON" / "NOT_AVAILABLE" / "NOT_AVAILABLE_WITH_DATE"` | `''`    |


## CSS Custom Properties

| Name                                               | Description                                                    |
| -------------------------------------------------- | -------------------------------------------------------------- |
| `--availability-background`                        | Background of the availability (when label given)              |
| `--availability-dot-color`                         | Default dot color when no availability status is given         |
| `--availability-dot-color-available`               | Dot color when status is : available                           |
| `--availability-dot-color-available-and-verified`  | Dot color when status is : available and verified account      |
| `--availability-dot-color-available-soon`          | Dot color when status is : available soon                      |
| `--availability-dot-color-available-with-date`     | Dot color when status is : available until a specific date     |
| `--availability-dot-color-not-available`           | Dot color when status is : not available                       |
| `--availability-dot-color-not-available-with-date` | Dot color when status is : not available until a specific date |
| `--availability-dot-size`                          | Dot size in pixel                                              |
| `--availability-text-color`                        | Availability text color (for the label)                        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
