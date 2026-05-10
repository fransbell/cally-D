## CSS variables resolver

`cssVariablesResolver` prop on [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) allows you to
modify values of Mantine CSS variables or even add your own variables.
`cssVariablesResolver` is a function that accepts [theme](https://mantine.dev/llms/theming-theme-object.md) as a single
argument and returns an object with CSS variables divided into three groups:

* `variables` – variables that do not depend on color scheme
* `light` – variables for light color scheme only
* `dark` – variables for dark color scheme only

Example of adding new CSS variables based on `theme.other`:

```tsx
import {
  createTheme,
  CSSVariablesResolver,
  MantineProvider,
} from '@mantine/core';

const themeOverride = createTheme({
  other: {
    deepOrangeLight: '#E17900',
    deepOrangeDark: '#FC8C0C',
    heroHeight: 400,
  },
});

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-hero-height': theme.other.heroHeight,
  },
  light: {
    '--mantine-color-deep-orange': theme.other.deepOrangeLight,
  },
  dark: {
    '--mantine-color-deep-orange': theme.other.deepOrangeDark,
  },
});

function Demo() {
  return (
    <MantineProvider
      theme={themeOverride}
      cssVariablesResolver={resolver}
    >
      {/* Your app here */}
    </MantineProvider>
  );
}
```

Then you will be able to use `--mantine-hero-height` and `--mantine-color-deep-orange` variables
in any part of your application:

```css
.hero {
  height: var(--mantine-hero-height);

  /* background color will automatically change based on color scheme */
  background-color: var(--mantine-color-deep-orange);
}
```


--------------------------------------------------------------------------------

### DataAttributes

# data attributes

Mantine components use `data-*` attributes to apply styles. These attributes are used as
modifiers to apply styles based on component state. The general rule of Mantine component
styles: one class with shared styles and any number of `data-*` attributes as modifiers.

Example of applying styles with `data-*` attributes:

```tsx
// Demo.module.css
.root {
  border-top-left-radius: var(--mantine-radius-xl);
  border-bottom-left-radius: var(--mantine-radius-xl);
  padding-left: 4px;

  /* The following styles will be applied only when button is disabled */
  &[data-disabled] {
    /* You can use Mantine PostCSS mixins inside data attributes */
    @mixin light {
      border: 1px solid var(--mantine-color-gray-2);
    }

    @mixin dark {
      border: 1px solid var(--mantine-color-dark-4);
    }

    /* You can target child elements that are inside .root[data-disabled] */
    & .section[data-position='left'] {
      opacity: 0.6;
    }
  }
}

.section {
  /* Apply styles only to left section */
  &[data-position='left'] {
    --section-size: calc(var(--button-height) - 8px);

    background-color: var(--mantine-color-body);
    color: var(--mantine-color-text);
    height: var(--section-size);
    width: var(--section-size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--mantine-radius-xl);
  }

  &[data-position='right'] {
    @mixin rtl {
      transform: rotate(180deg);
    }
  }
}

// Demo.tsx
import { Button, ButtonProps, Group } from '@mantine/core';
import { ArrowRightIcon } from '@phosphor-icons/react';
import classes from './Demo.module.css';

function SendFilesButton(props: ButtonProps & React.ComponentProps<'button'>) {
  return <Button {...props} classNames={classes} />;
}

function Demo() {
  return (
    <Group>
      <SendFilesButton
        leftSection="12"
        rightSection={<ArrowRightIcon size={18} />}
      >
        Send files
      </SendFilesButton>
      <SendFilesButton
        leftSection="3"
        rightSection={<ArrowRightIcon size={18} />}
        disabled
      >
        Send files
      </SendFilesButton>
    </Group>
  );
}
```


## data attributes values

Most of the `data-*` attributes do not have associated values. They represent boolean
state or a feature. For example, when the `disabled` prop on [Button](https://mantine.dev/llms/core-button.md) is set,
the `data-disabled` attribute is added to the `<button />` element:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button disabled className="my-button">
      Disabled button
    </Button>
  );
}
```

Will output the following HTML:

```html
<button class="my-button" data-disabled>Disabled button</button>
```

You can then use this attribute to apply styles to the disabled button:

```css
.my-button {
  color: var(--mantine-color-black);

  &[data-disabled] {
    color: var(--mantine-color-gray-5);
  }
}
```

When the `disabled` prop is not set, the `data-disabled` attribute is not added to the
button:

```html
<button class="my-button">Not disabled button</button>
```

In some cases, `data-*` attributes have associated values. For example, a [Button](https://mantine.dev/llms/core-button.md)
component's `section` element has an associated `data-position` attribute which can be
`left` or `right`. The following example will render two `section` elements, one with
`data-position="left"` and another with `data-position="right"`:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button leftSection="L" rightSection="R">
      Label
    </Button>
  );
}
```

Will output the following HTML:

```html
<button>
  <span class="section" data-position="left">L</span>
  Label
  <span class="section" data-position="right">R</span>
</button>
```

You can then use this attribute to apply styles to the left and right sections:

```css
.section {
  /* Styles applied to both sections */
  width: 2rem;

  /* Styles applied only to left section */
  &[data-position='left'] {
    background-color: red;
  }

  /* Styles applied only to right section */
  &[data-position='right'] {
    background-color: blue;
  }
}
```

## Components data attributes documentation

Every component that uses `data-*` attributes has a dedicated section under the `Styles API` tab.

The [Button](https://mantine.dev/llms/core-button.md) component `data-*` attributes table:

How to read the table:

* `selector` column – [Styles API](https://mantine.dev/llms/styles-styles-api.md) selector (or multiple selectors) to which data attribute is added
* `attribute` column – data attribute name
* `condition` column – condition based on which the data attribute is added to the element
* `value` column – value of the data attribute

## mod prop

All components support the `mod` prop, which allows adding data attributes to
the root element. CamelCase keys are converted to kebab-case. If a key starts with `data-`,
the prefix is not duplicated.

Examples of using `mod` prop:

```tsx
import { Box } from '@mantine/core';

<Box mod="data-button" />;
// -> <div data-button />

<Box mod={{ opened: true }} />;
// -> <div data-opened />

<Box mod={{ someValue: 'hello' }} />;
// -> <div data-some-value="hello" />

<Box mod={{ opened: false }} />;
// -> <div />

<Box mod={['button', { opened: true }]} />;
// -> <div data-button data-opened />

<Box mod={{ orientation: 'horizontal' }} />;
// -> <div data-orientation="horizontal" />
```


--------------------------------------------------------------------------------

### Emotion

# Usage with Emotion

Prior to version 7.0, Mantine used [Emotion](https://emotion.sh/) as a styling solution.
It was replaced with [CSS modules](https://mantine.dev/llms/styles-css-modules.md) in version 7.0, but you can still
use Emotion with Mantine if you prefer it over CSS modules.

Note that the `createStyles` function, `sx` and `styles` props work differently from the same
features in [version 6.x](https://v6.mantine.dev/styles/create-styles/). If you are planning
to upgrade from version 6.x to 7.x, follow the [migration guide](https://mantine.dev/llms/guides-6x-to-7x.md).

The `@mantine/emotion` package is compatible with `@mantine/core` 7.9.0 and higher. Before
installing, make sure that you are using the latest version of all `@mantine/*` packages.

## Caveats and support

[Emotion](https://emotion.sh/) is a runtime CSS-in-JS library – styles are generated
and injected into the DOM at runtime. This approach has some limitations:

* **Limited server-side rendering support** – modern frameworks like Next.js with app router
  do not fully support Emotion or require additional configuration.
* **Runtime overhead** – styles are generated and injected at runtime, which can lead to
  performance issues on pages with many components.
* **Additional bundle size** – your bundle will include `@emotion/react` (21.2kB minified),
  `@mantine/emotion` (~2kb minified) and all styles that you use in your components.

The `@mantine/emotion` package can be used with the following frameworks:

* **Vite** and **CRA** with basic setup
* **Next.js with pages router** with additional setup for server-side rendering provided by the package
* **Next.js with app router** with additional setup for server-side rendering provided by Emotion
* Any other framework that does not require server-side rendering with basic setup

There is no official support (the package can probably be used but it's not tested and documentation is not provided) for:

* **React Router**
* **Gatsby**
* **Redwood**
* Any other framework that has server-side rendering

Note that Emotion is not recommended for new projects. If you are starting a new project with Mantine,
consider using [CSS modules](https://mantine.dev/llms/styles-css-modules.md) instead.

## Usage with Vite

[View example repository with full setup](https://github.com/mantinedev/vite-min-template/tree/emotion)

Install dependencies:

```bash
yarn add @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils
```

```bash
npm install @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils
```

Create `emotion.d.ts` file in `src` directory to add types support for `sx` and `styles` props:

```tsx
import '@mantine/core';

import type { EmotionStyles, EmotionSx } from '@mantine/emotion';

declare module '@mantine/core' {
  export interface BoxProps {
    sx?: EmotionSx;
    styles?: EmotionStyles;
  }
}
```

Wrap your application with `MantineEmotionProvider` and add `emotionTransform` to `MantineProvider`:

```tsx
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import {
  emotionTransform,
  MantineEmotionProvider,
} from '@mantine/emotion';

export default function App() {
  return (
    <MantineProvider stylesTransform={emotionTransform}>
      <MantineEmotionProvider>App</MantineEmotionProvider>
    </MantineProvider>
  );
}
```

Done! You can now use `sx`, `styles` props and `createStyles` in your application:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      sx={(theme, u) => ({
        padding: 40,

        [u.light]: {
          backgroundColor: theme.colors.blue[0],
          color: theme.colors.blue[9],

          '&:hover': {
            backgroundColor: theme.colors.blue[1],
          },
        },
      })}
    >
      Box with emotion sx prop
    </Box>
  );
}
```

## Usage with Next.js pages router

[View example repository with full setup](https://github.com/mantinedev/next-pages-min-template/tree/emotion)

Install dependencies:

```bash
yarn add @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils @emotion/server
```

```bash
npm install @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils @emotion/server
```

Create `emotion` folder with `cache.ts` and `emotion.d.ts` files.

`cache.ts` file:

```tsx
import createCache from '@emotion/cache';

export const emotionCache = createCache({ key: 'css' });
```

`emotion.d.ts` file:

```tsx
import '@mantine/core';

import type { EmotionStyles, EmotionSx } from '@mantine/emotion';

declare module '@mantine/core' {
  export interface BoxProps {
    sx?: EmotionSx;
    styles?: EmotionStyles;
  }
}
```

Add the following content to `pages/_document.tsx` file:

```tsx
import NextDocument, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { ColorSchemeScript } from '@mantine/core';
import { createGetInitialProps } from '@mantine/emotion';
// Import cache created in the previous step
import { emotionCache } from '../emotion/cache';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

const stylesServer = createEmotionServer(emotionCache);

Document.getInitialProps = createGetInitialProps(
  NextDocument,
  stylesServer
);
```

Add `MantineEmotionProvider` and `emotionTransform` to `pages/_app.tsx` file:

```tsx
import '@mantine/core/styles.css';

import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import {
  emotionTransform,
  MantineEmotionProvider,
} from '@mantine/emotion';
import { emotionCache } from '../emotion/cache';

export default function App({ Component, pageProps }: any) {
  return (
    <MantineEmotionProvider cache={emotionCache}>
      <MantineProvider stylesTransform={emotionTransform}>
        <Head>
          <title>Mantine Template</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <Component {...pageProps} />
      </MantineProvider>
    </MantineEmotionProvider>
  );
}
```

Done! You can now use `sx`, `styles` props and `createStyles` in your application:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      sx={(theme, u) => ({
        padding: 40,

        [u.light]: {
          backgroundColor: theme.colors.blue[0],
          color: theme.colors.blue[9],

          '&:hover': {
            backgroundColor: theme.colors.blue[1],
          },
        },
      })}
    >
      Box with emotion sx prop
    </Box>
  );
}
```

## Usage with Next.js app router

[View example repository with full setup](https://github.com/mantinedev/next-app-min-template/tree/emotion)

Install dependencies:

```bash
yarn add @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils @emotion/server
```

```bash
npm install @mantine/emotion @emotion/react @emotion/cache @emotion/serialize @emotion/utils @emotion/server
```

Create `app/emotion.d.ts` file with the following content:

```tsx
import '@mantine/core';

import type { EmotionStyles, EmotionSx } from '@mantine/emotion';

declare module '@mantine/core' {
  export interface BoxProps {
    sx?: EmotionSx;
    styles?: EmotionStyles;
  }
}
```

Create `app/EmotionRootStyleRegistry.tsx` file with the following content:

```tsx
'use client';

import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'my' });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
```

Add `RootStyleRegistry`, `MantineEmotionProvider` and `emotionTransform` to `app/layout.tsx`.
It should look something like this:

```tsx
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import {
  emotionTransform,
  MantineEmotionProvider,
} from '@mantine/emotion';
import { RootStyleRegistry } from './EmotionRootStyleRegistry';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <RootStyleRegistry>
          <MantineEmotionProvider>
            <MantineProvider stylesTransform={emotionTransform}>
              {children}
            </MantineProvider>
          </MantineEmotionProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
```

Done! You can now use `sx`, `styles` props and `createStyles` in your application.
Note that `'use client'` is required in most components that use `sx`, `styles` or `createStyles`:

```tsx
'use client';

import { Box } from '@mantine/core';

export default function HomePage() {
  return (
    <Box
      sx={(theme, u) => ({
        padding: 40,

        [u.light]: {
          backgroundColor: theme.colors.blue[0],
          color: theme.colors.blue[9],

          '&:hover': {
            backgroundColor: theme.colors.blue[1],
          },
        },
      })}
    >
      Box with emotion sx prop
    </Box>
  );
}
```

## sx prop

With the setup above you can use `sx` prop in all Mantine components.
`sx` prop allows adding styles to the root element of the component.
It accepts either a styles object or a function that receives theme, utilities and returns styles object:

```tsx
import { Box, Button } from '@mantine/core';

function Demo() {
  return (
    <>
      <Box
        sx={{
          padding: 40,
          '&:hover': { padding: 80 },
        }}
      >
        Box with object sx
      </Box>

      <Button
        sx={(theme, u) => ({
          padding: 10,

          [u.light]: {
            backgroundColor: theme.colors.blue[0],
            color: theme.colors.blue[9],
            '&:hover': {
              backgroundColor: theme.colors.blue[1],
            },
          },

          [u.dark]: {
            backgroundColor: theme.colors.blue[9],
            color: theme.colors.blue[0],
            '&:hover': {
              backgroundColor: theme.colors.blue[8],
            },
          },
        })}
      >
        Button with function sx
      </Button>
    </>
  );
}
```

### mergeSx function

You can use the `mergeSx` function to merge multiple `sx` props into one. This
can be useful for merging `sx` prop provided to a custom component with its
own `sx`, like so:

```tsx
import { Box } from '@mantine/core'
import { EmotionSx, mergeSx } from '@mantine/emotion'

interface MyCustomBoxProps {
  sx?: EmotionSx
}

function MyCustomBox({ sx }: MyCustomBoxProps) {
  return (
    <Box sx={mergeSx(theme => ({ ... }), sx)}>...</Box>
  )
}

function App() {
  return (
    <MyCustomBox sx={(theme) => ({ ... })} />
  )
}
```

## styles prop

`styles` prop works similar to `sx` prop, but it allows adding styles to all
nested elements of the components that are specified in the Styles API table.
`styles` prop accepts either an object of styles objects or a function that
receives theme, component props, utilities and returns styles object:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      color="red"
      styles={(theme, { color }, u) => ({
        root: {
          padding: 10,
          backgroundColor: theme.colors[color || 'blue'][7],
          color: theme.white,

          '&:hover': {
            backgroundColor: theme.colors[color || 'blue'][8],
          },
        },

        label: {
          [u.light]: {
            border: `1px solid ${theme.black}`,
          },
          [u.dark]: {
            border: `1px solid ${theme.white}`,
          },
        },
      })}
    >
      Button with styles prop
    </Button>
  );
}
```

## styles in theme

You can add styles to Mantine components with [Styles API](https://mantine.dev/llms/styles-styles-api.md) using
Emotion with `styles` prop. Note that to avoid types collisions, you should not use
`Component.extend` method and just pass component configuration object directly.

```tsx
import { createTheme, MantineTheme, TextProps } from '@mantine/core';
import { EmotionHelpers } from '@mantine/emotion';

export const theme = createTheme({
  components: {
    Text: {
      styles: (
        theme: MantineTheme,
        _props: TextProps,
        u: EmotionHelpers
      ) => ({
        root: {
          [u.light]: {
            color: theme.colors.blue[7],
          },
        },
      }),
    },
  },
});
```

## createStyles

`createStyles` function accepts a function to generate styles with [Emotion](https://emotion.sh/).
The function receives 3 arguments that will be described more detailed in the following demos:

* `theme` – [Mantine theme object](https://mantine.dev/llms/theming-theme-object.md)
* `params` – object with additional parameters that can be passed to the function in `useStyles` hook
* `u` - object with utilities to generate selectors

`createStyles` function returns `useStyles` hook that should be called in the component
that uses given styles:

```tsx
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme, _, u) => ({
  wrapper: {
    maxWidth: 400,
    width: '100%',
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: theme.radius.sm,

    // Use light and dark selectors to change styles based on color scheme
    [u.light]: {
      backgroundColor: theme.colors.gray[1],
    },

    [u.dark]: {
      backgroundColor: theme.colors.dark[5],
    },

    // Reference theme.breakpoints in smallerThan and largerThan functions
    [u.smallerThan('sm')]: {
      // Child reference in nested selectors via ref
      [`& .${u.ref('child')}`]: {
        fontSize: theme.fontSizes.xs,
      },
    },
  },

  child: {
    // Assign selector to a ref to reference it in other styles
    ref: u.ref('child'),
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,

    [u.light]: {
      backgroundColor: theme.white,
      color: theme.black,
    },

    [u.dark]: {
      backgroundColor: theme.colors.dark[8],
      color: theme.white,
    },
  },
}));

function Demo() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.child}>createStyles demo</div>
    </div>
  );
}
```


### Pseudo-classes

You can add pseudo-classes the same way as in any css-preprocessor like Sass:

```tsx
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.white,
    backgroundColor: theme.colors.blue[6],
    border: 0,
    borderRadius: theme.radius.md,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    cursor: 'pointer',
    margin: theme.spacing.md,

    // Use pseudo-classes just like you would in Sass
    '&:hover': {
      backgroundColor: theme.colors.blue[9],
    },

    '&:not(:first-of-type)': {
      backgroundColor: theme.colors.violet[6],

      // pseudo-classes can be nested
      '&:hover': {
        backgroundColor: theme.colors.violet[9],
      },
    },
  },
}));

function Demo() {
  const { classes } = useStyles();
  return (
    <div>
      <button type="button" className={classes.button}>
        First
      </button>
      <button type="button" className={classes.button}>
        Second
      </button>
      <button type="button" className={classes.button}>
        Third
      </button>
    </div>
  );
}
```


### Styles parameters

You can receive any amount of parameters as second argument of `createStyles` function,
latter you will need to pass those parameters as argument to `useStyles` hook:

```tsx
import { createStyles } from '@mantine/emotion';

interface ButtonProps {
  color: 'blue' | 'violet';
  radius: number;
}

const useStyles = createStyles((theme, { color, radius }: ButtonProps) => ({
  button: {
    color: theme.white,
    backgroundColor: theme.colors[color][6],
    borderRadius: radius,
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    border: 0,
    cursor: 'pointer',
  },
}));

function Button({ color, radius }: ButtonProps) {
  const { classes } = useStyles({ color, radius });
  return (
    <button type="button" className={classes.button}>
      {color} button with {radius} radius
    </button>
  );
}

function Demo() {
  return (
    <>
      <Button color="blue" radius={5} />
      <Button color="violet" radius={50} />
    </>
  );
}
```


### Composition and nested selectors

Since `createStyles` produces scoped class names you will need to create a reference to selector
in order to get static selector. Use `u.ref` function to assign static selectors:

```tsx
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme, _, u) => ({
  button: {
    // assign reference to selector
    ref: u.ref('button'),

    // and add any other properties
    backgroundColor: theme.colors.blue[6],
    color: theme.white,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderRadius: theme.radius.md,
    cursor: 'pointer',
    border: 0,
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.xl,

    [u.light]: {
      backgroundColor: theme.colors.gray[1],
    },

    [u.dark]: {
      backgroundColor: theme.colors.dark[8],
    },

    // reference button with nested selector
    [`&:hover .${u.ref('button')}`]: {
      backgroundColor: theme.colors.violet[6],
    },
  },
}));

function Demo() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <button className={classes.button} type="button">
        Hover container to change button color
      </button>
    </div>
  );
}
```


### Classes merging (cx function)

To merge class names use `cx` function, it has the same api as [clsx](https://www.npmjs.com/package/clsx) package.

**!important:** Do not use external libraries like [classnames](https://www.npmjs.com/package/classnames)
or [clsx](https://www.npmjs.com/package/clsx) with class names created with `createStyles` function
as it will produce styles collisions.

```tsx
import { useState } from 'react';
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme, _, u) => ({
  button: {
    border: 0,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    cursor: 'pointer',
    margin: theme.spacing.md,
    lineHeight: 1,

    [u.light]: {
      backgroundColor: theme.colors.gray[1],
    },

    [u.dark]: {
      backgroundColor: theme.colors.dark[5],
    },
  },

  active: {
    color: theme.white,

    [u.light]: {
      backgroundColor: theme.colors.blue[6],
    },
    [u.dark]: {
      backgroundColor: theme.colors.blue[8],
    },
  },
}));

function Demo() {
  const [active, setActive] = useState(0);
  const { classes, cx } = useStyles();

  return (
    <div>
      <button
        className={cx(classes.button, { [classes.active]: active === 0 })}
        onClick={() => setActive(0)}
        type="button"
      >
        First
      </button>
      <button
        className={cx(classes.button, { [classes.active]: active === 1 })}
        onClick={() => setActive(1)}
        type="button"
      >
        Second
      </button>
    </div>
  );
}
```


### Media queries

You can use nested media queries like in Sass. Within query body you can use `theme.breakpoints`
defined with [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) or just static values:

```tsx
import { em, getBreakpointValue } from '@mantine/core';
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme, _, u) => ({
  container: {
    height: 100,
    backgroundColor: theme.colors.blue[6],

    // Media query with value from theme
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.xl, theme.breakpoints) - 1)})`]: {
      backgroundColor: theme.colors.pink[6],
    },

    // Simplify media query writing with theme functions
    [u.smallerThan('lg')]: {
      backgroundColor: theme.colors.yellow[6],
    },

    // Static media query
    [`@media (max-width: ${em(800)})`]: {
      backgroundColor: theme.colors.orange[6],
    },
  },
}));

function Demo() {
  const { classes } = useStyles();
  return <div className={classes.container} />;
}
```


### Keyframes

```tsx
import { createStyles, keyframes } from '@mantine/emotion';

// Export animation to reuse it in other components
export const bounce = keyframes({
  'from, 20%, 53%, 80%, to': { transform: 'translate3d(0, 0, 0)' },
  '40%, 43%': { transform: 'translate3d(0, -30px, 0)' },
  '70%': { transform: 'translate3d(0, -15px, 0)' },
  '90%': { transform: 'translate3d(0, -4px, 0)' },
});

const useStyles = createStyles((theme) => ({
  container: {
    textAlign: 'center',
    padding: theme.spacing.xl,
    animation: `${bounce} 3s ease-in-out infinite`,
  },
}));

function Demo() {
  const { classes } = useStyles();
  return <div className={classes.container}>Keyframes demo</div>;
}
```


## Utilities

`sx`, `styles` and `createStyles` callback functions receive `u` object with utilities
to generate selectors. `u` object contains the following properties:

```tsx
const u = {
  light: '[data-mantine-color-scheme="light"] &',
  dark: '[data-mantine-color-scheme="dark"] &',
  rtl: '[dir="rtl"] &',
  ltr: '[dir="ltr"] &',
  notRtl: '[dir="ltr"] &',
  notLtr: '[dir="rtl"] &',
  ref: getStylesRef,
  smallerThan: (breakpoint: MantineBreakpoint | number) =>
    `@media (max-width: ${em(getBreakpointValue(theme, breakpoint) - 0.1)})`,
  largerThan: (breakpoint: MantineBreakpoint | number) =>
    `@media (min-width: ${em(getBreakpointValue(theme, breakpoint))})`,
};
```

All utilities except `ref` can be used as selectors in styles object:

```tsx
const styles = {
  root: {
    [u.dark]: { color: 'white' },
    [u.rtl]: { padding: 10 },
    [u.smallerThan('md')]: { lineHeight: 20 },
  },
};
```


--------------------------------------------------------------------------------

### GlobalStyles

# Global styles

The `@mantine/core` package includes some global styles that are required for components to work correctly.
If you override these styles, some components might not work as expected.

Global styles are automatically imported with:

```tsx
import '@mantine/core/styles.css';
```

If you want to import styles [per component](https://mantine.dev/llms/styles-css-files-list.md), you need to import all global
styles manually:

```tsx
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';
```

## CSS reset

The `@mantine/core` package includes minimal CSS reset – it includes only basic styles required for components to work
in modern browsers. If you need to support older browsers, you can additionally include [normalize.css](https://necolas.github.io/normalize.css/)
or any other CSS reset of your choice.

```css
body {
  margin: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

input,
button,
textarea,
select {
  font: inherit;
}

button,
select {
  text-transform: none;
}
```

## Body and :root elements styles

The `@mantine/core` package includes the following `body` and `:root` element styles:

```css
:root {
  color-scheme: var(--mantine-color-scheme);
}

body {
  font-family: var(--mantine-font-family);
  font-size: var(--mantine-font-size-md);
  line-height: var(--mantine-line-height);
  background-color: var(--mantine-color-body);
  color: var(--mantine-color-text);

  -webkit-font-smoothing: var(--mantine-webkit-font-smoothing);
  -moz-osx-font-smoothing: var(--mantine-moz-font-smoothing);
}
```

## Static classes

The `@mantine/core` package includes the following static classes:

* `mantine-active` – contains `:active` styles
* `mantine-focus-auto` – contains `:focus-visible` styles
* `mantine-focus-always` – contains `:focus` styles
* `mantine-focus-never` – removes default browser focus ring
* `mantine-visible-from-{breakpoint}` – shows element when screen width is greater than the breakpoint, for example `mantine-visible-from-sm`
* `mantine-hidden-from-{breakpoint}` – hides element when screen width is greater than the breakpoint, for example `mantine-hidden-from-sm`

You can use these classes with any components or elements:

```tsx
import { Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <button type="button" className="mantine-focus-auto">
        Focus auto
      </button>
      <button type="button" className="mantine-focus-always">
        Focus always
      </button>
      <button type="button" className="mantine-focus-never">
        Focus never
      </button>
      <button type="button" className="mantine-active">
        Active
      </button>
    </Group>
  );
}
```


## Add global styles in your application

It is recommended to use [CSS modules](https://mantine.dev/llms/styles-css-modules.md) to apply styles to Mantine components
with the `className` prop or with [Styles API](https://mantine.dev/llms/styles-styles-api.md). CSS modules file names usually
end with `.module.css`. If you want to add global styles to your application, create a file with
a `.css` extension but without the `.module` part, for example `global.css`.

In global `.css` files you can reference all Mantine [CSS variables](https://mantine.dev/llms/styles-css-variables.md) and
change styles of `<body />`, `:root`, and other elements. For example, to change the body background-color:

```css
body {
  background-color: var(--mantine-color-red-filled);
}
```


--------------------------------------------------------------------------------

### MantineStyles

# Mantine styles

This guide explains how to import styles of `@mantine/*` packages in your application
and how to override them with [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
in case you do not have a way to control the order of stylesheets in your application.

## Mantine components styles

All Mantine components are built with CSS modules, but all styles are bundled before publishing to npm.
To include these styles, you need to import the `@mantine/{package}/styles.css` file in your application.
Example with the `@mantine/core` package:

```tsx
import '@mantine/core/styles.css';
```

By adding this import, you will have all styles of the `@mantine/core` components in your application.

## Import styles per component

If you want to reduce CSS bundle size, you can import styles per component. Note that some components
have dependencies. For example, the [Button](https://mantine.dev/llms/core-button.md) component uses the [UnstyledButton](https://mantine.dev/llms/core-unstyled-button.md)
component internally, so you need to import styles for both components. You can find a full list of
exported styles from the `@mantine/core` package and additional instructions on [this page](https://mantine.dev/llms/styles-css-files-list.md).

```tsx
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
```

Note that individual component styles are available only for the `@mantine/core` package.
Other packages have minimal styles that can be imported with the `@mantine/{package}/styles.css` import.

## Styles import order

It is important to maintain the correct styles import order. The `@mantine/core` package
styles must always be imported before any other Mantine package styles:

```tsx
// ✅ Correct order
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
// ❌ Incorrect order
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
```

Your application styles must always be imported after all `@mantine/*` packages styles:

```tsx
// ✅ Correct order - your styles will override Mantine styles
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './Demo.module.css';

// ❌ Incorrect order – Mantine styles will override your styles
import classes from './Demo.module.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
```

## CSS layers

Some bundlers and frameworks do not allow you to control the order of stylesheets in your application.
For example, Next.js does not guarantee [styles import order](https://github.com/vercel/next.js/issues/16630).
In this case, you can use [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to ensure
that your styles will always override Mantine styles.

All `@mantine/*` packages that export styles have an additional file in which all styles are wrapped in the
`@layer mantine` directive.

```tsx
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';

// ... other styles
```

These files contain the same styles as the `styles.css` files, but wrapped in the `@layer mantine` directive.
Make sure that you do not import both `styles.css` and `styles.layer.css` files in your application.

```tsx
// ❌ Do not import both styles.css and styles.layer.css
import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
```

Similar to package styles, you can import individual component styles with the `@layer mantine` directive:

```tsx
import '@mantine/core/styles/UnstyledButton.layer.css';
import '@mantine/core/styles/Button.layer.css';

// ... other styles
```

## How CSS layers work

CSS rules within a layer are grouped together and applied before rules without a layer. This means that
even if you do not have control over the styles import order, you can still override Mantine styles with
regular styles.

```tsx
// ✅ If your styles are not wrapped in the @layer directive,
// they will be applied after Mantine styles
import classes from './Demo.module.css';

import '@mantine/core/styles.layer.css';
```

CSS layers are also useful if you want to combine Mantine components with other libraries that also
provide styles. You can use the `@layer` directive to control the order of styles:

```scss
@layer base, mantine, components;
```

In this example, Mantine styles will take precedence over other library `base` styles, but other library
`components` styles will take precedence over Mantine component styles.

As of January 2026, CSS layers are supported in all modern browsers and have [95% browser support](https://caniuse.com/css-cascade-layers).

## Loading styles from CDN

You can also load Mantine styles from the unpkg CDN. Note that in this case it is
recommended to specify the exact version of `@mantine/*` packages both in your
`package.json` and in CDN links.

```html
<!-- Regular styles -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@mantine/core@7.4.2/styles.css"
/>

<!-- Styles with @layer directive -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@mantine/core@7.4.2/styles.layer.css"
/>
```

Styles on the unpkg CDN are available for all Mantine packages that export styles.


--------------------------------------------------------------------------------

### PostCSSPreset

# Mantine PostCSS preset

`postcss-preset-mantine` provides several CSS functions and mixins to help you write styles.
It is not required to use it, but is highly recommended. All demos that feature styles
assume that you have this preset installed.

`postcss-preset-mantine` includes the following PostCSS plugins:

* [postcss-nested](https://www.npmjs.com/package/postcss-nested)
* [postcss-mixins](https://www.npmjs.com/package/postcss-mixins) with Mantine specific mixins
* Custom plugin with `em`/`rem` functions

## Installation

Install `postcss-preset-mantine` as a dev dependency:

```bash
yarn add postcss-preset-mantine
```

```bash
npm install postcss-preset-mantine
```

## Usage

Note that setting up PostCSS may be different depending on your build tool/framework. Check
a [dedicated framework guide](https://mantine.dev/llms/getting-started.md) to learn more.
Add `postcss-preset-mantine` to your `postcss.config.cjs` file (usually it is located in the root of your project):

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
  },
};
```

All done! You can now use all the features of the preset.

## rem/em functions

`rem` and `em` functions can be used to convert pixels to rem/em units.
`16px = 1rem` and `16px = 1em`. `em` values are supposed to be used in media queries,
`rem` everywhere else. You can learn more about unit conversions in [this guide](https://mantine.dev/llms/styles-rem.md).

```scss
.demo {
  font-size: rem(16px);

  @media (min-width: em(320px)) {
    font-size: rem(32px);
  }
}
```

Will be transformed to:

```scss
.demo {
  font-size: calc(1rem * var(--mantine-scale));

  @media (min-width: 20em) {
    font-size: calc(2rem * var(--mantine-scale));
  }
}
```

## Auto convert px to rem

`autoRem` option can be used to automatically convert all pixel values to rem units
in `.css` files:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
    },
  },
};
```

This option works similar to `rem` function. The following code:

```scss
.demo {
  font-size: 16px;

  @media (min-width: 320px) {
    font-size: 32px;
  }
}
```

Will be transformed to:

```scss
.demo {
  font-size: calc(1rem * var(--mantine-scale));

  @media (min-width: 320px) {
    font-size: calc(2rem * var(--mantine-scale));
  }
}
```

Note that `autoRem` converts only CSS properties, values in `@media` queries are
not converted automatically – you still need to use `em` function to convert them.

`autoRem` option does not convert values in the following cases:

* Values in `calc()`, `var()`, `clamp()` and `url()` functions
* Values in `content` property
* Values that contain `rgb()`, `rgba()`, `hsl()`, `hsla()` colors

If you want to convert above values to rem units, use `rem` function manually.

## dark and light mixins

`dark` and `light` mixins can be used to create styles that will be applied only in dark or light color scheme.

```scss
.demo {
  @mixin light {
    color: red;
  }

  @mixin dark {
    color: blue;
  }
}
```

Will be transformed to:

```scss
[data-mantine-color-scheme='light'] .demo {
  color: red;
}

[data-mantine-color-scheme='dark'] .demo {
  color: blue;
}
```

Note that usually you do not need to use both `light` and `dark` mixins at the same time.
It is easier to define styles for light color scheme and then use `dark` mixin to override them in dark color scheme.

```scss
.demo {
  // Value for light color scheme
  color: red;

  @mixin dark {
    // Value for dark color scheme
    color: blue;
  }
}
```

To define values for light/dark color scheme on the `:root`/`html` element, use `light-root` and `dark-root` mixins instead:

```scss
:root {
  @mixin light-root {
    --color: red;
  }

  @mixin dark-root {
    --color: blue;
  }
}
```

## smaller-than and larger-than mixins

`smaller-than` and `larger-than` mixins can be used to create styles that will be applied only when the screen is smaller or larger than specified breakpoint.

```scss
.demo {
  @mixin smaller-than 320px {
    color: red;
  }

  @mixin larger-than 320px {
    color: blue;
  }
}
```

Will be transformed to:

```scss
// Breakpoint values are converted to em units
// In smaller-than mixin 0.1px is subtracted from breakpoint value
// to avoid intersection with larger-than mixin
@media (max-width: 19.99375em) {
  .demo {
    color: red;
  }
}

@media (min-width: 20em) {
  .demo {
    color: blue;
  }
}
```

You can also use `smaller-than` and `larger-than` mixins with [mantine breakpoints](https://mantine.dev/llms/styles-responsive.md#breakpoints-variables-in-css-modules):

```scss
.demo {
  @mixin smaller-than $mantine-breakpoint-sm {
    color: red;
  }

  @mixin larger-than $mantine-breakpoint-sm {
    color: blue;
  }
}
```

## light-dark function

`light-dark` function is an alternative to `light` and `dark` mixins. It accepts two arguments:
first argument is rule that will be applied in light color scheme, second argument is rule that will be applied in dark color scheme.

```css
.demo {
  color: light-dark(red, blue);
}
```

Will be transformed to:

```css
.demo {
  color: red;
}

[data-mantine-color-scheme='dark'] .demo {
  color: blue;
}
```

Note that `light-dark` function does not work on `:root`/`html` element. Use `light-root` and `dark-root` mixins instead:

```scss
// ❌ Does not work
:root {
  --color: light-dark(red, blue);
}

// ✅ Works
:root {
  @mixin light-root {
    --color: red;
  }

  @mixin dark-root {
    --color: blue;
  }
}
```

## alpha function

`alpha` function can be used to add alpha channel to color. Note that it uses [color-mix](https://caniuse.com/mdn-css_types_color_color-mix) which is not supported in some older browsers.

```scss
.demo {
  color: alpha(var(--mantine-color-red-4), 0.5);
  border: 1px solid alpha(#ffc, 0.2);
}
```

Will be transformed to:

```scss
.demo {
  color: color-mix(
    in srgb,
    var(--mantine-color-red-4),
    transparent 50%
  );
  border: 1px solid color-mix(in srgb, #ffc, transparent 80%);
}
```

## lighten and darken functions

`lighten` and `darken` functions work similar to `alpha` function, but instead of adding alpha channel they add white or black color to the color with [color-mix](https://caniuse.com/mdn-css_types_color_color-mix).

```scss
.demo {
  color: lighten(var(--mantine-color-red-4), 0.5);
  border: 1px solid darken(#ffc, 0.2);
}
```

Will be transformed to:

```scss
.demo {
  color: color-mix(in srgb, var(--mantine-color-red-4), white 50%);
  border: 1px solid color-mix(in srgb, #ffc, black 20%);
}
```

## hover mixin

`hover` mixin can be used to create styles that will be applied on hover.

```css
.demo {
  @mixin hover {
    color: orange;
  }
}
```

Will be transformed to:

```css
@media (hover: hover) {
  .demo:hover {
    color: orange;
  }
}

@media (hover: none) {
  .demo:active {
    color: orange;
  }
}
```

## rtl/ltr mixins

`rtl` mixin can be used to create styles that will be applied when `dir="rtl"` is set on parent element (usually `<html />`).

```scss
.demo {
  margin-left: 1rem;

  @mixin rtl {
    margin-left: 0;
    margin-right: 1rem;
  }
}
```

Will be transformed to:

```css
.demo {
  margin-left: 1rem;
}

[dir='rtl'] .demo {
  margin-left: 0;
  margin-right: 1rem;
}
```

`ltr` mixin works the same way, but for `dir="ltr"`:

```scss
.demo {
  margin-left: 1rem;

  @mixin ltr {
    margin-left: 0;
    margin-right: 1rem;
  }
}
```

Will be transformed to:

```css
.demo {
  margin-left: 1rem;
}

[dir='ltr'] .demo {
  margin-left: 0;
  margin-right: 1rem;
}
```

## not-rtl/not-ltr mixins

`not-rtl`/`not-ltr` mixins can be used to create styles that will be applied when the direction is set to the opposite value or not set at all.
For example, `not-rtl` styles will be applied when `dir="ltr"` or when `dir` is not set at all.

```scss
.demo {
  @mixin not-rtl {
    margin-right: 1rem;
  }
}
```

Will be transformed to:

```css
:root:not([dir='rtl']) .demo {
  margin-right: 1rem;
}
```

## where-\* mixins

`where-*` mixins are alternative to `light`, `dark`, `rlt` and `hover` mixins.
They work exactly the same, but produced CSS is less specific. These mixins are
useful when you want to easily override styles, for example, when you are building
a library or extension.

Example of using `where-light` mixin:

```scss
.demo {
  @mixin where-light {
    color: red;
  }
}
```

Will be transformed to:

```scss
:where([data-mantine-color-scheme='light']) .demo {
  color: red;
}
```

## Custom mixins

You can define custom mixins that are not included in the preset by specifying them
in the `mixins` option. To learn about mixins syntax, follow [postcss-mixins documentation](https://github.com/postcss/postcss-mixins#readme).

Example of adding `clearfix` and `circle` mixins:

```tsx
module.exports = {
  plugins: {
    'postcss-preset-mantine': {
      autoRem: true,
      mixins: {
        clearfix: {
          '&::after': {
            content: '""',
            display: 'table',
            clear: 'both',
          },
        },
        circle: (_mixin, size) => ({
          borderRadius: '50%',
          width: size,
          height: size,
        }),
      },
    },
    // ... Other plugins
  },
};
```

Then you can use these mixins in your styles:

```scss
.demo {
  @mixin clearfix;
  @mixin circle 100px;
}
```

