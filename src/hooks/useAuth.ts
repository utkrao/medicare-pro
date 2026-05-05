import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { user, isLoading, isAuthenticated, error, loginWithEmail, loginWithGoogle, logout, clearError } = useAuthStore();

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    loginWithEmail,
    loginWithGoogle,
    logout,
    clearError,
  };
};
