---
hologram: true
title: Product Tour
name: joy-product-tour
category: Webcomponents
---

<joy-tag variant="important">EXPERIMENTAL</joy-tag>

```ui_example

<joy-product-tour-trigger product-tour="myProductTour">
    <joy-button variant="main">Run product tour manually</joy-button>
</joy-product-tour-trigger>

<joy-button variant="primary" id="myProductTourHighlighted">I am the next feature highlighted</joy-button>

<!-- First step product tour -->
<joy-product-tour id="myProductTour" icon="medal-thumbsup" steps="2" step="1" position="bottom">
    <joy-tags-list slot="product-tour-preheader">
        <joy-tag variant="primary">I am a tag</joy-tag>
        <joy-tag variant="pricing">I am another tag</joy-tag>
    </joy-tags-list>
    
    <div slot="product-tour-header">
        I am the product tour title
    </div>
    
    <p slot="product-tour-content">Lorem ipsum</p>
    
    <joy-button size="small" variant="ghost" slot="product-tour-dismiss">Got it</joy-button>
    <joy-product-tour-trigger product-tour="myProductTour2" slot="product-tour-next" target="#myProductTourHighlighted">
        <joy-button size="small" variant="primary">Next</joy-button>
    </joy-product-tour-trigger>
</joy-product-tour>


<!-- Second step product tour -->
<joy-product-tour id="myProductTour2" icon="medal-thumbsup" steps="2" step="2" position="bottom">    
    <div slot="product-tour-header">
        I am the product tour title of the second step
    </div>
    
    <p slot="product-tour-content">Lorem ipsum</p>
    
    <joy-button size="small" variant="ghost" slot="product-tour-dismiss">Got it</joy-button>
    <joy-button size="small" variant="main" slot="product-tour-dismiss">Thanks</joy-button>
</joy-product-tour>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                                                        | Type                                     | Default     |
| ---------- | ----------- | ------------------------------------------------------------------ | ---------------------------------------- | ----------- |
| `icon`     | `icon`      | Icon name, placed left to the title                                | `string \| undefined`                    | `undefined` |
| `maxWidth` | `max-width` | Set a max width for your container                                 | `number \| undefined`                    | `500`       |
| `open`     | `open`      | Product tour open state                                            | `boolean`                                | `false`     |
| `position` | `position`  | Product tour position according to highlighted content             | `"bottom" \| "left" \| "right" \| "top"` | `'right'`   |
| `step`     | `step`      | If multiple product tour are need, specify the current step number | `number \| undefined`                    | `1`         |
| `steps`    | `steps`     | If multiple product tour are need, specify the amount              | `number \| undefined`                    | `undefined` |


## Methods

### `closeProductTour() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `showProductTour(fromElement: HTMLElement) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [joy-icon](../icon)

### Graph
```mermaid
graph TD;
  joy-product-tour --> joy-icon
  style joy-product-tour fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
