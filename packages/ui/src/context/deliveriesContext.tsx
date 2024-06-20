'use client';

import { PrismaDeliveries, PrismaOrders } from '@api/cesieats';
import { createContext, useContext, useEffect, useState } from 'react';
import { getDeliveries } from '../actions/get-deliveries';

export type DeliveriesContextType = Partial<PrismaDeliveries.Delivery>;

const DeliveriesContext = createContext<DeliveriesContextType[]>([]);

export const DeliveriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [deliveries, setDeliveries] = useState<DeliveriesContextType[]>([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      const response = await getDeliveries();
      console.log(response);
      if (typeof response === 'string') {
        console.error(response);
        return;
      }
      setDeliveries(response);
    };

    fetchDeliveries();
  }, []);

  return <DeliveriesContext.Provider value={deliveries}>{children}</DeliveriesContext.Provider>;
};

export const useDeliveries = () => {
  const context = useContext(DeliveriesContext);
  if (context === undefined) {
    throw new Error('useDeliveries must be used within a DeliveriesProvider');
  }
  return context;
};
