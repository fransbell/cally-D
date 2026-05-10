## Disabled

Set `disabled` to disable the input. When `disabled` is set,
users cannot interact with the input and `Autocomplete` will not show suggestions.

```tsx
import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      disabled
    />
  );
}
```



#### Props

**Autocomplete props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoSelectOnBlur | boolean | - | If set, the highlighted option is selected when the input loses focus |
| clearButtonProps | InputClearButtonProps | - | Props passed down to the clear button |
| clearSectionMode | ClearSectionMode | - | Determines how the clear button and rightSection are rendered |
| clearable | boolean | - | If set, the clear button is displayed when the component has a value |
| comboboxProps | ComboboxProps | - | Props passed down to `Combobox` component |
| data | ComboboxGenericData | - | Data used to display options. Values must be unique. |
| defaultDropdownOpened | boolean | - | Uncontrolled dropdown initial opened state |
| defaultValue | string | - | Default value for uncontrolled component |
| description | React.ReactNode | - | Contents of `Input.Description` component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps | - | Props passed down to the `Input.Description` component |
| disabled | boolean | - | Sets `disabled` attribute on the `input` element |
| dropdownOpened | boolean | - | Controlled dropdown opened state |
| error | React.ReactNode | - | Contents of `Input.Error` component. If not set, error is not displayed. |
| errorProps | InputErrorProps | - | Props passed down to the `Input.Error` component |
| filter | OptionsFilter<string> | - | Function based on which items are filtered and sorted |
| inputContainer | (children: ReactNode) => ReactNode | - | Render function to wrap the input element. Useful for adding tooltips, popovers, or other wrappers around the input. |
| inputSize | string | - | HTML `size` attribute for the input element (number of visible characters) |
| inputWrapperOrder | ("input" \| "label" \| "description" \| "error")[] | - | Controls order and visibility of wrapper elements. Only elements included in this array will be rendered. |
| label | React.ReactNode | - | Contents of `Input.Label` component. If not set, label is not displayed. |
| labelProps | InputLabelProps | - | Props passed down to the `Input.Label` component |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `leftSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| leftSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `leftSection` element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set `width` of the section and input `padding-left`, by default equals to the input height |
| limit | number | - | Maximum number of options displayed at a time, `Infinity` by default |
| loading | boolean | - | Displays loading indicator in the left or right section |
| loadingPosition | "left" \| "right" | - | Position of the loading indicator |
| maxDropdownHeight | string \| number | - | `max-height` of the dropdown, only applicable when `withScrollArea` prop is `true`, `250` by default |
| onChange | (value: string) => void | - | Called when value changes |
| onClear | () => void | - | Called when the clear button is clicked |
| onDropdownClose | () => void | - | Called when dropdown closes |
| onDropdownOpen | () => void | - | Called when dropdown opens |
| onOptionSubmit | (value: string) => void | - | Called when option is submitted from dropdown with mouse click or `Enter` key |
| openOnFocus | boolean | - | If set, the dropdown opens when the input receives focus |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| renderOption | RenderAutocompleteOption | - | Function to render custom option content |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| scrollAreaProps | ScrollAreaProps | - | Props passed to the underlying `ScrollArea` component in the dropdown |
| selectFirstOptionOnChange | boolean | - | If set, the first option is selected when value changes, `false` by default |
| selectFirstOptionOnDropdownOpen | boolean | - | If set, the first option is selected when dropdown opens, `false` by default |
| size | MantineSize | - | Controls input `height`, horizontal `padding`, and `font-size` |
| value | string | - | Controlled component value |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| withScrollArea | boolean | - | Determines whether the options should be wrapped with `ScrollArea.AutoSize`, `true` by default |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

Autocomplete component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Autocomplete selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Autocomplete-wrapper | Root element of the Input |
| input | .mantine-Autocomplete-input | Input element |
| section | .mantine-Autocomplete-section | Left and right sections |
| root | .mantine-Autocomplete-root | Root element |
| label | .mantine-Autocomplete-label | Label element |
| required | .mantine-Autocomplete-required | Required asterisk element, rendered inside label |
| description | .mantine-Autocomplete-description | Description element |
| error | .mantine-Autocomplete-error | Error element |

**Autocomplete data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| option | data-combobox-selected | Option is selected | - |
| option | data-combobox-active | Options was activated by keyboard | - |
| option | data-combobox-disabled | Option is disabled | - |


--------------------------------------------------------------------------------

### Avatar
Package: @mantine/core
Import: import { Avatar } from '@mantine/core';
Description: Display user profile image, initials or fallback icon

## Usage

```tsx
import { Avatar } from '@mantine/core';
import { StarIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      {/* With image */}
      <Avatar src="avatar.png" alt="it's me" />

      {/* Default placeholder */}
      <Avatar radius="xl" />

      {/* Letters with xl radius */}
      <Avatar color="cyan" radius="xl">MK</Avatar>

      {/* Custom placeholder icon */}
      <Avatar color="blue" radius="sm">
        <StarIcon size={20} />
      </Avatar>
    </>
  );
}
```


## Initials

To display initials instead of the default placeholder, set the `name` prop
to the name of the person, for example, `name="John Doe"`. If the name
is set, you can use `color="initials"` to generate a color based on the name:

```tsx
import { Avatar, Group } from '@mantine/core';

${namesCode}

function Demo() {
  const avatars = names.map((name) => <Avatar key={name} name={name} color="initials" />);
  return <Group>{avatars}</Group>;
}
```


## Allowed initials colors

By default, all colors from the default theme are allowed for initials. You can restrict them
by providing the `allowedInitialsColors` prop with an array of colors. Note that the default colors
array does not include custom colors defined in the theme – you need to provide them manually
if needed.

```tsx
import { Avatar, Group } from '@mantine/core';

${namesCode}

function Demo() {
  const avatars = names.map((name) => (
    <Avatar key={name} name={name} color="initials" allowedInitialsColors={['blue', 'red']} />
  ));
  return <Group>{avatars}</Group>;
}
```


## Placeholder

If the image cannot be loaded or is not provided, `Avatar` will display a placeholder instead. By default,
the placeholder is an icon, but it can be changed to any React node:

```tsx
import { Avatar } from '@mantine/core';
import { StarIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      {/* Default placeholder */}
      <Avatar src={null} alt="no image here" />

      {/* Default placeholder with custom color */}
      <Avatar src={null} alt="no image here" color="indigo" />

      {/* Placeholder with initials */}
      <Avatar src={null} alt="Vitaly Rtishchev" color="red">VR</Avatar>

      {/* Placeholder with custom icon */}
      <Avatar color="blue" radius="xl">
        <StarIcon size={20} />
      </Avatar>
    </>
  );
}
```


## Variants

```tsx
import { Avatar } from '@mantine/core';

function Demo() {
  return <Avatar variant="filled" radius="md" size="md" color="gray" src="" />;
}
```


## Avatar.Group

The `Avatar.Group` component combines multiple avatars into a stack:

```tsx
import { Avatar } from '@mantine/core';

function Demo() {
  return (
    <Avatar.Group>
      <Avatar src="image.png" />
      <Avatar src="image.png" />
      <Avatar src="image.png" />
      <Avatar>+5</Avatar>
    </Avatar.Group>
  );
}
```


Note that you must not wrap child `Avatar` components with any additional elements,
but you can wrap `Avatar` with components that do not render any HTML elements
in the current tree, for example [Tooltip](https://mantine.dev/llms/core-tooltip.md).

```tsx
import { Avatar } from '@mantine/core';

// Will not work correctly
function Demo() {
  return (
    <Avatar.Group spacing="sm">
      <div>
        <Avatar src="image.png" radius="xl" />
      </div>
      <Avatar src="image.png" radius="xl" />
      <Avatar src="image.png" radius="xl" />
      <Avatar radius="xl">+5</Avatar>
    </Avatar.Group>
  );
}
```

Example of usage with [Tooltip](https://mantine.dev/llms/core-tooltip.md):

```tsx
import { Avatar, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        <Tooltip label="Salazar Troop" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip label="Bandit Crimes" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip label="Jane Rata" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip
          withArrow
          label={
            <>
              <div>John Outcast</div>
              <div>Levi Capitan</div>
            </>
          }
        >
          <Avatar radius="xl">+2</Avatar>
        </Tooltip>
      </Avatar.Group>
    </Tooltip.Group>
  );
}
```


Example of using `Avatar` as a link:

```tsx
import { Avatar } from '@mantine/core';

function Demo() {
  return (
    <Avatar
      component="a"
      href="https://github.com/rtivital"
      target="_blank"
      src="avatar.png"
      alt="it's me"
    />
  );
}
```


## Accessibility

Avatar renders an `<img />` HTML element. Set the `alt` prop to describe the image –
it is also used as the `title` attribute for the avatar placeholder when the image cannot be loaded.

```tsx
import { Avatar } from '@mantine/core';

function Demo() {
  // ❌ No alt for image
  return <Avatar src="./image.png" />;

  // ✅ alt is set
  return <Avatar src="./image.png" alt="Rob Johnson" />;

  // ✅ title is not required, but still recommended
  return <Avatar>RJ</Avatar>;

  // ✅ title is set on placeholder
  return <Avatar alt="Rob Johnson">RJ</Avatar>;
}
```


#### Props

**Avatar props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowedInitialsColors | DefaultMantineColor[] | - | A list of colors that is used for autogenerated initials. By default, all default Mantine colors can be used except gray and dark. |
| alt | string | - | Image `alt` attribute, also used as `title` attribute for placeholder |
| autoContrast | boolean | - | If set, adjusts text color based on background color for `filled` variant |
| children | React.ReactNode | - | Avatar placeholder, displayed when `src={null}` or when the image cannot be loaded |
| color | DefaultMantineColor \| "initials" | - | Key of `theme.colors` or any valid CSS color |
| gradient | MantineGradient | - | Gradient configuration for `variant="gradient"` |
| imageProps | DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> | - | Attributes passed down to `img` element |
| name | string | - | Name of the user. When `src` is not set, used to display initials and to generate color when `color="initials"` is set. |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius |
| size | MantineSize \| number | - | Width and height of the avatar, numbers are converted to rem |
| src | string \| null | - | Image url, if the image cannot be loaded or `src={null}`, then placeholder is displayed instead |

**Avatar.Group props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|


#### Styles API

Avatar component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Avatar selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Avatar-root | Root element |
| image | .mantine-Avatar-image | `img` element |
| placeholder | .mantine-Avatar-placeholder | Avatar placeholder, displayed when the image cannot be loaded |

**Avatar CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --avatar-bd | Controls placeholder `border` |
| root | --avatar-bg | Controls placeholder `background` |
| root | --avatar-color | Controls placeholder text `color` |
| root | --avatar-size | Controls `width`, `min-width` and `height` |
| root | --avatar-radius | Controls `border-radius` |

**Avatar.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| group | .mantine-AvatarGroup-group | Root element |

**Avatar.Group CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| group | --ag-spacing | Controls negative spacing between avatars |


--------------------------------------------------------------------------------

### BackgroundImage
Package: @mantine/core
Import: import { BackgroundImage } from '@mantine/core';
Description: Displays image as background

## Usage

```tsx
import { BackgroundImage, Center, Text, Box } from '@mantine/core';


function Demo() {
  return (
    <Box maw={300} mx="auto">
      <BackgroundImage
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
         radius="md"
      >
        <Center p="md">
          <Text c="white">
            BackgroundImage component can be used to add any content on image. It is useful for hero
            headers and other similar sections
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
  );
}
```



#### Props

**BackgroundImage props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem |
| src | string | required | Image url |


#### Styles API

BackgroundImage component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**BackgroundImage selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-BackgroundImage-root | Root element |

**BackgroundImage CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --bi-radius | Controls `border-radius` |


--------------------------------------------------------------------------------

### Badge
Package: @mantine/core
Import: import { Badge } from '@mantine/core';
Description: Display badge, pill or tag

## Usage

```tsx
import { Badge } from '@mantine/core';

function Demo() {
  return <Badge variant="filled" color="blue" size="md" radius="xl">Badge</Badge>;
}
```


```tsx
import { Badge } from '@mantine/core';

function Demo() {
  return (
    <Badge
      size="xl"
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      Gradient badge
    </Badge>
  );
}
```


## Rounded

Set the `circle` prop to reduce horizontal padding and make the badge width equal to its height:

```tsx
import { Badge, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Badge size="xs" circle>
        1
      </Badge>
      <Badge size="sm" circle>
        7
      </Badge>
      <Badge size="md" circle>
        9
      </Badge>
      <Badge size="lg" circle>
        3
      </Badge>
      <Badge size="xl" circle>
        8
      </Badge>
    </Group>
  );
}
```


## Left and right sections

```tsx
import { Badge, Group } from '@mantine/core';
import { AtIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <AtIcon size={12} />;
  return (
    <Group>
      <Badge leftSection={icon}>With left section</Badge>
      <Badge rightSection={icon}>With right section</Badge>
    </Group>
  );
}
```


## Full width

Set `fullWidth` to make the badge span the full width of its parent element:

```tsx
import { Badge } from '@mantine/core';

function Demo() {
  return <Badge fullWidth>Full width badge</Badge>;
}
```



#### Props

**Badge props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for `filled` variant |
| children | React.ReactNode | - | Main badge content |
| circle | boolean | - | If set, badge `min-width` becomes equal to its `height` and horizontal padding is removed |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color |
| fullWidth | boolean | - | Determines whether Badge should take 100% of its parent width |
| gradient | MantineGradient | - | Gradient configuration used when `variant=\"gradient\"` |
| leftSection | React.ReactNode | - | Content displayed on the left side of the badge label |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| rightSection | React.ReactNode | - | Content displayed on the right side of the badge label |
| size | MantineSize | - | Controls `font-size`, `height` and horizontal `padding` |


#### Styles API

Badge component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Badge selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Badge-root | Root element |
| section | .mantine-Badge-section | Left and right sections |
| label | .mantine-Badge-label | Badge children |

**Badge CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --badge-bd | Controls `border` |
| root | --badge-bg | Controls `background` |
| root | --badge-color | Controls text `color` |
| root | --badge-dot-color | Controls dot `color`, only applicable when `variant="dot"` |
| root | --badge-fz | Controls `font-size` |
| root | --badge-height | Controls `height` |
| root | --badge-padding-x | Controls horizontal `padding` |
| root | --badge-radius | Controls `border-radius` |

**Badge data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-block | `fullWidth` prop is set | - |
| section | data-position | - | Section position: left or right |


--------------------------------------------------------------------------------

### Blockquote
Package: @mantine/core
Import: import { Blockquote } from '@mantine/core';
Description: Blockquote with optional cite

## Usage

```tsx
import { Blockquote } from '@mantine/core';
import { InfoIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <InfoIcon />;
  return (
    <Blockquote color="blue" radius="md" iconSize={38} cite="– Forrest Gump" icon={icon} mt="xl">
      Life is like an npm install – you never know what you are going to get.
    </Blockquote>
  );
}
```



#### Props

**Blockquote props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| cite | React.ReactNode | - | Reference to a cited quote |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color |
| icon | React.ReactNode | - | Blockquote icon, displayed at the top left side |
| iconSize | string \| number | - | Controls icon `width` and `height`, numbers are converted to rem |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |


#### Styles API

Blockquote component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Blockquote selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Blockquote-root | Root element |
| icon | .mantine-Blockquote-icon | Icon element |
| cite | .mantine-Blockquote-cite | Cite element |

**Blockquote CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --bq-bd | Controls `border` |
| root | --bq-bg-dark | Controls `background-color` in dark color scheme |
| root | --bq-bg-light | Controls `background-color` in light color scheme |
| root | --bq-icon-size | Controls `width` and `height` of the icon |
| root | --bq-radius | Controls `border-radius` |


--------------------------------------------------------------------------------

### Box
Package: @mantine/core
Import: import { Box } from '@mantine/core';
Description: Base component for all Mantine components

## Usage

`Box` component is used as a base for all other components. `Box` supports the following features:

* [component prop](https://mantine.dev/llms/guides-polymorphic.md)
* [style props](https://mantine.dev/llms/styles-style-props.md)
* [style prop](https://mantine.dev/llms/styles-style.md)

You can use `Box` as a base for your own components or as a replacement for HTML elements:

```tsx
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box bg="red.5" my="xl" component="a" href="/">
      My component
    </Box>
  );
}
```


--------------------------------------------------------------------------------

### Breadcrumbs
Package: @mantine/core
Import: import { Breadcrumbs } from '@mantine/core';
Description: Separates list of react nodes with given separator

## Usage

`Breadcrumbs` component accepts any number of React nodes as children
and adds a given separator (defaults to `/`) between them:

```tsx
import { Breadcrumbs, Anchor } from '@mantine/core';

const items = [
  { title: 'Mantine', href: '#' },
  { title: 'Mantine hooks', href: '#' },
  { title: 'use-id', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

function Demo() {
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
        {items}
      </Breadcrumbs>
    </>
  );
}
```



#### Props

**Breadcrumbs props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | React nodes that should be separated with `separator` |
| separator | React.ReactNode | - | Separator between children |
| separatorMargin | MantineSpacing | - | Controls spacing between separator and breadcrumb |


#### Styles API

Breadcrumbs component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Breadcrumbs selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Breadcrumbs-root | Root element |
| separator | .mantine-Breadcrumbs-separator | Separator between children |
| breadcrumb | .mantine-Breadcrumbs-breadcrumb | Breadcrumb item |

**Breadcrumbs CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --bc-separator-margin | Control left and right `margin` of separator |


--------------------------------------------------------------------------------

### Burger
Package: @mantine/core
Import: import { Burger } from '@mantine/core';
Description: Open/close navigation button

## Usage

The `Burger` component renders an open/close menu button.
Set the `opened` and `onClick` props to control the component state.
If the `opened` prop is set, a cross will be rendered, otherwise a burger icon.

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';

function Demo() {
  const [opened, { toggle }] = useDisclosure();
  return <Burger size="md" opened={opened} onClick={toggle} aria-label="Toggle navigation" />;
}
```


## Change line size

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';

function Demo() {
  const [opened, { toggle }] = useDisclosure();
  return <Burger lineSize={2} size="xl" opened={opened} onClick={toggle} aria-label="Toggle navigation" />;
}
```


## Accessibility

To make the `Burger` accessible for screen readers, you need to either set `aria-label` or
use the [VisuallyHidden](https://mantine.dev/llms/core-visually-hidden.md) component:

```tsx
import { Burger, VisuallyHidden } from '@mantine/core';

function Demo() {
  return (
    <>
      <Burger aria-label="Toggle navigation" />

      <Burger>
        <VisuallyHidden>Toggle navigation</VisuallyHidden>
      </Burger>
    </>
  );
}
```


#### Props

**Burger props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of `theme.colors` of any valid CSS value, by default `theme.white` in dark color scheme and `theme.black` in light |
| lineSize | string \| number | - | Controls height of lines, by default calculated based on `size` prop |
| opened | boolean | - | State of the burger, when `true` burger is transformed into X |
| size | MantineSize \| number | - | Controls burger `width` and `height`, numbers are converted to rem |
| transitionDuration | number | - | `transition-duration` property value in ms |
| transitionTimingFunction | string | - | `transition-timing-function` property value |


#### Styles API

Burger component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Burger selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Burger-root | Root element (button) |
| burger | .mantine-Burger-burger | Inner element that contains burger lines |

**Burger CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --burger-line-size | Controls height of lines |
| root | --burger-color | Controls background-color of lines |
| root | --burger-size | Controls width and height of the button |
| root | --burger-transition-duration | Controls transition-duration of lines |
| root | --burger-transition-timing-function | Controls transition-timing-function of lines |

**Burger data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| burger | data-opened | opened prop is set | - |


--------------------------------------------------------------------------------

### Button
Package: @mantine/core
Import: import { Button } from '@mantine/core';
Description: Button component to render button or link

## Usage

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return <Button variant="filled" color="blue" size="sm" radius="md">Button</Button>;
}
```


## Full width

If the `fullWidth` prop is set, the `Button` will take 100% of the parent width:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return <Button fullWidth>Full width button</Button>;
}
```


## Left and right sections

`leftSection` and `rightSection` allow adding icons or any other element to the left and right sides of the button.
When a section is added, padding on the corresponding side is reduced.

Note that `leftSection` and `rightSection` are flipped in [RTL](https://mantine.dev/llms/styles-rtl.md) mode
(`leftSection` is displayed on the right and `rightSection` is displayed on the left).

```tsx
import { Group, Button } from '@mantine/core';
import { ImageIcon, DownloadSimpleIcon, ArrowRightIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Group justify="center">
      <Button leftSection={<ImageIcon size={14} />} variant="default">
        Gallery
      </Button>

      <Button rightSection={<DownloadSimpleIcon size={14} />}>Download</Button>

      <Button
        variant="light"
        leftSection={<ImageIcon size={14} />}
        rightSection={<ArrowRightIcon size={14} />}
      >
        Visit gallery
      </Button>
    </Group>
  );
}
```


## Sections position

The `justify` prop sets the `justify-content` of the `inner` element. You can use it to change the alignment of
left and right sections. For example, to spread them across the button, set `justify="space-between"`.

If you need to align just one section to the side of the button, set `justify` to `space-between`
and add an empty `<span />` to the opposite section.

```tsx
import { Button } from '@mantine/core';
import { ImageIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <ImageIcon size={14} />;
  return (
    <>
      <Button justify="center" fullWidth leftSection={icon} rightSection={icon} variant="default">
        Button label
      </Button>

      <Button justify="center" fullWidth leftSection={icon} variant="default" mt="md">
        Button label
      </Button>

      <Button justify="center" fullWidth rightSection={icon} variant="default" mt="md">
        Button label
      </Button>

      <Button
        justify="center"
        fullWidth
        rightSection={icon}
        leftSection={<span />}
        variant="default"
        mt="md"
      >
        Button label
      </Button>
    </>
  );
}
```


## Compact size

`Button` supports `xs` – `xl` and `compact-xs` – `compact-xl` sizes. `compact` sizes have
the same font size as `xs` – `xl` but with reduced padding and height.

```tsx
import { Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Button size="md">Regular md</Button>
      <Button size="compact-md">Compact md</Button>
    </Group>
  );
}
```


```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      Gradient button
    </Button>
  );
}
```


## Disabled state

To make a `Button` disabled, set the `disabled` prop. This will prevent any interactions with the button
and add disabled styles. If you want the button to just look disabled but still be interactive,
set the `data-disabled` prop instead. Note that disabled styles are the same for all variants.

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return <Button disabled>Disabled button</Button>;
}
```


## Disabled state when Button is link

The `<a />` element does not support the `disabled` attribute. To make a `Button` disabled when it is
rendered as a link, set the `data-disabled` attribute instead and prevent default behavior in the
`onClick` event handler.

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button
      component="a"
      href="https://mantine.dev"
      data-disabled
      onClick={(event) => event.preventDefault()}
    >
      Disabled link
    </Button>
  );
}
```


## Customize disabled styles

To customize disabled styles, it is recommended to use both `&:disabled` and `&[data-disabled]`
selectors:

* `&:disabled` is used to style the button when the `disabled` prop is set and
  also when the button is disabled by the parent component (for example, when the `disabled` prop is set on a
  `<fieldset />` element which contains the `Button`).
* `&[data-disabled]` is used to style the button when it is not actually disabled but should look like
  it is (for example, `data-disabled` should be used if you need to use [Tooltip](https://mantine.dev/llms/core-tooltip.md) with a disabled `Button`
  or when the `Button` is used as a link)

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
import { Button } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Button className={classes.button} disabled>
      Disabled with styles
    </Button>
  );
}
```


## Disabled button with Tooltip

The `onMouseLeave` event [is not triggered](https://github.com/facebook/react/issues/18753) when a `Button` is disabled, so if you need to use a
[Tooltip](https://mantine.dev/llms/core-tooltip.md) with a disabled `Button`, you need to set the `data-disabled` prop on the `Button`
instead of `disabled`. Note that it is also required to change the `onClick` event handler to
`(event) => event.preventDefault()` as the `Button` is not actually disabled and will still trigger the
`onClick` event.

```tsx
import { Button, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Tooltip for disabled button">
      <Button data-disabled onClick={(event) => event.preventDefault()}>
        Disabled button with tooltip
      </Button>
    </Tooltip>
  );
}
```


## Loading state

When the `loading` prop is set, the `Button` will be disabled and a [Loader](https://mantine.dev/llms/core-loader.md) with overlay will be rendered
in the center of the button. [Loader](https://mantine.dev/llms/core-loader.md) color depends on the `Button` variant.

```tsx
import { Button, Group, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [loading, { toggle }] = useDisclosure();
  return (
    <>
      <Group>
        <Button loading={loading}>Filled button</Button>
        <Button variant="light" loading={loading}>
          Light button
        </Button>
        <Button variant="outline" loading={loading}>
          Outline button
        </Button>
      </Group>

      <Switch checked={loading} onChange={toggle} label="Loading state" mt="md" />
    </>
  );
}
```


## Custom variants

To add new `Button` variants, use the [data-variant](https://mantine.dev/llms/styles-variants-sizes.md) attribute.
Usually new variants are added to the [theme](https://mantine.dev/llms/theming-theme-object.md), this way they are
available in all `Button` components in your application.

```tsx
// Demo.tsx
import { Group, Button, MantineProvider, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button variant="danger">Danger variant</Button>
        <Button variant="primary">Primary variant</Button>
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
    border-width: 0;
  }
}
```


## Customize variant colors

You can customize colors for `Button` and other component variants by adding
[variantColorResolver](https://mantine.dev/llms/theming-colors.md#colors-variant-resolver) to your theme.

```tsx
import {
  Button,
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
        <Button color="lime.4" variant="filled">
          Lime filled button
        </Button>

        <Button color="orange" variant="light">
          Orange light button
        </Button>

        <Button variant="danger">Danger button</Button>
      </Group>
    </MantineProvider>
  );
}
```


```tsx
import { Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Button color="lime.4">Default</Button>
      <Button color="lime.4" autoContrast>
        Auto contrast
      </Button>
    </Group>
  );
}
```


## Button.Group

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button.Group orientation="horizontal">
      <Button variant="default">First</Button>
      <Button variant="default">Second</Button>
      <Button variant="default">Third</Button>
    </Button.Group>
  );
}
```


Note that you must not wrap child `Button` components with any additional elements:

```tsx
import { Button } from '@mantine/core';

function Demo() {
  return (
    <Button.Group>
      <div>
        <Button>This will not work</Button>
      </div>
      <Button>Buttons will have incorrect borders</Button>
    </Button.Group>
  );
}
```

## Button.GroupSection

Use `Button.GroupSection` component to render sections that are not buttons inside `Button.Group`:

```tsx
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { Button } from '@mantine/core';
import { useCounter } from '@mantine/hooks';

function Demo() {
  const [value, { increment, decrement }] = useCounter(135, { min: 0 });

  return (
    <Button.Group>
      <Button variant="default" onClick={decrement}>
        <CaretDownIcon color="var(--mantine-color-red-text)" />
      </Button>
      <Button.GroupSection variant="default" bg="var(--mantine-color-body)" miw={80}>
        {value}
      </Button.GroupSection>
      <Button variant="default" onClick={increment}>
        <CaretUpIcon color="var(--mantine-color-teal-text)" />
      </Button>
    </Button.Group>
  );
}
```



#### Props

**Button props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for `filled` variant |
| children | React.ReactNode | - | Button content |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color |
| disabled | boolean | - | Sets `disabled` attribute, applies disabled styles |
| fullWidth | boolean | - | Sets `width: 100%` |
| gradient | MantineGradient | - | Gradient configuration used for `variant="gradient"` |
| justify | JustifyContent | - | Sets `justify-content` of `inner` element, can be used to change distribution of sections and label |
| leftSection | React.ReactNode | - | Content on the left side of the button label |
| loaderProps | LoaderProps | - | Props added to the `Loader` component (only visible when `loading` prop is set) |
| loading | boolean | - | If set, the `Loader` component is displayed over the button |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| rightSection | React.ReactNode | - | Content on the right side of the button label |
| size | ButtonSize | - | Controls button `height`, `font-size` and horizontal `padding` |

**Button.Group props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| borderWidth | string \| number | - | `border-width` of the child `Button` components. Numbers are converted to rem. |
| children | React.ReactNode | - | `Button` components |
| orientation | "horizontal" \| "vertical" | - | Orientation of the group |

**Button.GroupSection props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for `filled` variant |
| gradient | MantineGradient | - | Gradient configuration used when `variant="gradient"` |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| size | ButtonSize | - | Controls section `height`, `font-size` and horizontal `padding` |


#### Styles API

Button component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Button selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Button-root | Root element |
| loader | .mantine-Button-loader | Loader component, displayed only when `loading` prop is set |
| inner | .mantine-Button-inner | Contains all other elements, child of the `root` element |
| section | .mantine-Button-section | Left and right sections of the button |
| label | .mantine-Button-label | Button children |

**Button CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --button-bg | Controls `background` |
| root | --button-bd | Control `border` |
| root | --button-hover | Controls `background` when hovered |
| root | --button-color | Control text `color` |
| root | --button-hover-color | Control text `color` when hovered |
| root | --button-radius | Controls `border-radius` |
| root | --button-height | Controls `height` of the button |
| root | --button-padding-x | Controls horizontal `padding` of the button |
| root | --button-fz | Controls `font-size` of the button |
| root | --button-justify | Controls `justify-content` of `inner` element |

**Button data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-disabled | `disabled` prop is set | - |

**Button.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| group | .mantine-ButtonGroup-group | Root element |

**Button.Group CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| group | --button-border-width | `border-width` of child `Button` components |

**Button.Group data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| group | data-orientation | - | Value of `orientation` prop |

**Button.GroupSection selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| groupSection | .mantine-ButtonGroupSection-groupSection | Root element |

**Button.GroupSection CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| groupSection | --section-bg | Controls `background` |
| groupSection | --section-bd | Control `border` |
| groupSection | --section-color | Control text `color` |
| groupSection | --section-radius | Controls `border-radius` |
| groupSection | --section-height | Controls `height` of the section |
| groupSection | --section-padding-x | Controls horizontal `padding` of the section |
| groupSection | --section-fz | Controls `font-size` of the section |


--------------------------------------------------------------------------------

### Card
Package: @mantine/core
Import: import { Card } from '@mantine/core';
Description: Card with sections

## Usage

`Card` is a wrapper around the [Paper](https://mantine.dev/llms/core-paper.md) component with some additional styles and a `Card.Section`
component that allows you to split the card into sections. If you do not need sections, you can use the [Paper](https://mantine.dev/llms/core-paper.md) component instead.

```tsx
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Card.Section>
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


## Horizontal orientation

```tsx
import { Box, Card, Group, RingProgress, Text } from '@mantine/core';

const completed = 1887;
const total = 2334;
const stats = [
  { value: 447, label: 'Remaining' },
  { value: 76, label: 'In progress' },
];

function Demo() {
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text>{stat.value}</Text>
      <Text size="xs" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card padding="sm" withBorder orientation="horizontal">
      <Card.Section inheritPadding px="xs" withBorder>
        <RingProgress
          roundCaps
          thickness={6}
          size={150}
          sections={[{ value: (completed / total) * 100, color: 'blue' }]}
          label={
            <div>
              <Text ta="center" fz="lg">
                {((completed / total) * 100).toFixed(0)}%
              </Text>
              <Text ta="center" fz="xs" c="dimmed">
                Completed
              </Text>
            </div>
          }
        />
      </Card.Section>

      <Card.Section inheritPadding px="md">
        <Text fz="xl">Project tasks</Text>
        <Box mt="xs">
          <Text>1887</Text>
          <Text fz="xs" c="dimmed">
            Completed
          </Text>
        </Box>

        <Group mt="sm">{items}</Group>
      </Card.Section>
    </Card>
  );
}
```


