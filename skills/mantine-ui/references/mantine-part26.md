## Usage

The `use-merged-ref` hook accepts any number of refs and returns a function that should be passed to the `ref` prop.
Use this hook when you need to use more than one ref on a single DOM node, for example,
when you want to use [use-click-outside](https://mantine.dev/llms/hooks-use-click-outside.md) and [use-focus-trap](https://mantine.dev/llms/hooks-use-focus-trap.md) hooks and also get a ref for yourself:

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

## mergeRefs function

The `use-merged-ref` hook memoizes refs with the `useCallback` hook, but in some cases
memoizing is not a valid strategy, for example, when you are working with a list
of dynamic components React will complain that a different number of hooks was called
across two renders. To fix that issue, use the `mergeRefs` function instead:

```tsx
import { useRef } from 'react';
import { mergeRefs, useClickOutside } from '@mantine/hooks';

function Demo() {
  const myRef = useRef();
  const useClickOutsideRef = useClickOutside(() => {});
  const mergedRef = mergeRefs(myRef, useClickOutsideRef);
  return <div ref={mergedRef} />;
}
```

`mergeRefs` works the same way as `use-merged-ref`, but does not use hooks internally.
Use it only when you cannot use `use-merged-ref`. Note that `mergeRefs` will not work
correctly with [use-focus-trap](https://mantine.dev/llms/hooks-use-focus-trap.md) hook, you are required to
use `use-merged-ref` with it.

## assignRef function

`assignRef` function can be used to assign refs that are not memoized with `useCallback`.
It is usually used to assign refs that do not reference elements:

```tsx
import { useState } from 'react';
import { assignRef } from '@mantine/hooks';

interface NumberInputHandlers {
  increment: () => void;
  decrement: () => void;
}

interface DemoProps {
  handlersRef?: React.ForwardedRef<NumberInputHandlers | undefined>;
}

function Demo({ handlersRef }: DemoProps) {
  const [value, setValue] = useState(0);

  const increment = () => setValue((v) => v + 1);
  const decrement = () => setValue((v) => v - 1);

  assignRef(handlersRef, { increment, decrement });

  return (
    <>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}
```

## Set node type

```tsx
import { useMergedRef } from '@mantine/hooks';

const ref = useMergedRef<HTMLDivElement>();
```

## Definition

```tsx
function useMergedRef<T = any>(
  ...refs: React.ForwardedRef<T>[]
): (node: T) => void;
```


--------------------------------------------------------------------------------

### useMounted
Package: @mantine/hooks
Import: import { UseMounted } from '@mantine/hooks';

## Usage

The `useMounted` hook returns `true` if the component is mounted and `false` if it's not.

```tsx
import { useMounted } from '@mantine/hooks';

function Demo() {
  const mounted = useMounted();
  return (
    <div>
      {mounted ? 'Component is mounted' : 'Component is not mounted'}
    </div>
  );
}
```

## Definition

```tsx
function useMounted(): boolean;
```


--------------------------------------------------------------------------------

### useMouse
Package: @mantine/hooks
Import: import { UseMouse } from '@mantine/hooks';

## Usage

```tsx
import { Text, Code, Group, Box } from '@mantine/core';
import { useMouse } from '@mantine/hooks';

function Demo() {
  const { ref, x, y } = useMouse();

  return (
    <>
      <Group justify="center">
        <Box ref={ref} w={300} h={180} bg="var(--mantine-color-blue-light)" />
      </Group>
      <Text ta="center">
        Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
      </Text>
    </>
  );
}
```


If you do not provide a `ref`, the mouse position is tracked relative to the document element:

```tsx
import { Text, Code } from '@mantine/core';
import { useMousePosition } from '@mantine/hooks';

function Demo() {
  const { x, y } = useMousePosition();

  return (
    <Text ta="center">
      Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
    </Text>
  );
}
```


## API

Set the `resetOnExit` option to reset the mouse position to `0, 0` when the mouse leaves the element:

```tsx
import { useMouse } from '@mantine/hooks';

const { ref, x, y } = useMouse({ resetOnExit: true });
```

The hook returns an object with `ref` and `x`, `y` mouse coordinates:

```tsx
import { useMouse } from '@mantine/hooks';

const {
  ref, // -> pass ref to target element; if not used, document element will be used as target element
  x, // -> mouse x position
  y, // -> mouse y position
} = useMouse();
```

On the first render (as well as during SSR), both `x` and `y` values are equal to `0`.

## Definition

```tsx
function useMouse<T extends HTMLElement = any>(options?: {
  resetOnExit?: boolean;
}): {
  x: number;
  y: number;
  ref: React.RefObject<T>;
};
```


--------------------------------------------------------------------------------

### useMove
Package: @mantine/hooks
Import: import { UseMove } from '@mantine/hooks';

## Usage

The `use-move` hook handles move behavior over any element:

```tsx
import { useState } from 'react';
import { Group, Text, Code } from '@mantine/core';
import { useMove } from '@mantine/hooks';

function Demo() {
  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref, active } = useMove(setValue);

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 400,
            height: 120,
            backgroundColor: 'var(--mantine-color-blue-light)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `calc(${value.x * 100}% - 8px)`,
              top: `calc(${value.y * 100}% - 8px)`,
              width: 16,
              height: 16,
              backgroundColor: active ? 'var(--mantine-color-teal-7)' : 'var(--mantine-color-blue-7)',
            }}
          />
        </div>
      </Group>
      <Text ta="center" mt="sm">
        Values <Code>{`{ x: ${Math.round(value.x * 100)}, y: ${Math.round(value.y * 100)} }`}</Code>
      </Text>
    </>
  );
}
```


## API

The hook accepts a callback that is called when the user moves the pressed mouse over the given element
and returns an object with `ref` and active state:

```tsx
import { useMove } from '@mantine/hooks';

const {
  ref, // -> pass ref to target element
  active, // -> is the user changing something right now?
} = useMove(({ x, y }) => console.log({ x, y }));
```

The `x` and `y` values are always between `0` and `1`; you can use them to calculate the value in your boundaries.

## Horizontal slider

You can ignore changes for one of the axis:

```tsx
import { useState } from 'react';
import { Group, Text } from '@mantine/core';
import { useMove } from '@mantine/hooks';

function Demo() {
  const [value, setValue] = useState(0.2);
  const { ref } = useMove(({ x }) => setValue(x));

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 400,
            height: 16,
            backgroundColor: 'var(--mantine-color-blue-light)',
            position: 'relative',
          }}
        >
          {/* Filled bar */}
          <div
            style={{
              width: `${value * 100}%`,
              height: 16,
              backgroundColor: 'var(--mantine-color-blue-filled)',
              opacity: 0.7,
            }}
          />

          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              left: `calc(${value * 100}% - 8px)`,
              top: 0,
              width: 16,
              height: 16,
              backgroundColor: 'var(--mantine-color-blue-7)',
            }}
          />
        </div>
      </Group>

      <Text ta="center" mt="sm">
        Value: {Math.round(value * 100)}
      </Text>
    </>
  );
}
```


## Horizontal slider with styles

```tsx
// Demo.tsx
import { useState } from 'react';
import { DotsSixVerticalIcon } from '@phosphor-icons/react';
import { clamp, useMove } from '@mantine/hooks';
import classes from './Demo.module.css';

function Demo() {
  const [value, setValue] = useState(0.3);
  const { ref } = useMove(({ x }) => setValue(clamp(x, 0.1, 0.9)));
  const labelFloating = value < 0.2 || value > 0.8;

  return (
    <div className={classes.root}>
      <div className={classes.track} ref={ref}>
        <div
          className={classes.filled}
          style={{
            width: `calc(${value * 100}% - var(--thumb-width) / 2 - var(--thumb-offset) / 2)`,
          }}
        >
          <span className={classes.label} data-floating={labelFloating || undefined} data-filled>
            {(value * 100).toFixed(0)}
          </span>
        </div>

        <div
          className={classes.empty}
          style={{
            width: `calc(${(1 - value) * 100}% - var(--thumb-width) / 2 - var(--thumb-offset) / 2)`,
          }}
        >
          <span className={classes.label} data-floating={labelFloating || undefined}>
            {((1 - value) * 100).toFixed(0)}
          </span>
        </div>

        <div
          className={classes.thumb}
          style={{ left: `calc(${value * 100}% - var(--thumb-width) / 2)` }}
        >
          <DotsSixVerticalIcon />
        </div>
      </div>
    </div>
  );
}

// Demo.module.css
.root {
  padding-top: 20px;
}

.track {
  --thumb-width: 20px;
  --thumb-offset: 10px;

  position: relative;
  height: 60px;
  display: flex;
}

.filled {
  height: 100%;
  margin-right: calc(var(--thumb-offset) / 2 + var(--thumb-width) / 2);
  border-radius: var(--mantine-radius-md);
  background-color: var(--mantine-color-blue-filled);
  display: flex;
  align-items: center;
  padding-inline: 10px;
}

.empty {
  height: 100%;
  margin-left: calc(var(--thumb-offset) / 2 + var(--thumb-width) / 2);
  border-radius: var(--mantine-radius-md);
  background-color: var(--mantine-color-gray-1);
  display: flex;
  align-items: center;
  padding-inline: 10px;
  justify-content: flex-end;

  @mixin dark {
    background-color: var(--mantine-color-dark-6);
  }
}

.thumb {
  position: absolute;
  background-color: var(--mantine-color-white);
  border: 1px solid var(--mantine-color-gray-2);
  border-radius: var(--mantine-radius-md);
  height: 100%;
  width: var(--thumb-width);
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mantine-color-gray-5);

  @mixin dark {
    background-color: var(--mantine-color-dark-6);
    border-color: var(--mantine-color-dark-4);
    color: var(--mantine-color-dark-0);
  }
}

.label {
  font-size: var(--mantine-font-size-xl);
  font-weight: 700;
  transition:
    transform 100ms ease,
    color 100ms ease;

  &[data-filled] {
    color: var(--mantine-color-white);
  }

  &[data-floating] {
    transform: translateY(-44px) translateX(-10px);
    color: var(--mantine-color-black);

    &:not([data-filled]) {
      transform: translateY(-44px) translateX(10px);
    }

    @mixin dark {
      color: var(--mantine-color-white);
    }
  }
}
```


## Vertical slider

Moving the slider down increases the value, to reverse that set value to `1 - y` in your `setValue` function:

```tsx
import { useState } from 'react';
import { Group, Text } from '@mantine/core';
import { useMove } from '@mantine/hooks';

function Demo() {
  const [value, setValue] = useState(0.2);
  const { ref } = useMove(({ y }) => setValue(1 - y));

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 16,
            height: 120,
            backgroundColor: 'var(--mantine-color-blue-light)',
            position: 'relative',
          }}
        >
          {/* Filled bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              height: `${value * 100}%`,
              width: 16,
              backgroundColor: 'var(--mantine-color-blue-filled)',
              opacity: 0.7,
            }}
          />

          {/* Thumb */}
          <div
            style={{
              position: 'absolute',
              bottom: `calc(${value * 100}% - 8px)`,
              left: 0,
              width: 16,
              height: 16,
              backgroundColor: 'var(--mantine-color-blue-7)',
            }}
          />
        </div>
      </Group>

      <Text ta="center" mt="sm">
        Value: {Math.round(value * 100)}
      </Text>
    </>
  );
}
```


## Color picker

```tsx
import { useState } from 'react';
import { useMove } from '@mantine/hooks';

function Demo() {
  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref } = useMove(setValue);

  return (
    <div>
      <div
        ref={ref}
        style={{
          width: 300,
          height: 150,
          backgroundColor: 'red',
          position: 'relative',
        }}
      >
        {/* Gradient overlays */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(90deg, #fff, transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(0deg, #000, transparent)',
          }}
        />

        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            left: `calc(${value.x * 100}% - 8px)`,
            top: `calc(${value.y * 100}% - 8px)`,
            width: 16,
            height: 16,
            border: '2px solid #fff',
            borderRadius: 16,
          }}
        />
      </div>
    </div>
  );
}
```


## clampUseMovePosition

`clampUseMovePosition` function can be used to clamp `x` and `y` values to `0-1` range.
It is useful when you want to use external events to change the value, for example changing value with keyboard arrows:

```tsx
import { clampUseMovePosition } from '@mantine/hooks';

clampUseMovePosition({ x: 0.5, y: 0.5 }); // -> { x: 0.5, y: 0.5 }
clampUseMovePosition({ x: 1.5, y: 0.5 }); // -> { x: 1, y: 0.5 }
clampUseMovePosition({ x: -0.5, y: 0.5 }); // -> { x: 0, y: 0.5 }
```

## UseMovePosition

`@mantine/hooks` exports `UseMovePosition` type, it can be used as a type parameter for `useState`:

```tsx
import { useState } from 'react';
import { UseMovePosition } from '@mantine/hooks';

const [value, setValue] = useState<UseMovePosition>({
  x: 0.5,
  y: 0.5,
});
```

## Definition

```tsx
interface UseMovePosition {
  x: number;
  y: number;
}

interface UseMoveHandlers {
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
}

interface UseMoveReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  active: boolean;
}

function useMove<T extends HTMLElement = any>(
  onChange: (value: UseMovePosition) => void,
  handlers?: UseMoveHandlers,
  dir?: "ltr" | "rtl",
): UseMoveReturnValue<T>
```

## Exported types

`UseMovePosition`, `UseMoveReturnValue` and `UseMoveHandlers` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseMovePosition, UseMoveHandlers, UseMoveReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useMutationObserver
Package: @mantine/hooks
Import: import { UseMutationObserver } from '@mantine/hooks';

## Usage

The `use-mutation-observer` hook is a wrapper for the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
It allows you to subscribe to changes being made to the DOM tree.

```tsx
import { useState } from 'react';
import { Button, Text } from '@mantine/core';
import { useMutationObserver } from '@mantine/hooks';

function Demo() {
  const [lastMutation, setLastMutation] = useState('');

  const ref = useMutationObserver<HTMLButtonElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-mutation') {
          mutation.target instanceof HTMLElement &&
            setLastMutation(mutation.target.dataset.mutation || '');
        }
      });
    },
    {
      attributes: true,
      attributeFilter: ['data-mutation'],
    }
  );

  return (
    <>
      <Button
        ref={ref}
        onClick={(event) => {
          event.currentTarget.dataset.mutation = Math.random().toFixed(3);
        }}
      >
        Click to change to data-mutation attribute
      </Button>
      <Text mt={10} size="sm">
        Last detected mutation: {lastMutation || 'Not mutated yet'}
      </Text>
    </>
  );
}
```


## Target element

If you cannot pass a `ref` to the target element, you can pass a function to resolve
the target element as the third argument.

```tsx
import { useState } from 'react';
import { Kbd, Text } from '@mantine/core';
import { useMutationObserverTarget } from '@mantine/hooks';

function Demo() {
  const [lastMutation, setLastMutation] = useState('');

  useMutationObserverTarget(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
          mutation.target instanceof HTMLElement &&
            setLastMutation(mutation.target.getAttribute('dir') || '');
        }
      });
    },
    {
      attributes: true,
      attributeFilter: ['dir'],
    },
    () => document.documentElement
  );

  return (
    <>
      <Text>
        Press <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>L</Kbd> to change direction
      </Text>

      <Text mt={10}>Direction was changed to: {lastMutation || 'Not changed yet'}</Text>
    </>
  );
}
```


## Definition

```tsx
function useMutationObserver<T extends HTMLElement>(
  callback: MutationCallback,
  options: MutationObserverInit
): React.RefCallback<T | null>;

function useMutationObserverTarget(
  callback: MutationCallback,
  options: MutationObserverInit,
  target?: HTMLElement | (() => HTMLElement) | null
): void;
```


--------------------------------------------------------------------------------

### useNetwork
Package: @mantine/hooks
Import: import { UseNetwork } from '@mantine/hooks';

## Usage

The `use-network` hook returns an object with the current connection status:

```tsx
import { Text, Table } from '@mantine/core';
import { useNetwork } from '@mantine/hooks';

function Demo() {
  const networkStatus = useNetwork();

  return (
    <Table maw={300} layout="fixed" mx="auto">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Property</Table.Th>
          <Table.Th>Value</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        <Table.Tr>
          <Table.Td>Online</Table.Td>
          <Table.Td>
            <Text size="sm" c={networkStatus.online ? 'teal.6' : 'red.6'}>
              {networkStatus.online ? 'Online' : 'Offline'}
            </Text>
          </Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>rtt</Table.Td>
          <Table.Td>{networkStatus.rtt}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>downlink</Table.Td>
          <Table.Td>{networkStatus.downlink}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>effectiveType</Table.Td>
          <Table.Td>{networkStatus.effectiveType}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Td>saveData</Table.Td>
          <Table.Td>
            <Text size="sm" c={networkStatus.saveData ? 'teal.6' : 'red.6'}>
              {networkStatus.saveData ? 'true' : 'false'}
            </Text>
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
```


## Browser support

`use-network` uses the experimental `navigator.connection` API. See the [browser compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/connection#browser_compatibility).

## Definition

```tsx

interface UserNetworkReturnValue {
  online: boolean;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  rtt?: number;
  saveData?: boolean;
  type?: 'bluetooth' | 'cellular' | 'ethernet' | 'wifi' | 'wimax' | 'none' | 'other' | 'unknown';
}

function useNetwork(): UserNetworkReturnValue;
```

## Exported types

The `UserNetworkReturnValue` type is exported from the `@mantine/hooks` package;
you can import it in your application:

```tsx
import type { UserNetworkReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useOrientation
Package: @mantine/hooks
Import: import { UseOrientation } from '@mantine/hooks';

## Usage

The `useOrientation` hook returns an object with the current orientation of the device:

```tsx
import { Code, Text } from '@mantine/core';
import { useOrientation } from '@mantine/hooks';

function Demo() {
  const { angle, type } = useOrientation();
  return (
    <>
      <Text>
        Angle: <Code>{angle}</Code>
      </Text>
      <Text>
        Type: <Code>{type}</Code>
      </Text>
    </>
  );
}
```


## Definition

```tsx
interface UseOrientationOptions {
  /** Default angle value, used until the real value can be retrieved
   * (during server-side rendering and before JS executes on the page).
   * If not provided, the default value is `0`.
   * */
  defaultAngle?: number;

  /** Default type value, used until the real value can be retrieved
   * (during server-side rendering and before JS executes on the page).
   * If not provided, the default value is `'landscape-primary'`.
   * */
  defaultType?: OrientationType;

  /** If true, the initial value will be resolved in useEffect (SSR safe).
   *  If false, the initial value will be resolved in useLayoutEffect (SSR unsafe).
   *  True by default.
   */
  getInitialValueInEffect?: boolean;
}

interface UseOrientationReturnType {
  angle: number;
  type: OrientationType;
}

function useOrientation(options?: UseOrientationOptions): UseOrientationReturnType;
```

## Exported types

`UseOrientationOptions` and `UseOrientationReturnType` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseOrientationOptions, UseOrientationReturnType } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useOs
Package: @mantine/hooks
Import: import { UseOs } from '@mantine/hooks';

## Usage

The `use-os` hook returns the user's operating system. Possible values are: `undetermined`, `macos`, `ios`, `windows`, `android`, `linux`, `chromeos`.
If the OS cannot be identified, for example, during server-side rendering, `undetermined` will be returned.

```tsx
import { useOs } from '@mantine/hooks';

function Demo() {
  const os = useOs();
  return <>Your os is <b>{os}</b></>;
}
```


## Definition

```tsx
type UseOSReturnValue =
  | 'undetermined'
  | 'macos'
  | 'ios'
  | 'windows'
  | 'android'
  | 'linux'
  | 'chromeos';

interface UseOsOptions {
  getValueInEffect: boolean;
}

function getOS(options?: UseOsOptions): UseOSReturnValue;
```

## Exported types

`UseOsOptions` and `UseOSReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseOsOptions, UseOSReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### usePageLeave
Package: @mantine/hooks
Import: import { UsePageLeave } from '@mantine/hooks';

## Usage

The `use-page-leave` hook calls the given function when the mouse leaves the page:

```tsx
import { useState } from 'react';
import { usePageLeave } from '@mantine/hooks';

function Demo() {
  const [leftsCount, setLeftsCount] = useState(0);
  usePageLeave(() => setLeftsCount((p) => p + 1));
  return <>Mouse left the page {leftsCount} times</>;
}
```


## Definition

```tsx
function usePageLeave(onPageLeave: () => void): void;
```


--------------------------------------------------------------------------------

### usePagination
Package: @mantine/hooks
Import: import { UsePagination } from '@mantine/hooks';

## Usage

The `use-pagination` hook is a state management hook for the [Pagination](https://mantine.dev/llms/core-pagination.md) component;
it manages pagination with controlled and uncontrolled state:

```tsx
function Demo() {
  return <Pagination total={10} />;
}
```


```tsx
import { usePagination } from '@mantine/hooks';

const pagination = usePagination({ total: 10, initialPage: 1 });

pagination.range; // -> [1, 2, 3, 4, 5, 'dots', 10];

pagination.setPage(5);
pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];

pagination.next();
pagination.range; // -> [1, 'dots', 5, 6, 7, 'dots', 10];

pagination.previous();
pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];

pagination.last();
pagination.range; // -> [1, 'dots', 6, 7, 8, 9, 10];

pagination.first();
pagination.range; // -> [1, 2, 3, 4, 5, 'dots', 10];
```

## Controlled

The hook supports controlled mode; provide `page` and `onChange` props to manage state from outside:

```tsx
import { useState } from 'react';
import { usePagination } from '@mantine/hooks';

const [page, onChange] = useState(1);
const pagination = usePagination({ total: 10, page, onChange });

// Will call onChange with 5
pagination.setPage(5);
pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];

// ... All other examples work the same
```

## Siblings

Control number of active item siblings with `siblings`:

```tsx
import { usePagination } from '@mantine/hooks';

const pagination = usePagination({ total: 20, siblings: 3 });
```

```tsx
import { Text, Pagination } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text mb="xs">1 sibling (default)</Text>
      <Pagination total={20} siblings={1} defaultValue={10} />

      <Text mb="xs" mt="xl">2 siblings</Text>
      <Pagination total={20} siblings={2} defaultValue={10} />

      <Text mb="xs" mt="xl">3 siblings</Text>
      <Pagination total={20} siblings={3} defaultValue={10} />
    </>
  );
}
```


## Boundaries

Control number of items on each boundary with `boundaries`:

```tsx
import { usePagination } from '@mantine/hooks';

const pagination = usePagination({ total: 20, boundaries: 3 });
```

```tsx
import { Text, Pagination } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text mb="xs">1 boundary (default)</Text>
      <Pagination total={20} boundaries={1} defaultValue={10} />

      <Text mt="xl" mb="xs">2 boundaries</Text>
      <Pagination total={20} boundaries={2} defaultValue={10} />

      <Text mt="xl" mb="xs">3 boundaries</Text>
      <Pagination total={20} boundaries={3} defaultValue={10} />
    </>
  );
}
```


## Start value

Set `startValue` to define the starting page number. For example, with `startValue={5}` and `total={15}`,
the pagination range will be from 5 to 15:

```tsx
import { Button, Group, Text } from '@mantine/core';
import { usePagination } from '@mantine/hooks';

function Demo() {
  const pagination = usePagination({ total: 15, startValue: 5, initialPage: 5 });

  return (
    <>
      <Text>Active page: {pagination.active}</Text>
      <Text>Range: [{pagination.range.join(', ')}]</Text>
      <Group mt="md" gap={4}>
        <Button size="compact-sm" variant="default" onClick={pagination.first}>
          First
        </Button>
        <Button size="compact-sm" variant="default" onClick={pagination.previous}>
          Previous
        </Button>
        {pagination.range.map((page, index) =>
          page === 'dots' ? (
            <span key={index}>...</span>
          ) : (
            <Button
              size="compact-sm"
              key={index}
              onClick={() => pagination.setPage(page)}
              variant={pagination.active === page ? 'filled' : 'default'}
              miw={34}
            >
              {page}
            </Button>
          )
        )}
        <Button size="compact-sm" variant="default" onClick={pagination.next}>
          Next
        </Button>
        <Button size="compact-sm" variant="default" onClick={pagination.last}>
          Last
        </Button>
      </Group>
    </>
  );
}
```


## Definition

```tsx
export interface UsePaginationOptions {
  /** Page selected on initial render, defaults to 1 or startValue if provided */
  initialPage?: number;

  /** Controlled active page number */
  page?: number;

  /** Total amount of pages */
  total: number;

  /** Siblings amount on left/right side of selected page, defaults to 1 */
  siblings?: number;

  /** Amount of elements visible on left/right edges, defaults to 1  */
  boundaries?: number;

  /** Callback fired after change of each page */
  onChange?: (page: number) => void;

  /** Starting page number, defaults to 1 */
  startValue?: number;
}

export interface UsePaginationReturnValue {
  /** Array of page numbers and dots */
  range: (number | 'dots')[];

  /** Active page number */
  active: number;

  /** Function to set active page */
  setPage: (page: number) => void;

  /** Function to go to next page */
  next: () => void;

  /** Function to go to previous page */
  previous: () => void;

  /** Function to go to first page */
  first: () => void;

  /** Function to go to last page */
  last: () => void;
}

function usePagination(settings: UsePaginationOptions): UsePaginationReturnValue;
```

## Exported types

`UsePaginationOptions` and `UsePaginationReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UsePaginationOptions, UsePaginationReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### usePrevious
Package: @mantine/hooks
Import: import { UsePrevious } from '@mantine/hooks';

## Usage

The `use-previous` hook stores the previous value of a state in a ref.
It returns `undefined` on the initial render and the previous value of a state after rerender:

```tsx
import { TextInput, Text } from '@mantine/core';
import { usePrevious, useInputState } from '@mantine/hooks';

function Demo() {
  const [value, setValue] = useInputState('');
  const previousValue = usePrevious(value);

  return (
    <div>
      <TextInput
        label="Enter some text here"
        placeholder="Enter some text here"
        id="previous-demo-input"
        value={value}
        onChange={setValue}
      />
      <Text mt="md">Current value: {value}</Text>
      <Text>Previous value: {previousValue}</Text>
    </div>
  );
}
```


## Definition

```tsx
function usePrevious<T>(value: T): T | undefined;
```


--------------------------------------------------------------------------------

### useQueue
Package: @mantine/hooks
Import: import { UseQueue } from '@mantine/hooks';

## Usage

The `use-queue` hook limits the number of data items in the current state and places the rest of them in a queue.
For example, in the [@mantine/notifications](https://mantine.dev/llms/x-notifications.md) package, the number of
notifications that is currently displayed is limited, and other new notifications are added to the queue and displayed once
available space appears.

```tsx
import { useQueue } from '@mantine/hooks';

const { state, queue, add, update, cleanQueue } = useQueue({
  initialValues: [1],
  limit: 2,
});

// state -> [1], queue -> []

// When state.length is less than limit, new items are added to state
add(2);
// state -> [1,2], queue -> []

// When state.length is equal to the limit, new items are added to the queue
add(3, 4, 5, 6);
// state -> [1,2], queue -> [3,4,5,6]

// Use the update function to modify items
update((values) => values.map((item) => item * 3));
// state -> [3,6], queue -> [9,12,15,18]

// If you add or remove items in the update function,
// they will be divided between queue and state according to the limit;
// order is always preserved
update((values) => values.filter((item) => item % 2));
// state -> [3,9], queue -> [15]

// Remove all items from queue
cleanQueue();
// state -> [3,9], queue -> []

// Remove all items from queue and state
update(() => []);
// state -> [], queue -> []
```

## API

The hook accepts one argument – a configuration object with keys:

* `initialValues` – optional initial values (divided between state and queue according to limit), defaults to empty array
* `limit` – maximum number of items that state can include, every next item after the limit is exceeded is put in queue

Return value:

* `state` – current state
* `queue` – current queue
* `add` – add any number of items to state or queue
* `update` – apply given function to all items in state and queue, use it to filter, modify or add items
* `cleanQueue` – remove all items from the queue

## Set item type

By default, the hook will get types information from `initialValues` automatically:

```tsx
import { useQueue } from '@mantine/hooks';

const q = useQueue({
  limit: 2,
  initialValues: [
    { name: 'Bob', id: 1 },
    { name: 'Alice', id: 2 },
  ],
});

typeof q.state[number]; // -> { name: string; id: number; }
```

If you do not provide `initialValues`, pass in type for state item:

```tsx
import { useQueue } from '@mantine/hooks';

const q = useQueue<{ name: string; id: number }>({
  limit: 2,
  initialValues: [],
});

q.add({ name: 'Bob', id: 1 });
```

## Definition

```tsx
export interface UseQueueOptions<T> {
  /** Initial values to be added to the queue */
  initialValues?: T[];

  /** Maximum number of items in the state */
  limit: number;
}

export interface UseQueueReturnValue<T> {
  /** Array of items in the queue */
  queue: T[];

  /** Array of items in the state */
  state: T[];

  /** Function to add items to state or queue */
  add: (...items: T[]) => void;

  /** Function to apply updates to current items */
  update: (fn: (state: T[]) => T[]) => void;

  /** Function to clear the queue */
  cleanQueue: () => void;
}

function useQueue<T>(options: UseQueueOptions<T>): UseQueueReturnValue<T>
```

## Exported types

`UseQueueOptions` and `UseQueueReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseQueueOptions, UseQueueReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useRadialMove
Package: @mantine/hooks
Import: import { UseRadialMove } from '@mantine/hooks';

## Usage

The `use-radial-move` hook can be used to create custom radial sliders. For example, the [AngleSlider](https://mantine.dev/llms/core-angle-slider.md)
component is based on this hook. It works similarly to the [use-move](https://mantine.dev/llms/hooks-use-move.md) hook.

Example of creating a custom radial slider:

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


## Definition

```tsx
interface UseRadialMoveOptions {
  /** Number by which value is incremented/decremented with mouse and touch events, `0.01` by default */
  step?: number;

  /** Called in `onMouseUp` and `onTouchEnd` events with the current value */
  onChangeEnd?: (value: number) => void;

  /** Called in `onMouseDown` and `onTouchStart` events */
  onScrubStart?: () => void;

  /** Called in `onMouseUp` and `onTouchEnd` events */
  onScrubEnd?: () => void;
}

interface UseRadialMoveReturnValue<T extends HTMLElement = any> {
  /** Ref to be passed to the element that should be used for radial move */
  ref: React.RefCallback<T | null>;

  /** Indicates whether the radial move is active */
  active: boolean;
}

function useRadialMove<T extends HTMLElement = HTMLDivElement>(
  onChange: (value: number) => void,
  options?: UseRadialMoveOptions,
): UseRadialMoveReturnValue<T>;
```

## Exported types

`UseRadialMoveOptions` and `UseRadialMoveReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseRadialMoveOptions, UseRadialMoveReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useReducedMotion
Package: @mantine/hooks
Import: import { UseReducedMotion } from '@mantine/hooks';

## Usage

The `use-reduced-motion` hook detects if the user [prefers to reduce motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
It uses the [use-media-query](https://mantine.dev/llms/hooks-use-media-query.md) hook under the hood.
The hook relies on the `window.matchMedia()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
and will always return `false` if the API is not available (for example, during server-side rendering), unless the initial value is provided in the first argument.

Use the hook to detect if the user prefers to reduce motion (`(prefers-reduced-motion: reduce)` media query) and set animation duration based on this value.

```tsx
import { Badge } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';

function Demo() {
  const reduceMotion = useReducedMotion();

  return (
    <Badge
      color={reduceMotion ? 'red' : 'teal'}
      style={{ transitionDuration: reduceMotion ? '0ms' : '200ms' }}
      variant="filled"
    >
      {reduceMotion ? 'You prefer to reduce motion' : 'You prefer not to reduce motion'}
    </Badge>
  );
}
```


## Definition

```tsx
interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

function useReducedMotion(initialValue?: boolean, options?: UseMediaQueryOptions): boolean;
```


--------------------------------------------------------------------------------

### useResizeObserver
Package: @mantine/hooks
Import: import { UseResizeObserver } from '@mantine/hooks';

## Usage

```tsx
// Demo.tsx
import { Group, Table } from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';

function Demo() {
  const [ref, rect] = useResizeObserver();

  return (
    <div className={classes.root}>
      <Group justify="center">
        <div ref={ref} className={classes.demo}>
          Resize me!
        </div>
      </Group>

      <Table
        captionSide="top"
        data={{
          caption: 'Resize element by dragging its right bottom corner',
          head: ['Property', 'Value'],
          body: [
            ['width', rect.width],
            ['height', rect.height],
          ],
        }}
      />
    </div>
  );
}

// Demo.module.css
.root {
  min-height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.demo {
  width: 400px;
  max-width: 800px;
  min-width: 160px;
  height: 200px;
  max-height: 220px;
  min-height: 80px;
  background-color: light-dark(var(--mantine-color-blue-6), var(--mantine-color-blue-8));
  resize: both;
  overflow: auto;
  color: var(--mantine-color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
}
```


## API

The `use-resize-observer` hook returns a `ref` object that should be passed to the observed element, and the current element content rect, as returned by the `ResizeObserver`'s callback `entry.contentRect`.
See the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) documentation to learn more.
On the first render (as well as during SSR), or when no element is being observed, all of the properties are equal to `0`.

```tsx
import { useResizeObserver } from '@mantine/hooks';

function Demo() {
  const [ref, rect] = useResizeObserver();
  return <div ref={ref}>Observed</div>;
}
```

See also the [use-element-size](https://mantine.dev/llms/hooks-use-element-size.md) hook in case you need to subscribe only to `width` and `height`.

## Definition

```tsx
type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>;

function useResizeObserver<T extends HTMLElement = any>(
  options?: ResizeObserverOptions
): readonly [React.RefCallback<T | null>, ObserverRect];
```


--------------------------------------------------------------------------------

### useRovingIndex
Package: @mantine/hooks
Import: import { UseRovingIndex } from '@mantine/hooks';

## Usage

`use-roving-index` implements the [roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) keyboard navigation pattern.
In a group of focusable elements, only one element has `tabIndex={0}` (can be reached with Tab key),
while all others have `tabIndex={-1}`. Arrow keys move focus between items in the group.

```tsx
import { Button, Group } from '@mantine/core';
import { useRovingIndex } from '@mantine/hooks';

const items = ['Bold', 'Italic', 'Underline', 'Strikethrough', 'Code'];

function Demo() {
  const { getItemProps } = useRovingIndex({
    total: items.length,
    orientation: 'horizontal',
    loop: true,
  });

  return (
    <Group gap="xs">
      {items.map((item, index) => (
        <Button key={item} variant="default" {...getItemProps({ index })}>
          {item}
        </Button>
      ))}
    </Group>
  );
}
```


## Orientation

Set `orientation` to control which arrow keys are used for navigation:

* `'horizontal'` (default) – ArrowLeft/ArrowRight
* `'vertical'` – ArrowUp/ArrowDown
* `'both'` – all four arrow keys

```tsx
import { Stack, UnstyledButton } from '@mantine/core';
import { useRovingIndex } from '@mantine/hooks';

const items = ['General', 'Account', 'Security', 'Notifications', 'Privacy'];

function Demo() {
  const { getItemProps, focusedIndex } = useRovingIndex({
    total: items.length,
    orientation: 'vertical',
    loop: true,
  });

  return (
    <Stack gap={4} w={200}>
      {items.map((item, index) => (
        <UnstyledButton
          key={item}
          {...getItemProps({ index })}
          p="xs"
          style={{
            borderRadius: 'var(--mantine-radius-sm)',
            backgroundColor:
              focusedIndex === index
                ? 'var(--mantine-color-blue-light)'
                : undefined,
          }}
        >
          {item}
        </UnstyledButton>
      ))}
    </Stack>
  );
}
```


## Grid navigation

Set `columns` to enable 2D grid navigation. ArrowLeft/ArrowRight navigate within a row,
ArrowUp/ArrowDown navigate across rows preserving the column position.
Navigation stops at grid boundaries. Use Ctrl+Home/Ctrl+End to jump to the first/last item in the grid,
and Home/End to jump to the first/last item in the current row.

```tsx
import { SimpleGrid, UnstyledButton } from '@mantine/core';
import { useRovingIndex } from '@mantine/hooks';

function Demo() {
  const total = 9;
  const columns = 3;

  const { getItemProps, focusedIndex } = useRovingIndex({
    total,
    columns,
  });

  return (
    <SimpleGrid cols={columns} w={300} spacing="xs">
      {Array.from({ length: total }, (_, index) => (
        <UnstyledButton
          key={index}
          {...getItemProps({ index })}
          p="md"
          ta="center"
          style={{
            borderRadius: 'var(--mantine-radius-sm)',
            border: '1px solid var(--mantine-color-default-border)',
            backgroundColor:
              focusedIndex === index
                ? 'var(--mantine-color-blue-light)'
                : undefined,
          }}
        >
          Cell {index + 1}
        </UnstyledButton>
      ))}
    </SimpleGrid>
  );
}
```


## Disabled items

Use `isItemDisabled` callback to mark items as disabled. Disabled items are skipped during
keyboard navigation. If the initially focused item is disabled, the first non-disabled item
receives focus instead.

```tsx
import { Button, Group } from '@mantine/core';
import { useRovingIndex } from '@mantine/hooks';

const items = ['Cut', 'Copy', 'Paste', 'Delete', 'Select All'];
const disabledIndices = new Set([1, 3]);

function Demo() {
  const { getItemProps } = useRovingIndex({
    total: items.length,
    orientation: 'horizontal',
    loop: true,
    isItemDisabled: (index) => disabledIndices.has(index),
  });

  return (
    <Group gap="xs">
      {items.map((item, index) => (
        <Button
          key={item}
          variant="default"
          disabled={disabledIndices.has(index)}
          {...getItemProps({ index })}
        >
          {item}
        </Button>
      ))}
    </Group>
  );
}
```


## Loop

By default, navigation wraps around at boundaries (`loop` is `true`).
Set `loop={false}` to stop at the first and last items.

```tsx
import { useState } from 'react';
import { Button, Checkbox, Group, Stack } from '@mantine/core';
import { useRovingIndex } from '@mantine/hooks';

const items = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

function Demo() {
  const [loop, setLoop] = useState(true);
  const { getItemProps } = useRovingIndex({
    total: items.length,
    orientation: 'horizontal',
    loop,
  });

  return (
    <Stack>
      <Checkbox
        label="Loop navigation"
        checked={loop}
        onChange={(event) => setLoop(event.currentTarget.checked)}
      />
      <Group gap="xs">
        {items.map((item, index) => (
          <Button key={item} variant="default" {...getItemProps({ index })}>
            {item}
          </Button>
        ))}
      </Group>
    </Stack>
  );
}
```


## Controlled mode

Use `focusedIndex` and `onFocusChange` to control the focused index externally:

```tsx
import { useState } from 'react';
import { useRovingIndex } from '@mantine/hooks';

function Demo() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { getItemProps } = useRovingIndex({
    total: 5,
    focusedIndex,
    onFocusChange: setFocusedIndex,
  });

  // ...
}
```

## activateOnFocus

Set `activateOnFocus` to `true` to automatically click items when they receive focus
via keyboard navigation. This is useful for tab-like interfaces where focus and selection
should be synchronized:

```tsx
import { useRovingIndex } from '@mantine/hooks';

function Demo() {
  const { getItemProps } = useRovingIndex({
    total: 5,
    activateOnFocus: true,
  });

  // ...
}
```

## RTL support

Set `dir="rtl"` to swap ArrowLeft/ArrowRight behavior for right-to-left layouts:

```tsx
import { useRovingIndex } from '@mantine/hooks';

function Demo() {
  const { getItemProps } = useRovingIndex({
    total: 5,
    dir: 'rtl',
  });

  // ...
}
```

