import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { createRoot } from 'react-dom/client';
import {
  MantineProvider,
  createTheme,
} from '@mantine/core';
import type { MantineColorsTuple } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { App } from './App';
import { catppuccinColors, latte } from './theme/catppuccin';

// ═══════════════════════════════════════════════════════
//  Mantine Theme — Catppuccin Latte (light) / Frappé (dark)
// ═══════════════════════════════════════════════════════

const theme = createTheme({
  primaryColor: 'yellow',
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',

  colors: {
    // Catppuccin accent colors (10 shades each)
    rosewater: catppuccinColors.rosewater as unknown as MantineColorsTuple,
    flamingo:  catppuccinColors.flamingo  as unknown as MantineColorsTuple,
    pink:      catppuccinColors.pink      as unknown as MantineColorsTuple,
    mauve:     catppuccinColors.mauve     as unknown as MantineColorsTuple,
    red:       catppuccinColors.red       as unknown as MantineColorsTuple,
    maroon:    catppuccinColors.maroon    as unknown as MantineColorsTuple,
    peach:     catppuccinColors.peach     as unknown as MantineColorsTuple,
    yellow:    catppuccinColors.yellow    as unknown as MantineColorsTuple,
    green:     catppuccinColors.green     as unknown as MantineColorsTuple,
    teal:      catppuccinColors.teal      as unknown as MantineColorsTuple,
    sky:       catppuccinColors.sky       as unknown as MantineColorsTuple,
    sapphire:  catppuccinColors.sapphire  as unknown as MantineColorsTuple,
    blue:      catppuccinColors.blue      as unknown as MantineColorsTuple,
    lavender:  catppuccinColors.lavender  as unknown as MantineColorsTuple,
  },

  // Light mode (Catppuccin Latte)
  white: latte.base,
  black: latte.text,

  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '700',
  },

  defaultRadius: 'md',

  components: {
    AppShell: {
      defaultProps: {
        header: { height: 60 },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <MantineProvider
    theme={theme}
    defaultColorScheme="dark"
  >
    <Notifications position="top-right" />
    <App />
  </MantineProvider>
);
