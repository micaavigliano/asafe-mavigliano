'use client'

import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes";
import { CiLight, CiDark } from "react-icons/ci";
import { useRouter } from "next/navigation";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter()

  const logOutHandler = () => {
    signOut();
    router.push('/auth')
  }

  return (
    <header className="bg-pink-500 p-7 flex flex-row justify-between items-center">
      <h1 className="text-xl">Asteroids app</h1>
      <ul className="flex flex-row gap-3 items-center">
        {session && (<li>
          <button onClick={logOutHandler}>Log out</button>
        </li>)}
        <li className="flex items-center">
          <button
            onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
            aria-label={theme === 'light' ? 'Change to dark theme' : 'Change to light theme'}
          >
            {theme === 'light' ? <CiDark size={30} /> : <CiLight size={30} />}
          </button>
        </li>
      </ul>
    </header>
  )
}