import React from 'react';
import Image from 'next/image';
import { Profil } from '@repo/ui';
import MaPhoto from '../../assets/testPhotoProfil.png';

const user = {
  username: 'John Doe',
  email: 'john.doe@gmail.com',
  mobile: '06 12 34 56 78',
  password: 'ArchtungBicyclette',
  adress: '',
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
};

function page() {
  return <Profil />;
}

export default page;
