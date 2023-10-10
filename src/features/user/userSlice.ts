import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
   uid: string | null;
   name: string | null;
   email: string | null;
}

const initialState: UserState = {
   uid: null,
   name: null,
   email: null,
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUserData: (state, action: PayloadAction<UserState>) => {
         state.uid = action.payload.uid;
         state.name = action.payload.name;
         state.email = action.payload.email;
      },
      removeUserData: (state) => {
         state.uid = null;
         state.name = null;
         state.email = null;
      },
   },
});

export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
