'use client';

import { HomeMax, VerifiedUser, WhereToVoteOutlined } from '@mui/icons-material';
import React from 'react';
import useOnHover from '../hooks/useOnHover';

export function Navbar(): JSX.Element {
  const [hovered, bind] = useOnHover();

  return (
    <div
      className="sticky top-0 left-0 h-screen bg-gray-800 text-white flex flex-col items-center hover:w-40 transition-all duration-300 w-16"
      {...bind}
    >
      <NavItem
        hovered={hovered}
        icon={<HomeMax />}
        text="Home"
      />
      <NavItem
        hovered={hovered}
        icon={<VerifiedUser />}
        text="Profile"
      />
      <NavItem
        hovered={hovered}
        icon={<WhereToVoteOutlined />}
        text="Settings"
      />
    </div>
  );
}

function NavItem({
  icon,
  text,
  hovered,
}: {
  icon: JSX.Element;
  text: string;
  hovered: boolean;
}): JSX.Element {
  return (
    <div className="group flex items-center w-full p-4 hover:bg-gray-700">
      <div className="text-xl">{icon}</div>
      <div className={`text-sm ml-4 transition-all ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        {text}
      </div>
    </div>
  );
}
