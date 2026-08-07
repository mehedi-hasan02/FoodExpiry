import { useState } from "react";
import { FaTimes, FaUsers } from "react-icons/fa";

const CreateFamilyModal = ({ open, onClose, handleCreateFamily }) => {
  const [familyName, setFamilyName] = useState("");

  if (!open) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    if (handleCreateFamily(familyName)) {
      setFamilyName("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="rounded-xl w-full max-w-md p-6 relative"
        style={{ backgroundColor: "#ffffff", color: "#1f2937" }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 btn btn-sm btn-circle btn-ghost"
          style={{ color: "#6b7280" }}
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-green-600">
          Create Family
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="label">
              <span className="label-text" style={{ color: "#1f2937" }}>
                Family Name
              </span>
            </label>

            <input
              type="text"
              placeholder="Enter family name"
              className="input input-bordered w-full"
              style={{
                colorScheme: "light",
                backgroundColor: "#ffffff",
                color: "#1f2937",
                borderColor: "#d1d5db",
              }}
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn border-none w-full hover:bg-[#16a34a]"
            style={{ backgroundColor: "#22c55e", color: "#ffffff" }}
          >
            <FaUsers />
            Create Family
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFamilyModal;
