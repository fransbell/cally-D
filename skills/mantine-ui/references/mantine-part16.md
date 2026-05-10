## Change icon color

```tsx
import { Radio } from '@mantine/core';

function Demo() {
  return (
    <Radio
      iconColor="dark.8"
      color="lime.4"
      label="Custom icon color"
      name="check"
      value="check"
      defaultChecked
    />
  );
}
```


## Disabled state

```tsx
import { Radio, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Radio checked disabled label="React" value="react" />
      <Radio disabled label="Angular" value="nu" />
      <Radio disabled label="Svelte" value="sv" />
    </Group>
  );
}
```


## Pointer cursor

By default, the radio input and label have `cursor: default` (same as native `input[type="radio"]`).
To change the cursor to pointer, set `cursorType` on the [theme](https://mantine.dev/llms/theming-theme-object.md):

```tsx
import { createTheme, MantineProvider, Radio } from '@mantine/core';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Radio label="Pointer cursor" />
    </MantineProvider>
  );
}
```

## Radio with tooltip

You can change the target element to which the tooltip is attached with `refProp`:

* If `refProp` is not set, the tooltip is attached to the radio input
* If `refProp="rootRef"` is set, the tooltip is attached to the root element (contains label, input, and other elements)

```tsx
import { Tooltip, Radio } from '@mantine/core';

function Demo() {
  return (
    <>
      <Tooltip label="Radio with tooltip">
        <Radio label="Tooltip on radio only" />
      </Tooltip>

      <Tooltip label="Radio with tooltip" refProp="rootRef">
        <Radio label="Tooltip the entire element" mt="md" />
      </Tooltip>
    </>
  );
}
```


## Wrapper props

Radio supports additional props that are passed to the wrapper element for more customization options.

## Radio.Group component

```tsx
import { Radio, Group } from '@mantine/core';


function Demo() {
  return (
    <Radio.Group
      name="favoriteFramework"
       label="Select your favorite framework/library" description="This is anonymous" error="" withAsterisk={true}
    >
      <Group mt="xs">
        <Radio value="react" label="React" />
        <Radio value="svelte" label="Svelte" />
        <Radio value="ng" label="Angular" />
        <Radio value="vue" label="Vue" />
      </Group>
    </Radio.Group>
  );
}
```


## Radio.Group disabled state

```tsx
import { Radio, Group } from '@mantine/core';

function Demo() {
  return (
    <Radio.Group
      disabled
      name="favoriteFramework"
      label="Select your favorite framework/library"
      description="This is anonymous"
    >
      <Group mt="xs">
        <Radio label="React" value="react" />
        <Radio label="Angular" value="nu" />
        <Radio label="Svelte" value="sv" />
      </Group>
    </Radio.Group>
  );
}
```


## Controlled Radio.Group

```tsx
import { useState } from 'react';
import { Radio } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('react');

  return (
    <Radio.Group
      value={value}
      onChange={setValue}
      name="favoriteFramework"
      label="Select your favorite framework/library"
      description="This is anonymous"
      withAsterisk
    >
      <Radio value="react" label="React" />
      <Radio value="svelte" label="Svelte" />
      <Radio value="ng" label="Angular" />
      <Radio value="vue" label="Vue" />
    </Radio.Group>
  );
}
```

## Radio.Indicator

`Radio.Indicator` looks exactly the same as the `Radio` component, but it does not
have any semantic meaning; it's just a visual representation of the radio state. You
can use it in any place where you need to display the radio state without any interaction
related to the indicator. For example, it is useful in cards based on buttons, trees, etc.

Note that `Radio.Indicator` cannot be focused or selected with the keyboard. It is not
accessible and should not be used as a replacement for the `Radio` component.

```tsx
import { Radio, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Radio.Indicator />
      <Radio.Indicator checked />
      <Radio.Indicator disabled />
      <Radio.Indicator disabled checked />
    </Group>
  );
}
```


## Accessibility

Set the `aria-label` or `label` prop to make the radio accessible:

```tsx
import { Radio } from '@mantine/core';

// Not ok, input is not labeled
function Bad() {
  return <Radio />;
}

// Ok, input is labeled by aria-label
function GoodAriaLabel() {
  return <Radio aria-label="My radio" />;
}

// Ok, input is labeled by label element
function GoodLabel() {
  return <Radio label="My radio" />;
}
```


#### Props

**Radio props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for `filled` variant |
| color | MantineColor | - | Key of theme.colors or any valid CSS color to set radio background color in checked state |
| description | React.ReactNode | - | Description displayed below the label |
| error | React.ReactNode | - | Error displayed below the label |
| icon | FC<RadioIconProps> | - | A component that replaces the default radio icon (centered dot) |
| iconColor | MantineColor | - | Key of theme.colors or any valid CSS color to set icon color. When not set, icon color is determined automatically based on theme.autoContrast setting |
| label | React.ReactNode | - | Content of the `label` associated with the radio |
| labelPosition | "left" \| "right" | - | Position of the label relative to the input |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| rootRef | Ref<HTMLDivElement> | - | Assigns ref of the root element |
| size | MantineSize | - | Controls size of the component |
| withErrorStyles | boolean | - | If set, applies error styles to the radio when `error` prop is set |
| wrapperProps | React.ComponentProps<"div"> | - | Props passed down to the root element |

**Radio.GroupContext props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|

**Radio.Group props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | required | `Radio` components and any other elements |
| defaultValue | Primitive \| null | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of `Input.Description` component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps | - | Props passed down to the `Input.Description` component |
| disabled | boolean | - | Sets `disabled` attribute, prevents interactions |
| error | React.ReactNode | - | Contents of `Input.Error` component. If not set, error is not displayed. |
| errorProps | InputErrorProps | - | Props passed down to the `Input.Error` component |
| id | string | - | Static id used as base to generate `aria-` attributes, by default generates random id |
| inputContainer | (children: ReactNode) => ReactNode | - | Render function to wrap the input element. Useful for adding tooltips, popovers, or other wrappers around the input. |
| inputWrapperOrder | ("input" \| "label" \| "description" \| "error")[] | - | Controls order and visibility of wrapper elements. Only elements included in this array will be rendered. |
| label | React.ReactNode | - | Contents of `Input.Label` component. If not set, label is not displayed. |
| labelElement | "div" \| "label" | - | Root element for the label. Use `'div'` when wrapper contains multiple input elements and you need to handle `htmlFor` manually. |
| labelProps | InputLabelProps | - | Props passed down to the `Input.Label` component |
| name | string | - | `name` attribute of child radio inputs. By default, `name` is generated randomly. |
| onChange | (value: Value) => void | - | Called when value changes |
| readOnly | boolean | - | If set, value cannot be changed |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| size | MantineSize | - | Controls size of the `Input.Wrapper` |
| value | Primitive \| null | - | Controlled component value |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| wrapperProps | React.ComponentProps<"div"> | - | Props passed down to the `Input.Wrapper` |

**Radio.Indicator props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoContrast | boolean | - | If set, adjusts text color based on background color for `filled` variant |
| checked | boolean | - | Checked state |
| color | MantineColor | - | Key of theme.colors or any valid CSS color to set indicator background color in checked state |
| disabled | boolean | - | Disabled state |
| icon | FC<RadioIconProps> | - | A component that replaces the default radio icon (centered dot) |
| iconColor | MantineColor | - | Key of theme.colors or any valid CSS color to set icon color. When not set, icon color is determined automatically based on theme.autoContrast setting |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| size | MantineSize | - | Controls size of the component |

**Radio.CardContext props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|

**Radio.Card props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | boolean | - | Checked state |
| name | string | - | Value used to associate all related radio cards, required for accessibility if used outside of `Radio.Group` |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| value | string | - | Value of the radio, used with Radio.Group |
| withBorder | boolean | - | Adds border to the root element |


#### Styles API

Radio component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Radio selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Radio-root | Root element |
| radio | .mantine-Radio-radio | Input element (`input[type="radio"]`) |
| icon | .mantine-Radio-icon | Radio icon, used to display checked icon |
| inner | .mantine-Radio-inner | Wrapper for `icon` and `input` |
| body | .mantine-Radio-body | Input body, contains all other elements |
| labelWrapper | .mantine-Radio-labelWrapper | Contains `label`, `description` and `error` |
| label | .mantine-Radio-label | Label element |
| description | .mantine-Radio-description | Description displayed below the label |
| error | .mantine-Radio-error | Error message displayed below the label |

**Radio CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --radio-color | Controls checked radio `background-color` |
| root | --radio-radius | Controls radio `border-radius` |
| root | --radio-size | Controls radio `width` and `height` |
| root | --radio-icon-color | Controls radio icon `color` |
| root | --radio-icon-size | Controls radio icon `width` and `height` |

**Radio data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| radio | data-error | `error` prop is set | - |
| inner | data-label-position | - | Value of `labelPosition` prop |

**Radio.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-RadioGroup-root | Root element |
| label | .mantine-RadioGroup-label | Label element |
| required | .mantine-RadioGroup-required | Required asterisk element, rendered inside label |
| description | .mantine-RadioGroup-description | Description element |
| error | .mantine-RadioGroup-error | Error element |

**Radio.Indicator selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| indicator | .mantine-RadioIndicator-indicator | Root element |
| icon | .mantine-RadioIndicator-icon | Radio icon |

**Radio.Indicator CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| indicator | --radio-color | Controls checked radio `background-color` |
| indicator | --radio-radius | Controls radio `border-radius` |
| indicator | --radio-size | Controls radio `width` and `height` |
| indicator | --radio-icon-color | Controls radio icon `color` |
| indicator | --radio-icon-size | Controls radio icon `width` and `height` |

**Radio.Indicator data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| indicator | data-checked | `checked` prop is set | - |
| indicator | data-disabled | `disabled` prop is set | - |

**Radio.Card selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| card | .mantine-RadioCard-card | Root element |

**Radio.Card CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| card | --card-radius | Controls card `border-radius` |

**Radio.Card data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| card | data-checked | `checked` prop is set | - |
| card | data-with-border | `withBorder` prop is set | - |


--------------------------------------------------------------------------------

### RangeSlider
Package: @mantine/core
Import: import { RangeSlider } from '@mantine/core';
Description: RangeSlider component

## Usage

```tsx
import { RangeSlider } from '@mantine/core';


function Demo() {
  return (
    <RangeSlider
       color="blue" size="md" radius="xl" showLabelOnHover={true} labelAlwaysOn={false}
      defaultValue={[20, 60]}
      marks={[
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
      ]}
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { RangeSlider } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<[number, number]>([20, 80]);
  return <RangeSlider value={value} onChange={setValue} />;
}
```

## Uncontrolled

`RangeSlider` can be used with uncontrolled forms the same way as a native input element.
Set the `name` attribute to include range slider value in `FormData` object on form submission.
To control the initial value in uncontrolled forms, use the `defaultValue` prop.

Example usage of uncontrolled `RangeSlider` with `FormData`:

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Range slider value:', formData.get('range'));
      }}
    >
      <RangeSlider
        name="range"
        defaultValue={[20, 80]}
        min={0}
        max={100}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Disabled

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return <RangeSlider defaultValue={[20, 60]} disabled />;
}
```


## Control label

To change the label behavior and appearance, set the following props:

* `label` – formatter function, accepts value as an argument, set to null to disable the label, defaults to `f => f`
* `labelAlwaysOn` – if true, the label will always be displayed; by default the label is visible only when the user is dragging
* `labelTransitionProps` – props passed down to the [Transition](https://mantine.dev/llms/core-transition.md) component, can be used to customize the label animation

```tsx
import { RangeSlider, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text size="sm">No label</Text>
      <RangeSlider defaultValue={[20, 60]} label={null} />

      <Text size="sm" mt="xl">Formatted label</Text>
      <RangeSlider defaultValue={[20, 60]} label={(value) => `${value} °C`} />

      <Text size="sm" mt="xl">Label always visible</Text>
      <RangeSlider defaultValue={[20, 60]} labelAlwaysOn />

      <Text size="sm" mt="xl">Custom label transition</Text>
      <RangeSlider
        defaultValue={40}
        labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}
      />
    </>
  );
}
```


## Min, max and step

```tsx
import { RangeSlider, Text } from '@mantine/core';

const marks = [{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }];

function Demo() {
  return (
    <>
      <Text>Decimal step</Text>
      <RangeSlider minRange={2} defaultValue={[0, 10]} min={-10} max={10} step={0.1} />

      <Text mt="md">Step matched with marks</Text>
      <RangeSlider defaultValue={[50, 75]} step={25} marks={marks} />
    </>
  );
}
```


## Domain

By default, `min` and `max` values define the possible range of values.
The `domain` prop allows setting the possible range of values independently of the
`min` and `max` values:

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return (
    <RangeSlider
      domain={[0, 100]}
      min={10}
      max={90}
      defaultValue={[25, 75]}
      marks={[
        { value: 10, label: 'min' },
        { value: 90, label: 'max' },
      ]}
    />
  );
}
```


## Decimal values

To use `RangeSlider` with decimal values, set the `min`, `max`, and `step` props:

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return <RangeSlider min={0} max={1} minRange={0.2} step={0.0005} defaultValue={[0.2, 0.8]} />;
}
```


## minRange

Use the `minRange` prop to control the minimum range between `from` and `to` values
in `RangeSlider`. The default value is `10`. This ensures the thumbs must be at least
the specified distance apart:

```tsx
import { RangeSlider, Text } from '@mantine/core';
import { useState } from 'react';

function Demo() {
  const [value, setValue] = useState<[number, number]>([30, 60]);

  return (
    <>
      <Text size="sm" mb="xs">
        Minimum range: 20 (thumbs must be at least 20 units apart)
      </Text>
      <RangeSlider
        value={value}
        onChange={setValue}
        minRange={20}
      />
      <Text size="sm" mt="xs">
        Value: [{value[0]}, {value[1]}] - Range: {value[1] - value[0]}
      </Text>
    </>
  );
}
```


## maxRange

Use the `maxRange` prop to control the maximum range between `from` and `to` values.
This limits how wide the selection can be. By default, `maxRange` is set to `Infinity`:

```tsx
import { RangeSlider, Text } from '@mantine/core';
import { useState } from 'react';

function Demo() {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <>
      <Text size="sm" mb="xs">
        Maximum range: 50 (selection cannot be wider than 50 units)
      </Text>
      <RangeSlider
        value={value}
        onChange={setValue}
        maxRange={50}
      />
      <Text size="sm" mt="xs">
        Value: [{value[0]}, {value[1]}] - Range: {value[1] - value[0]}
      </Text>
    </>
  );
}
```


## pushOnOverlap

The `pushOnOverlap` prop controls whether the thumbs should push each other when they overlap.
By default, `pushOnOverlap` is `true`. If you want to disable this behavior, set it to `false`.

Example of `pushOnOverlap={false}`:

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return <RangeSlider pushOnOverlap={false} defaultValue={[25, 65]} minRange={20} />;
}
```


## Marks

Add any number of marks to the slider by setting the `marks` prop to an array of objects:

```tsx
const marks = [
  { value: 20 }, // -> displays mark on slider track
  { value: 40, label: '40%' }, // -> adds mark label below slider track
];
```

Note that mark value is relative to slider value, not width:

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return (
    <>
      <RangeSlider
        defaultValue={[20, 60]}
        marks={[{ value: 10 }, { value: 40 }, { value: 95 }]}
        mb={32}
      />

      <RangeSlider
        mb={32}
        defaultValue={[20, 60]}
        marks={[
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 80, label: '80%' },
        ]}
      />
    </>
  );
}
```


## Restrict selection to marks

Set `restrictToMarks` prop to restrict slider value to marks only. Note that in
this case `step` prop is ignored:

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return (
    <RangeSlider
      restrictToMarks
      defaultValue={[5, 15]}
      marks={[
        { value: 5 },
        { value: 15 },
        { value: 25 },
        { value: 35 },
        { value: 70 },
        { value: 80 },
        { value: 90 },
      ]}
    />
  );
}
```


## Inverted

You can invert the track with the `inverted` prop:

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return <RangeSlider inverted defaultValue={[20, 60]} />;
}
```


## Hidden marks

Hidden marks allow you to snap to specific values without displaying them visually on the track.
This is useful when you want to create a "sticky" snapping behavior to certain values that
you don't want to show to the user. Use this feature together with `restrictToMarks` prop:

```tsx
import { RangeSlider, Text, Box } from '@mantine/core';
import { useState } from 'react';

function Demo() {
  const [value, setValue] = useState<[number, number]>([25, 75]);

  return (
    <Box pb="md">
      <Text size="sm" mb="xs">
        Hidden marks allow you to snap to specific values without displaying them visually. Current
        value: [{value[0]}, {value[1]}]
      </Text>
      <RangeSlider
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
        minRange={10}
        restrictToMarks
        marks={[
          { value: 0, label: '0%' },
          { value: 20, hidden: true },
          { value: 40, hidden: true },
          { value: 50, label: '50%' },
          { value: 60, hidden: true },
          { value: 80, hidden: true },
          { value: 100, label: '100%' },
        ]}
      />
    </Box>
  );
}
```


## Accessibility

`RangeSlider` component is accessible by default:

* Thumbs are focusable
* When the user uses mouse to interact with the slider, focus is moved to the slider track, when the user presses arrows focus is moved to the thumb
* Value can be changed with arrows with step increment/decrement

To label component for screen readers, add labels to thumbs:

```tsx
import { RangeSlider } from '@mantine/core';

function Demo() {
  return (
    <RangeSlider
      thumbFromLabel="First thumb aria-label"
      thumbToLabel="Second thumb aria-label"
    />
  );
}
```

## Keyboard interactions


#### Props

**RangeSlider props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color, controls color of track and thumb |
| defaultValue | RangeSliderValue | - | Uncontrolled component default value |
| disabled | boolean | - | Disables slider |
| domain | [number, number] | - | Domain of the slider, defines the selectable value range independently of min/max. Useful when you want to display a wider track range (min/max) but restrict actual selection to a subset (domain). |
| hiddenInputProps | React.ComponentProps<"input"> | - | Props passed down to the hidden input |
| inverted | boolean | - | Determines whether track values representation should be inverted |
| label | ReactNode \| ((value: number) => ReactNode) | - | Function to generate label or any react node to render instead, set to null to disable label |
| labelAlwaysOn | boolean | - | Determines whether the label should be visible when the slider is not being dragged or hovered |
| labelTransitionProps | TransitionProps | - | Props passed down to the `Transition` component |
| marks | SliderMark[] | - | Marks displayed on the track |
| max | number | - | Maximum possible value |
| maxRange | number | - | Maximum range interval |
| min | number | - | Minimal possible value |
| minRange | number | - | Minimal range interval between the two thumbs. Consider this value relative to the total range (max - min). |
| name | string | - | Hidden input name, use with uncontrolled component |
| onChange | (value: RangeSliderValue) => void | - | Called when value changes |
| onChangeEnd | (value: RangeSliderValue) => void | - | Called when user stops dragging slider or changes value with arrows |
| orientation | "horizontal" \| "vertical" | - | Slider orientation |
| precision | number | - | Number of significant digits after the decimal point |
| pushOnOverlap | boolean | - | Determines whether the other thumb should be pushed by the current thumb dragging when `minRange`/`maxRange` is reached |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| restrictToMarks | boolean | - | Determines whether the selection should be only allowed from the given marks array |
| scale | (value: number) => number | - | A transformation function to change the scale of the slider |
| showLabelOnHover | boolean | - | Determines whether the label should be displayed when the slider is hovered |
| size | MantineSize \| number | - | Controls size of the track |
| step | number | - | Number by which value will be incremented/decremented with thumb drag and arrows |
| thumbChildren | React.ReactNode | - | Content rendered inside thumb |
| thumbFromLabel | string | - | First thumb `aria-label` |
| thumbLabel | string | - | `aria-label` for both thumbs (overridden by thumbFromLabel/thumbToLabel if provided) |
| thumbProps | (index: 0 \| 1) => DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> | - | Props passed down to thumb element based on the thumb index |
| thumbSize | string \| number | - | Thumb `width` and `height`, by default value is computed based on `size` prop |
| thumbToLabel | string | - | Second thumb `aria-label` |
| value | RangeSliderValue | - | Controlled component value |


--------------------------------------------------------------------------------

### Rating
Package: @mantine/core
Import: import { Rating } from '@mantine/core';
Description: Pick and display rating

## Usage

```tsx
import { Rating } from '@mantine/core';

function Demo() {
  return <Rating defaultValue={2} color="yellow" size="md" count={5} highlightSelectedOnly={false} />
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Rating } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(0);
  return <Rating value={value} onChange={setValue} />;
}
```

## Uncontrolled

`Rating` can be used with uncontrolled forms the same way as a native input element.
Set the `name` attribute to include rating value in `FormData` object on form submission.
To control the initial value in uncontrolled forms, use the `defaultValue` prop.

Example usage of uncontrolled `Rating` with `FormData`:

```tsx
import { Rating } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Rating value:', formData.get('rating'));
      }}
    >
      <Rating name="rating" defaultValue={0} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Read only

```tsx
import { Rating } from '@mantine/core';

function Demo() {
  return <Rating value={3.5} fractions={2} readOnly />;
}
```


## Allow clear

Set `allowClear` prop to allow users to reset the rating to 0 by clicking the same rating value again.
This is useful when you want to give users the ability to undo their rating selection:

```tsx
import { useState } from 'react';
import { Group, Rating, Stack, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(3);

  return (
    <Stack gap="md" align="center">
      <Text size="sm">Click the same star to clear the rating</Text>
      <Rating value={value} onChange={setValue} allowClear />
      <Group gap="xs">
        <Text size="sm" c="dimmed">
          Current rating:
        </Text>
        <Text size="sm" fw={600}>
          {value === 0 ? 'Not rated' : value}
        </Text>
      </Group>
    </Stack>
  );
}
```


## Fractions

```tsx
import { Rating, Group, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Group>
        <div>Fractions: 2</div>
        <Rating fractions={2} defaultValue={1.5} />
      </Group>
      <Group>
        <div>Fractions: 3</div>
        <Rating fractions={3} defaultValue={2.33333333} />
      </Group>
      <Group>
        <div>Fractions: 4</div>
        <Rating fractions={4} defaultValue={3.75} />
      </Group>
    </Stack>
  );
}
```


## Custom symbol

```tsx
import { Rating } from '@mantine/core';
import { SunIcon, MoonIcon } from '@phosphor-icons/react';

function Demo() {
  return <Rating emptySymbol={<SunIcon size={16} />} fullSymbol={<MoonIcon size={16} />} />;
}
```


## Symbols for each item

```tsx
import { Rating } from '@mantine/core';
import { SmileySadIcon, SmileyNervousIcon, SmileyIcon, SmileyMehIcon, SmileyWinkIcon } from '@phosphor-icons/react';

const getIconStyle = (color?: string) => ({
  width: 24,
  height: 24,
  color: color ? `var(--mantine-color-${color}-7)` : undefined,
});

const getEmptyIcon = (value: number) => {
  const iconStyle = getIconStyle();

  switch (value) {
    case 1:
      return <SmileySadIcon style={iconStyle} />;
    case 2:
      return <SmileyNervousIcon style={iconStyle} />;
    case 3:
      return <SmileyIcon style={iconStyle} />;
    case 4:
      return <SmileyMehIcon style={iconStyle} />;
    case 5:
      return <SmileyWinkIcon style={iconStyle} />;
    default:
      return null;
  }
};

const getFullIcon = (value: number) => {
  switch (value) {
    case 1:
      return <SmileySadIcon style={getIconStyle('red')} />;
    case 2:
      return <SmileyNervousIcon style={getIconStyle('orange')} />;
    case 3:
      return <SmileyIcon style={getIconStyle('yellow')} />;
    case 4:
      return <SmileyMehIcon style={getIconStyle('lime')} />;
    case 5:
      return <SmileyWinkIcon style={getIconStyle('green')} />;
    default:
      return null;
  }
};

function Demo() {
  return <Rating emptySymbol={getEmptyIcon} fullSymbol={getFullIcon} highlightSelectedOnly />;
}
```



#### Props

**Rating props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowClear | boolean | - | When true, clicking the same rating value clears the rating to 0, default is false |
| color | MantineColor | - | Key of theme.colors or any CSS color value, default is 'yellow' |
| count | number | - | Number of rating items (stars), default is 5 |
| defaultValue | number | - | Uncontrolled component default value |
| emptySymbol | ReactNode \| ((value: number) => ReactNode) | - | Icon displayed for unselected rating items. Can be a function that receives the rating value. |
| fractions | number | - | Number of fractions each item can be divided into, default is 1 |
| fullSymbol | ReactNode \| ((value: number) => ReactNode) | - | Icon displayed for selected rating items. Can be a function that receives the rating value. |
| getSymbolLabel | (index: number) => string | - | Function to generate aria-label for each rating value. Receives the rating value as argument, default is (value) => String(value) |
| highlightSelectedOnly | boolean | - | When true, only the clicked rating item is highlighted, not all items up to the selected value, default is false |
| name | string | - | Name attribute for form submission. If not provided, a unique id will be generated. |
| onChange | (value: number) => void | - | Called when value changes |
| onHover | (value: number) => void | - | Called when rating item is hovered. Receives -1 when hover ends. |
| readOnly | boolean | - | When true, rating cannot be changed by user interaction, default is false |
| size | MantineSize \| number | - | Controls component size |
| value | number | - | Controlled component value |


#### Styles API

Rating component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Rating selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Rating-root | Root element |
| starSymbol | .mantine-Rating-starSymbol | Symbol element (star icon by default, or custom symbol) |
| input | .mantine-Rating-input | Item input, hidden by default |
| label | .mantine-Rating-label | Item label, used to display star icon |
| symbolBody | .mantine-Rating-symbolBody | Wrapper around star icon, used for clip-path masking in fractional ratings |
| symbolGroup | .mantine-Rating-symbolGroup | Container for all fractional symbols of a single rating unit |

**Rating CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --rating-color | Controls filled star icon color |

**Rating data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| label | data-read-only | `readOnly` prop is set | - |
| input | data-active | Input value is the same as component value | - |
| symbolGroup | data-active | Symbol group is being hovered | - |
| starSymbol | data-filled | Associated input value is less or equal to the component value | - |


--------------------------------------------------------------------------------

### RingProgress
Package: @mantine/core
Import: import { RingProgress } from '@mantine/core';
Description: Give user feedback for status of the task with circle diagram

## Usage

The `sections` prop accepts an array of objects with the following properties:

* `value` – number between 0 and 100 representing the percentage of the ring to fill
* `color` – segment color from theme.colors or any CSS color value
* `tooltip` (optional) – React node to display when hovering over the section
* Any valid SVG `<circle>` element props (onClick, onMouseEnter, style, etc.)

**Note:** Section values should sum to 100% or less for expected behavior. Values exceeding 100% total will cause sections to overlap.

```tsx
import { RingProgress, Text } from '@mantine/core';

function Demo() {
  return (
    <RingProgress
      label={
        <Text size="xs" ta="center">
          Application data usage
        </Text>
      }
      sections={[
        { value: 40, color: 'cyan' },
        { value: 15, color: 'orange' },
        { value: 15, color: 'grape' },
      ]}
    />
  );
}
```


## Size, thickness & rounded caps

Use the `size`, `thickness` & `roundCaps` props to configure the RingProgress size and thickness values:

```tsx
import { RingProgress } from '@mantine/core';

function Demo() {
  return (
    <RingProgress
       size={120} thickness={12} roundCaps={true}
      sections={[
        { value: 40, color: 'cyan' },
        { value: 15, color: 'orange' },
        { value: 15, color: 'grape' },
      ]}
    />
  )
}
```


## Sections tooltips

Add a `tooltip` property to a section to display a floating [Tooltip](https://mantine.dev/llms/core-tooltip.md) when the user hovers over it:

```tsx
import { RingProgress, Text } from '@mantine/core';

function Demo() {
  return (
    <RingProgress
      size={170}
      thickness={16}
      label={
        <Text size="xs" ta="center" px="xs" style={{ pointerEvents: 'none' }}>
          Hover sections to see tooltips
        </Text>
      }
      sections={[
        { value: 40, color: 'cyan', tooltip: 'Documents – 40 Gb' },
        { value: 25, color: 'orange', tooltip: 'Apps – 25 Gb' },
        { value: 15, color: 'grape', tooltip: 'Other – 15 Gb' },
      ]}
    />
  );
}
```


## Section gaps

Use the `sectionGap` prop to add visual separation between sections. The gap is specified in degrees:

```tsx
import { RingProgress, Stack, Text } from '@mantine/core';

function Demo() {
  const sections = [
    { value: 40, color: 'cyan' },
    { value: 25, color: 'orange' },
    { value: 15, color: 'grape' },
  ];

  return (
    <Stack align="center">
      <div>
        <Text size="sm" ta="center" mb="xs">
          No gap (default)
        </Text>
        <RingProgress sections={sections} />
      </div>

      <div>
        <Text size="sm" ta="center" mb="xs">
          5° gap
        </Text>
        <RingProgress sections={sections} sectionGap={5} />
      </div>

      <div>
        <Text size="sm" ta="center" mb="xs">
          10° gap
        </Text>
        <RingProgress sections={sections} sectionGap={10} />
      </div>
    </Stack>
  );
}
```


## Start angle

Use the `startAngle` prop to control where the progress starts. The angle is specified in degrees,
where `0` = right, `90` = bottom, `180` = left, and `270` = top (default):

```tsx
import { Group, RingProgress, Stack, Text } from '@mantine/core';

function Demo() {
  const sections = [{ value: 40, color: 'cyan' }];

  return (
    <Group justify="center">
      <Stack align="center" gap="xs">
        <RingProgress sections={sections} startAngle={0} />
        <Text size="sm">0° (right)</Text>
      </Stack>

      <Stack align="center" gap="xs">
        <RingProgress sections={sections} startAngle={90} />
        <Text size="sm">90° (bottom)</Text>
      </Stack>

      <Stack align="center" gap="xs">
        <RingProgress sections={sections} startAngle={180} />
        <Text size="sm">180° (left)</Text>
      </Stack>

      <Stack align="center" gap="xs">
        <RingProgress sections={sections} startAngle={270} />
        <Text size="sm">270° (top)</Text>
      </Stack>
    </Group>
  );
}
```


## Background color

Use the `rootColor` prop to customize the color of the unfilled portion of the ring (the background):

```tsx
import { RingProgress } from '@mantine/core';

function Demo() {
  return <RingProgress sections={[{ value: 40, color: 'yellow' }]} rootColor="red" />;
}
```


## Section events

Each section can receive any valid SVG `<circle>` element props, including event handlers like `onClick`, `onMouseEnter`, and `onMouseLeave`:

```tsx
import { useState } from 'react';
import { RingProgress, Text } from '@mantine/core';

function Demo() {
  const [hovered, setHovered] = useState(-1);
  const reset = () => setHovered(-1);
  return (
    <>
      <RingProgress
        onMouseLeave={() => setHovered(-1)}
        size={140}
        sections={[
          { value: 40, color: 'cyan', onMouseEnter: () => setHovered(0), onMouseLeave: reset },
          { value: 20, color: 'blue', onMouseEnter: () => setHovered(1), onMouseLeave: reset },
          { value: 15, color: 'indigo', onMouseEnter: () => setHovered(2), onMouseLeave: reset },
        ]}
      />
      <Text>Hovered section: {hovered === -1 ? 'none' : hovered}</Text>
    </>
  );
}
```


## Customize label

You can add any React node as a label, for example a [Text](https://mantine.dev/llms/core-text.md) component with custom styling
or an [ActionIcon](https://mantine.dev/llms/core-action-icon.md):

```tsx
import { ActionIcon, RingProgress, Text, Center } from '@mantine/core';
import { CheckIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <RingProgress
        sections={[{ value: 40, color: 'blue' }]}
        label={
          <Text c="blue" fw={700} ta="center" size="xl">
            40%
          </Text>
        }
      />

      <RingProgress
        sections={[{ value: 100, color: 'teal' }]}
        label={
          <Center>
            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
              <CheckIcon size={22} />
            </ActionIcon>
          </Center>
        }
      />
    </>
  );
}
```


## Filled segment transition

By default, transitions are disabled. To enable them, set the `transitionDuration` prop
to a number of milliseconds:

```tsx
import { useState } from 'react';
import { Button, RingProgress, Stack, Text } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(30);

  return (
    <Stack align="center">
      <RingProgress
        sections={[{ value, color: 'blue' }]}
        transitionDuration={250}
        label={<Text ta="center">{value}%</Text>}
      />

      <Button onClick={() => setValue(Math.floor(Math.random() * 100))}>Set random value</Button>
    </Stack>
  );
}
```



#### Props

**RingProgress props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | React.ReactNode | - | Label displayed in the center of the ring |
| rootColor | MantineColor | - | Color of the unfilled portion of the ring (background). Defaults to gray-2 in light mode, dark-4 in dark mode |
| roundCaps | boolean | - | Applies rounded line caps to the start and end of visible sections |
| sectionGap | number | - | Gap between sections in degrees. Reduces the visual size of each section |
| sections | RingProgressSection[] | required | Array of sections to display in the ring. Each section should have a `value` (0-100), `color`, and optional `tooltip`. Sections can also receive any valid SVG circle element props. |
| size | number | - | Width and height of the progress ring |
| startAngle | number | - | Starting angle in degrees. 0 = right, 90 = bottom, 180 = left, 270 = top |
| thickness | number | - | Ring thickness in pixels. Cannot exceed size / 4 and will be automatically clamped if necessary |
| transitionDuration | number | - | Transition duration in milliseconds for section value and color changes |


#### Styles API

RingProgress component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**RingProgress selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-RingProgress-root | Root container element |
| svg | .mantine-RingProgress-svg | SVG element containing all ring sections |
| curve | .mantine-RingProgress-curve | Individual ring section (circle element) |
| label | .mantine-RingProgress-label | Label displayed in the center of the ring |

**RingProgress CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --rp-label-offset | Controls horizontal spacing between label and ring edges |
| root | --rp-size | Controls width and height of the entire component |
| root | --rp-transition-duration | Controls animation duration for value and color changes |


--------------------------------------------------------------------------------

### ScrollArea
Package: @mantine/core
Import: import { ScrollArea } from '@mantine/core';
Description: Area with custom scrollbars

## Usage

The `ScrollArea` component supports the following props:

* `type` defines scrollbars behavior:
  * `hover` – scrollbars are visible on hover
  * `scroll` – scrollbars are visible on scroll
  * `auto` – similar to `overflow: auto` – scrollbars are always visible when the content is overflowing
  * `always` – same as `auto`, but scrollbars are always visible regardless of whether the content is overflowing
  * `never` – scrollbars are always hidden
* `offsetScrollbars` – adds padding to offset scrollbars with the following options:
  * `true` – adds padding to offset both scrollbars
  * `x` – adds padding to offset horizontal scrollbar only
  * `y` – adds padding to offset vertical scrollbar only
  * `present` – adds padding only when scrollbars are visible
* `scrollbarSize` – scrollbar size, controls scrollbar and thumb width/height
* `scrollHideDelay` – delay in ms to hide scrollbars, applicable only when type is `hover` or `scroll`
* `overscrollBehavior` – controls [overscroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior) of the viewport

```tsx
import { ScrollArea } from '@mantine/core';

function Demo() {
  return (
    <ScrollArea h={250} type="hover" offsetScrollbars={false} overscrollBehavior="auto" scrollbarSize={10} scrollHideDelay={1000}>
      {/* ... content */}
    </ScrollArea>
  );
}
```


## Horizontal scrollbars

```tsx
import { ScrollArea, Box } from '@mantine/core';

function Demo() {
  return (
    <ScrollArea w={300} h={200}>
      <Box w={600}>
        {/* ... content */}
      </Box>
    </ScrollArea>
  );
}
```


## Disable horizontal scrollbars

To disable horizontal scrollbars, set the `scrollbars="y"` prop:

```tsx
import { ScrollArea, Box } from '@mantine/core';

function Demo() {
  return (
    <ScrollArea w={300} h={200} scrollbars="y">
      <Box w={600}>
        {/* ... content */}
      </Box>
    </ScrollArea>
  );
}
```


## Subscribe to scroll position changes

Set the `onScrollPositionChange` function to subscribe to scroll position changes.
It will be called each time the user scrolls with x and y coordinates:

```tsx
import { useState } from 'react';
import { Text, ScrollArea, Code, Box } from '@mantine/core';

function Demo() {
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  return (
    <>
      <ScrollArea
        w={300}
        h={200}
        onScrollPositionChange={onScrollPositionChange}
      >
        <Box w={600}>
          {/* ... content */}
        </Box>
      </ScrollArea>

      <Text>
        Scroll position: <Code>{`{ x: ${scrollPosition.x}, y: ${scrollPosition.y} }`}</Code>
      </Text>
    </>
  );
}
```


## Scroll boundary callbacks

`ScrollArea` component supports callbacks that are triggered when scrolling reaches boundaries:

```tsx
import { useState } from 'react';
import { Badge, Box, Group, ScrollArea, Stack, Text } from '@mantine/core';

function Demo() {
  const [topReached, setTopReached] = useState(0);
  const [bottomReached, setBottomReached] = useState(0);
  const [leftReached, setLeftReached] = useState(0);
  const [rightReached, setRightReached] = useState(0);

  return (
    <Stack align="center">
      <Group>
        <Badge color="blue">Top: {topReached}</Badge>
        <Badge color="green">Bottom: {bottomReached}</Badge>
        <Badge color="orange">Left: {leftReached}</Badge>
        <Badge color="grape">Right: {rightReached}</Badge>
      </Group>

      <ScrollArea
        h={200}
        w={300}
        onTopReached={() => setTopReached((c) => c + 1)}
        onBottomReached={() => setBottomReached((c) => c + 1)}
        onLeftReached={() => setLeftReached((c) => c + 1)}
        onRightReached={() => setRightReached((c) => c + 1)}
      >
        <Box w={600}>
          {Array(50)
            .fill(0)
            .map((_, i) => (
              <Text key={i}>
                Line {i + 1} - This is a long line that requires horizontal scrolling
              </Text>
            ))}
        </Box>
      </ScrollArea>
    </Stack>
  );
}
```


## Scroll to position

To programmatically scroll to any position,
get the viewport element ref with the `viewportRef` prop and call the `scrollTo` method:

```tsx
import { useRef } from 'react';
import { ScrollArea, Button, Stack, Group } from '@mantine/core';

function Demo() {
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });

  const scrollToCenter = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight / 2, behavior: 'smooth' });

  const scrollToTop = () => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Stack align="center">
      <ScrollArea w={300} h={200} viewportRef={viewport}>
        {/* ... content */}
      </ScrollArea>

      <Group justify="center">
        <Button onClick={scrollToBottom}>Scroll to bottom</Button>
        <Button onClick={scrollToCenter}>Scroll to center</Button>
        <Button onClick={scrollToTop}>Scroll to top</Button>
      </Group>
    </Stack>
  );
}
```


## Start scroll position

Use the `startScrollPosition` prop to set the initial scroll position when the component mounts.
Unlike using `viewportRef` with `useEffect`, this approach avoids the flash of content at position (0, 0):

```tsx
import { ScrollArea } from '@mantine/core';

function Demo() {
  return (
    <ScrollArea h={200} startScrollPosition={{ y: 250 }}>
      {/* ... content */}
    </ScrollArea>
  );
}
```


## Styles API

```tsx
// Demo.tsx
import { ScrollArea, Box } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <ScrollArea w={300} h={200} type="always" offsetScrollbars classNames={classes}>
      <Box w={600}>
        {/* ... content */}
      </Box>
    </ScrollArea>
  );
}

// Demo.module.css
.scrollbar {
  &,
  &:hover {
    background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  }

  &[data-orientation='vertical'] .thumb {
    background-color: var(--mantine-color-red-6);
  }

  &[data-orientation='horizontal'] .thumb {
    background-color: var(--mantine-color-blue-6);
  }
}

.corner {
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  opacity: 1;
}
```


