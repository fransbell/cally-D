## Fixed elements offset

The `Spotlight` component uses the [react-remove-scroll](https://github.com/theKashey/react-remove-scroll)
package to lock scroll. To properly size these `elements`, add a `className` to them ([documentation](https://github.com/theKashey/react-remove-scroll#positionfixed-elements)):

```tsx
import { RemoveScroll } from '@mantine/core';

function Demo() {
  return (
    <>
      <div className={RemoveScroll.classNames.fullWidth}>
        width: 100%
      </div>
      <div className={RemoveScroll.classNames.zeroRight}>
        right: 0
      </div>
    </>
  );
}
```


#### Props

**Spotlight props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| actions | SpotlightActions[] | required | Actions data, passed down to `Spotlight.Action` component |
| centered | boolean | - | If set, the modal is centered vertically |
| children | React.ReactNode | - | Modal content |
| clearQueryOnClose | boolean | - | Determines whether the search query should be cleared when the spotlight is closed |
| closeOnActionTrigger | boolean | - | Determines whether spotlight should be closed when one of the actions is triggered |
| closeOnClickOutside | boolean | - | If set, the modal/drawer is closed when user clicks on the overlay |
| closeOnEscape | boolean | - | If set, `onClose` is called when user presses the escape key |
| disabled | boolean | - | If set, spotlight will not be rendered |
| filter | SpotlightFilterFunction | - | Function to filter actions data based on search query, by default actions are filtered by title, description and keywords |
| forceOpened | boolean | - | Forces opened state, useful for tests |
| fullScreen | boolean | - | If set, the modal takes the entire screen |
| highlightQuery | boolean | - | Determines whether search query should be highlighted in action label |
| id | string | - | Id used to connect modal/drawer with body and title |
| keepMounted | boolean | - | If set modal/drawer is not unmounted from the DOM when hidden. `display: none` styles are applied instead. |
| limit | number | - | Maximum number of actions displayed at a time |
| lockScroll | boolean | - | If set, scroll is locked when `opened={true}` |
| maxHeight | MaxHeight<string \| number> | - | Spotlight content max-height. Ignored unless `scrollable` prop is set. |
| nothingFound | React.ReactNode | - | Message displayed when none of the actions match given `filter` |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| onQueryChange | (query: string) => void | - | Called when query changes |
| onSpotlightClose | () => void | - | Called when spotlight closes |
| onSpotlightOpen | () => void | - | Called when spotlight opens |
| overlayProps | ModalBaseOverlayProps | - | Props passed down to the `Overlay` component, use to configure opacity, `background-color`, styles and other properties |
| padding | MantineSpacing | - | Key of `theme.spacing` or any valid CSS value to set content, header and footer padding |
| portalProps | BasePortalProps | - | Props passed down to the Portal component when `withinPortal` is set |
| query | string | - | Controlled Spotlight search query |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| removeScrollProps | RemoveScrollProps | - | Props passed down to react-remove-scroll, can be used to customize scroll lock behavior |
| returnFocus | boolean | - | If set, focus is returned to the last active element when `onClose` is called |
| scrollAreaComponent | ScrollAreaComponent | - | Scroll area component |
| scrollAreaProps | Partial<ScrollAreaAutosizeProps> | - | Props passed down to the `ScrollArea` component |
| scrollable | boolean | - | Determines whether the actions list should be scrollable. If not set, `maxHeight` is ignored |
| searchProps | SpotlightSearchProps | - | Props passed down to the `Spotlight.Search` |
| shadow | MantineShadow | - | Key of `theme.shadows` or any valid CSS box-shadow value |
| shortcut | string \| string[] \| null | - | Keyboard shortcut or a list of shortcuts to trigger spotlight |
| size | MantineSize \| number | - | Controls width of the content area |
| stackId | string | - | Id of the modal in the `Modal.Stack` |
| store | SpotlightStore | - | Spotlight store, can be used to create multiple instances of spotlight |
| tagsToIgnore | string[] | - | A list of tags which when focused will be ignored by shortcut |
| title | React.ReactNode | - | Modal title |
| transitionProps | TransitionProps | - | Props added to the `Transition` component that used to animate overlay and body, use to configure duration and animation type, `{ duration: 200, transition: 'fade-down' }` by default |
| trapFocus | boolean | - | If set, focus is trapped within the modal/drawer |
| triggerOnContentEditable | boolean | - | Determines whether shortcut should trigger based in contentEditable |
| withOverlay | boolean | - | If set, the overlay is rendered |
| withinPortal | boolean | - | If set, the component is rendered inside `Portal` |
| xOffset | MarginLeft<string \| number> | - | Left/right modal offset |
| yOffset | MarginTop<string \| number> | - | Top/bottom modal offset |
| zIndex | string \| number | - | `z-index` CSS property of the root element |

**Spotlight.Action props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Children override default action elements, if passed, label, description and sections are hidden |
| closeSpotlightOnTrigger | boolean | - | Determines whether the spotlight should be closed when action is triggered, overrides `closeOnActionTrigger` prop set on `Spotlight` |
| description | string | - | Action description, pass string to use in default filter |
| dimmedSections | boolean | - | Determines whether left and right sections should have dimmed styles |
| highlightColor | MantineColor | - | Key of `theme.colors` of any valid CSS color that will be used to highlight search query |
| highlightQuery | boolean | - | Determines whether search query should be highlighted in action label |
| keywords | string \| string[] | - | Keywords that are used for default filtering, not displayed anywhere, can be a string: "react,router,javascript" or an array: ['react', 'router', 'javascript'] |
| label | string | - | Action label, pass string to use in default filter |
| leftSection | React.ReactNode | - | Section displayed on the left side of the label, for example, icon |
| rightSection | React.ReactNode | - | Section displayed on the right side of the label, for example, hotkey |

**Spotlight.ActionsGroup props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | `Spotlight.Action` components |
| label | string | - | Group label |

**Spotlight.Root props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| centered | boolean | - | If set, the modal is centered vertically |
| children | React.ReactNode | - | Modal content |
| clearQueryOnClose | boolean | - | Determines whether the search query should be cleared when the spotlight is closed |
| closeOnActionTrigger | boolean | - | Determines whether spotlight should be closed when one of the actions is triggered |
| closeOnClickOutside | boolean | - | If set, the modal/drawer is closed when user clicks on the overlay |
| closeOnEscape | boolean | - | If set, `onClose` is called when user presses the escape key |
| disabled | boolean | - | If set, spotlight will not be rendered |
| forceOpened | boolean | - | Forces opened state, useful for tests |
| fullScreen | boolean | - | If set, the modal takes the entire screen |
| id | string | - | Id used to connect modal/drawer with body and title |
| keepMounted | boolean | - | If set modal/drawer is not unmounted from the DOM when hidden. `display: none` styles are applied instead. |
| lockScroll | boolean | - | If set, scroll is locked when `opened={true}` |
| maxHeight | MaxHeight<string \| number> | - | Spotlight content max-height. Ignored unless `scrollable` prop is set. |
| onEnterTransitionEnd | () => void | - | Called when enter transition ends |
| onExitTransitionEnd | () => void | - | Called when exit transition ends |
| onQueryChange | (query: string) => void | - | Called when query changes |
| onSpotlightClose | () => void | - | Called when spotlight closes |
| onSpotlightOpen | () => void | - | Called when spotlight opens |
| overlayProps | ModalBaseOverlayProps | - | Props passed down to the `Overlay` component, use to configure opacity, `background-color`, styles and other properties |
| padding | MantineSpacing | - | Key of `theme.spacing` or any valid CSS value to set content, header and footer padding |
| portalProps | BasePortalProps | - | Props passed down to the Portal component when `withinPortal` is set |
| query | string | - | Controlled Spotlight search query |
| radius | MantineRadius \| number | - | Key of `theme.radius` or any valid CSS value to set `border-radius` |
| removeScrollProps | RemoveScrollProps | - | Props passed down to react-remove-scroll, can be used to customize scroll lock behavior |
| returnFocus | boolean | - | If set, focus is returned to the last active element when `onClose` is called |
| scrollAreaComponent | ScrollAreaComponent | - | Scroll area component |
| scrollable | boolean | - | Determines whether the actions list should be scrollable. If not set, `maxHeight` is ignored |
| shadow | MantineShadow | - | Key of `theme.shadows` or any valid CSS box-shadow value |
| shortcut | string \| string[] \| null | - | Keyboard shortcut or a list of shortcuts to trigger spotlight |
| size | MantineSize \| number | - | Controls width of the content area |
| stackId | string | - | Id of the modal in the `Modal.Stack` |
| store | SpotlightStore | - | Spotlight store, can be used to create multiple instances of spotlight |
| tagsToIgnore | string[] | - | A list of tags which when focused will be ignored by shortcut |
| title | React.ReactNode | - | Modal title |
| transitionProps | TransitionProps | - | Props added to the `Transition` component that used to animate overlay and body, use to configure duration and animation type, `{ duration: 200, transition: 'fade-down' }` by default |
| trapFocus | boolean | - | If set, focus is trapped within the modal/drawer |
| triggerOnContentEditable | boolean | - | Determines whether shortcut should trigger based in contentEditable |
| withOverlay | boolean | - | If set, the overlay is rendered |
| withinPortal | boolean | - | If set, the component is rendered inside `Portal` |
| xOffset | MarginLeft<string \| number> | - | Left/right modal offset |
| yOffset | MarginTop<string \| number> | - | Top/bottom modal offset |
| zIndex | string \| number | - | `z-index` CSS property of the root element |

**Spotlight.Search props**

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


#### Styles API

Spotlight component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Spotlight selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Spotlight-root | Root element |
| inner | .mantine-Spotlight-inner | Element used to center modal, has fixed position, takes entire screen |
| content | .mantine-Spotlight-content | `Modal.Content` root element |
| header | .mantine-Spotlight-header | Contains title and close button |
| overlay | .mantine-Spotlight-overlay | Overlay displayed under the `Modal.Content` |
| title | .mantine-Spotlight-title | Modal title (h2 tag), displayed in the header |
| body | .mantine-Spotlight-body | Modal body, displayed after header |
| close | .mantine-Spotlight-close | Close button |
| search | .mantine-Spotlight-search | Search input (`Spotlight.Search`) |
| actionsList | .mantine-Spotlight-actionsList | Actions list (`Spotlight.ActionsList`) |
| empty | .mantine-Spotlight-empty | Empty state (`Spotlight.Empty`) |
| footer | .mantine-Spotlight-footer | Footer (`Spotlight.Footer`) |
| action | .mantine-Spotlight-action | Action (`Spotlight.Action`) |
| actionBody | .mantine-Spotlight-actionBody | Body of the action, contains label and description |
| actionLabel | .mantine-Spotlight-actionLabel | `Spotlight.Action` label |
| actionDescription | .mantine-Spotlight-actionDescription | `Spotlight.Action` description |
| actionSection | .mantine-Spotlight-actionSection | `Spotlight.Action` left and right sections |
| actionsGroup | .mantine-Spotlight-actionsGroup | `Spotlight.ActionsGroup` root element |

**Spotlight data attributes**

| Selector | Attribute | Condition | Value |
|----------|-----------|-----------|-------|
| action | data-selected | Action is selected with up/down keys | - |
| actionSection | data-position | - | Section position: left or right |
| actionSection | data-dimmed | `dimmedSections` prop is set on `Spotlight.Action` component | - |


--------------------------------------------------------------------------------

### Rich text editor
Package: @mantine/tiptap
Import: import { Rich text editor } from '@mantine/tiptap';
Description: Tiptap based rich text editor

## Installation

Install with yarn:

```bash
yarn add @mantine/tiptap @mantine/core @mantine/hooks @tiptap/react @tiptap/pm @tiptap/extension-link @tiptap/starter-kit
```

```bash
npm install @mantine/tiptap @mantine/core @mantine/hooks @tiptap/react @tiptap/pm @tiptap/extension-link @tiptap/starter-kit
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import tiptap styles after core package styles
import '@mantine/tiptap/styles.css';
```

## TipTap editor

The `@mantine/tiptap` package provides a UI for [Tiptap](https://tiptap.dev/). The `RichTextEditor` component
works with the [Editor](https://tiptap.dev/api/editor) instance of tiptap.
This means that you have full control over the editor [state and configuration](https://tiptap.dev/guide/configuration)
with the [useEditor hook](https://tiptap.dev/installation/react).

In other words, the `RichTextEditor` component does not manage state for you;
controls just execute operations on the `Editor` instance. If you want to
implement something that is related to state or component value (for example, controlled mode, value transforms to HTML/Markdown),
you should look for documentation on the [tiptap.dev](https://tiptap.dev/) website.

## Usage

```tsx
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup><sup /></sup> and <sub><sub /></sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

function Demo() {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ link: false }),
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```


## Subtle variant

`variant="subtle"` removes borders from the control groups, makes controls
larger, and reduces spacing of the toolbar:

```tsx
import Highlight from '@tiptap/extension-highlight';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';

const content = '<p>Subtle rich text editor variant</p>';

function Demo() {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit, Highlight],
    content,
  });

  return (
    <RichTextEditor editor={editor} variant="subtle">
      <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```


## Controlled

To control the editor state, create a wrapper component and pass the `onChange` handler
to the `useEditor` hook:

```tsx
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor as MantineRichTextEditor } from '@mantine/tiptap';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <MantineRichTextEditor editor={editor}>
      <MantineRichTextEditor.Toolbar>
        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.Bold />
          <MantineRichTextEditor.Italic />
        </MantineRichTextEditor.ControlsGroup>
      </MantineRichTextEditor.Toolbar>

      <MantineRichTextEditor.Content />
    </MantineRichTextEditor>
  );
}
```

## Controls and extensions

Some controls require installation of additional [Tiptap extensions](https://tiptap.dev/extensions).
For example, if you want to use `RichTextEditor.Superscript` control, you will need to install `@tiptap/extension-superscript` package:

```bash
yarn add @tiptap/extension-superscript
```

```bash
npm install @tiptap/extension-superscript
```

Included with `@tiptap/starter-kit` (should be installed by default):

* `RichTextEditor.H1`
* `RichTextEditor.H2`
* `RichTextEditor.H3`
* `RichTextEditor.H4`
* `RichTextEditor.H5`
* `RichTextEditor.H6`
* `RichTextEditor.BulletList`
* `RichTextEditor.OrderedList`
* `RichTextEditor.Bold`
* `RichTextEditor.Italic`
* `RichTextEditor.Strikethrough`
* `RichTextEditor.ClearFormatting`
* `RichTextEditor.Blockquote`
* `RichTextEditor.Code`
* `RichTextEditor.CodeBlock`
* `RichTextEditor.Hr`
* `RichTextEditor.Undo`
* `RichTextEditor.Redo`
* `RichTextEditor.Underline`
* `RichTextEditor.Unlink`

Controls that require [@tiptap/extension-text-align](https://www.npmjs.com/package/@tiptap/extension-text-align) extension:

* `RichTextEditor.AlignLeft`
* `RichTextEditor.AlignRight`
* `RichTextEditor.AlignCenter`
* `RichTextEditor.AlignJustify`

Controls that require [@tiptap/extension-color](https://www.npmjs.com/package/@tiptap/extension-color) and [@tiptap/extension-text-style](https://www.npmjs.com/package/@tiptap/extension-text-style) extensions:

* `RichTextEditor.ColorPicker`
* `RichTextEditor.Color`
* `RichTextEditor.UnsetColor`

Other controls with required extensions:

* `RichTextEditor.Superscript` requires [@tiptap/extension-superscript](https://www.npmjs.com/package/@tiptap/extension-superscript)
* `RichTextEditor.Subscript` requires [@tiptap/extension-subscript](https://www.npmjs.com/package/@tiptap/extension-subscript)
* `RichTextEditor.Highlight` requires [@tiptap/extension-highlight](https://www.npmjs.com/package/@tiptap/extension-highlight)

## Placeholder

To use a placeholder, you will need to install the [@tiptap/extension-placeholder](https://www.npmjs.com/package/@tiptap/extension-placeholder) package:

```bash
yarn add @tiptap/extension-placeholder
```

```bash
npm install @tiptap/extension-placeholder
```

```tsx
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

function Demo() {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit, Placeholder.configure({ placeholder: 'This is placeholder' })],
    content: '',
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```


## Link extension

The `@mantine/tiptap` package provides a custom `Link` extension that is required to be used instead of
`@tiptap/extension-link` in order for the `Ctrl + K` keyboard shortcut to work:

```tsx
// Use Link extension exported from the @mantine/tiptap package
import { useEditor } from '@tiptap/react';
import { Link, RichTextEditor } from '@mantine/tiptap';

function Demo() {
  const editor = useEditor({
    extensions: [
      Link,
      // ... other extensions
    ],
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```

## Text color

To use text color, you will need to install additional packages:

```bash
yarn add @tiptap/extension-color @tiptap/extension-text-style
```

```bash
npm install @tiptap/extension-color @tiptap/extension-text-style
```

You can use the following controls to change text color:

* `RichTextEditor.ColorPicker` – allows you to pick colors from given predefined color swatches and with the [ColorPicker](https://mantine.dev/llms/core-color-picker.md) component
* `RichTextEditor.Color` – allows you to apply a given color with one click
* `RichTextEditor.UnsetColor` – clears color styles

```tsx
import { useEditor } from '@tiptap/react';
import { EyedropperIcon } from '@phosphor-icons/react';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@mantine/tiptap';

function Demo() {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content: '<p>Apply some colors to this text</p>',
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
        <RichTextEditor.ColorPicker
          colors={[
            '#25262b',
            '#868e96',
            '#fa5252',
            '#e64980',
            '#be4bdb',
            '#7950f2',
            '#4c6ef5',
            '#228be6',
            '#15aabf',
            '#12b886',
            '#40c057',
            '#82c91e',
            '#fab005',
            '#fd7e14',
          ]}
        />

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Control interactive={false}>
            <EyedropperIcon size={16} />
          </RichTextEditor.Control>
          <RichTextEditor.Color color="#F03E3E" />
          <RichTextEditor.Color color="#7048E8" />
          <RichTextEditor.Color color="#1098AD" />
          <RichTextEditor.Color color="#37B24D" />
          <RichTextEditor.Color color="#F59F00" />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.UnsetColor />
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```


## Code highlight

To use code highlighting, you will need to install additional packages:

```bash
yarn add lowlight @tiptap/extension-code-block-lowlight
```

```bash
npm install lowlight @tiptap/extension-code-block-lowlight
```

```tsx
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import ts from 'highlight.js/lib/languages/typescript';

const lowlight = createLowlight();

// register languages that you are planning to use
lowlight.register({ ts });

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

const codeExample =
  escapeHtml(`// Valid braces Kata – https://www.codewars.com/kata/5277c8a221e209d3f6000b56

const pairs: Record<string, string> = {
  '[': ']',
  '{': '}',
  '(': ')',
};

const openBraces = Object.keys(pairs);

export function validBraces(braces: string) {
  const opened: string[] = [];

  for (let i = 0; i < braces.length; i += 1) {
    const brace = braces[i];

    if (openBraces.includes(brace)) {
      opened.push(brace);
      continue;
    }

    if (pairs[opened[opened.length - 1]] !== brace) {
      return false
    }

    opened.pop();
  }

  return opened.length === 0;
}`);

function Demo() {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: `<p>Regular paragraph</p><pre><code>${codeExample}</code>