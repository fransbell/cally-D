## disabled

The `disabled` prop disables the component and prevents user interaction:

```tsx
import { AngleSlider } from '@mantine/core';

function Demo() {
  return <AngleSlider aria-label="Angle slider" disabled />;
}
```


## Accessibility

To make the component accessible for screen readers, set the `aria-label` prop:

```tsx
import { AngleSlider } from '@mantine/core';

function Demo() {
  return <AngleSlider aria-label="Gradient angle" />;
}
```

Keyboard interactions when the component is focused:

## Based on use-radial-move

`AngleSlider` is based on the [use-radial-move](https://mantine.dev/llms/hooks-use-radial-move.md) hook.
You can build a custom radial slider using this hook if you need more control over the component's behavior.

```tsx
// Demo.tsx
import { useState } from 'react';
import { Box } from '@mantine/core';
import { useRadialMove } from '@mantine/hooks';
import classes from './Demo.module.css';

function Demo() {
  const [value, setValue] = useState(115);
  const { ref } = useRadialMove(setValue);

  return (
    <Box className={classes.root} ref={ref} style={{ '--angle': `${value}deg` }}>
      <div className={classes.value}>{value}°</div>
      <div className={classes.thumb} />
    </Box>
  );
}

// Demo.module.css
.root {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  --empty-color: light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6));
  --filled-color: light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-8));

  background-image: conic-gradient(
    var(--filled-color) 0deg,
    var(--filled-color) var(--angle, 0deg),
    var(--empty-color) var(--angle, 0deg)
  );
}

.value {
  background-color: var(--mantine-color-body);
  width: 132px;
  height: 132px;
  border-radius: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb {
  position: absolute;
  width: 14px;
  height: 160px;
  transform: rotate(var(--angle, 0deg));

  &::before {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background-color: light-dark(var(--mantine-color-white), var(--filled-color));
    border: 2px solid light-dark(var(--filled-color), var(--mantine-color-white));
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
}
```



#### Props

**AngleSlider props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultValue | number | - | Uncontrolled component default value |
| disabled | boolean | - | Sets `data-disabled` attribute, disables interactions |
| formatLabel | (value: number) => ReactNode | - | A function to format label based on the current value |
| hiddenInputProps | React.ComponentProps<"input"> | - | Props passed down to the hidden input |
| marks | { value: number; label?: string; }[] \| undefined | - | Array of marks displayed on the slider |
| name | string | - | Hidden input name, use with uncontrolled component |
| onChange | (value: number) => void | - | Called on value change |
| onChangeEnd | (value: number) => void | - | Called after the selection is finished |
| onScrubEnd | () => void | - | Called in `onMouseUp` and `onTouchEnd` |
| onScrubStart | () => void | - | Called in `onMouseDown` and `onTouchStart` |
| restrictToMarks | boolean | - | If set, the selection is allowed only from the given marks array |
| size | number | - | Slider size in px |
| step | number | - | Step between values |
| thumbSize | number | - | Size of the thumb in px. Calculated based on the `size` value by default. |
| value | number | - | Controlled component value |
| withLabel | boolean | - | If set, the label is displayed inside the slider |


#### Styles API

AngleSlider component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**AngleSlider selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-AngleSlider-root | Root element |
| label | .mantine-AngleSlider-label | Label inside the slider |
| marks | .mantine-AngleSlider-marks | Wrapper for all marks |
| mark | .mantine-AngleSlider-mark | Mark element |
| thumb | .mantine-AngleSlider-thumb | Slider thumb |

**AngleSlider CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --slider-size | Controls slider width and height |
| root | --thumb-size | Controls thumb size |

**AngleSlider data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | disabled | `disabled` prop is set | - |


--------------------------------------------------------------------------------

### AppShell
Package: @mantine/core
Import: import { AppShell } from '@mantine/core';
Description: Responsive shell for your application with header, navbar, aside and footer

## Examples

This page contains documentation only. All `AppShell` components have a fixed
position; examples are included in a separate documentation section.

## Usage

`AppShell` is a layout component that can be used to create a common Header / Navbar / Footer / Aside
layout pattern. All `AppShell` components have `position: fixed` styling, so they do not scroll with
the page.

[Basic AppShell example](https://mantine.dev/app-shell?e=BasicAppShell) with header and navbar.
The navbar is hidden on mobile by default and can be toggled with the burger button.

```tsx
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />

        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar>Navbar</AppShell.Navbar>

      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
```

## AppShell components

* `AppShell` – root component that wraps all other sections and configures the overall layout.
* `AppShell.Header` – fixed header at the top, controlled by the `header` prop.
* `AppShell.Navbar` – fixed navbar on the left, controlled by the `navbar` prop.
* `AppShell.Aside` – fixed aside on the right, controlled by the `aside` prop.
* `AppShell.Footer` – fixed footer at the bottom, controlled by the `footer` prop.
* `AppShell.Main` – main content area, statically positioned and offset by the other sections.
* `AppShell.Section` – utility for grouping content inside `AppShell.Navbar` or `AppShell.Aside`, useful for scrollable areas.

## Configuration

The `AppShell` component accepts `header`, `footer`, `navbar`, and `aside` props to configure the corresponding sections.
You must set these props if you want to use the corresponding components.
For example, to use the `AppShell.Header` component, you need to set the `header` prop on the `AppShell` component.

`header` and `footer` configuration objects share the same type:

```tsx
interface Configuration {
  /** Height of the section: number, string or
   ** object with breakpoints as keys and height as values */
  height: AppShellSize | AppShellResponsiveSize;

  /** When collapsed is true, the section is hidden
   ** from the viewport and doesn't affect the AppShell.Main offset */
  collapsed?: boolean;

  /** Controls whether AppShell.Main should be offset by this section.
   ** Useful for scenarios like hiding a header based on scroll position. */
  offset?: boolean;
}
```

`navbar` and `aside` configuration objects type:

```tsx
interface Configuration {
  /** Width of the section: number, string, or
   ** object with breakpoints as keys and widths as values */
  width: AppShellSize | AppShellResponsiveSize;

  /** Breakpoint at which the section switches to mobile mode.
   ** In mobile mode, the section always has 100% width and its
   ** collapsed state is controlled by `collapsed.mobile`
   ** instead of `collapsed.desktop` */
  breakpoint: MantineBreakpoint | (string & {}) | number;

  /** Determines whether the section should be collapsed */
  collapsed?: { desktop?: boolean; mobile?: boolean };
}
```

## layout prop

`layout` prop controls how `AppShell.Header`/`AppShell.Footer` and `AppShell.Navbar`/`AppShell.Aside`
are positioned relative to each other. It accepts `alt` and `default` values:

* `alt` – `AppShell.Navbar`/`AppShell.Aside` extends the full viewport height, while `AppShell.Header`/`AppShell.Footer` width equals the viewport width minus the width of `AppShell.Navbar` and `AppShell.Aside` ([example](https://mantine.dev/app-shell?e=AltLayout))
* `default` – `AppShell.Navbar`/`AppShell.Aside` height equals the viewport height minus `AppShell.Header`/`AppShell.Footer` height, and `AppShell.Header`/`AppShell.Footer` spans the full viewport width ([example](https://mantine.dev/app-shell?e=FullLayout))

## Height configuration

The `height` property in `header` and `footer` configuration objects works as follows:

* If you pass a number, the value will be converted to [rem](https://mantine.dev/llms/styles-rem.md) and used as the
  height at all viewport sizes.
* To change height based on viewport width, use an object with breakpoints as keys and height as
  values. This works the same way as [style props](https://mantine.dev/llms/styles-style-props.md#responsive-styles).

Example with height as a number: `height` is converted to [rem](https://mantine.dev/llms/styles-rem.md),
and `height` remains the same at all viewport sizes:

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell header={{ height: 48 }}>
      <AppShell.Header>Header</AppShell.Header>
    </AppShell>
  );
}
```

Example with height as an object with breakpoints:

* `height` is 48 when viewport width is \< `theme.breakpoints.sm`
* `height` is 60 when viewport width is >= `theme.breakpoints.sm` and \< `theme.breakpoints.lg`
* `height` is 76 when viewport width is >= `theme.breakpoints.lg`

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell header={{ height: { base: 48, sm: 60, lg: 76 } }}>
      <AppShell.Header>Header</AppShell.Header>
    </AppShell>
  );
}
```

## Width configuration

The `width` property in `navbar` and `aside` configuration objects works as follows:

* If you pass a number, the value will be converted to [rem](https://mantine.dev/llms/styles-rem.md) and used as the
  width when the viewport is larger than `breakpoint`.
* To change width based on viewport width, use an object with breakpoints as keys and width as
  values. This works the same way as [style props](https://mantine.dev/llms/styles-style-props.md#responsive-styles).
  Note that width is always 100% when the viewport is smaller than `breakpoint`.

Example with width as a number: `width` is converted to [rem](https://mantine.dev/llms/styles-rem.md),
and `width` remains the same at viewport sizes larger than `breakpoint`.
The `width` is 100% when viewport width is less than `breakpoint`:

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell navbar={{ width: 48, breakpoint: 'sm' }}>
      <AppShell.Navbar>Navbar</AppShell.Navbar>
    </AppShell>
  );
}
```

Example with width as an object with breakpoints:

* `width` is 100% when viewport width is \< `theme.breakpoints.sm`
* `width` is 200 when viewport width is >= `theme.breakpoints.sm` and \< `theme.breakpoints.lg`
* `width` is 300 when viewport width is >= `theme.breakpoints.lg`

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell
      navbar={{ width: { sm: 200, lg: 300 }, breakpoint: 'sm' }}
    >
      <AppShell.Navbar>Navbar</AppShell.Navbar>
    </AppShell>
  );
}
```

## padding prop

The `padding` prop controls the padding of the `AppShell.Main` component. It's important to use this prop
instead of setting padding directly on `AppShell.Main` because this padding is also used to calculate offsets for
the `AppShell.Header`, `AppShell.Navbar`, `AppShell.Aside`, and `AppShell.Footer` components.

The `padding` prop works the same way as [style props](https://mantine.dev/llms/styles-style-props.md#responsive-styles) and
accepts numbers, strings, and objects with breakpoints as keys and padding values. You can
reference `theme.spacing` values or use any valid CSS value.

Example with static `padding` prop:

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return <AppShell padding="md">{/* AppShell content */}</AppShell>;
}
```

Example with responsive `padding` prop:

* `padding` is 10 when viewport width is \< `theme.breakpoints.sm`
* `padding` is 15 when viewport width is >= `theme.breakpoints.sm` and \< `theme.breakpoints.lg`
* `padding` is `theme.spacing.xl` when viewport width is >= `theme.breakpoints.lg`

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell padding={{ base: 10, sm: 15, lg: 'xl' }}>
      {/* AppShell content */}
    </AppShell>
  );
}
```

## Header offset configuration

The `header` prop includes an `offset` property that allows you to control
whether the `AppShell.Main` component is offset by the header's height.
This is particularly useful when you want to collapse the `AppShell.Header`
based on scroll position. For example, you can use the [use-headroom](https://mantine.dev/llms/hooks-use-headroom.md)
hook to hide the header when the user scrolls down and show it when they
scroll up ([example](https://mantine.dev/app-shell?e=Headroom)).

```tsx
import { AppShell, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

function Demo() {
  const { pinned } = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header>Header</AppShell.Header>

      <AppShell.Main
        pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}
      >
        {/* Content */}
      </AppShell.Main>
    </AppShell>
  );
}
```

## Collapsed navbar/aside configuration

The `navbar` and `aside` props include a `collapsed` property that accepts an object with the format `{ mobile: boolean; desktop: boolean }`.
This allows you to configure the collapsed state differently based on viewport width.

[Example](https://mantine.dev/app-shell?e=CollapseDesktop) with separate collapsed states for mobile and desktop:

```tsx
import { AppShell, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function CollapseDesktop() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] =
    useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>Header</AppShell.Header>
      <AppShell.Navbar>Navbar</AppShell.Navbar>
      <AppShell.Main>
        <Button onClick={toggleDesktop} visibleFrom="sm">
          Toggle navbar
        </Button>
        <Button onClick={toggleMobile} hiddenFrom="sm">
          Toggle navbar
        </Button>
      </AppShell.Main>
    </AppShell>
  );
}
```

## withBorder prop

The `withBorder` prop is available on `AppShell` and associated sections: `AppShell.Header`, `AppShell.Navbar`, `AppShell.Aside` and `AppShell.Footer`.
By default, `withBorder` prop is `true` – all components have a border on the side that is adjacent to the `AppShell.Main` component.
For example, `AppShell.Header` is located at the top of the page – it has a border on the bottom side,
`AppShell.Navbar` is located on the left side of the page – it has a border on the right side.

To remove the border from all components, set `withBorder={false}` on the `AppShell`:

```tsx
import { AppShell } from '@mantine/core';

// None of the components will have a border
function Demo() {
  return (
    <AppShell withBorder={false}>{/* AppShell content */}</AppShell>
  );
}
```

To remove the border from a specific component, set `withBorder={false}` on that component:

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell>
      <AppShell.Header withBorder={false}>Header</AppShell.Header>
    </AppShell>
  );
}
```

## zIndex prop

The `zIndex` prop is available on `AppShell` and its associated sections: `AppShell.Header`, `AppShell.Navbar`, `AppShell.Aside`, and `AppShell.Footer`.
By default, all sections have a `z-index` of `100`.

To change the `z-index` of all sections, set the `zIndex` prop on the `AppShell` component:

```tsx
import { AppShell } from '@mantine/core';

// All sections will have z-index of 200
function Demo() {
  return <AppShell zIndex={200}>{/* AppShell content */}</AppShell>;
}
```

To change `z-index` of a specific section, set `zIndex` prop on that section:

```tsx
import { AppShell } from '@mantine/core';

// AppShell.Header has z-index of 100
// AppShell.Navbar and AppShell.Aside have z-index of 300
function Demo() {
  return (
    <AppShell>
      <AppShell.Header zIndex={100}>Header</AppShell.Header>
      <AppShell.Navbar zIndex={300}>Navbar</AppShell.Navbar>
      <AppShell.Aside zIndex={300}>Aside</AppShell.Aside>
    </AppShell>
  );
}
```

## Control transitions

Use the `transitionDuration` and `transitionTimingFunction` props on the `AppShell` component to control section animations:

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return (
    <AppShell
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      {/* AppShell content */}
    </AppShell>
  );
}
```

## disabled prop

Set the `disabled` prop on the `AppShell` component to prevent all sections except `AppShell.Main` from rendering.
This is useful when you want to hide the shell on certain pages of your application.

```tsx
import { AppShell } from '@mantine/core';

function Demo() {
  return <AppShell disabled>{/* AppShell content */}</AppShell>;
}
```

## AppShell.Section component

`AppShell.Section` is used to create organized areas within `AppShell.Navbar` and `AppShell.Aside`.
Since these components are flexbox containers with `flex-direction: column`, the `AppShell.Section`
component with the `grow` prop will expand to fill the available space and can be made scrollable by setting
`component={ScrollArea}`.

In the following example:

* The first and last sections (header and footer) take only the space needed for their content
* The middle section with `grow` takes all the remaining space and becomes scrollable when content exceeds the available height

```tsx
import { AppShell, ScrollArea } from '@mantine/core';

function Demo() {
  return (
    <AppShell navbar={{ width: 300, breakpoint: 0 }}>
      <AppShell.Navbar>
        <AppShell.Section>Navbar header</AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          Navbar main section that will expand to fill available space
        </AppShell.Section>
        <AppShell.Section>
          Navbar footer – always at the bottom
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
```

## Semantic elements

Important: do not use a `<main>` element inside `AppShell.Main`, as only one `<main>` element is allowed per page.

## CSS variables

Example of using CSS variables in styles:

```scss
.main {
  min-height: calc(100dvh - var(--app-shell-header-height));
}
```


#### Props

**AppShell props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| aside | AppShellAsideConfiguration | - | `Aside` configuration, controls width, breakpoints and collapsed state. Required if you use `Aside` component. |
| disabled | boolean | - | If set, `Navbar`, `Aside`, `Header` and `Footer` components are hidden |
| footer | AppShellFooterConfiguration | - | `Footer` configuration, controls height, offset and collapsed state. Required if you use `Footer` component. |
| header | AppShellHeaderConfiguration | - | `Header` configuration, controls height, offset and collapsed state. Required if you use `Header` component. |
| layout | "default" \| "alt" | - | Determines how `Navbar`/`Aside` are arranged relative to `Header`/`Footer` |
| mode | "fixed" \| "static" | - | Determines positioning mode of all sections |
| navbar | AppShellNavbarConfiguration | - | `Navbar` configuration, controls width, breakpoints and collapsed state. Required if you use `Navbar` component. |
| offsetScrollbars | boolean | - | If set, `Header` and `Footer` components include styles to offset scrollbars. Based on `react-remove-scroll`. |
| padding | MantineSpacing \| AppShellResponsiveSize | - | Padding of the main section. Important: use `padding` prop instead of `p`. |
| transitionDuration | number | - | Duration of all transitions in ms |
| transitionTimingFunction | TransitionTimingFunction | - | Timing function of all transitions |
| withBorder | boolean | - | If set, the associated components have a border |
| zIndex | string \| number | - | `z-index` of all associated elements |

**AppShell.Aside props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| withBorder | boolean | - | If set, component haves a border, overrides `withBorder` prop on `AppShell` component |
| zIndex | React.CSSProperties["zIndex"] | - | Sets `z-index`. Inherited from the `AppShell` by default. |

**AppShell.Navbar props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| withBorder | boolean | - | If set, component haves a border, overrides `withBorder` prop on `AppShell` component |
| zIndex | React.CSSProperties["zIndex"] | - | Sets `z-index`. Inherited from the `AppShell` by default. |

**AppShell.Header props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| withBorder | boolean | - | If set, component haves a border, overrides `withBorder` prop on `AppShell` component |
| zIndex | React.CSSProperties["zIndex"] | - | Sets `z-index`. Inherited from the `AppShell` by default. |

**AppShell.Footer props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| withBorder | boolean | - | If set, component haves a border, overrides `withBorder` prop on `AppShell` component |
| zIndex | React.CSSProperties["zIndex"] | - | Sets `z-index`. Inherited from the `AppShell` by default. |

**AppShell.Section props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| grow | boolean | - | If set, the section expands to take all available space |


#### Styles API

AppShell component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**AppShell selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-AppShell-root | Root element (`AppShell` component) |
| navbar | .mantine-AppShell-navbar | `AppShell.Navbar` root element |
| header | .mantine-AppShell-header | `AppShell.Header` root element |
| main | .mantine-AppShell-main | `AppShell.Main` root element |
| aside | .mantine-AppShell-aside | `AppShell.Aside` root element |
| footer | .mantine-AppShell-footer | `AppShell.Footer` root element |
| section | .mantine-AppShell-section | `AppShell.Section` root element |

**AppShell CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --app-shell-transition-duration | Controls transition duration of all children |

**AppShell data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-resizing | User is resizing the window | - |
| root | data-layout | - | Value of the `layout` prop |
| root | data-disabled | `disabled` prop is set | - |


--------------------------------------------------------------------------------

### AspectRatio
Package: @mantine/core
Import: import { AspectRatio } from '@mantine/core';
Description: Maintain responsive consistent width/height ratio

## Usage

`AspectRatio` maintains a consistent width/height ratio.
It can be used to display images, maps, videos, and other media.

```tsx
import { AspectRatio } from '@mantine/core';

function Demo() {
  return (
    <AspectRatio ratio={1080 / 720} maw={300} mx="auto">
      <img
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
        alt="Panda"
      />
    </AspectRatio>
  );
}
```


## Map embed

```tsx
import { AspectRatio } from '@mantine/core';

function Demo() {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.3063874233135!2d-74.04668908358428!3d40.68924937933441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25090129c363d%3A0x40c6a5770d25022b!2sStatue%20of%20Liberty%20National%20Monument!5e0!3m2!1sen!2sru!4v1644262070010!5m2!1sen!2sru"
        title="Google map"
        style={{ border: 0 }}
      />
    </AspectRatio>
  );
}
```


## Video embed

```tsx
import { AspectRatio } from '@mantine/core';

function Demo() {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        src="https://www.youtube.com/embed/mzJ4vCjSt28"
        title="YouTube video player"
        style={{ border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  );
}
```


## Inside flex container

By default, `AspectRatio` does not have a fixed width and height – it will take as much space as possible
in a regular container. However, when used inside a flex container, it will not stretch to fill the available space.
To make it work inside a flexbox container, you need to set the `width` or `flex` property.

```tsx
import { AspectRatio, Image } from '@mantine/core';

function Demo() {
  return (
    <div style={{ display: 'flex' }}>
      <AspectRatio ratio={1} flex="0 0 100px">
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png"
          alt="Avatar"
        />
      </AspectRatio>
    </div>
  );
}
```



#### Props

**AspectRatio props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ratio | number | - | Aspect ratio, for example, `16 / 9`, `4 / 3`, `1920 / 1080` |


#### Styles API

AspectRatio component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**AspectRatio selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-AspectRatio-root | Root element |

**AspectRatio CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --ar-ratio | Aspect ratio |


--------------------------------------------------------------------------------

### Autocomplete
Package: @mantine/core
Import: import { Autocomplete } from '@mantine/core';
Description: Autocomplete user input with any list of options

## Not a searchable select

`Autocomplete` is not a searchable select, it is a text input with suggestions.
Values are not enforced to be one of the suggestions – users can type anything.
If you need a searchable select, use the [Select](https://mantine.dev/llms/core-select.md) component instead.
To learn more about the differences between `Autocomplete` and `Select`, check the
[help center article](https://help.mantine.dev/q/select-autocomplete-difference).

## Usage

`Autocomplete` provides users with a list of suggestions based on the input,
however users are not limited to suggestions and can type anything.

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Loading state

Set `loading` prop to display a loading indicator. By default, the loader is displayed on the right side of the input.
You can change the position with the `loadingPosition` prop to `'left'` or `'right'`. This is useful for async operations like API calls, searches, or validations:

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      loading
    />
  );
}
```


## Controlled

The `Autocomplete` value must be a string; other types are not supported.
The `onChange` function is called with a string value as a single argument.

```tsx
import { useState } from 'react';
import { Autocomplete } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  return <Autocomplete data={[]} value={value} onChange={setValue} />;
}
```

## Uncontrolled

`Autocomplete` can be used with uncontrolled forms the same way as a native `input` element.
Set the `name` attribute to include autocomplete value in `FormData` object on form submission.
To control the initial value in uncontrolled forms, use the `defaultValue` prop.

Example usage of uncontrolled `Autocomplete` with `FormData`:

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Autocomplete value:', formData.get('country'));
      }}
    >
      <Autocomplete
        label="Select your country"
        placeholder="Pick one"
        name="country"
        data={['United States', 'Canada', 'Mexico']}
        defaultValue="United States"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Select first option on change

Set the `selectFirstOptionOnChange` prop to automatically select the first option in the dropdown when the input value changes.
This feature allows users to type a value and immediately press `Enter` to select the first matching option,
without needing to press the arrow down key first.

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      selectFirstOptionOnChange
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## autoSelectOnBlur

Set the `autoSelectOnBlur` prop to automatically select the highlighted option when the input loses focus.
To see this feature in action: select an option with the up/down arrows, then click outside the input:

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      autoSelectOnBlur
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Data prop

Data that is used in Autocomplete must be an array of strings or objects with value and label properties. You can also specify additional properties that will be available in renderOption function.

## Filtering

Autocomplete provides built-in filtering functionality. You can control filtering behavior with filter prop or implement custom filtering logic.

```tsx
import { Autocomplete, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
  });
};

function Demo() {
  return (
    <Autocomplete
      label="Your country"
      placeholder="Pick value or enter anything"
      data={['Great Britain', 'Russian Federation', 'United States']}
      filter={optionsFilter}
    />
  );
}
```


## Sort options

By default, options are sorted by their position in the data array. You can change this behavior
with the `filter` function:

```tsx
import { Autocomplete, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  filtered.sort((a, b) => a.label.localeCompare(b.label));
  return filtered;
};

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['4 – React', '1 – Angular', '3 – Vue', '2 – Svelte']}
      filter={optionsFilter}
    />
  );
}
```


## Fuzzy search with fuse.js

You can implement fuzzy search using the [fuse.js](https://fusejs.io/) library to match options
even with typos or partial matches:

```tsx
import { Autocomplete, ComboboxItem, OptionsFilter } from '@mantine/core';
import Fuse from 'fuse.js';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  if (!search.trim()) {
    return options;
  }

  const fuse = new Fuse(options as ComboboxItem[], {
    keys: ['label'],
    threshold: 0.3,
    minMatchCharLength: 1,
  });

  return fuse.search(search).map((result) => result.item);
};

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte', 'Ember']}
      filter={optionsFilter}
    />
  );
}
```


## Large datasets

Autocomplete can handle large datasets efficiently. Consider implementing virtualization for datasets with thousands of items to improve performance.

```tsx
import { Autocomplete } from '@mantine/core';

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <Autocomplete
      label="100 000 options autocomplete"
      placeholder="Use limit to optimize performance"
      limit={5}
      data={largeData}
    />
  );
}
```


## renderOption

The `renderOption` callback allows you to customize option rendering. It is called with an option object.
The function must return a React node.

```tsx
import { Autocomplete, AutocompleteProps, Avatar, Group, Text } from '@mantine/core';

const usersData: Record<string, { image: string; email: string }> = {
  'Emily Johnson': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    email: 'emily92@gmail.com',
  },
  'Ava Rodriguez': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png',
    email: 'ava_rose@gmail.com',
  },
  'Olivia Chen': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
    email: 'livvy_globe@gmail.com',
  },
  'Ethan Barnes': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    email: 'ethan_explorer@gmail.com',
  },
  'Mason Taylor': {
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    email: 'mason_musician@gmail.com',
  },
};

const renderAutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => (
  <Group gap="sm">
    <Avatar src={usersData[option.value].image} size={36} radius="xl" />
    <div>
      <Text size="sm">{option.value}</Text>
      <Text size="xs" opacity={0.5}>
        {usersData[option.value].email}
      </Text>
    </div>
  </Group>
);

function Demo() {
  return (
    <Autocomplete
      data={['Emily Johnson', 'Ava Rodriguez', 'Olivia Chen', 'Ethan Barnes', 'Mason Taylor']}
      renderOption={renderAutocompleteOption}
      maxDropdownHeight={300}
      label="Employee of the month"
      placeholder="Search for employee"
    />
  );
}
```


## Nothing found message

The `Autocomplete` component does not support a nothing found message. It is designed to
accept any string as a value, so it does not make sense to show a nothing found message.
If you want to limit user input to suggestions, you can use a searchable [Select](https://mantine.dev/llms/core-select.md)
component instead. To learn more about the differences between `Autocomplete` and `Select`, check the
[help center article](https://help.mantine.dev/q/select-autocomplete-difference).

## Scrollable dropdown

By default, the options list is wrapped with [ScrollArea.Autosize](https://mantine.dev/llms/core-scroll-area.md).
You can control the dropdown max-height with the `maxDropdownHeight` prop if you do not change the default settings.

If you want to use native scrollbars, set `withScrollArea={false}`. Note that in this case,
you will need to change the dropdown styles with [Styles API](https://mantine.dev/llms/styles-styles-api.md).

```tsx
import { Autocomplete } from '@mantine/core';

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <>
      <Autocomplete
        label="With scroll area (default)"
        placeholder="Pick value or enter anything"
        data={data}
        maxDropdownHeight={200}
      />

      <Autocomplete
        label="With native scroll"
        placeholder="Pick value or enter anything"
        data={data}
        withScrollArea={false}
        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
        mt="md"
      />
    </>
  );
}
```


## Group options

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Express', 'Django'] },
      ]}
    />
  );
}
```


## Disabled options

When an option is disabled, it cannot be selected and is ignored in keyboard navigation.

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={[
        { value: 'React' },
        { value: 'Angular' },
        { value: 'Vue', disabled: true },
        { value: 'Svelte', disabled: true },
      ]}
    />
  );
}
```


## Inside Popover

To use `Autocomplete` inside popover, you need to set `withinPortal: false`:

```tsx
import { Popover, Button, Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Autocomplete
          label="Your favorite library"
          placeholder="Pick value or enter anything"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          comboboxProps={{ withinPortal: false }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Clearable

Set the `clearable` prop to display the clear button in the right section. The button is not displayed
when:

* The component does not have a value
* The component is disabled
* The component is read only

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      clearable
      defaultValue="React"
      data={['React', 'Angular']}
      label="Clearable autocomplete"
      placeholder="Clearable autocomplete"
    />
  );
}
```


```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import { Autocomplete, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Autocomplete
        label="clearSectionMode='both' (default)"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <Autocomplete
        label="clearSectionMode='rightSection'"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <Autocomplete
        label="clearSectionMode='clear'"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
```


## Control dropdown opened state

You can control the dropdown opened state with the `dropdownOpened` prop. Additionally,
you can use `onDropdownClose` and `onDropdownOpen` to listen to dropdown opened state changes.

```tsx
import { Autocomplete, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();
  return (
    <>
      <Button onClick={toggle} mb="md">
        Toggle dropdown
      </Button>

      <Autocomplete
        label="Your favorite library"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        dropdownOpened={dropdownOpened}
      />
    </>
  );
}
```


## Dropdown position

By default, the dropdown is displayed below the input if there is enough space; otherwise it is displayed above the input.
You can change this behavior by setting the `position` and `middlewares` props, which are passed down to the
underlying [Popover](https://mantine.dev/llms/core-popover.md) component.

Example of dropdown that is always displayed above the input:

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ position: 'top', middlewares: { flip: false, shift: false } }}
    />
  );
}
```


## Dropdown animation

By default, dropdown animations are disabled. To enable them, you can set `transitionProps`,
which will be passed down to the underlying [Transition](https://mantine.dev/llms/core-transition.md) component.

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    />
  );
}
```


## Dropdown padding

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <>
      <Autocomplete
        label="Zero padding"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <Autocomplete
        mt="md"
        label="10px padding"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 10 }}
      />
    </>
  );
}
```


## Dropdown shadow

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ shadow: 'md' }}
    />
  );
}
```


## Input sections

Autocomplete supports left and right sections to display icons, buttons or other content alongside the input.

```tsx
import { Autocomplete } from '@mantine/core';
import { SquaresFourIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <SquaresFourIcon size={16} />;
  return (
    <>
      <Autocomplete
        data={['React', 'Angular', 'Vue']}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Your favorite library"
        placeholder="Your favorite library"
      />
      <Autocomplete
        mt="md"
        data={['React', 'Angular', 'Vue']}
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="Your favorite library"
        placeholder="Your favorite library"
      />
    </>
  );
}
```


## Input props

Autocomplete component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. Autocomplete documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { Autocomplete } from '@mantine/core';


function Demo() {
  return (
    <Autocomplete
       variant="default" size="sm" radius="md" label="Input label" withAsterisk={false} description="Input description" error=""
      placeholder="Autocomplete placeholder"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Read only

Set `readOnly` to make the input read only. When `readOnly` is set,
`Autocomplete` will not show suggestions and will not call the `onChange` function.

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      readOnly
    />
  );
}
```


