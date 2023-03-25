
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null
   isLoading: boolean;
  isLoggedIn: boolean;
  errorMessage: string | undefined | null;
}

const initialState: AuthState = {
  accessToken: null,
   isLoading: false,
  isLoggedIn: false,
  errorMessage: undefined,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string, password: string }, thunkAPI) => {

   console.log( credentials );
    // Aquí debería hacerse la llamada a la API para hacer la autenticación
    // y devolver los datos del usuario si se ha autenticado correctamente.
    // En caso de error, puede lanzar una excepción o devolver un objeto con la información del error.
    // Por ejemplo:
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify(credentials),
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // if (response.ok) {
    //   const user = await response.json();
    //   return user;
    // } else {
    //   const error = await response.json();
    //   throw new Error(error.message);
    // }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.errorMessage = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.errorMessage = action.error.message;
    });
  },
});

