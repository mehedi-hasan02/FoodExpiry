import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Navbar expanded={expanded} setExpanded={setExpanded} />
      <main
        className={`min-h-screen bg-gray-50 transition-all duration-300 ${
          expanded ? "ml-64" : "ml-16"
        }`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
