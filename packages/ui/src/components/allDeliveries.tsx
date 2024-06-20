'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { HighlightOffRounded, ShoppingBagOutlined, TaskAltRounded } from '@mui/icons-material';
import { translateStatus, useDeliveries, useUser } from '@repo/ui';
import Link from 'next/link';
import { assignDelivery } from '../actions/status-actions.ts';

interface DeliveryProps {
  deliveryId: string;
  deliveryName?: string;
  address?: string;
}

export function AllDeliveries(): JSX.Element {
  const deliveries = useDeliveries();
  const user = useUser();
  return (
    <div className="ui-flex ui-flex-col ui-justify-start ui-w-full ui-h-full ui-overflow-y-auto ui-max-h-screen">
      {deliveries
        .filter((d) => !d.status || d.deliverer === user.id)
        .map((delivery, id) => (
          <Delivery
            key={id}
            deliveryId={delivery.id || ''}
            deliveryName={translateStatus(delivery.status || 'En attente')}
            address={delivery.deliveryAddress}
          />
        ))}
    </div>
  );
}

export function Delivery({ deliveryId, deliveryName, address }: DeliveryProps): JSX.Element {
  const [show, setShow] = React.useState(true);

  if (!show) {
    return <></>;
  }

  return (
    <div className="ui-relative ui-w-full ui-min-h-[20%] ui-overflow-hidden ui-border-b-gray-1 ui-border-b-[0.0625rem]">
      <div className="ui-flex ui-justify-center ui-w-full ui-h-full ui-bg-blue-100  ui-select-none"></div>
      <Link href={`/livraison/${deliveryId}`}>
        <button className="ui-absolute ui-top-0 ui-left-0 ui-flex ui-flex-row ui-w-[65%] ui-h-1/2 ui-mb-2 ui-mr-2 ui-bg-gray-5 ui-rounded-br-lg ui-border-b-gray-4 ui-border-b-[0.0625rem] ui-shadow-[0_0.125rem_0.25rem_0_rgba(204,209,212,0.4)] hover:ui-bg-primary hover:ui-text-gray-5 active:ui-bg-secondary active:ui-text-gray-5 active:ui-border-b-0 active:ui-shadow-[inset_0.125rem_0.125rem_0.25rem_0_rgba(0,0,0,0.4)]">
          <div className="ui-flex ui-flex-col ui-items-start ui-justify-start ui-w-full">
            <Typography
              variant="h6"
              component="h1"
              className="ui-font-display ui-font-bold ui-mx-2 ui-mt-1 ui-mb-0 hover:ui-text-gray-5 active:ui-text-gray-5 ui-truncate"
            >
              {deliveryName}
            </Typography>
            <Typography
              variant="body1"
              component="h2"
              className="ui-font-display ui-text-left ui-ml-2 ui-mb-2 hover:ui-text-gray-5 active:ui-text-gray-5"
            >
              {address}
            </Typography>
          </div>
          <div className="ui-flex ui-justify-end ui-items-end ui-w-11 ui-h-full">
            <ShoppingBagOutlined className="ui-m-2 ui-w-7 ui-h-7" />
          </div>
        </button>
      </Link>
      <div className="ui-absolute ui-bottom-0 ui-right-0 ui-flex ui-flex-row ui-w-[5.15rem] ui-h-8 ui-m-2 ui-justify-between ui-items-center ui-rounded-full ui-bg-gray-5">
        <button
          className="ui-w-8 ui-h-full ui-ml-0.5"
          onClick={async () => {
            const response = await assignDelivery(deliveryId);
            if (response?.error) {
              console.error(response.error);
            }
          }}
        >
          <TaskAltRounded className="ui-text-green-600 active:ui-text-green-900 ui-w-full ui-h-full" />
        </button>
        <button
          className="ui-w-8 ui-h-full ui-mr-0.5"
          onClick={() => setShow(false)}
        >
          <HighlightOffRounded className="ui-text-red-600 active:ui-text-red-900 ui-w-full ui-h-full" />
        </button>
      </div>
    </div>
  );
}
