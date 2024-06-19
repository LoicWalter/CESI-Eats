'use client';

import { PrismaRestaurants } from '@api/cesieats';
import { createContext, useContext, useEffect, useState } from 'react';

type MenuWithItems = Omit<
  PrismaRestaurants.Prisma.menuGetPayload<{
    include: {
      items: true;
    };
  }>,
  'menuPicture'
>;
type Item = Omit<PrismaRestaurants.Prisma.itemGetPayload<{}>, 'itemPicture'>;

type CartByRestaurant = Record<string, CartElement[]>;

type CartElement = {
  type: 'menu' | 'item';
  object: MenuWithItems | Item;
  quantity: number;
};

const CartContext = createContext<{
  editCartFromRestaurant: (
    id: string,
  ) => (type: 'menu' | 'item', object: MenuWithItems | Item, action: 'add' | 'remove') => void;
  getCartFromRestaurant: (id: string) => CartElement[] | undefined;
  cart: CartByRestaurant;
  getTotalPrice: (id: string) => number;
  deleteRestaurantCart: (id: string) => void;
}>({} as any);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartByRestaurant>({});

  useEffect(() => {
    console.log('cart', cart);
    if (!cart || Object.keys(cart).length === 0) {
      const cart = localStorage.getItem('cart');
      const parsedCart = cart ? JSON.parse(cart) : {};
      if (cart && Object.keys(parsedCart).length > 0) {
        setCart(parsedCart);
      }
      return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const editCartFromRestaurant =
    (id: string) =>
    (type: 'menu' | 'item', object: MenuWithItems | Item, action: 'add' | 'remove') => {
      const currentCart = cart[id] || [];
      const objectIndex = currentCart.findIndex((element) => element.object.id === object.id);

      if (objectIndex !== -1) {
        if (action === 'remove') {
          if (currentCart[objectIndex].quantity === 1) {
            setCart({
              ...cart,
              [id]: currentCart.filter((_, index) => index !== objectIndex),
            });
            return;
          }
          currentCart[objectIndex].quantity -= 1;
        } else {
          currentCart[objectIndex].quantity += 1;
        }
        setCart({
          ...cart,
          [id]: currentCart,
        });
        return;
      }

      setCart({
        ...cart,
        [id]: [
          ...currentCart,
          {
            type,
            object,
            quantity: 1,
          },
        ],
      });
    };

  const getCartFromRestaurant = (id: string) => {
    return cart[id];
  };

  const deleteRestaurantCart = (id: string) => {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getTotalPrice = (id: string) =>
    (cart[id] || []).reduce(
      (acc, element) => acc + (element.object.price || 0) * element.quantity,

      0,
    );

  return (
    <CartContext.Provider
      value={{
        editCartFromRestaurant,
        getCartFromRestaurant,
        cart,
        getTotalPrice,
        deleteRestaurantCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (id: string = '') => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return {
    ...context,
    editCartFromRestaurant: context.editCartFromRestaurant(id),
    cartFromRestaurant: context.getCartFromRestaurant(id),
  };
};
