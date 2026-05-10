/**
 * Catppuccin — Soothing pastel theme for the high-spirited!
 *
 * Light mode: Catppuccin Latte
 * Dark mode:  Catppuccin Frappé
 *
 * @see https://catppuccin.com/palette
 */

// ═══════════════════════════════════════════════════════
//  Catppuccin Latte (Light)
// ═══════════════════════════════════════════════════════

const latte = {
  rosewater: '#dc8a78',
  flamingo:  '#dd7878',
  pink:      '#ea76cb',
  mauve:     '#8839ef',
  red:       '#d20f39',
  maroon:    '#e64553',
  peach:     '#fe640b',
  yellow:    '#df8e1d',
  green:     '#40a02b',
  teal:      '#179299',
  sky:       '#04a5e5',
  sapphire:  '#209fb5',
  blue:      '#1e66f5',
  lavender:  '#7287fd',
  text:      '#4c4f69',
  subtext1:  '#5c5f77',
  subtext0:  '#6c6f85',
  overlay2:  '#7c7f93',
  overlay1:  '#8c8fa1',
  overlay0:  '#9ca0b0',
  surface2:  '#acb0be',
  surface1:  '#bcc0cc',
  surface0:  '#ccd0da',
  base:      '#eff1f5',
  mantle:    '#e6e9ef',
  crust:     '#dce0e8',
} as const;

// ═══════════════════════════════════════════════════════
//  Catppuccin Frappé (Dark)
// ═══════════════════════════════════════════════════════

const frappe = {
  rosewater: '#f2d5cf',
  flamingo:  '#eebebe',
  pink:      '#f4b8e4',
  mauve:     '#ca9ee6',
  red:       '#e78284',
  maroon:    '#ea999c',
  peach:     '#ef9f76',
  yellow:    '#e5c890',
  green:     '#a6d189',
  teal:      '#81c8be',
  sky:       '#99d1db',
  sapphire:  '#85c1dc',
  blue:      '#8caaee',
  lavender:  '#babbf1',
  text:      '#c6d0f5',
  subtext1:  '#b5bfe2',
  subtext0:  '#a5adce',
  overlay2:  '#949cbb',
  overlay1:  '#838ba7',
  overlay0:  '#737994',
  surface2:  '#626880',
  surface1:  '#51576d',
  surface0:  '#414559',
  base:      '#303446',
  mantle:    '#292c3c',
  crust:     '#232634',
} as const;

// ═══════════════════════════════════════════════════════
//  Mantine Theme Colors
//  Map Catppuccin accent colors to Mantine's named slots
// ═══════════════════════════════════════════════════════

/**
 * Each Mantine color needs 10 shades (0–9).
 * We generate these by interpolating from surface0 → base → accent
 * so they feel natural in each palette.
 */
function buildShades(light: string, mid: string, accent: string): string[] {
  // shades 0–2: light blend toward accent
  // shades 3–6: mid blend
  // shades 7–9: deep accent
  return [
    mixColors(light, accent, 0.10),
    mixColors(light, accent, 0.20),
    mixColors(mid,  accent, 0.15),
    mixColors(mid,  accent, 0.30),
    mixColors(mid,  accent, 0.45),
    mixColors(mid,  accent, 0.60),
    mixColors(mid,  accent, 0.75),
    mixColors(accent, mid, 0.15),
    mixColors(accent, mid, 0.05),
    accent,
  ];
}

/**
 * Simple hex color interpolation.
 * Returns color = base * (1 - t) + target * t
 */
function mixColors(base: string, target: string, t: number): string {
  const b = hexToRgb(base);
  const g = hexToRgb(target);
  const r = Math.round(b.r + (g.r - b.r) * t);
  const gv = Math.round(b.g + (g.g - b.g) * t);
  const bv = Math.round(b.b + (g.b - b.b) * t);
  return rgbToHex(r, gv, bv);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

// ═══════════════════════════════════════════════════════
//  Build Mantine-compatible color maps
// ═══════════════════════════════════════════════════════

const catppuccinColors = {
  // Catppuccin accent colors mapped to Mantine named colors
  rosewater: buildShades(latte.surface0, latte.base, latte.rosewater),
  flamingo:  buildShades(latte.surface0, latte.base, latte.flamingo),
  pink:      buildShades(latte.surface0, latte.base, latte.pink),
  mauve:     buildShades(latte.surface0, latte.base, latte.mauve),
  red:       buildShades(latte.surface0, latte.base, latte.red),
  maroon:    buildShades(latte.surface0, latte.base, latte.maroon),
  peach:     buildShades(latte.surface0, latte.base, latte.peach),
  yellow:    buildShades(latte.surface0, latte.base, latte.yellow),
  green:     buildShades(latte.surface0, latte.base, latte.green),
  teal:      buildShades(latte.surface0, latte.base, latte.teal),
  sky:       buildShades(latte.surface0, latte.base, latte.sky),
  sapphire:  buildShades(latte.surface0, latte.base, latte.sapphire),
  blue:      buildShades(latte.surface0, latte.base, latte.blue),
  lavender:  buildShades(latte.surface0, latte.base, latte.lavender),
} as const;

// ═══════════════════════════════════════════════════════
//  Exports
// ═══════════════════════════════════════════════════════

export { latte, frappe, catppuccinColors };
