---
hologram: true
title: Tabs
name: joy-tabs
category: maltjoy core Overlay
---

For non SPA contexts, you don't need to wrap the content in joy-tab.
Simply use joy-tabs with joy-tab-buttons.

```ui_example
<joy-tabs selected-tab="second-tab">
    <joy-tab-button slot="tab-button" tab="first-tab" tabindex="1">First tab</joy-tab-button>
    <joy-tab-button slot="tab-button" tab="second-tab" tabindex="1">Second tab</joy-tab-button>
    <joy-tab-button slot="tab-button" tab="third-tab" tabindex="1">Third tab</joy-tab-button>
    
    <joy-tab slot="tab-content" tab="first-tab">
        <joy-icon color="turquoise" name="bell"></joy-icon>&nbsp;I am the content of the first tab
    </joy-tab>
    
    <joy-tab slot="tab-content" tab="second-tab">
        <joy-icon color="red" name="cross"></joy-icon>&nbsp;I am the content of the second tab
    </joy-tab>
    
    <joy-tab slot="tab-content" tab="third-tab">
        <joy-icon name="user"></joy-icon>&nbsp;I am the content of the third tab
    </joy-tab>
</joy-tabs>
```

## Specific asynchronous tab-content slots
For Vue contexts or whatever framework rendering a slot with a "if" condition (eg v-if),<br/>
don't set the v-if directly on the joy-tab as it won't be able to render it.<br/>
Follow this example :

```ui_code_example
<joy-tabs selected-tab="second-tab">
    <joy-tab-button slot="tab-button" tab="second-tab" tabindex="1">Second tab</joy-tab-button>
    
    <joy-tab slot="tab-content" tab="second-tab">
        <!-- Set the condition inside the joy-tab -->
        <div v-if="MY_OTHER_CONDITION">I am the content of the second tab</div>
    </joy-tab>
</joy-tabs>
```



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute      | Description                                                                                       | Type      | Default     |
| -------------------------- | -------------- | ------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `selectedTab` _(required)_ | `selected-tab` | Use this prop to activate a specific tab by default by giving its name                            | `string`  | `undefined` |
| `sync`                     | `sync`         | Use this prop to specify that your joy-tabs is made of links, and tabs are not updated on the fly | `boolean` | `false`     |


## Events

| Event            | Description                                                                 | Type                                                  |
| ---------------- | --------------------------------------------------------------------------- | ----------------------------------------------------- |
| `joyTabSelected` | If you wanna catch the tab selection in the whole component, use this event | `CustomEvent<{ selectedTab: string; href: string; }>` |


## Slots

| Slot            | Description                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| `"tab-button"`  | Use it for each joy-tab-button you need                                                                          |
| `"tab-content"` | Use it for each joy-tab you need. Please note that joy-tabs doesn' have shadowDOM, to prevent issues with forms. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
