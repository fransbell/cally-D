## Search and filter

`Tree` does not include built-in search controls – search input and filtering logic are always external.
Use the `filterTreeData` utility to filter tree data based on a search query. The function
accepts tree data, a query string, and an optional custom filter function:

```tsx
import { filterTreeData } from '@mantine/core';

// Filter with default case-insensitive label matching
const filtered = filterTreeData(data, 'button');

// Filter with a custom function
const filtered = filterTreeData(data, 'btn', (query, node) =>
  node.value.includes(query)
);
```

The default filter compares the query against `node.label` (when it is a string) or `node.value` as a fallback.
Matching nodes and their ancestors are preserved in the result. You can provide a custom `TreeNodeFilter`
function for more advanced matching (for example, fuzzy search with fuse.js).

### Highlight matching nodes

In this example, all nodes remain visible and matching text is highlighted using the `Highlight` component
inside `renderNode`. Ancestor nodes of matching nodes are auto-expanded.

```tsx
import { useState } from 'react';
import {
  defaultTreeNodeFilter,
  getTreeExpandedState,
  Highlight,
  TextInput,
  Tree,
  TreeNodeData,
  useTree,
} from '@mantine/core';

const data: TreeNodeData[] = [
  {
    label: 'src',
    value: 'src',
    children: [
      {
        label: 'components',
        value: 'src/components',
        children: [
          { label: 'Accordion.tsx', value: 'src/components/Accordion.tsx' },
          { label: 'Tree.tsx', value: 'src/components/Tree.tsx' },
          { label: 'Button.tsx', value: 'src/components/Button.tsx' },
          { label: 'Input.tsx', value: 'src/components/Input.tsx' },
        ],
      },
      {
        label: 'hooks',
        value: 'src/hooks',
        children: [
          { label: 'use-debounce.ts', value: 'src/hooks/use-debounce.ts' },
          { label: 'use-media-query.ts', value: 'src/hooks/use-media-query.ts' },
        ],
      },
    ],
  },
  {
    label: 'public',
    value: 'public',
    children: [
      { label: 'favicon.ico', value: 'public/favicon.ico' },
      { label: 'logo.svg', value: 'public/logo.svg' },
    ],
  },
  { label: 'package.json', value: 'package.json' },
  { label: 'tsconfig.json', value: 'tsconfig.json' },
];

function getMatchingAncestors(
  nodes: TreeNodeData[],
  query: string
): string[] {
  const result: string[] = [];
  for (const node of nodes) {
    const childMatches = node.children
      ? getMatchingAncestors(node.children, query)
      : [];
    if (
      defaultTreeNodeFilter(query, node) ||
      childMatches.length > 0
    ) {
      result.push(node.value, ...childMatches);
    }
  }
  return result;
}

function Demo() {
  const [search, setSearch] = useState('');
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(data, []),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value.trim()) {
      tree.setExpandedState(
        getTreeExpandedState(data, getMatchingAncestors(data, value))
      );
    } else {
      tree.collapseAllNodes();
    }
  };

  return (
    <div>
      <TextInput
        placeholder="Search..."
        mb="sm"
        value={search}
        onChange={(event) => handleSearchChange(event.currentTarget.value)}
      />
      <Tree
        data={data}
        tree={tree}
        renderNode={({ node, elementProps, hasChildren, expanded }) => {
          const label =
            typeof node.label === 'string' ? node.label : node.value;
          return (
            <div {...elementProps}>
              <Highlight highlight={search} component="span">
                {label}
              </Highlight>
            </div>
          );
        }}
      />
    </div>
  );
}
```


### Filter non-matching nodes

In this example, non-matching branches are removed from the tree using `filterTreeData`.
The filtered tree is auto-expanded with `getTreeExpandedState(filteredData, '*')`.

```tsx
import { useMemo, useState } from 'react';
import {
  filterTreeData,
  getTreeExpandedState,
  TextInput,
  Tree,
  TreeNodeData,
  useTree,
} from '@mantine/core';

const data: TreeNodeData[] = [
  {
    label: 'src',
    value: 'src',
    children: [
      {
        label: 'components',
        value: 'src/components',
        children: [
          { label: 'Accordion.tsx', value: 'src/components/Accordion.tsx' },
          { label: 'Tree.tsx', value: 'src/components/Tree.tsx' },
          { label: 'Button.tsx', value: 'src/components/Button.tsx' },
          { label: 'Input.tsx', value: 'src/components/Input.tsx' },
        ],
      },
      {
        label: 'hooks',
        value: 'src/hooks',
        children: [
          { label: 'use-debounce.ts', value: 'src/hooks/use-debounce.ts' },
          { label: 'use-media-query.ts', value: 'src/hooks/use-media-query.ts' },
        ],
      },
    ],
  },
  {
    label: 'public',
    value: 'public',
    children: [
      { label: 'favicon.ico', value: 'public/favicon.ico' },
      { label: 'logo.svg', value: 'public/logo.svg' },
    ],
  },
  { label: 'package.json', value: 'package.json' },
  { label: 'tsconfig.json', value: 'tsconfig.json' },
];

function Demo() {
  const [search, setSearch] = useState('');
  const tree = useTree();

  const filteredData = useMemo(
    () => filterTreeData(data, search),
    [search]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value.trim()) {
      const next = filterTreeData(data, value);
      tree.setExpandedState(getTreeExpandedState(next, '*'));
    } else {
      tree.collapseAllNodes();
    }
  };

  return (
    <div>
      <TextInput
        placeholder="Search..."
        mb="sm"
        value={search}
        onChange={(event) => handleSearchChange(event.currentTarget.value)}
      />
      <Tree data={filteredData} tree={tree} />
    </div>
  );
}
```


### Fuzzy search with fuse.js

You can pass a custom filter function to `filterTreeData` for fuzzy matching. This example
uses [fuse.js](https://www.fusejs.io/):

```tsx
import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import {
  filterTreeData,
  getTreeExpandedState,
  TextInput,
  Tree,
  TreeNodeData,
  TreeNodeFilter,
  useTree,
} from '@mantine/core';

const data: TreeNodeData[] = [
  {
    label: 'src',
    value: 'src',
    children: [
      {
        label: 'components',
        value: 'src/components',
        children: [
          { label: 'Accordion.tsx', value: 'src/components/Accordion.tsx' },
          { label: 'Tree.tsx', value: 'src/components/Tree.tsx' },
          { label: 'Button.tsx', value: 'src/components/Button.tsx' },
          { label: 'Input.tsx', value: 'src/components/Input.tsx' },
        ],
      },
      {
        label: 'hooks',
        value: 'src/hooks',
        children: [
          { label: 'use-debounce.ts', value: 'src/hooks/use-debounce.ts' },
          { label: 'use-media-query.ts', value: 'src/hooks/use-media-query.ts' },
        ],
      },
    ],
  },
  {
    label: 'public',
    value: 'public',
    children: [
      { label: 'favicon.ico', value: 'public/favicon.ico' },
      { label: 'logo.svg', value: 'public/logo.svg' },
    ],
  },
  { label: 'package.json', value: 'package.json' },
  { label: 'tsconfig.json', value: 'tsconfig.json' },
];

function flattenTreeData(nodes: TreeNodeData[]): TreeNodeData[] {
  return nodes.reduce<TreeNodeData[]>((acc, node) => {
    acc.push(node);
    if (node.children) {
      acc.push(...flattenTreeData(node.children));
    }
    return acc;
  }, []);
}

function createFuzzyFilter(nodes: TreeNodeData[]): TreeNodeFilter {
  const flatNodes = flattenTreeData(nodes);
  const fuse = new Fuse(flatNodes, {
    keys: ['label'],
    threshold: 0.3,
  });

  return (query, node) => {
    const results = fuse.search(query);
    return results.some((result) => result.item.value === node.value);
  };
}

function Demo() {
  const [search, setSearch] = useState('');
  const tree = useTree();
  const fuzzyFilter = useMemo(() => createFuzzyFilter(data), []);

  const filteredData = useMemo(
    () => filterTreeData(data, search, fuzzyFilter),
    [search, fuzzyFilter]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value.trim()) {
      const next = filterTreeData(data, value, fuzzyFilter);
      tree.setExpandedState(getTreeExpandedState(next, '*'));
    } else {
      tree.collapseAllNodes();
    }
  };

  return (
    <div>
      <TextInput
        placeholder="Fuzzy search..."
        mb="sm"
        value={search}
        onChange={(event) => handleSearchChange(event.currentTarget.value)}
      />
      <Tree data={filteredData} tree={tree} />
    </div>
  );
}
```


## Drag and drop

`Tree` component supports drag-and-drop reordering of nodes. To enable it, provide `onDragDrop` callback.
The callback receives an object with `draggedNode` (value of the dragged node), `targetNode` (value of the node it was dropped on),
and `position` (`'before'`, `'after'`, or `'inside'`).

Use `moveTreeNode` utility function to update the data based on the drag-and-drop result:

```tsx
import { moveTreeNode, Tree, TreeNodeData } from '@mantine/core';

function Demo() {
  const [data, setData] = useState<TreeNodeData[]>(initialData);

  return (
    <Tree
      data={data}
      onDragDrop={(payload) =>
        setData((current) => moveTreeNode(current, payload))
      }
    />
  );
}
```

When dragging over a node, the drop position is determined by cursor position:

* **Top zone** – drop before the target node (shown as a line above)
* **Middle zone** – drop inside the target node as a child (shown as a background highlight, only for nodes with children)
* **Bottom zone** – drop after the target node (shown as a line below)

Nodes cannot be dropped onto their own descendants.

```tsx
import { useState } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import { Group, moveTreeNode, RenderTreeNodePayload, Tree, TreeNodeData } from '@mantine/core';

const data: TreeNodeData[] = [
  {
    label: 'Pages',
    value: 'pages',
    children: [
      { label: 'index.tsx', value: 'pages/index.tsx' },
      { label: 'about.tsx', value: 'pages/about.tsx' },
      { label: 'contact.tsx', value: 'pages/contact.tsx' },
    ],
  },
  {
    label: 'Components',
    value: 'components',
    children: [
      { label: 'Header.tsx', value: 'components/Header.tsx' },
      { label: 'Footer.tsx', value: 'components/Footer.tsx' },
      { label: 'Sidebar.tsx', value: 'components/Sidebar.tsx' },
    ],
  },
  { label: 'package.json', value: 'package.json' },
  { label: 'tsconfig.json', value: 'tsconfig.json' },
];

function Leaf({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) {
  return (
    <Group gap={5} {...elementProps}>
      {hasChildren && (
        <CaretDownIcon
          size={18}
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      )}
      <span>{node.label}</span>
    </Group>
  );
}

function Demo() {
  const [treeData, setTreeData] = useState(data);

  return (
    <Tree
      data={treeData}
      onDragDrop={(payload) =>
        setTreeData((current) => moveTreeNode(current, payload))
      }
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}
```


### Restricting drop targets

Use the `allowDrop` prop to forbid certain drops. The callback receives the same payload as
`onDragDrop` (`draggedNode`, `targetNode`, `position`) and should return `false` to reject the drop.
When it returns `false`, the drop indicator is hidden and the browser displays the
"not-allowed" cursor, so the user gets visual feedback before releasing the mouse.

```tsx
import { useState } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import { Group, moveTreeNode, RenderTreeNodePayload, Tree, TreeNodeData } from '@mantine/core';

const data: TreeNodeData[] = [
  {
    label: 'Pages',
    value: 'pages',
    children: [
      { label: 'index.tsx', value: 'pages/index.tsx' },
      { label: 'about.tsx', value: 'pages/about.tsx' },
    ],
  },
  {
    label: 'Components (locked)',
    value: 'components',
    children: [
      { label: 'Header.tsx', value: 'components/Header.tsx' },
      { label: 'Footer.tsx', value: 'components/Footer.tsx' },
    ],
  },
  { label: 'package.json', value: 'package.json' },
];

function Leaf({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) {
  return (
    <Group gap={5} {...elementProps}>
      {hasChildren && (
        <CaretDownIcon
          size={18}
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      )}
      <span>{node.label}</span>
    </Group>
  );
}

function Demo() {
  const [treeData, setTreeData] = useState(data);

  return (
    <Tree
      data={treeData}
      // Forbid dropping into or onto "components" branch
      allowDrop={({ draggedNode, targetNode, position }) => {
        if (draggedNode === 'components' || draggedNode.startsWith('components/')) {
          return false;
        }

        if (targetNode === 'components' && position === 'inside') {
          return false;
        }

        return !targetNode.startsWith('components/');
      }}
      onDragDrop={(payload) =>
        setTreeData((current) => moveTreeNode(current, payload))
      }
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}
```


### Drag handle

By default, drag can be initiated from anywhere on a node. Set `withDragHandle` on `Tree` to
restrict drag initiation to an element that spreads `dragHandleProps` from the `renderNode`
payload. This is useful when a node contains interactive controls (inputs, buttons) that
would otherwise interfere with dragging.

```tsx
import { useState } from 'react';
import { CaretDownIcon, DotsSixVerticalIcon } from '@phosphor-icons/react';
import { Group, moveTreeNode, RenderTreeNodePayload, Tree, TreeNodeData } from '@mantine/core';

const data: TreeNodeData[] = [
  {
    label: 'Pages',
    value: 'pages',
    children: [
      { label: 'index.tsx', value: 'pages/index.tsx' },
      { label: 'about.tsx', value: 'pages/about.tsx' },
    ],
  },
  {
    label: 'Components',
    value: 'components',
    children: [
      { label: 'Header.tsx', value: 'components/Header.tsx' },
      { label: 'Footer.tsx', value: 'components/Footer.tsx' },
    ],
  },
  { label: 'package.json', value: 'package.json' },
];

function Leaf({ node, expanded, hasChildren, elementProps, dragHandleProps }: RenderTreeNodePayload) {
  return (
    <Group gap={4} {...elementProps}>
      <DotsSixVerticalIcon
        {...dragHandleProps}
        size={16}
        style={{ cursor: 'grab' }}
      />
      {hasChildren && (
        <CaretDownIcon
          size={18}
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      )}
      <span>{node.label}</span>
    </Group>
  );
}

function Demo() {
  const [treeData, setTreeData] = useState(data);

  return (
    <Tree
      data={treeData}
      withDragHandle
      onDragDrop={(payload) =>
        setTreeData((current) => moveTreeNode(current, payload))
      }
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}
```


## Connecting lines

Set `withLines` prop to display connecting lines showing parent-child relationships.
Lines adapt to `levelOffset` spacing automatically.

```tsx
import { getTreeExpandedState, Tree, useTree } from '@mantine/core';
import { data } from './data';

function Demo() {
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(data, '*'),
  });

  return <Tree data={data} tree={tree} withLines />;
}
```


## Virtualization

`Tree` does not depend on any virtualization library – you supply one yourself.
Use the `flattenTreeData` utility to convert hierarchical data into a flat list of
visible nodes based on the current expanded state, then render each node with
`FlatTreeNode` which provides Tree's styles, aria attributes, click/keyboard
handlers, and `renderNode` support.

```tsx
import { FlatTreeNode, flattenTreeData, useTree } from '@mantine/core';

const tree = useTree();
const flatList = flattenTreeData(data, tree.expandedState);
// flatList is FlattenedTreeNodeData[] – spread each entry into FlatTreeNode
```

`FlatTreeNode` accepts the same behavioral props as `Tree` (`expandOnClick`,
`selectOnClick`, `expandOnSpace`, `checkOnSpace`, `renderNode`) and a `style` prop
for virtualizer positioning. The container element must have `data-tree-root`
and `role="tree"` attributes for keyboard navigation to work.

```tsx
import { useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  FlatTreeNode,
  flattenTreeData,
  getTreeExpandedState,
  TreeNodeData,
  useTree,
} from '@mantine/core';

const ITEM_HEIGHT = 30;

function generateTreeData(count: number): TreeNodeData[] {
  const result: TreeNodeData[] = [];
  let id = 0;

  function addChildren(
    parent: TreeNodeData[],
    depth: number,
    remaining: { count: number }
  ) {
    const childCount = depth === 0 ? 20 : Math.floor(Math.random() * 8) + 2;

    for (let i = 0; i < childCount && remaining.count > 0; i++) {
      id++;
      remaining.count--;
      const hasChild =
        depth < 3 && remaining.count > 0 && Math.random() > 0.3;
      const node: TreeNodeData = {
        label: `${hasChild ? 'Folder' : 'File'} ${id}`,
        value: `node-${id}`,
        children: hasChild ? [] : undefined,
      };

      if (hasChild) {
        addChildren(node.children!, depth + 1, remaining);
      }

      parent.push(node);
    }
  }

  addChildren(result, 0, { count });
  return result;
}

const largeData = generateTreeData(2000);
const initialExpandedState = getTreeExpandedState(largeData, '*');

function Demo() {
  const tree = useTree({
    initialExpandedState,
  });

  const flatList = useMemo(
    () => flattenTreeData(largeData, tree.expandedState),
    [tree.expandedState]
  );

  const scrollParentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: flatList.length,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 20,
  });

  return (
    <div ref={scrollParentRef} style={{ height: 400, overflow: 'auto' }}>
      <div
        data-tree-root
        role="tree"
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <FlatTreeNode
            key={flatList[virtualItem.index].node.value}
            {...flatList[virtualItem.index]}
            tree={tree}
            expandOnClick
            selectOnClick
            tabIndex={virtualItem.index === 0 ? 0 : -1}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: virtualItem.size,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
```


## Example: files tree

```tsx
import { FolderSimpleIcon, FolderOpenIcon } from '@phosphor-icons/react';
import { Group, RenderTreeNodePayload, Tree } from '@mantine/core';
import { CssIcon, NpmIcon, TypeScriptCircleIcon } from '@mantinex/dev-icons';
import { data, dataCode } from './data';
import classes from './Demo.module.css';

interface FileIconProps {
  name: string;
  isFolder: boolean;
  expanded: boolean;
}

function FileIcon({ name, isFolder, expanded }: FileIconProps) {
  if (name.endsWith('package.json')) {
    return <NpmIcon size={14} />;
  }

  if (name.endsWith('.ts') || name.endsWith('.tsx') || name.endsWith('tsconfig.json')) {
    return <TypeScriptCircleIcon size={14} />;
  }

  if (name.endsWith('.css')) {
    return <CssIcon size={14} />;
  }

  if (isFolder) {
    return expanded ? (
      <FolderOpenIcon color="var(--mantine-color-yellow-9)" size={14} />
    ) : (
      <FolderSimpleIcon color="var(--mantine-color-yellow-9)" size={14} />
    );
  }

  return null;
}

function Leaf({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) {
  return (
    <Group gap={5} {...elementProps}>
      <FileIcon name={node.value} isFolder={hasChildren} expanded={expanded} />
      <span>{node.label}</span>
    </Group>
  );
}

function Demo() {
  return (
    <Tree
      classNames={classes}
      selectOnClick
      clearSelectionOnOutsideClick
      data={data}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}
```



#### Props

**Tree props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| allowDrop | TreeAllowDrop | - | Called for each potential drop target to determine whether a drop is allowed. When it returns `false`, the drop indicator is hidden and the drop is rejected. |
| allowRangeSelection | boolean | - | If set, tree nodes range can be selected with click when `Shift` key is pressed |
| checkOnSpace | boolean | - | If set, tree node is checked on space key press |
| clearSelectionOnOutsideClick | boolean | - | If set, selection is cleared when user clicks outside of the tree |
| data | TreeNodeData[] | required | Data used to render nodes |
| expandOnClick | boolean | - | If set, tree node with children is expanded on click |
| expandOnSpace | boolean | - | If set, tree node with children is expanded on space key press |
| keepMounted | boolean | - | If set, subtree content is kept mounted when collapsed. React 19 `Activity` is used to preserve state. |
| levelOffset | MantineSpacing | - | Horizontal padding of each subtree level, key of `theme.spacing` or any valid CSS value |
| onDragDrop | (payload: TreeDragDropPayload) => void | - | Called when a node is dropped on another node, enables drag-and-drop when provided |
| renderNode | RenderNode | - | A function to render tree node label |
| selectOnClick | boolean | - | If set, tree node is selected on click |
| tree | UseTreeReturnType | - | Use-tree hook instance that can be used to manipulate component state |
| withDragHandle | boolean | - | If set, drag-and-drop must be initiated from an element that spreads `dragHandleProps` from the `renderNode` payload, rather than anywhere on the node. |
| withLines | boolean | - | If set, connecting lines are rendered showing parent-child relationships |

**Tree.map props**

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

Tree component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Tree selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Tree-root | Root element |
| node | .mantine-Tree-node | Node element (li), contains label and subtree elements |
| subtree | .mantine-Tree-subtree | Subtree element (ul) |
| label | .mantine-Tree-label | Node label |

**Tree CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --level-offset | Controls offset of nested tree levels |

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

### Typography
Package: @mantine/core
Import: import { Typography } from '@mantine/core';
Description: Styles provider for html content

## Usage

Mantine does not include typography global styles.
Use `Typography` to add typography styles to your html content:

```tsx
import { Typography } from '@mantine/core';

function Demo() {
  return (
    <Typography>
      <div
        dangerouslySetInnerHTML={{ __html: '<p>Your html here</p>' }}
      />
    </Typography>
  );
}
```

## Example

```tsx
import { Typography } from '@mantine/core';

const html = '...html content here...';

function Demo() {
  return (
    <Typography>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Typography>
  );
}
```


## All styles demo

`Typography` includes styles for:

* paragraphs
* headings
* lists
* blockquotes
* tables
* links
* images
* hr
* kbd
* code and pre

```tsx
function Demo() {
  return (
    <Typography>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Typography>
  );
}
```



#### Props

**Typography props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|


#### Styles API

Typography component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Typography selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Typography-root | Root element |


--------------------------------------------------------------------------------

### UnstyledButton
Package: @mantine/core
Import: import { UnstyledButton } from '@mantine/core';
Description: Unstyled polymorphic button

## Usage

`UnstyledButton` resets default button styles, it is used as a
base for all other button components. You can use it to as a base for custom
polymorphic buttons.

```tsx
import { UnstyledButton } from '@mantine/core';

function Demo() {
  return <UnstyledButton>Button without styles</UnstyledButton>;
}
```



#### Props

**UnstyledButton props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | string \| number | - | Size passed from parent component, sets `data-size` if value is not number like |


#### Styles API

UnstyledButton component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**UnstyledButton selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-UnstyledButton-root | Root element |


--------------------------------------------------------------------------------

### VisuallyHidden
Package: @mantine/core
Import: import { VisuallyHidden } from '@mantine/core';
Description: Hide element visually but keep it accessible for screen readers

## Usage

`VisuallyHidden` is a utility component that hides content visually but leaves it available to screen readers.

For example, it can be used with [ActionIcon](https://mantine.dev/llms/core-action-icon.md) component:

```tsx
import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon, VisuallyHidden } from '@mantine/core';

function Demo() {
  return (
    <ActionIcon>
      <HeartIcon />
      <VisuallyHidden>Like post</VisuallyHidden>
    </ActionIcon>
  );
}
```


#### Props

**VisuallyHidden props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|


--------------------------------------------------------------------------------

## HOOKS COMPONENTS AND FEATURES
Primary Package: @mantine/hooks

### HooksPackage
Package: @mantine/hooks
Import: import { HooksPackage } from '@mantine/hooks';

# Mantine hooks

[![npm](https://img.shields.io/npm/dm/@mantine/hooks)](https://www.npmjs.com/package/@mantine/hooks)

The [@mantine/hooks](https://www.npmjs.com/package/@mantine/hooks) package
provides more than 70 hooks to build custom components. The `@mantine/hooks`
package is used internally in most other `@mantine/*` packages –
it is required to be installed in your project to use Mantine components.

## Installation

```bash
yarn add @mantine/hooks
```

```bash
npm install @mantine/hooks
```

## Usage

The `@mantine/hooks` package can be used in any web React application, and state
management hooks (like [use-pagination](https://mantine.dev/llms/hooks-use-pagination.md) or [use-queue](https://mantine.dev/llms/hooks-use-queue.md))
are also compatible with React Native. The package can be used even if you
do not use Mantine components or other Mantine libraries – it is standalone
and has no dependencies except React.

Example of using [use-move](https://mantine.dev/llms/hooks-use-move.md) hook to create a custom slider:

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


## License

MIT


--------------------------------------------------------------------------------

### useClickOutside
Package: @mantine/hooks
Import: import { UseClickOutside } from '@mantine/hooks';

## Usage

```tsx
import { useState } from 'react';
import { Paper, Button } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

function Demo() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open dropdown</Button>

      {opened && (
        <Paper ref={ref} shadow="sm">
          <span>Click outside to close</span>
        </Paper>
      )}
    </>
  );
}
```


## API

The `use-click-outside` hook accepts 3 arguments:

* `handler` – function that is called when clicking outside
* `events` – optional list of events that trigger outside click, `['mousedown', 'touchstart']` by default
* `nodes` - optional list of nodes that should not trigger outside click event
* `enabled` - optional boolean to dynamically enable/disable the listener, `true` by default

The hook returns a `ref` object that must be passed to the element
based on which outside clicks should be captured.

```tsx
import { useClickOutside } from '@mantine/hooks';

function Example() {
  const handleClickOutside = () =>
    console.log('Clicked outside of div');
  const ref = useClickOutside(handleClickOutside);
  return <div ref={ref} />;
}
```

## Change events

By default, `use-click-outside` listens to `mousedown` and `touchstart` events,
you can change these events by passing an array of events as second argument:

```tsx
import { useState } from 'react';
import { Paper, Button } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

function Demo() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false), ['mouseup', 'touchend']);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open dropdown</Button>

      {opened && (
        <Paper ref={ref} shadow="sm">
          <span>Click outside to close</span>
        </Paper>
      )}
    </>
  );
}
```


## Multiple nodes

```tsx
// Will work only with useState, not useRef
import { useState } from 'react';
import { Portal } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

function Demo() {
  const [dropdown, setDropdown] = useState<HTMLDivElement | null>(
    null
  );
  const [control, setControl] = useState<HTMLDivElement | null>(null);

  useClickOutside(() => console.log('outside'), null, [
    control,
    dropdown,
  ]);

  return (
    // We cannot use root element ref as it does not contain dropdown
    <div>
      <div ref={setControl}>Control</div>
      <Portal>
        <div ref={setDropdown}>Dropdown</div>
      </Portal>
    </div>
  );
}
```

## Set ref type

```tsx
import { useClickOutside } from '@mantine/hooks';

const ref = useClickOutside<HTMLDivElement>(() =>
  console.log('Click outside')
);
```

## Definition

```tsx
function useClickOutside<T extends HTMLElement = any>(
  handler: (event: MouseEvent | TouchEvent) => void,
  events?: string[] | null,
  nodes?: (HTMLElement | null)[],
  enabled?: boolean
): React.RefObject<T>;
```


--------------------------------------------------------------------------------

### useClipboard
Package: @mantine/hooks
Import: import { UseClipboard } from '@mantine/hooks';

## Usage

The `use-clipboard` hook provides a simple way to copy text to the clipboard,
track the copied state, handle errors, and reset the state after a given timeout.
It uses the [navigator.clipboard.writeText](https://caniuse.com/mdn-api_clipboard_writetext) API under the hood.

```tsx
import { Button } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';

function Demo() {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <Button
      color={clipboard.copied ? 'teal' : 'blue'}
      onClick={() => clipboard.copy('Hello, world!')}
    >
      {clipboard.copied ? 'Copied' : 'Copy'}
    </Button>
  );
}
```


## Limitations

Due to security reasons, the `use-clipboard` hook will not work in iframes and may not work with local files opened with the `file://` protocol
(the hook will work fine with local websites that are using the `http://` protocol). You can learn more about `navigator.clipboard` [here](https://web.dev/async-clipboard/).

## Definition

```tsx
interface UseClipboardOptions {
  /** Time in ms after which the copied state will reset, `2000` by default */
  timeout?: number;
}

interface UseClipboardReturnValue {
  /** Function to copy value to clipboard */
  copy: (value: any) => void;

  /** Function to reset copied state and error */
  reset: () => void;

  /** Error if copying failed */
  error: Error | null;

  /** Boolean indicating if the value was copied successfully */
  copied: boolean;
}

function useClipboard(options?: UseClipboardOptions): UseClipboardReturnValue
```

## Exported types

The `UseClipboardOptions` and `UseClipboardReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseClipboardOptions, UseClipboardReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useCollapse
Package: @mantine/hooks
Import: import { UseCollapse } from '@mantine/hooks';

## Usage

`use-collapse` is the hook version of [Collapse](https://mantine.dev/llms/core-collapse.md) component.
It allows animation of height from `0` to `auto` and vice versa.

```tsx
import { Button, Typography } from '@mantine/core';
import { useCollapse, useDisclosure } from '@mantine/hooks';

function Demo() {
  const [expanded, handlers] = useDisclosure(false);
  const { getCollapseProps } = useCollapse({ expanded });

  return (
    <>
      <Button onClick={handlers.toggle} mb="md">
        {expanded ? 'Collapse' : 'Expand'}
      </Button>

      <div {...getCollapseProps()}>
        <Typography bg="var(--mantine-color-blue-light)" p="xs" bdrs="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </div>
    </>
  );
}
```


## Horizontal collapse

`use-horizontal-collapse` works the same way as `use-collapse` but animates width instead of height:

```tsx
import { Button, Stack, Typography } from '@mantine/core';
import { useDisclosure, useHorizontalCollapse } from '@mantine/hooks';

function Demo() {
  const [expanded, handlers] = useDisclosure(false);
  const { getCollapseProps } = useHorizontalCollapse({ expanded });

  return (
    <Stack h={240}>
      <Button onClick={handlers.toggle} w="fit-content">
        {expanded ? 'Collapse' : 'Expand'}
      </Button>

      <div {...getCollapseProps({ style: { width: 200 } })}>
        <Typography bg="var(--mantine-color-blue-light)" p="xs" bdrs="md" w={200}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Typography>
      </div>
    </Stack>
  );
}
```


## ref prop

`getCollapseProps` return value now includes `ref` prop. It must be passed to the collapsible element
to make the hook work correctly.

## Definition

```tsx
interface UseCollapseInput {
  /** Expanded state  */
  expanded: boolean;

  /** Transition duration in milliseconds, by default calculated based on content height */
  transitionDuration?: number;

  /** Transition timing function, `ease` by default */
  transitionTimingFunction?: string;

  /** Called when transition ends */
  onTransitionEnd?: () => void;

  /** Called when transition starts */
  onTransitionStart?: () => void;

  /** If true, collapsed content is kept in the DOM and hidden with `display: none` styles */
  keepMounted?: boolean;
}

interface GetCollapsePropsInput {
  style?: CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

interface GetCollapsePropsReturnValue {
  'aria-hidden': boolean;
  inert: boolean;
  ref: React.RefCallback<HTMLDivElement>;
  onTransitionEnd: (event: React.TransitionEvent<Element>) => void;
  style: React.CSSProperties;
}

type UseCollapseState = 'entering' | 'entered' | 'exiting' | 'exited';

interface UseCollapseReturnValue {
  state: UseCollapseState;
  getCollapseProps: (input?: GetCollapsePropsInput) => GetCollapsePropsReturnValue;
}

function useCollapse(input: UseCollapseInput): UseCollapseReturnValue;
```

## Exported types

The `UseCollapseInput`, `UseCollapseState`, and `UseCollapseReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseCollapseInput, UseCollapseState, UseCollapseReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useColorScheme
Package: @mantine/hooks
Import: import { UseColorScheme } from '@mantine/hooks';

## Usage

The `use-color-scheme` hook returns the preferred OS color scheme value (`dark` or `light`)
and subscribes to changes:

```tsx
import { Badge } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

function Demo() {
  const colorScheme = useColorScheme();

  return (
    <Badge color={colorScheme === 'dark' ? 'blue' : 'teal'} variant="filled">
      Your system color scheme is {colorScheme}
    </Badge>
  );
}
```


## Limitations

`use-color-scheme` uses [use-media-query](https://mantine.dev/llms/hooks-use-media-query.md) under the hood.
It relies on the `window.matchMedia()` [API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
and always returns the specified initial value (first argument, `light` by default)
if the API is not available (for example, during server-side rendering).

```tsx
// returns 'dark' on server side
// returns computed value on client side after mount
const colorScheme = useColorScheme('dark');
```

## Get initial value in effect

By default, to support server-side rendering, `use-color-scheme` does not
calculate the initial value on the first render during state initialization.
Instead, the value is calculated in `useEffect` and updated after the parent
component mounts.

If your application does not have server-side rendering, you can enable
immediate calculation of the initial value by changing the `getInitialValueInEffect` option:

```tsx
const colorScheme = useColorScheme('light', { getInitialValueInEffect: false });
```

## Definition

```tsx
interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

type UseColorSchemeValue = 'dark' | 'light';

function useColorScheme(
  initialValue?: UseColorSchemeValue,
  options?: UseMediaQueryOptions,
): UseColorSchemeValue
```

## Exported types

The `UseColorSchemeValue` and `UseMediaQueryOptions` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseColorSchemeValue, UseMediaQueryOptions } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useCounter
Package: @mantine/hooks
Import: import { UseCounter } from '@mantine/hooks';

## Usage

```tsx
import { Group, Button, Text } from '@mantine/core';
import { useCounter } from '@mantine/hooks';

function Demo() {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });

  return (
    <>
      <Text>Count: {count}</Text>
      <Group justify="center">
        <Button onClick={handlers.increment}>Increment</Button>
        <Button onClick={handlers.decrement}>Decrement</Button>
        <Button onClick={handlers.reset}>Reset</Button>
        <Button onClick={() => handlers.set(5)}>Set 5</Button>
      </Group>
    </>
  );
}
```


## Definition

```tsx
interface UseCounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

interface UseCounterHandlers {
  increment: () => void;
  decrement: () => void;
  set: (value: number) => void;
  reset: () => void;
}

type UseCounterReturnValue = [number, UseCounterHandlers];

function useCounter(
  initialValue?: number,
  options?: UseCounterOptions,
): UseCounterReturnValue
```

## Exported types

The `UseCounterOptions`, `UseCounterHandlers`, and `UseCounterReturnValue` types are exported from the `@mantine/hooks` package;
you can import them in your application:

```tsx
import type { UseCounterOptions, UseCounterHandlers, UseCounterReturnValue } from '@mantine/hooks';
```


--------------------------------------------------------------------------------

### useDebouncedCallback
Package: @mantine/hooks
Import: import { UseDebouncedCallback } from '@mantine/hooks';

## Usage

The `use-debounced-callback` hook creates a debounced version of the given function,
delaying its execution until a specified time has elapsed since the last invocation.

```tsx
import { useState } from 'react';
import { Loader, Text, TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

function getSearchResults(query: string): Promise<{ id: number; title: string }[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        query.trim() === ''
          ? []
          : Array(5)
              .fill(0)
              .map((_, index) => ({ id: index, title: `${query} ${index + 1}` }))
      );
    }, 1000);
  });
}

function Demo() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback(async (query: string) => {
    setLoading(true);
    setSearchResults(await getSearchResults(query));
    setLoading(false);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

  return (
    <>
      <TextInput
        value={search}
        onChange={handleChange}
        placeholder="Search..."
        rightSection={loading && <Loader size={20} />}
      />
      {searchResults.map((result) => (
        <Text key={result.id} size="sm">
          {result.title}
        </Text>
      ))}
    </>
  );
}
```


## flushOnUnmount option

By default, the callback is not fired when the component unmounts.
If you want to execute the pending callback before the component unmounts,
set `flushOnUnmount: true`:

```tsx
import { useDebouncedCallback } from '@mantine/hooks';

const callback = useDebouncedCallback(
  () => console.log('Hello'),
  { delay: 1000, flushOnUnmount: true },
);
```

## leading option

Set `leading: true` to execute the callback immediately on the first call,
then ignore subsequent calls within the delay window:

```tsx
import { useDebouncedCallback } from '@mantine/hooks';

const callback = useDebouncedCallback(
  () => console.log('Hello'),
  { delay: 1000, leading: true },
);
```

## maxWait option

Use `maxWait` to guarantee the callback is executed at least once within the given time
window, even if calls keep arriving. This is useful for scenarios like search-as-you-type
where you want intermediate results during continuous input:

```tsx
import { useDebouncedCallback } from '@mantine/hooks';

const callback = useDebouncedCallback(
  (query: string) => fetchResults(query),
  { delay: 300, maxWait: 1000 },
);
```

## Flush and cancel

You can call the `flush` method to execute the debounced callback immediately,
or `cancel` to discard the pending call:

```tsx
import { useDebouncedCallback } from '@mantine/hooks';

const callback = useDebouncedCallback(() => console.log('Hello'), 1000);

callback.flush(); // immediately executes the pending callback
callback.cancel(); // discards the pending callback
callback.isPending(); // returns true if a call is waiting to execute
```

