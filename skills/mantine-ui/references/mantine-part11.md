## Customization

Use the following props to customize the marquee behavior:

* `reverse` – reverses animation direction
* `pauseOnHover` – pauses animation on hover
* `orientation` – `horizontal` (default) or `vertical` scroll direction
* `repeat` – number of times children are repeated for seamless scrolling (default: 4)
* `duration` – animation duration in ms (default: 40000)
* `gap` – gap between repeated children, key of `theme.spacing` or any valid CSS value

```tsx
import { Marquee } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';

function Demo() {
  return (
    <Marquee reverse={false} pauseOnHover={false} orientation="horizontal" repeat={4} duration={40000} gap="md" fadeEdges={true} mah={200} maw={400}>
      <MantineLogo width={120} type="full" color="blue" />
      <MantineLogo width={120} type="full" color="cyan" />
      <MantineLogo width={120} type="full" color="teal" />
      <MantineLogo width={120} type="full" color="green" />
      <MantineLogo width={120} type="full" color="lime" />
      <MantineLogo width={120} type="full" color="yellow" />
      <MantineLogo width={120} type="full" color="orange" />
      <MantineLogo width={120} type="full" color="red" />
    </Marquee>
  );
}
```



#### Props

**Marquee props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Content to scroll |
| duration | number | - | Animation duration in ms |
| fadeEdgeColor | string | - | Color of the fade gradient, |
| fadeEdgeSize | string | - | Size of the fade gradient, |
| fadeEdges | boolean | - | Whether to show gradient fade on edges, |
| gap | MantineSpacing | - | Gap between repeated children, key of `theme.spacing` or any valid CSS value |
| orientation | "horizontal" \| "vertical" | - | Scroll orientation |
| pauseOnHover | boolean | - | Pauses animation on hover |
| repeat | number | - | Number of times children are repeated inline for seamless scrolling |
| reverse | boolean | - | Reverses animation direction |


#### Styles API

Marquee component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Marquee selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Marquee-root | Root element |
| content | .mantine-Marquee-content | Animated scrolling container |
| group | .mantine-Marquee-group | Repeated children wrapper |

**Marquee CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --marquee-duration | Controls animation duration |
| root | --marquee-gap | Controls gap between items |
| root | --marquee-repeat | Number of times content is repeated |
| root | --marquee-fade-color | Controls the fade edge gradient color |
| root | --marquee-fade-size | Controls the size of the fade gradient |

**Marquee data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-orientation | Value depends on `orientation` prop | horizontal \| vertical |
| root | data-reverse | `reverse` prop is set | - |
| root | data-pause-on-hover | `pauseOnHover` prop is set | - |
| root | data-fade-edges | `fadeEdges` prop is `true` (default) | - |


--------------------------------------------------------------------------------

### MaskInput
Package: @mantine/core
Import: import { MaskInput } from '@mantine/core';
Description: Input with mask pattern for formatted text entry

## Usage

`MaskInput` is a wrapper around [useMask](https://mantine.dev/llms/hooks-use-mask.md) hook that provides all standard input
props (label, description, error, etc.) and supports all mask options. The mask string defines
the expected format using token characters (`9` for digits, `a` for letters, etc.).

```tsx
import { MaskInput } from '@mantine/core';


function Demo() {
  return (
    <MaskInput
       variant="default" size="sm" radius="md" label="Input label" withAsterisk={false} description="Input description" error=""
      mask="(999) 999-9999"
      placeholder="(___) ___-____"
    />
  );
}
```


## Dynamic mask

Use the `modify` option to change the mask based on the current input value.
This example switches between standard and American Express credit card formats:

```tsx
import { MaskInput } from '@mantine/core';

function Demo() {
  return (
    <MaskInput
      label="Credit card"
      placeholder="____ ____ ____ ____"
      mask="9999 9999 9999 9999"
      modify={(value) => {
        if (/^3[47]/.test(value)) {
          return { mask: '9999 999999 99999' };
        }
        return undefined;
      }}
    />
  );
}
```


## Custom tokens

Override or extend the built-in token map with the `tokens` option:

```tsx
import { MaskInput } from '@mantine/core';

function Demo() {
  return (
    <MaskInput
      label="Hex color"
      placeholder="#______"
      mask="#hhhhhh"
      tokens={{ h: /[0-9a-fA-F]/ }}
    />
  );
}
```


## Regex array format

For complex masks where built-in tokens are not enough, pass an array of
string literals and `RegExp` objects:

```tsx
import { MaskInput } from '@mantine/core';

function Demo() {
  return (
    <MaskInput
      label="Time (HH:MM)"
      placeholder="__:__"
      mask={[/[0-2]/, /\\\\d/, ':', /[0-5]/, /\\\\d/]}
    />
  );
}
```


## Transform

Use the `transform` option to convert each character before validation.
This example auto-uppercases input so the `A` token accepts lowercase letters:

```tsx
import { MaskInput, Text } from '@mantine/core';
import { formatMask, isMaskComplete } from '@mantine/hooks';

function Demo() {
  return (
    <>
      <MaskInput
        label="Promo code"
        placeholder="AAA-9999"
        mask="AAA-9999"
        transform={(char) => char.toUpperCase()}
        slotChar="XXX-0000"
      />
      <Text size="sm" mt="sm" c="dimmed">
        Type lowercase letters – they will be auto-uppercased
      </Text>
    </>
  );
}
```


## Disabled state

```tsx
import { MaskInput } from '@mantine/core';

function Demo() {
  return (
    <MaskInput
      label="Phone number"
      placeholder="(___) ___-____"
      mask="(999) 999-9999"
      disabled
    />
  );
}
```


## Error state

```tsx
import { MaskInput } from '@mantine/core';

function Demo() {
  return (
    <MaskInput
      label="Phone number"
      placeholder="(___) ___-____"
      mask="(999) 999-9999"
      error="Invalid phone number"
    />
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
<MaskInput mask="(999) 999-9999? x9999" /> // Extension is optional
```

### Escaping

Prefix a token character with `\` to treat it as a literal:

```tsx
<MaskInput mask="\A999" /> // "A" is literal, not a token
```


#### Props

**MaskInput props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| alwaysShowMask | boolean | - | Show mask pattern even when field is empty and unfocused |
| autoClear | boolean | - | Clear value on blur when mask is incomplete, `false` by default |
| beforeMaskedStateChange | (states: { previousState: { value: string; selection: { start: number; end: number; } \| null; }; currentState: { value: string; selection: { start: number; end: number; } \| null; }; nextState: { value: string; selection: { ...; } \| null; }; }) => { ...; } | - | Escape hatch for advanced cursor/value manipulation |
| description | React.ReactNode | - | Contents of `Input.Description` component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps | - | Props passed down to the `Input.Description` component |
| disabled | boolean | - | Sets `disabled` attribute on the `input` element |
| error | React.ReactNode | - | Contents of `Input.Error` component. If not set, error is not displayed. |
| errorProps | InputErrorProps | - | Props passed down to the `Input.Error` component |
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
| mask | string \| (string \| RegExp)[] | required | Mask pattern string or array of string literals and RegExp objects |
| modify | ((value: string) => Partial<Pick<MaskInputProps, "mask" \| "tokens" \| "separate" \| "slotChar">>) \| undefined | - | Called before masking on each keystroke, can return overrides for mask options |
| onChangeRaw | (rawValue: string, maskedValue: string) => void | - | Called on every change with raw and masked values |
| onComplete | (maskedValue: string, rawValue: string) => void | - | Called when all required mask slots are filled |
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| separate | boolean | - | When true, raw and display values are decoupled |
| showMaskOnFocus | boolean | - | Show mask placeholder on focus, `true` by default |
| size | MantineSize | - | Controls input `height`, horizontal `padding`, and `font-size` |
| slotChar | string \| null | - | Character displayed in unfilled slots, `"_"` by default |
| tokens | Record<string, RegExp> | - | Override or extend the default token map |
| transform | (char: string) => string | - | Transform each character before validation and insertion |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

MaskInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**MaskInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-MaskInput-wrapper | Root element of the Input |
| input | .mantine-MaskInput-input | Input element |
| section | .mantine-MaskInput-section | Left and right sections |
| root | .mantine-MaskInput-root | Root element |
| label | .mantine-MaskInput-label | Label element |
| required | .mantine-MaskInput-required | Required asterisk element, rendered inside label |
| description | .mantine-MaskInput-description | Description element |
| error | .mantine-MaskInput-error | Error element |


--------------------------------------------------------------------------------

### Menu
Package: @mantine/core
Import: import { Menu } from '@mantine/core';
Description: Combine a list of secondary actions into single interactive area

## Usage

```tsx
import { Menu, Button, Text } from '@mantine/core';
import { GearSixIcon, MagnifyingGlassIcon, ImageIcon, ChatCircleIcon, TrashIcon, IconArrowsLeftRight } from '@phosphor-icons/react';

function Demo() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<GearSixIcon size={14} />}>
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<ChatCircleIcon size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<ImageIcon size={14} />}>
          Gallery
        </Menu.Item>
        <Menu.Item
          leftSection={<MagnifyingGlassIcon size={14} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={<IconArrowsLeftRight size={14} />}
        >
          Transfer my data
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<TrashIcon size={14} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
```


## Submenus

```tsx
import { Button, Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu width={200} position="bottom-start">
      <Menu.Target>
        <Button>Toggle Menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Dashboard</Menu.Item>

        <Menu.Sub openDelay={120} closeDelay={150}>
          <Menu.Sub.Target>
            <Menu.Sub.Item>Products</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>All products</Menu.Item>
            <Menu.Item>Categories</Menu.Item>
            <Menu.Item>Tags</Menu.Item>
            <Menu.Item>Attributes</Menu.Item>
            <Menu.Item>Shipping classes</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>

        <Menu.Sub>
          <Menu.Sub.Target>
            <Menu.Sub.Item>Orders</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>Open</Menu.Item>
            <Menu.Item>Completed</Menu.Item>
            <Menu.Item>Cancelled</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>

        <Menu.Sub>
          <Menu.Sub.Target>
            <Menu.Sub.Item>Settings</Menu.Sub.Item>
          </Menu.Sub.Target>

          <Menu.Sub.Dropdown>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Security</Menu.Item>
            <Menu.Item>Notifications</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>
      </Menu.Dropdown>
    </Menu>
  );
}
```


## Controlled

The dropdown's opened state can be controlled with the `opened` and `onChange` props:

```tsx
import { useState } from 'react';
import { Menu } from '@mantine/core';

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <Menu opened={opened} onChange={setOpened}>
      {/* Menu content */}
    </Menu>
  );
}
```

## Show menu on hover

Set `trigger="hover"` to reveal the dropdown when hovering over the menu target and dropdown.
The `closeDelay` and `openDelay` props can be used to control open and close delay in ms.
Note that:

* If you set `closeDelay={0}` then the menu will close before the user reaches the dropdown, so set `offset={0}` to remove space between the target element and dropdown.
* Menu with `trigger="hover"` is not accessible – users that navigate with the keyboard will not be able to use it. If you need both hover and click triggers, use `trigger="click-hover"`.

```tsx
import { Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      {/* ... menu items */}
    </Menu>
  );
}
```


To make a `Menu` that is revealed on hover accessible on all devices, use `trigger="click-hover"` instead.
The dropdown will be revealed on hover on desktop and on click on mobile devices.

```tsx
import { Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
      {/* ... menu items */}
    </Menu>
  );
}
```


## Disabled items

```tsx
import { Menu, Button } from '@mantine/core';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Menu>
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<MagnifyingGlassIcon size={14} />}
          disabled
        >
          Search
        </Menu.Item>

        {/* Other items ... */}
      </Menu.Dropdown>
    </Menu>
  );
}
```


## Dropdown position

```tsx
import { Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu position="bottom" offset={5} withArrow={false} arrowPosition="side">
      {/* Menu items */}
    </Menu>
  );
}
```


## Transitions

The Menu dropdown can be animated with any of the premade transitions from the [Transition](https://mantine.dev/llms/core-transition.md) component:

```tsx
import { Menu } from '@mantine/core';

function Demo() {
  return (
    <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      {/* Menu content */}
    </Menu>
  );
}
```


## Custom component as Menu.Item

By default, `Menu.Item` renders as a button element. To change that, set the `component` prop:

```tsx
import { Menu, Button } from '@mantine/core';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <Button>Toggle menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component="a" href="https://mantine.dev">
          Mantine website
        </Menu.Item>
        <Menu.Item
          leftSection={<ArrowSquareOutIcon size={14} />}
          component="a"
          href="https://mantine.dev"
          target="_blank"
        >
          External link
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
```


Note that the component you pass to the `component` prop should allow spreading props to its root element:

```tsx
import { Menu } from '@mantine/core';

// ❌ Will not work with Menu.Item
function IncorrectItem() {
  return <button type="button">My custom Menu item</button>;
}

// ✅ Will work correctly with Menu.Item
const CorrectItem = ({ ref, ...props }) => (
  <button type="button" {...props} ref={ref}>
    My custom Menu item
  </button>
);

function Demo() {
  // ❌ Will not work
  const incorrect = <Menu.Item component={IncorrectItem} />;

  // ✅ Will work
  const correct = <Menu.Item component={CorrectItem} />;
}
```

## Accessibility

Menu follows [WAI-ARIA recommendations](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/):

* Dropdown element has `role="menu"` and `aria-labelledby="target-id"` attributes
* Target element has `aria-haspopup="menu"`, `aria-expanded`, `aria-controls="dropdown-id"` attributes
* Menu item has `role="menuitem"` attribute

Whilst the dropdown is unopened, the `aria-controls` attribute will be undefined

### Supported target elements

An uncontrolled Menu with `trigger="click"` (default) will be accessible only when used with a `button` element or component that renders it ([Button](https://mantine.dev/llms/core-button.md), [ActionIcon](https://mantine.dev/llms/core-action-icon.md), etc.).
Other elements will not support `Space` and `Enter` key presses.

### Hover menu

Menu with `trigger="hover"` is not accessible – it cannot be accessed with the keyboard. Use it only if you do not care about accessibility. If you need both hover and click triggers, use `trigger="click-hover"`.

### Navigation

If you are using the Menu to build navigation, you can use the options from the demo below to follow the [WAI-ARIA recommendations for navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/).

```tsx
import { Group, Menu } from '@mantine/core';

function Demo() {
  const menus = Array(4)
    .fill(0)
    .map((e, i) => (
      <Menu
        key={i}
        trigger="click-hover"
        loop={false}
        withinPortal={false}
        trapFocus={false}
        menuItemTabIndex={0}
      >
        {/* ... menu items */}
      </Menu>
    ));
  return <Group>{menus}</Group>;
}
```


### Keyboard interactions

If you also need to support `Tab` and `Shift + Tab` then set `menuItemTabIndex={0}`.


#### Props

**Menu props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| arrowOffset | number | - | Arrow offset in px |
| arrowPosition | 'center' \| 'side' | - | Arrow position |
| arrowRadius | number | - | Arrow `border-radius` in px |
| arrowSize | number | - | Arrow size in px |
| children | React.ReactNode | - | Menu children |
| clickOutsideEvents | string[] | - | Events that trigger outside click detection. Includes mousedown for desktop clicks, touchstart for mobile, and keydown for Escape key handling |
| closeDelay | number | - | Close delay in ms, applicable only to `trigger="hover"` variant |
| closeOnClickOutside | boolean | - | If set, the dropdown is closed on outside clicks |
| closeOnEscape | boolean | - | If set, the dropdown is closed when the `Escape` key is pressed |
| closeOnItemClick | boolean | - | If set, the Menu is closed when one of the items is clicked. Can be overridden per item with `closeMenuOnClick` prop |
| defaultOpened | boolean | - | Uncontrolled menu initial opened state |
| disabled | boolean | - | If set, popover dropdown will not be rendered |
| floatingStrategy | FloatingStrategy | - | Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy) |
| hideDetached | boolean | - | If set, the dropdown is hidden when the element is hidden with styles or not visible on the screen |
| id | string | - | Id base to create accessibility connections |
| keepMounted | boolean | - | If set, the dropdown is not unmounted from the DOM when hidden. `display: none` styles are added instead. |
| loop | boolean | - | If set, arrow key presses wrap around from last item to first and vice versa |
| menuItemTabIndex | 0 \| -1 | - | Set the `tabindex` on all menu items. Use `0` to allow Tab key navigation through menu items (required for navigation menus following WAI-ARIA disclosure pattern). |
| middlewares | PopoverMiddlewares | - | Floating ui middlewares to configure position handling |
| offset | number \| FloatingAxesOffsets | - | Offset of the dropdown element |
| onChange | (opened: boolean) => void | - | Called when menu opened state changes |
| onClose | () => void | - | Called when Menu is closed |
| onDismiss | () => void | - | Called when the popover is dismissed by clicking outside or by pressing escape |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| onOpen | () => void | - | Called when Menu is opened |
| onPositionChange | (position: FloatingPosition) => void | - | Called when dropdown position changes |
| openDelay | number | - | Open delay in ms, applicable only to `trigger="hover"` variant |
| opened | boolean | - | Controlled menu opened state |
| overlayProps | OverlayProps & ElementProps<"div"> | - | Props passed down to `Overlay` component |
| portalProps | BasePortalProps | - | Props to pass down to the `Portal` when `withinPortal` is true |
| position | FloatingPosition | - | Dropdown position relative to the target element |
| preventPositionChangeWhenVisible | boolean | - | Prevents popover from flipping/shifting when it the dropdown is visible |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius |
| returnFocus | boolean | - | Determines whether focus should be automatically returned to control when dropdown closes |
| shadow | MantineShadow | - | Key of `theme.shadows` or any other valid CSS `box-shadow` value |
| transitionProps | TransitionProps | - | Props passed down to the `Transition` component. Use to configure duration and animation type. |
| trapFocus | boolean | - | If set, focus is trapped within the menu dropdown when it is opened |
| trigger | "hover" \| "click" \| "click-hover" | - | Event trigger to open menu. Note: 'hover' is not keyboard accessible; prefer 'click-hover' for accessible hover menus |
| width | PopoverWidth | - | Dropdown width, or `'target'` to make dropdown width the same as target element |
| withArrow | boolean | - | Determines whether component should have an arrow |
| withInitialFocusPlaceholder | boolean | - | Adds a hidden focusable element at the start of the dropdown to prevent unexpected focus jumps when opening with keyboard. Set to false if you need custom focus management. |
| withOverlay | boolean | - | Determines whether the overlay should be displayed when the dropdown is opened |
| withinPortal | boolean | - | Determines whether dropdown should be rendered within the `Portal` |
| zIndex | string \| number | - | Dropdown `z-index` |

**Menu.Item props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Item label |
| closeMenuOnClick | boolean | - | Controls whether the menu closes when this item is clicked. When undefined, inherits from Menu's `closeOnItemClick` prop. When true or false, overrides the Menu-level setting |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color |
| disabled | boolean | - | Sets disabled attribute, applies disabled styles |
| leftSection | React.ReactNode | - | Section displayed at the start of the label |
| rightSection | React.ReactNode | - | Section displayed at the end of the label |

**Menu.Target props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Target element |
| refProp | string | - | Key of the prop used to get element ref, useful for forwarding refs to custom components |

**Menu.Sub props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| arrowOffset | number | - | Arrow offset in px |
| arrowPosition | 'center' \| 'side' | - | Arrow position |
| arrowRadius | number | - | Arrow `border-radius` in px |
| arrowSize | number | - | Arrow size in px |
| closeDelay | number | - | Close delay in ms, applicable when hover trigger is used |
| disabled | boolean | - | If set, popover dropdown will not be rendered |
| floatingStrategy | FloatingStrategy | - | Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy) |
| hideDetached | boolean | - | If set, the dropdown is hidden when the element is hidden with styles or not visible on the screen |
| keepMounted | boolean | - | If set, the dropdown is not unmounted from the DOM when hidden. `display: none` styles are added instead. |
| middlewares | PopoverMiddlewares | - | Floating ui middlewares to configure position handling |
| offset | number \| FloatingAxesOffsets | - | Offset of the dropdown element |
| onChange | (opened: boolean) => void | - | Called with current state when dropdown opens or closes |
| onClose | () => void | - | Called when dropdown closes |
| onDismiss | () => void | - | Called when the popover is dismissed by clicking outside or by pressing escape |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| onOpen | () => void | - | Called when dropdown opens |
| onPositionChange | (position: FloatingPosition) => void | - | Called when dropdown position changes |
| openDelay | number | - | Open delay in ms, applicable when hover trigger is used |
| overlayProps | OverlayProps & ElementProps<"div"> | - | Props passed down to `Overlay` component |
| portalProps | BasePortalProps | - | Props to pass down to the `Portal` when `withinPortal` is true |
| position | FloatingPosition | - | Dropdown position relative to the target element |
| preventPositionChangeWhenVisible | boolean | - | Prevents popover from flipping/shifting when it the dropdown is visible |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius |
| returnFocus | boolean | - | Determines whether focus should be automatically returned to control when dropdown closes |
| shadow | MantineShadow | - | Key of `theme.shadows` or any other valid CSS `box-shadow` value |
| transitionProps | TransitionProps | - | Props passed down to the `Transition` component that used to animate dropdown presence, use to configure duration and animation type |
| width | PopoverWidth | - | Dropdown width, or `'target'` to make dropdown width the same as target element |
| withArrow | boolean | - | Determines whether component should have an arrow |
| withOverlay | boolean | - | Determines whether the overlay should be displayed when the dropdown is opened |
| withinPortal | boolean | - | Determines whether dropdown should be rendered within the `Portal` |
| zIndex | string \| number | - | Dropdown `z-index` |

**Menu.Sub.Target props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Target element |
| refProp | string | - | Key of the prop used to get element ref |

**Menu.Sub.Dropdown props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|

**Menu.Sub.Item props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Item label |
| closeMenuOnClick | boolean | - | If set, the menu is closed when the item is clicked. Overrides `closeOnItemClick` prop on the `Menu` component. |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color |
| disabled | boolean | - | Sets disabled attribute, applies disabled styles |
| leftSection | React.ReactNode | - | Section displayed at the start of the label |
| rightSection | React.ReactNode | - | Section displayed at the end of the label |

**Menu.SubItem props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Item label |
| closeMenuOnClick | boolean | - | If set, the menu is closed when the item is clicked. Overrides `closeOnItemClick` prop on the `Menu` component. |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color |
| disabled | boolean | - | Sets disabled attribute, applies disabled styles |
| leftSection | React.ReactNode | - | Section displayed at the start of the label |
| rightSection | React.ReactNode | - | Section displayed at the end of the label |

**Menu.SubTarget props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Target element |
| refProp | string | - | Key of the prop used to get element ref |


#### Styles API

Menu component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Menu selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| dropdown | .mantine-Menu-dropdown | Dropdown element |
| arrow | .mantine-Menu-arrow | Dropdown arrow |
| overlay | .mantine-Menu-overlay | Overlay element |
| divider | .mantine-Menu-divider | `Menu.Divider` root element |
| label | .mantine-Menu-label | `Menu.Label` root element |
| item | .mantine-Menu-item | `Menu.Item` root element |
| itemLabel | .mantine-Menu-itemLabel | Label of `Menu.Item` |
| itemSection | .mantine-Menu-itemSection | Left and right sections of `Menu.Item` |
| chevron | .mantine-Menu-chevron | Sub menu chevron |

**Menu data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| item | data-disabled | `disabled` prop is set on `Menu.Item` | - |


--------------------------------------------------------------------------------

### Modal
Package: @mantine/core
Import: import { Modal } from '@mantine/core';
Description: An accessible overlay dialog

## Usage

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


## Center modal vertically

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open centered Modal
      </Button>
    </>
  );
}
```


## Remove header

To remove the header, set `withCloseButton={false}`:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        Modal without header, press escape or click on overlay to close
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Change size

You can change the modal width by setting the `size` prop to a predefined size or any valid width, for example, `55%` or `50rem`.
The `Modal` width cannot exceed `100vw`.

```tsx
function Demo() {
  const [opened, setOpened] = useState(false);
  const [size, setSize] = useState<string | number>('md');

  const buttons = SIZES.map((s) => (
    <Button
      key={s}
      variant="default"
      onClick={() => {
        setSize(s);
        setOpened(true);
      }}
    >
      {s}
    </Button>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        size={size}
      >
        <AuthenticationForm noPadding noShadow />
      </Modal>

      <Group justify="center">{buttons}</Group>
    </>
  );
}
```


## Size auto

`Modal` with `size="auto"` will have width that fits its content:

```tsx
import { useDisclosure, useCounter } from '@mantine/hooks';
import { Modal, Button, Group, Text, Badge } from '@mantine/core';

function Demo() {
  const [opened, { close, open }] = useDisclosure(false);
  const [count, { increment, decrement }] = useCounter(3, { min: 0 });

  const badges = Array(count)
    .fill(0)
    .map((_, index) => <Badge key={index}>Badge {index}</Badge>);

  return (
    <>
      <Modal opened={opened} onClose={close} size="auto" title="Modal size auto">
        <Text>Modal with size auto will fits its content</Text>

        <Group wrap="nowrap" mt="md">
          {badges}
        </Group>

        <Group mt="xl">
          <Button onClick={increment}>Add badge</Button>
          <Button onClick={decrement}>Remove badge</Button>
        </Group>
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Fullscreen

A fullscreen modal will take the entire screen. It is usually better to change the transition to `fade`
when the `fullScreen` prop is set:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        fullScreen
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


To switch Modal to fullscreen on devices with small screens only, use the [use-media-query](https://mantine.dev/llms/hooks-use-media-query.md) hook.
The `size` prop is ignored if the `fullScreen` prop is set:

```tsx
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: ${em(800)})');

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        fullScreen={isMobile}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        The Modal will be full screen only on mobile
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Customize overlay

`Modal` uses the [Overlay](https://mantine.dev/llms/core-overlay.md) component. You can set any props that [Overlay](https://mantine.dev/llms/core-overlay.md)
supports with `overlayProps`:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Authentication"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Modal with scroll

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Modal with scroll</p>);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Header is sticky">
        {content}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Usage with ScrollArea

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, ScrollArea } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Modal with scroll</p>);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Header is sticky"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {content}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Change offsets

Use `xOffset`/`yOffset` to configure the horizontal/vertical content offsets:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" yOffset="1vh" xOffset={0}>
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Change transitions

`Modal` is built with the [Transition](https://mantine.dev/llms/core-transition.md) component. Use the `transitionProps`
prop to customize any [Transition](https://mantine.dev/llms/core-transition.md) properties:

```tsx
import { useState } from 'react';
import { Modal, Group, Button } from '@mantine/core';

function Demo() {
  const [noTransitionOpened, setNoTransitionOpened] = useState(false);
  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);

  return (
    <>
      <Modal
        opened={slowTransitionOpened}
        onClose={() => setSlowTransitionOpened(false)}
        title="Please consider this"
        transitionProps={{ transition: 'rotate-left' }}
      >
        rotate-left transition
      </Modal>

      <Modal
        opened={noTransitionOpened}
        onClose={() => setNoTransitionOpened(false)}
        title="Please consider this"
        transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
      >
        fade transition 600ms linear transition
      </Modal>

      <Group justify="center">
        <Button onClick={() => setSlowTransitionOpened(true)} variant="default">
          Rotate left transition
        </Button>
        <Button onClick={() => setNoTransitionOpened(true)} variant="default">
          Fade transition
        </Button>
      </Group>
    </>
  );
}
```


## onExitTransitionEnd and onEnterTransitionEnd

The `onExitTransitionEnd` and `onEnterTransitionEnd` props can be used to run code after
the exit/enter transition is finished. For example, this is useful when you want to clear
data after the modal is closed:

```tsx
import { useState } from 'react';
import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [firstOpened, firstHandlers] = useDisclosure(false);
  const [secondOpened, secondHandlers] = useDisclosure(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
  });

  return (
    <>
      <Modal
        opened={firstOpened}
        onClose={() => {
          firstHandlers.close();
          setModalData({ title: '', message: '' });
        }}
        title={modalData.title}
      >
        {modalData.message}
      </Modal>
      <Modal
        opened={secondOpened}
        onClose={secondHandlers.close}
        onExitTransitionEnd={() => setModalData({ title: '', message: '' })}
        title={modalData.title}
      >
        {modalData.message}
      </Modal>

      <Group>
        <Button
          onClick={() => {
            firstHandlers.open();
            setModalData({ title: 'Edit your profile', message: 'Imagine a form here' });
          }}
        >
          Clear data in onClose
        </Button>

        <Button
          onClick={() => {
            secondHandlers.open();
            setModalData({ title: 'Edit your profile', message: 'Imagine a form here' });
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

Modal uses [FocusTrap](https://mantine.dev/llms/core-focus-trap.md) to trap focus. Add the `data-autofocus`
attribute to the element that should receive initial focus.

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Focus demo">
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


If you do not want to focus any elements when the modal is opened, use the `FocusTrap.InitialFocus`
component to create a visually hidden element that will receive initial focus:

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


If you do not add the `data-autofocus` attribute and do not use `FocusTrap.InitialFocus`,
the modal will focus the first focusable element inside it, which is usually the close button.

## Control behavior

The following props can be used to control `Modal` behavior.
In most cases, it is not recommended to turn these features off –
it will make the component less accessible.

* `trapFocus` – determines whether focus should be trapped inside the modal
* `closeOnEscape` – determines whether the modal should be closed when the `Escape` key is pressed
* `closeOnClickOutside` – determines whether the modal should be closed when the user clicks on the overlay
* `returnFocus` – determines whether focus should be returned to the element that was focused before the modal was opened

## react-remove-scroll settings

`Modal` uses the [react-remove-scroll](https://github.com/theKashey/react-remove-scroll)
package to lock scroll. You can pass props down to the `RemoveScroll` component
with `removeScrollProps`:

```tsx
import { Modal } from '@mantine/core';

function Demo() {
  return (
    <Modal
      removeScrollProps={{ allowPinchZoom: true }}
      opened
      onClose={() => {}}
    />
  );
}
```

## Change close icon

Use `closeButtonProps` to customize the close button:

```tsx
import { XCircleIcon } from '@phosphor-icons/react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Authentication"
        closeButtonProps={{
          icon: <XCircleIcon size={20} />,
        }}
      >
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


## Compound components

You can use the following compound components to have full control over the `Modal` rendering:

* `Modal.Root` – context provider
* `Modal.Overlay` – render [Overlay](https://mantine.dev/llms/core-overlay.md)
* `Modal.Content` – main modal element, should include all modal content
* `Modal.Header` – sticky header, usually contains `Modal.Title` and `Modal.CloseButton`
* `Modal.Title` – `h2` element, the `aria-labelledby` of `Modal.Content` is pointing to this element, usually rendered inside `Modal.Header`
* `Modal.CloseButton` – close button, usually rendered inside `Modal.Header`
* `Modal.Body` – a place for main content, the `aria-describedby` of `Modal.Content` is pointing to this element

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>Modal content</Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
```


