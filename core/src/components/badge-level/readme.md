---
hologram: true
title: Badge Level
name: joy-badge-level
category: Webcomponents
---

```ui_example
<joy-badge-level type="supermalter" super-malter-level="3"></joy-badge-level>
```

```ui_example
<joy-badge-level type="highpotential"></joy-badge-level>
```

```ui_example
<joy-badge-level type="maltlinker"></joy-badge-level>
```

```ui_example
<joy-badge-level type="new"></joy-badge-level>
```

```ui_example
<joy-badge-level type="verified"></joy-badge-level>
```

```ui_example
<joy-badge-level type="supermalter" super-malter-level="3" visible-text="false"></joy-badge-level>
```

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                         | Type      | Default     |
| ------------------- | -------------------- | ------------------------------------------------------------------- | --------- | ----------- |
| `superMalterLevel`  | `super-malter-level` | SuperMalter level from 1 to 3                                       | `number`  | `1`         |
| `type` _(required)_ | `type`               | Badge type: highpotential, maltlinker, new, supermalter or verified | `string`  | `undefined` |
| `visibleText`       | `visible-text`       | Display text label                                                  | `boolean` | `true`      |


## CSS Custom Properties

| Name               | Description                   |
| ------------------ | ----------------------------- |
| `----badge-height` | Default height for the badge  |
| `--badge-padding`  | Default padding for the badge |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
