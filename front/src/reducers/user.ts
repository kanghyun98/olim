import { createSlice } from '@reduxjs/toolkit';

import {
  loadMyInfo,
  loadUserInfo,
  login,
  logout,
  signup,
  editProfile,
  follow,
  unfollow,
  removeFollower,
  loadFollowings,
  loadFollowers,
} from '../actions/user';

export const initialState = {
  myInfo: null,
  userInfo: null,
  dataList: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserInfoLoading: false,
  loadUserInfoDone: false,
  loadUserInfoError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  editProfileLoading: false,
  editProfileDone: false,
  editProfileError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // 내 정보 불러오기
      .addCase(loadMyInfo.pending, (state) => {
        state.loadMyInfoLoading = true;
        state.loadMyInfoDone = false;
        state.loadMyInfoError = null;
      })
      .addCase(loadMyInfo.fulfilled, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoDone = true;
        state.myInfo = action.payload ? action.payload.userData : null;
      })
      .addCase(loadMyInfo.rejected, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoError = action.payload;
      })

      // 유저 정보 불러오기
      .addCase(loadUserInfo.pending, (state) => {
        state.loadUserInfoLoading = true;
        state.loadUserInfoDone = false;
        state.loadUserInfoError = null;
      })
      .addCase(loadUserInfo.fulfilled, (state, action) => {
        state.loadUserInfoLoading = false;
        state.loadUserInfoDone = true;
        state.userInfo = action.payload.userData;
        state.userInfo.count = action.payload.count;
      })
      .addCase(loadUserInfo.rejected, (state, action) => {
        state.loadUserInfoLoading = false;
        state.loadUserInfoError = action.payload;
      })

      // signup
      .addCase(signup.pending, (state) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.signupLoading = false;
        state.signupDone = true;
        state.signupError = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload;
      })

      // login
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginDone = true;
        state.myInfo = action.payload ? action.payload.userData : null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
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
        state.logoutError = action.payload;
      })

      // editProfile
      .addCase(editProfile.pending, (state) => {
        state.editProfileLoading = true;
        state.editProfileDone = false;
        state.editProfileError = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.editProfileLoading = false;
        state.editProfileDone = true;
        state.myInfo = { ...state.myInfo, name: action.payload.name, userName: action.payload.userName };
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.editProfileLoading = false;
        state.editProfileError = action.payload;
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
        state.myInfo.Followings.push({ id: action.payload.userId });
        state.userInfo.count = action.payload.count;
      })
      .addCase(follow.rejected, (state, action) => {
        state.followLoading = false;
        state.followError = action.payload;
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
        state.myInfo.Followings = state.myInfo.Followings.filter((v) => v.id !== action.payload.userId);
        state.userInfo.count = action.payload.count;
      })
      .addCase(unfollow.rejected, (state, action) => {
        state.unfollowLoading = false;
        state.unfollowError = action.payload;
      })

      // removeFollower
      .addCase(removeFollower.pending, (state) => {
        state.removeFollowerLoading = true;
        state.removeFollowerDone = false;
        state.removeFollowerError = null;
      })
      .addCase(removeFollower.fulfilled, (state, action) => {
        state.removeFollowerLoading = false;
        state.removeFollowerDone = true;
        state.userInfo.count = action.payload.count;
      })
      .addCase(removeFollower.rejected, (state, action) => {
        state.removeFollowerLoading = false;
        state.removeFollowerError = action.payload;
      })

      // loadFollowings
      .addCase(loadFollowings.pending, (state) => {
        state.loadFollowingsLoading = true;
        state.loadFollowingsDone = false;
        state.loadFollowingsError = null;
        state.dataList = null;
      })
      .addCase(loadFollowings.fulfilled, (state, action) => {
        state.loadFollowingsLoading = false;
        state.loadFollowingsDone = true;
        state.dataList = action.payload;
      })
      .addCase(loadFollowings.rejected, (state, action) => {
        state.loadFollowingsLoading = false;
        state.loadFollowingsError = action.payload;
      })

      // loadFollowers
      .addCase(loadFollowers.pending, (state) => {
        state.loadFollowersLoading = true;
        state.loadFollowersDone = false;
        state.loadFollowersError = null;
        state.dataList = null;
      })
      .addCase(loadFollowers.fulfilled, (state, action) => {
        state.loadFollowersLoading = false;
        state.loadFollowersDone = true;
        state.dataList = action.payload;
      })
      .addCase(loadFollowers.rejected, (state, action) => {
        state.loadFollowersLoading = false;
        state.loadFollowersError = action.payload;
      }),
});
