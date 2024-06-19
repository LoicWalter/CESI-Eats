import React from 'react';

export function HelperText({ children, error }: { children: React.ReactNode; error?: boolean }) {
  return (
    <p className={`ui-text-sm ${error ? 'ui-text-red-500' : 'ui-text-gray-500'}`}>{children}</p>
  );
}
