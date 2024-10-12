'use client'

import { FormEvent, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const createUser = async (email: string, password: string) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export function Form() {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const switchAuth = () => {
    setIsLogin((prevState) => !prevState);
    setErrorMessage(null);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;

    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    if (password.trim().length < 7) {
      setErrorMessage('Password must be at least 7 characters long.');
      return;
    }

    if (isLogin) {
      const result = await signIn('credentials', { 
        redirect: false,
        email,
        password
      });

      if (!result?.error) {
        router.push('/dashboard');
      } else {
        setErrorMessage(result.error);
      }

    } else {
      try {
        const result = await createUser(email, password);
        console.log('User created successfully:', result);
        router.push('/dashboard');
      } catch (error) {
        setErrorMessage((error as Error).message || 'Something went wrong during signup.');
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <section className="bg-green-600 flex flex-col justify-center items-center w-1/3 p-6 rounded-lg shadow-md">
        <h1 className="text-xl mb-4">{isLogin ? 'Login' : 'Sign up'}</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={submitHandler} className="flex flex-col w-full">
          <div className="flex flex-col mb-3">
            <label className="mb-1">Your Email</label>
            <input 
              type="email" 
              required 
              ref={emailInput} 
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="mb-1">Your Password</label>
            <input 
              type="password" 
              required 
              ref={passwordInput} 
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isLogin ? 'Login' : 'Create account'}
            </button>
            <button 
              type="button" 
              onClick={switchAuth} 
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
