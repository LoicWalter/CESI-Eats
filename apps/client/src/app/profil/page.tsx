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
  return (
    <Profil
      picture={
        <Image
          alt="profil"
          className="rounded-full aspect-square object-cover object-center h-64 w-64 justify-center"
          src={MaPhoto}
        />
      }
      user={user}
    />
  );
}

export default page;
