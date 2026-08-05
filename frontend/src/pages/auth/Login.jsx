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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-white rounded-3xl shadow-2xl border border-green-100">
        <div className="card-body p-8">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">Welcome Back</h1>

            <p className="text-gray-500 mt-2">
              Sign in to continue to FoodExpiry.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Email Address
                </span>
              </label>

              <label className="input input-bordered rounded-xl w-full flex items-center gap-3 focus-within:border-green-500">
                <FaEnvelope className="text-green-500" />

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="grow"
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-2">
                <label className="font-semibold text-gray-700">Password</label>
              </div>

              <label className="input input-bordered rounded-xl w-full flex items-center gap-3 focus-within:border-green-500">
                <FaLock className="text-green-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="grow"
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
                  className="text-gray-500 hover:text-green-500 transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Link>
              </label>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <button
                type="button"
                className="text-sm text-red-500 mt-2 cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 border-none text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Login
            </button>
          </form>

          <div className="divider text-gray-400 my-7">OR</div>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-green-500 hover:text-green-600 transition"
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
