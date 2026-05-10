## Definition

```tsx
interface UseDebouncedCallbackOptions {
  delay: number;
  flushOnUnmount?: boolean;
  leading?: boolean;
  maxWait?: number;
}

type UseDebouncedCallbackReturnValue<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => void) & { flush: () => void; cancel: () => void; isPending: () => boolean };

function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delayOrOptions: number | UseDebouncedCallbackOptions
): UseDebouncedCallbackReturnValue<T>
```

## Exported types

The `UseDebouncedCallbackOptions` and `UseDebouncedCallbackReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseDebouncedCallbackOptions, UseDebouncedCallbackReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useDebouncedState
Package: @mantine/hooks
Import: import { UseDebouncedState } from '@mantine/hooks';

## Usage

The `use-debounced-state` hook debounces value changes.
This can be useful when you want to perform a heavy operation based on React state,
for example, sending a search request. Unlike [use-debounced-value](https://mantine.dev/llms/hooks-use-debounced-value.md), it
is designed to work with uncontrolled components.

```tsx
import { useDebouncedState } from '@mantine/hooks';
import { TextInput, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useDebouncedState('', 200);

  return (
    <>
      <TextInput
        label="Enter value to see debounce effect"
        defaultValue={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Text>Debounced value: {value}</Text>
    </>
  );
}
```


## Differences from use-debounce-value

* You do not have direct access to the non-debounced value.
* It is used for uncontrolled inputs (`defaultValue` prop instead of `value`), for example, it does not render with every state change like a character typed in an input.
* It does not work with custom state providers or props, and it uses `useState` internally.

## Leading update

You can immediately update the value with the first call using `{ leading: true }` options:

```tsx
import { useDebouncedState } from '@mantine/hooks';
import { TextInput, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useDebouncedState('', 200, { leading: true });

  return (
    <>
      <TextInput
        label="Enter value to see debounce effect"
        defaultValue={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Text>Debounced value: {value}</Text>
    </>
  );
}
```


## Definition

```tsx
interface UseDebouncedStateOptions {
  leading?: boolean;
}

type UseDebouncedStateReturnValue<T> = [T, (newValue: SetStateAction<T>) => void];

function useDebouncedState<T = any>(
  defaultValue: T,
  wait: number,
  options?: UseDebouncedStateOptions,
): UseDebouncedStateReturnValue<T>
```

## Exported types

The `UseDebouncedStateOptions` and `UseDebouncedStateReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseDebouncedStateOptions, UseDebouncedStateReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useDebouncedValue
Package: @mantine/hooks
Import: import { UseDebouncedValue } from '@mantine/hooks';

## Usage

The `use-debounced-value` hook debounces value changes.
This can be useful when you want to perform a heavy operation based on React state,
for example, sending a search request. Unlike [use-debounced-state](https://mantine.dev/llms/hooks-use-debounced-state.md), it
is designed to work with controlled components.

```tsx
import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { TextInput, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200);

  return (
    <>
      <TextInput
        label="Enter value to see debounce"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Text>Value: {value}</Text>
      <Text>Debounced value: {debounced}</Text>
    </>
  );
}
```


## Differences from use-debounced-state

* You have direct access to the non-debounced value.
* It is used for controlled inputs (`value` prop instead of `defaultValue`), for example, it renders on every state change like a character typed in an input.
* It works with props or other state providers, and it does not force use of `useState`.

## Leading update

You can immediately update the value with the first call using `{ leading: true }` options:

```tsx
import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { TextInput, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200, { leading: true });

  return (
    <>
      <TextInput
        label="Enter value to see debounce"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Text>Value: {value}</Text>
      <Text>Debounced value: {debounced}</Text>
    </>
  );
}
```


## Cancel and flush

The hook returns a third element with `cancel` and `flush` handlers.
`cancel` discards the pending update, `flush` applies it immediately.
Updates cancel automatically on component unmount.

In this example, type in some text and click the cancel button
within a second to cancel debounced value change:

```tsx
import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { TextInput, Text, Button } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  const [debounced, cancel] = useDebouncedValue(value, 1000);

  return (
    <>
      <TextInput
        label="Enter value to see debounce"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Button onClick={cancel} size="lg">
        Cancel
      </Button>

      <Text>Value: {value}</Text>
      <Text>Debounced value: {debounced}</Text>
    </>
  );
}
```


The second element of the returned tuple is a shorthand for `cancel` for backwards compatibility.

```tsx
const [debounced, cancel, { cancel, flush }] = useDebouncedValue(value, 200);
```

## Definition

```tsx
interface UseDebouncedValueOptions {
  leading?: boolean;
}

interface UseDebouncedValueHandlers {
  cancel: () => void;
  flush: () => void;
}

type UseDebouncedValueReturnValue<T> = [T, () => void, UseDebouncedValueHandlers];

function useDebouncedValue<T = any>(
  value: T,
  wait: number,
  options?: UseDebouncedValueOptions,
): UseDebouncedValueReturnValue<T>
```

## Exported types

The `UseDebouncedValueOptions` and `UseDebouncedValueReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseDebouncedValueOptions, UseDebouncedValueReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useDidUpdate
Package: @mantine/hooks
Import: import { UseDidUpdate } from '@mantine/hooks';

## Usage

The `use-did-update` hook works the same way as `useEffect` but it is not called when the component is mounted:

```tsx
import { useDidUpdate } from '@mantine/hooks';

function Demo() {
  useDidUpdate(
    () => console.log("Will not be called when mounted"),
    [dependency1, dependency2]
  );
}
```

## Definition

```tsx
function useDidUpdate(fn: React.EffectCallback, dependencies?: any[]): void;
```


--------------------------------------------------------------------------------

### useDisclosure
Package: @mantine/hooks
Import: import { UseDisclosure } from '@mantine/hooks';

## Usage

The `use-disclosure` hook manages boolean state. It provides `open`, `close`, and `toggle` handlers
and accepts optional `onOpen` and `onClose` callbacks. You can use it to manage controlled modals,
popovers, and other similar components:

```tsx
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [opened, handlers] = useDisclosure(false);

  // Sets opened to true
  handlers.open();

  // Sets opened to false
  handlers.close();

  // Sets opened to true if it was false and vice versa
  handlers.toggle();
}
```

## Callbacks

The `onOpen` and `onClose` callbacks execute when the opened state changes:

```tsx
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [opened, handlers] = useDisclosure(false, {
    onOpen: () => console.log('Opened'),
    onClose: () => console.log('Closed'),
  });

  // Calls `onOpen` callback and sets opened to true
  handlers.open();

  // Does nothing, opened is already true
  handlers.open();

  // Calls `onClose` callback and sets opened to false
  handlers.close();

  // Does nothing, opened is already false
  handlers.close();

  // Calls `onOpen` or `onClose` depending on the current state
  handlers.toggle();
}
```

## Definition

```tsx
interface UseDisclosureOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

interface UseDisclosureHandlers {
  set: (value: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

type UseDisclosureReturnValue = [boolean, UseDisclosureHandlers];

function useDisclosure(
  initialState?: boolean,
  options?: UseDisclosureOptions,
): UseDisclosureReturnValue
```

## Exported types

`UseDisclosureOptions`, `UseDisclosureHandlers` and `UseDisclosureReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseDisclosureOptions, UseDisclosureHandlers, UseDisclosureReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useDocumentTitle
Package: @mantine/hooks
Import: import { UseDocumentTitle } from '@mantine/hooks';

## Usage

The `use-document-title` hook sets the `document.title` property with the `React.useLayoutEffect` hook.
`use-document-title` is not called during server-side rendering.
Use this hook with client-only applications; for isomorphic use, consider more advanced options
(for example, [react-helmet](https://github.com/nfl/react-helmet)).

Call the hook with a string that should be set as the document title in any component.
`use-document-title` triggers every time the value changes
and the value is not an empty string (trailing whitespace is trimmed).

```tsx
import { useState } from 'react';
import { useDocumentTitle, randomId } from '@mantine/hooks';
import { Button } from '@mantine/core';

function Demo() {
  const [title, setTitle] = useState('');
  useDocumentTitle(title);

  return (
    <Button onClick={() => setTitle(randomId())}>
      Set document title to random id
    </Button>
  );
}
```


## Definition

```tsx
function useDocumentTitle(title: string): void;
```


--------------------------------------------------------------------------------

### useDocumentVisibility
Package: @mantine/hooks
Import: import { UseDocumentVisibility } from '@mantine/hooks';

## Usage

The `use-document-visibility` hook returns the current [document.visibilityState](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState)
– it allows you to detect if the current tab is active:

```tsx
import { Text } from '@mantine/core';
import { useDocumentTitle, useDocumentVisibility } from '@mantine/hooks';

function Demo() {
  const documentState = useDocumentVisibility();
  useDocumentTitle(`Document is ${documentState}`);
  return <Text>Switch to another tab to see document title change</Text>;
}
```


## Definition

```tsx
// DocumentVisibilityState is 'visible' | 'hidden'
function useDocumentVisibility(): DocumentVisibilityState;
```


--------------------------------------------------------------------------------

### use-element-size
Package: @mantine/hooks
Import: import { use-element-size } from '@mantine/hooks';
Description: Returns element width and height and observes changes with ResizeObserver

## Usage

```tsx
import { useElementSize } from '@mantine/hooks';

function Demo() {
  const { ref, width, height } = useElementSize();

  return (
    <>
      <textarea ref={ref} style={{ width: 400, height: 120 }} />
      <div>Width: {width}, height: {height}</div>
    </>
  );
}
```


## API

`use-element-size` is a simpler version of the [use-resize-observer](https://mantine.dev/llms/hooks-use-resize-observer.md) hook.
The hook returns a `ref` object that should be passed to the observed element, and the element's `height` and `width`.
On the first render (as well as during SSR), or when no element is being observed, the `width` and `height` properties are equal to `0`.

```tsx
import { useElementSize } from '@mantine/hooks';

const { ref, width, height } = useElementSize();
```

## Definition

```tsx
interface UseElementSizeReturnValue {
  ref: React.RefObject<HTMLElement>;
  width: number;
  height: number;
}

function useElementSize<T extends HTMLElement = any>(): UseElementSizeReturnValue;
```


--------------------------------------------------------------------------------

### useEventListener
Package: @mantine/hooks
Import: import { UseEventListener } from '@mantine/hooks';

## Usage

The `use-event-listener` hook adds a given event listener to an element to which `ref` is assigned.
The hook supports the same options as the `addEventListener` method.
After the component is unmounted, the listener is automatically removed.

```tsx
import { useState, useCallback } from 'react';
import { Button } from '@mantine/core';
import { useEventListener } from '@mantine/hooks';

function Demo() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  const ref = useEventListener('click', increment);
  return <Button ref={ref}>Button clicks: {count}</Button>;
}
```


## Definition

```tsx
function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = any>(
  type: K,
  listener: (this: T, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): React.RefCallback<T | null>
```


--------------------------------------------------------------------------------

### useEyeDropper
Package: @mantine/hooks
Import: import { UseEyeDropper } from '@mantine/hooks';

## Usage

The `use-eye-dropper` hook provides an interface to work with [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API).
Check [browser support](https://caniuse.com/mdn-api_eyedropper) to learn which browsers support the API.

```tsx
import { useState } from 'react';
import { ActionIcon, Group, ColorSwatch, Text } from '@mantine/core';
import { CrosshairIcon } from '@phosphor-icons/react';
import { useEyeDropper } from '@mantine/hooks';

function Demo() {
  const [color, setColor] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const { supported, open } = useEyeDropper();

  const pickColor = async () => {
    try {
      const { sRGBHex } = (await open())!;
      setColor(sRGBHex);
    } catch (e) {
      setError(e as Error);
    }
  };

  if (!supported) {
    return <Text ta="center">EyeDropper API is not supported in your browser</Text>;
  }

  return (
    <Group>
      <ActionIcon variant="default" onClick={pickColor} size="xl">
        <CrosshairIcon size={28} />
      </ActionIcon>
      {color ? (
        <Group gap="xs">
          <ColorSwatch color={color} />
          <Text>Picked color: {color}</Text>
        </Group>
      ) : (
        <Text>Click the button to pick color</Text>
      )}
      {error && <Text c="red">Error: {error?.message}</Text>}
    </Group>
  );
}
```


## Definition

```tsx
interface EyeDropperOpenOptions {
  signal?: AbortSignal;
}

interface EyeDropperOpenReturnType {
  sRGBHex: string;
}

interface UseEyeDropperReturnValue {
  supported: boolean;
  open: (options?: EyeDropperOpenOptions) => Promise<EyeDropperOpenReturnType | undefined>;
}

function useEyeDropper(): UseEyeDropperReturnValue;
```

## Exported types

`EyeDropperOpenOptions`, `EyeDropperOpenReturnType` and `UseEyeDropperReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type {
  EyeDropperOpenOptions,
  EyeDropperOpenReturnType,
  UseEyeDropperReturnValue,
} from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useFavicon
Package: @mantine/hooks
Import: import { UseFavicon } from '@mantine/hooks';

## Usage

The `use-favicon` hook appends a `<link />` element to the head component with the given favicon in `useLayoutEffect`.
The hook is not called during server-side rendering.

Call the hook with a favicon URL (supported formats: `.ico`, `.png`, `.svg`, and `.gif`) that should be set as the favicon.
The hook is triggered every time the URL changes and the value is not an empty string (trailing whitespace is trimmed) or `null`.

```tsx
import { useState } from 'react';
import { useFavicon } from '@mantine/hooks';
import { Group, Button } from '@mantine/core';

function Demo() {
  const [favicon, setFavicon] = useState('https://mantine.dev/favicon.svg');
  const setMantineFavicon = () => setFavicon('https://mantine.dev/favicon.svg');
  const setMantineUIFavicon = () => setFavicon('https://ui.mantine.dev/favicon.svg');

  useFavicon(favicon);

  return (
    <Group justify="center">
      <Button onClick={setMantineFavicon}>Mantine favicon</Button>
      <Button onClick={setMantineUIFavicon}>Mantine UI favicon</Button>
    </Group>
  );
}
```


## Definition

```tsx
function useFavicon(url: string): void;
```


--------------------------------------------------------------------------------

### useFetch
Package: @mantine/hooks
Import: import { UseFetch } from '@mantine/hooks';

## Usage

The `useFetch` hook sends a GET request to the specified URL and returns the response data, loading state, error,
`refetch` and `abort` functions.

```tsx
import { Box, Button, Code, Group, LoadingOverlay, Text } from '@mantine/core';
import { useFetch } from '@mantine/hooks';

interface Item {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function Demo() {
  const { data, loading, error, refetch, abort } = useFetch<Item[]>(
    'https://jsonplaceholder.typicode.com/todos/'
  );

  return (
    <div>
      {error && <Text c="red">{error.message}</Text>}

      <Group>
        <Button onClick={refetch} color="blue">
          Refetch
        </Button>
        <Button onClick={abort} color="red">
          Abort
        </Button>
      </Group>
      <Box pos="relative" mt="md">
        <Code block>{data ? JSON.stringify(data.slice(0, 3), null, 2) : 'Fetching'}</Code>
        <LoadingOverlay visible={loading} />
      </Box>
    </div>
  );
}
```


## Definition

```tsx
interface UseFetchOptions extends RequestInit {
  autoInvoke?: boolean;
}

interface UseFetchReturnValue<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
  abort: () => void;
}

function useFetch<T>(
  url: string,
  options?: UseFetchOptions,
): UseFetchReturnValue<T>
```

## Exported types

`UseFetchOptions` and `UseFetchReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseFetchOptions, UseFetchReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useFileDialog
Package: @mantine/hooks
Import: import { UseFileDialog } from '@mantine/hooks';

## Usage

The `use-file-dialog` hook allows you to capture one or more files from the user without a file input element:

```tsx
import { Button, Group, List } from '@mantine/core';
import { useFileDialog } from '@mantine/hooks';

function Demo() {
  const fileDialog = useFileDialog();

  const pickedFiles = Array.from(fileDialog.files || []).map((file) => (
    <List.Item key={file.name}>{file.name}</List.Item>
  ));

  return (
    <div>
      <Group>
        <Button onClick={fileDialog.open}>Pick files</Button>
        {pickedFiles.length > 0 && (
          <Button variant="default" onClick={fileDialog.reset}>
            Reset
          </Button>
        )}
      </Group>
      {pickedFiles.length > 0 && <List mt="lg">{pickedFiles}</List>}
    </div>
  );
}
```


## Definition

```tsx
interface UseFileDialogOptions {
  /** Determines whether multiple files are allowed, `true` by default */
  multiple?: boolean;

  /** `accept` attribute of the file input, '*' by default */
  accept?: string;

  /** `capture` attribute of the file input */
  capture?: string;

  /** Determines whether the user can pick a directory instead of file, `false` by default */
  directory?: boolean;

  /** Determines whether the file input state should be reset when the file dialog is opened, `false` by default */
  resetOnOpen?: boolean;

  /** Initial selected files */
  initialFiles?: FileList | File[];

  /** Called when files are selected */
  onChange?: (files: FileList | null) => void;

  /** Called when file dialog is canceled */
  onCancel?: () => void;
}

interface UseFileDialogReturnValue {
  files: FileList | null;
  open: () => void;
  reset: () => void;
}

function useFileDialog(input?: UseFileDialogOptions): UseFileDialogReturnValue;
```

## Exported types

`UseFileDialogOptions` and `UseFileDialogReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseFileDialogOptions, UseFileDialogReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useFloatingWindow
Package: @mantine/hooks
Import: import { UseFloatingWindow } from '@mantine/hooks';

## Usage

The `use-floating-window` hook makes a given element draggable:

```tsx
import { Button, CloseButton, Group, Paper, Portal, Text } from '@mantine/core';
import { useDisclosure, useFloatingWindow } from '@mantine/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const floatingWindow = useFloatingWindow({
    constrainToViewport: true,
    constrainOffset: 20,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Button onClick={handlers.toggle} variant="default">
        {visible ? 'Hide' : 'Show'} floating window
      </Button>

      {visible && (
        <Portal>
          <Paper
            w={280}
            p="md"
            withBorder
            pos="fixed"
            style={{ cursor: 'move', transition: 'box-shadow 70ms ease', zIndex: 400 }}
            shadow={floatingWindow.isDragging ? 'md' : undefined}
            ref={floatingWindow.ref}
          >
            <Group justify="space-between" mb="md">
              <Text>Usage demo</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">This is a floating window. You can drag it around.</Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}
```


## Constrain to viewport

Use `constrainToViewport` option to restrict element movement to the viewport boundaries.
If you do not set `constrainToViewport` option, the element can be dragged outside the viewport:

```tsx
import { Button, CloseButton, Group, Paper, Portal, Text } from '@mantine/core';
import { useDisclosure, useFloatingWindow } from '@mantine/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const floatingWindow = useFloatingWindow({
    constrainToViewport: false,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Button onClick={handlers.toggle} variant="default">
        {visible ? 'Hide' : 'Show'} floating window
      </Button>

      {visible && (
        <Portal>
          <Paper
            w={280}
            p="md"
            withBorder
            pos="fixed"
            style={{ cursor: 'move', transition: 'box-shadow 70ms ease', zIndex: 400 }}
            shadow={floatingWindow.isDragging ? 'md' : undefined}
            ref={floatingWindow.ref}
          >
            <Group justify="space-between" mb="md">
              <Text>No constrain demo</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">
              The floating window is not constrained by the viewport, it can move out of bounds.
            </Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}
```


## Constrain offset

Use `constrainOffset` option to set the offset from the viewport edges when constraining the element.
This option requires `constrainToViewport: true`:

```tsx
import { Button, CloseButton, Group, Paper, Portal, Text } from '@mantine/core';
import { useDisclosure, useFloatingWindow } from '@mantine/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const floatingWindow = useFloatingWindow({
    constrainToViewport: true,
    constrainOffset: 30,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 30 },
  });

  return (
    <>
      <Button onClick={handlers.toggle} variant="default">
        {visible ? 'Hide' : 'Show'} floating window
      </Button>

      {visible && (
        <Portal>
          <Paper
            w={280}
            p="md"
            withBorder
            pos="fixed"
            style={{ cursor: 'move', transition: 'box-shadow 70ms ease', zIndex: 400 }}
            shadow={floatingWindow.isDragging ? 'md' : undefined}
            ref={floatingWindow.ref}
          >
            <Group justify="space-between" mb="md">
              <Text>Constrain offset demo</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">
              This floating window has 30px offset, it cannot move closer that 30px to the edge of
              the viewport.
            </Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}
```


## Drag handle selector

`dragHandleSelector` option allows specifying a selector of an element (or a group of elements) that should be used to drag floating window.
If not specified, the entire root element is used as a drag target.

`excludeDragHandleSelector` option excludes elements within `dragHandleSelector` from the drag event.
In the following example, the close button is excluded from the drag event:

```tsx
import { Button, CloseButton, Group, Paper, Portal, Text } from '@mantine/core';
import { useDisclosure, useFloatingWindow } from '@mantine/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const floatingWindow = useFloatingWindow({
    constrainToViewport: true,
    constrainOffset: 20,
    dragHandleSelector: '.drag-handle',
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Button onClick={handlers.toggle} variant="default">
        {visible ? 'Hide' : 'Show'} floating window
      </Button>

      {visible && (
        <Portal>
          <Paper
            w={280}
            withBorder
            pos="fixed"
            style={{ transition: 'box-shadow 70ms ease', zIndex: 400 }}
            shadow={floatingWindow.isDragging ? 'md' : undefined}
            ref={floatingWindow.ref}
          >
            <Group
              justify="space-between"
              px="md"
              py="sm"
              className="drag-handle"
              style={{ cursor: 'move' }}
            >
              <Text>Drag handle demo</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm" px="md" pb="sm">
              Drag floating window around with drag handle element.
            </Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}
```


## Enabled option

Use `enabled` option to enable or disable dragging:

```tsx
import { useState } from 'react';
import { Button, Chip, CloseButton, Group, Paper, Portal, Text } from '@mantine/core';
import { useDisclosure, useFloatingWindow } from '@mantine/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const [enabled, setEnabled] = useState(true);
  const floatingWindow = useFloatingWindow({
    enabled,
    constrainToViewport: true,
    constrainOffset: 20,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Group>
        <Button variant="default" onClick={handlers.toggle}>
          {visible ? 'Hide' : 'Show'} floating window
        </Button>
        <Chip checked={enabled} onChange={() => setEnabled((e) => !e)}>
          Drag {enabled ? 'enabled' : 'disabled'}
        </Chip>
      </Group>

      {visible && (
        <Portal>
          <Paper
            w={280}
            p="md"
            withBorder
            pos="fixed"
            style={{ cursor: 'move', transition: 'box-shadow 70ms ease', zIndex: 400 }}
            shadow={floatingWindow.isDragging ? 'md' : undefined}
            ref={floatingWindow.ref}
          >
            <Group justify="space-between" mb="md">
              <Text>Enabled demo</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">This is a floating window. You can drag it around.</Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}
```


## Set position

Call `setPosition` function to set the position of the element programmatically.
This function accepts an object with `top`, `left`, `right` and `bottom` properties,
from which you should only specify two (for example, `top` and `left`, `bottom` and `right`).

```tsx
import { Button, CloseButton, Group, Paper, Portal, Text } from '@mantine/core';
import { useDisclosure, useFloatingWindow } from '@mantine/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const floatingWindow = useFloatingWindow({
    constrainToViewport: true,
    constrainOffset: 20,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Group>
        <Button onClick={handlers.toggle} variant="default">
          {visible ? 'Hide' : 'Show'} floating window
        </Button>
        <Button
          onClick={() => floatingWindow.setPosition({ bottom: 40, right: 40 })}
          variant="default"
        >
          Set position to bottom right corner
        </Button>
      </Group>

      {visible && (
        <Portal>
          <Paper
            w={280}
            p="md"
            withBorder
            pos="fixed"
            style={{ cursor: 'move', transition: 'box-shadow 70ms ease', zIndex: 400 }}
            shadow={floatingWindow.isDragging ? 'md' : undefined}
            ref={floatingWindow.ref}
          >
            <Group justify="space-between" mb="md">
              <Text>Set position demo</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">This is a floating window. You can drag it around.</Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}
```


## Lock axis

Use `axis` option to restrict movement to the specified axis:

```tsx
import { useState } from 'react';
import { Button, CloseButton, Group, Paper, Portal, SegmentedControl, Text } from '@mantine/core';
import { useDisclosure, useFloatingWindow } from '@mantine/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const [axis, setAxis] = useState<'x' | 'y'>('y');
  const floatingWindow = useFloatingWindow({
    axis,
    constrainToViewport: true,
    constrainOffset: 20,
    excludeDragHandleSelector: 'button',
    initialPosition: { top: 300, left: 20 },
  });

  return (
    <>
      <Group>
        <Button onClick={handlers.toggle} variant="default">
          {visible ? 'Hide' : 'Show'} floating window
        </Button>
        <SegmentedControl data={['x', 'y']} onChange={(val) => setAxis(val as 'x')} value={axis} />
      </Group>

      {visible && (
        <Portal>
          <Paper
            w={280}
            p="md"
            withBorder
            pos="fixed"
            style={{ cursor: 'move', transition: 'box-shadow 70ms ease', zIndex: 400 }}
            shadow={floatingWindow.isDragging ? 'md' : undefined}
            ref={floatingWindow.ref}
          >
            <Group justify="space-between" mb="md">
              <Text>Axis demo</Text>
              <CloseButton onClick={handlers.close} />
            </Group>
            <Text fz="sm">
              When you set axis prop, the floating window can be dragged only horizontally or
              vertically.
            </Text>
          </Paper>
        </Portal>
      )}
    </>
  );
}
```


## FloatingWindow component

If you prefer component API, you can use [FloatingWindow](https://mantine.dev/llms/core-floating-window.md) component.
It supports the same options as the hook and provides extra features like portal rendering, basic styles and more.

```tsx
import { Button, CloseButton, FloatingWindow, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();

  return (
    <>
      <Button onClick={handlers.toggle} variant="default">
        {visible ? 'Hide' : 'Show'} floating window
      </Button>

      {visible && (
        <FloatingWindow
          w={280}
          p="md"
          withBorder
          excludeDragHandleSelector="button"
          initialPosition={{ top: 300, left: 20 }}
          style={{ cursor: 'move' }}
        >
          <Group justify="space-between" mb="md">
            <Text>Usage demo</Text>
            <CloseButton onClick={handlers.close} />
          </Group>
          <Text fz="sm">This is a floating window. You can drag it around.</Text>
        </FloatingWindow>
      )}
    </>
  );
}
```


## Definition

```tsx
function useFloatingWindow<T extends HTMLElement>(
  options?: UseFloatingWindowOptions
): UseFloatingWindowReturnValue<T>

interface FloatingWindowPositionConfig {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

interface FloatingWindowPosition {
  /** Element offset from the left side of the viewport */
  x: number;

  /** Element offset from the top side of the viewport */
  y: number;
}

interface UseFloatingWindowOptions {
  /** If `false`, the element can not be dragged. */
  enabled?: boolean;

  /** If `true`, the element can only move within
   * the current viewport boundaries. */
  constrainToViewport?: boolean;

  /** The offset from the viewport edges when constraining the element.
   * Requires `constrainToViewport: true`. */
  constrainOffset?: number;

  /** Selector of an element that should be used to drag floating window.
   * If not specified, the entire root element is used as a drag target. */
  dragHandleSelector?: string;

  /** Selector of an element within `dragHandleSelector`
   * that should be excluded from the drag event. */
  excludeDragHandleSelector?: string;

  /** If set, restricts movement to the specified axis */
  axis?: 'x' | 'y';

  /** Initial position. If not set, calculated from element styles. */
  initialPosition?: FloatingWindowPositionConfig;

  /** Called when the element position changes */
  onPositionChange?: (pos: FloatingWindowPosition) => void;

  /** Called when the drag starts */
  onDragStart?: () => void;

  /** Called when the drag stops */
  onDragEnd?: () => void;
}

type SetFloatingWindowPosition = (position: FloatingWindowPositionConfig) => void;

interface UseFloatingWindowReturnValue<T extends HTMLElement> {
  /** Ref to the element that should be draggable */
  ref: RefCallback<T | null>;

  /** Function to set the position of the element */
  setPosition: SetFloatingWindowPosition;

  /** `true` if the element is currently being dragged */
  isDragging: boolean;
}
```

## Exported types

`UseFloatingWindowOptions` and `UseFloatingWindowReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseFloatingWindowOptions, UseFloatingWindowReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useFocusReturn
Package: @mantine/hooks
Import: import { UseFocusReturn } from '@mantine/hooks';

## Usage

The `use-focus-return` hook automatically returns focus to the last focused element when a given condition is met.
For example, it is used in the [Modal](https://mantine.dev/llms/core-modal.md) component to restore focus after the modal was closed.

Close the modal with the `Escape` key and see how focus returns to the button after the modal closes:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


In most cases, you should use this hook with [use-focus-trap](https://mantine.dev/llms/hooks-use-focus-trap.md).

```tsx
import { useFocusReturn } from '@mantine/hooks';

useFocusReturn({
  // Is region with focus trap active?
  // When it activates hook saves document.activeElement to the internal state
  // and focuses this element once focus trap is deactivated
  opened: false,

  // Determines whether focus should be returned automatically, true by default
  shouldReturnFocus: true,
});
```

If the `shouldReturnFocus` option is set to `false`, you can call the returned function to focus the last active element:

```tsx
import { useFocusReturn } from '@mantine/hooks';

const returnFocus = useFocusReturn({
  opened: false,
  shouldReturnFocus: false,
});

// ... later
returnFocus();
```

## Definition

```tsx
interface UseFocusReturnOptions {
  opened: boolean;
  shouldReturnFocus?: boolean;
}

type UseFocusReturnReturnValue = () => void;

function useFocusReturn(options: UseFocusReturnOptions): UseFocusReturnReturnValue
```

## Exported types

`UseFocusReturnOptions` and `UseFocusReturnReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseFocusReturnOptions, UseFocusReturnReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useFocusTrap
Package: @mantine/hooks
Import: import { UseFocusTrap } from '@mantine/hooks';

## Usage

The `use-focus-trap` hook traps focus at the given node, for example in a modal, drawer, or menu.
The node must include at least one focusable element. When the node unmounts, the focus trap is automatically released.

```tsx
import { useFocusTrap } from '@mantine/hooks';

function Demo() {
  const focusTrapRef = useFocusTrap();

  return (
    <div ref={focusTrapRef}>
      <input />
    </div>
  );
}
```

## API

The hook accepts focus trap active state as a single argument:

```tsx
import { useFocusTrap } from '@mantine/hooks';

useFocusTrap(); // -> focus trap inactive
useFocusTrap(true); // -> focus trap active

useFocusTrap(false); // -> focus trap disabled
```

The hook returns `ref` that should be passed to the element:

```tsx
import { Paper } from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';

function Demo() {
  const focusTrapRef = useFocusTrap();

  return (
    <>
      {/* With regular element: */}
      <div ref={focusTrapRef} />

      {/* With Mantine component: */}
      <Paper ref={focusTrapRef} />
    </>
  );
}
```

## Combine with other ref based hooks

To combine `use-focus-trap` with other ref-based hooks, use the [use-merged-ref](https://mantine.dev/llms/hooks-use-merged-ref.md) hook:

```tsx
import { useRef } from 'react';
import {
  useClickOutside,
  useFocusTrap,
  useMergedRef,
} from '@mantine/hooks';

function Demo() {
  const myRef = useRef();
  const useClickOutsideRef = useClickOutside(() => {});
  const focusTrapRef = useFocusTrap();
  const mergedRef = useMergedRef(
    myRef,
    useClickOutsideRef,
    focusTrapRef
  );

  return <div ref={mergedRef} />;
}
```

## Initial focus

By default, the focus trap will move focus to the first interactive element.
To specify the element that should receive initial focus, add the `data-autofocus` attribute:

```tsx
import { useFocusTrap } from '@mantine/hooks';

function Demo() {
  const focusTrapRef = useFocusTrap();

  return (
    <div ref={focusTrapRef}>
      <input />
      {/* The second input in the modal will have initial focus */}
      <input data-autofocus />
      <input />
    </div>
  );
}
```

## Definition

```tsx
function useFocusTrap(active?: boolean): React.RefCallback<HTMLElement | null>
```


--------------------------------------------------------------------------------

### useFocusWithin
Package: @mantine/hooks
Import: import { UseFocusWithin } from '@mantine/hooks';

## Usage

The `use-focus-within` hook detects if any element within another element has focus.
It works the same way as the `:focus-within` CSS selector:

```tsx
import { useFocusWithin } from '@mantine/hooks';
import { TextInput, Button, Box, Text } from '@mantine/core';

function Demo() {
  const { ref, focused } = useFocusWithin();

  return (
    <div ref={ref}>
      <Box
        p="xl"
        style={{
          backgroundColor: focused ? 'var(--mantine-color-blue-light)' : 'transparent',
        }}
      >
        <Text size="sm">One of elements has focus: {focused.toString()}</Text>
        <TextInput label="Focus this input" placeholder="Styles will be added to parent" />
        <Button mt="md">Button</Button>
      </Box>
    </div>
  );
}
```


## Definition

```tsx
interface UseFocusWithinOptions {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

interface UseFocusWithinReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  focused: boolean;
}

function useFocusWithin<T extends HTMLElement = any>(
  options?: UseFocusWithinOptions,
): UseFocusWithinReturnValue<T>
```

## Exported types

`UseFocusWithinOptions` and `UseFocusWithinReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseFocusWithinOptions, UseFocusWithinReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useForceUpdate
Package: @mantine/hooks
Import: import { UseForceUpdate } from '@mantine/hooks';

## Usage

The `use-force-update` hook returns a function that, when called, rerenders the component:

```tsx
import { Button, Text, Group } from '@mantine/core';
import { useForceUpdate, randomId } from '@mantine/hooks';

function Demo() {
  const forceUpdate = useForceUpdate();

  return (
    <Group justify="center">
      <Text>{randomId()}</Text>
      <Button onClick={forceUpdate}>Force update</Button>
    </Group>
  );
}
```


## Definition

```tsx
function useForceUpdate(): () => void;
```


--------------------------------------------------------------------------------

### useFullscreen
Package: @mantine/hooks
Import: import { UseFullscreen } from '@mantine/hooks';

## Usage

The `use-fullscreen` hook allows you to enter/exit fullscreen for a given element using the [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API).
By default, if you don't provide a `ref`, the hook will target `document.documentElement`:

```tsx
import { useFullscreenDocument } from '@mantine/hooks';
import { Button } from '@mantine/core';

function Demo() {
  const { toggle, fullscreen } = useFullscreenDocument();

  return (
    <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
      {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    </Button>
  );
}
```


## Custom target element

The hook returns an optional `ref` function that can be passed to an element to act as root.
Be sure to follow best practices to not [confuse or trap the end user](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API/Guide#things_your_users_want_to_know):

```tsx

import { useFullscreenElement } from '@mantine/hooks';
import { Button, Stack } from '@mantine/core';

function RefDemo() {
  const { ref, toggle, fullscreen } = useFullscreenElement();

  return (
    <Stack align="center">
      <img
        ref={ref}
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
        alt="For demo"
        width={200}
      />
      <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
        {fullscreen ? 'Exit Fullscreen' : 'View Image Fullscreen'}
      </Button>
    </Stack>
  );
}

```


## Mobile Safari limitations

Mobile Safari (especially on iPhone) has limited Fullscreen API support. In many cases, fullscreen is only supported for `<video>` elements and may not work for arbitrary elements (including `document.documentElement`).

`use-fullscreen` includes Safari-specific fallbacks where possible, but it cannot bypass browser/platform restrictions.

Also note that entering fullscreen usually requires a direct user interaction (for example, a button click).

## Definition

```tsx
interface UseFullscreenElementReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  toggle: () => Promise<void>;
  fullscreen: boolean;
}

interface UseFullscreenDocumentReturnValue {
  toggle: () => Promise<void>;
  fullscreen: boolean;
}

function useFullscreenElement<T extends HTMLElement = any>(): UseFullscreenElementReturnValue<T>
function useFullscreenDocument(): UseFullscreenDocumentReturnValue
```

## Exported types

The `UseFullscreenElementReturnValue` and `UseFullscreenDocumentReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseFullscreenElementReturnValue, UseFullscreenDocumentReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useHash
Package: @mantine/hooks
Import: import { UseHash } from '@mantine/hooks';

## Usage

The `use-hash` hook returns the hash from the URL, subscribes to its changes with the [hashchange event](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event),
and allows you to change it with the `setHash` function:

```tsx
import { useHash, randomId } from '@mantine/hooks';
import { Button, Text, Code } from '@mantine/core';

function Demo() {
  const [hash, setHash] = useHash();
  return (
    <>
      <Button onClick={() => setHash(randomId())}>Set hash to random string</Button>
      <Text>Current hash: <Code>{hash}</Code></Text>
    </>
  );
}
```


## Initial state value

By default, `use-hash` will retrieve the value in `useEffect`. If you want to get the initial value
as soon as the hook is called, set `getInitialValueInEffect` to `false`. Note that this option is
not compatible with server-side rendering – you can only use it if your app is client-side only.

```tsx
import { Button } from '@mantine/core';
import { useHash } from '@mantine/hooks';

function Demo() {
  const [hash, setHash] = useHash({ getInitialValueInEffect: false });
  return (
    <Button onClick={() => setHash('new-hash')}>Change hash</Button>
  );
}
```

## Definition

```tsx
interface UseHashOptions {
  getInitialValueInEffect?: boolean;
}

type UseHashReturnValue = [string, (value: string) => void];

function useHash(options?: UseHashOptions): UseHashReturnValue
```

## Exported types

The `UseHashOptions` and `UseHashReturnValue` types are exported from `@mantine/hooks`;
you can import them in your application:

```tsx
import { UseHashOptions, UseHashReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useHeadroom
Package: @mantine/hooks
Import: import { UseHeadroom } from '@mantine/hooks';

## Usage

The `use-headroom` hook creates headers that are hidden after the user scrolls past a given distance in pixels.
It returns `{ pinned, scrollProgress }` where `pinned` is `true` when the element is at least partially
visible and `scrollProgress` is a number between `0` (fully hidden) and `1` (fully visible).

```tsx
import { Box, Button, Group, Portal, Text } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';

function Demo() {
  const [showHeader, handlers] = useDisclosure(false);
  const { pinned } = useHeadroom({ fixedAt: 120 });

  return (
    <>
      {showHeader && (
        <Portal>
          <Box
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              padding: 'var(--mantine-spacing-xs)',
              height: 60,
              zIndex: 1000000,
              transform: `translate3d(0, ${pinned ? 0 : '-110px'}, 0)`,
              transition: 'transform 400ms ease',
              backgroundColor: 'var(--mantine-color-body)',
            }}
          >
            <Group justify="center" h="100%">
              <Text>Pinned header – {pinned ? 'visible' : 'hidden'}</Text>
            </Group>
          </Box>
        </Portal>
      )}

      <Button onClick={handlers.toggle} variant="default">
        {showHeader ? 'Hide' : 'Show'} header
      </Button>
    </>
  );
}
```


