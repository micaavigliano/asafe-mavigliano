'use client'
import { FormEvent, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const createUser = async(email: string, password: string) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export function Form() {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter();

  const switchAuth = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //add validation for the password

    if (isLogin) {
      const result = await signIn('credentials', { 
        redirect: false,
        email: emailInput.current?.value,
        password: passwordInput.current?.value
      })

      if (!result?.error) {
        router.push('/dashboard')
      }
      
    } else {
      try {
        const result = createUser(emailInput.current?.value!, passwordInput.current?.value!);
        if (!result) {
          router.push('/dashboard'); 
        }

      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="flex justify-center items-center mt-[20%]">
      <section className="bg-green-600 flex flex-col justify-center items-center w-auto p-4 rounded-lg">
        <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
        <form onSubmit={submitHandler} className="flex flex-col">
          <div className="flex flex-col">
            <label>Your Email</label>
            <input type="email" required ref={emailInput} />
          </div>
          <div className="flex flex-col">
            <label>Your password</label>
            <input type="password" required ref={passwordInput} />
          </div>
          <div>
            <button>{isLogin ? 'Login' : 'Create account'}</button>
            <button type="button" onClick={switchAuth}>
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}