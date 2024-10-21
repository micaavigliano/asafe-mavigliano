import React from 'react';
import { fireEvent, render, waitFor } from "@testing-library/react";
import { createUser, Form } from "../src/app/container/auth/Form";
const { expect, describe, it } = require('@jest/globals');
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react'
import '@testing-library/jest-dom';

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe("Form", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    jest.clearAllMocks();
  });

  it('exists', () => {
    const { getByTestId } = render(<Form />);
    const formElement = getByTestId('form-container');
    expect(formElement).toBeInTheDocument();
  });

  it('successfully creates a user and returns data', async() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, userId: '12345' }),
      })
    ) as jest.Mock;

    const result = await createUser('test@example.com', 'password123');

    expect(global.fetch).toHaveBeenCalledWith('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(result).toEqual({ success: true, userId: '12345' });
  });

  it('returns error when there is no data', async() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      })
    ) as jest.Mock;

    await expect(createUser('test@example.com', 'password123')).rejects.toThrow(
      'Invalid credentials'
    );

    expect(global.fetch).toHaveBeenCalledWith('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('changes the state when clicking the button', () => {
    const { getByText, getByTestId, queryByText } = render(<Form />);

    expect(getByTestId('button-switch')).toBeInTheDocument();
    const btnSignUp = getByTestId('btn-signup');
    fireEvent.click(btnSignUp);
    expect(getByText('Sign up')).toBeInTheDocument();
    expect(queryByText('Login')).not.toBeInTheDocument();
    fireEvent.click(btnSignUp);
    expect(queryByText('Sign up')).not.toBeInTheDocument();
  });
  
  it('shows an error message', async() => {
    const { getByLabelText, getByTestId } = render(<Form />);

    const emailInput = getByLabelText(/your email/i);
    const passwordInput = getByLabelText(/your password/i);
    const submitButton = getByTestId('button-switch');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByTestId('error-msg')).toHaveTextContent('Password must be at least 7 characters long.');
    });
  });

  it('shows an error message when there is no email or password', async () => {
    const {getByLabelText, getByTestId} = render(<Form />);
    const inputEmail = getByLabelText(/your email/i);
    const inputPassword = getByLabelText(/your password/i);
    const submitButton = getByTestId('button-switch');

    fireEvent.change(inputEmail, { target: { value: '' } });
    fireEvent.change(inputPassword, { target: { value: 'short' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByTestId('error-msg')).toHaveTextContent('Please provide both email and password.');
    })
  });
});