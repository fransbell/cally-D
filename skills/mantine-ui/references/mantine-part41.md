## MCP server (experimental)

Mantine also provides an MCP server package:

* `@mantine/mcp-server`

The server reads Mantine static MCP data published on `mantine.dev` and exposes tools that AI agents can call directly:

* `list_items`
* `get_item_doc`
* `get_item_props`
* `search_docs`

### MCP server configuration

Most MCP-compatible tools support adding servers with a JSON configuration. Use this server definition:

```json
{
  "mcpServers": {
    "mantine": {
      "command": "npx",
      "args": ["-y", "@mantine/mcp-server"]
    }
  }
}
```

To use a different data source (for example, alpha docs or local static files), add env variables:

```json
{
  "mcpServers": {
    "mantine": {
      "command": "npx",
      "args": ["-y", "@mantine/mcp-server"],
      "env": {
        "MANTINE_MCP_DATA_URL": "https://mantine.dev/mcp"
      }
    }
  }
}
```

### Using MCP server with different tools

#### Claude Desktop

1. Open MCP settings in Claude Desktop
2. Add the `mantine` server configuration above
3. Start a new chat and ask for Mantine guidance, for example: "Find Button props and give me a usage example"

#### Cursor

1. Open Cursor MCP/server settings
2. Add the same `mantine` server config
3. Use agent mode and ask Mantine-specific questions – Cursor will call MCP tools automatically

#### Windsurf

1. Open Windsurf MCP/server settings
2. Register `@mantine/mcp-server` with the same config
3. Ask for component docs, props, and examples directly in chat

#### Other MCP clients (VS Code/Cline and others)

If the client supports custom MCP servers, add the same command and args:

* command: `npx`
* args: `["-y", "@mantine/mcp-server"]`

Then use prompts like:

* "List Mantine items related to input fields"
* "Get full docs for Button"
* "Search Mantine docs for color scheme and dark mode"

## Example prompts

Here are some example prompts you can use with AI tools:

* "Using Mantine v8, how do I create a dark mode toggle?"
* "Show me how to use the AppShell component with a collapsible navbar"
* "How can I customize the theme colors in MantineProvider?"
* "Create a form with validation using Mantine's form hooks"
* "How to align input with a button in a flex container?"

## Documentation Generation

The LLM documentation is automatically generated from our source files using a compilation script. It includes:

* Component documentation from MDX files
* Props tables and types
* Code examples and demos
* Styles API documentation
* FAQ content from help.mantine.dev

There are two generated formats:

* `llms.txt` – the default compact index that links to per-page `.md` files under the `/llms` path
* `llms-full.txt` – a single large file with all documentation content

To ensure you have the latest documentation, we regenerate these files with each release. The files follow the [LLMs.txt](https://llmstxt.org/) standard for better compatibility with AI tools.

## Contributing

If you find any issues with the LLM documentation or have suggestions for improvement, please [open an issue](https://github.com/mantinedev/mantine/issues) on our GitHub repository.


--------------------------------------------------------------------------------

### NextJs

# Usage with Next.js

## Generate new application

Follow the [create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app) guide to
create a new Next.js application:

## Installation

## PostCSS setup

Install PostCSS plugins and [postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md):

```bash
yarn add postcss postcss-preset-mantine postcss-simple-vars
```

```bash
npm install postcss postcss-preset-mantine postcss-simple-vars
```

Create a `postcss.config.cjs` file at the root of your application with the following content:

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

## Setup with pages router

Add styles imports and [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) to the `pages/_app.tsx` file:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
```

Create a `pages/_document.tsx` file with the [ColorSchemeScript](https://mantine.dev/llms/theming-color-schemes.md) component.
Note that it's required even if you use only one color scheme in your application.

```tsx
import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

export default function Document() {
  return (
    <Html lang="en" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

All set! Start the development server:

```bash
npm run dev
```

## Setup with app router

Add [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md), [ColorSchemeScript](https://mantine.dev/llms/theming-color-schemes.md)
and styles imports to the `app/layout.tsx` file:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

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
    <html lang="en" {...mantineHtmlProps}>
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

All set! Start the development server:

```bash
npm run dev
```

## app + pages router together

If you use both app and pages router in one application, you need to setup both `pages/_app.tsx`
and `app/layout.tsx` files as described above.

## Next.js Link with polymorphic components

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button component={Link} href="/hello">
      Next link button
    </Button>
  );
}
```

## Server components

All Mantine components require context to support [default props](https://mantine.dev/llms/theming-default-props.md)
and [Styles API](https://mantine.dev/llms/styles-styles-api.md). Mantine components cannot be used as server components.
This means that components will render both on the server and client.

Entry points of all `@mantine/*` packages (`index.js` files) have the `'use client';` directive at the
top of the file – you don't need to add `'use client';` to your pages/layouts/components.

## Compound components in server components

Some components like [Popover](https://mantine.dev/llms/core-popover.md) have associated compound components (`Component.XXX`),
where `XXX` is a compound component name. Compound components cannot be used in server components.
Instead, use the `ComponentXXX` syntax or add the `'use client';` directive to the top of the file.

Example that won't work in server components:

```tsx
import { Popover } from '@mantine/core';

// This will throw an error
export default function Page() {
  return (
    <Popover>
      <Popover.Target>Target</Popover.Target>
      <Popover.Dropdown>Dropdown</Popover.Dropdown>
    </Popover>
  );
}
```

Example with `'use client';` directive:

```tsx
'use client';

import { Popover } from '@mantine/core';

// No error
export default function Page() {
  return (
    <Popover>
      <Popover.Target>Target</Popover.Target>
      <Popover.Dropdown>Dropdown</Popover.Dropdown>
    </Popover>
  );
}
```

Example with `ComponentXXX` syntax:

```tsx
import {
  Popover,
  PopoverDropdown,
  PopoverTarget,
} from '@mantine/core';

// No error
export default function Page() {
  return (
    <Popover>
      <PopoverTarget>Trigger</PopoverTarget>
      <PopoverDropdown>Dropdown</PopoverDropdown>
    </Popover>
  );
}
```

## app router tree shaking

To enable tree shaking with app router, enable the experimental `optimizePackageImports` feature in
your `next.config.mjs`:

```tsx
export default {
  // ...other configuration
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};
```

## Troubleshooting

If you have any issues with Mantine in your Next.js application, please check the
[Help Center article](https://help.mantine.dev/q/server-components) that covers
the most common issues with app router and server components.


--------------------------------------------------------------------------------

### Polymorphic

# Polymorphic components

## What is a polymorphic component

A polymorphic component is a component whose root element can be changed with the `component` prop.
All polymorphic components have a default element that's used when the `component` prop is not provided.
For example, the [Button](https://mantine.dev/llms/core-button.md) component's default element is `button` and
it can be changed to `a` or any other element or component:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button component="a" href="https://mantine.dev/" target="_blank">
      Mantine website
    </Button>
  );
}
```


## renderRoot prop

`renderRoot` is an alternative to the `component` prop, which accepts a function that should return
a React element. It is useful in cases when `component` prop cannot be used, for example,
when the component that you want to pass to the `component` is generic
(accepts type or infers it from props, for example `<Link<'/'> />`).

Example of using `renderRoot` prop, the result is the same as in the previous demo:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      renderRoot={(props) => (
        <a href="https://mantine.dev/" target="_blank" {...props} />
      )}
    >
      Mantine website
    </Button>
  );
}
```

**!important** It's required to spread the `props` argument into the root element. Otherwise,
there will be no styles and the component might not be accessible.

## Polymorphic components as other React components

You can pass any other React component to the `component` prop.
For example, you can pass the `Link` component from `react-router-dom`:

```tsx
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button component={Link} to="/react-router">
      React router link
    </Button>
  );
}
```

## Polymorphic components as Next.js Link

The Next.js link doesn't work in the same way as other similar components in all Next.js versions.

With Next.js 12 and below:

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Link href="/hello" passHref>
      <Button component="a">Next link button</Button>
    </Link>
  );
}
```

With Next.js 13 and above:

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button component={Link} href="/hello">
      Next link button
    </Button>
  );
}
```

## Polymorphic components with generic components

You cannot pass generic components to the `component` prop because it's not possible to infer generic types
from the component prop. For example, you cannot pass [typed Next.js Link](https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links)
to the `component` prop because it's not possible to infer the `href` type from the component prop. The component itself
will work correctly, but you'll have a TypeScript error.

To make generic components work with polymorphic components, use the `renderRoot` prop instead of `component`:

```tsx
import Link from 'next/link';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button renderRoot={(props) => <Link href="/hello" {...props} />}>
      Typed Next link button
    </Button>
  );
}
```

## Polymorphic components with react-router NavLink

The [react-router-dom](https://reactrouter.com/en/main) [NavLink](https://reactrouter.com/en/main/components/nav-link) component's
`className` prop accepts a function based on which you can add an active class to the link. This feature is
incompatible with Mantine's `component` prop, but you can use the `renderRoot` prop instead:

```tsx
import cx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      renderRoot={({ className, ...others }) => (
        <NavLink
          className={({ isActive }) =>
            cx(className, { 'active-class': isActive })
          }
          {...others}
        />
      )}
    >
      React router NavLink
    </Button>
  );
}
```

## Wrapping polymorphic components

Non-polymorphic components include `React.ComponentProps<'x'>` as part of their props type,
where `x` is the root element of the component. For example, the [Container](https://mantine.dev/llms/core-container.md) component
is not polymorphic – its root element is always `div`, so its props type includes `React.ComponentProps<'div'>`.

Polymorphic components don't include `React.ComponentProps<'x'>` as part of their props type
because their root element can be changed, and thus the props type can be inferred only after the component was rendered.

Example of creating a non-polymorphic wrapper component for Mantine polymorphic component:

```tsx
import { Button, ButtonProps, ElementProps } from '@mantine/core';

const LinkButton = (props: ButtonProps & ElementProps<'a', keyof ButtonProps>) => (
  <Button {...props} component="a" />
);

function Demo() {
  return (
    <LinkButton href="https://mantine.dev" target="_blank">
      Mantine website
    </LinkButton>
  );
}
```


Example of creating a polymorphic wrapper component for Mantine polymorphic component:

```tsx
import { polymorphic, Button, ButtonProps, Group } from '@mantine/core';

interface CustomButtonProps extends ButtonProps {
  label: string;
}

// Default root element is 'button', but it can be changed with 'component' prop
const CustomButton = polymorphic<'button', CustomButtonProps>(
  ({ label, ...others }: CustomButtonProps) => <Button {...others}>{label}</Button>
);

// Default root element is 'a', but it can be changed with 'component' prop
const CustomButtonAnchor = polymorphic<'a', CustomButtonProps>(
  ({ label, ...others }: CustomButtonProps) => (
    <Button component="a" {...others}>
      {label}
    </Button>
  )
);

function Demo() {
  return (
    <Group>
      <CustomButton label="Button by default" color="cyan" />
      <CustomButtonAnchor label="Anchor by default" href="https://mantine.dev" target="_blank" />
    </Group>
  );
}
```


## Dynamic component prop

You can use a dynamic value in the `component` prop, but in this case, you need to either provide types manually
or disable type checking by passing `any` as a type argument to the polymorphic component:

```tsx
import { Box } from '@mantine/core';

function KeepTypes() {
  return (
    <Box<'input'>
      component={(Math.random() > 0.5 ? 'input' : 'div') as any}
    />
  );
}

function NukeTypes() {
  return (
    <Box<any> component={Math.random() > 0.5 ? 'input' : 'div'} />
  );
}
```

## Create your own polymorphic components

Use the `polymorphic` function and [Box](https://mantine.dev/llms/core-box.md) component to create new polymorphic components:

```tsx
import { Box, BoxProps, polymorphic, Group } from '@mantine/core';

interface MyButtonProps extends BoxProps {
  label: string;
}

const MyButton = polymorphic<'button', MyButtonProps>(
  ({ label, ...others }: MyButtonProps) => (
    <Box component="button" {...others}>
      {label}
    </Box>
  )
);

function Demo() {
  return (
    <Group>
      <MyButton label="Button by default" />
      <MyButton
        label="MyButton as anchor"
        component="a"
        href="https://mantine.dev"
        target="_blank"
      />
    </Group>
  );
}
```


## Make Mantine component polymorphic

Polymorphic components have a performance overhead for tsserver (no impact on runtime performance),
because of that, not all Mantine components have polymorphic types, but all components still
accept the `component` prop – the root element can be changed.

To make a Mantine component polymorphic, use the `polymorphic` function the same way
as in the previous example:

```tsx
import { polymorphic, Group, GroupProps } from '@mantine/core';

const PolymorphicGroup = polymorphic<'button', GroupProps>(Group);

function Demo() {
  return (
    <PolymorphicGroup component="a" href="https://mantine.dev" />
  );
}
```


--------------------------------------------------------------------------------

### ReactRouter

# Usage with React Router

## Generate new application

Follow the [React Router getting started guide](https://reactrouter.com/start/framework/installation) to create a new React Router application:

```bash
npx create-react-router@latest my-react-router-app
```

## Installation

## PostCSS setup

Install PostCSS plugins and [postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md):

```bash
yarn add postcss postcss-preset-mantine postcss-simple-vars
```

```bash
npm install postcss postcss-preset-mantine postcss-simple-vars
```

Create a `postcss.config.cjs` file at the root of your application with the following content:

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

## Setup

Add styles imports, [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) and [ColorSchemeScript](https://mantine.dev/llms/theming-color-schemes.md) to `app/root.tsx`:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ColorSchemeScript />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// ... other app/root.tsx content
```

All set! Start the development server:

```bash
npm run dev
```


--------------------------------------------------------------------------------

### Redwood

# Usage with RedwoodJS

## Generate new application

Follow the [Redwood getting started guide](https://redwoodjs.com/docs/quick-start) to
create a new Redwood application:

```bash
yarn create redwood-app my-redwood-project --typescript
```

## Installation

**Note that it's recommended to use `yarn` instead of `npm` to install dependencies.**

Open the `web` directory before installing dependencies:

```bash
cd web
```

## PostCSS setup

Install PostCSS plugins and [postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md):

```bash
yarn add postcss postcss-preset-mantine postcss-simple-vars
```

```bash
npm install postcss postcss-preset-mantine postcss-simple-vars
```

Create a `postcss.config.js` file in the `web` directory with the following content:

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

## Setup

Add styles imports, [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) and [ColorSchemeScript](https://mantine.dev/llms/theming-color-schemes.md)
to the `web/src/App.tsx` file:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';
import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <ColorSchemeScript />
      <MantineProvider>
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </MantineProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
);

export default App;
```

All set! Start the development server:

```bash
yarn rw dev
```


--------------------------------------------------------------------------------

### Storybook

# Setup Mantine in Storybook

Note that this guide covers only Storybook 10+ integration. If you're using an older version of Storybook,
it won't work for you.

## Add Storybook to your application

If you already have Storybook in your application, you can skip this step.

Follow the [Storybook getting started](https://storybook.js.org/docs/react/get-started/install/) guide
to add Storybook to your application:

```bash
npx storybook@latest init
```

## Configure addons

Install `@storybook/addon-themes` Storybook addon:

```bash
yarn add @storybook/addon-themes
```

```bash
npm install @storybook/addon-themes
```

Add addons to `.storybook/main.ts`:

```tsx
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // ... other config properties
  addons: ['@storybook/addon-themes'],
};

export default config;
```

## Theme object

To share the [theme object](https://mantine.dev/llms/theming-theme-object.md) between your application and Storybook, create a
`src/theme.ts` (or any other path in your application) file with your theme override:

```tsx
// src/theme.ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'serif',
  // ... other theme override properties
});
```

Then you'll be able to use the same theme both in your application and Storybook:

```tsx
// In your application

import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

function App() {
  return <MantineProvider theme={theme}>{/* ... */}</MantineProvider>;
}
```

## Storybook preview

If the `.storybook/preview.tsx` file doesn't exist, create it and add
the following content:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';

export const parameters = {
  layout: 'fullscreen',
  options: {
    showPanel: false,
    storySort: (a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }),
  },
  backgrounds: { disable: true },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Mantine color scheme',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
};

export const decorators = [
  (renderStory: any, context: any) => {
    const scheme = (context.globals.theme || 'light') as 'light' | 'dark';
    return (
      <MantineProvider theme={theme} forceColorScheme={scheme}>
        <ColorSchemeScript />
        {renderStory()}
      </MantineProvider>
    );
  },
];
```

All set! Start Storybook:

```bash
npm run storybook
```


--------------------------------------------------------------------------------

### Tiptap3Migration

# Migration guide Tiptap 2 → Tiptap 3

This guide will help you update [TipTap](https://tiptap.dev/docs) from version 2 to version 3.

## shouldRerenderOnTransaction

Set `shouldRerenderOnTransaction: true` in `useEditor`. It is required to have active control
highlight.

```tsx
const editor = useEditor({
  shouldRerenderOnTransaction: true,
  // ... other options
});
```

## immediatelyRender

Set `immediatelyRender: false` if you use Next.js or other framework with server-side rendering.
It is required to prevent hydration mismatches.

```tsx
const editor = useEditor({
  immediatelyRender: false,
  // ... other options
});
```

## StarterKit changes

`StarterKit` now includes underline and link extensions out of the box:

* You no longer need to add underline extension manually
* You must disable the default link extension to use extension provided by Mantine

```tsx
// With tiptap 2.x – ❌ no longer works with tiptap 3.x
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@mantine/tiptap';

const editor = useEditor({
  extensions: [StarterKit, Underline, Link],
});

// With tiptap 3x – ✅ new usage example
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@mantine/tiptap';

const editor = useEditor({
  // Remove underline and link extensions
  extensions: [StarterKit.configure({ link: false }), Link],
});
```

## Import paths

Change import paths for floating and bubble menu components:

```tsx
// With tiptap 2.x – ❌ no longer works with tiptap 3.x
import { BubbleMenu, FloatingMenu } from '@tiptap/react';

// With tiptap 3.x – ✅ new usage example
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
```


--------------------------------------------------------------------------------

### TypeScript

# Usage with TypeScript

All `@mantine/*` packages are fully compatible with TypeScript. All examples in the documentation
are written in TypeScript – you can copy and paste them to your project without any changes.

This guide will help you get familiar with the types that the `@mantine/core` package exports.

## Components props types

Each `@mantine/` package that exports components also exports props types for these components.
You can import component props types by adding `Props` to the component name.
For example, you can import Button and DatePicker component props like this:

```tsx
import type { ButtonProps } from '@mantine/core';
import type { DatePickerProps } from '@mantine/dates';
```

Note that there are two variations of props types: for polymorphic components and for regular components.
Regular component props types include `React.ComponentProps<'X'>`, where `X` is the root element
type, for example `'div'`.

Example of extending regular component props:

```tsx
import { Group, GroupProps } from '@mantine/core';

// Interface includes `React.ComponentProps<'div'>`
interface MyGroupProps extends GroupProps {
  spacing: number;
}

function MyGroup({ spacing, ...others }: MyGroupProps) {
  return <Group my={spacing} {...others} />;
}
```

## Polymorphic components props types

[Polymorphic component](https://mantine.dev/llms/guides-polymorphic.md) props types don't include `React.ComponentProps<'X'>`
because their root element depends on the `component` prop value.

Example of extending [polymorphic component](https://mantine.dev/llms/guides-polymorphic.md) props:

```tsx
import { Button, ButtonProps, ElementProps } from '@mantine/core';

interface MyButtonProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {
  height: number;
}

function MyButton({ height, ...others }: MyButtonProps) {
  return <Button style={{ height }} {...others} />;
}
```

## Namespace types

All Mantine components export namespaces with related types. For example, [Button](https://mantine.dev/llms/core-button.md)
component props can be accessed as `Button.Props`:

```tsx
import {  Button } from '@mantine/core';

// Same as `import type { ButtonProps } from '@mantine/core';`
type MyButtonProps = Button.Props;
```

## ElementProps type

`ElementProps` is a utility type similar to `React.ComponentProps`, but with additional
features. It replaces the native element's `style` prop with Mantine's [style prop](https://mantine.dev/llms/styles-style.md) and
allows omitting properties that are passed as a second type.

```tsx
import { ButtonProps, ElementProps } from '@mantine/core';

// Equivalent of `React.ComponentProps<'button'>`
type ButtonElementProps = ElementProps<'button'>;

// Equivalent of `Omit<React.ComponentProps<'button'>, 'color' | 'onClick'>`
type OmitColor = ElementProps<'button', 'color' | 'onClick'>;

// Removes all Mantine component props from React component props
// to avoid props types conflicts
// Equivalent of `Omit<React.ComponentProps<'button'>, keyof ButtonProps>`
type OmitButtonProps = ElementProps<'button', keyof ButtonProps>;
```

## MantineTheme type

`MantineTheme` is a type of the [theme object](https://mantine.dev/llms/theming-theme-object.md). You can use it to add types
to functions that accept a theme object as an argument:

```tsx
import { MantineTheme, useMantineTheme } from '@mantine/core';

function getPrimaryColor(theme: MantineTheme) {
  return theme.colors.blue[5];
}

function Demo() {
  const theme = useMantineTheme();
  return <div style={{ color: getPrimaryColor(theme) }} />;
}
```

## MantineThemeOverride type

`MantineThemeOverride` type is a deep partial of `MantineTheme`. It can be used in functions
that accept a theme override as an argument:

```tsx
import {
  createTheme,
  MantineThemeOverride,
  mergeThemeOverrides,
} from '@mantine/core';

const baseTheme = createTheme({
  fontFamily: 'Helvetica, sans-serif',
});

function mergeThemes(themes: MantineThemeOverride[]) {
  return mergeThemeOverrides(baseTheme, ...themes);
}

const overrideTheme = createTheme({
  primaryColor: 'blue',
});

const overrideTheme2 = createTheme({
  cursorType: 'pointer',
});

const mergedTheme = mergeThemes([overrideTheme, overrideTheme2]);
```

## MantineColorScheme type

`MantineColorScheme` is a union of `'light' | 'dark' | 'auto'` values. You can use it to add types
to functions that accept color scheme as an argument:

```tsx
import {
  MantineColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

function getComputedColorScheme(colorScheme: MantineColorScheme) {
  return colorScheme === 'auto' ? 'light' : colorScheme;
}

function Demo() {
  const { colorScheme } = useMantineColorScheme();
  const computed = getComputedColorScheme(colorScheme);
}
```

## MantineSize type

`MantineSize` type is a union of `'xs' | 'sm' | 'md' | 'lg' | 'xl'` values. You can use it to add types
to various props that accept size as an argument, for example, `radius`, `shadow`, `p`.

```tsx
import { MantineSize, Paper } from '@mantine/core';

interface DemoProps {
  size: MantineSize;
  radius: MantineSize | (string & {}) | number;
  shadow: MantineSize | string;
}

function Demo({ size, radius, shadow }: DemoProps) {
  return <Paper radius={radius} shadow={shadow} p={size} m={size} />;
}
```

## Theme object declarations

You can change `theme.other` and `theme.colors` types by extending the `MantineTheme` interface
in a `.d.ts` file. Create `mantine.d.ts` anywhere in your project (must be included in `tsconfig.json`)
to extend theme object types.

To override `theme.other`:

```tsx
// mantine.d.ts
declare module '@mantine/core' {
  export interface MantineThemeOther {
    myCustomProperty: string;
    myCustomFunction: () => void;
  }
}
```

To override `theme.colors`:

```tsx
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

You can also customize size-related types for `theme.spacing`, `theme.radius`,
`theme.breakpoints`, `theme.fontSizes`, `theme.lineHeights`, and `theme.shadows` similarly.

To override `theme.spacing` and `theme.radius`

```tsx
import {
  DefaultMantineSize,
  MantineThemeSizesOverride,
} from '@mantine/core';

type ExtendedCustomSpacing =
  | 'xxl'
  | 'xxxs'
  | DefaultMantineSize;

type ExtendedCustomRadius =
  | 'xxs'
  | DefaultMantineSize;

declare module '@mantine/core' {
  export interface MantineThemeSizesOverride {
    spacing: Record<ExtendedCustomSpacing, string>;
    radius: Record<ExtendedCustomRadius, string>;
  }
}
```

Note that extending the theme type isn't required; it's only needed if you want to
make your theme object types more strict and add autocomplete in your editor.

## Custom variants types

You can define types for custom [variants](https://mantine.dev/llms/styles-variants-sizes.md) by
extending the `{x}Props` interface with the new variant type in your `mantine.d.ts` file.

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


--------------------------------------------------------------------------------

### Vite

# Usage with Vite

## Generate new application

Follow the [Vite getting started](https://vitejs.dev/guide/) guide to create a new Vite application:

## Installation

## PostCSS setup

Install PostCSS plugins and [postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md):

```bash
yarn add postcss postcss-preset-mantine postcss-simple-vars
```

```bash
npm install postcss postcss-preset-mantine postcss-simple-vars
```

Create a `postcss.config.cjs` file at the root of your application with the following content:

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

## Setup

Add styles imports and [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) to your application root component (usually `App.tsx`):

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

export default function App() {
  return <MantineProvider>{/* Your app here */}</MantineProvider>;
}
```

All set! Start the development server:

```bash
npm run dev
```


--------------------------------------------------------------------------------

### Vitest

# Testing with Vitest

This guide will help you set up [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for your project.
Note that this guide is intended for projects that use [Vite](https://vitejs.dev/) as a bundler. If you're using
other frameworks/bundlers, we recommend using [Jest](https://mantine.dev/llms/guides-jest.md) instead.

## Installation

Install Vitest and React Testing Library:

```bash
yarn add vitest jsdom @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

```bash
npm install vitest jsdom @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

If you want to run tests from your IDE, install one of the [extensions](https://vitest.dev/guide/ide).

## Configuration

Add Vitest configuration to your Vite config file:

```tsx
import { defineConfig } from 'vite';

export default defineConfig({
  // ... rest of your config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
```

Then create a `vitest.setup.mjs` file in your project root and add the following code to it:

```tsx
import '@testing-library/jest-dom/vitest';

import { vi } from 'vitest';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(document, 'fonts', {
  value: { addEventListener: vi.fn(), removeEventListener: vi.fn() },
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
```

The code above mocks the `window.matchMedia` and `ResizeObserver` APIs that aren't available
in the `jsdom` environment but are required by some Mantine components.

Optionally, you can add Vitest scripts to your `package.json`:

```json
{
  "scripts": {
    "vitest": "vitest run",
    "vitest:watch": "vitest"
  }
}
```

## Custom render

All Mantine components require [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) to be present in the component tree.
To add [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) to the component tree in your tests, create a [custom render](https://testing-library.com/docs/react-testing-library/setup/#custom-render)
function:

```tsx
// ./test-utils/render.tsx
import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
// Import your theme object
import { theme } from '../src/theme';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme} env="test">{children}</MantineProvider>
    ),
  });
}
```

It's usually more convenient to export all `@testing-library/*` functions that you're planning to use
from a `./testing-utils/index.ts` file:

```tsx
import userEvent from '@testing-library/user-event';

export * from '@testing-library/react';
export { render } from './render';
export { userEvent };
```

Then you should import all testing utilities from `./testing-utils` instead of `@testing-library/react`:

```tsx
import { render, screen } from '../test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<Welcome />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/next/'
    );
  });
});
```

## Example of a full setup

You can find an example with a full Vitest setup in [mantine-vite-template](https://github.com/mantinedev/vite-template).


--------------------------------------------------------------------------------

## THEMING COMPONENTS AND FEATURES

### ColorSchemes

# Color schemes

[MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) manages the color scheme context in your application.
You can configure the default color scheme value with the `defaultColorScheme` prop; possible values are `light`,
`dark`, and `auto` (system color scheme is used). The default value is `light`.

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

## data-mantine-color-scheme attribute

When [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) is mounted, it sets a `data-mantine-color-scheme`
attribute on the `<html />` element to the value that the user has previously selected or to the value of the `defaultColorScheme` prop.
The `data-mantine-color-scheme` attribute is used in all component styles to determine which colors each component should use.

## use-mantine-color-scheme hook

The `useMantineColorScheme` hook can be used to get and set the current color scheme value:

```tsx
function useMantineColorScheme(): {
  /** Current color scheme value */
  colorScheme: 'dark' | 'light' | 'auto';

  /** Sets colors scheme to given value */
  setColorScheme: (colorScheme: 'dark' | 'light' | 'auto') => void;

  /** Toggles color scheme to the opposite value; if value is 'auto', color scheme is inferred from the OS settings */
  toggleColorScheme: () => void;

  /** Clears the color scheme value from storage and sets it to `defaultColorScheme` */
  clearColorScheme: () => void;
};
```

```tsx
import { useMantineColorScheme, Button, Group } from '@mantine/core';

function Demo() {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
      <Button onClick={clearColorScheme}>Clear</Button>
    </Group>
  );
}
```


## use-computed-color-scheme hook

`useComputedColorScheme` returns a computed color scheme value—it returns either `light` or `dark`.
It can be used to implement color scheme toggle logic:

```tsx
import {
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

function Demo() {
  // -> colorScheme is 'auto' | 'light' | 'dark'
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  // -> computedColorScheme is 'light' | 'dark', argument is the default value
  const computedColorScheme = useComputedColorScheme('light');

  // Incorrect color scheme toggle implementation
  // If colorScheme is 'auto', then it is not possible to
  // change color scheme correctly in all cases:
  // 'auto' can mean both light and dark
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  // Correct color scheme toggle implementation
  // computedColorScheme is always either 'light' or 'dark'
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };
}
```

## Transitions during color scheme change

By default, transitions on all elements are disabled when the color scheme changes to avoid
inconsistent animations. To enable transitions during color scheme changes, set the `keepTransitions: true`
option on the `useMantineColorScheme` hook:

```tsx
import { useMantineColorScheme } from '@mantine/core';

function Demo() {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
}
```

## Color scheme value caveats

By default, the color scheme value is stored in local storage, and its value is saved in state
before the component is mounted to avoid a flash of inaccurate color scheme. This means that the
color scheme value can be different on the client and server, as the server does not have access
to local storage and always uses the default value.

If you have server-side rendering in your application (for example, if you use [Next.js](https://mantine.dev/llms/guides-next.md) or [React Router](https://mantine.dev/llms/guides-react-router.md)), then you cannot use the `colorScheme`
value in your application to avoid hydration issues. Instead, you can use the `dark` and `light`
mixins from [postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md) to generate styles that will
hide elements based on the color scheme value:

```tsx
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon } from '@phosphor-icons/react';
import cx from 'clsx';
import classes from './Demo.module.css';

function Demo() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <SunIcon className={cx(classes.icon, classes.light)} />
      <MoonIcon className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}
```


> **colorScheme for client-only applications**
>
> You can safely use the `colorScheme` value in client-only applications (for example, Vite or create-react-app applications).
> In this case, there is no hydration, and thus no hydration error can occur.

## ColorSchemeScript

The `ColorSchemeScript` component renders a script tag that sets the `data-mantine-color-scheme` attribute
on the `<html />` element to the user's selected value or to the `defaultColorScheme` prop value before
hydration. It is used to avoid a flash of inaccurate color scheme in server-side rendered applications,
for example [Next.js](https://mantine.dev/llms/guides-next.md) or [React Router](https://mantine.dev/llms/guides-react-router.md). Follow the framework-specific guides
to learn where to render the `ColorSchemeScript` component.

You can add any additional props to the `<script />` tag generated by the `ColorSchemeScript` component,
for example, you can add a [nonce](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) attribute:

```tsx
import { ColorSchemeScript } from '@mantine/core';

function Demo() {
  return (
    <ColorSchemeScript
      nonce="8IBTHwOdqNKAWeKl7plt8g=="
      defaultColorScheme="dark"
    />
  );
}
```

## Auto color scheme

Set `defaultColorScheme="auto"` on `MantineProvider` and `ColorSchemeScript` to use the system color scheme.
In this case, the color scheme value will be controlled by the user's OS:

```tsx
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

function Demo() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        {/* Your app here */}
      </MantineProvider>
    </>
  );
}
```

