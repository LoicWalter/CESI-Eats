import Viande from '../assets/viande.png';
import Poisson from '../assets/poisson.png';
import Vegan from '../assets/Vegan-Transparent.png';
import Vegetarien from '../assets/Vegetarian Mark.png';

export const categories = [
  { label: 'Café', value: 'café' },
  { label: 'Bar', value: 'bar' },
  { label: 'Brasserie', value: 'brasserie' },
  { label: 'Fast food', value: 'fast-food' },
  { label: 'Restaurant mexicain', value: 'mexicain' },
  { label: 'Restaurant de sushis', value: 'sushis' },
  { label: 'Boulangerie', value: 'boulangerie' },
  { label: 'Pizzeria', value: 'pizzeria' },
  { label: 'Restaurant italien', value: 'italien' },
  { label: 'Restaurant chinois', value: 'chinois' },
  { label: 'Restaurant indien', value: 'indien' },
  { label: 'Restaurant thaïlandais', value: 'thaïlandais' },
  { label: 'Restaurant végétarien', value: 'végétarien' },
  { label: 'Restaurant libanais', value: 'libanais' },
  { label: 'Steakhouse', value: 'steakhouse' },
];

export const itemCategory = [
  { value: 'entree', label: 'Entrée' },
  { value: 'plat', label: 'Plat' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'boisson', label: 'Boisson' },
  { value: 'autres', label: 'Autres' },
];

export const itemRegime = [
  {
    value: 'vegan',
    label: 'Vegan',
    image: Vegan,
  },
  {
    value: 'vegetarien',
    label: 'Végétarien',
    image: Vegetarien,
  },
  {
    value: 'Poisson',
    label: 'Poisson',
    image: Poisson,
  },
  {
    value: 'viande',
    label: 'Viande',
    image: Viande,
  },
];
