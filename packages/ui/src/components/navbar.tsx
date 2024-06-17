'use client';

import { AccountCircleOutlined, Logout, PersonOutline } from '@mui/icons-material';
import React from 'react';
import { Divider } from '@mui/material';
import { useOnHover } from '../hooks/useOnHover';
import Link from 'next/link';
import { ImageWithDefaultOnError, useUser } from '../utils';

interface Item {
  icon: JSX.Element;
  href: string;
  text: string;
  id: string;
}

interface NavbarProps {
  logo: React.ReactElement;
  items: Item[];
}

export function Navbar({ logo, items: iconArray }: NavbarProps): JSX.Element {
  const [hovered, bind] = useOnHover();
  const user = useUser();

  return (
    <>
      <div className="ui-flex md:ui-hidden ui-fixed ui-bottom-0 ui-w-full ui-h-12 ui-border-t-gray-4 ui-border-[1px] ui-bg-gray-5 ui-text-gray-3 ui-z-50">
        <div className="ui-flex ui-flex-row ui-justify-evenly ui-w-full ui-h-full">
          {iconArray.map(({ icon, href, id }) => (
            <React.Fragment key={id}>
              <NavItem
                icon={icon}
                href={href}
              />
              <Divider
                className="ui-border-gray-4 ui-my-2"
                orientation="vertical"
              />
            </React.Fragment>
          ))}
          <NavItem
            icon={
              <ImageWithDefaultOnError
                alt="Profile picture"
                className="ui-w-8 ui-h-8 ui-rounded-full ui-aspect-square ui-object-cover ui-object-center"
                src={`${process.env.NEXT_PUBLIC_API_URL}/auth/profilePicture/${user?.profilePicture}`}
                defaultReactNode={<PersonOutline />}
                width={32}
                height={32}
                forceDefault={user === undefined}
              />
            }
            href={user === undefined ? '/auth/login' : '/profil'}
          />
        </div>
      </div>
      <div
        className="ui-hidden ui-z-50 ui-sticky ui-top-0 ui-h-screen ui-border-r-gray-4 ui-border-[1px] ui-bg-gray-5 ui-text-gray-3 md:ui-flex ui-flex-col ui-items-center hover:ui-w-40 ui-transition-all ui-duration-300 ui-w-16"
        {...bind}
      >
        <div className="ui-my-3">{logo}</div>
        <Divider
          className="ui-w-full ui-border-gray-4"
          color=""
        />
        <div className="ui-flex ui-flex-col ui-justify-between ui-w-full ui-h-full">
          <div>
            {iconArray.map(({ icon, text, href, id }) => (
              <NavItem
                hovered={hovered}
                icon={icon}
                key={id}
                text={text}
                href={href}
              />
            ))}
          </div>
          <div>
            {user?.name && (
              <NavItem
                hovered={hovered}
                icon={<Logout />}
                text={'Se déconnecter'}
                href={'/auth/logout'}
              />
            )}
            <NavItem
              hovered={hovered}
              icon={
                <ImageWithDefaultOnError
                  alt="Profile picture"
                  className="ui-w-8 ui-h-8 ui-rounded-full ui-aspect-square ui-object-cover ui-object-center"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/auth/profilePicture/${user?.profilePicture}`}
                  defaultReactNode={<AccountCircleOutlined />}
                  width={24}
                  height={24}
                  forceDefault={user === undefined}
                />
              }
              text={user?.name ?? 'Se connecter'}
              href={user === undefined ? '/auth/login' : '/profil'}
              noSidePadding
            />
          </div>
        </div>
      </div>
    </>
  );
}

interface NavItemProps {
  icon: JSX.Element;
  href?: string;
  text?: string;
  hovered?: boolean;
  noSidePadding?: boolean;
}

function NavItem({
  icon,
  href = '/',
  text = '',
  hovered = false,
  noSidePadding = false,
}: NavItemProps): JSX.Element {
  return (
    <Link
      href={href}
      className={`ui-flex ui-items-center ${noSidePadding ? 'ui-py-5 ui-justify-center' : 'ui-p-5'} hover:ui-bg-primary hover:ui-text-gray-5`}
    >
      <div>{icon}</div>
      {text !== '' && (
        <div
          className={`ui-text-sm ui-transition-all ${hovered ? 'ui-pl-4 ui-w-3/5 ui-opacity-100' : 'ui-w-0 ui-opacity-0 ui-pointer-events-none'}`}
        >
          {text}
        </div>
      )}
    </Link>
  );
}
