'use client';

import React from 'react';
import animationCooking from '../../../assets/animationCooking.gif';
import animationDeliveryBoy from '../../../assets/animationDeliveryBoy.gif';
import animationIsReady from '../../../assets/animationIsReady.gif';
import animationThumbsUp from '../../../assets/animationThumbsUp.gif';
import {
  Button,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import Image from 'next/image';

const steps = [
  {
    key: 1,
    label: 'Vous avez acceptée la commande, cette dernière est en préparation !',
    description: 'Vous avez acceptée la commande, cette dernière est en préparation !',
  },
  {
    key: 2,
    label: 'La commande est préparée',
    description: 'Vous avez terminez de préparer la commande, un livreur va venir la récupérer.',
  },
  {
    key: 3,
    label: 'La commande a été remise à un livreur',
    description: 'La commande a été remise à un livreur !',
  },
  {
    key: 4,
    label: 'Le client a récupéré sa commande',
    description: 'Bravo ! La commande a été remise au client !',
  },
];

export default function page() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps();
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    console.log(activeStep);
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <div className="flex w-full flex-col">
      <div>
        <div className="w-full flex sm:hidden">
          <StepperResponsive
            orientation="vertical"
            activeStep={activeStep}
            completed={completed}
          />
        </div>
        <div className="w-full sm:flex hidden">
          <StepperResponsive
            activeStep={activeStep}
            completed={completed}
          />
        </div>
        {activeStep === 1 && (
          <div className="w-full flex flex-col items-center justify-center">
            <Image
              src={animationCooking}
              alt="Animation Cooking"
              width={300}
              height={300}
            />
            <Button onClick={handleComplete}>
              {completedSteps() === 0 && 'Commande terminée ?'}
            </Button>
          </div>
        )}
        {activeStep === 2 && (
          <div className="w-full flex flex-col items-center justify-center">
            <Image
              src={animationIsReady}
              alt="Animation Delivery"
              width={300}
              height={300}
            />
            {/* Bouton à enlever une fois le back-end connecté */}
            <Button onClick={handleComplete}>
              {completedSteps() === 1 && 'Commande donnée au livreur'}
            </Button>
          </div>
        )}
        {activeStep === 3 && (
          <div className="w-full flex flex-col items-center justify-center">
            <Image
              src={animationDeliveryBoy}
              alt="Animation Is Ready"
              width={300}
              height={300}
            />
            {/* Bouton à enlever une fois le back-end connecté */}
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
            </Button>
          </div>
        )}
        {activeStep === 4 && (
          <div className="w-full flex flex-col items-center justify-center">
            <Image
              src={animationThumbsUp}
              alt="Animation Is Ready"
              width={300}
              height={300}
            />
            <Typography
              variant="body1"
              className="font-bold"
            >
              Cette commande est terminée ! Le client a été notifié de la livraison. Vous pouvez
              revenir sur la page d'accueil.
            </Typography>
            {/* Bouton à enlever une fois le back-end connecté */}
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface StepperResponsiveProps {
  orientation?: 'horizontal' | 'vertical';
  activeStep: number;
  completed: { [k: number]: boolean };
}

function StepperResponsive({ orientation, activeStep, completed }: StepperResponsiveProps) {
  return (
    <Stepper
      activeStep={activeStep}
      {...(orientation === 'vertical' ? { alternativeLabel: false } : { alternativeLabel: true })}
      orientation={orientation}
      className="w-full flex "
    >
      {steps.map((step, index) => (
        <Step
          key={step.key}
          completed={completed[index]}
        >
          {orientation === 'vertical' ? (
            <>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </>
          ) : (
            <StepLabel>{step.description}</StepLabel>
          )}
        </Step>
      ))}
    </Stepper>
  );
}
