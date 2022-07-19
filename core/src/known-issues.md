---
hologram: true
title: _GETTING STARTED
name: _joy_getting-started
category: _README
---

## Installation
For now, you have nothing to install. Webcomponents registry is automatically loaded at runtime.
Simply copy/paste code snippet, and the component will be lazy-loaded.

## All known issues related to Stencil and its webcomponent implementation

- Issue with shadow DOM activated : host (root element) classes can be overriden by Vue with class binding => solution is not using classes on <Host> Stencil component.
- Issue with no shadow DOM and scoped mode activated : stencil generated scoped classes can be overriden by Vue with class binding. 
- Vue v-model does not work with inputs. Use *front/vue-custom-element-v-model* plugin