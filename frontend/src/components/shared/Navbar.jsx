import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaAppleAlt,
  FaPlusCircle,
  FaUsers,
  FaBars,
} from "react-icons/fa";
import { MdDashboard, MdFamilyRestroom } from "react-icons/md";
import { useContext, useState, useRef, useEffect } from "react";
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
  const { server_url, userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      className={`fixed top-0 left-0 shadow-md z-50 flex flex-col justify-between transition-all duration-300 ${
        expanded ? "w-64" : "w-16"
      }`}
      style={{
        backgroundColor: "#ffffff",
        color: "#1f2937",
        top: 0,
        bottom: 0,
        height: "100dvh",
      }}
    >
      <div>
        {/* Top: Logo + Toggle */}
        <div className="flex items-center justify-between px-4 py-5">
          <Link
            to="/"
            className="flex items-center gap-2 overflow-hidden"
            style={{ color: "#22c55e" }}
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
            style={{ color: "#1f2937", backgroundColor: "transparent" }}
          >
            <FaBars style={{ color: "#1f2937" }} />
          </button>
        </div>

        {/* Nav Items */}
        <ul className="flex flex-col gap-2 px-3 mt-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => window.innerWidth < 1024 && setExpanded(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors"
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: "#22c55e", color: "#ffffff" }
                    : { color: "#6b7280" }
                }
                onMouseEnter={(e) => {
                  if (!e.currentTarget.classList.contains("active")) {
                    e.currentTarget.style.backgroundColor = "#f0fdf4";
                    e.currentTarget.style.color = "#22c55e";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.classList.contains("active")) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#6b7280";
                  }
                }}
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
      <div className="relative px-1 pb-6" ref={accountRef}>
        <div
          role="button"
          onClick={() => setAccountOpen((prev) => !prev)}
          className="flex items-center gap-3 cursor-pointer px-2 py-2 rounded-lg"
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0fdf4")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <div className="avatar">
            <div
              className="w-9 rounded-full ring ring-offset-2 shrink-0"
              style={{ "--tw-ring-color": "#22c55e" }}
            >
              {userData?.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-9 items-center justify-center rounded-full bg-primary text-white font-semibold">
                  {userData?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          {expanded && (
            <span
              className="text-sm font-medium whitespace-nowrap"
              style={{ color: "#1f2937" }}
            >
              {userData.name}
            </span>
          )}
        </div>

        {accountOpen && (
          <ul
            className="menu menu-sm absolute bottom-full mb-3 left-0 z-[1] p-2 shadow rounded-box w-52"
            style={{ backgroundColor: "#ffffff", color: "#1f2937" }}
          >
            <li>
              <Link
                to="/profile"
                onClick={() => setAccountOpen(false)}
                style={{ color: "#1f2937" }}
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setAccountOpen(false);
                  handelLogout();
                }}
                style={{ color: "#ef4444" }}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Navbar;
