import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

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
    </Routes>
  );
};

export default AppRoutes;
