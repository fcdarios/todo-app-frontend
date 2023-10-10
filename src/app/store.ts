import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authSlice from '../features/auth/authSlice';
import userSlice from '../features/user/userSlice';
import taskSlice from '../features/task/taskSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    user: userSlice,
    task: taskSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
