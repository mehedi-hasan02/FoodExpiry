import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home";
import MainLayout from "../components/layout/MainLayout";
import AddFood from "../pages/food/AddFood";
import MyFood from "../pages/food/MyFood";
import Family from "../pages/family/Family";
import Dashboard from "../pages/dashboard/Dashboard";
// import Dashboard from "../components/dashboard/Dashboard";

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
        <Route path="/" element={<Dashboard />} />
        <Route path="/my-foods" element={<MyFood />} />
        <Route path="/family-foods" element={<Home />} />
        <Route path="/add-food" element={<AddFood />} />
        <Route path="/family-member" element={<Family />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
