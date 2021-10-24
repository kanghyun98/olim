import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async () => {
  const response = await axios.get(`/user/myinfo`);
  return response.data;
});

export const signup = createAsyncThunk('user/signup', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`/user/signup`, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`/user/login`, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await axios.post(`/user/logout`);
  return response.data;
});

export const editProfile = createAsyncThunk('user/editProfile', async (data, thunkAPI) => {
  try {
    const response = await axios.patch(`/user/edit/profile`, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const follow = createAsyncThunk('user/follow', async (data, thunkAPI) => {
  try {
    const response = await axios.patch(`/user/${data}/follow`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const unfollow = createAsyncThunk('user/unfollow', async (data, thunkAPI) => {
  try {
    const response = await axios.delete(`/user/${data}/follow`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadFollowings = createAsyncThunk('user/loadFollowings', async (data, thunkAPI) => {
  try {
    const response = await axios.get(`/user/${data}/followings`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadFollowers = createAsyncThunk('user/loadFollowers', async (data, thunkAPI) => {
  try {
    const response = await axios.get(`/user/${data}/followers`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
