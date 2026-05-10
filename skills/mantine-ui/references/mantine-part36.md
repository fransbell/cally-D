## Customize dots

Use `dotProps` to pass props down to recharts dot in regular state and `activeDotProps`
to pass props down to recharts dot in active state (when cursor is over the current series).

```tsx
// Demo.tsx
import { CompositeChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      dotProps={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
      activeDotProps={{ r: 8, strokeWidth: 1, fill: '#fff' }}
      maxBarWidth={30}
      series={[
        { name: 'Tomatoes', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
        { name: 'Apples', color: 'red.8', type: 'line' },
        { name: 'Oranges', color: 'yellow.8', type: 'area' },
      ]}
    />
  );
}

// data.ts
export const data = [
  {
    date: 'Mar 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];
```


## Stroke width

Use `strokeWidth` prop to control the stroke width of all areas/lines:

```tsx
// Demo.tsx
import { CompositeChart } from '@mantine/charts';
import { data } from './data';


function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      maxBarWidth={30}
      series={[
        { name: 'Tomatoes', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
        { name: 'Apples', color: 'red.8', type: 'line' },
        { name: 'Oranges', color: 'yellow.8', type: 'area' },
      ]}
       strokeWidth={2}
    />
  );
}

// data.ts
export const data = [
  {
    date: 'Mar 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];
```


## Sync multiple charts

You can pass props down to recharts [ComposedChart](https://recharts.org/en-US/api/ComposedChart)
component with `composedChartProps` prop. For example, setting `composedChartProps={{ syncId: 'any-id' }}`
will sync tooltip of multiple `CompositeChart` components with the same `syncId` prop.

```tsx
// Demo.tsx
import { Text } from '@mantine/core';
import { CompositeChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <>
      <Text mb="md" pl="md">
        Apples sales:
      </Text>

      <CompositeChart
        h={180}
        data={data}
        dataKey="date"
        series={[{ name: 'Apples', color: 'indigo.6', type: 'area' }]}
        composedChartProps={{ syncId: 'groceries' }}
      />

      <Text mb="md" pl="md" mt="xl">
        Tomatoes sales:
      </Text>

      <CompositeChart
        h={180}
        data={data}
        dataKey="date"
        composedChartProps={{ syncId: 'groceries' }}
        series={[{ name: 'Tomatoes', color: 'cyan.6', type: 'bar' }]}
      />
    </>
  );
}

// data.ts
export const data = [
  {
    date: 'Mar 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];
```


## Dashed lines

Set `strokeDasharray` property in `series` to change line style to dashed:

```tsx
// Demo.tsx
import { CompositeChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      strokeWidth={1}
      dotProps={{ r: 2 }}
      activeDotProps={{ r: 3, strokeWidth: 1 }}
      maxBarWidth={30}
      series={[
        { name: 'Tomatoes', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
        { name: 'Apples', color: 'red.8', type: 'line', strokeDasharray: '5 5' },
        { name: 'Oranges', color: 'yellow.8', type: 'area', strokeDasharray: '5 5' },
      ]}
    />
  );
}

// data.ts
export const data = [
  {
    date: 'Mar 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];
```


## Reference lines

Use `referenceLines` prop to render reference lines. Reference lines are always
rendered behind the chart.

```tsx
// Demo.tsx
import { CompositeChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      yAxisProps={{ domain: [0, 100] }}
      referenceLines={[
        { y: 1200, label: 'Average sales', color: 'red.6' },
        { x: 'Mar 25', label: 'Report out', color: 'blue.7' },
      ]}
      maxBarWidth={30}
      series={[
        { name: 'Tomatoes', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
        { name: 'Apples', color: 'red.8', type: 'line' },
      ]}
    />
  );
}

// data.ts
export const data = [
  {
    date: 'Mar 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];
```



#### Props

**CompositeChart props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activeDotProps | MantineChartDotProps | - | Props passed down to all active dots. Ignored if `withDots={false}` is set. |
| areaProps | Partial<Omit<Props<any, any>, "ref">> \| ((series: CompositeChartSeries) => Partial<Omit<Props<any, any>, "ref">>) | - | Props passed down to recharts `Area` component |
| barProps | Partial<Omit<Props, "ref">> \| ((series: CompositeChartSeries) => Partial<Omit<Props, "ref">>) | - | Props passed down to recharts `Bar` component |
| children | React.ReactNode | - | Additional components that are rendered inside recharts `AreaChart` component |
| composedChartProps | (CartesianChartProps<unknown> & { ref?: Ref<SVGSVGElement>; }) \| undefined | - | Props passed down to recharts `AreaChart` component |
| connectNulls | boolean | - | Determines whether points with `null` values should be connected |
| curveType | CompositeChartCurveType | - | Type of the curve |
| data | Record<string, any>[] | required | Data used to display chart |
| dataKey | string | required | Key of the `data` object for x-axis values |
| dotProps | MantineChartDotProps | - | Props passed down to all dots. Ignored if `withDots={false}` is set. |
| gridAxis | "none" \| "x" \| "y" \| "xy" | - | Specifies which lines should be displayed in the grid, `'x'` by default |
| gridColor | MantineColor | - | Color of the grid and cursor lines, by default depends on color scheme |
| gridProps | RechartsProps | - | Props passed down to the `CartesianGrid` component |
| legendProps | RechartsProps | - | Props passed down to the `Legend` component |
| lineProps | ((series: CompositeChartSeries) => Partial<Omit<Props, "ref">>) \| Partial<Omit<Props, "ref">> | - | Props passed down to recharts `Line` component |
| maxBarWidth | number | - | Maximum bar width in px |
| minBarSize | number | - | Sets minimum height of the bar in px |
| referenceLines | ChartReferenceLineProps[] | - | Reference lines that should be displayed on the chart |
| rightYAxisLabel | string | - | A label to display next to the right y-axis |
| rightYAxisProps | RechartsProps | - | Props passed down to the `YAxis` recharts component rendered on the right side |
| series | CompositeChartSeries[] | required | An array of objects with `name` and `color` keys. Determines which data should be consumed from the `data` array. |
| strokeDasharray | string \| number | - | Dash array for the grid lines and cursor, `'5 5'` by default |
| strokeWidth | number | - | Stroke width for the chart lines |
| textColor | MantineColor | - | Color of the text displayed inside the chart, `'dimmed'` by default |
| tickLine | "none" \| "x" \| "y" \| "xy" | - | Specifies which axis should have tick line, `'y'` by default |
| tooltipAnimationDuration | number | - | Tooltip position animation duration in ms, `0` by default |
| tooltipProps | RechartsProps | - | Props passed down to the `Tooltip` component |
| unit | string | - | Unit displayed next to each tick in y-axis |
| valueFormatter | (value: number) => string | - | A function to format values on Y axis and inside the tooltip |
| withBarValueLabel | boolean | - | Determines whether a label with bar value should be displayed on top of each bar |
| withDots | boolean | - | Determines whether dots should be displayed |
| withLegend | boolean | - | Determines whether chart legend should be displayed, `false` by default |
| withPointLabels | boolean | - | Determines whether each point should have associated label |
| withRightYAxis | boolean | - | Determines whether additional y-axis should be displayed on the right side of the chart, `false` by default |
| withTooltip | boolean | - | Determines whether chart tooltip should be displayed, `true` by default |
| withXAxis | boolean | - | Determines whether x-axis should be displayed, `true` by default |
| withYAxis | boolean | - | Determines whether y-axis should be displayed, `true` by default |
| xAxisLabel | string | - | A label to display below the x-axis |
| xAxisProps | RechartsProps | - | Props passed down to the `XAxis` recharts component |
| yAxisLabel | string | - | A label to display next to the y-axis |
| yAxisProps | RechartsProps | - | Props passed down to the `YAxis` recharts component |


#### Styles API

CompositeChart component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**CompositeChart selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-CompositeChart-root | Root element |
| area | .mantine-CompositeChart-area | Area of the chart |
| line | .mantine-CompositeChart-line | Line of the chart |
| bar | .mantine-CompositeChart-bar | Bar of the chart |
| axis | .mantine-CompositeChart-axis | X and Y axis of the chart |
| container | .mantine-CompositeChart-container | Recharts ResponsiveContainer component |
| grid | .mantine-CompositeChart-grid | Recharts CartesianGrid component |
| legend | .mantine-CompositeChart-legend | Legend root element |
| legendItem | .mantine-CompositeChart-legendItem | Legend item representing data series |
| legendItemColor | .mantine-CompositeChart-legendItemColor | Legend item color |
| legendItemName | .mantine-CompositeChart-legendItemName | Legend item name |
| tooltip | .mantine-CompositeChart-tooltip | Tooltip root element |
| tooltipBody | .mantine-CompositeChart-tooltipBody | Tooltip wrapper around all items |
| tooltipItem | .mantine-CompositeChart-tooltipItem | Tooltip item representing data series |
| tooltipItemBody | .mantine-CompositeChart-tooltipItemBody | Tooltip item wrapper around item color and name |
| tooltipItemColor | .mantine-CompositeChart-tooltipItemColor | Tooltip item color |
| tooltipItemName | .mantine-CompositeChart-tooltipItemName | Tooltip item name |
| tooltipItemData | .mantine-CompositeChart-tooltipItemData | Tooltip item data |
| tooltipLabel | .mantine-CompositeChart-tooltipLabel | Label of the tooltip |
| referenceLine | .mantine-CompositeChart-referenceLine | Reference line |
| axisLabel | .mantine-CompositeChart-axisLabel | X and Y axis labels |

**CompositeChart CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --chart-grid-color | Controls color of the grid and cursor lines |
| root | --chart-text-color | Controls color of the axis labels |


--------------------------------------------------------------------------------

### DonutChart
Package: @mantine/charts
Import: import { DonutChart } from '@mantine/charts';
Description: Donut chart component

## Usage

`DonutChart` is based on the [PieChart recharts component](https://recharts.org/en-US/api/PieChart):

```tsx
// Demo.tsx
import { DonutChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <DonutChart data={data} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Segments labels

Set the `withLabels` prop to display labels next to each segment:

```tsx
// Demo.tsx
import { DonutChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <DonutChart withLabelsLine={true} labelsType="value" withLabels data={data} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Size and thickness

Set the `size` prop to control the width and height of the chart. Note that if the `withLabels` prop is set,
the chart height is automatically increased by 80px to make room for labels. You can override
this behavior by setting the `h` [style prop](https://mantine.dev/llms/styles-style-props.md).

```tsx
// Demo.tsx
import { DonutChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <DonutChart size={160} thickness={20} data={data} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Padding angle

Use the `paddingAngle` prop to control the space between segments:

```tsx
// Demo.tsx
import { DonutChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <DonutChart paddingAngle={10} data={data} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Segment color

You can reference colors from [theme](https://mantine.dev/llms/theming-theme-object.md) the same way as in
other components, for example, `blue`, `red.5`, `orange.7`, etc. Any valid CSS
color value is also accepted.

```tsx
import { DonutChart } from '@mantine/charts';

function Demo() {
  return (
    <DonutChart
      data={[
        { name: 'USA', value: 400, color: 'blue' },
        { name: 'Other', value: 200, color: 'gray.6' },
      ]}
    />
  );
}
```


## Tooltip data source

By default, the tooltip displays data for all segments when hovered over any segment.
To display data only for the hovered segment, set `tooltipDataSource="segment"`:

```tsx
// Demo.tsx
import { Group, Text } from '@mantine/core';
import { DonutChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <Group gap={50}>
      <div>
        <Text fz="xs" mb="sm" ta="center">
          Data only for hovered segment
        </Text>
        <DonutChart data={data} tooltipDataSource="segment" mx="auto" />
      </div>

      <div>
        <Text fz="xs" mb="sm" ta="center">
          Data only for all segments
        </Text>
        <DonutChart data={data} mx="auto" />
      </div>
    </Group>
  );
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Without tooltip

To remove the tooltip, set `withTooltip={false}`:

```tsx
// Demo.tsx
import { DonutChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <DonutChart data={data} withTooltip={false} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Chart label

To display a label in the center of the chart, use the `chartLabel` prop.
It accepts a string or a number:

```tsx
// Demo.tsx
import { DonutChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <DonutChart data={data} chartLabel="Users by country" />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Start and end angle

Use the `startAngle` and `endAngle` props to control the start and end angle of the chart.
For example, to display a half-circle chart, set `startAngle={180}` and `endAngle={0}`:

```tsx
// Demo.tsx
import { DonutChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <DonutChart data={data} startAngle={180} endAngle={0} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


Note that even when the `startAngle` and `endAngle` props are set, the chart still takes
the same amount of space as if it were a full circle.

## Segments stroke

Use the `strokeWidth` prop to control the width of the stroke around each segment:

```tsx
// Demo.tsx
import { DonutChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <DonutChart strokeWidth={1} data={data} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


To change the color of the stroke, use the `strokeColor` prop. You can reference colors from the [theme](https://mantine.dev/llms/theming-theme-object.md) the same way as in
other components, for example, `blue`, `red.5`, `orange.7`, etc. Any valid CSS
color value is also accepted.

```tsx
import { DonutChart } from '@mantine/charts';

function Demo() {
  return <DonutChart data={[]} strokeColor="red.5" />;
}
```

By default, the segments stroke color is the same as the background color of the body element
(`--mantine-color-body` CSS variable). If you want to change it depending on the color scheme,
define a CSS variable and pass it to the `strokeColor` prop:

```tsx
// Demo.tsx
import { DonutChart } from '@mantine/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <div className={classes.root}>
      <DonutChart data={data} strokeColor="var(--card-bg)" />
    </div>
  );
}

// Demo.module.css
.root {
  --card-bg: light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5));

  background-color: var(--card-bg);
  padding: var(--mantine-spacing-md);
  border-radius: var(--mantine-radius-md);
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```



#### Props

**DonutChart props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| cellProps | ((series: DonutChartCell) => Partial<Omit<SVGProps<SVGElement>, "ref">>) \| Partial<Omit<SVGProps<SVGElement>, "ref">> | - | Props passed down to each segment of the chart |
| chartLabel | string \| number | - | Chart label, displayed in the center of the chart |
| children | React.ReactNode | - | Additional elements rendered inside `PieChart` component |
| data | DonutChartCell[] | required | Data used to render chart |
| endAngle | number | - | Controls angle at which charts ends. Set to `0` to render the chart as semicircle. |
| labelColor | MantineColor | - | Controls text color of all labels, by default depends on color scheme |
| labelsType | "value" \| "percent" | - | Type of labels to display, `'value'` by default |
| paddingAngle | number | - | Controls padding between segments |
| pieChartProps | (PolarChartProps<unknown> & { ref?: Ref<SVGSVGElement>; }) \| undefined | - | Props passed down to recharts `PieChart` component |
| pieProps | Partial<Omit<Props, "ref">> | - | Props passed down to recharts `Pie` component |
| size | number | - | Controls chart width and height, height is increased by 40 if `withLabels` prop is set. Cannot be less than `thickness`. |
| startAngle | number | - | Controls angle at which chart starts. Set to `180` to render the chart as semicircle. |
| strokeColor | MantineColor | - | Controls color of the segments stroke, by default depends on color scheme |
| strokeWidth | number | - | Controls width of segments stroke |
| thickness | number | - | Controls thickness of the chart segments |
| tooltipAnimationDuration | number | - | Tooltip animation duration in ms |
| tooltipDataSource | "all" \| "segment" | - | Determines which data is displayed in the tooltip. `'all'` – display all values, `'segment'` – display only hovered segment. |
| tooltipProps | RechartsProps | - | Props passed down to `Tooltip` recharts component |
| valueFormatter | (value: number) => string | - | A function to format values inside the tooltip |
| withLabels | boolean | - | Determines whether each segment should have associated label |
| withLabelsLine | boolean | - | Determines whether segments labels should have lines that connect the segment with the label |
| withTooltip | boolean | - | Determines whether the tooltip should be displayed when one of the section is hovered |


#### Styles API

DonutChart component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**DonutChart selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-DonutChart-root | Root element |
| label | .mantine-DonutChart-label | Chart label, controlled by `chartLabel` prop |
| tooltip | .mantine-DonutChart-tooltip | Tooltip root element |
| tooltipBody | .mantine-DonutChart-tooltipBody | Tooltip wrapper around all items |
| tooltipItem | .mantine-DonutChart-tooltipItem | Tooltip item representing data series |
| tooltipItemBody | .mantine-DonutChart-tooltipItemBody | Tooltip item wrapper around item color and name |
| tooltipItemColor | .mantine-DonutChart-tooltipItemColor | Tooltip item color |
| tooltipItemName | .mantine-DonutChart-tooltipItemName | Tooltip item name |
| tooltipItemData | .mantine-DonutChart-tooltipItemData | Tooltip item data |
| tooltipLabel | .mantine-DonutChart-tooltipLabel | Label of the tooltip |

**DonutChart CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --chart-labels-color | Controls color of the chart labels |
| root | --chart-size | Controls size of the chart |
| root | --chart-stroke-color | Controls color of the chart stroke |


--------------------------------------------------------------------------------

### FunnelChart
Package: @mantine/charts
Import: import { FunnelChart } from '@mantine/charts';
Description: Funnel chart component

## Usage

`FunnelChart` is based on the [FunnelChart recharts component](https://recharts.org/en-US/api/FunnelChart):

```tsx
// Demo.tsx
import { FunnelChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <FunnelChart data={data} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Segments labels

Set the `withLabels` prop to display labels next to each segment.
Use the `labelPosition` prop to control the position of labels relative to the corresponding segment.

```tsx
// Demo.tsx
import { FunnelChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <FunnelChart labelsPosition="right" withLabels data={data} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Size and thickness

Set the `size` prop to control the width and height of the chart.
You can override this behavior by setting the `h` [style prop](https://mantine.dev/llms/styles-style-props.md).

```tsx
// Demo.tsx
import { FunnelChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <FunnelChart size={160} data={data} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Segment color

You can reference colors from [theme](https://mantine.dev/llms/theming-theme-object.md) the same way as in
other components, for example, `blue`, `red.5`, `orange.7`, etc. Any valid CSS
color value is also accepted.

```tsx
import { FunnelChart } from '@mantine/charts';

function Demo() {
  return (
    <FunnelChart
      data={[
        { name: 'USA', value: 400, color: 'blue' },
        { name: 'Other', value: 200, color: 'gray.6' },
      ]}
    />
  );
}
```


## Tooltip data source

By default, the tooltip displays data for all segments when hovered over any segment.
To display data only for the hovered segment, set `tooltipDataSource="segment"`:

```tsx
// Demo.tsx
import { Group, Text } from '@mantine/core';
import { FunnelChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <Group gap={50}>
      <div>
        <Text fz="xs" mb="sm" ta="center">
          Data only for hovered segment
        </Text>
        <FunnelChart data={data} tooltipDataSource="segment" mx="auto" />
      </div>

      <div>
        <Text fz="xs" mb="sm" ta="center">
          Data only for all segments
        </Text>
        <FunnelChart data={data} mx="auto" />
      </div>
    </Group>
  );
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Without tooltip

To remove the tooltip, set `withTooltip={false}`:

```tsx
// Demo.tsx
import { FunnelChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <FunnelChart data={data} withTooltip={false} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


## Segments stroke

Use the `strokeWidth` prop to control the width of the stroke around each segment:

```tsx
// Demo.tsx
import { FunnelChart } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <FunnelChart strokeWidth={1} data={data} />;
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```


To change the color of the stroke, use the `strokeColor` prop. You can reference colors from the [theme](https://mantine.dev/llms/theming-theme-object.md) the same way as in
other components, for example, `blue`, `red.5`, `orange.7`, etc. Any valid CSS
color value is also accepted.

```tsx
import { FunnelChart } from '@mantine/charts';

function Demo() {
  return <FunnelChart data={[]} strokeColor="red.5" />;
}
```

By default, the segments stroke color is the same as the background color of the body element
(`--mantine-color-body` CSS variable). If you want to change it depending on the color scheme,
define a CSS variable and pass it to the `strokeColor` prop:

```tsx
// Demo.tsx
import { FunnelChart } from '@mantine/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <div className={classes.root}>
      <FunnelChart data={data} strokeColor="var(--card-bg)" />
    </div>
  );
}

// Demo.module.css
.root {
  --card-bg: light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5));

  background-color: var(--card-bg);
  padding: var(--mantine-spacing-md);
  border-radius: var(--mantine-radius-md);
}

// data.ts
export const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
```



#### Props

**FunnelChart props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Additional elements rendered inside `FunnelChart` component |
| data | FunnelChartCell[] | required | Data used to render chart |
| funnelChartProps | (CartesianChartProps<unknown> & { ref?: Ref<SVGSVGElement>; }) \| undefined | - | Props passed down to recharts `FunnelChart` component |
| funnelProps | Partial<Omit<Props, "ref">> | - | Props passed down to recharts `Pie` component |
| labelColor | MantineColor | - | Controls text color of all labels |
| labelsPosition | "left" \| "right" \| "inside" | - | Controls labels position relative to the segment |
| size | number | - | Controls chart width and height |
| strokeColor | MantineColor | - | Controls color of the segments stroke, by default depends on color scheme |
| strokeWidth | number | - | Controls width of segments stroke |
| tooltipAnimationDuration | number | - | Tooltip animation duration in ms |
| tooltipDataSource | "all" \| "segment" | - | Determines which data is displayed in the tooltip. `'all'` – display all values, `'segment'` – display only hovered segment. |
| tooltipProps | RechartsProps | - | Props passed down to `Tooltip` recharts component |
| valueFormatter | (value: number) => string | - | A function to format values inside the tooltip and labels |
| withLabels | boolean | - | Determines whether each segment should have associated label |
| withTooltip | boolean | - | Determines whether the tooltip should be displayed when a section is hovered |


#### Styles API

FunnelChart component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**FunnelChart selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-FunnelChart-root | Root element |
| tooltip | .mantine-FunnelChart-tooltip | Tooltip root element |
| tooltipBody | .mantine-FunnelChart-tooltipBody | Tooltip wrapper around all items |
| tooltipItem | .mantine-FunnelChart-tooltipItem | Tooltip item representing data series |
| tooltipItemBody | .mantine-FunnelChart-tooltipItemBody | Tooltip item wrapper around item color and name |
| tooltipItemColor | .mantine-FunnelChart-tooltipItemColor | Tooltip item color |
| tooltipItemName | .mantine-FunnelChart-tooltipItemName | Tooltip item name |
| tooltipItemData | .mantine-FunnelChart-tooltipItemData | Tooltip item data |
| tooltipLabel | .mantine-FunnelChart-tooltipLabel | Label of the tooltip |

**FunnelChart CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --chart-labels-color | Controls color of the chart labels |
| root | --chart-size | Controls size of the chart |
| root | --chart-stroke-color | Controls color of the chart stroke |


--------------------------------------------------------------------------------

### GettingStartedCharts
Package: @mantine/charts
Import: import { GettingStartedCharts } from '@mantine/charts';

## Installation

```bash
yarn add @mantine/charts recharts
```

```bash
npm install @mantine/charts recharts
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import charts styles after core package styles
import '@mantine/charts/styles.css';
```

After installation, import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import charts styles after core package styles
import '@mantine/charts/styles.css';
```

## Do not forget to import styles

Followed the installation instructions above but something is not working
(misplaced tooltips or no colors)?
You've fallen into the trap of not importing chart styles!
To fix the issue, import chart styles at the root of your application:

```tsx
import '@mantine/charts/styles.css';
```

## Based on recharts

Most of the components in the `@mantine/charts` package are based on the [recharts](https://recharts.org/) library.
If you need advanced features that are not covered in the `@mantine/charts`
documentation, refer to the [recharts documentation](https://recharts.org/en-US/api) for more information.


--------------------------------------------------------------------------------

### Heatmap
Package: @mantine/charts
Import: import { Heatmap } from '@mantine/charts';
Description: Heatmap chart component

## Usage

`Heatmap` is used to display data in a table where each column represents a week.
The only required prop is `data` – an object where keys are dates in `YYYY-MM-DD` format and values are numbers.

The `startDate` and `endDate` props are optional; they are used to define the heatmap range.
If not set, the heatmap will display data for the last year.

```tsx
// Demo.tsx
import { Heatmap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return <Heatmap data={data} startDate="2024-02-16" endDate="2025-02-16" />;
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```


## Data format

`Heatmap` expects data in the following format:

```tsx
export const data = {
  '2025-02-14': 2,
  '2025-02-11': 3,
  '2025-02-06': 4,
  '2025-02-05': 1,
  '2025-02-03': 2,
  '2025-02-01': 2,
  '2025-01-31': 4,
  '2025-01-30': 2,
  // ...
};
```

## With tooltip

Set the `withTooltip` and `getTooltipLabel` props to display a tooltip when
`Heatmap` cells are hovered. `getTooltipLabel` is called with date and value
and must return a string to display in the tooltip.

```tsx
// Demo.tsx
import dayjs from 'dayjs';
import { Heatmap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      withTooltip
      withWeekdayLabels
      withMonthLabels
      getTooltipLabel={({ date, value }) =>
        `${dayjs(date).format('DD MMM, YYYY')} – ${value === null || value === 0 ? 'No contributions' : `${value} contribution${value > 1 ? 's' : ''}`}`
      }
    />
  );
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```


## Change colors

`Heatmap` colors can be changed with the `colors` prop. It should be an array of any
valid CSS color values (hex, rgba, CSS variables, etc.). By default, `Heatmap`
uses 4 colors to indicate heat level, but you can pass any number of colors.

```tsx
// Demo.tsx
import { Heatmap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      colors={[
        'var(--mantine-color-orange-4)',
        'var(--mantine-color-orange-6)',
        'var(--mantine-color-orange-7)',
        'var(--mantine-color-orange-9)',
      ]}
    />
  );
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```


## Colors depending on color scheme

If you want to change colors depending on the color scheme,
you should define those colors in `.css` file:

```tsx
// Demo.tsx
import { Heatmap } from '@mantine/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      classNames={classes}
    />
  );
}

// Demo.module.css
.root {
  @mixin light {
    --heatmap-level-1: var(--mantine-color-blue-2);
    --heatmap-level-2: var(--mantine-color-blue-4);
    --heatmap-level-3: var(--mantine-color-blue-6);
    --heatmap-level-4: var(--mantine-color-blue-9);
  }

  @mixin dark {
    --heatmap-level-1: alpha(var(--mantine-color-orange-6), 0.35);
    --heatmap-level-2: alpha(var(--mantine-color-orange-6), 0.65);
    --heatmap-level-3: var(--mantine-color-orange-6);
    --heatmap-level-4: var(--mantine-color-yellow-4);
  }
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```


Note that in this case, you can only use 4 colors without passing the `colors` prop.
If you need more colors, you should pass them manually to the component:

```tsx
import { Heatmap } from '@mantine/charts';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      classNames={classes}
      colors={[
        'var(--heatmap-level-1)',
        'var(--heatmap-level-2)',
        'var(--heatmap-level-3)',
        'var(--heatmap-level-4)',
        'var(--heatmap-level-5)',
        'var(--heatmap-level-6)',
      ]}
    />
  );
}
```

## Values domain

By default, `Heatmap` calculates domain based on data values, for example, for
the following data, the domain will be `[1, 4]`:

```tsx
const data = {
  '2025-02-14': 2,
  '2025-02-11': 3,
  '2025-02-06': 4,
  '2025-02-05': 1,
};
```

Based on the domain, `Heatmap` calculates colors for each rect: 1 – min heat level,
4 – max heat level. To specify the domain manually, use the `domain` prop. It is useful
when your data does not cover the whole range of possible values. For example,
the subset of data passed to the heatmap has values from 1 to 4, but the actual
range is from 1 to 10. In this case, you can pass `[1, 10]` to the `domain` prop:

```tsx
import { Heatmap } from '@mantine/charts';

const data = {
  '2025-02-14': 2,
  '2025-02-11': 3,
  '2025-02-06': 4,
  '2025-02-05': 1,
};

function Demo() {
  return <Heatmap data={data} domain={[1, 10]} />;
}
```

## Weekdays and months labels

Set the `withMonthLabels` and `withWeekdayLabels` props to display chart labels:

```tsx
// Demo.tsx
import { Heatmap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      withMonthLabels
      withWeekdayLabels
    />
  );
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```


## Change labels text

To change labels, use the `weekdayLabels` and `monthLabels` props.
The `weekdayLabels` prop must be an array of 7 strings with weekday names starting from Sunday.
The `monthLabels` prop must be an array of 12 strings with month names starting from January.

```tsx
// Demo.tsx
import { Heatmap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      withMonthLabels
      withWeekdayLabels
      weekdayLabels={['Вс', 'Пн', '', 'Ср', '', 'Пт', '']}
      monthLabels={[
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
      ]}
    />
  );
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```


## Rect size, gap and radius

```tsx
// Demo.tsx
import { Heatmap } from '@mantine/charts';


function Demo() {
  return (
    <Heatmap
      data={data}
      withMonthLabels
      withWeekdayLabels
      startDate="2024-02-16"
      endDate="2024-04-16"
       rectSize={10} rectRadius={2} gap={1}
    />
  );
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```


## Pass props to rect

Use `getRectProps` to pass props to each rect. For example,
it can be used to add an onClick handler to each rect:

```tsx
// Demo.tsx
import { Heatmap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      getRectProps={({ date, value }) => ({
        onClick: () => console.log({ date, value }),
      })}
    />
  );
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```


## Hide outside dates

```tsx
// Demo.tsx
import { Heatmap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2024-04-16"
      withOutsideDates={false}
      withMonthLabels
      withWeekdayLabels
      withTooltip
      getTooltipLabel={({ date, value }) => `${date} – ${value ?? 0} contributions`}
    />
  );
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```


## First day of week

The default first day of the week is Monday; you can change it with the `firstDayOfWeek` prop:

```tsx
// Demo.tsx
import { Heatmap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2024-04-26"
      withMonthLabels
      withWeekdayLabels
      withTooltip
      firstDayOfWeek={0}
      weekdayLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
      getTooltipLabel={({ date, value }) => `${date} – ${value ?? 0} contributions`}
    />
  );
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```


## Legend

Set `withLegend` to display a color legend below the heatmap. Use `legendLabels`
prop to customize the labels (default: `['Less', 'More']`):

```tsx
// Demo.tsx
import { Heatmap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      withMonthLabels
      withWeekdayLabels
      withLegend
    />
  );
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```


## Split months

Use `splitMonths` to separate months visually with a spacer column and show only days that belong to the current month in each column. Month labels will be shifted by one column when `splitMonths` is enabled and months with fewer than 2 weeks are not labeled.

```tsx
// Demo.tsx
import { Heatmap } from '@mantine/charts';
import { data } from './data';

function Demo() {
  return (
    <Heatmap
      data={data}
      startDate="2024-02-16"
      endDate="2025-02-16"
      withMonthLabels
      splitMonths
    />
  );
}

// data.ts
export const data = ${JSON.stringify(data, null, 2)};
```



#### Props

**Heatmap props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| colors | string[] | - | Colors array, used to calculate color for each value, by default 4 shades of green colors are used |
| data | Record<string, number> | required | Heatmap data, key is date in `YYYY-MM-DD` format (interpreted as a UTC calendar day) |
| domain | [number, number] | - | Heatmap domain, array of 2 numbers, min and max values, calculated from data by default |
| endDate | string \| Date | - | Heatmap end date. Current date by default. Date is normalized to UTC midnight of the intended calendar day. |
| firstDayOfWeek | 0 \| 2 \| 1 \| 3 \| 4 \| 5 \| 6 | - | First day of week, 0 – Sunday, 1 – Monday. |
| fontSize | number | - | Font size of month and weekday labels |
| gap | number | - | Gap between rects in px |
| getRectProps | (input: HeatmapRectData) => SVGProps<SVGRectElement> | - | Props passed down to each rect depending on its date and associated value |
| getTooltipLabel | (input: HeatmapRectData) => ReactNode | - | A function to generate tooltip label based on the hovered rect date and value, required for the tooltip to be visible |
| legendLabels | [string, string] | - | Legend labels, array of 2 elements: [min label, max label] |
| monthLabels | string[] | - | Month labels, array of 12 elements, can be used for localization |
| monthsLabelsHeight | number | - | Height of month labels row |
| rectRadius | number | - | Rect radius in px |
| rectSize | number | - | Size of day rect in px |
| splitMonths | boolean | - | If set, inserts a spacer column between months |
| startDate | string \| Date | - | Heatmap start date. Current date - 1 year by default. Date is normalized to UTC midnight of the intended calendar day. |
| tooltipProps | Partial<TooltipFloatingProps> | - | Props passed down to the `Tooltip.Floating` component |
| weekdayLabels | string[] | - | Weekday labels, array of 7 elements, can be used for localization |
| weekdaysLabelsWidth | number | - | Width of weekday labels column |
| withLegend | boolean | - | If set, legend with color levels is displayed below the heatmap |
| withMonthLabels | boolean | - | If set, month labels are displayed |
| withOutsideDates | boolean | - | If set, trailing dates that do not fall into the given `startDate` – `endDate` range are displayed to fill empty space. |
| withTooltip | boolean | - | If set, tooltip is displayed on rect hover |
| withWeekdayLabels | boolean | - | If set, weekday labels are displayed |


#### Styles API

Heatmap component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Heatmap selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Heatmap-root | Root element |
| weekdayLabel | .mantine-Heatmap-weekdayLabel | Weekday text element |
| monthLabel | .mantine-Heatmap-monthLabel | Month text element |
| rect | .mantine-Heatmap-rect | Rect that represents date |
| legend | .mantine-Heatmap-legend | Legend group element |
| legendLabel | .mantine-Heatmap-legendLabel | Legend text label (Less/More) |
| legendRect | .mantine-Heatmap-legendRect | Legend color rect |


--------------------------------------------------------------------------------

### LineChart
Package: @mantine/charts
Import: import { LineChart } from '@mantine/charts';
Description: Line chart component

## Usage

```tsx
// Demo.tsx
import { LineChart } from '@mantine/charts';
import { data } from './data';


function Demo() {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      series={[
        { name: 'Apples', color: 'indigo.6' },
        { name: 'Oranges', color: 'blue.6' },
        { name: 'Tomatoes', color: 'teal.6' },
      ]}
       curveType="linear" tickLine="y" gridAxis="x" withXAxis={true} withYAxis={true} withDots={true}
    />
  );
}

// data.ts
export const data = [
  {
    date: 'Mar 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];
```


