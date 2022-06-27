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

| Property            | Attribute            | Description                                                                                                                | Type                                                                                                                                                                                                                         | Default     |
| ------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `superMalterLevel`  | `super-malter-level` | SuperMalter level from 1 to 3                                                                                              | `number`                                                                                                                                                                                                                     | `1`         |
| `type` _(required)_ | `type`               | Badge type: highpotential, high-potential-auto, maltlinker, new, supermalter or verified or program: program_highpotential | `JoyBadgeLevelEnum.HIGH_POTENTIAL \| JoyBadgeLevelEnum.HIGH_POTENTIAL_AUTO \| JoyBadgeLevelEnum.MALT_LINKER \| JoyBadgeLevelEnum.NEW \| JoyBadgeLevelEnum.SUPER_MALTER \| JoyBadgeLevelEnum.VERIFIED \| JoyBadgeProgramEnum` | `undefined` |
| `visibleText`       | `visible-text`       | Display text label                                                                                                         | `boolean`                                                                                                                                                                                                                    | `true`      |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
