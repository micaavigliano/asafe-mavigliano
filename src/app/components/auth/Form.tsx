'use client'
import { FormEvent, useRef, useState } from "react";

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
  const [isLogin, setIsLogin] = useState(true);

  const switchAuth = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //add validation for the password

    if (isLogin) {
      //log in
    } else {
      console.log('entra?')
      try {
        const result = createUser(emailInput.current?.value!, passwordInput.current?.value!);
        console.log(result);
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <section>
      <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Your Email</label>
          <input type="email" required ref={emailInput} />
        </div>
        <div>
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
  )
}