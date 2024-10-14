'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useFetch from '../../../hook/useFetch';
import ItemsContainer from './ItemsContainer';
import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageFromQuery = Number(urlParams.get('page')) || 1;
    setCurrentPage(pageFromQuery);
  }, []);

  const { data, totalPages, loading } = useFetch(
    `https://api.nasa.gov/neo/rest/v1/neo/browse?&api_key=${process.env.NEXT_PUBLIC_API_KEY_NASA}`,
    currentPage - 1,
    20
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); 
    router.replace(`?page=${newPage}`);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

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
      <ItemsContainer items={data} loading={loading} />
      {data && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={handlePageChange}
        />
      )}
    </main>
  );
}
