import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { fetchUsers, clearErrors, deleteUser } from '../data/slice/userSlice';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

export default function UserPage() {
  const [open, setOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUsers()).unwrap();
      } catch (err) {
        console.error("Failed to fetch users: ", err);
      }
    };

    fetchData();

    return () => {
      // Clear errors when component unmounts
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const filteredUsers = filter(users, (user) =>
    user.First_name?.toLowerCase().includes(filterName.toLowerCase()),
  ).sort((a, b) => (order === 'asc' ? a.First_name.localeCompare(b.First_name) : b.First_name.localeCompare(a.First_name)));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = async (id) => {
    try {
      await dispatch(deleteUser(id));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setOpen(null); // Close the Popover after deletion
    }
  };

  const editUser = (id) => {
    navigate(`/dashboard/edit/${id}`);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleOpenMenu = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => (prev === userId ? null : userId));
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setAnchorEl(null);
  };

  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} href={'/dashboard/user/new'}>
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={() => {}} // Handle sort if needed
                  onSelectAllClick={() => {}} // Handle select all if needed
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                    <TableRow hover key={user._id} tabIndex={-1} role="checkbox">
                      <TableCell padding="checkbox">
                        <Checkbox checked={selected.indexOf(user.name) !== -1} onChange={() => {}} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={user.name} src={user.avatarUrl} />
                          <Typography variant="subtitle2" noWrap>
                            {user.First_name} {user.Last_name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.phone}</TableCell>
                      <TableCell align="left">{user.isVerified ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">
                        <Label color={user.status === 'banned' ? 'error' : 'success'}>
                          {sentenceCase(user.status)}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, user._id)}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                        <Popover
                          open={open === user._id}
                          anchorEl={anchorEl}
                          onClose={handleCloseMenu}
                          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          PaperProps={{
                            sx: {
                              p: 1,
                              width: 140,
                              '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75,
                              },
                            },
                          }}
                        >
                          <MenuItem onClick={() => editUser(user._id)}>
                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                            Edit
                          </MenuItem>
                          <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDeleteUser(user._id)}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                            Delete
                          </MenuItem>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
