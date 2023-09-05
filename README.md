# OpenBB Design System

Created on top of Figma [Styleguide](https://www.figma.com/file/Gbu811BkBJBtez3ajbr7lw/Styleguide?type=design&node-id=23-26&mode=design&t=ACcxkQNaADUUe1PL-4) and [Molecules](https://www.figma.com/file/zrku7cFZzdFFswOL5snYCj/Components---Molecules?type=design&node-id=1-5186&mode=dev).

## Installation

This library requires TailwindCSS to be installed in your project.

```bash
npm i -S openbb-ui tailwindcss tailwindcss-animate
```

Then add TailwindCSS into your `tailwind.config.js`:

```js
import ui from "openbb-ui/tailwind.config.js";

/** @type {import('tailwindcss').Config} */
export default {
  ...ui,
  // content: [],
  // theme: {
  //   extend: {},
  // },
  // plugins: [],
};
```

## Development

### Install dependencies

```bash
npm ci
```

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
npm run build
npm version patch
npm publish
```

### Chromatic (will be removed after CI integration)

```bash
npm run chromatic
```
