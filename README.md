# OpenBB Design System

Created on top of Figma [Styleguide](https://www.figma.com/file/Gbu811BkBJBtez3ajbr7lw/Styleguide?type=design&node-id=23-26&mode=design&t=ACcxkQNaADUUe1PL-4) and [Components](https://www.figma.com/file/RFg3HgmBqsbX3OuLaJTAbb/Components?type=design&node-id=1139-129&mode=dev).
Most of the components are based on [shadcn/ui](https://ui.shadcn.com/docs) which is based on [Radix UI](https://www.radix-ui.com/themes/docs). You can find more information and examples there.

## 0.8 Work in progress:

#### Atoms

- [x] Avatar
- [x] Button
- [x] Checkbox
- [x] CopyButton
- [x] RadioGroup
- [ ] Toggle
- [ ] Scroll bar
- [x] Dropdown (SelectTrigger, DropdownItem)
- [x] Tag
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

## Compatibility

This library is compatible with `React 18+`.

For bundle tool, please use `Vite 4 or 5`. Other bundlers haven't tested and might cause errors because of ES6 modules.
Type hints are available for TypeScript users with .d.ts files generated by [tsup](https://tsup.egoist.dev/).

## Installation

#### Step 1: Install the package

This library requires TailwindCSS to be installed in your project.

```bash
npm i -S @openbb/ui tailwindcss tailwindcss-animate
```

#### Step 2: Add TailwindCSS to your project

Modify `tailwind.config.ts`:

```js
import type { Config } from "tailwindcss";
import conf from "@openbb/ui/tailwind.config";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./node_modules/@openbb/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [conf],
  theme: {
    extend: {
      // ... you can override tailwind things here
    },
  },
} satisfies Config;
```

#### Step 3: Import styles

Modify your `index.css`:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
@import "@openbb/ui/dist/style.css";

@layer base {
  /* Overriding code here */
}
```

#### Step 4: Copy icons spritemap

And finally, copy icon assets to your public folder. Example for `vite.config.ts`:

```bash
npm i -D vite-plugin-static-copy
```

```js
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  // ...
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "./node_modules/@openbb/ui/dist/assets",
          dest: "",
        },
      ],
    }),
  ],
});
```

#### Step 4 (alternate): Import spritemap as a link

If your bundler does not support copying assets, you can override `Icon.defaultUrl` somewhere in your root code:

```js
import { Icon } from "@openbb/ui";
import spritemapUrl from "@openbb/ui/dist/assets/spritemap.svg";
Icon.defaultUrl = spritemapUrl;
```

## Development

### Install dependencies

```bash
npm ci
```

### Update dependencies

Use [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) to update dependencies.

```bash
ncu -x eslint-plugin-unused-imports -u
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

### CHANGELOGs

On every sufficient commit (fix, feat) you need to create a changeset. Follow instructions in terminal, pick modified packages and bump versions:

```bash
npx changeset
```

Keep in mind that if you change code in `common` package, you need to bump version of all packages that depend on it.

### Test on Chromatic (will be removed after CI integration)

Before making a PR, please test your changes on Chromatic:

```bash
npm run chromatic
```

If some tests failed and you know why, you need to review and approve changes by the following link.

### Publish packages

Then, run this command:

```bash
npm run publish-packages
```

and commit bumped versions.
