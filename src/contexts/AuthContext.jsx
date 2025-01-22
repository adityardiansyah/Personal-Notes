import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getAccessToken,
  putAccessToken,
  login as loginApi,
  register as registerApi,
  getUserLogged,
} from "../utils/api";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAccessToken();
      if (token) {
        const { error, data } = await getUserLogged();
        if (!error) {
          setIsAuthenticated(true);
          setUser(data);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const { error, data } = await loginApi({ email, password });
    if (!error) {
      putAccessToken(data.accessToken);
      setIsAuthenticated(true);
      const { data: userData } = await getUserLogged();
      setUser(userData);
    }
    return !error;
  };

  const logout = () => {
    putAccessToken("");
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = async (name, email, password) => {
    const { error } = await registerApi({ name, email, password });
    return !error;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
