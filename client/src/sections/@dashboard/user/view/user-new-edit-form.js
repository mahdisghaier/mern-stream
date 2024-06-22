import React, { useMemo, useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'src/hooks/useRouter';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from 'src/data/slice/userSlice';

export default function UserNewEditForm({ currentUser, id }) {
  const router = useRouter();
const dispatch = useDispatch();
  const NewUserSchema = Yup.object().shape({
    First_name: Yup.string().required('First name is required'),
    First_name: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.number(),
    password: Yup.string().required('Password is required'),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      First_name: currentUser?.First_name || '',
      Last_name: currentUser?.Last_name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      password: currentUser?.password || '',
      status: currentUser?.status || '',
    }),
    [currentUser]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setIsSubmitting(true);
        if (id) {
          // Update user
          await dispatch(updateUser({ id, userData: values })).unwrap();
        } else {
          // Create user
          await dispatch(createUser(values)).unwrap();
        }
        resetForm();
        setIsSubmitting(false);
        router.push('/dashboard/user');
      } catch (error) {
        console.error('Failed to submit form:', error);
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              {/* Add Avatar upload here if needed */}
            </Box>

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete User
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <TextField
                fullWidth
                label="First Name"
                {...formik.getFieldProps('First_name')}
                error={formik.touched.First_name && Boolean(formik.errors.First_name)}
                helperText={formik.touched.First_name && formik.errors.First_name}
              />
              <TextField
                fullWidth
                label="Last Name"
                {...formik.getFieldProps('Last_name')}
                error={formik.touched.Last_name && Boolean(formik.errors.Last_name)}
                helperText={formik.touched.Last_name && formik.errors.Last_name}
              />
              <TextField
                fullWidth
                label="Email Address"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="Phone Number"
                {...formik.getFieldProps('phone')}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
              <TextField
                fullWidth
                label="Password"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                label="Status"
                {...formik.getFieldProps('status')}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
