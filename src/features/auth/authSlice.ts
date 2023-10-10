import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserState, removeUserData, setUserData } from '../user/userSlice';
import { API_URL } from '../../config';


interface AuthState {
   token: string | null;
   isLoading: boolean;
   isLoggedIn: boolean;
   errorMessage:string | null;
}

const initialState: AuthState = {
   token: null,
   isLoading: false,
   isLoggedIn: false,
   errorMessage: null
}

type FetchDataArgsRegister = {
   name: string
   email: string
   password: string
};

type FetchDataResultRegister = {
   uid: string
   names: string
   email: string
 };

 

export const authRegister = createAsyncThunk<FetchDataResultRegister, FetchDataArgsRegister>(
   'auth/register',
   async (credentials: { name:string, email: string, password: string }) => {
 
      const response = await fetch( API_URL + '/auth/register', {
         method: 'POST',
         body: JSON.stringify( credentials ),
         headers: { 'Content-Type': 'application/json' },
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

type FetchDataArgsLogin = {
   email: string
   password: string
};

export type FetchDataResultLogin = {
   user: UserState,
   token: string
 };

export const authLogin = createAsyncThunk<FetchDataResultLogin, FetchDataArgsLogin>(
   'auth/login',
   async ( credentials: { email:string, password:string }, thunkAPI) => {

      const response = await fetch( API_URL + '/auth/login', {
         method: 'POST',
         body: JSON.stringify( credentials ),
         headers: { 'Content-Type' : 'application/json' }
      })
      if ( response.ok ) {
         const data = await response.json() as FetchDataResultLogin;
         
         const token = data.token;
         window.localStorage.setItem('x-token', token);

         thunkAPI.dispatch( setUserData( data.user ));

         return data;
      }else {
         const { errorMessage } = await response.json();
         throw new Error( errorMessage );
      }
   }
);


export const authCheck = createAsyncThunk<FetchDataResultLogin>(
   'auth/check',
   async ( _, thunkAPI ) => {

      // Obtener token del local storage
      const token = window.localStorage.getItem('x-token');
      
      // Obtener datos con el token
      const response = await fetch( API_URL + '/auth/check', {
         method: 'GET',
         headers: { 
            'Content-Type' : 'application/json', 
            'x-token': `${token}` 
         }
      });
      // Regresar data con user y token renovado
      if ( response.ok ) {
         const data = await response.json() as FetchDataResultLogin;
         
         const token = data.token;
         window.localStorage.setItem('x-token', token);

         thunkAPI.dispatch( setUserData( data.user ));

         return data;
      }else {
         const { errorMessage } = await response.json();
         throw new Error( errorMessage );
      }
   }
);

export const authlogout = createAsyncThunk<any>(
   'auth/logout',
   async ( _, thunkAPI ) => {

      window.localStorage.removeItem('x-token');
      thunkAPI.dispatch( removeUserData() );

   }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      setAccessToken: (state, action: PayloadAction<string | null>) => {
         state.token = action.payload;
      },
      setIsLoading: (state, action: PayloadAction<boolean>) => {
         state.isLoading = action.payload;
      },
      setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
         state.isLoggedIn = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(authRegister.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(authRegister.fulfilled, (state, action) => {
            state.isLoading = false;
            state.errorMessage = null;
         })
         .addCase(authRegister.rejected, (state, action) => {
            state.isLoading = false;
            if ( action.error.message ) {
               state.errorMessage = action.error.message;
               console.log("rejected: ", action.error.message);
            } 
         });
      builder
         .addCase(authLogin.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(authLogin.fulfilled, (state, action) => {

            state.isLoggedIn = true;
            state.token = action.payload.token;

            state.errorMessage = null;
            state.isLoading = false;
         })
         .addCase(authLogin.rejected, (state, action) => {
            state.isLoading = false;
            if ( action.error.message ) {
               state.errorMessage = action.error.message;
               console.log("rejected: ", action.error.message);
            } 
         });
      builder
         .addCase(authCheck.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(authCheck.fulfilled, (state, action) => {

            state.isLoggedIn = true;
            state.token = action.payload.token;

            state.errorMessage = null;
            state.isLoading = false;
         })
         .addCase(authCheck.rejected, (state, action) => {
            state.isLoading = false;
            if ( action.error.message ) {
               state.errorMessage = action.error.message;
               console.log("rejected: ", action.error.message);
            } 
         });
      builder
         .addCase(authlogout.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(authlogout.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.errorMessage = null;
            state.isLoading = false;
         })
         .addCase(authlogout.rejected, (state, action) => {
            state.isLoading = false;
            if ( action.error.message ) {
               state.errorMessage = action.error.message;
               console.log("rejected: ", action.error.message);
            } 
         })
    },
});

export const { setAccessToken, setIsLoading, setIsLoggedIn } = authSlice.actions;


export default authSlice.reducer