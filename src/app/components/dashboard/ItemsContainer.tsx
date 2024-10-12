import React, { Suspense, lazy } from 'react';

const Item = lazy(() => import('./Item'));

interface Asteroid {
  id: string;
  name: string;
  name_limited: string;
}

interface Container {
  items: Asteroid[] | undefined;
}

export default function ItemsContainer({ items }: Container) {
  return (
    <Suspense fallback={<p>Loading items...</p>}>
      <div className="grid grid-cols-2 gap-7 place-items-center">
        {items?.map((asteroid: Asteroid) => (
          <Item
            name={asteroid.name}
            limited_name={asteroid.name_limited}
            key={asteroid.id}
          />
        ))}
      </div>
    </Suspense>
  );
}
