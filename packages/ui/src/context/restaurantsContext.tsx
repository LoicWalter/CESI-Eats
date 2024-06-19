'use client';

import { PrismaRestaurants } from '@api/cesieats';
import { createContext, useContext, useEffect, useState } from 'react';
import { getRestaurants } from '../actions/get-restaurants';

export type RestaurantsContextType = Partial<
  PrismaRestaurants.Prisma.restaurantGetPayload<{
    include: {
      menus: {
        include: {
          items: true;
        };
      };
      items: true;
    };
  }>
>;

const RestaurantsContext = createContext<RestaurantsContextType[]>([]);

export const RestaurantsProvider = ({ children }: { children: React.ReactNode }) => {
  const [restaurants, setRestaurants] = useState<RestaurantsContextType[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await getRestaurants();
      if (typeof response === 'string') {
        console.error(response);
        return;
      }
      setRestaurants(response);
    };

    fetchRestaurants();
  }, []);

  return <RestaurantsContext.Provider value={restaurants}>{children}</RestaurantsContext.Provider>;
};

export const useRestaurants = () => {
  const context = useContext(RestaurantsContext);
  if (context === undefined) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
};
