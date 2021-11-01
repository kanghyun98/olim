import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadAllPosts = createAsyncThunk('post/loadAllPosts', async (data, thunkAPI) => {
  try {
    const response = await axios.get(`/posts?lastId=${data.lastId || 0}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadUserPosts = createAsyncThunk('post/loadUserPosts', async (data, thunkAPI) => {
  try {
    // const response = await axios.get(`/user/${data.userId}/posts`);
    // 나중에 사용자의 id받아서 해당 포스트만 받아오기
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addPost = createAsyncThunk('post/addPost', async (data, thunkAPI) => {
  try {
    const response = await axios.post('/post', data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const uploadImages = createAsyncThunk('post/uploadImages', async (data, thunkAPI) => {
  try {
    const response = await axios.post('/post/images', data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removePost = createAsyncThunk('post/removePost', async (data, thunkAPI) => {
  try {
    const response = await axios.delete(`/post/${data}`, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addComment = createAsyncThunk('post/addComment', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`/post/${data.postId}/comment`, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const likePost = createAsyncThunk('post/likePost', async (data, thunkAPI) => {
  try {
    const response = await axios.patch(`/post/${data.postId}/like`, data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const unlikePost = createAsyncThunk('post/unlikePost', async (data, thunkAPI) => {
  try {
    const response = await axios.delete(`/post/${data.postId}/like`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
