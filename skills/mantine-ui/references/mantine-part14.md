## Example: overflow with hover card

You can use any React components in `renderOverflow` function. Example
of displaying collapsed items inside [HoverCard](https://mantine.dev/llms/core-hover-card.md):

```tsx
// OverflowListDemo.tsx
import { Badge, Center, HoverCard, OverflowList } from '@mantine/core';
import { data } from './data';

function Demo() {
  return (
    <div style={{ resize: 'horizontal', overflow: 'auto', maxWidth: '100%' }}>
      <OverflowList
        data={data}
        gap={4}
        renderItem={(item, index) => <Badge key={index}>{item}</Badge>}
        renderOverflow={(items) => (
          <Center>
            <HoverCard>
              <HoverCard.Target>
                <Badge>+{items.length} more</Badge>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                {items.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </HoverCard.Dropdown>
            </HoverCard>
          </Center>
        )}
      />
    </div>
  );
}

// data.ts
export const data = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Indian Fig',
  'Jackfruit',
  'Kiwi',
  'Lemon',
  'Mango',
  'Nectarine',
  'Orange',
  'Papaya',
];
```



#### Props

**OverflowList props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | T[] | required | Array of items to display |
| gap | MantineSpacing | - | Key of `theme.spacing` or any valid CSS value for `gap`, numbers are converted to rem |
| maxRows | number | - | Number of rows to display |
| maxVisibleItems | number | - | Maximum number of visible items |
| renderItem | (item: T, index: number) => ReactNode | required | Function to render item |
| renderOverflow | (items: T[]) => ReactNode | required | Function to render hidden items |


#### Styles API

OverflowList component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**OverflowList selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-OverflowList-root | Root element |

**OverflowList CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --ol-gap | Controls gap between items |


--------------------------------------------------------------------------------

### Overlay
Package: @mantine/core
Import: import { Overlay } from '@mantine/core';
Description: Overlays parent element with div element with any color and opacity

## Usage

`Overlay` takes 100% of the width and height of the parent container or viewport if the `fixed` prop is set.
Set the `color` and `backgroundOpacity` props to change the `Overlay` background-color. Note that the `backgroundOpacity` prop
does not change the CSS opacity property; it changes the background-color. For example, if you set
`color="#000"` and `backgroundOpacity={0.85}`, the background-color will be `rgba(0, 0, 0, 0.85)`:

```tsx
import { useState } from 'react';
import { Button, Overlay, AspectRatio } from '@mantine/core';

function Demo() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
        <img
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png"
          alt="Demo"
        />
        {visible && <Overlay color="#000" backgroundOpacity={0.85} />}
      </AspectRatio>
      <Button onClick={() => setVisible((v) => !v)} fullWidth maw={200} mx="auto" mt="xl">
        Toggle overlay
      </Button>
    </>
  );
}
```


## Gradient

Set the `gradient` prop to use background-image instead of background-color. When the `gradient` prop is set,
the `color` and `backgroundOpacity` props are ignored.

```tsx
import { useState } from 'react';
import { Button, Overlay, AspectRatio } from '@mantine/core';

function Demo() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
        <img
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
          alt="Demo"
        />
        {visible && (
          <Overlay
            gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
            opacity={0.85}
          />
        )}
      </AspectRatio>
      <Button onClick={() => setVisible((v) => !v)} fullWidth maw={200} mx="auto" mt="xl">
        Toggle overlay
      </Button>
    </>
  );
}
```


## Blur

Set the `blur` prop to add `backdrop-filter: blur({value})` styles.
Note that `backdrop-filter` [is not supported in all browsers](https://caniuse.com/css-backdrop-filter).

```tsx
import { Overlay, AspectRatio } from '@mantine/core';

function Demo() {
  return (
    <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
      <img
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png"
        alt="Demo"
      />
      <Overlay color="#000" backgroundOpacity={0.35} blur={15} />
    </AspectRatio>
  );
}
```



#### Props

**Overlay props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| backgroundOpacity | number | - | Overlay `background-color` opacity 0–1, ignored when `gradient` prop is set |
| blur | string \| number | - | Overlay background blur in px (converted to rem). Applies `backdrop-filter: blur()`. Note: backdrop-filter is not supported in all browsers. |
| center | boolean | - | Centers content inside the overlay using flexbox (sets display: flex, align-items: center, justify-content: center) |
| children | React.ReactNode | - | Content inside overlay |
| color | BackgroundColor | - | Overlay `background-color` |
| fixed | boolean | - | Changes position from `absolute` to `fixed` (viewport-relative instead of parent-relative) |
| gradient | string | - | Changes overlay to gradient. If set, both `color` and `backgroundOpacity` props are ignored. |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius |
| zIndex | string \| number | - | Overlay z-index |


#### Styles API

Overlay component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Overlay selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Overlay-root | Root element |

**Overlay CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --overlay-bg | Controls `background-color` |
| root | --overlay-filter | Controls `backdrop-filter` |
| root | --overlay-radius | Controls `border-radius` |
| root | --overlay-z-index | Controls `z-index` |

**Overlay data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-center | `center` prop is set | - |
| root | data-fixed | `fixed` prop is set | - |


--------------------------------------------------------------------------------

### CorePackage
Package: @mantine/core
Import: import { CorePackage } from '@mantine/core';

# Mantine Core components

[![npm](https://img.shields.io/npm/dm/@mantine/core)](https://www.npmjs.com/package/@mantine/core)

[@mantine/core](https://www.npmjs.com/package/@mantine/core) package
provides essential components: buttons, inputs, modals, typography, and many others.
The `@mantine/core` package is used internally in most of the other `@mantine/*` packages –
it is required to be installed in your project to use Mantine components.

## Installation

```bash
yarn add @mantine/hooks @mantine/core
```

```bash
npm install @mantine/hooks @mantine/core
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
```

## Usage

Follow the [getting started guide](https://mantine.dev/llms/getting-started.md) to learn how to
complete the Mantine setup in your project. Example of using the [Stepper](https://mantine.dev/llms/core-stepper.md) component:

```tsx
import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
```


## License

MIT


--------------------------------------------------------------------------------

### Pagination
Package: @mantine/core
Import: import { Pagination } from '@mantine/core';
Description: Display active page and navigate between multiple pages

## Usage

```tsx
import { Pagination } from '@mantine/core';

function Demo() {
  return <Pagination total={10} color="blue" size="md" radius="md" withControls={true} withEdges={false} disabled={false} />;
}
```


## Example with chunked content

```tsx
import { useState } from 'react';
import { randomId } from '@mantine/hooks';
import { Pagination, Text } from '@mantine/core';

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const data = chunk(
  Array(30)
    .fill(0)
    .map((_, index) => ({ id: index, name: randomId() })),
  5
);

function Demo() {
  const [activePage, setPage] = useState(1);
  const items = data[activePage - 1].map((item) => (
    <Text key={item.id}>
      id: {item.id}, name: {item.name}
    </Text>
  ));

  return (
    <>
      {items}
      <Pagination total={data.length} value={activePage} onChange={setPage} mt="sm" />
    </>
  );
}
```


## Controlled

To control the component state, provide `value` and `onChange` props:

```tsx
import { useState } from 'react';
import { Pagination } from '@mantine/core';

function Demo() {
  const [activePage, setPage] = useState(1);
  return (
    <Pagination value={activePage} onChange={setPage} total={10} />
  );
}
```

## Siblings

Control the number of active item siblings with the `siblings` prop:

```tsx
import { Text, Pagination } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text mb="xs">1 sibling (default)</Text>
      <Pagination total={20} siblings={1} defaultValue={10} />

      <Text mb="xs" mt="xl">2 siblings</Text>
      <Pagination total={20} siblings={2} defaultValue={10} />

      <Text mb="xs" mt="xl">3 siblings</Text>
      <Pagination total={20} siblings={3} defaultValue={10} />
    </>
  );
}
```


## Boundaries

Control the number of items displayed after previous and before next buttons with the `boundaries` prop:

```tsx
import { Text, Pagination } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text mb="xs">1 boundary (default)</Text>
      <Pagination total={20} boundaries={1} defaultValue={10} />

      <Text mt="xl" mb="xs">2 boundaries</Text>
      <Pagination total={20} boundaries={2} defaultValue={10} />

      <Text mt="xl" mb="xs">3 boundaries</Text>
      <Pagination total={20} boundaries={3} defaultValue={10} />
    </>
  );
}
```


## Compound components

You can use the following compound components to have full control over the `Pagination` rendering:

* `Pagination.Root` – context provider
* `Pagination.Items` – items list
* `Pagination.Next` – next control
* `Pagination.Previous` – previous control
* `Pagination.First` – first control
* `Pagination.Last` – last control

```tsx
import { Group, Pagination } from '@mantine/core';

function Demo() {
  return (
    <Pagination.Root total={10}>
      <Group gap={5} justify="center">
        <Pagination.First />
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
        <Pagination.Last />
      </Group>
    </Pagination.Root>
  );
}
```


## Controls as links

```tsx
import { Group, Pagination } from '@mantine/core';

function Demo() {
  return (
    <>
      {/* Regular pagination */}
      <Pagination
        total={10}
        withEdges
        getItemProps={(page) => ({
          component: 'a',
          href: `#page-${page}`,
        })}
        getControlProps={(control) => {
          if (control === 'first') {
            return { component: 'a', href: '#page-0' };
          }

          if (control === 'last') {
            return { component: 'a', href: '#page-10' };
          }

          if (control === 'next') {
            return { component: 'a', href: '#page-2' };
          }

          if (control === 'previous') {
            return { component: 'a', href: '#page-1' };
          }

          return {};
        }}
      />

      {/* Compound pagination */}
      <Pagination.Root
        total={10}
        getItemProps={(page) => ({
          component: 'a',
          href: `#page-${page}`,
        })}
      >
        <Group gap={7} mt="xl">
          <Pagination.First component="a" href="#page-0" />
          <Pagination.Previous component="a" href="#page-1" />
          <Pagination.Items />
          <Pagination.Next component="a" href="#page-2" />
          <Pagination.Last component="a" href="#page-10" />
        </Group>
      </Pagination.Root>
    </>
  );
}
```


## Change icons

```tsx
import { Group, Pagination } from '@mantine/core';
import { ArrowLineRightIcon, ArrowLineLeftIcon, ArrowLeftIcon, ArrowRightIcon, DotsSixIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      {/* Regular pagination */}
      <Pagination
        total={10}
        withEdges
        nextIcon={ArrowRightIcon}
        previousIcon={ArrowLeftIcon}
        firstIcon={ArrowLineLeftIcon}
        lastIcon={ArrowLineRightIcon}
        dotsIcon={DotsSixIcon}
      />

      {/* Compound pagination */}
      <Pagination.Root total={10}>
        <Group gap={7} mt="xl">
          <Pagination.First icon={ArrowLineLeftIcon} />
          <Pagination.Previous icon={ArrowLeftIcon} />
          <Pagination.Items dotsIcon={DotsSixIcon} />
          <Pagination.Next icon={ArrowRightIcon} />
          <Pagination.Last icon={ArrowLineRightIcon} />
        </Group>
      </Pagination.Root>
    </>
  );
}
```


```tsx
import { Pagination, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text>autoContrast: off</Text>
      <Pagination total={10} color="lime.4" />

      <Text mt="md">autoContrast: on</Text>
      <Pagination total={10} autoContrast color="lime.4" />
    </>
  );
}
```


## Controls size

By default, pagination controls have reduced size compared to inputs and buttons.
If you want controls to have the same size as inputs and buttons, you can use `input-` prefix for the `size` prop:

```tsx
import { Button, Group, Pagination, TextInput } from '@mantine/core';

function Demo() {
  return (
    <div>
      <Group>
        <Pagination total={45} size="sm" />
        <Button size="sm">sm button</Button>
        <TextInput size="sm" placeholder="sm input" />
      </Group>

      <Group mt="md">
        <Pagination total={45} size="input-sm" />
        <Button size="sm">sm button</Button>
        <TextInput size="sm" placeholder="sm input" />
      </Group>
    </div>
  );
}
```


## Start value

Set `startValue` to define the starting page number. For example, with `startValue={5}` and `total={15}`,
the pagination range will be from 5 to 15:

```tsx
import { Text, Pagination } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text mb="xs">Pages 5–15 (startValue=5, total=15)</Text>
      <Pagination total={15} startValue={5} defaultValue={5} />
    </>
  );
}
```


## URL synchronization

You can synchronize pagination state with URL query parameters. This pattern is commonly used for list views where you want to share the URL with a specific page selected.

### Next.js

```tsx
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@mantine/core';

function Demo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', p.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return <Pagination total={10} value={page} onChange={handlePageChange} />;
}
```

### react-router-dom

```tsx
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mantine/core';

function Demo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (p: number) => {
    setSearchParams({ page: p.toString() });
  };

  return <Pagination total={10} value={page} onChange={handlePageChange} />;
}
```

### nuqs

Example using [nuqs](https://nuqs.dev/):

```tsx
import { useQueryState, parseAsInteger } from 'nuqs';
import { Pagination } from '@mantine/core';

function Demo() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  return <Pagination total={10} value={page} onChange={setPage} />;
}
```

## use-pagination hook

If you need more flexibility, the `@mantine/hooks` package exports the [use-pagination](https://mantine.dev/llms/hooks-use-pagination.md) hook.
You can use it to create custom pagination components.


#### Props

**Pagination props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on the active page background color to ensure sufficient contrast |
| boundaries | number | - | Number of elements visible on the left/right edges |
| color | MantineColor | - | Key of `theme.colors`, active item color |
| defaultValue | number | - | Active page for uncontrolled component, must be an integer in [1, total] interval |
| disabled | boolean | - | Disables all controls, applies disabled styles |
| dotsIcon | PaginationIcon | - | Dots icon component |
| firstIcon | PaginationIcon | - | First control icon component |
| gap | MantineSpacing | - | Key of `theme.spacing`, gap between controls |
| getControlProps | (control: "next" \| "previous" \| "first" \| "last") => Record<string, any> | - | Props passed down to next/previous/first/last controls |
| getItemProps | (page: number) => Record<string, any> | - | Additional props passed down to controls |
| hideWithOnePage | boolean | - | If set, the pagination is hidden when only one page is available (`total={1}`) |
| lastIcon | PaginationIcon | - | Last control icon component |
| nextIcon | PaginationIcon | - | Next control icon component |
| onChange | (value: number) => void | - | Called when page changes |
| onFirstPage | () => void | - | Called when first page control is clicked |
| onLastPage | () => void | - | Called when last page control is clicked |
| onNextPage | () => void | - | Called when next page control is clicked |
| onPreviousPage | () => void | - | Called when previous page control is clicked |
| previousIcon | PaginationIcon | - | Previous control icon component |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| siblings | number | - | Number of siblings displayed on the left/right side of the selected page |
| size | number \| MantineSize \| (string & {}) \| "input-xs" \| "input-sm" \| "input-md" \| "input-lg" \| "input-xl" | - | `height` and `min-width` of controls |
| startValue | number | - | Starting page number, defaults to 1 |
| total | number | required | Total number of pages, must be an integer |
| value | number | - | Active page for controlled component, must be an integer in [1, total] interval |
| withControls | boolean | - | If set, next/previous controls are displayed |
| withEdges | boolean | - | If set, first/last controls are displayed |
| withPages | boolean | - | If set to `false`, page number buttons are hidden, only next/previous controls remain |

**Pagination.Root props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on the active page background color to ensure sufficient contrast |
| boundaries | number | - | Number of elements visible on the left/right edges |
| color | MantineColor | - | Key of `theme.colors`, active item color |
| defaultValue | number | - | Active page for uncontrolled component, must be an integer in [1, total] interval |
| disabled | boolean | - | Disables all controls, applies disabled styles |
| getItemProps | (page: number) => Record<string, any> | - | Additional props passed down to controls |
| onChange | (value: number) => void | - | Called when page changes |
| onFirstPage | () => void | - | Called when first page control is clicked |
| onLastPage | () => void | - | Called when last page control is clicked |
| onNextPage | () => void | - | Called when next page control is clicked |
| onPreviousPage | () => void | - | Called when previous page control is clicked |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| siblings | number | - | Number of siblings displayed on the left/right side of the selected page |
| size | number \| MantineSize \| (string & {}) \| "input-xs" \| "input-sm" \| "input-md" \| "input-lg" \| "input-xl" | - | `height` and `min-width` of controls |
| startValue | number | - | Starting page number, defaults to 1 |
| total | number | required | Total number of pages, must be an integer |
| value | number | - | Active page for controlled component, must be an integer in [1, total] interval |

**Pagination.Items props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| dotsIcon | PaginationIcon | - | Dots icon component |

**Pagination.Dots props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | FC<PaginationIconProps> | - | Custom dots icon component, must accept svg element props and size prop |

**Pagination.Next props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | FC<PaginationIconProps> | - | An icon component to replace the default icon |

**Pagination.Previous props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | FC<PaginationIconProps> | - | An icon component to replace the default icon |

**Pagination.First props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | FC<PaginationIconProps> | - | An icon component to replace the default icon |

**Pagination.Last props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | FC<PaginationIconProps> | - | An icon component to replace the default icon |

**Pagination.Control props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | boolean | - | Applies active styles, adds `data-active` attribute |
| withPadding | boolean | - | Applies padding |


#### Styles API

Pagination component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Pagination selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Pagination-root | Root element |
| control | .mantine-Pagination-control | Control element: items, next/previous, first/last buttons |
| dots | .mantine-Pagination-dots | Dots icon wrapper |

**Pagination CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --pagination-active-bg | Active control `background-color` |
| root | --pagination-active-color | Active control `color` |
| root | --pagination-control-fz | Controls `font-size` |
| root | --pagination-control-radius | Controls control `border-radius` |
| root | --pagination-control-size | Controls control `min-width` and `height` |

**Pagination data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| control | data-active | Control is active | - |
| control | data-disabled | Control is disabled | - |


--------------------------------------------------------------------------------

### Paper
Package: @mantine/core
Import: import { Paper } from '@mantine/core';
Description: Renders white or dark background depending on color scheme

## Usage

```tsx
import { Text, Paper } from '@mantine/core';

function Demo() {
  return (
    <Paper shadow="xs" radius="md" withBorder={false} p="xl">
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that require background
        with shadow
      </Text>
    </Paper>
  );
}
```



#### Props

**Paper props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem |
| shadow | MantineShadow | - | Key of `theme.shadows` or any valid CSS value to set `box-shadow` |
| withBorder | boolean | - | Adds border to the root element |


#### Styles API

Paper component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Paper selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Paper-root | Root element |

**Paper CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --paper-radius | Controls `border-radius` |
| root | --paper-shadow | Controls `box-shadow` |

**Paper data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-with-border | `withBorderProp` is set | - |


--------------------------------------------------------------------------------

### PasswordInput
Package: @mantine/core
Import: import { PasswordInput } from '@mantine/core';
Description: Capture password data from user

## Usage

PasswordInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. PasswordInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { PasswordInput } from '@mantine/core';


function Demo() {
  return (
    <PasswordInput
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
import { PasswordInput } from '@mantine/core';

function Demo() {
  return <PasswordInput placeholder="Your password" loading />;
}
```


## Controlled

```tsx
import { useState } from 'react';
import { PasswordInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  return (
    <PasswordInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```

## Uncontrolled

`PasswordInput` can be used with uncontrolled forms the same way as a native `input[type="password"]`.
Set the `name` attribute to include password input value in `FormData` object on form submission.
To control the initial value in uncontrolled forms, use the `defaultValue` prop.

Example usage of uncontrolled `PasswordInput` with `FormData`:

```tsx
import { PasswordInput } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Password value:', formData.get('password'));
      }}
    >
      <PasswordInput
        label="Enter your password"
        name="password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Controlled visibility toggle

Control the visibility state with the `visible` and `onVisibilityChange` props.
For example, the props can be used to sync visibility state between two inputs:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { PasswordInput, Stack } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure(false);
  return (
    <Stack>
      <PasswordInput
        label="Password"
        defaultValue="secret"
        visible={visible}
        onVisibilityChange={toggle}
      />
      <PasswordInput
        label="Confirm password"
        defaultValue="secret"
        visible={visible}
        onVisibilityChange={toggle}
      />
    </Stack>
  );
}
```


## Change visibility toggle icon

To change the visibility toggle icon, pass a React component that accepts the `reveal` prop to `visibilityToggleIcon`:

```tsx
import { PasswordInput } from '@mantine/core';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
  reveal ? (
    <EyeSlashIcon style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  ) : (
    <EyeIcon style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
  );

function Demo() {
  return (
    <PasswordInput
      maw={320}
      mx="auto"
      label="Change visibility toggle icon"
      placeholder="Change visibility toggle icon"
      defaultValue="secret"
      visibilityToggleIcon={VisibilityToggleIcon}
    />
  );
}
```


## Strength meter example

Password strength meter example with the [Progress](https://mantine.dev/llms/core-progress.md) and [Popover](https://mantine.dev/llms/core-popover.md) components:

```tsx
import { useState } from 'react';
import { XIcon, CheckIcon } from '@phosphor-icons/react';
import { PasswordInput, Progress, Text, Popover, Box } from '@mantine/core';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <CheckIcon size={14} /> : <XIcon size={14} />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function Demo() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            withAsterisk
            label="Your password"
            placeholder="Your password"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
```


## Usage without visibility toggle

If you do not need the visibility toggle button, use the [TextInput](https://mantine.dev/llms/core-text-input.md) component instead:

```tsx
import { TextInput } from '@mantine/core';

function Demo() {
  return <TextInput type="password" />;
}
```

## Input sections

PasswordInput supports left and right sections to display icons, buttons or other content alongside the input.

Note that when the `rightSection` prop is used, the visibility toggle button is not rendered.

```tsx
import { PasswordInput } from '@mantine/core';
import { LockIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <LockIcon size={18} />;

  return (
    <>
      <PasswordInput
        leftSection={icon}
        leftSectionPointerEvents="none"
        label="With left section"
        placeholder="With left section"
      />
      <PasswordInput
        rightSection={icon}
        label="With right section"
        placeholder="With right section"
        rightSectionPointerEvents="none"
        mt="md"
      />
    </>
  );
}
```


## Error state

```tsx
import { PasswordInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <PasswordInput label="Boolean error" placeholder="Boolean error" error />
      <PasswordInput
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
      />
    </>
  );
}
```



#### Props

**PasswordInput props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultVisible | boolean | - | If set, the input value is visible by default |
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
| onVisibilityChange | (visible: boolean) => void | - | Called when visibility changes |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| size | MantineSize | - | Controls input `height`, horizontal `padding`, and `font-size` |
| visibilityToggleButtonProps | Record<string, any> | - | Props passed down to the visibility toggle button |
| visibilityToggleIcon | FC<{ reveal: boolean; }> | - | A component to replace the visibility toggle icon |
| visible | boolean | - | If set, the input value is visible |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

PasswordInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**PasswordInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-PasswordInput-wrapper | Root element of the Input |
| input | .mantine-PasswordInput-input | Input element |
| section | .mantine-PasswordInput-section | Left and right sections |
| root | .mantine-PasswordInput-root | Root element |
| label | .mantine-PasswordInput-label | Label element |
| required | .mantine-PasswordInput-required | Required asterisk element, rendered inside label |
| description | .mantine-PasswordInput-description | Description element |
| error | .mantine-PasswordInput-error | Error element |
| innerInput | .mantine-PasswordInput-innerInput | Actual input element |
| visibilityToggle | .mantine-PasswordInput-visibilityToggle | Visibility toggle button |

**PasswordInput CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --psi-button-size | Controls visibility toggle button `width` and `height` |
| root | --psi-icon-size | Controls visibility toggle icon `width` and `height` |


--------------------------------------------------------------------------------

### Pill
Package: @mantine/core
Import: import { Pill } from '@mantine/core';
Description: Removable and non-removable tags

## Usage

```tsx
import { Pill } from '@mantine/core';

function Demo() {
  return <Pill size="md" withRemoveButton={false}>React</Pill>;
}
```



#### Props

**Pill props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| disabled | boolean | - | Adds disabled attribute, applies disabled styles |
| onRemove | () => void | - | Called when the remove button is clicked |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem. |
| removeButtonProps | CloseButtonProps & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement> | - | Props passed down to the remove button |
| size | MantineSize | - | Controls pill `font-size` and `padding` |
| withRemoveButton | boolean | - | Controls visibility of the remove button |

**Pill.sInput props**

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

**Pill.Group props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|

**Pill.sInputField props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| pointer | boolean | - | If set, cursor is changed to pointer |
| type | "hidden" \| "auto" \| "visible" | - | Controls input styles when focused. If `auto` the input is hidden when not focused. If `visible` the input will always remain visible. |


#### Styles API

Pill component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Pill selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Pill-root | Root element |
| label | .mantine-Pill-label | Pill label (children) |
| remove | .mantine-Pill-remove | Remove button |

**Pill CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --pill-height | Controls `height` of the pill |
| root | --pill-fz | Controls `font-size` |
| root | --pill-radius | Controls `border-radius` |

**Pill data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-with-remove | `withRemoveButton` prop is set | - |
| root | data-disabled | `disabled` prop is set | - |

**Pill.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| group | .mantine-PillGroup-group | Root element |

**Pill.Group CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| group | --pg-gap | Controls `gap` between pills |

**Pillsinput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Pillsinput-wrapper | Root element of the Input |
| input | .mantine-Pillsinput-input | Input element |
| section | .mantine-Pillsinput-section | Left and right sections |
| root | .mantine-Pillsinput-root | Root element |
| label | .mantine-Pillsinput-label | Label element |
| required | .mantine-Pillsinput-required | Required asterisk element, rendered inside label |
| description | .mantine-Pillsinput-description | Description element |
| error | .mantine-Pillsinput-error | Error element |

**Pillsinputfield selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| field | .mantine-Pillsinputfield-field | Root element |

**Pillsinputfield data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| field | data-type | - | Value of `type` prop |
| field | data-disabled | `disabled` prop is set | - |


--------------------------------------------------------------------------------

### PillsInput
Package: @mantine/core
Import: import { PillsInput } from '@mantine/core';
Description: Base component for custom tags inputs and multi selects

## Usage

`PillsInput` is a utility component that can be used to create custom tag inputs, multi-selects, and
other similar components. By itself it does not include any logic; it only renders given children.
Usually, `PillsInput` is used in combination with the [Pill](https://mantine.dev/llms/core-pill.md) component.

```tsx
import { PillsInput, Pill } from '@mantine/core';

function Demo() {
  return (
    <PillsInput label="PillsInput">
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


## Loading state

Set `loading` prop to display a loading indicator. By default, the loader is displayed on the right side of the input.
You can change the position with the `loadingPosition` prop to `'left'` or `'right'`. This is useful for async operations like API calls, searches, or validations:

```tsx
import { PillsInput, Pill } from '@mantine/core';

function Demo() {
  return (
    <PillsInput label="Enter items" loading>
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <PillsInput.Field placeholder="Enter value" />
      </Pill.Group>
    </PillsInput>
  );
}
```


