---
hologram: true
title: Panel
name: joy-panel
category: Webcomponents
---

<joy-tag variant="important">WIP</joy-tag>

```ui_example
<joy-panel>
    <span slot="panel-title">I am the panel title</span>
    <span slot="panel-subtitle">I am the panel subtitle but I'm not mandatory</span>
    <joy-link slot="panel-title-action" href="#">I am an action</joy-link>
    <p slot="panel-body">I am a specific content inside my panel body slot.</p>
    <joy-rating-stars slot="panel-body" rating-value="5"></joy-rating-stars>
</joy-panel>
```



<!-- Auto Generated Below -->


## Slots

| Slot                   | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `"panel-body"`         | All the content you need in your panel. Insert what you want here |
| `"panel-left-action"`  | If you need a left-aligned CTA, use this                          |
| `"panel-right-action"` | If you need a right-aligned CTA, use this                         |
| `"panel-subtitle"`     | Subtitle of the panel. Not mandatory                              |
| `"panel-title"`        | Title of the panel. Mandatory                                     |
| `"panel-title-action"` | CTA in top right corner. Not mandatory                            |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
