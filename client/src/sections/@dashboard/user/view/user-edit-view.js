import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from 'src/data/slice/userSlice';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import UserNewEditForm from './user-new-edit-form';

// ----------------------------------------------------------------------

export default function UserEditView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [id, dispatch]);

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Edit User"
        links={[
          {
            name: 'Dashboard',
            href: '/dashboard',
          },
          {
            name: 'User',
            href: `/dashboard/user`,
          },
          { name: 'Edit User' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <UserNewEditForm currentUser={user}  id={user?._id} />
      )}
    </Container>
  );
}
