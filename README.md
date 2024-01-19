# OpenBB Design System

Created on top of Figma [Styleguide](https://www.figma.com/file/Gbu811BkBJBtez3ajbr7lw/Styleguide?type=design&node-id=23-26&mode=design&t=ACcxkQNaADUUe1PL-4) and [Molecules](https://www.figma.com/file/zrku7cFZzdFFswOL5snYCj/Components---Molecules?type=design&node-id=1-5186&mode=dev).

## 0.4 Work in progress:

#### Atoms

- [x] Button
- [x] Checkbox
- [x] CopyButton
- [x] RadioGroup
- [ ] Toggle
- [ ] Scroll bar
- [x] Dropdown (SelectTrigger, DropdownItem)
- [ ] Tag
- [ ] Background
- [x] Tooltip & Popover
- [ ] Loader
- [x] Input

#### Molecules

- [x] Menu items (SelectContent, SelectItem, DropdownMenuContent, DropdownMenuItem)
- [x] Select (Dropdown + Menu items)
- [ ] Color picker
- [ ] Sidebar
- [ ] Chips
- [x] Dialog (Modal)
- [x] BaseDialog
- [x] ConfirmDialog
- [ ] Tab
- [ ] Error
- [x] Toast message (Alert)
- [ ] Calendar

#### Organisms (Not sure about this should be in design system)

- [ ] Widgets
- [ ] AI Chat
- [ ] Table

## Compatibility

This library is compatible with `React 18+`.

For bundle tool, please use `Vite 4`. Other bundlers haven't tested and might cause errors because of ES6 modules.
Type hints are available for TypeScript users without .d.ts files because of using this [pattern](https://turbo.build/blog/you-might-not-need-typescript-project-references#internal-typescript-packages)

## Installation

This library requires TailwindCSS to be installed in your project.

```bash
npm i -S @openbb/ui tailwindcss tailwindcss-animate
```

or

```bash
npm i -S @openbb/ui-pro tailwindcss tailwindcss-animate
```

Then add TailwindCSS into your `tailwind.config.js`:

```js
import type { Config } from "tailwindcss";
import ui from "@openbb/ui/tailwind.config";

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

```css
@import "@openbb/ui/dist/style.css";
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
cd packages/ui
npm link
```

In target project:

```bash
npm link @openbb/ui
```

Then build UI after any change:

```bash
npm run build
```

## Publish

At first, create a changeset. Follow instructions in terminal, pick modified packages and bump versions:

```bash
npx changeset
```

Then, run this command

```bash
npm run publish-packages
```

### Chromatic (will be removed after CI integration)

```bash
npm run chromatic
```
