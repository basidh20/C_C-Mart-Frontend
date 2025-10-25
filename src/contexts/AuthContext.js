import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI, usersAPI } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token and load user
  useEffect(() => {
    if (state.token) {
      loadUser();
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.token]);

  // Load user data
  const loadUser = async () => {
    try {
  const res = await authAPI.getMe();
  dispatch({ type: 'LOAD_USER', payload: res.data });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await authAPI.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      toast.success('Login successful!');
      return { success: true, user: res.data.user };
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
  const errorPayload = error.response?.data;
  const message = typeof errorPayload === 'string' ? errorPayload : errorPayload?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await authAPI.register(userData);
      // Don't auto-login after registration
      dispatch({ type: 'SET_LOADING', payload: false });
      toast.success('Registration successful! Please log in.');
      return { success: true, user: res.data.user };
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
      const errorPayload = error.response?.data;
      const message = typeof errorPayload === 'string' ? errorPayload : errorPayload?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Logout user
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const res = await usersAPI.updateProfile(userData);
      dispatch({ type: 'LOAD_USER', payload: res.data.data });
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    loadUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
