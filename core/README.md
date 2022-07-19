# @maltjoy/core

This repository contains all webcomponents library from [Malt](https://www.malt.fr/) "Joy" design system.
You can use this library with any stack you need, with or without JavaScript frameworks. 

## Installation

### CDN

 The fastest way to install the library is to use cdn links. It will automatically install the core library.
 The initial script itself is extremely tiny and does not represent the entire library, it's only a small registry.
 
Add the following tags to your page :

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@maltjoy/core@0.6.0/dist/joy/joy.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@maltjoy/core@0.6.0/dist/joy/joy.esm.js"></script>
<!-- If you need to include browsers which does not support modules, use this script : -->
<script nomodule src="https://cdn.jsdelivr.net/npm/@maltjoy/core@0.6.0/dist/joy/joy.js"></script>
```

**Only the components used on that page will actually be requested and lazy-loaded.**

Then, you can use any component you want :

```html
<joy-tag variant="primary">I am a tag</joy-tag>
```

### Usage with bundlers
Follow these instructions if you use a bundler such as webpack, vite, or rollup.

Self lazy-loading components (webpack only)
Add this code to your main JS/TS file:

```javascript
// Import components
import { defineCustomElements } from '@maltjoy/core/dist/loader';
// Joy CSS is required to include every declared custom properties, and apply skeleton style while component are loading
import '@maltjoy/core/dist/joy/joy.css';

// Register components in customElements regitry
defineCustomElements(window);
```


### Pick any component you want

```scss
// Import the bundled CSS (with or without extension, depending on your own sass config
@import "@maltjoy/core/dist/joy/joy.css";
```

```javascript
import '@maltjoy/core/dist/components/joy-tag.js';
```

> The original bundle size is way heavier than other solutions, as it will include the whole Stenciljs runtime.*

### Framework integration

For specific framework integration, please read the [official Stenciljs documentation](https://stenciljs.com/docs/overview) 


## Customization

Not yet.
