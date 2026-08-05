import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import FamilyCard from "../../components/family/FamilyCard";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import AddMemberModal from "../../components/family/AddMemberModal";
import CreateFamilyModal from "../../components/family/CreateFamily";
import { toast } from "react-toastify";

const Family = () => {
  const { server_url, userData } = useContext(AuthContext);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showCreateFamilyModal, setShowCreateFamilyModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [owner, setOwner] = useState(false);
  const [familyName, setFamilyName] = useState("");
  const hasFamily = !!userData?.family;

  const findOwner = async () => {
    try {
      const res = await axios.get(`${server_url}/family/owner`, {
        withCredentials: true,
      });

      if (res.data.success === true) {
        setFamilyName(res.data.owner.familyName);
        setOwner(true);
      }
    } catch (error) {
      setOwner(false);
    }
  };

  const getFamilyMembers = async () => {
    try {
      const familyData = await axios.get(`${server_url}/family`, {
        withCredentials: true,
      });

      const formattedMembers = familyData.data.family.members.map((member) => ({
        _id: member.user._id,
        name: member.user.name,
        email: member.user.email,
        profileImage: member.user.profileImage,
        role: member.role,
        joinedAt: member.joinedAt,
      }));

      setMembers(formattedMembers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateFamily = async (familyName) => {
    try {
      const res = await axios.post(
        `${server_url}/family`,
        { familyName },
        { withCredentials: true },
      );

      if (res) {
        toast.success(res.data.message);
        setOwner(true);
        setFamilyName(familyName);
        setShowCreateFamilyModal(false);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!userData) return;

    findOwner();

    if (userData.family) {
      getFamilyMembers();
    }
  }, [userData]);

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-green-600">Family Members</h1>

        <p className="text-gray-500 mt-2">
          Invite your family members and manage your shared food inventory.
        </p>
      </div>

      {/* Invite */}
      {owner && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
          <div className="flex justify-center">
            <button
              onClick={() => setShowAddMemberModal(true)}
              className="btn bg-green-500 hover:bg-green-600 text-white"
            >
              <FaUserPlus />
              Add Member
            </button>
          </div>
        </div>
      )}
      {!owner && !hasFamily && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
          <div className="flex justify-center">
            <button
              onClick={() => setShowCreateFamilyModal(true)}
              className="btn bg-green-500 hover:bg-green-600 text-white"
            >
              <FaUserPlus />
              Create Family
            </button>
          </div>
        </div>
      )}

      <AddMemberModal
        open={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        familyName={familyName}
        getFamilyMembers={getFamilyMembers}
        // handleInvite={handleInvite}
      />

      <CreateFamilyModal
        open={showCreateFamilyModal}
        onClose={() => setShowCreateFamilyModal(false)}
        handleCreateFamily={handleCreateFamily}
      />

      {/* Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {members.map((member) => (
          <FamilyCard key={member._id} member={member} owner={owner} />
        ))}
      </div>
    </div>
  );
};

export default Family;
