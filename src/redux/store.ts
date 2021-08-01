import {configureStore} from '@reduxjs/toolkit';
import styleReducer from './slices/stylesSlice';
export const store = configureStore({
  reducer: {
    styles: styleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
