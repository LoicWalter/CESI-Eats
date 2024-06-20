import React from 'react';
import { AllDeliveries } from '@repo/ui';

// A remplacer par les données réelles #TODO
const restaurants = [
  { restaurantName: 'STARLING BURGER', address: '21 avenue du général de Gaulle, esplanade' },
  { restaurantName: 'SUSHI SHOP', address: '221 route de schirmeck, Strasbourg' },
  { restaurantName: 'DOMINOS PIZZA', address: '6 rue dahlenheim, Strasbourg' },
  { restaurantName: 'KFC', address: '51 Rue des cerises, Eckbolsheim' },
  { restaurantName: 'DEL ARTE', address: '2 allée des foulons, lingolsheim' },
  { restaurantName: 'DEL ARTE', address: '2 allée des foulons, lingolsheim' },
  { restaurantName: 'DEL ARTE', address: '2 allée des foulons, lingolsheim' },
];

export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <AllDeliveries deliveries={restaurants} />
    </div>
  );
}
