'use client';

import React, { Suspense, useEffect, useMemo } from 'react';

import {
  Alert,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import {
  COMMANDE_ACCEPTEE,
  COMMANDE_PRETE,
  ImageWithDefaultOnError,
  PREPARATION_EN_COURS,
  restaurantSteps,
  StyledButton,
  useCommandesRestaurant,
  useRestaurant,
} from '@repo/ui';
import { PrismaRestaurants } from '@api/cesieats';
import { editOrderStatus } from '@repo/ui/actions/status-actions.ts';
import { useRouter } from 'next/navigation';

export default function page({ params }: { params: { orderId: string } }) {
  const commandes = useCommandesRestaurant();
  console.log(commandes);
  const restaurant = useRestaurant();
  const commande = useMemo(
    () => commandes.find((c) => c.id === params.orderId),
    [commandes, params.orderId],
  );

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

  const [error, setError] = React.useState<string | null>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  useEffect(() => {
    const step = restaurantSteps.find((s) => s.status === commande?.status)?.key;
    if (step) {
      setActiveStep(step);
    }
  }, [commande]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex w-full flex-col">
        {error && (
          <Alert
            severity="error"
            className="w-full"
          >
            {error}
          </Alert>
        )}
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
          {activeStep === 0 && (
            <div className="w-full flex flex-col items-center justify-center">
              <Typography
                variant="body1"
                className="font-bold"
              >
                Vous avez reçu une nouvelle commande.
              </Typography>
              <div className="flex flex-col w-full">
                <Listing
                  menuByQuantity={menuByQuantity!}
                  itemByQuantity={itemByQuantity!}
                />
              </div>
              <StyledButton
                onClick={async () => {
                  const error = await editOrderStatus(
                    COMMANDE_ACCEPTEE,
                    restaurant?.id!,
                    commande?.id!,
                  );
                  if (error) {
                    setError(error.error);
                    return;
                  }
                  setError(null);
                  handleNext();
                }}
              >
                Accepter la commande
              </StyledButton>
            </div>
          )}
          {activeStep === 1 && (
            <div className="w-full flex flex-col items-center justify-center">
              <Typography
                variant="body1"
                className="font-bold"
              >
                La commande est accepté.
              </Typography>
              <div className="flex flex-col w-full">
                <Listing
                  menuByQuantity={menuByQuantity!}
                  itemByQuantity={itemByQuantity!}
                />
              </div>
              <StyledButton
                onClick={async () => {
                  const error = await editOrderStatus(
                    PREPARATION_EN_COURS,
                    restaurant?.id!,
                    commande?.id!,
                  );
                  if (error) {
                    setError(error.error);
                    return;
                  }
                  setError(null);
                  handleNext();
                }}
              >
                Commande en préparation
              </StyledButton>
            </div>
          )}
          {activeStep === 2 && (
            <div className="w-full flex flex-col items-center justify-center">
              <Typography
                variant="body1"
                className="font-bold"
              >
                La commande est en préparation.
              </Typography>
              <div className="flex flex-col w-full">
                <Listing
                  menuByQuantity={menuByQuantity!}
                  itemByQuantity={itemByQuantity!}
                />
              </div>
              <StyledButton
                onClick={async () => {
                  const error = await editOrderStatus(
                    COMMANDE_PRETE,
                    restaurant?.id!,
                    commande?.id!,
                  );
                  if (error) {
                    setError(error.error);
                    return;
                  }
                  setError(null);
                  handleNext();
                }}
              >
                Commande prête
              </StyledButton>
            </div>
          )}
          {activeStep === 3 && (
            <div className="w-full flex flex-col items-center justify-center">
              <Typography
                variant="body1"
                className="font-bold"
              >
                La commande est prête.
              </Typography>
              <div className="flex flex-col w-full">
                <Listing
                  menuByQuantity={menuByQuantity!}
                  itemByQuantity={itemByQuantity!}
                />
              </div>
            </div>
          )}
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
      {restaurantSteps.map((step, index) => (
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
