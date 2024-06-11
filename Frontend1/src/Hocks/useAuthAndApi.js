import { useState } from "react";
import { ApiMsal } from "../Logic/ApiMsal";
import { singletonHook } from 'react-singleton-hook';
const init = false;
const apiMsal = new ApiMsal();
const useAuthAndApiImpl = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(init);
  const [error, setError] = useState(null);
  

  const login = async () => {
    const success = await apiMsal.login();
    if (success) {
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true");
    } else {
      setError("Failed to login");
    }
  };

  const logout = () => {
    apiMsal.logout();
    setIsAuthenticated(false);
    sessionStorage.setItem("isAuthenticated", "false");
  };

  return { isAuthenticated, error, login, logout };
};

export const useAuthAndApi = singletonHook(init, useAuthAndApiImpl);




