'use client';

import React from 'react';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete';

import styled from '@emotion/styled';
import { LocationOn } from '@mui/icons-material';

const Container = styled.div`
  .geocoder-container {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    padding: 0 7px 0 7px;
  }

  .geoapify-autocomplete-input {
    outline: none;
    line-height: 36px;
    height: 36px;
    width: calc(100% - 40px);
  }

  .geoapify-autocomplete-items {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    right: 0;

    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;

    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
    z-index: 99;
  }

  .geoapify-autocomplete-items div {
    padding: 10px;
    cursor: pointer;
  }

  .geoapify-autocomplete-items div:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .geoapify-autocomplete-items .active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .geoapify-autocomplete-item {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .geoapify-autocomplete-item .icon {
    display: inline-block;
    width: 40px;
    height: 24px;
    color: #aaa;
  }

  .geoapify-autocomplete-item .icon.emoji {
    color: unset;
    font-size: 20px;
    opacity: 0.9;
  }

  .geoapify-close-button {
    position: absolute;
    right: 10px;
    top: 0;

    height: 100%;
    display: none;
    align-items: center;
  }

  .geoapify-close-button.visible {
    display: flex;
  }

  .geoapify-close-button {
    color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

  .geoapify-close-button:hover {
    color: rgba(0, 0, 0, 0.6);
  }

  .geoapify-autocomplete-items .main-part .non-verified {
    color: #ff4848;
  }

  .geoapify-autocomplete-items .secondary-part {
    margin-left: 10px;
    font-size: small;
    color: rgba(0, 0, 0, 0.6);
  }
`;

export function AddressAutocomplete() {
  return (
    <GeoapifyContext apiKey="9c3b443ce01249f2b3f66c6681aa0b38">
      <div className="ui-flex ui-flex-row ui-w-full ui-justify-center ui-items-center ui-gap-3">
        <LocationOn />
        <Container className="ui-w-full">
          <GeoapifyGeocoderAutocomplete
            placeholder="Choisir une adresse"
            lang="fr"
            debounceDelay={100}
            limit={5}
          />
        </Container>
      </div>
    </GeoapifyContext>
  );
}
