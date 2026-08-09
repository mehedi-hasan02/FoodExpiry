import { FaUser, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const Personal = ({ userData }) => {
  const formattedDate = new Date(userData?.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-auto max-w-7xl space-y-6 p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Personal Information
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Your basic account information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <FaUser className="text-green-500" />

            <span className="text-sm text-gray-500">Full Name</span>
          </div>

          <p className="font-semibold text-gray-800">{userData?.name}</p>
        </div>

        <div className="border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <FaEnvelope className="text-green-500" />

            <span className="text-sm text-gray-500">Email</span>
          </div>

          <p className="font-semibold text-gray-800 break-all">
            {userData?.email}
          </p>
        </div>
        <div className="border border-gray-100 rounded-xl p-4 md:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <FaCalendarAlt className="text-green-500" />

            <span className="text-sm text-gray-500">Account Created</span>
          </div>

          <p className="font-semibold text-gray-800">{formattedDate}</p>
        </div>
      </div>
    </section>
  );
};

export default Personal;
