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

  // console.log(member);

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={member.profileImage || defaultImage}
            alt={member.name}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-green-100"
          />

          <span
            className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-white shadow ${
              member.role === "Owner" ? "bg-amber-500" : "bg-emerald-500"
            }`}
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
          <h2 className="truncate text-lg font-semibold text-gray-800">
            {member.name}
          </h2>

          <p className="truncate text-sm text-gray-500">{member.email}</p>

          <p className="mt-1 text-xs text-gray-400">
            Joined {new Date(member.joinedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {owner && member.role !== "Owner" && (
        <button
          onClick={() => handelRemoveMember(member._id)}
          className="btn btn-error btn-soft btn-sm mt-4 w-full"
        >
          <FaTrash className="text-xs" />
          Remove
        </button>
      )}
    </div>
  );
};

export default FamilyCard;
