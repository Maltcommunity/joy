---
hologram: true
title: Indicators
name: joy-indicators
category: maltjoy core View
---

```ui_example
<joy-indicators>
    <joy-indicator selected></joy-indicator>
    <joy-indicator></joy-indicator>
    <joy-indicator></joy-indicator>
    <joy-indicator></joy-indicator>
</joy-indicators>
```


<div style="padding: 40px; background: var(--joy-color-tertiary-70);">
    <joy-indicators variant="light">
        <joy-indicator selected></joy-indicator>
        <joy-indicator></joy-indicator>
        <joy-indicator></joy-indicator>
        <joy-indicator></joy-indicator>
    </joy-indicators>
</div>

```ui_code_example
<joy-indicators variant="light">
    <joy-indicator selected></joy-indicator>
    <joy-indicator></joy-indicator>
    <joy-indicator></joy-indicator>
    <joy-indicator></joy-indicator>
</joy-indicators>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                          | Type                   | Default     |
| ---------- | ---------- | ------------------------------------ | ---------------------- | ----------- |
| `selected` | `selected` | Selected state *                     | `number`               | `1`         |
| `variant`  | `variant`  | Variant colors. 2 possibles values * | `"default" \| "light"` | `'default'` |


## Events

| Event                 | Description | Type                  |
| --------------------- | ----------- | --------------------- |
| `joyIndicatorsChange` |             | `CustomEvent<number>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
