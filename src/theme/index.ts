import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  typography,
};

// Tipe global untuk theme agar autocomplete jalan dengan baik
export type Theme = typeof theme;
