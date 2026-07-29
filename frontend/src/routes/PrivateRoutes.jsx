import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { userData, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return userData ? children : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
