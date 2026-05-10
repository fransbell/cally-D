## Accessibility

If you use `Input` component without associated label element, set `aria-label`:

```tsx
import { Input } from '@mantine/core';

// ok – the input is labelled by the aria-label
function WithAriaLabel() {
  return <Input aria-label="Your email" />;
}

// ok – the input is labelled by the label element
function WithLabel() {
  return (
    <>
      <label htmlFor="my-email">Your email</label>
      <Input id="my-email" />
    </>
  );
}
```

When you use `Input` with `Input.Wrapper` it is required to set `id` on both components
to connect label and other elements with the input:

```tsx
import { Input } from '@mantine/core';

function Demo() {
  return (
    <Input.Wrapper label="Your email" id="your-email">
      <Input id="your-email" />
    </Input.Wrapper>
  );
}
```

You can use [use-id](https://mantine.dev/llms/hooks-use-id.md) to generate unique ids:

```tsx
import { Input } from '@mantine/core';
import { useId } from '@mantine/hooks';

function Demo() {
  const id = useId();
  return (
    <Input.Wrapper label="Your email" id={id}>
      <Input id={id} />
    </Input.Wrapper>
  );
}
```


#### Props

**Input props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| disabled | boolean | - | Sets `disabled` attribute on the `input` element |
| error | React.ReactNode | - | Determines whether the input should have error styles and `aria-invalid` attribute |
| id | string | - | Input element id |
| inputSize | string | - | HTML `size` attribute for the input element (number of visible characters) |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `leftSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| leftSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `leftSection` element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set `width` of the section and input `padding-left`, by default equals to the input height |
| loading | boolean | - | Displays loading indicator in the left or right section |
| loadingPosition | "left" \| "right" | - | Position of the loading indicator |
| multiline | boolean | - | Adjusts padding and sizing calculations for multiline inputs (use with `component="textarea"`). Does not make the input multiline by itself. |
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| required | boolean | - | Sets `required` attribute on the `input` element |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| rootRef | Ref<HTMLDivElement> | - | Root element ref |
| size | MantineSize | - | Controls input `height`, horizontal `padding`, and `font-size` |
| withAria | boolean | - | Determines whether `aria-` and other accessibility attributes should be added to the input. Only disable when implementing custom accessibility handling. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element of the `Input` component |

**Input.Base props**

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
| multiline | boolean | - | If set, the input can have multiple lines, for example when `component="textarea"` |
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| size | MantineSize | - | Controls input `height`, horizontal `padding`, and `font-size` |
| withAria | boolean | - | If set, `aria-` and other accessibility attributes are added to the input |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| wrapperProps | React.ComponentProps<"div"> | - | Props passed down to the root element (`Input.Wrapper` component) |

**Input.Label props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| labelElement | "div" \| "label" | - | Root element of the label |
| required | boolean | - | If set, the required asterisk is displayed next to the label |
| size | MantineFontSize | - | Controls label `font-size` |

**Input.Wrapper props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| description | React.ReactNode | - | Contents of `Input.Description` component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps | - | Props passed down to the `Input.Description` component |
| error | React.ReactNode | - | Contents of `Input.Error` component. If not set, error is not displayed. |
| errorProps | InputErrorProps | - | Props passed down to the `Input.Error` component |
| id | string | - | Static id used as base to generate `aria-` attributes, by default generates random id |
| inputContainer | (children: ReactNode) => ReactNode | - | Render function to wrap the input element. Useful for adding tooltips, popovers, or other wrappers around the input. |
| inputWrapperOrder | ("input" \| "label" \| "description" \| "error")[] | - | Controls order and visibility of wrapper elements. Only elements included in this array will be rendered. |
| label | React.ReactNode | - | Contents of `Input.Label` component. If not set, label is not displayed. |
| labelElement | "div" \| "label" | - | Root element for the label. Use `'div'` when wrapper contains multiple input elements and you need to handle `htmlFor` manually. |
| labelProps | InputLabelProps | - | Props passed down to the `Input.Label` component |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| size | MantineFontSize | - | Controls size of `Input.Label`, `Input.Description` and `Input.Error` components |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |

**Input.Description props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | MantineFontSize | - | Controls description `font-size` |

**Input.Error props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | MantineFontSize | - | Controls error `font-size` |


#### Styles API

Input component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Input selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Input-wrapper | Root element of the Input |
| input | .mantine-Input-input | Input element |
| section | .mantine-Input-section | Left and right sections |

**Input CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| wrapper | --input-fz | `font-size` of the input element |
| wrapper | --input-left-section-width | `width` of the left section |
| wrapper | --input-right-section-width | `width` of the right section |
| wrapper | --input-padding-y | `padding-top` and `padding-bottom` of the input element |
| wrapper | --input-radius | `border-radius` of the input element |
| wrapper | --input-left-section-pointer-events | Controls `pointer-events` of the left section |
| wrapper | --input-right-section-pointer-events | Controls `pointer-events` of the right section |

**Inputwrapper selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Inputwrapper-root | Root element |
| label | .mantine-Inputwrapper-label | Label element |
| required | .mantine-Inputwrapper-required | Required asterisk element, rendered inside label |
| description | .mantine-Inputwrapper-description | Description element |
| error | .mantine-Inputwrapper-error | Error element |

**Inputwrapper CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| label | --input-label-size | Controls label `font-size` |
| label | --input-asterisk-color | Controls label asterisk text `color` |

**Inputbase selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-Inputbase-wrapper | Root element of the Input |
| input | .mantine-Inputbase-input | Input element |
| section | .mantine-Inputbase-section | Left and right sections |
| root | .mantine-Inputbase-root | Root element |
| label | .mantine-Inputbase-label | Label element |
| required | .mantine-Inputbase-required | Required asterisk element, rendered inside label |
| description | .mantine-Inputbase-description | Description element |
| error | .mantine-Inputbase-error | Error element |


--------------------------------------------------------------------------------

### JsonInput
Package: @mantine/core
Import: import { JsonInput } from '@mantine/core';
Description: Capture json data from user

## Usage

`JsonInput` is based on the [Textarea](https://mantine.dev/llms/core-textarea.md) component.
It includes JSON validation logic and an option to format the input value on blur:

```tsx
import { JsonInput } from '@mantine/core';

function Demo() {
  return (
    <JsonInput
      label="Your package.json"
      placeholder="Textarea will autosize to fit the content"
      validationError="Invalid JSON"
      formatOnBlur
      autosize
      minRows={4}
    />
  );
}
```


## Loading state

Set `loading` prop to display a loading indicator. By default, the loader is displayed on the right side of the input.
You can change the position with the `loadingPosition` prop to `'left'` or `'right'`. This is useful for async operations like API calls, searches, or validations:

```tsx
import { JsonInput } from '@mantine/core';

function Demo() {
  return <JsonInput placeholder="Enter JSON" formatOnBlur autosize minRows={4} loading />;
}
```


## Controlled

```tsx
import { useState } from 'react';
import { JsonInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');
  return <JsonInput value={value} onChange={setValue} />;
}
```

## Uncontrolled

`JsonInput` can be used with uncontrolled forms the same way as a native `textarea` element.
Set the `name` attribute to include json input value in `FormData` object on form submission.
To control the initial value in uncontrolled forms, use the `defaultValue` prop.

Example usage of uncontrolled `JsonInput` with `FormData`:

```tsx
import { JsonInput } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('JSON input value:', formData.get('data'));
      }}
    >
      <JsonInput
        label="Enter JSON"
        name="data"
        defaultValue="{}"
        formatOnBlur
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Custom serialization

You can provide custom `serialize` and `deserialize` functions to support data formats beyond standard JSON.
This is useful when you need to handle types like `Date`, `Map`, `Set`, `undefined`, or other non-JSON-serializable values.

The example below shows how to use [superjson](https://github.com/blitz-js/superjson) library to handle extended data types:

```tsx
import { useState } from 'react';
import { JsonInput } from '@mantine/core';
import superjson from 'superjson';

function Demo() {
  const [value, setValue] = useState(
    superjson.stringify(
      {
        name: 'John Doe',
        createdAt: new Date(),
        tags: new Set(['admin', 'user']),
        metadata: new Map([['role', 'developer']]),
      },
      null,
      2
    )
  );

  return (
    <JsonInput
      label="Extended JSON with superjson"
      description="Supports Date, Map, Set, BigInt, RegExp, and more"
      placeholder="Enter extended JSON"
      value={value}
      onChange={setValue}
      serialize={(val) => superjson.stringify(val, null, 2)}
      deserialize={superjson.parse}
      validationError="Invalid extended JSON format"
      formatOnBlur
      autosize
      minRows={6}
    />
  );
}
```

The `deserialize` function must throw an error when the input is invalid. Both `serialize` and `deserialize`
functions are used for formatting when `formatOnBlur` is enabled.

## Input props

JsonInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all textarea element props. JsonInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { JsonInput } from '@mantine/core';


function Demo() {
  return (
    <JsonInput
       variant="default" size="sm" radius="md" label="Input label" withAsterisk={false} description="Input description" error=""
      placeholder="Input placeholder"
    />
  );
}
```



#### Props

**JsonInput props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autosize | boolean | - | If set, enables textarea height growing with its content |
| defaultValue | string | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of `Input.Description` component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps | - | Props passed down to the `Input.Description` component |
| deserialize | ((text: string, reviver?: ((this: any, key: string, value: any) => any)) => any) \| undefined | - | Function to deserialize string value for formatting and validation. Must throw an error if the string is invalid JSON. |
| disabled | boolean | - | Sets `disabled` attribute on the `input` element |
| error | React.ReactNode | - | Contents of `Input.Error` component. If not set, error is not displayed. |
| errorProps | InputErrorProps | - | Props passed down to the `Input.Error` component |
| formatOnBlur | boolean | - | Determines whether the value should be formatted on blur |
| indentSpaces | number | - | Number of spaces to use as white space for formatting. Passed as the third argument to `serialize` function. |
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
| maxRows | number | - | Maximum rows for autosize textarea to grow, ignored if `autosize` prop is not set |
| minRows | number | - | Minimum rows of autosize textarea, ignored if `autosize` prop is not set |
| onChange | (value: string) => void | - | Called when value changes |
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| resize | Resize | - | Controls `resize` CSS property |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| serialize | { (value: any, replacer?: ((this: any, key: string, value: any) => any), space?: string \| number \| undefined): string; (value: any, replacer?: (string \| number)[] \| null \| undefined, space?: string \| ... 1 more ... \| undefined): string; } \| undefined | - | Function to serialize value into a string for formatting. Called with (value, null, 2) where 2 is the indentation level. |
| size | MantineSize | - | Controls input `height`, horizontal `padding`, and `font-size` |
| validationError | React.ReactNode | - | Error message shown when the input value is invalid JSON (checked on blur). If not provided, a generic error state is shown. Takes precedence over the `error` prop when validation fails. |
| value | string | - | Controlled component value |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


#### Styles API

JsonInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**JsonInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| wrapper | .mantine-JsonInput-wrapper | Root element of the Input |
| input | .mantine-JsonInput-input | Input element |
| section | .mantine-JsonInput-section | Left and right sections |
| root | .mantine-JsonInput-root | Root element |
| label | .mantine-JsonInput-label | Label element |
| required | .mantine-JsonInput-required | Required asterisk element, rendered inside label |
| description | .mantine-JsonInput-description | Description element |
| error | .mantine-JsonInput-error | Error element |


--------------------------------------------------------------------------------

### Kbd
Package: @mantine/core
Import: import { Kbd } from '@mantine/core';
Description: Display keyboard key

## Usage

```tsx
import { Kbd } from '@mantine/core';

function Demo() {
  return (
    <div dir="ltr">
      <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>M</Kbd>
    </div>
  );
}
```


## Size

```tsx
import { Kbd } from '@mantine/core';

function Demo() {
  return <Kbd size="sm">Shift</Kbd>;
}
```



#### Props

**Kbd props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | MantineSize \| number | - | Controls `font-size` and `padding` |


#### Styles API

Kbd component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Kbd selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Kbd-root | Root element |

**Kbd CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --kbd-fz | Controls `font-size` |


--------------------------------------------------------------------------------

### List
Package: @mantine/core
Import: import { List } from '@mantine/core';
Description: Display ordered or unordered list

## Usage

```tsx
import { List } from '@mantine/core';

function Demo() {
  return (
    <List type="unordered" size="md" withPadding={false}>
      <List.Item>Clone or download repository from GitHub</List.Item>
      <List.Item>Install dependencies with yarn</List.Item>
      <List.Item>To start development server run npm start command</List.Item>
      <List.Item>Run tests to make sure your changes do not break the build</List.Item>
      <List.Item>Submit a pull request once you are done</List.Item>
    </List>
  );
}
```


## With icons

You can replace list bullets with an icon. To do so, provide the following props:

* `icon` on the List component will be used as the default icon for all list elements
* `icon` on the List.Item component will override the context icon from List
* `spacing` – spacing between list items from the theme or any valid CSS value to set spacing, defaults to `0`
* `center` – center item content with the icon
* `size` – set font size from the theme

```tsx
import { List, ThemeIcon } from '@mantine/core';
import { CheckCircleIcon, CircleDashedIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <List
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <CheckCircleIcon size={16} />
        </ThemeIcon>
      }
    >
      <List.Item>Clone or download repository from GitHub</List.Item>
      <List.Item>Install dependencies with yarn</List.Item>
      <List.Item>To start development server run npm start command</List.Item>
      <List.Item>Run tests to make sure your changes do not break the build</List.Item>
      <List.Item
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <CircleDashedIcon size={16} />
          </ThemeIcon>
        }
      >
        Submit a pull request once you are done
      </List.Item>
    </List>
  );
}
```


## Nested lists

Set the `withPadding` prop to offset nested lists and `listStyleType` to control the bullet type:

```tsx
import { List } from '@mantine/core';

function Demo() {
  return (
    <List listStyleType="disc">
      <List.Item>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      </List.Item>
      <List.Item>First order item</List.Item>
      <List.Item>
        First order item with list
        <List withPadding listStyleType="disc">
          <List.Item>Nested item</List.Item>
          <List.Item>Nested item</List.Item>
          <List.Item>
            Nested item with list
            <List withPadding listStyleType="disc">
              <List.Item>Even more nested</List.Item>
              <List.Item>Even more nested</List.Item>
            </List>
          </List.Item>
          <List.Item>Nested item</List.Item>
        </List>
      </List.Item>
      <List.Item>First order item</List.Item>
    </List>
  );
}
```


## Ordered list numbering

### Start from specific number

Use the `start` prop to begin numbering from a specific value:

```tsx
import { List } from '@mantine/core';

function Demo() {
  return (
    <List type="ordered" start={5}>
      <List.Item>This is item #5</List.Item>
      <List.Item>This is item #6</List.Item>
      <List.Item>This is item #7</List.Item>
      <List.Item>This is item #8</List.Item>
    </List>
  );
}
```


### Reversed numbering

Use the `reversed` prop to create countdown lists:

```tsx
import { List } from '@mantine/core';

function Demo() {
  return (
    <List type="ordered" reversed>
      <List.Item>This is item #3</List.Item>
      <List.Item>This is item #2</List.Item>
      <List.Item>This is item #1</List.Item>
    </List>
  );
}
```


### Custom item values

Use the `value` prop on individual `List.Item` components to set specific numbers:

```tsx
import { List } from '@mantine/core';

function Demo() {
  return (
    <List type="ordered">
      <List.Item>First item</List.Item>
      <List.Item value={5}>This item is #5</List.Item>
      <List.Item>This item is #6 (continues from previous)</List.Item>
      <List.Item value={10}>This item is #10</List.Item>
      <List.Item>This item is #11</List.Item>
    </List>
  );
}
```



#### Props

**List props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| center | boolean | - | Vertically centers list items with their icons |
| children | React.ReactNode | - | `List.Item` components |
| icon | React.ReactNode | - | Icon to replace default list markers. Applied to all items unless overridden on individual List.Item components |
| listStyleType | ListStyleType | - | Controls CSS `list-style-type` property. Overrides the default list marker style based on list type |
| reversed | boolean | - | Reverses the order of list items (only works with type="ordered") |
| size | MantineSize | - | Controls `font-size` and `line-height` |
| spacing | MantineSpacing | - | Key of `theme.spacing` or any valid CSS value to set spacing between items |
| start | number | - | Starting value for ordered list numbering (only works with type="ordered") |
| type | "ordered" \| "unordered" | - | List type |
| withPadding | boolean | - | Adds extra horizontal padding to the list, useful for nested lists |

**List.Item props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Item content |
| icon | React.ReactNode | - | Icon to replace item bullet |


#### Styles API

List component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**List selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-List-root | Root element |
| item | .mantine-List-item | ListItem root element |
| itemIcon | .mantine-List-itemIcon | ListItem icon |
| itemLabel | .mantine-List-itemLabel | ListItem content |
| itemWrapper | .mantine-List-itemWrapper | ListItem wrapper element, container, icon and content |

**List CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --list-fz | Controls `font-size` |
| root | --list-lh | Controls `line-height` |
| root | --list-spacing | Controls spacing between items |

**List data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-with-padding | `withPadding` prop is set | - |
| item | data-centered | `center` prop is set on List component | - |
| item | data-with-icon | `icon` prop is set on ListItem component | - |


--------------------------------------------------------------------------------

### Loader
Package: @mantine/core
Import: import { Loader } from '@mantine/core';
Description: Indicate loading state

## Usage

The `Loader` component supports 3 types of loaders by default: `oval`, `bars`, and `dots`. All
loaders are animated with CSS for better performance.

```tsx
import { Loader } from '@mantine/core';

function Demo() {
  return <Loader color="blue" size="md" type="oval" />;
}
```


## Size prop

You can pass any valid CSS values or numbers to the `size` prop. Numbers are treated as px, but
converted to [rem](https://mantine.dev/llms/styles-rem.md). For example, `size={32}` will produce the
`--loader-size: 2rem` CSS variable.

```tsx
import { Loader } from '@mantine/core';

function Demo() {
  return <Loader size={30} />;
}
```


## Adding custom loaders

The `Loader` component is used in other components ([Button](https://mantine.dev/llms/core-button.md), [ActionIcon](https://mantine.dev/llms/core-action-icon.md), [LoadingOverlay](https://mantine.dev/llms/core-loading-overlay.md), etc.).
You can change the loader type with [default props](https://mantine.dev/llms/theming-default-props.md) by setting `type`.
You can also add a custom CSS or SVG loader with the `loaders` [default prop](https://mantine.dev/llms/theming-default-props.md).

### Custom CSS only loader

Note that in order for the `size` and `color` props to work with custom loaders, you need to
use the `--loader-size` and `--loader-color` CSS variables in your loader styles.

```tsx
import { MantineProvider, Loader } from '@mantine/core';
import { CssLoader } from './CssLoader';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: 'custom',
      },
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Loader />
    </MantineThemeProvider>
  );
}
```


### Custom SVG loader

It is recommended to use CSS-only loaders, as SVG-based animations may have the following issues:

* High CPU usage – the loader may look glitchy on low-end devices
* Loader animation may not start playing until JS is loaded – users may see a static loader

In your SVG loader, you need to use the `--loader-size` and `--loader-color` variables the same
way as in CSS-only custom loaders in order for the `size` and `color` props to work. Usually,
you would need to set `width` and `height` to `var(--loader-size)` and `fill`/`stroke` to
`var(--loader-color)`.

```tsx
import { MantineProvider, Loader } from '@mantine/core';
import { RingLoader } from './RingLoader';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
      },
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Loader />
    </MantineThemeProvider>
  );
}
```


## children prop

The `Loader` supports the `children` prop. If you pass anything to `children`, it will be rendered
instead of the loader. This is useful when you want to control the `Loader` representation
in components that use `loaderProps`, for example [Button](https://mantine.dev/llms/core-button.md), [LoadingOverlay](https://mantine.dev/llms/core-loading-overlay.md), [Dropzone](https://mantine.dev/llms/x-dropzone.md).

```tsx
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay visible={visible} loaderProps={{ children: 'Loading...' }} />
        {/* ...other content */}
      </Box>

      <Group justify="center">
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}
```



#### Props

**Loader props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Overrides default loader with given content |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color |
| loaders | Partial<Record<(string & {}) \| "bars" \| "dots" \| "oval", MantineLoaderComponent>> | - | Object of loaders components, can be customized via default props or inline. |
| size | MantineSize \| number | - | Controls `width` and `height` of the loader. `Loader` has predefined `xs`-`xl` values. Numbers are converted to rem. |
| type | (string & {}) \| "bars" \| "dots" \| "oval" | - | Loader type, key of `loaders` prop |


#### Styles API

Loader component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Loader selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Loader-root | Root element |

**Loader CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --loader-color | Control loader color |


--------------------------------------------------------------------------------

### LoadingOverlay
Package: @mantine/core
Import: import { LoadingOverlay } from '@mantine/core';
Description: An overlay with centered loader

## Usage

`LoadingOverlay` renders an overlay with a loader over the parent element with relative position.
It is usually used to indicate the loading state of forms.
Note that elements under the overlay are still focusable with the keyboard, so remember to add additional logic to handle this case.

The `LoadingOverlay` rendering is controlled by the `visible` prop:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure(false);

  // Note that position: relative is required
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        {/* ...other content */}
      </Box>

      <Group justify="center">
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}
```


## Loader props

You can pass props down to the [Loader](https://mantine.dev/llms/core-loader.md) component with `loaderProps`:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure(true);

  // Note that position: relative is required
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
        {/* ...other content */}
      </Box>

      <Group justify="center">
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}
```


## Custom inline loaders

To replace the default loader with any custom content, set `loaderProps={{ children: <div>Your content</div> }}`.
You can put any React node inside `loaderProps.children`:

```tsx
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay visible={visible} loaderProps={{ children: 'Loading...' }} />
        {/* ...other content */}
      </Box>

      <Group justify="center">
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}
```



#### Props

**LoadingOverlay props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| loaderProps | LoaderProps | - | Props passed down to `Loader` component |
| onEnter | () => void | - | Called when transition starts |
| onEntered | () => void | - | Called when transition ends |
| onExit | () => void | - | Called when exit transition starts |
| onExited | () => void | - | Called when exit transition ends |
| overlayProps | OverlayProps | - | Props passed down to `Overlay` component. Use to customizing blur, opacity, color and other properties. |
| transitionProps | TransitionProps | - | Props passed down to `Transition` component. Set `duration` to create custom transition or override default transition. |
| visible | boolean | - | Controls overlay visibility. Typically used with state (useState, useDisclosure). |
| zIndex | string \| number | - | Controls `z-index` of both the overlay and loader. The loader receives `z-index + 1`. |


#### Styles API

LoadingOverlay component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**LoadingOverlay selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-LoadingOverlay-root | Root element |
| overlay | .mantine-LoadingOverlay-overlay | `Overlay` component |
| loader | .mantine-LoadingOverlay-loader | `Loader` component |

**LoadingOverlay CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --lo-z-index | Controls `z-index` of the overlay and loader |


--------------------------------------------------------------------------------

### Mark
Package: @mantine/core
Import: import { Mark } from '@mantine/core';
Description: Highlight part of the text

## Usage

```tsx
import { Text, Mark } from '@mantine/core';

function Demo() {
  return (
    <Text>
      Highlight <Mark color="yellow">this chunk</Mark> of the text
    </Text>
  );
}
```



#### Props

**Mark props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color |


#### Styles API

Mark component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Mark selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Mark-root | Root element |

**Mark CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --mark-bg-dark | Controls `background-color` in dark color scheme |
| root | --mark-bg-light | Controls `background-color` for light color scheme |


--------------------------------------------------------------------------------

### Marquee
Package: @mantine/core
Import: import { Marquee } from '@mantine/core';
Description: Create continuous scrolling animation for content

## Usage

`Marquee` component creates a continuous scrolling animation for its children.
It is commonly used for displaying logos, testimonials, or any repeating content.

```tsx
import { Marquee } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';

function Demo() {
  return (
    <Marquee gap="lg">
      <MantineLogo width={80} type="full" color="blue" />
      <MantineLogo width={80} type="full" color="cyan" />
      <MantineLogo width={80} type="full" color="teal" />
      <MantineLogo width={80} type="full" color="green" />
      <MantineLogo width={80} type="full" color="lime" />
      <MantineLogo width={80} type="full" color="yellow" />
      <MantineLogo width={80} type="full" color="orange" />
      <MantineLogo width={80} type="full" color="red" />
    </Marquee>
  );
}
```


## Pause on hover

Set `pauseOnHover` prop to pause the animation when the user hovers over the component:

```tsx
import { Marquee } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';

function Demo() {
  return (
    <Marquee pauseOnHover>
      <MantineLogo width={80} type="full" color="blue" />
      <MantineLogo width={80} type="full" color="cyan" />
      <MantineLogo width={80} type="full" color="teal" />
      <MantineLogo width={80} type="full" color="green" />
      <MantineLogo width={80} type="full" color="lime" />
      <MantineLogo width={80} type="full" color="yellow" />
      <MantineLogo width={80} type="full" color="orange" />
      <MantineLogo width={80} type="full" color="red" />
    </Marquee>
  );
}
```


## Vertical orientation

Set `orientation="vertical"` to scroll content vertically. Note that you need to set
a fixed height on the container for vertical scrolling:

```tsx
import { Marquee } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';

function Demo() {
  return (
    <Marquee orientation="vertical" h={300}>
      <MantineLogo height={40} type="full" color="blue" />
      <MantineLogo height={40} type="full" color="cyan" />
      <MantineLogo height={40} type="full" color="teal" />
      <MantineLogo height={40} type="full" color="green" />
      <MantineLogo height={40} type="full" color="lime" />
      <MantineLogo height={40} type="full" color="yellow" />
      <MantineLogo height={40} type="full" color="orange" />
      <MantineLogo height={40} type="full" color="red" />
    </Marquee>
  );
}
```


## Multiple rows

You can combine multiple `Marquee` components with different directions to create
more complex layouts:

```tsx
import { Marquee, Stack } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';

function Demo() {
  return (
    <Stack>
      <Marquee>
        <MantineLogo height={20} type="full" color="blue" />
        <MantineLogo height={20} type="full" color="cyan" />
        <MantineLogo height={20} type="full" color="teal" />
        <MantineLogo height={20} type="full" color="green" />
      </Marquee>
      <Marquee reverse>
        <MantineLogo height={20} type="full" color="lime" />
        <MantineLogo height={20} type="full" color="yellow" />
        <MantineLogo height={20} type="full" color="orange" />
        <MantineLogo height={20} type="full" color="red" />
      </Marquee>
    </Stack>
  );
}
```


## Fade edges

By default, `Marquee` displays gradient fade on edges to create a smooth transition effect.
You can customize the fade using the following props:

* `fadeEdges` – enables/disables fade gradient (default: `true`)
* `fadeEdgeColor` – color of the fade gradient (default: `var(--mantine-color-body)`)
* `fadeEdgeSize` – size of the fade area (default: `5%`)

```tsx
import { Marquee, Stack, Text } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';

function Demo() {
  return (
    <Stack>
      <div>
        <Text size="sm" mb="xs">Default fade (5%)</Text>
        <Marquee>
          <MantineLogo width={80} type="full" color="blue" />
          <MantineLogo width={80} type="full" color="cyan" />
          <MantineLogo width={80} type="full" color="teal" />
          <MantineLogo width={80} type="full" color="green" />
        </Marquee>
      </div>

      <div>
        <Text size="sm" mb="xs">Larger fade (15%)</Text>
        <Marquee fadeEdgeSize="15%">
          <MantineLogo width={80} type="full" color="lime" />
          <MantineLogo width={80} type="full" color="yellow" />
          <MantineLogo width={80} type="full" color="orange" />
          <MantineLogo width={80} type="full" color="red" />
        </Marquee>
      </div>

      <div>
        <Text size="sm" mb="xs">Custom fade color</Text>
        <Marquee fadeEdgeColor="var(--mantine-color-blue-light)">
          <MantineLogo width={80} type="full" color="violet" />
          <MantineLogo width={80} type="full" color="grape" />
          <MantineLogo width={80} type="full" color="pink" />
          <MantineLogo width={80} type="full" color="red" />
        </Marquee>
      </div>

      <div>
        <Text size="sm" mb="xs">No fade</Text>
        <Marquee fadeEdges={false}>
          <MantineLogo width={80} type="full" color="blue" />
          <MantineLogo width={80} type="full" color="teal" />
          <MantineLogo width={80} type="full" color="green" />
          <MantineLogo width={80} type="full" color="yellow" />
        </Marquee>
      </div>
    </Stack>
  );
}
```


