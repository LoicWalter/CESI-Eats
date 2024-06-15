import React from 'react';
import { Profil } from '@repo/ui';

function page() {
  return <Profil page={process.env.NEXT_PUBLIC_RESTAURATEUR_URL as string} />;
}

export default page;
