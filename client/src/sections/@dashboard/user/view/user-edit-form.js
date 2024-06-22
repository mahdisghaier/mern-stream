import React, { useMemo, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Card,
  Stack,
  Button,
  Grid,
  Typography,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser, fetchUserById } from 'src/data/slice/userSlice';

export default function UserNewEditForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [id, dispatch]);

  const NewUserSchema = Yup.object().shape({
    First_name: Yup.string().required('First name is required'),
    Last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
  });

  const formik = useFormik({
    initialValues: {
      First_name: currentUser?.First_name || '',
      Last_name: currentUser?.Last_name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
    },
    enableReinitialize: true,
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (id) {
          await dispatch(updateUser({ id, ...values }));
        } else {
          await dispatch(createUser(values));
        }
        navigate('/dashboard/user');
      } catch (error) {
        console.error('Error creating/updating user:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant="h6">User Details</Typography>

              <TextField
                fullWidth
                label="First Name"
                {...getFieldProps('First_name')}
                error={Boolean(touched.First_name && errors.First_name)}
                helperText={touched.First_name && errors.First_name}
              />

              <TextField
                fullWidth
                label="Last Name"
                {...getFieldProps('Last_name')}
                error={Boolean(touched.Last_name && errors.Last_name)}
                helperText={touched.Last_name && errors.Last_name}
              />

              <TextField
                fullWidth
                label="Email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                label="Phone"
                {...getFieldProps('phone')}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {id ? 'Update' : 'Create'}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
