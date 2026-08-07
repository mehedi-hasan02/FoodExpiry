import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaAppleAlt,
  FaPlusCircle,
  FaUsers,
  FaBars,
} from "react-icons/fa";
import { MdDashboard, MdFamilyRestroom } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const navItems = [
  { to: "/", label: "Dashboard", icon: MdDashboard },
  { to: "/my-foods", label: "My Foods", icon: FaAppleAlt },
  { to: "/family-foods", label: "Family Foods", icon: MdFamilyRestroom },
  { to: "/add-food", label: "Add Food", icon: FaPlusCircle },
  { to: "/family-member", label: "Family Members", icon: FaUsers },
];

const Navbar = ({ expanded, setExpanded }) => {
  const { server_url, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handelLogout = async () => {
    try {
      const res = await axios.post(
        `${server_url}/logout`,
        {},
        { withCredentials: true },
      );

      if (res.status == 200) {
        setUserData(null);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white shadow-md z-50 flex flex-col justify-between transition-all duration-300 ${
        expanded ? "w-64" : "w-16"
      }`}
    >
      <div>
        {/* Top: Logo + Toggle */}
        <div className="flex items-center justify-between px-4 py-5">
          <Link
            to="/"
            className="flex items-center gap-2 text-green-500 overflow-hidden"
          >
            <FaLeaf className="text-2xl shrink-0" />
            {expanded && (
              <span className="text-lg font-bold whitespace-nowrap">
                FoodExpiry
              </span>
            )}
          </Link>

          <button
            onClick={() => setExpanded(!expanded)}
            className="btn btn-ghost btn-sm btn-circle shrink-0"
          >
            <FaBars />
          </button>
        </div>

        {/* Nav Items */}
        <ul className="flex flex-col gap-2 px-3 mt-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => window.innerWidth < 1024 && setExpanded(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-500 text-white"
                      : "text-gray-500 hover:bg-green-50 hover:text-green-500"
                  }`
                }
              >
                <Icon className="text-lg shrink-0" />
                {expanded && (
                  <span className="whitespace-nowrap font-medium">{label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom: Profile */}
      <div className="dropdown dropdown-top dropdown-end px-3 pb-6">
        <div
          tabIndex={0}
          role="button"
          className="flex items-center gap-3 cursor-pointer px-2 py-2 rounded-lg hover:bg-green-50"
        >
          <div className="avatar">
            <div className="w-9 rounded-full ring ring-green-500 ring-offset-2 shrink-0">
              <img src="https://i.pravatar.cc/100" alt="profile" />
            </div>
          </div>
          {expanded && (
            <span className="text-sm font-medium whitespace-nowrap">
              My Account
            </span>
          )}
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mb-3 z-[1] p-2 shadow bg-white text-black rounded-box w-52"
        >
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handelLogout} className="text-red-500">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Navbar;
