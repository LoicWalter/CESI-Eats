import React from 'react';
import { Profil } from '@repo/ui';

function page() {
  return <Profil page={process.env.NEXT_PUBLIC_CLIENT_URL as string} />;
}

export default page;
