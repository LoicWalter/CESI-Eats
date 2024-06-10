'use client';

import { AccountCircleOutlined, PersonOutline } from '@mui/icons-material';
import React from 'react';
import { Divider } from '@mui/material';
import { useOnHover } from '../hooks/useOnHover';

interface NavbarProps {
  logo: React.ReactElement;
  iconArray: { icon: JSX.Element; text: string; id: string }[];
}

export function Navbar({ logo, iconArray }: NavbarProps): JSX.Element {
  const [hovered, bind] = useOnHover();

  return (
    <>
      <div className="flex md:hidden fixed bottom-0 w-full h-12 z-10 border-t-gray-4 border-[1px] bg-gray-5 text-gray-3">
        <div className="flex flex-row justify-evenly w-full h-full">
          {iconArray.map(({ icon, id }) => (
            <React.Fragment key={id}>
              <NavItem icon={icon} />
              <Divider
                className="border-gray-4 my-2"
                orientation="vertical"
              />
            </React.Fragment>
          ))}
          <NavItem icon={<PersonOutline />} />
        </div>
      </div>
      <div
        className="hidden sticky top-0 h-screen border-r-gray-4 border-[1px] bg-gray-5 text-gray-3 md:flex flex-col items-center hover:w-40 transition-all duration-300 w-16 z-20"
        {...bind}
      >
        <div className="my-3">{logo}</div>
        <Divider
          className="w-full border-gray-4"
          color=""
        />
        <div className="flex flex-col justify-between w-full h-full">
          <div>
            {iconArray.map(({ icon, text, id }) => (
              <NavItem
                hovered={hovered}
                icon={icon}
                key={id}
                text={text}
              />
            ))}
          </div>
          <div>
            <NavItem
              hovered={hovered}
              icon={<AccountCircleOutlined />}
              text="Connexion"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function NavItem({
  icon,
  text = '',
  hovered = false,
}: {
  icon: JSX.Element;
  text?: string;
  hovered?: boolean;
}): JSX.Element {
  return (
    <div className="flex items-center p-5 hover:bg-primary hover:text-gray-5">
      <div>{icon}</div>
      {text !== '' && (
        <div className={`text-sm ml-4 transition-all ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          {text}
        </div>
      )}
    </div>
  );
}
