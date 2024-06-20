import React from 'react';
import { AllDeliveries, DeliveriesProvider } from '@repo/ui';

export default function Page(): JSX.Element {
  return (
    <DeliveriesProvider>
      <div className="flex flex-col items-center justify-between h-screen">
        <AllDeliveries />
      </div>
    </DeliveriesProvider>
  );
}
