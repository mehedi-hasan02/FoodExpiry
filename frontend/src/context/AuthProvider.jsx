import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const server_url = import.meta.env.VITE_API_URL;

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${server_url}/me`, {
        withCredentials: true,
      });

      setUserData(data.user);
      // console.log(data);
    } catch (error) {
      if (error.response?.status === 401) {
        setUserData(null);
      } else {
        console.error(error.response?.data || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // console.log(userData);

  const value = {
    server_url,
    userData,
    setUserData,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
