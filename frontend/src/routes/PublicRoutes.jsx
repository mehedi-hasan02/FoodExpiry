import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const PublicRoutes = ({ children }) => {
  const { userData, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return userData ? <Navigate to="/" replace /> : children;
};

export default PublicRoutes;
