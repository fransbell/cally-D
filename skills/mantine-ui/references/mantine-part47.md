## Create custom adapter

You can create a custom adapter if you want to enhance the default behavior of code highlighting
or use a different library.

Example of creating a custom shiki adapter with custom themes and logic:

```tsx
import { type CodeHighlightAdapter, stripShikiCodeBlocks } from '@mantine/code-highlight';

// Shiki transformers can be used to highlight diffs and other notations
// https://shiki.style/packages/transformers
import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers'

// Shiki themes as objects, you can use any VSCode themes
import { darkTheme, lightTheme } from './shiki-themes';

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json'],
    themes: [],
  });

  return shiki;
}

// Pass this adapter to CodeHighlightAdapterProvider component
export const customShikiAdapter: CodeHighlightAdapter = {
  // loadContext is called on the client side to load the shiki highlighter
  // It is required to be used if your library requires async initialization
  // The value returned from loadContext is passed to getHighlighter as ctx argument
  loadContext: loadShiki,

  // ctx is the value returned from loadContext
  // or null if loadContext is not used or has not resolved yet
  getHighlighter: (ctx) => {
    if (!ctx) {
      return ({ code }) => ({ highlightedCode: code, isHighlighted: false });
    }

    return ({ code, language, colorScheme }) => ({
      isHighlighted: true,
      // stripShikiCodeBlocks removes <pre> and <code> tags from highlighted code
      highlightedCode: stripShikiCodeBlocks(
        ctx.codeToHtml(code, {
          lang: language,
          theme: (colorScheme === 'light' ? lightTheme : darkTheme) as any,
          transformers: [transformerNotationDiff(), transformerNotationHighlight()],
        })
      ),
    });
  },
};
```

## Copy button

You can customize copy button labels with `copyLabel` and `copiedLabel` props.
In case you need to remove the copy button, set `withCopyButton={false}`.


```tsx
function Button() {
  return <button>Click me</button>;
}
```

```tsx
import { CodeHighlight } from '@mantine/code-highlight';

const exampleCode = `
function Button() {
  return <button>Click me</button>;
}
`;

function Demo() {
  return (
    <>
      <CodeHighlight
        code={`// Custom copy label
function Button() {
  return <button>Click me</button>;
}
`}
        language="tsx"
        copyLabel="Copy button code"
        copiedLabel="Copied!"
        radius="md"
      />
      <CodeHighlight
        code={`// Without copy button
function Button() {
  return <button>Click me</button>;
}
`}
        language="tsx"
        withCopyButton={false}
        mt="md"
        radius="md"
      />
    </>
  );
}
```


## With tabs

`CodeHighlightTabs` component allows you to organize multiple code blocks into tabs:

```tsx
// Demo.tsx
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { tsxCode, cssCode } from './code';

function Demo() {
  return (
    <CodeHighlightTabs
      radius="md"
      code={[
        { fileName: 'Demo.tsx', code: tsxCode, language: 'tsx' },
        { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
      ]}
    />
  );
}

// code.ts
export const tsxCode = `
import { Group, Button, MantineProvider, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button variant="danger">Danger variant</Button>
        <Button variant="primary">Primary variant</Button>
      </Group>
    </MantineProvider>
  );
}
`;

export const cssCode = `
.root {
  &[data-variant='danger'] {
    background-color: var(--mantine-color-red-9);
    color: var(--mantine-color-red-0);
  }

  &[data-variant='primary'] {
    background: linear-gradient(45deg, #4b6cb7 10%, #253b67 90%);
    color: var(--mantine-color-white);
  }
}
`;
```


## Tabs with icons

You can use any React node as tab icon. The example below uses TypeScript and CSS
icons from the `@mantinex/dev-icons` package, but you can use any other icons library or custom
icons:

```tsx
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { TypeScriptIcon, CssIcon } from '@mantinex/dev-icons';

const tsxCode = `
function Button() {
  return <button>Click me</button>;
}
`;

const cssCode = `
.button {
  background-color: transparent;
  color: var(--mantine-color-blue-9);
}
`;

function Demo() {
  const tsIcon = <TypeScriptIcon size={14} />;
  const cssIcon = <CssIcon size={14} />;

  return (
    <CodeHighlightTabs
      radius="md"
      code={[
        {
          fileName: 'Button.tsx',
          code: tsxCode,
          language: 'tsx',
          icon: tsIcon,
        },
        {
          fileName: 'Button.module.css',
          code: cssCode,
          language: 'scss',
          icon: cssIcon,
        },
      ]}
    />
  );
}
```


## Tabs icons based on file name

As an alternative to providing icons manually for each tab, you can use the `getFileIcon` prop
to assign icons based on file name. `getFileIcon` accepts a file name and must return a React node
or `null`.

```tsx
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { TypeScriptIcon, CssIcon } from '@mantinex/dev-icons';

const tsxCode = `
function Button() {
  return <button>Click me</button>;
}
`;

const cssCode = `
.button {
  background-color: transparent;
  color: var(--mantine-color-blue-9);
}
`;

function getFileIcon(fileName: string) {
  if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) {
    return <TypeScriptIcon size={14} />;
  }

  if (fileName.endsWith('.css')) {
    return <CssIcon size={14} />;
  }

  return null;
}

function Demo() {
  return (
    <CodeHighlightTabs
      getFileIcon={getFileIcon}
      radius="md"
      code={[
        {
          fileName: 'Button.tsx',
          code: tsxCode,
          language: 'tsx',
        },
        {
          fileName: 'Button.module.css',
          code: cssCode,
          language: 'scss',
        },
      ]}
    />
  );
}
```


## Expandable code

If the code snippet is too long, you can make it expandable with `withExpandButton`
and `defaultExpanded={false}` props. To change the label of the expand/collapse control
tooltip, use `expandCodeLabel` and `collapseCodeLabel`.

```tsx
// Demo.tsx
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { tsxCode, cssCode } from './code';

function Demo() {
  return (
    <CodeHighlightTabs
      withExpandButton
      defaultExpanded={false}
      expandLabel="Show full code"
      collapseLabel="Show less"
      code={[
        { fileName: 'Demo.tsx', code: tsxCode, language: 'tsx' },
        { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
      ]}
    />
  );
}

// code.ts
export const tsxCode = `
import { Group, Button, MantineProvider, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button variant="danger">Danger variant</Button>
        <Button variant="primary">Primary variant</Button>
      </Group>
    </MantineProvider>
  );
}
`;

export const cssCode = `
.root {
  &[data-variant='danger'] {
    background-color: var(--mantine-color-red-9);
    color: var(--mantine-color-red-0);
  }

  &[data-variant='primary'] {
    background: linear-gradient(45deg, #4b6cb7 10%, #253b67 90%);
    color: var(--mantine-color-white);
  }
}
`;
```


## Custom controls

Use the `controls` prop with the `CodeHighlightControl` component to add custom controls
to the code block:


```tsx
function greet() {
  return 'Hello, World!';
}
```

```tsx
import { CodesandboxLogoIcon, ChatCircleIcon } from '@phosphor-icons/react';
import { CodeHighlight, CodeHighlightControl } from '@mantine/code-highlight';

const exampleCode = `
function greet() {
  return 'Hello, World!';
}
`;

function Demo() {
  return (
    <CodeHighlight
      code={exampleCode}
      language="tsx"
      radius="md"
      controls={[
        <CodeHighlightControl
          component="a"
          href="https://codesandbox.io"
          target="_blank"
          tooltipLabel="Open on codesandbox"
          key="sandbox"
        >
          <CodesandboxLogoIcon />
        </CodeHighlightControl>,
        <CodeHighlightControl tooltipLabel="Discuss with GPT" key="gpt">
          <ChatCircleIcon />
        </CodeHighlightControl>,
      ]}
    />
  );
}
```


## Inline code

`InlineCodeHighlight` component allows you to highlight inline code snippets:

```tsx
import { Text } from '@mantine/core';
import { InlineCodeHighlight } from '@mantine/code-highlight';

function Demo() {
  return (
    <Text>
      You can highlight code inline:{' '}
      <InlineCodeHighlight
        code='<InlineCodeHighlight code="" language="tsx" />'
        language="tsx"
        withBorder
      />
      . Is that not cool?
    </Text>
  );
}
```



#### Props

**CodeHighlight props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| background | MantineColor | - | Controls background color of the code. By default, the value depends on color scheme. |
| code | string | required | Code to highlight |
| codeColorScheme | (string & {}) \| "dark" \| "light" | - | Set to use dark or light color scheme. When using shiki adapter, you can use loaded themes here |
| collapseCodeLabel | string | - | Label for collapse button |
| controls | ReactNode[] | - | Extra controls to display in the controls list |
| copiedLabel | string | - | Label for copy button in copied state |
| copyLabel | string | - | Label for copy button in default state |
| defaultExpanded | boolean | - | Uncontrolled expanded default state |
| expandCodeLabel | string | - | Label for expand button |
| expanded | boolean | - | Controlled expanded state |
| language | string | - | Language of the code, used for syntax highlighting |
| maxCollapsedHeight | string \| number | - | Max height of collapsed state |
| onExpandedChange | (expanded: boolean) => void | - | Called when expanded state changes |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius |
| withBorder | boolean | - | Adds border to the root element |
| withCopyButton | boolean | - | Determines whether the copy button should be displayed |
| withExpandButton | boolean | - | Determines whether the expand/collapse button should be displayed |

**CodeHighlight.Tabs props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activeTab | number | - | Index of controlled active tab state |
| background | MantineColor | - | Controls background color of the code. By default, the value depends on color scheme. |
| code | CodeHighlightTabsCode[] | required | Code to highlight with meta data (file name and icon) |
| codeColorScheme | (string & {}) \| "dark" \| "light" | - | Set to use dark or light color scheme. When using shiki adapter, you can use loaded themes here |
| collapseCodeLabel | string | - | Label for collapse button |
| controls | ReactNode[] | - | Extra controls to display in the controls list |
| copiedLabel | string | - | Label for copy button in copied state |
| copyLabel | string | - | Label for copy button in default state |
| defaultActiveTab | number | - | Default active tab index |
| defaultExpanded | boolean | - | Uncontrolled expanded default state |
| expandCodeLabel | string | - | Label for expand button |
| expanded | boolean | - | Controlled expanded state |
| getFileIcon | (fileName: string) => ReactNode | - | Function that returns icon based on file name |
| maxCollapsedHeight | string \| number | - | Max height of collapsed state |
| onExpandedChange | (expanded: boolean) => void | - | Called when expanded state changes |
| onTabChange | (tab: number) => void | - | Called when tab changes |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius |
| withBorder | boolean | - | Adds border to the root element |
| withCopyButton | boolean | - | Determines whether the copy button should be displayed |
| withExpandButton | boolean | - | Determines whether the expand/collapse button should be displayed |


#### Styles API

CodeHighlight component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**CodeHighlight selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| codeHighlight | .mantine-CodeHighlight-codeHighlight | Root element |
| showCodeButton | .mantine-CodeHighlight-showCodeButton | Button that reveals full code when it is collapsed |
| pre | .mantine-CodeHighlight-pre | Pre element, contains code element |
| code | .mantine-CodeHighlight-code | Code element |
| control | .mantine-CodeHighlight-control | Control button, copy/collapse, custom controls |
| controlTooltip | .mantine-CodeHighlight-controlTooltip | Root element of control tooltip |
| controls | .mantine-CodeHighlight-controls | A wrapper around controls |
| scrollarea | .mantine-CodeHighlight-scrollarea | Scroll area, contains code |

**CodeHighlight CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| codeHighlight | --ch-background | Background color |
| codeHighlight | --ch-max-height | Max height of code block in collapsed state |
| codeHighlight | --ch-radius | Border radius |

**CodeHighlight.Tabs selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| codeHighlight | .mantine-CodeHighlightTabs-codeHighlight | Root element of inner CodeHighlight component |
| showCodeButton | .mantine-CodeHighlightTabs-showCodeButton | Button that reveals full code when it is collapsed |
| pre | .mantine-CodeHighlightTabs-pre | Pre element, contains code element |
| code | .mantine-CodeHighlightTabs-code | Code element |
| control | .mantine-CodeHighlightTabs-control | Control button, copy/collapse, custom controls |
| controlTooltip | .mantine-CodeHighlightTabs-controlTooltip | Root element of control tooltip |
| controls | .mantine-CodeHighlightTabs-controls | A wrapper around controls |
| scrollarea | .mantine-CodeHighlightTabs-scrollarea | Scroll area, contains code |
| root | .mantine-CodeHighlightTabs-root | Root element |
| filesScrollarea | .mantine-CodeHighlightTabs-filesScrollarea | Scrollarea with files list |
| files | .mantine-CodeHighlightTabs-files | Files names list |
| file | .mantine-CodeHighlightTabs-file | File name |
| fileIcon | .mantine-CodeHighlightTabs-fileIcon | File icon |


--------------------------------------------------------------------------------

### Dropzone
Package: @mantine/dropzone
Import: import { Dropzone } from '@mantine/dropzone';
Description: Capture files from user with drag and drop

## Installation

```bash
yarn add @mantine/dropzone
```

```bash
npm install @mantine/dropzone
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import dropzone styles after core package styles
import '@mantine/dropzone/styles.css';
```

## Usage

`Dropzone` lets you capture one or more files from the user.
The component is based on [react-dropzone](https://react-dropzone.js.org/) and supports all of its core features:

* Accepts/rejects files based on provided mime types
* Limits individual file size
* Renders given children and provides context-based components to display elements based on current status

```tsx
import { Group, Text } from '@mantine/core';
import { UploadSimpleIcon, ImageIcon, XIcon } from '@phosphor-icons/react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export function BaseDemo(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <UploadSimpleIcon size={52} color="var(--mantine-color-blue-6)" />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <XIcon size={52} color="var(--mantine-color-red-6)" />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <ImageIcon size={52} color="var(--mantine-color-dimmed)" />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
```


## Dropzone.Accept, Dropzone.Reject and Dropzone.Idle

`Dropzone.Accept`, `Dropzone.Reject` and `Dropzone.Idle` components are visible only when the user performs a certain action:

* `Dropzone.Accept` is visible only when the user drags a file that can be accepted over the dropzone
* `Dropzone.Reject` is visible only when the user drags a file that cannot be accepted over the dropzone
* `Dropzone.Idle` is visible when the user does not drag anything over the dropzone

## Loading state

Set the `loading` prop to indicate a loading state with the [LoadingOverlay](https://mantine.dev/llms/core-loading-overlay.md) component.
When the `loading` prop is true, users cannot drop or select new files (`Dropzone` becomes disabled):

```tsx
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  return (
    <Dropzone loading onDrop={() => {}}>
      {/* children */}
    </Dropzone>
  );
}
```


## Disabled state

If you want to implement your own loading state, you can disable `Dropzone` without `LoadingOverlay`.
Same as with `loading`, when `Dropzone` is disabled, users cannot drop or select new files:

```tsx
// Demo.tsx
import { Dropzone } from '@mantine/dropzone';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Dropzone disabled className={classes.disabled} onDrop={() => {}}>
      {/* children... */}
    </Dropzone>
  );
}

// Demo.module.css
.disabled {
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  border-color: light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5));
  cursor: not-allowed;

  & * {
    color: light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3));
  }
}
```


## Open file browser manually

To open the file browser from outside of the component, use the `openRef` prop to get a function that will trigger the file browser:

```tsx
import { useRef } from 'react';
import { Button, Group } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  const openRef = useRef<() => void>(null);

  return (
    <>
      <Dropzone openRef={openRef} onDrop={() => {}}>
        {/* children */}
      </Dropzone>

      <Group justify="center" mt="md">
        <Button onClick={() => openRef.current?.()}>Select files</Button>
      </Group>
    </>
  );
}
```


## Enable child pointer events

By default, Dropzone disables pointer events on its children for dragging events to work. When `activateOnClick={false}`,
clicking on any children inside Dropzone will not do anything.
However, you can set the style `pointerEvents: 'all'` to make children clickable.
Note that you need to set these styles only on interactive elements, such as buttons or links.

```tsx
import { useRef } from 'react';
import { Button, Group } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  const openRef = useRef<() => void>(null);

  return (
    <Dropzone openRef={openRef} onDrop={() => {}} activateOnClick={false}>
      <Group justify="center">
        <Button onClick={() => openRef.current?.()} style={{ pointerEvents: 'all' }}>
          Select files
        </Button>
      </Group>
    </Dropzone>
  );
}
```


## Mime types

To specify file types provide an object with the keys set to the [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
and the values as an array of file extensions. Find more examples of accepting specific file types
in the [react-dropzone documentation](https://react-dropzone.js.org/#section-accepting-specific-file-types).

```tsx
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  return (
    <Dropzone
      accept={{
        'image/*': [], // All images
        'text/html': ['.html', '.htm'],
      }}
      onDrop={() => {}}
    >
      {/* children */}
    </Dropzone>
  );
}
```

You can also specify file types by providing an array of mime types to the `accept` prop:

```tsx
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  return (
    <Dropzone
      accept={[
        'image/png',
        'image/jpeg',
        'image/svg+xml',
        'image/gif',
      ]}
      onDrop={() => {}}
    >
      {/* children */}
    </Dropzone>
  );
}
```

To save some research time, you can use the `MIME_TYPES` variable exported from `@mantine/dropzone`:

```tsx
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';

function Demo() {
  return (
    <Dropzone
      accept={[
        MIME_TYPES.png,
        MIME_TYPES.jpeg,
        MIME_TYPES.svg,
        MIME_TYPES.gif,
      ]}
      onDrop={() => {}}
    >
      {/* children */}
    </Dropzone>
  );
}
```

`MIME_TYPES` includes the following data:

Additionally, you can use grouped mime types:

```tsx
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

function Demo() {
  return (
    <Dropzone accept={IMAGE_MIME_TYPE} onDrop={() => {}}>
      {/* children */}
    </Dropzone>
  );
}
```

## Styles API

`Dropzone` root element has the following data attributes to change styles based on current status:

* `data-loading` – when `loading` prop is `true`
* `data-accept` – when user drags files that can be accepted over the dropzone
* `data-reject` – when user drags files that cannot be accepted over the dropzone
* `data-idle` – default state – the user does not drag any files over the dropzone

```tsx
// Demo.tsx
import { Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Dropzone onDrop={() => {}} accept={IMAGE_MIME_TYPE} className={classes.root}>
      <Text ta="center">Drop images here</Text>
    </Dropzone>
  );
}

// Demo.module.css
.root {
  min-height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));

  &[data-accept] {
    color: var(--mantine-color-white);
    background-color: var(--mantine-color-blue-6);
  }

  &[data-reject] {
    color: var(--mantine-color-white);
    background-color: var(--mantine-color-red-6);
  }
}
```


## Images previews

```tsx
import { useState } from 'react';
import { Text, Image, SimpleGrid } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

function Demo() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  return (
    <div>
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text ta="center">Drop images here</Text>
      </Dropzone>

      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
    </div>
  );
}
```


## Get ref

```tsx
import { useEffect, useRef } from 'react';
import { Dropzone } from '@mantine/dropzone';

function Demo() {
  const dropzoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dropzoneRef.current?.focus();
  }, []);

  return (
    <Dropzone ref={dropzoneRef} onDrop={() => {}}>
      {/* children */}
    </Dropzone>
  );
}
```

## Dropzone.FullScreen component

`Dropzone.FullScreen` lets you capture files dropped to the browser window instead of a specific area.
It supports the same props as the `Dropzone` component.

To preview the component, click the button and drop images to the browser window:

```tsx
import { useState } from 'react';
import { Group, Text, Button } from '@mantine/core';
import { UploadSimpleIcon, ImageIcon, XIcon } from '@phosphor-icons/react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

function Demo() {
  const [active, setActive] = useState(false);

  return (
    <>
      <Group justify="center">
        <Button color={active ? 'red' : 'blue'} onClick={() => setActive((d) => !d)}>
          {active ? 'Deactivate' : 'Activate'} full screen dropzone
        </Button>
      </Group>

      <Dropzone.FullScreen
        active={active}
        accept={IMAGE_MIME_TYPE}
        onDrop={(files) => {
          console.log(files);
          setActive(false);
        }}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <UploadSimpleIcon size={52} color="var(--mantine-color-blue-6)" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <XIcon size={52} color="var(--mantine-color-red-6)" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <ImageIcon size={52} color="var(--mantine-color-dimmed)" />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone.FullScreen>
    </>
  );
}
```



#### Props

**Dropzone props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accept | string[] \| Accept | - | Mime types of the files that dropzone can accepts. By default, dropzone accepts all file types. |
| acceptColor | MantineColor | - | Key of `theme.colors` or any valid CSS color to set colors of `Dropzone.Accept` |
| activateOnClick | boolean | - | If `false`, disables click to open the native file selection dialog |
| activateOnDrag | boolean | - | If `false`, disables drag 'n' drop |
| activateOnKeyboard | boolean | - | If `false`, disables Space/Enter to open the native file selection dialog. Note that it also stops tracking the focus state. |
| autoFocus | boolean | - | Set to autofocus the root element |
| disabled | boolean | - | Determines whether files capturing should be disabled |
| dragEventsBubbling | boolean | - | If `false`, stops drag event propagation to parents |
| enablePointerEvents | boolean | - | Determines whether pointer events should be enabled on the inner element |
| getFilesFromEvent | (event: DropEvent) => Promise<(File \| DataTransferItem)[]> | - | Use this to provide a custom file aggregator |
| inputProps | InputHTMLAttributes<HTMLInputElement> | - | Props passed down to the internal Input component |
| loaderProps | LoaderProps | - | Props passed down to the Loader component |
| loading | boolean | - | Determines whether a loading overlay should be displayed over the dropzone |
| maxFiles | number | - | Maximum number of files that can be picked at once |
| maxSize | number | - | Maximum file size in bytes |
| multiple | boolean | - | Determines whether multiple files can be dropped to the dropzone or selected from file system picker |
| name | string | - | Name of the form control. Submitted with the form as part of a name/value pair. |
| onDragEnter | (event: DragEvent<HTMLElement>) => void | - | Called when the `dragenter` event occurs |
| onDragLeave | (event: DragEvent<HTMLElement>) => void | - | Called when the `dragleave` event occurs |
| onDragOver | (event: DragEvent<HTMLElement>) => void | - | Called when the `dragover` event occurs |
| onDrop | (files: FileWithPath[]) => void | required | Called when valid files are dropped to the dropzone |
| onDropAny | (files: FileWithPath[], fileRejections: FileRejection[]) => void | - | Called when any files are dropped to the dropzone |
| onFileDialogCancel | () => void | - | Called when user closes the file selection dialog with no selection |
| onFileDialogOpen | () => void | - | Called when user opens the file selection dialog |
| onReject | (fileRejections: FileRejection[]) => void | - | Called when dropped files do not meet file restrictions |
| openRef | Ref<() => void> \| undefined | - | A ref function which when called opens the file system file picker |
| preventDropOnDocument | boolean | - | If `false`, allow dropped items to take over the current browser window |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| rejectColor | MantineColor | - | Key of `theme.colors` or any valid CSS color to set colors of `Dropzone.Reject` |
| useFsAccessApi | boolean | - | Set to true to use the File System Access API to open the file picker instead of using an `input type="file"` click event |
| validator | <T extends File>(file: T) => FileError \| FileError[] \| null | - | Custom validation function. It must return null if there's no errors. |

**Dropzone.FullScreen props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accept | string[] \| Accept | - | Mime types of the files that dropzone can accepts. By default, dropzone accepts all file types. |
| acceptColor | MantineColor | - | Key of `theme.colors` or any valid CSS color to set colors of `Dropzone.Accept` |
| activateOnClick | boolean | - | If `false`, disables click to open the native file selection dialog |
| activateOnDrag | boolean | - | If `false`, disables drag 'n' drop |
| activateOnKeyboard | boolean | - | If `false`, disables Space/Enter to open the native file selection dialog. Note that it also stops tracking the focus state. |
| active | boolean | - | Determines whether user can drop files to browser window |
| autoFocus | boolean | - | Set to autofocus the root element |
| disabled | boolean | - | Determines whether files capturing should be disabled |
| dragEventsBubbling | boolean | - | If `false`, stops drag event propagation to parents |
| enablePointerEvents | boolean | - | Determines whether pointer events should be enabled on the inner element |
| getFilesFromEvent | (event: DropEvent) => Promise<(File \| DataTransferItem)[]> | - | Use this to provide a custom file aggregator |
| inputProps | InputHTMLAttributes<HTMLInputElement> | - | Props passed down to the internal Input component |
| loaderProps | LoaderProps | - | Props passed down to the Loader component |
| loading | boolean | - | Determines whether a loading overlay should be displayed over the dropzone |
| maxFiles | number | - | Maximum number of files that can be picked at once |
| maxSize | number | - | Maximum file size in bytes |
| multiple | boolean | - | Determines whether multiple files can be dropped to the dropzone or selected from file system picker |
| name | string | - | Name of the form control. Submitted with the form as part of a name/value pair. |
| onDragEnter | (event: DragEvent<HTMLElement>) => void | - | Called when the `dragenter` event occurs |
| onDragLeave | (event: DragEvent<HTMLElement>) => void | - | Called when the `dragleave` event occurs |
| onDragOver | (event: DragEvent<HTMLElement>) => void | - | Called when the `dragover` event occurs |
| onDrop | (files: FileWithPath[]) => void | required | Called when valid files are dropped to the dropzone |
| onDropAny | (files: FileWithPath[], fileRejections: FileRejection[]) => void | - | Called when any files are dropped to the dropzone |
| onFileDialogCancel | () => void | - | Called when user closes the file selection dialog with no selection |
| onFileDialogOpen | () => void | - | Called when user opens the file selection dialog |
| onReject | (fileRejections: FileRejection[]) => void | - | Called when dropped files do not meet file restrictions |
| openRef | Ref<() => void> \| undefined | - | A ref function which when called opens the file system file picker |
| portalProps | Omit<BasePortalProps, "withinPortal"> | - | Props to pass down to the portal when withinPortal is `true` |
| preventDropOnDocument | boolean | - | If `false`, allow dropped items to take over the current browser window |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| rejectColor | MantineColor | - | Key of `theme.colors` or any valid CSS color to set colors of `Dropzone.Reject` |
| useFsAccessApi | boolean | - | Set to true to use the File System Access API to open the file picker instead of using an `input type="file"` click event |
| validator | <T extends File>(file: T) => FileError \| FileError[] \| null | - | Custom validation function. It must return null if there's no errors. |
| withinPortal | boolean | - | Determines whether component should be rendered within `Portal` |
| zIndex | React.CSSProperties["zIndex"] | - | Z-index value |


#### Styles API

Dropzone component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Dropzone selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Dropzone-root | Dropzone root element |
| inner | .mantine-Dropzone-inner | Dropzone inner element (wraps children) |

**Dropzone CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --dropzone-accept-bg | Controls `background-color` when file is accepted |
| root | --dropzone-reject-bg | Controls `background-color` when file is rejected |
| root | --dropzone-accept-color | Controls `color` when file is accepted |
| root | --dropzone-reject-color | Controls `color` when file is rejected |
| root | --dropzone-radius | Controls `border-radius` |

**Dropzone data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-accept | Files that are dragged over the dropzone are accepted | - |
| root | data-reject | Files that are dragged over the dropzone are rejected | - |
| root | data-idle | Dropzone is idle | - |
| root | data-loading | `loading` prop is set | - |
| root | data-disabled | `disabled` prop is set | - |
| root | data-activate-on-click | `activateOnClick` prop is `true` | - |

**Dropzonefullscreen selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Dropzonefullscreen-root | Dropzone root element |
| inner | .mantine-Dropzonefullscreen-inner | Dropzone inner element (wraps children) |
| fullScreen | .mantine-Dropzonefullscreen-fullScreen | Dropzone.Fullscreen root element |


--------------------------------------------------------------------------------

### ExtensionsPackage
Package: @mantine/x
Import: import { ExtensionsPackage } from '@mantine/x';

# Mantine extensions

Extensions are packages that provide additional functionality like
new components, hooks, or other features. They are built on top of
`@mantine/hooks` and `@mantine/core` packages.

## Official extensions

Official extensions are built by the maintainers of Mantine. These extensions have the `@mantine/` scope
in their package names, for example `@mantine/dates` or `@mantine/carousel`.

Official extensions list:

* [@mantine/dates](https://mantine.dev/llms/dates-getting-started.md) – date and time pickers, calendars, other date-related components
* [@mantine/charts](https://mantine.dev/llms/charts-getting-started.md) – charts and data visualization components based on recharts
* [@mantine/notifications](https://mantine.dev/llms/x-notifications.md) – notifications system
* [@mantine/code-highlight](https://mantine.dev/llms/x-code-highlight.md) – code highlighting component used on Mantine websites
* [@mantine/spotlight](https://mantine.dev/llms/x-spotlight.md) – control center (`Ctrl + K` search bar), can be used for search
* [@mantine/carousel](https://mantine.dev/llms/x-carousel.md) – carousel component based on embla-carousel
* [@mantine/dropzone](https://mantine.dev/llms/x-dropzone.md) – captures files with drag and drop, based on react-dropzone
* [@mantine/modals](https://mantine.dev/llms/x-modals.md) – modals manager
* [@mantine/tiptap](https://mantine.dev/llms/x-tiptap.md) – rich text editor based on tiptap
* [@mantine/nprogress](https://mantine.dev/llms/x-nprogress.md) – navigation progress component

## Community extensions

Community extensions are built by the community. They are maintained
by community members and are updated independently from the core
Mantine packages and extensions.

Community extensions list:

* [BlockNote](https://www.blocknotejs.org/) – block-based rich text editor
* [ContextMenu](https://icflorescu.github.io/mantine-contextmenu/) – context menu component
* [DataTable](https://icflorescu.github.io/mantine-datatable/) – data table component without dependencies
* [MantineReactTable](https://v2.mantine-react-table.com/) – data table component based on TanStack table package
* [BorderAnimate](https://gfazioli.github.io/mantine-border-animate/) – border animation styles (beam, glow, more...)
* [Clock](https://gfazioli.github.io/mantine-clock/) – analog clock component
* [Compare](https://gfazioli.github.io/mantine-compare/) – image comparison slider component
* [DepthSelect](https://gfazioli.github.io/mantine-depth-select/) – 3D stack select component inspired by macOS Time Machine
* [Flip](https://gfazioli.github.io/mantine-flip/) – flip animation component
* [JsonTree](https://gfazioli.github.io/mantine-json-tree/) – interactive JSON tree viewer with syntax highlighting
* [Led](https://gfazioli.github.io/mantine-led/) – LED indicator component for status feedback
* [LensSelect](https://gfazioli.github.io/mantine-lens-select/) – fisheye/lens magnification select with count mode and macOS Dock effect
* [ListViewTable](https://gfazioli.github.io/mantine-list-view-table/) – Finder-style list view table with column reordering and resizing
* [Marquee](https://gfazioli.github.io/mantine-marquee/) – marquee component
* [Mask](https://gfazioli.github.io/mantine-mask/) – cursor-follow spotlight mask component
* [Onboarding](https://gfazioli.github.io/mantine-onboarding-tour/) – onboarding / tour component
* [Parallax](https://gfazioli.github.io/mantine-parallax/) – parallax component
* [Picker](https://gfazioli.github.io/mantine-picker/) – animated picker for color, date, emoji, and other pickers
* [QrCode](https://gfazioli.github.io/mantine-qr-code/) – customizable QR code component
* [Reflection](https://gfazioli.github.io/mantine-reflection/) – reflection effect component
* [RingsProgress](https://gfazioli.github.io/mantine-rings-progress/) – rings progress indicator component
* [Scene](https://gfazioli.github.io/mantine-scene/) – decorative background component with gradients, dots, glow, and noise
* [SelectStepper](https://gfazioli.github.io/mantine-select-stepper/) – option cycling stepper component
* [Spinner](https://gfazioli.github.io/mantine-spinner/) – SVG-based loading spinner with multiple animation variants
* [SplitPane](https://gfazioli.github.io/mantine-split-pane/) – resizable split pane component
* [TextAnimate](https://gfazioli.github.io/mantine-text-animate/) – text animation component
* [Window](https://gfazioli.github.io/mantine-window/) – window component with drag and resize functionalities
* [Mantine Form Builder](https://pradip-v2.github.io/mantine-form-builder/) – form builder and viewer components
* [Mantine Choropleth Map](https://maetes.github.io/mantine-choropleth/) - Choropleth Map component for GeoJson
* [Lightbox](https://rilrom.github.io/mantine-bites/lightbox/) - Full-screen image lightbox built on top of @mantine/carousel

## Create your own extension

You are welcome to create your own extension and share it with the community
in the list above. To submit a new extension to be featured on this page:

* Create and publish an extension on npm. You can choose any name for your package, for example `mantine-oklch-color-picker` or `@rtivital/mantine-emoji-picker`.
* If you are not sure how to get started with extension development, use the [extension template](https://github.com/mantinedev/extension-template). It provides a full development environment with tests, documentation, and examples.
* Submit a pull request to the [main Mantine repository](https://github.com/mantinedev/mantine) with a link to your extension and a short description to be featured on this page.


--------------------------------------------------------------------------------

### Modals manager
Package: @mantine/modals
Import: import { Modals manager } from '@mantine/modals';
Description: Centralized modals manager with option to handle state of multi-step modals

## Installation

```bash
yarn add @mantine/modals
```

```bash
npm install @mantine/modals
```

## Setup ModalsProvider

Wrap your app with `ModalsProvider` component:

```tsx
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

function Demo() {
  return (
    <MantineProvider>
      <ModalsProvider>{/* Your app here */}</ModalsProvider>
    </MantineProvider>
  );
}
```

## Confirm modal

The @mantine/modals package includes a special modal that can be used for confirmations.
The component includes confirm and cancel buttons and supports children to display additional
information about the action. Use the `openConfirmModal` function to open a confirm modal:

```tsx
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  const openModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    children: (
      <Text size="sm">
        This action is so important that you are required to confirm it with a modal. Please click
        one of these buttons to proceed.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirmed'),
  });

  return <Button onClick={openModal}>Open confirm modal</Button>;
}
```


`openConfirmModal` function accepts one argument with the following properties:

* `modalId` – modal id, defaults to a random id, can be used to close the modal programmatically
* `children` – additional modal content displayed before actions
* `onCancel` – called when the cancel button is clicked
* `onConfirm` – called when the confirm button is clicked
* `closeOnConfirm` – should the modal be closed when the confirm button is clicked, defaults to `true`
* `closeOnCancel` – should the modal be closed when the cancel button is clicked, defaults to `true`
* `cancelProps` – cancel button props
* `confirmProps` – confirm button props
* `groupProps` – buttons [Group](https://mantine.dev/llms/core-group.md) props
* `labels` – cancel and confirm button labels, can be defined on ModalsProvider

Using these properties, you can customize the confirm modal to match current context requirements:

```tsx
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

  return <Button onClick={openDeleteModal} color="red">Delete account</Button>;
}
```


To set up shared labels for confirm modals, set `labels` on `ModalsProvider`:

```tsx
import { ModalsProvider } from '@mantine/modals';

function Demo() {
  return (
    <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
      {/* Your app here */}
    </ModalsProvider>
  );
}
```

## Context modals

You can define any number of modals in the ModalsProvider context:

```tsx
import { Button, Text } from '@mantine/core';
import { ContextModalProps, ModalsProvider } from '@mantine/modals';

const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);

function Demo() {
  return (
    <ModalsProvider
      modals={{ demonstration: TestModal /* ...other modals */ }}
    >
      {/* Your app here */}
    </ModalsProvider>
  );
}
```

And then open one of these modals with the `modals.openContextModal` function.
The `modals.openContextModal` function accepts 2 arguments: modal key (should match one defined on ModalsProvider) and modal props:

```tsx
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  return (
    <Button
      onClick={() =>
        modals.openContextModal({
          modal: 'demonstration',
          title: 'Test modal from context',
          innerProps: {
            modalBody:
              'This modal was defined in ModalsProvider, you can open it anywhere in you app with useModals hook',
          },
        })
      }
    >
      Open demonstration context modal
    </Button>
  );
}
```


## Typesafe context modals

By default, `innerProps` and `modal` are not typesafe. You can add type safety with a TypeScript module declaration.

```tsx
const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);
const modals = {
  demonstration: TestModal,
  /* ...other modals */
};
declare module '@mantine/modals' {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}
function Demo() {
  return (
    <ModalsProvider modals={modals}>
      {/* Your app here */}
    </ModalsProvider>
  );
}
```

Type-safe context modals will force you to use the correct types for `openContextModal`:

```tsx
import { closeModal, openContextModal } from '@mantine/modals';

openContextModal({
  modal: 'demonstration',
  title: 'Test modal from context',
  innerProps: {
    modalBody:
      'This modal was defined in ModalsProvider, you can open it anywhere in your app with useModals hook',
  },
});
closeModal('demonstration');
```

## Content modals

With the `modals.open` function, you can open a modal with any content:

```tsx
import { TextInput, Button } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  return (
    <Button
      onClick={() => {
        modals.open({
          title: 'Subscribe to newsletter',
          children: (
            <>
              <TextInput label="Your email" placeholder="Your email" data-autofocus />
              <Button fullWidth onClick={() => modals.closeAll()} mt="md">
                Submit
              </Button>
            </>
          ),
        });
      }}
    >
      Open content modal
    </Button>
  );
}
```


## Multiple opened modals

You can open multiple layers of modals. Every opened modal is added as the first element in the modals queue.
To close all opened modals, call the `modals.closeAll()` function:

```tsx
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  return (
    <Button
      onClick={() =>
        modals.openConfirmModal({
          title: 'Please confirm your action',
          closeOnConfirm: false,
          labels: { confirm: 'Next modal', cancel: 'Close modal' },
          children: (
            <Text size="sm">
              This action is so important that you are required to confirm it with a modal. Please
              click one of these buttons to proceed.
            </Text>
          ),
          onConfirm: () =>
            modals.openConfirmModal({
              title: 'This is modal at second layer',
              labels: { confirm: 'Close modal', cancel: 'Back' },
              closeOnConfirm: false,
              children: (
                <Text size="sm">
                  When this modal is closed modals state will revert to first modal
                </Text>
              ),
              onConfirm: modals.closeAll,
            }),
        })
      }
    >
      Open multiple steps modal
    </Button>
  );
}
```


