import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async (data, thunkAPI) => {
  try {
    const response = await axios.get(`/user/myInfo`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadUserInfo = createAsyncThunk('user/loadUserInfo', async (data: any, thunkAPI) => {
  try {
    const response = await axios.get(`/user/userInfo/${data.userName}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const signup = createAsyncThunk('user/signup', async (data: any, thunkAPI) => {
  try {
    const response = await axios.post(`/user/signup`, data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('user/login', async (data: any, thunkAPI) => {
  try {
    const response = await axios.post(`/user/login`, data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await axios.post(`/user/logout`);
  return response.data;
});

export const editProfile = createAsyncThunk('user/editProfile', async (data: any, thunkAPI) => {
  try {
    const response = await axios.patch(`/user/edit/profile`, data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const follow = createAsyncThunk('user/follow', async (data: any, thunkAPI) => {
  try {
    const response = await axios.patch(`/user/${data.id}/follow`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const unfollow = createAsyncThunk('user/unfollow', async (data: any, thunkAPI) => {
  try {
    const response = await axios.delete(`/user/${data.id}/following`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeFollower = createAsyncThunk('user/removeFollower', async (data: any, thunkAPI) => {
  try {
    const response = await axios.delete(`/user/${data.id}/follower`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadFollowings = createAsyncThunk('user/loadFollowings', async (data: any, thunkAPI) => {
  try {
    const response = await axios.get(`/user/${data.userId}/followings?limit=${data.limit}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadFollowers = createAsyncThunk('user/loadFollowers', async (data: any, thunkAPI) => {
  try {
    const response = await axios.get(`/user/${data.userId}/followers?limit=${data.limit}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
