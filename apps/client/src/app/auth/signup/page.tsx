'use client';

import React, { Suspense } from 'react';
import { createClientUser, SignupPage } from '@repo/ui';

interface FormValues {
  email: string;
  password: string;
}

function Signup(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPage action={createClientUser} />
    </Suspense>
  );
}

export default Signup;
