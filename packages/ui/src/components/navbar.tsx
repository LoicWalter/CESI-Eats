'use client';

import { AccountCircleOutlined, PersonOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { useOnHover } from '../hooks/useOnHover';
import Link from 'next/link';
import { getUserInfosFromCookie, ImageWithDefaultOnError } from '../utils';
import { PrismaUsers } from '@api/cesieats';
import { usePathname } from 'next/navigation';

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
  const [user, setUser] = useState<Partial<PrismaUsers.User>>();

  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserInfosFromCookie();
      if (!user?.id) {
        setUser(undefined);
        return;
      }
      setUser(user);
    };
    getUser();
  }, [pathname]);

  return (
    <>
      <div className="ui-flex md:ui-hidden ui-fixed ui-bottom-0 ui-w-full ui-h-12 ui-z-10 ui-border-t-gray-4 ui-border-[1px] ui-bg-gray-5 ui-text-gray-3">
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
                className="ui-w-8 ui-h-8 ui-rounded-full"
                src="http://localhost:7000/auth/profile-picture/"
                defaultReactNode={<PersonOutline />}
                width={32}
                height={32}
                forceDefault={user === undefined}
              />
            }
            href={user === undefined ? '/auth/login' : '/profile'}
          />
        </div>
      </div>
      <div
        className="ui-hidden ui-sticky ui-top-0 ui-h-screen ui-border-r-gray-4 ui-border-[1px] ui-bg-gray-5 ui-text-gray-3 md:ui-flex ui-flex-col ui-items-center hover:ui-w-40 ui-transition-all ui-duration-300 ui-w-16 ui-z-20"
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
            <NavItem
              hovered={hovered}
              icon={
                <ImageWithDefaultOnError
                  alt="Profile picture"
                  className="ui-w-8 ui-h-8 ui-rounded-full"
                  src="http://localhost:7000/auth/profile-picture/"
                  defaultReactNode={<AccountCircleOutlined />}
                  width={24}
                  height={24}
                  forceDefault={user === undefined}
                />
              }
              text={user?.name ?? 'Se connecter'}
              href={user === undefined ? '/auth/login' : '/profile'}
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
