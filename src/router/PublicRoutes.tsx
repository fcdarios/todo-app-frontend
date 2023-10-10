import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { JsxElement } from "typescript";



const PublicRoutes = ({ children } : JsxElement ) => {

   const isLoggedIn = useAppSelector( state => state.auth.isLoggedIn );

   return (!isLoggedIn)
       ? children
       : <Navigate to="/" />
}

export default PublicRoutes