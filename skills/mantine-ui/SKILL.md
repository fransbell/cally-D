---
name: mantine-ui
description: >
  Mantine UI component library reference and usage guide for React applications.
  Use this skill whenever you need to build UI components with Mantine, reference
  Mantine hooks, forms, or layout patterns, or when the user mentions "mantine",
  "Mantine UI", "mantine.dev", or asks about React component libraries for the
  cally-D project. This skill provides comprehensive documentation from the
  official Mantine llms.txt resource, split into manageable reference files.
---

# Mantine UI Skill

## What This Provides

Full documentation for Mantine UI — a comprehensive React component library.
The docs are split into reference files that can be loaded on demand based on
which components or features are needed for the current task.

## Reference Files

The Mantine documentation is split into 49 parts (~50KB each) for efficient
loading. Start with the index, then load specific parts as needed.

| File | Content |
|------|---------|
| `references/mantine-index.md` | Table of contents with links to all sections |
| `references/mantine-part1.md` — `part49.md` | Full Mantine docs split by section |

## How to Use

1. **Check the index first** — Read `references/mantine-index.md` to find which
   part contains the component or hook you need.
2. **Load only what's needed** — Don't load all 49 parts at once. Read only the
   relevant part(s) for the task at hand.
3. **Common components** you'll likely need early:
   - Part 1-5: Getting started, theming, layout (AppShell, Grid, Flex, Stack)
   - Parts with forms: TextInput, Select, Button, useForm
   - Parts with notifications: Notifications, modals

## Project Setup

When building a Mantine project with Vite + React, use these dependencies:

```json
{
  "dependencies": {
    "@mantine/core": "^7",
    "@mantine/hooks": "^7",
    "@mantine/form": "^7",
    "@mantine/notifications": "^7",
    "@emotion/react": "^11",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4",
    "postcss": "^8",
    "postcss-preset-mantine": "^1",
    "postcss-simple-vars": "^7",
    "typescript": "^5",
    "vite": "^5"
  }
}
```

## Key Patterns

### App Entry Point

```tsx
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

### PostCSS Config (required for Mantine styles)

```javascript
// postcss.config.cjs
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

## Quick Component Reference

For the full API details, load the relevant reference part file.

| Category | Components |
|----------|-----------|
| Layout | AppShell, Grid, Flex, Stack, Group, Container, SimpleGrid |
| Inputs | TextInput, Select, Checkbox, Switch, Slider, ColorInput |
| Buttons | Button, ActionIcon, CloseButton, CopyButton |
| Feedback | Notification, Alert, Loader, Progress, Skeleton |
| Overlay | Modal, Drawer, Popover, Tooltip, HoverCard |
| Navigation | Tabs, NavLink, Burger, Pagination, Breadcrumbs |
| Data Display | Table, Card, Badge, Avatar, Timeline, Accordion |
