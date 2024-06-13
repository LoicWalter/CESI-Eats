'use client';

import React from 'react';
import { Container, Typography, Box, Grid, Paper, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BuffaloGrill from '../../assets/BuffaloGrillResto.jpg';
import ClassicBurger from '../../assets/ClassicBurger.png';
import DoubleCheesburger from '../../assets/DoubleCheesburger.png';
import SuperFamousBaconBurger from '../../assets/SuperFamousBaconBurger.png';
import Image from 'next/image';
import Meat from '../../assets/Meat.png';
import Vegetarian from '../../assets/Vegetarian Mark.png';
import Fish from '../../assets/Whole Fish.png';

const restaurant = {
  name: 'Buffalo Grill',
  deliveryFee: 2.15,
  speciality: 'Les anniversaires et la viande',
  options: [
    { name: 'Viande', image: Meat },
    { name: 'Poisson', image: Fish },
    { name: 'Végétarien', image: Vegetarian },
  ],
  articles: [
    {
      categories: 'Burgers',
      content: [
        {
          name: 'Super Famous Bacon Burger',
          description:
            "Double steak haché de boeuf façon bouchère(13), bacon, double cheddar, sauce premium(10), pickles d'oignons, salade, tomate.",
          price: '11€50',
          image: SuperFamousBaconBurger,
        },
        {
          name: 'Double Cheeseburger',
          description:
            "Double Steak haché de boeuf façon bouchère(12) ou galette végétarienne façon chili, sauce cheddar maturé, sauce premium(10), pickles d'oignons, salade, tomate.",
          price: '9€50',
          image: DoubleCheesburger,
          options: Vegetarian,
        },
        {
          name: 'Classic Burger',
          description:
            "Steak haché de boeuf façon bouchère(12) ou Suprême végétal, cheddar, pickles d'oignons, ketchup.",
          price: '8€50',
          image: ClassicBurger,
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <Container className="my-8">
      <Box className="flex flex-col md:flex-row mb-2 gap-4">
        <Image
          src={BuffaloGrill}
          alt={restaurant.name}
          className="md:w-3/5 w-full h-72 rounded-xl object-cover object-center mb-4"
        />
        <Box className="flex flex-col gap-8">
          <Typography
            variant="h4"
            component="h1"
            className="font-bold"
          >
            {restaurant.name}
          </Typography>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Typography
                variant="body1"
                className="mt-2"
              >
                Frais de livraison :
              </Typography>
              <Typography
                variant="body1"
                className="mt-2 font-bold"
              >
                {restaurant.deliveryFee}€
              </Typography>
            </div>
            <div className="flex gap-2">
              <Typography
                variant="body1"
                className="mt-2"
              >
                Spécialité :
              </Typography>
              <Typography
                variant="body1"
                className="mt-2 font-bold"
              >
                {restaurant.speciality}
              </Typography>
            </div>
            <div className="flex gap-2">
              <Typography
                variant="body1"
                className="mt-2"
              >
                Options présente dans le restaurant :
              </Typography>
              <Box className="flex gap-2 ">
                {restaurant.options.map((option, index) => (
                  <div
                    key={index}
                    className="w-12 h-12"
                  >
                    <Image
                      src={option.image}
                      alt={option.name}
                    />
                  </div>
                ))}
              </Box>
            </div>
          </div>
        </Box>
      </Box>
      {restaurant.articles.map((article, index) => (
        <Box className="mb-4">
          <Typography
            key={index}
            variant="h5"
            component="h2"
            className="font-bold mb-2"
          >
            {article.categories}
          </Typography>
          <Grid
            container
            spacing={4}
          >
            {article.content.map((menu, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
              >
                <Paper className="p-4 flex flex-col items-start h-full">
                  <Image
                    src={menu.image}
                    alt={menu.name}
                    className="w-full mb-4 rounded h-64 object-cover object-center"
                  />
                  <Typography
                    variant="h6"
                    component="h3"
                    className="font-bold"
                  >
                    {menu.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="mt-2"
                  >
                    {menu.description}
                  </Typography>
                  {menu.options && (
                    <div className="w-full flex flex-row">
                      <Typography
                        variant="body2"
                        className="mt-2"
                      >
                        Options :
                      </Typography>
                      <Image
                        src={menu.options}
                        alt="Végétarien"
                        className="w-8 h-8"
                      />
                    </div>
                  )}
                  <Box className="items-end flex w-full h-full  pt-2">
                    <div className="items-center flex justify-between w-full">
                      <Typography
                        variant="body1"
                        className="font-bold"
                      >
                        {menu.price}
                      </Typography>
                      <IconButton color="primary">
                        <AddCircleOutlineIcon className="text-primary hover:text-secondary" />
                      </IconButton>
                    </div>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
}
