# @maltjoy/tokens

This package includes all "Tokens" defined for Joy design system. 
You can find all of it on our [Zeroheight documentation](https://joy.malt.com/6bf479565/p/027b08-colors/b/266e61).

## Tokens types

- Colors
- Functional colors
- Elevations
- Radius
- Spacing
- Transition (animation)
- Typography (font-family, font-size, font-weight, line-height)

## Installation

First, run this command :

`npm install @maltjoy/tokens@latest`

Replace @latest by the version you prefer.

### SCSS 

If you use SCSS preprocessor, you have two choices :
- include the full pre-bundle css version 
- import the source design tokens by picking what you need

#### Already bundled CSS

```scss
// With or without the .css extension
@use '@maltjoy/tokens/dist/css/tokens.css';
```

#### Cherry-pick

```scss
@use '@maltjoy/tokens/src/colors';
@use '@maltjoy/tokens/src/elevations';

:root { // Or whatever selector you need, but this one will register all the properties at the document root
  @include colors.getPaletteProperties();
  @include elevations.getElevationsProperties();
}

```

> Don't use `@import` synthax as it will be slowly deprecated and removed by SASS (https://sass-lang.com/documentation/at-rules/import)


