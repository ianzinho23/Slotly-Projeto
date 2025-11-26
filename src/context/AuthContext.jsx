import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

// Hook customizado para usar o contexto facilmente
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // "cliente" ou "empresa"
  const [userName, setUserName] = useState(null);

  // Ao iniciar, verificar se já existe login salvo no localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const type = localStorage.getItem("userType");
    const name = localStorage.getItem("userName");

    setIsLoggedIn(loggedIn);
    setUserType(type);
    setUserName(name);
  }, []);

  const login = (type, name) => {
    setIsLoggedIn(true);
    setUserType(type); // "cliente" ou "empresa"
    setUserName(name);

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userType", type);
    localStorage.setItem("userName", name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUserName(null);

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userType, userName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
