'use client';

import { PrismaOrders } from '@api/cesieats';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCommandes } from '../actions/get-commandes';

export type CommandeContextType = Partial<PrismaOrders.Order>;

const CommandesContext = createContext<CommandeContextType[]>([]);

export const CommandesProvider = ({ children }: { children: React.ReactNode }) => {
  const [commandes, setCommandes] = useState<CommandeContextType[]>([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      const response = await getCommandes();
      if (typeof response === 'string') {
        console.error(response);
        return;
      }
      setCommandes(response);
    };

    fetchCommandes();
  }, []);

  return <CommandesContext.Provider value={commandes}>{children}</CommandesContext.Provider>;
};

export const useCommandes = () => {
  const context = useContext(CommandesContext);
  if (context === undefined) {
    throw new Error('useCommandes must be used within a CommandesProvider');
  }
  return context;
};
