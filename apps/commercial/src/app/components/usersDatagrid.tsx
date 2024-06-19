'use client';

import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { AccountCircleOutlined } from '@mui/icons-material';
import { PrismaUsers } from '@api/cesieats';
import {
  ClickableImageInput,
  deleteUserAsAdmin,
  ImageWithDefaultOnError,
  StyledButton,
} from '@repo/ui';
import { Alert, Button } from '@mui/material';
import { editUserDatagrid } from '@repo/ui/actions/edit-user.js';

interface UsersDatagridProps {
  data: PrismaUsers.User[];
}

export function UsersDatagrid({ data }: UsersDatagridProps) {
  const rows: GridRowsProp = data;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'roles', headerName: 'Rôles', width: 150 },
    { field: 'phoneNumber', headerName: 'Numéro de téléphone', width: 200 },
    { field: 'address', headerName: 'Adresse', width: 400, editable: true },
    {
      field: 'profilePicture',
      headerName: 'Photo de profil',
      width: 120,
      renderCell: (params) => (
        <div className="justify-center items-center flex w-full h-full">
          <ClickableImageInput
            name="profilePicture"
            handleFile={(file) => {
              const formData = new FormData();
              formData.append('profilePicture', file);
              formData.append('id', params.row['id']);
              editUserDatagrid(params.row['id'], formData);
            }}
            defaultValue={
              <ImageWithDefaultOnError
                alt="Profile picture"
                className="w-8 h-8 rounded-full aspect-square object-cover object-center"
                src={`${process.env.NEXT_PUBLIC_API_URL}/auth/profilePicture/${params.row['profilePicture']}`}
                defaultReactNode={<AccountCircleOutlined />}
                width={24}
                height={24}
                forceDefault={Boolean(!params.row['profilePicture'])}
              />
            }
          />
        </div>
      ),
    },
    { field: 'suspended', headerName: 'Suspendu', width: 120, editable: true, type: 'boolean' },
    {
      field: 'delete',
      headerName: 'Supprimer',
      width: 120,
      renderCell: (params) => (
        <StyledButton onClick={() => deleteUserAsAdmin(params.row['id'])}>Supprimer</StyledButton>
      ),
    },
  ];

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={(newRow, oldRow) => {
          console.log('Updating user:', newRow);
          const formData = new FormData();
          formData.append('id', newRow['id']);

          for (const key in newRow) {
            if (newRow[key] !== oldRow[key]) {
              formData.append(key, newRow[key]);
            }
          }

          editUserDatagrid(newRow['id'], formData);
        }}
        onProcessRowUpdateError={() => {}}
        onCellEditStop={(params) => {
          console.log('Editing cell:', params);
        }}
      />
    </div>
  );
}
