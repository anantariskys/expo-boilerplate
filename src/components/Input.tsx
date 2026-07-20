import React from 'react';
import { TextInput, TextInputProps, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={{ marginBottom: error ? spacing.xs : spacing.m }}>
      {label && <Text style={[styles.label, { color: colors.text, marginBottom: spacing.xs }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          { 
            borderColor: error ? colors.danger : colors.border, 
            color: colors.text,
            backgroundColor: colors.background
          },
          style
        ]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
      {error && <Text style={{ color: colors.danger, marginTop: spacing.xs, fontSize: 12 }}>{error}</Text>}
    </View>
  );
}

import { theme } from '../theme';

const styles = StyleSheet.create({
  label: { 
    fontSize: theme.typography.sizes.s, 
    fontWeight: theme.typography.weights.medium 
  },
  input: { 
    borderWidth: 1, 
    borderRadius: theme.radius.m, 
    padding: theme.spacing.sm, 
    fontSize: theme.typography.sizes.m 
  },
});
