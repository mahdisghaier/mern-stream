import React, { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'src/hooks/useRouter';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createRoom, updateRoom } from 'src/data/slice/CameraSlice';

export default function RoomNewEditForm({ currentRoom, roomId }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const NewRoomSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentRoom?.name || '',
      description: currentRoom?.description || '',
    }),
    [currentRoom]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: NewRoomSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setIsSubmitting(true);
        if (roomId) {
          // Update room
          await dispatch(updateRoom({ id: roomId, roomData: values })).unwrap();
        } else {
          // Create room
          await dispatch(createRoom(values)).unwrap();
        }
        resetForm();
        setIsSubmitting(false);
        router.push('/room'); // Adjust the redirect path as per your application's routes
      } catch (error) {
        console.error('Failed to submit form:', error);
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              display="grid"
              gridTemplateColumns="1fr"
            >
              <TextField
                fullWidth
                label="Name"
                {...formik.getFieldProps('name')}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                label="Description"
                {...formik.getFieldProps('description')}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {roomId ? 'Save Changes' : 'Create Room'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
