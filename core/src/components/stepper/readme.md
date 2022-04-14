---
hologram: true
title: Stepper
name: joy-stepper
category: Webcomponents
---

<joy-highlight>
    For specific step documentation, please refer to <a href="#joy_step">this doc</a>
</joy-highlight>

```ui_example
<joy-stepper step="1">
    <joy-step>First step</joy-step>
    <joy-step>Second step</joy-step>
    <joy-step>Third step</joy-step>
    <joy-step>Fourth step</joy-step>
    <joy-step>Last step</joy-step>
</joy-stepper>
```


### Step sizes 

```ui_example
<joy-stepper step="3">
    <joy-step>First step</joy-step>
    <joy-step>Second step</joy-step>
    <joy-step size="small"></joy-step>
    <joy-step size="small"></joy-step>
    <joy-step>Last step</joy-step>
</joy-stepper>
```

### Justify

```ui_example
<joy-stepper justify step="2">
    <joy-step>First step</joy-step>
    <joy-step>Second step</joy-step>
    <joy-step>Third step</joy-step>
    <joy-step>Last step</joy-step>
</joy-stepper>
```

### Vertical

```ui_example
<joy-stepper direction="vertical" step="1">
    <joy-step>First step</joy-step>
    <joy-step>Second step</joy-step>
    <joy-step>Third step</joy-step>
    <joy-step>Fourth step</joy-step>
    <joy-step>Last step</joy-step>
</joy-stepper>
```

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                       | Type                         | Default        |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `direction` | `direction` | Used to change style for mobile. *                                                                | `"horizontal" / "vertical"` | `'horizontal'` |
| `justify`   | `justify`   | Defines the CSS flex horizontal justify distribution *                                            | `boolean`                    | `false`        |
| `step`      | `step`      | Set the step number of the stepper. Will auto-complete each step that is < step. Starts from 0. * | `number`                     | `0`            |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
