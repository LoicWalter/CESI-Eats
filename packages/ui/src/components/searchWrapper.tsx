'use client';

import { SearchBar } from '@repo/ui';
import React from 'react';

interface SearchWrapperProps {
  children: React.ReactNode;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchWrapper({ children, setSearch }: SearchWrapperProps): JSX.Element {
  return (
    <div className="ui-flex ui-flex-col ui-h-full ui-w-full ui-p-8">
      <div className="ui-flex ui-flex-col md:ui-flex-row ui-w-full ui-justify-around ui-gap-4 md:ui-gap-12">
        <SearchBar setSearch={setSearch} />
      </div>
      <div className="ui-flex ui-flex-row ui-w-full ui-gap-12 ui-mt-8">{children}</div>
    </div>
  );
}
