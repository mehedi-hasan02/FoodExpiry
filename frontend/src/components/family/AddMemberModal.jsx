import { useContext, useState } from "react";
import { FaTimes, FaUserPlus } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
const AddMemberModal = ({ open, onClose, familyName, getFamilyMembers }) => {
  const { server_url, userData } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    // handleInvite(email);

    setLoading(true);

    try {
      // const existUser = await axios.get(`${server_url}/user/${email}`);

      const res = await axios.post(
        `${server_url}/family/member`,
        { email },
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        await getFamilyMembers();
        setEmail("");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // console.log(userData._id);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 btn btn-sm btn-circle btn-ghost"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-1">Add Family Member</h2>

        <p className="text-gray-500 mb-6">
          Family: <span className="font-semibold">{familyName}</span>
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="label">
              <span className="label-text">Member Email</span>
            </label>

            <input
              type="email"
              placeholder="Enter member email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-green-500 hover:bg-green-600 text-white w-full"
          >
            <FaUserPlus />
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
