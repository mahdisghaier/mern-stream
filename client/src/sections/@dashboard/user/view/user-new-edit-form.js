import React, { useMemo, useCallback, useEffect, useReducer, useState } from 'react';
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
import { _roleType } from 'src/_mock/user';
import { RHFUploadAvatar } from 'src/components/rhf-upload';

// ----------------------------------------------------------------------

export default function UserNewEditForm({ currentUser, id }) {
  const router = useRouter();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    verified: Yup.boolean(),
    password: Yup.string().required('password is required'),
    userType: Yup.string().required('User Type is required'),
    role: Yup.string().required('Role is required'),
    profilePicUrl: Yup.mixed().nullable().required('Avatar is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || '',
      email: currentUser?.email || '',
      userType: currentUser?.userType || '',
      role: currentUser?.role || '',
      password: currentUser?.password || '',
      verified: currentUser?.verified || false,
      profilePicUrl: currentUser?.profilePicUrl || null,
    }),
    [currentUser]
  );

  const [userType, setUserType] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUserType();
  }, []);

  const fetchUserType = async () => {
    try {
      // Simulate fetching user types from an API
      const response = await fetch('/api/userTypes');
      const data = await response.json();
      setUserType(data);
    } catch (error) {
      console.error('Error fetching user types:', error);
    }
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        resetForm();
        // Simulate API call to create/update user
        console.log('Submitting form with values:', values);
        setIsSubmitting(false);
        router.push('/dashboard/user');
        console.info('DATA', values);
      } catch (error) {
        console.error(error);
        setIsSubmitting(false);
      }
    },
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        formik.setFieldValue('profilePicUrl', newFile);
      }
    },
    [formik]
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              {/* <RHFUploadAvatar
                name="profilePicUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {3145728}
                  </Typography>
                }
              /> */}
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
                label="Full Name"
                {...formik.getFieldProps('firstName')}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
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
                label="Password"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Autocomplete
                fullWidth
                options={_roleType}
                freeSolo
                value={formik.values.role}
                onChange={(event, newValue) => formik.setFieldValue('role', newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={index}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Role"
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  />
                )}
              />
              <Autocomplete
                fullWidth
                options={userType.map((option) => ({
                  id: option._id,
                  name: option.name,
                }))}
                getOptionLabel={(option) => option.name}
                value={userType.find((option) => option._id === formik.values.userType) || null}
                onChange={(event, newValue) => formik.setFieldValue('userType', newValue?.id)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={index}
                      label={option.name}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="User Type"
                    error={formik.touched.userType && Boolean(formik.errors.userType)}
                    helperText={formik.touched.userType && formik.errors.userType}
                  />
                )}
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
