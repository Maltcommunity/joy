---
hologram: true
title: Company Avatar
name: joy_company_avatar
category: Webcomponents
---

## With photo as avatar

```ui_example
<!-- Small size -->
<joy-company-avatar company-name="Umbrella Corporation" size="small" img-src="https://i.pinimg.com/originals/23/d8/ec/23d8ec34996d8cb5749d40bc8322b464.jpg"></joy-company-avatar>
```

```ui_example
<!-- Medium size -->
<joy-company-avatar company-name="Umbrella Corporation" size="medium" img-src="https://i.pinimg.com/originals/23/d8/ec/23d8ec34996d8cb5749d40bc8322b464.jpg"></joy-company-avatar>
```

```ui_example
<!-- Big size -->
<joy-company-avatar company-name="Umbrella Corporation" size="big" img-src="https://i.pinimg.com/originals/23/d8/ec/23d8ec34996d8cb5749d40bc8322b464.jpg"></joy-company-avatar>
```

## With icon placeholder as avatar

```ui_example
<joy-company-avatar company-name="Umbrella Corporation" size="large"></joy-company-avatar>
<joy-company-avatar company-name="Umbrella Corporation" size="medium"></joy-company-avatar>
<joy-company-avatar company-name="Umbrella Corporation" size="small"></joy-company-avatar>
```


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                    | Type                                          | Default     |
| ------------- | -------------- | ---------------------------------------------- | --------------------------------------------- | ----------- |
| `color`       | `color`        | Company avatar color                           | `"red" / "teal" / "turquoise" / "yellow"`  | `'teal'`    |
| `companyName` | `company-name` | Company name. Required to give image alt text. | `string`                                      | `''`        |
| `imgSrc`      | `img-src`      | URL source for img. Optional.                  | `string / undefined`                         | `undefined` |
| `size`        | `size`         | Size of the image. Optionnal.                  | `"large" / "medium" / "small" / undefined` | `'large'`   |


## Dependencies

### Depends on

- [joy-icon](../icon)

### Graph
```mermaid
graph TD;
  joy-company-avatar --> joy-icon
  style joy-company-avatar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
