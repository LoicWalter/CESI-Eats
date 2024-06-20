import React from 'react';
import { Typography } from '@mui/material';
import { ShoppingBagOutlined } from '@mui/icons-material';
import { DeliveryButtons } from '@repo/ui';
import Image, { StaticImageData } from 'next/image';
import defaultRestaurantPic from '../assets/default-restaurant-pic.png';
import Link from 'next/link';

interface DeliveryProps {
  deliveryName?: string;
  address?: string;
  deliveryPic?: StaticImageData;
}

interface AllDeliveriesProps {
  deliveries: DeliveryProps[];
}

export function AllDeliveries({ deliveries }: AllDeliveriesProps): JSX.Element {
  return (
    <div className="ui-flex ui-flex-col ui-justify-start ui-w-full ui-h-full ui-overflow-y-auto ui-max-h-screen">
      {deliveries.map((delivery, id) => (
        <Delivery
          key={id}
          {...delivery}
        />
      ))}
    </div>
  );
}

export function Delivery({
  deliveryName = 'Super delivery',
  address = '12 Rue Schertz, 67100 Strasbourg',
  deliveryPic = defaultRestaurantPic,
}: DeliveryProps): JSX.Element {
  return (
    <div className="ui-relative ui-w-full ui-min-h-[20%] ui-overflow-hidden ui-border-b-gray-1 ui-border-b-[0.0625rem]">
      <div className="ui-flex ui-justify-center ui-w-full ui-h-full ui-bg-blue-100  ui-select-none">
        {/* <div className="ui-flex ui-justify-center ui-w-full ui-h-full ui-bg-secondary ui-select-none">
        <Image
          src={deliveryPic}
          alt={`${deliveryName} +  picture`}
          className="ui-object-cover ui-object-center"
        ></Image> */}
      </div>
      <Link href="/my-delivery">
        {/*href #TODO*/}
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
      <DeliveryButtons />
    </div>
  );
}
