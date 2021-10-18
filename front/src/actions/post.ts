import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backUrl } from '../config/config';

import { generateDummyPost } from '../reducers/post';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadAllPosts = createAsyncThunk('post/loadAllPosts', async (data, thunkAPI) => {
  try {
    // const response = await axios.get(`/posts?lastId=${lastId || 0}`);
    return generateDummyPost(10);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadUserPosts = createAsyncThunk('post/loadUserPosts', async (data, thunkAPI) => {
  try {
    // const response = await axios.get(`/user/${data.userId}/posts`);
    return generateDummyPost(10); // 나중에 사용자의 id받아서 해당 포스트만 받아오기
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addPost = createAsyncThunk('post/addPost', async (data, thunkAPI) => {
  try {
    // const response = await axios.post('/post', data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removePost = createAsyncThunk('post/removePost', async (data, thunkAPI) => {
  try {
    // const response = await axios.delete(`/post/${data}`, data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addComment = createAsyncThunk('post/addComment', async (data, thunkAPI) => {
  try {
    // const response = await axios.post('/post/`${data}/comment`', data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
