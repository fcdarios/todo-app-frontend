import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Tasks from '../pages/Tasks';
import Landing from "../pages/Landing";



const router = createBrowserRouter([
   {
     path: "/",
     element: <Home />,
   },
   {
      path: "/tasks",
      element: <Tasks />,
    },
    {
      path: "/landing",
      element: <Landing />,
    },
   {
      path: "/login",
      element: <Login />,
    },
 ]);


 export default router;