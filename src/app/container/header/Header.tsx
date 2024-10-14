'use client'

import React from 'react';
import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes";
import { CiLight, CiDark } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Button from "../../components/Button";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter()

  const logOutHandler = () => {
    signOut();
    router.push('/auth')
  }

  return (
    <header className="bg-slate-600 p-7 flex flex-row justify-between items-center">
      <h1 className="text-xl">Asteroids app</h1>
      <ul className="flex flex-row gap-3 items-center max-[430px]:gap-0">
        {session && (<li>
          <Button onClick={logOutHandler} variant="link">Log out</Button>
        </li>)}
        <li className="flex items-center">
          <Button
            onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
            aria-label={theme === 'light' ? 'Change to dark theme' : 'Change to light theme'}
            variant="link"
          >
              {theme === 'light' ? <CiDark size={30} /> : <CiLight size={30} />}
          </Button>
        </li>
      </ul>
    </header>
  )
}