import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, UserData, LoginCredentials } from '@/types/auth';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from '@/firebase/config';

interface AuthStore extends AuthState {
  loginWithEmail: (credentials: LoginCredentials) => Promise<void>;
  signupWithEmail: (credentials: LoginCredentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const mapFirebaseUser = (user: import('firebase/auth').User): UserData => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true, // Start loading until auth state is determined
      isAuthenticated: false,
      error: null,

loginWithEmail: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const result = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const userData = mapFirebaseUser(result.user);
          set({ user: userData, isAuthenticated: true, isLoading: false });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Login failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      signupWithEmail: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const result = await createUserWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const userData = mapFirebaseUser(result.user);
          set({ user: userData, isAuthenticated: true, isLoading: false });
        } catch (error) {
          const message = 
            error instanceof Error ? error.message : 'Signup failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const userData = mapFirebaseUser(result.user);
          set({ user: userData, isAuthenticated: true, isLoading: false });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Google login failed';
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await firebaseSignOut(auth);
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
      // Only persist user data, not auth flags that should come from Firebase
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);

export const initializeAuthListener = () => {
  const { setUser, setLoading } = useAuthStore.getState();
  setLoading(true);
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(mapFirebaseUser(user));
    } else {
      setUser(null);
    }
    setLoading(false);
  });
};

