## Disable specific features

You can disable specific features of the preset by setting them to `false`:

```tsx
module.exports = {
  'postcss-preset-mantine': {
    features: {
      // Turn off `light-dark` function
      lightDarkFunction: false,

      // Turn off `postcss-nested` plugin
      nested: false,

      // Turn off `lighten`, `darken` and `alpha` functions
      colorMixAlpha: false,

      // Turn off `rem` and `em` functions
      remEmFunctions: false,

      // Turn off `postcss-mixins` plugin
      mixins: false,
    },
  },
};
```


--------------------------------------------------------------------------------

### Rem

# rem, em and px units

## rem units

All Mantine components use `rem` units to apply size styles (`margin`, `padding`, `width`, etc.).
By default, `1rem` is considered to be `16px`, as it is the default setting in most browsers.
All components scale based on the user's browser font-size settings or font-size of the `html`/`:root`.

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return (
    <Slider
      defaultValue={100}
      min={70}
      max={130}
      onChange={(value) => {
        document.documentElement.style.fontSize = `${value}%`;
      }}
    />
  );
}
```


## rem units scaling

If you want to change the font-size of the `:root`/`html` element and preserve Mantine component sizes,
set `scale` on the [theme](https://mantine.dev/llms/theming-theme-object.md) to the value of `1 / htmlFontSize`.

For example, if you set the `html` font-size to `10px` and want to scale Mantine components accordingly, you need
to set `scale` to `1 / (10 / 16)` (16 – default font-size) = `1 / 0.625` = `1.6`:

```css
:root {
  font-size: 10px;
}
```

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  scale: 1.6,
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## em units

`em` units are used in media queries the same way as `rem` units, but they are not affected by the font-size specified on the `html`/`:root` element.
`1em` is considered to be `16px`.

## px conversions

You can use numbers in some Mantine components props. Numbers are treated as `px` and converted to `rem`, for example:

```tsx
import { ColorSwatch } from '@mantine/core';

function DemoPx() {
  // Specify ColorSwatch size in px, it will be automatically converted to rem
  // Width and height of ColorSwatch in this case will be 32px / 16 = 2rem
  return <ColorSwatch color="#000" size={32} />;
}

function DemoRem() {
  // This demo will have the same size as previous one
  return <ColorSwatch color="#000" size="2rem" />;
}
```

The same conversion happens in [style props](https://mantine.dev/llms/styles-style-props.md):

```tsx
import { Box } from '@mantine/core';

function Demo() {
  // width: calc(2rem * var(--mantine-scale))
  // height: calc(1rem * var(--mantine-scale))
  return <Box w={32} h={16} />;
}
```

## rem and em function

`@mantine/core` package exports `rem` and `em` function that can be used to convert `px` into `rem`/`em`:

```tsx
import { em, rem } from '@mantine/core';

// numbers and values in px are converted to rem
rem(32); // -> calc(2rem * var(--mantine-scale))
em(32); // -> 2em
rem('16px'); // -> calc(1rem * var(--mantine-scale))
em('16px'); // -> 1em

rem('2rem'); // -> 2rem
em('2rem'); // -> 2rem

rem('50%'); // -> 50%
em('50%'); // -> 50%

rem('5vh'); // -> 5vh
em('5vh'); // -> 5vh

// mixed values are converted to rem
rem('16px 2rem'); // -> calc(1rem * var(--mantine-scale)) 2rem
```

## Convert rem to px

To convert `rem`/`em` to `px` use `px` function exported from `@mantine/core`:

```tsx
import { px } from '@mantine/core';

px('2rem'); // -> 32
px('10rem'); // -> 160
```

## rem/em functions in css files

You can use `rem` and `em` function in [css files](https://mantine.dev/llms/styles-css-modules.md) if
[postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md) is installed:

```css
.demo {
  font-size: rem(16px);

  @media (min-width: em(320px)) {
    font-size: rem(32px);
  }
}
```

## Convert px to rem automatically in css files

To convert `px` to `rem` automatically in css files, enable `autoRem` option in
[postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md) configuration:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
    },
  },
};
```


--------------------------------------------------------------------------------

### ResponsiveStyles

# Responsive styles

## Media queries

```tsx
// Demo.module.css
.demo {
  background-color: var(--mantine-color-blue-filled);
  color: var(--mantine-color-white);
  padding: var(--mantine-spacing-md);
  text-align: center;

  @media (min-width: em(750px)) {
    background-color: var(--mantine-color-red-filled);
  }
}

// Demo.tsx
import classes from './Demo.module.css';

function Demo() {
  return <div className={classes.demo}>Demo</div>;
}
```


## Configure breakpoints

`theme.breakpoints` are used in all responsive Mantine components. Breakpoints are expected to be set in `em` units.
You can configure these values with [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md):

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

Default `theme.breakpoints` values:

## Breakpoints variables in CSS modules

It is not possible to use CSS variables inside media queries – these values cannot be dynamically
generated by [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md). To use Mantine theme breakpoints
in your `.css` files, you will need the `postcss-simple-vars` package:

```bash
yarn add postcss-simple-vars
```

```bash
npm install postcss-simple-vars
```

Add it to your [PostCSS config](https://mantine.dev/llms/styles-postcss-preset.md) in `postcss.config.cjs`:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

Then you will be able to access these variables in your `.css` files:

```css
.demo {
  @media (max-width: $mantine-breakpoint-xs) {
    background-color: red;
  }
}
```

Will be transformed to:

```css
@media (max-width: 36em) {
  .demo {
    background-color: red;
  }
}
```

> **Dynamic breakpoints are not supported**
>
> Values that are defined in `postcss-simple-vars` config are static and
> are not connected to the [theme](https://mantine.dev/llms/theming-theme-object.md) – if values change,
> you will need to update them manually in both theme override and postcss config.

## hiddenFrom and visibleFrom props

All Mantine components that have a root element support the `hiddenFrom` and `visibleFrom` props.
These props accept a breakpoint (`xs`, `sm`, `md`, `lg`, `xl`) and hide the component when the
viewport width is less than or greater than the specified breakpoint:

```tsx
import { Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Button hiddenFrom="sm" color="orange">
        Hidden from sm
      </Button>
      <Button visibleFrom="sm" color="cyan">
        Visible from sm
      </Button>
      <Button visibleFrom="md" color="pink">
        Visible from md
      </Button>
    </Group>
  );
}
```


## Hidden and visible from as classes

If you are building a custom component and want to use the same logic as in the `hiddenFrom` and `visibleFrom` props
but you do not want to use Mantine components, you can use the `mantine-hidden-from-{x}` and `mantine-visible-from-{x}`
classes.

```tsx
function CustomComponent() {
  return (
    <>
      <div className="mantine-hidden-from-md">Hidden from md</div>
      <div className="mantine-visible-from-xl">Visible from xl</div>
    </>
  );
}
```

## Component size based on media query

Some components support the `size` prop, which changes various aspects of component appearance.
The `size` prop is not responsive – it is not possible to define different component sizes for different
screen sizes. Instead, you can render multiple components with different sizes and show/hide them
based on media queries with the `className` or `hiddenFrom`/`visibleFrom` props:

```tsx
// Demo.tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <TextInput size="xs" hiddenFrom="sm" label="My input" placeholder="My input" />
      <TextInput size="xl" visibleFrom="sm" label="My input" placeholder="My input" />
    </>
  );
}
```


## use-media-query hook

You can use [use-media-query hook](https://mantine.dev/llms/hooks-use-media-query.md) to change some of component props
based on media query. Note that this approach is not recommended for most of the cases if you have
ssr in your application (you use Next.js, React Router, Gatsby or any other framework that includes ssr)
as it may cause hydration mismatch. If you do not have ssr in your application (for example, if you use Vite),
then you can safely use this hook to change props of components or conditionally render components
based on hook return value.

[use-media-query hook](https://mantine.dev/llms/hooks-use-media-query.md) can be safely used to change props of components that are not rendered
on server side (modals, tooltips, etc.). In the following example, it is safe to use `useMediaQuery` hook to
change [Tooltip](https://mantine.dev/llms/core-tooltip.md) props as it is not rendered on server side:

```tsx
import { Tooltip, Button, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

function Demo() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Tooltip label={isMobile ? 'Mobile' : 'Desktop'}>
      <Button>Hover me</Button>
    </Tooltip>
  );
}
```


## use-matches hook

`use-matches` hook exported from `@mantine/core` is an alternative to [use-media-query](https://mantine.dev/llms/hooks-use-media-query.md)
if you need to match multiple media queries and values. It accepts an object with media queries as keys and
values at given breakpoint as values.

Note that `use-matches` hook uses the same logic as [use-media-query](https://mantine.dev/llms/hooks-use-media-query.md) under the hood,
it is not recommended to be used as a primary source of responsive styles, especially if you have ssr in your application.

In the following example:

* Starting from `theme.breakpoints.lg`, color will be `red.9`
* Between `theme.breakpoints.sm` and `theme.breakpoints.lg`, color will be `orange.9`
* Below `theme.breakpoints.sm`, color will be `blue.9`

```tsx
import { Box, useMatches } from '@mantine/core';

function Demo() {
  const color = useMatches({
    base: 'blue.9',
    sm: 'orange.9',
    lg: 'red.9',
  });

  return (
    <Box bg={color} c="white" p="xl">
      Box with color that changes based on screen size
    </Box>
  );
}
```


## Container queries

[Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries)
enable you to apply styles to an element based on the size of the element's container.
If, for example, a container has less space available in the surrounding context,
you can hide certain elements or use smaller fonts. Container queries are supported
in [all modern browsers](https://caniuse.com/css-container-queries).

You can use `rem` and `em` functions from [postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md#remem-functions)
in container queries. Note that CSS variables do not work in container queries and because of that
[rem scaling](https://mantine.dev/llms/styles-rem.md#rem-units-scaling) feature is not available. If you rely on this feature,
it is better to define breakpoints in `px` units.

```tsx
// Demo.module.css
.root {
  min-width: 200px;
  max-width: 100%;
  min-height: 120px;
  container-type: inline-size;
  overflow: auto;
  resize: horizontal;
}

.child {
  background-color: var(--mantine-color-dimmed);
  color: var(--mantine-color-white);
  padding: var(--mantine-spacing-md);

  @container (max-width: 500px) {
    background-color: var(--mantine-color-blue-filled);
  }

  @container (max-width: 300px) {
    background-color: var(--mantine-color-red-filled);
  }
}

// Demo.tsx
import classes from './Demo.module.css';

function Demo() {
  return (
    <div className={classes.root}>
      <div className={classes.child}>Resize parent element to see container query in action</div>
    </div>
  );
}
```


## Responsive style props

You can use object syntax to add responsive styles with [style props](https://mantine.dev/llms/styles-style-props.md).
Note that responsive style props are [less performant](https://mantine.dev/llms/styles-styles-performance.md) than regular style props,
it is not recommended to use them in large lists of elements.

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      w={{ base: 200, sm: 400, lg: 500 }}
      py={{ base: 'xs', sm: 'md', lg: 'xl' }}
      bg={{ base: 'blue.7', sm: 'red.7', lg: 'green.7' }}
      c="#fff"
      ta="center"
      mx="auto"
    >
      Box with responsive style props
    </Box>
  );
}
```


Responsive values are calculated the following way:

* `base` value is used when none of breakpoint values are applied
* `xs`, `sm`, `md`, `lg`, `xl` values are used when the viewport width is larger that the value of corresponding breakpoint specified in [theme.breakpoints](https://mantine.dev/llms/styles-responsive.md)

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return <Box w={{ base: 320, sm: 480, lg: 640 }} />;
}
```

In this case the element will have the following styles:

```css
/* Base styles added to element and then get overwritten with responsive values */
.element {
  width: 20rem;
}

/* 48em is theme.breakpoints.sm by default */
@media (min-width: 48em) {
  .element {
    width: 30rem;
  }
}

/* 75em is theme.breakpoints.lg by default */
@media (min-width: 75em) {
  .element {
    width: 40rem;
  }
}
```


--------------------------------------------------------------------------------

### Rtl

# Right-to-left direction

All Mantine components support right-to-left direction out of the box.
You can preview how components work with RTL direction by clicking the direction control
in the top right corner or pressing `Ctrl + Shift + L`.

## DirectionProvider

The `DirectionProvider` component is used to set direction for all components inside it.
It is required to wrap your application with `DirectionProvider` if you are planning to
either use RTL direction or change direction dynamically.

`DirectionProvider` supports the following props:

```tsx
export interface DirectionProviderProps {
  /** Your application */
  children: React.ReactNode;

  /** Direction set as a default value, `ltr` by default */
  initialDirection?: 'rtl' | 'ltr';

  /** Determines whether direction should be updated on mount based on the `dir` attribute set on the root element (usually the html element), `true` by default  */
  detectDirection?: boolean;
}
```

Setup `DirectionProvider` in your application:

```tsx
import { DirectionProvider, MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <DirectionProvider>
      <MantineProvider>{/* Your app here */}</MantineProvider>
    </DirectionProvider>
  );
}
```

## dir attribute

It is required to set the `dir` attribute on the root element of your application, usually the `html` element.
The `DirectionProvider` will use its value to set direction on mount if the `detectDirection` prop is set to `true`.
Note that this guide does not cover setting the `dir` attribute for different frameworks – follow your framework's
documentation to learn how to do it.

```html
<!doctype html>
<!-- Set direction attribute on html element -->
<html dir="rtl">
  <head></head>
  <body></body>
</html>
```

## useDirection hook

`useDirection` returns an object with the following properties:

* `dir` – current direction
* `setDirection` – function to set direction
* `toggleDirection` – function to change direction to the opposite value

You can use it to create direction control in your application:

```tsx
import { ActionIcon, useDirection } from '@mantine/core';
import { TextAlignLeftIcon, TextAlignRightIcon } from '@phosphor-icons/react';

function Demo() {
  const { toggleDirection, dir } = useDirection();
  return (
    <ActionIcon onClick={() => toggleDirection()} variant="default" size="lg">
      {dir === 'rtl' ? (
        <TextAlignLeftIcon />
      ) : (
        <TextAlignRightIcon />
      )}
    </ActionIcon>
  );
}
```


## rtl mixin

If you have [postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md) installed, then you can use the `rtl` mixin in `.css` files:

```tsx
// Demo.module.css
.demo {
  text-align: center;
  color: var(--mantine-color-white);
  padding: var(--mantine-spacing-md);

  /* LTR styles */
  background-color: var(--mantine-color-blue-filled);

  @mixin rtl {
    /* RTL styles override LTR styles */
    background-color: var(--mantine-color-red-filled);
  }
}

// Demo.tsx
import classes from './Demo.module.css';

function Demo() {
  return <div className={classes.demo}>Demo</div>;
}
```



--------------------------------------------------------------------------------

### UsageWithSass

# Usage with Sass

This guide will explain how to use [Sass](https://sass-lang.com/) in combination with
[postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md). Note that the examples on the mantine.dev website
use only `postcss-preset-mantine` – you will need to modify them to use with Sass.

## Sass modules

You can use Sass modules the same way as [CSS modules](https://mantine.dev/llms/styles-css-modules.md):

* Use `*.module.scss`/`*.module.sass` extension for your files to enable modules
* Use `*.scss`/`*.sass` extension for global styles

## Usage with Vite

Install `sass`:

```bash
yarn add sass-embedded
```

```bash
npm install sass-embedded
```

Add Mantine resources in your `vite.config.js` file:

```tsx
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "${path.join(process.cwd(), 'src/_mantine').replace(/\\/g, '/')}" as mantine;`,
      },
    },
  },
});
```

Create the `src/_mantine.scss` file:

```scss
@use 'sass:math';

// Define variables for your breakpoints,
// values must be the same as in your theme
$mantine-breakpoint-xs: '36em';
$mantine-breakpoint-sm: '48em';
$mantine-breakpoint-md: '62em';
$mantine-breakpoint-lg: '75em';
$mantine-breakpoint-xl: '88em';

@function rem($value) {
  @return #{math.div(math.div($value, $value * 0 + 1), 16)}rem;
}

@mixin light {
  [data-mantine-color-scheme='light'] & {
    @content;
  }
}

@mixin dark {
  [data-mantine-color-scheme='dark'] & {
    @content;
  }
}

@mixin hover {
  @media (hover: hover) {
    &:hover {
      @content;
    }
  }

  @media (hover: none) {
    &:active {
      @content;
    }
  }
}

@mixin smaller-than($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}

@mixin larger-than($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

// Add direction mixins if you need rtl support
@mixin rtl {
  [dir='rtl'] & {
    @content;
  }
}

@mixin ltr {
  [dir='ltr'] & {
    @content;
  }
}
```

All done! you can now use breakpoint variables, `rem` function, `hover`, `light`/`dark` mixins:

```scss
// example.module.scss
.title {
  // light-dark function is handled by PostCSS
  color: light-dark(
    var(--mantine-color-black),
    var(--mantine-color-white)
  );
  font-size: mantine.rem(100px);
  font-weight: 900;
  letter-spacing: mantine.rem(-2px);

  @include mantine.light {
    background-color: red;
  }

  @include mantine.dark {
    background-color: blue;
  }

  @include mantine.smaller-than(mantine.$mantine-breakpoint-md) {
    font-size: mantine.rem(50px);
  }
}
```

## Usage with Next.js

Install `sass`:

```bash
yarn add sass-embedded
```

```bash
npm install sass-embedded
```

Add mantine resources in your `next.config.mjs` file:

```tsx
import path from 'node:path';

export default {
  // ...other config
  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `@use "${path.join(process.cwd(), '_mantine').replace(/\\/g, '/')}" as mantine;`,
  },
};
```

Create `_mantine.scss` file in the root folder of your project:

```scss
@use 'sass:math';

// Define variables for your breakpoints,
// values must be the same as in your theme
$mantine-breakpoint-xs: '36em';
$mantine-breakpoint-sm: '48em';
$mantine-breakpoint-md: '62em';
$mantine-breakpoint-lg: '75em';
$mantine-breakpoint-xl: '88em';

@function rem($value) {
  @return #{math.div(math.div($value, $value * 0 + 1), 16)}rem;
}

@mixin light {
  [data-mantine-color-scheme='light'] & {
    @content;
  }
}

@mixin dark {
  [data-mantine-color-scheme='dark'] & {
    @content;
  }
}

@mixin hover {
  @media (hover: hover) {
    &:hover {
      @content;
    }
  }

  @media (hover: none) {
    &:active {
      @content;
    }
  }
}

@mixin smaller-than($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}

@mixin larger-than($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

// Add direction mixins if you need rtl support
@mixin rtl {
  [dir='rtl'] & {
    @content;
  }
}

@mixin ltr {
  [dir='ltr'] & {
    @content;
  }
}
```

All done! you can now use breakpoint variables, `rem` function, `hover`, `light`/`dark` mixins:

```scss
// example.module.scss
.title {
  // light-dark function is handled by PostCSS
  color: light-dark(
    var(--mantine-color-black),
    var(--mantine-color-white)
  );
  font-size: mantine.rem(100px);
  font-weight: 900;
  letter-spacing: mantine.rem(-2px);

  @include mantine.light {
    background-color: red;
  }

  @include mantine.dark {
    background-color: blue;
  }

  @include mantine.smaller-than(mantine.$mantine-breakpoint-md) {
    font-size: mantine.rem(50px);
  }
}
```


--------------------------------------------------------------------------------

### StyleProps

# Style props

With style props, you can add inline styles to any Mantine component.
Style props add styles to the **root** element. If you need to style nested elements,
use [Styles API](https://mantine.dev/llms/styles-styles-api.md) instead.

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box mx="auto" maw={400} c="blue.6" bg="#fff">
      Your component
    </Box>
  );
}
```

## Supported props

All Mantine components that have a root element support the following style props:

## Theme values

Some style props can reference values from the theme. For example, `mt` will use the `theme.spacing` value
if you set `xs`, `sm`, `md`, `lg`, `xl`:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <>
      {/* margin-top: theme.spacing.xs */}
      <Box mt="xs" />

      {/* margin-top: theme.spacing.md * -1 */}
      <Box mt="-md" />

      {/* margin-top: auto */}
      <Box mt="auto" />

      {/* margin-top: 1rem */}
      <Box mt={16} />

      {/* margin-top: 5rem */}
      <Box mt="5rem" />
    </>
  );
}
```

In the `c`, `bd` and `bg` props you can reference colors from `theme.colors`:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <>
      {/* color: theme.colors.blue[theme.primaryShade] */}
      <Box c="blue" />

      {/* background: theme.colors.orange[1] */}
      <Box bg="orange.1" />

      {/* border: 1px solid theme.colors.red[6] */}
      <Box bd="1px solid red.6" />

      {/* color: if colorScheme is dark `var(--mantine-color-dark-2)`,
      if color scheme is light `var(--mantine-color-gray-6)` */}
      <Box c="dimmed" />

      {/* color: if colorScheme is dark `var(--mantine-color-white)`,
      if color scheme is light `var(--mantine-color-black)` */}
      <Box c="bright" />

      {/* background: #EDFEFF */}
      <Box bg="#EDFEFF" />

      {/* background: rgba(0, 34, 45, 0.6) */}
      <Box bg="rgba(0, 34, 45, 0.6)" />
    </>
  );
}
```

## Responsive styles

You can use object syntax to add responsive styles with style props.
Note that responsive style props are [less performant](https://mantine.dev/llms/styles-styles-performance.md) than regular style props.
It is not recommended to use them in large lists of elements.

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      w={{ base: 200, sm: 400, lg: 500 }}
      py={{ base: 'xs', sm: 'md', lg: 'xl' }}
      bg={{ base: 'blue.7', sm: 'red.7', lg: 'green.7' }}
      c="#fff"
      ta="center"
      mx="auto"
    >
      Box with responsive style props
    </Box>
  );
}
```


Responsive values are calculated the following way:

* `base` value is used when none of breakpoint values are applied
* `xs`, `sm`, `md`, `lg`, `xl` values are used when the viewport width is larger than the value of the corresponding breakpoint specified in [theme.breakpoints](https://mantine.dev/llms/styles-responsive.md)

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return <Box w={{ base: 320, sm: 480, lg: 640 }} />;
}
```

In this case the element will have the following styles:

```css
/* Base styles added to the element and then get overwritten with responsive values */
.element {
  width: 20rem;
}

/* 48em is theme.breakpoints.sm by default */
@media (min-width: 48em) {
  .element {
    width: 30rem;
  }
}

/* 75em is theme.breakpoints.lg by default */
@media (min-width: 75em) {
  .element {
    width: 40rem;
  }
}
```


--------------------------------------------------------------------------------

### StyleProp

# Style prop

All Mantine components that have a root element support the `style` prop.
It works similarly to the React `style` prop, but with some additional features.

## Style object

You can pass a style object to the `style` prop – in this case it works the same way
as the React `style` prop. You can use Mantine [CSS variables](https://mantine.dev/llms/styles-css-variables.md) in the style object
the same way as in [.css files](https://mantine.dev/llms/styles-css-modules.md).

```tsx
import { Box, rem } from '@mantine/core';

function Demo() {
  return (
    <Box
      style={{
        color: 'var(--mantine-color-red-5)',
        fontSize: rem(12),
      }}
    />
  );
}
```

## Define CSS variables in style prop

You can define CSS variables in the style prop. Note that this only works with Mantine components:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      style={{ '--radius': '0.5rem', borderRadius: 'var(--radius)' }}
    />
  );
}
```

## Style function

You can pass a style function to the `style` prop – in this case it will be called with the [theme](https://mantine.dev/llms/theming-theme-object.md).
It is useful when you need to access [theme](https://mantine.dev/llms/theming-theme-object.md) properties that are not exposed as [CSS variables](https://mantine.dev/llms/styles-css-variables.md),
for example, properties from `theme.other`.

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      style={(theme) => ({
        color: theme.colors.red[5],
        fontSize: theme.fontSizes.xs,
      })}
    />
  );
}
```

## Styles array

You can pass an array of style objects and/or functions to the `style` prop – in this case, all styles will be merged into one object.
It is useful when you want to create a wrapper around a Mantine component, add inline styles and keep the option to pass
the `style` prop to it.

```tsx
import { Box, MantineStyleProp } from '@mantine/core';

interface DemoProps {
  style?: MantineStyleProp;
}

function Demo({ style }: DemoProps) {
  return <Box style={[{ color: 'red' }, style]} />;
}
```


--------------------------------------------------------------------------------

### StylesApi

# Styles API

## What is Styles API

The Styles API is a set of props and techniques that allows you to customize the style of any element
inside a Mantine component – inline or using the [theme object](https://mantine.dev/llms/theming-theme-object.md). All Mantine components that
have styles support the Styles API.

## Styles API selectors

Every Mantine component that supports the Styles API has a set of element names that can be used to
apply styles to inner elements inside the component. For simplicity, these element names are called
selectors in the Mantine documentation. You can find selector information under the `Styles API` tab
in a component's documentation.

Example of the [Button](https://mantine.dev/llms/core-button.md) component selectors:

You can use these selectors in `classNames` and `styles` in both component props and `theme.components`:

```tsx
import { Button, createTheme, MantineProvider } from '@mantine/core';

function ClassNamesDemo() {
  return (
    <Button
      classNames={{
        root: 'my-root-class',
        label: 'my-label-class',
        inner: 'my-inner-class',
      }}
    >
      Button
    </Button>
  );
}

function StylesDemo() {
  return (
    <Button
      styles={{
        root: { backgroundColor: 'red' },
        label: { color: 'blue' },
        inner: { fontSize: 20 },
      }}
    >
      Button
    </Button>
  );
}

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: {
        root: 'my-root-class',
        label: 'my-label-class',
        inner: 'my-inner-class',
      },
      styles: {
        root: { backgroundColor: 'red' },
        label: { color: 'blue' },
        inner: { fontSize: 20 },
      },
    }),
  },
});

function ProviderDemo() {
  return (
    <MantineProvider theme={theme}>
      <Button>Button</Button>
    </MantineProvider>
  );
}
```

## classNames prop

With the `classNames` prop you can add classes to inner elements of Mantine components. It accepts
an object with element names as keys and classes as values:

```tsx
import { useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0 || undefined;

  return (
    <TextInput
      label="Floating label input"
      labelProps={{ 'data-floating': floating }}
      classNames={{
        root: classes.root,
        input: classes.input,
        label: classes.label,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```


## classNames in theme.components

You can also define `classNames` in [`theme.components`](https://mantine.dev/llms/theming-theme-object.md) to apply them to all
components of a specific type:

```tsx
import { useState } from 'react';
import {
  createTheme,
  MantineProvider,
  TextInput,
} from '@mantine/core';
// Styles are the same as in previous example
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: {
        root: classes.root,
        input: classes.input,
        label: classes.label,
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Components CSS variables

Most of Mantine components use CSS variables to define colors, sizes, paddings and other
properties. You can override these values using a custom CSS variables resolver function
in [theme.components](https://mantine.dev/llms/theming-theme-object.md) or by passing it to the `vars` prop.

You can find CSS variables information under the `Styles API` tab in a component's documentation.
Example of [Button](https://mantine.dev/llms/core-button.md) component CSS variables:

Example of a custom CSS variables resolver function used to add more sizes to the [Button](https://mantine.dev/llms/core-button.md) component:

```tsx
// MantineProvider.tsx
import { Button, Group, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  components: {
    Button: Button.extend({
      vars: (theme, props) => {
        if (props.size === 'xxl') {
          return {
            root: {
              '--button-height': '60px',
              '--button-padding-x': '30px',
              '--button-fz': '24px',
            },
          };
        }

        if (props.size === 'xxs') {
          return {
            root: {
              '--button-height': '24px',
              '--button-padding-x': '10px',
              '--button-fz': '10px',
            },
          };
        }

        return { root: {} };
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button size="xxl">XXL Button</Button>
        <Button size="xxs">XXS Button</Button>
      </Group>
    </MantineProvider>
  );
}

// Inline.tsx
import { Button, PartialVarsResolver, ButtonFactory, Group } from '@mantine/core';

const varsResolver: PartialVarsResolver<ButtonFactory> = (theme, props) => {
  if (props.size === 'xxl') {
    return {
      root: {
        '--button-height': '60px',
        '--button-padding-x': '30px',
        '--button-fz': '24px',
      },
    };
  }

  if (props.size === 'xxs') {
    return {
      root: {
        '--button-height': '24px',
        '--button-padding-x': '10px',
        '--button-fz': '10px',
      },
    };
  }

  return { root: {} };
};

function Demo() {
  return (
    <Group>
      <Button vars={varsResolver} size="xxl">
        XXL Button
      </Button>
      <Button vars={varsResolver} size="xxs">
        XXS Button
      </Button>
    </Group>
  );
}
```


## styles prop

The `styles` prop works the same way as `classNames`, but applies inline styles. Note that inline
styles have higher specificity than classes, so you will not be able to override them with classes
without using `!important`. You cannot use pseudo-classes (for example, `:hover`, `:first-of-type`)
and media queries inside the `styles` prop.

```tsx
import { Button } from '@mantine/core';

function Demo() {
  const gradient =
    'linear-gradient(45deg, var(--mantine-color-pink-filled) 0%, var(--mantine-color-orange-filled) 50%, var(--mantine-color-yellow-filled) 100%)';

  return (
    <Button
      styles={{
        root: {
          padding: 2,
          border: 0,
          backgroundImage: gradient,
        },

        inner: {
          background: 'var(--mantine-color-body)',
          color: 'var(--mantine-color-text)',
          borderRadius: 'calc(var(--button-radius) - 2px)',
          paddingLeft: 'var(--mantine-spacing-md)',
          paddingRight: 'var(--mantine-spacing-md)',
        },

        label: {
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }}
    >
      Gradient button
    </Button>
  );
}
```


> **styles prop usage**
>
> Some examples and demos in the documentation use the `styles` prop for convenience, but it is not
> recommended to use the `styles` prop as the primary means of styling components, as the `classNames`
> prop is more flexible and has [better performance](https://mantine.dev/llms/styles-styles-performance.md).

## Styles API based on component props

You can also pass a callback function to `classNames` and `styles`. This function will receive
[theme](https://mantine.dev/llms/theming-theme-object.md) as first argument and component props as second. It should return
an object of classes (for `classNames`) or styles (for `styles`).

You can use this feature to conditionally apply styles based on component props. For example,
you can change the [TextInput](https://mantine.dev/llms/core-text-input.md) label color if the input is required or change the input
background color if the input is wrong:

```tsx
// Demo.tsx
import cx from 'clsx';
import { MantineProvider, createTheme, TextInput } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: (_theme, props) => ({
        label: cx({ [classes.labelRequired]: props.required }),
        input: cx({ [classes.inputError]: props.error }),
      }),
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <TextInput required label="Required input" placeholder="Required input" />
      <TextInput error label="Input with error" placeholder="Input with error" mt="md" />
    </MantineProvider>
  );
}

// Demo.module.css
.labelRequired {
  color: var(--mantine-color-red-filled);
}

.inputError {
  background-color: var(--mantine-color-red-light);
}
```


## Static classes

Every component that supports Styles API also includes static classes that can be used to style
component without using `classNames` or `styles` props. By default, static classes have
`.mantine-{ComponentName}-{selector}` format. For example, `root` selector of [Button](https://mantine.dev/llms/core-button.md)
component will have `.mantine-Button-root` class.

You can use static classes to style a component with CSS or [any other styling solution](https://mantine.dev/llms/styles-css-modules.md#styling-mantine-components-without-css-modules):

```css
.mantine-Button-root {
  background-color: red;
}
```

The prefix of static classes can be changed with `classNamesPrefix` of [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md#classnamesprefix).

## Components classes

Classes of each component are available in the `Component.classes` object. For example, you can
find the classes of [Button](https://mantine.dev/llms/core-button.md) in `Button.classes`:

You can use these classes to create components with the same styles as Mantine components:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return <button type="button" className={Button.classes.root} />;
}
```

## Attributes

You can pass attributes to inner elements of Mantine components using the `attributes` prop.
For example, it can be used to add data attributes for testing purposes:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      attributes={{
        root: { 'data-test-id': 'root' },
        label: { 'data-test-id': 'label' },
        inner: { 'data-test-id': 'inner' },
      }}
    >
      Button
    </Button>
  );
}
```


--------------------------------------------------------------------------------

### StylesOverview

# Styles overview

This guide will help you understand how to apply styles to Mantine and custom components.

## Component specific props

Most components provide props that allow you to customize their styles. For example,
the [Button](https://mantine.dev/llms/core-button.md) component has `color`, `variant`, `size` and `radius` props that control its
appearance:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return <Button variant="filled" color="blue" size="sm" radius="md">Button</Button>;
}
```


These props usually control multiple CSS properties. For example, the `color` and `variant` props control `color`,
`background-color` and `border` properties. In most cases, changing component props is the most optimal way to customize Mantine components.

## Style props

[Style props](https://mantine.dev/llms/styles-style-props.md) work similarly to component-specific props, but with several differences:

* Style props are not component-specific; they can be used with any component.
* Style props always control a single CSS property. For example, the `c` prop controls the CSS `color` property, while the `color` prop controls a set of properties: `color`, `background-color` and `border-color`.
* Style props are set in the `style` attribute. It is not possible to override them with CSS without using `!important`.

[Style props](https://mantine.dev/llms/styles-style-props.md) are useful when you need to change a single CSS property without creating a separate file for styles.
Some of the most common use cases are:

* Changing text color and font-size

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <div>
      <Text c="blue.8" fz="lg">
        Card title
      </Text>
      <Text c="dimmed" fz="sm">
        Card description
      </Text>
    </div>
  );
}
```

* Applying margins to inputs inside a form:

```tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <form>
      <TextInput label="First name" />
      <TextInput label="Last name" mt="md" />
      <TextInput label="Email" mt="md" />
    </form>
  );
}
```

* Adding padding to various elements:

```tsx
import { Paper } from '@mantine/core';

function Demo() {
  return <Paper p="xl">My custom card</Paper>;
}
```

Note that [style props](https://mantine.dev/llms/styles-style-props.md) were never intended to be used
as a primary way of styling components. In most cases, it is better to limit
the number of style props used per component to 3-4. If you find yourself using
more than 4 style props, consider creating a separate file with styles – it
will be easier to maintain and will be more [performant](https://mantine.dev/llms/styles-styles-performance.md).

## Style prop

[Style prop](https://mantine.dev/llms/styles-style.md) is supported by all Mantine components and allows setting
CSS properties as well as CSS variables. It is useful in the following cases:

* You want to apply a single CSS property to a component:

```tsx
import { Button, Flex } from '@mantine/core';

function Demo() {
  return (
    <Flex>
      <Button style={{ flex: 1 }}>Large button</Button>
      <Button>Small button</Button>
    </Flex>
  );
}
```

* You want to set a CSS variable based on component prop:

```tsx
import { Box } from '@mantine/core';

function Demo({ color }: { color: string }) {
  // Later you will be able to use var(--my-color) in any nested element
  return <Box style={{ '--my-color': color }}>My box</Box>;
}
```

[Style prop](https://mantine.dev/llms/styles-style.md) works the same way as React `style` prop. It is not
recommended to use it as a primary way of styling components. In most cases, it is
better to create a separate file with styles – it will be easier to maintain and
will be more [performant](https://mantine.dev/llms/styles-styles-performance.md).

## CSS modules

[CSS modules](https://mantine.dev/llms/styles-css-modules.md) is the recommended way of applying most of the styles to Mantine components.
CSS modules are the most performant and flexible way of styling components.

```scss
// Demo.module.css

.root {
  padding-right: 100px;

  &[data-collapsed] {
    padding-right: 40px;

    & .control {
      max-width: 200px;
    }
  }
}

.control {
  background-color: var(--mantine-color-blue-1);
  color: var(--mantine-color-blue-filled);
  padding: var(--mantine-spacing-xl);
  margin-left: 40px;

  @media (max-width: $mantine-breakpoint-sm) {
    margin-left: 0;
    margin-top: var(--mantine-spacing-md);
  }

  @mixin hover {
    background-color: light-dark(
      var(--mantine-color-blue-1),
      var(--mantine-color-blue-9)
    );
  }
}
```

```tsx
// Demo.tsx
import classes from './Demo.module.css';

function Demo({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={classes.root}
      data-collapsed={collapsed || undefined}
    >
      <button type="button" className={classes.control}>
        Control
      </button>
    </div>
  );
}
```

## Theme tokens

You can reference Mantine [theme](https://mantine.dev/llms/theming-theme-object.md) values in any styles with
[CSS variables](https://mantine.dev/llms/styles-css-variables.md):

* In [CSS modules](https://mantine.dev/llms/styles-css-modules.md):

```scss
.root {
  // references theme.colors.red[5]
  background: var(--mantine-color-red-5);

  // references theme.spacing.md
  margin-top: var(--mantine-spacing-md);

  // references theme.headings.fontFamily
  font-family: var(--mantine-font-family-headings);
}
```

* In [style props](https://mantine.dev/llms/styles-style-props.md):

```tsx
import { Box } from '@mantine/core';

function Demo() {
  // bg="red.5" references theme.colors.red[5]
  // "red.5" is a shorthand for var(--mantine-color-red-5)

  // mt="xl" references theme.spacing.xl
  // "xl" is a shorthand for var(--mantine-spacing-xl)
  return (
    <Box bg="red.5" mt="xl">
      My box
    </Box>
  );
}
```

* In [style prop](https://mantine.dev/llms/styles-style.md):

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <>
      <Box
        style={{
          margin: 'var(--mantine-spacing-xl)',
          color: 'var(--mantine-color-orange-5)',
        }}
      >
        With CSS variables
      </Box>

      <Box
        style={(theme) => ({
          margin: theme.spacing.xl,
          color: theme.colors.orange[5],
        })}
      >
        With theme object
      </Box>
    </>
  );
}
```


--------------------------------------------------------------------------------

### StylesPerformance

# Styles performance

## CSS modules

[CSS modules](https://mantine.dev/llms/styles-css-modules.md) is the most performant way to apply styles –
this approach generates static CSS that is never re-evaluated. 99% of Mantine component
styles are generated with CSS modules – components are optimized out of the box.

In most cases, it is recommended to use [CSS modules](https://mantine.dev/llms/styles-css-modules.md) to style your components as well.
You can apply styles to HTML elements with the `className` prop and to Mantine components with the `className`
and `classNames` props.

Applying styles with the `className`:

```tsx
import { Box } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Box className={classes.box}>
      Box component with <span className={classes.highlight}>some styles</span>
    </Box>
  );
}
```


Applying styles with `classNames` (see the [Styles API guide](https://mantine.dev/llms/styles-styles-api.md) to learn more):

```tsx
import { useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0 || undefined;

  return (
    <TextInput
      label="Floating label input"
      labelProps={{ 'data-floating': floating }}
      classNames={{
        root: classes.root,
        input: classes.input,
        label: classes.label,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```


## Inline styles

Inline styles (`style` and `styles` props) are less performant than CSS modules, but still
performant enough to be used in most cases if they are your preferred way of styling in your project.

Inline styles caveats:

* Styles are not reused between components; each component will generate its own styles. For example,
  if you have 100 buttons with the same styles, CSS modules will generate 1 class for all of them,
  while inline styles will generate 100 `style` attributes
* If inline styles are overused, they can increase bundle size and output HTML size
* *Not performance related*: inline styles have higher specificity than CSS modules, so if you want
  to override inline styles you will have to use `!important` or use other inline styles

Example of inline styles:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  const gradient =
    'linear-gradient(45deg, var(--mantine-color-pink-filled) 0%, var(--mantine-color-orange-filled) 50%, var(--mantine-color-yellow-filled) 100%)';

  return (
    <Button
      styles={{
        root: {
          padding: 2,
          border: 0,
          backgroundImage: gradient,
        },

        inner: {
          background: 'var(--mantine-color-body)',
          color: 'var(--mantine-color-text)',
          borderRadius: 'calc(var(--button-radius) - 2px)',
          paddingLeft: 'var(--mantine-spacing-md)',
          paddingRight: 'var(--mantine-spacing-md)',
        },

        label: {
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }}
    >
      Gradient button
    </Button>
  );
}
```


## Style props

[Style props](https://mantine.dev/llms/styles-style-props.md) transform component props into inline styles. Style props have
the same caveats as inline styles. It is not recommended to use them as the primary means of styling
your components. Usually, style props are used to apply 1–3 styles to a component – using them
this way does not impact performance.

