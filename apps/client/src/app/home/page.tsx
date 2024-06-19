'use client';

import React from 'react';
import bakeries from '../../assets/bakeries.svg';
import boba from '../../assets/boba.svg';
import breakfast from '../../assets/breakfast.svg';
import burgers from '../../assets/burgers.svg';
import coffee from '../../assets/coffee.svg';
import coreen from '../../assets/coreen.svg';
import dessert from '../../assets/dessert.svg';
import fries from '../../assets/fries.svg';
import hotdog from '../../assets/hotdog.svg';
import icecream from '../../assets/ice cream.svg';
import indien from '../../assets/indien.svg';
import mexicain from '../../assets/mexicain.svg';
import origini from '../../assets/origini.svg';
import pasta from '../../assets/pasta.svg';
import pizza from '../../assets/pizza.svg';
import poisson from '../../assets/poisson.svg';
import poulet from '../../assets/poulet.svg';
import ramen from '../../assets/ramen.svg';
import salad from '../../assets/salad.svg';
import sandwich from '../../assets/sandwich.svg';
import soda from '../../assets/soda.svg';
import steak from '../../assets/steak.svg';
import sushi from '../../assets/sushi.svg';
import taco from '../../assets/taco.svg';
import vegan from '../../assets/vegan.svg';
import halal from '../../assets/halal.png';
import Image from 'next/image';
import { CardCarousel } from '@repo/ui';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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

function HomePage() {
  const [Prix, setPrix] = React.useState('');

  const PrixChange = (event: SelectChangeEvent) => {
    setPrix(event.target.value as string);
  };

  const [Frais, setFrais] = React.useState('');

  const FraisChange = (event: SelectChangeEvent) => {
    setFrais(event.target.value as string);
  };
  const [Trier, setTrier] = React.useState('');

  const TrierChange = (event: SelectChangeEvent) => {
    setTrier(event.target.value as string);
  };
  return (
    <>
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
      <div className="ui-flex ui-bg-secondary ">
        <Stack>
          <Button variant="text">Offres</Button>
        </Stack>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="Prix">Prix</InputLabel>
          <Select
            labelId="Prix"
            id="Prix"
            value={Prix}
            onChange={PrixChange}
            autoWidth
            label="Prix"
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            <MenuItem value={10}>0-9.99€</MenuItem>
            <MenuItem value={11}>10-14.99€</MenuItem>
            <MenuItem value={12}>15-19.99€</MenuItem>
            <MenuItem value={12}>20+€</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="Frais">Frais de livraison</InputLabel>
          <Select
            labelId="Frais"
            id="Frais"
            value={Frais}
            onChange={FraisChange}
            autoWidth
            label="Frais"
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            <MenuItem value={10}>0-1.99€</MenuItem>
            <MenuItem value={11}>2-3.99€</MenuItem>
            <MenuItem value={12}>4-5.99€</MenuItem>
            <MenuItem value={13}>6+€</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="Trier">Trier</InputLabel>
          <Select
            labelId="Trier"
            id="Trier"
            value={Trier}
            onChange={TrierChange}
            autoWidth
            label="Trier"
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            <MenuItem value={10}>Prix ⭣ </MenuItem>
            <MenuItem value={11}>Prix ⭡ </MenuItem>
            <MenuItem value={12}>Frais ⭣</MenuItem>
            <MenuItem value={13}>Frais ⭡</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
}

export default HomePage;
