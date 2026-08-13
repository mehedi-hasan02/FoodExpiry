import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import imageCompression from "browser-image-compression";
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
        const compressedImage = await imageCompression(data.profileImage?.[0], {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        });

        formData.append("profileImage", compressedImage);
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
              Create Account
            </h1>

            <p className="mt-2" style={{ color: "#6b7280" }}>
              Join FoodExpiry and start managing your food smarter.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="avatar">
                  <div
                    className="w-28 rounded-full overflow-hidden"
                    style={{
                      boxShadow: "0 0 0 4px #22c55e, 0 0 0 8px #ffffff",
                    }}
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: "#dcfce7" }}
                      >
                        <FaUser
                          className="text-5xl"
                          style={{ color: "#22c55e" }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 w-9 h-9 rounded-full transition flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#16a34a]"
                  style={{ backgroundColor: "#22c55e" }}
                >
                  <FaCamera className="text-sm" style={{ color: "#ffffff" }} />
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
                <p className="text-sm mt-3" style={{ color: "#ef4444" }}>
                  {errors.profileImage.message}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="label">
                <span
                  className="label-text font-semibold"
                  style={{ color: "#374151" }}
                >
                  Full Name
                </span>
              </label>

              <label
                className="input input-bordered rounded-xl flex items-center gap-3 w-full"
                style={{ backgroundColor: "#ffffff", borderColor: "#d1d5db" }}
              >
                <FaUser style={{ color: "#22c55e" }} />

                <input
                  type="text"
                  placeholder="John Doe"
                  className="grow"
                  style={{
                    colorScheme: "light",
                    backgroundColor: "transparent",
                    color: "#1f2937",
                  }}
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
                <p className="text-sm mt-1" style={{ color: "#ef4444" }}>
                  {errors.name.message}
                </p>
              )}
            </div>

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
                className="input input-bordered rounded-xl flex w-full items-center gap-3"
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
              <label className="label">
                <span
                  className="label-text font-semibold"
                  style={{ color: "#374151" }}
                >
                  Password
                </span>
              </label>

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

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="transition"
                  style={{ color: "#6b7280", backgroundColor: "transparent" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#22c55e")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#6b7280")
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>

              {errors.password && (
                <p className="text-sm mt-1" style={{ color: "#ef4444" }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-full h-12 rounded-xl border-none text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#16a34a]"
              style={{ backgroundColor: "#22c55e", color: "#ffffff" }}
            >
              Create Account
            </button>
          </form>

          <div className="divider my-7" style={{ color: "#9ca3af" }}>
            OR
          </div>

          <p className="text-center" style={{ color: "#4b5563" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold transition hover:text-[#16a34a]"
              style={{ color: "#22c55e" }}
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
