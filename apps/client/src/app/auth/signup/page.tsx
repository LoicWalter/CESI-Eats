'use client';

import React from 'react';
import { createClientUser, SignupPage } from '@repo/ui';

interface FormValues {
  email: string;
  password: string;
}

function Signup(): JSX.Element {
  return <SignupPage action={createClientUser} />;
}

export default Signup;
