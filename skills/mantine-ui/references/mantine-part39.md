## Reference lines

Use the `referenceLines` prop to render reference lines. Reference lines are always
rendered behind the chart.

```tsx
// Demo.tsx
import { ScatterChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <ScatterChart
      h={350}
      data={data}
      dataKey={{ x: 'age', y: 'BMI' }}
      xAxisLabel="Age"
      yAxisLabel="BMI"
      referenceLines={[
        { y: 14, label: 'Underweight ↓', color: 'red.7' },
        { y: 19, label: 'Normal weight', color: 'teal.7' },
        { y: 30, label: 'Overweight ↑', color: 'red.7' },
      ]}
    />
  );
}

// data.ts
export const data = [
  {
    color: 'blue.5',
    name: 'Group 1',
    data: [
      { age: 25, BMI: 20 },
      { age: 30, BMI: 22 },
      { age: 35, BMI: 18 },
      { age: 40, BMI: 25 },
      { age: 45, BMI: 30 },
      { age: 28, BMI: 15 },
      { age: 22, BMI: 12 },
      { age: 50, BMI: 28 },
      { age: 32, BMI: 19 },
      { age: 48, BMI: 31 },
      { age: 26, BMI: 24 },
      { age: 38, BMI: 27 },
      { age: 42, BMI: 29 },
      { age: 29, BMI: 16 },
      { age: 34, BMI: 23 },
      { age: 44, BMI: 33 },
      { age: 23, BMI: 14 },
      { age: 37, BMI: 26 },
      { age: 49, BMI: 34 },
      { age: 27, BMI: 17 },
      { age: 41, BMI: 32 },
      { age: 31, BMI: 21 },
      { age: 46, BMI: 35 },
      { age: 24, BMI: 13 },
      { age: 33, BMI: 22 },
      { age: 39, BMI: 28 },
      { age: 47, BMI: 30 },
      { age: 36, BMI: 25 },
      { age: 43, BMI: 29 },
      { age: 21, BMI: 11 },
    ],
  },
];
```



#### Props

**ScatterChart props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | ScatterChartSeries[] | required | Data that is used to build the chart |
| dataKey | { x: string; y: string; } | required | Keys that should be used to retrieve data from the data array on x and y axis |
| gridAxis | "none" \| "x" \| "y" \| "xy" | - | Specifies which lines should be displayed in the grid, `'x'` by default |
| gridColor | MantineColor | - | Color of the grid and cursor lines, by default depends on color scheme |
| gridProps | RechartsProps | - | Props passed down to the `CartesianGrid` component |
| labels | { x?: string; y?: string \| undefined; } \| undefined | - | Labels that should be used instead of keys names in the tooltip |
| legendProps | RechartsProps | - | Props passed down to the `Legend` component |
| orientation | "horizontal" \| "vertical" | - | Chart orientation, `'horizontal'` by default |
| pointLabels | "x" \| "y" | - | If set, displays labels next to points for the given axis |
| referenceLines | ChartReferenceLineProps[] | - | Reference lines that should be displayed on the chart |
| rightYAxisLabel | string | - | A label to display next to the right y-axis |
| rightYAxisProps | RechartsProps | - | Props passed down to the `YAxis` recharts component rendered on the right side |
| scatterChartProps | (CartesianChartProps<unknown> & { ref?: Ref<SVGSVGElement>; }) \| undefined | - | Props passed down to recharts `ScatterChart` component |
| scatterProps | Partial<Omit<Props, "ref">> | - | Props passed down to recharts `Scatter` component |
| strokeDasharray | string \| number | - | Dash array for the grid lines and cursor, `'5 5'` by default |
| textColor | MantineColor | - | Color of the text displayed inside the chart, `'dimmed'` by default |
| tickLine | "none" \| "x" \| "y" \| "xy" | - | Specifies which axis should have tick line, `'y'` by default |
| tooltipAnimationDuration | number | - | Tooltip position animation duration in ms, `0` by default |
| tooltipProps | RechartsProps | - | Props passed down to the `Tooltip` component |
| unit | { x?: string; y?: string \| undefined; } \| undefined | - | Units displayed after value on axis and inside the tooltip |
| valueFormatter | ((value: number) => string) \| { x?: ((value: number) => string); y?: ((value: number) => string) \| undefined; } \| undefined | - | A function to format values on x/y axis and in the tooltip |
| withLegend | boolean | - | Determines whether chart legend should be displayed, `false` by default |
| withRightYAxis | boolean | - | Determines whether additional y-axis should be displayed on the right side of the chart, `false` by default |
| withTooltip | boolean | - | Determines whether chart tooltip should be displayed, `true` by default |
| withXAxis | boolean | - | Determines whether x-axis should be displayed, `true` by default |
| withYAxis | boolean | - | Determines whether y-axis should be displayed, `true` by default |
| xAxisLabel | string | - | A label to display below the x-axis |
| xAxisProps | RechartsProps | - | Props passed down to the `XAxis` recharts component |
| yAxisLabel | string | - | A label to display next to the y-axis |
| yAxisProps | RechartsProps | - | Props passed down to the `YAxis` recharts component |


#### Styles API

ScatterChart component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**ScatterChart selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-ScatterChart-root | Root element |
| scatter | .mantine-ScatterChart-scatter | recharts Scatter component |
| axis | .mantine-ScatterChart-axis | X and Y axis of the chart |
| container | .mantine-ScatterChart-container | Recharts ResponsiveContainer component |
| grid | .mantine-ScatterChart-grid | Recharts CartesianGrid component |
| legend | .mantine-ScatterChart-legend | Legend root element |
| legendItem | .mantine-ScatterChart-legendItem | Legend item representing data series |
| legendItemColor | .mantine-ScatterChart-legendItemColor | Legend item color |
| legendItemName | .mantine-ScatterChart-legendItemName | Legend item name |
| tooltip | .mantine-ScatterChart-tooltip | Tooltip root element |
| tooltipBody | .mantine-ScatterChart-tooltipBody | Tooltip wrapper around all items |
| tooltipItem | .mantine-ScatterChart-tooltipItem | Tooltip item representing data series |
| tooltipItemBody | .mantine-ScatterChart-tooltipItemBody | Tooltip item wrapper around item color and name |
| tooltipItemColor | .mantine-ScatterChart-tooltipItemColor | Tooltip item color |
| tooltipItemName | .mantine-ScatterChart-tooltipItemName | Tooltip item name |
| tooltipItemData | .mantine-ScatterChart-tooltipItemData | Tooltip item data |
| tooltipLabel | .mantine-ScatterChart-tooltipLabel | Label of the tooltip |
| referenceLine | .mantine-ScatterChart-referenceLine | Reference line |
| axisLabel | .mantine-ScatterChart-axisLabel | X and Y axis labels |

**ScatterChart CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --chart-grid-color | Controls color of the grid and cursor lines |
| root | --chart-text-color | Controls color of the axis labels |


--------------------------------------------------------------------------------

### Sparkline
Package: @mantine/charts
Import: import { Sparkline } from '@mantine/charts';
Description: Simplified area chart to show trends

## Usage

`Sparkline` is a simplified version of [AreaChart](https://mantine.dev/llms/charts-area-chart.md). It can be used
to display a single series of data in a small space.

```tsx
import { Sparkline } from '@mantine/charts';


function Demo() {
  return (
    <Sparkline
      w={200}
      h={60}
      data={[10, 20, 40, 20, 40, 10, 50]}
       curveType="linear" color="blue" fillOpacity={0.6} withGradient={true} strokeWidth={2}
    />
  );
}
```


## Change area color depending on color scheme

You can use CSS variables in the `color` property. To define a CSS variable that
changes depending on the color scheme, use [light/dark mixins](https://mantine.dev/llms/styles-postcss-preset.md#dark-and-light-mixins)
or the [light-dark function](https://mantine.dev/llms/styles-postcss-preset.md#light-dark-function). Example
of an area that is dark orange in light mode and lime in dark mode:

```tsx
// Demo.module.css
.root {
  @mixin light {
    --chart-color: var(--mantine-color-orange-8);
  }

  @mixin dark {
    --chart-color: var(--mantine-color-lime-4);
  }
}

// Demo.tsx
import { Sparkline } from '@mantine/charts';
import classes from './Demo.module.css';

function Demo() {
  return <Sparkline w={200} h={80} data={[10, 20, 40, 20, 40, 10, 50]} className={classes.root} />;
}
```


## Trend colors

Use the `trendColors` prop instead of `color` to change the chart color depending on the trend.
The prop accepts an object with `positive`, `negative`, and `neutral` properties:

* `positive` - color for positive trend (first value is less than the last value in the `data` array)
* `negative` - color for negative trend (first value is greater than the last value in the `data` array)
* `neutral` - color for neutral trend (first and last values are equal)

`neutral` is optional; if not provided, the color will be the same as `positive`.

```tsx
import { Sparkline } from '@mantine/charts';
import { Stack, Text } from '@mantine/core';

const positiveTrend = [10, 20, 40, 20, 40, 10, 50];
const negativeTrend = [50, 40, 20, 40, 20, 40, 10];
const neutralTrend = [10, 20, 40, 20, 40, 10, 50, 5, 10];

function Demo() {
  return (
    <Stack gap="sm">
      <Text>Positive trend:</Text>
      <Sparkline
        w={200}
        h={60}
        data={positiveTrend}
        trendColors={{ positive: 'teal.6', negative: 'red.6', neutral: 'gray.5' }}
        fillOpacity={0.2}
      />

      <Text mt="md">Negative trend:</Text>
      <Sparkline
        w={200}
        h={60}
        data={negativeTrend}
        trendColors={{ positive: 'teal.6', negative: 'red.6', neutral: 'gray.5' }}
        fillOpacity={0.2}
      />

      <Text mt="md">Neutral trend:</Text>
      <Sparkline
        w={200}
        h={60}
        data={neutralTrend}
        trendColors={{ positive: 'teal.6', negative: 'red.6', neutral: 'gray.5' }}
        fillOpacity={0.2}
      />
    </Stack>
  );
}
```



#### Props

**Sparkline props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| areaProps | Omit<Props<any, any>, "data" \| "ref" \| "dataKey"> | - | Props passed down to the underlying recharts `Area` component |
| color | MantineColor | - | Key of `theme.colors` or any valid CSS color |
| connectNulls | boolean | - | Determines whether null values should be connected with other values |
| curveType | AreaChartCurveType | - | Type of the curve |
| data | (number \| null)[] | required | Data used to render the chart |
| fillOpacity | number | - | Controls fill opacity of the area |
| strokeWidth | number | - | Area stroke width |
| trendColors | SparklineTrendColors | - | If set, `color` prop is ignored and chart color is determined by the difference between first and last value. |
| withGradient | boolean | - | Determines whether the chart fill should be a gradient |


#### Styles API

Sparkline component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Sparkline selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Sparkline-root | Root element |

**Sparkline CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --chart-color | Controls stroke and fill color |


--------------------------------------------------------------------------------

### Treemap
Package: @mantine/charts
Import: import { Treemap } from '@mantine/charts';
Description: Treemap chart component

## Usage

`Treemap` is based on the [Treemap recharts component](https://recharts.org/en-US/api/Treemap).
It displays hierarchical data as a set of nested rectangles:

```tsx
// Demo.tsx
import { Treemap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <Treemap data={data} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.8' },
  { name: 'India', value: 300, color: 'red.8' },
  { name: 'Japan', value: 100, color: 'teal.8' },
  { name: 'Other', value: 200, color: 'gray.8' },
];
```


## Nested data

`Treemap` supports nested data – each data item can have a `children` array.
The `color` property on a parent node is used for all its children:

```tsx
// Demo.tsx
import { Treemap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <Treemap data={data} />;
}

// data.ts
export const data = [
  {
    name: 'Frontend',
    color: 'blue.8',
    children: [
      { name: 'React', value: 400 },
      { name: 'Vue', value: 200 },
      { name: 'Angular', value: 150 },
    ],
  },
  {
    name: 'Backend',
    color: 'teal.8',
    children: [
      { name: 'Node', value: 300 },
      { name: 'Python', value: 250 },
      { name: 'Go', value: 100 },
    ],
  },
  {
    name: 'Mobile',
    color: 'red.8',
    children: [
      { name: 'React Native', value: 200 },
      { name: 'Flutter', value: 180 },
    ],
  },
];
```


## Node color

You can reference colors from [theme](https://mantine.dev/llms/theming-theme-object.md) the same way as in
other components, for example, `blue`, `red.5`, `orange.7`, etc. Any valid CSS
color value is also accepted.

```tsx
// Demo.tsx
import { Treemap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <Treemap data={data} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.8' },
  { name: 'India', value: 300, color: 'red.8' },
  { name: 'Japan', value: 100, color: 'teal.8' },
  { name: 'Other', value: 200, color: 'gray.8' },
];
```


## autoContrast

`Treemap` supports `autoContrast` prop that automatically adjusts text color
based on the background color of each node to ensure readable labels:

```tsx
import { Treemap } from '@mantine/charts';

const data = [
  { name: 'USA', value: 400, color: 'indigo.0' },
  { name: 'India', value: 300, color: 'yellow.1' },
  { name: 'Japan', value: 100, color: 'teal.1' },
  { name: 'Other', value: 200, color: 'gray.2' },
];

function Demo() {
  return <Treemap data={data} autoContrast />;
}
```


## Node stroke

Use the `strokeWidth` prop to control the width of the stroke around each node.
To change the color of the stroke, use the `strokeColor` prop:

```tsx
// Demo.tsx
import { Treemap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <Treemap data={data} strokeColor="gray.3" strokeWidth={2} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.8' },
  { name: 'India', value: 300, color: 'red.8' },
  { name: 'Japan', value: 100, color: 'teal.8' },
  { name: 'Other', value: 200, color: 'gray.8' },
];
```


## Disable tooltip

To disable the tooltip, set `withTooltip={false}`:

```tsx
// Demo.tsx
import { Treemap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <Treemap data={data} withTooltip={false} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.8' },
  { name: 'India', value: 300, color: 'red.8' },
  { name: 'Japan', value: 100, color: 'teal.8' },
  { name: 'Other', value: 200, color: 'gray.8' },
];
```



#### Props

**Treemap props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| aspectRatio | number | - | The treemap will try to keep every single rectangle's aspect ratio near the aspectRatio given |
| autoContrast | boolean | - | Determines whether text color should be adjusted based on background color to improve contrast |
| children | React.ReactNode | - | Additional elements rendered inside `Treemap` component |
| data | TreemapData[] | required | Data used to render chart |
| dataKey | string | - | Key in data object for the value |
| height | number | - | Controls chart height |
| strokeColor | MantineColor | - | Controls color of the node stroke, by default depends on color scheme |
| strokeWidth | number | - | Controls width of node stroke |
| textColor | MantineColor | - | Controls text color of labels |
| tooltipAnimationDuration | number | - | Tooltip animation duration in ms |
| tooltipProps | RechartsProps | - | Props passed down to `Tooltip` recharts component |
| treemapProps | Partial<Omit<Props<TreemapDataType, any>, "data" \| "ref" \| "dataKey">> | - | Props passed down to recharts `Treemap` component |
| valueFormatter | (value: number) => string | - | A function to format values inside the tooltip |
| withTooltip | boolean | - | Determines whether the tooltip should be displayed when a node is hovered |


#### Styles API

Treemap component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Treemap selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Treemap-root | Root element |
| tooltip | .mantine-Treemap-tooltip | Tooltip root element |
| tooltipBody | .mantine-Treemap-tooltipBody | Tooltip wrapper around all items |
| tooltipItem | .mantine-Treemap-tooltipItem | Tooltip item representing data series |
| tooltipItemBody | .mantine-Treemap-tooltipItemBody | Tooltip item wrapper around item color and name |
| tooltipItemColor | .mantine-Treemap-tooltipItemColor | Tooltip item color |
| tooltipItemName | .mantine-Treemap-tooltipItemName | Tooltip item name |
| tooltipItemData | .mantine-Treemap-tooltipItemData | Tooltip item data |
| tooltipLabel | .mantine-Treemap-tooltipLabel | Label of the tooltip |

**Treemap CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --chart-stroke-color | Controls color of the chart stroke |
| root | --chart-height | Controls height of the chart |


--------------------------------------------------------------------------------

## GUIDES COMPONENTS AND FEATURES

### SixToSeven

# 6.x → 7.x migration guide

This guide will help you migrate your project styles from 6.x to 7.x.
It's not intended to be a comprehensive guide covering all changes in 7.x.
For a complete overview, please see the [7.0.0 changelog](https://mantine.dev/llms/changelog-7-0-0.md).

## Migration to @mantine/emotion

The `@mantine/emotion` package has been available since version 7.9. If you don't want
to use CSS modules, have many styles created with `createStyles`, `sx` and `styles`
props, or simply prefer CSS-in-JS syntax, you can migrate to `@mantine/emotion`. To view
the full documentation for the `@mantine/emotion` package, visit [this page](https://mantine.dev/llms/styles-emotion.md).

### createStyles and Global component

The `createStyles` function and `Global` component are no longer available in the `@mantine/core` package. Change imports
to `@mantine/emotion`:

```tsx
// 6.x
import { createStyles, Global } from '@mantine/core';

// 7.x
import { createStyles, Global } from '@mantine/emotion';
```

### sx and styles props

`sx` and `styles` props are available in 7.x the same way as in 6.x after [setup](https://mantine.dev/llms/styles-emotion.md):

```tsx
// 6.x and 7.x, no changes
import { Box, Button } from '@mantine/core';

function Demo() {
  return (
    <>
      <Box
        sx={(theme) => ({ backgroundColor: theme.colors.red[5] })}
      />
      <Button styles={{ root: { height: 50 } }} />
    </>
  );
}
```

### theme.colorScheme

In v7, the color scheme value is managed by [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md),
and the [theme object](https://mantine.dev/llms/theming-theme-object.md) no longer includes the `colorScheme` property.
Although it's still possible to access the color scheme value in components with the
[useMantineColorScheme](https://mantine.dev/llms/theming-color-schemes.md#use-mantine-color-scheme-hook) hook,
it's not recommended to base your styles on its value. Instead, use the `light`/`dark`
[utilities](https://mantine.dev/llms/styles-emotion.md#utilities).

Example of 6.x `createStyles` with `theme.colorScheme` migration to 7.0:

```tsx
// 6.x
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));
```

```tsx
// 7.x
import { createStyles } from '@mantine/emotion';

const useStyles = createStyles((theme, _, u) => ({
  root: {
    [u.dark] {
      backgroundColor: theme.colors.dark[6];
      color: theme.white;
    },

    [u.light]: {
      backgroundColor: theme.colors.gray[0];
      color: theme.black;
    },
  },
}));
```

## Migration to CSS modules

Before getting started, we recommend going through the [styles](https://mantine.dev/llms/styles-css-modules.md) documentation.
The most notable sections are:

* [CSS Modules](https://mantine.dev/llms/styles-css-modules.md)
* [Mantine PostCSS preset](https://mantine.dev/llms/styles-postcss-preset.md)
* [CSS variables](https://mantine.dev/llms/styles-css-variables.md)
* [data-\* attributes](https://mantine.dev/llms/styles-data-attributes.md)
* [Styles API](https://mantine.dev/llms/styles-styles-api.md)
* [Responsive styles](https://mantine.dev/llms/styles-responsive.md)

Note that this guide assumes you have [postcss-preset-mantine](https://mantine.dev/llms/styles-postcss-preset.md) installed and configured
in your project.

### createStyles

The `createStyles` function is no longer available in 7.0. Use [CSS Modules](https://mantine.dev/llms/styles-css-modules.md) instead.

```tsx
// 6.x
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.red[5],
  },
}));
```

```scss
/* 7.0 */
.root {
  background-color: var(--mantine-color-red-5);
}
```

### sx prop

The `sx` prop is no longer available in 7.0. Use `className` or the [style prop](https://mantine.dev/llms/styles-style.md) instead.

```tsx
// 6.x
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box sx={(theme) => ({ backgroundColor: theme.colors.red[5] })} />
  );
}
```

```tsx
// 7.0
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box style={{ backgroundColor: 'var(--mantine-color-red-5)' }} />
  );
}
```

Nested selectors are not supported in the [style prop](https://mantine.dev/llms/styles-style.md); use `className` instead:

```tsx
// 6.x
import { Box } from '@mantine/core';

function Demo() {
  return <Box sx={{ '&:hover': { background: 'red' } }} />;
}
```

```scss
.box {
  &:hover {
    background: red;
  }
}
```

### styles prop

The `styles` prop no longer supports nested selectors. Use
`classNames` instead to apply styles to nested elements.

```tsx
// 6.x – nested selectors
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <TextInput
      styles={{
        input: {
          '&:focus': {
            color: 'red',
          },
        },
      }}
    />
  );
}
```

```scss
/* 7.0 */
.input {
  &:focus {
    color: red;
  }
}
```

Regular selectors are still supported:

```tsx
// Works both in 6.x and 7.x
import { TextInput } from '@mantine/core';

function Demo() {
  return (
    <TextInput
      styles={{
        input: {
          color: 'red',
        },
      }}
    />
  );
}
```

### Global styles

The `Global` component and global styles on the theme are not available in 7.0. Instead,
create a global stylesheet (`.css` file) and import it at your application entry point.

```tsx
// 6.x
import { Global } from '@mantine/core';

function Demo() {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        body: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.white,
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[0]
              : theme.black,
          lineHeight: theme.lineHeight,
        },

        '.your-class': {
          backgroundColor: 'red',
        },

        '#your-id > [data-active]': {
          backgroundColor: 'pink',
        },
      })}
    />
  );
}
```

```scss
/* 7.0 */
/* src/index.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background-color: light-dark(
    var(--mantine-color-white),
    var(--mantine-color-dark-7)
  );
  color: light-dark(
    var(--mantine-color-black),
    var(--mantine-color-white)
  );
  line-height: var(--mantine-line-height);
}

.your-class {
  background-color: red;
}

#your-id > [data-active] {
  background-color: pink;
}
```

### theme referencing

All [theme](https://mantine.dev/llms/theming-theme-object.md) properties are now available as [CSS variables](https://mantine.dev/llms/styles-css-variables.md). We recommend using
[CSS variables](https://mantine.dev/llms/styles-css-variables.md) instead of referencing the theme object in styles.

```tsx
// 6.x
import { Box } from '@mantine/core';

function Demo() {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.red[6],
        color: theme.white,
        padding: `calc(${theme.spacing.xl} * 2)`,
      })}
    />
  );
}
```

```scss
/* 7.0 */
.box {
  background-color: var(--mantine-color-red-6);
  color: var(--mantine-color-white);
  padding: calc(var(--mantine-spacing-xl) * 2);
}
```

### theme.colorScheme

The color scheme value is managed by [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md),
and the [theme object](https://mantine.dev/llms/theming-theme-object.md) no longer includes the `colorScheme` property.
Although it's still possible to access the color scheme value in components with the
[useMantineColorScheme](https://mantine.dev/llms/theming-color-schemes.md#use-mantine-color-scheme-hook) hook,
it's not recommended to base your styles on its value. Instead, use the `light`/`dark`
[mixins](https://mantine.dev/llms/styles-postcss-preset.md) or the `light-dark` CSS [function](https://mantine.dev/llms/styles-postcss-preset.md#light-dark-function).

Example of 6.x `createStyles` with `theme.colorScheme` migration to 7.0:

```tsx
// 6.x
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));
```

```scss
/* 7.0 */

/* With light-dark function */
.root {
  background-color: light-dark(
    var(--mantine-color-gray-0),
    var(--mantine-color-dark-6)
  );
  color: light-dark(
    var(--mantine-color-black),
    var(--mantine-color-white)
  );
}

/* With light/dark mixins */
.root {
  background-color: var(--mantine-color-gray-0);
  color: var(--mantine-color-black);

  @mixin dark {
    background-color: var(--mantine-color-dark-6);
    color: var(--mantine-color-white);
  }
}
```

Note that if your application has server-side rendering, you should not render any
elements based on its value ([more info](https://mantine.dev/llms/theming-color-schemes.md#color-scheme-value-caveats)).
Instead, use the `light`/`dark` mixins or the `light-dark` function to hide/show elements based
on the color scheme value.

Color scheme toggle example:

```tsx
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon } from '@phosphor-icons/react';
import cx from 'clsx';
import classes from './Demo.module.css';

function Demo() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <SunIcon className={cx(classes.icon, classes.light)} />
      <MoonIcon className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}
```



--------------------------------------------------------------------------------

### SevenToEight

# 7.x → 8.x migration guide

## Global styles imports

If you used separate styles imports from `@mantine/core/styles/global.css`, you need to update imports to use new files.
Note that if you previously imported `@mantine/core/styles.css`, no changes are required – all new files are already included in `styles.css`.

7.x version import:

```tsx
// ❌ No longer includes all global styles
import '@mantine/core/styles/global.css';
```

8.x version import:

```tsx
// ✅ Import all global styles separately
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';
```

If you used `@mantine/core/styles.css`, no changes are required;
the import works the same in 7.x and 8.x versions:

```tsx
// 👍 No changes needed if you used styles.css
import '@mantine/core/styles.css';
```

## Portal reuseTargetNode

The `reuseTargetNode` prop of the [Portal](https://mantine.dev/llms/core-portal.md) component is now enabled by default.
This option improves performance by reusing the target node between portal renders, but
in some edge cases, it might cause issues with `z-index` stacking context.

If you experience issues with `z-index`, change the `reuseTargetNode` prop to `false` in theme:

```tsx
import { createTheme, Portal } from '@mantine/core';

export const theme = createTheme({
  components: {
    Portal: Portal.extend({
      defaultProps: {
        // ✅ Disable reuseTargetNode by default if your application has z-index issues
        reuseTargetNode: false,
      },
    }),
  }
});
```

## Switch withThumbIndicator

The [Switch](https://mantine.dev/llms/core-switch.md) component's default styles have been updated; it now
includes a checked state indicator inside the thumb. If you want to use the
old styles without the indicator, set the `withThumbIndicator` prop to `false` in the theme:

```tsx
import { createTheme, Switch } from '@mantine/core';

export const theme = createTheme({
  components: {
    Switch: Switch.extend({
      defaultProps: {
        // ✅ Disable withThumbIndicator if you want to use old styles
        withThumbIndicator: false,
      },
    }),
  }
});
```

## Date string values

`@mantine/dates` components now use date string values in `onChange` and other callbacks.
If you want to continue using `@mantine/dates` components the same way as in 7.x, you need
to convert callback values to `Date` objects:

```tsx
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';

export function Demo7x() {
  const [value, setValue] = useState<Date | null>(null);
  // ⛔ 7.x – onChange is called with Date object
  return <DatePicker value={value} onChange={setValue} />
}

export function Demo8x() {
  const [value, setValue] = useState<Date | null>(null);
  // ✅ 8.x – onChange is called with string date value (for example '1994-08-21')
  // You can either
  // 1. Convert it to Date object to preserve old behavior
  // 2. Update your code to use date string values instead
  return <DatePicker value={value} onChange={val => setValue(new Date(val))} />
}
```

## DatesProvider timezone

The `DatesProvider` component no longer supports the `timezone` option:

```tsx
import { DatesProvider } from '@mantine/dates';

function Demo7x() {
  // ❌ The timezone option is no longer supported
  return (
    <DatesProvider settings={{ timezone: 'UTC', consistentWeeks: true }}>
      App
    </DatesProvider>
  );
}

function Demo8x() {
  // ✅ Remove the timezone option
  return (
    <DatesProvider settings={{ consistentWeeks: true }}>
      App
    </DatesProvider>
  );
}
```

If you need to handle timezones in your application, you can use a dedicated date library
([dayjs](https://day.js.org/), [luxon](https://moment.github.io/luxon/#/), [date-fns](https://date-fns.org/))
to update timezone values. Example of using Mantine components with [dayjs](https://day.js.org/):

```tsx
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>('2022-08-21');

  // Mantine components use strings as values; you can pass these
  // strings to a date library of your choice to assign a timezone
  const dateWithTimeZone = dayjs(value).tz("America/Toronto").toDate();

  return <DatePicker value={value} onChange={setValue} />;
}
```

## DateTimePicker timeInputProps

The [DateTimePicker](https://mantine.dev/llms/dates-date-time-picker.md) component no longer accepts the `timeInputProps` prop,
as the underlying [TimeInput](https://mantine.dev/llms/dates-time-input.md) component was replaced with [TimePicker](https://mantine.dev/llms/dates-time-picker.md).
To pass props down to the [TimePicker](https://mantine.dev/llms/dates-time-picker.md) component, use the `timePickerProps` prop instead.

7.x version:

```tsx
import { DateTimePicker } from '@mantine/dates';
import { ClockIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <DateTimePicker
      // ❌ timeInputProps is no longer available
      timeInputProps={{
        leftSection: <ClockIcon size={16} />,
      }}
    />
  );
}
```

8.x version:

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      // ✅ Use timePickerProps instead of timeInputProps
      timePickerProps={{
        leftSection: <ClockIcon size={16} />,
        minutesStep: 5,
        withDropdown: true,
      }}
    />
  );
}
```

## CodeHighlight usage

The [@mantine/code-highlight](https://mantine.dev/llms/x-code-highlight.md) package no longer depends on [highlight.js](https://highlightjs.org).
You can follow the [updated documentation](https://mantine.dev/llms/x-code-highlight.md) to set up syntax highlighting with [shiki](https://shiki.matsu.io/).

If you want to continue using [highlight.js](https://highlightjs.org/) in your application,
install the `highlight.js` package:

```bash
yarn add highlight.js
```

```bash
npm install highlight.js
```

Then wrap your app with `CodeHighlightAdapterProvider` and provide `createHighlightJsAdapter` as the `adapter` prop:

```tsx
import { MantineProvider } from '@mantine/core';
import { CodeHighlightAdapterProvider, createHighlightJsAdapter } from '@mantine/code-highlight';
import hljs from 'highlight.js/lib/core';
import tsLang from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('typescript', tsLang);

const highlightJsAdapter = createHighlightJsAdapter(hljs);

function App() {
  return (
    <MantineProvider>
      <CodeHighlightAdapterProvider adapter={highlightJsAdapter}>
        {/* Your app here */}
      </CodeHighlightAdapterProvider>
    </MantineProvider>
  );
}
```

Then you need to add styles from one of the highlight.js themes to your application.
You can do that by importing a CSS file from the `highlight.js` package or adding it via a
CDN link to the head of your application:

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
/>
```

After that, you can use the `CodeHighlight` component in your application the same way you did in the 7.x version.

## Menu data-hovered attribute

[Menu.Item](https://mantine.dev/llms/core-menu.md) no longer uses the `data-hovered` attribute to indicate hovered state.
If you used `data-hovered` in your styles, you need to change it to `:hover` and `:focus` selectors
instead:

```scss
// ❌ 7.x – styles with `data-hovered`,
// no longer works in 8.x
.item {
  &[data-hovered] {
    background-color: red;
  }
}

// ✅ 8.x – use styles with `:hover` and `:focus`
.item {
  &:hover,
  &:focus {
    background-color: red;
  }
}
```

## Popover hideDetached

[Popover](https://mantine.dev/llms/core-popover.md) now supports the `hideDetached` prop to automatically close the popover when the target element is removed from the DOM:

```tsx
import { Box, Button, Group, Popover } from '@mantine/core';

function Demo() {
  return (
    <Box
      bd="1px solid var(--mantine-color-dimmed)"
      p="xl"
      w={{ base: 340, sm: 400 }}
      h={200}
      style={{ overflow: 'auto' }}
    >
      <Box w={1000} h={400}>
        <Group>
          <Popover width="target" position="bottom" opened>
            <Popover.Target>
              <Button>Toggle popover</Button>
            </Popover.Target>
            <Popover.Dropdown>This popover dropdown is hidden when detached</Popover.Dropdown>
          </Popover>

          <Popover width="target" position="bottom" opened hideDetached={false}>
            <Popover.Target>
              <Button>Toggle popover</Button>
            </Popover.Target>
            <Popover.Dropdown>This popover dropdown is visible when detached</Popover.Dropdown>
          </Popover>
        </Group>
      </Box>
    </Box>
  );
}
```


By default, `hideDetached` is enabled – the behavior has changed from the 7.x version.
If you prefer to keep the old behavior, you can disable `hideDetached` for all components:

```tsx
import { createTheme, Popover } from '@mantine/core';

export const theme = createTheme({
  components: {
    Popover: Popover.extend({
      defaultProps: {
        // ✅ Disable hideDetached by default
        // if you want to keep the old behavior
        hideDetached: false,
      },
    }),
  }
});
```

## Carousel changes

Starting from the 8.x version, the [@mantine/carousel](https://mantine.dev/llms/x-carousel.md) package requires
`embla-carousel` and `embla-carousel-react` packages with version 8.x.

You need to update embla dependencies:

```bash
yarn add embla-carousel@^8.5.2 embla-carousel-react@^8.5.2
```

```bash
npm install embla-carousel@^8.5.2 embla-carousel-react@^8.5.2
```

Update embla props that were previously passed to the `Carousel` component
to `emblaOptions`. Full list of props:

* `loop`
* `align`
* `slidesToScroll`
* `dragFree`
* `inViewThreshold`
* `skipSnaps`
* `containScroll`
* `speed` and `draggable` props were removed – they are no longer supported by embla

```tsx
import { Carousel } from '@mantine/carousel';

// ❌ 7.x – embla options passed as props,
// no longer works in 8.x
function Demo7x() {
  return <Carousel loop dragFree align="start" />
}

// ✅ 8.x – use emblaOptions to pass options to embla
function Demo8x() {
  return <Carousel emblaOptions={{ loop: true, dragFree: true, align: 'start' }} />
}
```

The `useAnimationOffsetEffect` hook was removed; it is no longer required, and you need to
remove it from your code:

```tsx
// ❌ 7.x – useAnimationOffsetEffect is no longer available in 8.x
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';

function Demo7x() {
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  return <Carousel getEmblaApi={setEmbla} />;
}

// ✅ 8.x – remove useAnimationOffsetEffect entirely; it is not required
import { Carousel } from '@mantine/carousel';

function Demo8x() {
  return <Carousel />;
}
```

The `Embla` type is no longer exported from the `@mantine/carousel` package;
you need to change this import to reference the `embla-carousel` package instead:

```tsx
// ❌ 7.x – The Embla type is no longer available in 8.x
import { Carousel, Embla } from '@mantine/carousel';

function Demo7x() {
  const [embla, setEmbla] = useState<Embla | null>(null);
  return <Carousel getEmblaApi={setEmbla} />;
}

// ✅ 8.x – replace the Embla type import
import { Carousel } from '@mantine/carousel';
import { EmblaCarouselType } from 'embla-carousel';

function Demo8x() {
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  return <Carousel getEmblaApi={setEmbla} />;
}
```


--------------------------------------------------------------------------------

### EightToNine

# 8.x → 9.x migration guide

## Prerequisites

Mantine 9.x requires React 19.2 or later. If your project uses an older React version,
you need to update it before migrating to Mantine 9.x. If you cannot update React to 19.2+
yet, you can continue using Mantine 8.x until you are ready to update React and migrate to Mantine 9.x.

## Update dependencies

* Update all `@mantine/*` packages to version 9.1.1
* If you use `@mantine/tiptap` package, update all `@tiptap/*` packages to the latest `3.x` version
* If you use `@mantine/charts` package, update `recharts` to the latest `3.x` version

## use-form TransformValues type

The second generic type of the `useForm` hook is now the type of transformed values
instead of the transform function type. New usage example:

```tsx
import { useForm } from '@mantine/form';

interface FormValues {
  name: string;
  locationId: string;
}

interface TransformedValues {
  name: string;
  locationId: number;
}

function Demo() {
  const form = useForm<FormValues, TransformedValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      locationId: '2',
    },

    transformValues: (values) => ({
      ...values,
      locationId: Number(values.locationId),
    }),
  });
}
```

## Text color prop

The `color` prop of the [Text](https://mantine.dev/llms/core-text.md) and [Anchor](https://mantine.dev/llms/core-anchor.md) components was removed.
Use the `c` [style prop](https://mantine.dev/llms/styles-style-props.md) instead:

```tsx
import { Text } from '@mantine/core';

// ❌ No longer works
function Demo() {
  return <Text color="red">Text</Text>;
}

// ✅ Use the c style prop
function Demo() {
  return <Text c="red">Text</Text>;
}
```

## Light variant color changes

In Mantine 9, the `light` variant CSS variables were changed to use solid color values
instead of transparency. If you need to keep 8.x behavior during migration,
use `v8CssVariablesResolver`:

```tsx
import {
  Button,
  MantineProvider,
  v8CssVariablesResolver,
} from '@mantine/core';

function Demo() {
  return (
    <MantineProvider cssVariablesResolver={v8CssVariablesResolver}>
      <Button variant="light" color="blue.6">
        Uses 8.x light variant colors
      </Button>
    </MantineProvider>
  );
}
```

## Form resolvers

In 9.x, `@mantine/form` has built-in support for [Standard Schema](https://standardschema.dev/).
If your schema library supports Standard Schema (Zod v4, Valibot, ArkType), use the built-in
`schemaResolver` instead of a dedicated resolver package:

Example with 8.x:

```tsx
import { z } from 'zod';
// ❌ No longer works; zodResolver is not exported from @mantine/form
import { useForm, zodResolver } from '@mantine/form';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

const form = useForm({
  initialValues: { email: '' },
  validate: zodResolver(schema),
});
```

Example with 9.x using Standard Schema (recommended):

```tsx
import { z } from 'zod/v4';
import { useForm, schemaResolver } from '@mantine/form';

const schema = z.object({
  email: z.email({ error: 'Invalid email' }),
});

const form = useForm({
  initialValues: { email: '' },
  validate: schemaResolver(schema, { sync: true }),
});
```

## TypographyStylesProvider

* The [TypographyStylesProvider](https://mantine.dev/llms/core-typography.md) component was renamed to [Typography](https://mantine.dev/llms/core-typography.md):

```tsx
// ❌ No longer works
import { TypographyStylesProvider } from '@mantine/core';

// ✅ Use the Typography component
import { Typography } from '@mantine/core';
```

## Popover and Tooltip positionDependencies prop

The [Popover](https://mantine.dev/llms/core-popover.md) and [Tooltip](https://mantine.dev/llms/core-tooltip.md) components no longer accept the `positionDependencies` prop; it is no longer required
– the position is now calculated automatically.

```tsx
import { Popover } from '@mantine/core';

// ❌ positionDependencies is no longer needed
function Demo(props) {
  return (
    <Popover position="top" positionDependencies={[props.a, props.b]}>
      {/* ... */}
    </Popover>
  );
}

// ✅ The position is recalculated automatically
function Demo(props) {
  return (
    <Popover position="top">
      {/* ... */}
    </Popover>
  );
}
```

## use-fullscreen hook changes

The [use-fullscreen](https://mantine.dev/llms/hooks-use-fullscreen.md) hook was split into two hooks: `useFullscreenElement` and `useFullscreenDocument`.
This change was required to fix a stale ref issue in the previous implementation.

New usage with the `document` element:

```tsx
import { useFullscreenDocument } from '@mantine/hooks';
import { Button } from '@mantine/core';

function Demo() {
  const { toggle, fullscreen } = useFullscreenDocument();

  return (
    <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
      {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    </Button>
  );
}
```


New usage with a custom target element:

```tsx

import { useFullscreenElement } from '@mantine/hooks';
import { Button, Stack } from '@mantine/core';

function RefDemo() {
  const { ref, toggle, fullscreen } = useFullscreenElement();

  return (
    <Stack align="center">
      <img
        ref={ref}
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
        alt="For demo"
        width={200}
      />
      <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
        {fullscreen ? 'Exit Fullscreen' : 'View Image Fullscreen'}
      </Button>
    </Stack>
  );
}

```


## use-mouse hook changes

The [use-mouse](https://mantine.dev/llms/hooks-use-mouse.md) hook was split into two hooks: `useMouse` and `useMousePosition`.
This change was required to fix a stale ref issue in the previous implementation.

Previous usage with the `document` element:

```tsx
import { Text, Code } from '@mantine/core';
import { useMouse } from '@mantine/hooks';

function Demo() {
  const { x, y } = useMouse();

  return (
    <Text ta="center">
      Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
    </Text>
  );
}
```

New usage with `document`:

```tsx
import { Text, Code } from '@mantine/core';
import { useMousePosition } from '@mantine/hooks';

function Demo() {
  const { x, y } = useMousePosition();

  return (
    <Text ta="center">
      Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
    </Text>
  );
}
```


## use-mutation-observer hook changes

The [use-mutation-observer](https://mantine.dev/llms/hooks-use-mutation-observer.md) hook now uses the new callback ref approach.
This change was required to fix stale ref issues and improve compatibility with dynamic node changes.

Previous usage (8.x):

```tsx
import { useMutationObserver } from '@mantine/hooks';

useMutationObserver(
  (mutations) => console.log(mutations),
  { childList: true },
  // ❌ The third argument is no longer supported; use `useMutationObserverTarget` instead
  document.getElementById('external-element')
);
```

New usage (9.x):

```tsx
import { useMutationObserverTarget } from '@mantine/hooks';

// ✅ Rename the hook to `useMutationObserverTarget`
useMutationObserverTarget(
  (mutations) => console.log(mutations),
  { childList: true },
  // ✅ Pass the target element as the third argument
  document.getElementById('external-element')
);
```

## Rename hooks types

`@mantine/hooks` types were renamed for consistency; rename them in your codebase:

* `UseScrollSpyReturnType` → `UseScrollSpyReturnValue`
* `StateHistory` → `UseStateHistoryValue`
* `OS` → `UseOSReturnValue`

## Collapse in -> expanded

The [Collapse](https://mantine.dev/llms/core-collapse.md) component now uses the `expanded` prop instead of `in`:

```tsx
import { Collapse } from '@mantine/core';

// ❌ No longer works
function Demo() {
  return (
    <Collapse in={false}>
      {/* ... */}
    </Collapse>
  );
}

// ✅ Use the expanded prop
function Demo() {
  return (
    <Collapse expanded={false}>
      {/* ... */}
    </Collapse>
  );
}
```

## Spoiler initialState -> defaultExpanded

The [Spoiler](https://mantine.dev/llms/core-spoiler.md) component's `initialState` prop was renamed to `defaultExpanded` for consistency with other Mantine components:

```tsx
import { Spoiler } from '@mantine/core';

// ❌ No longer works
function Demo() {
  return (
    <Spoiler initialState={false} showLabel="Show" hideLabel="Hide">
      {/* ... */}
    </Spoiler>
  );
}

// ✅ Use the defaultExpanded prop
function Demo() {
  return (
    <Spoiler defaultExpanded={false} showLabel="Show" hideLabel="Hide">
      {/* ... */}
    </Spoiler>
  );
}
```

