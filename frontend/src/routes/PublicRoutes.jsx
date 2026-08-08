import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FaLeaf } from "react-icons/fa";

const PublicRoutes = ({ children }) => {
  const { userData, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 text-green-600 text-4xl animate-ping">
        <FaLeaf />
        <span className=" font-bold whitespace-nowrap">FoodExpiry</span>
      </div>
    );
  }

  return userData ? <Navigate to="/" replace /> : children;
};

export default PublicRoutes;
