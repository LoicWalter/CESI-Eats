import React from 'react';

export function HelperText({ children, error }: { children: React.ReactNode; error?: boolean }) {
  return <p className={`text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>{children}</p>;
}
