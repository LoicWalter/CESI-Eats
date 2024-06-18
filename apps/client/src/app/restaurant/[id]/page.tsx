'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Container,
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
import { ImageWithDefaultOnError, RestaurantsContextType, useCart } from '@repo/ui';
import { getRestaurant } from '@repo/ui/actions/get-restaurants.ts';
import { PrismaRestaurants } from '@api/cesieats';
import { RemoveCircleOutline } from '@mui/icons-material';

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
    <Container className="py-8 flex flex-col gap-12">
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
            {modal.menu?.items.map((item) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <ImageWithDefaultOnError
                    src={`${process.env.NEXT_PUBLIC_API_URL}/menu-picture/${item.itemPicture}`}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded object-cover object-center"
                    defaultReactNode={
                      <img
                        src={'https://via.placeholder.com/300'}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover object-center"
                      />
                    }
                    forceDefault={!item.itemPicture}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.description}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Modal>

      <Box className="flex flex-col md:flex-row mb-2 gap-4">
        <ImageWithDefaultOnError
          src={`${process.env.NEXT_PUBLIC_API_URL}/restaurants-picture/${fullRestaurant.restaurantPicture}`}
          alt={fullRestaurant.name || ''}
          width={300}
          height={300}
          defaultReactNode={
            <img
              src={'https://via.placeholder.com/300'}
              alt={fullRestaurant.name || ''}
              className="rounded object-cover object-center"
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
                {/* {restaurant.items.map((category, index) => (
                  <div
                    key={index}
                    className="w-12 h-12"
                  >
                    <Image
                      src={option.image}
                      alt={option.name}
                    />
                  </div>
                ))} */}
              </Box>
            </div>
          </div>
        </Box>
      </Box>
      <Divider />
      {fullRestaurant.menus && (
        <>
          <Typography variant="h5">Menus :</Typography>
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
                  className="p-4 flex flex-col items-start h-full"
                  onClick={() => setModal({ open: true, menu })}
                >
                  <ImageWithDefaultOnError
                    src={`${process.env.NEXT_PUBLIC_API_URL}/menu-picture/${menu.menuPicture}`}
                    alt={menu.name!}
                    width={48}
                    height={48}
                    className="w-full mb-4 rounded h-64 object-cover object-center"
                    defaultReactNode={
                      <img
                        src={'https://via.placeholder.com/300'}
                        alt={menu.name!}
                        className="w-full mb-4 rounded h-64 object-cover object-center"
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
                  )} */}
                  <Box className="items-end flex w-full h-full pt-2">
                    <div className="items-center flex justify-between w-full">
                      <Typography
                        variant="body1"
                        className="font-bold"
                      >
                        {menu.price}€
                      </Typography>
                      <div className="flex justify-center items-center gap-2">
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
        </>
      )}
      <Typography variant="h5">Articles :</Typography>
      <Grid
        container
        spacing={4}
      >
        {fullRestaurant.items?.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={item.id}
          >
            <Paper className="p-4 flex flex-col items-start h-full">
              <ImageWithDefaultOnError
                src={`${process.env.NEXT_PUBLIC_API_URL}/item-picture/${item.itemPicture}`}
                alt={item.name}
                width={48}
                height={48}
                className="w-full mb-4 rounded h-64 object-cover object-center"
                defaultReactNode={
                  <img
                    src={'https://via.placeholder.com/300'}
                    alt={item.name}
                    className="w-full mb-4 rounded h-64 object-cover object-center"
                  />
                }
                forceDefault={!item.itemPicture}
              />
              <Typography
                variant="h6"
                component="h3"
                className="font-bold"
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                className="mt-2"
              >
                {item.description}
              </Typography>
              {/* {item.options && (
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
                  )} */}
              <Box className="items-end flex w-full h-full  pt-2">
                <div className="items-center flex justify-between w-full">
                  <Typography
                    variant="body1"
                    className="font-bold"
                  >
                    {item.price}€
                  </Typography>
                  <div className="flex gap-2 justify-center items-center">
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
        ))}
      </Grid>
    </Container>
  );
}
