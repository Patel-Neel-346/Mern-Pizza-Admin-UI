import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from './Login';
describe('login here', () => {
  it('should render with required fields', () => {
    //AAA format here
    render(<Login />);

    //getBt->throws error
    //findBy->Async
    //queryBy->same as get but not throw error just return null
    expect(screen.getByText(/Sign in/)).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

    expect(
      screen.getByRole('checkbox', { name: 'Remember-Me' }),
    ).toBeInTheDocument();

    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
  });
});
