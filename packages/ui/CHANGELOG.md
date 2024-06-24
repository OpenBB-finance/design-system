# @openbb/ui

## 0.13.3

### Patch Changes

- 39e9ed1: fix: add aria-labels to Carousel buttons
- c0309a1: fix: (AA-2637) switch off translateion on Select value.
- 2b742bb: fix: remove clip-path from icons
- b37275e: update dependencies, fix dependabot alerts
- use YARN: https://github.com/OpenBB-finance/design-system/pull/22#issue-2370214682

## 0.13.1

### Patch Changes

- d506855: fix!: title letter spacing

## 0.13.0

### Minor Changes (Breaking)

- bdcde59: fix!: typography
- 12832ca: fix: remove aktiv-grotesk-extended font (Downloading assets decreased by ~50KB)

### Patch Changes

- 65f6b71: fix: linkedin icon replaced

## 0.12.1

### Patch Changes

- 4f9566c: fix: add brand icons
- c4e9933: fix: Button loading state markup

## 0.12.0

### Minor Changes (Breaking)

- 718fc87: fix: add hash to spritemap file name

## 0.11.1

### Patch Changes

- bff8ee9: fix: add more icons

## 0.11.0

### Minor Changes (Breaking)

- 4d84e10: feat: export `cn` util, merge typography classes
  For example:

  ```tsx
  import { cn } from "@openbb/ui";

  cn("subtitle-xs-regular", "body-md-medium");
  // => "body-md-medium"
  ```

### Patch Changes

- 8094960: fix: ConfirmDialog now accept ReactNode in props
- 54f1731: fix: add icons: link-external-02
- e215113: fix: add icons: bar-chart-circle-01, dataflow-04, sliders-03, tag-01, users-plus

## 0.10.11

### Patch Changes

- 79598e7: fix: add Input size xs
- 8f4cb20: fix: outlined button disabled state
- ea5aed6: fix: add new color palette `ai`
- 8f7c584: feat: add Textarea component

## 0.10.9

### Patch Changes

- 329097d: fix: add new icons: folder, folder-open, folder-closed, dots-horizontal, dots-vertical

### Development Changes

- Upgrade Storybook to v8
- Upgrade other dependencies to latest versions
- Fixed all dependabot vulnerabilities
- Replace ESLint + Prettier to Biome

## 0.10.8

### Patch Changes

- cdcdb97: fix: add more icons

## 0.10.7

### Patch Changes

- c8b7118: fix: add nowrap to filled tabs

## null

### Patch Changes

- 42b5a76: fix: base dialog modal default true
- 17992ca: feat: filled tabs

## 0.10.5

### Patch Changes

- d50a60b: fix: add stroke-2.5 rule

## 0.10.4

### Patch Changes

- ab584da: feat: add stroke-width variable for icons
- `size` attr of Icon component is deprecated now

## 0.10.3

### Patch Changes

- 49f2ed9: fix: add bg-radial accent color

## 0.10.2

### Breaking Changes

- e2254aa: fix!: split css into chunks

### Patch Changes

- 507ad1c: fix: cssMinify
- 6650725: fix: typings

## 0.9.13

### Patch Changes

- a7860ea: fix: optimize tailwind config in bundle

## 0.9.12

### Patch Changes

- 6cec7a5: fix: add icons

## 0.9.11

### Patch Changes

- ef7795f: fix: add icons

## 0.9.10

### Patch Changes

- 1c31ad2: feat: add Pagination component

## 0.9.9

### Patch Changes

- 4f86013: fix: properly handle modals in base dialog

## 0.9.8

### Patch Changes

- ebfc15c: fix: optimize tailwind config

## 0.9.7

### Patch Changes

- e53ac1d: fix: change how we send the dialog attributes

## 0.9.6

### Patch Changes

- 0c7b52b: fix: made dialog modal attribute default to true

## 0.9.5

### Patch Changes

- 756d711: fix: add more icons

## 0.9.4

### Patch Changes

- feat: allow sending onPointerDownOutside to be sent to dialogcontent

## 0.9.3

### Patch Changes

- fix: remove the console.log

## 0.9.2

### Patch Changes

- a5a1f93: Feat: send additional props to BaseDialog
- aae427b: fix: Label's margin
- 9f9a409: fix: readonly options for Select

## 0.9.1

### Patch Changes

- fix: Confirm dialog spacings

## 0.9.0

### BREAKING Changes

- fd82dd1: fix!: container breakpoints that might break your markup

### Patch Changes

- 9f7463a: fix: change cancel button to outlined
- 9928fcb: feat: Added a loading option to the button component

## 0.8.6

### Patch Changes

- 30c00b4: fix: useBreakpoints SSR

## 0.8.5

### Patch Changes

- cc444ef: feat: Button new size xl
- 8a2cec9: feat: Carousel dots
- a3d122c: feat: useBreakpoints

## 0.8.4

### Patch Changes

- eca806f: fix: deprecate LinkButton
- 3aeafb3: fix: move Form and Tabs to molecules
- 2fb078b: fix: expose Tabs classes
- 6f52dc5: fix: move cancel button in confirm dialog

## 0.8.3

### Patch Changes

- fix: return back css file to bundle

## 0.8.2

### Patch Changes

- 01c6097: fix: typings path

## 0.8.1

### Patch Changes

- 1076810: fix: build tailwind config

## 0.8.0

### BREAKING Changes

- 8130a4c: fix!: KICK OUT UI-PRO! And merge into single package

## 0.7.10

### Patch Changes

- 3e02996: fix: dropdown menu classes

## 0.7.9

### Patch Changes

- f69403a: fix: GhostButton colors
- ba66424: fix: GhostButton width
- 5ff8a65: fix: forwardRef warnings
- 75eeab5: fix: carousel card

## 0.7.8

### Patch Changes

- 34d9f5c: feat: add Carousel to exports 🤡

## 0.7.7

### Patch Changes

- 54255ad: feat: add Carousel component

## 0.7.6

### Patch Changes

- 70a52d8: fix: make radials as plugin
- 6cdd080: fix: add more icons

## 0.7.5

### Patch Changes

- 5cecb97: fix: hat icon
- 00a1ee8: feat: add radial gradients

## 0.7.4

### Patch Changes

- 95f3c3c: fix: add couple more icons

## 0.7.3

### Patch Changes

- 3e896f9: fix: add couple new icons

## 0.7.2

### Patch Changes

- 0e3d588: fix: full support of ES modules

## 0.7.1

### Patch Changes

- 5d851d5: feat: adjustable Icon url

## 0.7.0

### BREAKING Changes

- 6783da7: fix!: building styles

## 0.6.10

### Patch Changes

- a589b21: fix: add PopoverClose

## 0.6.9

### Patch Changes

- e2a3c51: fix: update colors
- 96eb809: feat: add accent and warning button variants

## 0.6.8

### Patch Changes

- a90d1e1: fix: dialog overlay
- 170f299: fix: tabIndex at internal buttons in Input component

## 0.6.7

### Patch Changes

- 5dde645: fix: input paddings merged more precised

## 0.6.6

### Patch Changes

- 6d32a5c: fix package dependencies

## 0.6.5

### Patch Changes

- 67269c6: fix: common imports for better typings resolution

## 0.6.4

### Patch Changes

- 22096de: fix: more icons

## 0.6.3

### Patch Changes

- 2cc203d: fix: CopyButton style and size
- ab08985: fix: Input disabled state

## 0.6.2

### Patch Changes

- 640ec0e: fix: Input readonly and disabled states now interactive
- 3ba8a72: fix: Popover and CopyButton to Tooltip standards
- ba042de: fix: shadows

## 0.6.1

### Patch Changes

- 8e481ed: fix: remove dropdown borders

## 0.6.0

### BREAKING Changes

- 7976204: fix!: composed Tooltip

### Patch Changes

- 9991d52: fix: hr style
- 3a69fdb: feat: add shadows

## 0.5.11

### Patch Changes

- 8112c9b: fix: rebuild icons

## 0.5.10

### Patch Changes

- 167ed1b: feat: export DropdownMenu
- 572dd57: fix: icons colors and typings
- 44b02a2: fix: add more icons

## 0.5.9

### Patch Changes

- a9de9de: fix imports that doesn't work on 0.5.8 💀

## 0.5.8

### Patch Changes

- aa47aa6: feat: avatar component

## 0.5.7

### Patch Changes

- 19bc2b6: fix: icons display block

## 0.5.6

### Patch Changes

- a1d3d9d: fix: make form inputs more consistent
- 79e90d5: fix: aoutofilled input background

## 0.5.5

### Patch Changes

- 633ed17: feat: add icon name typings

## 0.5.4

### Patch Changes

- 00895fa: fix: typings

## 0.5.3

### Patch Changes

- b5acdf5: feat: add Tag component

## 0.5.2

deprecated: forgot to export Tag

## 0.5.1

### Patch Changes

- 0.5.0 is deprecated (did not bumped)

## 0.5.0

### BREAKING Changes

- fix!: Split Input component into Input and FormInput
- fix!: Split Select component into Select and FormSelect

### Patch Changes

- fix(common): add array of strings to Select options
- fix(common): add Label and Message components

## 0.4.2

### Patch Changes

- fix(common): radio group flex wrap

## 0.4.1

### Patch Changes

- fix(common): checkbox and radio titles

## 0.4.0

### Minor Changes

- fix(common): move components to common folder

## 0.3.9

### Patch Changes

- fix(common): include useForm hook to exports

## 0.3.8

### Patch Changes

- Fixed radio group styles
- Added RadioGroupLabel component
- Fixed SelectLabel style

## 0.3.7

### Patch Changes

- Added dialogs for Pro

## 0.3.6

### Patch Changes

- fixed dialog and typography
