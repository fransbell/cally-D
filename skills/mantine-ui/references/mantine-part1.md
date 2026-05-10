# Mantine UI Library - Complete Documentation

This file contains comprehensive documentation for the Mantine UI library including:
- Complete component documentation with all usage examples
- Full demo code for every example shown in the documentation
- Complete props tables with types and descriptions for all components
- Styles API documentation showing all available selectors
- FAQ and troubleshooting guides

All code examples use production npm package imports (e.g., @mantine/core, @mantine/hooks)

================================================================================

## CORE COMPONENTS AND FEATURES
Primary Package: @mantine/core

### Accordion
Package: @mantine/core
Import: import { Accordion } from '@mantine/core';
Description: Divide content into collapsible sections

## Usage

Accordion allows users to expand and collapse sections of content.
It helps manage large amounts of information in a limited space
by showing only section headers initially and revealing content upon interaction.

Accordion is commonly used for:

* FAQ sections: displaying questions as headers with answers revealed when clicked
* Forms: organizing long forms into sections, for example, personal info, shipping, and payment
* Menus: nested navigation in sidebars or mobile views

```tsx
// Demo.tsx
import { Accordion } from '@mantine/core';
import { data } from './data';

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion variant="default" radius="md" chevronPosition="right" chevronIconSize={16} disableChevronRotation={false} order={3} defaultValue="Apples">
      {items}
    </Accordion>
  );
}

// data.ts
export const data = [
  {
    emoji: '🍎',
    value: 'Apples',
    description:
      'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
  },
  {
    emoji: '🍌',
    value: 'Bananas',
    description:
      'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
  },
  {
    emoji: '🥦',
    value: 'Broccoli',
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
];
```


## order prop

The `order` prop (used in all demos on this page) sets the heading level for the `Accordion.Control` root element.
According to [WAI-ARIA recommendations](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html),
it is required to use `h2`-`h6` heading levels to fit correctly within the outline of the page.

All examples on this page use `order={3}`, which means that all `button` elements of
`Accordion.Control` are wrapped with an `h3` tag (`h2` tags are used for the documentation sections).

The `order` prop is not enforced by the library but is required if your application
must meet accessibility standards.

## Change chevron

Use the `chevron` prop to change the chevron icon. When `chevron` is set,
the `chevronIconSize` prop is ignored. To remove the chevron icon, use `chevron={null}`.

To customize chevron styles, use [Styles API](https://mantine.dev/llms/styles-styles-api.md) with the
[data-rotate](https://mantine.dev/llms/styles-data-attributes.md) attribute. This attribute is set when the item
is opened if the `disableChevronRotation` prop is not set.

Example of a custom chevron icon with rotation styles:

```tsx
// Demo.module.css
.chevron {
  &[data-rotate] {
    transform: rotate(45deg);
  }
}

.icon {
  width: 16px;
  height: 16px;
}

// data.ts
export const data = [
  {
    emoji: '🍎',
    value: 'Apples',
    description:
      'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
  },
  {
    emoji: '🍌',
    value: 'Bananas',
    description:
      'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
  },
  {
    emoji: '🥦',
    value: 'Broccoli',
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
];
```


## Custom control label

You can use any React node as a label for `Accordion.Control` component.
When you use nested elements in `Accordion.Control`, it is recommended to
set `aria-label` attribute to make the control accessible for screen readers.

```tsx
import { Flex, Avatar, Text, Accordion } from '@mantine/core';

const charactersList = [
  {
    id: 'bender',
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
    content: "Bender Bending Rodríguez, (born September 4, 2996), designated Bending Unit 22, and commonly known as Bender, is a bending unit created by a division of MomCorp in Tijuana, Mexico, and his serial number is 2716057. His mugshot id number is 01473. He is Fry's best friend.",
  },

  {
    id: 'carol',
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    description: 'One of the richest people on Earth',
    content: "Carol Miller (born January 30, 2880), better known as Mom, is the evil chief executive officer and shareholder of 99.7% of Momcorp, one of the largest industrial conglomerates in the universe and the source of most of Earth's robots. She is also one of the main antagonists of the Futurama series.",
  },

  {
    id: 'homer',
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
    content: 'Homer Jay Simpson (born May 12) is the main protagonist and one of the five main characters of The Simpsons series(or show). He is the spouse of Marge Simpson and father of Bart, Lisa and Maggie Simpson.',
  },
];

interface AccordionLabelProps {
  label: string;
  image: string;
  description: string;
}

function AccordionLabel({ label, image, description }: AccordionLabelProps) {
  return (
    <Flex component="span" gap="md" align="center" wrap="nowrap">
      <Avatar src={image} radius="xl" size="lg" alt={label} />
      <div>
        <Text span>{label}</Text>
        <Text span display="block" size="sm" c="dimmed" fw={400}>
          {description}
        </Text>
      </div>
    </Flex>
  );
}

function Demo() {
  const items = charactersList.map((item) => (
    <Accordion.Item value={item.id} key={item.label}>
      <Accordion.Control aria-label={item.label}>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="sm">{item.content}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion chevronPosition="right" variant="contained">
      {items}
    </Accordion>
  );
}
```


## With icons

Use the `icon` prop to display any element in the left section of the `Accordion.Control`:

```tsx
import { ImageIcon, PrinterIcon, CameraIcon } from '@phosphor-icons/react';
import { Accordion } from '@mantine/core';

function Demo() {
  return (
    <Accordion variant="filled" defaultValue="photos" order={3}>
      <Accordion.Item value="photos">
        <Accordion.Control
          icon={<ImageIcon size={22} color="var(--mantine-color-dimmed)" />}
        >
          Recent photos
        </Accordion.Control>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="print">
        <Accordion.Control
          icon={<PrinterIcon size={22} color="var(--mantine-color-dimmed)" />}
        >
          Print photos
        </Accordion.Control>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="camera">
        <Accordion.Control
          icon={<CameraIcon size={22} color="var(--mantine-color-dimmed)" />}
        >
          CameraIcon settings
        </Accordion.Control>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```


## Change transition

To change transition duration, set `transitionDuration` prop:



To disable transitions, set `transitionDuration` to 0:



## Default opened items

For `multiple={false}`, set `defaultValue` as string:

```tsx
import { Accordion } from '@mantine/core';

function Demo() {
  // Second item will be opened by default
  return (
    <Accordion defaultValue="item-2">
      <Accordion.Item value="item-1">{/* item-1 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

For `multiple={true}`, set `defaultValue` as an array of strings:

```tsx
import { Accordion } from '@mantine/core';

function Demo() {
  // Both items are opened by default
  return (
    <Accordion multiple defaultValue={['item-1', 'item-2']}>
      <Accordion.Item value="item-1">{/* item-1 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

## Control opened state

For `multiple={false}`, set `value` as string:

```tsx
import { useState } from 'react';
import { Accordion } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Accordion value={value} onChange={setValue}>
      <Accordion.Item value="item-1">{/* item-1 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

For `multiple={true}`, set `value` as an array of strings:

```tsx
import { useState } from 'react';
import { Accordion } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Accordion multiple value={value} onChange={setValue}>
      <Accordion.Item value="item-1">{/* item-1 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

## Compose controls

Putting a button or link inside `Accordion.Control` is a common mistake when
using Accordion. The `Accordion.Control` root element is a `button`. Putting interactive
elements inside other interactive elements is forbidden – you will receive a DOM
validation error from React if you try to implement the following component:

```tsx
import { Accordion } from '@mantine/core';

// ❌ Incorrect usage: do not do this
function Demo() {
  return (
    <Accordion.Item value="item-1">
      <Accordion.Control>
        <Group>
          <span>Control 1</span>
          <button>My action</button>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>Panel 1</Accordion.Panel>
    </Accordion.Item>
  );
}
```

Instead of putting interactive elements inside the `Accordion.Control`, render them
next to it. For example, you can add an [ActionIcon](https://mantine.dev/llms/core-action-icon.md) or [Menu](https://mantine.dev/llms/core-menu.md)
to the right side of the original control. If you need to display an interactive element
over the `Accordion.Control`, use `position: absolute` instead.

```tsx
import { Accordion, ActionIcon, AccordionControlProps, Center } from '@mantine/core';
import { DotsThreeIcon } from '@phosphor-icons/react';

function AccordionControl(props: AccordionControlProps) {
  return (
    <Center>
      <Accordion.Control {...props} />
      <ActionIcon size="lg" variant="subtle" color="gray" aria-label="More options">
        <DotsThreeIcon size={20} />
      </ActionIcon>
    </Center>
  );
}

function Demo() {
  return (
    <Accordion chevronPosition="left" order={3}>
      <Accordion.Item value="item-1">
        <AccordionControl>Control 1</AccordionControl>
        <Accordion.Panel>Panel 1</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="item-2">
        <AccordionControl>Control 2</AccordionControl>
        <Accordion.Panel>Panel 2</Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="item-3">
        <AccordionControl>Control 3</AccordionControl>
        <Accordion.Panel>Panel 3</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```


## Disabled items

Set the `disabled` prop on the `Accordion.Control` component to disable it.
When you disable items, users cannot activate them with the mouse or keyboard,
and arrow key navigation will skip them:

```tsx
// Demo.tsx
import { Accordion } from '@mantine/core';
import { data } from './data';

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji} disabled={item.value === 'Bananas'}>
        {item.value}
      </Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion defaultValue="Apples" order={3}>
      {items}
    </Accordion>
  );
}

// data.ts
export const data = [
  {
    emoji: '🍎',
    value: 'Apples',
    description:
      'Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.',
  },
  {
    emoji: '🍌',
    value: 'Bananas',
    description:
      'Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.',
  },
  {
    emoji: '🥦',
    value: 'Broccoli',
    description:
      'Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.',
  },
];
```


## TypeScript

The `AccordionProps` type exported from `@mantine/core` is a generic that accepts a boolean type
describing the `multiple` state:

```tsx
import type { AccordionProps } from '@mantine/core';

type MultipleAccordionProps = AccordionProps<true>;
type DefaultAccordionProps = AccordionProps<false>;
```

## Accessibility

The Accordion component implements the [WAI-ARIA accessibility pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

## Keyboard interactions


#### Props

**Accordion props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| chevron | React.ReactNode | - | Custom chevron icon |
| chevronIconSize | string \| number | - | Size of the default chevron icon. Ignored when `chevron` prop is set. Use `chevronSize` instead when using custom chevron. |
| chevronPosition | "left" \| "right" | - | Position of the chevron relative to the item label |
| chevronSize | string \| number | - | Size of the chevron icon container |
| defaultValue | string \| string[] \| null | - | Uncontrolled component default value |
| disableChevronRotation | boolean | - | If set, chevron rotation is disabled |
| keepMounted | boolean | - | If set to `false`, panels are unmounted when collapsed. By default, panels stay mounted when collapsed. |
| loop | boolean | - | If set, arrow keys loop through items (first to last and last to first) |
| multiple | boolean | - | If set, multiple items can be opened at the same time |
| onChange | (value: AccordionValue<Multiple>) => void | - | Called when value changes, payload type depends on `multiple` prop |
| order | 2 \| 3 \| 4 \| 5 \| 6 | - | Sets heading level (h2-h6) for `Accordion.Control` elements to meet WAI-ARIA requirements. Has no visual effect. |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem. |
| transitionDuration | number | - | Transition duration in ms |
| value | string \| string[] \| null | - | Controlled component value |

**Accordion.Item props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | required | Value that is used to manage the accordion state |

**Accordion.Control props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| chevron | React.ReactNode | - | Custom chevron icon |
| children | React.ReactNode | - | Control label |
| disabled | boolean | - | Sets `disabled` attribute, prevents interactions |
| icon | React.ReactNode | - | Icon displayed next to the label |


#### Styles API

Accordion component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Accordion selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Accordion-root | Root element |
| item | .mantine-Accordion-item | `Accordion.Item` root element |
| control | .mantine-Accordion-control | `Accordion.Control` root element |
| chevron | .mantine-Accordion-chevron | `Accordion.Control` chevron container element |
| label | .mantine-Accordion-label | `Accordion.Control` label |
| icon | .mantine-Accordion-icon | `Accordion.Control` icon |
| itemTitle | .mantine-Accordion-itemTitle | `Accordion.Control` title (h2-h6) tag |
| panel | .mantine-Accordion-panel | `Accordion.Panel` root element |
| content | .mantine-Accordion-content | Wrapper element of `Accordion.Panel` `children` |

**Accordion CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --accordion-chevron-size | Controls chevron container element `width` and `min-width` |
| root | --accordion-radius | Controls `border-radius` in various elements, depending on variant |
| root | --accordion-transition-duration | Controls all animations `transition-duration` |


--------------------------------------------------------------------------------

### ActionIcon
Package: @mantine/core
Import: import { ActionIcon } from '@mantine/core';
Description: Icon button

## Usage

```tsx
import { ActionIcon } from '@mantine/core';
import { SlidersHorizontalIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ActionIcon variant="filled" color="blue" size="md" radius="md" aria-label="Settings">
      <SlidersHorizontalIcon style={{ width: '70%', height: '70%' }} />
    </ActionIcon>
  );
}
```


```tsx
import { ActionIcon } from '@mantine/core';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ActionIcon
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      <HeartIcon />
    </ActionIcon>
  );
}
```


## Size

You can use any valid CSS value in the `size` prop, which is used to set the `width`, `min-width`, `min-height` and `height`
properties. Note that the `size` prop does not control the child [icon](https://mantine.dev/llms/guides-icons.md) size – you need to
set it manually on the icon component. When `size` is a number, the value is treated as `px` units and
converted to [rem](https://mantine.dev/llms/styles-rem.md) units.

```tsx
import { ActionIcon } from '@mantine/core';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ActionIcon size={42} variant="default" aria-label="ActionIcon with size as a number">
      <HeartIcon size={24} />
    </ActionIcon>
  );
}
```


If you want `ActionIcon` to have the same size as Mantine inputs, use the `size="input-sm"` prop:

```tsx
import { ActionIcon, Group, TextInput } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <TextInput placeholder="sm size input" size="sm" />
      <ActionIcon size="input-sm" variant="default" aria-label="ActionIcon the same size as inputs">
        SM
      </ActionIcon>
    </Group>
  );
}
```


## Disabled state

To make `ActionIcon` disabled, set the `disabled` prop. This will prevent any interactions with the button
and add disabled styles. If you want the button to just look disabled but still be interactive,
set the `data-disabled` prop instead. Note that disabled styles are the same for all variants.

```tsx
import { ActionIcon, Group } from '@mantine/core';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Group justify="center">
      <ActionIcon size="xl" disabled aria-label="Disabled and not interactive">
        <HeartIcon />
      </ActionIcon>

      <ActionIcon size="xl" data-disabled aria-label="Has disabled styles but still interactive">
        <HeartIcon />
      </ActionIcon>
    </Group>
  );
}
```


## Disabled state when ActionIcon is link

The `<a />` element does not support the `disabled` attribute. To make `ActionIcon` disabled when it is
rendered as a link, set the `data-disabled` attribute instead and prevent default behavior in the
`onClick` event handler.

```tsx
import { ActionIcon } from '@mantine/core';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ActionIcon
      component="a"
      href="https://mantine.dev"
      data-disabled
      size="xl"
      aria-label="Open in a new tab"
      onClick={(event) => event.preventDefault()}
    >
      <ArrowSquareOutIcon />
    </ActionIcon>
  );
}
```


## Customize disabled styles

To customize disabled styles, it is recommended to use both `&:disabled` and `&[data-disabled]`
selectors:

* `&:disabled` is used to style the button when the `disabled` prop is set and
  also when the button is disabled by the parent component (for example, when the `disabled` prop is set on a
  `<fieldset />` element which contains `ActionIcon`).
* `&[data-disabled]` is used to style the button when it is not actually disabled but should look like
  it is (for example, `data-disabled` should be used if you need to use [Tooltip](https://mantine.dev/llms/core-tooltip.md) with a disabled `ActionIcon`
  or when `ActionIcon` is used as a link)

```tsx
// Demo.module.css
.button {
  &:disabled,
  &[data-disabled] {
    border-color: light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
    background-color: transparent;
  }
}

// Demo.tsx
import { ActionIcon } from '@mantine/core';
import { HeartIcon } from '@phosphor-icons/react';
import classes from './Demo.module.css';

function Demo() {
  return (
    <ActionIcon size="xl" className={classes.button} disabled aria-label="Disabled with styles">
      <HeartIcon />
    </ActionIcon>
  );
}
```


## Disabled button with Tooltip

The `onMouseLeave` event [is not triggered](https://github.com/facebook/react/issues/18753) when `ActionIcon` is disabled, so if you need to use
[Tooltip](https://mantine.dev/llms/core-tooltip.md) with a disabled `ActionIcon`, you need to set the `data-disabled` prop on `ActionIcon`
instead of `disabled`. Note that it is also required to change the `onClick` event handler to
`(event) => event.preventDefault()` as `ActionIcon` is not actually disabled and will still trigger
the `onClick` event.

```tsx
import { ActionIcon, Tooltip } from '@mantine/core';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Tooltip label="Tooltip for disabled button">
      <ActionIcon
        aria-label="Hover to see tooltip"
        size="xl"
        data-disabled
        onClick={(event) => event.preventDefault()}
      >
        <HeartIcon />
      </ActionIcon>
    </Tooltip>
  );
}
```


## Loading state

When the `loading` prop is set, `ActionIcon` will be disabled and a [Loader](https://mantine.dev/llms/core-loader.md) with overlay will be rendered
in the center of the button. The [Loader](https://mantine.dev/llms/core-loader.md) color depends on the `ActionIcon` variant.

```tsx
import { ActionIcon, Group, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  const [loading, { toggle }] = useDisclosure();
  return (
    <>
      <Group>
        <ActionIcon loading={loading} aria-label="Like">
          <HeartIcon size={18} />
        </ActionIcon>
        <ActionIcon variant="light" loading={loading} aria-label="Like">
          <HeartIcon size={18} />
        </ActionIcon>
        <ActionIcon variant="outline" loading={loading} aria-label="Like">
          <HeartIcon size={18} />
        </ActionIcon>
      </Group>

      <Switch checked={loading} onChange={toggle} label="Loading state" mt="md" />
    </>
  );
}
```


## Loader props

You can customize the [Loader](https://mantine.dev/llms/core-loader.md) with the `loaderProps` prop, which accepts all props that the
[Loader](https://mantine.dev/llms/core-loader.md) component has:

```tsx
import { ActionIcon } from '@mantine/core';

function Demo() {
  return <ActionIcon size="xl" loading loaderProps={{ type: 'dots' }} aria-label="Loading..." />;
}
```


## Add custom variants

To add new `ActionIcon` variants, use the [data-variant](https://mantine.dev/llms/styles-variants-sizes.md) attribute.
Usually new variants are added to the [theme](https://mantine.dev/llms/theming-theme-object.md). This way they are
available in all `ActionIcon` components in your application.

```tsx
// Demo.tsx
import { Group, ActionIcon, MantineProvider, createTheme } from '@mantine/core';
import { HeartIcon } from '@phosphor-icons/react';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group justify="center">
        <ActionIcon size="xl" variant="danger" aria-label="Danger variant">
          <HeartIcon />
        </ActionIcon>
        <ActionIcon size="xl" variant="primary" aria-label="Primary variant">
          <HeartIcon />
        </ActionIcon>
      </Group>
    </MantineProvider>
  );
}

// Demo.module.css
.root {
  &[data-variant='danger'] {
    background-color: var(--mantine-color-red-9);
    color: var(--mantine-color-red-0);
  }

  &[data-variant='primary'] {
    background: linear-gradient(45deg, #4b6cb7 10%, #253b67 90%);
    color: var(--mantine-color-white);
  }
}
```


## Customize variants colors

You can customize colors for `ActionIcon` and other components variants by adding
[variantColorResolver](https://mantine.dev/llms/theming-colors.md#colors-variant-resolver) to your theme.

```tsx
import { ImageIcon, FingerprintIcon, WarningIcon } from '@phosphor-icons/react';
import {
  ActionIcon,
  Group,
  MantineProvider,
  defaultVariantColorsResolver,
  VariantColorsResolver,
  parseThemeColor,
  rgba,
  darken,
} from '@mantine/core';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Override some properties for variant
  if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
    return {
      ...defaultResolvedColors,
      color: 'var(--mantine-color-black)',
      hoverColor: 'var(--mantine-color-black)',
    };
  }

  // Completely override variant
  if (input.variant === 'light') {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.15),
      border: `1px solid ${parsedColor.value}`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  // Add new variants support
  if (input.variant === 'danger') {
    return {
      background: 'var(--mantine-color-red-9)',
      hover: 'var(--mantine-color-red-8)',
      color: 'var(--mantine-color-white)',
      border: 'none',
    };
  }

  return defaultResolvedColors;
};

function Demo() {
  return (
    <MantineProvider theme={{ variantColorResolver }}>
      <Group>
        <ActionIcon color="lime.4" variant="filled" size="lg" aria-label="Photo">
          <ImageIcon size={20} />
        </ActionIcon>

        <ActionIcon color="orange" variant="light" size="lg" aria-label="FingerprintIcon">
          <FingerprintIcon size={20} />
        </ActionIcon>

        <ActionIcon variant="danger" size="lg" aria-label="Error 404">
          <WarningIcon size={20} />
        </ActionIcon>
      </Group>
    </MantineProvider>
  );
}
```


```tsx
import { FingerprintIcon } from '@phosphor-icons/react';
import { ActionIcon, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <ActionIcon aria-label="default action icon" size="lg" color="lime.4">
        <FingerprintIcon size={20} />
      </ActionIcon>
      <ActionIcon autoContrast aria-label="autoContrast action icon" size="lg" color="lime.4">
        <FingerprintIcon size={20} />
      </ActionIcon>
    </Group>
  );
}
```


## Add custom sizes

`ActionIcon` sizes are defined by `--ai-size-{x}` CSS variables. The easiest way to add new sizes is to
define additional `--ai-size-{x}` variables on the `root` element:

```tsx
// Demo.tsx
import { ActionIcon, createTheme, Group, MantineThemeProvider } from '@mantine/core';
import { HeartIcon } from '@phosphor-icons/react';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Group justify="center">
        <ActionIcon size="xxs" aria-label="Custom xxs size">
          <HeartIcon size={10} />
        </ActionIcon>

        <ActionIcon size="xxl" aria-label="Custom xxl size">
          <HeartIcon size={32} />
        </ActionIcon>
      </Group>
    </MantineThemeProvider>
  );
}

// Demo.module.css
.root {
  --ai-size-xxs: 16px;
  --ai-size-xxl: 50px;
}
```


## ActionIcon.Group

```tsx
import { ActionIcon } from '@mantine/core';
import { ImageIcon, GearSixIcon, HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ActionIcon.Group orientation="horizontal">
      <ActionIcon variant="default" size="lg" aria-label="Gallery">
        <ImageIcon size={20} />
      </ActionIcon>

      <ActionIcon variant="default" size="lg" aria-label="Settings">
        <GearSixIcon size={20} />
      </ActionIcon>

      <ActionIcon variant="default" size="lg" aria-label="Likes">
        <HeartIcon size={20} />
      </ActionIcon>
    </ActionIcon.Group>
  );
}
```


Note that you must not wrap child `ActionIcon` components with any additional elements:

```tsx
import { ActionIcon } from '@mantine/core';

// Will not work correctly
function Demo() {
  return (
    <ActionIcon.Group>
      <div>
        <ActionIcon>This will not work</ActionIcon>
      </div>
      <ActionIcon>ActionIcons will have incorrect borders</ActionIcon>
    </ActionIcon.Group>
  );
}
```

## ActionIcon.GroupSection

Use the `ActionIcon.GroupSection` component to render sections that are not `ActionIcon` inside `ActionIcon.Group`:

```tsx
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@mantine/core';
import { useCounter } from '@mantine/hooks';

function Demo() {
  const [value, { increment, decrement }] = useCounter(135, { min: 0 });

  return (
    <ActionIcon.Group>
      <ActionIcon
        variant="default"
        size="lg"
        onClick={decrement}
        aria-label="Decrement value"
      >
        <CaretDownIcon color="var(--mantine-color-red-text)" />
      </ActionIcon>
      <ActionIcon.GroupSection variant="default" size="lg" bg="var(--mantine-color-body)" miw={60}>
        {value}
      </ActionIcon.GroupSection>
      <ActionIcon
        variant="default"
        size="lg"
        onClick={increment}
        aria-label="Increment value"
      >
        <CaretUpIcon color="var(--mantine-color-teal-text)" />
      </ActionIcon>
    </ActionIcon.Group>
  );
}
```


## Accessibility

To make `ActionIcon` accessible for screen readers, you need to either set `aria-label` or
use the [VisuallyHidden](https://mantine.dev/llms/core-visually-hidden.md) component:

```tsx
import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon, VisuallyHidden } from '@mantine/core';

function Demo() {
  return (
    <>
      <ActionIcon aria-label="Like post">
        <HeartIcon />
      </ActionIcon>

      <ActionIcon>
        <VisuallyHidden>Like post</VisuallyHidden>
        <HeartIcon />
      </ActionIcon>
    </>
  );
}
```


#### Props

**ActionIcon props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for `filled` variant |
| children | React.ReactNode | - | Icon element |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color. |
| disabled | boolean | - | Sets `disabled` attribute, prevents interactions |
| gradient | MantineGradient | - | Gradient values used with `variant="gradient"`. |
| loaderProps | LoaderProps | - | Props passed down to the `Loader` component. Ignored when `loading` prop is not set. |
| loading | boolean | - | If set, `Loader` component is displayed instead of the `children` |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem. |
| size | number \| MantineSize \| (string & {}) \| "input-xs" \| "input-sm" \| "input-md" \| "input-lg" \| "input-xl" | - | Controls width and height of the button. Numbers are converted to rem. |

**ActionIcon.Group props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| borderWidth | string \| number | - | `border-width` of the child components. |
| children | React.ReactNode | - | `ActionIcon` and `ActionIcon.GroupSection` components only |
| orientation | "horizontal" \| "vertical" | - | Group orientation |


#### Styles API

ActionIcon component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ActionIcon selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-ActionIcon-root | Root element |
| loader | .mantine-ActionIcon-loader | `Loader` component, rendered inside root element when `loading` prop is set |
| icon | .mantine-ActionIcon-icon | Inner icon wrapper |

**ActionIcon CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --ai-bg | Controls `background` |
| root | --ai-hover | Controls `background` when hovered |
| root | --ai-bd | Controls `border` |
| root | --ai-color | Controls icon `color` |
| root | --ai-hover-color | Controls icon `color` when hovered |
| root | --ai-radius | Controls `border-radius` |
| root | --ai-size | Controls `width`, `height`, `min-width` and `min-height` styles |

**ActionIcon data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-disabled | `disabled` prop is set | - |

**ActionIcon.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| group | .mantine-ActionIconGroup-group | Root element |

**ActionIcon.Group CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|

**ActionIcon.Group data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| group | data-orientation | - | Value of `orientation` prop |


--------------------------------------------------------------------------------

### Affix
Package: @mantine/core
Import: import { Affix } from '@mantine/core';
Description: Renders children inside portal at fixed position

## Usage

`Affix` renders a div element with a fixed position inside the [Portal](https://mantine.dev/llms/core-portal.md) component.
Use it to display elements fixed at any position on the screen, for example, scroll to top button:

```tsx
import { ArrowUpIcon } from '@phosphor-icons/react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Text, Transition } from '@mantine/core';

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Text ta="center">Affix is located at the bottom of the screen, scroll to see it</Text>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={<ArrowUpIcon size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}
```



#### Props

**Affix props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| portalProps | BasePortalProps | - | Props passed down to the `Portal` component. Ignored when `withinPortal` is `false`. |
| position | AffixPosition | - | Affix position on screen |
| withinPortal | boolean | - | Determines whether the component is rendered within `Portal` |
| zIndex | React.CSSProperties["zIndex"] | - | Root element `z-index` property |


#### Styles API

Affix component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Affix selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Affix-root | Root element |

**Affix CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --affix-z-index | Controls `z-index` property |
| root | --affix-top | Controls `top` property |
| root | --affix-bottom | Controls `bottom` property |
| root | --affix-left | Controls `left` property |
| root | --affix-right | Controls `right` property |


--------------------------------------------------------------------------------

### Alert
Package: @mantine/core
Import: import { Alert } from '@mantine/core';
Description: Attract user attention with important static message

## Accessibility

* Root element role set to `alert`
* `aria-describedby` set to body element id, `aria-labelledby` set to title element id if `title` is provided
* Set `closeButtonLabel` prop to make close button accessible

```tsx
import { Alert } from '@mantine/core';

function Invalid() {
  // -> not ok
  return <Alert withCloseButton />;
}

function Valid() {
  // -> ok
  return <Alert withCloseButton closeButtonLabel="Dismiss" />;
}

function AlsoValid() {
  // -> ok, without close button, closeButtonLabel is not needed
  return <Alert />;
}
```


#### Props

**Alert props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for `filled` variant |
| closeButtonLabel | string | - | Close button `aria-label` |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color |
| icon | React.ReactNode | - | Icon displayed next to the title |
| onClose | () => void | - | Called when the close button is clicked |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius |
| title | React.ReactNode | - | Alert title |
| withCloseButton | boolean | - | Determines whether close button should be displayed |


#### Styles API

Alert component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Alert selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Alert-root | Root element |
| wrapper | .mantine-Alert-wrapper | Wrapper around `body` and `icon` |
| body | .mantine-Alert-body | Body element, contains `title` and `message` |
| title | .mantine-Alert-title | Title element, contains `label` and `icon` |
| label | .mantine-Alert-label | Title label |
| message | .mantine-Alert-message | Alert message |
| icon | .mantine-Alert-icon | Icon element |
| closeButton | .mantine-Alert-closeButton | Close button |

**Alert CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --alert-bd | Controls `border` |
| root | --alert-bg | Controls `background` |
| root | --alert-color | Controls `color` |
| root | --alert-radius | Controls `border-radius` |

**Alert data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| title | data-with-close-button | `withCloseButton` prop is set | - |


--------------------------------------------------------------------------------

### AlphaSlider
Package: @mantine/core
Import: import { AlphaSlider } from '@mantine/core';
Description: Slider component for selecting alpha channel in color pickers (0 – 1)

## Usage

Use `AlphaSlider` component to allow users to select alpha (opacity) value of a color.
It accepts values from `0` to `1`. `AlphaSlider` is a part of [ColorPicker](https://mantine.dev/llms/core-color-picker.md) component,
but can also be used separately.

```tsx
import { useState } from 'react';
import { AlphaSlider, Text } from '@mantine/core';

function Demo() {
  const [value, onChange] = useState(0.55);

  return (
    <>
      <Text>Alpha value: {value}</Text>
      <AlphaSlider color="#1c7ed6" value={value} onChange={onChange} />
    </>
  );
}
```



#### Props

**AlphaSlider props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | string | required | - |
| focusable | boolean | - | If set, slider thumb can be focused |
| onChange | (value: number) => void | - | Called when value changes |
| onChangeEnd | (value: number) => void | - | Called when user stops dragging the slider or uses keyboard to change value |
| onScrubEnd | () => void | - | Called when user stops dragging the slider |
| onScrubStart | () => void | - | Called when user starts dragging the slider |
| size | MantineSize | - | Slider size |
| value | number | required | Controlled component value |


--------------------------------------------------------------------------------

### Anchor
Package: @mantine/core
Import: import { Anchor } from '@mantine/core';
Description: Display link with theme styles

## Usage

```tsx
import { Anchor } from '@mantine/core';

function Demo() {
  return (
    <Anchor href="https://mantine.dev/" target="_blank">
      Anchor component
    </Anchor>
  );
}
```


## Underline

Use the `underline` prop to configure the `text-decoration` property. It accepts the following values:

* `always` - link is always underlined
* `hover` - link is underlined on hover
* `never` - link is never underlined
* `not-hover` - link is underlined when not hovered

```tsx
import { Anchor, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Anchor href="https://mantine.dev/" target="_blank" underline="always">
        Underline always
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="hover">
        Underline hover
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="never">
        Underline never
      </Anchor>
      <Anchor href="https://mantine.dev/" target="_blank" underline="not-hover">
        Underline not-hover
      </Anchor>
    </Group>
  );
}
```


You can also configure the `underline` prop for all `Anchor` components with [default props](https://mantine.dev/llms/theming-default-props.md):

```tsx
import { Anchor, createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  components: {
    Anchor: Anchor.extend({
      defaultProps: {
        underline: 'always',
      },
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Text props

The `Anchor` component supports all [Text](https://mantine.dev/llms/core-text.md) component props.
For example, you can use the gradient variant:

```tsx
import { Anchor } from '@mantine/core';

function Demo() {
  return (
    <Anchor
      variant="gradient"
      gradient={{ from: 'pink', to: 'yellow' }}
      fw={500}
      fz="lg"
      href="#text-props"
    >
      A link with pink to yellow gradient
    </Anchor>
  );
}
```



#### Props

**Anchor props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| gradient | MantineGradient | - | Gradient configuration, ignored when `variant` is not `gradient` |
| inherit | boolean | - | Determines whether font properties should be inherited from the parent |
| inline | boolean | - | Sets `line-height` to 1 for centering |
| lineClamp | number | - | Number of lines after which Text will be truncated |
| size | MantineSize \| (string & {}) | - | Controls `font-size` and `line-height` |
| truncate | TextTruncate | - | Side on which Text must be truncated, if `true`, text is truncated from the start |
| underline | "always" \| "hover" \| "not-hover" \| "never" | - | Defines when `text-decoration: underline` styles are applied. |


--------------------------------------------------------------------------------

### AngleSlider
Package: @mantine/core
Import: import { AngleSlider } from '@mantine/core';
Description: Pick angle value between 0 and 360

## Usage

Use the `AngleSlider` component to pick an angle value between 0 and 360:

```tsx
import { AngleSlider } from '@mantine/core';

function Demo() {
  return <AngleSlider aria-label="Angle slider" size={60} thumbSize={8} withLabel={true} />;
}
```


## Controlled

The `AngleSlider` value is a number between 0 and 360.

```tsx
import { useState } from 'react';
import { AngleSlider } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(180);
  return <AngleSlider value={value} onChange={setValue} />;
}
```

## AngleSlider with uncontrolled forms

`AngleSlider` can be used with uncontrolled forms.
Set the `name` attribute to include slider value in `FormData` object on form submission.
To control initial value in uncontrolled forms, use `defaultValue` prop.

Props for usage with uncontrolled forms:

* `name` – name attribute passed to the hidden input
* `hiddenInputProps` – additional props passed to the hidden input

Example of uncontrolled `AngleSlider` with `FormData`:

```tsx
import { AngleSlider } from '@mantine/core';

export function WithFormData() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Checkbox group value:', formData.get('angle'));
      }}
    >
      <AngleSlider name="angle" defaultValue={120} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## formatLabel

Use the `formatLabel` prop to change the angle label format.
It accepts a function that takes the angle value and returns a React node:

```tsx
import { AngleSlider } from '@mantine/core';

function Demo() {
  return <AngleSlider aria-label="Angle slider" formatLabel={(value) => `${value}°`} />;
}
```


## Marks

Set the `marks` prop to display marks on the slider.
A mark is an object with a value (required, number between 0 and 360) and label (optional, React node).
To restrict selection to marks only, set the `restrictToMarks` prop:

```tsx
import { AngleSlider, Group } from '@mantine/core';

function Demo() {
  return (
    <Group p="lg" gap={50}>
      <AngleSlider
        aria-label="Angle slider"
        formatLabel={(value) => `${value}°`}
        size={100}
        restrictToMarks
        marks={[
          { value: 0 },
          { value: 45 },
          { value: 90 },
          { value: 135 },
          { value: 180 },
          { value: 225 },
          { value: 270 },
          { value: 315 },
        ]}
      />

      <AngleSlider
        aria-label="Angle slider"
        formatLabel={(value) => `${value}°`}
        size={100}
        marks={[
          { value: 0, label: '0°' },
          { value: 45, label: '45°' },
          { value: 90, label: '90°' },
          { value: 135, label: '135°' },
          { value: 180, label: '180°' },
          { value: 225, label: '225°' },
          { value: 270, label: '270°' },
          { value: 315, label: '315°' },
        ]}
      />
    </Group>
  );
}
```


## onChangeEnd

The `onChangeEnd` callback fires when the user stops dragging the slider or changes its value with the keyboard.
Use it as a debounced callback to prevent frequent updates.

```tsx
import { useState } from 'react';
import { AngleSlider, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(0);
  const [endValue, setEndValue] = useState(0);

  return (
    <>
      <AngleSlider value={value} onChange={setValue} onChangeEnd={setEndValue} />
      <Text mt="md">Current value: {value}</Text>
      <Text>End value: {endValue}</Text>
    </>
  );
}
```


