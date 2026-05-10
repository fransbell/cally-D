## Scroll container

To prevent viewport overflow, wrap `Table` with `Table.ScrollContainer`.
The component accepts a `minWidth` prop which sets the minimum width below which the table will be scrollable.

```tsx
import { Table } from '@mantine/core';

function Demo() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
```


By default, `Table.ScrollContainer` uses [ScrollArea](https://mantine.dev/llms/core-scroll-area.md), you can change it
to native scrollbars by setting `type="native"`:

```tsx
import { Table } from '@mantine/core';

function Demo() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500} type="native">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
```


You can also set the `maxHeight` prop on `Table.ScrollContainer` to limit the table height:

```tsx
import { Table } from '@mantine/core';

function Demo() {
  const rows = elementsLong.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500} maxHeight={300}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
```


## Vertical variant

Set `variant="vertical"` to render the table with a vertical layout:

```tsx
import { Table } from '@mantine/core';

export function Demo() {
  return (
    <Table variant="vertical" layout="fixed" withTableBorder>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th w={160}>Epic name</Table.Th>
          <Table.Td>7.x migration</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Status</Table.Th>
          <Table.Td>Open</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Total issues</Table.Th>
          <Table.Td>135</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Total story points</Table.Th>
          <Table.Td>874</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Last updated at</Table.Th>
          <Table.Td>September 26, 2024 17:41:26</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
```


## Tabular numbers

Set the `tabularNums` prop to render numbers in tabular style. It sets
`font-variant-numeric: tabular-nums` which makes numbers have equal width.
This is useful when you have columns with numbers and you want them to be aligned:

```tsx
import { NumberFormatter, Table } from '@mantine/core';

const data = [
  { product: 'Apples', unitsSold: 2214411234 },
  { product: 'Oranges', unitsSold: 9983812411 },
  { product: 'Bananas', unitsSold: 1234567890 },
  { product: 'Pineapples', unitsSold: 9948810000 },
  { product: 'Pears', unitsSold: 9933771111 },
];

function Demo() {
  const rows = data.map((item) => (
    <Table.Tr key={item.product}>
      <Table.Td>{item.product}</Table.Td>
      <Table.Td>
        <NumberFormatter value={item.unitsSold} thousandSeparator />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table tabularNums={true}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Product</Table.Th>
          <Table.Th>Units sold</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
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



#### Props

**Table props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| borderColor | MantineColor | - | Color of table borders, key of `theme.colors` or any valid CSS color |
| captionSide | "bottom" \| "top" | - | Side of the `Table.Caption` |
| data | TableData | - | Data used to generate table, ignored if `children` prop is set |
| highlightOnHover | boolean | - | If set, table rows background changes to `highlightOnHoverColor` when hovered |
| highlightOnHoverColor | MantineColor | - | Background color of table rows when hovered, key of `theme.colors` or any valid CSS color |
| horizontalSpacing | MantineSpacing | - | Horizontal cells spacing, key of `theme.spacing` or any valid CSS value for padding, numbers are converted to rem |
| layout | TableLayout | - | Value of `table-layout` style |
| stickyHeader | boolean | - | If set, `Table.Thead` is sticky |
| stickyHeaderOffset | string \| number | - | Offset from top at which `Table.Thead` should become sticky |
| striped | boolean \| "odd" \| "even" | - | If set, every odd/even row background changes to `stripedColor`, if set to `true`, then `odd` value will be used |
| stripedColor | MantineColor | - | Background color of striped rows, key of `theme.colors` or any valid CSS color |
| tabularNums | boolean | - | If set, `font-variant-numeric: tabular-nums` style is applied |
| verticalSpacing | MantineSpacing | - | Vertical cells spacing, key of `theme.spacing` or any valid CSS value for padding, numbers are converted to rem |
| withColumnBorders | boolean | - | If set, the table has borders between columns |
| withRowBorders | boolean | - | If set, the table has borders between rows |
| withTableBorder | boolean | - | If set, the table has the outer border |

**Table.OfContents props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for `filled` variant |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color value |
| depthOffset | string \| number | - | Controls padding on the left side of control, multiplied by (`depth` - `minDepthToOffset`), `20px` by default |
| getControlProps | (payload: TableOfContentsGetControlPropsPayload) => UnstyledButtonProps & ElementProps<"button"> & Record<...> | - | A function to pass props down to controls, accepts values from `use-scroll-spy` hook as an argument and active state. |
| initialData | InitialTableOfContentsData[] | - | Data used to render content until actual values are retrieved from the DOM |
| minDepthToOffset | number | - | Minimum `depth` value that requires offset, `1` by default |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| reinitializeRef | RefObject<() => void> | - | A function to reinitialize headings from `use-scroll-spy` hook |
| scrollSpyOptions | UseScrollSpyOptions | - | Options passed down to `use-scroll-spy` hook |
| size | MantineSize \| number | - | Controls font-size and padding of all elements |


#### Styles API

Table component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Table selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| table | .mantine-Table-table | Root `table` element (`Table` component) |
| thead | .mantine-Table-thead | `thead` element (`Table.Thead` component) |
| tbody | .mantine-Table-tbody | `tbody` element (`Table.Tbody` component) |
| tfoot | .mantine-Table-tfoot | `tfoot` element (`Table.Tfoot` component) |
| tr | .mantine-Table-tr | `tr` element (`Table.Tr` component) |
| th | .mantine-Table-th | `th` element (`Table.Th` component) |
| td | .mantine-Table-td | `td` element (`Table.Td` component) |
| caption | .mantine-Table-caption | `caption` element (`Table.Caption` component) |

**Table CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| table | --table-border-color | Controls `border-color` of all elements inside table |
| table | --table-layout | Controls `table-layout` of the table element, auto by default |
| table | --table-caption-side | Controls caption-side of the table element, `bottom` by default |
| table | --table-striped-color | Controls `background-color` of even/odd `Table.Tr` elements |
| table | --table-sticky-header-offset | Controls `top` offset of sticky header |

**Table data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| table | data-with-table-border | `withTableBorder` prop is set on `Table` component | - |

**Tableofcontents selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Tableofcontents-root | Root element |
| control | .mantine-Tableofcontents-control | Control element |

**Tableofcontents CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --toc-bg | Background color of active control |
| root | --toc-color | Text color of active control |
| root | --toc-depth-offset | Offset between of control depending on depth |
| root | --toc-radius | Border-radius of control |
| root | --toc-size | Controls font-size and padding of all elements |

**Tableofcontents data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| control | data-active | Associated heading is currently the best match in the viewport | - |


--------------------------------------------------------------------------------

### Tabs
Package: @mantine/core
Import: import { Tabs } from '@mantine/core';
Description: Switch between different views

## Usage

```tsx
import { Tabs } from '@mantine/core';
import { ImageIcon, ChatCircleIcon, GearSixIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Tabs color="blue" variant="default" radius="md" orientation="horizontal" defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<ImageIcon size={12} />}>
          Gallery
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<ChatCircleIcon size={12} />}>
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<GearSixIcon size={12} />}>
          Settings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}
```


## Controlled Tabs

To control the Tabs state, use `value` and `onChange` props:

```tsx
import { useState } from 'react';
import { Tabs } from '@mantine/core';

function Demo() {
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">First panel</Tabs.Panel>
      <Tabs.Panel value="second">Second panel</Tabs.Panel>
    </Tabs>
  );
}
```

## Uncontrolled Tabs

If you do not need to subscribe to Tabs state changes, use `defaultValue`:

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">First panel</Tabs.Panel>
      <Tabs.Panel value="second">Second panel</Tabs.Panel>
    </Tabs>
  );
}
```

## Change colors

To change the colors of all tabs, set `color` on the `Tabs` component; to change the color of an individual tab,
set `color` on `Tabs.Tab`.

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs color="teal" defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">Teal tab</Tabs.Tab>
        <Tabs.Tab value="second" color="blue">
          Blue tab
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first" pt="xs">
        First tab color is teal, it gets this value from context
      </Tabs.Panel>

      <Tabs.Panel value="second" pt="xs">
        Second tab color is blue, it gets this value from props, props have the priority and will
        override context value
      </Tabs.Panel>
    </Tabs>
  );
}
```


## Tabs position

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="first">
      <Tabs.List grow={false} justify="flex-start">
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
        <Tabs.Tab value="third">Third tab</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```


To display a tab on the opposite side, set `margin-left: auto` with the `ml="auto"` prop or with `className`:

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        <Tabs.Tab value="chat">Chat</Tabs.Tab>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Tab value="account" ml="auto">
          Account
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```


## Inverted tabs

To make tabs inverted, place `Tabs.Panel` components before `Tabs.List` and add the `inverted` prop to the `Tabs` component:

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat" inverted>
      <Tabs.Panel value="chat" pb="xs">Chat panel</Tabs.Panel>
      <Tabs.Panel value="gallery" pb="xs">Gallery panel</Tabs.Panel>
      <Tabs.Panel value="account" pb="xs">Account panel</Tabs.Panel>

      <Tabs.List>
        <Tabs.Tab value="chat">Chat</Tabs.Tab>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```


## Vertical tabs placement

To change the placement of `Tabs.List` in vertical orientation, set the `placement` prop:

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="gallery" orientation="vertical" placement="left">
      <Tabs.List>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="messages">Messages</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>
      <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
      <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
    </Tabs>
  );
}
```


## Custom variants

Example of custom variant with [FloatingIndicator](https://mantine.dev/llms/core-floating-indicator.md):

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


## Disabled tabs

Set the `disabled` prop on the `Tabs.Tab` component to disable a tab.
Disabled tabs cannot be activated with the mouse or keyboard, and they will be skipped when the user navigates with arrow keys:

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        <Tabs.Tab value="chat">Chat</Tabs.Tab>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="settings" disabled>
          Settings
        </Tabs.Tab>
        <Tabs.Tab value="account">Account</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```


## Activation mode

By default, tabs are activated when the user presses arrow keys or Home/End keys.
To disable that, set `activateTabWithKeyboard={false}` on the `Tabs` component:

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat" activateTabWithKeyboard={false}>
      {/* ...content */}
    </Tabs>
  );
}
```


## Tab deactivation

By default, the active tab cannot be deactivated. To allow that, set `allowTabDeactivation` on the `Tabs` component:

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat" allowTabDeactivation>
      {/* ...content */}
    </Tabs>
  );
}
```


## Unmount inactive tabs

By default, inactive `Tabs.Panel` will stay mounted; to unmount inactive tabs, set `keepMounted={false}` on Tabs.
This is useful when you want to render components that impact performance inside `Tabs.Panel`. Note that
components that are rendered inside `Tabs.Panel` will reset their state on each mount (tab change).

```tsx
import { Tabs } from '@mantine/core';

// Second tab panel will be mounted only when the user activates the second tab
function Demo() {
  return (
    <Tabs keepMounted={false} defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first">First panel</Tabs.Panel>
      <Tabs.Panel value="second">Second panel</Tabs.Panel>
    </Tabs>
  );
}
```

## Get tab control ref

```tsx
import { useRef } from 'react';
import { Tabs } from '@mantine/core';

function Demo() {
  const secondTabRef = useRef<HTMLButtonElement>(null);

  return (
    <Tabs defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="Second" ref={secondTabRef}>
          Second tab
        </Tabs.Tab>
        <Tabs.Tab value="third">Third tab</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

## Usage with react-router

```tsx
<Route path="/tabs/:tabValue" element={<Demo />} />
```

```tsx
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from '@mantine/core';

function Demo() {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <Tabs
      value={tabValue}
      onChange={(value) => navigate(`/tabs/${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab value="first">First tab</Tabs.Tab>
        <Tabs.Tab value="second">Second tab</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

## Example with Scroller component

Use [Scroller](https://mantine.dev/llms/core-scroller.md) component to make the tabs list scrollable when there are too many tabs to fit in the available space:

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


## Accessibility

The Tabs component follows [WAI-ARIA recommendations](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html) on accessibility.

If you use `Tabs.Tab` without text content, for example, only with an icon, then set `aria-label`
or use the [VisuallyHidden](https://mantine.dev/llms/core-visually-hidden.md) component:

```tsx
import { CoinIcon } from '@phosphor-icons/react';
import { Tabs, VisuallyHidden } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        {/* aria-label is not required, tab is labelled by children */}
        <Tabs.Tab value="chat">Chat</Tabs.Tab>

        {/* aria-label is required, tab is not labelled by children */}
        <Tabs.Tab
          value="money"
          aria-label="Get money"
          leftSection={<CoinIcon size={14} />}
        />

        {/* You can use VisuallyHidden instead of aria-label */}
        <Tabs.Tab value="money" leftSection={<CoinIcon size={14} />}>
          <VisuallyHidden>Get money</VisuallyHidden>
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

To set the tabs list label, set `aria-label` on the `Tabs.List` component; it will be announced by screen reader:

```tsx
import { Tabs } from '@mantine/core';

function Demo() {
  return (
    <Tabs defaultValue="recent">
      {/* Tabs.List aria-label will be announced when tab is focused for the first time */}
      <Tabs.List aria-label="Chats">
        <Tabs.Tab value="recent">Most recent</Tabs.Tab>
        <Tabs.Tab value="recent">Unanswered</Tabs.Tab>
        <Tabs.Tab value="archived">Archived</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
```

## Keyboard interactions


#### Props

**Tabs props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activateTabWithKeyboard | boolean | - | If set, tab is activated with arrow key press |
| allowTabDeactivation | boolean | - | If set, tab can be deactivated |
| autoContrast | boolean | - | If set, adjusts text color based on background color for `pills` variant |
| children | React.ReactNode | - | Tabs content |
| color | MantineColor | - | Changes colors of `Tabs.Tab` components when variant is `pills` or `default`, does nothing for other variants |
| defaultValue | string \| null | - | Uncontrolled component default value |
| id | string | - | Base id, used to generate ids to connect labels with controls, generated randomly by default |
| inverted | boolean | - | Determines whether tabs should have inverted styles |
| keepMounted | boolean | - | If set to `false`, `Tabs.Panel` content will be unmounted when the associated tab is not active |
| keepMountedMode | "activity" \| "display-none" | - | Controls how inactive tabs content is hidden when `keepMounted` is `true`, `'activity'` – hidden with `Activity` component, `'display-none'` – hidden with `display: none` styles |
| loop | boolean | - | If set, arrow key presses loop though items (first to last and last to first) |
| onChange | (value: string \| null) => void | - | Called when value changes |
| orientation | "horizontal" \| "vertical" | - | Tabs orientation |
| placement | "left" \| "right" | - | `Tabs.List` placement relative to `Tabs.Panel`, applicable only when `orientation="vertical"` |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| value | string \| null | - | Controlled component value |

**Tabs.Tab props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Tab label |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color, controls tab color based on `variant` |
| leftSection | React.ReactNode | - | Content displayed on the left side of the label |
| rightSection | React.ReactNode | - | Content displayed on the right side of the label |
| size | string \| number | - | Size passed from parent component, sets `data-size` if value is not number like |
| value | string | required | Value of associated panel |

**Tabs.List props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | `Tabs.Tab` components |
| grow | boolean | - | Determines whether tabs should take all available space |
| justify | JustifyContent | - | Tabs alignment |

**Tabs.Panel props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | Panel content |
| keepMounted | boolean | - | If set, the content is kept mounted, even if `keepMounted` is set `false` in the parent `Tabs` component |
| value | string | required | Value of associated control |


#### Styles API

Tabs component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Tabs selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Tabs-root | Root element (`Tabs` component) |
| list | .mantine-Tabs-list | List of tabs (`Tabs.List` component) |
| panel | .mantine-Tabs-panel | Panel with tab content (`Tabs.Panel` component) |
| tab | .mantine-Tabs-tab | Tab button (`Tabs.Tab` component) |
| tabLabel | .mantine-Tabs-tabLabel | Label of `Tabs.Tab` |
| tabSection | .mantine-Tabs-tabSection | Left and right sections of `Tabs.Tab` |

**Tabs CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --tabs-radius | Controls `Tabs.Tab` `border-radius` |


--------------------------------------------------------------------------------

### TagsInput
Package: @mantine/core
Import: import { TagsInput } from '@mantine/core';
Description: Capture a list of values from user with free input and suggestions

## Usage

`TagsInput` provides a way to enter multiple values. It can be used with suggestions or without them.
`TagsInput` is similar to [MultiSelect](https://mantine.dev/llms/core-multi-select.md), but it allows entering custom values.

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return <TagsInput label="Press Enter to submit a tag" placeholder="Enter tag" />;
}
```


## Loading state

Set `loading` prop to display a loading indicator. By default, the loader is displayed on the right side of the input.
You can change the position with the `loadingPosition` prop to `'left'` or `'right'`. This is useful for async operations like API calls, searches, or validations:

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return <TagsInput placeholder="Enter tags" loading />;
}
```


## Controlled

The `TagsInput` value must be an array of strings; other types are not supported.
The `onChange` function is called with an array of strings as a single argument.

```tsx
import { useState } from 'react';
import { TagsInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string[]>([]);
  return <TagsInput data={[]} value={value} onChange={setValue} />;
}
```

## Controlled search value

You can control the search value with `searchValue` and `onSearchChange` props:

```tsx
import { useState } from 'react';
import { TagsInput } from '@mantine/core';

function Demo() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <TagsInput
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      data={[]}
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
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Enter tag"
      defaultValue={['React']}
      clearable
    />
  );
}
```


```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack, TagsInput } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <TagsInput
        label="clearSectionMode='both' (default)"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <TagsInput
        label="clearSectionMode='rightSection'"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <TagsInput
        label="clearSectionMode='clear'"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
```


## Max selected values

You can limit the number of selected values with the `maxTags` prop. This will not allow adding more values
once the limit is reached.

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      description="Add up to 3 tags"
      placeholder="Enter tag"
      maxTags={3}
      defaultValue={['first', 'second']}
    />
  );
}
```


## Accept value on blur

By default, if the user types a value and blurs the input, the value is added to the list.
You can change this behavior by setting `acceptValueOnBlur` to `false`. In this case, the value is added
only when the user presses `Enter` or clicks on a suggestion.

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <TagsInput
        label="Value IS accepted on blur"
        placeholder="Enter text, then blur the field"
        data={['React', 'Angular', 'Svelte']}
        acceptValueOnBlur
      />
      <TagsInput
        label="Value IS NOT accepted on blur"
        placeholder="Enter text, then blur the field"
        data={['React', 'Angular', 'Svelte']}
        acceptValueOnBlur={false}
        mt="md"
      />
    </>
  );
}
```


## Allow duplicates

By default, `TagsInput` does not allow adding duplicate values, but you can change this behavior by
setting the `allowDuplicates` prop. A value is considered duplicate if it is already present in the `value` array,
regardless of the case and trailing whitespace.

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Duplicates are allowed"
      allowDuplicates
    />
  );
}
```


## isDuplicate

You can use the `isDuplicate` prop to control how duplicates are detected. It is a function that
receives two arguments: tag value and current tags. The function must return `true` if the value is a duplicate.

Example of using `isDuplicate` to allow using the same value with different casing:

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Enter tag"
      isDuplicate={(tagValue, currentTags) => currentTags.some((val) => val === tagValue)}
      defaultValue={['Tag', 'TAG', 'tag']}
    />
  );
}
```


## Split chars

By default, `TagsInput` splits values by comma (`,`), you can change this behavior by setting
`splitChars` prop to an array of strings. All values from `splitChars` cannot be included in the final value.
Values are also split on paste.

Example of splitting by `,`, `|` and space:

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Enter tag"
      splitChars={[',', ' ', '|']}
    />
  );
}
```


## With suggestions

`TagsInput` can be used with suggestions, it will render suggestions list under input and allow to select
suggestions with keyboard or mouse. Note that user is not limited to suggestions, it is still possible to
enter custom values. If you want to allow values only from suggestions, use [MultiSelect](https://mantine.dev/llms/core-multi-select.md) component instead.

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Pick tag from list"
      data={['React', 'Angular', 'Svelte']}
    />
  );
}
```


## Data prop

Data that is used in TagsInput must be an array of strings or objects with value and label properties. You can also specify additional properties that will be available in renderOption function.

## Filtering

TagsInput provides built-in filtering functionality. You can control filtering behavior with filter prop or implement custom filtering logic.

```tsx
import { TagsInput, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(' ');
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(' ');
    return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
  });
};

function Demo() {
  return (
    <TagsInput
      label="What countries have you visited?"
      placeholder="Pick value or enter anything"
      data={['Great Britain', 'Russian Federation', 'United States']}
      filter={optionsFilter}
    />
  );
}
```


## Sort options

By default, options are sorted by their position in the data array. You can change this behavior
with `filter` function:

```tsx
import { TagsInput, ComboboxItem, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  filtered.sort((a, b) => a.label.localeCompare(b.label));
  return filtered;
};

function Demo() {
  return (
    <TagsInput
      label="Your favorite libraries"
      placeholder="Pick value or enter anything"
      data={['4 – React', '1 – Angular', '3 – Vue', '2 – Svelte']}
      filter={optionsFilter}
    />
  );
}
```


## Fuzzy search with fuse.js

You can implement fuzzy search using the [fuse.js](https://fusejs.io/) library to match options
even with typos or partial matches:

```tsx
import { TagsInput, ComboboxItem, OptionsFilter } from '@mantine/core';
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
    <TagsInput
      label="Favorite fruits"
      placeholder="Pick value or enter anything"
      data={['Apple', 'Banana', 'Kiwi', 'Mango', 'Watermelon', 'Raspberry']}
      filter={optionsFilter}
    />
  );
}
```


## Large datasets

TagsInput can handle large datasets efficiently. Consider implementing virtualization for datasets with thousands of items to improve performance.

```tsx
import { TagsInput } from '@mantine/core';

const largeData = Array(100_000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <TagsInput
      label="100 000 options tags input"
      placeholder="Use limit to optimize performance"
      limit={5}
      data={largeData}
    />
  );
}
```


## renderOption

`renderOption` callback allows you to customize option rendering. It is called with option object.
The function must return a React node.

```tsx
import { Group, TagsInput, TagsInputProps, Text } from '@mantine/core';

const data: Record<string, { emoji: string; description: string }> = {
  Apples: {
    emoji: '🍎',
    description: 'Crisp and juicy snacking delight',
  },
  Bread: {
    emoji: '🍞',
    description: 'Freshly baked daily essential',
  },
  Bananas: {
    emoji: '🍌',
    description: 'Perfect for a healthy breakfast',
  },
  Eggs: {
    emoji: '🥚',
    description: 'Versatile protein source for cooking',
  },
  Broccoli: {
    emoji: '🥦',
    description: 'Nutrient-rich green vegetable',
  },
};

const renderTagsInputOption: TagsInputProps['renderOption'] = ({ option }) => (
  <Group>
    <Text span fz={24}>
      {data[option.value].emoji}
    </Text>
    <div>
      <Text>{option.value}</Text>
      <Text size="xs" opacity={0.5}>
        {data[option.value].description}
      </Text>
    </div>
  </Group>
);

function Demo() {
  return (
    <TagsInput
      data={['Apples', 'Bread', 'Bananas', 'Eggs', 'Broccoli']}
      renderOption={renderTagsInputOption}
      label="Groceries"
      placeholder="Pick tag from list or type to add new"
      maxDropdownHeight={300}
    />
  );
}
```


## Pill customization

`renderPill` callback allows customizing how pills are rendered. It is called with an object containing
`option` (combobox item), `value` (string), `onRemove` (function) and `disabled`.
Note that since `TagsInput` allows adding custom values, `option` property might be generated on the fly.

```tsx
import { TagsInput, Pill } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Custom pills"
      description="Tags are rendered with a star prefix"
      placeholder="Enter tag"
      defaultValue={['React', 'Angular']}
      renderPill={({ value, onRemove }) => (
        <Pill withRemoveButton onRemove={onRemove}>
          ★ {value}
        </Pill>
      )}
    />
  );
}
```


## Scrollable dropdown

By default, the options list is wrapped with [ScrollArea.Autosize](https://mantine.dev/llms/core-scroll-area.md).
You can control dropdown max-height with `maxDropdownHeight` prop if you do not change the default settings.

If you want to use native scrollbars, set `withScrollArea={false}`. Note that in this case,
you will need to change dropdown styles with [Styles API](https://mantine.dev/llms/styles-styles-api.md).

```tsx
import { TagsInput } from '@mantine/core';

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <>
      <TagsInput
        label="With scroll area (default)"
        placeholder="Pick value or enter anything"
        data={data}
        maxDropdownHeight={200}
      />

      <TagsInput
        label="With native scroll"
        placeholder="Pick value or enter anything"
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
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Enter tags"
      placeholder="Enter tags"
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Express', 'Django'] },
      ]}
    />
  );
}
```


## Disabled options

When option is disabled, it cannot be selected and is ignored in keyboard navigation.
Note that user can still enter disabled option as a value. If you want to prohibit certain values,
use controlled component and filter them out in `onChange` function.

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Enter tags"
      placeholder="Some tags are disabled"
      data={[
        { value: 'React' },
        { value: 'Angular' },
        { value: 'Vue', disabled: true },
        { value: 'Svelte', disabled: true },
      ]}
    />
  );
}
```


## Inside Popover

To use `TagsInput` inside popover, you need to set `withinPortal: false`:

```tsx
import { Popover, Button, TagsInput } from '@mantine/core';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <TagsInput
          label="Your favorite library"
          placeholder="Pick value or enter anything"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          comboboxProps={{ withinPortal: false }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Control dropdown opened state

You can control dropdown opened state with `dropdownOpened` prop. Additionally,
you can use `onDropdownClose` and `onDropdownOpen` to listen to dropdown opened state changes.

```tsx
import { TagsInput, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [dropdownOpened, { toggle }] = useDisclosure();
  return (
    <>
      <Button onClick={toggle} mb="md">
        Toggle dropdown
      </Button>

      <TagsInput
        label="Your favorite library"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        dropdownOpened={dropdownOpened}
      />
    </>
  );
}
```


## Dropdown position

By default, the dropdown is displayed below the input if there is enough space; otherwise it is displayed above the input.
You can change this behavior by setting `position` and `middlewares` props, which are passed down to the
underlying [Popover](https://mantine.dev/llms/core-popover.md) component.

Example of dropdown that is always displayed above the input:

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ position: 'top', middlewares: { flip: false, shift: false } }}
    />
  );
}
```


## Dropdown animation

By default, dropdown animations are disabled. To enable them, you can set `transitionProps`,
which will be passed down to the underlying [Transition](https://mantine.dev/llms/core-transition.md) component.

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    />
  );
}
```


## Dropdown width

To change dropdown width, set `width` prop in `comboboxProps`. By default,
dropdown width is equal to the input width.

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ width: 200, position: 'bottom-start' }}
    />
  );
}
```


## Dropdown padding

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <TagsInput
        label="Zero padding"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <TagsInput
        mt="md"
        label="10px padding"
        placeholder="Pick value or enter anything"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 10 }}
      />
    </>
  );
}
```


## Dropdown shadow

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ shadow: 'md' }}
    />
  );
}
```


## Input sections

TagsInput supports left and right sections to display icons, buttons or other content alongside the input.

```tsx
import { TagsInput } from '@mantine/core';
import { SquaresFourIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <SquaresFourIcon size={16} />;
  return (
    <>
      <TagsInput
        data={['React', 'Angular', 'Vue']}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Your favorite library"
        placeholder="Your favorite library"
      />
      <TagsInput
        mt="md"
        data={['React', 'Angular', 'Vue']}
        rightSectionPointerEvents="none"
        rightSection={icon}
        label="Your favorite library"
        placeholder="Your favorite library"
      />
    </>
  );
}
```


## Input props

TagsInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. TagsInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { TagsInput } from '@mantine/core';


function Demo() {
  return (
    <TagsInput
       variant="default" size="sm" radius="md" label="Input label" withAsterisk={false} description="Input description" error=""
      placeholder="TagsInput placeholder"
      value={['First', 'Second']}
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Read only

Set `readOnly` to make the input read only. When `readOnly` is set,
`TagsInput` will not show suggestions and will not call `onChange` function.

```tsx
import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Read only"
      placeholder="Enter tag"
      readOnly
      defaultValue={['First', 'Second']}
    />
  );
}
```


