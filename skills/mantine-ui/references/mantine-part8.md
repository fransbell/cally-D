## FileInputProps type

`FileInputProps` type is a generic interface which accepts a single type argument:
the `multiple` value.

```tsx
import type { FileInputProps } from '@mantine/core';

type SingleInputProps = FileInputProps<false>;
type MultipleInputProps = FileInputProps<true>;
```


#### Props

**FileInput props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accept | string | - | File input accept attribute, for example, `"image/png,image/jpeg"` |
| capture | boolean \| "user" \| "environment" | - | Specifies that, optionally, a new file should be captured, and which device should be used to capture that new media of a type defined by the accept attribute. |
| clearButtonProps | React.ComponentProps<"button"> | - | Props passed down to the clear button |
| clearSectionMode | ClearSectionMode | - | Determines how the clear button and rightSection are rendered |
| clearable | boolean | - | If set, the clear button is displayed in the right section |
| defaultValue | File \| File[] \| null | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of `Input.Description` component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps | - | Props passed down to the `Input.Description` component |
| disabled | boolean | - | Sets `disabled` attribute on the `input` element |
| error | React.ReactNode | - | Contents of `Input.Error` component. If not set, error is not displayed. |
| errorProps | InputErrorProps | - | Props passed down to the `Input.Error` component |
| fileInputProps | React.ComponentProps<"input"> | - | Props passed down to the hidden `input[type="file"]` |
| form | string | - | Input form attribute |
| inputContainer | (children: ReactNode) => ReactNode | - | Render function to wrap the input element. Useful for adding tooltips, popovers, or other wrappers around the input. |
| inputSize | string | - | HTML `size` attribute for the input element (number of visible characters) |
| inputWrapperOrder | ("input" \| "label" \| "description" \| "error")[] | - | Controls order and visibility of wrapper elements. Only elements included in this array will be rendered. |
| label | React.ReactNode | - | Contents of `Input.Label` component. If not set, label is not displayed. |
| labelProps | InputLabelProps | - | Props passed down to the `Input.Label` component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `leftSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| leftSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `leftSection` element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set `width` of the section and input `padding-left`, by default equals to the input height |
| loading | boolean | - | Displays loading indicator in the left or right section |
| loadingPosition | "left" \| "right" | - | Position of the loading indicator |
| multiple | boolean | - | If set, user can pick more than one file |
| name | string | - | Input name attribute |
| onChange | (payload: Multiple extends true ? File[] : File \| null) => void | - | Called when value changes |
| placeholder | React.ReactNode | - | Input placeholder |
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| readOnly | boolean | - | If set, the input value cannot be changed |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| resetRef | Ref<() => void> | - | Reference of the function that should be called when value changes to null or empty array |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| size | MantineSize | - | Controls input `height`, horizontal `padding`, and `font-size` |
| value | File \| File[] \| null | - | Controlled component value |
| valueComponent | FC<{ value: File \| File[] \| null; }> | - | Value renderer. By default, displays file name. |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

FileInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**FileInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-FileInput-wrapper | Root element of the Input |
| input | .mantine-FileInput-input | Input element |
| section | .mantine-FileInput-section | Left and right sections |
| root | .mantine-FileInput-root | Root element |
| label | .mantine-FileInput-label | Label element |
| required | .mantine-FileInput-required | Required asterisk element, rendered inside label |
| description | .mantine-FileInput-description | Description element |
| error | .mantine-FileInput-error | Error element |
| placeholder | .mantine-FileInput-placeholder | Placeholder text |


--------------------------------------------------------------------------------

### Flex
Package: @mantine/core
Import: import { Flex } from '@mantine/core';
Description: Compose elements in a flex container

## Usage

```tsx
import { Flex, Button } from '@mantine/core';


function Demo() {
  return (
    <Flex
      mih={50}
      bg="rgba(0, 0, 0, .3)"
       gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap"
    >
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Flex>
  );
}
```


## Supported props

## Responsive props

`Flex` component props can have responsive values the same way as other [style props](https://mantine.dev/llms/styles-style-props.md):

```tsx
import { Flex, Button } from '@mantine/core';

function Demo() {
  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      gap={{ base: 'sm', sm: 'lg' }}
      justify={{ sm: 'center' }}
    >
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Flex>
  );
}
```


## Difference from Group and Stack

The `Flex` component is an alternative to [Group](https://mantine.dev/llms/core-group.md) and [Stack](https://mantine.dev/llms/core-stack.md).
`Flex` is more flexible – it allows creating both horizontal and vertical flexbox layouts, but requires more configuration.
Unlike [Group](https://mantine.dev/llms/core-group.md) and [Stack](https://mantine.dev/llms/core-stack.md), `Flex` is [polymorphic](https://mantine.dev/llms/guides-polymorphic.md) and supports responsive props.

## Browser support

Flex component uses CSS flexbox gap to add spacing between children. Flexbox gap is supported by all modern browsers, but if you need to support older browsers, use Space component instead.


#### Props

**Flex props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | StyleProp<AlignItems> | - | `align-items` CSS property |
| columnGap | StyleProp<MantineSpacing> | - | `column-gap` CSS property |
| direction | StyleProp<FlexDirection> | - | `flex-direction` CSS property |
| gap | StyleProp<MantineSpacing> | - | `gap` CSS property |
| justify | StyleProp<JustifyContent> | - | `justify-content` CSS property |
| rowGap | StyleProp<MantineSpacing> | - | `row-gap` CSS property |
| wrap | StyleProp<FlexWrap> | - | `flex-wrap` CSS property |


#### Styles API

Flex component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Flex selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Flex-root | Root element |


--------------------------------------------------------------------------------

### FloatingIndicator
Package: @mantine/core
Import: import { FloatingIndicator } from '@mantine/core';
Description: Display a floating indicator over a group of elements

## Usage

`FloatingIndicator` is designed to highlight the active element in a group.
It can be used to create custom segmented controls, tabs and other similar components.

`FloatingIndicator` renders an element over the `target` element. To calculate the position, it is
required to pass a `parent` element. **The parent element must have `position: relative` CSS property** –
this is essential for correct positioning. The component returns `null` and renders nothing if either
`target` or `parent` is not provided.

By default, `FloatingIndicator` does not have any visible styles. You can use the `className` prop
or [Styles API](https://mantine.dev/llms/styles-styles-api.md) to apply styles. Note that the indicator's `transform`, `width`,
and `height` styles are set directly via JavaScript to enable smooth position transitions – these
cannot be overridden via the Styles API.

```tsx
import { useState } from 'react';
import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import classes from './Demo.module.css';

const data = ['React', 'Vue', 'Angular', 'Svelte'];

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
    >
      <span className={classes.controlLabel}>{item}</span>
    </UnstyledButton>
  ));

  return (
    <div className={classes.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>
  );
}
```


## Multiple rows

`FloatingIndicator` can be used to highlight the active element in a group with multiple rows:

```tsx
import { useState } from 'react';
import { ArrowDownIcon, ArrowDownLeftIcon, ArrowDownRightIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowUpLeftIcon, ArrowUpRightIcon, CircleIcon } from '@phosphor-icons/react';
import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState('center');

  const setControlRef = (name: string) => (node: HTMLButtonElement) => {
    controlsRefs[name] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <div className={classes.root} dir="ltr" ref={setRootRef}>
      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />

      <div className={classes.controlsGroup}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('up-left')}
          ref={setControlRef('up-left')}
          mod={{ active: active === 'up-left' }}
        >
          <ArrowUpLeftIcon size={26} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('up')}
          ref={setControlRef('up')}
          mod={{ active: active === 'up' }}
        >
          <ArrowUpIcon size={26} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('up-right')}
          ref={setControlRef('up-right')}
          mod={{ active: active === 'up-right' }}
        >
          <ArrowUpRightIcon size={26} />
        </UnstyledButton>
      </div>
      <div className={classes.controlsGroup}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('left')}
          ref={setControlRef('left')}
          mod={{ active: active === 'left' }}
        >
          <ArrowLeftIcon size={26} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('center')}
          ref={setControlRef('center')}
          mod={{ active: active === 'center' }}
        >
          <CircleIcon size={26} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('right')}
          ref={setControlRef('right')}
          mod={{ active: active === 'right' }}
        >
          <ArrowRightIcon size={26} />
        </UnstyledButton>
      </div>
      <div className={classes.controlsGroup}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('down-left')}
          ref={setControlRef('down-left')}
          mod={{ active: active === 'down-left' }}
        >
          <ArrowDownLeftIcon size={26} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('down')}
          ref={setControlRef('down')}
          mod={{ active: active === 'down' }}
        >
          <ArrowDownIcon size={26} />
        </UnstyledButton>
        <UnstyledButton
          className={classes.control}
          onClick={() => setActive('down-right')}
          ref={setControlRef('down-right')}
          mod={{ active: active === 'down-right' }}
        >
          <ArrowDownRightIcon size={26} />
        </UnstyledButton>
      </div>
    </div>
  );
}
```


## Example: Tabs

```tsx
// Demo.tsx
import { useState } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs variant="none" value={value} onChange={setValue}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
          First tab
        </Tabs.Tab>
        <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
          Second tab
        </Tabs.Tab>
        <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
          Third tab
        </Tabs.Tab>

        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>

      <Tabs.Panel value="1">First tab content</Tabs.Panel>
      <Tabs.Panel value="2">Second tab content</Tabs.Panel>
      <Tabs.Panel value="3">Third tab content</Tabs.Panel>
    </Tabs>
  );
}

// Demo.module.css
.list {
  position: relative;
  margin-bottom: var(--mantine-spacing-md);
}

.indicator {
  background-color: var(--mantine-color-white);
  border-radius: var(--mantine-radius-md);
  border: 1px solid var(--mantine-color-gray-2);
  box-shadow: var(--mantine-shadow-sm);

  @mixin dark {
    background-color: var(--mantine-color-dark-6);
    border-color: var(--mantine-color-dark-4);
  }
}

.tab {
  z-index: 1;
  font-weight: 600;
  transition: color 100ms ease;
  color: var(--mantine-color-gray-7);

  &[data-active] {
    color: var(--mantine-color-black);
  }

  @mixin dark {
    color: var(--mantine-color-dark-1);

    &[data-active] {
      color: var(--mantine-color-white);
    }
  }
}
```



#### Props

**FloatingIndicator props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| displayAfterTransitionEnd | boolean | - | Controls whether the indicator should be hidden initially and displayed after the parent's transition ends. Set to `true` when the parent container has CSS transitions (e.g., `transform: scale()`) to prevent the indicator from appearing at the wrong position during the parent's animation. |
| onTransitionEnd | () => void | - | Called when the indicator finishes transitioning to a new position |
| onTransitionStart | () => void | - | Called when the indicator starts transitioning to a new position |
| parent | HTMLElement \| null | required | Parent container element that must have `position: relative`. The indicator's position is calculated relative to this element. |
| target | HTMLElement \| null | required | Target element over which the indicator is displayed. The indicator will be positioned to match the target's size and position. |
| transitionDuration | string \| number | - | Transition duration in ms |


#### Styles API

FloatingIndicator component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**FloatingIndicator selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-FloatingIndicator-root | Indicator element that animates to match the target position and size |

**FloatingIndicator CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --transition-duration | Controls indicator transition duration |

**FloatingIndicator data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-initialized | Indicator has been initialized and transitions are enabled | - |
| root | data-hidden | Indicator is hidden (when displayAfterTransitionEnd is true) | - |


--------------------------------------------------------------------------------

### FloatingWindow
Package: @mantine/core
Import: import { FloatingWindow } from '@mantine/core';
Description: Draggable floating area

## Usage

`FloatingWindow` creates a draggable element with a fixed position:

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


## Constrain to viewport

Use the `constrainToViewport` prop to restrict element movement to the viewport boundaries.
If you do not set the `constrainToViewport` prop, the element can be dragged outside the viewport:

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
          constrainToViewport={false}
        >
          <Group justify="space-between" mb="md">
            <Text>No constrain demo</Text>
            <CloseButton onClick={handlers.close} />
          </Group>
          <Text fz="sm">
            The floating window is not constrained by the viewport, it can move out of bounds.
          </Text>
        </FloatingWindow>
      )}
    </>
  );
}
```


## Constrain offset

Use the `constrainOffset` prop to set the offset from the viewport edges when constraining the element:

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
          initialPosition={{ top: 300, left: 30 }}
          style={{ cursor: 'move' }}
          constrainToViewport
          constrainOffset={30}
        >
          <Group justify="space-between" mb="md">
            <Text>Constrain offset demo</Text>
            <CloseButton onClick={handlers.close} />
          </Group>
          <Text fz="sm">
            This floating window has 30px offset, it cannot move closer that 30px to the edge of the
            viewport.
          </Text>
        </FloatingWindow>
      )}
    </>
  );
}
```


## Drag handle selector

The `dragHandleSelector` prop allows specifying a selector of an element (or a group of elements) that should be used to drag the floating window.
If not specified, the entire root element is used as a drag target.

The `excludeDragHandleSelector` prop excludes elements within `dragHandleSelector` from the drag event.
In the following example, the close button is excluded from the drag event:

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
          withBorder
          dragHandleSelector=".drag-handle"
          excludeDragHandleSelector="button"
          initialPosition={{ top: 300, left: 20 }}
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
        </FloatingWindow>
      )}
    </>
  );
}
```


## Enabled prop

Use the `enabled` option to enable or disable dragging:

```tsx
import { Button, Chip, CloseButton, FloatingWindow, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const [enabled, setEnabled] = useState(true);

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
        <FloatingWindow
          w={280}
          p="md"
          withBorder
          excludeDragHandleSelector="button"
          initialPosition={{ top: 300, left: 20 }}
          style={{ cursor: 'move' }}
          enabled={enabled}
        >
          <Group justify="space-between" mb="md">
            <Text>Enabled demo</Text>
            <CloseButton onClick={handlers.close} />
          </Group>
          <Text fz="sm">This is a floating window. You can drag it around.</Text>
        </FloatingWindow>
      )}
    </>
  );
}
```


## Set position

Call the `setPosition` function to set the position of the element programmatically.
This function accepts an object with `top`, `left`, `right` and `bottom` properties,
from which you should only specify two (for example, `top` and `left`, `bottom` and `right`).

```tsx
import { useRef } from 'react';
import { Button, CloseButton, FloatingWindow, Group, Text } from '@mantine/core';
import { SetFloatingWindowPosition, useDisclosure } from '@mantine/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const setPositionRef = useRef<SetFloatingWindowPosition | null>(null);
  const setPosition = () => {
    setPositionRef.current?.({ bottom: 40, right: 40 });
  };

  return (
    <>
      <Group>
        <Button onClick={handlers.toggle} variant="default">
          {visible ? 'Hide' : 'Show'} floating window
        </Button>
        <Button onClick={setPosition} variant="default">
          Set position to bottom right corner
        </Button>
      </Group>

      {visible && (
        <FloatingWindow
          w={280}
          p="md"
          withBorder
          excludeDragHandleSelector="button"
          initialPosition={{ top: 300, left: 20 }}
          style={{ cursor: 'move' }}
          setPositionRef={setPositionRef}
        >
          <Group justify="space-between" mb="md">
            <Text>Set position demo</Text>
            <CloseButton onClick={handlers.close} />
          </Group>
          <Text fz="sm">
            You can control floating window position programmatically with setPositionRef.
          </Text>
        </FloatingWindow>
      )}
    </>
  );
}
```


## Lock axis

Use the `axis` option to restrict movement to the specified axis:

```tsx
import { Button, CloseButton, FloatingWindow, Group, SegmentedControl, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [visible, handlers] = useDisclosure();
  const [axis, setAxis] = useState<'x' | 'y'>('y');

  return (
    <>
      <Group>
        <Button onClick={handlers.toggle} variant="default">
          {visible ? 'Hide' : 'Show'} floating window
        </Button>
        <SegmentedControl data={['x', 'y']} onChange={(val) => setAxis(val as 'x')} value={axis} />
      </Group>

      {visible && (
        <FloatingWindow
          w={280}
          p="md"
          withBorder
          excludeDragHandleSelector="button"
          initialPosition={{ top: 200, left: 40 }}
          style={{ cursor: 'move' }}
          axis={axis}
        >
          <Group justify="space-between" mb="md">
            <Text>Axis demo</Text>
            <CloseButton onClick={handlers.close} />
          </Group>
          <Text fz="sm">
            When you set axis prop, the floating window can be dragged only horizontally or
            vertically.
          </Text>
        </FloatingWindow>
      )}
    </>
  );
}
```


## use-floating-window hook

If you prefer the hook API, you can use the [useFloatingWindow](https://mantine.dev/llms/hooks-use-floating-window.md) hook.
It supports most of the `FloatingWindow` features:

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



#### Props

**FloatingWindow props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| axis | "x" \| "y" | - | If set, restricts movement to the specified axis |
| constrainOffset | number | - | The offset from the viewport edges when constraining the element. Requires `constrainToViewport: true`. |
| constrainToViewport | boolean | - | If `true`, the element can only move within the current viewport boundaries. |
| dragHandleSelector | string | - | Selector of an element that should be used to drag floating window. If not specified, the entire root element is used as a drag target. |
| enabled | boolean | - | If `false`, the element can not be dragged. |
| excludeDragHandleSelector | string | - | Selector of an element within `dragHandleSelector` that should be excluded from the drag event. |
| initialPosition | FloatingWindowPositionConfig | - | Initial position. If not set, calculated from element styles. |
| onDragEnd | () => void | - | Called when the drag stops |
| onDragStart | () => void | - | Called when the drag starts |
| onPositionChange | (pos: FloatingWindowPosition) => void | - | Called when the element position changes |
| portalProps | Omit<PortalProps, "children"> | - | Props passed down to `Portal` component |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem |
| setPositionRef | RefObject<SetFloatingWindowPosition \| null> | - | Assigns ref to set position programmatically |
| shadow | MantineShadow | - | Key of `theme.shadows` or any valid CSS value to set `box-shadow` |
| withBorder | boolean | - | Adds border to the root element |
| withinPortal | boolean | - | Determines whether the window should be rendered inside `Portal` |
| zIndex | React.CSSProperties["zIndex"] | - | `z-index` of the root element |


#### Styles API

FloatingWindow component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**FloatingWindow selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-FloatingWindow-root | Root element |

**FloatingWindow data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-dragging | Window is being dragged | - |


--------------------------------------------------------------------------------

### FocusTrap
Package: @mantine/core
Import: import { FocusTrap } from '@mantine/core';
Description: Trap focus at child node

## Usage

FocusTrap is a component implementation of the [use-focus-trap](https://mantine.dev/llms/hooks-use-focus-trap.md) hook.
It is used in all Mantine components that require focus trap ([Modal](https://mantine.dev/llms/core-modal.md), [DatePicker](https://mantine.dev/llms/dates-date-picker.md), [Popover](https://mantine.dev/llms/core-popover.md), etc.).

```tsx
import { useDisclosure } from '@mantine/hooks';
import { FocusTrap, TextInput, Button, Box } from '@mantine/core';

function Demo() {
  const [active, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Button onClick={toggle}>{active ? 'Deactivate' : 'Activate'} focus trap</Button>

      <FocusTrap active={active}>
        <div>
          <TextInput mt="sm" label="First input" placeholder="First input" />
          <TextInput mt="sm" label="Second input" placeholder="Second input" />
          <TextInput mt="sm" label="Third input" placeholder="Third input" />
        </div>
      </FocusTrap>
    </Box>
  );
}
```


## Initial focus

To define the element that will receive initial focus, set the `data-autofocus` attribute:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { FocusTrap, TextInput, Button, Box } from '@mantine/core';

function Demo() {
  const [active, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Button onClick={toggle}>{active ? 'Deactivate' : 'Activate'} focus trap</Button>

      <FocusTrap active={active}>
        <div>
          <TextInput mt="sm" label="First input" placeholder="First input" />
          <TextInput mt="sm" label="Second input" placeholder="Second input" data-autofocus />
          <TextInput mt="sm" label="Third input" placeholder="Third input" />
        </div>
      </FocusTrap>
    </Box>
  );
}
```


## FocusTrap.InitialFocus

`FocusTrap.InitialFocus` is a special component that adds a visually hidden
element which will receive the focus when the focus trap is activated.
Once `FocusTrap.InitialFocus` loses focus, it is removed from the tab order.

For example, it is useful if you do not want to focus any elements inside the [Modal](https://mantine.dev/llms/core-modal.md) when it is opened:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, FocusTrap } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Focus demo">
        <FocusTrap.InitialFocus />
        <TextInput label="First input" placeholder="First input" />
        <TextInput
          data-autofocus
          label="Input with initial focus"
          placeholder="It has data-autofocus attribute"
          mt="md"
        />
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Focus trapping logic

* Focus is trapped within the child node if the `active` prop is `true`
* When the FocusTrap component is mounted or when the `active` prop changes from `false` to `true`, the first element with the `data-autofocus` attribute is focused
* If there are no elements with the `data-autofocus` attribute, then the first element that supports keyboard interaction is focused
* If the target element does not have focusable elements or does not support `ref`, then the focus trap will not work
* Trap stops working when an element outside of the `FocusTrap` child is focused


#### Props

**FocusTrap props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | boolean | - | If set to `false`, disables focus trap |
| children | any | required | Element to trap focus at, must support ref prop |
| innerRef | Ref<any> | - | Ref to combine with the focus trap ref |
| refProp | string | - | Prop that is used to access element ref |

**FocusTrap..InitialFocus props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|

**FocusTrap.InitialFocus props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|


--------------------------------------------------------------------------------

### Grid
Package: @mantine/core
Import: import { Grid } from '@mantine/core';
Description: Responsive 12 columns grid system

## Usage

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
    </Grid>
  );
}
```


## Columns span

The `Grid.Col` `span` prop controls the ratio of column width to the total width of the row.
By default, grid uses a 12 columns layout, so the `span` prop can be any number from 1 to 12.

Examples:

* `<Grid.Col span={3} />` – 3 / 12 = 25% of row width
* `<Grid.Col span={4} />` – 4 / 12 = 33% of row width
* `<Grid.Col span={6} />` – 6 / 12 = 50% of row width
* `<Grid.Col span={12} />` – 12 / 12 = 100% of row width

The `span` prop also supports object syntax to change column width based on viewport width.
It accepts `xs`, `sm`, `md`, `lg` and `xl` keys and values from 1 to 12. The syntax
is the same as in [style props](https://mantine.dev/llms/styles-style-props.md).

In the following example `span={{ base: 12, md: 6, lg: 3 }}`:

* `base` – 12 / 12 = 100% of row width when viewport width is less than `md` breakpoint
* `md` – 6 / 12 = 50% of row width when viewport width is between `md` and `lg` breakpoints
* `lg` – 3 / 12 = 25% of row width when viewport width is greater than `lg` breakpoint

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>1</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>2</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>3</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>4</Grid.Col>
    </Grid>
  );
}
```


## Gap

Set the `gap` prop to control spacing between columns and rows. The prop works the same
way as [style props](https://mantine.dev/llms/styles-style-props.md) – you can reference `theme.spacing` values
with `xs`, `sm`, `md`, `lg` and `xl` strings and use object syntax to change gap
based on viewport width:

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid gap={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
    </Grid>
  );
}
```


## Row and column gap

Use `rowGap` and `columnGap` props to set different spacing for rows and columns.
`rowGap` and `columnGap` override `gap` prop if both are set:

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid gap="md" rowGap="xl" columnGap="sm">
      <Grid.Col span={3}>1</Grid.Col>
      <Grid.Col span={3}>2</Grid.Col>
      <Grid.Col span={3}>3</Grid.Col>
      <Grid.Col span={3}>4</Grid.Col>
      <Grid.Col span={3}>5</Grid.Col>
      <Grid.Col span={3}>6</Grid.Col>
      <Grid.Col span={3}>7</Grid.Col>
      <Grid.Col span={3}>8</Grid.Col>
    </Grid>
  );
}
```


## Grow

If the `grow` prop is set, the column will grow to fill the remaining space in the row:

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid grow={true} gap="md">
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
      <Grid.Col span={4}>4</Grid.Col>
      <Grid.Col span={4}>5</Grid.Col>
    </Grid>
  );
}
```


## Column offset

Set the `offset` prop on the `Grid.Col` component to add gaps to the grid. The `offset` prop
supports the same syntax as the `span` prop: a number from 1 to 12 or an object with `xs`, `sm`, `md`, `lg` and `xl` keys and values from 1 to 12.

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={3}>1</Grid.Col>
      <Grid.Col span={3}>2</Grid.Col>
      <Grid.Col span={3} offset={3}>3</Grid.Col>
    </Grid>
  );
}
```


## Order

Set the `order` prop on the `Grid.Col` component to change the order of columns. The `order` prop
supports the same syntax as the `span` prop: a number from 1 to 12 or an object with `xs`, `sm`, `md`, `lg` and `xl` keys and values from 1 to 12.

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={3} order={{ base: 2, sm: 1, lg: 3 }}>2</Grid.Col>
      <Grid.Col span={3} order={{ base: 3, sm: 2, lg: 2 }}>3</Grid.Col>
      <Grid.Col span={3} order={{ base: 1, sm: 3, lg: 1 }}>1</Grid.Col>
    </Grid>
  );
}
```


## Multiple rows

Once the columns' `span` and `offset` sum exceeds the `columns` prop (12 by default),
columns are moved to the next row:

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
      <Grid.Col span={4}>4</Grid.Col>
    </Grid>
  );
}
```


## Justify and align

You can control the `justify-content` and `align-items` CSS properties with the `justify` and `align` props on the `Grid` component:

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid justify="flex-start" align="flex-start">
      <Grid.Col span={3} h={80}>1</Grid.Col>
      <Grid.Col span={3} h={120}>2</Grid.Col>
      <Grid.Col span={3} h={100}>3</Grid.Col>
    </Grid>
  );
}
```


## Column alignment

Use the `align` prop on individual `Grid.Col` components to control the `align-self` CSS property
for each column. This allows you to override the grid's `align` prop for specific columns:

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid align="stretch">
      <Grid.Col span={4} align="flex-start">
        <div style={{ height: '100px', background: 'var(--mantine-color-blue-light)' }}>
          flex-start
        </div>
      </Grid.Col>
      <Grid.Col span={4} align="center">
        <div style={{ height: '100px', background: 'var(--mantine-color-blue-light)' }}>
          center
        </div>
      </Grid.Col>
      <Grid.Col span={4} align="flex-end">
        <div style={{ height: '100px', background: 'var(--mantine-color-blue-light)' }}>
          flex-end
        </div>
      </Grid.Col>
    </Grid>
  );
}
```


## Auto sized columns

All columns in a row with `span="auto"` grow as much as they can to fill the row.
In the following example, the second column takes up 50% of the row while the other two columns automatically resize to fill the remaining space:

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span="auto">1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
      <Grid.Col span="auto">3</Grid.Col>
    </Grid>
  );
}
```


## Fit column content

If you set `span="content"`, the column's size will automatically adjust to match the width of its content:

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span="content">fit content</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
    </Grid>
  );
}
```


## Change columns count

By default, grid uses a 12 columns layout. You can change it by setting the `columns` prop on the `Grid` component.
Note that in this case, columns span and offset will be calculated relative to this value.

In the following example, the first column takes 50% with 12 span (12/24), second and third take 25% (6/24):

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid columns={24}>
      <Grid.Col span={12}>1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
      <Grid.Col span={6}>3</Grid.Col>
    </Grid>
  );
}
```


## Container queries

To use [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
instead of media queries, set `type="container"`. With container queries, all responsive values
are adjusted based on the container width, not the viewport width.

Note that, when using container queries, it is also required to set `breakpoints` prop
to the exact container width values.

To see how the grid changes, resize the root element of the demo
with the resize handle located at the bottom right corner of the demo:

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    // Wrapper div is added for demonstration purposes only.
    // It is not required in real projects.
    <div style={{ resize: 'horizontal', overflow: 'hidden', maxWidth: '100%' }}>
      <Grid
        type="container"
        breakpoints={{ xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' }}
      >
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>1</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>2</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>3</Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>4</Grid.Col>
      </Grid>
    </div>
  );
}
```


## Browser support

Grid component uses flexbox with native `gap` for layout, which is supported in all modern browsers.

### Container queries

When using `type="container"`, the Grid component uses [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries).
Container queries are supported in the following browsers:

* Chrome 105+
* Safari 16+
* Firefox 110+
* Edge 105+

If you need to support older browsers, use the default `type="media"` which uses standard media queries
instead of container queries.

Example with media queries (default):

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid gap="md">
      <Grid.Col span={{ base: 12, md: 6 }}>1</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>2</Grid.Col>
    </Grid>
  );
}
```

Example with container queries:

```tsx
import { Grid } from '@mantine/core';

function Demo() {
  return (
    <Grid
      type="container"
      breakpoints={{ xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' }}
      gap="md"
    >
      <Grid.Col span={{ base: 12, md: 6 }}>1</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>2</Grid.Col>
    </Grid>
  );
}
```


#### Props

**Grid props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | AlignItems | - | Sets `align-items` |
| breakpoints | GridBreakpoints | - | Breakpoints values, only used with `type="container"` |
| columnGap | StyleProp<MantineSpacing> | - | Column gap, overrides `gap` for horizontal spacing |
| columns | number | - | Number of columns in each row |
| gap | StyleProp<MantineSpacing> | - | Gap between columns and rows, key of `theme.spacing` or any valid CSS value |
| grow | boolean | - | If set, columns in the last row expand to fill all available space |
| justify | JustifyContent | - | Sets `justify-content` |
| overflow | Overflow | - | Sets `overflow` CSS property on the root element |
| rowGap | StyleProp<MantineSpacing> | - | Row gap, overrides `gap` for vertical spacing |
| type | "media" \| "container" | - | Type of queries used for responsive styles |

**Grid.Col props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | StyleProp<AlignSelf> | - | Vertical alignment of the column, controls `align-self` CSS property |
| offset | StyleProp<number> | - | Column start offset – number of empty columns before this column |
| order | StyleProp<number> | - | Column order, use to reorder columns at different viewport sizes |
| span | StyleProp<ColSpan> | - | Column span |


#### Styles API

Grid component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Grid selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| container | .mantine-Grid-container | Container element, only used with `type="container"` prop |
| root | .mantine-Grid-root | Root element |
| inner | .mantine-Grid-inner | Columns wrapper |
| col | .mantine-Grid-col | `Grid.Col` root element |

**Grid CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --grid-overflow | Controls `overflow` property |
| root | --grid-align | Controls `align-items` property |
| root | --grid-justify | Controls `justify-content` property |

**Grid data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-with-gap | CSS variables for gap, rowGap, and columnGap are set. Variables include: --grid-gap, --grid-row-gap, --grid-column-gap, --grid-margin, --grid-col-padding-x, --grid-col-padding-y | true |
| col | data-with-col-vars | CSS variables for column layout are set. Variables include: --col-flex-grow, --col-flex-basis, --col-width, --col-max-width, --col-offset, --col-order, --col-align-self | true |


--------------------------------------------------------------------------------

### Group
Package: @mantine/core
Import: import { Group } from '@mantine/core';
Description: Compose elements and components in a horizontal flex container

