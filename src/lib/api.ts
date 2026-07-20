import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from '../config/env';

/**
 * Konfigurasi default untuk instance Axios.
 */
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
 * Berguna untuk menyisipkan token (Authorization) sebelum request dikirim.
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Contoh penambahan token:
    // const token = await AsyncStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Berguna untuk menangani error secara global, misalnya auto logout jika token expired (401).
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error, e.g. redirect to Login
      console.warn('Unauthorized access - perhaps redirect to login?');
    }
    return Promise.reject(error);
  }
);
