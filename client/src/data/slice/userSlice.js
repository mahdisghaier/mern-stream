import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

// Thunks for async operations
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axiosInstance.get('/users/');
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const createUser = createAsyncThunk("users/createUser", async (userData) => {
  try {
    console.log('userData',userData)
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async ({ id, userData }) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    await axiosInstance.delete(`/users/${id}`);
    return id;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors } = userSlice.actions;

export default userSlice.reducer;
