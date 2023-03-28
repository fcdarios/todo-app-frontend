
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }:any) => {

   // const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn)
   // console.log( isLoggedIn );
   const isLoggedIn:boolean = false;

  if ( !isLoggedIn ) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoute;