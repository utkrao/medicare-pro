export interface AuthState {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}
