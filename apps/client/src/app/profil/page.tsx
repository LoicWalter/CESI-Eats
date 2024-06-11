import React from 'react';
import Image from 'next/image';
import { Profil } from '@repo/ui';
import MaPhoto from '../pictures/testPhotoProfil.png';

const user = {
  username: 'John Doe',
  email: 'john.doe@gmail.com',
  mobile: '06 12 34 56 78',
  password: 'ArchtungBicyclette',
};

function page() {
  return (
    <Profil
      picture={
        <Image
          alt="profil"
          className="rounded-full aspect-square object-cover object-center"
          height={325}
          src={MaPhoto}
          width={325}
        />
      }
      user={user}
    />
  );
}

export default page;
