## Responsive style props

Responsive [style props](https://mantine.dev/llms/styles-style-props.md) have worse performance than regular style props
because they require injecting a `<style />` tag next to the component. It is fine to use responsive
style props to apply styles to several components, but it is not recommended to use
them in large lists of components. For example, if you have 1000 inputs with responsive margins,
it is better to refactor to use the `classNames` prop:

```tsx
import { TextInput } from '@mantine/core';

// Ok, style props are used to apply margin-top property to several components
function StyleProps() {
  return (
    <>
      <TextInput label="Input 1" />
      <TextInput label="Input 2" mt={{ base: 10, md: 20 }} />
      <TextInput label="Input 3" mt={{ base: 10, md: 20 }} />
    </>
  );
}

// Worse, 1000 separate `<style />` tags will be generated
// Better to refactor to use the className prop
function StylePropsArray() {
  const inputs = Array(1000)
    .fill(0)
    .map((_, index) => (
      <TextInput
        key={index}
        label={`Input ${index}`}
        mt={{ base: 10, md: 20 }}
      />
    ));

  return <>{inputs}</>;
}
```

### Deduplicating responsive style props

If you have many components with the same responsive style props, you can enable
`deduplicateInlineStyles` on [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) to
automatically share `<style />` tags between components with identical responsive styles.
This uses React 19 style hoisting to deduplicate and hoist styles to `<head />`:

```tsx
import { MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineProvider deduplicateInlineStyles>
      {/* Components with the same responsive style props
          will now share a single <style /> tag */}
    </MantineProvider>
  );
}
```

Note that deduplication only helps when multiple components share the **same** responsive
style prop values. If every component has unique responsive values, each still requires
its own `<style />` tag.

Currently, deduplication applies to [style props](https://mantine.dev/llms/styles-style-props.md) on all components
and to responsive props on the [Flex](https://mantine.dev/llms/core-flex.md) component. Components like
[Grid](https://mantine.dev/llms/core-grid.md) and [SimpleGrid](https://mantine.dev/llms/core-simple-grid.md) are not yet covered.

## Components responsive props

Some components, like [SimpleGrid](https://mantine.dev/llms/core-simple-grid.md) and [Grid](https://mantine.dev/llms/core-grid.md),
rely on the same mechanism as responsive style props to apply styles. The limitations are the same
– it is fine to use several of these components on a page, but it is not recommended to use
them in large lists of components.


--------------------------------------------------------------------------------

### UnstyledComponents

# Unstyled components

## Using Mantine as a headless UI library

You can use Mantine as a headless UI library. To do that, simply do not import `@mantine/*/styles.css`
in your application. Then you will be able to apply styles to Mantine components using the [Styles API](https://mantine.dev/llms/styles-styles-api.md)
with a styling solution of your choice.

## HeadlessMantineProvider

`HeadlessMantineProvider` is an alternative to [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md)
that should be used when you want to use Mantine as a headless UI library. It removes all
features that are related to Mantine styles:

* Mantine classes are not applied to components
* Inline CSS variables are not added with the `style` attribute
* All color scheme related features are removed
* Global styles are not generated

Limitations of `HeadlessMantineProvider`:

* [Color scheme switching](https://mantine.dev/llms/theming-color-schemes.md) will not work. If your application has a dark mode, you will need to implement it on your side.
* Props that are related to styles in all components (`color`, `radius`, `size`, etc.) will have no effect.
* Some components that rely on styles will become unusable ([Grid](https://mantine.dev/llms/core-grid.md), [SimpleGrid](https://mantine.dev/llms/core-simple-grid.md), [Container](https://mantine.dev/llms/core-container.md), etc.).
* `lightHidden`/`darkHidden`, `visibleFrom`/`hiddenFrom` props will not work.
* [Style props](https://mantine.dev/llms/styles-style-props.md) will work only with explicit values, for example `mt="xs"` will not work, but `mt={5}` will.

To use `HeadlessMantineProvider`, follow the [getting started guide](https://mantine.dev/llms/getting-started.md) and replace `MantineProvider` with `HeadlessMantineProvider`.
Note that you do not need to use [ColorSchemeScript](https://mantine.dev/llms/theming-color-schemes.md#colorschemescript) in your application; it will not have any effect,
so you can ignore this part of the guide.

```tsx
import { HeadlessMantineProvider } from '@mantine/core';

function App() {
  return (
    <HeadlessMantineProvider>
      {/* Your application */}
    </HeadlessMantineProvider>
  );
}
```

## unstyled prop

Most Mantine components support the `unstyled` prop that removes library styles from the component and allows you to style it
from scratch. Note that the `unstyled` prop is not supported by compound components (`Tabs.Tab`, `Menu.Dropdown`, `Accordion.Control`, etc.)
– it only works on the root component (`Tabs`, `Menu`, `Accordion`, etc.).

Unstyled [Tabs](https://mantine.dev/llms/core-tabs.md) component:

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat" unstyled>
      <Tabs.List>
        <Tabs.Tab value="chat">Chat</Tabs.Tab>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="chat">Chat panel</Tabs.Panel>
      <Tabs.Panel value="gallery">Gallery panel</Tabs.Panel>
      <Tabs.Panel value="account">Account panel</Tabs.Panel>
    </Tabs>
  );
}
```


> **Choosing between unstyled prop and headless components**
>
> `unstyled` prop is useful when you want to remove library styles from a single component,
> but keep styles for other components. For example, if [Tabs](https://mantine.dev/llms/core-tabs.md) component does
> not meet your design system requirements, but all other components do, you can use `unstyled`
> prop to remove styles from Tabs and style it from scratch, while keeping all other components
> styled with Mantine styles.
>
> Note that `unstyled` prop does not remove Mantine library styles from your `.css` bundle –
> it only does not apply them to component with `unstyled` prop.


--------------------------------------------------------------------------------

### VanillaExtract

# Vanilla extract integration

[Vanilla extract](https://vanilla-extract.style/) is a TypeScript CSS preprocessor that generates static CSS files at build time.
It is a great alternative to [CSS Modules](https://mantine.dev/llms/styles-css-modules.md) if you prefer to write your styles in TypeScript.

## Vanilla extract vs CSS Modules

[Vanilla extract](https://vanilla-extract.style/) and [CSS Modules](https://mantine.dev/llms/styles-css-modules.md) do the same thing,
but with different syntax. Common features of [Vanilla extract](https://vanilla-extract.style/) and [CSS Modules](https://mantine.dev/llms/styles-css-modules.md):

* Styles are generated at build time – no runtime and performance overhead
* Class names are scoped to the styles file

Differences between [Vanilla extract](https://vanilla-extract.style/) and [CSS Modules](https://mantine.dev/llms/styles-css-modules.md):

* Vanilla extract styles are type-safe
* You can use any JavaScript/TypeScript code in Vanilla extract styles, including [color functions](https://mantine.dev/llms/styles-color-functions.md)
* With Vanilla extract you do not have access to [postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md) features like the `light-dark` function and `hover` mixin.
  Because of this, you will not be able to copy-paste all demos from the Mantine documentation and use them with Vanilla extract.
* Vanilla extract requires additional configuration and setup that may not be available for your build tool/framework.
  Most popular tools like [Next.js](https://nextjs.org/) and [Vite](https://vitejs.dev/) have plugins for Vanilla extract,
  but if you are using something more niche, you might need to configure it yourself.

Note that you can use both [Vanilla extract](https://vanilla-extract.style/) and [CSS Modules](https://mantine.dev/llms/styles-css-modules.md) in the same project;
it will not cause any issues: performance will be the same and the bundle size will not be impacted.

## Installation

Follow the [installation instructions](https://vanilla-extract.style/documentation/getting-started) to install Vanilla extract.
Then install the `@mantine/vanilla-extract` package; it exports the `themeToVars` function to convert the Mantine theme to CSS variables:

```bash
yarn add @mantine/vanilla-extract
```

```bash
npm install @mantine/vanilla-extract
```

## Templates

You can use one of the following templates to get started or as a reference for your own setup.
Note that all templates include only minimal setup.

## Theming

Vanilla extract provides [createTheme](https://vanilla-extract.style/documentation/theming/)
function which converts given theme object into CSS variables and assigns them to `:root` or other selector.
You should not use Vanilla extract `createTheme` to generate Mantine theme tokens – all Mantine [theme](https://mantine.dev/llms/theming-theme-object.md)
properties are already exposed as CSS variables. Instead, use `themeToVars` function from `@mantine/vanilla-extract` package
to create an object with CSS variables from Mantine theme:

```tsx
// theme.ts
import { createTheme } from '@mantine/core';

// Do not forget to pass theme to MantineProvider
export const theme = createTheme({
  fontFamily: 'serif',
  primaryColor: 'cyan',
});
```

```tsx
// theme.css.ts
import { theme } from './theme';
import { themeToVars } from '@mantine/vanilla-extract';

// CSS variables object, can be access in *.css.ts files
export const vars = themeToVars(theme);
```

## Styling

Import `vars` object in `*.css.ts` files to access Mantine [CSS variables](https://mantine.dev/llms/styles-css-variables.md):

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.xl,
  backgroundColor: vars.colors.red[5],
  color: vars.colors.white,
});
```

## rem and em

To convert px to [rem or em](https://mantine.dev/llms/styles-rem.md) use `rem` and `em` functions from `@mantine/core` package:

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { rem } from '@mantine/core';

export const demo = style({
  fontSize: rem(16),

  '@media': {
    [`(min-width: ${em(768)})`]: {
      fontSize: rem(18),
    },
  },
});
```

## light and dark selectors

`vars` object contains `lightSelector` and `darkSelector` properties which can be used to
apply styles only in light or dark color scheme:

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.xl,

  selectors: {
    [vars.lightSelector]: {
      backgroundColor: vars.colors.red[5],
      color: vars.colors.white,
    },

    [vars.darkSelector]: {
      backgroundColor: vars.colors.blue[5],
      color: vars.colors.white,
    },
  },
});
```

Note that usually it is more convenient to use only one of them:
apply styles for light color scheme and then override them for dark color scheme
with `vars.darkSelector` (or vice versa):

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.xl,
  backgroundColor: vars.colors.red[5],
  color: vars.colors.white,

  selectors: {
    [vars.darkSelector]: {
      backgroundColor: vars.colors.blue[5],
      color: vars.colors.white,
    },
  },
});
```

## largerThan and smallerThan

`vars` object contains `largerThan` and `smallerThan` properties which can be used in
`@media` as a shorthand for `min-width` and `max-width`:

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  fontSize: vars.fontSizes.sm,

  '@media': {
    // equivalent to `(min-width: 640px)` converted to em
    // -> `(min-width: 40em)`
    [vars.largerThan(640)]: {
      fontSize: vars.fontSizes.md,
    },

    // equivalent to `(max-width: 640px)` converted to em
    // -> `(max-width: 40em)`
    [vars.smallerThan(640)]: {
      fontSize: vars.fontSizes.xs,
    },

    // You can reference `theme.breakpoints` values
    [vars.largerThan('sm')]: {
      fontSize: vars.fontSizes.md,
    },
  },
});
```

## rtl selector

Use `vars.rtlSelector` to apply styles only in rtl direction:

```tsx
// Demo.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const demo = style({
  paddingRight: vars.spacing.md,

  selectors: {
    [vars.rtlSelector]: {
      paddingLeft: vars.spacing.md,
      paddingRight: 0,
    },
  },
});
```


--------------------------------------------------------------------------------

### VariantsAndSizes

# Variants and sizes

## Adding custom variants

Most Mantine components support the `variant` prop. It can be used in CSS variables resolver,
and it is also exposed as a `data-variant="{value}"` attribute on the root element of the component.
The easiest way to add custom variants is to add styles that use `[data-variant="{value}"]`.

Example of adding a new variant to the [Input](https://mantine.dev/llms/core-input.md) component:

* `underline` variant styles are added
* `filled` variant is the default variant – you do not need to define any additional styles for it

```tsx
// Demo.tsx
import { Input, MantineProvider, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

// It is better to add new variants in theme.components
// This way you will be able to use them in anywhere in the app
const theme = createTheme({
  components: {
    Input: Input.extend({ classNames: classes }),
  }
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Input variant="underline" placeholder="Underline input" />
      <Input variant="filled" placeholder="Filled input" mt="md" />
    </MantineProvider>
  );
}

// Demo.module.css
.input {
  &[data-variant='underline'] {
    border-bottom: 2px solid;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;

    @mixin light {
      border-color: var(--mantine-color-gray-3);
    }

    @mixin dark {
      border-color: var(--mantine-color-dark-3);
    }

    &:focus {
      border-color: var(--mantine-color-blue-filled);
    }
  }
}
```


Note that you can add custom variants to every Mantine component that supports the [Styles API](https://mantine.dev/llms/styles-styles-api.md),
even if there are no variants defined on the library side.

> **Overriding existing variants styles**
>
> Apart from adding new variants, you can also override existing ones, for example, you can change the
> `filled` variant of the [Input](https://mantine.dev/llms/core-input.md) component with `.input[data-variant="filled"]` selector.

## Custom variants types

You can define types for custom variants by creating a `mantine.d.ts` file
in your project and extending the `{x}Props` interface with the new variant type.

Example of adding a custom variant type to the [Button](https://mantine.dev/llms/core-button.md) component:

```tsx
import { ButtonVariant, MantineSize } from '@mantine/core';

type ExtendedButtonVariant = ButtonVariant | 'contrast' | 'radial-gradient';

declare module '@mantine/core' {
  export interface ButtonProps {
    variant?: ExtendedButtonVariant;
  }
}
```

## variantColorResolver

[Button](https://mantine.dev/llms/core-button.md), [Badge](https://mantine.dev/llms/core-badge.md), [ActionIcon](https://mantine.dev/llms/core-action-icon.md) and other
components support custom variants with [variantColorResolver](https://mantine.dev/llms/theming-colors.md#colors-variant-resolver)
– it supports both changing colors and adding new variants. Note that `theme.variantColorResolver` is
responsible only for colors. If you need to change other properties, use the `data-variant` attribute.

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


## Sizes with components CSS variables

You can add custom sizes to any component that supports the `size` prop by providing a custom
CSS variables resolver. Usually this is done in `theme.components`:

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


## Sizes with data-size attribute

Every component that supports the `size` prop exposes it as a `data-size="{value}"` attribute on the root element.
You can use it to add custom sizes:

```tsx
// Demo.tsx
import { Input, createTheme, MantineProvider } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Input: Input.extend({ classNames: classes }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Input placeholder="Size XXL" size="xxl" />
      <Input placeholder="Size XXS" size="xxs" mt="md" />
    </MantineProvider>
  );
}

// Demo.module.css
.wrapper {
  &[data-size='xxl'] {
    & .input {
      padding-left: 28px;
      padding-right: 28px;
      height: 68px;
      font-size: 28px;
    }
  }

  &[data-size='xxs'] {
    & .input {
      padding-left: 10px;
      padding-right: 10px;
      height: 28px;
      font-size: 10px;
    }
  }
}
```


## Sizes with static CSS variables

Mantine component sizes are defined with CSS variables (usually on the root element). For example,
the [ActionIcon](https://mantine.dev/llms/core-action-icon.md) component has the following CSS variables:

```css
.root {
  --ai-size-xs: 18px;
  --ai-size-sm: 22px;
  --ai-size-md: 28px;
  --ai-size-lg: 34px;
  --ai-size-xl: 44px;
}
```

You can override these values with the [Styles API](https://mantine.dev/llms/styles-styles-api.md) or add new size values:

```tsx
// Demo.tsx
import { ActionIcon, createTheme, Group, MantineThemeProvider } from '@mantine/core';
import { HeartIcon } from '@phosphor-icons/react';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Group justify="center">
        <ActionIcon size="xxs" aria-label="Custom xxs size">
          <HeartIcon size={10} />
        </ActionIcon>

        <ActionIcon size="xxl" aria-label="Custom xxl size">
          <HeartIcon size={32} />
        </ActionIcon>
      </Group>
    </MantineThemeProvider>
  );
}

// Demo.module.css
.root {
  --ai-size-xxs: 16px;
  --ai-size-xxl: 50px;
}
```


Note that some components have more than one CSS variable for size. For example,
the [Button](https://mantine.dev/llms/core-button.md) component has the following CSS variables:

```css
.root {
  --button-height-xs: 30px;
  --button-height-sm: 36px;
  --button-height-md: 42px;
  --button-height-lg: 50px;
  --button-height-xl: 60px;

  --button-height-compact-xs: 22px;
  --button-height-compact-sm: 26px;
  --button-height-compact-md: 30px;
  --button-height-compact-lg: 34px;
  --button-height-compact-xl: 40px;

  --button-padding-x-xs: 14px;
  --button-padding-x-sm: 18px;
  --button-padding-x-md: 22px;
  --button-padding-x-lg: 26px;
  --button-padding-x-xl: 32px;

  --button-padding-x-compact-xs: 7px;
  --button-padding-x-compact-sm: 8px;
  --button-padding-x-compact-md: 10px;
  --button-padding-x-compact-lg: 12px;
  --button-padding-x-compact-xl: 14px;
}
```

Usually, it is more convenient to use the `data-size` attribute or `vars` on the [theme](https://mantine.dev/llms/theming-theme-object.md)
to customize sizes in this case.


--------------------------------------------------------------------------------

## X COMPONENTS AND FEATURES
Primary Package: @mantine/x

### Carousel
Package: @mantine/carousel
Import: import { Carousel } from '@mantine/carousel';
Description: Embla based carousel component

## Installation

```bash
yarn add embla-carousel@^8.5.2 embla-carousel-react@^8.5.2 @mantine/carousel
```

```bash
npm install embla-carousel@^8.5.2 embla-carousel-react@^8.5.2 @mantine/carousel
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import carousel styles after core package styles
import '@mantine/carousel/styles.css';
```

## Do not forget to import styles

Have you followed the installation instructions above but something is not working
(Carousel slides are rendered vertically, no controls or indicators)?
You've fallen into the trap of not importing carousel styles!
To fix the issue, import carousel styles at the root of your application:

```tsx
import '@mantine/carousel/styles.css';
```

## Documentation demos

The demos presented on this page use blue background color for demonstration purposes. To simplify
demo code, background color and other demo-only styles are not included in the demo code.
When you copy and paste demo code to your project, it will not have blue background color.

## Usage

`@mantine/carousel` package is based on [embla carousel](https://www.embla-carousel.com/):

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel withIndicators height={200}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## Options

```tsx
import { Carousel } from '@mantine/carousel';


function Demo() {
  return (
    <Carousel
      slideSize="70%"
      height={200}
       orientation="horizontal" slideGap="md" controlsOffset="sm" controlSize={26} withControls={true} withIndicators={false}
    >
      {/* ...slides */}
    </Carousel>
  );
}
```


## Embla options

You can pass configuration options directly to embla carousel with the `emblaOptions` prop.
You can find embla options description in the [embla options reference](https://www.embla-carousel.com/api/options/).

Example of passing `loop`, `dragFree` and `align` options:

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel
      slideSize="70%"
      height={200}
      emblaOptions={{
        loop: true,
        dragFree: false,
        align: 'center'
      }}
    >
      {/* ...slides */}
    </Carousel>
  );
}
```


## Size and gap

Set `slideSize` and `slideGap` on the `Carousel` component to control the size and gap of every slide:

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      emblaOptions={{ loop: true, align: 'start', slidesToScroll: 3 }}
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## Responsive styles

`slideSize` and `slideGap` props work the same way as [style props](https://mantine.dev/llms/styles-style-props.md),
you can pass an object with values for different breakpoints:

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
      slideGap={{ base: 0, sm: 'md' }}
      emblaOptions={{ loop: true, align: 'start' }}
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## Container queries

To use [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
instead of media queries, set `type="container"`. With container queries, slide size and gap
will be adjusted based on the container width, not the viewport width.

Note that when using container queries, `slideSize` and `slideGap` props cannot
reference `theme.breakpoints` values in keys. You are required to use exact px or em values.

To see how the slide size and gap changes, resize the root element of the demo
with the resize handle located at the bottom right corner of the demo:

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    // Wrapper div is added for demonstration purposes only,
    // It is not required in real projects
    <div
      style={{
        resize: 'horizontal',
        overflow: 'hidden',
        maxWidth: '100%',
        minWidth: 250,
        padding: 10,
      }}
    >
      <Carousel
        withIndicators
        height={200}
        type="container"
        slideSize={{ base: '100%', '300px': '50%', '500px': '33.333333%' }}
        slideGap={{ base: 0, '300px': 'md', '500px': 'lg' }}
        emblaOptions={{ loop: true, align: 'start' }}
      >
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
        {/* ...other slides */}
      </Carousel>
    </div>
  );
}
```


## Drag free

`dragFree` will disable slide snap points – users will be able to stop dragging at any position:

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel
      withIndicators
      height={200}
      emblaOptions={{ dragFree: true, align: 'start' }}
      slideGap="md"
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## Vertical orientation

A carousel with `orientation="vertical"` requires the `height` prop to be set:

```tsx
import { Carousel } from '@mantine/carousel';

function Demo() {
  return (
    <Carousel orientation="vertical" height={200} withIndicators>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## Controls icons

You can replace default next/previous controls icons with any React nodes:

```tsx
import { Carousel } from '@mantine/carousel';
import { ArrowRightIcon, ArrowLeftIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Carousel
      height={180}
      nextControlIcon={<ArrowRightIcon size={16} />}
      previousControlIcon={<ArrowLeftIcon size={16} />}
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
```


## 100% height

Set `height="100%"` to make the Carousel take 100% height of the container. Note that in this case:

* the container element must have `display: flex` styles
* the carousel root element must have `flex: 1` styles
* the container element must have fixed height

```tsx
import { Carousel } from '@mantine/carousel';

export function PercentageHeight() {
  return (
    <div style={{ height: 400, display: 'flex' }}>
      <Carousel withIndicators height="100%" flex={1}>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel>
    </div>
  );
}
```

## Get embla instance

You can get the [embla instance](https://www.embla-carousel.com/api/methods/) with the `getEmblaApi` prop.
You will be able to enhance the carousel with additional logic after that using embla api methods:

```tsx
import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { Carousel } from '@mantine/carousel';
import { Progress } from '@mantine/core';

function Demo() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

  const handleScroll = useCallback(() => {
    if (!embla) {
      return;
    }
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on('scroll', handleScroll);
      handleScroll();
    }
  }, [embla]);

  return (
    <>
      <Carousel
        emblaOptions={{ dragFree: true }}
        slideSize="50%"
        slideGap="md"
        height={200}
        getEmblaApi={setEmbla}
        initialSlide={2}
      >
        <Slides count={12} />
      </Carousel>
      <Progress value={scrollProgress} maw={320} size="sm" mt="xl" mx="auto" />
    </>
  );
}
```


## Indicator styles

```tsx
// Demo.tsx
import { Carousel } from '@mantine/carousel';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Carousel withIndicators height={200} classNames={classes}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}

// Demo.module.css
.indicator {
  width: 12px;
  height: 4px;
  transition: width 250ms ease;

  &[data-active] {
    width: 40px;
  }
}
```


## Hide inactive controls

```tsx
// Demo.tsx
import { Carousel } from '@mantine/carousel';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Carousel height={200} classNames={classes}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}

// Demo.module.css
.control {
  &[data-inactive] {
    opacity: 0;
    cursor: default;
  }
}
```


## Show controls on hover

```tsx
// Demo.tsx
import { Carousel } from '@mantine/carousel';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Carousel height={200} classNames={classes}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}

// Demo.module.css
.controls {
  transition: opacity 150ms ease;
  opacity: 0;
}

.root {
  &:hover {
    .controls {
      opacity: 1;
    }
  }
}
```


## Example: Images carousel

```tsx
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

const images = [
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
];

function Demo() {
  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} />
    </Carousel.Slide>
  ));

  return (
    <Carousel withIndicators height={200}>
      {slides}
    </Carousel>
  );
}
```


## Example: Cards carousel

```tsx
// Demo.tsx
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Paper, Title, useMantineTheme, Text } from '@mantine/core';
import classes from './Demo.module.css';

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best forests to visit in North America',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Hawaii beaches review: better than you think',
    category: 'beach',
  },
  {
    image:
      'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Mountains at night: 12 best locations to enjoy the view',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Aurora in Norway: when to visit for best experience',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best places to visit this winter',
    category: 'tourism',
  },
  {
    image:
      'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Active volcanos reviews: travel at your own risk',
    category: 'nature',
  },
];

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

function Demo() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: 'xl', sm: 2 }}
      emblaOptions={{ align: 'start', slidesToScroll: mobile ? 1 : 2 }}
    >
      {slides}
    </Carousel>
  );
}

// Demo.module.css
.card {
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-size: cover;
  background-position: center;
}

.title {
  font-weight: 900;
  color: var(--mantine-color-white);
  line-height: 1.2;
  font-size: 32px;
  margin-top: var(--mantine-spacing-xs);
  cursor: default;
}

.category {
  color: var(--mantine-color-white);
  opacity: 0.7;
  font-weight: 700;
  text-transform: uppercase;
  cursor: default;
}
```


## Accessibility

Set `aria-label` or `aria-labelledby` on the `Carousel` component to make it accessible for screen readers:

```tsx
import { Carousel } from '@mantine/carousel';

export function AccessibleCarousel() {
  return (
    <Carousel aria-label="Gallery of nature pictures">
      <Carousel.Slide>...</Carousel.Slide>
      <Carousel.Slide>...</Carousel.Slide>
      <Carousel.Slide>...</Carousel.Slide>
    </Carousel>
  );
}
```

Set `aria-label` for next/previous controls with `nextControlProps` and `previousControlProps` props:

```tsx
import { Carousel } from '@mantine/carousel';

export function AccessibleControlsCarousel() {
  return (
    <Carousel
      aria-label="Gallery of nature pictures"
      nextControlProps={{ 'aria-label': 'Next slide' }}
      previousControlProps={{ 'aria-label': 'Previous slide' }}
    >
      <Carousel.Slide>...</Carousel.Slide>
      <Carousel.Slide>...</Carousel.Slide>
      <Carousel.Slide>...</Carousel.Slide>
    </Carousel>
  );
}
```


#### Props

**Carousel props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | `Carousel.Slide` components |
| controlSize | React.CSSProperties["width"] | - | Controls size of the next and previous controls |
| controlsOffset | MantineSpacing | - | Controls position of the next and previous controls, key of `theme.spacing` or any valid CSS value |
| emblaOptions | Partial<OptionsType> | - | Options passed down to embla carousel |
| getEmblaApi | (embla: EmblaCarouselType) => void | - | Get embla API as ref |
| getIndicatorProps | (index: number) => ElementProps<"button"> & DataAttributes | - | Function to get props for indicator button |
| height | Height<string \| number> | - | Slides container `height`, required for vertical orientation |
| includeGapInSize | boolean | - | Determines whether gap between slides should be treated as part of the slide size |
| initialSlide | number | - | Index of initial slide |
| nextControlIcon | React.ReactNode | - | Icon of the next control |
| nextControlProps | React.ComponentProps<"button"> | - | Props passed down to next control |
| onNextSlide | () => void | - | Called when next slide is shown |
| onPreviousSlide | () => void | - | Called when previous slider is shown |
| onSlideChange | (index: number) => void | - | Called with slide index when slide changes |
| orientation | "horizontal" \| "vertical" | - | Carousel orientation |
| plugins | CreatePluginType<LoosePluginType, {}>[] | - | A list of embla plugins |
| previousControlIcon | React.ReactNode | - | Icon of the previous control |
| previousControlProps | React.ComponentProps<"button"> | - | Props passed down to previous control |
| slideGap | StyleProp<MantineSpacing> | - | Key of theme.spacing or number to set gap between slides |
| slideSize | StyleProp<string \| number> | - | Controls slide width based on viewport width |
| type | "media" \| "container" | - | Determines type of queries used for responsive styles |
| withControls | boolean | - | Determines whether next/previous controls should be displayed |
| withIndicators | boolean | - | Determines whether indicators should be displayed |
| withKeyboardEvents | boolean | - | Determines whether arrow key should switch slides |


#### Styles API

Carousel component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Carousel selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Carousel-root | Root element |
| slide | .mantine-Carousel-slide | `Carousel.Slide` root element |
| container | .mantine-Carousel-container | Slides container |
| viewport | .mantine-Carousel-viewport | Main element, contains slides container and all controls |
| controls | .mantine-Carousel-controls | Next/previous controls container |
| control | .mantine-Carousel-control | Next/previous control |
| indicators | .mantine-Carousel-indicators | Indicators container |
| indicator | .mantine-Carousel-indicator | Indicator button |

**Carousel CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --carousel-control-size | Controls `width` and `height` of the next/previous buttons |
| root | --carousel-controls-offset | Controls offsets of the next/previous buttons |
| root | --carousel-height | Controls height of the carousel |

**Carousel data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-orientation | - | Value of `orientation` prop |
| root | data-include-gap-in-size | `includeGapInSize` prop is set | - |
| control | data-inactive | No previous/next slides are available | - |
| indicator | data-active | Associated slide is active | - |


--------------------------------------------------------------------------------

### CodeHighlight
Package: @mantine/code-highlight
Import: import { CodeHighlight } from '@mantine/code-highlight';
Description: Highlight code with shiki or highlight.js

## Installation

```bash
yarn add @mantine/code-highlight
```

```bash
npm install @mantine/code-highlight
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import code-highlight styles after core package styles
import '@mantine/code-highlight/styles.css';
```

## Example

`CodeHighlight` component is used to display code snippets with syntax highlighting.
It provides a flexible adapter system that allows you to use any code highlighting library
of your choice.

Example of code highlighting with [shiki](https://shiki.matsu.io/):


```tsx
type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}
```

```tsx
import { CodeHighlight } from '@mantine/code-highlight';

const exampleCode = `
type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}
`;

function Demo() {
  return <CodeHighlight code={exampleCode} language="tsx" radius="md" />;
}
```


## Adapters

`@mantine/code-highlight` package does not depend on any specific code highlighting library.
You can choose one of the default adapters provided by the package or create your own.

Default adapters:

* `createShikiAdapter` – creates [shiki](https://shiki.matsu.io/) adapter
* `createHighlightJsAdapter` – creates [highlight.js](https://highlightjs.org/) adapter
* `plainTextAdapter` – does not highlight code, just displays it as plain text (used by default if no adapter is provided)

## Usage with shiki

[Shiki](https://shiki.matsu.io/) library provides the most advanced syntax highlighting
for TypeScript and CSS/Sass code. It uses textmate grammars to highlight code (same as in VSCode).
The Shiki adapter is recommended if you need to highlight advanced TypeScript (generics, jsx nested in props) or CSS code (custom syntaxes, newest features).
The Shiki adapter is used for all code highlighting in Mantine documentation.

To use the shiki adapter, you need to install the `shiki` package:

```bash
yarn add shiki
```

```bash
npm install shiki
```

Then wrap your app with `CodeHighlightAdapterProvider` and provide `createShikiAdapter` as the `adapter` prop:

```tsx
import { MantineProvider } from '@mantine/core';
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@mantine/code-highlight';

// Shiki requires async code to load the highlighter
async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json'],
    // You can load supported themes here
    themes: [],
  });

  return shiki;
}

const shikiAdapter = createShikiAdapter(loadShiki);

function App() {
  return (
    <MantineProvider>
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        {/* Your app here */}
      </CodeHighlightAdapterProvider>
    </MantineProvider>
  );
}
```

After that, you can use the `CodeHighlight` component in your application:


```tsx
type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}
```

```tsx
import { CodeHighlight } from '@mantine/code-highlight';

const exampleCode = `
type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}
`;

function Demo() {
  return <CodeHighlight code={exampleCode} language="tsx" radius="md" />;
}
```


All further code highlighting examples on this page use the shiki adapter.

## Usage with highlight.js

[Highlight.js](https://highlightjs.org/) provides less accurate highlighting compared to shiki,
but it has a smaller bundle size and better performance. Choose the highlight.js adapter if you need
to highlight basic JavaScript, HTML, and CSS code.

To use the highlight.js adapter, you need to install the `highlight.js` package:

```bash
yarn add highlight.js
```

```bash
npm install highlight.js
```

Then wrap your app with `CodeHighlightAdapterProvider` and provide `createHighlightJsAdapter` as the `adapter` prop:

```tsx
import { MantineProvider } from '@mantine/core';
import { CodeHighlightAdapterProvider, createHighlightJsAdapter } from '@mantine/code-highlight';
import hljs from 'highlight.js/lib/core';
import tsLang from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('typescript', tsLang);

const highlightJsAdapter = createHighlightJsAdapter(hljs);

function App() {
  return (
    <MantineProvider>
      <CodeHighlightAdapterProvider adapter={highlightJsAdapter}>
        {/* Your app here */}
      </CodeHighlightAdapterProvider>
    </MantineProvider>
  );
}
```

Then you need to add styles from one of the highlight.js themes to your application.
You can do that by importing a css file from the `highlight.js` package or adding it via
a CDN link to the head of your application:

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
/>
```

After that, you can use the `CodeHighlight` component in your application.

