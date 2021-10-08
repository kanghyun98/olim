import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    // const response = await axios.post(`/login`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('user/logout', async (data, thunkAPI) => {
  try {
    // const response = await axios.post(`/logout`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
