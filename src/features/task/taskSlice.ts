
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_URL } from '../../config';
import { RootState } from '../../app/store';


export interface Task {
   _id: string | null
   title: string | null
   completed: boolean
   created: Date
}

interface TasksState {
   tasks: Task[],
   taskEdit: null | Task
}

const initialState: TasksState = {
   tasks: [],
   taskEdit: null
}

export const getTasks = createAsyncThunk(
   'task/getTasks',
   async (_, thunkAPI ) =>{

      // Obtener token del storage
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;
      
      // Obtener tasks
      const response = await fetch( API_URL + '/task', {
         method: 'GET',
         headers: { 
            'Content-Type' : 'application/json', 
            'x-token': `${token}` 
         }
      });

      if ( response.ok ) {
         const data = await response.json();
         return data;
      } else {
         const {errorMessage} = await response.json();
         throw new Error(errorMessage);
      }
      
   }
);

export const addTask = createAsyncThunk(
   'task/addTask',
   async ( title: string, thunkAPI) => {

      // Obtener token del storage
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      const response = await fetch( API_URL + '/task',{
         method: 'POST',
         headers: { 
            'Content-Type' : 'application/json', 
            'x-token': `${token}`,
         },
         body: JSON.stringify( {title} ),
      });
      
      if ( response.ok ) {
         const data = await response.json();
         return data;
      } else {
         const {errorMessage} = await response.json();
         throw new Error(errorMessage);
      }
   }
);

export const updateTask = createAsyncThunk(
   'task/updateTask',
   async ( task: Task, thunkAPI) => {

      // Obtener token del storage
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      const response = await fetch( API_URL + `/task/${task._id}`,{
         method: 'PUT',
         headers: { 
            'Content-Type' : 'application/json', 
            'x-token': `${token}`,
         },
         body: JSON.stringify( task ),
      });
      
      if ( response.ok ) {
         const data = await response.json();
         return data;
      } else {
         const {errorMessage} = await response.json();
         throw new Error(errorMessage);
      }

   }
);

export const deleteTask = createAsyncThunk(
   'task/deleteTask',
   async ( _id:string, thunkAPI) => {

      // Obtener token del storage
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.token;

      const response = await fetch( API_URL + `/task/${_id}`,{
         method: 'DELETE',
         headers: { 
            'Content-Type' : 'application/json', 
            'x-token': `${token}`,
         },
      });
      
      if ( response.ok ) {
         const data = await response.json();
         console.log( data );
         return _id;
      } else {
         const {errorMessage} = await response.json();
         throw new Error(errorMessage);
      }

   }
);


const taskSlice = createSlice({
   name: 'task',
   initialState,
   reducers: {
      setEditTask: (state, action: PayloadAction<Task>) => {
         state.taskEdit = action.payload;
      },
      removeEditTask: (state) => {
         state.taskEdit = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getTasks.fulfilled, (state, action) => {
            state.tasks = action.payload;
         });
      builder
         .addCase(addTask.fulfilled, ( state, action ) => {
            state.tasks?.push( action.payload.task );
         });
      builder
         .addCase(updateTask.fulfilled, ( state, action: PayloadAction<Task> ) => {
            state.tasks = state.tasks.map( task => {
               if ( task._id === action.payload._id ) {
                  task.completed = action.payload.completed;
                  task.title = action.payload.title;
                  return task;
               }
               return task;
            });
            state.taskEdit = null;
         })
      builder
         .addCase(deleteTask.fulfilled, ( state, action: PayloadAction<string> ) => {
            state.tasks = state.tasks.filter( task => task._id !== action.payload );
         })
   }
});

export const { setEditTask, removeEditTask } = taskSlice.actions

export default taskSlice.reducer