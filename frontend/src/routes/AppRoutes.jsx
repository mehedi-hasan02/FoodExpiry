import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home";
import MainLayout from "../components/layout/MainLayout";
import AddFood from "../pages/food/AddFood";
import MyFood from "../pages/food/MyFood";

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
        element={
          <PrivateRoutes>
            <MainLayout />
          </PrivateRoutes>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/my-foods" element={<MyFood />} />
        <Route path="/add-food" element={<AddFood />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
