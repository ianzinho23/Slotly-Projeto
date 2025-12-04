import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("slotly_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem("slotly_user");
      }
    }
  }, []);

  function persistUser(u) {
    setUser(u);
    localStorage.setItem("slotly_user", JSON.stringify(u));
  }

  const login = ({ email, password }) => {
    // Este projeto é um protótipo: permitimos qualquer credencial.
    // Define o tipo com base no email (convenção do README) se não houver backend:
    const role = email && email.includes("empresa") ? "empresa" : "cliente";
    const u = {
      id: Date.now(),
      email,
      role,
      name: email.split("@")[0] || "Usuário",
    };
    persistUser(u);
    return u;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("slotly_user");
    navigate("/");
  };

  const register = ({ name, email, password, type = "cliente" }) => {
    // Salva usuários de teste localmente (array)
    const raw = localStorage.getItem("slotly_users");
    const users = raw ? JSON.parse(raw) : [];
    const exists = users.find((x) => x.email === email);
    if (exists) {
      throw new Error("Email já cadastrado");
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: type,
    };
    users.push(newUser);
    localStorage.setItem("slotly_users", JSON.stringify(users));
    // Também loga o usuário automaticamente
    persistUser({ id: newUser.id, name, email, role: type });
    return newUser;
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
