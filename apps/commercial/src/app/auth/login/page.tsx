'use client';

import React from 'react';
import { LoginPage } from '@repo/ui';
import Image from 'next/image';
import Logo from '../../favicon.ico';

function Login(): JSX.Element {
  return (
    <LoginPage
      logo={
        <Image
          alt="Logo"
          height={128}
          src={Logo}
          width={128}
        />
      }
      mustBeAdmin
    />
  );
}

export default Login;
