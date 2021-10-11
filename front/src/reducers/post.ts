import { createSlice } from '@reduxjs/toolkit';
import shortId from 'shortid';
import faker from 'faker';

import { loadAllPosts, loadUserPosts, addPost, removePost, addComment } from '../actions/post';

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

const postTemplate = (data) => ({
  id: shortId.generate(),
  content: data,
  Images: [],
  User: {
    id: 1,
    userName: 'kanghyun',
  },
  Comments: [],
});

const commentTemplate = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    userName: 'kanghyun',
  },
});

export const initialState = {
  posts: [],
  imagePaths: [],
  loadAllPostsLoading: false,
  loadAllPostsDone: false,
  loadAllPostsError: null,
  loadUserPostsLoading: false,
  loadUserPostsDone: false,
  loadUserPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
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

      // loadUserPosts
      .addCase(loadUserPosts.pending, (state) => {
        state.loadUserPostsLoading = true;
        state.loadUserPostsDone = false;
        state.loadUserPostsError = null;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.loadUserPostsLoading = false;
        state.loadUserPostsDone = true;
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(loadUserPosts.rejected, (state, action) => {
        state.loadUserPostsLoading = false;
        state.loadUserPostsError = action.error.message;
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
        state.posts.unshift(postTemplate(action.payload));
        state.imagePaths = [];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addPostLoading = false;
        state.addPostError = action.error.message;
      })

      // removePost
      .addCase(removePost.pending, (state) => {
        state.removePostLoading = true;
        state.removePostDone = false;
        state.removePostError = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.removePostLoading = false;
        state.removePostDone = true;
        state.posts = state.posts.filter((v) => v.id !== action.payload);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.removePostLoading = false;
        state.removePostError = action.error.message;
      })

      // addComment
      .addCase(addComment.pending, (state) => {
        state.addCommentLoading = true;
        state.addCommentDone = false;
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const targetPost = state.posts.find((v) => v.id === action.payload.postId);
        state.addCommentLoading = false;
        state.addCommentDone = true;
        targetPost.Comments.unshift(commentTemplate(action.payload.content));
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addCommentLoading = false;
        state.addCommentError = action.error.message;
      }),
});
