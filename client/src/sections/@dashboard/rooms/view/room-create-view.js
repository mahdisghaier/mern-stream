import React from 'react';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import RoomNewEditForm from './room-new-edit-form'; // Adjust import path as per your project structure

export default function RoomCreateView() {
  return (
    <Container>
      <CustomBreadcrumbs
        heading="Create a new room"
        links={[
          {
            name: 'Dashboard',
            href: '/dashboard',
          },
          {
            name: 'Rooms',
            href: '/dashboard/rooms',
          },
          { name: 'New room' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <RoomNewEditForm />
    </Container>
  );
}
