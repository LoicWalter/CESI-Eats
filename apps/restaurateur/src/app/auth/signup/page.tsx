'use client';

import React from 'react';
import { createRestaurateurUser, SignupPage } from '@repo/ui';

function Signup(): JSX.Element {
  return <SignupPage action={createRestaurateurUser} />;
}

export default Signup;
