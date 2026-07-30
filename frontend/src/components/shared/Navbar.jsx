import { Link, NavLink } from "react-router-dom";
import { FaLeaf, FaBars } from "react-icons/fa";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-500 font-semibold" : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/my-foods"
          className={({ isActive }) =>
            isActive ? "text-green-500 font-semibold" : ""
          }
        >
          My Foods
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/add-food"
          className={({ isActive }) =>
            isActive ? "text-green-500 font-semibold" : ""
          }
        >
          Add Food
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-green-500 font-semibold" : ""
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50 px-4 lg:px-8">
      {/* Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <FaBars className="text-xl" />
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-56"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-green-500"
        >
          <FaLeaf />
          <span>FoodExpiry</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1 text-black font-medium">
          {navLinks}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-3">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar cursor-pointer">
            <div className="w-10 rounded-full ring ring-green-500 ring-offset-2">
              <img src="https://i.pravatar.cc/100" alt="profile" />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-52"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>

            <li>
              <Link to="/settings">Settings</Link>
            </li>

            <li>
              <button className="text-red-500">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
