import React from 'react';
import { EuroSymbol, AddCircle } from '@mui/icons-material';
import Image, { StaticImageData } from 'next/image';
import defaultMealPic from '../assets/default-meal-pic.png';

interface MenuItemProps {
  mealName?: string;
  price?: string;
  desc?: string;
  mealPic?: StaticImageData;
}

export function mealItem({
  mealName = 'Super Plat',
  price = '0,00',
  desc = 'Super ingrédient 1, super ingrédient 2 et aussi super ingrédient 3',
  mealPic = defaultMealPic,
}: MenuItemProps): JSX.Element {
  return (
    <div className="ui-flex">
      <div className="ui-flex ui-flex-col">
        <p>{mealName}</p>
        <div className="ui-flex">
          <p>{price}</p>
          <EuroSymbol />
        </div>
        <p>{desc}</p>
      </div>
      <div className="ui-rounded ui-oveflow-hidden ui-object-cover ui-object-center">
        <button className="">
          <Image
            src={mealPic}
            alt={`${mealName} +  picture`}
            className="ui-flex"
            width={64}
            height={64}
          >
            <AddCircle className="ui-bg-primary active:ui-bg-secondary" />
          </Image>
        </button>
      </div>
    </div>
  );
}
