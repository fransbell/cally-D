## Presets

Use the `presets` prop to add custom month presets. Presets are displayed next to the calendar:

```tsx
import dayjs from 'dayjs';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  return (
    <MonthPicker
      presets={[
        { value: dayjs().startOf('month').format('YYYY-MM-DD'), label: 'This month' },
        { value: dayjs().add(1, 'month').startOf('month').format('YYYY-MM-DD'), label: 'Next month' },
        { value: dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'), label: 'Last month' },
        { value: dayjs().add(6, 'month').startOf('month').format('YYYY-MM-DD'), label: 'In 6 months' },
        { value: dayjs().add(1, 'year').startOf('month').format('YYYY-MM-DD'), label: 'Next year' },
        { value: dayjs().subtract(1, 'year').startOf('month').format('YYYY-MM-DD'), label: 'Last year' },
      ]}
    />
  );
}
```


To use `presets` with `type="range"`, define the value as a tuple of two dates:

```tsx
import dayjs from 'dayjs';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  const today = dayjs();

  return (
    <MonthPicker
      type="range"
      presets={[
        {
          value: [today.subtract(3, 'month').startOf('month').format('YYYY-MM-DD'), today.startOf('month').format('YYYY-MM-DD')],
          label: 'Last 3 months',
        },
        {
          value: [today.subtract(6, 'month').startOf('month').format('YYYY-MM-DD'), today.startOf('month').format('YYYY-MM-DD')],
          label: 'Last 6 months',
        },
        {
          value: [today.startOf('year').format('YYYY-MM-DD'), today.startOf('month').format('YYYY-MM-DD')],
          label: 'This year',
        },
        {
          value: [
            today.subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
            today.subtract(1, 'year').endOf('year').startOf('month').format('YYYY-MM-DD'),
          ],
          label: 'Last year',
        },
      ]}
    />
  );
}
```


## Default date

Use the `defaultDate` prop to set the date value that will be used to determine which year should be displayed initially.
For example, to display the `2015` year, set `defaultDate={new Date(2015, 1)}`. If the value is not specified,
then `defaultDate` will use `new Date()`. Month, day, minutes and seconds are ignored in the provided date object, only the year is used –
you can specify any date value.

Note that if you set the `date` prop, then the `defaultDate` value will be ignored.

```tsx
import { useState } from 'react';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <MonthPicker defaultDate="2015-02-01" value={value} onChange={setValue} />;
}
```


## Controlled date

Set the `date` and `onDateChange` props to make the currently displayed year and decade controlled.
By doing so, you can customize the date picking experience. For example, when the user selects the first date in a range,
you can add one year to the current date value:

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<[string | null, string | null]>([null, null]);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  const handleChange = (val: [string | null, string | null]) => {
    if (val[0] !== null && val[1] === null) {
      setDate((current) => dayjs(current).add(1, 'year').format('YYYY-MM-DD'));
    }

    setValue(val);
  };

  return (
    <MonthPicker
      date={date}
      onDateChange={setDate}
      type="range"
      value={value}
      onChange={handleChange}
    />
  );
}
```


## Min and max date

Set the `minDate` and `maxDate` props to define minimum and maximum dates. If the previous/next page is not available,
then the corresponding control will be disabled.

```tsx
import { useState } from 'react';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPicker
      value={value}
      onChange={setValue}
      defaultDate="2022-02-01"
      minDate="2022-02-01"
      maxDate="2022-09-01"
    />
  );
}
```


## Add props to year and month control

You can add props to year and month controls with the `getYearControlProps` and `getMonthControlProps` functions. Both functions accept a date as a single argument,
and props returned from the function will be added to the year/month control. For example, it can be used to disable a specific
control or add styles:

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthPicker, MonthPickerProps } from '@mantine/dates';

const getYearControlProps: MonthPickerProps['getYearControlProps'] = (date) => {
  if (dayjs(date).year() === new Date().getFullYear()) {
    return {
      style: {
        color: 'var(--mantine-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (dayjs(date).year() === new Date().getFullYear() + 1) {
    return { disabled: true };
  }

  return {};
};

const getMonthControlProps: MonthPickerProps['getMonthControlProps'] = (date) => {
  if (dayjs(date).month() === 1) {
    return {
      style: {
        color: 'var(--mantine-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (dayjs(date).month() === 5) {
    return { disabled: true };
  }

  return {};
};

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPicker
      value={value}
      onChange={setValue}
      getYearControlProps={getYearControlProps}
      getMonthControlProps={getMonthControlProps}
    />
  );
}
```


## Number of columns

Set the `numberOfColumns` prop to define the number of pickers that will be rendered side by side:



## Max level

To disallow users from going to the decade level, set `maxLevel="year"`:

```tsx
import { MonthPicker } from '@mantine/dates';

function Demo() {
  return <MonthPicker maxLevel="year" />;
}
```


## Full width

Set the `fullWidth` prop to make the month picker stretch to fill 100% of its parent container width:

```tsx
import { useState } from 'react';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <MonthPicker fullWidth value={value} onChange={setValue} />;
}
```


## Size



## Change year and months controls format

Use the `yearsListFormat` and `monthsListFormat` props to change the [dayjs format](https://day.js.org/docs/en/display/format) of year/month controls:

```tsx
import { MonthPicker } from '@mantine/dates';

function Demo() {
  return <MonthPicker monthsListFormat="MM" yearsListFormat="YY" />;
}
```


## Change label format

Use `decadeLabelFormat` and `yearLabelFormat` to change the [dayjs format](https://day.js.org/docs/en/display/format) of the decade/year label:

```tsx
import { useState } from 'react';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPicker
      decadeLabelFormat="YY"
      yearLabelFormat="YYYY [year]"
      value={value}
      onChange={setValue}
    />
  );
}
```


## Localization

Usually it is better to specify the `@mantine/dates` package locale in [DatesProvider](https://mantine.dev/llms/dates-getting-started.md),
but you can also override the locale per component:

```tsx
import 'dayjs/locale/ru';
import { MonthPicker } from '@mantine/dates';

function Demo() {
  return <MonthPicker locale="ru" />;
}
```


## Accessibility

### Aria labels

Set the `ariaLabels` prop to specify `aria-label` attributes for next/previous controls:

```tsx
import { MonthPicker } from '@mantine/dates';

function Demo() {
  return (
    <MonthPicker
      ariaLabels={{
        nextDecade: 'Next decade',
        previousDecade: 'Previous decade',
        nextYear: 'Next year',
        previousYear: 'Previous year',
        yearLevelControl: 'Change to decade view',
      }}
    />
  );
}
```

### Year/month control aria-label

Use `getYearControlProps`/`getMonthControlProps` to customize the `aria-label` attribute:

```tsx
import { MonthPicker } from '@mantine/dates';

function Demo() {
  return (
    <MonthPicker
      getYearControlProps={(date) => ({
        'aria-label': `Select year ${date.getFullYear()}`,
      })}
      getMonthControlProps={(date) => ({
        'aria-label': `Select month ${date.getFullYear()}/${date.getMonth()}`,
      })}
    />
  );
}
```

### Keyboard interactions

Note that the following events will only trigger if focus is on a month control.


#### Props

**MonthPicker props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | Determines whether user can deselect the date by clicking on selected item, applicable only when type="default" |
| allowSingleDateInRange | boolean | - | Determines whether a single day can be selected as range, applicable only when type="range" |
| ariaLabels | CalendarAriaLabels | - | `aria-label` attributes for controls on different levels |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as `numberOfColumns` if not set explicitly |
| date | string \| Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string \| ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | `dayjs` format for decade label or a function that returns decade label based on the date value |
| defaultDate | string \| Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" \| "year" \| "decade" | - | Initial displayed level (uncontrolled) |
| defaultValue | DateValue \| DatesRangeValue<DateValue> \| DateValue[] | - | Default value for uncontrolled component |
| fullWidth | boolean | - | Determines whether the list should take the full width of its container |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| level | "month" \| "year" \| "decade" | - | Current displayed level (controlled) |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string \| Date | - | Maximum possible date in `YYYY-MM-DD` format or Date object |
| maxLevel | "month" \| "year" \| "decade" | - | Max level that user can go up to |
| minDate | string \| Date | - | Minimum possible date in `YYYY-MM-DD` format or Date object |
| monthsListFormat | string | - | `dayjs` format for months list |
| nextLabel | string | - | Next button `aria-label` |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: DatePickerValue<Type, string>) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onLevelChange | (level: MonthPickerLevel) => void | - | Called when level changes |
| onMonthSelect | (date: string) => void | - | Called when month is selected |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| presets | MonthPickerPreset<Type>[] | - | Predefined values to pick from |
| previousLabel | string | - | Previous button `aria-label` |
| size | MantineSize | - | Component size |
| type | "range" \| "multiple" \| "default" | - | Picker type: range, multiple or default |
| value | DateValue \| DatesRangeValue<DateValue> \| DateValue[] | - | Value for controlled component |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| yearLabelFormat | string \| ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |

**MonthPicker.Input props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | Determines whether user can deselect the date by clicking on selected item, applicable only when type="default" |
| allowSingleDateInRange | boolean | - | Determines whether a single day can be selected as range, applicable only when type="range" |
| ariaLabels | CalendarAriaLabels | - | `aria-label` attributes for controls on different levels |
| clearButtonProps | React.ComponentProps<"button"> | - | Props passed down to the clear button |
| clearSectionMode | ClearSectionMode | - | Determines how the clear button and rightSection are rendered |
| clearable | boolean | - | If set, clear button is displayed in the `rightSection` when the component has value. Ignored if `rightSection` prop is set. |
| closeOnChange | boolean | - | Determines whether the dropdown is closed when date is selected, not applicable with `type="multiple"` |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as `numberOfColumns` if not set explicitly |
| date | string \| Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string \| ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | `dayjs` format for decade label or a function that returns decade label based on the date value |
| defaultDate | string \| Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" \| "year" \| "decade" | - | Initial displayed level (uncontrolled) |
| defaultValue | DateValue \| DatesRangeValue<DateValue> \| DateValue[] | - | Default value for uncontrolled component |
| description | React.ReactNode | - | Contents of `Input.Description` component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps | - | Props passed down to the `Input.Description` component |
| disabled | boolean | - | Sets `disabled` attribute on the `input` element |
| dropdownType | "popover" \| "modal" | - | Type of the dropdown |
| error | React.ReactNode | - | Contents of `Input.Error` component. If not set, error is not displayed. |
| errorProps | InputErrorProps | - | Props passed down to the `Input.Error` component |
| fullWidth | boolean | - | Determines whether the list should take the full width of its container |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| inputContainer | (children: ReactNode) => ReactNode | - | Render function to wrap the input element. Useful for adding tooltips, popovers, or other wrappers around the input. |
| inputSize | string | - | HTML `size` attribute for the input element (number of visible characters) |
| inputWrapperOrder | ("input" \| "label" \| "description" \| "error")[] | - | Controls order and visibility of wrapper elements. Only elements included in this array will be rendered. |
| label | React.ReactNode | - | Contents of `Input.Label` component. If not set, label is not displayed. |
| labelProps | InputLabelProps | - | Props passed down to the `Input.Label` component |
| labelSeparator | string | - | Separator between range value |
| leftSection | React.ReactNode | - | Content section displayed on the left side of the input |
| leftSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `leftSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| leftSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `leftSection` element |
| leftSectionWidth | React.CSSProperties["width"] | - | Left section width, used to set `width` of the section and input `padding-left`, by default equals to the input height |
| level | "month" \| "year" \| "decade" | - | Current displayed level (controlled) |
| loading | boolean | - | Displays loading indicator in the left or right section |
| loadingPosition | "left" \| "right" | - | Position of the loading indicator |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string \| Date | - | Maximum possible date in `YYYY-MM-DD` format or Date object |
| maxLevel | "month" \| "year" \| "decade" | - | Max level that user can go up to |
| minDate | string \| Date | - | Minimum possible date in `YYYY-MM-DD` format or Date object |
| modalProps | Partial<Omit<ModalProps, "children">> | - | Props passed down to `Modal` component |
| monthsListFormat | string | - | `dayjs` format for months list |
| nextLabel | string | - | Next button `aria-label` |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: DatePickerValue<Type, string>) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onDropdownClose | () => void | - | Called when the dropdown is closed |
| onLevelChange | (level: MonthPickerLevel) => void | - | Called when level changes |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| placeholder | string | - | Input placeholder |
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| popoverProps | Partial<Omit<PopoverProps, "children">> | - | Props passed down to `Popover` component |
| presets | MonthPickerPreset<Type>[] | - | Predefined values to pick from |
| previousLabel | string | - | Previous button `aria-label` |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| readOnly | boolean | - | If set, the component value cannot be changed by the user |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| size | MantineSize | - | Component size |
| sortDates | boolean | - | Determines whether dates values should be sorted before `onChange` call, only applicable with type="multiple" |
| type | "range" \| "multiple" \| "default" | - | Picker type: range, multiple or default |
| value | DateValue \| DatesRangeValue<DateValue> \| DateValue[] | - | Value for controlled component |
| valueFormat | string | - | `dayjs` format for input value |
| valueFormatter | DateFormatter | - | A function to format selected dates values into a string. By default, date is formatted based on the input type. |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| wrapperProps | WrapperProps | - | Props passed down to the root element |
| yearLabelFormat | string \| ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

MonthPicker component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**MonthPicker selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-MonthPicker-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-MonthPicker-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-MonthPicker-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-MonthPicker-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-MonthPicker-levelsGroup | Group of years levels |
| yearsList | .mantine-MonthPicker-yearsList | Years list table element |
| yearsListRow | .mantine-MonthPicker-yearsListRow | Years list row element |
| yearsListCell | .mantine-MonthPicker-yearsListCell | Years list cell element |
| yearsListControl | .mantine-MonthPicker-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-MonthPicker-monthsList | Months list table element |
| monthsListRow | .mantine-MonthPicker-monthsListRow | Months list row element |
| monthsListCell | .mantine-MonthPicker-monthsListCell | Months list cell element |
| monthsListControl | .mantine-MonthPicker-monthsListControl | Button used to pick months and years |
| monthPickerRoot | .mantine-MonthPicker-monthPickerRoot | Month picker root element, contains calendar and presets |
| presetsList | .mantine-MonthPicker-presetsList | Presets wrapper element |
| presetButton | .mantine-MonthPicker-presetButton | Preset button |

**MonthPicker CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| monthPickerRoot | --preset-font-size | Controls font size of preset buttons |

**MonthPickerinput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-MonthPickerinput-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-MonthPickerinput-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-MonthPickerinput-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-MonthPickerinput-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-MonthPickerinput-levelsGroup | Group of years levels |
| yearsList | .mantine-MonthPickerinput-yearsList | Years list table element |
| yearsListRow | .mantine-MonthPickerinput-yearsListRow | Years list row element |
| yearsListCell | .mantine-MonthPickerinput-yearsListCell | Years list cell element |
| yearsListControl | .mantine-MonthPickerinput-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-MonthPickerinput-monthsList | Months list table element |
| monthsListRow | .mantine-MonthPickerinput-monthsListRow | Months list row element |
| monthsListCell | .mantine-MonthPickerinput-monthsListCell | Months list cell element |
| monthsListControl | .mantine-MonthPickerinput-monthsListControl | Button used to pick months and years |
| monthPickerRoot | .mantine-MonthPickerinput-monthPickerRoot | Month picker root element, contains calendar and presets |
| presetsList | .mantine-MonthPickerinput-presetsList | Presets wrapper element |
| presetButton | .mantine-MonthPickerinput-presetButton | Preset button |
| placeholder | .mantine-MonthPickerinput-placeholder | Placeholder element |


--------------------------------------------------------------------------------

### TimeGrid
Package: @mantine/dates
Import: import { TimeGrid } from '@mantine/dates';
Description: Captures time value from the user with a predefined set of options

## Usage

Use the `TimeGrid` component to capture a time value from the user with a
predefined set of time slots:

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';


function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '10:00', endTime: '21:00', interval: '01:00' })}
      simpleGridProps={{
        type: 'container',
        cols: { base: 1, '180px': 2, '320px': 3 },
        spacing: 'xs',
      }}
       format="24h" withSeconds={false} size="sm" radius="sm"
    />
  );
}
```


## Controlled

```tsx
import { useState } from 'react';
import { TimeGrid } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>('10:00');
  return <TimeGrid value={value} onChange={setValue} data={['10:00', '12: 00']} />;
}
```

## data prop

The `data` prop accepts an array of time values in 24-hour format. Values
must be unique. To generate a time range, use the `getTimeRange` function
exported from the `@mantine/dates` package:

```tsx
import { TimeGrid, getTimeRange } from '@mantine/dates';

function WithArray() {
  return <TimeGrid data={['10:00', '12:00']} />
}

function WithRange() {
  // In this example we generate time range from 10:00 to 14:00 with 1 hour step:
  // ['10:00', '11:00', '12:00', '13:00', '14:00']
  return <TimeGrid data={getTimeRange({ from: '10:00', to: '14:00', step: '01:00' })} />
}
```

## Min and max time

Set the `minTime` and `maxTime` props to limit the available time range.
Both props accept time values in 24-hour format:

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '22:00', interval: '01:00' })}
      minTime="11:00"
      maxTime="18:00"
    />
  );
}
```


## Disable specific controls

You can disable specific time values by providing an array of disabled
values to the `disableTime` prop:

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '11:45', interval: '00:15' })}
      disableTime={['10:45', '11:00', '11:30']}
    />
  );
}
```


## Allow deselect

Set the `allowDeselect` prop to allow deselecting the time value by clicking on
the control with the selected value:

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '12:00', interval: '01:00' })}
      defaultValue="11:00"
      allowDeselect
    />
  );
}
```


## Change AM/PM labels

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '22:00', interval: '01:00' })}
      format="12h"
      amPmLabels={{ am: 'पूर्वाह्न', pm: 'अपराह्न' }}
    />
  );
}
```


## Disabled

Set the `disabled` prop to disable all controls:

```tsx
import { getTimeRange, TimeGrid } from '@mantine/dates';

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '22:00', interval: '01:00' })}
      disabled
    />
  );
}
```



#### Props

**TimeGrid props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | Determines whether the value can be deselected when the current active option is clicked or activated with keyboard |
| amPmLabels | { am: string; pm: string } | - | Labels used for am/pm values |
| data | string[] | required | Time data in 24h format to be displayed in the grid, for example `['10:00', '18:30', '22:00']`. Time values must be unique. |
| defaultValue | string \| null | - | Uncontrolled component default value |
| disableTime | string[] \| ((time: string) => boolean) | - | Array of time values to disable |
| disabled | boolean | - | If set, all controls are disabled |
| format | "12h" \| "24h" | - | Time format displayed in the grid |
| getControlProps | (time: string) => ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement> & DataAttributes | - | A function to pass props down to control based on the time value |
| maxTime | string | - | All controls after this time are disabled |
| minTime | string | - | All controls before this time are disabled |
| onChange | (value: string \| null) => void | - | Called when value changes |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| simpleGridProps | SimpleGridProps | - | Props passed down to the underlying `SimpleGrid` component |
| size | MantineSize | - | Control `font-size` of controls, key of `theme.fontSizes` or any valid CSS value |
| value | string \| null | - | Controlled component value |
| withSeconds | boolean | - | Determines whether the seconds part should be displayed |


#### Styles API

TimeGrid component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**TimeGrid selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-TimeGrid-root | Root element |
| control | .mantine-TimeGrid-control | Time grid control |
| simpleGrid | .mantine-TimeGrid-simpleGrid | SimpleGrid component root |

**TimeGrid CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --time-grid-fz | Controls `font-size` property of all controls |
| root | --time-grid-radius | Controls `border-radius` property of all controls |

**TimeGrid data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| control | data-active | Current component value is the same as control value | - |
| control | data-disabled | Component is disabled by one of the props: `minTime`, `maxTime`, `disableTime`, `disabled` | - |


--------------------------------------------------------------------------------

### TimeInput
Package: @mantine/dates
Import: import { TimeInput } from '@mantine/dates';
Description: Capture time from the user

## Usage

TimeInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. TimeInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { TimeInput } from '@mantine/dates';


function Demo() {
  return (
    <TimeInput
       variant="default" size="sm" radius="md" label="Input label" withAsterisk={false} description="Input description" error=""
    />
  );
}
```


## TimePicker component

The `TimeInput` component is based on the native `input[type="time"]` element and does not support
most advanced features like choosing time format or custom dropdown with time select. If you need
more features, use the [TimePicker](https://mantine.dev/llms/dates-time-picker.md) component instead.

`TimeInput` features/limitations:

* Native `input[type="time"]` element
* Native browser controls for time selection on mobile devices
* Time format depends on the user's locale
* Only native dropdown with hours/minutes/seconds, does not work in Firefox
* Mobile Safari does not provide an option to select seconds

## Controlled

```tsx
import { useState } from 'react';
import { TimeInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState('');
  return (
    <TimeInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
```

## Show browser picker

You can show the browser picker by calling the `showPicker` method of the input element.
Note that some browsers (desktop Safari) do not support this feature and the
method will do nothing.

```tsx
import { useRef } from 'react';
import { ActionIcon } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { ClockIcon } from '@phosphor-icons/react';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <ClockIcon size={16} />
    </ActionIcon>
  );

  return (
    <TimeInput label="Click icon to show browser picker" ref={ref} rightSection={pickerControl} />
  );
}
```


## With seconds

```tsx
import { TimeInput } from '@mantine/dates';

function Demo() {
  return <TimeInput withSeconds />;
}
```


## With icon

```tsx
import { ClockIcon } from '@phosphor-icons/react';
import { TimeInput } from '@mantine/dates';

function Demo() {
  return <TimeInput leftSection={<ClockIcon size={16} />} />;
}
```


## Disabled state

```tsx
import { TimeInput } from '@mantine/dates';

function Demo() {
  return <TimeInput disabled />;
}
```


## Accessibility

TimeInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

**TimeInput props**

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
| maxTime | string | - | Maximum possible string time, if `withSeconds` is true, time should be in format HH:mm:ss, otherwise HH:mm |
| minTime | string | - | Minimum possible string time, if `withSeconds` is true, time should be in format HH:mm:ss, otherwise HH:mm |
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| size | MantineSize | - | Controls input `height`, horizontal `padding`, and `font-size` |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| withSeconds | boolean | - | Determines whether seconds input should be displayed |
| wrapperProps | WrapperProps | - | Props passed down to the root element |


--------------------------------------------------------------------------------

### TimePicker
Package: @mantine/dates
Import: import { TimePicker } from '@mantine/dates';
Description: Captures time value from the user

## Usage

The `TimePicker` component is an alternative to [TimeInput](https://mantine.dev/llms/dates-time-input.md) that offers more
features. It supports 24-hour and 12-hour formats, a dropdown with hours, minutes and seconds, and
more.

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" />;
}
```


## Controlled

The `TimePicker` component value is a string in `hh:mm:ss` or `hh:mm` 24-hour format (for example `18:34:55`).
An empty string is used to represent no value. The `onChange` function is called only when the entered value is valid.
The input value is considered valid in the following cases:

* All inputs are empty. In this case, `onChange` is called with an empty string.
* All inputs are filled. For example, if the `withSeconds` prop is set and the user entered `12:34:56`, `onChange` will be called with `12:34:56`. But if the user entered `12:34`, `onChange` will not be called because the seconds value is missing.

```tsx
import { useState } from 'react';
import { TimePicker } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState('');
  return <TimePicker value={value} onChange={setValue} />;
}
```

## With seconds

Set the `withSeconds` prop to enable seconds input. Note that if this prop is used,
`onChange` is not called until all inputs are filled – it is not possible
to enter only hours and minutes.

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" withSeconds />;
}
```


## Duration type

Set `type="duration"` to allow entering durations that exceed 24 hours.
In this mode, the hours field has no upper limit and the input width adjusts
dynamically based on the entered value. The `format` prop is ignored (always 24h)
and the dropdown is disabled.

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter duration" type="duration" withSeconds />;
}
```


## Min hours digits

Use the `minHoursDigits` prop to set the minimum number of digits displayed in the hours input.
This prop is only applicable when `type="duration"` is set. By default, the minimum is `2`.

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter duration"
      type="duration"
      withSeconds
      minHoursDigits={3}
    />
  );
}
```


## 12-hour format

Set `format="12h"` to use 12-hour format. Note that `onChange` is called only when all inputs are filled,
including the am/pm input.

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" format="12h" />;
}
```


## Change am/pm labels

To change am/pm labels, use the `amPmLabels` prop. Example of changing labels to Hindi:

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker label="Enter time" format="12h" amPmLabels={{ am: 'पूर्वाह्न', pm: 'अपराह्न' }} />
  );
}
```


## Min and max values

Set the `min` and `max` props to limit the available time range:

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <>
      <TimePicker label="Enter time (24h format)" min="10:00" max="18:30" />
      <TimePicker label="Enter time (12h format)" min="10:00" max="18:30" format="12h" mt="md" />
    </>
  );
}
```


## With dropdown

Set the `withDropdown` prop to display a dropdown with hours, minutes, seconds and am/pm selects.
By default, the dropdown is visible when one of the inputs is focused.

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <>
      <TimePicker label="Enter time (24h format)" withSeconds withDropdown />
      <TimePicker label="Enter time (12h format)" withSeconds withDropdown format="12h" mt="md" />
    </>
  );
}
```


## Hours/minutes/seconds step

Use `hoursStep`, `minutesStep` and `secondsStep` props to control step for each input.
These props are used to control value by which the input is incremented or decremented when
up/down arrow keys are pressed and to generate corresponding values range in the dropdown.

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withSeconds
      withDropdown
      hoursStep={1}
      minutesStep={5}
      secondsStep={10}
    />
  );
}
```


## Control dropdown opened state

Use `popoverProps` to pass props down to the underlying [Popover](https://mantine.dev/llms/core-popover.md) component:

```tsx
import { useState } from 'react';
import { ClockIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@mantine/core';
import { TimePicker } from '@mantine/dates';

function Demo() {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [value, setValue] = useState('');

  return (
    <TimePicker
      withDropdown
      rightSection={
        <ActionIcon onClick={() => setDropdownOpened(true)} variant="default">
          <ClockIcon size={18} />
        </ActionIcon>
      }
      value={value}
      onChange={(val) => {
        setValue(val);
        if (value === '') {
          setDropdownOpened(false);
        }
      }}
      popoverProps={{
        opened: dropdownOpened,
        onChange: (_opened) => !_opened && setDropdownOpened(false),
      }}
    />
  );
}
```


## Time presets

You can define time presets with `presets` prop. Presets are displayed in the dropdown and can be selected by clicking on them.
Time values for presets should be in `hh:mm:ss` or `hh:mm` 24-hour time format. Presets
display value is generated based on `format`, `amPmLabels` and `withSeconds` props.

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      presets={['12:30', '15:45', '18:00', '20:15', '22:30']}
    />
  );
}
```


## Time presets groups

To group presets use an array of objects with `label` and `values` keys:

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      maxDropdownContentHeight={300}
      presets={[
        { label: 'Morning', values: ['06:00:00', '08:00:00', '10:00:00'] },
        { label: 'Afternoon', values: ['12:00:00', '14:00:00', '16:00:00'] },
        { label: 'Evening', values: ['18:00:00', '20:00:00', '22:00:00'] },
      ]}
    />
  );
}
```


## Time presets range

If you need to generate a range of time values, use `getTimeRange` function exported from
`@mantine/dates` package. The function accepts start, end time and interval in `hh:mm:ss` format.

```tsx
import { getTimeRange, TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      presets={getTimeRange({ startTime: '06:00:00', endTime: '18:00:00', interval: '01:30:00' })}
    />
  );
}
```


## Dropdown position

By default, the dropdown is displayed below the input if there is enough space; otherwise it is displayed above the input.
You can change this behavior by setting `position` and `middlewares` props, which are passed down to the
underlying [Popover](https://mantine.dev/llms/core-popover.md) component.

Example of dropdown that is always displayed above the input:

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      popoverProps={{
        position: 'top-start',
        middlewares: { flip: false, shift: false },
      }}
    />
  );
}
```


## Dropdown width

To change dropdown width, set `width` prop in `comboboxProps`. By default,
dropdown width is adjusted to fit all content. Example of dropdown width set
to the input width:

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      withSeconds
      format="12h"
      popoverProps={{
        width: 'target',
      }}
    />
  );
}
```


## Paste events

By default, `TimePicker` handles only time in 24-hour format (for example `17:33:43` or `19:22`) for paste events.
With `pasteSplit` prop you can create a custom paste time parser:

```tsx
import { Code, Text } from '@mantine/core';
import { TimePicker, TimePickerPasteSplit } from '@mantine/dates';

const re = /^(1[0-2]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?\\s?(AM|PM)$/;

const customPasteSplit: TimePickerPasteSplit = ({ time }) => {
  if (!re.test(time)) {
    return { hours: null, minutes: null, seconds: null, amPm: null };
  }

  const [hours, minutes, second] = time.split(':').map((part) => part.replace(/AM|PM/g, ''));
  const isPm = time.toLowerCase().includes('pm');

  return {
    hours: typeof hours === 'string' ? Number(hours) : null,
    minutes: typeof minutes === 'string' ? Number(minutes) : null,
    seconds: typeof second === 'string' ? Number(second) : 0,
    amPm: isPm ? 'PM' : 'AM',
  };
};

function Demo() {
  return (
    <div>
      <TimePicker label="Paste time here" format="12h" withSeconds pasteSplit={customPasteSplit} />
      <Text mt="md">
        Try pasting time in 12h format in any input. For example, try pasting <Code>12:34 PM</Code>{' '}
        or <Code>8:56:45 AM</Code>
      </Text>
    </div>
  );
}
```


## Clearable

Set `clearable` prop to display a clear button in the right section of the input.
The clear button is visible when at least one of the fields has value.

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" clearable defaultValue="12:34:44" />;
}
```


```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack } from '@mantine/core';
import { TimePicker } from '@mantine/dates';

function Demo() {
  return (
    <Stack>
      <TimePicker
        label="clearSectionMode='both' (default)"
        defaultValue="12:30"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <TimePicker
        label="clearSectionMode='rightSection'"
        defaultValue="12:30"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <TimePicker
        label="clearSectionMode='clear'"
        defaultValue="12:30"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
```


## Disabled

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" disabled />;
}
```


## Read only

```tsx
import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter time" defaultValue="12:45:33" readOnly />;
}
```


## Input props

TimePicker component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all div element props. TimePicker documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { TimePicker } from '@mantine/dates';


function Demo() {
  return (
    <TimePicker
      withDropdown
       variant="default" size="sm" radius="md" label="Input label" withAsterisk={false} description="Input description" error=""
    />
  );
}
```


## Get refs of inner inputs

Use `hoursRef`, `minutesRef`, `secondsRef` and `amPmRef` props to get refs of inner inputs:

```tsx
import { useRef } from 'react';
import { TimePicker } from '@mantine/dates';

function Demo() {
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const amPmRef = useRef<HTMLSelectElement>(null);

  return (
    <TimePicker
      hoursRef={hoursRef}
      minutesRef={minutesRef}
      secondsRef={secondsRef}
      amPmRef={amPmRef}
    />
  );
}
```

