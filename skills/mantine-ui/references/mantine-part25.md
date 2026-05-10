## scrollProgress

Use `scrollProgress` to create a scroll-linked reveal animation instead of an instant
show/hide toggle. The value transitions from `1` (fully visible) to `0` (fully hidden)
as the user scrolls down past `fixedAt`, and back to `1` as the user scrolls up.
Direction changes mid-scroll are handled correctly — the progress continues from
wherever it was when the direction changed. Set `scrollDistance` to control how many
pixels of scrolling are needed to fully reveal or hide the element.

```tsx
import { Box, Button, Group, Portal, Text } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';

function Demo() {
  const [showHeader, handlers] = useDisclosure(false);
  const { scrollProgress } = useHeadroom({ fixedAt: 120, scrollDistance: 60 });

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
              height: 60,
              zIndex: 1000000,
              transform: `translateY(${(scrollProgress - 1) * 100}%)`,
              backgroundColor: 'var(--mantine-color-violet-6)',
            }}
          >
            <Group justify="center" h="100%">
              <Text c="white" fw={500}>
                Scroll-linked — {Math.round(scrollProgress * 100)}% visible
              </Text>
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


## Callbacks

The hook supports `onPin`, `onRelease`, and `onFix` callbacks:

* `onPin` is called when the header becomes visible (user scrolls up)
* `onRelease` is called when the header is hidden (user scrolls down)
* `onFix` is called when the scroll position enters the fixed zone (scroll position ≤ `fixedAt`)

```tsx
import { useState } from 'react';
import { Box, Button, Code, Group, Portal, Stack, Text } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';

function Demo() {
  const [showHeader, handlers] = useDisclosure(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) =>
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev].slice(0, 10));

  const { pinned } = useHeadroom({
    fixedAt: 80,
    onPin: () => addLog('onPin'),
    onRelease: () => addLog('onRelease'),
    onFix: () => addLog('onFix'),
  });

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
              height: 60,
              zIndex: 1000000,
              transform: `translate3d(0, ${pinned ? 0 : '-110px'}, 0)`,
              transition: 'transform 400ms ease',
              backgroundColor: pinned
                ? 'var(--mantine-color-teal-6)'
                : 'var(--mantine-color-red-6)',
            }}
          >
            <Group justify="center" h="100%">
              <Text c="white" fw={500}>
                {pinned ? 'Pinned' : 'Released'}
              </Text>
            </Group>
          </Box>
        </Portal>
      )}

      <Stack>
        <Button onClick={handlers.toggle} variant="default">
          {showHeader ? 'Hide' : 'Show'} header
        </Button>
        <Code block>
          {log.length === 0 ? 'Scroll to see callback events' : log.join('\\n')}
        </Code>
      </Stack>
    </>
  );
}
```


## Definition

```tsx
interface UseHeadroomOptions {
  /** Number in px at which element should be fixed, 0 by default */
  fixedAt?: number;

  /** Number of px to scroll to fully reveal or hide the element, 100 by default */
  scrollDistance?: number;

  /** Called when element is pinned */
  onPin?: () => void;

  /** Called when element is at fixed position */
  onFix?: () => void;

  /** Called when element is unpinned */
  onRelease?: () => void;
}

interface UseHeadroomReturnValue {
  /** True when the element is at least partially visible */
  pinned: boolean;

  /** Reveal progress: 0 = fully hidden, 1 = fully visible */
  scrollProgress: number;
}

function useHeadroom(input?: UseHeadroomOptions): UseHeadroomReturnValue;
```

## Exported types

The `UseHeadroomOptions` type is exported from `@mantine/hooks`;

```tsx
import { UseHeadroomOptions } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useHotkeys
Package: @mantine/hooks
Import: import { UseHotkeys } from '@mantine/hooks';

## Usage

The `use-hotkeys` hook accepts an array of hotkeys and handler tuples as its first argument:

* `hotkey` - hotkey string, for example `ctrl+E`, `shift+alt+L`, `mod+S`
* `handler` - event handler called when the given combination is pressed
* `options` - object with extra options for the hotkey handler

```tsx
// Demo.tsx
import { useHotkeys } from '@mantine/hooks';
import { spotlight } from '@mantine/spotlight';
import { useMantineColorScheme } from '@mantine/core';
import { Shortcut } from './Shortcut';

function Demo() {
  const { toggleColorScheme } = useMantineColorScheme();

  useHotkeys([
    ['mod + K', () => spotlight.open()],
    ['mod + J', () => toggleColorScheme()],
    ['mod + shift + alt + X', () => secret()],
  ]);

  return (
    <>
      <Shortcut symbol="K" description="Open search" />
      <Shortcut symbol="J" description="Toggle color scheme" />
    </>
  );
}

// Shortcut.tsx
import { Box, Group, Kbd } from '@mantine/core';

export function Shortcut({ symbol, description }: { symbol: string; description: string }) {
  return (
    <Group gap={7} p={10}>
      <Kbd size={20}>Ctrl</Kbd>
      <Box fz={22} fw={500}>
        +
      </Box>
      <Kbd size={20} w={40}>
        {symbol}
      </Kbd>

      <Box fz={18} ms="sm">
        – {description}
      </Box>
    </Group>
  );
}
```


The second argument is a list of HTML tags on which hotkeys should be ignored.
By default, hotkey events are ignored if the focus is in `input`, `textarea`, and `select` elements.

```tsx
import { useHotkeys } from '@mantine/hooks';

function Demo() {
  // Ignore hotkey events only when focus is in input and textarea elements
  useHotkeys(
    [['ctrl+K', () => console.log('Trigger search')]],
    ['INPUT', 'TEXTAREA']
  );

  // Empty array – do not ignore hotkey events on any element
  useHotkeys([['ctrl+K', () => console.log('Trigger search')]], []);
}
```

## Targeting elements

The `use-hotkeys` hook can only work with the document element; you will need to create your own event listener
if you need to support other elements. For this purpose, the `@mantine/hooks` package exports a `getHotkeyHandler` function
that should be used with `onKeyDown`:

```tsx
import { useState } from 'react';
import { getHotkeyHandler } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { TextInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState("I've just used a hotkey to send a message");
  const handleSubmit = () => notifications.show({ title: 'Your message', message: value });
  const handleSave = () => notifications.show({ title: 'You saved', color: 'teal', message: value });

  return (
    <TextInput
      placeholder="Your message"
      label="Press ⌘+Enter or Ctrl+Enter when input has focus to send message"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={getHotkeyHandler([
        ['mod+Enter', handleSubmit],
        ['mod+S', handleSave],
      ])}
    />
  );
}
```


With `getHotkeyHandler` you can also add events to any DOM node using `.addEventListener`:

```tsx
import { getHotkeyHandler } from '@mantine/hooks';

document.body.addEventListener(
  'keydown',
  getHotkeyHandler([
    ['mod+Enter', () => console.log('Submit')],
    ['mod+S', () => console.log('Save')],
  ])
);
```

## Supported formats

* `mod+S` – detects `⌘+S` on macOS and `Ctrl+S` on Windows
* `ctrl+shift+X` – handles multiple modifiers
* `alt + shift + L` – you can use whitespace inside hotkey
* `ArrowLeft` – you can use special keys using [this format](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
* `shift + [plus]` – you can use `[plus]` to detect `+` key
* `Digit1` and `Hotkey1` - you can use physical key assignments [defined on MDN](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values).

## Types

The `@mantine/hooks` package exports `HotkeyItemOptions` and `HotkeyItem` types:

```tsx
interface HotkeyItemOptions {
  preventDefault?: boolean;
  usePhysicalKeys?: boolean;
}

type HotkeyItem = [
  string,
  (event: KeyboardEvent) => void,
  HotkeyItemOptions?,
];
```

`HotkeyItemOptions` provides the `usePhysicalKeys` option to force physical key assignment. This is useful for non-QWERTY keyboard layouts.

The `HotkeyItem` type can be used to create hotkey items outside of the `use-hotkeys` hook:

```tsx
import { HotkeyItem, useHotkeys } from '@mantine/hooks';

const hotkeys: HotkeyItem[] = [
  [
    'mod+J',
    () => console.log('Toggle color scheme'),
    { preventDefault: false },
  ],
  ['ctrl+K', () => console.log('Trigger search')],
  ['alt+mod+shift+X', () => console.log('Rick roll')],
  [
    'D',
    () => console.log('Triggers when pressing "E" on Dvorak keyboards!'),
    { usePhysicalKeys: true }
  ],
];

useHotkeys(hotkeys);
```

## Definition

```tsx
interface HotkeyItemOptions {
  preventDefault?: boolean;
  usePhysicalKeys?: boolean;
}

type HotkeyItem = [string, (event: KeyboardEvent) => void, HotkeyItemOptions?]

function useHotkeys(
  hotkeys: HotkeyItem[],
  tagsToIgnore?: string[],
  triggerOnContentEditable?: boolean
): void;
```

## Exported types

The `HotkeyItemOptions` and `HotkeyItem` types are exported from `@mantine/hooks`;

```tsx
import type { HotkeyItemOptions, HotkeyItem } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useHover
Package: @mantine/hooks
Import: import { UseHover } from '@mantine/hooks';

## Usage

```tsx
import { useHover } from '@mantine/hooks';

function Demo() {
  const { hovered, ref } = useHover();
  return (
    <div ref={ref}>
      {hovered ? 'I am hovered' : 'Put mouse over me please'}
    </div>
  );
}
```


## Definition

```tsx
interface UseHoverReturnValue<T extends HTMLElement = any> {
  hovered: boolean;
  ref: React.RefCallback<T | null>;
}

function useHover<T extends HTMLElement = any>(): UseHoverReturnValue<T>
```

## Exported types

The `UseHoverReturnValue` type is exported from `@mantine/hooks`;

```tsx
import type { UseHoverReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useId
Package: @mantine/hooks
Import: import { UseId } from '@mantine/hooks';

## Usage

The `use-id` hook generates a random id that persists across renders.
The hook is usually used to bind input elements to labels.
The generated random id is saved to a ref and will not change unless the component is unmounted.

```tsx
import { useId } from '@mantine/hooks';

function Input({ id }: { id?: string }) {
  const uuid = useId(id);

  return (
    <>
      <label htmlFor={uuid}>Input label</label>
      <input type="text" id={uuid} />
    </>
  );
}

// input and label will have id 'my-id'
const withId = <Input id="my-id" />;

// input and label will have random id 'mantine-fZMoF'
const withoutId = <Input />;
```

## Definition

```tsx
function useId(id: string): string;
```


--------------------------------------------------------------------------------

### useIdle
Package: @mantine/hooks
Import: import { UseIdle } from '@mantine/hooks';

## Usage

The `use-idle` hook detects if the user does nothing for a given time in milliseconds:

```tsx
import { Badge } from '@mantine/core';
import { useIdle } from '@mantine/hooks';

function Demo() {
  const idle = useIdle(2000);
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}
```


## Custom events

By default, the hook will listen to `keydown`, `mousemove`, `touchmove`, `click`, `scroll`, and `wheel` events to set the idle status.
To change that, provide a list of events in the `options` argument:

```tsx

import { Badge } from '@mantine/core';
import { useIdle } from '@mantine/hooks';

function Demo() {
  const idle = useIdle(2000, { events: ['click', 'touchstart'] });
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}

```


## Initial state

By default, the hook will return an idle state.
To change this, provide an initial state value in the `options` argument:

```tsx

import { Badge } from '@mantine/core';
import { useIdle } from '@mantine/hooks';

function Demo() {
  const idle = useIdle(2000, { initialState: false });
  return <Badge color={idle ? 'blue' : 'teal'}>Current state: {idle ? 'idle' : 'not idle'}</Badge>;
}

```


## Definition

```tsx
interface UseIdleOptions {
  events?: (keyof DocumentEventMap)[];
  initialState?: boolean;
}

function useIdle(timeout: number, options?: UseIdleOptions): boolean;
```

## Exported types

The `UseIdleOptions` type is exported from `@mantine/hooks`;

```tsx
import type { UseIdleOptions } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useInViewport
Package: @mantine/hooks
Import: import { UseInViewport } from '@mantine/hooks';

## Usage

The `use-in-viewport` hook is a simpler alternative to [use-intersection](https://mantine.dev/llms/hooks-use-intersection.md) that only checks if the element
is visible in the viewport:

```tsx
import { Box, Text } from '@mantine/core';
import { useInViewport } from '@mantine/hooks';

function Demo() {
  const { ref, inViewport } = useInViewport();
  return (
    <>
      <Text ta="center">{inViewport ? 'Box is visible' : 'Scroll to see box'}</Text>
      <Box h={64} style={{ overflow: 'scroll' }}>
        <Box h={128}></Box>
        <Box ref={ref} bg="blue" h={32} p={8}>
          <Text ta="center" c="white">
            A box
          </Text>
        </Box>
      </Box>
    </>
  );
}
```


## Definition

```tsx
interface UseInViewportReturnValue<T extends HTMLElement = any> {
  inViewport: boolean;
  ref: React.RefCallback<T | null>;
}

function useInViewport<T extends HTMLElement = any>(): UseInViewportReturnValue<T>
```

## Exported types

The `UseInViewportReturnValue` type is exported from the `@mantine/hooks` package;
you can import it in your application:

```tsx
import type { UseInViewportReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useInputState
Package: @mantine/hooks
Import: import { UseInputState } from '@mantine/hooks';

## Usage

The `use-input-state` hook handles the state of native inputs (with event in `onChange` handler) and custom inputs (with value in `onChange` handler).
The hook works with all Mantine and native inputs:

```tsx
import { useState } from 'react';
import { NumberInput, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';

function WithUseInputState() {
  const [stringValue, setStringValue] = useInputState('');
  const [numberValue, setNumberValue] = useInputState<
    string | number
  >(0);

  return (
    <>
      <input
        type="text"
        value={stringValue}
        onChange={setStringValue}
      />
      <TextInput value={stringValue} onChange={setStringValue} />
      <NumberInput value={numberValue} onChange={setNumberValue} />
    </>
  );
}

function WithUseState() {
  const [stringValue, setStringValue] = useState('');
  const [numberValue, setNumberValue] = useState<string | number>(0);

  return (
    <>
      <input
        type="text"
        value={stringValue}
        onChange={(event) =>
          setStringValue(event.currentTarget.value)
        }
      />
      <TextInput
        value={stringValue}
        onChange={(event) =>
          setStringValue(event.currentTarget.value)
        }
      />
      <NumberInput value={numberValue} onChange={setNumberValue} />
    </>
  );
}
```

## Definition

```tsx
type UseInputStateReturnValue<T> = [
  T,
  (value: null | undefined | T | React.ChangeEvent<any>) => void,
];

function useInputState<T>(initialState: T): UseInputStateReturnValue<T>
```

## Exported types

`UseInputStateReturnValue` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseInputStateReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useIntersection
Package: @mantine/hooks
Import: import { UseIntersection } from '@mantine/hooks';

## Usage

The `use-intersection` hook returns information about the intersection
of a given element with its scroll container or body element using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API):

```tsx
import { useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import { Text, Paper, Box } from '@mantine/core';

function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  return (
    <Paper ref={containerRef} h={300} style={{ overflowY: 'scroll' }}>
      <Box pt={260} pb={280}>
        <Paper
          ref={ref}
          p="xl"
          style={{
            backgroundColor: entry?.isIntersecting
              ? 'var(--mantine-color-teal-7)'
              : 'var(--mantine-color-red-7)',
            minWidth: '50%',
          }}
        >
          <Text c="#fff" fw={700}>
            {entry?.isIntersecting ? 'Fully visible' : 'Obscured'}
          </Text>
        </Paper>
      </Box>
    </Paper>
  );
}
```


## API

The hook accepts `IntersectionObserver`'s options as its only optional argument:

```tsx
import { useIntersection } from '@mantine/hooks';

useIntersection({
  root: document.querySelector('#some-element'),
  rootMargin: '0rem',
  threshold: 1.0,
});
```

The hook returns a `ref` function that should be passed to the observed element, and the latest entry, as returned by the `IntersectionObserver`'s callback.
See the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) documentation to learn everything about the options.

On the first render (as well as during SSR), or when no element is being observed, the entry is `null`.

```tsx
import { Paper } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';

function Demo() {
  const { ref } = useIntersection();

  return (
    <>
      {/* With regular element: */}
      <div ref={ref} />

      {/* With Mantine component: */}
      <Paper ref={ref} />
    </>
  );
}
```

## Definition

```tsx
interface UseIntersectionReturnValue<T> {
  ref: React.RefCallback<T | null>;
  entry: IntersectionObserverEntry | null;
}

function useIntersection<T extends HTMLElement = any>(
  options?: IntersectionObserverInit,
): UseIntersectionReturnValue<T>
```

## Exported types

`UseIntersectionReturnValue` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseIntersectionReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useInterval
Package: @mantine/hooks
Import: import { UseInterval } from '@mantine/hooks';

## Usage

```tsx
import { useState, useEffect } from 'react';
import { useInterval } from '@mantine/hooks';
import { Stack, Button, Text } from '@mantine/core';

function Demo() {
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <Stack align="center">
      <Text>Page loaded <b>{seconds}</b> seconds ago</Text>
      <Button onClick={interval.toggle} color={interval.active ? 'red' : 'teal'}>
        {interval.active ? 'Stop' : 'Start'} counting
      </Button>
    </Stack>
  );
}
```


## Auto invoke interval

To automatically start the interval when the component is mounted, set the `autoInvoke` option to `true`:

```tsx
import { useInterval } from '@mantine/hooks';

const interval = useInterval(
  () => console.log('Interval tick'),
  1000,
  { autoInvoke: true }
);
```

## API

```tsx
import { useInterval } from '@mantine/hooks';

const { start, stop, toggle, active } = useInterval(fn, interval);
```

Arguments:

* `fn` – function that is called at each interval tick
* `interval` – amount of milliseconds between each tick

Return object:

* `start` – start the interval
* `stop` – stop interval
* `toggle` – toggle interval
* `active` – current interval status

## Definition

```tsx
interface UseIntervalOptions {
  /** If set, the interval will start automatically when the component is mounted, `false` by default */
  autoInvoke?: boolean;
}

interface UseIntervalReturnValue {
  /** Starts the interval */
  start: () => void;

  /** Stops the interval */
  stop: () => void;

  /** Toggles the interval */
  toggle: () => void;

  /** Indicates if the interval is active */
  active: boolean;
}

function useInterval(
  fn: () => void,
  interval: number,
  options?: UseIntervalOptions,
): UseIntervalReturnValue
```

## Exported types

`UseIntervalOptions` and `UseIntervalReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseIntervalOptions, UseIntervalReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useIsFirstRender
Package: @mantine/hooks
Import: import { UseIsFirstRender } from '@mantine/hooks';

## Usage

The `useIsFirstRender` hook returns `true` if the component is being rendered for the first time;
otherwise, it returns `false`.

```tsx
import { useState } from 'react';
import { Button, Text } from '@mantine/core';
import { useIsFirstRender } from '@mantine/hooks';

function Demo() {
  const [counter, setCounter] = useState(0);
  const firstRender = useIsFirstRender();
  return (
    <div>
      <Text>
        Is first render:{' '}
        <Text span c={firstRender ? 'teal' : 'red'}>
          {firstRender ? 'Yes' : 'No!'}
        </Text>
      </Text>
      <Button onClick={() => setCounter((c) => c + 1)} mt="sm">
        Rerendered {counter} times, click to rerender
      </Button>
    </div>
  );
}
```


## Definition

```tsx
function useIsFirstRender(): boolean;
```


--------------------------------------------------------------------------------

### useIsomorphicEffect
Package: @mantine/hooks
Import: import { UseIsomorphicEffect } from '@mantine/hooks';

## Usage

The `use-isomorphic-effect` hook is a replacement for the `useLayoutEffect` hook that works in both browser and server environments.

```tsx
import { useIsomorphicEffect } from '@mantine/hooks';

function Demo() {
  useIsomorphicEffect(() => {
    document.title = 'title';
  });

  return null;
}
```


--------------------------------------------------------------------------------

### useListState
Package: @mantine/hooks
Import: import { UseListState } from '@mantine/hooks';

## Usage

The `use-list-state` hook provides an API to work with list state:

```tsx
import { useListState } from '@mantine/hooks';

const [values, handlers] = useListState([{ a: 1 }]);

// add one or more items to the end of the list
const append = () => handlers.append({ a: 2 });
// values -> [{ a: 1 }, { a: 2 }]

// add one or more items to the start of the list
const prepend = () => handlers.prepend({ a: 3 }, { a: 4 });
// values -> [{ a: 3 }, { a: 4 }, { a: 1 }, { a: 2 }]

// remove items at given positions
const remove = () => handlers.remove(0, 2);
// values -> [{ a: 4 }, { a: 2 }]

// insert one or more items at given position
const insert = () => handlers.insert(1, { a: 5 });
// values -> [{ a: 4 }, { a: 5 }, { a: 2 }]

// apply function to each element of the list
const apply = () =>
  handlers.apply((item, index) => ({ a: item.a * index }));
// values -> [{ a: 0 }, { a: 5 }, { a: 4 }]

// move item from one position to another
const reorder = () => handlers.reorder({ from: 2, to: 0 });
// values -> [{ a: 4 }, { a: 0 }, { a: 5 }]

// swap items positions
const swap = () => handlers.swap({ from: 0, to: 2 });
// values -> [{ a: 5 }, { a: 0 }, { a: 4 }]

// apply function to each element that matches condition
const applyWhere = () =>
  handlers.applyWhere(
    (item) => item.a > 0,
    (item) => ({ a: item.a + 2 })
  );
// values -> [{ a: 7 }, { a: 0 }, { a: 6 }]

// set entirely new state
const setState = () => handlers.setState([{ a: 6 }, { a: 7 }]);
// values -> [{ a: 6 }, { a: 7 }]

// set individual item at given position
const setItem = () => handlers.setItem(0, { a: 8 });
// values -> [{ a: 8 }, { a: 7 }]

// set item property at given position
const setItemProp = () => handlers.setItemProp(1, 'a', 'new-prop');
// values -> [{ a: 8 }, { a: 'new-prop' }]

// filter objects that have a = 'new-prop'
const filter = () => handlers.filter((item) => item.a === 'new-prop');
// values -> [{ a: 'new-prop' }]
```

## API

`use-list-state` takes an array as a single argument and
returns a list of values and handlers to change them in a tuple, similar to `useState` hook.

The hook provides handlers to work with array data:

* `append` – add items to the end of the list
* `prepend` – add items to the start of the list
* `pop` – remove last item
* `shift` – remove first item
* `insert` – insert items at given index
* `remove` – remove items at given indices
* `reorder` – move item from one position to another
* `swap` – swap items positions
* `apply` – apply given function to all items in the list
* `applyWhere` - apply given function to selective items using condition
* `setItem` – replace item at given index
* `setItemProp` – set item property at given index
* `setState` – set list state with react action
* `filter` - filter values with callback function

## Indeterminate state checkbox example

```tsx
import { useListState, randomId } from '@mantine/hooks';
import { Checkbox } from '@mantine/core';

const initialValues = [
  { label: 'Receive email notifications', checked: false, key: randomId() },
  { label: 'Receive sms notifications', checked: false, key: randomId() },
  { label: 'Receive push notifications', checked: false, key: randomId() },
];

export function IndeterminateCheckbox() {
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checkbox
      mt="xs"
      ml={33}
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
    />
  ));

  return (
    <>
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        label="Receive all notifications"
        onChange={() =>
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          )
        }
      />
      {items}
    </>
  );
}
```


## UseListStateHandlers type

`@mantine/hooks` package exports `UseListStateHandlers`. It is a generic type
that contains all handlers from `useListState` hook. It can be used to type
handlers in your components.

`UseListStateHandlers` type:

```tsx
export interface UseListStateHandlers<T> {
  setState: React.Dispatch<React.SetStateAction<T[]>>;
  append: (...items: T[]) => void;
  prepend: (...items: T[]) => void;
  insert: (index: number, ...items: T[]) => void;
  pop: () => void;
  shift: () => void;
  apply: (fn: (item: T, index?: number) => T) => void;
  applyWhere: (
    condition: (item: T, index: number) => boolean,
    fn: (item: T, index?: number) => T
  ) => void;
  remove: (...indices: number[]) => void;
  reorder: ({ from, to }: { from: number; to: number }) => void;
  swap: ({ from, to }: { from: number; to: number }) => void;
  setItem: (index: number, item: T) => void;
  setItemProp: <K extends keyof T, U extends T[K]>(
    index: number,
    prop: K,
    value: U
  ) => void;
  filter: (fn: (item: T, i: number) => boolean) => void;
}
```

The type is useful when you want to pass `use-list-state` handlers to child components
as a prop:

```tsx
import { UseListStateHandlers } from '@mantine/hooks';

interface Props {
  handlers: UseListStateHandlers<string>;
}

function Demo({ handlers }: Props) {
  return (
    <button type="button" onClick={() => handlers.append('hello')}>
      Append hello
    </button>
  );
}
```

## Set item type

By default, `use-list-state` will use type from `initialValues`.
If you call the hook with an empty array, you must specify item type:

```tsx
import { useListState } from '@mantine/hooks';

useListState(['hello']); // ok, item type is string
useListState([]); // not ok, item type is any
useListState<string>([]); // ok, item type is string
```

## Definition

```tsx
function useListState<T>(
  initialValue?: T[]
): [T[], UseListStateHandlers<T>];
```

## Exported types

`UseListStateHandlers` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseListStateHandlers } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useLocalStorage
Package: @mantine/hooks
Import: import { UseLocalStorage } from '@mantine/hooks';

## Usage

The `use-local-storage` hook allows you to use a value from `localStorage` as React state.
The hook works the same way as `useState`, but also writes the value to `localStorage`:

```tsx
import { useLocalStorage } from '@mantine/hooks';

// The hook will read the value from localStorage.getItem('color-scheme')
// If localStorage is not available or the value at a given key does not exist,
// 'dark' will be assigned to the value variable
const [value, setValue] = useLocalStorage({
  key: 'color-scheme',
  defaultValue: 'dark',
});

// The value is set both to state and localStorage at 'color-scheme'
setValue('light');

// You can also use a callback like in the useState hook to set the value
setValue((current) => (current === 'dark' ? 'light' : 'dark'));
```

## Example

Example of a color scheme toggle button that uses `use-local-storage` hook
to store current color scheme in the `localStorage`:

```tsx
import { MoonStarsIcon, SunIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

function ColorSchemeToggle() {
  const [colorScheme, setColorScheme] = useLocalStorage<
    'light' | 'dark'
  >({
    key: 'color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = () =>
    setColorScheme((current) =>
      current === 'dark' ? 'light' : 'dark'
    );

  return (
    <ActionIcon onClick={toggleColorScheme}>
      {colorScheme === 'dark' ? <SunIcon /> : <MoonStarsIcon />}
    </ActionIcon>
  );
}
```

## Remove value

Use `removeValue` callback to clean `localStorage`/`sessionStorage`.
When value is removed it is reset to `defaultValue`:

```tsx
import { useLocalStorage } from '@mantine/hooks';

const [value, setValue, removeValue] = useLocalStorage({
  key: 'color-scheme',
  defaultValue: 'light',
});
```

## Browser tabs synchronization

`use-local-storage` subscribes to [storage event](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event).
When state changes in one tab, it automatically updates the value in all other opened browser tabs.
You can test this feature by opening 2 tabs with Mantine docs side by side and changing the color scheme
(button on the top right or `⌘ + J` on MacOS and `Ctrl + J` on Windows and Linux).

## Serialize/deserialize JSON

By default, the hook will serialize/deserialize data with `JSON.stringify`/`JSON.parse`.
If you need to store data in local storage that cannot be serialized with `JSON.stringify`
– provide your own serialization handlers:

```tsx
import { useLocalStorage } from '@mantine/hooks';

const [value, setValue] = useLocalStorage({
  key: 'color-scheme',
  serialize: (value) => {
    /* return value serialized to string */
  },
  deserialize: (localStorageValue) => {
    /* parse localStorage string value and return value */
  },
});
```

## Usage with superjson

[superjson](https://github.com/blitz-js/superjson) is compatible with `JSON.stringify`/`JSON.parse` but works for `Date`, `Map`, `Set` and `BigInt`:

```tsx
import superjson from 'superjson';
import { useLocalStorage } from '@mantine/hooks';

const defaultValue = { name: 'John', age: 25 };

const [value, setValue] = useLocalStorage({
  key: 'data',
  defaultValue,
  serialize: superjson.stringify,
  deserialize: (str) =>
    str === undefined ? defaultValue : superjson.parse(str),
});
```

## use-session-storage

The `use-session-storage` hook works the same way as `use-local-storage` hook but uses `sessionStorage` instead of `window.localStorage`:

```tsx
import { useSessionStorage } from '@mantine/hooks';

const [value, setValue] = useSessionStorage({
  key: 'session-key',
  defaultValue: 'mantine',
});
```

## Set value type

You can specify value type same as in `useState` hook:

```tsx
import { useLocalStorage } from '@mantine/hooks';

const [value, setValue] = useLocalStorage<'dark' | 'light'>({
  key: 'color-scheme',
  defaultValue: 'light',
});
```

## Read storage value

To read value from storage without using hook, use `readLocalStorageValue`/`readSessionStorageValue` functions.
Functions accept the same arguments as `use-local-storage`/`use-session-storage` hooks:

```tsx
import { readLocalStorageValue } from '@mantine/hooks';

const value = readLocalStorageValue({ key: 'color-scheme' });
```

## Definition

```tsx
interface UseStorageOptions<T> {
  /** Local storage key */
  key: string;

  /** Default value that will be set if value is not found in local storage */
  defaultValue?: T;

  /** If set to true, value will be updated in useEffect after mount. Default value is true. */
  getInitialValueInEffect?: boolean;

  /** Determines whether the value must be synced between browser tabs, `true` by default */
  sync?: boolean;

  /** Function to serialize value into a string to be saved in local storage */
  serialize?: (value: T) => string;

  /** Function to deserialize string value from local storage to value */
  deserialize?: (value: string) => T;
}

type UseStorageReturnValue<T> = [
  T, // current value
  (val: T | ((prevState: T) => T)) => void, // callback to set value in storage
  () => void, // callback to remove value from storage
];

function useLocalStorage<T = string>(
  options: UseStorageOptions<T>,
): UseStorageReturnValue<T>;
```

## Exported types

`UseStorageOptions` and `UseStorageReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseStorageOptions, UseStorageReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useLogger
Package: @mantine/hooks
Import: import { UseLogger } from '@mantine/hooks';

## Usage

The `use-logger` hook logs given values to the console each time the component renders.
Open DevTools to see state changes in the console:

```tsx
import { useState } from 'react';
import { useLogger } from '@mantine/hooks';
import { Button } from '@mantine/core';

function Demo() {
  const [count, setCount] = useState(0);
  useLogger('Demo', [{ count, hello: 'world' }]);
  return <Button onClick={() => setCount((c) => c + 1)}>Update state ({count})</Button>;
}
```


## Definition

```tsx
function useLogger(componentName: string, props: any[]): any;
```


--------------------------------------------------------------------------------

### useLongPress
Package: @mantine/hooks
Import: import { UseLongPress } from '@mantine/hooks';

## Usage

```tsx
import { Button } from '@mantine/core';
import { useLongPress } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

function Demo() {
  const handlers = useLongPress(() => notifications.show({ message: 'Long press triggered' }));
  return <Button {...handlers}>Press and hold</Button>;
}
```


## Definition

```tsx
interface UseLongPressOptions {
  /** Time in milliseconds to trigger the long press, default is 400ms */
  threshold?: number;

  /** Callback triggered when the long press starts */
  onStart?: (event: React.MouseEvent | React.TouchEvent) => void;

  /** Callback triggered when the long press finishes */
  onFinish?: (event: React.MouseEvent | React.TouchEvent) => void;

  /** Callback triggered when the long press is canceled */
  onCancel?: (event: React.MouseEvent | React.TouchEvent) => void;
}

interface UseLongPressReturnValue {
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseUp: (event: React.MouseEvent) => void;
  onMouseLeave: (event: React.MouseEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
}

function useLongPress(
  onLongPress: (event: React.MouseEvent | React.TouchEvent) => void,
  options?: UseLongPressOptions,
): UseLongPressReturnValue
```

## Exported types

`UseLongPressOptions` and `UseLongPressReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseLongPressOptions, UseLongPressReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useMap
Package: @mantine/hooks
Import: import { UseMap } from '@mantine/hooks';

## Usage

The `useMap` hook returns a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
object that can be used as React state – the `set`, `clear`, and `delete` methods update state and trigger rerender.

```tsx
import { PlusIcon, TrashIcon } from '@phosphor-icons/react';
import { ActionIcon, Group, Table } from '@mantine/core';
import { useMap } from '@mantine/hooks';

function Demo() {
  const map = useMap([
    ['/hooks/use-media-query', 4124],
    ['/hooks/use-clipboard', 8341],
    ['/hooks/use-fetch', 9001],
  ]);

  const rows = Array.from(map.entries()).map(([key, value]) => (
    <Table.Tr key={key}>
      <Table.Td>{key}</Table.Td>
      <Table.Td>{value}</Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon variant="default" onClick={() => map.set(key, value + 1)} fw={500}>
            <PlusIcon size={18} />
          </ActionIcon>
          <ActionIcon variant="default" onClick={() => map.delete(key)} c="red">
            <TrashIcon size={18} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table layout="fixed">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Page</Table.Th>
          <Table.Th>Views last month</Table.Th>
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
```


## Definition

```tsx
function useMap<T, V>(initialState?: [T, V][]): Map<T, V>;
```


--------------------------------------------------------------------------------

### useMask
Package: @mantine/hooks
Import: import { UseMask } from '@mantine/hooks';

## Usage

`useMask` attaches real-time input masking to any `<input>` element via a ref callback.
It formats user input against a defined pattern and exposes both the masked display value
and the raw unmasked value. If you need a ready-made input component, use [MaskInput](https://mantine.dev/llms/core-mask-input.md)
which wraps this hook with all standard input props.

```tsx
import { TextInput, Text } from '@mantine/core';
import { useMask } from '@mantine/hooks';

function Demo() {
  const { ref, value, rawValue } = useMask({ mask: '(999) 999-9999' });

  return (
    <>
      <TextInput ref={ref} label="Phone number" placeholder="(___) ___-____" />
      <Text size="sm" mt="sm">Masked value: {value}</Text>
      <Text size="sm">Raw value: {rawValue}</Text>
    </>
  );
}
```


## isComplete, slotChar, and transform

Use `isComplete` to check whether all required mask slots are filled — for example, to control
a submit button. The `slotChar` option accepts a multi-character string to show positional
hints for each slot. The `transform` option converts each character before validation —
this example uses it to auto-uppercase input so the `A` token (`[A-Z]`) accepts lowercase letters:

```tsx
import { Button, Group, Text, TextInput } from '@mantine/core';
import { useMask } from '@mantine/hooks';

function Demo() {
  const { ref, isComplete, rawValue } = useMask({
    mask: 'AAA-9999',
    slotChar: 'XXX-0000',
    transform: (char) => char.toUpperCase(),
  });

  return (
    <>
      <TextInput ref={ref} label="Promo code" placeholder="Enter promo code" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
      <Group mt="xs">
        <Button disabled={!isComplete} size="xs">Apply code</Button>
      </Group>
    </>
  );
}
```


## Dynamic mask

Use the `modify` option to change the mask based on the current input value.
This example switches between standard and American Express credit card formats:

```tsx
import { TextInput, Text } from '@mantine/core';
import { useMask } from '@mantine/hooks';

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '9999 9999 9999 9999',
    modify: (value) => {
      const digits = value.replace(/\\D/g, '');
      if (digits.startsWith('34') || digits.startsWith('37')) {
        return { mask: '9999 999999 99999' };
      }
    },
  });

  return (
    <>
      <TextInput ref={ref} label="Credit card number" placeholder="Enter card number" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
      <Text size="xs" c="dimmed">Try starting with 34 or 37 for Amex format</Text>
    </>
  );
}
```


## Custom tokens

Override or extend the built-in token map with the `tokens` option:

```tsx
import { TextInput, Text } from '@mantine/core';
import { useMask } from '@mantine/hooks';

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '\\#hhhhhh',
    tokens: { h: /[0-9a-fA-F]/ },
  });

  return (
    <>
      <TextInput ref={ref} label="Hex color" placeholder="#______" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
    </>
  );
}
```


## Escaping

Prefix a token character with `\` to treat it as a literal.
In this example, `A` would normally be an uppercase letter token,
but `\A` makes it a literal character:

```tsx
import { TextInput, Text } from '@mantine/core';
import { useMask } from '@mantine/hooks';

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '\\A-9999',
  });

  return (
    <>
      <TextInput ref={ref} label="Product code" placeholder="A-____" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
    </>
  );
}
```


## Regex array format

For complex masks where built-in tokens are not enough, pass an array of
string literals and `RegExp` objects. This example creates a time input where
the first digit is restricted to `0-2` and the minute tens digit to `0-5`:

```tsx
import { TextInput, Text } from '@mantine/core';
import { useMask } from '@mantine/hooks';

function Demo() {
  const { ref, rawValue } = useMask({
    mask: [/[0-2]/, /\\d/, ':', /[0-5]/, /\\d/],
  });

  return (
    <>
      <TextInput ref={ref} label="Time (HH:MM)" placeholder="__:__" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
    </>
  );
}
```


## Reset

Use the `reset` function returned by the hook to programmatically clear
the input value:

```tsx
import { Button, Group, Text, TextInput } from '@mantine/core';
import { useMask } from '@mantine/hooks';

function Demo() {
  const { ref, value, rawValue, reset } = useMask({
    mask: '(999) 999-9999',
  });

  return (
    <>
      <TextInput ref={ref} label="Phone number" placeholder="(___) ___-____" />
      <Text size="sm" mt="sm">Masked: {value}</Text>
      <Text size="sm">Raw: {rawValue}</Text>
      <Group mt="xs">
        <Button size="xs" variant="default" onClick={reset}>Reset</Button>
      </Group>
    </>
  );
}
```


## Mask pattern syntax

The mask string defines the expected format. Each character is either a **token** (editable slot)
or a **literal** (fixed character inserted automatically).

### Built-in tokens

* `9` – any single digit (`[0-9]`)
* `a` – any single letter (`[A-Za-z]`)
* `A` – any uppercase letter (`[A-Z]`)
* `*` – any alphanumeric character (`[A-Za-z0-9]`)
* `#` – digit or sign (`[-+0-9]`)

### Optional segments

Append `?` after the last required character to mark remaining slots as optional:

```tsx
useMask({ mask: '(999) 999-9999? x9999' }) // Extension is optional
```

## Utility functions

The following pure functions are exported alongside the hook:

* `formatMask(raw, options)` – apply a mask to a raw value string
* `unformatMask(masked, options)` – strip all mask literals from a masked value
* `isMaskComplete(masked, options)` – check if all required slots are filled
* `generatePattern(mode, options)` – generate a regex string for HTML `pattern` attribute

```tsx
import { formatMask, unformatMask, isMaskComplete } from '@mantine/hooks';

const options = { mask: '(999) 999-9999' };

formatMask('1234567890', options);      // "(123) 456-7890"
unformatMask('(123) 456-7890', options); // "1234567890"
isMaskComplete('(123) 456-7890', options); // true
```

## Definition

```tsx
interface UseMaskOptions {
  // Mask pattern string or array of string literals and RegExp objects
  mask: string | Array<string | RegExp>;

  // Override or extend the default token map
  tokens?: Record<string, RegExp>;

  // Called on each keystroke, can return overrides for mask, tokens, or slotChar
  modify?: (value: string) => Partial<Pick<UseMaskOptions, 'mask' | 'tokens' | 'slotChar'>> | undefined;

  // Transform each character before validation and insertion
  transform?: (char: string) => string;

  // Character displayed in unfilled slots, "_" by default
  slotChar?: string | null;

  // Show mask pattern even when the field is empty and unfocused
  alwaysShowMask?: boolean;

  // Show mask placeholder on focus, true by default
  showMaskOnFocus?: boolean;

  // Clear value on blur when mask is incomplete, false by default
  autoClear?: boolean;

  // Sets aria-invalid on the input
  invalid?: boolean;

  // Called on every change with raw and masked values
  onChangeRaw?: (rawValue: string, maskedValue: string) => void;

  // Called when all required mask slots are filled
  onComplete?: (maskedValue: string, rawValue: string) => void;

}

interface UseMaskReturnValue {
  // Ref callback to attach to the input element
  ref: React.RefCallback<HTMLInputElement>;

  // Current masked display value
  value: string;

  // Current raw unmasked value
  rawValue: string;

  // Whether all required mask slots are filled
  isComplete: boolean;

  // Clear the input value and reset state
  reset: () => void;
}

function useMask(options: UseMaskOptions): UseMaskReturnValue;
```

## Exported types

The `UseMaskOptions` and `UseMaskReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseMaskOptions, UseMaskReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useMediaQuery
Package: @mantine/hooks
Import: import { UseMediaQuery } from '@mantine/hooks';

## Usage

The `use-media-query` hook subscribes to media queries.
It receives a media query as an argument and returns `true` if the given media query matches the current state.
The hook relies on the `window.matchMedia()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
and will return `false` if the API is not available, unless an initial value is provided in the second argument.

Resize the browser window to trigger the `window.matchMedia` event:

```tsx
import { Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

function Demo() {
  const matches = useMediaQuery('(min-width: ${em(900)})');

  return (
    <Badge color={matches ? 'teal' : 'red'} variant="filled">
      Breakpoint {matches ? 'matches' : 'does not match'}
    </Badge>
  );
}
```


## Server-Side Rendering

During server-side rendering, the hook will always return `false` as the `window.matchMedia` API is not available.
If that is not the desired behavior, you can override the initial value:

```tsx
import { useMediaQuery } from '@mantine/hooks';

function Demo() {
  // Set the initial value in the second argument and getInitialValueInEffect option to false
  const matches = useMediaQuery('(max-width: 40em)', true, {
    getInitialValueInEffect: false,
  });
}
```

## Definition

```tsx
interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

function useMediaQuery(
  query: string,
  initialValue?: boolean,
  options?: UseMediaQueryOptions,
): boolean;
```

## Exported types

`UseMediaQueryOptions` type is exported from `@mantine/hooks` package,
you can import it in your application:

```tsx
import type { UseMediaQueryOptions } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useMergedRef
Package: @mantine/hooks
Import: import { UseMergedRef } from '@mantine/hooks';

