import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback(async (email, password) => {
    const { data } = await axiosInstance.post('/auth/login', { email, password });
    window.__agrivision_access_token = data.data.accessToken;
    setUser(data.data.user);
    return data.data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const { data } = await axiosInstance.post('/auth/register', payload);
    window.__agrivision_access_token = data.data.accessToken;
    setUser(data.data.user);
    return data.data.user;
  }, []);

  const logout = useCallback(async () => {
    await axiosInstance.post('/auth/logout');
    window.__agrivision_access_token = null;
    setUser(null);
  }, []);

  const forgotPassword = useCallback(async (email) => {
    const { data } = await axiosInstance.post('/auth/forgot-password', { email });
    return data.message;
  }, []);

  const resetPassword = useCallback(async ({ email, otp, newPassword }) => {
    const { data } = await axiosInstance.post('/auth/reset-password', {
      email,
      otp,
      newPassword,
    });
    return data.message;
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const { data } = await axiosInstance.put('/users/profile', payload);
    setUser(data.data.user);
    return data.data.user;
  }, []);

  // On app load, try to silently refresh using the httpOnly cookie
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const { data } = await axiosInstance.post('/auth/refresh');
        window.__agrivision_access_token = data.data.accessToken;
        const me = await axiosInstance.get('/auth/me');
        setUser(me.data.data.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
