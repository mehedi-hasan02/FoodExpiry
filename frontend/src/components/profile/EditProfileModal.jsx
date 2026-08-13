import axios from "axios";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const EditProfileModal = ({ userData, setUserData, server_url, onClose }) => {
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [profileImage, setProfileImage] = useState(
    userData?.profileImage || "",
  );
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);

      if (imageFile) {
        const compressedImage = await imageCompression(imageFile, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        });

        formData.append("profileImage", compressedImage);
      }

      const res = await axios.put(`${server_url}/user/update`, formData, {
        withCredentials: true,
      });

      toast.success(res.data.message);
      setUserData(res.data.user);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="w-full max-w-md rounded-xl p-6 shadow-xl"
        style={{ backgroundColor: "#ffffff", color: "#1f2937" }}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold" style={{ color: "#1f2937" }}>
            Edit Profile
          </h2>

          <button
            onClick={onClose}
            style={{ color: "#6b7280" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1f2937")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Image */}
          <div className="mb-5 flex flex-col items-center">
            <img
              src={profileImage || "/default-profile.png"}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
              style={{
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#e5e7eb",
              }}
            />

            <label
              className="mt-3 cursor-pointer rounded-lg px-4 py-2 text-sm"
              style={{ backgroundColor: "#f3f4f6", color: "#1f2937" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e5e7eb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f3f4f6")
              }
            >
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: "#374151" }}
            >
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              style={{
                colorScheme: "light",
                backgroundColor: "#ffffff",
                color: "#1f2937",
                borderColor: "#d1d5db",
              }}
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: "#374151" }}
            >
              Email
            </label>

            <input
              type="email"
              readOnly
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              style={{
                colorScheme: "light",
                backgroundColor: "#ffffff",
                color: "#1f2937",
                borderColor: "#d1d5db",
              }}
              placeholder="Enter your email"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn"
              style={{
                backgroundColor: "transparent",
                color: "#1f2937",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#d1d5db",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn border-none hover:bg-[#16a34a]"
              style={{ backgroundColor: "#22c55e", color: "#ffffff" }}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
