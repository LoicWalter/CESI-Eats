'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { createClientUser } from '@repo/ui';

function Signup(): JSX.Element {
  const [state, formAction] = useFormState(createClientUser, { error: '' });
  return (
    <div>
      <h1>Signup</h1>
      <p>{state.error}</p>
      <form
        action={formAction}
        className="flex flex-col"
      >
        <input
          placeholder="email"
          type="email"
          name="email"
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
