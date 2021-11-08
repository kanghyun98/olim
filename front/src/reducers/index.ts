import { AnyAction, CombinedState, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { UserInitialStateType, userSlice } from './user';
import { PostInitialStateType, postSlice } from './post';

export interface RootState {
  user: UserInitialStateType;
  post: PostInitialStateType;
}

const rootReducer = (state: CombinedState<RootState>, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default: {
      const combinedReducer = combineReducers({
        user: userSlice.reducer,
        post: postSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
