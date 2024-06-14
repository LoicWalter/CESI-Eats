import { AddressAutocomplete, SearchBar } from '@repo/ui';
import React from 'react';

export function SearchWrapper({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="ui-flex ui-flex-col ui-h-full ui-w-full ui-p-8">
      <div className="ui-flex ui-flex-col md:ui-flex-row ui-w-full ui-justify-around ui-gap-4 md:ui-gap-12">
        <SearchBar />
        <div className="ui-w-full md:ui-w-2/5">
          <AddressAutocomplete />
        </div>
      </div>
      <div className="ui-flex ui-flex-row ui-w-full ui-gap-12 ui-mt-8">{children}</div>
    </div>
  );
}
