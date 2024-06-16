import React from 'react';
import Container from '@mui/material/Container';



import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserNewEditForm from './user-new-edit-form';

// ----------------------------------------------------------------------

export default function UserCreateView() {

  return (
    <Container >
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          {
            name: 'Dashboard',
            href: '/dashboard',
          },
          {
            name: 'User',
            href: '/dashboard/user',
          },
          { name: 'New user' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm />
    </Container>
  );
}
