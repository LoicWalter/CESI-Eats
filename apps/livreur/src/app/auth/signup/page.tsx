'use client';

import React from 'react';
import { createLivreurUser, SignupPage } from '@repo/ui';

function Signup(): JSX.Element {
  return <SignupPage action={createLivreurUser} />;
}

export default Signup;
