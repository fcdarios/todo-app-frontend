import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { tasksSlice } from '../features/tasks/tasksSlice';
import { authSlice } from '../features/auth/authSlice';


export const store = configureStore({
  reducer: {
   authSlice: authSlice.reducer,
   tasks: tasksSlice.reducer
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
