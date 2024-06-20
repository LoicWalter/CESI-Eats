'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import {
  ImageWithDefaultOnError,
  userSteps,
  useCommandes,
  RestaurantContextType,
  COMMANDE_PRETE,
  useDeliveries,
} from '@repo/ui';
import { PrismaRestaurants } from '@api/cesieats';
import { getRestaurant } from '@repo/ui/actions/get-restaurants.ts';

export default function page({ params }: { params: { orderId: string } }) {
  const commandes = useCommandes();
  const deliveries = useDeliveries();

  const commande = useMemo(
    () => commandes.find((c) => c.id === params.orderId),
    [commandes, params.orderId],
  );

  const delivery = useMemo(
    () => deliveries.find((d) => d.id === commande?.delivery),
    [deliveries, commande],
  );

  const [restaurant, setRestaurant] = useState<RestaurantContextType>({});

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!commande || !commande.restaurant) return;
      const response = await getRestaurant(commande.restaurant);
      if (typeof response === 'string') {
        console.error(response);
        return;
      }
      setRestaurant(response);
    };

    fetchRestaurant();
  }, [commande]);

  const menuByQuantity = useMemo(() => {
    return commande?.menus?.reduce(
      (acc, menu) => {
        const menuItem = restaurant?.menus?.find((m) => m.id === menu);
        if (!menuItem) return acc;
        const isMenu = acc.find((a) => a.id === menuItem.id);
        if (isMenu) {
          isMenu.quantity += 1;
          return acc;
        }
        return [...acc, { ...menuItem, quantity: 1 }];
      },
      [] as Array<PrismaRestaurants.menu & { quantity: number }>,
    );
  }, [commande, restaurant]);

  const itemByQuantity = useMemo(() => {
    return commande?.items?.reduce(
      (acc, item) => {
        const itemItem = restaurant?.items?.find((m) => m.id === item);
        if (!itemItem) return acc;
        const isItem = acc.find((a) => a.id === itemItem.id);
        if (isItem) {
          isItem.quantity += 1;
          return acc;
        }
        return [...acc, { ...itemItem, quantity: 1 }];
      },
      [] as Array<PrismaRestaurants.item & { quantity: number }>,
    );
  }, [commande, restaurant]);

  const [activeStep, setActiveStep] = React.useState(0);
  useEffect(() => {
    if (commande?.status === COMMANDE_PRETE) {
      const step = userSteps.find((s) => s.status.includes(delivery?.status || ''))?.key;
      if (step) {
        setActiveStep(step);
      }
      setActiveStep(3);
      return;
    }
    const step = userSteps.find((s) => s.status.includes(commande?.status || ''))?.key;
    if (step) {
      setActiveStep(step);
    }
  }, [commande]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex w-full flex-col">
        <div className="w-full flex sm:hidden">
          <StepperResponsive
            orientation="vertical"
            activeStep={activeStep}
          />
        </div>
        <div className="w-full sm:flex hidden">
          <StepperResponsive activeStep={activeStep} />
        </div>
        <div>
          <div className="w-full flex flex-col items-center justify-center">
            <Typography
              variant="body1"
              className="font-bold"
            >
              {userSteps[activeStep].label}
            </Typography>
            <Typography
              variant="body1"
              className="font-bold"
            >
              Mon code de livraison: {delivery?.id?.slice(-2)}
            </Typography>
            <div className="flex flex-col w-full">
              <Listing
                menuByQuantity={menuByQuantity!}
                itemByQuantity={itemByQuantity!}
              />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

interface StepperResponsiveProps {
  orientation?: 'horizontal' | 'vertical';
  activeStep: number;
}

function StepperResponsive({ orientation, activeStep }: StepperResponsiveProps) {
  return (
    <Stepper
      activeStep={activeStep}
      {...(orientation === 'vertical' ? { alternativeLabel: false } : { alternativeLabel: true })}
      orientation={orientation}
      className="w-full flex "
    >
      {userSteps.map((step, index) => (
        <Step
          key={step.key}
          completed={activeStep > index}
        >
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

interface ListingProps {
  menuByQuantity: Array<PrismaRestaurants.menu & { quantity: number }>;
  itemByQuantity: Array<PrismaRestaurants.item & { quantity: number }>;
}

function Listing({ menuByQuantity, itemByQuantity }: ListingProps) {
  return (
    <List>
      {menuByQuantity?.map((menu) => (
        <ListItem key={menu.id}>
          <ListItemAvatar>
            <ImageWithDefaultOnError
              src={`${process.env.NEXT_PUBLIC_API_URL}/menu/${menu.menuPicture}/picture`}
              alt={menu.name!}
              width={48}
              height={48}
              className="object-cover object-center w-12 h-12 rounded"
              defaultReactNode={
                <img
                  src={'https://via.placeholder.com/300'}
                  alt={menu.name!}
                  className="object-cover object-center w-12 h-12 rounded"
                />
              }
              forceDefault={!menu.menuPicture}
            />
          </ListItemAvatar>
          <ListItemText
            primary={menu.name}
            secondary={`${menu.quantity}x`}
          />
        </ListItem>
      ))}
      {itemByQuantity?.map((item) => (
        <ListItem key={item.id}>
          <ListItemAvatar>
            <ImageWithDefaultOnError
              src={`${process.env.NEXT_PUBLIC_API_URL}/item/${item.itemPicture}/picture`}
              alt={item.name!}
              width={48}
              height={48}
              className="object-cover object-center w-12 h-12 rounded"
              defaultReactNode={
                <img
                  src={'https://via.placeholder.com/300'}
                  alt={item.name!}
                  className="object-cover object-center w-12 h-12 rounded"
                />
              }
              forceDefault={!item.itemPicture}
            />
          </ListItemAvatar>
          <ListItemText
            primary={item.name}
            secondary={`${item.quantity}x`}
          />
        </ListItem>
      ))}
    </List>
  );
}
