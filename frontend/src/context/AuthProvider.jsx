import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const server_url = import.meta.env.VITE_API_URL;

  const value = {
    server_url,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
