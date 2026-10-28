import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from './AuthProvider';
import { Alert, Button, PasswordInput } from '@/components/ui';
import { FormField, FormInput } from '@/components/shared/forms';
import { emailSchema, passwordSchema } from '@/lib/validators';
type Mode = 'login' | 'register' | 'forgot' | 'reset';
const copy = {
  login: {
    title: 'Welcome back',
    description: 'Sign in to explore the demo workspace.',
    button: 'Start demo session',
  },
  register: {
    title: 'Create your account',
    description: 'A registration form pattern for your next project.',
    button: 'Create demo account',
  },
  forgot: {
    title: 'Forgot your password?',
    description: 'Preview the password recovery experience.',
    button: 'Preview recovery',
  },
  reset: {
    title: 'Set a new password',
    description: 'A reset form with confirmation validation.',
    button: 'Preview password reset',
  },
};
export function AuthForm({ mode }: { mode: Mode }) {
  const [complete, setComplete] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const needsPassword = mode !== 'forgot';
  const schema = z
    .object({
      name:
        mode === 'register' ? z.string().trim().min(2, 'Enter your name') : z.string().optional(),
      email: mode === 'reset' ? z.string().optional() : emailSchema,
      password: needsPassword ? passwordSchema : z.string().optional(),
      confirm:
        mode === 'register' || mode === 'reset'
          ? z.string().min(1, 'Confirm your password')
          : z.string().optional(),
    })
    .refine(
      (values) => !['register', 'reset'].includes(mode) || values.password === values.confirm,
      { path: ['confirm'], message: 'Passwords must match' },
    );
  type Values = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });
  const submit = (values: Values) => {
    if (mode === 'login' || mode === 'register') {
      login(values.email ?? 'demo@example.com', values.name || undefined);
      const next = params.get('next');
      navigate(next?.startsWith('/') && !next.startsWith('//') ? next : '/');
    } else setComplete(true);
  };
  const text = copy[mode];
  return (
    <>
      <span className="mb-4 inline-block text-xs font-bold tracking-widest text-accent">
        YOUR APP
      </span>
      <h1>{text.title}</h1>
      <p className="muted mb-7 mt-2">{text.description}</p>
      <Alert>No real account, email, or password is created. Use example details only.</Alert>
      {complete ? (
        <div className="mt-6 space-y-4">
          <Alert>
            {mode === 'forgot'
              ? 'Recovery preview complete. No email was sent.'
              : 'Reset preview complete. No password was changed.'}
          </Alert>
          {mode === 'forgot' && (
            <Link to="/auth/reset-password" className="btn">
              Preview reset form
            </Link>
          )}
          <Link to="/auth/login" className="block text-accent">
            Back to sign in
          </Link>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit(submit)} className="mt-6 space-y-5">
          {mode === 'register' && (
            <FormInput
              label="Full name"
              autoComplete="name"
              {...register('name')}
              error={errors.name?.message}
            />
          )}
          {mode !== 'reset' && (
            <FormInput
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
            />
          )}
          {needsPassword && (
            <FormField
              label={mode === 'reset' ? 'New password' : 'Password'}
              error={errors.password?.message}
            >
              {(field) => (
                <PasswordInput
                  {...register('password')}
                  {...field}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
              )}
            </FormField>
          )}
          {['register', 'reset'].includes(mode) && (
            <FormField label="Confirm password" error={errors.confirm?.message}>
              {(field) => (
                <PasswordInput {...register('confirm')} {...field} autoComplete="new-password" />
              )}
            </FormField>
          )}
          {mode === 'login' && (
            <Link className="block text-right text-xs text-accent" to="/auth/forgot-password">
              Forgot password?
            </Link>
          )}
          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {text.button}
          </Button>
          <p className="muted text-center text-sm">
            {mode === 'login' ? (
              <>
                New here?{' '}
                <Link to="/auth/register" className="text-accent">
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/auth/login" className="text-accent">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </form>
      )}
    </>
  );
}
