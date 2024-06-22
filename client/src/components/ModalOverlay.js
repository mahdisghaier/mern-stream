import React from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Card,
  Typography,
  CardContent,
  Button,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  IconButton,
  Stack,
  Avatar,
} from '@mui/material';
import Iconify from './iconify';

export default function ModalOverlay({ open, handleClose, cameras }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto' }}>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom id="modal-title">
              Found Cameras
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>IP Address</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cameras.map((camera) => (
                    <TableRow key={camera.id}>
                      <TableCell component="th" scope="row">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Avatar alt={camera.name} src={camera.avatarUrl} />
                          <Typography variant="body2">{camera.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{camera.ip}</TableCell>
                      <TableCell>{camera.model}</TableCell>
                      <TableCell>
                        <IconButton color="primary">
                          <Iconify icon="eva:edit-fill" />
                        </IconButton>
                        <IconButton color="error">
                          <Iconify icon="eva:trash-2-outline" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
}
