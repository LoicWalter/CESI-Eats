'use client';

import { PrismaOrders } from '@api/cesieats';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCommandesRestaurant } from '../actions/get-commandes';

export type CommandeRestaurantContextType = Partial<PrismaOrders.Order>;

const CommandesRestaurantContext = createContext<CommandeRestaurantContextType[]>([]);

export const CommandesRestaurantProvider = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const [commandesRestaurant, setCommandesRestaurant] = useState<CommandeRestaurantContextType[]>(
    [],
  );

  useEffect(() => {
    const fetchCommandes = async () => {
      const response = await getCommandesRestaurant(id);
      if (typeof response === 'string') {
        console.error(response);
        return;
      }
      setCommandesRestaurant(response);
    };

    fetchCommandes();
  }, [id]);

  return (
    <CommandesRestaurantContext.Provider value={commandesRestaurant}>
      {children}
    </CommandesRestaurantContext.Provider>
  );
};

export const useCommandesRestaurant = () => {
  const context = useContext(CommandesRestaurantContext);
  if (context === undefined) {
    throw new Error('useCommandesRestaurant must be used within a CommandesRestaurantProvider');
  }
  return context;
};
