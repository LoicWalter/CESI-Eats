import React from 'react';
import { CircularAddButton, ImageWithDefaultOnError, RestaurantContextType } from '@repo/ui';
import { EuroRounded } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import defaultMealPic from '../assets/default-meal-pic.png';
import { PrismaRestaurants } from '@api/cesieats';

interface MealItemProps {
  mealName?: string;
  price?: number;
  desc?: string;
  mealPic?: string;
}

interface MealSectionProps {
  category: string;
  meals:
    | PrismaRestaurants.Prisma.menuGetPayload<{
        include: { items: true };
      }>[]
    | PrismaRestaurants.item[];
  picture?: string;
}

interface MealCardProps {
  mealCards: MealSectionProps[];
  restaurant: RestaurantContextType;
}

// {fullRestaurant.menus && fullRestaurant.menus.length > 0 && (
//         <div className="flex flex-col gap-4">
//           <Typography
//             variant="h5"
//             className="font-bold"
//           >
//             Menus
//           </Typography>
//           <Grid
//             container
//             spacing={4}
//           >
//             {fullRestaurant.menus?.map((menu) => (
//               <Grid
//                 item
//                 xs={12}
//                 sm={6}
//                 md={4}
//                 key={menu.id}
//               >
//                 <Paper
//                   className="flex flex-col items-start h-full p-4"
//                   onClick={() => setModal({ open: true, menu })}
//                 >
//                   <ImageWithDefaultOnError
//                     src={`${process.env.NEXT_PUBLIC_API_URL}/menu/${menu.menuPicture}/picture`}
//                     alt={menu.name!}
//                     width={48}
//                     height={48}
//                     className="object-cover object-center w-full h-64 mb-4 rounded"
//                     defaultReactNode={
//                       <img
//                         src={'https://via.placeholder.com/300'}
//                         alt={menu.name!}
//                         className="object-cover object-center w-full h-64 mb-4 rounded"
//                       />
//                     }
//                     forceDefault={!menu.menuPicture}
//                   />
//                   <Typography
//                     variant="h6"
//                     component="h3"
//                     className="font-bold"
//                   >
//                     {menu.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     className="mt-2"
//                   >
//                     {menu.description}
//                   </Typography>
//                   {/* {item.options && (
//                     <div className="flex flex-row w-full">
//                       <Typography
//                         variant="body2"
//                         className="mt-2"
//                       >
//                         Options :
//                       </Typography>
//                       <Image
//                         src={menu.options}
//                         alt="Végétarien"
//                         className="w-8 h-8"
//                       />
//                     </div>
//                   )} */}
//                   <Box className="flex items-end w-full h-full pt-2">
//                     <div className="flex items-center justify-between w-full">
//                       <Typography
//                         variant="body1"
//                         className="font-bold"
//                       >
//                         {menu.price}€
//                       </Typography>
//                       <div className="flex items-center justify-center gap-2">
//                         {findInCart(menu.id, 'menu') ? (
//                           <>
//                             <IconButton
//                               color="primary"
//                               onClick={(e) => addToCart(e, 'menu', menu, 'remove')}
//                             >
//                               <RemoveCircleOutline className="text-primary hover:text-secondary" />
//                             </IconButton>
//                             <Typography
//                               variant="body1"
//                               className="text-center"
//                             >
//                               {findInCart(menu.id, 'menu')?.quantity}
//                             </Typography>
//                           </>
//                         ) : null}

//                         <IconButton
//                           color="primary"
//                           onClick={(e) => addToCart(e, 'menu', menu, 'add')}
//                         >
//                           <AddCircleOutlineIcon className="text-primary hover:text-secondary" />
//                         </IconButton>
//                       </div>
//                     </div>
//                   </Box>
//                 </Paper>
//               </Grid>
//             ))}

export function MealCard({ mealCards, restaurant }: MealCardProps): JSX.Element {
  return (
    <div className="ui-flex ui-flex-col ui-justify-center ui-w-full ui-h-full">
      {restaurant.menus && (
        <MealSection
          category="Menus"
          meals={
            restaurant.menus as PrismaRestaurants.Prisma.menuGetPayload<{
              include: { items: true };
            }>[]
          }
        />
      )}
    </div>
  );
}

function MealSection({ category, meals, picture }: MealSectionProps): JSX.Element {
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
            mealName={meal.name || ''}
            price={meal.price || 0}
            desc={meal.description || ''}
            mealPic={`${process.env.NEXT_PUBLIC_API_URL}/menu/${meal}/picture`}
          />
        ))}
      </div>
    </div>
  );
}

function MealItem({ mealName, price, desc, mealPic }: MealItemProps): JSX.Element {
  return (
    <div className="ui-flex ui-justify-between ui-mb-2 md:ui-mb-4 ui-overflow-hidden">
      <div className="ui-flex ui-flex-col ui-w-3/5 md:ui-max-h-28 ui-justify-start">
        <Typography
          variant="h6"
          component="h5"
          className="ui-flex ui-items-center ui-w-full md:ui-min-h-[1.6875rem] ui-font-display ui-font-bold md:ui-text-[1.5625rem] ui-my-2 md:ui-my-3 ui-truncate"
        >
          {mealName}
        </Typography>
        <div className="ui-flex ui-w-full ui-items-center ui-mb-2 md:ui-mb-3">
          <Typography
            variant="body1"
            className="ui-font-display md:ui-text-[1.25rem]"
          >
            {price}
          </Typography>
          <EuroRounded className="ui-w-4 ui-h-4 ui-ml-1 md:ui-w-5 md:ui-h-5 md:ui-ml-[0.375rem]" />
        </div>
        <Typography
          variant="body1"
          className="ui-flex ui-w-full md:ui-min-h-full ui-max-h-12 md:ui-max-auto ui-font-display ui-text-gray-3 md:ui-text-[1.25rem] ui-overflow-hidden ui-text-ellipsis"
        >
          {desc}
        </Typography>
      </div>
      <div className="ui-relative ui-flex ui-justify-end ui-ml-4 ui-w-2/5 ui-rounded ui-overflow-hidden">
        <div className="ui-min-w-28 ui-min-h-28 ui-w-28 ui-h-28 md:ui-min-w-[14rem] md:ui-min-h-[14rem] md:ui-w-[14rem] md:ui-h-[14rem] ui-bg-gray-1">
          <ImageWithDefaultOnError
            src={mealPic}
            alt={mealName}
            width={48}
            height={48}
            className="object-cover object-center w-full h-64 mb-4 rounded"
            defaultReactNode={
              <Image
                src={defaultMealPic as StaticImageData}
                alt={`${mealName} +  picture`}
                className="ui-h-full ui-object-cover ui-object-center"
              ></Image>
            }
            forceDefault={!mealPic}
          />

          <div className="ui-hidden">
            <CircularAddButton />
          </div>
        </div>
      </div>
    </div>
  );
}
