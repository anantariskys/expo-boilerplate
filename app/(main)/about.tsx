import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';

export default function AboutRoute() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>ini screens about contohna</Text>
    </View>
  );
}

import { theme } from '@/src/theme';

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: theme.typography.sizes.l, fontWeight: theme.typography.weights.medium as any },
});
