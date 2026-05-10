## Responsive max-width

To make `Container` `max-width` responsive, use [Styles API](https://mantine.dev/llms/styles-styles-api.md) to set
`classNames`. For example, you can add a `responsive` size that will make the `Container`
`max-width` different depending on screen size:

```tsx
// Demo.tsx
import cx from 'clsx';
import { MantineProvider, Container, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Container size="responsive" bg="var(--mantine-color-blue-light)">
        Container with responsive size
      </Container>
    </MantineProvider>
  );
}

// Demo.module.css
.responsiveContainer {
  max-width: 300px;

  @media (min-width: em(400px)) {
    max-width: 400px;
  }

  @media (min-width: em(600px)) {
    max-width: 600px;
  }
}
```



#### Props

**Container props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fluid | boolean | - | If set, the container takes 100% width of its parent and `size` prop is ignored. |
| size | MantineSize \| number | - | `max-width` of the container, value is not responsive – it is the same for all screen sizes. Numbers are converted to rem. Ignored when `fluid` prop is set. |
| strategy | "block" \| "grid" | - | Centering strategy |


#### Styles API

Container component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Container selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Container-root | Root element |

**Container CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --container-size | Controls container `max-width` |


--------------------------------------------------------------------------------

### CopyButton
Package: @mantine/core
Import: import { CopyButton } from '@mantine/core';
Description: Copies given text to clipboard

## Usage

`CopyButton` is based on the [use-clipboard](https://mantine.dev/llms/hooks-use-clipboard.md) hook.
Its children is a function that receives an object with the following properties:

* `copied` – boolean value that indicates that a given value was recently copied to the clipboard, it resets after a given timeout (defaults to 500ms)
* `copy` – function that should be called to copy the given value to the clipboard

```tsx
import { CopyButton, Button } from '@mantine/core';

function Demo() {
  return (
    <CopyButton value="https://mantine.dev">
      {({ copied, copy }) => (
        <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
          {copied ? 'Copied url' : 'Copy url'}
        </Button>
      )}
    </CopyButton>
  );
}
```


## Security

Due to security reasons, the `CopyButton` component will not work in iframes and may not work with local files opened with the `file://` protocol
(the component will work fine with local websites that are using the `http://` protocol). You can learn more about `navigator.clipboard` [here](https://web.dev/async-clipboard/).

## Timeout

You can provide a custom `copied` reset `timeout`:

```tsx
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { CopyIcon, CheckIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <CopyButton value="https://mantine.dev" timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}
```


## Server components

CopyButton is not compatible with React Server Components as it uses useEffect and other client-side features. You can use it in client components only.


#### Props

**CopyButton props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | (payload: { copied: boolean; copy: () => void; }) => ReactNode | required | Children callback, provides current status and copy function as an argument |
| timeout | number | - | Copied status timeout in ms |
| value | string | required | Value that is copied to the clipboard when the button is clicked |


--------------------------------------------------------------------------------

### Dialog
Package: @mantine/core
Import: import { Dialog } from '@mantine/core';
Description: Display a fixed overlay dialog at any side of the screen

## Usage

`Dialog` is a simplified version of the [Modal](https://mantine.dev/llms/core-modal.md) component.
It does not include most of the accessibility and usability [Modal](https://mantine.dev/llms/core-modal.md) features:

* Focus trap is not available
* Does not close on click outside
* Does not have an overlay

Use `Dialog` to attract attention with non-important information or actions.
For example, you can create an email subscription form:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';

function Demo() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Group justify="center">
        <Button onClick={toggle}>Toggle dialog</Button>
      </Group>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg">
        <Text size="sm" mb="xs" fw={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
          <Button onClick={close}>Subscribe</Button>
        </Group>
      </Dialog>
    </>
  );
}
```


## Change position

`Dialog` is rendered in [Portal](https://mantine.dev/llms/core-portal.md) and has a fixed position. Set the `position` prop to control the dialog's position:

```tsx
import { Dialog } from '@mantine/core';

function Demo() {
  return (
    <>
      <Dialog position={{ top: 20, left: 20 }} opened>
        Dialog in top left corner
      </Dialog>
      <Dialog position={{ bottom: 20, left: 20 }} opened>
        Dialog in bottom left corner
      </Dialog>
    </>
  );
}
```

## Accessibility

`Dialog` is not accessible and most likely will not be announced by screen readers.
Make sure you do not put any important information in it. In most cases it would be better
to select [Modal](https://mantine.dev/llms/core-modal.md), [Drawer](https://mantine.dev/llms/core-drawer.md) or [Notifications](https://mantine.dev/llms/x-notifications.md).


#### Props

**Dialog props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Dialog content |
| keepMounted | boolean | - | If set, the component uses `display: none` to hide the root element instead of removing the DOM node |
| onClose | () => void | - | Called on close button click |
| opened | boolean | required | Opened state |
| portalProps | BasePortalProps | - | Props passed down to the `Portal` component. Ignored when `withinPortal` is `false`. |
| position | AffixPosition | - | Affix position on screen |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem |
| shadow | MantineShadow | - | Key of `theme.shadows` or any valid CSS value to set `box-shadow` |
| size | MantineSize \| number | - | Controls `width` of the dialog |
| transitionProps | TransitionProps | - | Props passed down to the underlying `Transition` component |
| withBorder | boolean | - | Adds border to the root element |
| withCloseButton | boolean | - | If set, displays the close button |
| withinPortal | boolean | - | Determines whether the component is rendered within `Portal` |
| zIndex | React.CSSProperties["zIndex"] | - | Root element `z-index` property |


#### Styles API

Dialog component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Dialog selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Dialog-root | Root element |
| closeButton | .mantine-Dialog-closeButton | Close button |

**Dialog CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --dialog-size | Controls `width` of the dialog |


--------------------------------------------------------------------------------

### Divider
Package: @mantine/core
Import: import { Divider } from '@mantine/core';
Description: Horizontal line with optional label or vertical divider

## Usage

```tsx
import { Text, Divider } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
        perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
        aliquid commodi atque sunt officiis natus?
      </Text>

      <Divider my="md" />

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
        perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
        aliquid commodi atque sunt officiis natus?
      </Text>

      <Divider my="md" />

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
        perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
        aliquid commodi atque sunt officiis natus?
      </Text>
    </>
  );
}
```


## Variants

```tsx
import { Divider } from '@mantine/core';

function Demo() {
  return (
    <>
      <Divider my="sm" />
      <Divider my="sm" variant="dashed" />
      <Divider my="sm" variant="dotted" />
    </>
  );
}
```


## With label

```tsx
import { Divider, Box, Anchor } from '@mantine/core';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <Divider my="xs" label="Label on the left" labelPosition="left" />
      <Divider my="xs" label="Label in the center" labelPosition="center" />
      <Divider my="xs" label="Label on the right" labelPosition="right" />
      <Divider
        my="xs"
        variant="dashed"
        labelPosition="center"
        label={
          <>
            <MagnifyingGlassIcon size={12} />
            <Box ml={5}>Search results</Box>
          </>
        }
      />
      <Divider
        my="xs"
        label={
          <Anchor href="https://mantine.dev" target="_blank" inherit>
            Link label
          </Anchor>
        }
      />
    </>
  );
}
```


## Sizes

```tsx
import { Divider } from '@mantine/core';

function Demo() {
  return (
    <>
      <Divider size="xs" />
      <Divider size="sm" />
      <Divider size="md" />
      <Divider size="lg" />
      <Divider size="xl" />
      <Divider size={10} />
    </>
  );
}
```


## Vertical orientation

```tsx
import { Divider, Group, Text } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Text>Label</Text>
      <Divider orientation="vertical" />
      <Text>Label</Text>
      <Divider size="sm" orientation="vertical" />
      <Text>Label</Text>
      <Divider size="md" orientation="vertical" />
      <Text>Label</Text>
      <Divider size="lg" orientation="vertical" />
      <Text>Label</Text>
      <Divider size="xl" orientation="vertical" />
      <Text>Label</Text>
    </Group>
  );
}
```



#### Props

**Divider props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color value |
| label | React.ReactNode | - | Divider label, visible only with `orientation="horizontal"` |
| labelPosition | "center" \| "left" \| "right" | - | Label position |
| orientation | "horizontal" \| "vertical" | - | Divider orientation |
| size | MantineSize \| number | - | Controls width/height (depends on orientation) |


#### Styles API

Divider component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Divider selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Divider-root | Root element |
| label | .mantine-Divider-label | Label element |

**Divider CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --divider-border-style | Controls `border-style` |
| root | --divider-color | Controls `border-color` |
| root | --divider-size | Controls `border-width` |

**Divider data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-with-label | `label` prop is truthy | - |
| root | data-orientation | - | Value of `orientation` prop |
| label | data-position | - | Value of `labelPosition` prop |


--------------------------------------------------------------------------------

### Drawer
Package: @mantine/core
Import: import { Drawer } from '@mantine/core';
Description: Display overlay area at any side of the screen

## Usage

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Authentication">
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Position

Drawer can be placed on `left` (default), `top`, `right` and `bottom`. Control the drawer position with the `position` prop,
for example `<Drawer position="top" />`.

```tsx
function Demo() {
  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState<'top' | 'left' | 'right' | 'bottom'>('top');
  const open = (p: typeof position) => {
    setPosition(p);
    setOpened(true);
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="md"
        position={position}
        withCloseButton={false}
      >
        Press escape to close the drawer
      </Drawer>

      <Group justify="center">
        <Button variant="default" onClick={() => open('left')}>
          Left
        </Button>
        <Button variant="default" onClick={() => open('right')}>
          Right
        </Button>
        <Button variant="default" onClick={() => open('top')}>
          Top
        </Button>
        <Button variant="default" onClick={() => open('bottom')}>
          Bottom
        </Button>
      </Group>
    </>
  );
}
```


## Offset

Set the `offset` prop to change the drawer offset from the edge of the viewport:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer offset={8} radius="md" opened={opened} onClose={close} title="Authentication">
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Customize overlay

`Drawer` uses the [Overlay](https://mantine.dev/llms/core-overlay.md) component. You can set any props that [Overlay](https://mantine.dev/llms/core-overlay.md)
supports with `overlayProps`:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Sizes

You can change the drawer width/height (depends on `position`) by setting the `size` prop to a predefined size or any valid width,
for example, `size="55%"` or `size={200}`:

```tsx
import { Drawer } from '@mantine/core';

function Demo() {
  return (
    <Drawer position="right" size="xl" opened onClose={() => {}}>
      {/* Drawer content */}
    </Drawer>
  );
}
```

```tsx
function Demo() {
  const [opened, setOpened] = useState(false);
  const [size, setSize] = useState<number | string>('top');
  const open = (s: typeof size) => {
    setSize(s);
    setOpened(true);
  };

  const controls = (['xs', 'sm', 'md', 'lg', 'xl', '100%', '40rem', '25%'] as const).map((s) => (
    <Button variant="default" onClick={() => open(s)} key={s}>
      {s}
    </Button>
  ));

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="md"
        size={size}
        withCloseButton={false}
      >
        Press escape to close the drawer
      </Drawer>

      <Group justify="center">{controls}</Group>
    </>
  );
}
```


## Remove header

To remove the header, set `withCloseButton={false}`

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} withCloseButton={false}>
        Drawer without header, press escape or click on overlay to close
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Drawer with scroll

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Drawer with scroll</p>);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Header is sticky">
        {content}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Usage with ScrollArea

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, ScrollArea } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Drawer with scroll</p>);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Header is sticky"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {content}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Change transition

`Drawer` is built with the [Transition](https://mantine.dev/llms/core-transition.md) component. Use the `transitionProps`
prop to customize any [Transition](https://mantine.dev/llms/core-transition.md) properties:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        transitionProps={{ transition: 'rotate-left', duration: 150, timingFunction: 'linear' }}
      >
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## onExitTransitionEnd and onEnterTransitionEnd

The `onExitTransitionEnd` and `onEnterTransitionEnd` props can be used to run code after
the exit/enter transition is finished. For example, this is useful when you want to clear
data after the drawer is closed:

```tsx
import { useState } from 'react';
import { Button, Group, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [firstOpened, firstHandlers] = useDisclosure(false);
  const [secondOpened, secondHandlers] = useDisclosure(false);
  const [drawerData, setDrawerData] = useState({
    title: '',
    message: '',
  });

  return (
    <>
      <Drawer
        opened={firstOpened}
        onClose={() => {
          firstHandlers.close();
          setDrawerData({ title: '', message: '' });
        }}
        title={drawerData.title}
      >
        {drawerData.message}
      </Drawer>
      <Drawer
        opened={secondOpened}
        onClose={secondHandlers.close}
        onExitTransitionEnd={() => setDrawerData({ title: '', message: '' })}
        title={drawerData.title}
      >
        {drawerData.message}
      </Drawer>

      <Group>
        <Button
          onClick={() => {
            firstHandlers.open();
            setDrawerData({ title: 'Edit your profile', message: 'Imagine a form here' });
          }}
        >
          Clear data in onClose
        </Button>

        <Button
          onClick={() => {
            secondHandlers.open();
            setDrawerData({ title: 'Edit your profile', message: 'Imagine a form here' });
          }}
        >
          Clear data in onExitTransitionEnd
        </Button>
      </Group>
    </>
  );
}
```


## Initial focus

`Drawer` uses [FocusTrap](https://mantine.dev/llms/core-focus-trap.md) to trap focus. Add the `data-autofocus`
attribute to the element that should receive initial focus.

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, TextInput } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Focus demo">
        <TextInput label="First input" placeholder="First input" />
        <TextInput
          data-autofocus
          label="Input with initial focus"
          placeholder="It has data-autofocus attribute"
          mt="md"
        />
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


If you do not want to focus any elements when the drawer is opened, use the `FocusTrap.InitialFocus`
component to create a visually hidden element that will receive initial focus:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, TextInput, FocusTrap } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Focus demo">
        <FocusTrap.InitialFocus />
        <TextInput label="First input" placeholder="First input" />
        <TextInput
          data-autofocus
          label="Input with initial focus"
          placeholder="It has data-autofocus attribute"
          mt="md"
        />
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


If you do not add the `data-autofocus` attribute and do not use `FocusTrap.InitialFocus`,
the drawer will focus the first focusable element inside it which is usually the close button.

## Control behavior

The following props can be used to control `Drawer` behavior.
In most cases it is not recommended to turn these features off –
it will make the component less accessible.

* `trapFocus` – determines whether focus should be trapped inside drawer
* `closeOnEscape` – determines whether the drawer should be closed when `Escape` key is pressed
* `closeOnClickOutside` – determines whether the drawer should be closed when user clicks on the overlay
* `returnFocus` – determines whether focus should be returned to the element that was focused before the drawer was opened

## react-remove-scroll settings

`Drawer` uses [react-remove-scroll](https://github.com/theKashey/react-remove-scroll)
package to lock scroll. You can pass props down to the `RemoveScroll` component
with `removeScrollProps`:

```tsx
import { Drawer } from '@mantine/core';

function Demo() {
  return (
    <Drawer
      removeScrollProps={{ allowPinchZoom: true }}
      opened
      onClose={() => {}}
    >
      {/* Drawer content */}
    </Drawer>
  );
}
```

## Change close icon

Use `closeButtonProps` to customize close button:

```tsx
import { XCircleIcon } from '@phosphor-icons/react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        closeButtonProps={{
          icon: <XCircleIcon size={20} />,
        }}
      >
        {/* Drawer content */}
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Compound components

You can use the following compound components to have full control over the `Drawer` rendering:

* `Drawer.Root` – context provider
* `Drawer.Overlay` – render [Overlay](https://mantine.dev/llms/core-overlay.md)
* `Drawer.Content` – main drawer element, should include all drawer content
* `Drawer.Header` – sticky header, usually contains `Drawer.Title` and `Drawer.CloseButton`
* `Drawer.Title` – `h2` element, `aria-labelledby` of `Drawer.Content` is pointing to this element, usually is rendered inside `Drawer.Header`
* `Drawer.CloseButton` – close button, usually rendered inside `Drawer.Header`
* `Drawer.Body` – a place for main content, `aria-describedby` of `Drawer.Content` is pointing to this element

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer.Root opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Drawer title</Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>Drawer content</Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}
```


## Drawer.Stack

Use `Drawer.Stack` component to render multiple drawers at the same time.
`Drawer.Stack` keeps track of opened drawers, manages z-index values, focus trapping
and `closeOnEscape` behavior. `Drawer.Stack` is designed to be used with `useDrawersStack` hook.

Differences from using multiple `Drawer` components:

* `Drawer.Stack` manages z-index values – drawers that are opened later will always have higher z-index value disregarding their order in the DOM
* `Drawer.Stack` disables focus trap and `Escape` key handling for all drawers except the one that is currently opened
* Drawers that are not currently opened are present in the DOM but are hidden with `opacity: 0` and `pointer-events: none`
* Only one overlay is rendered at a time

```tsx
import { Button, Group, Drawer, useDrawersStack } from '@mantine/core';

function Demo() {
  const stack = useDrawersStack(['delete-page', 'confirm-action', 'really-confirm-action']);

  return (
    <>
      <Drawer.Stack>
        <Drawer {...stack.register('delete-page')} title="Delete this page?">
          Are you sure you want to delete this page? This action cannot be undone.
          <Group mt="lg" justify="flex-end">
            <Button onClick={stack.closeAll} variant="default">
              Cancel
            </Button>
            <Button onClick={() => stack.open('confirm-action')} color="red">
              Delete
            </Button>
          </Group>
        </Drawer>

        <Drawer {...stack.register('confirm-action')} title="Confirm action">
          Are you sure you want to perform this action? This action cannot be undone. If you are
          sure, press confirm button below.
          <Group mt="lg" justify="flex-end">
            <Button onClick={stack.closeAll} variant="default">
              Cancel
            </Button>
            <Button onClick={() => stack.open('really-confirm-action')} color="red">
              Confirm
            </Button>
          </Group>
        </Drawer>

        <Drawer {...stack.register('really-confirm-action')} title="Really confirm action">
          Jokes aside. You have confirmed this action. This is your last chance to cancel it. After
          you press confirm button below, action will be performed and cannot be undone. For real
          this time. Are you sure you want to proceed?
          <Group mt="lg" justify="flex-end">
            <Button onClick={stack.closeAll} variant="default">
              Cancel
            </Button>
            <Button onClick={stack.closeAll} color="red">
              Confirm
            </Button>
          </Group>
        </Drawer>
      </Drawer.Stack>

      <Button variant="default" onClick={() => stack.open('delete-page')}>
        Open drawer
      </Button>
    </>
  );
}
```


Note that `Drawer.Stack` can only be used with `Drawer` component. Components built with `Drawer.Root`
and other compound components are not compatible with `Drawer.Stack`.

## useDrawersStack hook

`useDrawersStack` hook provides an easy way to control multiple drawers at the same time.
It accepts an array of unique drawers ids and returns an object with the following properties:

```tsx
interface UseDrawersStackReturnType<T extends string> {
  // Current opened state of each drawer
  state: Record<T, boolean>;

  // Opens drawer with the given id
  open: (id: T) => void;

  // Closes drawer with the given id
  close: (id: T) => void;

  // Toggles drawer with the given id
  toggle: (id: T) => void;

  // Closes all drawers within the stack
  closeAll: () => void;

  // Returns props for drawer with the given id
  register: (id: T) => {
    opened: boolean;
    onClose: () => void;
    stackId: T;
  };
}
```

Example of using `useDrawersStack` with `Drawer` component:

```tsx
import { Drawer, useDrawersStack } from '@mantine/core';

function Demo() {
  const stack = useDrawersStack(['first', 'second']);

  return (
    <>
      <Drawer {...stack.register('first')}>First</Drawer>
      <Drawer {...stack.register('second')}>Second</Drawer>
      <Button onClick={() => stack.open('first')}>Open first</Button>
    </>
  );
}
```

## Fixed elements offset

`Drawer` component uses [react-remove-scroll](https://github.com/theKashey/react-remove-scroll)
package to lock scroll. To properly size these `elements` add a `className` to them ([documentation](https://github.com/theKashey/react-remove-scroll#positionfixed-elements)):

```tsx
import { RemoveScroll } from '@mantine/core';

function Demo() {
  return (
    <>
      <div className={RemoveScroll.classNames.fullWidth}>
        width: 100%
      </div>
      <div className={RemoveScroll.classNames.zeroRight}>
        right: 0
      </div>
    </>
  );
}
```

## Accessibility

`Drawer` component follows [WAI-ARIA recommendations](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog) on accessibility.

Set `title` props to make component accessible, will add `aria-labelledby` to the content element:

```tsx
import { Drawer } from '@mantine/core';

function Demo() {
  return <Drawer title="Drawer label" opened onClose={() => {}} />;
}
```

To set close button `aria-label` use `closeButtonProps`:

```tsx
import { Drawer } from '@mantine/core';

function Demo() {
  return (
    <Drawer
      closeButtonProps={{ 'aria-label': 'Close drawer' }}
      opened
      onClose={() => {}}
    />
  );
}
```


#### Props

**Drawer props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Drawer content |
| closeButtonProps | ModalBaseCloseButtonProps | - | Props passed down to the close button |
| closeOnClickOutside | boolean | - | If set, the modal/drawer is closed when user clicks on the overlay |
| closeOnEscape | boolean | - | If set, `onClose` is called when user presses the escape key |
| id | string | - | Id used to connect modal/drawer with body and title |
| keepMounted | boolean | - | If set modal/drawer is not unmounted from the DOM when hidden. `display: none` styles are applied instead. |
| lockScroll | boolean | - | If set, scroll is locked when `opened={true}` |
| offset | string \| number | - | Drawer container offset from the viewport end |
| onClose | () => void | required | Called when modal/drawer is closed |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| opened | boolean | required | Controls opened state |
| overlayProps | ModalBaseOverlayProps | - | Props passed down to the `Overlay` component, can be used to configure opacity, `background-color`, styles and other properties |
| padding | MantineSpacing | - | Key of `theme.spacing` or any valid CSS value to set content, header and footer padding |
| portalProps | BasePortalProps | - | Props passed down to the Portal component when `withinPortal` is set |
| position | DrawerPosition | - | Side of the screen on which drawer will be opened |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| removeScrollProps | RemoveScrollProps | - | Props passed down to react-remove-scroll, can be used to customize scroll lock behavior |
| returnFocus | boolean | - | If set, focus is returned to the last active element when `onClose` is called |
| scrollAreaComponent | ScrollAreaComponent | - | Scroll area component |
| shadow | MantineShadow | - | Key of `theme.shadows` or any valid CSS box-shadow value |
| size | MantineSize \| number | - | Controls width of the content area |
| stackId | string | - | Id of the drawer in the `Drawer.Stack` |
| title | React.ReactNode | - | Drawer title |
| transitionProps | TransitionProps | - | Props added to the `Transition` component that used to animate overlay and body, use to configure duration and animation type, `{ duration: 200, transition: 'fade-down' }` by default |
| trapFocus | boolean | - | If set, focus is trapped within the modal/drawer |
| withCloseButton | boolean | - | If set, the close button is displayed |
| withOverlay | boolean | - | If set, the overlay is displayed |
| withinPortal | boolean | - | If set, the component is rendered inside `Portal` |
| zIndex | string \| number | - | `z-index` CSS property of the root element |


#### Styles API

Drawer component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Drawer selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Drawer-root | Root element |
| inner | .mantine-Drawer-inner | Element used to center modal, has fixed position, takes entire screen |
| content | .mantine-Drawer-content | `Drawer.Content` root element |
| header | .mantine-Drawer-header | Contains title and close button |
| overlay | .mantine-Drawer-overlay | Overlay displayed under the `Drawer.Content` |
| title | .mantine-Drawer-title | Drawer title (h2 tag), displayed in the header |
| body | .mantine-Drawer-body | Drawer body, displayed after header |
| close | .mantine-Drawer-close | Close button |

**Drawer CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --drawer-offset | Controls `margin` of `Drawer.Content` |
| root | --drawer-size | Controls `width` of `Drawer.Content` |
| root | --drawer-flex | Controls `flex` property of `Drawer.Content` |
| root | --drawer-align | Controls `align-items` property of `Drawer.Content` |
| root | --drawer-justify | Controls `justify-content` property of `Drawer.Content` |
| root | --drawer-height | Controls `height` property of `Drawer.Content` |


--------------------------------------------------------------------------------

### Fieldset
Package: @mantine/core
Import: import { Fieldset } from '@mantine/core';
Description: Group related elements in a form

## Usage

```tsx
import { Fieldset, TextInput } from '@mantine/core';

function Demo() {
  return (
    <Fieldset legend="Personal information" variant="default" radius="md">
      <TextInput label="Your name" placeholder="Your name" />
      <TextInput label="Email" placeholder="Email" mt="md" />
    </Fieldset>
  );
}
```


## Disabled

`disabled` prop disables all inputs and buttons inside the fieldset:

```tsx
import { Fieldset, TextInput, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Fieldset legend="Personal information" disabled>
      <TextInput label="Your name" placeholder="Your name" />
      <TextInput label="Email" placeholder="Email" mt="md" />

      <Group justify="flex-end" mt="md">
        <Button>Submit</Button>
      </Group>
    </Fieldset>
  );
}
```



#### Props

**Fieldset props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| legend | React.ReactNode | - | Fieldset legend |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |


#### Styles API

Fieldset component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Fieldset selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Fieldset-root | Root element |
| legend | .mantine-Fieldset-legend | Legend element |

**Fieldset CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --fieldset-radius | Controls `border-radius` |


--------------------------------------------------------------------------------

### FileButton
Package: @mantine/core
Import: import { FileButton } from '@mantine/core';
Description: Open file picker with a button click

## Usage

```tsx
import { useState } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';

function Demo() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
    </>
  );
}
```


## Multiple files

Set the `multiple` prop to allow picking multiple files:

```tsx
import { useState } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';

function Demo() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      {files.length > 0 && (
        <Text size="sm" mt="sm">
          Picked files:
        </Text>
      )}

      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </>
  );
}
```


## Reset file

`resetRef` should be used to fix the issue with stale value on the hidden input element as input type file cannot be controlled.
Call `resetRef` when the user selection is cleared:

```tsx
import { useState, useRef } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';

function Demo() {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  return (
    <>
      <Group justify="center">
        <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
    </>
  );
}
```


## Server components

FileButton is not compatible with React Server Components as it uses useEffect and other client-side features. You can use it in client components only.


#### Props

**FileButton props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accept | string | - | File input accept attribute, for example, `"image/png,image/jpeg"` |
| capture | boolean \| "user" \| "environment" | - | Specifies that, optionally, a new file should be captured, and which device should be used to capture that new media of a type defined by the accept attribute. |
| children | (props: { onClick: () => void; }) => ReactNode | required | Function that receives button props and returns react node that should be rendered |
| disabled | boolean | - | Disables file picker |
| form | string | - | Input form attribute |
| inputProps | React.ComponentProps<"input"> | - | Passes down props to the input element used to capture files |
| multiple | boolean | - | If set, user can pick more than one file |
| name | string | - | Input name attribute |
| onChange | (payload: Multiple extends true ? File[] : File \| null) => void | required | Called when files are picked |
| resetRef | Ref<() => void> | - | Reference of the function that should be called when value changes to null or empty array |


--------------------------------------------------------------------------------

### FileInput
Package: @mantine/core
Import: import { FileInput } from '@mantine/core';
Description: Capture files from user

## Usage

FileInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. FileInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { FileInput } from '@mantine/core';


function Demo() {
  return (
    <FileInput
       variant="default" size="sm" radius="md" label="Input label" withAsterisk={false} description="Input description" error=""
      placeholder="Input placeholder"
    />
  );
}
```


## Loading state

Set `loading` prop to display a loading indicator. By default, the loader is displayed on the right side of the input.
You can change the position with the `loadingPosition` prop to `'left'` or `'right'`. This is useful for async operations like API calls, searches, or validations:

```tsx
import { FileInput } from '@mantine/core';

function Demo() {
  return <FileInput placeholder="Upload file" loading />;
}
```


## Controlled

When `multiple` is `false`:

```tsx
import { useState } from 'react';
import { FileInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<File | null>(null);
  return <FileInput value={value} onChange={setValue} />;
}
```

When `multiple` is `true`:

```tsx
import { useState } from 'react';
import { FileInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<File[]>([]);
  return <FileInput multiple value={value} onChange={setValue} />;
}
```

## Uncontrolled

`FileInput` can be used with uncontrolled forms the same way as a native `input[type="file"]`.
Set the `name` attribute to include file input value in `FormData` object on form submission.
To control the initial value in uncontrolled forms, use the `defaultValue` prop.

Example usage of uncontrolled `FileInput` with `FormData`:

```tsx
import { FileInput } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const files = formData.getAll('file');
        console.log('File input value:', files);
      }}
    >
      <FileInput label="Upload your file" name="file" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Multiple

Set `multiple` to allow the user to pick more than one file:

```tsx
import { FileInput } from '@mantine/core';

function Demo() {
  return <FileInput label="Upload files" placeholder="Upload files" multiple />;
}
```


## Accept

Set the `accept` prop to restrict file selection to specific mime types:

```tsx
import { FileInput } from '@mantine/core';

function Demo() {
  return (
    <FileInput accept="image/png,image/jpeg" label="Upload files" placeholder="Upload files" />
  );
}
```


## Clearable

Set the `clearable` prop to display a clear button in the right section of the input
when a file is selected. Note that if you define a custom right section, the clear button
will not be rendered.

```tsx
import { FileInput } from '@mantine/core';

function Demo() {
  return <FileInput clearable label="Upload files" placeholder="Upload files" />;
}
```


```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import { FileInput, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <FileInput
        label="clearSectionMode='both' (default)"
        placeholder="Pick file"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <FileInput
        label="clearSectionMode='rightSection'"
        placeholder="Pick file"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <FileInput
        label="clearSectionMode='clear'"
        placeholder="Pick file"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
```


## Custom value component

```tsx
import { FileInput, FileInputProps, Pill } from '@mantine/core';

const ValueComponent: FileInputProps['valueComponent'] = ({ value }) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Pill.Group>
        {value.map((file, index) => (
          <Pill key={index}>{file.name}</Pill>
        ))}
      </Pill.Group>
    );
  }

  return <Pill>{value.name}</Pill>;
};

function Demo() {
  return (
    <FileInput
      label="Upload files"
      placeholder="Upload files"
      multiple
      valueComponent={ValueComponent}
    />
  );
}
```


## Error state

```tsx
import { FileInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <FileInput label="Boolean error" placeholder="Boolean error" error />
      <FileInput
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
      />
    </>
  );
}
```


