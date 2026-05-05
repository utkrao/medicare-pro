import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';
import './LoginPage.css';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { loginWithEmail, signupWithEmail, loginWithGoogle, isLoading, error, isAuthenticated, clearError } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = mode === 'signup' ? 'Password must be at least 6 characters' : 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    clearError();
    if (!validate()) return;

    try {
      if (mode === 'login') {
        await loginWithEmail({ email, password });
      } else {
        await signupWithEmail({ email, password });
      }
    } catch {
      // Error handled by store
    }
  };

  const handleGoogle = async () => {
    clearError();
    try {
      await loginWithGoogle();
    } catch {
      // Error handled by store
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'signup' : 'login');
    setFormErrors({});
  };

  const title = mode === 'login' ? 'Sign in to MediCare Pro' : 'Sign up for MediCare Pro';
  const buttonText = mode === 'login' ? 'Sign In' : 'Sign Up';

  return (
    <div className="login-page">
      <div className="login-page__panel">
        <section className="login-page__story">
          <span className="login-page__eyebrow">Healthcare SaaS</span>
          <h1 className="login-page__headline">Command center for patient operations</h1>
          <p className="login-page__lead">
            Clear hierarchy and responsive workflows for coordinators and clinicians.
          </p>
          <div className="login-page__metrics">
            <div>
              <strong>24/7</strong>
              <span>workflow visibility</span>
            </div>
            <div>
              <strong>12</strong>
              <span>active care records</span>
            </div>
            <div>
              <strong>4</strong>
              <span>product modules</span>
            </div>
          </div>
        </section>

        <div className="login-page__card">
          <div className="login-page__header">
            <span className="login-page__logo">MP</span>
            <h2 className="login-page__title">{title}</h2>
            <p className="login-page__subtitle">Secure access for hospital teams</p>
          </div>

          <div className="auth-tabs">
<Toggle 
              options={[
                { value: 'login', label: 'Sign In' },
                { value: 'signup', label: 'Sign Up' }
              ]}
              value={mode}
              onChange={toggleMode}
            />
          </div>

          <form onSubmit={handleSubmit} className="login-page__form">
            <Input
              label="Email Address"
              type="email"
              value={email}
  onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
              error={formErrors.email}
              placeholder="doctor@medicare.com"
              autoComplete={mode === 'login' ? "email" : "email"}
            />
            <Input
              label="Password"
              type="password"
              value={password}
  onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              error={formErrors.password}
              placeholder="Enter your password"
              autoComplete={mode === 'login' ? "current-password" : "new-password"}
            />

            {error && <div className="login-page__error">{error}</div>}

            <Button type="submit" isLoading={isLoading} className="login-page__submit">
              {buttonText}
            </Button>

            <div className="login-page__divider">
              <span>or continue with</span>
            </div>

            <Button type="button" variant="secondary" onClick={handleGoogle} isLoading={isLoading} disabled={isLoading}>
              <svg className="login-page__google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

