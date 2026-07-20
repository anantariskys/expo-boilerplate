import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radius } from './radius';

export const theme = {
  colors,
  spacing,
  typography,
  radius,
};

// Tipe global untuk theme agar autocomplete jalan dengan baik
export type Theme = typeof theme;
