import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/src/components/Button';
import { useTheme } from '@/src/hooks/useTheme';
import { useLogin } from '../hooks/useLogin';
import { LoginCredentials } from '../types';

// 1. Definisi Skema Validasi Zod
const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export function LoginForm() {
  const { colors, spacing } = useTheme();
  const { login, isLoading, error: apiError } = useLogin();

  // 2. Integrasi React Hook Form + Zod
  const { control, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginCredentials) => {
    login(data);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text, marginBottom: spacing.l }]}>Login to App</Text>
      
      {/* Input Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={[
                styles.input, 
                { borderColor: errors.email ? colors.danger : colors.border, color: colors.text, marginBottom: errors.email ? spacing.xs : spacing.m }
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && <Text style={{ color: colors.danger, marginBottom: spacing.s, fontSize: 12 }}>{errors.email.message}</Text>}
          </>
        )}
      />

      {/* Input Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={[
                styles.input, 
                { borderColor: errors.password ? colors.danger : colors.border, color: colors.text, marginBottom: errors.password ? spacing.xs : spacing.m }
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              placeholderTextColor={colors.textMuted}
              secureTextEntry
            />
            {errors.password && <Text style={{ color: colors.danger, marginBottom: spacing.s, fontSize: 12 }}>{errors.password.message}</Text>}
          </>
        )}
      />

      {apiError && <Text style={{ color: colors.danger, marginBottom: spacing.s, textAlign: 'center' }}>{apiError}</Text>}

      <Button 
        title={isLoading ? 'Logging in...' : 'Sign In'} 
        onPress={handleSubmit(onSubmit)} 
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
});
