import { apiClient } from '@/src/lib/api';
import { LoginCredentials, AuthResponse } from '../types';

export const loginWithEmailAndPassword = async (data: LoginCredentials): Promise<AuthResponse> => {
  // Mock API call - Di aplikasi nyata, ganti dengan: 
  // return apiClient.post('/auth/login', data);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: '1', name: 'Developer', email: data.email },
        token: 'mock-jwt-token-12345',
      });
    }, 1000);
  });
};
