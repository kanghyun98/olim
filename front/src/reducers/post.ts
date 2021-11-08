import { createSlice } from '@reduxjs/toolkit';

import {
  loadAllPosts,
  loadUserPosts,
  loadHashtagPosts,
  addPost,
  uploadImages,
  removePost,
  addComment,
  likePost,
  unlikePost,
} from '../actions/post';

export interface PostUserType {
  id: number;
  userName: string;
}

export interface ImageType {
  id: number;
  src: string;
  createdAt: string;
  updatedAt: string;
  PostId: number;
}

export interface CommentUserType {
  id: number;
  userName: string;
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
  User: CommentUserType;
}

export interface LikerType {
  id: number;
}

export interface PostType {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  User: PostUserType;
  Images: ImageType[];
  Comments: CommentType[];
  Likers: LikerType[];
}

export interface PostInitialStateType {
  posts: PostType[];
  imagePaths: string[];
  morePosts: boolean;
  loadAllPostsLoading: boolean;
  loadAllPostsDone: boolean;
  loadAllPostsError: any;
  loadUserPostsLoading: boolean;
  loadUserPostsDone: boolean;
  loadUserPostsError: any;
  loadHashtagPostsLoading: boolean;
  loadHashtagPostsDone: boolean;
  loadHashtagPostsError: any;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: any;
  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: any;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: any;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: any;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: any;
  unlikePostLoading: boolean;
  unlikePostDone: boolean;
  unlikePostError: any;
}

export const initialState: PostInitialStateType = {
  posts: [],
  imagePaths: [],
  morePosts: true,
  loadAllPostsLoading: false,
  loadAllPostsDone: false,
  loadAllPostsError: null,
  loadUserPostsLoading: false,
  loadUserPostsDone: false,
  loadUserPostsError: null,
  loadHashtagPostsLoading: false,
  loadHashtagPostsDone: false,
  loadHashtagPostsError: null,
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
      .addCase(loadAllPosts.fulfilled, (state, action: any) => {
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
      .addCase(loadUserPosts.fulfilled, (state, action: any) => {
        state.loadUserPostsLoading = false;
        state.loadUserPostsDone = true;
        state.posts = state.posts.concat(action.payload);
        state.morePosts = state.posts.length === 10;
      })
      .addCase(loadUserPosts.rejected, (state, action) => {
        state.loadUserPostsLoading = false;
        state.loadUserPostsError = action.payload;
      })

      // loadHashtagPosts
      .addCase(loadHashtagPosts.pending, (state) => {
        state.loadHashtagPostsLoading = true;
        state.loadHashtagPostsDone = false;
        state.loadHashtagPostsError = null;
      })
      .addCase(loadHashtagPosts.fulfilled, (state, action: any) => {
        state.loadHashtagPostsLoading = false;
        state.loadHashtagPostsDone = true;
        state.posts = state.posts.concat(action.payload);
        state.morePosts = state.posts.length === 10;
      })
      .addCase(loadHashtagPosts.rejected, (state, action) => {
        state.loadHashtagPostsLoading = false;
        state.loadHashtagPostsError = action.payload;
      })

      // addPost
      .addCase(addPost.pending, (state) => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPost.fulfilled, (state, action: any) => {
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
      .addCase(uploadImages.fulfilled, (state, action: any) => {
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
      .addCase(removePost.fulfilled, (state, action: any) => {
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
      .addCase(addComment.fulfilled, (state, action: any) => {
        const targetPost = state.posts.find((v) => v.id === action.payload.PostId);
        state.addCommentLoading = false;
        state.addCommentDone = true;
        targetPost?.Comments.unshift(action.payload);
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
      .addCase(likePost.fulfilled, (state, action: any) => {
        const targetPost = state.posts.find((v) => v.id === action.payload.postId);
        state.likePostLoading = false;
        state.likePostDone = true;
        targetPost?.Likers.push({ id: action.payload.userId });
      })
      .addCase(likePost.rejected, (state, action) => {
        state.likePostLoading = false;
        state.likePostError = action.payload;
      })

      // unlikePost
      .addCase(unlikePost.pending, (state) => {
        state.unlikePostLoading = true;
        state.unlikePostDone = false;
        state.unlikePostError = null;
      })
      .addCase(unlikePost.fulfilled, (state, action: any) => {
        const targetPost = state.posts.find((v) => v.id === action.payload.postId);
        state.unlikePostLoading = false;
        state.unlikePostDone = true;
        if (targetPost) {
          targetPost.Likers = targetPost.Likers.filter((v) => v.id !== action.payload.userId);
        }
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.unlikePostLoading = false;
        state.unlikePostError = action.payload;
      }),
});

export const { removeImage } = postSlice.actions;
