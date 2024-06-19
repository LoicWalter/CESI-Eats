'use client';

import { Divider, Typography } from '@mui/material';
import { SearchWrapper, useRestaurants, RestaurantCard } from '@repo/ui';
import bakeries from '../assets/bakeries.svg';
import boba from '../assets/boba.svg';
import breakfast from '../assets/breakfast.svg';
import burgers from '../assets/burgers.svg';
import coffee from '../assets/coffee.svg';
import coreen from '../assets/coreen.svg';
import dessert from '../assets/dessert.svg';
import fries from '../assets/fries.svg';
import hotdog from '../assets/hotdog.svg';
import icecream from '../assets/ice cream.svg';
import indien from '../assets/indien.svg';
import mexicain from '../assets/mexicain.svg';
import origini from '../assets/origini.svg';
import pasta from '../assets/pasta.svg';
import pizza from '../assets/pizza.svg';
import poisson from '../assets/poisson.svg';
import poulet from '../assets/poulet.svg';
import ramen from '../assets/ramen.svg';
import salad from '../assets/salad.svg';
import sandwich from '../assets/sandwich.svg';
import soda from '../assets/soda.svg';
import steak from '../assets/steak.svg';
import sushi from '../assets/sushi.svg';
import taco from '../assets/taco.svg';
import vegan from '../assets/vegan.svg';
import halal from '../assets/halal.png';
import Image from 'next/image';
import { CardCarousel } from '@repo/ui';

const categories = [
  { name: 'Patisseries', src: bakeries },
  { name: 'Bubble Tea', src: boba },
  { name: 'Petit-Déjeuner', src: breakfast },
  { name: 'Burgers', src: burgers },
  { name: 'Café', src: coffee },
  { name: 'Asiatique', src: coreen },
  { name: 'Dessert', src: dessert },
  { name: 'Frites', src: fries },
  { name: 'Hot-dog', src: hotdog },
  { name: 'Glaces', src: icecream },
  { name: 'Indien', src: indien },
  { name: 'Mexicain', src: mexicain },
  { name: 'Onigiri', src: origini },
  { name: 'Pâtes', src: pasta },
  { name: 'Pizza', src: pizza },
  { name: 'Poisson', src: poisson },
  { name: 'Poulet', src: poulet },
  { name: 'Ramen', src: ramen },
  { name: 'Salade', src: salad },
  { name: 'Sandwich', src: sandwich },
  { name: 'Boissons', src: soda },
  { name: 'Viande', src: steak },
  { name: 'Sushi', src: sushi },
  { name: 'Tacos', src: taco },
  { name: 'Vegan', src: vegan },
  { name: 'Halal', src: halal },
];

const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 14,
    slidesToSlide: 7,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1124 },
    items: 10,
    slidesToSlide: 5,
  },
  smallDesktop: {
    breakpoint: { max: 1124, min: 700 },
    items: 8,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 700, min: 560 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 560, min: 0 },
    items: 4,
  },
};

export default function HomePage() {
  const restaurants = useRestaurants();
  return (
    <SearchWrapper>
      <div className="flex flex-col gap-8 w-full">
        <CardCarousel responsive={responsive}>
          {categories.map(({ name, src }) => (
            <div
              key={name}
              className="ui-w-full ui-flex ui-flex-col ui-justify-center ui-items-center ui-select-none"
            >
              <Image
                width={64}
                height={64}
                src={src}
                alt={name}
              />
              <Typography variant="body1">{name}</Typography>
            </div>
          ))}
        </CardCarousel>
        <Divider />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}
        </div>
      </div>
    </SearchWrapper>
  );
}
