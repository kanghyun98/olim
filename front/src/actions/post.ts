import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { generateDummyPost } from '../reducers/post';

axios.defaults.withCredentials = true;

export const loadAllPosts = createAsyncThunk('post/loadAllPosts', async (data, thunkAPI) => {
  try {
    // const response = await axios.get(`/posts`);
    return generateDummyPost(10);
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
