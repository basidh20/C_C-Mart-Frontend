import apiClient from './apiClient';
import { User } from '../types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return await apiClient.post('/auth/login', credentials);
  },

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    return await apiClient.post('/auth/signup', userData);
  },

  async logout(): Promise<AuthResponse> {
    return await apiClient.post('/auth/logout', {});
  },
};