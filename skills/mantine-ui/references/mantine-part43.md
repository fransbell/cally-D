## Theme properties

### autoContrast

`autoContrast` controls whether text color should be changed based on the given `color` prop
in the following components:

* [ActionIcon](https://mantine.dev/llms/core-action-icon.md) with `variant="filled"` only
* [Alert](https://mantine.dev/llms/core-alert.md) with `variant="filled"` only
* [Avatar](https://mantine.dev/llms/core-avatar.md) with `variant="filled"` only
* [Badge](https://mantine.dev/llms/core-badge.md) with `variant="filled"` only
* [Button](https://mantine.dev/llms/core-button.md) with `variant="filled"` only
* [Chip](https://mantine.dev/llms/core-chip.md) with `variant="filled"` only
* [NavLink](https://mantine.dev/llms/core-nav-link.md) with `variant="filled"` only
* [ThemeIcon](https://mantine.dev/llms/core-theme-icon.md) with `variant="filled"` only
* [Checkbox](https://mantine.dev/llms/core-checkbox.md) with `variant="filled"` only
* [Radio](https://mantine.dev/llms/core-radio.md) with `variant="filled"` only
* [Tabs](https://mantine.dev/llms/core-tabs.md) with `variant="pills"` only
* [SegmentedControl](https://mantine.dev/llms/core-segmented-control.md)
* [Stepper](https://mantine.dev/llms/core-stepper.md)
* [Pagination](https://mantine.dev/llms/core-pagination.md)
* [Progress](https://mantine.dev/llms/core-progress.md)
* [Indicator](https://mantine.dev/llms/core-indicator.md)
* [Timeline](https://mantine.dev/llms/core-timeline.md)
* [Spotlight](https://mantine.dev/llms/x-spotlight.md)
* All [@mantine/dates](https://mantine.dev/llms/dates-getting-started.md) components that are based on [Calendar](https://mantine.dev/llms/dates-calendar.md) component

`autoContrast` checks whether the given color luminosity is above or below the `luminanceThreshold` value
and changes text color to either `theme.white` or `theme.black` accordingly.

`autoContrast` can be set globally on the theme level or individually for each component via the `autoContrast` prop,
except for [Spotlight](https://mantine.dev/llms/x-spotlight.md) and [@mantine/dates](https://mantine.dev/llms/dates-getting-started.md) components which only support the global theme setting.

```tsx
import { Button, Code, Group } from '@mantine/core';

function Demo() {
  return (
    <>
      <Code>autoContrast: true</Code>
      <Group mt="xs" mb="lg">
        <Button color="lime.4" autoContrast>
          Lime.4 button
        </Button>
        <Button color="blue.2" autoContrast>
          Blue.2 button
        </Button>
        <Button color="orange.3" autoContrast>
          Orange.3 button
        </Button>
      </Group>

      <Code>autoContrast: false</Code>
      <Group mt="xs">
        <Button color="lime.4">Lime.4 button</Button>
        <Button color="blue.2">Blue.2 button</Button>
        <Button color="orange.3">Orange.3 button</Button>
      </Group>
    </>
  );
}
```


### luminanceThreshold

`luminanceThreshold` controls which luminance value is used to determine if text color should be light or dark.
It is used only if `theme.autoContrast` is set to `true`. The default value is `0.3`.

```tsx
import { Button, createTheme, MantineProvider, Stack } from '@mantine/core';

const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.3,
});

function Wrapper(props: any) {
  const buttons = Array(10)
    .fill(0)
    .map((_, index) => (
      <Button
        key={index}
        color=${
          parseThemeColor({ theme: DEFAULT_THEME, color: props.color }).isThemeColor
            ?
```


### focusRing

`theme.focusRing` controls focus ring styles, it supports the following values:

* `auto` (default and recommended) – focus ring is visible only when the user navigates with a keyboard, this is the default browser behavior for native interactive elements
* `always` – focus ring is visible when the user navigates with a keyboard and mouse, for example, the focus ring will be visible when the user clicks on a button
* `never` – focus ring is always hidden; it is not recommended – users who navigate with a keyboard will not have visual indication of the current focused element

```tsx
function Demo() {
  return (
    <>
      <Text>
        Focus ring: <Code>auto</Code>
      </Text>

      <Group mt="xs">
        <Button size="xs">Button 1</Button>
        <Button size="xs">Button 2</Button>
      </Group>

      <MantineThemeProvider inherit theme={{ focusRing: 'always' }}>
        <Text mt="lg">
          Focus ring: <Code>always</Code>
        </Text>

        <Group mt="xs">
          <Button size="xs">Button 1</Button>
          <Button size="xs">Button 2</Button>
        </Group>
      </MantineThemeProvider>

      <MantineThemeProvider inherit theme={{ focusRing: 'never' }}>
        <Text mt="lg">
          Focus ring: <Code>never</Code>
        </Text>

        <Group mt="xs">
          <Button size="xs">Button 1</Button>
          <Button size="xs">Button 2</Button>
        </Group>
      </MantineThemeProvider>
    </>
  );
}
```


### focusClassName

`theme.focusClassName` is a CSS class that is added to elements that have focus styles, for example, [Button](https://mantine.dev/llms/core-button.md) or [ActionIcon](https://mantine.dev/llms/core-action-icon.md).
It can be used to customize focus ring styles of all interactive components except inputs. Note that when `theme.focusClassName` is set, `theme.focusRing` is ignored.



> **:focus-visible selector**
>
> `:focus-visible` selector is supported by more than [91% of browsers](https://caniuse.com/css-focus-visible) (data from April 2023).
> Safari browsers added support for it in version 15.4 (released in March 2022). If you need to support Safari 15.3 and older, you can use [focus-visible polyfill](https://github.com/WICG/focus-visible)
> or provide a [fallback](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible#providing_a_focus_fallback) with `:focus` pseudo-class.

### activeClassName

`theme.activeClassName` is a CSS class that is added to elements that have active styles, for example, [Button](https://mantine.dev/llms/core-button.md) or [ActionIcon](https://mantine.dev/llms/core-action-icon.md).
It can be used to customize active styles of all interactive components.



To disable active styles for all components, set `theme.activeClassName` to an empty string:

```tsx
import { MantineProvider, Button } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider theme={{ activeClassName: '' }}>
      <Button>No active styles</Button>
    </MantineProvider>
  );
}
```


### defaultRadius

`theme.defaultRadius` controls the default `border-radius` property in most components, for example, [Button](https://mantine.dev/llms/core-button.md) or [TextInput](https://mantine.dev/llms/core-text-input.md).
You can set it to either one of the values from `theme.radius` or a number/string to use an exact value. Note that numbers are treated as pixels, but
converted to rem. For example, `theme.defaultRadius: 4` will be converted to `0.25rem`.
You can learn more about rem conversion in the [rem units guide](https://mantine.dev/llms/styles-rem.md).

```tsx
import { MantineProvider, TextInput, Button } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider theme={{ defaultRadius: 'sm' }}>
      <Button fullWidth>Button with defaultRadius</Button>
      <TextInput mt="sm" label="TextInput with defaultRadius" placeholder="TextInput with default radius" />
    </MantineProvider>
  );
}
```


### cursorType

`theme.cursorType` controls the default cursor type for interactive elements
that do not have `cursor: pointer` styles by default. For example, [Checkbox](https://mantine.dev/llms/core-checkbox.md) and [NativeSelect](https://mantine.dev/llms/core-native-select.md).

```tsx
import { MantineProvider, createTheme, Checkbox } from '@mantine/core';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <>
      <Checkbox label="Default cursor" />

      <MantineProvider theme={theme}>
        <Checkbox label="Pointer cursor" mt="md" />
      </MantineProvider>
    </>
  );
}
```


### defaultGradient

`theme.defaultGradient` controls the default gradient configuration for components that support `variant="gradient"`
([Button](https://mantine.dev/llms/core-button.md), [ActionIcon](https://mantine.dev/llms/core-action-icon.md), [Badge](https://mantine.dev/llms/core-badge.md), etc.).

```tsx
import { MantineProvider, createTheme, Button } from '@mantine/core';

const theme = createTheme({
  defaultGradient: {
    from: 'orange',
    to: 'red',
    deg: 45,
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Button variant="gradient">Button with custom default gradient</Button>
    </MantineProvider>
  );
}
```


### fontWeights

`theme.fontWeights` controls `font-weight` values used in all components.
The default values are `regular: 400`, `medium: 600`, `bold: 700`.
Each value is mapped to a CSS variable: `--mantine-font-weight-regular`, `--mantine-font-weight-medium`, `--mantine-font-weight-bold`.

For example, to revert the medium font weight from `600` back to `500` (the default in Mantine 8):

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontWeights: {
    medium: '500',
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

### components

`theme.components` allows overriding of components' [default props](https://mantine.dev/llms/theming-default-props.md) and styles with `classNames` and `styles` properties.
You can learn more about these features in the [default props](https://mantine.dev/llms/theming-default-props.md) and [Styles API](https://mantine.dev/llms/styles-styles-api.md) guides.

### other

`theme.other` is an object that can be used to store any other properties that you want to access with the theme object.

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  other: {
    charcoal: '#333333',
    primaryHeadingSize: 45,
    fontWeights: {
      bold: 700,
      extraBold: 900,
    },
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

## Store theme override object in a variable

To store a theme override object in a variable, use the `createTheme` function:

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const myTheme = createTheme({
  primaryColor: 'orange',
  defaultRadius: 0,
});

function Demo() {
  return (
    <MantineProvider theme={myTheme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Merge multiple theme overrides

Use the `mergeThemeOverrides` function to merge multiple themes into one theme override object:

```tsx
import {
  createTheme,
  MantineProvider,
  mergeThemeOverrides,
} from '@mantine/core';

const theme1 = createTheme({
  primaryColor: 'orange',
  defaultRadius: 0,
});

const theme2 = createTheme({
  cursorType: 'pointer',
});

// Note: It is better to store the theme override outside of the component body
// to prevent unnecessary re-renders
const myTheme = mergeThemeOverrides(theme1, theme2);

function Demo() {
  return (
    <MantineProvider theme={myTheme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## use-mantine-theme hook

The `useMantineTheme` hook returns the theme object from [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) context:

```tsx
import { useMantineTheme } from '@mantine/core';

function Demo() {
  const theme = useMantineTheme();
  return <div style={{ background: theme.colors.blue[5] }} />;
}
```

## Default theme

You can import the default theme object from the `@mantine/core` package. It includes
all theme properties with default values. When you pass a theme override to
[MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md), it will be deeply merged with
the default theme.

```tsx
import { DEFAULT_THEME } from '@mantine/core';
```

## Access theme outside of components

To access theme outside of components, you need to create a full theme object
(your theme override merged with the default theme).

```tsx
// theme.ts
import {
  createTheme,
  DEFAULT_THEME,
  mergeMantineTheme,
} from '@mantine/core';

const themeOverride = createTheme({
  primaryColor: 'orange',
  defaultRadius: 0,
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
```

Then you will be able to import it anywhere in your application:

```tsx
import { theme } from './theme';
```


--------------------------------------------------------------------------------

### Typography
Package: @mantine/core
Import: import { Typography } from '@mantine/core';
Description: Styles provider for html content

# Typography

## Change fonts

You can change fonts and other text styles for headings, code, and all other components with the following theme properties:

* `theme.fontFamily` – controls font-family in all components except [Title](https://mantine.dev/llms/core-title.md), [Code](https://mantine.dev/llms/core-code.md), and [Kbd](https://mantine.dev/llms/core-kbd.md)
* `theme.fontFamilyMonospace` – controls font-family of components that require monospace font: [Code](https://mantine.dev/llms/core-code.md), [Kbd](https://mantine.dev/llms/core-kbd.md), and [CodeHighlight](https://mantine.dev/llms/x-code-highlight.md)
* `theme.headings.fontFamily` – controls font-family of h1-h6 tags in [Title](https://mantine.dev/llms/core-title.md) and [Typography](https://mantine.dev/llms/core-typography.md) components; falls back to `theme.fontFamily` if not defined

```tsx
import { Button, Code, Title, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Outfit, sans-serif' },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Title order={3}>Outfit or sans-serif title</Title>
      <Button>Verdana button</Button>
      <Code>Monaco, Courier Code</Code>
    </MantineProvider>
  );
}
```


## System fonts

By default, Mantine uses system fonts. This means that different devices will display components based on the available font.
For example, macOS and iOS users will see the [San Francisco font](https://developer.apple.com/fonts/),
Windows users will see the [Segoe UI font](https://docs.microsoft.com/en-us/typography/font-list/segoe-ui),
Android users will see the [Roboto font](https://fonts.google.com/specimen/Roboto), and so on.
This approach provides a familiar experience to users and allows avoiding common problems
related to custom fonts loading (layout shift, invisible text, etc.). If you do not have strict
requirements, it is recommended to use system fonts for better performance.

Default values for theme properties:

* Default value for `theme.fontFamily` and `theme.headings.fontFamily` is `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`
* Default value for `theme.fontFamilyMonospace` is `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`

## Font sizes

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <Text fz="md" lh="md">
      Paras is an orange, insectoid Pokémon that resembles the nymph stage of a cicada. Its ovoid
      body is segmented, and it has three pairs of legs. The foremost pair of legs is the largest
      and has sharp claws at the tips. There are five specks on its forehead and three teeth on
      either side of its mouth. It has circular eyes with large pseudopupils.
    </Text>
  );
}
```


The `theme.fontSizes` property defines font-size values for all Mantine components:

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontSizes: {
    xs: 10,
    sm: 11,
    md: 14,
    lg: 16,
    xl: 20,
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

Default `theme.fontSizes` values:

## Line heights

The `theme.lineHeights` property defines line-height values for the [Text](https://mantine.dev/llms/core-text.md) component;
most other components use `theme.lineHeights.md` by default:

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.65',
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

Default `theme.lineHeights` values:

## h1-h6 styles

To customize headings styles in [Title](https://mantine.dev/llms/core-title.md) and [Typography](https://mantine.dev/llms/core-typography.md) components,
set `theme.headings`:

```tsx
import { createTheme, MantineProvider, rem } from '@mantine/core';

const theme = createTheme({
  headings: {
    // properties for all headings
    fontWeight: '400',
    fontFamily: 'Roboto',

    // properties for individual headings, all of them are optional
    sizes: {
      h1: {
        fontWeight: '100',
        fontSize: 36,
        lineHeight: '1.4',
      },
      h2: { fontSize: 30, lineHeight: '1.5' },
      // ...up to h6
      h6: { fontWeight: '900' },
    },
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

With `theme.headings` you can customize font-size, font-weight, and line-height per heading level.
If you need more control over styles, use the [:is selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:is)
with the [Styles API](https://mantine.dev/llms/styles-styles-api.md) to target a specific heading level:

```tsx
import { Title, MantineProvider } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Title: Title.extend({
      classNames: {
        root: classes.heading,
      },
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Title order={1}>Heading 1</Title>
      <Title order={2}>Heading 2</Title>
      <Title order={3}>Heading 3</Title>
      <Title order={4}>Heading 4</Title>
      <Title order={5}>Heading 5</Title>
      <Title order={6}>Heading 6</Title>
    </MantineThemeProvider>
  );
}
```



--------------------------------------------------------------------------------

## STYLES COMPONENTS AND FEATURES

### ColorFunctions

# Color functions

The `@mantine/core` package exports several functions that can be used to manipulate colors
or extract information before using them as CSS values.

## darken and lighten

The `darken` and `lighten` functions can be used to manipulate color brightness.
They accept a color in any format as the first argument and the amount of lightness to add/remove as the second argument.

```tsx
import { darken, lighten } from '@mantine/core';

lighten('#228BE6', 0.1); // lighten by 10%
// -> rgba(56, 151, 233, 1)

darken('rgb(245, 159, 0)', 0.5); // darken by 50%
// -> rgba(123, 80, 0, 1)

darken('rgba(245, 159, 0, .3)', 0.5); // darken by 50%
// -> rgba(123, 80, 0, 1, .3)

lighten('var(--mantine-color-gray-4)', 0.74);
// -> color-mix(in srgb, var(--mantine-color-gray-4), white 74%)
```

## alpha

The `alpha` function converts a color to rgba format with a given alpha channel.
It is usually used to make colors more transparent. If it is not possible to convert the color to rgba
format (for example, if the color is a CSS variable), the function will use [color-mix](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix).
Note that `color-mix` is not supported in some older browsers. You can check [caniuse](https://caniuse.com/mdn-css_types_color_color-mix)
for more information.

```tsx
import { alpha } from '@mantine/core';

alpha('#4578FC', 0.45); // -> rgba(69, 120, 252, 0.45)
alpha('var(--mantine-color-gray-4)', 0.74);
// -> color-mix(in srgb, var(--mantine-color-gray-4), transparent 26%)
```

## parseThemeColor

The `parseThemeColor` function returns information about a given color in the following format:

```tsx
interface ParseThemeColorResult {
  /**
   * True if the given color is a theme color. For example,
   * `blue`, `orange.9`, `pink.3` are theme colors,
   * while `#fff`, `rgba(0, 0, 0, .5)` are not
   */
  isThemeColor: boolean;

  /**
   * Key of `theme.colors` if the given color is a theme color. For example,
   * if the given color is `blue` it will be `blue`,
   * if the given color is `orange.9` it will be `orange`
   */
  color: string;

  /**
   * Resolved color value. For example,
   * if the given color is `blue.7` it will be the value of `theme.colors.blue[7]`,
   * if the given color is `#fff` it will be `#fff`
   */
  value: string;

  /**
   * If the given color is a theme color, this will be the shade of that color.
   * For example, if the given color is `blue.7` it will be `7`.
   * If the given color does not have an index or is not a theme color, then it will be `undefined`
   */
  shade: MantineColorShade | undefined;

  /**
   * Color CSS variable. For example:
   * `blue.7` – `--mantine-color-blue-7`,
   * `red` – `--mantine-color-red-filled`,
   * `white` – `--mantine-color-white`,
   * `#fff` – `undefined`
   */
  variable: CssVariable | undefined;
}
```

The `parseThemeColor` function can be used anywhere the `theme` object is available,
for example in [CSS variables resolver](https://mantine.dev/llms/styles-css-variables.md), [variant color resolver](https://mantine.dev/llms/theming-colors.md#colors-variant-resolver),
or component body:

```tsx
import {
  MantineColor,
  parseThemeColor,
  useMantineTheme,
} from '@mantine/core';

interface DemoProps {
  color: MantineColor;
}

function Demo({ color }: DemoProps) {
  const theme = useMantineTheme();
  const parsedColor = parseThemeColor({ color, theme });

  return (
    <div
      style={{
        backgroundColor: parsedColor.isThemeColor
          ? `var(${parsedColor.variable})`
          : parsedColor.value,
      }}
    />
  );
}
```

## getThemeColor

`getThemeColor` is a simpler version of the `parseThemeColor` function. It accepts a color string
as the first argument and a theme object as the second argument. It returns the parsed color value or CSS variable:

```tsx
import { getThemeColor, useMantineTheme } from '@mantine/core';

function Demo() {
  const theme = useMantineTheme();

  getThemeColor('blue', theme); // -> var(--mantine-color-blue-filled)
  getThemeColor('blue.7', theme); // -> var(--mantine-color-blue-7)
  getThemeColor('white', theme); // -> var(--mantine-color-white)
  getThemeColor('#DF78E4', theme); // -> #DF78E4
}
```

## getGradient

The `getGradient` function transforms a given `MantineGradient` object to a CSS gradient string:

```tsx
import { getGradient, useMantineTheme } from '@mantine/core';

function Demo() {
  const theme = useMantineTheme();

  getGradient({ deg: 180, from: 'blue', to: 'cyan.7' }, theme);
  // -> `linear-gradient(180deg, var(--mantine-color-blue-filled) 0%, var(--mantine-color-cyan-7) 100%)`
}
```

## isLightColor

The `isLightColor` function can be used to achieve better contrast between text and background:

```tsx
import { Box, isLightColor } from '@mantine/core';

interface DemoProps {
  color: string;
}

export function Demo({ color }: DemoProps) {
  return (
    <Box bg={color} c={isLightColor(color) ? 'black' : 'white'}>
      Box with contrast text
    </Box>
  );
}
```

## luminance

The `luminance` function returns the color luminance. It can be used to check color contrast:

```tsx
import { luminance } from '@mantine/core';

luminance('#fff'); // -> 1
luminance('#000'); // -> 0
luminance('#4578FC'); // -> 0.21726425554966
```


--------------------------------------------------------------------------------

### CSSFilesList

# CSS files list

This page contains a list of CSS files that you can import from the `@mantine/core` package
as a replacement for `@mantine/core/styles.css`.

## Components dependencies

Some components require additional styles to work properly. For example, the [Button](https://mantine.dev/llms/core-button.md)
component is based on [UnstyledButton](https://mantine.dev/llms/core-unstyled-button.md). If you want to use [Button](https://mantine.dev/llms/core-button.md),
you need to import styles for `UnstyledButton` as well.

```tsx
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
```

Some components like [Select](https://mantine.dev/llms/core-select.md) do not have any styles of their own – they are built
on top of other components. To find out which components are used in a particular component, check
the component's source code.

If you are not sure which components are used in a particular component, you can import
all styles for components that are reused in other components:

```tsx
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/VisuallyHidden.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/InlineInput.css';
import '@mantine/core/styles/Flex.css';
import '@mantine/core/styles/FloatingIndicator.css';
import '@mantine/core/styles/ActionIcon.css';
```

## Global styles

All Mantine components depend on global styles. You need to import them before
all other styles:

* `baseline.css` – a minimal CSS reset, sets `box-sizing: border-box` and changes font properties
* `default-css-variables.css` – contains all CSS variables generated from the default theme
* `global.css` – global classes used in Mantine components

```tsx
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';
```

## Import order

It is important to maintain the correct styles import order. For example, if you want to use
the [Button](https://mantine.dev/llms/core-button.md) component, you need to import styles for
[UnstyledButton](https://mantine.dev/llms/core-unstyled-button.md) first and then import styles for [Button](https://mantine.dev/llms/core-button.md).

```tsx
// ✅ Correct order – Button styles will override UnstyledButton styles
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
```

```tsx
// ❌ Incorrect order – UnstyledButton styles will override Button styles
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/UnstyledButton.css';
```

## Files list

Note that if you cannot find a particular file in the list below, it means that
the component does not have any styles of its own or it is built on top of other components.


--------------------------------------------------------------------------------

### CSSModules

# CSS modules

All Mantine components use CSS modules for styling.
It is recommended to use CSS modules in your project as well, but it is not required –
Mantine components are fully compatible with any third-party styling solution and native CSS.

## Usage

CSS modules are supported out of the box by all major frameworks and build tools. Usually, all you need
to do is create a `*.module.css` file:

```css
/* Button.module.css */
.button {
  color: red;
}
```

And then import it in your component:

```tsx
import classes from './Button.module.css';

function Demo() {
  return (
    <button className={classes.button} type="button">
      Button
    </button>
  );
}
```

## How CSS modules work

When you create a `*.module.css` file, your build tool will generate a unique class name for each class in your file.
For example, when you import the following file in your `.js`/`.ts` file:

```css
/* Button.module.css */
.button {
  color: red;
}

.text {
  color: blue;
}
```

You will get an object with unique class names:

```tsx
import classes from './Button.module.css';

console.log(classes);
// -> Object of scoped class names: key is the class name, value is the generated unique class name
// { button: 'button-Xh3s7ER', text: 'text-js65s3Se' }
// Note that the generated class names may vary depending on your build tool
```

With CSS modules, you do not need to worry about class name collisions. You can use any class name you want.

## Referencing global class names

To reference global class names in CSS Modules, you can use the `:global` selector:

```scss
.test {
  & :global(.global-class-name) {
    color: red;
  }
}
```

The code above will compile to the following CSS:

```css
.m-dj3w33 .global-class-name {
  color: red;
}
```

## Adding styles to Mantine components

You can add styles to most Mantine components using the `className` prop
– the same way as you would with a regular HTML element.
To set properties to your [theme](https://mantine.dev/llms/theming-theme-object.md) values, you can use [Mantine CSS variables](https://mantine.dev/llms/styles-css-variables.md):

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


To apply styles to inner elements of Mantine components with CSS modules, you can use the `classNames` prop
(see [Styles API](https://mantine.dev/llms/styles-styles-api.md) for more information):

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


## Styling Mantine components without CSS modules

All Mantine components are fully compatible with any third-party styling solution and native CSS.
There are two main strategies to apply styles with a third-party library:

* `className`, `classNames`, `style` and `styles` props
* with static selectors, for example `.mantine-Text-root`

Example of applying styles with a utility CSS library:

```tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <TextInput
      classNames={{
        root: 'mt-4',
        input: 'bg-red-500 text-white',
      }}
    />
  );
}
```

Example of applying styles with global CSS:

```css
/* styles.css */

/* Note that these styles are not scoped and
   will be applied to all TextInput components */
.mantine-TextInput-root {
  margin-top: 0.8rem;
}

.mantine-TextInput-input {
  background-color: var(--mantine-color-red-filled);
  color: var(--mantine-color-white);
}
```

You can combine both approaches to achieve the desired results. For example,
the `@emotion/styled` and `styled-components` packages will pass the `className` prop to
a given component, and you can use static selectors to style inner elements:

```tsx
import styled from '@emotion/styled';
import { Slider } from '@mantine/core';

const StyledSlider = styled(Slider)`
  & .mantine-Slider-bar {
    background-color: var(--mantine-color-pink-5);
  }

  & .mantine-Slider-thumb {
    border-color: var(--mantine-color-pink-5);
    background-color: white;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

function Demo() {
  return <StyledSlider defaultValue={40} />;
}
```

> **Consider using CSS modules first**
>
> CSS modules are the recommended way of styling Mantine components.
> Before choosing another styling solution, make sure that CSS modules do not fit your needs.
> Other solutions have limitations, for example:
>
> * It is hard to customize styles based on [data-\* attributes](https://mantine.dev/llms/styles-data-attributes.md) when using utility-based CSS libraries
> * It is impossible to style inner elements of Mantine components with static selectors when using styled-components and other similar libraries if the component uses [Portal](https://mantine.dev/llms/core-portal.md) because some elements will be rendered outside of the component root and inner elements are not part of the component tree


--------------------------------------------------------------------------------

### CSSVariablesList

# Default CSS variables list

This page contains a list of all Mantine CSS variables that are generated from default theme.


--------------------------------------------------------------------------------

### CssVariables

# Mantine CSS variables

[MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) exposes all Mantine CSS variables based on the given [theme](https://mantine.dev/llms/theming-theme-object.md).
You can use these variables in [CSS](https://mantine.dev/llms/styles-css-modules.md) files, [style prop](https://mantine.dev/llms/styles-style.md) or any other styles.
Note that not all values are documented on this page, you can find full list of variables on [this page](https://mantine.dev/llms/styles-css-variables-list.md).

## Typography variables

Typography variables control the font family, font size, line height, font weight, and other text-related properties
of all Mantine components.

### Font family

The following CSS variables are used to assign font families to all Mantine components:

You can control these variables in the [theme](https://mantine.dev/llms/theming-theme-object.md). Note that if
`theme.headings.fontFamily` is not set, the `--mantine-font-family-headings` value
will be the same as `--mantine-font-family`.

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  // Controls --mantine-font-family
  fontFamily: 'Arial, sans-serif',

  // Controls --mantine-font-family-monospace
  fontFamilyMonospace: 'Courier New, monospace',

  headings: {
    // Controls --mantine-font-family-headings
    fontFamily: 'Georgia, serif',
  },
});
```

If you want to use system fonts as a fallback for custom fonts, you can reference `DEFAULT_THEME`
value instead of defining it manually:

```tsx
import { createTheme, DEFAULT_THEME } from '@mantine/core';

const theme = createTheme({
  fontFamily: `Roboto, ${DEFAULT_THEME.fontFamily}`,
});
```

You can reference font family variables in your CSS:

```scss
.text {
  font-family: var(--mantine-font-family);
}

.code {
  font-family: var(--mantine-font-family-monospace);
}

.heading {
  font-family: var(--mantine-font-family-headings);
}
```

And in the [ff style prop](https://mantine.dev/llms/styles-style-props.md):

* `ff="text"` will use `--mantine-font-family` variable
* `ff="monospace"` will use `--mantine-font-family-monospace` variable
* `ff="heading"` will use `--mantine-font-family-headings` variable

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <Text ff="monospace">
      This text uses the --mantine-font-family-monospace variable
    </Text>
  );
}
```

### Font size

Font size variables are used in most Mantine components to control text size. The
variable that is chosen depends on the component and its `size` prop.

You can reference font size variables in CSS:

```scss
.demo {
  font-size: var(--mantine-font-size-md);
}
```

And in the [fz style prop](https://mantine.dev/llms/styles-style-props.md):

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <Text fz="xl">
      This text uses --mantine-font-size-xl variable
    </Text>
  );
}
```

To define custom font sizes, can use `theme.fontSizes` property:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  fontSizes: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  },
});
```

Note that `theme.fontSizes` object is merged with the `DEFAULT_THEME.fontSizes` –
it is not required to define all values, only those that you want to change.

```tsx
import { createTheme } from '@mantine/core';

// Changes only xs font size,
// other values will be taken from the DEFAULT_THEME
const theme = createTheme({
  fontSizes: {
    xs: '0.5rem',
  },
});
```

You can add any number of additional font sizes to the `theme.fontSizes` object.
These values will be defined as CSS variables in `--mantine-font-size-{size}` format:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  fontSizes: {
    xxs: '0.125rem',
    xxl: '2rem',
  },
});
```

After defining `theme.fontSizes`, you can reference these variables in your CSS:

```scss
.demo {
  font-size: var(--mantine-font-size-xxs);
}
```

> **Case conversion**
>
> Case conversion (camelCase to kebab-case) is not automatically applied to custom font sizes.
> If you define `theme.fontSizes` with camelCase keys, you need to reference them in camelCase format.
> For example, if you define `{ customSize: '1rem' }`, you need to reference it as `--mantine-font-size-customSize`.

### Line height

Line height variables are used in [Text](https://mantine.dev/llms/core-text.md) component. In other components,
line-height is either calculated based on font size or set to `--mantine-line-height`,
which is an alias for `--mantine-line-height-md`.

You can reference line height variables in your CSS:

```scss
.demo {
  line-height: var(--mantine-line-height-md);
}
```

And in [lh style prop](https://mantine.dev/llms/styles-style-props.md):

```tsx
import { Text } from '@mantine/core';

function Demo() {
  return (
    <Text lh="xl">
      This text uses --mantine-line-height-xl variable
    </Text>
  );
}
```

To define custom line heights, you can use `theme.lineHeights` property:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  lineHeights: {
    xs: '1.2',
    sm: '1.3',
    md: '1.4',
    lg: '1.5',
    xl: '1.6',
  },
});
```

### Headings

`theme.headings` controls font-size, line-height, font-weight and text-wrap CSS properties
of headings in [Title](https://mantine.dev/llms/core-title.md) and [Typography](https://mantine.dev/llms/core-typography.md) components.

These variables are used in [Title](https://mantine.dev/llms/core-title.md) component, `order` prop
controls which heading level to use. For example, `order={3}` Title will use:

* `--mantine-h3-font-size`
* `--mantine-h3-line-height`
* `--mantine-h3-font-weight`

```tsx
import { Title } from '@mantine/core';

function Demo() {
  return (
    <>
      <Title order={1}>This is h1 title</Title>
      <Title order={2}>This is h2 title</Title>
      <Title order={3}>This is h3 title</Title>
      <Title order={4}>This is h4 title</Title>
      <Title order={5}>This is h5 title</Title>
      <Title order={6}>This is h6 title</Title>
    </>
  );
}
```


You can reference heading variables in your CSS:

```scss
.h1 {
  font-size: var(--mantine-h1-font-size);
  line-height: var(--mantine-h1-line-height);
  font-weight: var(--mantine-h1-font-weight);
}
```

And in [fz and lh style props](https://mantine.dev/llms/styles-style-props.md):

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box fz="h1" lh="h1">
      This text uses --mantine-h1-* variables
    </Box>
  );
}
```

To change heading styles, can use `theme.headings` property:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  headings: {
    sizes: {
      h1: {
        fontSize: '2rem',
        lineHeight: '1.5',
        fontWeight: '500',
      },
      h2: {
        fontSize: '1.5rem',
        lineHeight: '1.6',
        fontWeight: '500',
      },
    },
    // ...
  },
});
```

`theme.headings` object is deeply merged with the `DEFAULT_THEME.headings` object –
it is not required to define all values, only those that you want to change.

```tsx
import { createTheme } from '@mantine/core';

// Changes only font-size of h1,
// other values will be taken from the DEFAULT_THEME
const theme = createTheme({
  headings: {
    sizes: {
      h1: {
        fontSize: '2rem',
      },
    },
  },
});
```

### Font smoothing

Font smoothing variables control [-webkit-font-smoothing and moz-osx-font-smoothing](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth)
CSS properties. These variables are used to make text look better on screens with high pixel density.

Font smoothing variables are controlled by `theme.fontSmoothing` [theme](https://mantine.dev/llms/theming-theme-object.md) property, it is `true` by default. If `theme.fontSmoothing` is `false`, both variables will be set to `unset`.

If you need to override font smoothing values, the best way is to disable `theme.fontSmoothing` and set [global styles](https://mantine.dev/llms/styles-global-styles.md#add-global-styles-in-your-application)
on the body element:

```tsx
import { createTheme } from '@mantine/core';

// Disable font smoothing in your theme
const theme = createTheme({
  fontSmoothing: false,
});
```

```scss
// Add global styles to your project with desired font smoothing values
body {
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
}
```

## Colors variables

Colors variables are controlled by `theme.colors` and `theme.primaryColor`. Each color
defined in `theme.colors` object is required to have 10 shades. Theme color can be
referenced by its name and shade index, for example, `--mantine-color-red-6`.

You can define new colors on the theme object or override existing colors:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  colors: {
    demo: [
      '#FF0000',
      '#FF3333',
      '#FF6666',
      '#FF9999',
      '#FFCCCC',
      '#FFEEEE',
      '#FFFAFA',
      '#FFF5F5',
      '#FFF0F0',
      '#FFEBEB',
    ],
  },
});
```

The code above will define the following CSS variables:

### Variant colors

Some Mantine components like [Button](https://mantine.dev/llms/core-button.md) or [Badge](https://mantine.dev/llms/core-badge.md) have `variant` prop
that in combination with `color` prop controls the component text, background and border colors.
For each variant and color, Mantine defines a set of CSS variables that control these colors.
For example, for the default `blue` color the following CSS variables are defined:

For example, if you use [Button](https://mantine.dev/llms/core-button.md) component the following way:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button color="pink" variant="filled">
      Filled pink button
    </Button>
  );
}
```

The component will have the following styles:

* Background color will be `var(--mantine-color-pink-filled)`
* Background color on hover will be `var(--mantine-color-pink-filled-hover)`
* Text color will be `var(--mantine-color-white)`
* Border color will be `transparent`

Note that the variables above are not static, they are generated based on the values of
`theme.colors` and `theme.primaryShade`. Additionally, their values are different for
dark and light color schemes.

Variant colors variables are used in all components that support `color` prop, for example,
[Button](https://mantine.dev/llms/core-button.md), [Badge](https://mantine.dev/llms/core-badge.md), [Avatar](https://mantine.dev/llms/core-avatar.md) and [Pagination](https://mantine.dev/llms/core-pagination.md).
Colors values that are used by these components are determined by `cssVariablesResolver` described below
and [variantColorResolver](https://mantine.dev/llms/styles-variants-sizes.md#variantcolorresolver).

### Primary color variables

Primary color variables are defined by `theme.primaryColor` (which must be a key of `theme.colors`).
The following CSS variables are defined for the primary color:

You can reference primary color variables in CSS:

```scss
.demo {
  color: var(--mantine-primary-color-0);
  background-color: var(--mantine-primary-color-filled);
}
```

### Other color variables

The following colors are used in various Mantine components. Note that default values
are provided for the light color scheme, dark color scheme values are different.

## Spacing variables

`theme.spacing` values are used in most Mantine components to control paddings, margins, and other
spacing-related properties. The following CSS variables are defined based on `theme.spacing`:

To define custom spacing values, use `theme.spacing` property:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
});
```

## Border radius variables

Mantine components that support `radius` prop use border radius variables to control border radius.
The following CSS variables are defined based on `theme.radius`:

Additionally, `--mantine-radius-default` variable is defined based on `theme.defaultRadius`
value. If `radius` prop on components is not set explicitly, `--mantine-radius-default` is used instead.

To define custom border radius values, use `theme.radius` and `theme.defaultRadius` properties:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  defaultRadius: 'sm',
  radius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
  },
});
```

## Shadow variables

Shadow variables are used in all Mantine components that support `shadow` prop. The following CSS
variables are defined based on `theme.shadows`:

To define custom shadow values, use `theme.shadows` property:

```tsx
import { createTheme } from '@mantine/core';

const theme = createTheme({
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
});
```

## z-index variables

z-index variables are defined in `@mantine/core/styles.css`. Unlike other variables,
z-index variables are not controlled by the theme and are not exposed in the theme object.

You can reference z-index variables in CSS:

```css
/* Display content above the modal */
.my-content {
  z-index: calc(var(--mantine-z-index-modal) + 1);
}
```

And in components by referencing CSS variable:

```tsx
import { Modal } from '@mantine/core';

function Demo() {
  return (
    <Modal
      zIndex="var(--mantine-z-index-max)"
      opened
      onClose={() => {}}
    >
      Modal content
    </Modal>
  );
}
```

