import { useContext, useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { server_url, setUserData, getUserData } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${server_url}/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );

      if (res) {
        setUserData(res.data.user);
        await getUserData();
        toast.success(res.data.message);
        navigate("/", { replace: true });
      }

      // console.log(res.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      // console.log(error.response?.data?.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background:
          "linear-gradient(to bottom right, #f0fdf4, #ffffff, #dcfce7)",
      }}
    >
      <div
        className="card w-full max-w-md rounded-3xl shadow-2xl"
        style={{
          backgroundColor: "#ffffff",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#dcfce7",
        }}
      >
        <div className="card-body p-8">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-bold" style={{ color: "#1f2937" }}>
              Welcome Back
            </h1>

            <p className="mt-2" style={{ color: "#6b7280" }}>
              Sign in to continue to FoodExpiry.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
            {/* Email */}
            <div>
              <label className="label">
                <span
                  className="label-text font-semibold"
                  style={{ color: "#374151" }}
                >
                  Email Address
                </span>
              </label>

              <label
                className="input input-bordered rounded-xl w-full flex items-center gap-3"
                style={{ backgroundColor: "#ffffff", borderColor: "#d1d5db" }}
              >
                <FaEnvelope style={{ color: "#22c55e" }} />

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="grow"
                  style={{
                    colorScheme: "light",
                    backgroundColor: "transparent",
                    color: "#1f2937",
                  }}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
              </label>

              {errors.email && (
                <p className="text-sm mt-1" style={{ color: "#ef4444" }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-2">
                <label className="font-semibold" style={{ color: "#374151" }}>
                  Password
                </label>
              </div>

              <label
                className="input input-bordered rounded-xl w-full flex items-center gap-3"
                style={{ backgroundColor: "#ffffff", borderColor: "#d1d5db" }}
              >
                <FaLock style={{ color: "#22c55e" }} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="grow"
                  style={{
                    colorScheme: "light",
                    backgroundColor: "transparent",
                    color: "#1f2937",
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <Link
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ color: "#6b7280" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#22c55e")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#6b7280")
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Link>
              </label>

              {errors.password && (
                <p className="text-sm mt-1" style={{ color: "#ef4444" }}>
                  {errors.password.message}
                </p>
              )}

              <button
                type="button"
                className="text-sm mt-2 cursor-pointer"
                style={{ color: "#ef4444", backgroundColor: "transparent" }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn w-full h-12 rounded-xl border-none text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#16a34a]"
              style={{ backgroundColor: "#22c55e", color: "#ffffff" }}
            >
              Login
            </button>
          </form>

          <div className="divider my-7" style={{ color: "#9ca3af" }}>
            OR
          </div>

          <p className="text-center" style={{ color: "#4b5563" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold transition hover:text-[#16a34a]"
              style={{ color: "#22c55e" }}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
