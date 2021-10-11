import { createSlice } from '@reduxjs/toolkit';

import { login, logout, signup, follow, unfollow } from '../actions/user';

const userTemplate = (data) => ({
  ...data,
  id: 1,
  name: '이강현',
  userName: 'kanghyun',
  Posts: [{ id: 1 }],
  Followings: [
    { userName: '강현', id: 2 },
    { userName: 'LKH', id: 3 },
    { userName: 'kanghyun', id: 4 },
  ],
  Followers: [
    { userName: '강현', id: 5 },
    { userName: '깡현', id: 6 },
    { userName: 'KANG', id: 7 },
  ],
});

export const initialState = {
  myInfo: null,
  userInfo: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginDone = true;
        state.myInfo = userTemplate(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.error.message;
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
        state.logoutDone = false;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutLoading = false;
        state.logoutDone = true;
        state.myInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.error.message;
      })

      // signup (아직 아무것도 저장 안함)
      .addCase(signup.pending, (state) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.error.message;
      })

      // follow
      .addCase(follow.pending, (state) => {
        state.followLoading = true;
        state.followDone = false;
        state.followError = null;
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.followLoading = false;
        state.followDone = true;
        state.myInfo.Followings.push({ id: action.payload });
      })
      .addCase(follow.rejected, (state, action) => {
        state.followLoading = false;
        state.followError = action.error.message;
      })

      // unfollow
      .addCase(unfollow.pending, (state) => {
        state.unfollowLoading = true;
        state.unfollowDone = false;
        state.unfollowError = null;
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.unfollowLoading = false;
        state.unfollowDone = true;
        state.myInfo.Followings = state.myInfo.Followings.filter((v) => v.id !== action.payload);
      })
      .addCase(unfollow.rejected, (state, action) => {
        state.unfollowLoading = false;
        state.unfollowError = action.error.message;
      }),
});
