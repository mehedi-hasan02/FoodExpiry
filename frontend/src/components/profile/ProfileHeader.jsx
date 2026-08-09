import { FaEdit, FaUser } from "react-icons/fa";

const ProfileHeader = ({ userData }) => {
  console.log(userData.name);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-auto max-w-7xl space-y-6 p-6 md:p-8 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
        <div className="shrink-0">
          {userData?.profileImage ? (
            <img
              src={userData?.profileImage}
              alt={userData?.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-green-100"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center">
              <FaUser className="text-4xl text-green-500" />
            </div>
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{userData?.name}</h2>

          <p className="text-gray-500 mt-1">{userData?.email}</p>

          <p className="text-sm text-gray-400 mt-2">
            Member since{" "}
            {new Date(userData?.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <button className="btn bg-green-500 hover:bg-green-600 text-white border-none">
          <FaEdit />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
