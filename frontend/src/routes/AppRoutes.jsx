import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        }
      />

      {/* private routes */}
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
