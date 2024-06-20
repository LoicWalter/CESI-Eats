import React from 'react';
import { AllDeliveries } from '@repo/ui';

export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <AllDeliveries />
    </div>
  );
}
