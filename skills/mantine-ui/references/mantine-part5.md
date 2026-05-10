## Custom color

By default, the code color is gray. You can change it to any valid CSS color or to one
of the [theme.colors](https://mantine.dev/llms/theming-colors.md):

```tsx
import { Code, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Code color="blue.9" c="white">
        React.createElement()
      </Code>
      <Code color="var(--mantine-color-blue-light)">React.createElement()</Code>
    </Group>
  );
}
```



#### Props

**Code props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| block | boolean | - | If set, code is rendered in `pre` |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color, controls `background-color` of the code. By default, calculated based on the color scheme. |

**Code.Highlight props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| background | MantineColor | - | Controls background color of the code. By default, the value depends on color scheme. |
| code | string | required | Code to highlight |
| codeColorScheme | (string & {}) \| "dark" \| "light" | - | Set to use dark or light color scheme. When using shiki adapter, you can use loaded themes here |
| collapseCodeLabel | string | - | Label for collapse button |
| controls | ReactNode[] | - | Extra controls to display in the controls list |
| copiedLabel | string | - | Label for copy button in copied state |
| copyLabel | string | - | Label for copy button in default state |
| defaultExpanded | boolean | - | Uncontrolled expanded default state |
| expandCodeLabel | string | - | Label for expand button |
| expanded | boolean | - | Controlled expanded state |
| language | string | - | Language of the code, used for syntax highlighting |
| maxCollapsedHeight | string \| number | - | Max height of collapsed state |
| onExpandedChange | (expanded: boolean) => void | - | Called when expanded state changes |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius |
| withBorder | boolean | - | Adds border to the root element |
| withCopyButton | boolean | - | Determines whether the copy button should be displayed |
| withExpandButton | boolean | - | Determines whether the expand/collapse button should be displayed |

**Code.HighlightTabs props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activeTab | number | - | Index of controlled active tab state |
| background | MantineColor | - | Controls background color of the code. By default, the value depends on color scheme. |
| code | CodeHighlightTabsCode[] | required | Code to highlight with meta data (file name and icon) |
| codeColorScheme | (string & {}) \| "dark" \| "light" | - | Set to use dark or light color scheme. When using shiki adapter, you can use loaded themes here |
| collapseCodeLabel | string | - | Label for collapse button |
| controls | ReactNode[] | - | Extra controls to display in the controls list |
| copiedLabel | string | - | Label for copy button in copied state |
| copyLabel | string | - | Label for copy button in default state |
| defaultActiveTab | number | - | Default active tab index |
| defaultExpanded | boolean | - | Uncontrolled expanded default state |
| expandCodeLabel | string | - | Label for expand button |
| expanded | boolean | - | Controlled expanded state |
| getFileIcon | (fileName: string) => ReactNode | - | Function that returns icon based on file name |
| maxCollapsedHeight | string \| number | - | Max height of collapsed state |
| onExpandedChange | (expanded: boolean) => void | - | Called when expanded state changes |
| onTabChange | (tab: number) => void | - | Called when tab changes |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius |
| withBorder | boolean | - | Adds border to the root element |
| withCopyButton | boolean | - | Determines whether the copy button should be displayed |
| withExpandButton | boolean | - | Determines whether the expand/collapse button should be displayed |


#### Styles API

Code component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Code selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Code-root | Root element |

**Code CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --code-bg | Controls `background-color` |

**Code data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-block | `block` prop is set | - |

**Codehighlight selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| codeHighlight | .mantine-Codehighlight-codeHighlight | Root element |
| showCodeButton | .mantine-Codehighlight-showCodeButton | Button that reveals full code when it is collapsed |
| pre | .mantine-Codehighlight-pre | Pre element, contains code element |
| code | .mantine-Codehighlight-code | Code element |
| control | .mantine-Codehighlight-control | Control button, copy/collapse, custom controls |
| controlTooltip | .mantine-Codehighlight-controlTooltip | Root element of control tooltip |
| controls | .mantine-Codehighlight-controls | A wrapper around controls |
| scrollarea | .mantine-Codehighlight-scrollarea | Scroll area, contains code |

**Codehighlight CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| codeHighlight | --ch-background | Background color |
| codeHighlight | --ch-max-height | Max height of code block in collapsed state |
| codeHighlight | --ch-radius | Border radius |

**Codehighlighttabs selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| codeHighlight | .mantine-Codehighlighttabs-codeHighlight | Root element of inner CodeHighlight component |
| showCodeButton | .mantine-Codehighlighttabs-showCodeButton | Button that reveals full code when it is collapsed |
| pre | .mantine-Codehighlighttabs-pre | Pre element, contains code element |
| code | .mantine-Codehighlighttabs-code | Code element |
| control | .mantine-Codehighlighttabs-control | Control button, copy/collapse, custom controls |
| controlTooltip | .mantine-Codehighlighttabs-controlTooltip | Root element of control tooltip |
| controls | .mantine-Codehighlighttabs-controls | A wrapper around controls |
| scrollarea | .mantine-Codehighlighttabs-scrollarea | Scroll area, contains code |
| root | .mantine-Codehighlighttabs-root | Root element |
| filesScrollarea | .mantine-Codehighlighttabs-filesScrollarea | Scrollarea with files list |
| files | .mantine-Codehighlighttabs-files | Files names list |
| file | .mantine-Codehighlighttabs-file | File name |
| fileIcon | .mantine-Codehighlighttabs-fileIcon | File icon |


--------------------------------------------------------------------------------

### Collapse
Package: @mantine/core
Import: import { Collapse } from '@mantine/core';
Description: Animate presence with slide down/up transition

## Usage

```tsx
import { Button, Group, Text, Collapse, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [expanded, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button onClick={toggle}>Toggle content</Button>
      </Group>

      <Collapse expanded={expanded}>
        <Text>{/* ... content */}</Text>
      </Collapse>
    </Box>
  );
}
```


## Horizontal orientation

```tsx
import { Button, Collapse, Stack, Typography } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [expanded, handlers] = useDisclosure(false);

  return (
    <Stack h={240} align="flex-start">
      <Button onClick={handlers.toggle} w="fit-content">
        {expanded ? 'Collapse' : 'Expand'}
      </Button>

      <Collapse expanded={expanded} orientation="horizontal">
        <Typography bg="var(--mantine-color-blue-light)" p="xs" bdrs="md" w={200}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Typography>
      </Collapse>
    </Stack>
  );
}
```


## Change transition

Set the following props to control the transition:

* `transitionDuration` – duration in ms
* `transitionTimingFunction` – timing function (ease, linear, etc.), defaults to `ease`
* `onTransitionEnd` – called when transition ends (both open and close)

```tsx
import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Text, Collapse, Box } from '@mantine/core';

function Demo() {
  const [expanded, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button onClick={toggle}>Toggle with linear transition</Button>
      </Group>

      <Collapse expanded={expanded} transitionDuration={1000} transitionTimingFunction="linear">
        <Text>{/* ...content */}</Text>
      </Collapse>
    </Box>
  );
}
```


## Example: nested Collapse components

```tsx
function Demo() {
  return (
    <CollapsedDemo buttonProps={{ children: 'Root collapse' }}>
      <Text mt="md" size="lg" fw={700}>
        This collapse contains another collapse
      </Text>
      <Text mt="xs">{lorem}</Text>
      <CollapsedDemo buttonProps={{ variant: 'outline', children: 'Inner collapse' }}>
        <Text mt="md" size="lg" fw={700}>
          This collapse is inside another collapse
        </Text>
        <Text mt="xs">{lorem}</Text>
      </CollapsedDemo>
    </CollapsedDemo>
  );
}
```


## use-collapse hook

[use-collapse](https://mantine.dev/llms/hooks-use-collapse.md) is the hook version of the `Collapse` component.
It allows more flexible usage and control over the collapse behavior.

```tsx
import { Button, Typography } from '@mantine/core';
import { useCollapse, useDisclosure } from '@mantine/hooks';

function Demo() {
  const [expanded, handlers] = useDisclosure(false);
  const { getCollapseProps } = useCollapse({ expanded });

  return (
    <>
      <Button onClick={handlers.toggle} mb="md">
        {expanded ? 'Collapse' : 'Expand'}
      </Button>

      <div {...getCollapseProps()}>
        <Typography bg="var(--mantine-color-blue-light)" p="xs" bdrs="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </div>
    </>
  );
}
```



#### Props

**Collapse props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| animateOpacity | boolean | - | Determines whether the opacity is animated |
| expanded | boolean | required | Expanded state |
| keepMounted | boolean | - | If set, the element is kept in the DOM when collapsed. When `true`, React 19 `Activity` is used to preserve state while collapsed. When `false`, the element is unmounted after the exit animation. |
| onTransitionEnd | () => void | - | Called when the transition ends |
| onTransitionStart | () => void | - | Called when transition starts |
| orientation | "horizontal" \| "vertical" | - | Collapse orientation |
| transitionDuration | number | - | Transition duration in ms |
| transitionTimingFunction | string | - | Transition timing function |


--------------------------------------------------------------------------------

### ColorInput
Package: @mantine/core
Import: import { ColorInput } from '@mantine/core';
Description: Capture color from user

## Usage

ColorInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. ColorInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { ColorInput } from '@mantine/core';


function Demo() {
  return (
    <ColorInput
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
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput placeholder="Pick color" loading />;
}
```


## Controlled

```tsx
import { useState } from 'react';
import { ColorInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  return <ColorInput value={value} onChange={setValue} />;
}
```

## Formats

The component supports hex, hexa, rgb, rgba, hsl and hsla color formats.
The slider to change opacity is displayed only for hexa, rgba and hsla formats:

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput defaultValue="#C5D899" format="hex" />;
}
```


## Preserve invalid input

By default, `ColorInput` will revert the value on blur to the last known valid value.
To change this behavior and keep the invalid value, set `fixOnBlur={false}`:

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput fixOnBlur={false} label="Value is not fixed on blur" placeholder="May contain invalid value" />;
}
```


## onChangeEnd

`onChangeEnd` is called when the user stops dragging the slider or changes the input value.
It is useful when you need to update the color only when the user has finished interacting with the component:

```tsx
import { useState } from 'react';
import { ColorInput, Text } from '@mantine/core';

function Demo() {
  const [changeEndValue, setChangeEndValue] = useState('#FFFFFF');

  return (
    <>
      <Text mb="md">
        Change end value: <b>{changeEndValue}</b>
      </Text>

      <ColorInput
        label="Pick color"
        placeholder="Pick color"
        defaultValue="#FFFFFF"
        onChangeEnd={setChangeEndValue}
      />
    </>
  );
}
```


## Disable free input

To disable free input, set the `disallowInput` prop:

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput disallowInput />;
}
```


## With swatches

You can add any amount of predefined color swatches:

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return (
    <ColorInput
      format="hex"
      swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
    />
  );
}
```


By default, there will be 7 swatches per row. You can change this with the `swatchesPerRow` prop,
like in the [ColorPicker](https://mantine.dev/llms/core-color-picker.md) component:

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return (
    <ColorPicker swatchesPerRow={7} format="hex" swatches={[${Object.keys(DEFAULT_THEME.colors)
      .map((color) => `'${DEFAULT_THEME.colors[color][6]}'`)
      .join(', ')}]} />
  );
}
```


If you need to restrict color picking to certain colors – disable the color picker and disallow free input:

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return (
    <ColorInput
      placeholder="Pick color"
      label="Your favorite color"
      disallowInput
      withPicker={false}
      swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
    />
  );
}
```


## Close dropdown on color swatch click

To close the dropdown when one of the color swatches is clicked, set the `closeOnColorSwatchClick` prop:

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return (
    <ColorInput
      closeOnColorSwatchClick
      label="Dropdown is closed when color swatch is clicked"
      placeholder="Click color swatch"
      swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
    />
  );
}
```


## Hide dropdown

To hide the dropdown, set `withPicker={false}`:

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return (
    <ColorInput withPicker={false} pointer label="Without dropdown" placeholder="Enter value" />
  );
}
```


## Eye dropper

By default, if the [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API)
is available, the eye dropper icon will be displayed at the right section of the input.
To disable it, set `withEyeDropper={false}`:

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput withEyeDropper={false} label="Without eye dropper" placeholder="Not fun" />;
}
```


## Change eye dropper icon

You can replace the eye dropper icon with any React node using the `eyeDropperIcon` prop:

```tsx
import { ColorInput } from '@mantine/core';
import { CrosshairIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ColorInput
      eyeDropperIcon={<CrosshairIcon size={18} />}
      label="With custom eye dropper icon"
      placeholder="Pick color"
    />
  );
}
```


## Input sections

ColorInput supports left and right sections to display icons, buttons or other content alongside the input.

Note that by default, `ColorPicker` has a color preview in the left section and an eye dropper button
in the right section. You can replace these elements with any React node using the `leftSection`
and `rightSection` props:

```tsx
import { ColorInput } from '@mantine/core';
import { EyedropperIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <EyedropperIcon size={18} />;

  return (
    <>
      <ColorInput
        label="With custom left section"
        placeholder="Replaces color swatch"
        leftSection={icon}
        leftSectionPointerEvents="none"
        withEyeDropper={false}
      />
      <ColorInput
        label="With custom right section"
        placeholder="Replaces eye dropper"
        rightSection={icon}
        rightSectionPointerEvents="none"
        mt="md"
      />
    </>
  );
}
```


## Error state

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <ColorInput label="Boolean error" placeholder="Boolean error" error />
      <ColorInput
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid name"
      />
    </>
  );
}
```


## Disabled state

```tsx
import { ColorInput } from '@mantine/core';

function Demo() {
  return <ColorInput disabled label="Disabled input" placeholder="Disabled input" />;
}
```



#### Props

**ColorInput props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| closeOnColorSwatchClick | boolean | - | If set, the dropdown is closed when one of the color swatches is clicked |
| defaultValue | string | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of `Input.Description` component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps | - | Props passed down to the `Input.Description` component |
| disabled | boolean | - | Sets `disabled` attribute on the `input` element |
| disallowInput | boolean | - | If input is not allowed, the user can only pick value with color picker and swatches |
| error | React.ReactNode | - | Contents of `Input.Error` component. If not set, error is not displayed. |
| errorProps | InputErrorProps | - | Props passed down to the `Input.Error` component |
| eyeDropperButtonProps | Record<string, any> | - | Props passed down to the eye dropper button |
| eyeDropperIcon | React.ReactNode | - | An icon to replace the default eye dropper icon |
| fixOnBlur | boolean | - | If set, the input value resets to the last known valid value when the input loses focus |
| format | 'hex' \| 'hexa' \| 'rgba' \| 'rgb' \| 'hsl' \| 'hsla' | - | Color format. `hexa`, `rgba`, `hsla` values render alpha channel slider |
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
| onChange | (value: string) => void | - | Called when value changes |
| onChangeEnd | (value: string) => void | - | Called when the user stops dragging one of the sliders or changes the value with keyboard |
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| popoverProps | PopoverProps | - | Props passed down to the `Popover` component |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| size | MantineSize | - | Controls input `height`, horizontal `padding`, and `font-size` |
| swatches | string[] | - | A list of colors used to display swatches list below the color picker |
| swatchesPerRow | number | - | Number of swatches per row |
| value | string | - | Controlled component value |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| withEyeDropper | boolean | - | If set, the eye dropper button is displayed in the right section |
| withPicker | boolean | - | If `false`, the component displays only swatches |
| withPreview | boolean | - | If set, the preview color swatch is displayed in the left section of the input |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

ColorInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ColorInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-ColorInput-wrapper | Root element |
| input | .mantine-ColorInput-input | Input element |
| section | .mantine-ColorInput-section | Left and right sections |
| root | .mantine-ColorInput-root | Root element |
| label | .mantine-ColorInput-label | Label element |
| required | .mantine-ColorInput-required | Required asterisk element, rendered inside label |
| description | .mantine-ColorInput-description | Description element |
| error | .mantine-ColorInput-error | Error element |
| preview | .mantine-ColorInput-preview | Color preview, displayed only when `format` supports alpha channel |
| body | .mantine-ColorInput-body | Contains alpha/hue sliders and color preview |
| slider | .mantine-ColorInput-slider | Alpha and hue sliders root |
| sliderOverlay | .mantine-ColorInput-sliderOverlay | Element used to display various overlays over hue and alpha sliders |
| saturation | .mantine-ColorInput-saturation | Saturation picker |
| saturationOverlay | .mantine-ColorInput-saturationOverlay | Element used to display various overlays over saturation picker |
| sliders | .mantine-ColorInput-sliders | Contains alpha and hue sliders |
| thumb | .mantine-ColorInput-thumb | Thumb of all sliders |
| swatch | .mantine-ColorInput-swatch | Color swatch |
| swatches | .mantine-ColorInput-swatches | Color swatches list |
| dropdown | .mantine-ColorInput-dropdown | Popover dropdown |
| colorPreview | .mantine-ColorInput-colorPreview | Color swatch preview in input left section |
| eyeDropperButton | .mantine-ColorInput-eyeDropperButton | Eye dropper button |
| eyeDropperIcon | .mantine-ColorInput-eyeDropperIcon | Default eye dropper icon |

**ColorInput CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| colorPreview | --ci-preview-size | Controls `width` and `height` of color preview |


--------------------------------------------------------------------------------

### ColorPicker
Package: @mantine/core
Import: import { ColorPicker } from '@mantine/core';
Description: Pick colors in hex(a), rgb(a), hsl(a) and hsv(a) formats

## Usage

```tsx
import { useState } from 'react';
import { ColorPicker, Text } from '@mantine/core';

function Demo() {
  const [value, onChange] = useState('rgba(47, 119, 150, 0.7)');

  return (
    <>
      <ColorPicker format="rgba" value={value} onChange={onChange} />
      <Text>{value}</Text>
    </>
  );
}
```


## Controlled

The `ColorPicker` value must be a string; other types are not supported.
The `onChange` function is called with a string value as a single argument.

```tsx
import { useState } from 'react';
import { ColorPicker } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('#ffffff');
  return <ColorPicker value={value} onChange={setValue} />;
}
```

## Uncontrolled

`ColorPicker` can be used with uncontrolled forms the same way as a native `input` element.
Set the `name` attribute to include color picker value in `FormData` object on form submission.
To control the initial value in uncontrolled forms, use the `defaultValue` prop.

Example usage of uncontrolled `ColorPicker` with `FormData`:

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Color value:', formData.get('color'));
      }}
    >
      <ColorPicker
        name="color"
        defaultValue="#FF0000"
        format="hex"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Color format

`ColorPicker` supports hex, hexa, rgb, rgba, hsl and hsla color formats.
The slider to change opacity and color preview are displayed only for hexa, rgba and hsla formats:

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return <ColorPicker format="hex" />;
}
```


## With swatches

You can add predefined color swatches with the `swatches` prop:

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return (
    <ColorPicker
      format="hex"
      swatches={[${Object.keys(DEFAULT_THEME.colors)
        .map((color) => `'${DEFAULT_THEME.colors[color][6]}'`)
        .join(', ')}]}
    />
  );
}
```


By default, `ColorPicker` will display 7 swatches per row. You can configure it with the `swatchesPerRow` prop:

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return (
    <ColorPicker swatchesPerRow={7} format="hex" swatches={[${Object.keys(DEFAULT_THEME.colors)
      .map((color) => `'${DEFAULT_THEME.colors[color][6]}'`)
      .join(', ')}]} />
  );
}
```


To display swatches without picker, set `withPicker={false}` and `fullWidth` props:

```tsx
import { useState } from 'react';
import { DEFAULT_THEME, ColorPicker, Text } from '@mantine/core';

function Demo() {
  const [value, onChange] = useState('#fff');

  return (
    <>
      <ColorPicker
        format="hex"
        value={value}
        onChange={onChange}
        withPicker={false}
        fullWidth
        swatches={[
          ...DEFAULT_THEME.colors.red.slice(0, 7),
          ...DEFAULT_THEME.colors.green.slice(0, 7),
          ...DEFAULT_THEME.colors.blue.slice(0, 7),
        ]}
      />

      <Text>{value}</Text>
    </>
  );
}
```


## Size

`ColorPicker` has 5 predefined sizes: `xs`, `sm`, `md`, `lg` and `xl`:

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return <ColorPicker size="sm" />;
}
```


## Accessibility

The ColorPicker component is accessible by default:

* Saturation, hue and alpha sliders are focusable
* When the mouse is used to interact with the slider, focus is moved to the slider
* All values can be changed with arrows

To make the component accessible for screen readers, set `saturationLabel`, `hueLabel` and `alphaLabel`:

```tsx
import { ColorPicker } from '@mantine/core';

function Demo() {
  return (
    <ColorPicker
      saturationLabel="Saturation"
      hueLabel="Hue"
      alphaLabel="Alpha"
    />
  );
}
```


#### Props

**ColorPicker props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| alphaLabel | string | - | Alpha slider `aria-label` |
| defaultValue | string | - | Uncontrolled component default value |
| focusable | boolean | - | If set, interactive elements (sliders thumbs and swatches) are focusable with keyboard |
| format | 'hex' \| 'hexa' \| 'rgba' \| 'rgb' \| 'hsl' \| 'hsla' | - | Color format. `hexa`, `rgba`, `hsla` values render alpha channel slider |
| fullWidth | boolean | - | If set, the component takes 100% width of its container |
| hiddenInputProps | ClassAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement> & DataAttributes | - | Props spread to the hidden input |
| hueLabel | string | - | Hue slider `aria-label` |
| name | string | - | Hidden input `name` attribute, if not set, the input will not be rendered |
| onChange | (value: string) => void | - | Called when value changes |
| onChangeEnd | (value: string) => void | - | Called when the user stops dragging one of the sliders or changes the value with keyboard |
| onColorSwatchClick | (color: string) => void | - | Called when one of the color swatches is clicked |
| saturationLabel | string | - | Saturation slider `aria-label` |
| size | MantineSize | - | Component size |
| swatches | string[] | - | A list of colors used to display swatches list below the color picker |
| swatchesPerRow | number | - | Number of swatches per row |
| value | string | - | Controlled component value |
| withPicker | boolean | - | If `false`, the component displays only swatches |


#### Styles API

ColorPicker component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ColorPicker selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-ColorPicker-wrapper | Root element |
| preview | .mantine-ColorPicker-preview | Color preview, displayed only when `format` supports alpha channel |
| body | .mantine-ColorPicker-body | Contains alpha/hue sliders and color preview |
| slider | .mantine-ColorPicker-slider | Alpha and hue sliders root |
| sliderOverlay | .mantine-ColorPicker-sliderOverlay | Element used to display various overlays over hue and alpha sliders |
| saturation | .mantine-ColorPicker-saturation | Saturation picker |
| saturationOverlay | .mantine-ColorPicker-saturationOverlay | Element used to display various overlays over saturation picker |
| sliders | .mantine-ColorPicker-sliders | Contains alpha and hue sliders |
| thumb | .mantine-ColorPicker-thumb | Thumb of all sliders |
| swatch | .mantine-ColorPicker-swatch | Color swatch |
| swatches | .mantine-ColorPicker-swatches | Color swatches list |

**ColorPicker CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| wrapper | --cp-body-spacing | Controls spacing between sliders and saturation |
| wrapper | --cp-preview-size | Controls size of the preview swatch |
| wrapper | --cp-width | Controls `width` of the root element |
| wrapper | --cp-swatch-size | Controls swatch `width` and `height` |
| wrapper | --cp-thumb-size | Controls thumb `width` and `height` in all sliders and saturation picker |
| wrapper | --cp-saturation-height | Controls `height` of the saturation picker |


--------------------------------------------------------------------------------

### ColorSwatch
Package: @mantine/core
Import: import { ColorSwatch } from '@mantine/core';
Description: Displays color

## Usage

```tsx
import { ColorSwatch, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <ColorSwatch color="#009790" />
      <ColorSwatch color="rgba(234, 22, 174, 0.5)" />
      <ColorSwatch color="var(--mantine-color-orange-5)" />
    </Group>
  );
}
```


## withShadow

By default, `ColorSwatch` has an inner box-shadow to make it more visible on light backgrounds.
You can disable it by setting the `withShadow={false}` prop:

```tsx
import { ColorSwatch } from '@mantine/core';

function Demo() {
  return <ColorSwatch color="rgba(255, 255, 255, 0.7)" withShadow={true} />;
}
```


Example of using `ColorSwatch` as a button:

```tsx
import { useState } from 'react';
import { ColorSwatch, CheckIcon } from '@mantine/core';

function Demo() {
  const [checked, setChecked] = useState(true);

  return (
    <ColorSwatch
      component="button"
      color="var(--mantine-color-grape-6)"
      onClick={() => setChecked((c) => !c)}
      style={{ color: '#fff', cursor: 'pointer' }}
    >
      {checked && <CheckIcon size={12} />}
    </ColorSwatch>
  );
}
```



#### Props

**ColorSwatch props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Children inside the swatch |
| color | string | required | Valid CSS color to display |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem. |
| size | React.CSSProperties["width"] | - | Swatch `width` and `height`, any valid CSS value, numbers are converted to rem. |
| withShadow | boolean | - | If set, the swatch has inner `box-shadow` |


#### Styles API

ColorSwatch component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ColorSwatch selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-ColorSwatch-root | Root element |
| alphaOverlay | .mantine-ColorSwatch-alphaOverlay | Overlay with checkerboard pattern |
| shadowOverlay | .mantine-ColorSwatch-shadowOverlay | Overlay with inner box-shadow |
| colorOverlay | .mantine-ColorSwatch-colorOverlay | Overlay with given color background |
| childrenOverlay | .mantine-ColorSwatch-childrenOverlay | Overlay with `children` inside |

**ColorSwatch CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --cs-radius | Controls `border-radius` of all overlays and `root` element |
| root | --cs-size | Controls `width`, `height`, `min-width` and `min-height` of the `root` element |


--------------------------------------------------------------------------------

### Combobox
Package: @mantine/core
Import: import { Combobox } from '@mantine/core';
Description: Create custom select, autocomplete or multiselect inputs

## Examples

This page contains only a small set of examples, as the full code of the demos is long.
You can find all 50+ examples on a [separate page](https://mantine.dev/combobox?e=BasicSelect).

## Usage

`Combobox` provides a set of components and hooks to create custom select, multiselect or autocomplete components.
The component is very flexible – you have full control of the rendering and logic.

```tsx
import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


## useCombobox hook

`useCombobox` hook provides a combobox store. The store contains the current state of the component
and handlers to update it. The created store must be passed to the `store` prop of `Combobox`:

```tsx
import { Combobox, useCombobox } from '@mantine/core';

function Demo() {
  const combobox = useCombobox();
  return (
    <Combobox store={combobox}>{/* Your implementation */}</Combobox>
  );
}
```

## useCombobox options

The `useCombobox` hook accepts an options object with the following properties:

```tsx
interface UseComboboxOptions {
  /** Default value for `dropdownOpened`, `false` by default */
  defaultOpened?: boolean;

  /** Controlled `dropdownOpened` state */
  opened?: boolean;

  /** Called when `dropdownOpened` state changes */
  onOpenedChange?(opened: boolean): void;

  /** Called when dropdown closes with event source: keyboard, mouse or unknown */
  onDropdownClose?(eventSource: ComboboxDropdownEventSource): void;

  /** Called when dropdown opens with event source: keyboard, mouse or unknown */
  onDropdownOpen?(eventSource: ComboboxDropdownEventSource): void;

  /** Determines whether arrow key presses should loop though items (first to last and last to first), `true` by default */
  loop?: boolean;

  /** `behavior` passed down to `element.scrollIntoView`, `'instant'` by default */
  scrollBehavior?: ScrollBehavior;
}
```

You can import the `UseComboboxOptions` type from the `@mantine/core` package:

```tsx
import type { UseComboboxOptions } from '@mantine/core';
```

## Combobox store

The Combobox store is an object with the following properties:

```tsx
interface ComboboxStore {
  /** Current dropdown opened state */
  dropdownOpened: boolean;

  /** Opens dropdown */
  openDropdown(eventSource?: 'keyboard' | 'mouse' | 'unknown'): void;

  /** Closes dropdown */
  closeDropdown(eventSource?: 'keyboard' | 'mouse' | 'unknown'): void;

  /** Toggles dropdown opened state */
  toggleDropdown(
    eventSource?: 'keyboard' | 'mouse' | 'unknown'
  ): void;

  /** Selected option index */
  selectedOptionIndex: number;

  /** Selects `Combobox.Option` by index */
  selectOption(index: number): void;

  /** Selects first `Combobox.Option` with `active` prop.
   *  If there are no such options, the function does nothing.
   */
  selectActiveOption(): string | null;

  /** Selects first `Combobox.Option` that is not disabled.
   *  If there are no such options, the function does nothing.
   * */
  selectFirstOption(): string | null;

  /** Selects next `Combobox.Option` that is not disabled.
   *  If the current option is the last one, the function selects first option, if `loop` is true.
   */
  selectNextOption(): string | null;

  /** Selects previous `Combobox.Option` that is not disabled.
   *  If the current option is the first one, the function selects last option, if `loop` is true.
   * */
  selectPreviousOption(): string | null;

  /** Resets selected option index to -1, removes `data-combobox-selected` from selected option */
  resetSelectedOption(): void;

  /** Triggers `onClick` event of selected option.
   *  If there is no selected option, the function does nothing.
   */
  clickSelectedOption(): void;

  /** Updates selected option index to currently selected or active option.
   *  The function is required to be used with searchable components to update selected option index
   *  when options list changes based on search query.
   */
  updateSelectedOptionIndex(target?: 'active' | 'selected'): void;

  /** List id, used for `aria-*` attributes */
  listId: string | null;

  /** Sets list id */
  setListId(id: string): void;

  /** Ref of `Combobox.Search` input */
  searchRef: React.RefObject<HTMLInputElement | null>;

  /** Moves focus to `Combobox.Search` input */
  focusSearchInput(): void;

  /** Ref of the target element */
  targetRef: React.RefObject<HTMLElement | null>;

  /** Moves focus to the target element */
  focusTarget(): void;
}
```

You can import `ComboboxStore` type from `@mantine/core` package:

```tsx
import type { ComboboxStore } from '@mantine/core';
```

## useCombobox handlers

Combobox store handlers can be used to control `Combobox` state.
For example, to open the dropdown, call `openDropdown` handler:

```tsx
import { Button, Combobox, useCombobox } from '@mantine/core';

function Demo() {
  const combobox = useCombobox();

  return (
    <Combobox>
      <Combobox.Target>
        <Button onClick={() => combobox.openDropdown()}>
          Open dropdown
        </Button>
      </Combobox.Target>

      {/* Your implementation */}
    </Combobox>
  );
}
```

You can use store handlers in `useCombobox` options. For example, you can
call `selectFirstOption` when the dropdown is opened and `resetSelectedOption`
when it is closed:

```tsx
import { Combobox, useCombobox } from '@mantine/core';

function Demo() {
  const combobox = useCombobox({
    onDropdownOpen: () => combobox.selectFirstOption(),
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Combobox store={combobox}>{/* Your implementation */}</Combobox>
  );
}
```

## Combobox.Target

`Combobox.Target` should be used as a wrapper for the target element or component.
`Combobox.Target` marks its child as a target for dropdown and sets `aria-*` attributes
and adds keyboard event listeners to it.

`Combobox.Target` requires a single child element or component. The child component
must accept `ref` and `...others` props. You can use any Mantine component as a target without
any additional configuration, for example, [Button](https://mantine.dev/llms/core-button.md), [TextInput](https://mantine.dev/llms/core-text-input.md)
or [InputBase](https://mantine.dev/llms/core-input.md#inputbase-component).

Example of using `Combobox.Target` with [TextInput](https://mantine.dev/llms/core-text-input.md) component:

```tsx
import { useState } from 'react';
import { Combobox, TextInput, useCombobox } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const shouldFilterOptions = !groceries.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
    : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          label="Pick value or type anything"
          placeholder="Pick value or type anything"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
```


Example of using `Combobox.Target` with [Button](https://mantine.dev/llms/core-button.md) component:

```tsx
import { useState } from 'react';
import { Button, Combobox, useCombobox, Text, Box } from '@mantine/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = groceries.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      <Box mb="xs">
        <Text span size="sm" c="dimmed">
          Selected item:{' '}
        </Text>

        <Text span size="sm">
          {selectedItem || 'Nothing selected'}
        </Text>
      </Box>

      <Combobox
        store={combobox}
        width={250}
        position="bottom-start"
        withArrow
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <Button onClick={() => combobox.toggleDropdown()}>Pick item</Button>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
```


