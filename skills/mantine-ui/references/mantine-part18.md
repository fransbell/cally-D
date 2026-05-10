## Dropdown animation

By default, dropdown animations are disabled. To enable them, you can set `transitionProps`,
which will be passed down to the underlying [Transition](https://mantine.dev/llms/core-transition.md) component.

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    />
  );
}
```


## Dropdown padding

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <>
      <Select
        label="Zero padding"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <Select
        mt="md"
        label="10px padding"
        placeholder="Pick value"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        comboboxProps={{ dropdownPadding: 10 }}
      />
    </>
  );
}
```


## Dropdown shadow

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ shadow: 'md' }}
    />
  );
}
```


## Input sections

Select supports left and right sections to display icons, buttons or other content alongside the input.

```tsx
import { Select } from '@mantine/core';
import { SquaresFourIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <SquaresFourIcon size={16} />;
  return (
    <>
      <Select
        data={['React', 'Angular', 'Vue']}
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Your favorite library"
        placeholder="Your favorite library"
      />
      <Select
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

Select component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. Select documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { Select } from '@mantine/core';


function Demo() {
  return (
    <Select
       variant="default" size="sm" radius="md" label="Input label" withAsterisk={false} description="Input description" error=""
      placeholder="Select placeholder"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
```


## Read only

Set `readOnly` to make the input read only. When `readOnly` is set,
`Select` will not show suggestions and will not call the `onChange` function.

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      readOnly
    />
  );
}
```


## Disabled

Set `disabled` to disable the input. When `disabled` is set,
the user cannot interact with the input and `Select` will not show suggestions.

```tsx
import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      disabled
    />
  );
}
```



#### Props

**Select props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | Allows deselecting the selected option by clicking it |
| autoSelectOnBlur | boolean | - | Automatically selects the highlighted option when input loses focus |
| checkIconPosition | "left" \| "right" | - | Position of the check icon relative to the option label |
| chevronColor | MantineColor | - | Controls color of the default chevron, by default depends on the color scheme |
| clearButtonProps | InputClearButtonProps | - | Props passed down to the clear button |
| clearSectionMode | ClearSectionMode | - | Determines how the clear button and rightSection are rendered |
| clearable | boolean | - | Displays clear button in the right section when component has value |
| comboboxProps | ComboboxProps | - | Props passed down to `Combobox` component |
| data | ComboboxData<Value> | - | Data used to generate options. Values must be unique, otherwise an error will be thrown and component will not render. |
| defaultDropdownOpened | boolean | - | Uncontrolled dropdown initial opened state |
| defaultSearchValue | string | - | Default search value |
| defaultValue | Primitive \| null | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of `Input.Description` component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps | - | Props passed down to the `Input.Description` component |
| disabled | boolean | - | Sets `disabled` attribute on the `input` element |
| dropdownOpened | boolean | - | Controlled dropdown opened state |
| error | React.ReactNode | - | Contents of `Input.Error` component. If not set, error is not displayed. |
| errorProps | InputErrorProps | - | Props passed down to the `Input.Error` component |
| filter | OptionsFilter<Value> | - | Function based on which items are filtered and sorted |
| hiddenInputProps | Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "value"> | - | Props passed down to the hidden input |
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
| nothingFoundMessage | React.ReactNode | - | Message displayed when no options match the search query or when there is no data |
| onChange | (value: Value \| null, option: ComboboxItem<Value>) => void | - | Called when value changes |
| onClear | () => void | - | Called when the clear button is clicked |
| onDropdownClose | () => void | - | Called when dropdown closes |
| onDropdownOpen | () => void | - | Called when dropdown opens |
| onOptionSubmit | (value: Value) => void | - | Called when option is submitted from dropdown with mouse click or `Enter` key |
| onSearchChange | (value: string) => void | - | Called when search changes |
| openOnFocus | boolean | - | Opens dropdown when input receives focus (requires searchable={true}) |
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| renderOption | (item: ComboboxLikeRenderOptionInput<ComboboxItem<Value>>) => ReactNode | - | A function to render content of the option, replaces the default content of the option |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| scrollAreaProps | ScrollAreaProps | - | Props passed down to the underlying `ScrollArea` component in the dropdown |
| searchValue | string | - | Controlled search value |
| searchable | boolean | - | Determines whether the select should be searchable |
| selectFirstOptionOnChange | boolean | - | If set, the first option is selected when value changes, `false` by default |
| selectFirstOptionOnDropdownOpen | boolean | - | If set, the first option is selected when dropdown opens, `false` by default |
| size | MantineSize | - | Controls input `height`, horizontal `padding`, and `font-size` |
| value | Primitive \| null | - | Controlled component value |
| withAlignedLabels | boolean | - | Aligns unchecked labels with the checked one |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withCheckIcon | boolean | - | Displays check icon near the selected option label |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| withScrollArea | boolean | - | Determines whether the options should be wrapped with `ScrollArea.AutoSize`, `true` by default |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

Select component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Select selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Select-wrapper | Root element of the Input |
| input | .mantine-Select-input | Input element |
| section | .mantine-Select-section | Left and right sections |
| root | .mantine-Select-root | Root element |
| label | .mantine-Select-label | Label element |
| required | .mantine-Select-required | Required asterisk element, rendered inside label |
| description | .mantine-Select-description | Description element |
| error | .mantine-Select-error | Error element |

**Select data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| option | data-combobox-selected | Option is selected | - |
| option | data-combobox-active | Options was activated by keyboard | - |
| option | data-combobox-disabled | Option is disabled | - |


--------------------------------------------------------------------------------

### SemiCircleProgress
Package: @mantine/core
Import: import { SemiCircleProgress } from '@mantine/core';
Description: Represent progress with semi circle diagram

## Usage

```tsx
import { SemiCircleProgress } from '@mantine/core';


function Demo() {
  return (
    <SemiCircleProgress
       fillDirection="left-to-right" orientation="up" filledSegmentColor="blue" size={200} thickness={12} value={40}
      label="Label"
    />
  );
}
```


## Change empty segment color

Use `emptySegmentColor` prop to change color of empty segment,
it accepts key of `theme.colors` or any valid CSS color value:

```tsx
import { SemiCircleProgress } from '@mantine/core';

function Demo() {
  return <SemiCircleProgress value={30} emptySegmentColor="var(--mantine-color-dimmed)" />;
}
```


## Change label position

By default, the label is displayed at the bottom of the component,
you can change its position to `center` by using `labelPosition` prop:

```tsx
import { SemiCircleProgress } from '@mantine/core';

function Demo() {
  return (
    <>
      <SemiCircleProgress value={30} label="Bottom" mb="xl" />
      <SemiCircleProgress value={30} label="Center" labelPosition="center" />
    </>
  );
}
```


## Filled segment transition

By default, transitions are disabled, to enable them, set `transitionDuration` prop
to a number of milliseconds:

```tsx
import { useState } from 'react';
import { Button, SemiCircleProgress } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(30);

  return (
    <>
      <SemiCircleProgress value={value} transitionDuration={250} label={`${value}%`} />

      <Button onClick={() => setValue(Math.floor(Math.random() * 100))} mt="xl" fullWidth>
        Set random value
      </Button>
    </>
  );
}
```



#### Props

**SemiCircleProgress props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| emptySegmentColor | MantineColor | - | Key of `theme.colors` or any valid CSS color value |
| fillDirection | "right-to-left" \| "left-to-right" | - | Direction from which the circle is filled |
| filledSegmentColor | MantineColor | - | Key of `theme.colors` or any valid CSS color value |
| label | React.ReactNode | - | Label rendered inside the circle |
| labelPosition | "center" \| "bottom" | - | Label position relative to the circle center |
| orientation | "up" \| "down" | - | Orientation of the circle |
| size | number | - | Width of the component and diameter of the full circle in px. The visible SVG height will be size/2 |
| thickness | number | - | Stroke width of the circle segments in px |
| transitionDuration | number | - | Transition duration for the filled segment progress changes in ms. Does not affect color transitions |
| value | number | required | Progress value from `0` to `100` |


#### Styles API

SemiCircleProgress component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**SemiCircleProgress selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-SemiCircleProgress-root | Root element |
| svg | .mantine-SemiCircleProgress-svg | Root svg element |
| emptySegment | .mantine-SemiCircleProgress-emptySegment | Empty circle segment |
| filledSegment | .mantine-SemiCircleProgress-filledSegment | Filled circle segment |
| label | .mantine-SemiCircleProgress-label | Label element |

**SemiCircleProgress CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --scp-empty-segment-color | Color of the empty segment |
| root | --scp-filled-segment-color | Color of the filled segment |
| root | --scp-thickness | Controls `strokeWidth` of the circle |
| root | --scp-transition-duration | Controls transition duration of the filled segment |

**SemiCircleProgress data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| label | data-position | - | Value of `labelPosition` prop |
| label | data-orientation | - | Value of `orientation` prop |


--------------------------------------------------------------------------------

### SimpleGrid
Package: @mantine/core
Import: import { SimpleGrid } from '@mantine/core';
Description: Responsive grid in which each item takes equal amount of space

## Usage

`SimpleGrid` is a responsive grid system with equal-width columns.
It uses CSS grid layout. If you need to set different widths for columns, use
[Grid](https://mantine.dev/llms/core-grid.md) component instead.

```tsx
import { SimpleGrid } from '@mantine/core';

function Demo() {
  return (
    <SimpleGrid cols={3} spacing="md" verticalSpacing="md">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </SimpleGrid>
  )
}
```


## spacing and verticalSpacing props

The `spacing` prop controls horizontal spacing between columns. By default, it is also used
for vertical spacing between rows. If you want different vertical spacing, set the
`verticalSpacing` prop explicitly:

```tsx
import { SimpleGrid } from '@mantine/core';

// `spacing` is used for both horizontal and vertical spacing
const Spacing = () => <SimpleGrid spacing="xl" />;

// `spacing` is used for horizontal spacing, `verticalSpacing` for vertical
const VerticalSpacing = () => (
  <SimpleGrid spacing="xl" verticalSpacing="lg" />
);
```

## Responsive props

`cols`, `spacing` and `verticalSpacing` props support object notation for responsive values,
it works the same way as [style props](https://mantine.dev/llms/styles-style-props.md): the object may have `base`, `xs`,
`sm`, `md`, `lg` and `xl` key, and values from those keys will be applied according to current
viewport width.

In the following example, `cols={{ base: 1, sm: 2, lg: 5 }}` means:

* 1 column if viewport width is less than `sm` breakpoint
* 2 columns if viewport width is between `sm` and `lg` breakpoints
* 5 columns if viewport width is greater than `lg` breakpoint

Same logic applies to `spacing` and `verticalSpacing` props.

```tsx
import { SimpleGrid } from '@mantine/core';

function Demo() {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 5 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </SimpleGrid>
  );
}
```


## Container queries

To use [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
instead of media queries, set `type="container"`. With container queries, grid columns and spacing
will be adjusted based on the container width, not the viewport width.

Note that, when using container queries, `cols`, `spacing` and `verticalSpacing` props cannot
reference `theme.breakpoints` values in keys. It is required to use exact px or em values.

To see how the grid changes, resize the root element of the demo
with the resize handle located at the bottom right corner of the demo:

```tsx
import { SimpleGrid } from '@mantine/core';

function Demo() {
  return (
    // Wrapper div is added for demonstration purposes only,
    // it is not required in real projects
    <div style={{ resize: 'horizontal', overflow: 'hidden', maxWidth: '100%' }}>
      <SimpleGrid
        type="container"
        cols={{ base: 1, '300px': 2, '500px': 5 }}
        spacing={{ base: 10, '300px': 'xl' }}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </SimpleGrid>
    </div>
  );
}
```


## Auto-fill columns

Set the `minColWidth` prop to use CSS Grid `auto-fill` to automatically adjust the number
of columns based on available space and minimum column width. When `minColWidth` is set,
the `cols` prop is ignored.

```tsx
import { SimpleGrid } from '@mantine/core';

function Demo() {
  return (
    <SimpleGrid minColWidth="200px">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </SimpleGrid>
  );
}
```


## auto-fill vs auto-fit

By default, `minColWidth` uses `auto-fill` behavior. You can change it to `auto-fit` with the
`autoFlow` prop. The difference between the two:

* `auto-fill` creates as many tracks as possible without overflowing the container, leaving empty tracks if items don't fill the row
* `auto-fit` works the same way but collapses empty tracks, allowing items to stretch and fill the remaining space

```tsx
import { SimpleGrid } from '@mantine/core';

function Demo() {
  return (
    <>
      {/* auto-fill: empty tracks are preserved, items do not stretch */}
      <SimpleGrid minColWidth="200px" autoFlow="auto-fill">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </SimpleGrid>

      {/* auto-fit: empty tracks are collapsed, items stretch to fill the row */}
      <SimpleGrid minColWidth="200px" autoFlow="auto-fit">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </SimpleGrid>
    </>
  );
}
```


## Auto rows

Set the `autoRows` prop to control the size of implicitly created grid rows.
This is useful when you need all rows to have equal height or a minimum height.

```tsx
import { SimpleGrid } from '@mantine/core';

function Demo() {
  return (
    <SimpleGrid cols={3} autoRows="minmax(100px, auto)">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </SimpleGrid>
  );
}
```


## Browser support

`SimpleGrid` uses [CSS Grid Layout](https://caniuse.com/css-grid), it is supported in all modern browsers.
If you need to support older browsers, use [Grid](https://mantine.dev/llms/core-grid.md) (flexbox based) component instead.

When `type="container"` is set, `SimpleGrid` uses [container queries](https://caniuse.com/css-container-queries).
Since February 2023, container queries are supported in all modern browsers. If you need to support older browsers,
do not use container queries option.


#### Props

**SimpleGrid props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoFlow | "auto-fit" \| "auto-fill" | - | Grid repeat type when minColWidth is set |
| autoRows | string | - | Sets the size of implicitly created grid rows |
| cols | StyleProp<number> | - | Number of columns |
| minColWidth | string \| number | - | Minimum column width when using auto-fit/auto-fill. When set, cols prop is ignored |
| spacing | StyleProp<MantineSpacing> | - | Spacing between columns |
| type | "media" \| "container" | - | Determines type of queries that are used for responsive styles |
| verticalSpacing | StyleProp<MantineSpacing> | - | Spacing between rows. When not set, falls back to spacing value |


#### Styles API

SimpleGrid component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**SimpleGrid selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-SimpleGrid-root | Root element |
| container | .mantine-SimpleGrid-container | Container element, available only when `type="container"` is set |


--------------------------------------------------------------------------------

### Skeleton
Package: @mantine/core
Import: import { Skeleton } from '@mantine/core';
Description: Indicate content loading state

## Usage

Use `Skeleton` to create a placeholder for loading content. `Skeleton` supports the following props:

* `height` – height – any valid CSS value
* `width` – width - any valid CSS value
* `radius` – key of `theme.radius` or any valid CSS value to set border-radius
* `circle` – if true, width, height and border-radius will equal the value specified in the `height` prop
* `animate` – true by default, controls animation

```tsx
import { Skeleton } from '@mantine/core';

  function Demo() {
    return (
      <>
        <Skeletontrue'} height={50} circle mb="xl" />
        <Skeletontrue'} height={8} radius="xl" />
        <Skeletontrue'} height={8} mt={6} radius="xl" />
        <Skeleton${
          props.animate ? '' : ' animate={false}'
        } height={8} mt={6} width="70%" radius="xl" />
      </>
    );
  }
```


## With content

If you want to indicate the loading state of content that is already on the page, wrap it with Skeleton
and control the loading overlay visibility with the `visible` prop:

```tsx
import { useState } from 'react';
import { Skeleton, Button } from '@mantine/core';

function Demo() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Skeleton visible={loading}>
        Lorem ipsum dolor sit amet...
        {/* other content */}
      </Skeleton>

      <Button onClick={() => setLoading((l) => !l)}>
        Toggle Skeleton
      </Button>
    </>
  );
}
```



#### Props

**Skeleton props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| animate | boolean | - | Enables animation |
| circle | boolean | - | If set, Skeleton `width` and `border-radius` are equal to its `height` |
| height | Height<string \| number> | - | Skeleton `height`, numbers are converted to rem |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem. |
| visible | boolean | - | Determines whether Skeleton overlay should be displayed |
| width | React.CSSProperties["width"] | - | Skeleton `width`, numbers are converted to rem, ignored when `circle` prop is set. |


#### Styles API

Skeleton component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Skeleton selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Skeleton-root | Root element |

**Skeleton CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --skeleton-height | Controls skeleton `height` |
| root | --skeleton-width | Controls skeleton `width` |
| root | --skeleton-radius | Controls skeleton `border-radius` |

**Skeleton data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-visible | `visible` prop is set | - |
| root | data-animate | `animate` prop is set | - |


--------------------------------------------------------------------------------

### Slider
Package: @mantine/core
Import: import { Slider } from '@mantine/core';
Description: Slider component

## Usage

```tsx
import { Slider } from '@mantine/core';


function Demo() {
  return (
    <Slider
       color="blue" size="md" radius="xl" showLabelOnHover={true} labelAlwaysOn={false}
      defaultValue={40}
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
import { Slider } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(40);
  return <Slider value={value} onChange={setValue} />;
}
```

## Uncontrolled

`Slider` can be used in uncontrolled forms the same way as a native input element.
Set the `name` attribute to include the slider value in the `FormData` object on form submission.
To set the initial value in uncontrolled mode, use the `defaultValue` prop.

Example usage of uncontrolled `Slider` with `FormData`:

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Slider value:', formData.get('volume'));
      }}
    >
      <Slider name="volume" defaultValue={40} min={0} max={100} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Disabled

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return <Slider defaultValue={60} disabled />;
}
```


## onChangeEnd

`onChangeEnd` callback is called when the user stops dragging the slider or when the value is changed with the keyboard.
You can use it as a debounced callback to avoid too frequent updates.

```tsx
import { useState } from 'react';
import { Slider, Text, Box } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState(50);
  const [endValue, setEndValue] = useState(50);

  return (
    <Box maw={400} mx="auto">
      <Slider value={value} onChange={setValue} onChangeEnd={setEndValue} />

      <Text mt="md" size="sm">
        onChange value: <b>{value}</b>
      </Text>
      <Text mt={5} size="sm">
        onChangeEnd value: <b>{endValue}</b>
      </Text>
    </Box>
  );
}
```


## Control label

To change label behavior and appearance, set the following props:

* `label` – formatter function, accepts value as an argument, set null to disable label, defaults to `f => f`
* `labelAlwaysOn` – if true, the label will always be displayed; by default the label is visible only when the user is dragging
* `labelTransitionProps` – props passed down to the [Transition](https://mantine.dev/llms/core-transition.md) component, can be used to customize label animation

```tsx
import { Slider, Text } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text size="sm">No label</Text>
      <Slider defaultValue={40} label={null} />

      <Text size="sm" mt="xl">Formatted label</Text>
      <Slider defaultValue={40} label={(value) => `${value} °C`} />

      <Text size="sm" mt="xl">Label always visible</Text>
      <Slider defaultValue={40} labelAlwaysOn />

      <Text size="sm" mt="xl">Custom label transition</Text>
      <Slider
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
import { Slider, Text } from '@mantine/core';

const marks = [
  { value: 0, label: 'xs' },
  { value: 25, label: 'sm' },
  { value: 50, label: 'md' },
  { value: 75, label: 'lg' },
  { value: 100, label: 'xl' },
];

function Demo() {
  return (
    <>
      <Text>Decimal step</Text>
      <Slider
        defaultValue={0}
        min={-10}
        max={10}
        label={(value) => value.toFixed(1)}
        step={0.1}
        styles={{ markLabel: { display: 'none' } }}
      />

      <Text mt="md">Step matched with marks</Text>
      <Slider
        defaultValue={50}
        label={(val) => marks.find((mark) => mark.value === val)!.label}
        step={25}
        marks={marks}
        styles={{ markLabel: { display: 'none' } }}
      />
    </>
  );
}
```


## Domain

By default, the `min` and `max` props define both the visual range (track display) and
the selectable range (possible values). The `domain` prop allows you to independently
control the selectable range. This is useful when you want to display a wider track
(for context) but restrict the actual selection to a subset.

In the example below, the track displays from 0 to 100 (`min`/`max`), but the thumb
can only be dragged between 20 and 80 (`domain`):

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return (
    <Slider
      domain={[0, 100]}
      min={10}
      max={90}
      defaultValue={25}
      marks={[
        { value: 10, label: 'min' },
        { value: 90, label: 'max' },
      ]}
    />
  );
}
```


## Decimal values

To use `Slider` with decimal values, set `min`, `max` and `step` props:

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return <Slider min={0} max={1} step={0.0005} defaultValue={0.5535} />;
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

Note that the mark value is relative to the slider value, not width:

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return (
    <>
      <Slider defaultValue={40} marks={[{ value: 10 }, { value: 40 }, { value: 95 }]} mb={32} />
      <Slider
        mb={32}
        defaultValue={40}
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

Set the `restrictToMarks` prop to restrict the slider value to marks only. Note that in
this case the `step` prop is ignored:

```tsx
import { RangeSlider, Slider, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Slider
        restrictToMarks
        defaultValue={25}
        marks={Array.from({ length: 5 }).map((_, index) => ({ value: index * 25 }))}
      />

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
    </Stack>
  );
}
```


## Thumb size

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return <Slider thumbSize={14} defaultValue={20} />;
}
```


## Thumb children

```tsx
import { Slider, RangeSlider } from '@mantine/core';
import { HeartIcon, HeartBreakIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <Slider
        thumbChildren={<HeartIcon size={16} />}
        color="red"
        label={null}
        defaultValue={40}
        thumbSize={26}
        styles={{ thumb: { borderWidth: 2, padding: 3 } }}
      />

      <RangeSlider
        mt="xl"
        styles={{ thumb: { borderWidth: 2, padding: 3 } }}
        color="red"
        label={null}
        defaultValue={[20, 60]}
        thumbSize={26}
        thumbChildren={[<HeartIcon size={16} key="1" />, <HeartBreakIcon size={16} key="2" />]}
      />
    </>
  );
}
```


## Scale

You can use the `scale` prop to represent the value on a different scale.

In the following demo, the value `x` represents the value `2^x`. Increasing `x` by one increases the represented value by 2 to the power of `x`.

```tsx
import { RangeSlider, Slider } from '@mantine/core';

function valueLabelFormat(value: number) {
  const units = ['KB', 'MB', 'GB', 'TB'];

  let unitIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 1024 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue /= 1024;
  }

  return `${scaledValue} ${units[unitIndex]}`;
}

const getScale = (v: number) => 2 ** v;

function Demo() {
  return (
    <>
      <Slider
        scale={getScale}
        step={1}
        min={2}
        max={30}
        labelAlwaysOn
        defaultValue={10}
        label={valueLabelFormat}
      />
      <RangeSlider
        mt={50}
        scale={getScale}
        step={1}
        min={2}
        max={30}
        labelAlwaysOn
        defaultValue={[10, 20]}
        label={valueLabelFormat}
      />
    </>
  );
}
```


## Start point

Use the `startPointValue` prop to change the origin of the filled bar.
When set, the bar extends from the given value toward the current value –
to the left for values below the start point and to the right for values above it.
This prop is ignored when `inverted` is set.

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return (
    <Slider
      startPointValue={0}
      min={-100}
      max={100}
      defaultValue={40}
      marks={[
        { value: -100, label: '-100' },
        { value: -50, label: '-50' },
        { value: 0, label: '0' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
      ]}
    />
  );
}
```


## Vertical slider

Set `orientation="vertical"` to render the slider vertically. In vertical orientation,
the minimum value is at the bottom and the maximum value is at the top.

```tsx
import { RangeSlider, Slider } from '@mantine/core';

const marks = [
  { value: 20, label: '20%' },
  { value: 50, label: '50%' },
  { value: 80, label: '80%' },
];

function Demo() {
  return (
    <div style={{ display: 'flex', gap: 40 }}>
      <Slider orientation="vertical" defaultValue={45} marks={marks} />
      <RangeSlider orientation="vertical" defaultValue={[25, 65]} marks={marks} />
    </div>
  );
}
```


## Hidden marks

Hidden marks allow you to snap to specific values without displaying them visually on the track.
This is useful when you want to create a "sticky" snapping behavior to certain values that
you don't want to show to the user. Use this feature together with `restrictToMarks` prop:

```tsx
import { Slider, Text, Box } from '@mantine/core';
import { useState } from 'react';

function Demo() {
  const [value, setValue] = useState(50);

  return (
    <Box pb="md">
      <Text size="sm" mb="xs">
        Hidden marks allow you to snap to specific values without displaying them visually. Current
        value: {value}
      </Text>
      <Slider
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
        restrictToMarks
        marks={[
          { value: 0, label: '0%' },
          { value: 25, hidden: true },
          { value: 50, label: '50%' },
          { value: 75, hidden: true },
          { value: 100, label: '100%' },
        ]}
      />
    </Box>
  );
}
```


## Build custom slider

If the `Slider` component does not meet your requirements, you can build a custom slider with the [use-move](https://mantine.dev/llms/hooks-use-move.md) hook:

```tsx
// Demo.tsx
import { useState } from 'react';
import { DotsSixVerticalIcon } from '@phosphor-icons/react';
import { clamp, useMove } from '@mantine/hooks';
import classes from './Demo.module.css';

function Demo() {
  const [value, setValue] = useState(0.3);
  const { ref } = useMove(({ x }) => setValue(clamp(x, 0.1, 0.9)));
  const labelFloating = value < 0.2 || value > 0.8;

  return (
    <div className={classes.root}>
      <div className={classes.track} ref={ref}>
        <div
          className={classes.filled}
          style={{
            width: `calc(${value * 100}% - var(--thumb-width) / 2 - var(--thumb-offset) / 2)`,
          }}
        >
          <span className={classes.label} data-floating={labelFloating || undefined} data-filled>
            {(value * 100).toFixed(0)}
          </span>
        </div>

        <div
          className={classes.empty}
          style={{
            width: `calc(${(1 - value) * 100}% - var(--thumb-width) / 2 - var(--thumb-offset) / 2)`,
          }}
        >
          <span className={classes.label} data-floating={labelFloating || undefined}>
            {((1 - value) * 100).toFixed(0)}
          </span>
        </div>

        <div
          className={classes.thumb}
          style={{ left: `calc(${value * 100}% - var(--thumb-width) / 2)` }}
        >
          <DotsSixVerticalIcon />
        </div>
      </div>
    </div>
  );
}

// Demo.module.css
.root {
  padding-top: 20px;
}

.track {
  --thumb-width: 20px;
  --thumb-offset: 10px;

  position: relative;
  height: 60px;
  display: flex;
}

.filled {
  height: 100%;
  margin-right: calc(var(--thumb-offset) / 2 + var(--thumb-width) / 2);
  border-radius: var(--mantine-radius-md);
  background-color: var(--mantine-color-blue-filled);
  display: flex;
  align-items: center;
  padding-inline: 10px;
}

.empty {
  height: 100%;
  margin-left: calc(var(--thumb-offset) / 2 + var(--thumb-width) / 2);
  border-radius: var(--mantine-radius-md);
  background-color: var(--mantine-color-gray-1);
  display: flex;
  align-items: center;
  padding-inline: 10px;
  justify-content: flex-end;

  @mixin dark {
    background-color: var(--mantine-color-dark-6);
  }
}

.thumb {
  position: absolute;
  background-color: var(--mantine-color-white);
  border: 1px solid var(--mantine-color-gray-2);
  border-radius: var(--mantine-radius-md);
  height: 100%;
  width: var(--thumb-width);
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mantine-color-gray-5);

  @mixin dark {
    background-color: var(--mantine-color-dark-6);
    border-color: var(--mantine-color-dark-4);
    color: var(--mantine-color-dark-0);
  }
}

.label {
  font-size: var(--mantine-font-size-xl);
  font-weight: 700;
  transition:
    transform 100ms ease,
    color 100ms ease;

  &[data-filled] {
    color: var(--mantine-color-white);
  }

  &[data-floating] {
    transform: translateY(-44px) translateX(-10px);
    color: var(--mantine-color-black);

    &:not([data-filled]) {
      transform: translateY(-44px) translateX(10px);
    }

    @mixin dark {
      color: var(--mantine-color-white);
    }
  }
}
```


## Accessibility

`Slider` component is accessible by default:

* Thumbs are focusable
* When the user uses the mouse to interact with the slider, focus is moved to the slider track; when the user presses arrows, focus is moved to the thumb
* The value can be changed with arrows with step increment/decrement

To label the component for screen readers, add labels to thumbs:

```tsx
import { Slider } from '@mantine/core';

function Demo() {
  return <Slider thumbLabel="Thumb aria-label" />;
}
```

## Keyboard interactions


#### Props

**Slider props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color, controls color of track and thumb |
| defaultValue | number | - | Uncontrolled component default value |
| disabled | boolean | - | Disables slider |
| domain | [number, number] | - | Domain of the slider, defines the selectable value range independently of min/max. Useful when you want to display a wider track range (min/max) but restrict actual selection to a subset (domain). |
| hiddenInputProps | React.ComponentProps<"input"> | - | Props passed down to the hidden input |
| inverted | boolean | - | Determines whether track value representation should be inverted |
| label | ReactNode \| ((value: number) => ReactNode) | - | Function to generate label or any react node to render instead, set to null to disable label |
| labelAlwaysOn | boolean | - | Determines whether the label should be visible when the slider is not being dragged or hovered |
| labelTransitionProps | TransitionProps | - | Props passed down to the `Transition` component |
| marks | SliderMark[] | - | Marks displayed on the track |
| max | number | - | Maximum possible value |
| min | number | - | Minimal possible value |
| name | string | - | Hidden input name, use with uncontrolled component |
| onChange | (value: number) => void | - | Called when value changes |
| onChangeEnd | (value: number) => void | - | Called when user stops dragging slider or changes value with arrows |
| orientation | "horizontal" \| "vertical" | - | Slider orientation |
| precision | number | - | Number of significant digits after the decimal point |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| restrictToMarks | boolean | - | Determines whether the selection should be only allowed from the given marks array |
| scale | (value: number) => number | - | A transformation function to change the scale of the slider |
| showLabelOnHover | boolean | - | Determines whether the label should be displayed when the slider is hovered |
| size | MantineSize \| number | - | Controls size of the track |
| startPointValue | number | - | Value at which the filled bar starts. When set, the bar extends from this point toward the current value. Ignored when `inverted` is set. |
| step | number | - | Number by which value will be incremented/decremented with thumb drag and arrows |
| thumbChildren | React.ReactNode | - | Content rendered inside thumb |
| thumbLabel | string | - | Thumb `aria-label` |
| thumbProps | React.ComponentProps<"div"> | - | Props passed down to thumb element |
| thumbSize | string \| number | - | Thumb `width` and `height`, by default value is computed based on `size` prop |
| value | number | - | Controlled component value |


#### Styles API

Slider component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Slider selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Slider-root | Root element |
| label | .mantine-Slider-label | Thumb label |
| thumb | .mantine-Slider-thumb | Thumb element |
| trackContainer | .mantine-Slider-trackContainer | Wraps track element |
| track | .mantine-Slider-track | Slider track |
| bar | .mantine-Slider-bar | Track filled part |
| markWrapper | .mantine-Slider-markWrapper | Contains `mark` and `markLabel` elements |
| mark | .mantine-Slider-mark | Mark displayed on track |
| markLabel | .mantine-Slider-markLabel | Label of the associated mark, displayed below track |

**Slider CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --slider-size | Controls track `height` |
| root | --slider-color | Controls filled track, thumb and marks `background` |
| root | --slider-thumb-size | Controls thumb `width` and `height` |
| root | --slider-radius | Controls `border-radius` of track and thumb |

**Slider data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-orientation | Determines slider orientation, `horizontal` by default | - |


--------------------------------------------------------------------------------

### Space
Package: @mantine/core
Import: import { Space } from '@mantine/core';
Description: Add horizontal or vertical spacing from theme

## Usage

Use `Space` component to add horizontal or vertical spacing between elements:

```tsx
import { Text, Space } from '@mantine/core';

function Demo() {
  return (
    <>
      <Text>First line</Text>
      <Space h="md" />
      <Text>Second line</Text>
    </>
  );
}
```


```tsx
import { Text, Space } from '@mantine/core';

function Demo() {
  return (
    <div style={{ display: 'flex' }}>
      <Text>First line</Text>
      <Space w="md" />
      <Text>Second line</Text>
    </div>
  );
}
```


## Where to use

In most cases, you would want to use margin props instead of `Space` when working with Mantine components:

```tsx
import { Space, Text } from '@mantine/core';

// Space is not required as the same can be achieved with `mt` prop
function Demo() {
  return (
    <>
      <Text>First line</Text>
      <Text mt="md">Second line</Text>
    </>
  );
}
```

But when you work with regular HTML elements you do not have access to `theme.spacing` and you may want to use
`Space` component to skip direct theme subscription:

```tsx
import { Space } from '@mantine/core';

// Margin props are not available on div,
// use Space to add spacing from theme
function Demo() {
  return (
    <>
      <div>First line</div>
      <Space h="md" />
      <div>Second line</div>
    </>
  );
}
```


#### Props

**Space props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|


--------------------------------------------------------------------------------

### Spoiler
Package: @mantine/core
Import: import { Spoiler } from '@mantine/core';
Description: Hide long sections of content under a spoiler

## Usage

Use `Spoiler` to hide a long section of content.
Set the `maxHeight` prop to control the point at which content will be hidden under the spoiler and the show/hide control appears.
If the content height is less than `maxHeight`, the spoiler will just render children.

`hideLabel` and `showLabel` props are required – they are used as the spoiler toggle button label in the corresponding state.

```tsx
import { Spoiler } from '@mantine/core';

function Demo() {
  return (
    <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
      {/* Content here */}
    </Spoiler>
  );
}
```


## Control expanded state

To control the expanded state, use `expanded` and `onExpandedChange` props. Note that the
`expanded` prop does not have any effect on spoiler visuals if the content height
is less than the given `maxHeight`.

```tsx
import { useState } from 'react';
import { Spoiler } from '@mantine/core';

function Demo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Spoiler
      showLabel="Show more"
      hideLabel="Hide details"
      expanded={expanded}
      onExpandedChange={setExpanded}
    >
      {/* Spoiler content */}
    </Spoiler>
  );
}
```

## Subscribe to expanded state changes

Use `onExpandedChange` to subscribe to expanded state changes:

```tsx
import { Spoiler } from '@mantine/core';

function Demo() {
  return (
    <Spoiler
      showLabel="Show more"
      hideLabel="Hide details"
      onExpandedChange={(expanded) => console.log(expanded)}
    >
      {/* Spoiler content */}
    </Spoiler>
  );
}
```

## Transition duration

Control the transition duration by setting the `transitionDuration` prop (transition-duration CSS property in ms).
To disable animations, set `transitionDuration={0}`:

```tsx
import { Spoiler } from '@mantine/core';

function Demo() {
  return (
    <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide" transitionDuration={0}>
      {/* Content here */}
    </Spoiler>
  );
}
```


