import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LoginForm } from '../components/LoginForm';
import { useTheme } from '@/src/hooks/useTheme';

export function LoginScreen() {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.card, { backgroundColor: colors.background }]}>
        <Text style={[styles.header, { color: colors.text, marginBottom: spacing.l }]}>
          Welcome Back
        </Text>
        <LoginForm />
      </View>
    </View>
  );
}

import { theme } from '@/src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.l,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold as any,
    textAlign: 'center',
  },
});
