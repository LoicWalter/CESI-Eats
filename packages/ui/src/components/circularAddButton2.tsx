import React from 'react';
import { AddRounded } from '@mui/icons-material';

export function CircularAddButton2(): JSX.Element {
  return (
    <button className="ui-absolute ui-top-0 ui-flex ui-items-center ui-justify-center ui-w-8 ui-h-8 md:ui-w-12 md:ui-h-12 ui-m-2 ui-bg-gray-5 ui-rounded-full ui-border-b-gray-4 ui-border-b-[0.0625rem] md:ui-border-b-[0.125rem] ui-shadow-[0_0.125rem_0.25rem_0_rgba(204,209,212,0.4)] hover:ui-bg-primary hover:ui-text-gray-5 active:ui-bg-secondary active:ui-text-gray-5 active:ui-border-b-0 active:ui-shadow-[inset_0.125rem_0.125rem_0.25rem_0_rgba(0,0,0,0.4)]">
      <AddRounded className="ui-w-7 ui-h-7 md:ui-w-[2.625rem] md:ui-h-[2.625rem] ui-text-primary hover:ui-text-gray-5 active:ui-text-gray-5" />
    </button>
  );
}
