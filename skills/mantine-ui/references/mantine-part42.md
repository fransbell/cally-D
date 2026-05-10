## Color scheme manager

By default, the color scheme value is stored in local storage, but you can implement your own
color scheme manager to store the value in any other external storage.

A color scheme manager must have the following methods:

```tsx
interface MantineColorSchemeManager {
  /** Function to retrieve color scheme value from external storage, for example window.localStorage */
  get: (defaultValue: MantineColorScheme) => MantineColorScheme;

  /** Function to set color scheme value in external storage, for example window.localStorage */
  set: (value: MantineColorScheme) => void;

  /** Function to subscribe to color scheme changes triggered by external events */
  subscribe: (
    onUpdate: (colorScheme: MantineColorScheme) => void
  ) => void;

  /** Function to unsubscribe from color scheme changes triggered by external events */
  unsubscribe: () => void;

  /** Function to clear value from external storage */
  clear: () => void;
}
```

Usually, it's better to wrap the color scheme manager in a creator function to provide a way to
configure it. Default local storage-based color scheme manager example:

```tsx
import {
  isMantineColorScheme,
  MantineColorScheme,
  MantineColorSchemeManager,
} from '@mantine/core';

export interface LocalStorageColorSchemeManagerOptions {
  /** Local storage key used to retrieve value with `localStorage.getItem(key)`, `mantine-color-scheme` by default */
  key?: string;
}

export function localStorageColorSchemeManager({
  key = 'mantine-color-scheme',
}: LocalStorageColorSchemeManagerOptions = {}): MantineColorSchemeManager {
  let handleStorageEvent: (event: StorageEvent) => void;

  return {
    get: (defaultValue) => {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      try {
        return (
          (window.localStorage.getItem(key) as MantineColorScheme) ||
          defaultValue
        );
      } catch {
        return defaultValue;
      }
    },

    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
          '[@mantine/core] Local storage color scheme manager was unable to save color scheme.',
          error
        );
      }
    },

    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (
          event.storageArea === window.localStorage &&
          event.key === key
        ) {
          isMantineColorScheme(event.newValue) &&
            onUpdate(event.newValue);
        }
      };

      window.addEventListener('storage', handleStorageEvent);
    },

    unsubscribe: () => {
      window.removeEventListener('storage', handleStorageEvent);
    },

    clear: () => {
      window.localStorage.removeItem(key);
    },
  };
}
```

Then the custom color scheme manager can be passed to [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md):

```tsx
import { MantineProvider } from '@mantine/core';
import { localStorageColorSchemeManager } from './localStorageColorSchemeManager';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-color-scheme',
});

function Demo() {
  return (
    <MantineProvider colorSchemeManager={colorSchemeManager}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Default color scheme

The default color scheme value is used when the user has not selected any color scheme yet.
It is required to be set both on [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) and
`ColorSchemeScript`. If `defaultColorScheme` is not set, then `light` is used.

```tsx
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="dark" />
      <MantineProvider defaultColorScheme="dark">
        {/* Your app here */}
      </MantineProvider>
    </>
  );
}
```

## Force color scheme

You can force the color scheme value to be either `light` or `dark` with `forceColorScheme` prop.
It is required to be set both on [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) and
`ColorSchemeScript`. If `forceColorScheme` is set, then `defaultColorScheme` and `colorSchemeManager` are ignored.
When `forceColorScheme` is set, it's not possible to change the color scheme value with the `setColorScheme` function.

```tsx
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <>
      <ColorSchemeScript forceColorScheme="light" />
      <MantineProvider forceColorScheme="light">
        {/* Your app here */}
      </MantineProvider>
    </>
  );
}
```

## lightHidden and darkHidden props

All Mantine components support `lightHidden` and `darkHidden` props that can be used to hide
a component in a specific color scheme:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <>
      <Button color="cyan" lightHidden>
        Visible in dark color scheme only
      </Button>

      <Button color="pink" darkHidden>
        Visible in light color scheme only
      </Button>
    </>
  );
}
```


## With disabled JavaScript

If you need to support users with disabled JavaScript, you need to set the `data-mantine-color-scheme`
attribute on the `<html />` element manually.

Example with Next.js app router that supports disabled JavaScript:

```tsx
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
```


--------------------------------------------------------------------------------

### Colors

# Colors

Mantine uses [open-color](https://yeun.github.io/open-color/) in the default theme with some additions.
Each color has 10 shades.

Colors are exposed on the [theme object](https://mantine.dev/llms/theming-theme-object.md) as an array of strings.
You can access a color shade by color name and index (0-9); colors with a larger index are darker:

```tsx
import { useMantineTheme } from '@mantine/core';

function Demo() {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.blue[1],
        color: theme.colors.blue[9],
      }}
    >
      This is a blue theme
    </div>
  );
}
```

Colors are also exposed as [CSS variables](https://mantine.dev/llms/styles-css-variables.md):

```scss
.demo {
  color: var(--mantine-color-red-5);
  background: var(--mantine-color-grape-9);
  border: 1px solid var(--mantine-color-blue-1);
}
```

## Adding extra colors

You can add any number of extra colors to the `theme.colors` object.
This will allow you to use them in all components that support the `color` prop, for example
[Button](https://mantine.dev/llms/core-button.md), [Badge](https://mantine.dev/llms/core-badge.md), and [Switch](https://mantine.dev/llms/core-switch.md).

```tsx
import { Group, Button, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  colors: {
    'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
    'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button color="ocean-blue">Ocean blue button</Button>
        <Button color="bright-pink" variant="filled">
          Bright pink button
        </Button>
      </Group>
    </MantineProvider>
  );
}
```


> **10 shades per color**
>
> A colors override must include **at least 10 shades per color**. Otherwise, you will get a TypeScript error
> and some variants will not have proper colors. If you only have one color value, you can either
> pick the remaining colors manually or use the [colors generator tool](https://mantine.dev/colors-generator).
>
> You can add more than 10 shades per color: these values will not be used by Mantine components with the default colors resolver,
> but you can still reference them by index, for example, `color="blue.11"`.

## Virtual colors

A virtual color is a special color whose values should be different for light and dark color schemes.
To define a virtual color, use the `virtualColor` function which accepts an object with the following
properties as a single argument:

* `name` – color name, must be the same as the key in `theme.colors` object
* `light` – a key of `theme.colors` object for light color scheme
* `dark` – a key of `theme.colors` object for dark color scheme

To see the demo in action, switch between light and dark color schemes (`Ctrl + J`):

```tsx
// App.tsx
import { createTheme, MantineProvider, virtualColor } from '@mantine/core';
import { Demo } from './Demo';

const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: 'pink',
      light: 'cyan',
    }),
  },
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Demo />
    </MantineProvider>
  );
}

// Demo.tsx
import { Box } from '@mantine/core';

export function Demo() {
  return (
    <Box bg="primary" c="white" p="md" fw={700}>
      This box has virtual background color,
      it is pink in dark mode and cyan in light mode
    </Box>
  );
}
```


## colorsTuple

Use the `colorsTuple` function to:

* Use a single color as the same color for all shades
* Transform dynamic string arrays to Mantine color tuple (the array should still have 10 values)

```tsx
import { colorsTuple, createTheme } from '@mantine/core';

const theme = createTheme({
  colors: {
    custom: colorsTuple('#FFC0CB'),
    dynamic: colorsTuple(
      Array.from({ length: 10 }, (_, index) => '#FFC0CB')
    ),
  },
});
```

## Supported color formats

You can use the following color formats in `theme.colors`:

* HEX: `#fff`, `#ffffff`
* RGB: `rgb(255, 255, 255)`, `rgba(255, 255, 255, 0.5)`
* HSL: `hsl(0, 0%, 100%)`, `hsla(0, 0%, 100%, 0.5)`
* OKLCH: `oklch(96.27% 0.0217 238.66)`, `oklch(96.27% 0.0217 238.66 / 0.5)`

Example of adding an oklch color to theme:

```tsx
import { MantineProvider, createTheme, Group, Button } from '@mantine/core';

const theme = createTheme({
  colors: {
    'oklch-blue': [
      'oklch(96.27% 0.0217 238.66)',
      'oklch(92.66% 0.0429 240.01)',
      'oklch(86.02% 0.0827 241.66)',
      'oklch(78.2% 0.13 243.83)',
      'oklch(71.8% 0.1686 246.06)',
      'oklch(66.89% 0.1986 248.32)',
      'oklch(62.59% 0.2247 250.29)',
      'oklch(58.56% 0.2209 251.26)',
      'oklch(54.26% 0.2067 251.67)',
      'oklch(49.72% 0.1888 251.59)',
    ],
  }
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button color="oklch-blue">Filled</Button>
        <Button color="oklch-blue" variant="outline">
          Outline
        </Button>
        <Button color="oklch-blue" variant="light">
          Light
        </Button>
      </Group>
    </MantineProvider>
  );
}
```


## primaryColor

`theme.primaryColor` is a key of `theme.colors`, it is used:

* As a default value for most of the components that support `color` prop
* To set default focus ring outline color

```tsx
import { Group, Button, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'bright-pink',
  colors: {
    'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button>Primary button</Button>
        <Button color="blue">Blue button</Button>
      </Group>
    </MantineProvider>
  );
}
```


> **CSS color values at `theme.primaryColor`**
>
> The value of `theme.primaryColor` must be a key of the `theme.colors` object. For example, `blue`, `orange`, or `green`.
> You cannot assign CSS color values; for example, the following code will throw an error during theme merging:
>
> ```tsx
> import { MantineProvider } from '@mantine/core';
>
> function Demo() {
>   return (
>     <MantineProvider
>       theme={{
>         primaryColor: '#CEFEDC', // This will throw an error
>       }}
>     >
>       {/* Your app here */}
>     </MantineProvider>
>   );
> }
> ```

## primaryShade

`theme.primaryShade` is a number from 0 to 9. It determines which shade will be used for components that have a `color` prop.

```tsx
import { MantineProvider, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider theme={{ primaryShade: 6 }}>
      <Group>
        <Button>Filled</Button>
        <Button variant="light">Light</Button>
        <Button variant="outline">Outline</Button>
      </Group>
    </MantineProvider>
  );
}
```


You can also customize primary shade for dark and light color schemes separately:

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider theme={{ primaryShade: { light: 6, dark: 8 } }}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Color prop

Components that support changing their color have `color` prop. This prop supports the following values:

* Key of `theme.colors`, for example, `blue` or `green`
* Key of `theme.colors` with color index, for example, `blue.5` or `green.9`
* CSS color value, for example, `#fff` or `rgba(0, 0, 0, 0.5)`

```tsx
import { Group, Button, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text size="sm" mb={5} fw={500}>
        Filled variant
      </Text>
      <Group>
        <Button color="cyan">Theme color</Button>
        <Button color="#1D72FE">Hex color</Button>
      </Group>

      <Text size="sm" mb={5} mt="md" fw={500}>
        Light variant
      </Text>
      <Group>
        <Button variant="light" color="cyan">
          Theme color
        </Button>
        <Button variant="light" color="#1D72FE">
          Hex color
        </Button>
      </Group>

      <Text size="sm" mb={5} mt="md" fw={500}>
        Outline variant
      </Text>
      <Group>
        <Button variant="outline" color="cyan">
          Theme color
        </Button>
        <Button variant="outline" color="#1D72FE">
          Hex color
        </Button>
      </Group>
    </>
  );
}
```


## Colors index reference

You can reference colors by index in the `color` prop and [style props](https://mantine.dev/llms/styles-style-props.md), for example the `c` prop:

```tsx
import { Button, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text c="blue.6">Text with blue.6 color</Text>
      <Button color="cyan.6">Button</Button>
    </>
  );
}
```


## Difference between color and c props

The `color` prop is used to control multiple CSS properties of the component. These properties can vary across different components,
but usually the `color` prop controls `background`, `color`, and `border-color` CSS properties. For example,
when you set `color="#C3FF36"` on the [Button](https://mantine.dev/llms/core-button.md) component (with `variant="filled"`), it will set the following CSS properties:

* `background-color` to `#C3FF36`
* `background-color` when the button is hovered to `#B0E631` (`#C3FF36` darkened by 10%)
* `color` to `var(--mantine-color-white)`
* `border-color` to `transparent`

`c` is a [style prop](https://mantine.dev/llms/styles-style-props.md) – it is responsible for setting a single CSS property `color` (color of the text).
You can combine both props to achieve better contrast between text and background. In the following example:

* The `color` prop sets `background: #C3FF36` and `color: var(--mantine-color-white)`
* The `c` prop overrides color styles to `color: var(--mantine-color-black)`

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button color="#C3FF36" c="black">
      Button with color and c props
    </Button>
  );
}
```


## Colors variant resolver

`theme.variantColorResolver` is a function that is used to determine which colors will be used
in different variants in the following components: [Alert](https://mantine.dev/llms/core-alert.md), [Avatar](https://mantine.dev/llms/core-avatar.md), [Button](https://mantine.dev/llms/core-button.md), [Badge](https://mantine.dev/llms/core-badge.md), and [ActionIcon](https://mantine.dev/llms/core-action-icon.md).

It accepts an object argument with the following properties:

```tsx
interface VariantColorsResolverInput {
  /** `color` prop passed to component */
  color: MantineColor | undefined;

  /** `variant` prop passed to component */
  variant: string;

  /** `gradient` prop passed to component, used only for gradient variant by default */
  gradient?: MantineGradient;

  /** Theme object */
  theme: MantineTheme;
}
```

`theme.variantColorResolver` must return an object with the following properties:

```tsx
interface VariantColorResolverResult {
  background: string;
  hover: string;
  color: string;
  border: string;
}
```

You can use `theme.variantColorResolver` to customize colors handling by default variants
or to add support for new variants:

```tsx
import {
  Button,
  Group,
  MantineProvider,
  defaultVariantColorsResolver,
  VariantColorsResolver,
  parseThemeColor,
  rgba,
  darken,
} from '@mantine/core';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Override some properties for variant
  if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
    return {
      ...defaultResolvedColors,
      color: 'var(--mantine-color-black)',
      hoverColor: 'var(--mantine-color-black)',
    };
  }

  // Completely override variant
  if (input.variant === 'light') {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: `1px solid ${parsedColor.value}`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  // Add new variants support
  if (input.variant === 'danger') {
    return {
      background: 'var(--mantine-color-red-9)',
      hover: 'var(--mantine-color-red-8)',
      color: 'var(--mantine-color-white)',
      border: 'none',
    };
  }

  return defaultResolvedColors;
};

function Demo() {
  return (
    <MantineProvider theme={{ variantColorResolver }}>
      <Group>
        <Button color="lime.4" variant="filled">
          Lime filled button
        </Button>

        <Button color="orange" variant="light">
          Orange light button
        </Button>

        <Button variant="danger">Danger button</Button>
      </Group>
    </MantineProvider>
  );
}
```


## Colors generation

You can use the [colors generator](https://mantine.dev/colors-generator) to generate 10 shades of color based on a single value
or install the `@mantine/colors-generator` package to generate dynamic colors in your application:

```bash
yarn add chroma-js @mantine/colors-generator
```

```bash
npm install chroma-js @mantine/colors-generator
```

The package exports a `generateColors` function that accepts a color value and returns an array of 10 shades.
Note that the `generateColors` function works best with darker colors (blue, violet, red) and may produce
colors with poor contrast for lighter colors (yellow, teal, orange). Usually, it's better to generate
colors in advance to avoid contrast issues.

```tsx
import { generateColors } from '@mantine/colors-generator';
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider
      theme={{
        colors: {
          'pale-blue': generateColors('#375EAC'),
        },
      }}
    >
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Default colors

## Add custom colors types

TypeScript will only autocomplete Mantine's default colors when accessing the theme. To add your custom colors to the MantineColor type, you can use TypeScript module declaration.

```ts
import {
  DefaultMantineColor,
  MantineColorsTuple,
} from '@mantine/core';

type ExtendedCustomColors =
  | 'primaryColorName'
  | 'secondaryColorName'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
```


#### Styles API

Colors component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Colorswatch selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Colorswatch-root | Root element |
| alphaOverlay | .mantine-Colorswatch-alphaOverlay | Overlay with checkerboard pattern |
| shadowOverlay | .mantine-Colorswatch-shadowOverlay | Overlay with inner box-shadow |
| colorOverlay | .mantine-Colorswatch-colorOverlay | Overlay with given color background |
| childrenOverlay | .mantine-Colorswatch-childrenOverlay | Overlay with `children` inside |

**Colorswatch CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --cs-radius | Controls `border-radius` of all overlays and `root` element |
| root | --cs-size | Controls `width`, `height`, `min-width` and `min-height` of the `root` element |


--------------------------------------------------------------------------------

### DefaultProps

# Default props

You can define default props for every Mantine component by setting `theme.components`.
These props will be used by default by all components in your application unless they are overridden by component props:

```tsx
import { MantineProvider, Button, Group, createTheme } from '@mantine/core';

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button>Default button</Button>
        <Button color="red" variant="filled">
          Button with props
        </Button>
      </Group>
    </MantineProvider>
  );
}
```


## Default props with MantineThemeProvider

You can also use `MantineThemeProvider` to define default props
for a part of your application:

```tsx
import {
  Button,
  createTheme,
  MantineThemeProvider,
} from '@mantine/core';

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'cyan',
        variant: 'outline',
      },
    }),
  },
});

function Demo() {
  return (
    <>
      <MantineThemeProvider theme={theme}>
        {/* Part of the app with theme */}
      </MantineThemeProvider>

      {/* Another part without theme */}
    </>
  );
}
```

## Default props for compound components

Some components like [Menu](https://mantine.dev/llms/core-menu.md) and [Tabs](https://mantine.dev/llms/core-tabs.md) have associated compound components:
`Menu.Item`, `Tabs.List`, etc. You can add default props to these components by omitting the dot from the component name:

```tsx
import {
  createTheme,
  MantineProvider,
  Menu,
  Tabs,
} from '@mantine/core';

const theme = createTheme({
  components: {
    MenuItem: Menu.Item.extend({
      defaultProps: { color: 'red' },
    }),

    TabsList: Tabs.List.extend({
      defaultProps: {
        justify: 'center',
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

## useProps hook

You can use the `useProps` hook to add default props support to any custom component.
`useProps` accepts three arguments:

* component name (string) – it is used to connect the component with the theme
* `defaultProps` – default props on the component level – these props are used when default props are not defined on the theme
* `props` – props passed to the component

```tsx
import { useProps, MantineThemeProvider, createTheme } from '@mantine/core';

interface CustomComponentProps {
  color?: string;
  children?: React.ReactNode;
}

const defaultProps = {
  color: 'red',
} satisfies Partial<CustomComponentProps>;

function CustomComponent(props: CustomComponentProps) {
  const { color, children } = useProps('CustomComponent', defaultProps, props);
  return <div style={{ color }}>{children}</div>;
}

const theme = createTheme({
  components: {
    CustomComponent: {
      defaultProps: {
        color: 'green',
      },
    },
  },
});

function Demo() {
  return (
    <div>
      <CustomComponent>Default color</CustomComponent>

      <MantineThemeProvider theme={theme}>
        <CustomComponent>Provider color</CustomComponent>
        <CustomComponent color="blue">Prop color</CustomComponent>
      </MantineThemeProvider>
    </div>
  );
}
```


## withProps function

All Mantine components have a `withProps` static function that can be used to
add default props to the component:

```tsx
import { Button, TextInput } from '@mantine/core';

const LinkButton = Button.withProps({
  component: 'a',
  target: '_blank',
  rel: 'noreferrer',
  variant: 'subtle',
});

const PhoneInput = TextInput.withProps({
  label: 'Your phone number',
  placeholder: 'Your phone number',
});

function Demo() {
  return (
    <>
      {/* You can pass additional props to components created with `withProps` */}
      <LinkButton href="https://mantine.dev">
        Mantine website
      </LinkButton>

      {/* Component props override default props defined in `withProps` */}
      <PhoneInput placeholder="Personal phone" />
    </>
  );
}
```


--------------------------------------------------------------------------------

### MantineProvider

# MantineProvider

`MantineProvider` provides a [theme object](https://mantine.dev/llms/theming-theme-object.md) context value, manages color scheme
changes, and injects [CSS variables](https://mantine.dev/llms/styles-css-variables.md). It must be rendered at the root of your
application and should be used only once.

## Usage

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Your theme override here */
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## MantineProvider props

`MantineProvider` supports the following props:

```tsx
interface MantineProviderProps {
  /** Theme override object */
  theme?: MantineThemeOverride;

  /** Used to retrieve/set color scheme value in external storage; by default uses `window.localStorage` */
  colorSchemeManager?: MantineColorSchemeManager;

  /** Default color scheme value used when `colorSchemeManager` cannot retrieve value from external storage; `light` by default */
  defaultColorScheme?: MantineColorScheme;

  /** Forces color scheme value; if set, MantineProvider ignores `colorSchemeManager` and `defaultColorScheme` */
  forceColorScheme?: 'light' | 'dark';

  /** CSS selector to which CSS variables should be added, by default variables are applied to `:root` and `:host` */
  cssVariablesSelector?: string;

  /** Determines whether theme CSS variables should be added to given `cssVariablesSelector`; `true` by default */
  withCssVariables?: boolean;

  /** Determines whether CSS variables should be deduplicated: if CSS variable has the same value as in default theme, it is not added in the runtime; `true` by default. */
  deduplicateCssVariables?: boolean;

  /** Function to resolve root element to set `data-mantine-color-scheme` attribute; must return undefined on server, `() => document.documentElement` by default */
  getRootElement?: () => HTMLElement | undefined;

  /** A prefix for components' static classes (for example {selector}-Text-root); `mantine` by default */
  classNamesPrefix?: string;

  /** Function to generate nonce attribute added to all generated `<style />` tags */
  getStyleNonce?: () => string;

  /** Function to generate CSS variables based on theme object */
  cssVariablesResolver?: CSSVariablesResolver;

  /** Determines whether components should have static classes, for example, `mantine-Button-root`; `true` by default */
  withStaticClasses?: boolean;

  /** Determines whether global classes should be added with `<style />` tag. Global classes are required for `hiddenFrom`/`visibleFrom` and `lightHidden`/`darkHidden` props to work; `true` by default. */
  withGlobalClasses?: boolean;

  /** Determines whether inline styles with identical content should be deduplicated using React 19 style hoisting. When enabled, components with the same responsive style props share a single `<style />` tag instead of each generating their own. @default false */
  deduplicateInlineStyles?: boolean;

  /** Environment in which the provider is used; `'test'` environment disables all transitions and portals */
  env?: 'default' | 'test';

  /** Your application */
  children?: React.ReactNode;
}
```

### theme

Pass a [theme object](https://mantine.dev/llms/theming-theme-object.md) override to the `theme` prop. It will be merged with the default
theme and used in all components.

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### colorSchemeManager

`colorSchemeManager` is used to retrieve and set the color scheme value in external storage. By default,
`MantineProvider` uses `window.localStorage` to store the color scheme value, but you can pass your own
implementation to the `colorSchemeManager` prop. You can learn more about color scheme management in the
[color schemes guide](https://mantine.dev/llms/theming-color-schemes.md).

```tsx
import {
  localStorageColorSchemeManager,
  MantineProvider,
} from '@mantine/core';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-app-color-scheme',
});

function Demo() {
  return (
    <MantineProvider colorSchemeManager={colorSchemeManager}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### defaultColorScheme

The `defaultColorScheme` value is used when `colorSchemeManager` cannot retrieve the value from external
storage, for example during server-side rendering or when the user hasn't selected a preferred color scheme.
Possible values are `light`, `dark`, and `auto`. By default, the color scheme value is `light`.
You can learn more about color scheme management in the [color schemes guide](https://mantine.dev/llms/theming-color-schemes.md).

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider defaultColorScheme="dark">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### cssVariablesSelector

`cssVariablesSelector` is a CSS selector to which [CSS variables](https://mantine.dev/llms/styles-css-variables.md) should be added.
By default, variables are applied to `:root` and `:host`. `MantineProvider` generates CSS variables based
on given [theme override](https://mantine.dev/llms/theming-theme-object.md) and `cssVariablesResolver`, then these variables are
rendered into `<style />` tag next to your application.
You can learn more about Mantine CSS variables in the [CSS variables guide](https://mantine.dev/llms/styles-css-variables.md).

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider cssVariablesSelector="html">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### withCssVariables

`withCssVariables` determines whether theme CSS variables should be added to the given `cssVariablesSelector`.
By default, it is set to `true`. You should not change it unless you want to manage CSS variables
via a `.css` file (note that in this case you will need to generate all theme tokens
that are not part of the default theme on your side).

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider withCssVariables={false}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### deduplicateCssVariables

`deduplicateCssVariables` determines whether CSS variables should be deduplicated: if a CSS variable has the same value as in the default theme, it is not added in the runtime.
By default, it is set to `true`. If set to `false`, all Mantine CSS variables will be added in a `<style />` tag
even if they have the same value as in the default theme.

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider deduplicateCssVariables={false}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### deduplicateInlineStyles

`deduplicateInlineStyles` enables React 19 style tag deduplication for responsive
[style props](https://mantine.dev/llms/styles-style-props.md). When multiple components share the same responsive
style prop values (for example, many list items with `mt={{ base: 10, md: 20 }}`),
only a single `<style />` tag is generated and hoisted to `<head />` instead of
each component injecting its own.

This can significantly improve performance in scenarios where many components
use the same responsive style props. See the [styles performance guide](https://mantine.dev/llms/styles-styles-performance.md)
for more details.

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider deduplicateInlineStyles>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### getRootElement

`getRootElement` is a function that returns the root application element (usually `html`) to set the `data-mantine-color-scheme` attribute.
The default value is `() => document.documentElement` which means that the `data-mantine-color-scheme`
attribute will be added to the `<html />` tag. You can learn more about color scheme management in the
[color schemes guide](https://mantine.dev/llms/theming-color-schemes.md).

```tsx
import { MantineProvider } from '@mantine/core';

const getRootElement = () =>
  typeof window === 'undefined' ? undefined : document.body;

function Demo() {
  return (
    <MantineProvider getRootElement={getRootElement}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### classNamesPrefix

`classNamesPrefix` is a prefix for components' static classes (for example `{selector}-Text-root`).
The default value is `mantine` – all components will have a `mantine-` prefix in their **static classes**.

```tsx
import { MantineProvider, Text } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider>
      <Text>Just some text</Text>
    </MantineProvider>
  );
}
```

In this case (default `classNamesPrefix`), the [Text](https://mantine.dev/llms/core-text.md) component will have the following classes:

* `mantine-focus-auto` – global utility class
* `m-3nrA4eL` – component class, usually a random string; with this class library styles are applied
* `mantine-Text-root` – component static class, part of the [Styles API](https://mantine.dev/llms/styles-styles-api.md)

With `classNamesPrefix` you can change only the **static class**:

```tsx
import { MantineProvider, Text } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider classNamesPrefix="app">
      <Text>Just some text</Text>
    </MantineProvider>
  );
}
```

Now the [Text](https://mantine.dev/llms/core-text.md) component will have the following classes:

* `mantine-focus-auto` – `classNamesPrefix` does not impact global utility classes – they are static and **cannot be changed**
* `m-3nrA4eL` – `classNamesPrefix` does not impact library classes – they are static and **cannot be changed**
* `app-Text-root` – component static class has `classNamesPrefix` instead of `mantine`

### withStaticClasses

`withStaticClasses` determines whether components should have static classes, for example, `mantine-Button-root`.
By default, static classes are enabled. To disable them, set `withStaticClasses` to `false`:

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider withStaticClasses={false}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### withGlobalClasses

`withGlobalClasses` determines whether global classes should be added with a `<style />` tag.
Global classes are required for `hiddenFrom`/`visibleFrom` and `lightHidden`/`darkHidden` props to work.
By default, global classes are enabled. To disable them, set `withGlobalClasses` to `false`. Note that
disabling global classes may break styles of some components.

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider withGlobalClasses={false}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### getStyleNonce

`getStyleNonce` is a function to generate a [nonce](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) attribute added to dynamically generated `<style />` tags.

### cssVariablesResolver

`cssVariablesResolver` is a function to generate CSS variables styles based on the [theme object](https://mantine.dev/llms/theming-theme-object.md).
You can learn more about Mantine CSS variables in the [CSS variables guide](https://mantine.dev/llms/styles-css-variables.md#css-variables-resolver).

### env

The `env` prop can be used in a test environment to disable some features that
might impact tests and/or make it harder to test components:

* transitions that mount/unmount a child component with delay
* portals that render a child component in a different part of the DOM

To enable the test environment, set `env` to `test`:

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider env="test">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

Note that `env="test"` is intended to be used in test environments only with [Jest](https://mantine.dev/llms/guides-jest.md) or [Vitest](https://mantine.dev/llms/guides-vitest.md). Do not use it in
development or production environments. It is also not recommended to be used with
end-to-end testing tools like [Cypress](https://mantine.dev/guides/cypress) or [Playwright](https://mantine.dev/guides/playwright).


--------------------------------------------------------------------------------

### ThemeObject

# Theme object

Mantine theme is an object where your application's colors, fonts, spacing, border-radius, and other design tokens are stored.

```tsx
interface MantineTheme {
  /** Controls focus ring styles. Supports the following options:
   *  - `auto` – focus ring is displayed only when the user navigates with keyboard (default value)
   *  - `always` – focus ring is displayed when the user navigates with keyboard and mouse
   *  - `never` – focus ring is always hidden (not recommended)
   */
  focusRing: 'auto' | 'always' | 'never';

  /** rem units scale; change if you customize font-size of `<html />` element
   *  default value is `1` (for `100%`/`16px` font-size on `<html />`)
   */
  scale: number;

  /** Determines whether `font-smoothing` property should be set on the body; `true` by default */
  fontSmoothing: boolean;

  /** White color */
  white: string;

  /** Black color */
  black: string;

  /** Object of colors; key is color name, value is an array of at least 10 strings (colors) */
  colors: MantineThemeColors;

  /** Index of theme.colors[color].
   *  Primary shade is used in all components to determine which color from theme.colors[color] should be used.
   *  Can be either a number (0–9) or an object to specify different color shades for light and dark color schemes.
   *  Default value `{ light: 6, dark: 8 }`
   *
   *  For example,
   *  { primaryShade: 6 } // shade 6 is used both for dark and light color schemes
   *  { primaryShade: { light: 6, dark: 7 } } // different shades for dark and light color schemes
   * */
  primaryShade: MantineColorShade | MantinePrimaryShade;

  /** Key of `theme.colors`; hex/rgb/hsl values are not supported.
   *  Determines which color will be used in all components by default.
   *  Default value – `blue`.
   * */
  primaryColor: string;

  /** Function to resolve colors based on variant.
   *  Can be used to deeply customize how colors are applied to `Button`, `ActionIcon`, `ThemeIcon`
   *  and other components that use colors from the theme.
   * */
  variantColorResolver: VariantColorsResolver;

  /** Determines whether text color must be changed based on the given `color` prop in filled variant
   *  For example, if you pass `color="blue.1"` to the Button component, text color will be changed to `var(--mantine-color-black)`
   *  Default value – `false`
   * */
  autoContrast: boolean;

  /** Determines which luminance value is used to determine if text color should be light or dark.
   *  Used only if `theme.autoContrast` is set to `true`.
   *  Default value is `0.3`
   * */
  luminanceThreshold: number;

  /** font-family used in all components; system fonts by default */
  fontFamily: string;

  /** Monospace font-family; used in code and other similar components, system fonts by default  */
  fontFamilyMonospace: string;

  /** Controls various styles of h1-h6 elements; used in Typography and Title components */
  headings: {
    fontFamily: string;
    fontWeight: string;
    textWrap: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable';
    sizes: {
      h1: HeadingStyle;
      h2: HeadingStyle;
      h3: HeadingStyle;
      h4: HeadingStyle;
      h5: HeadingStyle;
      h6: HeadingStyle;
    };
  };

  /** Object of values that are used to set `border-radius` in all components that support it */
  radius: MantineRadiusValues;

  /** Key of `theme.radius` or any valid CSS value. Default `border-radius` used by most components */
  defaultRadius: MantineRadius;

  /** Object of values that are used to set various CSS properties that control spacing between elements */
  spacing: MantineSpacingValues;

  /** Object of values that are used to control `font-size` property in all components */
  fontSizes: MantineFontSizesValues;

  /** Object of values that are used to control `line-height` property in `Text` component */
  lineHeights: MantineLineHeightValues;

  /** Object of values that are used to control `font-weight` property in components */
  fontWeights: MantineFontWeightsValues;

  /** Object of values that are used to control breakpoints in all components;
   *  values are expected to be defined in em
   * */
  breakpoints: MantineBreakpointsValues;

  /** Object of values that are used to add `box-shadow` styles to components that support `shadow` prop */
  shadows: MantineShadowsValues;

  /** Determines whether user OS settings to reduce motion should be respected; `false` by default */
  respectReducedMotion: boolean;

  /** Determines which cursor type will be used for interactive elements
   * - `default` – cursor that is used by native HTML elements, for example, `input[type="checkbox"]` has `cursor: default` styles
   * - `pointer` – sets `cursor: pointer` on interactive elements that do not have these styles by default
   */
  cursorType: 'default' | 'pointer';

  /** Default gradient configuration for components that support `variant="gradient"` */
  defaultGradient: MantineGradient;

  /** Class added to the elements that have active styles, for example, `Button` and `ActionIcon` */
  activeClassName: string;

  /** Class added to the elements that have focus styles, for example, `Button` or `ActionIcon`.
   *  Overrides `theme.focusRing` property.
   */
  focusClassName: string;

  /** Allows adding `classNames`, `styles` and `defaultProps` to any component */
  components: MantineThemeComponents;

  /** Any other properties that you want to access with the theme objects */
  other: MantineThemeOther;
}
```

## Usage

To customize the theme, pass a theme override object to [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) `theme` prop.
The theme override will be deeply merged with the default theme.

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  colors: {
    // Add your color
    deepBlue: [
      '#eef3ff',
      '#dce4f5',
      '#b9c7e2',
      '#94a8d0',
      '#748dc1',
      '#5f7cb8',
      '#5474b4',
      '#44639f',
      '#39588f',
      '#2d4b81',
    ],
    // or replace default theme color
    blue: [
      '#eef3ff',
      '#dee2f2',
      '#bdc2de',
      '#98a0ca',
      '#7a84ba',
      '#6672b0',
      '#5c68ac',
      '#4c5897',
      '#424e88',
      '#364379',
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '36px' },
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

