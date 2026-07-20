import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/src/components/Button';
import { Input } from '@/src/components/Input';
import { useTheme } from '@/src/hooks/useTheme';
import { useLogin } from '../hooks/useLogin';
import { LoginCredentials } from '../types';

export function LoginForm() {
  const { colors, spacing } = useTheme();
  const { login, isLoading, error: apiError } = useLogin();
  const { t } = useTranslation();

  const loginSchema = z.object({
    email: z.string().email(t('validation.emailInvalid')),
    password: z.string().min(6, t('validation.passwordMin')),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginCredentials) => login(data);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text, marginBottom: spacing.l }]}>{t('login.title')}</Text>
      
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t('login.emailPlaceholder')}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors.email?.message}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={t('login.passwordPlaceholder')}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors.password?.message}
            secureTextEntry
          />
        )}
      />

      {apiError && <Text style={{ color: colors.danger, marginBottom: spacing.s, textAlign: 'center' }}>{apiError}</Text>}

      <Button 
        title={isLoading ? t('login.loggingInButton') : t('login.signInButton')} 
        onPress={handleSubmit(onSubmit)} 
        disabled={isLoading}
      />
    </View>
  );
}

import { theme } from '@/src/theme';

const styles = StyleSheet.create({
  container: { width: '100%', padding: theme.spacing.l },
  title: { fontSize: theme.typography.sizes.xl, fontWeight: theme.typography.weights.bold as any, textAlign: 'center' },
});
