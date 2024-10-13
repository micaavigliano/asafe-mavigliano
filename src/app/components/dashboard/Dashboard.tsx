'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useFetch from '@/hook/useFetch';
import ItemsContainer from './ItemsContainer';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data } = useFetch(
    `https://api.nasa.gov/neo/rest/v1/neo/browse?&api_key=${process.env.NEXT_PUBLIC_API_KEY_NASA}`
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h2 className="text-neutral-950 dark:text-neutral-300 text-2xl m-4">
        Welcome back, {session?.user?.email} 👋
      </h2>
      <p className="text-neutral-950 dark:text-neutral-300 text-xl m-4">
        Here you can find more information about asteroids:
      </p>
      <ItemsContainer items={data?.near_earth_objects} />
    </main>
  );
}
