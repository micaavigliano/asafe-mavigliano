import { Asteroid } from '../../../interface/asteroid';
import React, { Suspense, lazy } from 'react';

const Item = lazy(() => import('./Item'));

interface Container {
  items: Asteroid[] | undefined;
  loading: boolean
}

export default function ItemsContainer({ items, loading }: Container) {

  if (loading) return <p className='text-neutral-950 dark:text-neutral-300 text-center'>Loading items...</p>

  return (
    <Suspense fallback={<p className='text-neutral-950 dark:text-neutral-300 text-center'>Loading items...</p>}>
      <div className="grid max-[430px]:grid-cols-1 grid-cols-2 gap-7 place-items-center">
        {items?.map((asteroid: Asteroid) => {
          const reducedData = asteroid.close_approach_data.map((approach) => {
            return {
              close_approach_date: approach.close_approach_date,
              miss_distance: {
                kilometers: approach.miss_distance.kilometers
              }
            };
          });

          return (
            <Item
              name={asteroid.name}
              limited_name={asteroid.name_limited}
              key={asteroid.id}
              maxDiameter={asteroid.estimated_diameter.meters.estimated_diameter_max}
              minDiameter={asteroid.estimated_diameter.meters.estimated_diameter_min}
              distance={reducedData}
              id={asteroid.id}
              magnitude={asteroid.absolute_magnitude_h}
            />
          );
        })}
      </div>
    </Suspense>
  );
}
