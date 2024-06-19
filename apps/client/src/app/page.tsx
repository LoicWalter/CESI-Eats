'use client';

import { SearchWrapper, useRestaurants, RestaurantCard } from '@repo/ui';
import { useState } from 'react';

export default function HomePage() {
  const restaurants = useRestaurants();
  const [search, setSearch] = useState('');
  return (
    <SearchWrapper setSearch={setSearch}>
      <div className="flex flex-col gap-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {restaurants
            .filter((restaurant) => restaurant.name?.includes(search))
            .map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
        </div>
      </div>
    </SearchWrapper>
  );
}
