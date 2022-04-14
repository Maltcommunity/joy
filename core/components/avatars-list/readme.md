---
hologram: true
title: Avatars List
name: joy-avatars-list
category: Webcomponents
---

```ui_example
<joy-avatars-list>
    <joy-avatar full-name="Toto Tata"></joy-avatar>
    <joy-avatar full-name="Gary Cooper"></joy-avatar>
    <joy-avatar full-name="Tati Teto"></joy-avatar>
    <joy-avatar total-number="14"></joy-avatar>
    <joy-avatar></joy-avatar>
    <joy-avatar full-name="Steven Spielberg"></joy-avatar>
</joy-avatars-list>
```

## Compress mode ON

```ui_example
<joy-avatars-list compress="true">
    <joy-avatar full-name="Colin H. van Eeckhout"></joy-avatar>
    <joy-avatar full-name="Sam Neil"></joy-avatar>
    <joy-avatar full-name="Tom Hanks"></joy-avatar>
    <joy-avatar full-name="Bob L'Eponge"></joy-avatar>
    <joy-avatar full-name="Manu Chao"></joy-avatar>
    <joy-avatar full-name="Cruela Denfer"></joy-avatar>
    <joy-avatar full-name="Bob Kelso"></joy-avatar>
    <joy-avatar></joy-avatar>
</joy-avatars-list>
```

## Non-exhaustive list

```ui_example
<joy-avatars-list>
    <joy-avatar full-name="Colin H. van Eeckhout"></joy-avatar>
    <joy-avatar full-name="Sam Neil"></joy-avatar>
    <joy-avatar full-name="Tom Hanks"></joy-avatar>
    <joy-avatar full-name="Bob L'Eponge"></joy-avatar>
    <joy-avatar full-name="Manu Chao"></joy-avatar>
    <joy-avatar total-number="15" total-number-link="https://malt.fr"></joy-avatar>
</joy-avatars-list>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                      | Type      | Default |
| ---------- | ---------- | ------------------------------------------------ | --------- | ------- |
| `compress` | `compress` | How avatars are spread. With a gap, or overlaped | `boolean` | `false` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
