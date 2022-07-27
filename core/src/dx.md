---
hologram: true
title: Vscode
name: vs-code
category: DX
---

For Vscode users, [@maltjoy/core](https://www.npmjs.com/package/@maltjoy/core) package includes a [docs-vscode output](https://stenciljs.com/docs/docs-vscode)
to make the IDE aware of our custom elements, their props/values, and documentation. 

To activate it from Vscode, please follow these steps :
- Click on _File/Preferences/Settings_
- Search for _HTML: Custom Data_
- Click on _Add item_
- Add the relative path to the _vscode-data.json_ file :

`your-path/node_modules/@maltjoy/core/dist/vscode-data.json`

Save it, and that's all !