'use client'

import { getSession } from "next-auth/react"
import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/hook/useFetch";
import ItemsContainer from "./ItemsContainer";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedSession, setLoadedSession] = useState<Session | null>(null);
  const router = useRouter();
  const { data } = useFetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?&api_key=${process.env.NEXT_PUBLIC_API_KEY_NASA}`)

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        router.push('/auth');
        return;
      } else {
        setIsLoading(false)
        setLoadedSession(session)
      }
    })
  }, [router])

  if (isLoading) <p>Loading ...</p>

  return (
    <main>
      <h2 className="text-neutral-950 dark:text-neutral-300">Welcome back, {loadedSession?.user?.email} 👋</h2>
      <ItemsContainer items={data?.near_earth_objects} />
    </main>
  )
}