import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { App } from './App';

const theme = createTheme({
  primaryColor: 'yellow',
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
});

export default function Main() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications position="top-right" />
      <App />
    </MantineProvider>
  );
}
