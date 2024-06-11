'use client';

import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { redirect } from 'next/dist/server/api-utils';
import { redirectWithGetParams } from '../utils';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const searchDelayed = useMemo(() => debounce(onInputChange, 500), [onInputChange]);

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    window.history.replaceState({}, '', `?search=${searchTerm}`);
  }, [searchTerm]);

  useEffect(() => {
    return () => {
      searchDelayed.cancel();
    };
  });

  return (
    <TextField
      className="ui-w-full md:ui-w-3/5 ui-h-9"
      id="input-with-icon-textfield"
      label="Rechercher"
      onChange={searchDelayed}
      InputProps={{
        className: 'ui-h-9',
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
}
