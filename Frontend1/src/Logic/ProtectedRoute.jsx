import  { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import  {LoginPage}  from '../Pages/LoginPage/LoginPage';
export const ProtectedRoute = ({role, children }) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState();

    const handleLoginSuccess = () => {
      var isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true' ? true : false;
      setIsLoggedIn(isAuthenticated);
    };

    // Verificar la autenticación al cargar la aplicación
    useEffect(() => {
      handleLoginSuccess();
    }, []);


    if (!isLoggedIn) {
      
      return <LoginPage />;
    }
    

    const hasRequiredRole = (requiredRole) => {
      return  currentUserRole === requiredRole;
    };
    
    const currentUserRole = "student"; 
  
    return hasRequiredRole(role) ? children: <Navigate to="/" replace /> 
    
  };
  
 
  
