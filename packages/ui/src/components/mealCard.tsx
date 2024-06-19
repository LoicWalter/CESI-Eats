import React from 'react';
import { CircularAddButton } from '@repo/ui';
import { EuroRounded } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import defaultMealPic from '../assets/default-meal-pic.png';

interface MealItemProps {
  mealName?: string;
  price?: string;
  desc?: string;
  mealPic?: StaticImageData;
}

interface MealSectionProps {
  category: string;
  meals: MealItemProps[];
}

interface MealCardProps {
  mealCards: MealSectionProps[];
}

export function MealCard({ mealCards }: MealCardProps): JSX.Element {
  return (
    <div className="ui-flex ui-flex-col ui-justify-center ui-w-full ui-h-full">
      {mealCards.map((mealCard, id) => (
        <MealSection
          key={id}
          {...mealCard}
        />
      ))}
    </div>
  );
}

function MealSection({ category, meals }: MealSectionProps): JSX.Element {
  return (
    <div className="ui-flex ui-flex-col ui-justify-center ui-items-center">
      <Divider
        className="ui-border-gray-4 ui-rounded ui-my-6"
        sx={{ width: '95%' }}
        color=""
      />
      <div className="ui-flex ui-justify-start ui-w-full">
        <Typography
          variant="h4"
          className="ui-font-display ui-font-bold ui-mb-2"
        >
          {category}
        </Typography>
      </div>
      <div className="ui-flex ui-flex-col ui-justify-start ui-w-full ui-h-full">
        {meals.map((meal, id) => (
          <MealItem
            key={id}
            {...meal}
          />
        ))}
      </div>
    </div>
  );
}

function MealItem({
  mealName = 'Super Plat',
  price = '0,00',
  desc = 'Super ingrédient 1, super ingrédient 2 et aussi super ingrédient 3',
  mealPic = defaultMealPic,
}: MealItemProps): JSX.Element {
  return (
    <div className="ui-flex ui-justify-between ui-mb-2">
      <div className="ui-flex ui-flex-col ui-w-[16.75rem] ui-justify-evenly">
        <Typography
          variant="h6"
          component="h5"
          className="ui-w-full ui-font-display ui-font-bold ui-text"
        >
          {mealName}
        </Typography>
        <div className="ui-flex ui-w-full ui-items-center">
          <Typography
            variant="body1"
            className="ui-font-display"
          >
            {price}
          </Typography>
          <EuroRounded className="ui-w-4 ui-h-4 ui-ml-1" />
        </div>
        <Typography
          variant="body1"
          className="ui-w-full ui-h-12 ui-font-display ui-text-gray-3"
        >
          {desc}
        </Typography>
      </div>
      <div className="ui-relative ui-flex ui-ml-4 ui-rounded ui-overflow-hidden">
        <button className="ui-min-w-28 ui-min-h-28 ui-w-28 ui-h-28 ui-bg-gray-1">
          <Image
            src={mealPic}
            alt={`${mealName} +  picture`}
            className="ui-h-full ui-object-cover ui-object-center"
          ></Image>
          <div className="ui-hidden">
            <CircularAddButton />
          </div>
        </button>
      </div>
    </div>
  );
}
