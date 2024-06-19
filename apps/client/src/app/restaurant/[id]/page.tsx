'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Modal,
  ListItemAvatar,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  IconWithTooltip,
  ImageWithDefaultOnError,
  itemCategory,
  itemRegime,
  RestaurantsContextType,
  useCart,
} from '@repo/ui';
import { getRestaurant } from '@repo/ui/actions/get-restaurants.ts';
import { PrismaRestaurants } from '@api/cesieats';
import { RemoveCircleOutline } from '@mui/icons-material';
import Image from 'next/image';
import Viande from '../../../assets/viande.png';
import Poisson from '../../../assets/poisson.png';
import Vegan from '../../../assets/Vegan-Transparent.png';
import Vegetarien from '../../../assets/Vegetarian Mark.png';

type MenuWithItems = PrismaRestaurants.Prisma.menuGetPayload<{
  include: {
    items: true;
  };
}>;
type Item = PrismaRestaurants.Prisma.itemGetPayload<{}>;

export default function Page({ params }: { params: { id: string } }) {
  const [fullRestaurant, setFullRestaurant] = useState<RestaurantsContextType>(
    {} as RestaurantsContextType,
  );
  const [modal, setModal] = useState<{
    open: boolean;
    menu: MenuWithItems | null;
  }>({
    open: false,
    menu: null,
  });
  const { id } = params;
  const { editCartFromRestaurant, cartFromRestaurant } = useCart(id);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await getRestaurant(id);
      if (typeof response === 'string') {
        console.error(response);
        return;
      }
      setFullRestaurant(response);
    };

    fetchRestaurant();
  }, [id]);

  if (!fullRestaurant) {
    return <div>Restaurant not found</div>;
  }

  const addToCart = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      type: 'menu' | 'item',
      object: MenuWithItems | Item,
      action: 'add' | 'remove',
    ) => {
      e.preventDefault();
      e.stopPropagation();

      editCartFromRestaurant(type, object, action);
    },
    [editCartFromRestaurant],
  );

  const findInCart = (id: string, type: 'menu' | 'item') => {
    return cartFromRestaurant?.find((element) => element.type === type && element.object.id === id);
  };

  return (
    <div className="flex flex-col gap-12 py-8">
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

      <Box className="flex flex-col gap-4 mb-2 md:flex-row">
        <ImageWithDefaultOnError
          src={`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${fullRestaurant.restaurantPicture}/picture`}
          alt={fullRestaurant.name || ''}
          width={300}
          height={300}
          defaultReactNode={
            <img
              src={'https://via.placeholder.com/300'}
              alt={fullRestaurant.name || ''}
              className="object-cover object-center rounded"
            />
          }
          forceDefault={!fullRestaurant.restaurantPicture}
        />
        <Box className="flex flex-col gap-8">
          <Typography
            variant="h4"
            component="h1"
            className="font-bold"
          >
            {fullRestaurant.name || ''}
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
                2€
              </Typography>
            </div>
            <div className="flex gap-2">
              <Typography
                variant="body1"
                className="mt-2"
              >
                Adresse :
              </Typography>
              <Typography
                variant="body1"
                className="mt-2 font-bold"
              >
                {fullRestaurant.address}
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
                {fullRestaurant?.items
                  ?.reduce((acc, item) => {
                    if (!item.regime) {
                      return acc;
                    }

                    if (acc.includes(item.regime)) {
                      return acc;
                    }
                    return [...acc, item.regime];
                  }, [] as string[])
                  .map((regime) => {
                    const regimeInfo = itemRegime.find((regimeInfo) => regimeInfo.value === regime);
                    if (!regimeInfo) {
                      return null;
                    }
                    return (
                      <Image
                        key={regime}
                        src={regimeInfo.image}
                        alt={regimeInfo.label}
                        className="w-8 h-8"
                      />
                    );
                  })}
              </Box>
            </div>
          </div>
        </Box>
      </Box>
      <Divider />
      {fullRestaurant.menus && fullRestaurant.menus.length > 0 && (
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
            {fullRestaurant.menus?.map((menu) => (
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
                  {/* {item.options && (
                    <div className="flex flex-row w-full">
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
                  )} */}
                  <Box className="flex items-end w-full h-full pt-2">
                    <div className="flex items-center justify-between w-full">
                      <Typography
                        variant="body1"
                        className="font-bold"
                      >
                        {menu.price}€
                      </Typography>
                      <div className="flex items-center justify-center gap-2">
                        {findInCart(menu.id, 'menu') ? (
                          <>
                            <IconButton
                              color="primary"
                              onClick={(e) => addToCart(e, 'menu', menu, 'remove')}
                            >
                              <RemoveCircleOutline className="text-primary hover:text-secondary" />
                            </IconButton>
                            <Typography
                              variant="body1"
                              className="text-center"
                            >
                              {findInCart(menu.id, 'menu')?.quantity}
                            </Typography>
                          </>
                        ) : null}

                        <IconButton
                          color="primary"
                          onClick={(e) => addToCart(e, 'menu', menu, 'add')}
                        >
                          <AddCircleOutlineIcon className="text-primary hover:text-secondary" />
                        </IconButton>
                      </div>
                    </div>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Divider />
        </div>
      )}
      <div className="flex flex-col gap-4">
        <Grid
          container
          spacing={4}
        >
          {itemCategory.map((category) => {
            const items = fullRestaurant.items?.filter((item) => item.category === category.value);
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
                          {/* {item.options && (
                    <div className="flex flex-row w-full">
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
                  )} */}
                          <Box className="flex items-end w-full h-full pt-2">
                            <div className="flex items-center justify-between w-full">
                              <Typography
                                variant="body1"
                                className="font-bold"
                              >
                                {item.price}€
                              </Typography>
                              <div className="flex items-center justify-center gap-2">
                                {findInCart(item.id, 'item') ? (
                                  <>
                                    <IconButton
                                      color="primary"
                                      onClick={(e) => addToCart(e, 'item', item, 'remove')}
                                    >
                                      <RemoveCircleOutline className="text-primary hover:text-secondary" />
                                    </IconButton>
                                    <Typography
                                      variant="body1"
                                      className="text-center"
                                    >
                                      {findInCart(item.id, 'item')?.quantity}
                                    </Typography>
                                  </>
                                ) : null}
                                <IconButton
                                  color="primary"
                                  onClick={(e) => addToCart(e, 'item', item, 'add')}
                                >
                                  <AddCircleOutlineIcon className="text-primary hover:text-secondary" />
                                </IconButton>
                              </div>
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
  );
}
