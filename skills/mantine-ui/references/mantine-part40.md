## Grid gutter -> gap

The [Grid](https://mantine.dev/llms/core-grid.md) component `gutter` prop was renamed to `gap` for consistency with other layout components
(like [Flex](https://mantine.dev/llms/core-flex.md) and [SimpleGrid](https://mantine.dev/llms/core-simple-grid.md)). Additionally, new `rowGap` and `columnGap` props
were added to allow separate control of vertical and horizontal spacing:

```tsx
import { Grid } from '@mantine/core';

// ❌ No longer works
function Demo() {
  return (
    <Grid gutter="xl">
      <Grid.Col span={6}>1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
    </Grid>
  );
}

// ✅ Use the gap prop
function Demo() {
  return (
    <Grid gap="xl">
      <Grid.Col span={6}>1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
    </Grid>
  );
}

// ✅ New: Separate row and column gaps
function Demo() {
  return (
    <Grid rowGap="xl" columnGap="sm">
      <Grid.Col span={6}>1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
    </Grid>
  );
}
```

## Grid overflow="hidden" no longer required

The [Grid](https://mantine.dev/llms/core-grid.md) component no longer uses negative margins for spacing between columns.
It now uses native CSS `gap` property, so you can safely remove `overflow="hidden"` from your
`Grid` components — it is no longer needed to prevent content overflow:

```tsx
import { Grid } from '@mantine/core';

// ❌ overflow="hidden" is no longer needed
function Demo() {
  return (
    <Grid overflow="hidden">
      <Grid.Col span={6}>1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
    </Grid>
  );
}

// ✅ Remove overflow="hidden"
function Demo() {
  return (
    <Grid>
      <Grid.Col span={6}>1</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
    </Grid>
  );
}
```

## useLocalStorage and useSessionStorage return type

The `useLocalStorage` and `useSessionStorage` hooks now correctly include `undefined` in the
return type when no `defaultValue` is provided. Previously, calling these hooks without
`defaultValue` would type the value as `T` (e.g., `string`), even though at runtime
the value could be `undefined`.

If you relied on the incorrect type, update your code to handle `undefined`:

```tsx
import { useLocalStorage } from '@mantine/hooks';

// ❌ In 8.x, `value` was typed as `string` (incorrect)
const [value, setValue] = useLocalStorage({ key: 'my-key' });

// ✅ In 9.x, `value` is typed as `string | undefined`
const [value, setValue] = useLocalStorage({ key: 'my-key' });

// ✅ Provide defaultValue to keep the previous non-undefined type
const [value, setValue] = useLocalStorage({
  key: 'my-key',
  defaultValue: '',
});
```

The same change applies to `readLocalStorageValue`, `useSessionStorage`, and `readSessionStorageValue`.

## Default border-radius change

In 8.x, the default border-radius (`theme.defaultRadius`) was `sm` (`4px`).
In 9.x, the default border-radius was changed to `md` (`8px`).
To keep the previous behavior, set `defaultRadius` to `sm` in the theme:

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  defaultRadius: 'sm',
});

function Demo() {
  return <MantineProvider theme={theme}>{/* Your app */}</MantineProvider>;
}
```

## Notifications pauseResetOnHover default change

In 8.x, hovering over a notification paused the auto close timer only for that notification.
In 9.x, the default behavior changed – hovering over any notification now pauses the auto close timer of all
visible notifications. To keep the previous behavior, set `pauseResetOnHover="notification"`:

```tsx
import { Notifications } from '@mantine/notifications';

function Demo() {
  return <Notifications pauseResetOnHover="notification" />;
}
```


--------------------------------------------------------------------------------

### ControlledVsUncontrolled

# Controlled vs Uncontrolled

All Mantine inputs support both controlled and uncontrolled modes. This guide will
help you understand the difference between these two modes and when to use each of them.

## Controlled components

A controlled component is a form element whose value is controlled by React state.
The component's value is set by state, and changes are handled through event handlers that update that state.
React becomes the single source of truth for the form data.

Example of a controlled `TextInput` component:

```tsx
import { useState } from 'react';
import { TextInput } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('');

  return (
    <TextInput
      label="Controlled TextInput"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```

In this example, the input's value is always synchronized with the component's state.
Every keystroke triggers a state update,which causes a re-render with the new value.

## Uncontrolled components

An uncontrolled component manages its own state internally through the DOM (or internal state),
similar to traditional HTML form elements. React doesn't control the value directly.
Instead, you use refs or DOM methods to access the current value when needed, typically on form submission.

Example of an uncontrolled `TextInput` component:

```tsx
import { useRef } from 'react';
import { TextInput, Button } from '@mantine/core';

function Demo() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputRef.current) {
      alert(`Input value: ${inputRef.current.value}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="Uncontrolled TextInput" ref={inputRef} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

Here, the input maintains its own state. React only reads the value when explicitly requested through the ref.

## Key differences

The primary difference lies in where the state lives. Controlled components store state in React,
while uncontrolled components store it in the DOM. This fundamental distinction affects how you interact with the component throughout its lifecycle.

With controlled components, you explicitly define the value prop and handle every change.
With uncontrolled components, you set a defaultValue and let the DOM handle updates, only accessing the value when needed.

Controlled components require an onChange handler to remain interactive, whereas uncontrolled components work
without any change handlers, just like standard HTML inputs.

## When to use which

Use controlled components when:

* You need to validate or manipulate input values in real-time.
* You want to enforce specific formats or constraints on user input.
* You require immediate feedback or dynamic UI updates based on input changes.

Use uncontrolled components when:

* You want to simplify your code and reduce boilerplate for simple forms.
* You don't need to validate or manipulate input values until form submission.
* You are working with large forms where performance is a concern, and you want to minimize re-renders.

## FormData and uncontrolled components

Uncontrolled forms are often used with the [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) API,
which allows you to easily collect form values without managing state for each input. All Mantine components
support uncontrolled usage with `FormData`.

Example of using uncontrolled `Checkbox` with `FormData`:

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

## Uncontrolled use-form

[@mantine/form](https://mantine.dev/llms/form-use-form.md) supports uncontrolled mode which allows building large
forms with good performance. If you are working on complex forms with many fields, `useForm`
hook in uncontrolled mode is a great choice.

Example of uncontrolled mode with `useForm`:

```tsx
import { useState } from 'react';
import { Button, Code, Text, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '' },
    validate: {
      name: hasLength({ min: 3 }, 'Must be at least 3 characters'),
      email: isEmail('Invalid email'),
    },
  });

  const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);

  return (
    <form onSubmit={form.onSubmit(setSubmittedValues)}>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="Name"
        placeholder="Name"
      />
      <TextInput
        {...form.getInputProps('email')}
        key={form.key('email')}
        mt="md"
        label="Email"
        placeholder="Email"
      />
      <Button type="submit" mt="md">
        Submit
      </Button>

      <Text mt="md">Form values:</Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>

      <Text mt="md">Submitted values:</Text>
      <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code>
    </form>
  );
}
```


--------------------------------------------------------------------------------

### CustomComponents

# Create custom components

This guide will help you understand how to create custom components that integrate
with Mantine's theming, styling, and other core features.

`ExampleComponent` will be used as an example throughout this guide:

```tsx
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getRadius,
  MantineRadius,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import classes from './ExampleComponent.module.css';

export type ExampleComponentStylesNames = 'root' | 'inner';
export type ExampleComponentVariant = 'filled' | 'outline';
export type ExampleComponentCssVariables = {
  root: '--radius';
};

export interface ExampleComponentProps
  extends BoxProps, StylesApiProps<ExampleComponentFactory>, ElementProps<'div'> {
  /** Component border-radius */
  radius: MantineRadius;
}

export type ExampleComponentFactory = Factory<{
  props: ExampleComponentProps;
  ref: HTMLDivElement;
  stylesNames: ExampleComponentStylesNames;
  vars: ExampleComponentCssVariables;
  variant: ExampleComponentVariant;
}>;

const defaultProps = {
  radius: 'md',
} satisfies Partial<ExampleComponentProps>;

const varsResolver = createVarsResolver<ExampleComponentFactory>((_theme, { radius }) => ({
  root: {
    '--radius': getRadius(radius),
  },
}));

export const ExampleComponent = factory<ExampleComponentFactory>((_props) => {
  const props = useProps('ExampleComponent', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    attributes,
    radius,
    children,
    ...others
  } = props;

  const getStyles = useStyles<ExampleComponentFactory>({
    name: 'ExampleComponent',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver,
  });

  return (
    <Box {...getStyles('root')} {...others}>
      <div {...getStyles('inner')}>{children}</div>
    </Box>
  );
});

ExampleComponent.displayName = 'ExampleComponent';
ExampleComponent.classes = classes;
```

## Factory type

`Factory` type is used to group all types related to the component: variant, Styles API selectors, ref type,
CSS variables and other properties described later. All properties except `props` are optional.

```tsx
// Usage with Styles API when the component has related styles
export type ExampleComponentFactory = Factory<{
  props: ExampleComponentProps;
  ref: HTMLDivElement;
  stylesNames: ExampleComponentStylesNames;
  vars: ExampleComponentCssVariables;
  variant: ExampleComponentVariant;
}>;

// Component has no styles or does not expose Styles API features
export type ExampleComponentFactory = Factory<{
  props: ExampleComponentProps;
  ref: HTMLDivElement;
}>;
```

The created `ExampleComponentFactory` is then passed as the first type argument to all helper functions
imported from `@mantine/core` package: `useStyles`, `createVarsResolver` and `factory` in the example above.

`Factory` type is used for validation and IDE autocomplete. It does not modify the passed type:

```tsx
export type ExampleComponentFactory = {
  props: ExampleComponentProps;
  ref: HTMLDivElement;
};

// Both examples are the same, Factory only used for validation, it can be omitted
export type ExampleComponentFactory = Factory<{
  props: ExampleComponentProps;
  ref: HTMLDivElement;
}>;
```

## factory function

`factory` function is used to type props and assign shared static properties: `extend` and `withProps`.

```tsx
export const ExampleComponent = factory<ExampleComponentFactory>((_props) => {
  // ... component body
});

// Optionally, you can assign displayName and classes
ExampleComponent.displayName = 'ExampleComponent';
ExampleComponent.classes = classes;
```

## Box component

[Box](https://mantine.dev/llms/core-box.md) component is a base for all other components. To create custom components,
use it as the root element and spread `...others` props to it to support [style props](https://mantine.dev/llms/styles-style-props.md).

To add [style props](https://mantine.dev/llms/styles-style-props.md) types to component, extend `BoxProps`.

```tsx
// Extend props with `BoxProps` to add style props types
export interface ExampleComponentProps
  extends BoxProps, StylesApiProps<ExampleComponentFactory>, ElementProps<'div'> {
}

export const ExampleComponent = factory<ExampleComponentFactory>((_props) => {
  const props = useProps('ExampleComponent', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    attributes,
    radius,
    children,
    ...others
  } = props;

  // Spread ...others props to the Box component to support style props
  return (
    <Box {...others}>{children}</Box>
  );
});
```

## ElementProps type

`ElementProps` is used to retrieve the props a component accepts. Can either be passed a string,
indicating a DOM element (e.g. `'div'`, `'span'`, etc.) or the type of a React component. The second
type argument is optional and may be used to omit props types from the original component/element.

`ElementProps` reassigns `style` prop signature to make it compatible with Mantine components and allow
CSS variables usage.

Examples of `ElementProps` type usage:

```tsx
// Root element is `div`, extend component props with ElementProps<'div'>
export interface ExampleComponentProps extends ElementProps<'div'> {}

// Type conflict: `input` element has html attributes `color` and `size`,
// but we want to define our own types. To fix types conflict, use the second
// type argument with `'color' | 'size'` union to omit `color` and `size` from
// `input` html props.
export interface ExampleComponentProps extends ElementProps<'input', 'color' | 'size'> {
  color: 'blue' | 'red';
  size: 'sm' | 'lg';
}
```

## useProps hook

`useProps` hook is used to support [default props](https://mantine.dev/llms/theming-default-props.md). It accepts arguments:

* Component name which is used to reference component in [theme](https://mantine.dev/llms/theming-theme-object.md)
* Default props on component level
* Component props

`useProps` merges props using the order:

1. Component props – highest priority
2. [Default props](https://mantine.dev/llms/theming-default-props.md) on theme – lower priority
3. Default props define on component level – used only if prop is not defined in previous steps

Example of using `useProps`:

```tsx
const defaultProps = {
  radius: 'md',
} satisfies Partial<ExampleComponentProps>;

export const ExampleComponent = factory<ExampleComponentFactory>((_props) => {
  const props = useProps('ExampleComponent', defaultProps, _props);
  // Extract individual props only after processing with useProps
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    attributes,
    radius,
    children,
    ...others
  } = props;

  // ... component body
});
```

`defaultProps` passed to `useProps` must use `satisfies Partial<ExampleComponentProps>` type assertion
to correctly type props:

```tsx
export interface ExampleComponentProps
  extends BoxProps, StylesApiProps<ExampleComponentFactory>, ElementProps<'div'> {
  /** Component border-radius */
  radius?: MantineRadius;
}

// ✅ useProps can infer types correctly
// `radius` prop is `MantineRadius`
const defaultProps = {
  radius: 'md',
} satisfies Partial<ExampleComponentProps>;

// ❌ useProps cannot infer types correctly
// `radius` prop is `MantineRadius | undefined`
const defaultProps: Partial<ExampleComponentProps> = {
  radius: 'md',
};
```

You can use [defaultProps](https://mantine.dev/llms/theming-default-props.md) the following way:

```tsx
import { MantineProvider, Button, Group, createTheme } from '@mantine/core';
import { ExampleComponent } from './ExampleComponent';

const theme = createTheme({
  components: {
    ExampleComponent: ExampleComponent.extend({
      defaultProps: {
        radius: 'sm',
      },
    }),
  },
});
```

## useStyles hook

`useStyles` hook is used to support [Styles API](https://mantine.dev/llms/styles-styles-api.md) features:
`classNames`, `styles`, `attributes` and other related properties.

`useStyles` returns `getStyles` function, which returns an object that should be
spread (`{...getStyles('root')}`) to an element.

```tsx
// 🔝 See full component code above
const getStyles = useStyles<ExampleComponentFactory>({
  // Component name, used to generate static selectors (.mantine-ExampleComponent-root)
  // and for `classNames`, `styles` support in theme object
  name: 'ExampleComponent',

  // CSS modules classes, usually imported from `*.module.css` file directly
  classes,

  // Component props returned from `useProps` hook,
  // used for resolving `classNames` and `styles` with callback function notation
  props,

  // Element that must have `className` and `style` passed to the component
  // optional, `root` is the default value
  rootSelector: 'root',

  // className and style are added to the root element (rootSelector)
  className,
  style,

  // classNames, attributes and styles are resolved automatically by useStyles hook
  classNames,
  attributes,
  styles,

  // `getStyles` omits all styles if unstyled is set
  unstyled,

  // CSS variables resolver, defined in component file, described later
  varsResolver,

  // CSS variables resolved override, defined in user application
  vars,
});
```

## getStyles function

`getStyles` function is returned by `useStyles` hook. The first argument is a Styles API selector,
the second argument can be used to add `className` or `style` to the returned object.

```tsx
<Box {...getStyles('root')}>
  <div {...getStyles('inner', { className: 'custom-class', style: { color: 'red' } })}>
    {children}
  </div>
</Box>
```

## varsResolver

Use `varsResolver` to transform component props into CSS variables.

Example of `varsResolver` usage in [Button](https://mantine.dev/llms/core-button.md) component:

```tsx
import { getFontSize, getSize, createVarsResolver } from '@mantine/core';

const varsResolver = createVarsResolver<ButtonFactory>(
  (theme, { radius, color, gradient, variant, size, justify, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || 'filled',
      autoContrast,
    });

    return {
      root: {
        '--button-justify': justify,
        '--button-height': getSize(size, 'button-height'),
        '--button-padding-x': getSize(size, 'button-padding-x'),
        '--button-fz': size?.includes('compact')
          ? getFontSize(size.replace('compact-', ''))
          : getFontSize(size),
        '--button-radius': radius === undefined ? undefined : getRadius(radius),
        '--button-bg': color || variant ? colors.background : undefined,
        '--button-hover': color || variant ? colors.hover : undefined,
        '--button-color': colors.color,
        '--button-bd': color || variant ? colors.border : undefined,
        '--button-hover-color': color || variant ? colors.hoverColor : undefined,
      },
    };
  }
);
```

## Compound components

Compound components (`Button.Group`, `Input.Wrapper`, etc.) are defined as static properties
on the main component and assigned as type in the main component factory.

Example of assigning compound components in [Tabs](https://mantine.dev/llms/core-tabs.md) component:

```tsx
export type TabsFactory = Factory<{
  props: TabsProps;
  ref: HTMLDivElement;
  variant: TabsVariant;
  stylesNames: TabsStylesNames;
  vars: TabsCssVariables;

  // Set compound components types
  staticComponents: {
    Tab: typeof TabsTab;
    Panel: typeof TabsPanel;
    List: typeof TabsList;
  };
}>;

export const Tabs = factory<TabsFactory>((_props) => {
  // ... component body
});

// Assign compound components
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
Tabs.List = TabsList;
```

## Namespace exports

Mantine components support namespace exports to group related types with the component.
For example, `Button` component exports related types as `Button.*`:

```tsx
import { Button } from '@mantine/core';

// Props type, does not require separate import
type Props = Button.Props;
```

To implement this feature, add namespace exports at the end of the component file or `index.ts`.
Example of [Button](https://mantine.dev/llms/core-button.md) component namespace exports:

```tsx
export namespace Button {
  export type Props = ButtonProps;
  export type StylesNames = ButtonStylesNames;
  export type CssVariables = ButtonCssVariables;
  export type Factory = ButtonFactory;
  export type Variant = ButtonVariant;
  export type Size = ButtonSize;

  export namespace Group {
    export type Props = ButtonGroupProps;
    export type StylesNames = ButtonGroupStylesNames;
    export type CssVariables = ButtonGroupCssVariables;
    export type Factory = ButtonGroupFactory;
  }

  export namespace GroupSection {
    export type Props = ButtonGroupSectionProps;
    export type StylesNames = ButtonGroupSectionStylesNames;
    export type CssVariables = ButtonGroupSectionCssVariables;
    export type Factory = ButtonGroupSectionFactory;
  }
}
```

## polymorphicFactory

`polymorphicFactory` is used to create [polymorphic components](https://mantine.dev/llms/guides-polymorphic.md).
Use `polymorphicFactory` instead of `factory` if you need to change the root element.
For example, [Button](https://mantine.dev/llms/core-button.md) component is polymorphic: the default root element is `button`,
but it can be changed to `a` or any other element using `component` and `renderRoot` props.

`polymorphicFactory` operates only with types, it does not modify the component behavior compared
to `factory`. Types of components created with `polymorphicFactory` add overhead for TypeScript and
slow down IDE autocomplete, use it only when necessary.

Full polymorphic component example:

```tsx
import {
  Box,
  BoxProps,
  createVarsResolver,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import classes from './PolymorphicExample.module.css';

export type PolymorphicExampleStylesNames = 'root';
export type PolymorphicExampleVariant = string;
export type PolymorphicExampleCssVariables = {
  root: '--test';
};

export interface PolymorphicExampleProps
  extends BoxProps, StylesApiProps<PolymorphicExampleFactory> {}

export type PolymorphicExampleFactory = PolymorphicFactory<{
  props: PolymorphicExampleProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: PolymorphicExampleStylesNames;
  vars: PolymorphicExampleCssVariables;
  variant: PolymorphicExampleVariant;
}>;

const defaultProps = {} satisfies Partial<PolymorphicExampleProps>;

const varsResolver = createVarsResolver<PolymorphicExampleFactory>(() => ({
  root: {
    '--test': 'test',
  },
}));

export const PolymorphicExample = polymorphicFactory<PolymorphicExampleFactory>((_props) => {
  const props = useProps('PolymorphicExample', defaultProps, _props);
  const { classNames, className, style, styles, unstyled, vars, attributes, ...others } = props;

  const getStyles = useStyles<PolymorphicExampleFactory>({
    name: 'PolymorphicExample',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver,
  });

  return <Box {...getStyles('root')} {...others} />;
});

PolymorphicExample.displayName = '@mantine/core/PolymorphicExample';
```

## genericFactory

Use `genericFactory` to create components accepting generic type arguments.
For example, [Accordion](https://mantine.dev/llms/core-accordion.md) component `value` and `onChange` props type
depend on the `multiple` prop value.

```tsx
type AccordionValue<Multiple extends boolean> = Multiple extends true
  ? string[]
  : string | null;

// Define props interface with generic type argument
export interface AccordionProps<Multiple extends boolean = false>
  extends
    BoxProps,
    StylesApiProps<AccordionFactory>,
    ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
  // props that depend on the generic type argument
  multiple?: Multiple;
  value?: AccordionValue<Multiple>;
  defaultValue?: AccordionValue<Multiple>;
  onChange?: (value: AccordionValue<Multiple>) => void;

  // ... other props
}
export type AccordionFactory = Factory<{
  // Signature with generic type argument
  signature: <Multiple extends boolean = false>(
    props: AccordionProps<Multiple>
  ) => React.JSX.Element;

  // other properties same as in regular factory
  props: AccordionProps;
  ref: HTMLDivElement;
  // ...
}>;
```


--------------------------------------------------------------------------------

### FunctionsReference

# Functions reference

This guide contains a list of functions exported from Mantine packages that
are not documented elsewhere.

## clamp

The `clamp` function is exported from `@mantine/hooks`.
It clamps a number within the inclusive lower and upper bounds.

```tsx
import { clamp } from '@mantine/hooks';

// With both min and max boundaries
clamp(10, 0, 5); // 5
clamp(100, 0, 5); // 5
clamp(-100, 0, 5); // 0

// With only min boundary
clamp(10, 0, undefined); // 10
clamp(-100, 0, undefined); // 0

// With only max boundary
clamp(0, undefined, 5); // 0
clamp(10, undefined, 5); // 5
```

## lowerFirst

The `lowerFirst` function is exported from `@mantine/hooks`.
It converts the first character of a string to lowercase.

```tsx
import { lowerFirst } from '@mantine/hooks';

lowerFirst('Mantine'); // mantine
lowerFirst('mantine'); // mantine
```

## upperFirst

The `upperFirst` function is exported from `@mantine/hooks`.
It converts the first character of a string to uppercase.

```tsx
import { upperFirst } from '@mantine/hooks';

upperFirst('Mantine'); // Mantine
upperFirst('mantine'); // Mantine
```

## randomId

The `randomId` function is exported from `@mantine/hooks`.
It generates a random id with the `mantine-` prefix.

```tsx
import { randomId } from '@mantine/hooks';

randomId(); // mantine-d7h137oav
randomId(); // mantine-1q2j3j4j5
```

## range

The `range` function is exported from `@mantine/hooks`.
It generates an array of numbers from `start` to `end` (inclusive).

```tsx
import { range } from '@mantine/hooks';

range(0, 5); // [0, 1, 2, 3, 4, 5]
range(5, 0); // [5, 4, 3, 2, 1, 0]
```

## shallowEqual

The `shallowEqual` function is exported from `@mantine/hooks`.
It performs a shallow equality check of two objects.

```tsx
import { shallowEqual } from '@mantine/hooks';

shallowEqual({ a: 1 }, { a: 1 }); // true
shallowEqual({ a: 1 }, { a: 2 }); // false
```

## keys

The `keys` function is exported from `@mantine/core`.
It is a type-safe wrapper around `Object.keys` – it returns
an array of keys typed as `(keyof T)[]` instead of `string[]`.

```tsx
import { keys } from '@mantine/core';

const data = { name: 'Mantine', age: 4 };
const result = keys(data); // ('name' | 'age')[]
```

## deepMerge

The `deepMerge` function is exported from `@mantine/core`.
It recursively merges properties of the source object into the target object.
Arrays are not merged – they are replaced entirely by the source value.

```tsx
import { deepMerge } from '@mantine/core';

deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 } });
// { a: 1, b: { c: 2, d: 3 } }

deepMerge({ a: 1 }, { a: 2, b: 3 });
// { a: 2, b: 3 }
```

## filterProps

The `filterProps` function is exported from `@mantine/core`.
It removes all `undefined` properties from the given object.

```tsx
import { filterProps } from '@mantine/core';

filterProps({ a: 1, b: undefined, c: 'hello' });
// { a: 1, c: 'hello' }
```

## isElement

The `isElement` function is exported from `@mantine/core`.
It is a type guard that checks whether a value is a React element.
Returns `false` for arrays, `null`, and React Fragments.

```tsx
import { isElement } from '@mantine/core';

isElement(<div />); // true
isElement('string'); // false
isElement(null); // false
isElement(<></>); // false
```

## isNumberLike

The `isNumberLike` function is exported from `@mantine/core`.
It checks whether a value is a number or a string that represents
a CSS numeric value (including `calc()`, `var()`, and CSS units).

```tsx
import { isNumberLike } from '@mantine/core';

isNumberLike(10); // true
isNumberLike('10px'); // true
isNumberLike('1.5rem'); // true
isNumberLike('calc(100% - 10px)'); // true
isNumberLike('var(--size)'); // true
isNumberLike('hello'); // false
```

## camelToKebabCase

The `camelToKebabCase` function is exported from `@mantine/core`.
It converts a camelCase string to kebab-case.

```tsx
import { camelToKebabCase } from '@mantine/core';

camelToKebabCase('backgroundColor'); // 'background-color'
camelToKebabCase('fontSize'); // 'font-size'
camelToKebabCase('color'); // 'color'
```

## getDefaultZIndex

The `getDefaultZIndex` function is exported from `@mantine/core`.
It returns the default z-index value for a given elevation level.

```tsx
import { getDefaultZIndex } from '@mantine/core';

getDefaultZIndex('app'); // 100
getDefaultZIndex('modal'); // 200
getDefaultZIndex('popover'); // 300
getDefaultZIndex('overlay'); // 400
getDefaultZIndex('max'); // 9999
```

## closeOnEscape

The `closeOnEscape` function is exported from `@mantine/core`.
It creates a keyboard event handler that calls the given callback
when the Escape key is pressed.

```tsx
import { closeOnEscape } from '@mantine/core';

// Basic usage
<div onKeyDown={closeOnEscape(() => setOpened(false))} />;

// With options
<div
  onKeyDown={closeOnEscape(() => setOpened(false), {
    active: isOpened,
    onTrigger: () => console.log('closed'),
  })}
/>;
```

## noop

The `noop` function is exported from `@mantine/core`.
It is a no-operation function that does nothing. Useful as a
default callback.

```tsx
import { noop } from '@mantine/core';

const onClick = handler || noop;
```

## findClosestNumber

The `findClosestNumber` function is exported from `@mantine/core`.
It finds the number in the given array that is closest to the
provided value. Returns the value itself if the array is empty.

```tsx
import { findClosestNumber } from '@mantine/core';

findClosestNumber(3, [1, 5, 10]); // 1
findClosestNumber(7, [1, 5, 10]); // 5
findClosestNumber(9, [1, 5, 10]); // 10
findClosestNumber(5, []); // 5
```

## toDateString

The `toDateString` function is exported from `@mantine/dates`.
It converts a date value to a `YYYY-MM-DD` string.
Accepts `Date`, `string`, `number`, and dayjs objects.
Returns `null` or `undefined` if the input is `null` or `undefined`.

```tsx
import { toDateString } from '@mantine/dates';

toDateString(new Date(2025, 0, 15)); // '2025-01-15'
toDateString('2025-01-15 14:30:00'); // '2025-01-15'
toDateString(null); // null
toDateString(undefined); // undefined
```

## toDateTimeString

The `toDateTimeString` function is exported from `@mantine/dates`.
It converts a date value to a `YYYY-MM-DD HH:mm:ss` string.
Accepts `Date`, `string`, `number`, and dayjs objects.
Returns `null` or `undefined` if the input is `null` or `undefined`.

```tsx
import { toDateTimeString } from '@mantine/dates';

toDateTimeString(new Date(2025, 0, 15, 14, 30, 0)); // '2025-01-15 14:30:00'
toDateTimeString('2025-01-15'); // '2025-01-15 00:00:00'
toDateTimeString(null); // null
```

## assignTime

The `assignTime` function is exported from `@mantine/dates`.
It assigns a time string in `HH:mm:ss` format to a date value,
returning a `YYYY-MM-DD HH:mm:ss` string. If the date value is `null`,
the current date is used.

```tsx
import { assignTime } from '@mantine/dates';

assignTime('2025-01-15', '14:30:00'); // '2025-01-15 14:30:00'
assignTime('2025-01-15 08:00:00', '20:15:30'); // '2025-01-15 20:15:30'
assignTime(null, '10:00:00'); // '[current date] 10:00:00'
```

## clampDate

The `clampDate` function is exported from `@mantine/dates`.
It clamps a date between optional min and max boundaries, returning
a `YYYY-MM-DD HH:mm:ss` string.

```tsx
import { clampDate } from '@mantine/dates';

clampDate('2025-01-01', '2025-12-31', '2025-06-15');
// '2025-06-15 00:00:00' – within range

clampDate('2025-01-01', '2025-12-31', '2024-06-15');
// '2025-01-01 00:00:00' – clamped to min

clampDate('2025-01-01', '2025-12-31', '2026-06-15');
// '2025-12-31 00:00:00' – clamped to max

clampDate(undefined, undefined, '2025-06-15');
// '2025-06-15 00:00:00' – no boundaries
```


--------------------------------------------------------------------------------

### Gatsby

# Usage with Gatsby

## Generate new application

Follow the [Gatsby quick start](https://www.gatsbyjs.com/docs/quick-start/) guide to
create a new Gatsby application:

When asked "Would you like to install a styling system?", select `PostCSS`.

## Installation

## PostCSS setup

Install PostCSS plugins and [postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md):

```bash
yarn add postcss postcss-preset-mantine postcss-simple-vars
```

```bash
npm install postcss postcss-preset-mantine postcss-simple-vars
```

Create a `postcss.config.cjs` file at the root of your application with the following content:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

## Setup

Create a `src/theme.ts` file with your theme override:

```tsx
// src/theme.ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'serif',
  // ... other theme override properties
});
```

Create a `gatsby-ssr.tsx` file with the following content:

```tsx
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from './src/theme';

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();
  replaceHeadComponents([
    ...headComponents,
    <ColorSchemeScript key="color-scheme-script" />,
  ]);
};

export const wrapPageElement = ({ element }) => {
  return <MantineProvider theme={theme}>{element}</MantineProvider>;
};
```

Create a `gatsby-browser.tsx` file with the following content:

```tsx
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { theme } from './src/theme';

export const wrapPageElement = ({ element }) => {
  return <MantineProvider theme={theme}>{element}</MantineProvider>;
};
```

All set! Start the development server:

```bash
npm run develop
```

## CSS modules

By default, Gatsby has different syntax for importing CSS modules:

```tsx
// Default syntax – will not work in Gatsby
import classes from './Demo.module.css';

// Gatsby syntax
import * as classes from './Demo.module.css';
```


--------------------------------------------------------------------------------

### Icons

# Icon libraries with Mantine

You can use any icon library with Mantine components. The most popular options are:

* [Phosphor icons](https://phosphoricons.com/)
* [Tabler icons](https://tabler-icons.io/)
* [Feather icons](https://feathericons.com/)
* [Radix icons](https://icons.radix-ui.com/)
* [react-icons](https://react-icons.github.io/react-icons/)
* [Font Awesome](https://fontawesome.com/v5/docs/web/use-with/react)

## Phosphor icons

[Phosphor icons](https://phosphoricons.com/) are used in Mantine demos, documentation,
and some `@mantine/` packages depend on them. If you don't know which icon library
to use, we recommend [Phosphor icons](https://phosphoricons.com/).

## Icon size

Most icon libraries support a `size` prop (or similar `width` and `height` props) that allows you to change the
icon width and height. Usually, it's a number in pixels.

```tsx
import { AtomIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <AtomIcon
      size={80}
      color="var(--mantine-color-blue-filled)"
    />
  );
}
```


> **rem units in size prop**
>
> The icon `size` prop is usually converted to `width` and `height` props under the hood.
> If you set `size={16}` it will be converted to `width="16"` and `height="16"` attributes
> on the svg element.
>
> You can use rem units in the `size` prop: `size="1rem"` will be converted to `width="1rem"` and `height="1rem"`,
> but it's not recommended as it's prohibited by the SVG standard – some browsers (Firefox) will show a warning in the console.

## Custom icons

We recommend using icons as React components. In this case, you'll be able to use
`currentColor` in the `fill` and `stroke` props. This will change the icon color based on the context
it's used in.

```tsx
// AddressBookIcon.tsx
interface AddressBookIconProps extends React.ComponentProps<'svg'> {
  size?: number | string;
}

export function AddressBookIcon({ size, style, ...others }: AddressBookIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      style={{ width: size, height: size, ...style }}
      {...others}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M20 6v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2zM10 16h6" />
      <path d="M11 11a2 2 0 104 0 2 2 0 10-4 0M4 8h3M4 12h3M4 16h3" />
    </svg>
  );
}

// Demo.tsx
import { Button } from '@mantine/core';
import { AddressBookIcon } from './AddressBookIcon';

function Demo() {
  return <Button leftSection={<AddressBookIcon size={18} />}>Demo</Button>;
}
```



--------------------------------------------------------------------------------

### JavaScript

# Usage with JavaScript

## Is it possible to use Mantine with JavaScript?

Yes, it's possible to use all `@mantine/*` packages (as well as all other npm packages) with JavaScript.
`@mantine/*` packages are written in TypeScript and have type definitions, so you'll get some benefits
of TypeScript (like autocompletion in your IDE) when using them with JavaScript.

## Transforming demos code to JavaScript

All demos in Mantine documentation are written in TypeScript. In most cases, there's no difference between
TypeScript and JavaScript code – you don't have to do anything.

To transform TypeScript code to JavaScript, you can use the [TypeScript playground](https://www.typescriptlang.org/play?jsx=1\&preserveValueImports=false#code/Q)
– paste the demo code into the playground and all types will be removed. Note that you'll also need
to remove type imports from the code.

Example of transformed code:

```tsx
// TypeScript code
import { Button, ButtonProps } from '@mantine/core';

interface MyButtonProps extends ButtonProps {
  myProp: string;
}

function MyButton({ myProp, ...others }: MyButtonProps) {
  return <Button {...others} />;
}
```

```tsx
// JavaScript code
import { Button } from '@mantine/core';

function MyButton({ myProp, ...others }) {
  return <Button {...others} />;
}
```

## Should Mantine be used with JavaScript?

We recommend using Mantine with TypeScript. It doesn't require deep knowledge of TypeScript
and will make your code more robust and easier to maintain. For example, you'll get type errors
when you pass invalid props to components or when you use non-existent props. TypeScript will also
help you during migration to new versions of Mantine – you'll get type errors when props/components
that you have in your code are removed/renamed/changed.

If you're not familiar with TypeScript yet, using Mantine with TypeScript will be a great opportunity
to learn it. You can use any of the [templates](https://mantine.dev/llms/getting-started.md) to get started – all of them include
TypeScript support out of the box.


--------------------------------------------------------------------------------

### Jest

# Testing with Jest

This guide will help you set up [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for your project.
Note that this guide only covers shared logic that can be applied to any framework, and
it doesn't cover the initial setup of [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) as it may vary depending on the framework you're using.

## Custom render

All Mantine components require [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) to be present in the component tree.
To add [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md) to the component tree in your tests, create a [custom render](https://testing-library.com/docs/react-testing-library/setup/#custom-render)
function:

```tsx
// ./test-utils/render.tsx
import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
// Import your theme object
import { theme } from '../src/theme';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme} env="test">{children}</MantineProvider>
    ),
  });
}
```

It's usually more convenient to export all `@testing-library/*` functions that you're planning to use
from a `./testing-utils/index.ts` file:

```tsx
import userEvent from '@testing-library/user-event';

export * from '@testing-library/react';
export { render } from './render';
export { userEvent };
```

Then you should import all testing utilities from `./testing-utils` instead of `@testing-library/react`:

```tsx
import { render, screen } from '../test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<Welcome />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      'https://mantine.dev/guides/next/'
    );
  });
});
```

## Mock Web APIs

Most Mantine components depend on browser APIs like `window.matchMedia` or `ResizeObserver`.
These APIs aren't available in the `jest-environment-jsdom` environment and you'll need to mock them in your tests.

Create a `jest.setup.js` file in your project root and add the following code to it:

```tsx
import '@testing-library/jest-dom';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(document, 'fonts', {
  value: { addEventListener: jest.fn(), removeEventListener: jest.fn() },
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
```

Then add it as a setup file in your `jest.config.js`:

```js
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // ... rest of your config
};
```

## Framework specific setup

Jest setup for different frameworks may vary and usually changes over time.
To learn how to set up Jest for your framework, either check the [Jest](https://jestjs.io/docs/getting-started)
and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) documentation
or check one of the premade [templates](https://mantine.dev/llms/getting-started.md). Most of the templates include Jest setup, and
you can use them as a reference.

## Testing examples

You can find testing examples in Mantine Help Center:

* [How can I test Modal/Drawer/Popover components?](https://help.mantine.dev/q/portals-testing)
* [How can I test Select/MultiSelect components?](https://help.mantine.dev/q/combobox-testing)


--------------------------------------------------------------------------------

### LLMDocumentation

# Mantine with LLMs

Mantine provides LLM-friendly documentation to help AI tools like **Cursor**, **Windsurf**, **GitHub Copilot**, **ChatGPT**, and **Claude** understand and work with the Mantine UI library.

`llms.txt` documentation is updated with every Mantine release.

## Documentation

Links:

* [llms.txt](/llms.txt) – compact
* [Download](/llms-full.txt) full documentation in single document (~1.8MB)

The LLM documentation includes:

* **Getting Started** - Installation and setup guides
* **Components** - All Mantine components with props, examples, and usage
* **Hooks** - Complete hooks documentation with examples
* **Theming** - Theme customization and MantineProvider setup
* **Styles** - CSS modules, CSS variables, and styling approaches
* **Frequently Asked Questions** - Common questions and solutions

## Cursor

In Cursor, you can reference the documentation using the `@Docs` feature:

1. Type `@Docs` in your prompt
2. Reference the Mantine documentation URL: `https://mantine.dev/llms.txt`
3. Ask questions about Mantine components, styling, or implementation

## Windsurf

For Windsurf users:

1. Reference the documentation using `@https://mantine.dev/llms.txt`
2. Or add it to your `.windsurfrules` file for persistent access

## ChatGPT and Claude

When using ChatGPT or Claude:

1. Mention that you're using Mantine v8
2. Reference the documentation URL: `https://mantine.dev/llms.txt`
3. The AI will fetch and use the documentation to provide accurate answers

### GitHub Copilot

While Copilot doesn't directly support external documentation, you can:

1. Include relevant documentation snippets in your comments
2. Reference component names and props accurately for better suggestions

## Skills

Mantine also provides skills for AI coding agents in the
[`mantinedev/skills`](https://github.com/mantinedev/skills) repository.

Currently available skills:

* `mantine-combobox` – Build custom select/autocomplete/multiselect components with `Combobox`
* `mantine-form` – Build forms with `@mantine/form`, validation, nested fields, and form context
* `mantine-custom-components` – Create custom components with Mantine factory APIs and Styles API

### Install skills

Install each skill from the repository:

```bash
npx skills add https://github.com/mantinedev/skills --skill mantine-combobox
npx skills add https://github.com/mantinedev/skills --skill mantine-form
npx skills add https://github.com/mantinedev/skills --skill mantine-custom-components
```

### Use skills

In your AI prompt, explicitly tell the agent to use one of the installed skills.

Examples:

* "Use `$mantine-form` and build a profile form with validation and nested fields"
* "Use `$mantine-combobox` and create a searchable multi-select with custom option rendering"
* "Use `$mantine-custom-components` and scaffold a polymorphic component with Styles API support"

If your agent does not support `$skill-name` mentions, reference the skill name in plain text and ask the agent to follow it.

