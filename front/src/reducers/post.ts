import { createSlice } from '@reduxjs/toolkit';
import shortId from 'shortid';
import faker from 'faker';

import { addPost, loadAllPosts } from '../actions/post';

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      content: faker.lorem.paragraph(),
      Images: [
        { src: faker.image.image() },
        { src: faker.image.image() },
        { src: faker.image.image() },
        { src: faker.image.image() },
      ],
      User: {
        id: shortId.generate(),
        userName: faker.name.findName(),
      },
      Comments: [
        {
          User: {
            id: shortId.generate(),
            userName: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

export const initialState = {
  posts: [],
  imagePaths: [],
  loadAllPostsLoading: false,
  loadAllPostsDone: false,
  loadAllPostsError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // loadAllPosts
      .addCase(loadAllPosts.pending, (state) => {
        state.loadAllPostsLoading = true;
        state.loadAllPostsDone = false;
        state.loadAllPostsError = null;
      })
      .addCase(loadAllPosts.fulfilled, (state, action) => {
        state.loadAllPostsLoading = false;
        state.loadAllPostsDone = true;
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(loadAllPosts.rejected, (state, action) => {
        state.loadAllPostsLoading = false;
        state.loadAllPostsError = action.error.message;
      })

      // addPost
      .addCase(addPost.pending, (state) => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.addPostLoading = false;
        state.addPostDone = true;
        state.posts.unshift(action.payload); // dummy?
        state.imagePaths = [];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addPostLoading = false;
        state.addPostError = action.error.message;
      }),
});
