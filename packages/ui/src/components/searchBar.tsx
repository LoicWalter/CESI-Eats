'use client';

import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { useUser } from '../utils';

interface SearchBarProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchBar({ setSearch }: SearchBarProps): JSX.Element {
  const user = useUser();

  const [address, setAddress] = useState<string>(user?.address ?? '');

  useEffect(() => {
    const storageAddress = localStorage.getItem('address');
    if (storageAddress && !address) {
      setAddress(storageAddress);
    }
  }, [address]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(event.target.value);
  };

  const searchDelayed = useMemo(() => debounce(onInputChange, 500), [onInputChange]);

  useEffect(() => {
    return () => {
      searchDelayed.cancel();
    };
  }, []);

  return (
    <>
      <TextField
        className="ui-w-full md:ui-w-3/5"
        id="input-with-icon-textfield"
        label="Rechercher"
        onChange={searchDelayed}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <div className="ui-w-full md:ui-w-2/5">
        <TextField
          fullWidth
          label="Adresse"
          variant="outlined"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            localStorage.setItem('address', e.target.value);
          }}
        />
      </div>
    </>
  );
}
