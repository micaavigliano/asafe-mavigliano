'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useFetch from '@/hook/useFetch';
import ItemsContainer from './ItemsContainer';
import { useEffect } from 'react';
import Pagination from '../../components/Pagination';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data, currentPage, totalPages, nextPage, prevPage, setCurrentPage } = useFetch(
    `https://api.nasa.gov/neo/rest/v1/neo/browse?&api_key=${process.env.NEXT_PUBLIC_API_KEY_NASA}`,
    0,
    20
  );

  console.log(data)

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
      <ItemsContainer items={data} />
      {data && <Pagination currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        goToPage={setCurrentPage} />}
    </main>
  );
}