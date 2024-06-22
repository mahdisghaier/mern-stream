import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import {
  Container,
  Stack,
  TextField,
  FormControl,
  Typography,
  Button,
  Alert,
  Snackbar,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axiosInstance from '../utils/axios'; // Assuming you have defined axiosInstance as shown earlier
import { saveToLocalStorage, loadFromLocalStorage } from './LocalStorage'; // Util functions for localStorage

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'left',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  visibility: yup.string().required('Visibility is required'),
  thumbnailUrl: yup.string().required('Thumbnail URL is required'),
  language: yup.string().required('Language is required'),
  recordingDate: yup.date().required('Recording date is required'),
  category: yup.string().required('Category is required'),
});

export default function VideoUploadPage() {
  const [uploadResponse, setUploadResponse] = useState(null);
  const [alertType, setAlertType] = useState('success');

  const savedData = loadFromLocalStorage('videoMetadata');

  const postToServer = async (values) => {
    const { title } = values;
    const videoFile = values.videoFile;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', videoFile);
    try {
      const response = await axiosInstance.post(
        '/videos/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
          },
        }
      );
      setAlertType('success');
      setUploadResponse(response.data.message);
      console.log(response);
    } catch (error) {
      console.error(error);
      setAlertType('error');
      setUploadResponse(error.response.data.error.message);
    }
  };

  const formik = useFormik({
    initialErrors: {
      videoFile: 'Video file is required',
    },
    initialValues: savedData || {
      title: '',
      description: '',
      visibility: 'public',
      thumbnailUrl: '',
      language: '',
      recordingDate: new Date(),
      category: '',
      videoFile: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      saveToLocalStorage('videoMetadata', values);
      await postToServer(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.videoFile) {
        errors.videoFile = 'Video file is required';
      }
      if (values.videoFile?.size > 52428000) {
        errors.videoFile = 'Video file size should be less than 50MB';
      }
      if (
        values.videoFile?.type !== 'video/mp4' &&
        values.videoFile?.type !== 'video/x-matroska'
      ) {
        errors.videoFile = 'Video file type should be .mp4 or .mkv';
      }
      return errors;
    },
  });

  return (
    <>
      <Helmet>
        <title>Video upload</title>
      </Helmet>

      <Container>
        <StyledContent>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Upload video
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <label htmlFor="video">
                <input
                  style={{ display: 'none' }}
                  name="video"
                  accept="video/*"
                  id="video"
                  type="file"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    formik.setFieldValue('videoFile', file);
                  }}
                />
                <Button color="secondary" variant="contained" component="span">
                  Upload video
                </Button>
              </label>
              <TextField
                value={formik.values.videoFile?.name || ''}
                error={Boolean(formik.errors?.videoFile)}
                helperText={formik.errors?.videoFile}
              />
              <TextField
                id="title"
                name="title"
                label="Video title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                id="description"
                name="description"
                label="Video description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description && Boolean(formik.errors.description)
                }
                helperText={formik.touched.description && formik.errors.description}
              />
              <FormControl fullWidth>
                <InputLabel id="visibility-select-label">Visibility</InputLabel>
                <Select
                  labelId="visibility-select-label"
                  id="visibility-simple-select"
                  name="visibility"
                  label="Visibility"
                  value={formik.values.visibility}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.errors.visibility)}
                  helperText={formik.errors.visibility}
                >
                  <MenuItem value={'public'}>Public</MenuItem>
                  <MenuItem value={'private'}>Private</MenuItem>
                  <MenuItem value={'unlisted'}>Unlisted</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="thumbnailUrl"
                name="thumbnailUrl"
                label="Thumbnail URL"
                value={formik.values.thumbnailUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.thumbnailUrl && Boolean(formik.errors.thumbnailUrl)
                }
                helperText={formik.touched.thumbnailUrl && formik.errors.thumbnailUrl}
              />
              <FormControl fullWidth>
                <InputLabel id="language-select-label">Language</InputLabel>
                <Select
                  labelId="language-select-label"
                  id="language-simple-select"
                  name="language"
                  label="Language"
                  value={formik.values.language}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.errors.language)}
                  helperText={formik.errors.language}
                >
                  <MenuItem value={'English'}>English</MenuItem>
                  <MenuItem value={'Bangla'}>Bangla</MenuItem>
                  <MenuItem value={'Spanish'}>Spanish</MenuItem>
                  <MenuItem value={'Hindi'}>Hindi</MenuItem>
                  <MenuItem value={'Urdu'}>Urdu</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Recording Date"
                  value={formik.values.recordingDate}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => {
                    formik.setFieldValue('recordingDate', newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-simple-select"
                  name="category"
                  label="Category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.errors.category)}
                  helperText={formik.errors.category}
                >
                  <MenuItem value={'Education'}>Education</MenuItem>
                  <MenuItem value={'Technology'}>Technology</MenuItem>
                  <MenuItem value={'Travel'}>Travel</MenuItem>
                  <MenuItem value={'Others'}>Others</MenuItem>
                </Select>
              </FormControl>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Upload
              </LoadingButton>
            </Stack>
          </form>
          <Stack>
            <Snackbar
              open={!!uploadResponse}
              autoHideDuration={5000}
              onClose={() => {
                setUploadResponse(null);
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                onClose={() => {
                  setUploadResponse(null);
                }}
                severity={alertType}
              >
                {uploadResponse}
              </Alert>
            </Snackbar>
          </Stack>
        </StyledContent>
      </Container>
    </>
  );
}
