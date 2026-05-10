## Polymorphic component

Card is a [polymorphic component](https://mantine.dev/llms/guides-polymorphic.md), you can change its root element:

```tsx
import { Card, Image, Text } from '@mantine/core';

function Demo() {
  return (
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
    >
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          h={160}
          alt="No way!"
        />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        You&apos;ve won a million dollars in cash!
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        Please click anywhere on this card to claim your reward, this is not a fraud, trust us
      </Text>
    </Card>
  );
}
```


## Card.Section

`Card.Section` is a special component that is used to remove Card padding from its children while other elements still have horizontal spacing.
`Card.Section` works in the following way:

* If the component is the first child in Card, then it has negative top, left and right margins
* If it is the last child in Card, then it has negative bottom, left and right margins
* If it is in the middle, then only the left and right margins will be negative

```tsx
import { Card, Text } from '@mantine/core';

function Demo() {
  return (
    <Card padding="xl">
      {/* top, right, left margins are negative – -1 * theme.spacing.xl */}
      <Card.Section>First section</Card.Section>

      {/* Content that is not inside Card.Section will have theme.spacing.xl spacing on all sides relative to Card */}
      <Text>Some other content</Text>

      {/* right, left margins are negative – -1 * theme.spacing.xl */}
      <Card.Section>Middle section</Card.Section>

      {/* bottom, right, left margins are negative – -1 * theme.spacing.xl */}
      <Card.Section>Last section</Card.Section>
    </Card>
  );
}
```

Note that `Card` relies on mapping direct children and you cannot use fragments or other wrappers for `Card.Section`:

```tsx
import { Card } from '@mantine/core';

function Demo() {
  return (
    <Card padding="xl">
      <div>
        <Card.Section>Won't work</Card.Section>
      </div>

      <>
        <Card.Section>Won't work either</Card.Section>
      </>

      <Card.Section>Works fine</Card.Section>
    </Card>
  );
}
```

## Polymorphic Card.Section

`Card.Section` is a [polymorphic component](https://mantine.dev/llms/guides-polymorphic.md), you can change its root element:

```tsx
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Card.Section component="a" href="https://mantine.dev/">
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Norway Fjord Adventures</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md">
        Book classic tour now
      </Button>
    </Card>
  );
}
```


## withBorder and inheritPadding props

* `withBorder` prop adds top and bottom borders to `Card.Section` depending on its position relative to other content and sections
* `inheritPadding` prop adds the same left and right padding to `Card.Section` as set in the `Card` component

```tsx
import { ActionIcon, Card, Group, Image, Menu, SimpleGrid, Text } from '@mantine/core';
import { DotsThreeIcon, EyeIcon, FileZipIcon, TrashIcon } from '@phosphor-icons/react';

const images = [
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
];

function Demo() {
  return (
    <Card withBorder shadow="sm">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>Review pictures</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <DotsThreeIcon size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<FileZipIcon size={14} />}>
                Download zip
              </Menu.Item>
              <Menu.Item leftSection={<EyeIcon size={14} />}>
                Preview all
              </Menu.Item>
              <Menu.Item
                leftSection={<TrashIcon size={14} />}
                color="red"
              >
                Delete all
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Text mt="sm" c="dimmed" size="sm">
        <Text span inherit c="var(--mantine-color-anchor)">
          200+ images uploaded
        </Text>{' '}
        since last visit, review them to select which one should be added to your gallery
      </Text>

      <Card.Section mt="sm">
        <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png" />
      </Card.Section>

      <Card.Section inheritPadding mt="sm" pb="md">
        <SimpleGrid cols={3}>
          {images.map((image) => (
            <Image src={image} key={image} radius="sm" />
          ))}
        </SimpleGrid>
      </Card.Section>
    </Card>
  );
}
```



#### Props

**Card props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Card content |
| orientation | "horizontal" \| "vertical" | - | Card orientation |
| padding | MantineSpacing | - | Key of `theme.spacing` or any valid CSS value to set padding |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem |
| shadow | MantineShadow | - | Key of `theme.shadows` or any valid CSS value to set `box-shadow` |
| withBorder | boolean | - | Adds border to the card |

**Card.Section props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| inheritPadding | boolean | - | If set, the section inherits padding from the parent `Card` |
| withBorder | boolean | - | Adds border to the root element |


#### Styles API

Card component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Card selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Card-root | Root element |
| section | .mantine-Card-section | `Card.Section` root element |

**Card CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|

**Card data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| section | data-first-section | `Card.Section` is the child of the `Card` | - |
| section | data-last-section | `Card.Section` is the last child of the `Card` | - |
| root | data-with-border | `withBorder` prop is set on `Card` component | - |
| section | data-with-border | `withBorder` prop is set on `Card.Section` component | - |
| section | data-inherit-padding | `inheritPadding` prop is set on `Card.Section` component | - |


--------------------------------------------------------------------------------

### Center
Package: @mantine/core
Import: import { Center } from '@mantine/core';
Description: Centers content vertically and horizontally

## Usage

```tsx
import { Center, Box } from '@mantine/core';

function Demo() {
  return (
    <Center maw={400} h={100} bg="var(--mantine-color-gray-light)">
      <Box bg="var(--mantine-color-blue-light)">All elements inside Center are centered</Box>
    </Center>
  );
}
```


## Inline

To use `Center` with inline elements, set the `inline` prop.
For example, you can center a link icon and label:

```tsx
import { Center, Anchor, Box } from '@mantine/core';
import { ArrowLeftIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Anchor href="https://mantine.dev" target="_blank">
      <Center inline>
        <ArrowLeftIcon size={12} />
        <Box ml={5}>Back to Mantine website</Box>
      </Center>
    </Anchor>
  );
}
```



#### Props

**Center props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Content to center |
| inline | boolean | - | If set, `inline-flex` is used instead of `flex` |


#### Styles API

Center component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Center selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Center-root | Root element |


--------------------------------------------------------------------------------

### Checkbox
Package: @mantine/core
Import: import { Checkbox } from '@mantine/core';
Description: Capture boolean input from user

## Usage

```tsx
import { Checkbox } from '@mantine/core';


function Demo() {
  return (
    <Checkbox
      defaultChecked
       labelPosition="right" label="I agree to sell my privacy" description="" error="" color="blue" variant="filled" radius="sm" size="sm" disabled={false} indeterminate={false}
    />
  );
}
```


## Controlled state

Use `checked` and `onChange` props to control `Checkbox` state:

```tsx
import { useState } from 'react';
import { Checkbox } from '@mantine/core';

function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}
```

## Checkbox with @mantine/form

Example of using `Checkbox` with [@mantine/form](https://mantine.dev/llms/form-use-form.md):

```tsx
import { Button, Checkbox } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { terms: false },
    validate: {
      terms: isNotEmpty('You must accept terms and conditions'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Checkbox
        label="I accept the terms and conditions"
        key={form.key('terms')}
        {...form.getInputProps('terms', { type: 'checkbox' })}
      />

      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}
```


## Checkbox with uncontrolled forms

`Checkbox` can be used with uncontrolled forms the same way as native `input[type="checkbox"]`.
Set the `name` attribute to include checkbox value in `FormData` object on form submission.
To control initial checked state in uncontrolled forms, use `defaultChecked` prop.

Example usage of uncontrolled `Checkbox` with `FormData`:

```tsx
import { Checkbox } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Checkbox value:', !!formData.get('terms'));
      }}
    >
      <Checkbox label="Accept terms and conditions" name="terms" defaultChecked />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## States

```tsx
import { Checkbox, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Checkbox checked={false} onChange={() => {}} label="Default checkbox" />
      <Checkbox checked={false} onChange={() => {}} indeterminate label="Indeterminate checkbox" />
      <Checkbox checked onChange={() => {}} label="Checked checkbox" />
      <Checkbox checked variant="outline" onChange={() => {}} label="Outline checked checkbox" />
      <Checkbox
        variant="outline"
        onChange={() => {}}
        indeterminate
        label="Outline indeterminate checkbox"
      />
      <Checkbox disabled label="Disabled checkbox" />
      <Checkbox disabled checked onChange={() => {}} label="Disabled checked checkbox" />
      <Checkbox disabled indeterminate label="Disabled indeterminate checkbox" />
    </Stack>
  );
}
```


## Error state

Use the `error` prop to display error message below the checkbox label.
If you want to apply error styles to checkbox without error message, user boolean `error` prop.
If you want to display error message without applying error styles, set `withErrorStyles={false}`.

```tsx
import { Checkbox, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Checkbox label="With boolean error" error />
      <Checkbox label="With error message" error="Must be checked" />
      <Checkbox label="With error message" error="No error styles" withErrorStyles={false} />
    </Stack>
  );
}
```


## Change icons

```tsx
import { Checkbox, CheckboxIconComponent } from '@mantine/core';
import { BiohazardIcon, RadioactiveIcon } from '@phosphor-icons/react';

const CheckboxIcon: CheckboxIconComponent = ({ indeterminate, ...others }) =>
  indeterminate ? <RadioactiveIcon {...others} /> : <BiohazardIcon {...others} />;

function Demo() {
  return (
    <>
      <Checkbox icon={CheckboxIcon} label="Custom icon" defaultChecked />
      <Checkbox icon={CheckboxIcon} label="Custom icon: indeterminate" indeterminate mt="sm" />
    </>
  );
}
```


## Change icon color

Use the `iconColor` prop to change the icon color. You can reference colors from `theme.colors` or use any valid CSS color:

```tsx
import { Checkbox } from '@mantine/core';

function Demo() {
  return (
    <Checkbox
      defaultChecked
      color="lime.4"
      iconColor="dark.8"
      size="md"
      label="Bright lime checkbox"
    />
  );
}
```


## Indeterminate state

`Checkbox` supports indeterminate state. When the `indeterminate` prop is set,
the `checked` prop is ignored (checkbox always has checked styles):

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


## Label with link

```tsx
import { Checkbox, Anchor } from '@mantine/core';

function Demo() {
  return (
    <Checkbox
      label={
        <>
          I accept{' '}
          <Anchor href="https://mantine.dev" target="_blank" inherit>
            terms and conditions
          </Anchor>
        </>
      }
    />
  );
}
```


## Checkbox with tooltip

You can change the target element to which the tooltip is attached with `refProp`:

* If `refProp` is not set, the tooltip is attached to the checkbox input
* If `refProp="rootRef"` is set, the tooltip is attached to the root element (contains label, input and other elements)

```tsx
import { Tooltip, Checkbox } from '@mantine/core';

function Demo() {
  return (
    <>
      <Tooltip label="Checkbox with tooltip">
        <Checkbox label="Tooltip on checkbox only" />
      </Tooltip>

      <Tooltip label="Checkbox with tooltip" refProp="rootRef">
        <Checkbox label="Tooltip the entire element" mt="md" />
      </Tooltip>
    </>
  );
}
```


## Pointer cursor

By default, checkbox input and label have `cursor: default` (same as native `input[type="checkbox"]`).
To change the cursor to pointer, set `cursorType` on [theme](https://mantine.dev/llms/theming-theme-object.md):

```tsx
import { MantineProvider, createTheme, Checkbox } from '@mantine/core';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <>
      <Checkbox label="Default cursor" />

      <MantineProvider theme={theme}>
        <Checkbox label="Pointer cursor" mt="md" />
      </MantineProvider>
    </>
  );
}
```


```tsx
import { Checkbox, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Checkbox checked label="regular checkbox" size="lg" color="lime.4" />
      <Checkbox autoContrast checked label="autoContrast checkbox" size="lg" color="lime.4" />
    </Stack>
  );
}
```


## Add custom sizes

You can add any number of custom sizes with [data-size](https://mantine.dev/llms/styles-data-attributes.md) attribute:

```tsx
// Demo.tsx
import { MantineProvider, Checkbox, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Checkbox: Checkbox.extend({ classNames: classes }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Checkbox size="xxs" label="Extra small checkbox" />
      <Checkbox size="xxl" label="Extra large checkbox" mt="md" />
    </MantineProvider>
  );
}

// Demo.module.css
.root {
  --checkbox-size-xxl: 42px;
  --checkbox-size-xxs: 14px;

  &[data-size='xxl'] {
    .label {
      font-size: 22px;
      line-height: 40px;
    }
  }

  &[data-size='xxs'] {
    .label {
      font-size: 10px;
      line-height: 14px;
    }
  }
}
```


## Wrapper props

Checkbox supports additional props that are passed to the wrapper element for more customization options.

## Checkbox.Group

`Checkbox.Group` manages the state of multiple checkboxes, it accepts `value` and `onChange`
props, which are used to control the state of checkboxes inside the group. The `value` prop should be an array of strings, where each string is the value of a checkbox.
The `onChange` prop should be a function that receives the new value as an array of strings.

```tsx
import { useState } from 'react';
import { Checkbox } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Checkbox value="react" label="React" />
      <Checkbox value="svelte" label="Svelte" />
    </Checkbox.Group>
  );
}
```

`Checkbox.Group` component supports all [Input.Wrapper](https://mantine.dev/llms/core-input.md#inputwrapper-component)
props.

```tsx
import { Checkbox, Group } from '@mantine/core';


function Demo() {
  return (
    <Checkbox.Group
      defaultValue={['react']}
       label="Select your favorite frameworks/libraries" description="This is anonymous" error="" withAsterisk={true}
    >
      <Group mt="xs">
        <Checkbox value="react" label="React" />
        <Checkbox value="svelte" label="Svelte" />
        <Checkbox value="ng" label="Angular" />
        <Checkbox value="vue" label="Vue" />
      </Group>
    </Checkbox.Group>
  );
}
```


## Checkbox.Group disabled

```tsx
import { Checkbox } from '@mantine/core';

function Demo() {
  return (
    <Checkbox.Group disabled>
      <Stack>
        <Checkbox value="react" label="React" />
        <Checkbox value="svelte" label="Svelte" />
        <Checkbox value="angular" label="Angular" />
        <Checkbox value="vue" label="Vue" />
      </Stack>
    </Checkbox.Group>
  );
}
```


## maxSelectedValues

Use `maxSelectedValues` prop to limit the number of selected values in `Checkbox.Group`.
When the limit is reached, the remaining checkboxes are disabled and cannot be selected.

```tsx
import { Checkbox, Group } from '@mantine/core';

function Demo() {
  return (
    <Checkbox.Group defaultValue={['react']} maxSelectedValues={2}>
      <Group>
        <Checkbox value="react" label="React" />
        <Checkbox value="svelte" label="Svelte" />
        <Checkbox value="ng" label="Angular" />
        <Checkbox value="vue" label="Vue" />
      </Group>
    </Checkbox.Group>
  );
}
```


## Checkbox.Group with @mantine/form

Example of using `Checkbox.Group` with [@mantine/form](https://mantine.dev/llms/form-use-form.md):

```tsx
import { Button, Checkbox, Group } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';

interface FormValues {
  frameworks: string[];
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { frameworks: [] },
    validate: {
      frameworks: hasLength({ min: 1 }, 'Select at least one framework'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Checkbox.Group
        {...form.getInputProps('frameworks')}
        key={form.key('frameworks')}
        label="Select your favorite frameworks/libraries"
        withAsterisk
      >
        <Group my={5}>
          <Checkbox value="react" label="React" />
          <Checkbox value="svelte" label="Svelte" />
          <Checkbox value="ng" label="Angular" />
          <Checkbox value="vue" label="Vue" />
        </Group>
      </Checkbox.Group>

      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}
```


## Checkbox.Group with uncontrolled forms

`Checkbox.Group` can be used with uncontrolled forms, it renders a hidden input
which joins all checked values into a single string using `hiddenInputValuesSeparator` prop.

Props for usage with uncontrolled forms:

* `name` – name attribute passed to the hidden input
* `hiddenInputValuesSeparator` – string used to join checked values into a single string, `','` by default
* `hiddenInputProps` – additional props passed to the hidden input

```tsx
export function UncontrolledForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Checkbox group value:', formData.get('frameworks'));
      }}
    >
      <Checkbox.Group label="Frameworks" name="frameworks" hiddenInputValuesSeparator="|">
        <Checkbox label="React" value="react" />
        <Checkbox label="Angular" value="ng" />
      </Checkbox.Group>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Checkbox.Indicator

`Checkbox.Indicator` looks exactly the same as the `Checkbox` component, but it does not
have any semantic meaning, it's just a visual representation of checkbox state. You
can use it in any place where you need to display checkbox state without any interaction
related to the indicator. For example, it is useful in cards based on buttons, trees, etc.

Note that `Checkbox.Indicator` cannot be focused or selected with keyboard. It is not
accessible and should not be used as a replacement for the `Checkbox` component.

```tsx
import { Checkbox, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Checkbox.Indicator />
      <Checkbox.Indicator checked />
      <Checkbox.Indicator indeterminate />
      <Checkbox.Indicator disabled />
      <Checkbox.Indicator disabled checked />
      <Checkbox.Indicator disabled indeterminate />
    </Group>
  );
}
```


## Example: Table with row selection

```tsx
import { useState } from 'react';
import { Table, Checkbox } from '@mantine/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function Demo() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const rows = elements.map((element) => (
    <Table.Tr
      key={element.name}
      bg={selectedRows.includes(element.position) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.position)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.position]
                : selectedRows.filter((position) => position !== element.position)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
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


## Example: Customize with Styles API

```tsx
// Demo.tsx
import { useState } from 'react';
import { Checkbox } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      classNames={classes}
      label="Checkbox button"
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      wrapperProps={{
        onClick: () => setChecked((c) => !c),
      }}
    />
  );
}

// Demo.module.css
.root {
  border: 1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-sm);
  border-radius: var(--mantine-radius-md);
  font-weight: 600;
  transition:
    color 100ms ease,
    background-color 100ms ease,
    border-color 100ms ease;
  cursor: pointer;

  &[data-checked] {
    background-color: var(--mantine-color-blue-filled);
    border-color: var(--mantine-color-blue-filled);
    color: var(--mantine-color-white);
  }

  & * {
    pointer-events: none;
    user-select: none;
  }
}
```


## wrapperProps

Most of the `Checkbox` props are passed down to the `input` element.
If you want to pass props to the root element instead, use `wrapperProps` prop.

```tsx
import { Checkbox } from '@mantine/core';

function Demo() {
  return (
    <Checkbox
      label="My checkbox"
      wrapperProps={{ 'data-root-element': true }}
    />
  );
}
```

## id attribute

By default, `Checkbox` generates a random `id` attribute for the input element
to associate it with the label. You can supply your own `id` attribute with `id` prop.
It will be used in `id` attribute of the input element and `htmlFor` attribute of the label element.

```tsx
import { Checkbox } from '@mantine/core';

function Demo() {
  return <Checkbox id="my-checkbox" label="My checkbox" />;
}
```

## Accessibility

Checkbox component is based on the native `input[type="checkbox"]` element, so it is accessible by default.

Set `aria-label` or `label` prop to make the checkbox accessible for screen readers:

```tsx
import { Checkbox } from '@mantine/core';

// Not ok, input is not labeled
function Bad() {
  return <Checkbox />;
}

// Ok, input is labelled by aria-label
function GoodAriaLabel() {
  return <Checkbox aria-label="My checkbox" />;
}

// Ok, input is labelled by label element
function GoodLabel() {
  return <Checkbox label="My checkbox" />;
}
```


#### Props

**Checkbox props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts icon color based on background color for `filled` variant |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color to set input background color in checked state |
| description | React.ReactNode | - | Description below the label |
| error | React.ReactNode | - | Error message below the label |
| icon | CheckboxIconComponent | - | Icon for checked or indeterminate state |
| iconColor | MantineColor | - | Key of `theme.colors` or any valid CSS color to set icon color. By default, depends on `theme.autoContrast`. |
| id | string | - | Unique input id |
| indeterminate | boolean | - | Indeterminate state of the checkbox. If set, `checked` prop is dismissed. |
| label | React.ReactNode | - | `label` associated with the checkbox |
| labelPosition | "left" \| "right" | - | Position of the label relative to the input |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| rootRef | Ref<HTMLDivElement> | - | Root element ref |
| size | MantineSize | - | Controls size of the component |
| withErrorStyles | boolean | - | If set, applies error styles to the checkbox when `error` prop is set |
| wrapperProps | React.ComponentProps<"div"> | - | Props passed down to the root element |

**Checkbox.Group props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|

**Checkbox.Indicator props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts icon color based on background color for `filled` variant |
| checked | boolean | - | Determines whether the component should have checked styles |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color to set input background color in checked state |
| disabled | boolean | - | Indicates disabled state |
| icon | CheckboxIconComponent | - | Icon for checked or indeterminate state |
| iconColor | MantineColor | - | Key of `theme.colors` or any valid CSS color to set icon color, by default value depends on `theme.autoContrast` |
| indeterminate | boolean | - | Indeterminate state of the checkbox. If set, `checked` prop is ignored. |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| size | MantineSize | - | Controls size of the component |

**Checkbox.CardContext props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|

**Checkbox.Card props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | boolean | - | Controlled component value |
| defaultChecked | boolean | - | Uncontrolled component default value |
| onChange | (checked: boolean) => void | - | Called when value changes |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| value | string | - | Value of the checkbox, used with `Checkbox.Group` |
| withBorder | boolean | - | Adds border to the root element |


#### Styles API

Checkbox component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Checkbox selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Checkbox-root | Root element |
| input | .mantine-Checkbox-input | Input element (`input[type="checkbox"]`) |
| icon | .mantine-Checkbox-icon | Checkbox icon, used to display checkmark and indeterminate state icon |
| inner | .mantine-Checkbox-inner | Wrapper for `icon` and `input` |
| body | .mantine-Checkbox-body | Input body, contains all other elements |
| labelWrapper | .mantine-Checkbox-labelWrapper | Contains `label`, `description` and `error` |
| label | .mantine-Checkbox-label | Label element |
| description | .mantine-Checkbox-description | Description displayed below the label |
| error | .mantine-Checkbox-error | Error message displayed below the label |

**Checkbox CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --checkbox-color | Controls checked checkbox `background-color` |
| root | --checkbox-radius | Controls checkbox `border-radius` |
| root | --checkbox-size | Controls checkbox `width` and `height` |
| root | --checkbox-icon-color | Controls checkbox icon `color` |

**Checkbox data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-checked | `checked` prop is set | - |
| input | data-error | `error` prop is set | - |
| input | data-indeterminate | `indeterminate` prop is set | - |
| inner | data-label-position | - | Value of `labelPosition` prop |

**Checkbox.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-CheckboxGroup-root | Root element |
| label | .mantine-CheckboxGroup-label | Label element |
| required | .mantine-CheckboxGroup-required | Required asterisk element, rendered inside label |
| description | .mantine-CheckboxGroup-description | Description element |
| error | .mantine-CheckboxGroup-error | Error element |

**Checkbox.Indicator selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| indicator | .mantine-CheckboxIndicator-indicator | Root element |
| icon | .mantine-CheckboxIndicator-icon | Checkbox icon |

**Checkbox.Indicator CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| indicator | --checkbox-color | Controls checked checkbox `background-color` |
| indicator | --checkbox-radius | Controls checkbox `border-radius` |
| indicator | --checkbox-size | Controls checkbox `width` and `height` |
| indicator | --checkbox-icon-color | Controls checkbox icon `color` |

**Checkbox.Indicator data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| indicator | data-checked | `checked` prop is set | - |
| indicator | data-disabled | `disabled` prop is set | - |

**Checkbox.Card selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| card | .mantine-CheckboxCard-card | Root element |

**Checkbox.Card CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| card | --card-radius | Controls card `border-radius` |

**Checkbox.Card data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| card | data-checked | `checked` prop is set | - |
| card | data-with-border | `withBorder` prop is set | - |


--------------------------------------------------------------------------------

### Chip
Package: @mantine/core
Import: import { Chip } from '@mantine/core';
Description: Pick one or multiple values with inline controls

## Usage

```tsx
import { Chip } from '@mantine/core';

function Demo() {
  return <Chip defaultChecked color="blue" variant="filled" size="sm" radius="xl">Awesome chip</Chip>
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Chip } from '@mantine/core';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Chip checked={checked} onChange={() => setChecked((v) => !v)}>
      My chip
    </Chip>
  );
}
```

## Change checked icon

```tsx
import { Chip } from '@mantine/core';
import { XIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Chip
      icon={<XIcon size={16} />}
      color="red"
      variant="filled"
      defaultChecked
    >
      Forbidden
    </Chip>
  );
}
```


## States

```tsx
function Demo() {
  return (
    <>
      <Chip.Group multiple value={['checked', 'checked-disabled']}>
        <Group justify="center">
          <Chip value="default" variant="outline">
            Outline default
          </Chip>
          <Chip value="checked" variant="outline">
            Outline checked
          </Chip>
          <Chip value="checked-disabled" disabled variant="outline">
            Outline checked disabled
          </Chip>
        </Group>
      </Chip.Group>

      <Chip.Group multiple value={['checked', 'checked-disabled']}>
        <Group justify="center" mt="md">
          <Chip value="default" variant="light">
            Light default
          </Chip>
          <Chip value="checked" variant="light">
            Light checked
          </Chip>
          <Chip value="checked-disabled" disabled variant="light">
            Light checked disabled
          </Chip>
        </Group>
      </Chip.Group>

      <Chip.Group multiple value={['checked', 'checked-disabled']}>
        <Group justify="center" mt="md">
          <Chip value="default" variant="filled">
            Filled default
          </Chip>
          <Chip value="checked" variant="filled">
            Filled checked
          </Chip>
          <Chip value="checked-disabled" disabled variant="filled">
            Filled checked disabled
          </Chip>
        </Group>
      </Chip.Group>
    </>
  );
}
```


## Chip with tooltip

To use `Chip` with [Tooltip](https://mantine.dev/llms/core-tooltip.md) and other similar components, set `refProp="rootRef"`
on the [Tooltip](https://mantine.dev/llms/core-tooltip.md) component:

```tsx
import { Tooltip, Chip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Chip tooltip" refProp="rootRef">
      <Chip defaultChecked>Chip with tooltip</Chip>
    </Tooltip>
  );
}
```


## Wrapper props

Chip supports additional props that are passed to the wrapper element for more customization options.

## Chip.Group

The `Chip.Group` component manages the state of child Chip components.
Set the `multiple` prop to allow multiple chips to be selected at a time:

```tsx
import { Chip, Group } from '@mantine/core';

function Demo() {
  return (
    <>
      <Chip.Group>
        <Group justify="center">
          <Chip value="1">Single chip</Chip>
          <Chip value="2">Can be selected</Chip>
          <Chip value="3">At a time</Chip>
        </Group>
      </Chip.Group>

      <Chip.Group multiple>
        <Group justify="center" mt="md">
          <Chip value="1">Multiple chips</Chip>
          <Chip value="2">Can be selected</Chip>
          <Chip value="3">At a time</Chip>
        </Group>
      </Chip.Group>
    </>
  );
}
```


## Controlled Chip.Group

```tsx
import { useState } from 'react';
import { Chip } from '@mantine/core';

function Single() {
  // string value when multiple is false (default)
  const [value, setValue] = useState('react');

  return (
    <Chip.Group multiple={false} value={value} onChange={setValue}>
      <Chip value="react">React</Chip>
      <Chip value="ng">Angular</Chip>
      <Chip value="svelte">Svelte</Chip>
      <Chip value="vue">Vue</Chip>
    </Chip.Group>
  );
}

function Multiple() {
  // array of strings value when multiple is true
  const [value, setValue] = useState(['react']);

  return (
    <Chip.Group multiple value={value} onChange={setValue}>
      <Chip value="react">React</Chip>
      <Chip value="ng">Angular</Chip>
      <Chip value="svelte">Svelte</Chip>
      <Chip value="vue">Vue</Chip>
    </Chip.Group>
  );
}
```

## Deselect radio chip

```tsx
import { useState } from 'react';
import { Chip, Group } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | null>('first');
  const handleChipClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === value) {
      setValue(null);
    }
  };

  return (
    <Chip.Group multiple={false} value={value} onChange={setValue}>
      <Group>
        <Chip value="first" onClick={handleChipClick}>
          First
        </Chip>
        <Chip value="second" onClick={handleChipClick}>
          Second
        </Chip>
        <Chip value="third" onClick={handleChipClick}>
          Third
        </Chip>
      </Group>
    </Chip.Group>
  );
}
```


## Accessibility

`Chip` and `Chip.Group` components are accessible by default – they are built with native radio/checkbox inputs,
all keyboard events work the same as with native controls.


#### Props

**Chip props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on the chip background color for `filled` variant |
| checked | boolean | - | Controlled checked state |
| children | React.ReactNode | required | `label` element associated with the input |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color. |
| defaultChecked | boolean | - | Uncontrolled checked state initial value |
| icon | React.ReactNode | - | Any element or component to replace the default icon |
| id | string | - | Unique input id, generated randomly if not provided |
| onChange | (checked: boolean) => void | - | Calls when checked state changes |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| rootRef | Ref<HTMLDivElement> | - | Assigns ref of the root element |
| size | MantineSize | - | Controls various properties related to the component size |
| type | "checkbox" \| "radio" | - | Chip input type |
| wrapperProps | React.ComponentProps<"div"> | - | Props passed down to the root element |

**Chip.Group props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | `Chip` components and any other elements |
| defaultValue | Primitive \| Value[] \| null | - | Uncontrolled component initial value |
| multiple | boolean | - | If set, multiple values can be selected |
| onChange | (value: Multiple extends true ? Value[] : Value) => void | - | Called when value changes. If `multiple` prop is set, called with an array of selected values. If not, called with a string value of selected chip. |
| value | Primitive \| Value[] \| null | - | Controlled component value |

**Chip.GroupContext props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|


#### Styles API

Chip component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Chip selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Chip-root | Root element |
| checkIcon | .mantine-Chip-checkIcon | Check icon, visible when checked prop is true |
| iconWrapper | .mantine-Chip-iconWrapper | Wraps `checkIcon` for alignment |
| input | .mantine-Chip-input | Input element, hidden by default |
| label | .mantine-Chip-label | Input label, used as a chip body |

**Chip CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --chip-fz | Controls `font-size` |
| root | --chip-size | Controls `height` |
| root | --chip-icon-size | Controls width and height of the icon |
| root | --chip-padding | Controls horizontal padding when chip is not checked |
| root | --chip-checked-padding | Controls horizontal padding when chip is checked |
| root | --chip-radius | Controls `border-radius` |
| root | --chip-bg | Controls `background-color` when chip is checked |
| root | --chip-hover | Controls `background-color` when chip is checked and hovered |
| root | --chip-color | Controls `color` when chip is checked |
| root | --chip-bd | Controls border when chip is checked |
| root | --chip-spacing | Controls spacing between check icon and label |

**Chip data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| label | data-checked | Chip is checked | - |
| label | data-disabled | `disabled` prop is set | - |


--------------------------------------------------------------------------------

### CloseButton
Package: @mantine/core
Import: import { CloseButton } from '@mantine/core';
Description: Button with close icon

## Usage

`CloseButton` renders a button with an `X` icon inside. It is used in other Mantine components like [Drawer](https://mantine.dev/llms/core-drawer.md) or [Modal](https://mantine.dev/llms/core-modal.md).

```tsx
import { CloseButton } from '@mantine/core';

function Demo() {
  return <CloseButton size="md" variant="subtle" />;
}
```


## Change icon

You can change the icon by passing any react node to the `icon` prop.
It is useful when `CloseButton` is used as a part of other components,
for example, in [Drawer](https://mantine.dev/llms/core-drawer.md) or [Modal](https://mantine.dev/llms/core-modal.md).
Note that if you use the `icon` prop, the `iconSize` prop is ignored –
you will have to set the icon size manually.

```tsx
import { XCircleIcon } from '@phosphor-icons/react';
import { CloseButton } from '@mantine/core';

function Demo() {
  return <CloseButton icon={<XCircleIcon size={18} />} />;
}
```


## Accessibility

To make the `CloseButton` accessible for screen readers, you need to either set `aria-label` or
use the [VisuallyHidden](https://mantine.dev/llms/core-visually-hidden.md) component:

```tsx
import { CloseButton, VisuallyHidden } from '@mantine/core';

function Demo() {
  return (
    <>
      <CloseButton aria-label="Close modal" />

      <CloseButton>
        <VisuallyHidden>Close modal</VisuallyHidden>
      </CloseButton>
    </>
  );
}
```


#### Props

**CloseButton props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Content rendered inside the button. For example `VisuallyHidden` with label for screen readers. |
| disabled | boolean | - | Sets `disabled` attribute, assigns disabled styles |
| icon | React.ReactNode | - | React node to replace the default close icon. If set, `iconSize` prop is ignored. |
| iconSize | string \| number | - | `X` icon `width` and `height` |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem. |
| size | MantineSize \| number | - | Controls width and height of the button. Numbers are converted to rem. |


#### Styles API

CloseButton component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**CloseButton selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-CloseButton-root | Root element |

**CloseButton CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --cb-icon-size | Controls `width` of the `X` icon |
| root | --cb-radius | Controls `border-radius` of the button |
| root | --cb-size | Controls `width` and `height` of the button |


--------------------------------------------------------------------------------

### Code
Package: @mantine/core
Import: import { Code } from '@mantine/core';
Description: Inline and block code

## Usage

By default, the Code component renders an inline `code` html element:

```tsx
import { Code } from '@mantine/core';

function Demo() {
  return <Code>React.createElement()</Code>;
}
```


## Block code

To render code in a `pre` element, pass the `block` prop to the Code component:

```tsx
import { Code } from '@mantine/core';

const codeForPreviousDemo = `import { Code } from '@mantine/core';

function Demo() {
  return <Code>React.createElement()</Code>;
}`;

function Demo() {
  return <Code block>{codeForPreviousDemo}</Code>;
}
```


