import { useState } from 'react';
import { useAuthStore } from '@/src/store/useAuthStore';
import { loginWithEmailAndPassword } from '../api/login';
import { LoginCredentials } from '../types';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await loginWithEmailAndPassword(credentials);
      // Simpan user dan token ke Global Store (Zustand)
      setAuth(data.user, data.token);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
