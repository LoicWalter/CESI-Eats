'use client';

import React from 'react';
import animationCooking from '../../../assets/animationCooking.gif';
import animationDeliveryBoy from '../../../assets/animationDeliveryBoy.gif';
import animationIsReady from '../../../assets/animationIsReady.gif';
import { Button, Step, StepButton, StepLabel, Stepper, Typography } from '@mui/material';
import Image from 'next/image';

const steps = [
  { key: 1, label: 'Votre commande a été accepté en cuisine !' },
  { key: 2, label: 'Votre commande a été remis à un livreur !' },
  { key: 3, label: 'Driiinngg, Venez récupérer votre commande !' },
];

export default function page() {
  const [activeStep, setActiveStep] = React.useState(0);
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
    return activeStep === totalSteps() - 1;
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
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <div className="flex w-full flex-col">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((step, index) => (
          <Step
            key={step.key}
            completed={completed[index]}
          >
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <div className="w-full flex flex-col items-center justify-center">
            <Image
              src={animationCooking}
              alt="Animation Cooking"
              width={300}
              height={300}
            />
            {/* Bouton à enlever une fois le back-end connecté */}
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
            </Button>
          </div>
        )}
        {activeStep === 1 && (
          <div className="w-full flex flex-col items-center justify-center">
            <Image
              src={animationDeliveryBoy}
              alt="Animation Delivery"
              width={300}
              height={300}
            />
            {/* Bouton à enlever une fois le back-end connecté */}
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
            </Button>
          </div>
        )}
        {activeStep === 2 && (
          <div className="w-full flex flex-col items-center justify-center">
            <Image
              src={animationIsReady}
              alt="Animation Is Ready"
              width={300}
              height={300}
            />
            <Typography
              variant="body1"
              className="font-bold"
            >
              Votre commande est prête ! Donnez ce numméro au livreur pour récupérer votre commande
              : {Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}.
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
