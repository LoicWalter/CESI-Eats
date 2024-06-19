import React from 'react';
import Image from 'next/image';
import steak from '../assets/steak.png';
import fish from '../assets/fish.png';
import vegan from '../assets/vegan.png';
import vegetarian from '../assets/vegetarian.png';

interface BooleanProps {
  isSteak: boolean;
  isPoisson: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
}

interface DietsIconsProps {
  diets: string[];
}

export function DietsIcons({ diets }: DietsIconsProps): JSX.Element {
  const isSteak = diets.includes('viande');
  const isPoisson = diets.includes('poisson');
  const isVegan = diets.includes('végan');
  const isVegetarian = diets.includes('végétarien');

  return (
    <div className="ui-flex ui-justify-start ui-gap-4 ui-w-full ui-h-full">
      {isSteak && (
        <div className="ui-w-10 ui-h-10">
          <Image
            src={steak}
            alt="steak"
            className="ui-object-cover ui-object-center ui-w-full ui-h-full"
          />
        </div>
      )}
      {isPoisson && (
        <div className="ui-w-10 ui-h-10">
          <Image
            src={fish}
            alt="poisson"
            className="ui-object-cover ui-object-center ui-w-full ui-h-full"
          />
        </div>
      )}
      {isVegetarian && (
        <div className="ui-w-10 ui-h-10">
          <Image
            src={vegetarian}
            alt="vegetarian"
            className="ui-object-cover ui-object-center ui-w-full ui-h-full"
          />
        </div>
      )}
      {isVegan && (
        <div className="ui-w-10 ui-h-10">
          <Image
            src={vegan}
            alt="vegan"
            className="ui-object-cover ui-object-center ui-w-full ui-h-full"
          />
        </div>
      )}
    </div>
  );
}
