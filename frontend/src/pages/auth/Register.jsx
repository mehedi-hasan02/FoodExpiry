import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const { server_url, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    ref: imageRef,
    onChange: imageOnChange,
    ...imageRegister
  } = register("profileImage");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      if (data.profileImage?.[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const res = await axios.post(`${server_url}/signup`, formData, {
        withCredentials: true,
      });

      if (res) {
        setUserData(res.data.user);
        toast.success(res.data.message);
        navigate("/", { replace: true });
      }

      // console.log(res.data.user);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      // console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-white rounded-3xl shadow-2xl border border-green-100">
        <div className="card-body p-8">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">Create Account</h1>

            <p className="text-gray-500 mt-2">
              Join FoodExpiry and start managing your food smarter.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="avatar">
                  <div className="w-28 rounded-full ring-4 ring-green-500 ring-offset-4 ring-offset-white overflow-hidden">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-green-100 flex items-center justify-center">
                        <FaUser className="text-5xl text-green-500" />
                      </div>
                    )}
                  </div>
                </div>

                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 transition flex items-center justify-center cursor-pointer shadow-lg"
                >
                  <FaCamera className="text-white text-sm" />
                </label>

                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  hidden
                  ref={imageRef}
                  {...imageRegister}
                  onChange={(e) => {
                    imageOnChange(e);
                    handleImageChange(e);
                  }}
                />
              </div>

              {errors.profileImage && (
                <p className="text-red-500 text-sm mt-3">
                  {errors.profileImage.message}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Full Name
                </span>
              </label>

              <label className="input input-bordered rounded-xl flex items-center gap-3 focus-within:border-green-500 focus-within:outline-none w-full">
                <FaUser className="text-green-500" />

                <input
                  type="text"
                  placeholder="John Doe"
                  className="grow"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                  })}
                />
              </label>

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Email Address
                </span>
              </label>

              <label className="input input-bordered rounded-xl flex w-full items-center gap-3 focus-within:border-green-500 focus-within:outline-none">
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
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Password
                </span>
              </label>

              <label className="input input-bordered rounded-xl w-full flex items-center gap-3 focus-within:border-green-500 focus-within:outline-none">
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

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-500 hover:text-green-500 transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 border-none text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Create Account
            </button>
          </form>

          <div className="divider text-gray-400 my-7">OR</div>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-500 hover:text-green-600 transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
