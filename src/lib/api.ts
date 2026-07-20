import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from '../config/env';
import { useAuthStore } from '../store/useAuthStore';

export const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request Interceptor
 * Menyisipkan Token JWT ke setiap request secara otomatis.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Ambil token secara langsung dari Zustand (di luar React lifecycle)
    const token = useAuthStore.getState().token;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Menangkap error global, contohnya me-logout user jika token kadaluarsa (401).
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token tidak valid atau kadaluarsa -> Auto Logout
      console.warn('Unauthorized access - Auto logging out.');
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
