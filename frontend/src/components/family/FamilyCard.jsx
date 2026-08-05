import { FaUser, FaEnvelope, FaTrash, FaCrown, FaUsers } from "react-icons/fa";

const FamilyCard = ({ member, owner }) => {
  const defaultImage =
    "https://ui-avatars.com/api/?name=" + encodeURIComponent(member.name);

  const handelRemoveMember = async (id) => {
    console.log(id);
  };

  // console.log(member);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col items-center">
        <img
          src={member.profileImage || defaultImage}
          alt={member.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
        />

        <h2 className="text-xl font-bold mt-4">{member.name}</h2>

        <div
          className={`badge mt-2 ${
            member.role === "Owner" ? "badge-warning" : "badge-success"
          }`}
        >
          {member.role === "Owner" ? (
            <>
              <FaCrown />
              Owner
            </>
          ) : (
            <>
              <FaUsers />
              Member
            </>
          )}
        </div>
      </div>

      <div className="divider"></div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-green-500" />
          <span className="text-sm break-all">{member.email}</span>
        </div>

        <div className="text-sm text-gray-500">
          Joined: {new Date(member.joinedAt).toLocaleDateString()}
        </div>
      </div>

      {owner && (
        <button
          onClick={() => handelRemoveMember(member._id)}
          className="btn btn-error btn-outline w-full mt-6"
        >
          <FaTrash />
          Remove Member
        </button>
      )}
    </div>
  );
};

export default FamilyCard;
