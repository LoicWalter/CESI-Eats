'use client';

import { PrismaRestaurants } from '@api/cesieats';
import { createContext, useContext, useEffect, useState } from 'react';
import { getRestaurant } from '../actions/get-restaurants';

export type RestaurantContextType = Partial<
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

const RestaurantContext = createContext<RestaurantContextType>({});

export const RestaurantProvider = ({ children, id }: { children: React.ReactNode; id: string }) => {
  const [restaurant, setRestaurant] = useState<RestaurantContextType>({});

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await getRestaurant(id);
      if (typeof response === 'string') {
        console.error(response);
        return;
      }
      setRestaurant(response);
    };

    fetchRestaurant();
  }, [id]);

  return <RestaurantContext.Provider value={restaurant}>{children}</RestaurantContext.Provider>;
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
