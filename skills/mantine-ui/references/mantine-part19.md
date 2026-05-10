## Get control ref

```tsx
import { useRef } from 'react';
import { Spoiler } from '@mantine/core';

function Demo() {
  const spoilerControlRef = useRef<HTMLButtonElement>(null);
  return (
    <Spoiler
      controlRef={spoilerControlRef}
      hideLabel="Hide"
      showLabel="Show"
    />
  );
}
```

## Accessibility

The Spoiler component implements proper ARIA attributes for screen reader support:

* Toggle button has `aria-expanded` indicating the expanded/collapsed state
* Content region has `role="region"` and is associated with the button via `aria-controls`
* Keyboard support: Space or Enter key toggles the spoiler when the button is focused

### Best practices for label text

Provide descriptive labels for `showLabel` and `hideLabel` props that clearly indicate the action:

```tsx
// Good - clear, descriptive labels
<Spoiler showLabel="Show full article" hideLabel="Hide article" />
<Spoiler showLabel="Expand details" hideLabel="Collapse details" />

// Avoid vague labels
<Spoiler showLabel="More" hideLabel="Less" />
<Spoiler showLabel="..." hideLabel="..." />
```

### Custom accessibility labels

If your button labels don't clearly describe the action for screen reader users, use the `showAriaLabel` and `hideAriaLabel` props to provide custom ARIA labels:

```tsx
import { Spoiler } from '@mantine/core';

function Demo() {
  return (
    <Spoiler
      showLabel="👁️"
      hideLabel="👁️"
      showAriaLabel="Show discussion comments"
      hideAriaLabel="Hide discussion comments"
    >
      {/* Comments content */}
    </Spoiler>
  );
}
```


#### Props

**Spoiler props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| controlRef | Ref<HTMLButtonElement> | - | Ref of the toggle button element |
| defaultExpanded | boolean | - | Initial expanded state in uncontrolled mode. If `true`, content starts expanded. If `false`, content starts collapsed |
| expanded | boolean | - | Controlled expanded state value |
| hideAriaLabel | string | - | Accessible label for the toggle button when expanded. If not set, `hideLabel` is used |
| hideLabel | React.ReactNode | required | Content displayed in the toggle button when content is expanded (to collapse) |
| maxHeight | number | - | Maximum height of visible content in px. When content exceeds this height, the toggle control appears |
| onExpandedChange | (expanded: boolean) => void | - | Called when expanded state changes (when spoiler visibility is toggled by the user) |
| showAriaLabel | string | - | Accessible label for the toggle button when collapsed. If not set, `showLabel` is used |
| showLabel | React.ReactNode | required | Content displayed in the toggle button when content is collapsed (to expand) |
| transitionDuration | number | - | Spoiler reveal transition duration in ms. Set to 0 to disable animation |


#### Styles API

Spoiler component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Spoiler selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Spoiler-root | Root element |
| content | .mantine-Spoiler-content | Wraps content to set max-height and transition |
| control | .mantine-Spoiler-control | Show/hide content control |

**Spoiler CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --spoiler-transition-duration | Controls transition duration |

**Spoiler data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| root | data-has-spoiler | Whether the control button is shown or not | - |


--------------------------------------------------------------------------------

### Stack
Package: @mantine/core
Import: import { Stack } from '@mantine/core';
Description: Compose elements and components in a vertical flex container

## Usage

`Stack` is a vertical flex container. If you need a horizontal flex container, use [Group](https://mantine.dev/llms/core-group.md)
component instead. If you need to have full control over flex container properties, use [Flex](https://mantine.dev/llms/core-flex.md) component.

```tsx
import { Stack, Button } from '@mantine/core';

function Demo() {
  return (
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
       align="stretch" justify="center" gap="md"
    >
      <Button variant="default">1</Button>
      <Button variant="default">2</Button>
      <Button variant="default">3</Button>
    </Stack>
  );
}
```


## Browser support

Flex component uses CSS flexbox gap to add spacing between children. Flexbox gap is supported by all modern browsers, but if you need to support older browsers, use Space component instead.


#### Props

**Stack props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| align | AlignItems | - | Controls `align-items` CSS property |
| gap | MantineSpacing | - | Key of `theme.spacing` or any valid CSS value to set `gap` property, numbers are converted to rem |
| justify | JustifyContent | - | Controls `justify-content` CSS property |


#### Styles API

Stack component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Stack selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Stack-root | Root element |

**Stack CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --stack-align | Controls `align-items` property |
| root | --stack-justify | Controls `justify-content` property |
| root | --stack-gap | Controls `gap` property |


--------------------------------------------------------------------------------

### Stepper
Package: @mantine/core
Import: import { Stepper } from '@mantine/core';
Description: Display content divided into a steps sequence

## Usage

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


## Allow step select

To disable step selection, set the `allowStepSelect` prop on the `Stepper.Step` component.
It can be used to prevent the user from reaching the next steps while letting them go back and forth between steps they've already reached before:

```tsx
import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="First step"
          description="Create an account"
          allowStepSelect={shouldAllowSelectStep(0)}
        >
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description="Verify email"
          allowStepSelect={shouldAllowSelectStep(1)}
        >
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Get full access"
          allowStepSelect={shouldAllowSelectStep(2)}
        >
          Step 3 content: Get full access
        </Stepper.Step>

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={() => handleStepChange(active - 1)}>
          Back
        </Button>
        <Button onClick={() => handleStepChange(active + 1)}>Next step</Button>
      </Group>
    </>
  );
}
```


## Disable next steps selection

Another way to disable the selection of upcoming steps is to use the `allowNextStepsSelect` directly on the `Stepper` component.
This is useful when you don't need to control the behavior specifically for each step.

```tsx
import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
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


## Color, radius and size

```tsx
import { Stepper } from '@mantine/core';

function Demo() {
  return (
    <Stepper color="blue" radius="xl" size="md" active={1}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
    </Stepper>
  );
}
```


Component size is controlled by two props: `size` and `iconSize`.
The `size` prop controls icon size, label and description font size.
`iconSize` allows you to overwrite the icon size separately from other size values:

```tsx
import { Stepper } from '@mantine/core';

function Demo() {
  return (
    <Stepper iconSize={42} active={1}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
    </Stepper>
  );
}
```


## With custom icons

You can replace the step icon by setting the `icon` prop on the `Stepper.Step` component.
To change the completed check icon, set `completedIcon` on the `Stepper` component.
You can use any React node as an icon: component, string, number:

```tsx
import { useState } from 'react';
import { UserCheckIcon, EnvelopeOpenIcon, ShieldCheckIcon, CheckCircleIcon } from '@phosphor-icons/react';
import { Stepper } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      completedIcon={<CheckCircleIcon size={18} />}
    >
      <Stepper.Step
        icon={<UserCheckIcon size={18} />}
        label="Step 1"
        description="Create an account"
      />
      <Stepper.Step
        icon={<EnvelopeOpenIcon size={18} />}
        label="Step 2"
        description="Verify email"
      />
      <Stepper.Step
        icon={<ShieldCheckIcon size={18} />}
        label="Step 3"
        description="Get full access"
      />
    </Stepper>
  );
}
```


You can use `Stepper` with icons only. Note that in this case, you will have to
set `aria-label` or `title` on the `Stepper.Step` component to make it accessible:

```tsx
import { useState } from 'react';
import { Stepper } from '@mantine/core';
import { UserCheckIcon, EnvelopeOpenIcon, ShieldCheckIcon } from '@phosphor-icons/react';

function Demo() {
  const [active, setActive] = useState(0);

  return (
    <Stepper active={active} onStepClick={setActive}>
      <Stepper.Step icon={<UserCheckIcon size={18} />} />
      <Stepper.Step icon={<EnvelopeOpenIcon size={18} />} />
      <Stepper.Step icon={<ShieldCheckIcon size={18} />} />
    </Stepper>
  );
}
```


You can also change the completed icon for each step, for example, to indicate an error state:

```tsx
import { Stepper } from '@mantine/core';
import { XCircleIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Stepper active={2}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step
        label="Step 2"
        description="Verify email"
        color="red"
        completedIcon={<XCircleIcon size={20} />}
      />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}
```


## Vertical orientation

```tsx
import { useState } from 'react';
import { Stepper } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper active={active} onStepClick={setActive} orientation="vertical">
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}
```


## Icon position

To change the step icon and body arrangement, set `iconPosition="right"`:

```tsx
import { useState } from 'react';
import { Stepper } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper active={active} onStepClick={setActive} iconPosition="right">
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}
```


## Get step ref

You can get refs of the step button and stepper root element (div):

```tsx
import { useRef } from 'react';
import { Stepper } from '@mantine/core';

function MyStepper() {
  const firstStep = useRef<HTMLButtonElement>(null);
  const stepper = useRef<HTMLDivElement>(null);

  return (
    <Stepper ref={stepper} active={0}>
      <Stepper.Step label="First step" ref={firstStep} />
      <Stepper.Step label="Second step" />
    </Stepper>
  );
}
```

## Wrap Stepper.Step

`Stepper` component relies on `Stepper.Step` order. Wrapping `Stepper.Step` is not supported.
Instead, you will need to use different approaches:

```tsx
import { Stepper } from '@mantine/core';

// This will not work, step children will not render
function WillNotWork() {
  return (
    <Stepper.Step label="Nope" description="It will not work">
      This part will not render
    </Stepper.Step>
  );
}

// Create a separate component for children
function WillWork() {
  return <div>This will work as expected!</div>;
}

function Demo() {
  return (
    <Stepper active={1}>
      <Stepper.Step label="Regular step">First step</Stepper.Step>
      {/* Wrapped Stepper.Step will not render children, do not do that */}
      <WillNotWork />
      <Stepper.Step label="Step with custom content">
        <WillWork />
      </Stepper.Step>
      <Stepper.Step label="Regular step">Third step</Stepper.Step>
    </Stepper>
  );
}
```

## Accessibility

`<Stepper.Step />` components render a button element; set `aria-label` or `title` props
to make the component visible for screen readers in case you do not specify `label` or `description`:

```tsx
import { Stepper } from '@mantine/core';

function Demo() {
  return (
    <Stepper active={0}>
      {/* Not ok, no label for screen reader */}
      <Stepper.Step />

      {/* Ok, label and description */}
      <Stepper.Step label="Step 1" description="Create an account" />

      {/* Ok, aria-label */}
      <Stepper.Step aria-label="Create an account" />
    </Stepper>
  );
}
```

## Keyboard Navigation

Stepper supports full keyboard navigation:

* **Tab / Shift+Tab** - Move focus between clickable steps
* **Space / Enter** - Activate the focused step
* Each step is a button element with proper ARIA attributes

Inactive steps that are not clickable are skipped during Tab navigation. The tabIndex is automatically managed based on whether a step is clickable or not.


#### Props

**Stepper props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | number | required | Index of the active step |
| allowNextStepsSelect | boolean | - | When true, users can click and jump to any step. When false, users can only navigate to completed steps |
| autoContrast | boolean | - | When true, automatically adjusts the icon color in completed steps to ensure sufficient contrast against the step background color |
| children | React.ReactNode | required | `Stepper.Step` components |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color, controls colors of active and progress steps |
| completedIcon | ReactNode \| StepFragmentComponent | - | Step icon displayed when step is completed |
| contentPadding | MantineSpacing | - | Key of `theme.spacing` or any valid CSS value to set `padding-top` of the content |
| icon | ReactNode \| StepFragmentComponent | - | Step icon |
| iconPosition | "left" \| "right" | - | Icon position relative to the step body |
| iconSize | string \| number | - | Controls size of the step icon, by default icon size is inferred from `size` prop |
| keepMounted | boolean | - | If set, all step content is kept mounted. React 19 `Activity` is used to preserve state while content is hidden. |
| onStepClick | (stepIndex: number) => void | - | Called when a clickable step is clicked with its 0-based index. Not called for the currently active step. |
| orientation | "horizontal" \| "vertical" | - | Stepper orientation |
| progressIcon | ReactNode \| StepFragmentComponent | - | Step icon displayed when step is in progress |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set steps border-radius |
| size | MantineSize | - | Controls size of various Stepper elements |
| wrap | boolean | - | Determines whether steps should wrap to the next line if no space is available |

**Stepper.Step props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowStepClick | boolean | - | Set to false to disable clicks on step |
| allowStepSelect | boolean | - | Should step selection be allowed |
| color | MantineColor | - | Key of `theme.colors`, by default controlled by Stepper component |
| completedIcon | ReactNode \| StepFragmentComponent | - | Step icon displayed when step is completed |
| description | ReactNode \| StepFragmentComponent | - | Step description |
| icon | ReactNode \| StepFragmentComponent | - | Step icon, defaults to `step index + 1` when rendered within Stepper |
| iconPosition | "left" \| "right" | - | Icon position relative to step body, controlled by Stepper component |
| iconSize | string \| number | - | Icon wrapper size |
| label | ReactNode \| StepFragmentComponent | - | Step label, render after icon |
| loading | boolean | - | Indicates loading state of the step |
| orientation | "horizontal" \| "vertical" | - | Component orientation |
| progressIcon | ReactNode \| StepFragmentComponent | - | Step icon displayed when step is in progress |
| state | "stepInactive" \| "stepProgress" \| "stepCompleted" | - | Step state, automatically set by Stepper component based on active prop. stepInactive: not reached, stepProgress: current, stepCompleted: passed |
| step | number | - | 0-based step index, automatically set by Stepper component |
| withIcon | boolean | - | When false, hides the step icon. Useful for creating compact steppers with only labels |


#### Styles API

Stepper component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Stepper selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Stepper-root | Root element |
| steps | .mantine-Stepper-steps | Steps controls wrapper |
| separator | .mantine-Stepper-separator | Separator line between step controls |
| verticalSeparator | .mantine-Stepper-verticalSeparator | Vertical separator line between step controls |
| content | .mantine-Stepper-content | Current step content wrapper |
| stepWrapper | .mantine-Stepper-stepWrapper | Wrapper for the step icon and separator |
| step | .mantine-Stepper-step | Step control button |
| stepIcon | .mantine-Stepper-stepIcon | Step icon wrapper |
| stepCompletedIcon | .mantine-Stepper-stepCompletedIcon | Completed step icon, rendered within stepIcon |
| stepIconContent | .mantine-Stepper-stepIconContent | Step icon content wrapper for non-completed steps, rendered within stepIcon |
| stepBody | .mantine-Stepper-stepBody | Contains stepLabel and stepDescription |
| stepLabel | .mantine-Stepper-stepLabel | Step label |
| stepDescription | .mantine-Stepper-stepDescription | Step description |
| stepLoader | .mantine-Stepper-stepLoader | Step loader |

**Stepper CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --stepper-color | Controls color of the active step and separator |
| root | --stepper-icon-color | Controls `color` of the step icon |
| root | --stepper-icon-size | Controls `width` and `height` of the icons |
| root | --stepper-content-padding | Controls `padding-top` of the content |
| root | --stepper-radius | Controls `border-radius` of the step icon |
| root | --stepper-fz | Controls `font-size` of various elements |
| root | --stepper-spacing | Controls various spacings |

**Stepper data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| stepIcon | data-progress | Step is current | - |
| stepIcon | data-completed | Step is completed | - |


--------------------------------------------------------------------------------

### Switch
Package: @mantine/core
Import: import { Switch } from '@mantine/core';
Description: Capture boolean input from user

## Usage

```tsx
import { Switch } from '@mantine/core';


function Demo() {
  return (
    <Switch
      defaultChecked
       color="blue" withThumbIndicator={true} labelPosition="right" label="I agree to sell my privacy" description="" error="" size="sm" radius="xl" disabled={false}
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { Switch } from '@mantine/core';

function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}
```

## Uncontrolled

`Switch` can be used with uncontrolled forms the same way as a native `input[type="checkbox"]`.
Set the `name` attribute to include switch value in `FormData` object on form submission.
To control the initial checked state in uncontrolled forms, use `defaultChecked` prop.

Example usage of uncontrolled `Switch` with `FormData`:

```tsx
import { Switch } from '@mantine/core';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Switch value:', !!formData.get('notifications'));
      }}
    >
      <Switch label="Enable notifications" name="notifications" defaultChecked />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## States

```tsx
import { Switch, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Switch value="value" label="Default switch" />
      <Switch checked value="value" label="Checked switch" />
      <Switch disabled value="value" label="Disabled switch" />
      <Switch checked disabled value="value" label="Disabled checked switch" />
    </Stack>
  );
}
```


## Inner Labels

```tsx
import { Switch, Group } from '@mantine/core';

function Demo() {
  return (
    <Group justify="center">
      <Switch size="xs" onLabel="ON" offLabel="OFF" />
      <Switch size="sm" onLabel="ON" offLabel="OFF" />
      <Switch size="md" onLabel="ON" offLabel="OFF" />
      <Switch size="lg" onLabel="ON" offLabel="OFF" />
      <Switch size="xl" onLabel="ON" offLabel="OFF" />
    </Group>
  );
}
```


## Icon labels

```tsx
import { Switch } from '@mantine/core';
import { SunIcon, MoonStarsIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={<SunIcon size={16} color="var(--mantine-color-yellow-4)" />}
      offLabel={<MoonStarsIcon size={16} color="var(--mantine-color-blue-6)" />}
    />
  );
}
```


## Thumb icon

```tsx
import { useState } from 'react';
import { Switch } from '@mantine/core';
import { CheckIcon, XIcon } from '@phosphor-icons/react';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      color="teal"
      size="md"
      label="Switch with thumb icon"
      thumbIcon={
        checked ? (
          <CheckIcon size={12} color="var(--mantine-color-teal-6)" />
        ) : (
          <XIcon size={12} color="var(--mantine-color-red-6)" />
        )
      }
    />
  );
}
```


## With tooltip

Set `refProp="rootRef"` on [Tooltip](https://mantine.dev/llms/core-tooltip.md) and other similar components to make them work with `Switch`:

```tsx
import { Switch, Tooltip } from '@mantine/core';

function Demo() {
  return (
    <Tooltip label="Switch tooltip" refProp="rootRef">
      <Switch label="Switch with tooltip" />
    </Tooltip>
  );
}
```


## Pointer cursor

By default, the switch input and label have `cursor: default` (same as native `input[type="checkbox"]`).
To change the cursor to pointer, set `cursorType` on the [theme](https://mantine.dev/llms/theming-theme-object.md):

```tsx
import { createTheme, MantineProvider, Switch } from '@mantine/core';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Switch label="Pointer cursor" />
    </MantineProvider>
  );
}
```

## Wrapper props

Switch supports additional props that are passed to the wrapper element for more customization options.

## Switch.Group

```tsx
import { Switch, Group } from '@mantine/core';

function Demo() {
  return (
    <Switch.Group
      defaultValue={['react']}
       label="Select your favorite framework/library" description="This is anonymous" error="" withAsterisk={true}
    >
      <Group mt="xs">
        <Switch value="react" label="React" />
        <Switch value="svelte" label="Svelte" />
        <Switch value="ng" label="Angular" />
        <Switch value="vue" label="Vue" />
      </Group>
    </Switch.Group>
  );
}
```


## Switch.Group with uncontrolled forms

`Switch.Group` can be used with uncontrolled forms, it renders a hidden input
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
        console.log('Switch group value:', formData.get('frameworks'));
      }}
    >
      <Switch.Group label="Frameworks" name="frameworks" hiddenInputValuesSeparator="|">
        <Switch label="React" value="react" />
        <Switch label="Angular" value="ng" />
      </Switch.Group>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## maxSelectedValues

Use `maxSelectedValues` prop to limit the number of selected values in `Switch.Group`.
When the limit is reached, the remaining switches are disabled and cannot be selected.

```tsx
import { Group, Switch } from '@mantine/core';

function Demo() {
  return (
    <Switch.Group defaultValue={['react']} maxSelectedValues={2}>
      <Group>
        <Switch value="react" label="React" />
        <Switch value="svelte" label="Svelte" />
        <Switch value="ng" label="Angular" />
        <Switch value="vue" label="Vue" />
      </Group>
    </Switch.Group>
  );
}
```


## Switch.Group disabled

```tsx
import { Switch, Group } from '@mantine/core';

function Demo() {
  return (
    <Switch.Group
      disabled
      label="Select your favorite framework/library"
      description="This is anonymous"
    >
      <Group mt="xs">
        <Switch value="react" label="React" />
        <Switch value="svelte" label="Svelte" />
        <Switch value="ng" label="Angular" />
        <Switch value="vue" label="Vue" />
      </Group>
    </Switch.Group>
  );
}
```


## Controlled Switch.Group

```tsx
import { useState } from 'react';
import { Switch } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Switch.Group value={value} onChange={setValue}>
      <Switch value="react" label="React" />
      <Switch value="svelte" label="Svelte" />
    </Switch.Group>
  );
}
```

## Get input ref

```tsx
import { useRef } from 'react';
import { Switch } from '@mantine/core';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);
  return <Switch ref={ref} />;
}
```

## Accessibility

`Switch` is a regular `input[type="checkbox"]`. Set `aria-label` if the `Switch` is used without the `label` prop:

```tsx
import { Switch } from '@mantine/core';

// -> not ok, input is not labeled
function Bad() {
  return <Switch />;
}

// -> ok, input has aria-label
function Good() {
  return <Switch aria-label="I agree to everything" />;
}

// -> ok, input has associated label
function AlsoGood() {
  return <Switch label="I agree to everything" />;
}
```


#### Props

**Switch props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color to set input color in checked state |
| description | React.ReactNode | - | Description displayed below the label |
| error | React.ReactNode | - | Error displayed below the label |
| id | string | - | Id used to bind input and label, if not passed, unique id will be generated instead |
| label | React.ReactNode | - | Content of the label associated with the switch |
| labelPosition | "left" \| "right" | - | Position of the label relative to the input |
| offLabel | React.ReactNode | - | Inner label when the `Switch` is in unchecked state |
| onLabel | React.ReactNode | - | Inner label when the `Switch` is in checked state |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| rootRef | Ref<HTMLDivElement> | - | Assigns ref of the root element |
| size | MantineSize | - | Controls size of all elements |
| thumbIcon | React.ReactNode | - | Icon inside the thumb of the switch |
| withThumbIndicator | boolean | - | If set, displays a colored dot inside the thumb that matches the track background color |
| wrapperProps | React.ComponentProps<"div"> | - | Props passed down to the root element |

**Switch.Group props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|


#### Styles API

Switch component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Switch selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Switch-root | Root element |
| track | .mantine-Switch-track | Switch track, contains `thumb` and `trackLabel` |
| trackLabel | .mantine-Switch-trackLabel | Label displayed inside `track` |
| thumb | .mantine-Switch-thumb | Thumb displayed inside `track` |
| input | .mantine-Switch-input | Input element (`input[type="checkbox"]`), hidden by default |
| body | .mantine-Switch-body | Input body, contains all other elements |
| labelWrapper | .mantine-Switch-labelWrapper | Contains `label`, `description` and `error` |
| label | .mantine-Switch-label | Label element |
| description | .mantine-Switch-description | Description displayed below the label |
| error | .mantine-Switch-error | Error message displayed below the label |

**Switch CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --switch-radius | Controls `border-radius` of `track` and `thumb` |
| root | --switch-height | Controls height of `track` |
| root | --switch-width | Controls min-width of `track` |
| root | --switch-thumb-size | Controls width and height of `thumb` |
| root | --switch-label-font-size | Controls `font-size` of `trackLabel` |
| root | --switch-track-label-padding | Controls `trackLabel` offset |
| root | --switch-color | Controls track `background-color` when input is checked |

**Switch data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| track | data-error | `error` prop is set | - |

**Switch.Group selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-SwitchGroup-root | Root element |
| label | .mantine-SwitchGroup-label | Label element |
| required | .mantine-SwitchGroup-required | Required asterisk element, rendered inside label |
| description | .mantine-SwitchGroup-description | Description element |
| error | .mantine-SwitchGroup-error | Error element |


--------------------------------------------------------------------------------

### TableOfContents
Package: @mantine/core
Import: import { TableOfContents } from '@mantine/core';
Description: Renders a list of headings on the page and tracks current heading visible in the viewport

## Usage

Use the `TableOfContents` component to display a table of contents like
in the sidebar of mantine.dev documentation. The component tracks
the scroll position and highlights the current heading in the list.

```tsx
import { TableOfContents } from '@mantine/core';


function Demo() {
  return (
    <TableOfContents
       variant="filled" color="blue" size="md" radius="md"
      scrollSpyOptions={{
        selector: '#mdx :is(h1, h2, h3, h4, h5, h6)',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}
```


## use-scroll-spy options

`TableOfContents` is based on the [use-scroll-spy](https://mantine.dev/llms/hooks-use-scroll-spy.md) hook.
You can pass options down to the `use-scroll-spy` hook using the `scrollSpyOptions` prop.

Example of customizing selector, depth and value retrieval:

```tsx
import { TableOfContents } from '@mantine/core';

function Demo() {
  return (
    <TableOfContents
      scrollSpyOptions={{
        selector: '#mdx [data-heading]',
        getDepth: (element) => Number(element.getAttribute('data-order')),
        getValue: (element) => element.getAttribute('data-heading') || '',
      }}
    />
  );
}
```

## Pass props to controls

You can pass props down to controls rendered by the `TableOfContents` component
with the `getControlProps` function. It accepts an object with `active` and `data`
properties and should return a props object.

Example of changing controls to links:

```tsx
import { TableOfContents } from '@mantine/core';

function Demo() {
  return (
    <TableOfContents
      getControlProps={({ active, data }) => ({
        component: 'a',
        href: `#${data.id}`,
        style: { color: active ? 'blue' : 'gray' },
        children: data.value,
      })}
    />
  );
}
```

## Initial data

`TableOfContents` retrieves data on mount. If you want to render headings
before the `TableOfContents` component is mounted (for example during server-side rendering),
you can pass the `initialData` prop with an array of headings data. `initialData` is replaced
with actual data on mount.

```tsx
import { TableOfContents } from '@mantine/core';

function Demo() {
  return (
    <TableOfContents
      initialData={[
        { id: '1', value: 'Heading 1', depth: 1 },
        { id: '2', value: 'Heading 2', depth: 2 },
        { id: '3', value: 'Heading 3', depth: 3 },
      ]}
    />
  );
}
```

## Depth offset

Use the `minDepthToOffset` prop to set the minimum depth at which offset should be applied.
By default, `minDepthToOffset` is `1`, which means that first and second level headings
will not be offset. Set it to `0` to apply offset to all headings.

To control the offset value in px, set the `depthOffset` prop:

```tsx
import { TableOfContents } from '@mantine/core';

function Demo() {
  return (
    <TableOfContents
      minDepthToOffset={0}
      depthOffset={40}
      size="sm"
      scrollSpyOptions={{
        selector: 'h1, h2, h3, h4, h5, h6',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}
```


```tsx
import { TableOfContents } from '@mantine/core';

function Demo() {
  return (
    <TableOfContents
      minDepthToOffset={0}
      depthOffset={40}
      size="sm"
      scrollSpyOptions={{
        selector: 'h1, h2, h3, h4, h5, h6',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}
```


## Styles API

Example of customizing `TableOfContents` with [Styles API](https://mantine.dev/llms/styles-styles-api.md) and [data-\* attributes](https://mantine.dev/llms/styles-data-attributes.md):

```tsx
// Demo.tsx
import { TableOfContents } from '@mantine/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <TableOfContents
      size="sm"
      variant="none"
      classNames={classes}
      minDepthToOffset={0}
      depthOffset={40}
      scrollSpyOptions={{
        selector: 'h1, h2, h3, h4, h5, h6',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}

// Demo.module.css
.control {
  transition: transform 100ms ease;

  &[data-active] {
    background-color: var(--mantine-color-lime-4);
    color: var(--mantine-color-black);
    transform: scale(1.1);
  }
}
```


## Reinitialize

By default, `TableOfContents` does not track changes in the DOM. If you want
to update headings data after the parent component has mounted, you can use
`reinitializeRef` to get the reinitialize function from the [use-scroll-spy](https://mantine.dev/llms/hooks-use-scroll-spy.md) hook:

```tsx
import { useRef, useLayoutEffect } from 'react';
import { TableOfContents } from '@mantine/core';

function Demo({ dependency }) {
  const reinitializeRef = useRef(() => {});

  useLayoutEffect(() => {
    reinitializeRef.current();
  }, [dependency]);

  return <TableOfContents reinitializeRef={reinitializeRef} />;
}
```


#### Props

**TableOfContents props**

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

TableOfContents component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**TableOfContents selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-TableOfContents-root | Root element |
| control | .mantine-TableOfContents-control | Control element |

**TableOfContents CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --toc-bg | Background color of active control |
| root | --toc-color | Text color of active control |
| root | --toc-depth-offset | Offset between of control depending on depth |
| root | --toc-radius | Border-radius of control |
| root | --toc-size | Controls font-size and padding of all elements |

**TableOfContents data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| control | data-active | Associated heading is currently the best match in the viewport | - |


--------------------------------------------------------------------------------

### Table
Package: @mantine/core
Import: import { Table } from '@mantine/core';
Description: Render table with theme styles

## Usage

Table data for all examples:

```tsx
const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];
```

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
  );
}
```


## data prop

You can use the `data` prop to automatically generate table rows from an array of React nodes.
The `data` prop accepts an object with the following properties:

* `head` – an array of React nodes (`React.ReactNode[]`) to render `Table.Th` in `Table.Thead`
* `foot` – an array of React nodes (`React.ReactNode[]`) to render `Table.Th` in `Table.Tfoot`
* `body` - an array of arrays of React nodes (`React.ReactNode[][]`) to render `Table.Td` in `Table.Tbody`
* `caption` – a React node to render `Table.Caption`

```tsx
import { Table, TableData } from '@mantine/core';

const tableData: TableData = {
  caption: 'Some elements from periodic table',
  head: ['Element position', 'Atomic mass', 'Symbol', 'Element name'],
  body: [
    [6, 12.011, 'C', 'Carbon'],
    [7, 14.007, 'N', 'Nitrogen'],
    [39, 88.906, 'Y', 'Yttrium'],
    [56, 137.33, 'Ba', 'Barium'],
    [58, 140.12, 'Ce', 'Cerium'],
  ],
};

function Demo() {
  return <Table data={tableData} />;
}
```


## Sticky header

Set `stickyHeader` to make the table header sticky. To customize the top position of the header, use the `stickyHeaderOffset` prop:
it is useful when you have a fixed header in your application. For example, the Mantine documentation website has a fixed
header with 60px height:

```tsx
import { Table } from '@mantine/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

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
    <Table stickyHeader stickyHeaderOffset={60}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Scroll page to see sticky thead</Table.Caption>
    </Table>
  );
}
```


## Spacing

To control spacing, use the `horizontalSpacing` and `verticalSpacing` props. Both props support spacing from `theme.spacing` and any valid CSS value to set cell padding:

```tsx
import { Table } from '@mantine/core';

function Demo() {
  return (
    <Table horizontalSpacing="xs" verticalSpacing="xs">
      {/* {...rows} */}
    </Table>
  );
}
```


## Caption and tfoot

Table supports tfoot and caption elements. Set the `captionSide` prop (top or bottom) to change the caption position.

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

  const ths = (
    <Table.Tr>
      <Table.Th>Element position</Table.Th>
      <Table.Th>Element name</Table.Th>
      <Table.Th>Symbol</Table.Th>
      <Table.Th>Atomic mass</Table.Th>
    </Table.Tr>
  );

  return (
    <Table captionSide="bottom">
      <Table.Caption>Some elements from periodic table</Table.Caption>
      <Table.Thead>{ths}</Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Tfoot>{ths}</Table.Tfoot>
    </Table>
  );
}
```


## Striped and rows hover

```tsx
import { Table } from '@mantine/core';

function Demo() {
  return (
    <Table striped={false} highlightOnHover={false} withTableBorder={false} withColumnBorders={false} withRowBorders={true}>
      {/* {...rows} */}
    </Table>
  );
}
```


