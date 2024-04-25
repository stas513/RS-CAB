'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

const MainNav = ({ className, ...props }) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/`,
      label: 'HOME',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'ABOUT',
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'SERVICES',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'DRIVER',
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'USER',
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'CONTACT',
      active: pathname === `/${params.storeId}/colors`,
    },
  ];

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-12', className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-m font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
