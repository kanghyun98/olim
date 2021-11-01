import { createSlice } from '@reduxjs/toolkit';

import {
  loadAllPosts,
  loadUserPosts,
  addPost,
  uploadImages,
  removePost,
  addComment,
  likePost,
  unlikePost,
} from '../actions/post';

export const initialState = {
  posts: [],
  imagePaths: [],
  morePosts: true,
  loadAllPostsLoading: false,
  loadAllPostsDone: false,
  loadAllPostsError: null,
  loadUserPostsLoading: false,
  loadUserPostsDone: false,
  loadUserPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    removeImage: (state, action) => {
      state.imagePaths = state.imagePaths.filter((v, i) => i !== action.payload);
    },
  },
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
        state.morePosts = state.posts.length === 10;
      })
      .addCase(loadAllPosts.rejected, (state, action) => {
        state.loadAllPostsLoading = false;
        state.loadAllPostsError = action.payload;
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
        state.loadUserPostsError = action.payload;
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
        state.posts.unshift(action.payload);
        state.imagePaths = [];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addPostLoading = false;
        state.addPostError = action.payload;
      })

      // uploadImages
      .addCase(uploadImages.pending, (state) => {
        state.uploadImagesLoading = true;
        state.uploadImagesDone = false;
        state.uploadImagesError = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesDone = true;
        state.imagePaths = state.imagePaths.concat(action.payload);
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesError = action.payload;
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
        state.posts = state.posts.filter((v) => v.id !== action.payload.postId);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.removePostLoading = false;
        state.removePostError = action.payload;
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
        targetPost.Comments.unshift(action.payload.content);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addCommentLoading = false;
        state.addCommentError = action.payload;
      })

      // likePost
      .addCase(likePost.pending, (state) => {
        state.likePostLoading = true;
        state.likePostDone = false;
        state.likePostError = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const targetPost = state.posts.find((v) => v.id === action.payload.postId);
        state.likePostLoading = false;
        state.likePostDone = true;
        targetPost.Likers.push({ id: action.payload.userId });
      })
      .addCase(likePost.rejected, (state, action) => {
        state.likePostLoading = false;
        state.likePostError = action.error.message;
      })

      // unlikePost
      .addCase(unlikePost.pending, (state) => {
        state.unlikePostLoading = true;
        state.unlikePostDone = false;
        state.unlikePostError = null;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const targetPost = state.posts.find((v) => v.id === action.payload.postId);
        state.unlikePostLoading = false;
        state.unlikePostDone = true;
        targetPost.Likers.filter((v) => v.id !== action.payload.userId);
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.unlikePostLoading = false;
        state.unlikePostError = action.error.message;
      }),
});

export const { removeImage } = postSlice.actions;
