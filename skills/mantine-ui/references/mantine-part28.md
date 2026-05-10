## Custom date pickers

Use `Calendar` as a base for custom date pickers. For example, you can create a date picker
that allows users to pick three or fewer dates:

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar } from '@mantine/dates';

function Demo() {
  const [selected, setSelected] = useState<string[]>([]);
  const handleSelect = (date: string) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, 'date'));
    if (isSelected) {
      setSelected((current) => current.filter((d) => !dayjs(d).isSame(date, 'date')));
    } else if (selected.length < 3) {
      setSelected((current) => [...current, date]);
    }
  };

  return (
    <Calendar
      getDayProps={(date) => ({
        selected: selected.some((s) => dayjs(date).isSame(s, 'date')),
        onClick: () => handleSelect(date),
      })}
    />
  );
}
```


Another custom date picker example – week picker:

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar } from '@mantine/dates';

function getDay(date: string) {
  const day = dayjs(date).day();
  return day === 0 ? 6 : day - 1;
}

function startOfWeek(date: string) {
  return dayjs(date)
    .subtract(getDay(date) + 1, 'day')
    .toDate();
}

function endOfWeek(date: string) {
  return dayjs(date)
    .add(6 - getDay(date), 'day')
    .endOf('day')
    .toDate();
}

function isInWeekRange(date: string, value: string | null) {
  return value
    ? dayjs(date).isBefore(endOfWeek(value)) && dayjs(date).isAfter(startOfWeek(value))
    : false;
}

function Demo() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  return (
    <Calendar
      withCellSpacing={false}
      getDayProps={(date) => {
        const isHovered = isInWeekRange(date, hovered);
        const isSelected = isInWeekRange(date, value);
        const isInRange = isHovered || isSelected;
        return {
          onMouseEnter: () => setHovered(date),
          onMouseLeave: () => setHovered(null),
          inRange: isInRange,
          firstInRange: isInRange && new Date(date).getDay() === 1,
          lastInRange: isInRange && new Date(date).getDay() === 0,
          selected: isSelected,
          onClick: () => setValue(date),
        };
      }}
    />
  );
}
```


## Full width

Set the `fullWidth` prop to make the calendar stretch to fill 100% of its parent container width:

```tsx
import { Calendar } from '@mantine/dates';

function Demo() {
  return <Calendar fullWidth />;
}
```


## Static prop

Set the `static` prop to display a calendar that users cannot interact with.
This is useful when you want to display data in a calendar view but do
not want it to be interactive.

```tsx
import dayjs from 'dayjs';
import { Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';

function Demo() {
  return (
    <Calendar
      static
      renderDay={(date) => {
        const day = dayjs(date).date();
        return (
          <Indicator size={6} color="red" offset={-2} disabled={day !== 16}>
            <div>{day}</div>
          </Indicator>
        );
      }}
    />
  );
}
```



#### Props

**Calendar props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ariaLabels | CalendarAriaLabels | - | `aria-label` attributes for controls on different levels |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as `numberOfColumns` if not set explicitly |
| date | string \| Date | - | Displayed date in controlled mode |
| decadeLabelFormat | string \| ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | `dayjs` format for decade label or a function that returns decade label based on the date value |
| defaultDate | string \| Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" \| "year" \| "decade" | - | Initial displayed level in uncontrolled mode |
| enableKeyboardNavigation | boolean | - | Enable enhanced keyboard navigation (Ctrl/Cmd + Arrow keys for year navigation, Ctrl/Cmd + Shift + Arrow keys for decade navigation, Y key to open year view) |
| excludeDate | (date: string) => boolean | - | Callback function to determine whether the day should be disabled |
| firstDayOfWeek | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 | - | Number 0-6, where 0 – Sunday and 6 – Saturday. |
| fullWidth | boolean | - | Determines whether the list should take the full width of its container |
| getDayAriaLabel | (date: string) => string | - | Assigns `aria-label` to `Day` components based on date |
| getDayProps | (date: string) => Omit<Partial<DayProps>, "vars" \| "classNames" \| "styles"> & DataAttributes | - | Passes props down to `Day` components |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| headerControlsOrder | ("next" \| "previous" \| "level")[] | - | Controls order |
| hideOutsideDates | boolean | - | Determines whether outside dates should be hidden |
| hideWeekdays | boolean | - | Determines whether weekdays row should be hidden |
| highlightToday | boolean | - | Determines whether today should be highlighted with a border |
| level | "month" \| "year" \| "decade" | - | Current displayed level displayed in controlled mode |
| locale | string | - | Dayjs locale, defaults to value defined in DatesProvider |
| maxDate | string \| Date | - | Maximum possible date in `YYYY-MM-DD` format or Date object |
| maxLevel | "month" \| "year" \| "decade" | - | Max level that user can go up to (decade, year, month) |
| minDate | string \| Date | - | Minimum possible date in `YYYY-MM-DD` format or Date object |
| minLevel | "month" \| "year" \| "decade" | - | Min level that user can go down to (decade, year, month) |
| monthLabelFormat | string \| ((date: string) => string) | - | dayjs label format to display month label or a function that returns month label based on month value |
| monthsListFormat | string | - | `dayjs` format for months list |
| nextIcon | React.ReactNode | - | Change next icon |
| nextLabel | string | - | Next button `aria-label` |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onDateChange | (date: string) => void | - | Called when date changes |
| onLevelChange | (level: CalendarLevel) => void | - | Called when level changes |
| onMonthMouseEnter | (event: MouseEvent<HTMLButtonElement, MouseEvent>, date: string) => void | - | Called when mouse enters month control |
| onMonthSelect | (date: string) => void | - | Called when user selects month |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextMonth | (date: string) => void | - | Called when the next month button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousMonth | (date: string) => void | - | Called when the previous month button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| onYearMouseEnter | (event: MouseEvent<HTMLButtonElement, MouseEvent>, date: string) => void | - | Called when mouse enters year control |
| onYearSelect | (date: string) => void | - | Called when user selects year |
| previousIcon | React.ReactNode | - | Change previous icon |
| previousLabel | string | - | Previous button `aria-label` |
| renderDay | (date: string) => React.ReactNode | - | Controls day value rendering |
| size | MantineSize | - | Component size |
| static | boolean | - | Determines whether days should be static, static days can be used to display month if it is not expected that user will interact with the component in any way |
| weekdayFormat | string \| ((date: string) => string) | - | `dayjs` format for weekdays names |
| weekendDays | (0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6)[] | - | Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday. The default value is defined by `DatesProvider`. |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| withWeekNumbers | boolean | - | Determines whether week numbers should be displayed |
| yearLabelFormat | string \| ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |

**Calendar.Header props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| fullWidth | boolean | - | Determines whether the header should take the full width of its container |
| hasNextLevel | boolean | - | Determines whether next level button should be enabled |
| headerControlsOrder | ("next" \| "previous" \| "level")[] | - | Controls order |
| label | React.ReactNode | required | Label displayed between next and previous buttons |
| levelControlAriaLabel | string | - | Level control `aria-label` |
| nextDisabled | boolean | - | Disables next control |
| nextIcon | React.ReactNode | - | Change next icon |
| nextLabel | string | - | Next button `aria-label` |
| onLevelClick | () => void | - | Called when the level button is clicked |
| onNext | () => void | - | Called when the next button is clicked |
| onPrevious | () => void | - | Called when the previous button is clicked |
| previousDisabled | boolean | - | Disables previous control |
| previousIcon | React.ReactNode | - | Change previous icon |
| previousLabel | string | - | Previous button `aria-label` |
| size | MantineSize | - | Component size |
| withNext | boolean | - | Determines whether next control should be rendered |
| withPrevious | boolean | - | Determines whether previous control should be rendered |


#### Styles API

Calendar component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Calendar selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-Calendar-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-Calendar-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-Calendar-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-Calendar-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-Calendar-levelsGroup | Group of months levels |
| yearsList | .mantine-Calendar-yearsList | Years list table element |
| yearsListRow | .mantine-Calendar-yearsListRow | Years list row element |
| yearsListCell | .mantine-Calendar-yearsListCell | Years list cell element |
| yearsListControl | .mantine-Calendar-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-Calendar-monthsList | Months list table element |
| monthsListRow | .mantine-Calendar-monthsListRow | Months list row element |
| monthsListCell | .mantine-Calendar-monthsListCell | Months list cell element |
| monthsListControl | .mantine-Calendar-monthsListControl | Button used to pick months and years |
| monthThead | .mantine-Calendar-monthThead | thead element of month table |
| monthRow | .mantine-Calendar-monthRow | tr element of month table |
| monthTbody | .mantine-Calendar-monthTbody | tbody element of month table |
| monthCell | .mantine-Calendar-monthCell | td element of month table |
| month | .mantine-Calendar-month | Month table element |
| weekdaysRow | .mantine-Calendar-weekdaysRow | Weekdays tr element |
| weekday | .mantine-Calendar-weekday | Weekday th element |
| day | .mantine-Calendar-day | Month day control |
| weekNumber | .mantine-Calendar-weekNumber | Week number td element |

**Calendarheader selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-Calendarheader-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-Calendarheader-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-Calendarheader-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-Calendarheader-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |

**Calendarheader CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| calendarHeader | --dch-control-size | Controls size of the previous/next and level controls |
| calendarHeader | --dch-fz | Controls font-size of the previous/next and level controls |

**Calendarheader data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| calendarHeaderControl | data-direction | - | `"previous"` or `"next"` depending on the control type |
| calendarHeaderControl | data-disabled | Control is disabled for any reason | - |


--------------------------------------------------------------------------------

### DateInput
Package: @mantine/dates
Import: import { DateInput } from '@mantine/dates';
Description: Free form date input

## DatePicker props

`DateInput` supports most of the [DatePicker](https://mantine.dev/llms/dates-date-picker.md) props.
Read through the [DatePicker](https://mantine.dev/llms/dates-date-picker.md) documentation to learn about all component features that are not listed on this page.

## Usage

```tsx
import { useState } from 'react';
import { DateInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DateInput
      value={value}
      onChange={setValue}
      label="Date input"
      placeholder="Date input"
    />
  );
}
```


## Value format

Use the `valueFormat` prop to change the [dayjs format](https://day.js.org/docs/en/display/format) of the value label.
To use some custom formats, you need to enable the [custom parse format](https://day.js.org/docs/en/plugin/custom-parse-format) plugin:

```tsx
// Do this once in your application root file
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
```

Example of using DateInput with a custom format:

```tsx
import { DateInput } from '@mantine/dates';

function Demo() {
  return <DateInput valueFormat="YYYY MMM DD" label="Date input" placeholder="Date input" />;
}
```


## With time

If your `valueFormat` includes time (for example, `YYYY-MM-DD HH:mm`), set the `withTime` prop
to preserve the time part of the value. Without `withTime`, the time portion is discarded and
always defaults to `00:00`. When using `withTime`, you will also need to provide a custom `dateParser`
that returns a date-time string:

```tsx
import { useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DateInput, DateInputProps, DateStringValue } from '@mantine/dates';

// It is required to extend dayjs with customParseFormat plugin
// in order to parse dates with custom format
dayjs.extend(customParseFormat);

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (!input) {
    return null;
  }
  const parsed = dayjs(input, 'YYYY-MM-DD HH:mm', true);
  return parsed.isValid() ? parsed.format('YYYY-MM-DD HH:mm:ss') : null;
};

function Demo() {
  const [value, setValue] = useState<DateStringValue | null>(null);
  return (
    <DateInput
      withTime
      valueFormat="YYYY-MM-DD HH:mm"
      dateParser={dateParser}
      value={value}
      onChange={setValue}
      label="Date and time input"
      placeholder="Date and time input"
    />
  );
}
```


## Date parser

Use the `dateParser` prop to replace the default date parser. The parser function accepts user input (string)
and must return a `Date` object:

```tsx
import dayjs from 'dayjs';
import { DateInput, DateInputProps } from '@mantine/dates';

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (input === 'WW2') {
    return '1939-09-01';
  }

  return dayjs(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

function Demo() {
  return (
    <DateInput
      dateParser={dateParser}
      valueFormat="DD/MM/YYYY"
      label="Type WW2"
      placeholder="Type WW2"
    />
  );
}
```


## Allow clear

Set the `clearable` prop to allow removing the value from the input. The input will be cleared if the
user selects the same date in the dropdown or clears the input value:

```tsx
import dayjs from 'dayjs';
import { DateInput } from '@mantine/dates';

function Demo() {
  return (
    <DateInput
      clearable
      defaultValue={dayjs().format('YYYY-MM-DD')}
      label="Date input"
      placeholder="Date input"
    />
  );
}
```


```tsx
import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack } from '@mantine/core';
import { DateInput } from '@mantine/dates';

function Demo() {
  return (
    <Stack>
      <DateInput
        label="clearSectionMode='both' (default)"
        placeholder="Pick date"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <DateInput
        label="clearSectionMode='rightSection'"
        placeholder="Pick date"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <DateInput
        label="clearSectionMode='clear'"
        placeholder="Pick date"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
```


## Min and max date

Set the `minDate` and `maxDate` props to define minimum and maximum dates. If a date that is after `maxDate`
or before `minDate` is entered, it will be considered invalid and the input value will be reverted
to the last known valid date value.

```tsx
import dayjs from 'dayjs';
import { DateInput } from '@mantine/dates';

function Demo() {
  return (
    <DateInput
      minDate={dayjs().format('YYYY-MM-DD')}
      maxDate={dayjs().add(1, 'month').format('YYYY-MM-DD')}
      label="Date input"
      placeholder="Date input"
    />
  );
}
```


## Disabled state

```tsx
import { DateInput } from '@mantine/dates';

function Demo() {
  return <DateInput label="Disabled" placeholder="Date input" disabled />;
}
```


## Input props

DateInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all input element props. DateInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.

```tsx
import { DateInput } from '@mantine/dates';


function Demo() {
  return (
    <DateInput
       variant="default" size="sm" radius="md" label="Input label" withAsterisk={false} description="Input description" error=""
      placeholder="Input placeholder"
    />
  );
}
```


## Accessibility

DateInput provides better accessibility support when used in forms. Make sure to associate the input with a label for better screen reader support.


#### Props

**DateInput props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDeselect | boolean | - | If set, the value can be deselected by deleting everything from the input or by clicking the selected date in the dropdown. By default, `true` if `clearable` prop is set, `false` otherwise. |
| ariaLabels | CalendarAriaLabels | - | `aria-label` attributes for controls on different levels |
| clearButtonProps | React.ComponentProps<"button"> | - | Props passed down to the clear button |
| clearSectionMode | ClearSectionMode | - | Determines how the clear button and rightSection are rendered |
| clearable | boolean | - | If set, clear button is displayed in the `rightSection` when the component has value. Ignored if `rightSection` prop is set. |
| columnsToScroll | number | - | Number of columns to scroll with next/prev buttons, same as `numberOfColumns` if not set explicitly |
| date | string \| Date | - | Displayed date in controlled mode |
| dateParser | (value: string) => string \| Date \| null | - | A function to parse user input and convert it to date string value |
| decadeLabelFormat | string \| ((startOfDecade: string, endOfDecade: string) => ReactNode) | - | `dayjs` format for decade label or a function that returns decade label based on the date value |
| defaultDate | string \| Date | - | Initial displayed date in uncontrolled mode |
| defaultLevel | "month" \| "year" \| "decade" | - | Initial displayed level (uncontrolled) |
| defaultValue | DateValue | - | Uncontrolled component default value |
| description | React.ReactNode | - | Contents of `Input.Description` component. If not set, description is not displayed. |
| descriptionProps | InputDescriptionProps | - | Props passed down to the `Input.Description` component |
| disabled | boolean | - | Sets `disabled` attribute on the `input` element |
| error | React.ReactNode | - | Contents of `Input.Error` component. If not set, error is not displayed. |
| errorProps | InputErrorProps | - | Props passed down to the `Input.Error` component |
| excludeDate | (date: string) => boolean | - | Callback function to determine whether the day should be disabled |
| firstDayOfWeek | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 | - | Number 0-6, where 0 – Sunday and 6 – Saturday. |
| fixOnBlur | boolean | - | If set to `false`, invalid user input is preserved and is not corrected on blur |
| fullWidth | boolean | - | Determines whether the calendar should take the full width of its container |
| getDayAriaLabel | (date: string) => string | - | Assigns `aria-label` to `Day` components based on date |
| getDayProps | (date: string) => Omit<Partial<DayProps>, "vars" \| "classNames" \| "styles"> & DataAttributes | - | Passes props down to `Day` components |
| getMonthControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down month picker control |
| getYearControlProps | (date: string) => Partial<PickerControlProps> & DataAttributes | - | Passes props down to year picker control based on date |
| hasNextLevel | boolean | - | Determines whether next level button should be enabled |
| headerControlsOrder | ("next" \| "previous" \| "level")[] | - | Controls order |
| hideOutsideDates | boolean | - | Determines whether outside dates should be hidden |
| hideWeekdays | boolean | - | Determines whether weekdays row should be hidden |
| highlightToday | boolean | - | Determines whether today should be highlighted with a border |
| inputContainer | (children: ReactNode) => ReactNode | - | Render function to wrap the input element. Useful for adding tooltips, popovers, or other wrappers around the input. |
| inputSize | string | - | HTML `size` attribute for the input element (number of visible characters) |
| inputWrapperOrder | ("input" \| "label" \| "description" \| "error")[] | - | Controls order and visibility of wrapper elements. Only elements included in this array will be rendered. |
| label | React.ReactNode | - | Contents of `Input.Label` component. If not set, label is not displayed. |
| labelProps | InputLabelProps | - | Props passed down to the `Input.Label` component |
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
| monthLabelFormat | string \| ((date: string) => string) | - | dayjs label format to display month label or a function that returns month label based on month value |
| monthsListFormat | string | - | `dayjs` format for months list |
| nextDisabled | boolean | - | Disables next control |
| nextIcon | React.ReactNode | - | Change next icon |
| nextLabel | string | - | Next button `aria-label` |
| numberOfColumns | number | - | Number of columns displayed next to each other |
| onChange | (value: string \| null) => void | - | Called when value changes |
| onDateChange | (date: string) => void | - | Called when date changes |
| onLevelChange | (level: CalendarLevel) => void | - | Called when the level changes |
| onLevelClick | () => void | - | Called when the level button is clicked |
| onNext | () => void | - | Called when the next button is clicked |
| onNextDecade | (date: string) => void | - | Called when the next decade button is clicked |
| onNextMonth | (date: string) => void | - | Called when the next month button is clicked |
| onNextYear | (date: string) => void | - | Called when the next year button is clicked |
| onPrevious | () => void | - | Called when the previous button is clicked |
| onPreviousDecade | (date: string) => void | - | Called when the previous decade button is clicked |
| onPreviousMonth | (date: string) => void | - | Called when the previous month button is clicked |
| onPreviousYear | (date: string) => void | - | Called when the previous year button is clicked |
| pointer | boolean | - | Determines whether the input should have `cursor: pointer` style. Use when input acts as a button-like trigger (e.g., `component="button"` for Select/DatePicker). |
| popoverProps | Partial<Omit<PopoverProps, "children">> | - | Props passed down to the `Popover` component |
| previousDisabled | boolean | - | Disables previous control |
| previousIcon | React.ReactNode | - | Change previous icon |
| previousLabel | string | - | Previous button `aria-label` |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem |
| renderDay | (date: string) => React.ReactNode | - | Controls day value rendering |
| required | boolean | - | Adds required attribute to the input and a red asterisk on the right side of label |
| rightSection | React.ReactNode | - | Content section displayed on the right side of the input |
| rightSectionPointerEvents | React.CSSProperties["pointerEvents"] | - | Sets `pointer-events` styles on the `rightSection` element. Use `'all'` when section contains interactive elements (buttons, links). |
| rightSectionProps | React.ComponentProps<"div"> | - | Props passed down to the `rightSection` element |
| rightSectionWidth | React.CSSProperties["width"] | - | Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height |
| size | MantineSize | - | Component size |
| value | DateValue | - | Controlled component value |
| valueFormat | string | - | `dayjs` format to display input value, `"MMMM D, YYYY"` by default |
| weekdayFormat | string \| ((date: string) => string) | - | `dayjs` format for weekdays names |
| weekendDays | (0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6)[] | - | Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday. The default value is defined by `DatesProvider`. |
| withAsterisk | boolean | - | If set, the required asterisk is displayed next to the label. Overrides `required` prop. Does not add required attribute to the input. |
| withCellSpacing | boolean | - | Determines whether controls should be separated |
| withErrorStyles | boolean | - | Determines whether the input should have red border and red text color when the `error` prop is set |
| withNext | boolean | - | Determines whether next control should be rendered |
| withPrevious | boolean | - | Determines whether previous control should be rendered |
| withTime | boolean | - | If set to `true`, the time part of the value is preserved. Set this to `true` when `valueFormat` includes time (e.g. `"YYYY-MM-DD HH:mm"`). |
| withWeekNumbers | boolean | - | Determines whether week numbers should be displayed |
| wrapperProps | WrapperProps | - | Props passed down to the root element |
| yearLabelFormat | string \| ((date: string) => string) | - | dayjs label format to display year label or a function that returns year label based on year value |
| yearsListFormat | string | - | dayjs format for years list |


#### Styles API

DateInput component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**DateInput selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| calendarHeader | .mantine-DateInput-calendarHeader | Calendar header root element |
| calendarHeaderControl | .mantine-DateInput-calendarHeaderControl | Previous/next calendar header controls |
| calendarHeaderControlIcon | .mantine-DateInput-calendarHeaderControlIcon | Icon of previous/next calendar header controls |
| calendarHeaderLevel | .mantine-DateInput-calendarHeaderLevel | Level control (changes levels when clicked, month -> year -> decade) |
| levelsGroup | .mantine-DateInput-levelsGroup | Group of months levels |
| yearsList | .mantine-DateInput-yearsList | Years list table element |
| yearsListRow | .mantine-DateInput-yearsListRow | Years list row element |
| yearsListCell | .mantine-DateInput-yearsListCell | Years list cell element |
| yearsListControl | .mantine-DateInput-yearsListControl | Button used to pick months and years |
| monthsList | .mantine-DateInput-monthsList | Months list table element |
| monthsListRow | .mantine-DateInput-monthsListRow | Months list row element |
| monthsListCell | .mantine-DateInput-monthsListCell | Months list cell element |
| monthsListControl | .mantine-DateInput-monthsListControl | Button used to pick months and years |
| monthThead | .mantine-DateInput-monthThead | thead element of month table |
| monthRow | .mantine-DateInput-monthRow | tr element of month table |
| monthTbody | .mantine-DateInput-monthTbody | tbody element of month table |
| monthCell | .mantine-DateInput-monthCell | td element of month table |
| month | .mantine-DateInput-month | Month table element |
| weekdaysRow | .mantine-DateInput-weekdaysRow | Weekdays tr element |
| weekday | .mantine-DateInput-weekday | Weekday th element |
| day | .mantine-DateInput-day | Month day control |
| weekNumber | .mantine-DateInput-weekNumber | Week number td element |


--------------------------------------------------------------------------------

### DatePickerInput
Package: @mantine/dates
Import: import { DatePickerInput } from '@mantine/dates';
Description: Date, multiple dates and dates range picker input

## DatePicker props

`DatePickerInput` supports most of the [DatePicker](https://mantine.dev/llms/dates-date-picker.md) props.
Read through the [DatePicker](https://mantine.dev/llms/dates-date-picker.md) documentation to learn about all component features that are not listed on this page.

## Usage



## Multiple dates

Set `type="multiple"` to allow users to pick multiple dates:



## Dates range

Set `type="range"` to allow users to pick a date range:



## Presets

Use the `presets` prop to add custom date presets. Presets are displayed next to the calendar:

```tsx
import dayjs from 'dayjs';
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <DatePickerInput
      label="With presets"
      placeholder="Select date"
      presets={[
        { value: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), label: 'Yesterday' },
        { value: dayjs().format('YYYY-MM-DD'), label: 'Today' },
        { value: dayjs().add(1, 'day').format('YYYY-MM-DD'), label: 'Tomorrow' },
        { value: dayjs().add(1, 'month').format('YYYY-MM-DD'), label: 'Next month' },
        { value: dayjs().add(1, 'year').format('YYYY-MM-DD'), label: 'Next year' },
        { value: dayjs().subtract(1, 'month').format('YYYY-MM-DD'), label: 'Last month' },
        { value: dayjs().subtract(1, 'year').format('YYYY-MM-DD'), label: 'Last year' },
      ]}
    />
  );
}
```


To use `presets` with `type="range"`, define the value as a tuple of two dates:

```tsx
import dayjs from 'dayjs';
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  const today = dayjs();

  return (
    <DatePickerInput
      type="range"
      presets={[
        {
          value: [today.subtract(2, 'day').format('YYYY-MM-DD'), today.format('YYYY-MM-DD')],
          label: 'Last two days',
        },
        {
          value: [today.subtract(7, 'day').format('YYYY-MM-DD'), today.format('YYYY-MM-DD')],
          label: 'Last 7 days',
        },
        {
          value: [today.startOf('month').format('YYYY-MM-DD'), today.format('YYYY-MM-DD')],
          label: 'This month',
        },
        {
          value: [
            today.subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
            today.subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
          ],
          label: 'Last month',
        },
        {
          value: [
            today.subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
            today.subtract(1, 'year').endOf('year').format('YYYY-MM-DD'),
          ],
          label: 'Last year',
        },
      ]}
    />
  );
}
```


## Open picker in modal

By default, [DatePicker](https://mantine.dev/llms/dates-date-picker.md) is rendered inside [Popover](https://mantine.dev/llms/core-popover.md).
You can change that to [Modal](https://mantine.dev/llms/core-modal.md) by setting `dropdownType="modal"`:



## Value format

Use the `valueFormat` prop to change the [dayjs format](https://day.js.org/docs/en/display/format) of the value label:

```tsx
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <DatePickerInput
      valueFormat="YYYY MMM DD"
      type="multiple"
      label="Pick date"
      placeholder="Pick date"
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
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <Stack>
      <DatePickerInput
        label="clearSectionMode='both' (default)"
        placeholder="Pick date"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <DatePickerInput
        label="clearSectionMode='rightSection'"
        placeholder="Pick date"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <DatePickerInput
        label="clearSectionMode='clear'"
        placeholder="Pick date"
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
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <DatePickerInput
      valueFormat="YYYY MMM DD"
      type="multiple"
      label="Disabled"
      placeholder="Pick date"
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
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePickerInput
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
      minDate={new Date(2022, 1, 10)}
      maxDate={new Date(2022, 1, 28)}
    />
  );
}
```


## Default level

`defaultLevel` prop allows setting the initial level of the picker.
Allowed values are `month`, `year` and `decade`.

```tsx
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <>
      <DatePickerInput
        defaultLevel="decade"
        label="Decade level"
        placeholder="Decade level"
        mb="md"
      />
      <DatePickerInput
        defaultLevel="year"
        label="Year level"
        placeholder="Year level"
      />
    </>
  );
}
```


## Max level

`maxLevel` prop allows to set the maximum level that can be reached by clicking on the label in the header.

```tsx
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <>
      <DatePickerInput
        maxLevel="year"
        label="Year max level"
        placeholder="Year max level"
        mb="md"
      />
      <DatePickerInput
        maxLevel="month"
        label="Month max level"
        placeholder="Month max level"
      />
    </>
  );
}
```


## Control props

`getDayProps`, `getYearControlProps` and `getMonthControlProps` props allow passing props to the control component based on the date.
It is useful for disabling specific dates or customising styles/className.

```tsx
import dayjs from 'dayjs';
import { useState } from 'react';
import { DatePickerInput, DatePickerInputProps } from '@mantine/dates';

const getDayProps: DatePickerInputProps['getDayProps'] = (date) => {
  const d = dayjs(date);

  if (d.day() === 5 && d.date() === 13) {
    return {
      style: {
        backgroundColor: 'var(--mantine-color-red-filled)',
        color: 'var(--mantine-color-white)',
      },
    };
  }

  return {};
};

const getYearControlProps: DatePickerInputProps['getYearControlProps'] = (date) => {
  const d = dayjs(date);

  if (d.year() === new Date().getFullYear()) {
    return {
      style: {
        color: 'var(--mantine-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (d.year() === new Date().getFullYear() + 1) {
    return { disabled: true };
  }

  return {};
};

const getMonthControlProps: DatePickerInputProps['getMonthControlProps'] = (date) => {
  const d = dayjs(date);
  if (d.month() === 1) {
    return {
      style: {
        color: 'var(--mantine-color-blue-filled)',
        fontWeight: 700,
      },
    };
  }

  if (d.month() === 5) {
    return { disabled: true };
  }

  return {};
};

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePickerInput
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
      getDayProps={getDayProps}
      getYearControlProps={getYearControlProps}
      getMonthControlProps={getMonthControlProps}
    />
  );
}
```


## Exclude dates

`excludeDate` prop allows disabling specific dates.
It accepts a function that receives a date and returns `true` if the date should be disabled.
In the following example, all weekends are disabled:

```tsx
import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePickerInput
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
      excludeDate={(date) => new Date(date).getDay() === 0 || new Date(date).getDay() === 6}
    />
  );
}
```


## Hide outside dates

`hideOutsideDates` prop allows hiding dates that do not belong to the current month.

```tsx
import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePickerInput
      hideOutsideDates
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
    />
  );
}
```


## Hide weekdays

`hideWeekdays` prop allows hiding weekdays names.

```tsx
import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePickerInput
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
      hideWeekdays
    />
  );
}
```


## Weekend days

`weekendDays` prop allows changing which days are considered weekends.
It accepts an array of weekday indices (0-6). 0 is Sunday, 6 is Saturday.
By default, `[0, 6]` are used.

```tsx
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <DatePickerInput
      weekendDays={[1, 2]}
      label="Weekend days are Monday and Tuesday"
      placeholder="Pick date"
    />
  );
}
```


## First day of week

`firstDayOfWeek` prop allows changing the first day of the week.
It accepts a weekday index (0-6). 0 is Sunday, 6 is Saturday.
By default, `1` (Monday) is used.

```tsx
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <>
      <DatePickerInput
        firstDayOfWeek={0}
        label="Sunday as first day of week"
        placeholder="Sunday as first day of week"
        mb="md"
      />
      <DatePickerInput
        firstDayOfWeek={6}
        label="Saturday as first day of week"
        placeholder="Saturday as first day of week"
      />
    </>
  );
}
```


## Label format

`decadeLabelFormat`, `yearLabelFormat` and `monthLabelFormat` props allow changing the format of the label in the header.
The props accept a [dayjs format string](https://day.js.org/docs/en/display/format).

```tsx
import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePickerInput
      defaultLevel="decade"
      decadeLabelFormat="YY"
      yearLabelFormat="YYYY [year]"
      monthLabelFormat="MM/YY"
      label="Pick date"
      placeholder="Pick date"
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
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePickerInput
      monthsListFormat="MM"
      yearsListFormat="YY"
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
    />
  );
}
```


## With week numbers

`withWeekNumbers` prop allows displaying week numbers.

```tsx
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <DatePickerInput
      withWeekNumbers
      label="With week numbers"
      placeholder="Pick date"
    />
  );
}
```


## Render day

`renderDay` prop allows customising the day control. It is useful for adding indicators or other elements to the day control.

```tsx
import dayjs from 'dayjs';
import { Indicator } from '@mantine/core';
import { DatePickerInput, DatePickerInputProps } from '@mantine/dates';

const dayRenderer: DatePickerInputProps['renderDay'] = (date) => {
  const day = dayjs(date).date();
  return (
    <Indicator size={6} color="red" offset={-5} disabled={day !== 16}>
      <div>{day}</div>
    </Indicator>
  );
};

function Demo() {
  return (
    <DatePickerInput
      label="Pick date"
      placeholder="Pick date"
      renderDay={dayRenderer}
    />
  );
}
```


## Header controls order

`headerControlsOrder` prop allows changing the order of the controls in the header.
It accepts an array of strings: `level`, `previous` and `next`.
Styles of the controls can be customised with `styles` prop.

```tsx
import { DatePickerInput } from '@mantine/dates';

function Demo() {
  return (
    <DatePickerInput
      defaultDate={new Date(2022, 1)}
      headerControlsOrder={['level', 'previous', 'next']}
      styles={{
        calendarHeaderLevel: {
          justifyContent: 'flex-start',
          paddingInlineStart: 8,
        },
      }}
      label="Header controls order"
      placeholder="Header controls order"
    />
  );
}
```


## Input props

DatePickerInput component supports [Input](https://mantine.dev/core/input) and [Input.Wrapper](https://mantine.dev/core/input) components features and all button element props. DatePickerInput documentation does not include all features supported by the component – see [Input](https://mantine.dev/core/input) documentation to learn about all available features.



## With icon



