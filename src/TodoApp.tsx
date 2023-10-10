import React, { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import { useAppDispatch } from './app/hooks';
import { authCheck } from './features/auth/authSlice';


function TodoApp() {

   const dispatch = useAppDispatch();
   // const isLoggedIn =  useAppSelector( state => state.auth.isLoggedIn );

  useEffect(() => {

      const checkAuth = async () => {
         await dispatch( authCheck() );
      }
      checkAuth();
  }, [dispatch])
  
   return (
      <AppRouter />
   );
}

export default TodoApp;
