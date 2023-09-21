# OpenBB Design System

Created on top of Figma [Styleguide](https://www.figma.com/file/Gbu811BkBJBtez3ajbr7lw/Styleguide?type=design&node-id=23-26&mode=design&t=ACcxkQNaADUUe1PL-4) and [Molecules](https://www.figma.com/file/zrku7cFZzdFFswOL5snYCj/Components---Molecules?type=design&node-id=1-5186&mode=dev).

## Installation

This library requires TailwindCSS to be installed in your project.

```bash
npm i -S openbb-ui tailwindcss tailwindcss-animate
```

Then add TailwindCSS into your `tailwind.config.js`:

```js
import type { Config } from "tailwindcss";
import ui from "openbb-ui/tailwind.config";

export default {
  ...ui,
  // content: [],
  // theme: {
  //   extend: {},
  // },
  // plugins: [],
} satisfies Config;
```

And finally, import styles into your code:

```js
import "openbb-ui/dist/style.css";
```

## Development

### Install dependencies

```bash
npm ci
```

### Update dependencies

Use [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) to update dependencies.

```bash
ncu -u
npm i
```

> **Important!** dont't update `eslint-plugin-unused-imports`! It should be `2.0.0`

### Storybook

```bash
npm run storybook
```

### Link to another project

```bash
npm link
```

In target project:

```bash
npm link openbb-ui
```

Then build UI after any change:

```bash
npm run build
```

## Publish

```bash
npm version patch
npm run build
npm publish
```

### Chromatic (will be removed after CI integration)

```bash
npm run chromatic
```
