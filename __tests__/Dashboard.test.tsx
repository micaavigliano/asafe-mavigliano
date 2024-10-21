import React from 'react'
import { render, waitFor } from "@testing-library/react";
import Dashboard from '../src/app/container/dashboard/Dashboard';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('dashboard', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push,
      replace: jest.fn(),
      pathname: '/dashboard',
    });
    jest.clearAllMocks();
  });

  it('renders dashboard correctly', async() => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: 'test@example.com', name: 'Test User' } },
      status: 'authenticated',
    });

    const mockSession = {
      expires: '1',
      user: {
        email: 'test@example.com',
        name: 'Test User',
      },
    };

    const { getByTestId } = render(
      <SessionProvider session={mockSession}>
        <Dashboard />
      </SessionProvider>
    );

    await waitFor(() => {
      const dashboard = getByTestId('dashboard');
      expect(dashboard).toBeInTheDocument();
    });
  });

  it('redirects to /auth when unauthenticated', async() => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(
      <SessionProvider session={null}>
        <Dashboard />
      </SessionProvider>
    );

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/auth');
    });
  });
});