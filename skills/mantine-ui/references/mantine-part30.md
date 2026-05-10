## With seconds

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return <DateTimePicker withSeconds label="Pick date and time" placeholder="Pick date and time" />;
}
```


## Presets

Use the `presets` prop to add custom date presets. Presets are displayed next to the calendar:

```tsx
import dayjs from 'dayjs';
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      label="Pick date and time"
      placeholder="Pick date and time"
      presets={[
        { value: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'), label: 'Yesterday' },
        { value: dayjs().format('YYYY-MM-DD HH:mm:ss'), label: 'Today' },
        { value: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'), label: 'Tomorrow' },
        { value: dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm:ss'), label: 'Next month' },
        { value: dayjs().add(1, 'year').format('YYYY-MM-DD HH:mm:ss'), label: 'Next year' },
        {
          value: dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
          label: 'Last month',
        },
        { value: dayjs().subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss'), label: 'Last year' },
      ]}
    />
  );
}
```


## TimePicker props

You can pass props down to the underlying [TimePicker](https://mantine.dev/llms/dates-time-picker.md) component
with the `timePickerProps` prop. Example of enabling dropdown and setting `12h` format
for the time picker:

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      label="Pick date and time"
      placeholder="Pick date and time"
      timePickerProps={{
        withDropdown: true,
        popoverProps: { withinPortal: false },
        format: '12h',
      }}
    />
  );
}
```


## Value format

Use the `valueFormat` prop to change the [dayjs format](https://day.js.org/docs/en/display/format) of the value label:

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      valueFormat="DD MMM YYYY hh:mm A"
      label="Pick date and time"
      placeholder="Pick date and time"
    />
  );
}
```


## Disabled state

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return <DateTimePicker label="Disabled" placeholder="Pick date and time" disabled />;
}
```


## Input props

DateTimePicker component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all button element props. DateTimePicker documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { DateTimePicker } from '@mantine/dates';


function Demo() {
  return (
    <DateTimePicker
       variant="default" size="sm" radius="md" label="Input label" withAsterisk={false} description="Input description" error=""
      placeholder="Input placeholder"
    />
  );
}
```


## Clearable

Set the `clearable` prop to display a clear button in the right section. Note that if you set the `rightSection`
prop, the clear button will not be displayed.

```tsx
import dayjs from 'dayjs';
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      clearable
      defaultValue={dayjs().format('YYYY-MM-DD')}
      label="Pick date and time"
      placeholder="Pick date and time"
    />
  );
}
```


```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <Stack>
      <DateTimePicker
        label="clearSectionMode='both' (default)"
        placeholder="Pick date and time"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <DateTimePicker
        label="clearSectionMode='rightSection'"
        placeholder="Pick date and time"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <DateTimePicker
        label="clearSectionMode='clear'"
        placeholder="Pick date and time"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
```


## Open picker in modal

By default, the picker is rendered inside [Popover](https://mantine.dev/llms/core-popover.md).
You can change that to [Modal](https://mantine.dev/llms/core-modal.md) by setting `dropdownType="modal"`:

```tsx
import { DateTimePicker } from '@mantine/dates';

function Demo() {
  return (
    <DateTimePicker
      dropdownType="modal"
      label="Pick date and time"
      placeholder="Pick date and time"
    />
  );
}
```


## Accessibility

DateTimePicker provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

**DateTimePicker props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ariaLabels | CalendarAriaLabels | - | `aria-label` attributes for controls on different levels |
| clearButtonProps | React.ComponentProps<"button"> | - | Props passed down to the clear button |
| clearSectionMode | ClearSectionMode | - | Determines how the clear button and rightSection are rendered |
| clearable | boolean | - | If set, clear button is displayed in the `rightSection` when the component has value. Ignored if `rightSection` prop is set. |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as `numberOfColumns` if not set explicitly |
| date | string \| Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string \| ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | `dayjs` format for decade label or a function that returns decade label based on the date value |
| defaultDate | string \| Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" \| "year" \| "decade" | - | Initial displayed level in uncontrolled mode |
| defaultTimeValue | string | - | Default time value in HH:mm` or `HH:mm:ss` format. Assigned to time when date is selected. |
| defaultValue | DateValue | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of `Input.Description` component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps | - | Props passed down to the `Input.Description` component |
| disabled | boolean | - | Sets `disabled` attribute on the `input` element |
| dropdownType | "popover" \| "modal" | - | Type of the dropdown |
| error | React.ReactNode | - | Contents of `Input.Error` component. If not set, error is not displayed. |
| errorProps | InputErrorProps | - | Props passed down to the `Input.Error` component |
| excludeDate | (date: string) => boolean | - | Callback function to determine whether the day should be disabled |
| firstDayOfWeek | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 | - | Number 0-6, where 0 – Sunday and 6 – Saturday. |
| fullWidth | boolean | - | Determines whether the calendar should take the full width of its container |
| getDayAriaLabel | (date: string) => string | - | Assigns `aria-label` to `Day` components based on date |
| getDayProps | (date: string) => Omit<Partial<DayProps>, "vars" \| "classNames" \| "styles"> & DataAttributes | - | Passes props down to `Day` components |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| headerControlsOrder | ("next" \| "previous" \| "level")[] | - | Controls order |
| hideOutsideDates | boolean | - | Determines whether outside dates should be hidden |
| hideWeekdays | boolean | - | Determines whether weekdays row should be hidden |
| highlightToday | boolean | - | Determines whether today should be highlighted with a border |
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
| level | "month" \| "year" \| "decade" | - | Current displayed level displayed in controlled mode |
| loading | boolean | - | Displays loading indicator in the left or right section |
| loadingPosition | "left" \| "right" | - | Position of the loading indicator |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string \| Date | - | Maximum possible date in `YYYY-MM-DD` format or Date object |
| maxLevel | "month" \| "year" \| "decade" | - | Max level that user can go up to |
| minDate | string \| Date | - | Minimum possible date in `YYYY-MM-DD` format or Date object |
| modalProps | Partial<Omit<ModalProps, "children">> | - | Props passed down to `Modal` component |
| monthLabelFormat | string \| ((date: string) => string) | - | dayjs label format to display month label or a function that returns month label based on month value |
| monthsListFormat | string | - | `dayjs` format for months list |
| nextIcon | React.ReactNode | - | Change next icon |
| nextLabel | string | - | Next button `aria-label` |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: string \| null) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onDropdownClose | () => void | - | Called when the dropdown is closed |
| onLevelChange | (level: CalendarLevel) => void | - | Called when level changes |
| onMonthSelect | (date: string) => void | - | Called when user selects month |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextMonth | (date: string) => void | - | Called when the next month button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousMonth | (date: string) => void | - | Called when the previous month button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| onYearSelect | (date: string) => void | - | Called when user selects year |
| placeholder | string | - | Input placeholder |
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| popoverProps | Partial<Omit<PopoverProps, "children">> | - | Props passed down to `Popover` component |
| presets | DatePickerPreset<"default">[] | - | Presets values |
| previousIcon | React.ReactNode | - | Change previous icon |
| previousLabel | string | - | Previous button `aria-label` |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| readOnly | boolean | - | If set, the component value cannot be changed by the user |
| renderDay | (date: string) => React.ReactNode | - | Controls day value rendering |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| size | MantineSize | - | Component size |
| sortDates | boolean | - | Determines whether dates values should be sorted before `onChange` call, only applicable with type="multiple" |
| submitButtonProps | ActionIconProps & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement> | - | Props passed down to the submit button |
| timePickerProps | Omit<TimePickerProps, "value" \| "defaultValue"> | - | Props passed down to `TimePicker` component |
| value | DateValue | - | Controlled component value |
| valueFormat | string | - | `dayjs` format for input value |
| weekdayFormat | string \| ((date: string) => string) | - | `dayjs` format for weekdays names |
| weekendDays | (0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6)[] | - | Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday. The default value is defined by `DatesProvider`. |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| withSeconds | boolean | - | Determines whether the seconds input should be displayed |
| withWeekNumbers | boolean | - | Determines whether week numbers should be displayed |
| wrapperProps | WrapperProps | - | Props passed down to the root element |
| yearLabelFormat | string \| ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

DateTimePicker component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**DateTimePicker selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-DateTimePicker-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-DateTimePicker-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-DateTimePicker-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-DateTimePicker-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-DateTimePicker-levelsGroup | Group of months levels |
| yearsList | .mantine-DateTimePicker-yearsList | Years list table element |
| yearsListRow | .mantine-DateTimePicker-yearsListRow | Years list row element |
| yearsListCell | .mantine-DateTimePicker-yearsListCell | Years list cell element |
| yearsListControl | .mantine-DateTimePicker-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-DateTimePicker-monthsList | Months list table element |
| monthsListRow | .mantine-DateTimePicker-monthsListRow | Months list row element |
| monthsListCell | .mantine-DateTimePicker-monthsListCell | Months list cell element |
| monthsListControl | .mantine-DateTimePicker-monthsListControl | Button used to pick months and years |
| monthThead | .mantine-DateTimePicker-monthThead | thead element of month table |
| monthRow | .mantine-DateTimePicker-monthRow | tr element of month table |
| monthTbody | .mantine-DateTimePicker-monthTbody | tbody element of month table |
| monthCell | .mantine-DateTimePicker-monthCell | td element of month table |
| month | .mantine-DateTimePicker-month | Month table element |
| weekdaysRow | .mantine-DateTimePicker-weekdaysRow | Weekdays tr element |
| weekday | .mantine-DateTimePicker-weekday | Weekday th element |
| day | .mantine-DateTimePicker-day | Month day control |
| weekNumber | .mantine-DateTimePicker-weekNumber | Week number td element |
| datePickerRoot | .mantine-DateTimePicker-datePickerRoot | Date picker root element, contains calendar and presets |
| presetsList | .mantine-DateTimePicker-presetsList | Presets wrapper element |
| presetButton | .mantine-DateTimePicker-presetButton | Preset button |
| placeholder | .mantine-DateTimePicker-placeholder | Placeholder element |
| timeWrapper | .mantine-DateTimePicker-timeWrapper | Wrapper around time input and submit button |
| timeInput | .mantine-DateTimePicker-timeInput | TimeInput |
| submitButton | .mantine-DateTimePicker-submitButton | Submit button |


--------------------------------------------------------------------------------

### GettingStartedDates
Package: @mantine/dates
Import: import { GettingStartedDates } from '@mantine/dates';

## Installation

```bash
yarn add @mantine/dates dayjs
```

```bash
npm install @mantine/dates dayjs
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import dates styles after core package styles
import '@mantine/dates/styles.css';
```

## Do not forget to import styles

Followed the installation instructions above but something is not working
(calendars and date pickers have no styles and look broken)?
You've fallen into the trap of not importing dates styles!
To fix this issue, import dates styles at the root of your application:

```tsx
import '@mantine/dates/styles.css';
```

## Usage

After installing the `@mantine/dates` package and importing styles, you can use all components from it:



## dayjs

`@mantine/dates` components use [dayjs](https://day.js.org/) under the hood for date manipulations and formatting.
dayjs is a required dependency – you cannot change it to another date library. If you want to use a different
date library in your application, you will need to install it separately.

## DatesProvider

The `DatesProvider` component lets you set various settings that are shared across all
components exported from the `@mantine/dates` package. `DatesProvider` supports the following settings:

* `locale` – dayjs locale. Note that you also need to import the corresponding locale module from dayjs. The default value is `en`.
* `firstDayOfWeek` – a number from 0 to 6, where 0 is Sunday and 6 is Saturday. The default value is 1 – Monday.
* `weekendDays` – an array of numbers from 0 to 6, where 0 is Sunday and 6 is Saturday. The default value is `[0, 6]` – Saturday and Sunday.
* `consistentWeeks` – boolean. If `true`, every month will have 6 weeks. The default value is `false`.

```tsx
import 'dayjs/locale/ru';
import { DatesProvider, MonthPickerInput, DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0] }}>
      <MonthPickerInput label="Pick month" placeholder="Pick month" />
      <DatePickerInput mt="md" label="Pick date" placeholder="Pick date" />
    </DatesProvider>
  );
}
```


## Consistent weeks

If you want to avoid layout shifts, set `consistentWeeks: true` in the `DatesProvider` settings.
This will ensure that every month has 6 weeks, even if outside days are not in the same month.

```tsx
import { DatePicker, DatesProvider } from '@mantine/dates';

function Demo() {
  return (
    <DatesProvider settings={{ consistentWeeks: true }}>
      <DatePicker />
    </DatesProvider>
  );
}
```


## Custom parse format

Some components like [DateInput](https://mantine.dev/llms/dates-date-input.md) require the [custom parse format](https://day.js.org/docs/en/plugin/custom-parse-format)
dayjs plugin. You need to extend dayjs with this plugin before using components that require it. Note that
this is usually done once in your application root file, so you don't need to do it every time you use the component.

```tsx
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
```

## Localization and server components

To add localization, you must import `import 'dayjs/locale/x';` in your application (`x` is the locale name)
and set `locale` either on `DatesProvider` or on each component individually.

Example of setting the locale on DatesProvider:

```tsx
import 'dayjs/locale/ru';

import { DatesProvider } from '@mantine/dates';

function Demo() {
  return (
    <DatesProvider settings={{ locale: 'ru' }}>
      {/* Your app  */}
    </DatesProvider>
  );
}
```

The code above works in all environments, except Next.js app router.
If you are using Next.js app router, you must add `'use client';` to the
top of the file where you are importing `dayjs/locale/x` – locale data
is required both on client and server.

```tsx
'use client';

import 'dayjs/locale/ru';

import { DatesProvider } from '@mantine/dates';

function Demo() {
  return (
    <DatesProvider settings={{ locale: 'ru' }}>
      {/* Your app  */}
    </DatesProvider>
  );
}
```


--------------------------------------------------------------------------------

### MiniCalendar
Package: @mantine/dates
Import: import { MiniCalendar } from '@mantine/dates';
Description: Compact calendar to display a small number of days in a row

## Usage

```tsx
import { useState } from 'react';
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  const [value, onChange] = useState<string | null>('2025-04-15');
  return <MiniCalendar value={value} onChange={onChange} numberOfDays={6} />;
}
```


## Number of days

Use `numberOfDays` prop to control how many days are displayed at once.
The default value is `7`.

```tsx
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  return <MiniCalendar numberOfDays={5} />;
}
```


## getDayProps

Use `getDayProps` to add custom props to days, for example, assign styles to weekends:

```tsx
import dayjs from 'dayjs';
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  return (
    <MiniCalendar
      numberOfDays={6}
      getDayProps={(date) => ({
        style: {
          color: [0, 6].includes(dayjs(date).day()) ? 'var(--mantine-color-red-8)' : undefined,
        },
      })}
    />
  );
}
```


## Min and max dates

Use `minDate` and `maxDate` props to limit date selection:

```tsx
import { useState } from 'react';
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  const [value, onChange] = useState<string | null>('2025-04-15');
  return (
    <MiniCalendar
      value={value}
      onChange={onChange}
      numberOfDays={6}
      defaultDate="2025-04-13"
      minDate="2025-04-14"
      maxDate="2025-04-24"
    />
  );
}
```


## Localization

You can change localization both on component level with `locale` prop and
globally with [DatesProvider](https://mantine.dev/llms/dates-getting-started.md).

```tsx
import 'dayjs/locale/ru';
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  return <MiniCalendar defaultDate="2025-04-15" locale="ru" numberOfDays={6} />;
}
```


## Accessibility

Use `nextControlProps` and `previousControlProps` to add `aria-label` and other props to navigation buttons:

```tsx
import { MiniCalendar } from '@mantine/dates';

function Demo() {
  return (
    <MiniCalendar
      nextControlProps={{ 'aria-label': 'Next range' }}
      previousControlProps={{ 'aria-label': 'Previous range' }}
    />
  );
}
```


#### Props

**MiniCalendar props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| date | string \| Date | - | Controlled component date value, start date of the interval |
| defaultDate | string \| Date | - | Uncontrolled component default value, start date of the interval |
| getDayProps | (date: string) => Record<string, any> | - | Props passed down to the day component |
| locale | string | - | dayjs locale used for formatting |
| maxDate | string \| Date | - | Maximum date that can be selected, date object or date string in `YYYY-MM-DD` format |
| minDate | string \| Date | - | Minimum date that can be selected, date object or date string in `YYYY-MM-DD` format |
| monthLabelFormat | string | - | Dayjs format string for month label |
| nextControlProps | React.ComponentProps<'button'> | - | Props passed to next control button |
| numberOfDays | number | - | Number of days to display in the calendar |
| onChange | (date: string) => void | - | Called with date in `YYYY-MM-DD` format when date changes |
| onDateChange | (date: string) => void | - | Called with date in `YYYY-MM-DD` format when date internal changes |
| onNext | () => void | - | Called when the next button is clicked |
| onPrevious | () => void | - | Called when the previous button is clicked |
| previousControlProps | React.ComponentProps<'button'> | - | Props passed to previous control button |
| size | MantineSize | - | Component size |
| value | string \| Date \| null | - | Selected date, controlled value |


#### Styles API

MiniCalendar component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**MiniCalendar selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-MiniCalendar-root | Root element |
| control | .mantine-MiniCalendar-control | Button in the dropdown which is used to select hours/minutes/seconds/am-pm |
| days | .mantine-MiniCalendar-days | Days container |
| day | .mantine-MiniCalendar-day | Single day element |
| dayMonth | .mantine-MiniCalendar-dayMonth | Day element in month view |
| dayNumber | .mantine-MiniCalendar-dayNumber | Day number element |

**MiniCalendar CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --mini-calendar-font-size | Controls size of all elements (based on em units) |

**MiniCalendar data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| control | disabled | Next/previous range is after `maxDate` or before `minDate` | - |
| control | direction | - | `previous` or `next` |
| day | selected | The day matches the `value` | - |
| day | disabled | The day is before `minDate` or after `maxDate` | - |


--------------------------------------------------------------------------------

### MonthPickerInput
Package: @mantine/dates
Import: import { MonthPickerInput } from '@mantine/dates';
Description: Month, multiple months and months range picker input

## MonthPicker props

`MonthPickerInput` supports most of the [MonthPicker](https://mantine.dev/llms/dates-month-picker.md) props.
Read through the [MonthPicker](https://mantine.dev/llms/dates-month-picker.md) documentation to learn about all component features that are not listed on this page.

## Usage



## Multiple dates

Set `type="multiple"` to allow users to pick multiple dates:



## Dates range

Set `type="range"` to allow users to pick a date range:



## Presets

Use the `presets` prop to add custom month presets. Presets are displayed next to the calendar:

```tsx
import dayjs from 'dayjs';
import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  return (
    <MonthPickerInput
      label="With presets"
      placeholder="Select month"
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
import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  const today = dayjs();

  return (
    <MonthPickerInput
      type="range"
      label="With presets"
      placeholder="Select months range"
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


## Open picker in modal

By default, [MonthPicker](https://mantine.dev/llms/dates-month-picker.md) is rendered inside [Popover](https://mantine.dev/llms/core-popover.md).
You can change that to [Modal](https://mantine.dev/llms/core-modal.md) by setting `dropdownType="modal"`:



## Value format

Use the `valueFormat` prop to change the [dayjs format](https://day.js.org/docs/en/display/format) of the value label:

```tsx
import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  return (
    <MonthPickerInput
      valueFormat="YYYY MMM"
      type="multiple"
      label="Pick month"
      placeholder="Pick month"
    />
  );
}
```


## Value formatter

`valueFormatter` is a more powerful alternative to the `valueFormat` prop.
It allows formatting the value label with a custom function.
The function is the same for all component types (`default`, `multiple` and `range`)
– you need to perform additional checks inside the function to handle different types.

Example of using a custom formatter function with `type="multiple"`:



## Clearable

Set the `clearable` prop to display a clear button in the right section. Note that if you set the `rightSection`
prop, the clear button will not be displayed.



```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  return (
    <Stack>
      <MonthPickerInput
        label="clearSectionMode='both' (default)"
        placeholder="Pick month"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <MonthPickerInput
        label="clearSectionMode='rightSection'"
        placeholder="Pick month"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <MonthPickerInput
        label="clearSectionMode='clear'"
        placeholder="Pick month"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
```


## Disabled state

```tsx
import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  return (
    <MonthPickerInput
      valueFormat="YYYY MMM"
      type="multiple"
      label="Disabled"
      placeholder="Pick month"
      disabled
    />
  );
}
```


## Min and max dates

`minDate` and `maxDate` props define the minimum and maximum dates that can be picked.
You can specify `minDate` and `maxDate` as `Date` objects:

```tsx
import { useState } from 'react';
import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      label="Pick month"
      placeholder="Pick month"
      value={value}
      onChange={setValue}
      minDate={new Date(2022, 1)}
      maxDate={new Date(2022, 8)}
    />
  );
}
```


## Control props

`getYearControlProps` and `getMonthControlProps` props allow passing props to the control component based on the date.
It is useful for disabling specific dates or customising styles/className.

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthPickerInput, MonthPickerInputProps } from '@mantine/dates';

const getYearControlProps: MonthPickerInputProps['getYearControlProps'] = (date) => {
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

const getMonthControlProps: MonthPickerInputProps['getMonthControlProps'] = (date) => {
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
    <MonthPickerInput
      label="Pick month"
      placeholder="Pick month"
      value={value}
      onChange={setValue}
      getYearControlProps={getYearControlProps}
      getMonthControlProps={getMonthControlProps}
    />
  );
}
```


## Label format

`decadeLabelFormat` and `yearLabelFormat` props allow changing the format of the label in the header.
The props accept a [dayjs format string](https://day.js.org/docs/en/display/format).

```tsx
import { useState } from 'react';
import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      decadeLabelFormat="YY"
      yearLabelFormat="YYYY [year]"
      label="Pick month"
      placeholder="Pick month"
      value={value}
      onChange={setValue}
    />
  );
}
```


## List format

`monthsListFormat` and `yearsListFormat` props allow changing the format of the month and year labels in the list.
The props accept a [dayjs format string](https://day.js.org/docs/en/display/format).

```tsx
import { useState } from 'react';
import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      monthsListFormat="MM"
      yearsListFormat="YY"
      label="Pick month"
      placeholder="Pick month"
      value={value}
      onChange={setValue}
    />
  );
}
```


## Max level

`maxLevel` prop allows to set the maximum level that can be reached by clicking on the label in the header.

```tsx
import { useState } from 'react';
import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      maxLevel="year"
      label="Pick month"
      placeholder="Pick month"
      value={value}
      onChange={setValue}
    />
  );
}
```


## Input props

MonthPickerInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all button element props. MonthPickerInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.



## With icon



## Accessibility

MonthPickerInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

**MonthPickerInput props**

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

MonthPickerInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**MonthPickerInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-MonthPickerInput-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-MonthPickerInput-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-MonthPickerInput-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-MonthPickerInput-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-MonthPickerInput-levelsGroup | Group of years levels |
| yearsList | .mantine-MonthPickerInput-yearsList | Years list table element |
| yearsListRow | .mantine-MonthPickerInput-yearsListRow | Years list row element |
| yearsListCell | .mantine-MonthPickerInput-yearsListCell | Years list cell element |
| yearsListControl | .mantine-MonthPickerInput-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-MonthPickerInput-monthsList | Months list table element |
| monthsListRow | .mantine-MonthPickerInput-monthsListRow | Months list row element |
| monthsListCell | .mantine-MonthPickerInput-monthsListCell | Months list cell element |
| monthsListControl | .mantine-MonthPickerInput-monthsListControl | Button used to pick months and years |
| monthPickerRoot | .mantine-MonthPickerInput-monthPickerRoot | Month picker root element, contains calendar and presets |
| presetsList | .mantine-MonthPickerInput-presetsList | Presets wrapper element |
| presetButton | .mantine-MonthPickerInput-presetButton | Preset button |
| placeholder | .mantine-MonthPickerInput-placeholder | Placeholder element |


--------------------------------------------------------------------------------

### MonthPicker
Package: @mantine/dates
Import: import { MonthPicker } from '@mantine/dates';
Description: Inline month, multiple months and months range picker

## Usage



## Allow deselect

Set `allowDeselect` to allow users to deselect the currently selected date by clicking on it.
`allowDeselect` is disregarded when the `type` prop is `range` or `multiple`. When a date is
deselected, `onChange` is called with `null`.



## Multiple dates

Set `type="multiple"` to allow users to pick multiple dates:



## Dates range

Set `type="range"` to allow users to pick a date range:



## Single date in range

By default, it is not allowed to select a single date as a range – when the user clicks the same date a second time, it is deselected.
To change this behavior, set the `allowSingleDateInRange` prop. `allowSingleDateInRange` is ignored when the
`type` prop is not `range`.



