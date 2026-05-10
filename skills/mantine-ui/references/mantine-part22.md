## Wrap Timeline.Item

`Timeline` component relies on `Timeline.Item` order. Wrapping `Timeline.Item` is not supported.
Instead, you will need to use different approaches:

```tsx
import { Timeline } from '@mantine/core';

// This will not work, step children will not render
function WillNotWork() {
  return <Timeline.Item title="Nope">It will not work</Timeline.Item>;
}

// Create a separate component for children
function WillWork() {
  return <div>This will work as expected!</div>;
}

function Demo() {
  return (
    <Timeline active={1}>
      <Timeline.Item title="Regular item">First item</Timeline.Item>
      <WillNotWork />
      <Timeline.Item title="Works as expected">
        <WillWork />
      </Timeline.Item>
      <Timeline.Item title="Regular item">Third item</Timeline.Item>
    </Timeline>
  );
}
```


#### Props

**Timeline props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | number | - | Index of the active element |
| align | "left" \| "right" | - | Position of content relative to the bullet |
| autoContrast | boolean | - | If set, adjusts text color based on background color for `filled` variant |
| bulletSize | string \| number | - | Size of the bullet |
| children | React.ReactNode | - | `Timeline.Item` components |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color to control active item colors |
| lineWidth | string \| number | - | Control width of the line |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| reverseActive | boolean | - | If set, the active items direction is reversed without reversing items order |

**Timeline.Item props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| bullet | React.ReactNode | - | React node that should be rendered inside the bullet – icon, image, avatar, etc. By default, large white dot is displayed. |
| children | React.ReactNode | - | Content displayed below the title |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color to control active item colors |
| lineVariant | "dashed" \| "dotted" \| "solid" | - | Controls line border style |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| title | React.ReactNode | - | Item title, displayed next to the bullet |


#### Styles API

Timeline component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Timeline selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Timeline-root | Root element |
| item | .mantine-Timeline-item | Item root element |
| itemBody | .mantine-Timeline-itemBody | Item body, wraps title and content |
| itemTitle | .mantine-Timeline-itemTitle | Item title, controlled by title prop |
| itemContent | .mantine-Timeline-itemContent | Item content, controlled by children prop |
| itemBullet | .mantine-Timeline-itemBullet | Item bullet |

**Timeline CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --tl-bullet-size | Controls bullet `width` and `height` |
| root | --tl-color | Controls active bullet and line colors |
| root | --tl-icon-color | Controls icon color |
| root | --tl-line-width | Controls width of the line between bullets |
| root | --tl-radius | Controls bullet `border-radius` |


--------------------------------------------------------------------------------

### Title
Package: @mantine/core
Import: import { Title } from '@mantine/core';
Description: h1-h6 heading

## Usage

Use the Title component to render h1-h6 headings with Mantine [theme](https://mantine.dev/llms/theming-theme-object.md) styles.
By default, `Title` has no margins and paddings.
You can change `font-size`, `font-weight` and `line-height` per heading with [theme.headings](https://mantine.dev/llms/theming-typography.md).

Set the `order` prop to render a specific element (h1-h6); the default order is `1`:

```tsx
import { Title } from '@mantine/core';

function Demo() {
  return (
    <>
      <Title order={1}>This is h1 title</Title>
      <Title order={2}>This is h2 title</Title>
      <Title order={3}>This is h3 title</Title>
      <Title order={4}>This is h4 title</Title>
      <Title order={5}>This is h5 title</Title>
      <Title order={6}>This is h6 title</Title>
    </>
  );
}
```


## Size

You can change the Title `size` independent of its `order`:

* If you set the size to `h1`-`h6`, then the component will add corresponding `font-size` and `line-height` from the [theme](https://mantine.dev/llms/theming-theme-object.md)
* If you set the size to any other value, then `line-height` will be calculated based on `order` – `size` will impact only `font-size`

```tsx
import { Title } from '@mantine/core';

function Demo() {
  return (
    <>
      <Title order={3} size="h1">
        H3 heading with h1 font-size
      </Title>
      <Title size="h4">H1 heading with h4 font-size</Title>
      <Title size={16}>H1 heading with 16px size</Title>
      <Title size="xs">H1 heading with xs size</Title>
    </>
  );
}
```


## Text wrap

Use the `textWrap` prop to control the [text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)
CSS property. It controls how text inside an element is wrapped.

```tsx
import { Title } from '@mantine/core';

function Demo() {
  return (
    <Title order={3} textWrap="wrap">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatibus inventore iusto
      cum dolore molestiae perspiciatis! Totam repudiandae impedit maxime!
    </Title>
  );
}
```


You can also set `textWrap` on [theme](https://mantine.dev/llms/theming-theme-object.md):

```tsx
import { createTheme, MantineProvider, Title } from '@mantine/core';

const theme = createTheme({
  headings: {
    textWrap: 'wrap',
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Title>Some very long title that should wrap</Title>
    </MantineProvider>
  );
}
```

## Line clamp

Set the `lineClamp` prop to truncate text after the specified number of lines:

```tsx
import { Title, Box } from '@mantine/core';

function Demo() {
  return (
    <Box maw={400}>
      <Title order={2} lineClamp={2}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure doloremque quas dolorum. Quo
        amet earum alias consequuntur quam accusamus a quae beatae, odio, quod provident consectetur
        non repudiandae enim adipisci?
      </Title>
    </Box>
  )
}
```



#### Props

**Title props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| lineClamp | number | - | Number of lines after which heading will be truncated |
| order | TitleOrder | - | Heading order (1-6), controls `font-size` style if `size` prop is not set |
| size | TitleSize | - | Changes title size, if not set, then size is controlled by `order` prop |
| textWrap | "wrap" \| "nowrap" \| "balance" \| "pretty" \| "stable" | - | Heading `text-wrap` CSS property |


#### Styles API

Title component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Title selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Title-root | Root element |

**Title CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --title-fw | Title `font-weight`, by default value from `theme.headings` |
| root | --title-fz | Title `font-size`, by default value from `theme.headings` |
| root | --title-lh | Title `line-height`, by default value from `theme.headings` |
| root | --title-line-clamp | Controls `-webkit-line-clamp` css property |
| root | --title-text-wrap | Controls `text-wrap` css property |

**Title data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-order | - | Value of the `order` prop |
| root | data-line-clamp | `lineClamp` prop is a number | - |


--------------------------------------------------------------------------------

### Tooltip
Package: @mantine/core
Import: import { Tooltip } from '@mantine/core';
Description: Renders tooltip at given element on mouse over or other event

## Usage

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Tooltip">
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```


## Tooltip children

Tooltip requires an element or a component as a single child –
strings, fragments, numbers and multiple elements/components are not supported and **will throw an error**.
Custom components must provide a prop to get the root element ref;
all Mantine components support ref out of the box.

```tsx
import { Badge, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <>
      <Tooltip label="OK">
        <button>Native button – ok</button>
      </Tooltip>

      <Tooltip label="OK">
        <Badge>Mantine component – ok</Badge>
      </Tooltip>

      <Tooltip label="Throws">
        Raw string, NOT OK – will throw an error
      </Tooltip>

      {/* Number, NOT OK – will throw an error */}
      <Tooltip label="Throws">{2}</Tooltip>

      <Tooltip label="Throws">
        <>Fragment, NOT OK, will throw an error</>
      </Tooltip>

      <Tooltip label="Throws">
        <div>More than one node</div>
        <div>NOT OK, will throw an error</div>
      </Tooltip>
    </>
  );
}
```

## Tooltip target

The `target` prop is an alternative to `children`. It accepts a string (selector),
an HTML element or a ref object with an HTML element. Use the `target` prop when you do
not render the tooltip target as a JSX element.

Example of using the `target` prop with a string selector:

```tsx
import { Button, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <>
      <Tooltip target="#hover-me" label="Tooltip over button" />
      <Button id="hover-me">Hover me to see tooltip</Button>
    </>
  );
}
```


## Required ref prop

Custom components that are rendered inside `Tooltip` are required to support `ref` prop:

```tsx
// Example of code that WILL NOT WORK
import { Tooltip } from '@mantine/core';

function MyComponent() {
  return <div>My component</div>;
}

// This will not work – MyComponent does not support ref
function Demo() {
  return (
    <Tooltip label="Does not work">
      <MyComponent />
    </Tooltip>
  );
}
```

The component must support `ref` prop:

```tsx
// Example of code that will work
import { Tooltip } from '@mantine/core';

const MyComponent = ({ ref, ...props }) => (
  <div ref={ref} {...props}>
    My component
  </div>
);

// Works correctly – ref is forwarded
function Demo() {
  return (
    <Tooltip label="Works fine">
      <MyComponent />
    </Tooltip>
  );
}
```

## Color

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Tooltip" color="blue">
      <Button>With tooltip</Button>
    </Tooltip>
  );
}
```


## Offset

Set the `offset` prop to a number to change the tooltip position relative to the target element.
This way you can control the tooltip offset on the main axis only.

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Tooltip" opened position="top" offset={5}>
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```


To control the offset on both axes, pass an object with `mainAxis` and `crossAxis` properties:

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip
      position="top"
      opened
      label="Tooltip"
      offset={{ mainAxis: 5, crossAxis: 0 }}
    >
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```


## Arrow

Set the `withArrow` prop to add an arrow to the tooltip. The arrow is a `div` element rotated with `transform: rotate(45deg)`.

The `arrowPosition` prop determines how the arrow is positioned relative to the target element when `position` is set to `*-start` and `*-end` values on the `Popover` component.
By default, the value is `center` – the arrow is positioned in the center of the target element if it is possible.

If you change `arrowPosition` to `side`, then the arrow will be positioned on the side of the target element,
and you will be able to control the arrow offset with the `arrowOffset` prop. Note that when `arrowPosition` is set to `center`,
the `arrowOffset` prop is ignored.

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip arrowPosition="center" arrowOffset={10} arrowSize={4} arrowRadius={0} label="Tooltip" withArrow opened position="top-start">
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  const [opened, setOpened] = useState(true);

  return (
    <Tooltip label="Ctrl + J" opened={opened}>
      <Button onClick={() => setOpened((o) => !o)}>
        Toggle color scheme
      </Button>
    </Tooltip>
  );
}
```


## Change events

Events that trigger the tooltip can be changed with the `events` prop; it accepts an object
with the following properties that determine which events will trigger the tooltip:

* `hover` – mouse hover event, `true` by default
* `focus` – focus/blur events excluding clicks on the target element, `false` by default
* `touch` – events for touchscreen devices, `false` by default

```tsx
import { Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip
      label="Tooltip"
      events={{ hover: true, focus: true, touch: false }}
    >
      <button>target</button>
    </Tooltip>
  );
}
```

## Multiline

To enable multiline mode, set the `multiline` prop to enable line breaks and the `w` [style prop](https://mantine.dev/llms/styles-style-props.md) to set the tooltip width:

```tsx
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip
      multiline
      w={220}
      withArrow
      transitionProps={{ duration: 200 }}
      label="Use this button to save this information in your profile, after that you will be able to access it any time and share it via email."
    >
      <Button>Multiline tooltip</Button>
    </Tooltip>
  );
}
```


## Inline

Set the `inline` prop to use `Tooltip` with inline elements:

```tsx
import { Tooltip, Mark, Text } from '@mantine/core';

function Demo() {
  return (
    <Text>
      Stantler’s magnificent antlers were traded at high prices as works of art. As a result, this
      Pokémon was hunted close to extinction by those who were after the priceless antlers.{' '}
      <Tooltip inline label="Inline tooltip">
        <Mark>When visiting a junkyard</Mark>
      </Tooltip>
      , you may catch sight of it having an intense fight with Murkrow over shiny objects.Ho-Oh’s
      feathers glow in seven colors depending on the angle at which they are struck by light. These
      feathers are said to bring happiness to the bearers. This Pokémon is said to live at the foot
      of a rainbow.
    </Text>
  );
}
```


## Change transition

Tooltip is built with the [Transition](https://mantine.dev/llms/core-transition.md) component; it supports `transitionProps` props:

```tsx
import { Button, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip
      label="Tooltip with custom transition"
      transitionProps={{ transition: 'skew-up', duration: 300 }}
    >
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```

All available premade transitions:

```tsx
function Demo() {
  const transitions = keys(MANTINE_TRANSITIONS).map((transition) => (
    <Tooltip key={transition} label={transition} transitionProps={{ transition, duration: 300 }}>
      <Badge variant="light">{transition}</Badge>
    </Tooltip>
  ));

  return (
    <Group justify="center" style={{ cursor: 'default' }}>
      {transitions}
    </Group>
  );
}
```


## Close and open delay

You can delay tooltip open/close events by setting the `openDelay` and `closeDelay` props in ms:

```tsx
import { Button, Tooltip, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Tooltip label="Opened after 500ms" openDelay={500}>
        <Button>Delay open - 500ms</Button>
      </Tooltip>
      <Tooltip label="Closes after 500ms" closeDelay={500}>
        <Button>Delay close - 500ms</Button>
      </Tooltip>
    </Group>
  );
}
```


## Tooltip delay group

The `Tooltip.Group` component can be used to sync open and close delays for multiple tooltips:

```tsx
import { Tooltip, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Tooltip.Group openDelay={500} closeDelay={100}>
      <Group justify="center">
        <Tooltip label="Tooltip 1">
          <Button>Button 1</Button>
        </Tooltip>
        <Tooltip label="Tooltip 2">
          <Button>Button 2</Button>
        </Tooltip>
        <Tooltip label="Tooltip 3">
          <Button>Button 3</Button>
        </Tooltip>
      </Group>
    </Tooltip.Group>
  );
}
```


## Floating tooltip

`Tooltip.Floating` component has the same API as the Tooltip component but the tooltip will follow the mouse:

```tsx
import { Box, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip.Floating label="Floating tooltip">
      <Box p="xl" bg="var(--mantine-color-blue-light)" style={{ cursor: 'default' }}>
        Hover over the box to see tooltip
      </Box>
    </Tooltip.Floating>
  );
}
```


## Accessibility

Tooltip follows [WAI-ARIA recommendations](https://www.w3.org/TR/wai-aria-practices/#tooltip):

* The tooltip body has `role="tooltip"` attribute
* The target element has `aria-describedby` attribute
* `Tooltip.Floating` is ignored by screen readers

By default, Tooltip is not triggered by focus events and thus users who use a screen reader
or navigate with the keyboard will not be able to get tooltip content. Set the `events` prop to enable
focus/blur tooltip events:

```tsx
import { Button, Tooltip } from '@mantine/core';

// Tooltip will be visible for screen readers
function Demo() {
  return (
    <Tooltip
      label="Tooltip"
      events={{ hover: true, focus: true, touch: false }}
    >
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
```


#### Props

**Tooltip props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| arrowOffset | number | - | Arrow offset in px |
| arrowPosition | 'center' \| 'side' | - | Arrow position relative to the tooltip |
| arrowRadius | number | - | Arrow `border-radius` in px |
| arrowSize | number | - | Arrow size in px |
| autoContrast | boolean | - | If set, adjusts text color based on background color for `filled` variant |
| children | React.ReactNode | - | Target element, must support `ref` prop and `...others` |
| closeDelay | number | - | Close delay in ms |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color, controls tooltip background, by default set based on current color scheme |
| defaultOpened | boolean | - | Uncontrolled tooltip initial opened state |
| disabled | boolean | - | If set, tooltip element will not be rendered |
| events | { hover: boolean; focus: boolean; touch: boolean; } | - | Determines which events will be used to show tooltip |
| floatingStrategy | FloatingStrategy | - | Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy) |
| inline | boolean | - | Must be set if the tooltip target is an inline element |
| keepMounted | boolean | - | If set, the tooltip is not unmounted from the DOM when hidden, `display: none` styles are applied instead |
| label | React.ReactNode | required | Tooltip content |
| middlewares | TooltipMiddlewares | - | Floating ui middlewares to configure position handling, `{ flip: true, shift: true, inline: false }` by default |
| multiline | boolean | - | Determines whether content should be wrapped on to the next line, `false` by default |
| offset | number \| FloatingAxesOffsets | - | Space between target element and tooltip in px |
| onPositionChange | (position: FloatingPosition) => void | - | Called when tooltip position changes |
| openDelay | number | - | Open delay in ms |
| opened | boolean | - | Controlled opened state |
| portalProps | Omit<BasePortalProps, "withinPortal"> | - | Props to pass down to the portal when withinPortal is true |
| position | FloatingPosition | - | Tooltip position relative to target element (`Tooltip` component) or mouse (`Tooltip.Floating` component) |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem@default theme.defaultRadius |
| refProp | string | - | Key of the prop that can be used to access element ref, `ref` by default |
| target | string \| HTMLElement \| RefObject<HTMLElement \| null> \| null | - | Selector, ref of an element or element itself that should be used for positioning |
| transitionProps | TransitionProps | - | Props passed down to the `Transition` component that used to animate tooltip presence, use to configure duration and animation type |
| withArrow | boolean | - | If set, the tooltip has an arrow |
| withinPortal | boolean | - | Determines whether tooltip should be rendered within `Portal`, `true` by default |
| zIndex | string \| number | - | Tooltip z-index, `300` by default |


#### Styles API

Tooltip component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Tooltip selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| tooltip | .mantine-Tooltip-tooltip | Root element |
| arrow | .mantine-Tooltip-arrow | Tooltip arrow, rendered inside tooltip |

**Tooltip CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| tooltip | --tooltip-bg | Tooltip `background-color` |
| tooltip | --tooltip-radius | Tooltip `border-radius` |
| tooltip | --tooltip-color | Controls tooltip text color |

**Tooltip data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| tooltip | data-multiline | `multiline` prop is set | - |


--------------------------------------------------------------------------------

### Transition
Package: @mantine/core
Import: import { Transition } from '@mantine/core';
Description: Animate presence of component with pre-made animations

## Usage

The Transition component is designed to animate the presence of elements with
fixed or absolute positioning, such as dropdowns, modals, or tooltips. Other Mantine
components (like [Modal](https://mantine.dev/llms/core-modal.md) and [Tooltip](https://mantine.dev/llms/core-tooltip.md)) use Transition internally
for their animations.

Note that the Transition component is not intended to be a comprehensive solution for all
animations. It is a simple utility for animating the presence of elements
with fixed or absolute positioning. If you need to implement more complex animations,
consider using [Motion](https://motion.dev/), [React Spring](https://www.react-spring.dev/),
or other dedicated animation libraries.

Example usage of the Transition component:

```tsx
import { Transition } from '@mantine/core';

function Demo({ opened }: { opened: boolean }) {
  return (
    <Transition mounted={opened} transition="fade">
      {(styles) => <div style={styles}>Your modal</div>}
    </Transition>
  );
}
```

## Premade transitions

Mantine includes several premade transitions:

```tsx
function Demo() {
  const transitions = keys(MANTINE_TRANSITIONS).map((transition) => (
    <Tooltip key={transition} label={transition} transitionProps={{ transition, duration: 300 }}>
      <Badge variant="light">{transition}</Badge>
    </Tooltip>
  ));

  return (
    <Group justify="center" style={{ cursor: 'default' }}>
      {transitions}
    </Group>
  );
}
```


To use one of them, set the `transition` property to one of these values:

```tsx
import { Transition } from '@mantine/core';

function Demo({ opened }: { opened: boolean }) {
  return (
    <Transition
      mounted={opened}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => <div style={styles}>Your modal</div>}
    </Transition>
  );
}
```

## Custom transitions

You can create your own transition. `transition` is an object with 4 properties:

* `in` – styles for mounted state
* `out` – styles for unmounted state
* `common` (optional) – styles for both mounted and unmounted states
* `transitionProperty` – properties which participate in the transition

```tsx
import { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import { Transition, Paper, Button, Box } from '@mantine/core';

const scaleY = {
  in: { opacity: 1, transform: 'scaleY(1)' },
  out: { opacity: 0, transform: 'scaleY(0)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity',
};

function Demo() {
  const [opened, setOpened] = useState(false);
  const clickOutsideRef = useClickOutside(() => setOpened(false));

  return (
    <Box
      maw={200}
      pos="relative"
      style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
    >
      <Button onClick={() => setOpened(true)}>Open dropdown</Button>
      <Transition
        mounted={opened}
        transition={scaleY}
        duration={200}
        timingFunction="ease"
        keepMounted
      >
        {(transitionStyle) => (
          <Paper
            shadow="md"
            p="xl"
            h={120}
            pos="absolute"
            top={0}
            left={0}
            right={0}
            ref={clickOutsideRef}
            style={{ ...transitionStyle, zIndex: 1 }}
          >
            Dropdown
          </Paper>
        )}
      </Transition>
    </Box>
  );
}
```


## Enter and exit delay

Use the `enterDelay` and `exitDelay` props to delay the transition start. Values are in milliseconds:

```tsx
import { useState } from 'react';
import { Button, Flex, Paper, Transition } from '@mantine/core';

export function Demo() {
  const [opened, setOpened] = useState(false);

  return (
    <Flex maw={200} pos="relative" justify="center" m="auto">
      <Button onClick={() => setOpened(true)}>Open dropdown</Button>

      <Transition mounted={opened} transition="pop" enterDelay={500} exitDelay={300}>
        {(transitionStyle) => (
          <Paper
            shadow="md"
            p="xl"
            h={120}
            pos="absolute"
            inset={0}
            bottom="auto"
            onClick={() => setOpened(false)}
            style={{ ...transitionStyle, zIndex: 1 }}
          >
            Click to close
          </Paper>
        )}
      </Transition>
    </Flex>
  );
}
```


## Reduced motion

Transition respects the `prefers-reduced-motion` media query and your theme's
`respectReducedMotion` setting. When reduced motion is preferred, all
transitions complete instantly:

```tsx
import { createTheme, MantineProvider, Transition } from '@mantine/core';

const theme = createTheme({
  respectReducedMotion: true, // default
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Transition mounted transition="fade" duration={400}>
        {(styles) => <div style={styles}>Content</div>}
      </Transition>
    </MantineProvider>
  );
}
```

This improves accessibility for users with vestibular disorders who may
experience motion sickness from animations.

## Lifecycle callbacks

Use lifecycle callbacks to perform actions at different stages of the transition:

* `onEnter` - Called when enter transition starts
* `onEntered` - Called when enter transition completes
* `onExit` - Called when exit transition starts
* `onExited` - Called when exit transition completes

```tsx
import { Transition } from '@mantine/core';

function Demo() {
  return (
    <Transition
      mounted
      transition="fade"
      duration={200}
      onEnter={() => console.log('Enter started')}
      onEntered={() => console.log('Enter completed')}
      onExit={() => console.log('Exit started')}
      onExited={() => console.log('Exit completed')}
    >
      {(styles) => <div style={styles}>Content</div>}
    </Transition>
  );
}
```

## Keep mounted

By default, the element is unmounted from the DOM when the transition is
complete. Use `keepMounted` to keep the element mounted with `display: none`:

```tsx
import { Transition } from '@mantine/core';

function Demo() {
  return (
    <Transition mounted={false} keepMounted transition="fade">
      {(styles) => <div style={styles}>Content</div>}
    </Transition>
  );
}
```

This is useful when you want to:

* Preserve element state during hide/show
* Avoid remounting overhead
* Maintain focus/scroll position


#### Props

**Transition props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | (styles: CSSProperties) => Element | required | Render function with transition styles argument |
| duration | number | - | Transition duration in ms |
| enterDelay | number | - | Delay in ms before enter transition starts |
| exitDelay | number | - | Delay in ms before exit transition starts |
| exitDuration | number | - | Exit transition duration in ms |
| keepMounted | boolean | - | If set, the element is kept in the DOM when hidden. React 19 `Activity` is used to preserve state while the element is not visible. |
| mounted | boolean | required | Determines whether component should be mounted to the DOM |
| onEnter | () => void | - | Called when enter transition starts |
| onEntered | () => void | - | Called when enter transition ends |
| onExit | () => void | - | Called when exit transition starts |
| onExited | () => void | - | Called when exit transition ends |
| timingFunction | string | - | Transition timing function |
| transition | MantineTransition | - | Transition name or object |


--------------------------------------------------------------------------------

### Tree
Package: @mantine/core
Import: import { Tree } from '@mantine/core';
Description: Display a Tree structure

## Usage

The `Tree` component is used to display hierarchical data. The `Tree` component
has minimal styling by default; you can customize styles with [Styles API](https://mantine.dev/llms/styles-styles-api.md).

```tsx
import { Tree } from '@mantine/core';
import { data } from './data';

function Demo() {
  return <Tree data={data} />;
}
```


## Data prop

Data passed to the `data` prop should follow these rules:

* Data must be a stable reference (memoized)
* Data must be an array
* Each item in the array represents a node in the tree
* Each node must be an object with `value` and `label` keys
* Each node can have a `children` key with an array of child nodes
* The `value` of each node must be unique

Valid data example:

```tsx
// ✅ Valid data, all values are unique
const data = [
  {
    value: 'src',
    label: 'src',
    children: [
      { value: 'src/components', label: 'components' },
      { value: 'src/hooks', label: 'hooks' },
    ],
  },
  { value: 'package.json', label: 'package.json' },
];
```

Invalid data example:

```tsx
// ❌ Invalid data, values are not unique (components is used twice)
const data = [
  {
    value: 'src',
    label: 'src',
    children: [{ value: 'components', label: 'components' }],
  },
  { value: 'components', label: 'components' },
];
```

## Data type

You can import the `TreeNodeData` type to define the data type for your tree:

```tsx
import { TreeNodeData } from '@mantine/core';

const data: TreeNodeData[] = [
  {
    value: 'src',
    label: 'src',
    children: [
      { value: 'src/components', label: 'components' },
      { value: 'src/hooks', label: 'hooks' },
    ],
  },
  { value: 'package.json', label: 'package.json' },
];
```

## renderNode

Use the `renderNode` prop to customize node rendering.
The `renderNode` function receives an object with the following properties as a single argument:

```tsx
export interface RenderTreeNodePayload {
  /** Node level in the tree */
  level: number;

  /** `true` if the node is expanded, applicable only for nodes with `children` */
  expanded: boolean;

  /** `true` if the node has non-empty `children` array or `hasChildren` is set to `true` */
  hasChildren: boolean;

  /** `true` if the node is selected */
  selected: boolean;

  /** `true` if the node's children are currently being loaded */
  isLoading: boolean;

  /** Error from the last failed load attempt, or `null` */
  loadError: Error | null;

  /** Node data from the `data` prop of `Tree` */
  node: TreeNodeData;

  /** Tree controller instance, return value of `useTree` hook */
  tree: TreeController;

  /** Props to spread into the root node element */
  elementProps: {
    className: string;
    style: React.CSSProperties;
    onClick: (event: React.MouseEvent) => void;
    'data-selected': boolean | undefined;
    'data-value': string;
  };

  /** Props to spread into the drag handle element when `withDragHandle` is set on `Tree`,
   * `undefined` otherwise */
  dragHandleProps: { onMouseDown: (event: React.MouseEvent) => void } | undefined;
}
```

```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import { Group, Tree } from '@mantine/core';
import { data } from './data';

function Demo() {
  return (
    <Tree
      data={data}
      levelOffset={23}
      renderNode={({ node, expanded, hasChildren, elementProps }) => (
        <Group gap={5} {...elementProps}>
          {hasChildren && (
            <CaretDownIcon
              size={18}
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          )}

          <span>{node.label}</span>
        </Group>
      )}
    />
  );
}
```


## useTree hook

`useTree` hook can be used to control selected and expanded state of the tree.

The hook accepts an object with the following properties:

```tsx
export interface UseTreeInput {
  /** Initial expanded state of all nodes, uncontrolled state */
  initialExpandedState?: TreeExpandedState;

  /** Expanded state of all nodes, controlled state */
  expandedState?: TreeExpandedState;

  /** Called when the tree expanded state changes */
  onExpandedStateChange?: (expandedState: TreeExpandedState) => void;

  /** Initial selected state of nodes */
  initialSelectedState?: string[];

  /** Selected state of all nodes, controlled state */
  selectedState?: string[];

  /** Called when the tree selected state changes */
  onSelectedStateChange?: (selectedState: string[]) => void;

  /** Initial checked state of nodes */
  initialCheckedState?: string[];

  /** Checked state of all nodes, controlled state */
  checkedState?: string[];

  /** Called when the tree checked state changes */
  onCheckedStateChange?: (checkedState: string[]) => void;

  /** Determines whether multiple node can be selected at a time */
  multiple?: boolean;

  /** Called with the node value when it is expanded */
  onNodeExpand?: (value: string) => void;

  /** Called with the node value when it is collapsed */
  onNodeCollapse?: (value: string) => void;

  /** Called when a node with `hasChildren: true` is expanded for the first time */
  onLoadChildren?: (nodeValue: string) => Promise<void>;

  /** When `true`, checking a parent does not affect children and vice versa.
   * Each node's checked state is fully independent. @default false
   */
  checkStrictly?: boolean;
}
```

And returns an object with the following properties:

```tsx
export interface UseTreeReturnType {
  /** When `true`, each node's checked state is independent (no parent-child cascading) */
  checkStrictly: boolean;

  /** Determines whether multiple node can be selected at a time */
  multiple: boolean;

  /** A record of `node.value` and boolean values that represent nodes expanded state */
  expandedState: TreeExpandedState;

  /** An array of selected nodes values */
  selectedState: string[];

  /** An array of checked nodes values */
  checkedState: string[];

  /** A value of the node that was last clicked
   * Anchor node is used to determine range of selected nodes for multiple selection
   */
  anchorNode: string | null;

  /** Initializes tree state based on provided data, called automatically by the Tree component */
  initialize: (data: TreeNodeData[]) => void;

  /** Toggles expanded state of the node with provided value */
  toggleExpanded: (value: string) => void;

  /** Collapses node with provided value */
  collapse: (value: string) => void;

  /** Expands node with provided value */
  expand: (value: string) => void;

  /** Expands all nodes */
  expandAllNodes: () => void;

  /** Collapses all nodes */
  collapseAllNodes: () => void;

  /** Sets expanded state */
  setExpandedState: React.Dispatch<
    React.SetStateAction<TreeExpandedState>
  >;

  /** Toggles selected state of the node with provided value */
  toggleSelected: (value: string) => void;

  /** Selects node with provided value */
  select: (value: string) => void;

  /** Deselects node with provided value */
  deselect: (value: string) => void;

  /** Clears selected state */
  clearSelected: () => void;

  /** Sets selected state */
  setSelectedState: React.Dispatch<React.SetStateAction<string[]>>;

  /** Checks node with provided value */
  checkNode: (value: string) => void;

  /** Unchecks node with provided value */
  uncheckNode: (value: string) => void;

  /** Checks all nodes */
  checkAllNodes: () => void;

  /** Unchecks all nodes */
  uncheckAllNodes: () => void;

  /** Sets checked state */
  setCheckedState: React.Dispatch<React.SetStateAction<string[]>>;

  /** Returns all checked nodes with status */
  getCheckedNodes: () => CheckedNodeStatus[];

  /** Returns `true` if node with provided value is checked */
  isNodeChecked: (value: string) => boolean;

  /** Returns `true` if node with provided value is indeterminate */
  isNodeIndeterminate: (value: string) => boolean;

  /** Returns `true` if the node's children are currently being loaded */
  isNodeLoading: (value: string) => boolean;

  /** Returns the error from the last failed load attempt, or `null` */
  getNodeLoadError: (value: string) => Error | null;

  /** Programmatically triggers loading of a node's children */
  loadNode: (value: string) => Promise<void>;

  /** Clears the loaded cache for a node, causing it to re-fetch on next expand */
  invalidateNode: (value: string) => void;
}
```

You can pass the value returned by the `useTree` hook to the `tree` prop of the `Tree` component
to control tree state:

```tsx
import { Button, Group, Tree, useTree } from '@mantine/core';
import { data } from './data';

function Demo() {
  const tree = useTree();

  return (
    <>
      <Tree data={data} tree={tree} />
      <Group mt="md">
        <Button onClick={() => tree.expandAllNodes()}>Expand all</Button>
        <Button onClick={() => tree.collapseAllNodes()}>Collapse all</Button>
      </Group>
    </>
  );
}
```


## Checked state

`Tree` can be used to display checked state with checkboxes.
To implement checked state, you need to render `Checkbox.Indicator` in the `renderNode` function:

```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import { Checkbox, Group, RenderTreeNodePayload, Tree } from '@mantine/core';
import { data } from './data';

const renderTreeNode = ({
  node,
  expanded,
  hasChildren,
  elementProps,
  tree,
}: RenderTreeNodePayload) => {
  const checked = tree.isNodeChecked(node.value);
  const indeterminate = tree.isNodeIndeterminate(node.value);

  return (
    <Group gap="xs" {...elementProps}>
      <Checkbox.Indicator
        checked={checked}
        indeterminate={indeterminate}
        onClick={() => (!checked ? tree.checkNode(node.value) : tree.uncheckNode(node.value))}
      />

      <Group gap={5} onClick={() => tree.toggleExpanded(node.value)}>
        <span>{node.label}</span>

        {hasChildren && (
          <CaretDownIcon
            size={14}
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        )}
      </Group>
    </Group>
  );
};

function Demo() {
  return <Tree data={data} levelOffset={23} expandOnClick={false} renderNode={renderTreeNode} />;
}
```


To check/uncheck nodes, use `checkAllNodes` and `uncheckAllNodes` functions:

```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import {
  Button,
  Checkbox,
  getTreeExpandedState,
  Group,
  RenderTreeNodePayload,
  Tree,
  useTree,
} from '@mantine/core';
import { data } from './data';

const renderTreeNode = ({
  node,
  expanded,
  hasChildren,
  elementProps,
  tree,
}: RenderTreeNodePayload) => {
  const checked = tree.isNodeChecked(node.value);
  const indeterminate = tree.isNodeIndeterminate(node.value);

  return (
    <Group gap="xs" {...elementProps}>
      <Checkbox.Indicator
        checked={checked}
        indeterminate={indeterminate}
        onClick={() => (!checked ? tree.checkNode(node.value) : tree.uncheckNode(node.value))}
      />

      <Group gap={5} onClick={() => tree.toggleExpanded(node.value)}>
        <span>{node.label}</span>

        {hasChildren && (
          <CaretDownIcon
            size={14}
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        )}
      </Group>
    </Group>
  );
};

function Demo() {
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(data, '*'),
    initialCheckedState: [
      'node_modules',
      'node_modules/@mantine/core/index.d.ts',
      'node_modules/@mantine/form/package.json',
    ],
  });

  return (
    <>
      <Group mb="md">
        <Button onClick={() => tree.checkAllNodes()}>CheckIcon all</Button>
        <Button onClick={() => tree.uncheckAllNodes()}>Uncheck all</Button>
      </Group>

      <Tree
        tree={tree}
        data={data}
        levelOffset={23}
        expandOnClick={false}
        renderNode={renderTreeNode}
      />
    </>
  );
}
```


## Check strictly

By default, checking a parent node also checks all of its children (and unchecking works
the same way). Set `checkStrictly: true` on `useTree` to make each node's checked state
fully independent – checking a parent does not affect children and vice versa.
In this mode, `isNodeIndeterminate` always returns `false`.

```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import { Checkbox, Group, RenderTreeNodePayload, Tree, useTree } from '@mantine/core';
import { data } from './data';

const renderTreeNode = ({
  node,
  expanded,
  hasChildren,
  elementProps,
  tree,
}: RenderTreeNodePayload) => {
  const checked = tree.isNodeChecked(node.value);

  return (
    <Group gap="xs" {...elementProps}>
      <Checkbox.Indicator
        checked={checked}
        onClick={() =>
          checked
            ? tree.uncheckNode(node.value)
            : tree.checkNode(node.value)
        }
      />

      <Group gap={5} onClick={() => tree.toggleExpanded(node.value)}>
        <span>{node.label}</span>

        {hasChildren && (
          <CaretDownIcon
            size={14}
            style={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}
      </Group>
    </Group>
  );
};

function Demo() {
  const tree = useTree({ checkStrictly: true });
  return (
    <Tree
      data={data}
      tree={tree}
      levelOffset={23}
      expandOnClick={false}
      renderNode={renderTreeNode}
    />
  );
}
```


## Initial expanded state

Expanded state is an object of `node.value` and boolean values that represent nodes expanded state.
To change initial expanded state, pass `initialExpandedState` to the `useTree` hook.
To generate expanded state from data with expanded nodes, you can use `getTreeExpandedState` function:
it accepts data and an array of expanded nodes values and returns expanded state object.

If `'*'` is passed as the second argument to `getTreeExpandedState`, all nodes will be expanded:

```tsx
import { getTreeExpandedState } from '@mantine/core';

// Expand two given nodes
getTreeExpandedState(data, ['src', 'src/components']);

// Expand all nodes
getTreeExpandedState(data, '*');
```

```tsx
import { getTreeExpandedState, Tree, useTree } from '@mantine/core';
import { data } from './data';

function Demo() {
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(data, ['src', 'src/components']),
  });

  return <Tree data={data} tree={tree} />;
}
```


## Async loading

`Tree` supports lazy loading of children. Set `hasChildren: true` on a node without providing `children` –
when the node is expanded for the first time, `onLoadChildren` callback passed to `useTree` is called.
Use the `mergeAsyncChildren` utility to splice loaded children into your data:

```tsx
import { mergeAsyncChildren, Tree, TreeNodeData, useTree } from '@mantine/core';

function Demo() {
  const [data, setData] = useState<TreeNodeData[]>([
    { label: 'Documents', value: 'documents', hasChildren: true },
  ]);

  const tree = useTree({
    onLoadChildren: async (value) => {
      const children = await fetchChildren(value);
      setData((prev) => mergeAsyncChildren(prev, value, children));
    },
  });

  return <Tree data={data} tree={tree} />;
}
```

The `renderNode` payload includes `isLoading` and `loadError` fields that you can use
to display a loading indicator or an error message. Use `tree.invalidateNode(value)` to clear
the cache for a node and allow re-fetching on next expand.

```tsx
import { useState } from 'react';
import { CaretDownIcon, SpinnerIcon } from '@phosphor-icons/react';
import {
  Group,
  mergeAsyncChildren,
  RenderTreeNodePayload,
  Tree,
  TreeNodeData,
  useTree,
} from '@mantine/core';

const initialData: TreeNodeData[] = [
  { label: 'Documents', value: 'documents', hasChildren: true },
  { label: 'Photos', value: 'photos', hasChildren: true },
  { label: 'README.md', value: 'readme' },
];

// Simulates an API call to load children
async function fetchChildren(parentValue: string): Promise<TreeNodeData[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { label: `${parentValue}/file-1.txt`, value: `${parentValue}/file-1.txt` },
    { label: `${parentValue}/file-2.txt`, value: `${parentValue}/file-2.txt` },
    {
      label: `${parentValue}/subfolder`,
      value: `${parentValue}/subfolder`,
      hasChildren: true,
    },
  ];
}

function Leaf({ node, expanded, hasChildren, elementProps, isLoading }: RenderTreeNodePayload) {
  return (
    <Group gap={5} wrap="nowrap" {...elementProps}>
      {isLoading ? (
        <SpinnerIcon size={18} style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }} />
      ) : (
        hasChildren && (
          <CaretDownIcon
            size={18}
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
          />
        )
      )}
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {node.label}
      </span>
    </Group>
  );
}

function Demo() {
  const [data, setData] = useState(initialData);
  const tree = useTree({
    onLoadChildren: async (value) => {
      const children = await fetchChildren(value);
      setData((prev) => mergeAsyncChildren(prev, value, children));
    },
  });

  return (
    <Tree
      data={data}
      tree={tree}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}
```


