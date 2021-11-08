import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadAllPosts = createAsyncThunk('post/loadAllPosts', async (data: any, thunkAPI) => {
  try {
    const response = await axios.get(`/posts/all?lastId=${data?.lastId || 0}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadUserPosts = createAsyncThunk('post/loadUserPosts', async (data: any, thunkAPI) => {
  try {
    const response = await axios.get(`/posts/user/${data.userName}?lastId=${data?.lastId || 0}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadHashtagPosts = createAsyncThunk('post/loadHashtagPosts', async (data: any, thunkAPI) => {
  try {
    const response = await axios.get(`/posts/tags/${encodeURIComponent(data.hashtag)}?lastId=${data?.lastId || 0}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addPost = createAsyncThunk('post/addPost', async (data: any, thunkAPI) => {
  try {
    const response = await axios.post('/post', data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const uploadImages = createAsyncThunk('post/uploadImages', async (data: any, thunkAPI) => {
  try {
    const response = await axios.post('/post/images', data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removePost = createAsyncThunk('post/removePost', async (data: any, thunkAPI) => {
  try {
    const response = await axios.delete(`/post/${data.postId}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addComment = createAsyncThunk('post/addComment', async (data: any, thunkAPI) => {
  try {
    const response = await axios.post(`/post/${data.postId}/comment`, data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const likePost = createAsyncThunk('post/likePost', async (data: any, thunkAPI) => {
  try {
    const response = await axios.patch(`/post/${data.postId}/like`, data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const unlikePost = createAsyncThunk('post/unlikePost', async (data: any, thunkAPI) => {
  try {
    const response = await axios.delete(`/post/${data.postId}/like`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
