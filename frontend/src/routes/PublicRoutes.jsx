import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const PublicRoutes = ({ children }) => {
  const { userData } = useContext(AuthContext);

  return userData ? <Navigate to="/" replace /> : children;
};

export default PublicRoutes;
