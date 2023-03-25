
import { createSlice } from '@reduxjs/toolkit';


export interface tasksState {
   title: string | null;
}

const initialState: tasksState = {
   title: null
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
      setTitle: (state) => {
         console.log( state );
      }
  }
});

export const { setTitle } = tasksSlice.actions