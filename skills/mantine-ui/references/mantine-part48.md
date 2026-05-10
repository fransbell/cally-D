## Modal props

You can pass props down to the [Modal](https://mantine.dev/llms/core-modal.md) component by adding them to the
argument of every `modals.x` function. Example of setting the `radius`, `size`, and `withCloseButton`
props:

```tsx
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  const openModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    size: 'sm',
    withCloseButton: false,
    children: (
      <Text size="sm">
        This action is so important that you are required to confirm it with a modal. Please click
        one of these buttons to proceed.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirmed'),
  });

  return <Button onClick={openModal}>Open confirm modal</Button>;
}
```


## Dynamic content and the modals manager

The modals manager allows you to dynamically update the content and properties of both standard and context modals after they are opened.

To update regular modals, use the `modals.updateModal` function:

```tsx
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

function Demo() {
  return (
    <Button
      onClick={() => {
        const modalId = modals.open({
          title: 'Initial Modal Title',
          children: <Text>This text will update in 2 seconds.</Text>,
        });

        setTimeout(() => {
          modals.updateModal({
            modalId,
            title: 'Updated Modal Title',
            children: (
              <Text size="sm" c="dimmed">
                This is the updated content of the modal.
              </Text>
            ),
          });
        }, 2000);
      }}
    >
      Open updating modal
    </Button>
  );
}
```


Context modals can also be updated dynamically using `modals.updateContextModal`:

```tsx
import { Button, Text, Stack, Center, Loader } from '@mantine/core';
import { modals, ContextModalProps, ModalsProvider } from '@mantine/modals';
import { CheckIcon } from '@phosphor-icons/react';

const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string, loading: boolean }>) => (
  <>
    <Stack>
      <Text size="sm">{innerProps.modalBody}</Text>
      <Center>
        {innerProps.loading ? (
          <Loader size={32}/>
        ): (
          <CheckIcon size={23} color="var(--mantine-color-teal-6)" />
        )}
      </Center>
    </Stack>
    <Button fullWidth mt="md" disabled={innerProps.loading} onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);

function Demo() {
  return (
    <ModalsProvider
      modals={{ demonstration: TestModal /* ...other modals */ }}
    >
      <Button
        onClick={() => {
          const modalId = modals.openContextModal({
            modal: 'asyncDemonstration',
            title: 'Processing...',
            closeOnEscape: false,
            closeOnClickOutside: false,
            closeButtonProps:{ disabled:true },
            innerProps: {
              modalBody:
                'You cannot close this modal until 2 seconds have passed.',
              loading: true,
            },
          });

          setTimeout(() => {
            modals.updateContextModal({
              modalId,
              title: "Processing Complete!",
              closeOnEscape: true,
              closeOnClickOutside: true,
              closeButtonProps:{ disabled: false },
              innerProps: {
                modalBody:
                  'You can now close the modal.',
                loading: false,
              },
            })
          }, 2000);
        }}
      >
        Open updating context modal
      </Button>
    </ModalsProvider>
  );
}
```



#### Props

**Modals.Provider props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Your app |
| labels | ConfirmLabels | - | Confirm modal labels |
| modalProps | ModalSettings | - | Shared Modal component props, applied for every modal |
| modals | Record<string, FC<ContextModalProps<any>>> | - | Predefined modals |


--------------------------------------------------------------------------------

### Notifications system
Package: @mantine/notifications
Import: import { Notifications system } from '@mantine/notifications';
Description: Mantine notifications system

## Installation

```bash
yarn add @mantine/notifications
```

```bash
npm install @mantine/notifications
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import notifications styles after core package styles
import '@mantine/notifications/styles.css';
```

Add the `Notifications` component anywhere in your application. Note that:

* It is required to render the `Notifications` component inside [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md)
* You do not need to wrap your application with the `Notifications` component – it is not a provider, it is a regular component
* You should not render multiple `Notifications` components – if you do that, your notifications will be duplicated

```tsx
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

function Demo() {
  return (
    <MantineProvider>
      <Notifications />
      {/* Your app here */}
    </MantineProvider>
  );
}
```

All set! You can now use all notification system features.

```tsx
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

function Demo() {
  return (
    <Button
      onClick={() =>
        notifications.show({
          title: 'Default notification',
          message: 'Do not forget to star Mantine on GitHub! 🌟',
        })
      }
    >
      Show notification
    </Button>
  );
}
```


## Do not forget to import styles

Have you followed the installation instructions above but something is not working
(`position` prop not working, notifications are stuck at the bottom)?
You've fallen into the trap of not importing notification styles!
To fix the issue, import notification styles at the root of your application:

```tsx
import '@mantine/notifications/styles.css';
```

## Functions

The `@mantine/notifications` package exports a `notifications` object with the following functions:

* `notifications.show` – adds a given notification to the notifications list or queue, depending on the current state and `limit`
* `notifications.hide` – removes a notification with the given `id` from the notifications state and queue
* `notifications.update` – updates a notification that was previously added to the state or queue
* `notifications.updateState` – executes a given callback with current notifications state and queue as an argument and updates state with the returned value
* `notifications.clean` – removes all notifications from the notifications state and queue
* `notifications.cleanQueue` – removes all notifications from the queue

All functions can be imported from the `@mantine/notifications` package and can be used in any part of your application:

```tsx
import { notifications } from '@mantine/notifications';
```

You can also import these functions separately:

```tsx
// alias functions
import {
  cleanNotifications, // notifications.clean
  cleanNotificationsQueue, // notifications.cleanQueue
  hideNotification, // notifications.hide
  showNotification, // notifications.show
  updateNotification, // notifications.update
  updateNotificationsState, // notifications.updateState
} from '@mantine/notifications';
```

## Notification props

`notifications.show` and `notifications.update` functions can be called with an object that has the following properties:

* `id` – notification id, it is used to update and remove notifications; by default, `id` is randomly generated
* `position` – notification position; by default, the value from the `position` prop of the `Notifications` component is used
* `withBorder` – determines whether the notification should have a border
* `withCloseButton` – determines whether the close button should be visible
* `onClose` – called when the notification is unmounted
* `onOpen` – called when the notification is mounted
* `autoClose` – defines timeout in ms after which the notification will be automatically closed; use `false` to disable auto close
* `message` – required notification body
* `color, icon, title, radius, className, style, loading` – props passed down to the [Notification](https://mantine.dev/llms/core-notification.md) component

All properties except `message` are optional.

```tsx
import { XIcon } from '@phosphor-icons/react';
import { notifications } from '@mantine/notifications';

// Bare minimum – message is required for all notifications
notifications.show({ message: 'Hello' });

// Most used notification props
notifications.show({
  id: 'hello-there',
  position: 'bottom-center',
  withCloseButton: true,
  onClose: () => console.log('unmounted'),
  onOpen: () => console.log('mounted'),
  autoClose: 5000,
  title: "You've been compromised",
  message: 'Leave the building immediately',
  color: 'red',
  icon: <XIcon />,
  className: 'my-notification-class',
  style: { backgroundColor: 'red' },
  loading: false,
});
```

Notifications preview (`message` prop used as `children`):

```tsx
import { Notification } from '@mantine/core';

function Demo() {
  return (
    <Notification loading={false} withCloseButton={true} withBorder={false} color="blue" radius="md" title="We notify you that" children="You are now obligated to give a star to Mantine project on GitHub">
      {{children}}
    </Notification>
  );
}
```


## Customize notification styles

You can use `style`, `className` or [Styles API](https://mantine.dev/llms/styles-styles-api.md) `classNames`, `styles` props to customize notification styles.
Usually, it is better to override [Notification](https://mantine.dev/llms/core-notification.md) styles with `classNames` prop in the [theme object](https://mantine.dev/llms/theming-theme-object.md).

```tsx
// Demo.tsx
import { Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() =>
          notifications.show({
            title: 'Notification with custom styles',
            message: 'It is default blue',
            classNames: classes,
          })
        }
      >
        Default notification
      </Button>

      <Button
        color="red"
        onClick={() =>
          notifications.show({
            color: 'red',
            title: 'Notification with custom styles',
            message: 'It is red',
            classNames: classes,
          })
        }
      >
        Error notification
      </Button>
    </Group>
  );
}

// Demo.module.css
.root {
  background-color: var(--notification-color, var(--mantine-primary-color-filled));

  &::before {
    background-color: var(--mantine-color-white);
  }
}

.description,
.title {
  color: var(--mantine-color-white);
}

.closeButton {
  color: var(--mantine-color-white);

  @mixin hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
```


## Notifications container position

You can define the notification position in the `notifications.show` function. Possible `position` values:

* `top-left`
* `top-right`
* `top-center`
* `bottom-left`
* `bottom-right`
* `bottom-center`

```tsx
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

const positions = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'top-center',
  'bottom-center',
] as const;

function Demo() {
  const buttons = positions.map((position) => (
    <Button
      key={position}
      onClick={() =>
        notifications.show({
          title: `Notification at ${position}`,
          message: `Notification at ${position} message`,
          position,
        })
      }
    >
      {position}
    </Button>
  ));

  return <Group>{buttons}</Group>;
}
```


The `position` can be defined on the `Notifications` component.
In the following example, notifications will be displayed in the top right corner of the screen
if `position` is not defined in the `notifications.show` function:

```tsx
import { Notifications } from '@mantine/notifications';

function Demo() {
  return <Notifications position="top-right" zIndex={1000} />;
}
```

## Limit and queue

You can limit the maximum number of notifications that are displayed at a time by setting
the `limit` prop on `Notifications`:

```tsx
import { Notifications } from '@mantine/notifications';

function Demo() {
  return <Notifications limit={5} />;
}
```

All notifications added after the `limit` was reached are added to the queue
and displayed when a notification from the current state is hidden.

```tsx
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

function Demo() {
  return (
    <Button
      onClick={() => {
        Array(10).fill(0).forEach((_, index) => {
          setTimeout(() => {
            notifications.show({
              title: `Notification ${index + 1}`,
              message: 'Most notifications are added to queue',
            });
          }, 200 * index);
        });
      }}
    >
      Show 10 notifications
    </Button>
  );
}
```


## Remove notifications from state and queue

To remove a specific notification from state or queue, use the `notifications.hide` function:

```tsx
import { notifications } from '@mantine/notifications';

const id = notifications.show({ message: 'Hello!' });
notifications.hide(id);
```

Use the `notifications.cleanQueue` function to remove all notifications from the queue and
`notifications.clean` to remove all notifications both from the state and queue:

```tsx
import { Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() => {
          Array(10)
            .fill(0)
            .forEach((_, index) => {
              notifications.show({
                title: `Notification ${index + 1}`,
                message: 'Most notifications are added to queue',
                autoClose: false,
              });
            });
        }}
      >
        Show 10 notifications
      </Button>

      <Button variant="default" onClick={() => notifications.cleanQueue()}>
        Clean queue
      </Button>

      <Button variant="outline" color="red" onClick={() => notifications.clean()}>
        Clean all
      </Button>
    </Group>
  );
}
```


## Update notification

```tsx
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { CheckIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Button
      onClick={() => {
        const id = notifications.show({
          loading: true,
          title: 'Loading your data',
          message: 'Data will be loaded in 3 seconds, you cannot close this yet',
          autoClose: false,
          withCloseButton: false,
        });

        setTimeout(() => {
          notifications.update({
            id,
            color: 'teal',
            title: 'Data was loaded',
            message: 'Notification will close in 2 seconds, you can close this notification now',
            icon: <CheckIcon size={18} />,
            loading: false,
            autoClose: 2000,
          });
        }, 3000);
      }}
    >
      Show update notification
    </Button>
  );
}
```


## Auto close

You can configure the auto close timeout with `Notifications`:

```tsx
import { Notifications } from '@mantine/notifications';

// All notifications will be closed automatically in 4000ms
function Demo() {
  return <Notifications autoClose={4000} />;
}
```

Or per notification in the `notifications.show`/`notifications.update` functions:

```tsx
import { notifications } from '@mantine/notifications';

notifications.show({
  message: 'I will close in 500ms seconds',
  autoClose: 500,
});

notifications.update({
  id: 'hello',
  message: 'I will never close',
  autoClose: false,
});
```

`notifications.show` and `notifications.update` functions' `autoClose` prop has higher priority.

```tsx
import { Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() => notifications.show({ message: 'I will close in 4 seconds' })}
      >
        Notifications Provider timeout
      </Button>

      <Button
        onClick={() =>
          notifications.show({
            message: 'I will close in 500ms',
            autoClose: 500,
          })
        }
      >
        Closes in 500ms
      </Button>

      <Button
        onClick={() =>
          notifications.show({
            color: 'blue',
            title: 'I will never close',
            message: 'unless you click X',
            autoClose: false,
          })
        }
      >
        Never closes automatically
      </Button>
    </Group>
  );
}
```


## Pause auto close on hover

By default, hovering over any notification pauses the auto close timer of all
visible notifications. You can change this behavior with the `pauseResetOnHover` prop:

* `pauseResetOnHover="all"` (default) – pauses auto close for all notifications when any notification is hovered
* `pauseResetOnHover="notification"` – pauses auto close only for the hovered notification

```tsx
import { Notifications } from '@mantine/notifications';

function Demo() {
  return <Notifications pauseResetOnHover="notification" />;
}
```

## Subscribe to notifications state

You can subscribe to notification state changes with the `useNotifications` hook.
The hook returns an object with `notifications` and `queue` arrays. The `notifications`
array contains all notifications that are currently displayed; `queue` contains
notifications that are waiting to be displayed.

```tsx
function Demo() {
  const [counter, { increment }] = useCounter();
  const notificationsStore = useNotifications();

  const showNotification = () => {
    notifications.show({
      title: `Notification ${counter}`,
      message: 'Most notifications are added to queue',
    });

    increment();
  };

  return (
    <>
      <Button onClick={showNotification} mb="md">
        Show notification
      </Button>

      <Text>Notifications state</Text>
      <Code block>{JSON.stringify(notificationsStore.notifications, null, 2)}</Code>

      <Text mt="md">Notifications queue</Text>
      <Code block>{JSON.stringify(notificationsStore.queue, null, 2)}</Code>
    </>
  );
}
```



#### Props

**Notifications props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| autoClose | number \| false | - | Auto close timeout for all notifications in ms, `false` to disable auto close, can be overwritten for individual notifications in `notifications.show` function |
| containerWidth | string \| number | - | Notification width, cannot exceed 100% |
| limit | number | - | Maximum number of notifications displayed at a time, other new notifications will be added to queue |
| notificationMaxHeight | string \| number | - | Notification `max-height`, used for transitions |
| pauseResetOnHover | "all" \| "notification" | - | Determines which notifications should pause auto close on hover, `'all'` – pauses auto close for all notifications when any notification is hovered, `'notification'` – pauses auto close only for the hovered notification |
| portalProps | BasePortalProps | - | Props passed down to the `Portal` component |
| position | NotificationPosition | - | Notifications default position |
| store | NotificationsStore | - | Store for notifications state, can be used to create multiple instances of notifications system in your application |
| transitionDuration | number | - | Notification transition duration in ms |
| withinPortal | boolean | - | Determines whether notifications container should be rendered inside `Portal` |
| zIndex | string \| number | - | Notifications container z-index |


#### Styles API

Notifications component supports Styles API. With Styles API, you can customize styles of any inner element. Follow the documentation to learn how to use CSS modules, CSS variables and inline styles to get full control over component styles.

**Notifications selectors**

| Selector | Static selector | Description |
|----------|----------------|-------------|
| root | .mantine-Notifications-root | Notifications container, contains all notifications |
| notification | .mantine-Notifications-notification | Single notification |

**Notifications CSS variables**

| Selector | Variable | Description |
|----------|----------|-------------|
| root | --notifications-container-width | Controls notifications container `max-width` |
| root | --notifications-z-index | Controls notifications container `z-index` |


--------------------------------------------------------------------------------

### NavigationProgress
Package: @mantine/nprogress
Import: import { NavigationProgress } from '@mantine/nprogress';
Description: Navigation progress bar

## Installation

```bash
yarn add @mantine/nprogress
```

```bash
npm install @mantine/nprogress
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import nprogress styles after core package styles
import '@mantine/nprogress/styles.css';
```

## Setup NavigationProgress

Render the `NavigationProgress` component anywhere in your app within [MantineProvider](https://mantine.dev/llms/theming-mantine-provider.md):

```tsx
import { MantineProvider } from '@mantine/core';
import { NavigationProgress } from '@mantine/nprogress';

function Demo() {
  return (
    <MantineProvider>
      <NavigationProgress />
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Usage

```tsx
import { Button, Group } from '@mantine/core';
import { nprogress, NavigationProgress } from '@mantine/nprogress';

function Demo() {
  return (
    <>
      <NavigationProgress />
      <Group justify="center">
        <Button onClick={() => nprogress.start()}>Start</Button>
        <Button onClick={() => nprogress.stop()}>Stop</Button>
        <Button onClick={() => nprogress.increment()}>Increment</Button>
        <Button onClick={() => nprogress.decrement()}>Decrement</Button>
        <Button onClick={() => nprogress.set(50)}>Set 50%</Button>
        <Button onClick={() => nprogress.reset()}>Reset</Button>
        <Button onClick={() => nprogress.complete()}>Complete</Button>
      </Group>
    </>
  );
}
```



--------------------------------------------------------------------------------

### Spotlight
Package: @mantine/spotlight
Import: import { Spotlight } from '@mantine/spotlight';
Description: Command center for your application

## Installation

```bash
yarn add @mantine/spotlight
```

```bash
npm install @mantine/spotlight
```

After installation import package styles at the root of your application:

```tsx
import '@mantine/core/styles.css';
// ‼️ import spotlight styles after core package styles
import '@mantine/spotlight/styles.css';
```

## Usage

The `Spotlight` component can be used as a search or as a command center for your application.
It is used as a search on the mantine.dev website; you can trigger it with the `Ctrl + K` shortcut.
`Spotlight` is based on the [Modal](https://mantine.dev/llms/core-modal.md) component and supports most of its props.

```tsx
import { Button } from '@mantine/core';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { HouseIcon, GaugeIcon, FileTextIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';

const actions: SpotlightActionData[] = [
  {
    id: 'home',
    label: 'Home',
    description: 'Get to home page',
    onClick: () => console.log('Home'),
    leftSection: <HouseIcon size={24} />,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Get full information about current system status',
    onClick: () => console.log('Dashboard'),
    leftSection: <GaugeIcon size={24} />,
  },
  {
    id: 'documentation',
    label: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onClick: () => console.log('Documentation'),
    leftSection: <FileTextIcon size={24} />,
  },
];

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <MagnifyingGlassIcon size={20} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}
```


## Actions

The `@mantine/spotlight` package exports an object with actions that can be used to control the spotlight:

```tsx
import { spotlight } from '@mantine/spotlight';

spotlight.open(); // -> opens spotlight
spotlight.close(); // -> closes spotlight
spotlight.toggle(); // -> toggles spotlight opened state
```

These actions can be passed to event listeners or used anywhere in your application
(not limited to React components):

```tsx
import { Button } from '@mantine/core';
import { spotlight } from '@mantine/spotlight';

function Demo() {
  return <Button onClick={spotlight.open}>Open spotlight</Button>;
}
```

You can also import actions directly from the `@mantine/spotlight` package if you prefer this syntax:

```tsx
import {
  closeSpotlight,
  openSpotlight,
  toggleSpotlight,
} from '@mantine/spotlight';

openSpotlight(); // same as spotlight.open()
closeSpotlight(); // same as spotlight.close()
toggleSpotlight(); // same as spotlight.toggle()
```

## Spotlight store

The `spotlight` object documented above uses the default store; it works fine if you have only one spotlight
in your application. In case you need multiple spotlights, you need to create your own store for each of them:

```tsx
import { Button } from '@mantine/core';
import { createSpotlight, Spotlight } from '@mantine/spotlight';

// You can import `firstSpotlight` and `secondSpotlight` anywhere
// in your application and use `open`, `close` and `toggle` actions
// to control spotlight the same way as with default `spotlight` object
export const [firstStore, firstSpotlight] = createSpotlight();
export const [secondStore, secondSpotlight] = createSpotlight();

function Demo() {
  return (
    <>
      <Button onClick={firstSpotlight.open}>
        Open first spotlight
      </Button>
      <Button onClick={secondSpotlight.open}>
        Open second spotlight
      </Button>

      <Spotlight store={firstStore} actions={[]} />
      <Spotlight store={secondStore} actions={[]} />
    </>
  );
}
```

## Keyboard shortcuts

`Spotlight` uses the [use-hotkeys](https://mantine.dev/llms/hooks-use-hotkeys.md) hook to handle keyboard shortcuts.
By default, `Ctrl + K` and `Cmd + K` shortcuts are used to open spotlight; you can change them
with the `shortcut` prop:

```tsx
import { Spotlight } from '@mantine/spotlight';

function SingleShortcut() {
  return <Spotlight shortcut="mod + J" actions={[]} />;
}

// Same as on mantine.dev
function MultipleShortcuts() {
  return (
    <Spotlight shortcut={['mod + K', 'mod + P', '/']} actions={[]} />
  );
}

// Disable shortcut
function NoShortcut() {
  return <Spotlight shortcut={null} actions={[]} />;
}
```

## Limit prop

Use the `limit` prop to limit the maximum number of actions that can be displayed at a time.
Usually, 5–7 actions is a good number. The `limit` prop is crucial for performance in case
you have a lot of actions; it will prevent the spotlight from rendering all of them at once.

The example below renders 3000 actions, but only 7 of them are displayed at a time:

```tsx
import { Button } from '@mantine/core';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

const actions: SpotlightActionData[] = Array(3000)
  .fill(0)
  .map((_, index) => ({
    id: `action-${index}`,
    label: `Action ${index}`,
    description: `Action ${index} description`,
  }));

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        limit={7}
        searchProps={{
          leftSection: <MagnifyingGlassIcon size={20} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}
```


## Custom filter function

By default, `Spotlight` uses a simple filter that matches actions by `label`, `description`, and `keywords`.
You can customize the filtering logic by providing a custom `filter` function. The `filter` function
receives the search query and actions array, and should return filtered actions.

The custom `filter` function signature:

```tsx
type SpotlightFilterFunction = (
  query: string,
  actions: SpotlightActions[]
) => SpotlightActions[];
```

## Fuzzy search with fuse.js

You can implement fuzzy search using [fuse.js](https://fusejs.io/) library. This is useful if you want
to match actions even with typos or partial matches:

```tsx
import Fuse from 'fuse.js';
import { Button } from '@mantine/core';
import {
  Spotlight,
  SpotlightActionData,
  SpotlightFilterFunction,
  spotlight,
} from '@mantine/spotlight';
import { HouseIcon, GaugeIcon, FileTextIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';

const actions: SpotlightActionData[] = [
  {
    id: 'home',
    label: 'Home',
    description: 'Get to home page',
    onClick: () => console.log('Home'),
    leftSection: <HouseIcon size={24} />,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Get full information about current system status',
    onClick: () => console.log('Dashboard'),
    leftSection: <GaugeIcon size={24} />,
  },
  {
    id: 'documentation',
    label: 'Documentation',
    description: 'Visit documentation to learn more about all features',
    onClick: () => console.log('Documentation'),
    leftSection: <FileTextIcon size={24} />,
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Manage application preferences and configurations',
    onClick: () => console.log('Settings'),
    leftSection: <HouseIcon size={24} />,
  },
];

const fuzzySearchFilter: SpotlightFilterFunction = (query, searchActions) => {
  if (!query.trim()) {
    return searchActions;
  }

  const flatActions = searchActions.reduce<any[]>((acc, item) => {
    if ('actions' in item) {
      return [...acc, ...item.actions.map((action) => ({ ...action, group: item.group }))];
    }
    return [...acc, item];
  }, []);

  const fuse = new Fuse(flatActions, {
    keys: ['label', 'description'],
    threshold: 0.3,
    minMatchCharLength: 1,
  });

  const results = fuse.search(query).map((result) => result.item);

  const groups: Record<string, any> = {};
  const result: any[] = [];

  results.forEach((action) => {
    if (action.group) {
      if (!groups[action.group]) {
        groups[action.group] = { pushed: false, data: { group: action.group, actions: [] } };
      }
      groups[action.group].data.actions.push(action);
      if (!groups[action.group].pushed) {
        groups[action.group].pushed = true;
        result.push(groups[action.group].data);
      }
    } else {
      result.push(action);
    }
  });

  return result;
};

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>
      <Spotlight
        actions={actions}
        filter={fuzzySearchFilter}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <MagnifyingGlassIcon size={20} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}
```


## Scrollable actions list

By default, the `Spotlight` actions list is not scrollable. If you have a lot of actions that
you need to display at a time, set the `scrollable` and `maxHeight` props. Note that there are
caveats with both approaches:

* When the `scrollable` prop is not set, the actions list height is not limited and the spotlight
  body will grow to fit all actions. This can result in a very long spotlight body that will
  overflow the viewport. To prevent this, use the `limit` prop to define the maximum number of actions
  that can be displayed at a time. Usually, 5–7 actions is a good number.
* When the `scrollable` prop is set, the actions list height will always equal the value of the `maxHeight` prop
  (it will not shrink if there are not enough actions to fill the space). When there are more
  actions than can fit into the list, it will become scrollable. Scrolling logic is handled
  by the [ScrollArea](https://mantine.dev/llms/core-scroll-area.md) component.

In other words, if you want the actions list to shrink, do not set the `scrollable` prop and use the `limit`
prop. If you want the actions list to always have a fixed height, set the `scrollable` and `maxHeight` props.

```tsx
import { Button } from '@mantine/core';
import { Spotlight, SpotlightActionData, spotlight } from '@mantine/spotlight';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

const actions: SpotlightActionData[] = Array(100)
  .fill(0)
  .map((_, index) => ({
    id: `action-${index}`,
    label: `Action ${index}`,
    description: `Action ${index} description`,
  }));

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        scrollable
        maxHeight={350}
        searchProps={{
          leftSection: <MagnifyingGlassIcon size={20} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}
```


## Actions groups

`Spotlight` supports action groups; you can use them to group actions by category:

```tsx
import { Button } from '@mantine/core';
import { Spotlight, SpotlightActionData, SpotlightActionGroupData, spotlight } from '@mantine/spotlight';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
  {
    group: 'Pages',
    actions: [
      { id: 'home', label: 'Home page', description: 'Where we present the product' },
      { id: 'careers', label: 'Careers page', description: 'Where we list open positions' },
      { id: 'about-us', label: 'About us page', description: 'Where we tell what we do' },
    ],
  },

  {
    group: 'Apps',
    actions: [
      { id: 'svg-compressor', label: 'SVG compressor', description: 'Compress SVG images' },
      { id: 'base64', label: 'Base 64 converter', description: 'Convert data to base 64 format' },
      { id: 'fake-data', label: 'Fake data generator', description: 'Lorem ipsum generator' },
    ],
  },
];

function Demo() {
  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: <MagnifyingGlassIcon size={20} />,
          placeholder: 'Search...',
        }}
      />
    </>
  );
}
```


## Compound components

If you need more control over spotlight rendering and logic, use compound components.
Available components:

* `Spotlight.Root` – root component, should be used as a wrapper for all other components, accepts all props to customize logic
* `Spotlight.Search` – search input
* `Spotlight.ActionsList` – list of actions, required to wrap all actions and actions groups
* `Spotlight.Action` – action button
* `Spotlight.ActionsGroup` - group of actions
* `Spotlight.Empty` – empty state (nothing found)

```tsx
import { useState } from 'react';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { Button } from '@mantine/core';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

const data = ['Home', 'About us', 'Contacts', 'Blog', 'Careers', 'Terms of service'];

function Demo() {
  const [query, setQuery] = useState('');

  const items = data
    .filter((item) => item.toLowerCase().includes(query.toLowerCase().trim()))
    .map((item) => <Spotlight.Action key={item} label={item} />);

  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>

      <Spotlight.Root query={query} onQueryChange={setQuery}>
        <Spotlight.Search placeholder="Search..." leftSection={<MagnifyingGlassIcon />} />
        <Spotlight.ActionsList>
          {items.length > 0 ? items : <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}
```


For example, with the compound components pattern, you can customize action contents:

```tsx
import { useState } from 'react';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { Badge, Button, Center, Group, Text } from '@mantine/core';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    title: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
    new: true,
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    title: 'Carol Miller',
    description: 'One of the richest people on Earth',
    new: false,
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    title: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
    new: false,
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    title: 'Spongebob Squarepants',
    description: 'Not just a sponge',
    new: false,
  },
];

function Demo() {
  const [query, setQuery] = useState('');

  const items = data
  .filter((item) => item.title.toLowerCase().includes(query.toLowerCase().trim()))
  .map((item) => (
    <Spotlight.Action key={item.title} onClick={() => console.log(item)}>
      <Group wrap="nowrap" w="100%">
        {item.image && (
          <Center>
            <img src={item.image} alt={item.title} width={50} height={50} />
          </Center>
        )}

        <div style={{ flex: 1 }}>
          <Text>{item.title}</Text>

          {item.description && (
            <Text opacity={0.6} size="xs">
              {item.description}
            </Text>
          )}
        </div>

        {item.new && <Badge variant="default">new</Badge>}
      </Group>
    </Spotlight.Action>
  ));

  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>

      <Spotlight.Root query={query} onQueryChange={setQuery}>
        <Spotlight.Search placeholder="Search..." leftSection={<MagnifyingGlassIcon />} />
        <Spotlight.ActionsList>
          {items.length > 0 ? items : <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}
```


