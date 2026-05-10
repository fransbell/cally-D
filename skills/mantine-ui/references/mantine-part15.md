## Input props

PillsInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all div element props. PillsInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { PillsInput, Pill } from '@mantine/core';


function Demo() {
  return (
    <PillsInput
       variant="default" size="sm" radius="md" label="Input label" withAsterisk={false} description="Input description" error=""
    >
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder="Enter tags" />
      </Pill.Group>
    </PillsInput>
  );
}
```


## Searchable select example

Combine `PillsInput` with [Combobox](https://mantine.dev/llms/core-combobox.md) to create a searchable multiselect:

```tsx
import { useState } from 'react';
import { PillsInput, Pill, Combobox, CheckIcon, Group, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = groceries
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0 && value.length > 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## Accessibility

If `PillsInput` is used without the label prop, it will not be announced properly by screen readers:

```tsx
import { PillsInput } from '@mantine/core';

// Inaccessible input – screen readers will not announce it properly
function Demo() {
  return (
    <PillsInput>
      <PillsInput.Field />
    </PillsInput>
  );
}
```

Set `aria-label` on the `PillsInput.Field` component to make the input accessible.
In this case the label will not be visible, but screen readers will announce it:

```tsx
import { PillsInput } from '@mantine/core';

// Accessible input – it has aria-label
function Demo() {
  return (
    <PillsInput>
      <PillsInput.Field aria-label="Enter tags" />
    </PillsInput>
  );
}
```

If the `label` prop is set, the input will be accessible and it is not required to set `aria-label`:

```tsx
import { PillsInput } from '@mantine/core';

// Accessible input – it has associated label element
function Demo() {
  return (
    <PillsInput label="Enter tags">
      <PillsInput.Field />
    </PillsInput>
  );
}
```


#### Props

**PillsInput props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
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
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| size | MantineSize | - | Controls input `height`, horizontal `padding`, and `font-size` |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |

**PillsInput.Field props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| pointer | boolean | - | If set, cursor is changed to pointer |
| type | "hidden" \| "auto" \| "visible" | - | Controls input styles when focused. If `auto` the input is hidden when not focused. If `visible` the input will always remain visible. |


#### Styles API

PillsInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**PillsInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-PillsInput-wrapper | Root element of the Input |
| input | .mantine-PillsInput-input | Input element |
| section | .mantine-PillsInput-section | Left and right sections |
| root | .mantine-PillsInput-root | Root element |
| label | .mantine-PillsInput-label | Label element |
| required | .mantine-PillsInput-required | Required asterisk element, rendered inside label |
| description | .mantine-PillsInput-description | Description element |
| error | .mantine-PillsInput-error | Error element |

**PillsInputfield selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| field | .mantine-PillsInputfield-field | Root element |

**PillsInputfield data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| field | data-type | - | Value of `type` prop |
| field | data-disabled | `disabled` prop is set | - |


--------------------------------------------------------------------------------

### PinInput
Package: @mantine/core
Import: import { PinInput } from '@mantine/core';
Description: Capture pin code or one time password from the user

## Usage

```tsx
import { PinInput } from '@mantine/core';

function Demo() {
  return <PinInput size="sm" length={4} mask={false} placeholder="○" disabled={false} error={false} type="alphanumeric" />
}
```


## Controlled

```tsx
import { useState } from 'react';
import { PinInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  return <PinInput value={value} onChange={setValue} />;
}
```

## Uncontrolled

`PinInput` can be used with uncontrolled forms the same way as a native input element.
Set the `name` attribute to include pin input value in `FormData` object on form submission.
To control the initial value in uncontrolled forms, use the `defaultValue` prop.

Example usage of uncontrolled `PinInput` with `FormData`:

```tsx
import { PinInput } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('PIN value:', formData.get('pin'));
      }}
    >
      <PinInput
        name="pin"
        length={4}
        oneTimeCode
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Regex type

You can use a regular expression to validate user input. Characters that do not match the given expression
will be disregarded. For example, to create a `PinInput` that will accept only numbers from `0` to `3`,
set `type={/^[0-3]+/}`:

```tsx
import { PinInput } from '@mantine/core';

function Demo() {
  return <PinInput type={/^[0-3]*$/} inputType="tel" inputMode="numeric" />;
}
```


## Accessibility

Inputs do not have associated labels. Set `aria-label` to make the component visible to screen readers:

```tsx
import { PinInput } from '@mantine/core';

function Accessibility() {
  return <PinInput aria-label="One time code" />;
}
```


#### Props

**PinInput props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ariaLabel | string | - | `aria-label` attribute |
| autoFocus | boolean | - | If set, the first input is focused when component is mounted |
| defaultValue | string | - | Uncontrolled component default value |
| disabled | boolean | - | Adds disabled attribute to all inputs |
| error | boolean | - | Sets `aria-invalid` attribute and applies error styles to all inputs |
| form | string | - | Hidden input `form` attribute |
| gap | MantineSpacing | - | Key of `theme.spacing` or any valid CSS value to set `gap` between inputs, numbers are converted to rem |
| getInputProps | (index: number) => InputProps & ElementProps<"input", "size"> & DataAttributes | - | Props added to the input element depending on its index |
| hiddenInputProps | React.ComponentProps<"input"> | - | Props passed down to the hidden input |
| id | string | - | Base id used to generate unique ids for inputs |
| inputMode | "search" \| "text" \| "none" \| "tel" \| "url" \| "email" \| "numeric" \| "decimal" | - | `inputmode` attribute, inferred from the `type` prop if not specified |
| inputType | HTMLInputTypeAttribute | - | Inputs `type` attribute, inferred from the `type` prop if not specified |
| length | number | - | Number of inputs |
| manageFocus | boolean | - | Determines whether focus should be moved automatically to the next input once filled |
| mask | boolean | - | Changes input type to `"password"` |
| name | string | - | Hidden input `name` attribute |
| onChange | (value: string) => void | - | Called when value changes |
| onComplete | (value: string) => void | - | Called when all inputs have value |
| oneTimeCode | boolean | - | Determines whether `autocomplete="one-time-code"` attribute should be set on all inputs |
| placeholder | string | - | Inputs placeholder |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| readOnly | boolean | - | If set, the user cannot edit the value |
| rootRef | Ref<HTMLDivElement> | - | Assigns ref of the root element |
| size | MantineSize | - | Controls inputs `width` and `height` |
| type | "number" \| RegExp \| "alphanumeric" | - | Determines which values can be entered |
| value | string | - | Controlled component value |


#### Styles API

PinInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**PinInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-PinInput-root | Root element |
| pinInput | .mantine-PinInput-pinInput | Input item wrapper |
| input | .mantine-PinInput-input | Input element |

**PinInput CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --pin-input-size | Controls input `width` and `height` |


--------------------------------------------------------------------------------

### Popover
Package: @mantine/core
Import: import { Popover } from '@mantine/core';
Description: Display popover section relative to given target element

## Usage

```tsx
import { Popover, Text, Button } from '@mantine/core';

function Demo() {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">This is uncontrolled popover, it is opened when button is clicked</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Controlled

You can control the Popover state with the `opened` and `onChange` props:

```tsx
import { useState } from 'react';
import { Button, Popover } from '@mantine/core';

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <Button onClick={() => setOpened((o) => !o)}>
          Toggle popover
        </Button>
      </Popover.Target>

      <Popover.Dropdown>Dropdown</Popover.Dropdown>
    </Popover>
  );
}
```

Controlled example with mouse events:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Popover, Text, Button } from '@mantine/core';

function Demo() {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Button onMouseEnter={open} onMouseLeave={close}>
          Hover to see popover
        </Button>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: 'none' }}>
        <Text size="sm">This popover is shown when user hovers the target element</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Focus trap

If you need to use interactive elements (inputs, buttons, etc.) inside `Popover.Dropdown`, set the `trapFocus` prop:

```tsx
import { Popover, Button, TextInput } from '@mantine/core';

function Demo() {
  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <TextInput label="Name" placeholder="Name" size="xs" />
        <TextInput label="Email" placeholder="john@doe.com" size="xs" mt="xs" />
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Inline elements

Enable the `inline` middleware to use `Popover` with inline elements:

```tsx
import { Popover, Mark, Text } from '@mantine/core';

function Demo() {
  return (
    <Text>
      Stantler’s magnificent antlers were traded at high prices as works of art. As a result, this
      Pokémon was hunted close to extinction by those who were after the priceless antlers.{' '}
      <Popover middlewares={{ flip: true, shift: true, inline: true }} position="top">
        <Popover.Target>
          <Mark>When visiting a junkyard</Mark>
        </Popover.Target>
        <Popover.Dropdown>Inline dropdown</Popover.Dropdown>
      </Popover>
      , you may catch sight of it having an intense fight with Murkrow over shiny objects.Ho-Oh’s
      feathers glow in seven colors depending on the angle at which they are struck by light. These
      feathers are said to bring happiness to the bearers. This Pokémon is said to live at the foot
      of a rainbow.
    </Text>
  );
}
```


## Same width

Set the `width="target"` prop to make the Popover dropdown take the same width as the target element:

```tsx
import { Popover, Text, Button } from '@mantine/core';

function Demo() {
  return (
    <Popover width="target" position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button w={280}>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">
          This popover has same width as target, it is useful when you are building input dropdowns
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## offset

Set the `offset` prop to a number to change the dropdown position relative to the target element.
This way you can control the dropdown offset on the main axis only.

```tsx
import { Popover, Button, Text } from '@mantine/core';


function Demo() {
  return (
    <Popover
      width={200}
      opened
       position="bottom" offset={0}
    >
      <Popover.Target>
        <Button>Popover target</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">
          Change position and offset to configure dropdown offset relative to target
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


To control offset on both axes, pass an object with `mainAxis` and `crossAxis` properties:

```tsx
import { Popover, Button, Text } from '@mantine/core';

function Demo() {
  return (
    <Popover
      width={200}
      position="bottom"
      opened
      offset={{ mainAxis: 0, crossAxis: 0 }}
    >
      <Popover.Target>
        <Button>Popover target</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">
          Change position and offset to configure dropdown offset relative to target
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Middlewares

You can enable or disable [Floating UI](https://floating-ui.com/) middlewares with the
`middlewares` prop:

* [shift](https://floating-ui.com/docs/shift) middleware shifts the dropdown to keep it in view. It is enabled by default.
* [flip](https://floating-ui.com/docs/flip) middleware changes the placement of the dropdown to keep it in view. It is enabled by default.
* [inline](https://floating-ui.com/docs/inline) middleware improves positioning for inline reference elements that span over multiple lines. It is disabled by default.
* [size](https://floating-ui.com/docs/size) middleware manipulates the dropdown size. It is disabled by default.

Example of turning off `shift` and `flip` middlewares:

```tsx
import { Popover } from '@mantine/core';

function Demo() {
  return (
    <Popover
      middlewares={{ flip: false, shift: false }}
      position="bottom"
    >
      {/* Popover content */}
    </Popover>
  );
}
```

## Customize middleware options

To customize [Floating UI](https://floating-ui.com/) middleware options, pass them as
an object to the `middlewares` prop. For example, to change the [shift](https://floating-ui.com/docs/shift)
middleware padding to `20px`, use the following configuration:

```tsx
import { Popover } from '@mantine/core';

function Demo() {
  return (
    <Popover
      middlewares={{ shift: { padding: 20 } }}
      position="bottom"
    >
      {/* Popover content */}
    </Popover>
  );
}
```

## Dropdown arrow

Set the `withArrow` prop to add an arrow to the dropdown. The arrow is a `div` element rotated with `transform: rotate(45deg)`.

The `arrowPosition` prop determines how the arrow is positioned relative to the target element when `position` is set to `*-start` and `*-end` values on the `Popover` component.
By default, the value is `center` – the arrow is positioned in the center of the target element if it is possible.

If you change `arrowPosition` to `side`, then the arrow will be positioned on the side of the target element,
and you will be able to control the arrow offset with the `arrowOffset` prop. Note that when `arrowPosition` is set to `center`,
the `arrowOffset` prop is ignored.

```tsx
import { Popover, Button, Text } from '@mantine/core';

function Demo() {
  return (
    <Popover width={200} opened position="bottom-start" withArrow arrowPosition="center" arrowOffset={10} arrowSize={7} arrowRadius={0}>
      <Popover.Target>
        <Button>Target element</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Arrow position can be changed for *-start and *-end positions</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## With overlay

Set the `withOverlay` prop to add an overlay behind the dropdown. You can pass additional
configuration to the [Overlay](https://mantine.dev/llms/core-overlay.md) component with the `overlayProps` prop:

```tsx
import { Popover, Avatar, Text, Group, Anchor, Stack } from '@mantine/core';

function Demo() {
  return (
    <Popover
      width={320}
      shadow="md"
      withArrow
      withOverlay
      overlayProps={{ zIndex: 10000, blur: '8px' }}
      zIndex={10001}
    >
      <Popover.Target>
        <UnstyledButton style={{ zIndex: 10001, position: 'relative' }}>
          <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Group>
          <Avatar src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4" radius="xl" />
          <Stack gap={5}>
            <Text size="sm" fw={700} style={{ lineHeight: 1 }}>
              Mantine
            </Text>
            <Anchor href="https://x.com/mantinedev" c="dimmed" size="xs" style={{ lineHeight: 1 }}>
              @mantinedev
            </Anchor>
          </Stack>
        </Group>

        <Text size="sm" mt="md">
          Customizable React components and hooks library with focus on usability, accessibility and
          developer experience
        </Text>

        <Group mt="md" gap="xl">
          <Text size="sm">
            <b>0</b> Following
          </Text>
          <Text size="sm">
            <b>1,174</b> Followers
          </Text>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Hide detached

Use the `hideDetached` prop to configure how the dropdown behaves when the target
element is hidden with styles (`display: none`, `visibility: hidden`, etc.),
removed from the DOM, or when the target element is scrolled out of the viewport.

By default, `hideDetached` is enabled – the dropdown is hidden with the target element.
You can change this behavior with `hideDetached={false}`. To see the difference, try to scroll
the root element of the following demo:

```tsx
import { Box, Button, Group, Popover } from '@mantine/core';

function Demo() {
  return (
    <Box
      bd="1px solid var(--mantine-color-dimmed)"
      p="xl"
      w={{ base: 340, sm: 400 }}
      h={200}
      style={{ overflow: 'auto' }}
    >
      <Box w={1000} h={400}>
        <Group>
          <Popover width="target" position="bottom" opened>
            <Popover.Target>
              <Button>Toggle popover</Button>
            </Popover.Target>
            <Popover.Dropdown>This popover dropdown is hidden when detached</Popover.Dropdown>
          </Popover>

          <Popover width="target" position="bottom" opened hideDetached={false}>
            <Popover.Target>
              <Button>Toggle popover</Button>
            </Popover.Target>
            <Popover.Dropdown>This popover dropdown is visible when detached</Popover.Dropdown>
          </Popover>
        </Group>
      </Box>
    </Box>
  );
}
```


## Disabled

Set the `disabled` prop to prevent `Popover.Dropdown` from rendering:

```tsx
import { Popover, Text, Button } from '@mantine/core';

function Demo() {
  return (
    <Popover width={200} disabled={false}>
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Disabled popover dropdown is always hidden</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Click outside

By default, `Popover` closes when you click outside of the dropdown. To disable this behavior, set `closeOnClickOutside={false}`.

You can configure events that are used for click-outside detection with the `clickOutsideEvents` prop.
By default, `Popover` listens to `mousedown` and `touchstart` events. You can change it to any other
events, for example, `mouseup` and `touchend`:

```tsx
import { Popover, Text, Button } from '@mantine/core';

function Demo() {
  return (
    <Popover width={200} position="bottom" clickOutsideEvents={['mouseup', 'touchend']}>
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Popover will be closed with mouseup and touchend events</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
```


## onDismiss

If you need to control the opened state, but still want to close the popover on outside clicks
and escape key presses, use the `onDismiss` prop:

```tsx
import { useState } from 'react';
import { Button, Popover } from '@mantine/core';

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      opened={opened}
      onDismiss={() => setOpened(false)}
    >
      <Popover.Target>
        <Button onClick={() => setOpened((o) => !o)}>
          Toggle popover
        </Button>
      </Popover.Target>

      <Popover.Dropdown>Dropdown</Popover.Dropdown>
    </Popover>
  );
}
```

## Initial focus

Popover uses the [FocusTrap](https://mantine.dev/llms/core-focus-trap.md) component to manage focus.
Add the `data-autofocus` attribute to the element that should receive initial focus:

```tsx
import { Popover } from '@mantine/core';

function Demo() {
  return (
    <Popover>
      <Popover.Target>
        <button type="button">Target</button>
      </Popover.Target>
      <Popover.Dropdown>
        <input />
        <input data-autofocus />
        <input />
      </Popover.Dropdown>
    </Popover>
  );
}
```

## Target component

The target element determines where the Popover will be positioned relative to.

## Nested popovers

Nested popovers require children rendering without [Portal](https://mantine.dev/llms/core-portal.md). Usually, you
should disable the portal with props of the component that renders popover content. For example,
[Select](https://mantine.dev/llms/core-select.md) has a `comboboxProps={{ withinPortal: false }}` prop. Check the documentation
of the component that you are using to render popover content to find out how to disable the portal.
If the portal is not disabled, outside clicks will close all popovers.

Example of disabling the portal in [Select](https://mantine.dev/llms/core-select.md) and [DatePickerInput](https://mantine.dev/llms/dates-date-picker-input.md)
components:

```tsx
import { Button, Popover, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown bg="var(--mantine-color-body)">
        <Select
          label="Select within Popover"
          placeholder="Select within Popover"
          comboboxProps={{ withinPortal: false }}
          data={['React', 'Angular', 'Svelte', 'Vue']}
        />
        <DatePickerInput
          label="DatePickerInput within Popover"
          placeholder="DatePickerInput within Popover"
          popoverProps={{ withinPortal: false }}
          mt="md"
        />
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Accessibility

Popover follows [WAI-ARIA recommendations](https://www.w3.org/TR/wai-aria-practices-1.2/#dialog_modal):

* Dropdown element has `role="dialog"` and `aria-labelledby="target-id"` attributes
* Target element has `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls="dropdown-id"` attributes

An uncontrolled Popover will be accessible only when used with a `button` element or component that renders it ([Button](https://mantine.dev/llms/core-button.md), [ActionIcon](https://mantine.dev/llms/core-action-icon.md), etc.).
Other elements will not support `Space` and `Enter` key presses.

## Keyboard interactions


#### Props

**Popover props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| arrowOffset | number | - | Arrow offset in px |
| arrowPosition | 'center' \| 'side' | - | Arrow position |
| arrowRadius | number | - | Arrow `border-radius` in px |
| arrowSize | number | - | Arrow size in px |
| children | React.ReactNode | - | `Popover.Target` and `Popover.Dropdown` components |
| clickOutsideEvents | string[] | - | Events that trigger outside clicks |
| closeOnClickOutside | boolean | - | Determines whether dropdown should be closed on outside clicks |
| closeOnEscape | boolean | - | Determines whether dropdown should be closed when `Escape` key is pressed |
| defaultOpened | boolean | - | Initial opened state for uncontrolled component |
| disabled | boolean | - | If set, popover dropdown will not be rendered |
| floatingStrategy | FloatingStrategy | - | Changes floating ui [position strategy](https://floating-ui.com/docs/usefloating#strategy) |
| hideDetached | boolean | - | If set, the dropdown is hidden when the element is hidden with styles or not visible on the screen |
| id | string | - | Id base to create accessibility connections |
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
| opened | boolean | - | Controlled dropdown opened state |
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

**Popover..Target props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Target element |
| popupType | string | - | Popup accessible type |
| refProp | string | - | Key of the prop that should be used to access element ref |

**Popover..Dropdown props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|

**Popover.Target props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Target element |
| popupType | string | - | Popup accessible type |
| refProp | string | - | Key of the prop that should be used to access element ref |

**Popover.Dropdown props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|


#### Styles API

Popover component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Popover selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| dropdown | .mantine-Popover-dropdown | Dropdown element |
| arrow | .mantine-Popover-arrow | Dropdown arrow |
| overlay | .mantine-Popover-overlay | Overlay element |

**Popover CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| dropdown | --popover-radius | Controls dropdown border-radius |
| dropdown | --popover-shadow | Controls dropdown box-shadow |

**Popover data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| dropdown | data-position | - | Value of floating ui dropdown position |


--------------------------------------------------------------------------------

### Portal
Package: @mantine/core
Import: import { Portal } from '@mantine/core';
Description: Renders component outside of parent element tree

## Usage

Portal is a wrapper component for the [ReactDOM.createPortal](https://reactjs.org/docs/portals.html) API.
Render any component or element at the end of `document.body` or at a given element. The [Modal](https://mantine.dev/llms/core-modal.md) and [Drawer](https://mantine.dev/llms/core-drawer.md) components are wrapped in Portal by default.

Use Portal to render a component or an element at a different place (defaults to the end of `document.body`).
Portal is useful when you want to prevent parent styles from interfering with children.
Usually all these styles are related to `position` and `z-index` properties,
and portals are used for components with fixed position, for example, modals.

```tsx
import { useState } from 'react';
import { Portal } from '@mantine/core';

function Demo() {
  const [opened, setOpened] = useState(false);

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      {opened && (
        <Portal>
          <div>Your modal content</div>
        </Portal>
      )}

      <button onClick={() => setOpened(true)} type="button">
        Open modal
      </button>
    </main>
  );
}
```

In the example above, the div element is rendered outside of the parent main (before the closing body tag),
but still receives the `opened` and `onClose` props. The element will not be affected by the parent z-index.

## Reuse target node

By default, Portal reuses the same target node for all instances (`reuseTargetNode={true}`).
To create a new target node for each instance, set `reuseTargetNode={false}`. In the following
example, all three paragraphs will be rendered in separate target nodes:

```tsx
import { Portal } from '@mantine/core';

function Demo() {
  return (
    <>
      <Portal reuseTargetNode={false}>
        <p>First</p>
      </Portal>

      <Portal reuseTargetNode={false}>
        <p>Second</p>
      </Portal>

      <Portal reuseTargetNode={false}>
        <p>Third</p>
      </Portal>
    </>
  );
}
```

## Specify target DOM node

You can specify the DOM node where the portal will be rendered by passing the `target` prop:

```tsx
import { Portal } from '@mantine/core';

const container = document.createElement('div');
document.body.appendChild(container);

function Demo() {
  return <Portal target={container}>My portal</Portal>;
}
```

Alternatively, you can specify a selector to render the portal in an existing element:

```tsx
import { Portal } from '@mantine/core';

function Demo() {
  return <Portal target="#portal-container">My portal</Portal>;
}
```

If you don't specify the target element, a new one will be created and appended to the `document.body` for each Portal component.

## Server side rendering

`createPortal` is not supported during server-side rendering.
All components inside Portal are rendered only after the application was mounted to the DOM.

## OptionalPortal component

The `OptionalPortal` component lets you configure whether children should be rendered in `Portal`.
It accepts the same props as the `Portal` component:

```tsx
import { OptionalPortal } from '@mantine/core';

function Demo() {
  return (
    <>
      <OptionalPortal withinPortal>
        This text is rendered in Portal
      </OptionalPortal>
      <OptionalPortal withinPortal={false}>
        This text is rendered as regular child
      </OptionalPortal>
    </>
  );
}
```


#### Props

**Portal props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Content to render inside the portal |
| reuseTargetNode | boolean | - | When true and target is not specified, all Portal instances share a single container node appended to document.body. When false, each Portal creates its own container node.  Has no effect when target is specified. |
| target | string \| HTMLElement | - | Target element where portal should be rendered. Accepts: - HTMLElement: Renders portal inside this element - string: CSS selector - renders inside first matching element - undefined: Uses shared portal node or creates new one based on `reuseTargetNode`  Note: If selector doesn't match any element, portal will not render |


--------------------------------------------------------------------------------

### Progress
Package: @mantine/core
Import: import { Progress } from '@mantine/core';
Description: Give user feedback for status of the task

## Usage

```tsx
import { Progress } from '@mantine/core';

function Demo() {
  return <Progress color="blue" radius="md" size="md" value={50} striped={false} animated={false} />;
}
```


## Compound components

```tsx
import { Progress } from '@mantine/core';

function Demo() {
  return (
    <Progress.Root size="xl">
      <Progress.Section value={35} color="cyan">
        <Progress.Label>Documents</Progress.Label>
      </Progress.Section>
      <Progress.Section value={28} color="pink">
        <Progress.Label>Photos</Progress.Label>
      </Progress.Section>
      <Progress.Section value={15} color="orange">
        <Progress.Label>Other</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
}
```


## Vertical orientation

```tsx
import { Progress } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Progress value={80} orientation="vertical" h={200} />
      <Progress value={60} color="orange" size="xl" orientation="vertical" h={200} animated />

      <Progress.Root size="xl" autoContrast orientation="vertical" h={200}>
        <Progress.Section value={40} color="lime.4">
          <Progress.Label>Documents</Progress.Label>
        </Progress.Section>
        <Progress.Section value={20} color="yellow.4">
          <Progress.Label>Apps</Progress.Label>
        </Progress.Section>
        <Progress.Section value={20} color="cyan.7">
          <Progress.Label>Other</Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </Group>
  );
}
```


## With tooltips

```tsx
import { Progress, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Progress.Root size={40}>
      <Tooltip label="Documents – 33Gb">
        <Progress.Section value={33} color="cyan">
          <Progress.Label>Documents</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label="Photos – 28Gb">
        <Progress.Section value={28} color="pink">
          <Progress.Label>Photos</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label="Other – 15Gb">
        <Progress.Section value={15} color="orange">
          <Progress.Label>Other</Progress.Label>
        </Progress.Section>
      </Tooltip>
    </Progress.Root>
  );
}
```


## Section width transition

Set `transitionDuration` to a number of milliseconds to enable width transition:

```tsx
import { useState } from 'react';
import { Button, Progress } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(50);
  return (
    <>
      <Progress value={value} size="lg" transitionDuration={200} />
      <Button onClick={() => setValue(Math.random() * 100)} mt="md">
        Set random value
      </Button>
    </>
  );
}
```


## Accessibility

* Progress section has the `role="progressbar"` attribute
* Progress section has the `aria-valuenow` attribute with the current value
* `aria-valuemin` and `aria-valuemax` attributes are always set to `0` and `100` as the component does not support other values

Set the `aria-label` attribute to label the progress:

```tsx
import { Progress } from '@mantine/core';

function Demo() {
  return <Progress aria-label="Uploading progress" value={10} />;
}

function DemoCompound() {
  return (
    <Progress.Root>
      <Progress.Section aria-label="Uploading progress" value={10} />
    </Progress.Root>
  );
}
```


#### Props

**Progress props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| animated | boolean | - | If set, the sections stripes are animated (automatically enables striped) |
| autoContrast | boolean | - | If set, adjusts label text color based on section background color for readability |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS value |
| orientation | "horizontal" \| "vertical" | - | Controls orientation |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| size | MantineSize \| number | - | Controls track height |
| striped | boolean | - | If set, the section has stripes |
| transitionDuration | number | - | Controls sections width transition duration, value is specified in ms |
| value | number | required | Value of the progress |

**Progress.Section props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| animated | boolean | - | If set, the sections stripes are animated, `striped` prop is ignored |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS value |
| striped | boolean | - | If set, the section has stripes |
| value | number | required | Value of the section in 0–100 range |
| withAria | boolean | - | Determines whether `aria-*` props should be added to the root element |

**Progress.Root props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts label text color based on section background color for readability |
| orientation | "horizontal" \| "vertical" | - | Controls orientation |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| size | MantineSize \| number | - | Controls track height |
| transitionDuration | number | - | Controls sections width transition duration, value is specified in ms |


#### Styles API

Progress component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Progress selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Progress-root | Root element |
| section | .mantine-Progress-section | `Progress.Section` root element |
| label | .mantine-Progress-label | `Progress.Label` root element |

**Progress CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --progress-radius | Controls `border-radius` of track and sections |
| root | --progress-size | Controls height of progress bar |
| root | --progress-transition-duration | Controls width `transition-duration` of progress bar |

**Progress data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-orientation | `orientation` prop | vertical \| horizontal |
| section | data-striped | `striped` or `animated` props are set | - |
| section | data-animated | `animated` prop is set | - |


--------------------------------------------------------------------------------

### Radio
Package: @mantine/core
Import: import { Radio } from '@mantine/core';
Description: Wrapper for input type radio

## Usage

```tsx
import { Radio } from '@mantine/core';


function Demo() {
  return (
    <Radio
       labelPosition="right" label="I cannot be unchecked" description="" error="" size="sm" color="blue" variant="filled"
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Radio } from '@mantine/core';

function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Radio
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}
```

## Uncontrolled

`Radio` can be used with uncontrolled forms the same way as a native `input[type="radio"]`.
Set the `name` and `value` attributes to include radio value in `FormData` object on form submission.
To control the initial checked state in uncontrolled forms, use `defaultChecked` prop.

Example usage of uncontrolled `Radio` with `FormData`:

```tsx
import { Radio } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Radio value:', formData.get('option'));
      }}
    >
      <Radio name="option" value="option1" label="Option 1" />
      <Radio name="option" value="option2" label="Option 2" defaultChecked />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## States

```tsx
import { Radio, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Radio checked={false} onChange={() => {}} label="Default radio" />
      <Radio checked onChange={() => {}} label="Checked radio" />
      <Radio checked variant="outline" onChange={() => {}} label="Outline checked radio" />
      <Radio disabled label="Disabled radio" />
      <Radio disabled checked onChange={() => {}} label="Disabled checked radio" />
    </Stack>
  );
}
```


## Change icon

```tsx
import { Radio, CheckIcon } from '@mantine/core';

function Demo() {
  return (
    <Radio icon={CheckIcon} label="Custom check icon" name="check" value="check" defaultChecked />
  );
}
```


