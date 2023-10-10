

import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../features/home/components/LandingPage'
import TaskPage from '../features/task/components/TaskPage'
import LoginPage from '../features/auth/components/LoginPage'
import RegisterPage from '../features/auth/components/RegisterPage'
import { useAppSelector } from '../app/hooks'

const AppRouter = () => {

   const isLoggedIn = useAppSelector( state => state.auth.isLoggedIn );

   return (
      <Routes>
         
         {/* <Route path="/task" element={ <TaskPage /> } /> */}


         <Route path="/login" element={ ( !isLoggedIn ) ? <LoginPage /> : <Navigate to="/" />  } />
         <Route path="/login/*" element={ <Navigate to="/login" /> } />
         <Route path="/register" element={ ( !isLoggedIn ) ? <RegisterPage /> : <Navigate to="/" />  } />
         <Route path="/register/*" element={ <Navigate to="/register" /> } />

         <Route path="/" element={ ( isLoggedIn ) ? <TaskPage /> : <LandingPage />  } />
         <Route path="/*" element={ <Navigate to="/" /> } />

      </Routes>
   )
}

export default AppRouter