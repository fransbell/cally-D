## Usage

`Group` is a horizontal flex container. If you need a vertical flex container, use the [Stack](https://mantine.dev/llms/core-stack.md)
component instead. If you need to have full control over flex container properties, use the [Flex](https://mantine.dev/llms/core-flex.md) component.

```tsx
import { Group, Button } from '@mantine/core';

function Demo() {
  return (
    <Group justify="flex-start" gap="md" grow={false}>
      <Button variant="default">First</Button>
      <Button variant="default">Second</Button>
      <Button variant="default">Third</Button>
    </Group>
  );
}
```


## preventGrowOverflow

The `preventGrowOverflow` prop allows you to control how `Group` children should behave when there is not enough
space to fit them all on one line. By default, children are not allowed to take more space than
`(1 / children.length) * 100%` of parent width (`preventGrowOverflow` is set to `true`). To change
this behavior, set `preventGrowOverflow` to `false` and children will be allowed to grow and take
as much space as they need.

```tsx
import { Group, Button, Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Box style={{ overflow: 'hidden' }}>
      <Box maw={500} p="md" mx="auto" bg="var(--mantine-color-blue-light)">
        <Text size="sm" mb={5}>
          preventGrowOverflow: true – each child width is always limited to 33% of parent width
          (since there are 3 children)
        </Text>

        <Group grow wrap="nowrap">
          <Button variant="default">First button</Button>
          <Button variant="default">Second button with large content</Button>
          <Button variant="default">Third button</Button>
        </Group>

        <Text size="sm" mb={5} mt="md">
          preventGrowOverflow: false – children will grow based on their content, they can take more
          than 33% of parent width
        </Text>

        <Group grow preventGrowOverflow={false} wrap="nowrap">
          <Button variant="default">First button</Button>
          <Button variant="default">Second button with large content</Button>
          <Button variant="default">Third button</Button>
        </Group>
      </Box>
    </Box>
  );
}
```


## Group children

**!important** `Group` works correctly only with React elements.
Strings, numbers, fragments may have incorrect styles if the `grow` prop is set:

```tsx
// Invalid Group usage, do not do this
import { Group } from '@mantine/core';

function InvalidDemo() {
  return (
    <Group grow>
      First string
      <>
        <div>element inside fragment</div>
        <div>another inside fragment</div>
      </>
      {20}
    </Group>
  );
}
```

## Browser support

Flex component uses CSS flexbox gap to add spacing between children. Flexbox gap is supported by all modern browsers, but if you need to support older browsers, use Space component instead.


#### Props

**Group props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | AlignItems | - | Controls `align-items` CSS property |
| gap | MantineSpacing | - | Key of `theme.spacing` or any valid CSS value for `gap`, numbers are converted to rem |
| grow | boolean | - | Determines whether each child element should have `flex-grow: 1` style |
| justify | JustifyContent | - | Controls `justify-content` CSS property |
| preventGrowOverflow | boolean | - | Determines whether children should take only dedicated amount of space (`max-width` style is set based on the number of children) |
| wrap | FlexWrap | - | Controls `flex-wrap` CSS property |


#### Styles API

Group component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Group-root | Root element |

**Group CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --group-align | Controls `align-items` property |
| root | --group-justify | Controls `justify-content` property |
| root | --group-gap | Controls `gap` property |
| root | --group-wrap | Controls `flex-wrap` property |

**Group data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-grow | `grow` prop is set | - |


--------------------------------------------------------------------------------

### Highlight
Package: @mantine/core
Import: import { Highlight } from '@mantine/core';
Description: Highlight given part of a string with mark

## Usage

Use the Highlight component to highlight substrings within text using the HTML `<mark>` element.

Pass the text as children and specify which substring(s) to highlight with the `highlight` prop.
Matching is **case-insensitive** and highlights all occurrences of the matched substring.

```tsx
import { Highlight } from '@mantine/core';

function Demo() {
  return (
    <Highlight color="yellow" highlight="this" children="Highlight This, definitely THIS and also this!">
      {{children}}
    </Highlight>
  );
}
```


## Matching behavior

* **Case-insensitive**: 'hello' matches 'Hello', 'HELLO', 'hElLo', etc.
* **All occurrences**: Every instance of the matched substring is highlighted
* **Special characters**: Regex special characters like `[`, `]`, `(`, `)` are automatically escaped and treated as literal text
* **Whitespace**: Leading and trailing whitespace in highlight strings is trimmed and ignored
* **Empty strings**: Empty or whitespace-only highlight strings are ignored

## Highlight multiple substrings

To highlight multiple substrings, provide an array of values.
When multiple substrings are provided, longer matches take precedence to avoid partial overlaps.

```tsx
import { Highlight } from '@mantine/core';

function Demo() {
  return <Highlight highlight={['this', 'that']}>Highlight this and also that</Highlight>;
}
```


## Custom colors per term

You can assign different colors to different highlighted terms by providing an array of objects with `text` and `color` properties:

```tsx
import { Highlight } from '@mantine/core';

function Demo() {
  return (
    <Highlight
      highlight={[
        { text: 'error', color: 'red' },
        { text: 'warning', color: 'yellow' },
        { text: 'success', color: 'green' },
      ]}
    >
      Error: Invalid input. Warning: Check this field. Success: All tests passed.
    </Highlight>
  );
}
```


## Whole word matching

Use the `wholeWord` prop to match only complete words. When enabled, 'the' will not match 'there' or 'theme':

```tsx
import { Highlight, Stack, Text } from '@mantine/core';

function Demo() {
  return (
    <Stack gap="md">
      <div>
        <Text size="sm" fw={500} mb={5}>
          With whole word matching (wholeWord={'{'}true{'}'})
        </Text>
        <Highlight highlight="the" wholeWord>
          The theme is there
        </Highlight>
      </div>

      <div>
        <Text size="sm" fw={500} mb={5}>
          Without whole word matching (default)
        </Text>
        <Highlight highlight="the">The theme is there</Highlight>
      </div>
    </Stack>
  );
}
```


## Change highlight styles

Default [Mark](https://mantine.dev/llms/core-mark.md) styles can be overwritten with the `highlightStyles` prop,
which accepts either an object with styles or a function that receives the theme as a parameter and returns styles:

```tsx
import { Highlight } from '@mantine/core';

function Demo() {
  return (
    <Highlight
      ta="center"
      highlight={['highlighted', 'default']}
      highlightStyles={{
        backgroundImage:
          'linear-gradient(45deg, var(--mantine-color-cyan-5), var(--mantine-color-indigo-5))',
        fontWeight: 700,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      You can change styles of highlighted part if you do not like default styles
    </Highlight>
  );
}
```


## Text props

Highlight is based on the [Text](https://mantine.dev/llms/core-text.md) component - all Text props except `color` are available.
Use the `color` prop to change the highlight background color, not the text color.

```tsx
import { Highlight } from '@mantine/core';

function Demo() {
  return (
    <Highlight
      component="a"
      href="https://mantine.dev"
      target="_blank"
      highlight="mantine"
      fw={500}
      c="var(--mantine-color-anchor)"
    >
      Mantine website
    </Highlight>
  );
}
```



#### Props

**Highlight props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | string | required | String in which to highlight substrings |
| color | string \| (string & {}) | - | Default background color for all highlighted text. Key of `theme.colors` or any valid CSS color, passed to `Mark` component. Can be overridden per term when using HighlightTerm objects. |
| gradient | MantineGradient | - | Gradient configuration, ignored when `variant` is not `gradient` |
| highlight | string \| string[] \| HighlightTerm[] | required | Substring(s) to highlight in `children`. Can be: - string: single term - string[]: multiple terms with same color - HighlightTerm[]: multiple terms with custom colors per term  - Matching is case-insensitive - Regex special characters are automatically escaped - When multiple substrings are provided, longer matches take precedence - Empty strings and whitespace-only strings are ignored |
| highlightStyles | CSSProperties \| ((theme: MantineTheme) => CSSProperties) | - | Styles applied to `mark` elements |
| inherit | boolean | - | Determines whether font properties should be inherited from the parent |
| inline | boolean | - | Sets `line-height` to 1 for centering |
| lineClamp | number | - | Number of lines after which Text will be truncated |
| size | MantineSize \| (string & {}) | - | Controls `font-size` and `line-height` |
| span | boolean | - | Shorthand for `component="span"` |
| truncate | TextTruncate | - | Side on which Text must be truncated, if `true`, text is truncated from the start |
| wholeWord | boolean | - | Only match whole words (adds word boundaries to regex). When enabled, 'the' will not match 'there'. |


#### Styles API

Highlight component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Highlight selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Highlight-root | Root element |


--------------------------------------------------------------------------------

### HoverCard
Package: @mantine/core
Import: import { HoverCard } from '@mantine/core';
Description: Display popover section when target element is hovered

## Usage

```tsx
import { HoverCard, Button, Text, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <HoverCard width={280} shadow="md">
        <HoverCard.Target>
          <Button>Hover to reveal the card</Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
            Hover card is revealed when user hovers over target element, it will be hidden once
            mouse is not over both target and dropdown elements
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
```


## Delays

Set open and close delays in ms with the `openDelay` and `closeDelay` props:

```tsx
import { HoverCard, Button, Text, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <HoverCard shadow="md" openDelay={1000}>
        <HoverCard.Target>
          <Button>1000ms open delay</Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">Opened with 1000ms delay</Text>
        </HoverCard.Dropdown>
      </HoverCard>

      <HoverCard shadow="md" closeDelay={1000}>
        <HoverCard.Target>
          <Button>1000ms close delay</Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">Will close with 1000ms delay</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
```


## HoverCard delay group

Use the `HoverCard.Group` component to sync open and close delays of multiple `HoverCard` components:

```tsx
import { HoverCard, Button, Text, Group } from '@mantine/core';

function Demo() {
  return (
    <HoverCard.Group openDelay={500} closeDelay={100}>
      <Group justify="center">
        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>First</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">First hover card content</Text>
          </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>Second</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">Second hover card content</Text>
          </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard shadow="md">
          <HoverCard.Target>
            <Button>Third</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">Third hover card content</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    </HoverCard.Group>
  );
}
```


## With interactive elements

`HoverCard` is displayed only when the mouse is over the target element or dropdown.
You can use anchors and buttons within dropdowns, using inputs is not recommended:

```tsx
import { HoverCard, Avatar, Text, Group, Anchor, Stack } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <HoverCard width={320} shadow="md" withArrow openDelay={200} closeDelay={400}>
        <HoverCard.Target>
          <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group>
            <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
            <Stack gap={5}>
              <Text size="sm" fw={700} style={{ lineHeight: 1 }}>
                Mantine
              </Text>
              <Anchor
                href="https://x.com/mantinedev"
                c="dimmed"
                size="xs"
                style={{ lineHeight: 1 }}
              >
                @mantinedev
              </Anchor>
            </Stack>
          </Group>

          <Text size="sm" mt="md">
            Customizable React components and hooks library with focus on usability, accessibility
            and developer experience
          </Text>

          <Group mt="md" gap="xl">
            <Text size="sm">
              <b>0</b> Following
            </Text>
            <Text size="sm">
              <b>1,174</b> Followers
            </Text>
          </Group>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
```


## Target component

The target element determines where the HoverCard will be positioned relative to.

## Accessibility

`HoverCard` is ignored by screen readers and cannot be activated with the keyboard. Use it to display only additional information
that is not required to understand the context.


#### Props

**HoverCard props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| arrowOffset | number | - | Arrow offset in px |
| arrowPosition | 'center' \| 'side' | - | Arrow position |
| arrowRadius | number | - | Arrow `border-radius` in px |
| arrowSize | number | - | Arrow size in px |
| children | React.ReactNode | - | `Popover.Target` and `Popover.Dropdown` components |
| clickOutsideEvents | string[] | - | Events that trigger outside clicks |
| closeDelay | number | - | Delay in ms before the dropdown closes after mouse leaves the target or dropdown. Overridden by HoverCard.Group delay if used within a group. |
| closeOnClickOutside | boolean | - | Determines whether dropdown should be closed on outside clicks |
| closeOnEscape | boolean | - | Determines whether dropdown should be closed when `Escape` key is pressed |
| defaultOpened | boolean | - | Initial opened state for uncontrolled component |
| disabled | boolean | - | If set, popover dropdown will not be rendered |
| floatingStrategy | FloatingStrategy | - | Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy) |
| hideDetached | boolean | - | If set, the dropdown is hidden when the element is hidden with styles or not visible on the screen |
| id | string | - | Id base to create accessibility connections |
| initiallyOpened | boolean | - | Initial opened state |
| keepMounted | boolean | - | If set, the dropdown is not unmounted from the DOM when hidden. `display: none` styles are added instead. |
| middlewares | PopoverMiddlewares | - | Floating ui middlewares to configure position handling |
| offset | number \| FloatingAxesOffsets | - | Offset of the dropdown element |
| onClose | () => void | - | Called when the dropdown is closed |
| onDismiss | () => void | - | Called when the popover is dismissed by clicking outside or by pressing escape |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| onOpen | () => void | - | Called when the dropdown is opened |
| onPositionChange | (position: FloatingPosition) => void | - | Called when dropdown position changes |
| openDelay | number | - | Delay in ms before the dropdown opens after mouse enters the target. Overridden by HoverCard.Group delay if used within a group. |
| overlayProps | OverlayProps & ElementProps<"div"> | - | Props passed down to `Overlay` component |
| portalProps | BasePortalProps | - | Props to pass down to the `Portal` when `withinPortal` is true |
| position | FloatingPosition | - | Dropdown position relative to the target element |
| preventPositionChangeWhenVisible | boolean | - | Prevents popover from flipping/shifting when it the dropdown is visible |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius |
| returnFocus | boolean | - | Determines whether focus should be automatically returned to control when dropdown closes |
| shadow | MantineShadow | - | Key of `theme.shadows` or any other valid CSS `box-shadow` value |
| transitionProps | TransitionProps | - | Props passed down to the `Transition` component. Use to configure duration and animation type. |
| trapFocus | boolean | - | Determines whether focus should be trapped within dropdown |
| width | PopoverWidth | - | Dropdown width, or `'target'` to make dropdown width the same as target element |
| withArrow | boolean | - | Determines whether component should have an arrow |
| withOverlay | boolean | - | Determines whether the overlay should be displayed when the dropdown is opened |
| withRoles | boolean | - | Determines whether dropdown and target elements should have accessible roles |
| withinPortal | boolean | - | Determines whether dropdown should be rendered within the `Portal` |
| zIndex | string \| number | - | Dropdown `z-index` |

**HoverCard..Target props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Target element |
| eventPropsWrapperName | string | - | Name of the prop to wrap event listeners in. Use when the target component expects event listeners in a nested object. For example, some components expect `componentProps={{ onMouseEnter, onMouseLeave }}`. |
| popupType | string | - | Popup accessible type |
| refProp | string | - | Key of the prop that should be used to access element ref |

**HoverCard..Dropdown props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Dropdown content |

**HoverCard..Group props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | `HoverCard` components |
| closeDelay | number | - | Close delay in ms |
| openDelay | number | - | Open delay in ms |

**HoverCard.Target props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Target element |
| eventPropsWrapperName | string | - | Name of the prop to wrap event listeners in. Use when the target component expects event listeners in a nested object. For example, some components expect `componentProps={{ onMouseEnter, onMouseLeave }}`. |
| popupType | string | - | Popup accessible type |
| refProp | string | - | Key of the prop that should be used to access element ref |

**HoverCard.Group props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | `HoverCard` components |
| closeDelay | number | - | Close delay in ms |
| openDelay | number | - | Open delay in ms |


--------------------------------------------------------------------------------

### HueSlider
Package: @mantine/core
Import: import { HueSlider } from '@mantine/core';
Description: Slider component for selecting hue channel in color pickers (0 – 360 degrees)

## Usage

Use `HueSlider` component to allow users to select hue value of a color.
It accepts values from `0` to `360`. `HueSlider` is a part of [ColorPicker](https://mantine.dev/llms/core-color-picker.md) component,
but can also be used separately.

```tsx
import { useState } from 'react';
import { HueSlider, Text } from '@mantine/core';

function Demo() {
  const [value, onChange] = useState(250);

  return (
    <>
      <Text>Hue value: {value}</Text>
      <HueSlider value={value} onChange={onChange} />
    </>
  );
}
```



#### Props

**HueSlider props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| focusable | boolean | - | If set, slider thumb can be focused |
| onChange | (value: number) => void | - | Called when value changes |
| onChangeEnd | (value: number) => void | - | Called when user stops dragging the slider or uses keyboard to change value |
| onScrubEnd | () => void | - | Called when user stops dragging the slider |
| onScrubStart | () => void | - | Called when user starts dragging the slider |
| size | MantineSize | - | Slider size |
| value | number | required | Controlled component value |


#### Styles API

HueSlider component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**HueSlider selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| slider | .mantine-HueSlider-slider | Root element |
| sliderOverlay | .mantine-HueSlider-sliderOverlay | Element used to display various overlays over hue slider |
| thumb | .mantine-HueSlider-thumb | Thumb of the hue slider |


--------------------------------------------------------------------------------

### Image
Package: @mantine/core
Import: import { Image } from '@mantine/core';
Description: Image with optional fallback

## Usage

`Image` is a wrapper for `img` with minimal styles. By default, the image
will take 100% of the parent width. The image size can be controlled with `w`
and `h` [style props](https://mantine.dev/llms/styles-style-props.md).

```tsx
import { Image } from '@mantine/core';

function Demo() {
  return (
    <Image
      radius="md"
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
    />
  );
}
```


## Image height

In most cases, you will need to set the image height to prevent layout jumps when
the image is loading. You can do so with the `h` [style props](https://mantine.dev/llms/styles-style-props.md).

```tsx
import { Image } from '@mantine/core';

function Demo() {
  return (
    <Image
      radius="md"
      h={200}
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
    />
  );
}
```


## Image fit

By default the image has `object-fit: cover` style - it will
resize to cover the parent element. To change this behavior, set `w="auto"` and `fit="contain"` props.

```tsx
import { Image } from '@mantine/core';

function Demo() {
  return (
    <Image
      radius="md"
      h={200}
      w="auto"
      fit="contain"
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
    />
  );
}
```


## Fallback image

Set the `fallbackSrc` prop to display a fallback image when the image fails to load:

```tsx
import { Image } from '@mantine/core';

function Demo() {
  return (
    <Image
      radius="md"
      src={null}
      h={200}
      fallbackSrc="https://placehold.co/600x400?text=Placeholder"
    />
  );
}
```


## Usage with Next.js Image

The `Image` component is a [polymorphic component](https://mantine.dev/llms/guides-polymorphic.md), its root element can be changed with the `component` prop.
You can use it with `next/image` and other similar components.

```tsx
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import myImage from './my-image.jpg';

function Demo() {
  return <Image component={NextImage} src={myImage} alt="My image" />;
}
```


#### Props

**Image props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fallbackSrc | string | - | Image url used as a fallback if the image cannot be loaded |
| fit | ObjectFit | - | Controls `object-fit` style |
| onError | (event: SyntheticEvent<HTMLImageElement, Event>) => void | - | Called when image fails to load |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| src | any | - | Image url |


#### Styles API

Image component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Image selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Image-root | Root element |

**Image CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --image-object-fit | Controls `object-fit` property |
| root | --image-radius | Controls `border-radius` property |

**Image data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-fallback | Image failed to load | - |


--------------------------------------------------------------------------------

### Indicator
Package: @mantine/core
Import: import { Indicator } from '@mantine/core';
Description: Display element at the corner of another element

## Usage

```tsx
import { Indicator, Avatar } from '@mantine/core';

function Demo() {
  return (
    <Indicator color="blue" position="top-end" radius="xl" size={10} disabled={false} withBorder={false} processing={false}>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
      />
    </Indicator>
  );
}
```


## Inline

When the target element has a fixed width, set the `inline` prop to add `display: inline-block;` styles to
the Indicator container. Alternatively, you can set width and height with the `style` prop if you still want the root
element to keep `display: block`.

```tsx
import { Avatar, Indicator } from '@mantine/core';

function Demo() {
  return (
    <Indicator inline label="New" size={16}>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
      />
    </Indicator>
  );
}
```


## Offset

Set `offset` to change the indicator position. It is useful when the Indicator component is
used with children that have border-radius. You can provide a number for uniform offset or an
object with `x` and `y` properties for separate horizontal and vertical offsets:

```tsx
import { Avatar, Indicator } from '@mantine/core';

function Demo() {
  return (
    <Indicator inline size={16} offset={7} position="bottom-end" color="red" withBorder>
      <Avatar
        size="lg"
        radius="xl"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png"
      />
    </Indicator>
  );
}
```


## Processing animation

```tsx
import { Avatar, Indicator } from '@mantine/core';

function Demo() {
  return (
    <Indicator inline processing color="red" size={12}>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png"
      />
    </Indicator>
  );
}
```


## Disabled

Set `disabled` to hide the indicator:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Avatar, Indicator, Button, Stack } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure();

  return (
    <Stack align="center">
      <Indicator inline disabled={!visible} color="red" size={12}>
        <Avatar
          size="lg"
          radius="sm"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
        />
      </Indicator>
      <Button onClick={toggle}>Toggle indicator</Button>
    </Stack>
  );
}
```


## Max value

Set `maxValue` prop to display `{maxValue}+` when the label exceeds the maximum value. This is useful for
notification counters that should not show exact large numbers:

```tsx
import { Avatar, Group, Indicator } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Indicator inline label={50} maxValue={99}>
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
        />
      </Indicator>

      <Indicator inline label={100} maxValue={99}>
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
        />
      </Indicator>

      <Indicator inline label={1000} maxValue={999}>
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png"
        />
      </Indicator>
    </Group>
  );
}
```


## Show zero

By default, the indicator is displayed when the label is `0`. Set `showZero={false}` to hide the indicator
when the label is `0`:

```tsx
import { Avatar, Group, Indicator } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Indicator inline label={0}>
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
        />
      </Indicator>

      <Indicator inline label={0} showZero={false}>
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
        />
      </Indicator>
    </Group>
  );
}
```


## Auto contrast

Set `autoContrast` prop to automatically adjust text color based on the background color to ensure
readable contrast:

```tsx
import { Avatar, Group, Indicator } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Indicator inline label="99" color="lime.4">
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
        />
      </Indicator>

      <Indicator inline label="99" color="lime.4" autoContrast>
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
        />
      </Indicator>

      <Indicator inline label="99" color="cyan.9">
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png"
        />
      </Indicator>

      <Indicator inline label="99" color="cyan.9" autoContrast>
        <Avatar
          size="lg"
          radius="xl"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png"
        />
      </Indicator>
    </Group>
  );
}
```



#### Props

**Indicator props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color value |
| disabled | boolean | - | Hides the indicator when set |
| inline | boolean | - | Changes container display from block to inline-block, use when wrapping elements with fixed width |
| label | React.ReactNode | - | Label displayed inside the indicator, for example, notification count |
| maxValue | number | - | Maximum value to display. If label is a number greater than this value, it will be displayed as `{maxValue}+` |
| offset | number \| { x: number; y: number; } | - | Distance in pixels to offset the indicator from its default position, useful for elements with border-radius. Can be a number for uniform offset or an object with `x` and `y` properties for separate horizontal and vertical offsets |
| position | "bottom-end" \| "bottom-start" \| "top-end" \| "top-start" \| "bottom-center" \| "top-center" \| "middle-center" \| "middle-end" \| "middle-start" | - | Indicator position relative to the target element |
| processing | boolean | - | If set, the indicator has processing animation |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| showZero | boolean | - | Determines whether indicator with label `0` should be displayed |
| size | string \| number | - | Indicator width and height |
| withBorder | boolean | - | Adds border to the root element |
| zIndex | string \| number | - | Indicator z-index |


#### Styles API

Indicator component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Indicator selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Indicator-root | Root element |
| indicator | .mantine-Indicator-indicator | Indicator element |

**Indicator CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --indicator-bottom | Controls `bottom` style |
| root | --indicator-left | Controls `left` style |
| root | --indicator-right | Controls `right` style |
| root | --indicator-top | Controls `top` style |
| root | --indicator-radius | Controls `border-radius` |
| root | --indicator-size | Controls `min-width` and `height` |
| root | --indicator-translate-x | Controls `translateX` style, used for positioning |
| root | --indicator-translate-y | Controls `translateY` style, used for positioning |
| root | --indicator-z-index | Controls `z-index` style |
| root | --indicator-color | Controls `background-color` |
| root | --indicator-text-color | Controls `color` |

**Indicator data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-inline | `inline` prop is set | - |
| indicator | data-with-label | `label` prop is set | - |
| indicator | data-with-border | `withBorder` prop is set | - |
| indicator | data-processing | `processing` prop is set | - |


--------------------------------------------------------------------------------

### Input
Package: @mantine/core
Import: import { Input } from '@mantine/core';
Description: Base component to create custom inputs

## Disclaimer

**!important:** In most cases, you should not use `Input` in your application.
`Input` is a base for other inputs and was not designed to be used directly.
Use `Input` to create custom inputs. For other cases, prefer [TextInput](https://mantine.dev/llms/core-text-input.md)
or another component.

```tsx
import { Input, TextInput } from '@mantine/core';

// Incorrect usage, input is not accessible
function Incorrect() {
  return (
    <Input.Wrapper label="Input label">
      <Input />
    </Input.Wrapper>
  );
}

// Use TextInput instead of Input everywhere you want to use Input,
// it is accessible by default and includes Input.Wrapper
function Correct() {
  return (
    <TextInput label="Input label" description="Input description" />
  );
}
```

## Usage

The `Input` component is used as a base for some other inputs ([NativeSelect](https://mantine.dev/llms/core-native-select.md), [TextInput](https://mantine.dev/llms/core-text-input.md), [Textarea](https://mantine.dev/llms/core-textarea.md), etc.).
The purpose of the `Input` is to provide shared styles and features to other inputs.

```tsx
import { Input } from '@mantine/core';

function Demo() {
  return <Input variant="default" size="sm" radius="md" disabled={false} error={false} placeholder="Input component" />;
}
```


## Loading state

Set `loading` prop to display a loading indicator. By default, the loader is displayed on the right side of the input.
You can change the position with the `loadingPosition` prop to `'left'` or `'right'`. This is useful for async operations like API calls, searches, or validations:

```tsx
import { Input } from '@mantine/core';

function Demo() {
  return <Input placeholder="Your email" loading />;
}
```


## Input sections

Input supports left and right sections to display icons, buttons or other content alongside the input.

```tsx
import { useState } from 'react';
import { Input } from '@mantine/core';
import { AtIcon } from '@phosphor-icons/react';

function Demo() {
  const [value, setValue] = useState('Clear me');
  return (
    <>
      <Input placeholder="Your email" leftSection={<AtIcon size={16} />} />
      <Input
        placeholder="Clearable input"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        mt="md"
        rightSection={
          value ? (
            <Input.ClearButton
              aria-label="Clear input"
              onClick={() => setValue('')}
            />
          ) : null
        }
      />
    </>
  );
}
```


## Change input element

Input is a [polymorphic component](https://mantine.dev/llms/guides-polymorphic.md), the default root element is `input`,
but it can be changed to any other element or component.

Example of using `Input` as `button` and `select`:

```tsx
import { Input } from '@mantine/core';
import { CaretDownIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <Input component="button" pointer>
        Button input
      </Input>

      <Input
        component="select"
        rightSection={<CaretDownIcon size={14} />}
        pointer
        mt="md"
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </Input>
    </>
  );
}
```


## Input.Wrapper component

The `Input.Wrapper` component is used in all other inputs
([TextInput](https://mantine.dev/llms/core-text-input.md), [NativeSelect](https://mantine.dev/llms/core-native-select.md), [Textarea](https://mantine.dev/llms/core-textarea.md), etc.)
under the hood. You *do not need to wrap your inputs with it, as it is already included in all of them*.
Use `Input.Wrapper` only when you want to create custom inputs.

```tsx
import { Input } from '@mantine/core';

function Wrapper() {
  return (
    <Input.Wrapper label="Input label" withAsterisk={false} description="Input description" error="Input error" size="sm">
      <Input placeholder="Input inside Input.Wrapper" />
    </Input.Wrapper>
  );
}
```


## inputWrapperOrder

`inputWrapperOrder` allows configuring the order of `Input.Wrapper` parts.
It accepts an array of four elements: `label`, `input`, `error` and `description`.
Note that it is not required to include all of them – you can use only those that you need.
Parts that are not included will not be rendered.

```tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <TextInput
        label="Custom layout"
        placeholder="Custom layout"
        description="Description below the input"
        inputWrapperOrder={['label', 'error', 'input', 'description']}
      />
      <TextInput
        mt="xl"
        label="Custom layout"
        placeholder="Custom layout"
        description="Error and description are"
        error="both below the input"
        inputWrapperOrder={['label', 'input', 'description', 'error']}
      />
    </>
  );
}
```


## inputContainer

With the `inputContainer` prop, you can enhance inputs that use `Input.Wrapper` under the hood.
For example, you can add a [Tooltip](https://mantine.dev/llms/core-tooltip.md) to the [TextInput](https://mantine.dev/llms/core-text-input.md) when
the input is focused:

```tsx
import { useState } from 'react';
import { TextInput, Tooltip } from '@mantine/core';

function Demo() {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      label="TextInput with tooltip"
      description="Tooltip will be relative to the input"
      placeholder="Focus me to see tooltip"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      inputContainer={(children) => (
        <Tooltip label="Additional information" position="top-start" opened={focused}>
          {children}
        </Tooltip>
      )}
    />
  );
}
```


## required and withAsterisk props

All components that are based on `Input.Wrapper` support `required` and `withAsterisk` props.
When set to true, both of these props will add a red asterisk to the end of the label.
The only difference is whether the input element will have the `required` attribute. Example with
the [TextInput](https://mantine.dev/llms/core-text-input.md) component:

```tsx
import { TextInput } from '@mantine/core';

// Will display required asterisk and add `required` attribute to the input element
function RequiredDemo() {
  return <TextInput label="test-label" required />;
}

// Will only display the asterisk, `required` attribute is not added to the input element
function AsteriskDemo() {
  return <TextInput label="test-label" withAsterisk />;
}
```

## error prop

All inputs that use `Input.Wrapper` under the hood support the `error` prop.
When set to `true`, it will add a red border to the input. You can also pass a React node to display
an error message below the input. To only display an error message without a red border, set the `error` prop
to a React node and `withErrorStyles={false}`:

```tsx
import { TextInput } from '@mantine/core';
import { WarningCircleIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <TextInput placeholder="Error as boolean" label="Error as boolean" error />
      <TextInput
        mt="md"
        placeholder="Error as react node"
        label="Error as react node"
        error="Something went wrong"
      />

      <TextInput
        mt="md"
        placeholder="Without error styles on input"
        label="Without error styles on input"
        error="Something went wrong"
        withErrorStyles={false}
        rightSectionPointerEvents="none"
        rightSection={
          <WarningCircleIcon
            size={20}
            color="var(--mantine-color-error)"
          />
        }
      />
    </>
  );
}
```


## Input.Label, Input.Description and Input.Error components

`Input.Label`, `Input.Error` and `Input.Description` components can be used to create custom
form layouts if the default `Input.Wrapper` layout does not meet your requirements.

```tsx
import { Input } from '@mantine/core';

function Demo() {
  return (
    <>
      <Input.Label required>Input label</Input.Label>
      <Input.Description>Input description</Input.Description>
      <Input.Error>Input error</Input.Error>
    </>
  );
}
```


## Input.Placeholder component

`Input.Placeholder` component can be used to add a placeholder to `Input` and `InputBase` components that are based on the `button` element
or do not support the placeholder property natively:

```tsx
import { Input } from '@mantine/core';

function Demo() {
  return (
    <Input component="button" pointer>
      <Input.Placeholder>Placeholder content</Input.Placeholder>
    </Input>
  );
}
```


## Input.ClearButton component

Use the `Input.ClearButton` component to add a clear button to custom inputs
based on the `Input` component. The `size` of the clear button is automatically
inherited from the input:

```tsx
import { Input } from '@mantine/core';

function Demo(){
  const [value, setValue] = useState('clearable');

  return (
    <Input
      placeholder="Clearable input"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      rightSection={value !== '' ? <Input.ClearButton onClick={() => setValue('')} /> : undefined}
      rightSectionPointerEvents="auto"
      size="sm"
    />
  );
}
```


## Default props on theme

You can add [default props](https://mantine.dev/llms/theming-default-props.md) on the [theme](https://mantine.dev/llms/theming-theme-object.md)
to `Input` and `Input.Wrapper` components. These default props will be inherited by all inputs
that use `Input` and `Input.Wrapper` under the hood ([TextInput](https://mantine.dev/llms/core-text-input.md), [NativeSelect](https://mantine.dev/llms/core-native-select.md), [Textarea](https://mantine.dev/llms/core-textarea.md), etc.):

```tsx
import { TextInput, NativeSelect, MantineProvider, createTheme, Input } from '@mantine/core';

const theme = createTheme({
  components: {
    Input: Input.extend({
      defaultProps: {
        variant: 'filled',
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        inputWrapperOrder: ['label', 'input', 'description', 'error'],
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <TextInput
        label="Text input"
        placeholder="Text input"
        description="Description below the input"
      />

      <NativeSelect
        mt="md"
        label="Native select"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        description="Description below the input"
      />
    </MantineProvider>
  );
}
```


## Styles on theme

Same as with default props, you can use `Input` and `Input.Wrapper` [Styles API](https://mantine.dev/llms/styles-styles-api.md)
on the [theme](https://mantine.dev/llms/theming-theme-object.md) to add styles to all inputs:

```tsx
// Demo.tsx
import { TextInput, NativeSelect, MantineProvider, createTheme, Input } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: classes.label,
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <TextInput label="Text input" placeholder="Text input" />

      <NativeSelect
        mt="md"
        label="Native select"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </MantineProvider>
  );
}

// Demo.module.css
.label {
  background-color: var(--mantine-color-blue-light);
}

.input {
  border: 1px solid var(--mantine-color-violet-filled);
}
```


## Change focus styles

Use `&:focus-within` selector to change inputs focus styles. You can apply these styles to
one component with `classNames` prop or to all inputs with [Styles API](https://mantine.dev/llms/styles-styles-api.md)
on [theme](https://mantine.dev/llms/theming-theme-object.md).

```tsx
// Demo.module.css
.input {
  transition: none;

  &:focus-within {
    outline: 2px solid var(--mantine-color-blue-filled);
    border-color: transparent;
  }
}

// Demo.tsx
import { Input, TextInput } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <>
      <Input placeholder="Regular Input component" classNames={classes} />
      <TextInput
        placeholder="TextInput component"
        label="TextInput component"
        mt="md"
        classNames={classes}
      />
    </>
  );
}
```


## InputBase component

`InputBase` component combines `Input` and `Input.Wrapper` components and supports `component` prop:

```tsx
import { InputBase } from '@mantine/core';

function Demo() {
  return (
    <>
      <InputBase label="Your phone" component="input" placeholder="Your phone" />

      <InputBase label="Custom native select" component="select" mt="md">
        <option value="react">React</option>
        <option value="react">Angular</option>
        <option value="svelte">Svelte</option>
      </InputBase>
    </>
  );
}
```


