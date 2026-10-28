import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AuthProvider, useAuth } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
function LoginButton() {
  const { login } = useAuth();
  return <button onClick={() => login('demo@example.com')}>Demo login</button>;
}
function Fixture({ admin = false, initial = '/private' }: { admin?: boolean; initial?: string }) {
  return (
    <AuthProvider>
      <MemoryRouter initialEntries={[initial]}>
        <LoginButton />
        <Link to="/private">Open private page</Link>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route
            path="/private"
            element={
              <ProtectedRoute roles={admin ? ['admin'] : undefined}>
                <p>Private content</p>
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<p>Login screen</p>} />
          <Route path="/403" element={<p>Forbidden screen</p>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}
describe('ProtectedRoute', () => {
  it('redirects anonymous visitors without rendering private content', () => {
    render(<Fixture />);
    expect(screen.getByText('Login screen')).toBeVisible();
    expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  });
  it('rejects a signed-in member from an admin route', async () => {
    const user = userEvent.setup();
    render(<Fixture admin initial="/" />);
    await user.click(screen.getByRole('button', { name: 'Demo login' }));
    await user.click(screen.getByRole('link', { name: 'Open private page' }));
    expect(screen.getByText('Forbidden screen')).toBeVisible();
    expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  });
  it('allows a signed-in member to access a member route', async () => {
    const user = userEvent.setup();
    render(<Fixture initial="/" />);
    await user.click(screen.getByRole('button', { name: 'Demo login' }));
    await user.click(screen.getByRole('link', { name: 'Open private page' }));
    expect(screen.getByText('Private content')).toBeVisible();
  });
});
