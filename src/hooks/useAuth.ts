import { useEffect } from "react";




const useAuth = () => {

  useEffect(() => {
    const token = localStorage.getItem("x-token");

    if (token) {
      // window.location.href = "/landing";
    } else {
      // Redirigir a la página de inicio de sesión
      window.location.href = "/";
    }
  }, []);
};

export default useAuth;
