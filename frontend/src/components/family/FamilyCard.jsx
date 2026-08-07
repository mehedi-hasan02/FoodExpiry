import { useContext } from "react";
import { FaTrash, FaCrown, FaUsers } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const FamilyCard = ({ member, owner, getFamilyMembers }) => {
  const { server_url } = useContext(AuthContext);
  const defaultImage =
    "https://ui-avatars.com/api/?name=" + encodeURIComponent(member.name);

  const handelRemoveMember = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This member will be removed from your family.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Remove",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      const res = await axios.delete(`${server_url}/family/member/${id}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        getFamilyMembers();
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="group rounded-2xl p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        backgroundColor: "#ffffff",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#e5e7eb",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#86efac")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={member.profileImage || defaultImage}
            alt={member.name}
            className="h-16 w-16 rounded-full object-cover"
            style={{
              boxShadow: "0 0 0 2px #dcfce7",
            }}
          />

          <span
            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full shadow"
            style={{
              backgroundColor: member.role === "Owner" ? "#f59e0b" : "#10b981",
              color: "#ffffff",
            }}
          >
            {member.role === "Owner" ? (
              <FaCrown className="text-xs" />
            ) : (
              <FaUsers className="text-xs" />
            )}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2
            className="truncate text-lg font-semibold"
            style={{ color: "#1f2937" }}
          >
            {member.name}
          </h2>

          <p className="truncate text-sm" style={{ color: "#6b7280" }}>
            {member.email}
          </p>

          <p className="mt-1 text-xs" style={{ color: "#9ca3af" }}>
            Joined {new Date(member.joinedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {owner && member.role !== "Owner" && (
        <button
          onClick={() => handelRemoveMember(member._id)}
          className="btn btn-sm mt-4 w-full border-none hover:bg-[#fecaca]"
          style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}
        >
          <FaTrash className="text-xs" />
          Remove
        </button>
      )}
    </div>
  );
};

export default FamilyCard;
