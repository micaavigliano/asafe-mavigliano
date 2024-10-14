'use client'

import { FormEvent, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import InputField from "../../components/InputField";
import Image from "next/image";
import Button from "../../components/Button";

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
  const [loading, setLoading] = useState<boolean>(false);
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

    setLoading(true);

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

    setLoading(false);
  };

  return (
    <div className="grid max-[430px]:grid-cols-1 grid-cols-2 min-h-screen">
      <section className="flex flex-col justify-center items-center p-6">
        <h1 className="text-xl mb-4 text-center text-neutral-950 dark:text-neutral-300">{isLogin ? 'Login' : 'Sign up'}</h1>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <form onSubmit={submitHandler} className="flex flex-col w-full max-w-md">
          <InputField type="email" ref={emailInput} label="Your email" id="email-input" />
          <InputField type="password" ref={passwordInput} label="Your password" id="password-input" />
          <div className="flex flex-col gap-2 mt-4">
            <Button loading={loading}>
              {isLogin ? 'Login' : 'Create account'}
            </Button>
            <Button 
              type="button" 
              onClick={switchAuth} 
              className="bg-gray-500 text-white px-4 py-2 rounded text-center"
              variant="secondary"
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </Button>
          </div>
        </form>
      </section>
      <div className="relative max-[430px]:hidden block">
        <Image 
          src="/comet.avif" 
          alt="Comet image"
          fill
          style={{ objectFit: "cover" }}
          sizes="50vw"
        />
      </div>
    </div>
  );
}
