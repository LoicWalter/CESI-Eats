'use client';

import { AccountCircleOutlined, Logout, PersonOutline } from '@mui/icons-material';
import React from 'react';
import { Divider } from '@mui/material';
import { useOnHover } from '../hooks/useOnHover';
import Link from 'next/link';
import { ImageWithDefaultOnError, useUser } from '../utils';
import Image from 'next/image';

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
      {/* Phone */}
      <div className="ui-flex md:ui-hidden ui-fixed ui-bottom-0 ui-w-full ui-h-12 ui-z-10 ui-border-t-gray-4 ui-border-t-[1px] ui-bg-gray-5 ui-text-gray-3 ui-shadow-[0_-0.125rem_0.25rem_0_rgba(204,209,212,0.4)]">
        <div className="ui-flex ui-flex-row ui-justify-evenly ui-w-full ui-h-full">
          {iconArray.map(({ icon, href, id }) => (
            <React.Fragment key={id}>
              <NavItem
                icon={icon}
                href={href}
              />
              <Divider
                className="ui-border-gray-4 ui-my-2 ui-rounded"
                sx={{ height: '70%' }}
                orientation="vertical"
              />
            </React.Fragment>
          ))}
          <NavItem
            icon={
              <ImageWithDefaultOnError
                alt="Profile picture"
                className="ui-w-8 ui-h-8 ui-rounded-full ui-overflow-hidden ui-object-cover ui-object-center"
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
      {/* Computer */}
      <div
        className="ui-hidden ui-sticky ui-top-0 ui-h-screen ui-border-r-gray-4 ui-border-r-[1px] ui-bg-gray-5 ui-text-gray-3 md:ui-flex ui-flex-col ui-items-center hover:ui-w-40 ui-transition-all ui-duration-300 ui-w-16 ui-z-20 ui-select-none ui-shadow-[0.125rem_0_0.25rem_0_rgba(204,209,212,0.7)]"
        {...bind}
      >
        <div className="ui-my-3">{logo}</div>
        <Divider
          className="ui-border-gray-4 ui-rounded"
          sx={{ width: '70%' }}
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
                text={'Deconnexion'}
                href={'/auth/logout'}
              />
            )}
            <NavItem
              hovered={hovered}
              icon={
                <ImageWithDefaultOnError
                  alt="Profile picture"
                  className="ui-w-8 ui-h-8 ui-rounded-full ui-overflow-hidden ui-object-cover ui-object-center"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/auth/profilePicture/${user?.profilePicture}`}
                  defaultReactNode={<AccountCircleOutlined />}
                  width={32}
                  height={32}
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
      className={`ui-flex ui-w-full ui-items-center ui-justify-center md:ui-justify-start ui-py-5 ${noSidePadding ? 'md:ui-pl-[0.875rem]' : 'md:ui-pl-5'} hover:ui-bg-primary hover:ui-text-gray-5 active:ui-bg-secondary active:ui-text-gray-5 active:ui-shadow-[inset_0.125rem_0.125rem_0.25rem_0_rgba(0,0,0,0.4)]`}
    >
      <div>{icon}</div>
      {text !== '' && (
        <div
          className={`ui-text-sm ui-transition-all ui-whitespace-nowrap ${hovered ? 'ui-pl-4 ui-w-full ui-opacity-100 ui-whitespace-nowrap ui-overflow-hidden' : 'ui-w-0 ui-opacity-0 ui-pointer-events-none'}`}
        >
          {text}
        </div>
      )}
    </Link>
  );
}
