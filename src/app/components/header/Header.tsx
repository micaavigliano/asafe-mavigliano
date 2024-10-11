'use client'

import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";
import { CiLight, CiDark } from "react-icons/ci";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  console.log(session)

  const logOutHandler = () => {
    signOut();
   // window.location.href = '/auth';
    redirect('/auth')
  }

  return (
    <header className="bg-pink-500 p-7 flex flex-row justify-between">
      <h1>Asteroids app</h1>
      <ul className="flex flex-row bg-red-300 gap-3">
        {session && (<li>
          <button onClick={logOutHandler}>Log out</button>
        </li>)}
        <li>
          <button
            onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
            className="bg-gray-500 dark:bg-gray-800 rounded"
          >
            {theme === 'light' ? <CiDark /> : <CiLight />}
          </button>
        </li>
      </ul>
    </header>
  )
}