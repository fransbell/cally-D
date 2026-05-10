## Definition

```tsx
export interface UseRovingIndexInput {
  /** Total number of items in the group */
  total: number;

  /** Which arrow keys navigate, `'horizontal'` by default */
  orientation?: 'horizontal' | 'vertical' | 'both';

  /** Whether navigation wraps at boundaries, `true` by default */
  loop?: boolean;

  /** Text direction, `'ltr'` by default */
  dir?: 'rtl' | 'ltr';

  /** Whether to click element when it receives focus via keyboard, `false` by default */
  activateOnFocus?: boolean;

  /** Number of columns for grid (2D) navigation. When set, enables grid mode */
  columns?: number;

  /** Controlled focused index */
  focusedIndex?: number;

  /** Initial focused index for uncontrolled mode, first non-disabled item by default */
  initialIndex?: number;

  /** Called when focused index changes */
  onFocusChange?: (index: number) => void;

  /** Function to check if item at given index is disabled, `() => false` by default */
  isItemDisabled?: (index: number) => boolean;
}

export interface UseRovingIndexGetItemPropsInput {
  /** Index of the item in the group */
  index: number;

  /** Called when item is clicked */
  onClick?: React.MouseEventHandler;

  /** Called when keydown event fires on item */
  onKeyDown?: React.KeyboardEventHandler;
}

export interface UseRovingIndexReturnValue {
  /** Get props to spread on each navigable item */
  getItemProps: (options: UseRovingIndexGetItemPropsInput) => {
    tabIndex: 0 | -1;
    onKeyDown: React.KeyboardEventHandler;
    onClick: React.MouseEventHandler;
    ref: React.RefCallback<HTMLElement>;
  };

  /** Currently focused index */
  focusedIndex: number;

  /** Programmatically set focused index */
  setFocusedIndex: (index: number) => void;
}

function useRovingIndex(input: UseRovingIndexInput): UseRovingIndexReturnValue;
```

## Exported types

`UseRovingIndexInput`, `UseRovingIndexGetItemPropsInput` and `UseRovingIndexReturnValue` types are exported
from the `@mantine/hooks` package; you can import them in your application:

```tsx
import type {
  UseRovingIndexInput,
  UseRovingIndexGetItemPropsInput,
  UseRovingIndexReturnValue,
} from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useScrollDirection
Package: @mantine/hooks
Import: import { UseScrollDirection } from '@mantine/hooks';

## Usage

The `use-scroll-direction` hook detects whether the user is currently scrolling up or down.
It returns `'up'` when the user is scrolling up, `'down'` when scrolling down, and `'unknown'`
before any scroll event has occurred.

```tsx
import { Badge, Text } from '@mantine/core';
import { useScrollDirection } from '@mantine/hooks';

function Demo() {
  const direction = useScrollDirection();

  return (
    <>
      <Badge color={direction === 'up' ? 'teal' : direction === 'down' ? 'red' : 'gray'}>
        {direction === 'up' && '↑ Scrolling UP'}
        {direction === 'down' && '↓ Scrolling DOWN'}
        {direction === 'unknown' && 'Scroll to detect direction'}
      </Badge>
      <Text mt="xs">Scroll the page to see the scroll direction</Text>
    </>
  );
}
```


## Definition

```tsx
function useScrollDirection(): 'up' | 'down' | 'unknown';
```


--------------------------------------------------------------------------------

### useScrollIntoView
Package: @mantine/hooks
Import: import { UseScrollIntoView } from '@mantine/hooks';

## Usage

The `use-scroll-into-view` hook handles scroll behavior for any scrollable element. Basic usage works the same way as `element.scrollIntoView()`.
The hook adjusts the scrolling animation with respect to the `reduced-motion` user preference.

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Group, Box } from '@mantine/core';

function Demo() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  return (
    <Group justify="center">
      <Button
        onClick={() =>
          scrollIntoView({
            alignment: 'center',
          })
        }
      >
        Scroll to target
      </Button>
      <Box
        style={{
          width: '100%',
          height: '50vh',
          backgroundColor: 'var(--mantine-color-blue-light)',
        }}
      />
      <Text ref={targetRef}>Hello there</Text>
    </Group>
  );
}
```


## API

The hook is configured with a settings object:

* `onScrollFinish` – function that will be called after the scroll animation
* `onScrollCancel` – function that will be called when the scroll animation is canceled by user interaction
* `easing` – custom math easing function
* `duration` - duration of the scroll animation in milliseconds
* `axis` - axis of the scroll
* `cancelable` - indicator if the animation may be interrupted by user scrolling
* `offset` - additional distance between the nearest edge and the element
* `isList` - indicator that prevents content jumping in scrolling lists with multiple targets, for example Select, Carousel

The hook returns an object with:

* `scrollIntoView` – function that starts the scroll animation
* `cancel` – function that stops the scroll animation
* `scrolling` – boolean indicating whether a scroll animation is in progress
* `targetRef` - ref of the target HTML node
* `scrollableRef` - ref of the scrollable parent HTML element; if not used, the document element will be used

The returned `scrollIntoView` function accepts a single optional argument `alignment` - optional target element alignment relative to the parent based on the current axis.

```tsx
import { useScrollIntoView } from '@mantine/hooks';

const { scrollIntoView } = useScrollIntoView();

scrollIntoView({ alignment: 'center' });
```

## Easing

The hook accept custom `easing` math function to control the flow of animation.
It takes `t` argument, which is a number between `0` and `1`.

Default easing is `easeInOutQuad` - more info [here](https://easings.net/#easeInOutQuad).
You can find other popular examples on [easings.net](https://easings.net/)

```tsx
import { useScrollIntoView } from '@mantine/hooks';

useScrollIntoView({
  easing: (t) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2), // easeInOutQuint
});
```

## Parent node

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Group, Paper, Box } from '@mantine/core';

function Demo() {
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >();

  return (
    <Group justify="center">
      <Paper ref={scrollableRef} h={300} style={{ overflowY: 'scroll', flex: 1 }}>
        <Box pt={260} pb={450}>
          <Paper
            ref={targetRef}
            p="xl"
            style={{
              backgroundColor: 'var(--mantine-color-blue-light)',
              width: '100%',
            }}
          >
            <Text>Scroll me into view</Text>
          </Paper>
        </Box>
      </Paper>
      <Button onClick={() => scrollIntoView()}>Scroll to target</Button>
    </Group>
  );
}
```


## Scroll X axis

```tsx
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Text, Group, Paper, Box } from '@mantine/core';

function Demo() {
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({ axis: 'x' });

  return (
    <Group justify="center">
      <Paper ref={scrollableRef} h={150} w={300} style={{ overflowX: 'scroll' }}>
        <Box pl={260} pr={450}>
          <Paper
            ref={targetRef}
            p="md"
            style={{
              backgroundColor: 'var(--mantine-color-blue-light)',
              width: 'max-content',
            }}
          >
            <Text>Scroll me into view</Text>
          </Paper>
        </Box>
      </Paper>
      <Button onClick={() => scrollIntoView()}>Scroll to target</Button>
    </Group>
  );
}
```


## Definition

```tsx
interface UseScrollIntoViewAnimation {
  /** Target element alignment relatively to parent based on current axis */
  alignment?: 'start' | 'end' | 'center';
}

interface UseScrollIntoViewOptions {
  /** Callback fired after scroll */
  onScrollFinish?: () => void;

  /** Callback fired when scroll animation is canceled by user interaction */
  onScrollCancel?: () => void;

  /** Duration of scroll in milliseconds */
  duration?: number;

  /** Axis of scroll */
  axis?: 'x' | 'y';

  /** Custom mathematical easing function */
  easing?: (t: number) => number;

  /** Additional distance between nearest edge and element */
  offset?: number;

  /** Indicator if animation may be interrupted by user scrolling */
  cancelable?: boolean;

  /** Prevents content jumping in scrolling lists with multiple targets */
  isList?: boolean;
}

export interface UseScrollIntoViewReturnValue<
  Target extends HTMLElement = any,
  Parent extends HTMLElement | null = null,
> {
  scrollableRef: React.RefObject<Parent | null>;
  targetRef: React.RefObject<Target | null>;
  scrollIntoView: (params?: UseScrollIntoViewAnimation) => void;
  cancel: () => void;
  scrolling: boolean;
}

function useScrollIntoView<
  Target extends HTMLElement = any,
  Parent extends HTMLElement | null = null
>(
  options?: UseScrollIntoViewOptions,
): UseScrollIntoViewReturnValue<Target, Parent>
```

## Exported types

`UseScrollIntoViewOptions` and `UseScrollIntoViewReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseScrollIntoViewOptions, UseScrollIntoViewReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useScrollSpy
Package: @mantine/hooks
Import: import { UseScrollSpy } from '@mantine/hooks';

## Usage

The `use-scroll-spy` hook tracks the scroll position and returns the index of the
element that is currently in the viewport. It is useful for creating
table of contents components (like in the mantine.dev sidebar on the right side)
and similar features.

```tsx
import { Text, UnstyledButton } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';

function Demo() {
  const spy = useScrollSpy({
    selector: '#mdx :is(h1, h2, h3, h4, h5, h6)',
  });

  const headings = spy.data.map((heading, index) => (
    <li
      key={heading.id}
      style={{
        listStylePosition: 'inside',
        paddingInlineStart: heading.depth * 20,
        background: index === spy.active ? 'var(--mantine-color-blue-light)' : undefined,
      }}
    >
      <UnstyledButton onClick={() => heading.getNode().scrollIntoView()}>
        {heading.value}
      </UnstyledButton>
    </li>
  ));

  return (
    <div>
      <Text>Scroll to heading:</Text>
      <ul style={{ margin: 0, padding: 0 }}>{headings}</ul>
    </div>
  );
}
```


## Hook options

The `use-scroll-spy` hook accepts an object with options:

* `selector` - selector to get headings; by default it is `'h1, h2, h3, h4, h5, h6'`
* `getDepth` - a function to retrieve the depth of a heading; by default depth is calculated based on the tag name
* `getValue` - a function to retrieve the heading value; by default `element.textContent` is used
* `scrollHost` - host element to attach scroll event listener, if not provided, `window` is used
* `offset` - offset from the top of the viewport to use when determining the active heading, by default `0` is used

Example of using custom options to get headings with the `data-heading` attribute:

```tsx
import { Text, UnstyledButton } from '@mantine/core';
import { useScrollSpy } from '@mantine/hooks';

function Demo() {
  const spy = useScrollSpy({
    selector: '#mdx [data-heading]',
    getDepth: (element) => Number(element.getAttribute('data-order')),
    getValue: (element) => element.getAttribute('data-heading') || '',
  });

  const headings = spy.data.map((heading, index) => (
    <li
      key={heading.id}
      style={{
        listStylePosition: 'inside',
        paddingInlineStart: heading.depth * 20,
        background: index === spy.active ? 'var(--mantine-color-blue-light)' : undefined,
      }}
    >
      <UnstyledButton onClick={() => heading.getNode().scrollIntoView()}>
        {heading.value}
      </UnstyledButton>
    </li>
  ));

  return (
    <div>
      <Text>Scroll to heading:</Text>
      <ul style={{ margin: 0, padding: 0 }}>{headings}</ul>
    </div>
  );
}
```


## Reinitializing hook data

By default, `use-scroll-spy` does not track changes in the DOM. If you want
to update the headings data after the parent component has mounted, you can use
the `reinitialize` function:

```tsx
import { useEffect } from 'react';
import { useScrollSpy } from '@mantine/hooks';

function Demo({ dependency }) {
  const { reinitialize } = useScrollSpy();

  useEffect(() => {
    reinitialize();
  }, [dependency]);

  return null;
}
```

## Definition

All types used in the definition are exported from `@mantine/hooks` package.

```tsx
interface UseScrollSpyHeadingData {
  /** Heading depth, 1-6 */
  depth: number;

  /** Heading text content value */
  value: string;

  /** Heading id */
  id: string;

  /** Function to get heading node */
  getNode: () => HTMLElement;
}

interface UseScrollSpyOptions {
  /** Selector to get headings, `'h1, h2, h3, h4, h5, h6'` by default */
  selector?: string;

  /** A function to retrieve depth of heading, by default depth is calculated based on tag name */
  getDepth?: (element: HTMLElement) => number;

  /** A function to retrieve heading value, by default `element.textContent` is used */
  getValue?: (element: HTMLElement) => string;

  /** Host element to attach scroll event listener, if not provided, `window` is used */
  scrollHost?: HTMLElement;

  /** Offset from the top of the viewport to use when determining the active heading, `0` by default */
  offset?: number;
}

interface UseScrollSpyReturnValue {
  /** Index of the active heading in the `data` array */
  active: number;

  /** Headings data. If not initialize, data is represented by an empty array. */
  data: UseScrollSpyHeadingData[];

  /** True if headings value have been retrieved from the DOM. */
  initialized: boolean;

  /** Function to update headings values after the parent component has mounted. */
  reinitialize: () => void;
}

function useScrollSpy(options?: UseScrollSpyOptions): UseScrollSpyReturnValue
```

## Exported types

`UseScrollSpyOptions` and `UseScrollSpyReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseScrollSpyOptions, UseScrollSpyReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useScroller
Package: @mantine/hooks
Import: import { UseScroller } from '@mantine/hooks';

## Usage

The `use-scroller` hook manages horizontal scroll behavior for a container element.
It provides scroll state (whether content can be scrolled in either direction),
scroll functions, and drag-to-scroll functionality.

```tsx
import { Box, Button, Group } from '@mantine/core';
import { useScroller } from '@mantine/hooks';

function Demo() {
  const scroller = useScroller();

  return (
    <Box>
      <Group mb="md">
        <Button
          onClick={scroller.scrollStart}
          disabled={!scroller.canScrollStart}
          variant="default"
          size="xs"
        >
          ← Scroll left
        </Button>
        <Button
          onClick={scroller.scrollEnd}
          disabled={!scroller.canScrollEnd}
          variant="default"
          size="xs"
        >
          Scroll right →
        </Button>
      </Group>

      <div
        ref={scroller.ref}
        {...scroller.dragHandlers}
        style={{
          overflow: 'auto',
          cursor: scroller.isDragging ? 'grabbing' : 'grab',
        }}
      >
        <Group wrap="nowrap" gap="md">
          {Array.from({ length: 20 }).map((_, index) => (
            <Box
              key={index}
              style={{
                minWidth: 100,
                height: 80,
                backgroundColor: 'var(--mantine-color-blue-filled)',
                borderRadius: 'var(--mantine-radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 500,
              }}
            >
              {index + 1}
            </Box>
          ))}
        </Group>
      </div>
    </Box>
  );
}
```


## Scroll amount

Use `scrollAmount` option to control how many pixels the content scrolls
when `scrollStart` or `scrollEnd` functions are called. Default value is `200`:

```tsx
import { Box, Button, Group, Text } from '@mantine/core';
import { useScroller } from '@mantine/hooks';

function Demo() {
  const scroller = useScroller({ scrollAmount: 400 });

  return (
    <Box>
      <Group mb="md" justify="space-between">
        <Group>
          <Button
            onClick={scroller.scrollStart}
            disabled={!scroller.canScrollStart}
            variant="default"
            size="xs"
          >
            ← Scroll left
          </Button>
          <Button
            onClick={scroller.scrollEnd}
            disabled={!scroller.canScrollEnd}
            variant="default"
            size="xs"
          >
            Scroll right →
          </Button>
        </Group>
        <Text size="sm" c="dimmed">scrollAmount: 400px</Text>
      </Group>

      <div
        ref={scroller.ref}
        {...scroller.dragHandlers}
        style={{
          overflow: 'auto',
          cursor: scroller.isDragging ? 'grabbing' : 'grab',
        }}
      >
        <Group wrap="nowrap" gap="md">
          {Array.from({ length: 20 }).map((_, index) => (
            <Box
              key={index}
              style={{
                minWidth: 100,
                height: 80,
                backgroundColor: 'var(--mantine-color-blue-filled)',
                borderRadius: 'var(--mantine-radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 500,
              }}
            >
              {index + 1}
            </Box>
          ))}
        </Group>
      </div>
    </Box>
  );
}
```


## Draggable

Use `draggable` option to enable or disable drag-to-scroll functionality.
When `draggable` is `true` (default), users can click and drag to scroll the content:

```tsx
import { Box, Button, Group, Text } from '@mantine/core';
import { useScroller } from '@mantine/hooks';

function Demo() {
  const scroller = useScroller({ draggable: false });

  return (
    <Box>
      <Group mb="md" justify="space-between">
        <Group>
          <Button
            onClick={scroller.scrollStart}
            disabled={!scroller.canScrollStart}
            variant="default"
            size="xs"
          >
            ← Scroll left
          </Button>
          <Button
            onClick={scroller.scrollEnd}
            disabled={!scroller.canScrollEnd}
            variant="default"
            size="xs"
          >
            Scroll right →
          </Button>
        </Group>
        <Text size="sm" c="dimmed">draggable: false</Text>
      </Group>

      <div
        ref={scroller.ref}
        style={{
          overflow: 'auto',
        }}
      >
        <Group wrap="nowrap" gap="md">
          {Array.from({ length: 20 }).map((_, index) => (
            <Box
              key={index}
              style={{
                minWidth: 100,
                height: 80,
                backgroundColor: 'var(--mantine-color-blue-filled)',
                borderRadius: 'var(--mantine-radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 500,
              }}
            >
              {index + 1}
            </Box>
          ))}
        </Group>
      </div>
    </Box>
  );
}
```


## Scroller component

If you prefer component API, you can use [Scroller](https://mantine.dev/llms/core-scroller.md) component.
It provides the same functionality with additional styling and control button features.

```tsx
import { Badge, Group, Scroller } from '@mantine/core';

function Demo() {
  return (
    <Scroller>
      <Group gap="xs" wrap="nowrap">
        {Array.from({ length: 20 }).map((_, index) => (
          <Badge key={index} variant="light" size="lg">
            Badge {index + 1}
          </Badge>
        ))}
      </Group>
    </Scroller>
  );
}
```


## Definition

```tsx
function useScroller<T extends HTMLElement = HTMLDivElement>(
  options?: UseScrollerOptions
): UseScrollerReturnValue<T>;

interface UseScrollerOptions {
  /** Amount of pixels to scroll when calling scroll functions, `200` by default */
  scrollAmount?: number;

  /** Determines whether content can be scrolled by dragging with mouse, `true` by default */
  draggable?: boolean;

  /** Called when scroll state changes (canScrollStart or canScrollEnd) */
  onScrollStateChange?: (state: UseScrollerScrollState) => void;
}

interface UseScrollerScrollState {
  /** Whether content can be scrolled towards the start (left in LTR, right in RTL) */
  canScrollStart: boolean;

  /** Whether content can be scrolled towards the end (right in LTR, left in RTL) */
  canScrollEnd: boolean;
}

interface UseScrollerReturnValue<T extends HTMLElement = HTMLDivElement> {
  /** Ref callback to attach to the scrollable container element */
  ref: RefCallback<T | null>;

  /** Whether content can be scrolled towards the start */
  canScrollStart: boolean;

  /** Whether content can be scrolled towards the end */
  canScrollEnd: boolean;

  /** Scrolls towards the start direction */
  scrollStart: () => void;

  /** Scrolls towards the end direction */
  scrollEnd: () => void;

  /** `true` if the user is currently dragging the content */
  isDragging: boolean;

  /** Props to spread on the scrollable container for drag functionality */
  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
  };
}
```

## Exported types

`UseScrollerOptions`, `UseScrollerReturnValue` and `UseScrollerScrollState` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type {
  UseScrollerOptions,
  UseScrollerReturnValue,
  UseScrollerScrollState,
} from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useSelection
Package: @mantine/hooks
Import: import { UseSelection } from '@mantine/hooks';

## Usage

```tsx
import { Checkbox, Table } from '@mantine/core';
import { useSelection } from '@mantine/hooks';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function Demo() {
  const positions = useMemo(() => elements.map((element) => element.position), [elements]);

  const [selection, handlers] = useSelection({
    data: positions,
    defaultSelection: [39, 56],
  });

  const rows = elements.map((element) => {
    const isSelected = selection.includes(element.position);
    return (
      <Table.Tr key={element.name} bg={isSelected ? 'var(--mantine-color-blue-light)' : undefined}>
        <Table.Td>
          <Checkbox
            aria-label="Select row"
            checked={isSelected}
            onChange={(event) => {
              if (event.target.checked) {
                handlers.select(element.position);
              } else {
                handlers.deselect(element.position);
              }
            }}
          />
        </Table.Td>
        <Table.Td>{element.position}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.symbol}</Table.Td>
        <Table.Td>{element.mass}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <Checkbox
              aria-label="Select deselect all rows"
              indeterminate={handlers.isSomeSelected()}
              checked={handlers.isAllSelected()}
              onChange={() => {
                if (handlers.isAllSelected()) {
                  handlers.resetSelection();
                } else {
                  handlers.setSelection(elements.map((el) => el.position));
                }
              }}
            />
          </Table.Th>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
```


## Definition

```tsx
export interface UseSelectionInput<T> {
  /** The array of items to select from */
  data: T[];

  /** The initial selection, empty array by default */
  defaultSelection?: T[];

  /** If true, selection is reset when data changes */
  resetSelectionOnDataChange?: boolean;
}

export interface UseSelectionHandlers<T> {
  /** Add an item to the selection */
  select: (selected: T) => void;

  /** Remove an item from the selection */
  deselect: (deselected: T) => void;

  /** Toggle an item's selection state */
  toggle: (toggled: T) => void;

  /** Returns true if all items from the `data` are selected */
  isAllSelected: () => boolean;

  /** Returns true if at least one item from the `data` is selected */
  isSomeSelected: () => boolean;

  /** Set the selection to a specific array of items */
  setSelection: (selection: T[]) => void;

  /** Clear all selections */
  resetSelection: () => void;
}

export type UseSelectionReturnValue<T> = readonly [T[], UseSelectionHandlers<T>];

function useSelection<T>(input: UseSelectionInput<T>): UseSelectionReturnValue<T>
```

## Exported types

`UseSelectionInput`, `UseSelectionReturnValue` and `UseSelectionHandlers` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseSelectionInput, UseSelectionReturnValue, UseSelectionHandlers } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useSetState
Package: @mantine/hooks
Import: import { UseSetState } from '@mantine/hooks';

## Usage

The `use-set-state` hook works similarly to how `this.setState` works in class components – it shallow merges the state partial
into the current state.

```tsx
import { useSetState } from '@mantine/hooks';

const [state, setState] = useSetState({
  name: 'John',
  age: 35,
  job: 'Engineer',
});

state; // -> { name: 'John', age: 35, job: 'Engineer' }

setState({ name: 'Jane' }); // -> { name: 'Jane', age: 35, job: 'Engineer' }
setState({ age: 25, job: 'Manager' }); // -> { name: 'Jane', age: 25, job: 'Manager' }
setState((current) => ({ age: current.age + 7 })); // -> { name: 'Jane', age: 32, job: 'Manager' }
```

Note that it can work only with objects; primitive values and arrays are not supported:

```tsx
import { useSetState } from '@mantine/hooks';

useSetState([1, 2, 3]); // -> will not work
useSetState(1); // -> will not work
useSetState({ skills: ['JavaScript', 'TypeScript'] }); // -> works fine
```

## Definition

```tsx
type UseSetStateCallback<T> = (
  state: Partial<T> | ((currentState: T) => Partial<T>)
) => void;

type UseSetStateReturnValue<T> = [T, UseSetStateCallback<T>];

function useSetState<T extends Record<string, any>>(initialState: T): UseSetStateReturnValue<T>
```

## Exported types

`UseSetStateCallback` and `UseSetStateReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseSetStateCallback, UseSetStateReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useSet
Package: @mantine/hooks
Import: import { UseSet } from '@mantine/hooks';

## Usage

The `useSet` hook returns a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
object that can be used as React state: the `add`, `clear`, and `delete` methods trigger state updates.

```tsx
import { useState } from 'react';
import { Code, Stack, TextInput } from '@mantine/core';
import { useSet } from '@mantine/hooks';

function Demo() {
  const [input, setInput] = useState('');
  const scopes = useSet<string>(['@mantine', '@mantine-tests', '@mantinex']);

  const isDuplicate = scopes.has(input.trim().toLowerCase());

  const items = Array.from(scopes).map((scope) => <Code key={scope}>{scope}</Code>);

  return (
    <>
      <TextInput
        label="Add new scope"
        placeholder="Enter scope"
        description="Duplicate scopes are not allowed"
        value={input}
        onChange={(event) => setInput(event.currentTarget.value)}
        error={isDuplicate && 'Scope already exists'}
        onKeyDown={(event) => {
          if (event.nativeEvent.code === 'Enter' && !isDuplicate) {
            scopes.add(input.trim().toLowerCase());
            setInput('');
          }
        }}
      />

      <Stack gap={5} align="flex-start" mt="md">
        {items}
      </Stack>
    </>
  );
}
```


## Definition

```tsx
function useSet<T>(values?: T[]): Set<T>;
```


--------------------------------------------------------------------------------

### useShallowEffect
Package: @mantine/hooks
Import: import { UseShallowEffect } from '@mantine/hooks';

## Usage

The `use-shallow-effect` hook works exactly like `useEffect`, but performs shallow dependency comparison instead of referential comparison:

```tsx
import { useEffect } from 'react';
import { useShallowEffect } from '@mantine/hooks';

// Will be called on each render
useEffect(() => {}, [{ a: 1 }]);

// Will be called only once
useShallowEffect(() => {}, [{ a: 1 }]);
```

The hook works with primitive values, arrays, and objects:

```tsx
import { useShallowEffect } from '@mantine/hooks';

// Primitive values are handled like in useEffect
useShallowEffect(() => {}, [1, 2, 3]);

// Arrays with primitive values will not trigger callback
useShallowEffect(() => {}, [[1], [2], [3]]);

// Objects with primitive values will not trigger callback
useShallowEffect(() => {}, [{ a: 1 }, { b: 2 }]);

// Arrays with objects will trigger the callback since values are not shallow equal
useShallowEffect(() => {}, [[{ a: 1 }], [{ b: 2 }]]);
```

## Definition

```tsx
function useShallowEffect(
  cb: () => void,
  dependencies?: React.DependencyList
): void;
```


--------------------------------------------------------------------------------

### useStateHistory
Package: @mantine/hooks
Import: import { UseStateHistory } from '@mantine/hooks';

## Usage

The `useStateHistory` hook creates a state with history. It returns the current value, handlers to
go back/forward, and a history object with all previous values and the current index.

```tsx
import { Button, Code, Group, Text } from '@mantine/core';
import { useStateHistory } from '@mantine/hooks';

function Demo() {
  const [value, handlers, history] = useStateHistory(1);
  return (
    <>
      <Text>Current value: {value}</Text>
      <Group my="md">
        <Button onClick={() => handlers.set(Math.ceil(Math.random() * 100) + 1)}>Set value</Button>
        <Button onClick={() => handlers.back()}>Back</Button>
        <Button onClick={() => handlers.forward()}>Forward</Button>
        <Button onClick={() => handlers.reset()}>Reset</Button>
      </Group>
      <Code block>{JSON.stringify(history, null, 2)}</Code>
    </>
  );
}
```


## Definition

The `UseStateHistoryHandlers` and `UseStateHistoryValue` interfaces are exported from the `@mantine/hooks`
package.

```tsx
interface UseStateHistoryHandlers<T> {
  set: (value: T) => void;
  back: (steps?: number) => void;
  forward: (steps?: number) => void;
  reset: () => void;
}

interface UseStateHistoryValue<T> {
  history: T[];
  current: number;
}

type UseStateHistoryReturnValue<T> = [
  T,
  UseStateHistoryHandlers<T>,
  UseStateHistoryValue<T>,
];

function useStateHistory<T>(initialValue: T): UseStateHistoryReturnValue<T>;
```

## Exported types

The `UseStateHistoryHandlers`, `UseStateHistoryReturnValue`, and `UseStateHistoryValue` types are exported from `@mantine/hooks`;

```tsx
import type { UseStateHistoryHandlers, UseStateHistoryReturnValue, UseStateHistoryValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useTextSelection
Package: @mantine/hooks
Import: import { UseTextSelection } from '@mantine/hooks';

## Usage

The `use-text-selection` hook returns the current text selection:

```tsx
import { useTextSelection } from '@mantine/hooks';

function Demo() {
  const selection = useTextSelection();
  return (
    <>
      <div>Select some text here or anywhere on the page and it will be displayed below</div>
      <div>Selected text: {selection?.toString()}</div>
    </>
  );
}
```


## Definition

```tsx
function useTextSelection(): Selection | null;
```


--------------------------------------------------------------------------------

### useThrottledCallback
Package: @mantine/hooks
Import: import { UseThrottledCallback } from '@mantine/hooks';

## Usage

The `useThrottledCallback` hook accepts a function and a wait time in milliseconds.
It returns a throttled version of the function that will only be called at most once every `wait` milliseconds.

```tsx
import { Text, TextInput } from '@mantine/core';
import { useThrottledCallback } from '@mantine/hooks';

function Demo() {
  const [throttledValue, setValue] = useState('');
  const throttledSetValue = useThrottledCallback((value) => setValue(value), 1000);

  return (
    <>
      <TextInput
        placeholder="Search"
        onChange={(event) => throttledSetValue(event.currentTarget.value)}
      />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}
```


## Definition

```tsx
function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  wait: number
): (...args: Parameters<T>) => void;
```


--------------------------------------------------------------------------------

### useThrottledState
Package: @mantine/hooks
Import: import { UseThrottledState } from '@mantine/hooks';

## Usage

The `useThrottledState` hook works similarly to `useState` but throttles state updates.
The `setThrottledState` handler in the example below will be called at most once every 1000ms.

```tsx
import { Text, TextInput } from '@mantine/core';
import { useThrottledState } from '@mantine/hooks';

function Demo() {
  const [throttledValue, setThrottledValue] = useThrottledState('', 1000);

  return (
    <>
      <TextInput
        placeholder="Search"
        onChange={(event) => setThrottledValue(event.currentTarget.value)}
      />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}
```


## Definition

```tsx
function useThrottledState<T = any>(
  defaultValue: T,
  wait: number
): readonly [T, (newValue: React.SetStateAction<T>) => void];
```


--------------------------------------------------------------------------------

### useThrottledValue
Package: @mantine/hooks
Import: import { UseThrottledValue } from '@mantine/hooks';

## Usage

The `useThrottledValue` hook accepts a value and a wait time in milliseconds.
It returns a throttled value that cannot change more than once every `wait` milliseconds.

```tsx
import { Text, TextInput } from '@mantine/core';
import { useThrottledValue } from '@mantine/hooks';

function Demo() {
  const [value, setValue] = useState('');
  const throttledValue = useThrottledValue(value, 1000);

  return (
    <>
      <TextInput placeholder="Search" onChange={(event) => setValue(event.currentTarget.value)} />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}
```


## Definition

```tsx
function useThrottledValue<T>(value: T, wait: number): T;
```


--------------------------------------------------------------------------------

### useTimeout
Package: @mantine/hooks
Import: import { UseTimeout } from '@mantine/hooks';

## Usage

```tsx
import { useState } from 'react';
import { Button, Text, Group } from '@mantine/core';
import { randomId, useTimeout } from '@mantine/hooks';

function Demo() {
  const [value, setValue] = useState('');
  const { start, clear } = useTimeout(() => setValue(randomId()), 1000);

  return (
    <Group>
      <Button onClick={start}>Start</Button>
      <Button onClick={clear} color="red">
        Clear
      </Button>
      <Text>Random value: {value}</Text>
    </Group>
  );
}
```


## API

```tsx
import { useTimeout } from '@mantine/hooks';

const { start, clear } = useTimeout(callback, delay, {
  autoInvoke: true,
});
```

Arguments:

* `callback` – function that will be called after the timer elapses
* `delay` – number of milliseconds the timer should wait before the specified function is executed
* `options: { autoInvoke }` – determines whether the timer should be started on mount; defaults to false

Return object:

* `start` – starts the timer
* `clear` – cancels the timer

## Definition

```tsx
interface UseTimeoutOptions {
  autoInvoke: boolean;
}

interface UseTimeoutReturnValue {
  start: (...args: any[]) => void;
  clear: () => void;
}

function useTimeout(
  callback: (...args: any[]) => void,
  delay: number,
  options?: UseTimeoutOptions,
): UseTimeoutReturnValue
```

## Exported types

The `UseTimeoutOptions` and `UseTimeoutReturnValue` types are exported from `@mantine/hooks`;

```tsx
import type { UseTimeoutOptions, UseTimeoutReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useToggle
Package: @mantine/hooks
Import: import { UseToggle } from '@mantine/hooks';

## Usage

The `use-toggle` hook implements a common state pattern – it switches state between given values:

```tsx
import { Button } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

function Demo() {
  const [value, toggle] = useToggle(['blue', 'orange', 'cyan', 'teal']);

  return (
    <Button color={value} onClick={() => toggle()}>
      {value}
    </Button>
  );
}
```


## API

The hook accepts an array as a single argument; the first option will be used as the default value.

The hook returns an array with the state value and toggle function:

```tsx
import { useToggle } from '@mantine/hooks';

const [value, toggle] = useToggle(['light', 'dark'] as const);

toggle(); // -> value == 'dark'
toggle(); // -> value == 'light'

// You can force a specific value; in this case, state will be set to the given value
toggle('dark'); // -> value == 'dark'
```

If you do not provide an array with options, then `use-toggle` will use boolean values with `false` as the default:

```tsx
import { useToggle } from '@mantine/hooks';

const [value, toggle] = useToggle();
// -> value === false
toggle(); // -> value === true
```

## Set type

By default, TypeScript will guess your type, but in most cases it's better to use const assertion to prevent type widening:

```tsx
import { useToggle } from '@mantine/hooks';

useToggle(['light', 'dark']); // value is string
useToggle(['light', 'dark'] as const); // value is 'dark' | 'light'
useToggle<'dark' | 'light'>(['light', 'dark']); // same as above
```

## Definition

```tsx
type UseToggleAction<T> = (value?: React.SetStateAction<T>) => void;
type UseToggleReturnValue<T> = [T, UseToggleAction<T>];

function useToggle<T = boolean>(options?: T[]): UseToggleReturnValue<T>;
```

## Exported types

The `UseToggleReturnValue` type is exported from `@mantine/hooks`;

```tsx
import type { UseToggleReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useUncontrolled
Package: @mantine/hooks
Import: import { UseUncontrolled } from '@mantine/hooks';

## Usage

The `use-uncontrolled` hook manages state for both controlled and uncontrolled components:

```tsx
import { useUncontrolled } from '@mantine/hooks';

interface CustomInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function CustomInput({
  value,
  defaultValue,
  onChange,
}: CustomInputProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 'Final',
    onChange,
  });

  return (
    <input
      type="text"
      value={_value}
      onChange={(event) => handleChange(event.currentTarget.value)}
    />
  );
}
```

## Set value type

By default, the hook will set the type automatically, but you can provide your own type:

```tsx
import { useUncontrolled } from '@mantine/hooks';

function Demo() {
  const [_value, handleChange] = useUncontrolled<number>({
    value: 10,
    defaultValue: 5,
    finalValue: 20,
    onChange: (val) => console.log(val > 10),
  });
}
```

## Definition

```tsx
interface UseUncontrolledOptions<T> {
  /** Value for controlled state */
  value?: T;

  /** Initial value for uncontrolled state */
  defaultValue?: T;

  /** Final value for uncontrolled state when value and defaultValue are not provided */
  finalValue?: T;

  /** Controlled state onChange handler */
  onChange?: (value: T, ...payload: any[]) => void;
}

type UseUncontrolledReturnValue<T> = [
  /** Current value */
  T,

  /** Handler to update the state, passes `value` and `payload` to `onChange` */
  (value: T, ...payload: any[]) => void,

  /** True if the state is controlled; false if uncontrolled */
  boolean,
];

function useUncontrolled<T>(input: UseUncontrolledOptions<T>): UseUncontrolledReturnValue<T>;
```

## Exported types

The `UseUncontrolledOptions` and `UseUncontrolledReturnValue` types are exported from `@mantine/hooks`;

```tsx
import type { UseUncontrolledOptions, UseUncontrolledReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useValidatedState
Package: @mantine/hooks
Import: import { UseValidatedState } from '@mantine/hooks';

## Usage

The `use-validated-state` hook validates state with a given rule each time the state is set.
It returns an object with the current validation state, last valid value, and current value:

```tsx
import { useValidatedState } from '@mantine/hooks';

const [{ lastValidValue, value, valid }, setValue] =
  useValidatedState('valid', (state) => state === 'valid');

lastValidValue; // -> valid
value; // -> valid
valid; // -> true

setValue('invalid');

lastValidValue; // -> valid
value; // -> invalid
valid; // -> false
```

## Example

```tsx
import { TextInput, Text, Box } from '@mantine/core';
import { useValidatedState } from '@mantine/hooks';

function Demo() {
  const [{ value, lastValidValue, valid }, setEmail] = useValidatedState(
    '',
    (val) => /^\\S+@\\S+$/.test(val),
    true
  );

  return (
    <Box maw={320} mx="auto" style={{ overflowWrap: 'break-word' }}>
      <TextInput
        value={value}
        onChange={(event) => setEmail(event.currentTarget.value)}
        withAsterisk
        error={!valid}
        placeholder="email@example.com"
        label="Your email"
      />

      <Text size="sm" mt="md">
        <Text inherit c="dimmed" component="span">
          Current value:
        </Text>{' '}
        {value || '[empty string]'}
      </Text>

      <Text size="sm">
        <Text inherit c="dimmed" component="span">
          Last valid value:
        </Text>{' '}
        {lastValidValue || '[empty string]'}
      </Text>
    </Box>
  );
}
```


## Definition

```tsx
interface UseValidatedStateValue<T> {
  /** Current value */
  value: T;

  /** Last valid value */
  lastValidValue: T | undefined;

  /** True if the current value is valid; false otherwise */
  valid: boolean;
}

type UseValidatedStateReturnValue<T> = [
  /** Current value */
  UseValidatedStateValue<T>,
  /** Handler to update the state, passes `value` and `payload` to `onChange` */
  (value: T) => void,
];

function useValidatedState<T>(
  initialValue: T,
  validate: (value: T) => boolean,
  initialValidationState?: boolean,
): UseValidatedStateReturnValue<T>
```

## Exported types

The `UseValidatedStateValue` and `UseValidatedStateReturnValue` types are exported from `@mantine/hooks`;

```tsx
import type { UseValidatedStateValue, UseValidatedStateReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useViewportSize
Package: @mantine/hooks
Import: import { UseViewportSize } from '@mantine/hooks';

## Usage

The `use-viewport-size` hook returns the current viewport's `width` and `height`. It subscribes to `resize` and `orientationchange` events.
During SSR, the hook will return `{ width: 0, height: 0 }`:

```tsx
import { useViewportSize } from '@mantine/hooks';

function Demo() {
  const { height, width } = useViewportSize();
  return <>Width: {width}, height: {height}</>;
}
```


## Definition

```tsx
function useViewportSize(): {
  height: number;
  width: number;
};
```


--------------------------------------------------------------------------------

### useWindowEvent
Package: @mantine/hooks
Import: import { UseWindowEvent } from '@mantine/hooks';

## Usage

The `use-window-event` hook adds an event listener to the `window` object on component mount and removes it on unmount:

```tsx
import { useEffect } from 'react';
import { useWindowEvent } from '@mantine/hooks';

const handler = (event: KeyboardEvent) => console.log(event);

// regular way
useEffect(() => {
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);

// with use-window-event hook
useWindowEvent('keydown', handler);
```

## Example

Search focus with `⌘ + K` on macOS or `Ctrl + K` on Windows and Linux on the Mantine docs website:

```tsx
import { useRef } from 'react';
import { useWindowEvent } from '@mantine/hooks';

function Demo() {
  const inputRef = useRef<HTMLInputElement>(null);

  useWindowEvent('keydown', (event) => {
    if (event.code === 'KeyK' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      inputRef.current?.focus();
    }
  });

  return <input ref={inputRef} />;
}
```

## Definition

The hook has the same definition as `window.addEventListener` function:

```tsx
function useWindowEvent<K extends string>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions
): void;
```


--------------------------------------------------------------------------------

### useWindowScroll
Package: @mantine/hooks
Import: import { UseWindowScroll } from '@mantine/hooks';

## Usage

The `use-window-scroll` hook returns the current scroll position and a function to scroll smoothly to a given position:

```tsx
import { useWindowScroll } from '@mantine/hooks';
import { Button, Text, Group } from '@mantine/core';

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Group justify="center">
      <Text>
        Scroll position x: {scroll.x}, y: {scroll.y}
      </Text>
      <Button onClick={() => scrollTo({ y: 0 })}>Scroll to top</Button>
    </Group>
  );
}
```


## Definition

```tsx
interface UseWindowScrollPosition {
  x: number;
  y: number;
}

type UseWindowScrollTo = (position: Partial<UseWindowScrollPosition>) => void;
type UseWindowScrollReturnValue = [UseWindowScrollPosition, UseWindowScrollTo];

function useWindowScroll(): UseWindowScrollReturnValue;
```

## Exported types

The `UseWindowScrollTo`, `UseWindowScrollPosition`, and `UseWindowScrollReturnValue` types are exported from `@mantine/hooks`;

```tsx
import type { UseWindowScrollTo, UseWindowScrollPosition, UseWindowScrollReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

## DATES COMPONENTS AND FEATURES
Primary Package: @mantine/dates

### Calendar
Package: @mantine/dates
Import: import { Calendar } from '@mantine/dates';
Description: Base component for custom date pickers

## Usage

Use the `Calendar` component to create custom date pickers if the [DatePicker](https://mantine.dev/llms/dates-date-picker.md)
component does not meet your requirements. `Calendar` supports all [DatePicker](https://mantine.dev/llms/dates-date-picker.md)
props and some additional props that are listed in the props table – check it out to learn about all component features.

By default, `Calendar` works the same way as the [DatePicker](https://mantine.dev/llms/dates-date-picker.md) component but does not
include any logic for date selection:

```tsx
import { Calendar } from '@mantine/dates';

function Demo() {
  return <Calendar />;
}
```


