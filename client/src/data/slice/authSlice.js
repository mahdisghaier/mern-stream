// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  error: null,
  message: null,
};

export const setSession = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const login = createAsyncThunk('/users/login', async (query) => {
  const { email, password } = query;
  let data;
  try {
    const response = await axiosInstance.post(`/users/login`, {
      email,
      password,
    });
    data = await response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    const error = err;
    return Promise.reject(error.message ? error.message : data?.message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialise: (state, action) => {
      const { isAuthenticated, user } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.user = user;
      state.isInitialised = true;
    },
    restore: (state) => {
      state.error = null;
      state.message = null;
    },
    logout: (state) => {
      setSession(null);
      state.isAuthenticated = false;
      state.user = null;
      window.location.href = '/';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        setSession(token);
        state.isAuthenticated = true;
        state.user = user;
        state.isInitialised = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isInitialised = true;
      });
  },
});

export const { initialise, logout, restore } = authSlice.actions;

export default authSlice.reducer;
