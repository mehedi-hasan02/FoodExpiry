import { FaUsers, FaCrown, FaUserFriends, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FamilyInfo = ({ family, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-md text-green-500"></span>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Family</h2>

        <p className="text-sm text-gray-500 mt-1">
          Information about your family group.
        </p>
      </div>

      {!family ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-4">
            <FaUsers className="text-2xl text-green-500" />
          </div>

          <h3 className="text-lg font-semibold text-gray-800">
            No Family Group
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            You haven't joined a family group yet.
          </p>

          <button
            onClick={() => navigate("/family")}
            className="btn mt-5 bg-green-500 hover:bg-green-600 text-white border-none"
          >
            Create Family
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Family Name */}
            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaUsers className="text-green-500" />

                <span className="text-sm text-gray-500">Family Name</span>
              </div>

              <p className="font-semibold text-gray-800">{family.familyName}</p>
            </div>

            {/* Role */}
            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaCrown className="text-green-500" />

                <span className="text-sm text-gray-500">Your Role</span>
              </div>

              <p className="font-semibold text-gray-800">
                {family.members?.find(
                  (member) => member.user?._id === family.owner?._id,
                )?.role || "Member"}
              </p>
            </div>

            {/* Members */}
            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaUserFriends className="text-green-500" />

                <span className="text-sm text-gray-500">Members</span>
              </div>

              <p className="font-semibold text-gray-800">
                {family.members?.length || 0} Members
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate("/family")}
              className="btn bg-green-500 hover:bg-green-600 text-white border-none"
            >
              View Family
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default FamilyInfo;
