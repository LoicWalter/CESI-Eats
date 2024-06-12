'use client';

import React from 'react';
import { SignupPage } from '@repo/ui';

interface FormValues {
  email: string;
  password: string;
}

function Signup(): JSX.Element {
  return <SignupPage />;
}

export default Signup;
