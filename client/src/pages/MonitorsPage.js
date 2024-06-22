import React, { useState } from 'react';
import { Button, Container, MenuItem, Popover, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'; // Adjust the path as needed

const MonitorsPage = () => {
  const [open, setOpen] = useState(null);
  const [scanResults, setScanResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleScanForCameras = async (event) => {
    setAnchorEl(event.currentTarget);
    try {
      const response = await axios.get(''); // Replace with your API endpoint
      setScanResults(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Error scanning for cameras:', error);
    }
  };

  const mainVideoUrl = 'http://localhost:8889/cam/whep'; // Example main video URL
  const sideVideoUrl = 'http://localhost:8889/cam/whep'; // Example side video URL

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Monitors
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleScanForCameras}
        >
          Scan for available cameras
        </Button>
      </Stack>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '20px' }}>
        <VideoPlayer url={mainVideoUrl} isMainPlayer={true} />
        <VideoPlayer url={sideVideoUrl} isMainPlayer={false} />
      </div>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            p: 2,
            minWidth: 350,
            maxWidth: 600,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {scanResults.length > 0 ? (
          scanResults.map((camera, index) => (
            <MenuItem key={camera.id}>
              Camera - {index}
            </MenuItem>
          ))
        ) : (
          <MenuItem>No cameras found</MenuItem>
        )}
      </Popover>
    </Container>
  );
};

export default MonitorsPage;
