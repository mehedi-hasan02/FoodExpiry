import { useState } from "react";
import { FaLock, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePasswordModal = ({ open, setUserData, onClose, server_url }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      toast.error("Both password fields are required");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${server_url}/user/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
        },
      );

      toast.success(res.data.message || "Password changed successfully");

      setOldPassword("");
      setNewPassword("");
      setShowOldPassword(false);
      setShowNewPassword(false);

      await axios.post(
        `${server_url}/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      onClose();
      setUserData(null);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    setOldPassword("");
    setNewPassword("");
    setShowOldPassword(false);
    setShowNewPassword(false);

    onClose();
  };

  return (
    <dialog
      className={`modal ${open ? "modal-open" : ""}`}
      style={{ colorScheme: "light" }}
    >
      <div
        className="modal-box max-w-md"
        style={{ backgroundColor: "#ffffff", color: "#1f2937" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#f0fdf4" }}
            >
              <FaLock style={{ color: "#22c55e" }} />
            </div>

            <div>
              <h3 className="text-xl font-bold" style={{ color: "#1f2937" }}>
                Change Password
              </h3>

              <p className="text-sm" style={{ color: "#6b7280" }}>
                Update your account password
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost"
            style={{ color: "#6b7280", backgroundColor: "transparent" }}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">
              <span
                className="label-text font-medium"
                style={{ color: "#1f2937" }}
              >
                Current Password
              </span>
            </label>

            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your current password"
                className="input input-bordered w-full pr-12"
                style={{
                  colorScheme: "light",
                  backgroundColor: "#ffffff",
                  color: "#1f2937",
                  borderColor: "#d1d5db",
                }}
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "#6b7280" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#374151")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
                disabled={loading}
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="label">
              <span
                className="label-text font-medium"
                style={{ color: "#1f2937" }}
              >
                New Password
              </span>
            </label>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="input input-bordered w-full pr-12"
                style={{
                  colorScheme: "light",
                  backgroundColor: "#ffffff",
                  color: "#1f2937",
                  borderColor: "#d1d5db",
                }}
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "#6b7280" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#374151")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
                disabled={loading}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <p className="text-xs mt-2" style={{ color: "#6b7280" }}>
              Password must be at least 6 characters.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-ghost"
              style={{ color: "#1f2937", backgroundColor: "transparent" }}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn border-none hover:bg-[#16a34a]"
              style={{ backgroundColor: "#22c55e", color: "#ffffff" }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
};

export default ChangePasswordModal;
