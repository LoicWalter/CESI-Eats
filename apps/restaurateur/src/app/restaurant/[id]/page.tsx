'use client';

import React, { useMemo, useState } from 'react';
import {
  DietsIcons,
  CircularArrowBackButton,
  CircularEditButton,
  useRestaurant,
  ImageWithDefaultOnError,
  itemRegime,
  IconWithTooltip,
  itemCategory,
  StyledButton,
} from '@repo/ui';
import Image, { StaticImageData } from 'next/image';
import defaultRestaurantPic from '../../../assets/default-restaurant-pic.png';
import Link from 'next/link';
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import { PrismaRestaurants } from '@api/cesieats';
import { Delete, Edit } from '@mui/icons-material';
import { deleteMenu } from '@repo/ui/actions/delete-menu.ts';
import { deleteItem } from '@repo/ui/actions/delete-item.ts';

type MenuWithItems = PrismaRestaurants.Prisma.menuGetPayload<{
  include: {
    items: true;
  };
}>;
type Item = PrismaRestaurants.Prisma.itemGetPayload<{}>;

export default function Page(): JSX.Element {
  const restaurant = useRestaurant();
  const allRegimes = useMemo(
    () =>
      restaurant?.items?.reduce((acc, item) => {
        if (!item.regime) {
          return acc;
        }

        if (acc.includes(item.regime)) {
          return acc;
        }
        return [...acc, item.regime];
      }, [] as string[]),

    [restaurant],
  );
  const [modal, setModal] = useState<{
    open: boolean;
    menu: MenuWithItems | null;
  }>({
    open: false,
    menu: null,
  });

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="relative w-full h-[20%] mb-6 overflow-hidden border-b-gray-4 border-b-[0.0625rem] shadow-[0_0.125rem_0.25rem_0_rgba(204,209,212,0.4)] select-none">
        <div className="flex justify-center w-full h-full bg-secondary">
          <ImageWithDefaultOnError
            src={`${process.env.NEXT_PUBLIC_API_URL}/restaurant/${restaurant.restaurantPicture}/picture`}
            alt="restaurant"
            width="2000"
            height="2000"
            className="ui-object-cover ui-object-center"
            defaultReactNode={
              <Image
                src={defaultRestaurantPic as StaticImageData}
                alt="restaurant"
                width={2000}
                height={2000}
                className="ui-object-cover ui-object-center"
              />
            }
          />
        </div>
        <Link href={`/restaurant/${restaurant.id}/edit`}>
          <CircularEditButton />
        </Link>
      </div>
      <div className="flex flex-col items-center w-[92%] md:w-[70%] h-[80%]">
        <div className="flex flex-col items-start w-full md:w-full">
          <Typography
            variant="h4"
            component="h3"
            className="font-display font-bold mb-2"
          >
            {restaurant.name}
          </Typography>
          <Typography
            variant="body1"
            className="font-display text-gray-3 mb-2 truncate"
          >
            {restaurant.address}
          </Typography>
          <div className="flex justify-start gap-2">
            <Typography
              variant="body1"
              className="w-[6.25rem] font-display font-bold mb-2 truncate"
            >
              Téléphone :
            </Typography>
            <Typography
              variant="body1"
              className="font-display mb-2"
            >
              {restaurant.phone}
            </Typography>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="w-full">
              <p className="w-[6.25rem] font-display font-bold mb-2 whitespace-nowrap">Régimes :</p>
            </div>
            {allRegimes?.map((regime) => (
              <div className="ui-w-12 ui-h-12">
                <Image
                  src={itemRegime.find((item) => item.value === regime)?.image as StaticImageData}
                  alt={itemRegime.find((item) => item.value === regime)?.value as string}
                  className="ui-object-center ui-w-full ui-h-full"
                />
              </div>
            ))}
          </div>
          <Link href={`/restaurant/${restaurant.id}/historique`}>
            <StyledButton
              type="button"
              className="mt-4"
            >
              Accéder aux commandes
            </StyledButton>
          </Link>
          <div className="flex justify-start flex-row gap-2">
            <Link href={`/restaurant/${restaurant.id}/menu`}>
              <StyledButton
                type="button"
                className="mt-4"
              >
                Ajouter un menu
              </StyledButton>
            </Link>
            <Link href={`/restaurant/${restaurant.id}/item`}>
              <StyledButton
                type="button"
                className="mt-4"
              >
                Ajouter un article
              </StyledButton>
            </Link>
          </div>
        </div>
        <Modal
          open={modal.open}
          onClose={() => setModal({ open: false, menu: null })}
          className="flex items-center justify-center"
        >
          <div className="flex flex-col gap-4 p-8 bg-white focus-visible:outline-none">
            <Typography
              variant="h4"
              className="font-bold"
            >
              {modal.menu?.name}
            </Typography>
            <Typography variant="body1">{modal.menu?.description}</Typography>
            <Typography
              variant="body1"
              className="font-bold"
            >
              {modal.menu?.price}€
            </Typography>
            <List>
              {modal.menu?.items.map((item) => {
                const regime = itemRegime.find((regime) => regime.value === item.regime);
                return (
                  <ListItem key={item.id}>
                    <ListItemAvatar>
                      <ImageWithDefaultOnError
                        src={`${process.env.NEXT_PUBLIC_API_URL}/item/${item.itemPicture}/picture`}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="object-cover object-center w-12 h-12 rounded"
                        defaultReactNode={
                          <img
                            src={'https://via.placeholder.com/300'}
                            alt={item.name}
                            className="object-cover object-center w-12 h-12 rounded"
                          />
                        }
                        forceDefault={!item.itemPicture}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={item.description}
                    />
                    <ListItemAvatar>
                      <IconWithTooltip tooltip={regime?.label || ''}>
                        {regime && (
                          <Image
                            src={regime.image}
                            alt={regime.label}
                            className="w-8 h-8"
                          />
                        )}
                      </IconWithTooltip>
                    </ListItemAvatar>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Modal>
        <div className="flex items-center w-full">
          {restaurant.menus && restaurant.menus.length > 0 && (
            <div className="flex flex-col gap-4">
              <Typography
                variant="h5"
                className="font-bold"
              >
                Menus
              </Typography>
              <Grid
                container
                spacing={4}
              >
                {restaurant.menus?.map((menu) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={menu.id}
                  >
                    <Paper
                      className="flex flex-col items-start h-full p-4"
                      onClick={() => setModal({ open: true, menu })}
                    >
                      <ImageWithDefaultOnError
                        src={`${process.env.NEXT_PUBLIC_API_URL}/menu/${menu.menuPicture}/picture`}
                        alt={menu.name!}
                        width={48}
                        height={48}
                        className="object-cover object-center w-full h-64 mb-4 rounded"
                        defaultReactNode={
                          <img
                            src={'https://via.placeholder.com/300'}
                            alt={menu.name!}
                            className="object-cover object-center w-full h-64 mb-4 rounded"
                          />
                        }
                        forceDefault={!menu.menuPicture}
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
                      <Box className="flex items-end w-full h-full pt-2">
                        <div className="flex items-center justify-between w-full">
                          <Typography
                            variant="body1"
                            className="font-bold"
                          >
                            {menu.price}€
                          </Typography>
                          <Link href={`/restaurant/${restaurant.id}/menu/${menu.id}`}>
                            <IconButton>
                              <Edit />
                            </IconButton>
                          </Link>
                          <IconButton
                            onClick={async () => {
                              const rep = await deleteMenu(menu.id, restaurant.id as string);
                              if (!rep) {
                                location.reload();
                              }
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </div>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <Grid
              container
              spacing={4}
            >
              {itemCategory.map((category) => {
                const items = restaurant.items?.filter((item) => item.category === category.value);
                if (!items || items.length === 0) {
                  return null;
                }
                return (
                  <Grid
                    item
                    xs={12}
                    key={category.value}
                  >
                    <Typography
                      variant="h5"
                      className="mb-4 font-bold"
                    >
                      {category.label}
                    </Typography>
                    <Grid
                      container
                      spacing={4}
                    >
                      {items.map((item) => {
                        const regime = itemRegime.find((regime) => regime.value === item.regime);
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={item.id}
                          >
                            <Paper className="flex flex-col items-start h-full p-4">
                              <ImageWithDefaultOnError
                                src={`${process.env.NEXT_PUBLIC_API_URL}/item/${item.itemPicture}/picture`}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="object-cover object-center w-full h-64 mb-4 rounded"
                                defaultReactNode={
                                  <img
                                    src={'https://via.placeholder.com/300'}
                                    alt={item.name}
                                    className="object-cover object-center w-full h-64 mb-4 rounded"
                                  />
                                }
                                forceDefault={!item.itemPicture}
                              />
                              <div className="flex flex-row justify-between w-full">
                                <Typography
                                  variant="h6"
                                  component="h3"
                                  className="font-bold"
                                >
                                  {item.name}
                                </Typography>
                                <IconWithTooltip tooltip={regime?.label || ''}>
                                  {regime && (
                                    <Image
                                      src={regime.image}
                                      alt={regime.label}
                                      className="w-8 h-8"
                                    />
                                  )}
                                </IconWithTooltip>
                              </div>
                              <Typography
                                variant="body2"
                                className="mt-2"
                              >
                                {item.description}
                              </Typography>
                              <Box className="flex items-end w-full h-full pt-2">
                                <div className="flex items-center justify-between w-full">
                                  <Typography
                                    variant="body1"
                                    className="font-bold"
                                  >
                                    {item.price}€
                                  </Typography>
                                  <Link href={`/restaurant/${restaurant.id}/item/${item.id}`}>
                                    <IconButton>
                                      <Edit />
                                    </IconButton>
                                  </Link>
                                  {item.menuIDs && item.menuIDs.length === 0 && (
                                    <IconButton
                                      onClick={async () => {
                                        const rep = await deleteItem(
                                          item.id,
                                          restaurant.id as string,
                                        );
                                        if (!rep) {
                                          location.reload();
                                        }
                                      }}
                                    >
                                      <Delete />
                                    </IconButton>
                                  )}
                                </div>
                              </Box>
                            </Paper>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
