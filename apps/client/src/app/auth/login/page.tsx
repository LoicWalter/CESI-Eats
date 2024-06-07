'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { login } from '@repo/ui';

function Login(): JSX.Element {
  const [state, formAction] = useFormState(login, { error: '' });
  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
