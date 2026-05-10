## Scroll element into view

```tsx
import { useState, useRef } from 'react';
import { ScrollArea, UnstyledButton, TextInput } from '@mantine/core';

const groceries: string[] = [
  '🍎 Apples',
  '🍌 Bananas',
  '🍊 Oranges',
  '🥛 Milk',
  '🍞 Bread',
  '🥚 Eggs',
  '🍗 Chicken',
  '🥩 Beef',
  '🍝 Pasta',
  '🍚 Rice',
  '🥔 Potatoes',
  '🧅 Onions',
  '🍅 Tomatoes',
  '🥒 Cucumbers',
  '🥕 Carrots',
  '🥬 Lettuce',
  '🍃 Spinach',
  '🥦 Broccoli',
  '🧀 Cheese',
  '🍦 Yogurt',
  '🧈 Butter',
  '🍚 Sugar',
  '🧂 Salt',
  '🌶️ Pepper',
  '☕ Coffee',
  '🍵 Tea',
  '🥤 Juice',
  '💧 Water',
  '🍪 Cookies',
  '🍫 Chocolate',
];

function Demo() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [hovered, setHovered] = useState(-1);
  const filtered = groceries.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  const items = filtered.map((item, index) => (
    <UnstyledButton
      data-list-item
      key={item}
      display="block"
      bg={index === hovered ? 'var(--mantine-color-blue-light)' : undefined}
      w="100%"
      p={5}
    >
      {item}
    </UnstyledButton>
  ));

  return (
    <>
      <TextInput
        value={query}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
          setHovered(-1);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setHovered((current) => {
              const nextIndex = current + 1 >= filtered.length ? current : current + 1;
              viewportRef.current
                ?.querySelectorAll('[data-list-item]')
                ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
              return nextIndex;
            });
          }

          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setHovered((current) => {
              const nextIndex = current - 1 < 0 ? current : current - 1;
              viewportRef.current
                ?.querySelectorAll('[data-list-item]')
                ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
              return nextIndex;
            });
          }
        }}
        placeholder="Search groceries"
      />
      <ScrollArea h={150} type="always" mt="md" viewportRef={viewportRef}>
        {items}
      </ScrollArea>
    </>
  );
}
```


## ScrollArea.Autosize

`ScrollArea.Autosize` component allows to create scrollable containers when given max-height is reached.
It also supports a callback for detecting when vertical overflow occurs:

* onOverflowChange – triggered when content exceeds max-height, making the container scrollable or not

```tsx
import { useCounter } from '@mantine/hooks';
import { ScrollArea, Button, Group } from '@mantine/core';

const lorem =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta perspiciatis reiciendis voluptate eaque itaque quos. Natus iure tenetur libero, reprehenderit ad, sequi, in aliquam eos necessitatibus expedita delectus veniam culpa!';

function Demo() {
  const [count, handlers] = useCounter(3, { min: 0, max: 10 });
  const content = Array(count)
    .fill(0)
    .map((_, index) => <p key={index}>{lorem}</p>);

  return (
    <>
      <ScrollArea.Autosize mah={300} maw={400} mx="auto">
        {content}
      </ScrollArea.Autosize>

      <Group justify="center" mt="md">
        <Button color="red" onClick={handlers.decrement}>
          Remove paragraph
        </Button>
        <Button onClick={handlers.increment}>
          Add paragraph
        </Button>
      </Group>
    </>
  );
}
```


## ScrollArea.Autosize with Popover

```tsx
import { useState, useRef } from 'react';
import { ScrollArea, Popover, TextInput, UnstyledButton, Text, Box } from '@mantine/core';

const groceries = [
  'Apples',
  'Bananas',
  'Oranges',
  'Milk',
  'Bread',
  'Eggs',
  'Chicken',
  'Beef',
  'Pasta',
  'Rice',
  'Potatoes',
  'Onions',
  'Tomatoes',
  'Cucumbers',
  'Carrots',
  'Lettuce',
  'Spinach',
  'Broccoli',
  'Cheese',
  'Yogurt',
  'Butter',
  'Sugar',
  'Salt',
  'Pepper',
  'Coffee',
  'Tea',
  'Juice',
  'Water',
  'Cookies',
  'Chocolate',
];

function Demo() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [opened, setOpened] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const filtered = groceries.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  const items = filtered.map((item, index) => (
    <UnstyledButton
      data-list-item
      key={item}
      display="block"
      bg={index === hovered ? 'var(--mantine-color-blue-light)' : undefined}
      w="100%"
      p={5}
    >
      {item}
    </UnstyledButton>
  ));

  return (
    <Popover width="target" opened={opened}>
      <Popover.Target>
        <TextInput
          value={query}
          onFocus={() => setOpened(true)}
          onBlur={() => setOpened(false)}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setHovered(-1);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setHovered((current) => {
                const nextIndex = current + 1 >= filtered.length ? current : current + 1;
                viewportRef.current
                  ?.querySelectorAll('[data-list-item]')
                  ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                return nextIndex;
              });
            }

            if (event.key === 'ArrowUp') {
              event.preventDefault();
              setHovered((current) => {
                const nextIndex = current - 1 < 0 ? current : current - 1;
                viewportRef.current
                  ?.querySelectorAll('[data-list-item]')
                  ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                return nextIndex;
              });
            }
          }}
          placeholder="Search groceries"
        />
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <ScrollArea.Autosize viewportRef={viewportRef} mah={200} type="always" scrollbars="y">
          <Box px="xs" py={5}>
            {items.length > 0 ? items : <Text c="dimmed">Nothing found</Text>}
          </Box>
        </ScrollArea.Autosize>
      </Popover.Dropdown>
    </Popover>
  );
}
```



#### Props

**ScrollArea props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| offsetScrollbars | boolean \| "x" \| "y" \| "present" | - | Determines whether scrollbars should be offset with padding on given axis - `true` - adds padding to offset both scrollbars (always) - `'x'` - adds padding to offset horizontal scrollbar (always) - `'y'` - adds padding to offset vertical scrollbar (always) - `'present'` - adds padding only when scrollbars are visible (dynamic) |
| onBottomReached | () => void | - | Called when scrollarea is scrolled to the bottom (within 0.8px tolerance for sub-pixel rendering) |
| onLeftReached | () => void | - | Called when scrollarea is scrolled to the left (within 0.8px tolerance for sub-pixel rendering) |
| onRightReached | () => void | - | Called when scrollarea is scrolled to the right (within 0.8px tolerance for sub-pixel rendering) |
| onScrollPositionChange | (position: { x: number; y: number; }) => void | - | Called with current position (`x` and `y` coordinates) when viewport is scrolled |
| onTopReached | () => void | - | Called when scrollarea is scrolled all the way to the top |
| overscrollBehavior | OverscrollBehavior | - | Defines `overscroll-behavior` of the viewport |
| scrollHideDelay | number | - | Scroll hide delay in ms, applicable only when type is set to `hover` or `scroll` |
| scrollbarSize | string \| number | - | Scrollbar size, any valid CSS value for width/height, numbers are converted to rem, default value is 12px (0.75rem) |
| scrollbars | false \| "x" \| "y" \| "xy" | - | Axis at which scrollbars must be rendered - `'x'` - horizontal scrollbar only - `'y'` - vertical scrollbar only - `'xy'` - both scrollbars - `false` - no scrollbars rendered (content remains scrollable via mouse/touch) |
| startScrollPosition | { x?: number; y?: number \| undefined; } \| undefined | - | Initial scroll position set on mount |
| type | "auto" \| "scroll" \| "always" \| "hover" \| "never" | - | Defines scrollbars behavior - `'hover'` – scrollbars visible on hover (default) - `'scroll'` – scrollbars visible during scrolling - `'auto'` – scrollbars visible only when content overflows (like CSS overflow: auto) - `'always'` – scrollbars always visible, even when content doesn't overflow - `'never'` – scrollbars always hidden |
| viewportProps | React.ComponentProps<"div"> | - | Props passed down to the viewport element |
| viewportRef | Ref<HTMLDivElement> | - | Assigns viewport element (scrollable container) ref |

**ScrollArea.Autosize props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| offsetScrollbars | boolean \| "x" \| "y" \| "present" | - | Determines whether scrollbars should be offset with padding on given axis - `true` - adds padding to offset both scrollbars (always) - `'x'` - adds padding to offset horizontal scrollbar (always) - `'y'` - adds padding to offset vertical scrollbar (always) - `'present'` - adds padding only when scrollbars are visible (dynamic) |
| onBottomReached | () => void | - | Called when scrollarea is scrolled to the bottom (within 0.8px tolerance for sub-pixel rendering) |
| onLeftReached | () => void | - | Called when scrollarea is scrolled to the left (within 0.8px tolerance for sub-pixel rendering) |
| onOverflowChange | (overflowing: boolean) => void | - | Called when content overflows due to max-height, making the container scrollable |
| onRightReached | () => void | - | Called when scrollarea is scrolled to the right (within 0.8px tolerance for sub-pixel rendering) |
| onScrollPositionChange | (position: { x: number; y: number; }) => void | - | Called with current position (`x` and `y` coordinates) when viewport is scrolled |
| onTopReached | () => void | - | Called when scrollarea is scrolled all the way to the top |
| overscrollBehavior | OverscrollBehavior | - | Defines `overscroll-behavior` of the viewport |
| scrollHideDelay | number | - | Scroll hide delay in ms, applicable only when type is set to `hover` or `scroll` |
| scrollbarSize | string \| number | - | Scrollbar size, any valid CSS value for width/height, numbers are converted to rem, default value is 12px (0.75rem) |
| scrollbars | false \| "x" \| "y" \| "xy" | - | Axis at which scrollbars must be rendered - `'x'` - horizontal scrollbar only - `'y'` - vertical scrollbar only - `'xy'` - both scrollbars - `false` - no scrollbars rendered (content remains scrollable via mouse/touch) |
| startScrollPosition | { x?: number; y?: number \| undefined; } \| undefined | - | Initial scroll position set on mount |
| type | "auto" \| "scroll" \| "always" \| "hover" \| "never" | - | Defines scrollbars behavior - `'hover'` – scrollbars visible on hover (default) - `'scroll'` – scrollbars visible during scrolling - `'auto'` – scrollbars visible only when content overflows (like CSS overflow: auto) - `'always'` – scrollbars always visible, even when content doesn't overflow - `'never'` – scrollbars always hidden |
| viewportProps | React.ComponentProps<"div"> | - | Props passed down to the viewport element |
| viewportRef | Ref<HTMLDivElement> | - | Assigns viewport element (scrollable container) ref |


#### Styles API

ScrollArea component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ScrollArea selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-ScrollArea-root | Root element |
| content | .mantine-ScrollArea-content | Wraps component children |
| viewport | .mantine-ScrollArea-viewport | Main scrollable area |
| scrollbar | .mantine-ScrollArea-scrollbar | Horizontal or vertical scrollbar root |
| thumb | .mantine-ScrollArea-thumb | Scrollbar thumb |
| corner | .mantine-ScrollArea-corner | Corner between horizontal and vertical scrollbars |

**ScrollArea CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --scrollarea-scrollbar-size | Scrollbar size |


--------------------------------------------------------------------------------

### Scroller
Package: @mantine/core
Import: import { Scroller } from '@mantine/core';
Description: Horizontal scroll container with navigation controls

## Usage

`Scroller` is a horizontal scroll container that displays navigation controls (chevron buttons)
when content overflows its container. It supports native scrolling via trackpad, shift + mouse wheel,
or touch gestures.

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


## Mouse drag scrolling

Set `draggable` prop to enable scrolling by clicking and dragging with the mouse:

```tsx
import { Badge, Group, Scroller } from '@mantine/core';

function Demo() {
  return (
    <Scroller draggable>
      <Group gap="xs" wrap="nowrap">
        {Array.from({ length: 20 }).map((_, index) => (
          <Badge key={index} variant="light" size="lg" miw="fit-content">
            Badge {index + 1}
          </Badge>
        ))}
      </Group>
    </Scroller>
  );
}
```


## Scroll amount

Use the `scrollAmount` prop to control how many pixels the container scrolls when clicking
the navigation buttons. The default value is `200`.

```tsx
import { Badge, Group, Scroller } from '@mantine/core';

function Demo() {
  return (
    <Scroller scrollAmount={300}>
      <Group gap="xs" wrap="nowrap">
        {Array.from({ length: 30 }).map((_, index) => (
          <Badge key={index} variant="light" size="lg" miw="fit-content">
            Badge {index + 1}
          </Badge>
        ))}
      </Group>
    </Scroller>
  );
}
```


## Control size

Use the `controlSize` prop to change the size of the navigation buttons. It accepts any valid
Mantine size value (`xs`, `sm`, `md`, `lg`, `xl`) or a number (converted to pixels).

```tsx
import { Badge, Group, Scroller } from '@mantine/core';

function Demo() {
  return (
    <Scroller controlSize="xl">
      <Group gap="xs" wrap="nowrap">
        {Array.from({ length: 20 }).map((_, index) => (
          <Badge key={index} variant="light" size="lg" miw="fit-content">
            Badge {index + 1}
          </Badge>
        ))}
      </Group>
    </Scroller>
  );
}
```


## Custom icons

Use `startControlIcon` and `endControlIcon` props to replace default chevron icons
with custom icons:

```tsx
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { Badge, Group, Scroller } from '@mantine/core';

function Demo() {
  return (
    <Scroller
      startControlIcon={<ArrowLeftIcon size={16} />}
      endControlIcon={<ArrowRightIcon size={16} />}
    >
      <Group gap="xs" wrap="nowrap">
        {Array.from({ length: 20 }).map((_, index) => (
          <Badge key={index} variant="light" size="lg" miw="fit-content">
            Badge {index + 1}
          </Badge>
        ))}
      </Group>
    </Scroller>
  );
}
```


## Usage with Tabs

Use `Scroller` inside [Tabs.List](https://mantine.dev/llms/core-tabs.md) to make the tabs list scrollable when there are too many tabs to fit in the available space:

```tsx
import { Scroller, Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="tab-1">
      <Tabs.List>
        <Scroller>
          <Tabs.Tab value="tab-1">First tab</Tabs.Tab>
          <Tabs.Tab value="tab-2">Second tab</Tabs.Tab>
          <Tabs.Tab value="tab-3">Third tab</Tabs.Tab>
          <Tabs.Tab value="tab-4">Fourth tab</Tabs.Tab>
          <Tabs.Tab value="tab-5">Fifth tab</Tabs.Tab>
          <Tabs.Tab value="tab-6">Sixth tab</Tabs.Tab>
          <Tabs.Tab value="tab-7">Seventh tab</Tabs.Tab>
          <Tabs.Tab value="tab-8">Eighth tab</Tabs.Tab>
          <Tabs.Tab value="tab-9">Ninth tab</Tabs.Tab>
          <Tabs.Tab value="tab-10">Tenth tab</Tabs.Tab>
        </Scroller>
      </Tabs.List>
    </Tabs>
  );
}
```



#### Props

**Scroller props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Content to display |
| controlSize | string \| number | - | Size of the control buttons, |
| draggable | boolean | - | Determines whether content can be scrolled by dragging with mouse, `true` by default |
| edgeGradientColor | string | - | Background color for the gradient fade on controls, `'var(--mantine-color-body)'` by default |
| endControlIcon | React.ReactNode | - | Icon component for the end control, AccordionChevron by default |
| endControlProps | React.ComponentProps<"button"> | - | Props passed to the end control button |
| scrollAmount | number | - | Amount of pixels to scroll when clicking the control buttons, `200` by default |
| showEndControl | boolean | - | Determines whether end control should always be visible regardless of scroll position, `false` by default |
| showStartControl | boolean | - | Determines whether start control should always be visible regardless of scroll position, `false` by default |
| startControlIcon | React.ReactNode | - | Icon component for the start control, AccordionChevron by default |
| startControlProps | React.ComponentProps<"button"> | - | Props passed to the start control button |


#### Styles API

Scroller component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Scroller selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Scroller-root | Root element |
| container | .mantine-Scroller-container | Scrollable container |
| content | .mantine-Scroller-content | Wraps component children |
| control | .mantine-Scroller-control | Start and end scroll control buttons |
| chevron | .mantine-Scroller-chevron | Chevron icon inside controls |

**Scroller CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --scroller-control-size | Controls width and chevron size |
| root | --scroller-background-color | Background color for the control edge gradients |

**Scroller data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| container | data-draggable | `draggable` prop is set | - |
| control | data-position | - | "start" or "end" depending on control position |
| control | data-hidden | Control is hidden because scrolling is not available in that direction | - |


--------------------------------------------------------------------------------

### SegmentedControl
Package: @mantine/core
Import: import { SegmentedControl } from '@mantine/core';
Description: A linear set of two or more segments

## Usage

```tsx
import { SegmentedControl } from '@mantine/core';

function Demo() {
  return <SegmentedControl orientation="horizontal" fullWidth={false} withItemsBorders={true} size="sm" radius="md" data={['React', 'Angular', 'Vue']} />;
}
```


## Controlled

```tsx
import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('react');

  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      data={[
        { label: 'React', value: 'react' },
        { label: 'Angular', value: 'ng' },
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte' },
      ]}
    />
  );
}
```

## Uncontrolled

`SegmentedControl` can be used with uncontrolled forms the same way as a native input element.
Set the `name` attribute to include segmented control value in `FormData` object on form submission.
To control the initial value in uncontrolled forms, use the `defaultValue` prop.

Example usage of uncontrolled `SegmentedControl` with `FormData`:

```tsx
import { SegmentedControl } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Segmented control value:', formData.get('framework'));
      }}
    >
      <SegmentedControl
        name="framework"
        defaultValue="react"
        data={[
          { label: 'React', value: 'react' },
          { label: 'Angular', value: 'ng' },
          { label: 'Vue', value: 'vue' },
          { label: 'Svelte', value: 'svelte' },
        ]}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Data prop

`SegmentedControl` supports two different data formats:

1. An array of primitive values – used when `value` and `label` are the same
2. An array of objects – used when `value` and `label` are different

```tsx
import { SegmentedControl } from '@mantine/core';

function ArrayOfStrings() {
  return (
    <SegmentedControl data={['React', 'Angular', 'Svelte', 'Vue']} />
  );
}

function ArrayOfObjects() {
  return (
    <SegmentedControl
      data={[
        { value: 'React', label: 'React' },
        { value: 'Angular', label: 'Angular' },
        { value: 'Svelte', label: 'Svelte' },
        { value: 'Vue', label: 'Vue' },
      ]}
    />
  );
}
```

## Generic value type

`SegmentedControl` supports generic value type. You can pass primitive values (numbers, strings, boolean, null)
as the type argument. The generic type is used for `value`, `defaultValue`, `onChange` and `data` props.

```tsx
import { SegmentedControl } from '@mantine/core';

function Demo() {
  return (
    <SegmentedControl<string | number>
      data={[
        { value: 16, label: '16' },
        { value: 17, label: '17' },
        { value: '18+', label: '18 or older' },
      ]}
    />
  );
}
```


Example with strings union:

```tsx
import { SegmentedControl } from '@mantine/core';

function Demo() {
  return (
    <SegmentedControl<'orange' | 'grape' | 'apple'>
      data={[
        { value: 'orange', label: 'Orange' },
        { value: 'grape', label: 'Grape' },
        { value: 'apple', label: 'Apple' },
      ]}
    />
  );
}
```

## Disabled

To disable a `SegmentedControl` item, use the array of objects `data` format and set `disabled: true`
on the item that you want to disable. To disable the entire component, use the `disabled` prop.

```tsx
import { SegmentedControl } from '@mantine/core';

function Demo() {
  return (
    <Stack align="center">
      <div>
        <Text size="sm" fw={500} mb={3}>
          Disabled control
        </Text>
        <SegmentedControl
          disabled
          data={[
            {
              value: 'preview',
              label: 'Preview',
            },
            {
              value: 'code',
              label: 'Code',
            },
            {
              value: 'export',
              label: 'Export',
            },
          ]}
        />
      </div>

      <div>
        <Text size="sm" fw={500} mb={3}>
          Disabled option
        </Text>
        <SegmentedControl
          data={[
            {
              value: 'preview',
              label: 'Preview',
              disabled: true,
            },
            {
              value: 'code',
              label: 'Code',
            },
            {
              value: 'export',
              label: 'Export',
            },
          ]}
        />
      </div>
    </Stack>
  );
}
```


## React node as label

You can use any React node as a label:

```tsx
import { Center, SegmentedControl } from '@mantine/core';
import { EyeIcon, CodeIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <SegmentedControl
      data={[
        {
          value: 'preview',
          label: (
            <Center style={{ gap: 10 }}>
              <EyeIcon size={16} />
              <span>Preview</span>
            </Center>
          ),
        },
        {
          value: 'code',
          label: (
            <Center style={{ gap: 10 }}>
              <CodeIcon size={16} />
              <span>Code</span>
            </Center>
          ),
        },
        {
          value: 'export',
          label: (
            <Center style={{ gap: 10 }}>
              <ArrowSquareOutIcon size={16} />
              <span>Export</span>
            </Center>
          ),
        },
      ]}
    />
  );
}
```


## Color

By default, `SegmentedControl` uses `theme.white` with shadow in the light color scheme and `var(--mantine-color-dark-6)` background color for the indicator.
Set the `color` prop to change the indicator `background-color`:

```tsx
import { SegmentedControl } from '@mantine/core';

function Demo() {
  return <SegmentedControl color="blue" data={['React', 'Angular', 'Vue', 'Svelte']} />;
}
```


## Auto contrast

`SegmentedControl` supports `autoContrast` prop. If set to `true`, the label text color will automatically adjust
to ensure optimal contrast against the indicator background color:

```tsx
import { SegmentedControl, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <SegmentedControl color="lime.4" data={['React', 'Angular', 'Vue', 'Svelte']} />
      <SegmentedControl color="lime.4" autoContrast data={['React', 'Angular', 'Vue', 'Svelte']} />
    </Stack>
  );
}
```


## Transitions

Change transition properties with:

* `transitionDuration` – all transitions duration in ms, `200` by default
* `transitionTimingFunction` – all transitions timing function, `ease` by default

```tsx
import { SegmentedControl, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text size="sm" fw={500} mt={3}>
        No transitions
      </Text>
      <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} transitionDuration={0} />

      <Text size="sm" fw={500} mt="md">
        500ms linear transition
      </Text>
      <SegmentedControl
        data={['React', 'Angular', 'Vue', 'Svelte']}
        transitionDuration={500}
        transitionTimingFunction="linear"
      />
    </>
  );
}
```


## Accessibility and usability

`SegmentedControl` uses radio inputs under the hood, so it is accessible by default with no extra steps required if you have text in labels.
The component supports the same keyboard events as a regular radio group.

If you do not have text in labels (for example, when you want to use `SegmentedControl` with icons only),
use [VisuallyHidden](https://mantine.dev/llms/core-visually-hidden.md) to make the component accessible:

```tsx
import { SegmentedControl, VisuallyHidden } from '@mantine/core';
import { EyeIcon, CodeIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';

function Demo() {
  const iconProps = {
    style: { display: 'block' },
    size: 20,

  };

  return (
    <SegmentedControl
      data={[
        {
          value: 'preview',
          label: (
            <>
              <EyeIcon {...iconProps} />
              <VisuallyHidden>Preview</VisuallyHidden>
            </>
          ),
        },
        {
          value: 'code',
          label: (
            <>
              <CodeIcon {...iconProps} />
              <VisuallyHidden>Code</VisuallyHidden>
            </>
          ),
        },
        {
          value: 'export',
          label: (
            <>
              <ArrowSquareOutIcon {...iconProps} />
              <VisuallyHidden>Export</VisuallyHidden>
            </>
          ),
        },
      ]}
    />
  );
}
```



#### Props

**SegmentedControl props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, automatically adjusts label text color for optimal contrast against the indicator background color |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color, changes indicator background color. By default, uses white in light mode and dark.5 in dark mode |
| data | (Value \| SegmentedControlItem<Value>)[] | required | Data based on which controls are rendered |
| defaultValue | Primitive | - | Uncontrolled component default value |
| disabled | boolean | - | Determines whether the component is disabled |
| fullWidth | boolean | - | Determines whether the component should take 100% width of its parent |
| name | string | - | Name attribute for the radio group. A random name is auto-generated if not provided |
| onChange | (value: Value) => void | - | Called when value changes |
| orientation | "horizontal" \| "vertical" | - | Component orientation |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| readOnly | boolean | - | If set to `false`, prevents changing the value |
| size | MantineSize | - | Controls `font-size`, `padding` and `height` properties |
| transitionDuration | number | - | Indicator `transition-duration` in ms, set `0` to turn off transitions |
| transitionTimingFunction | string | - | Indicator `transition-timing-function` property |
| value | Primitive | - | Controlled component value |
| withItemsBorders | boolean | - | Determines whether there should be borders between items |


#### Styles API

SegmentedControl component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**SegmentedControl selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-SegmentedControl-root | Root element |
| control | .mantine-SegmentedControl-control | Wrapper element for input and label |
| input | .mantine-SegmentedControl-input | Input element (`input[type="radio"]`), hidden by default |
| label | .mantine-SegmentedControl-label | Label element associated with input |
| indicator | .mantine-SegmentedControl-indicator | Floating indicator that moves between items |
| innerLabel | .mantine-SegmentedControl-innerLabel | Wrapper of label element children |

**SegmentedControl CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --sc-color | Control `background-color` of `indicator` |
| root | --sc-font-size | Controls `font-size` of labels |
| root | --sc-padding | Controls `padding` of control |
| root | --sc-radius | Controls `border-radius` of `indicator` and `root` elements |
| root | --sc-shadow | Controls `box-shadow` of indicator |

**SegmentedControl data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-full-width | `fullWidth` prop is set | - |
| root | data-with-items-borders | `withItemsBorders` prop is not `false` | - |
| root | data-disabled | Value of `disabled` prop | - |
| control | data-orientation | - | Value of `orientation` prop |


--------------------------------------------------------------------------------

### Select
Package: @mantine/core
Import: import { Select } from '@mantine/core';
Description: Custom searchable select

## Usage

`Select` allows capturing user input based on suggestions from a list.
Unlike [Autocomplete](https://mantine.dev/llms/core-autocomplete.md), `Select` does not allow entering custom values.

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Loading state

Set `loading` prop to display a loading indicator. By default, the loader is displayed on the right side of the input.
This is useful for async operations like API calls, searches, or validations:

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      loading
    />
  );
}
```


## Controlled

The `Select` value must be a primitive type (string, number, or boolean).
The `onChange` function is called with a primitive value as a single argument.

```tsx
import { useState } from 'react';
import { Select } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | null>('');
  return <Select data={[]} value={value} onChange={setValue} />;
}
```

## onChange handler

`onChange` is called with two arguments:

* `value` - string value of the selected option
* `option` – selected option object

If you prefer the object format in state, use the second argument of the onChange handler:

```tsx
import { useState } from 'react';
import { ComboboxItem, Select } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<ComboboxItem | null>(null);
  return (
    <Select
      data={[{ value: 'react', label: 'React library' }]}
      value={value ? value.value : null}
      onChange={(_value, option) => setValue(option)}
    />
  );
}
```

## autoSelectOnBlur

Set the `autoSelectOnBlur` prop to automatically select the highlighted option when the input loses focus.
Note: This prop only has an effect when `searchable` is set to `true`. To see this feature in action: select an option with the up/down arrows, then click outside the input:

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      autoSelectOnBlur
      searchable
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Clearable

Set the `clearable` prop to display the clear button in the right section. The button is not displayed
when:

* The component does not have a value
* The component is disabled
* The component is read only

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      defaultValue="React"
      clearable
    />
  );
}
```


```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import { Select, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Select
        label="clearSectionMode='both' (default)"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <Select
        label="clearSectionMode='rightSection'"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <Select
        label="clearSectionMode='clear'"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
```


## Allow deselect

The `allowDeselect` prop determines whether the value should be deselected when the user clicks on the selected option.
By default, `allowDeselect` is `true`:

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <>
      <Select
        label="Option can NOT be deselected"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        allowDeselect={false}
      />

      <Select
        label="Option can be deselected"
        description="This is default behavior, click 'React' in the dropdown"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        allowDeselect
        mt="md"
      />
    </>
  );
}
```


## Open on focus

Set the `openOnFocus` prop to open the dropdown when the input receives focus.
Note: This prop only has an effect when `searchable` is set to `true`:

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <>
      <Select
        label="Opens on focus"
        placeholder="Pick value"
        searchable
        openOnFocus
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <Select
        label="Does not open on focus"
        placeholder="Pick value"
        searchable
        openOnFocus={false}
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </>
  );
}
```


## Searchable

Set the `searchable` prop to allow filtering options by user input:

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      searchable
    />
  );
}
```


## Controlled search value

You can control the search value with `searchValue` and `onSearchChange` props:

```tsx
import { useState } from 'react';
import { Select } from '@mantine/core';

function Demo() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Select
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      data={[]}
    />
  );
}
```

## Nothing found

Set the `nothingFoundMessage` prop to display a given message when no options match the search query
or there is no data available. If the `nothingFoundMessage` prop is not set, the `Select` dropdown will be hidden.

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      searchable
      nothingFoundMessage="Nothing found..."
    />
  );
}
```


## Checked option icon

Set `checkIconPosition` prop to `left` or `right` to control position of check icon in active option.
To remove the check icon, set `withCheckIcon={false}`. To align unchecked labels with the checked one, set `withAlignedLabels` prop.

```tsx
import { Select } from '@mantine/core';


function Demo() {
  return (
    <Select
       withCheckIcon={true} withAlignedLabels={false} checkIconPosition="left"
      data={['React', 'Angular', 'Svelte', 'Vue']}
      dropdownOpened
      pb={150}
      label="Control check icon"
      placeholder="Pick value"
      defaultValue="React"
    />
  );
}
```


## Value type

`Select` supports primitive values (strings, numbers, booleans) as value type. `Select` automatically
infers the value type. If you want to set the value type explicitly, pass type argument:

```tsx
import { Select } from '@mantine/core';

type SelectValue = 'React' | 'Angular' | 'Svelte' | number;

function Demo() {
  return <Select<SelectValue> data={['React', 'Angular', 'Svelte', 100]} />;
}
```

## Data prop

Data that is used in Select must be an array of strings or objects with value and label properties. You can also specify additional properties that will be available in renderOption function.

## Filtering

Select provides built-in filtering functionality. You can control filtering behavior with filter prop or implement custom filtering logic.

```tsx
import { Select, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
  });
};

function Demo() {
  return (
    <Select
      label="Your country"
      placeholder="Pick value"
      data={['Great Britain', 'Russian Federation', 'United States']}
      filter={optionsFilter}
      searchable
    />
  );
}
```


## Sort options

By default, options are sorted by their position in the data array. You can change this behavior
with the `filter` function:

```tsx
import { Select, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  filtered.sort((a, b) => a.label.localeCompare(b.label));
  return filtered;
};

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['4 – React', '1 – Angular', '3 – Vue', '2 – Svelte']}
      filter={optionsFilter}
      nothingFoundMessage="Nothing found..."
      searchable
    />
  );
}
```


## Fuzzy search with fuse.js

You can implement fuzzy search using the [fuse.js](https://fusejs.io/) library to match options
even with typos or partial matches:

```tsx
import { Select, ComboboxItem, OptionsFilter } from '@mantine/core';
import Fuse from 'fuse.js';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  if (!search.trim()) {
    return options;
  }

  const fuse = new Fuse(options as ComboboxItem[], {
    keys: ['label'],
    threshold: 0.3,
    minMatchCharLength: 1,
  });

  return fuse.search(search).map((result) => result.item);
};

function Demo() {
  return (
    <Select
      label="Your country"
      placeholder="Pick value"
      data={['Great Britain', 'Russian Federation', 'United States']}
      filter={optionsFilter}
      searchable
    />
  );
}
```


## Large datasets

Select can handle large datasets efficiently. Consider implementing virtualization for datasets with thousands of items to improve performance.

```tsx
import { Select } from '@mantine/core';

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <Select
      label="100 000 options autocomplete"
      placeholder="Use limit to optimize performance"
      limit={5}
      data={largeData}
      searchable
    />
  );
}
```


## renderOption

The `renderOption` callback allows you to customize option rendering. It is called with an option object and
checked state. The function must return a React node.

```tsx
import { TextAlignCenterIcon, TextAlignJustifyIcon, TextAlignLeftIcon, TextAlignRightIcon, CheckIcon } from '@phosphor-icons/react';
import { Group, Select, SelectProps } from '@mantine/core';

const iconProps = {

  color: 'currentColor',
  opacity: 0.6,
  size: 18,
};

const icons: Record<string, React.ReactNode> = {
  left: <TextAlignLeftIcon {...iconProps} />,
  center: <TextAlignCenterIcon {...iconProps} />,
  right: <TextAlignRightIcon {...iconProps} />,
  justify: <TextAlignJustifyIcon {...iconProps} />,
};

const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
  <Group flex="1" gap="xs">
    {icons[option.value]}
    {option.label}
    {checked && <CheckIcon style={{ marginInlineStart: 'auto' }} {...iconProps} />}
  </Group>
);

function Demo() {
  return (
    <Select
      label="Select with renderOption"
      placeholder="Select text align"
      data={[
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
        { value: 'justify', label: 'Justify' },
      ]}
      renderOption={renderSelectOption}
    />
  );
}
```


## Scrollable dropdown

By default, the options list is wrapped with [ScrollArea.Autosize](https://mantine.dev/llms/core-scroll-area.md).
You can control the dropdown max-height with the `maxDropdownHeight` prop if you do not change the default settings.

If you want to use native scrollbars, set `withScrollArea={false}`. Note that in this case,
you will need to change the dropdown styles with [Styles API](https://mantine.dev/llms/styles-styles-api.md).

```tsx
import { Select } from '@mantine/core';

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <>
      <Select
        label="With scroll area (default)"
        placeholder="Pick value"
        data={data}
        maxDropdownHeight={200}
      />

      <Select
        label="With native scroll"
        placeholder="Pick value"
        data={data}
        withScrollArea={false}
        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
        mt="md"
      />
    </>
  );
}
```


## Group options

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Express', 'Django'] },
      ]}
    />
  );
}
```


## Disabled options

When an option is disabled, it cannot be selected and is ignored in keyboard navigation.

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={[
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
        { value: 'vue', label: 'Vue', disabled: true },
        { value: 'svelte', label: 'Svelte', disabled: true },
      ]}
    />
  );
}
```


## Inside Popover

To use `Select` inside popover, you need to set `withinPortal: false`:

```tsx
import { Popover, Button, Select } from '@mantine/core';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Select
          label="Your favorite library"
          placeholder="Pick value"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          comboboxProps={{ withinPortal: false }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Control dropdown opened state

You can control the dropdown opened state with the `dropdownOpened` prop. Additionally,
you can use `onDropdownClose` and `onDropdownOpen` to listen to dropdown opened state changes.

```tsx
import { Select, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();
  return (
    <>
      <Button onClick={toggle} mb="md">
        Toggle dropdown
      </Button>

      <Select
        label="Your favorite library"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        dropdownOpened={dropdownOpened}
      />
    </>
  );
}
```


## Dropdown position

By default, the dropdown is displayed below the input if there is enough space; otherwise it is displayed above the input.
You can change this behavior by setting the `position` and `middlewares` props, which are passed down to the
underlying [Popover](https://mantine.dev/llms/core-popover.md) component.

Example of a dropdown that is always displayed above the input:

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ position: 'top', middlewares: { flip: false, shift: false } }}
    />
  );
}
```


## Dropdown width

To change the dropdown width, set the `width` prop in `comboboxProps`. By default,
the dropdown width is equal to the input width.

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ width: 200, position: 'bottom-start' }}
    />
  );
}
```


## Dropdown offset

To change the dropdown offset, set the `offset` prop in `comboboxProps`:

```tsx
// Demo.tsx
import { Select } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      classNames={classes}
      comboboxProps={{ position: 'bottom', middlewares: { flip: false, shift: false }, offset: 0 }}
    />
  );
}

// Demo.module.css
.dropdown {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-color: light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-4));
  border-top: 0;
}

.input {
  transition: none;

  &[data-expanded] {
    border-color: light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-4));
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
```


## Prevent horizontal infinite scrolling

If you experience horizontal infinite scrolling in the dropdown, set the `shift` middleware `padding` to `0`:

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      data={['React', 'Angular', 'Vue']}
      comboboxProps={{
        middlewares: {
          shift: { padding: 0 }
        }
      }}
    />
  );
}
```

