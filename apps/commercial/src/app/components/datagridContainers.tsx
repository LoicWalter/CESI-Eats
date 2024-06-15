import React, { Suspense } from 'react';
import { UsersDatagrid } from './usersDatagrid';
import { get, Tags } from '@repo/ui';
import { PrismaUsers } from '@api/cesieats';
import { Typography } from '@mui/material';

async function DatagridContainers() {
  const { parsedRes: usersData } = await get<PrismaUsers.User[]>('/auth/users', {
    next: {
      revalidate: 10,
      tags: [Tags.USERS],
    },
  });

  return (
    <div className="p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <Typography variant="h4">Users</Typography>
        <UsersDatagrid data={usersData} />
      </Suspense>
    </div>
  );
}

export default DatagridContainers;
