'use client'

import { getSession } from "next-auth/react"
import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedSession, setLoadedSession] = useState<Session | null>(null);
  const router = useRouter()

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        router.push('/auth')
      } else {
        setIsLoading(false)
        setLoadedSession(session)
      }
    })
  }, [])

  if (isLoading) <p>Loading ...</p>

  return (
    <main>
      <h2 className="text-neutral-950 dark:text-neutral-300">dashboard</h2>
      <p>Welcome back, {loadedSession?.user?.email}</p>
    </main>
  )
}