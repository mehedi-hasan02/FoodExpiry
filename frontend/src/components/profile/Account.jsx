import { useContext, useState } from "react";
import { FaLock, FaChevronRight } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import ChangePasswordModal from "./ChangePasswordModal";

const Account = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { server_url } = useContext(AuthContext);

  return (
    <>
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-auto max-w-7xl space-y-6 p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Account</h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage your account security.
          </p>
        </div>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="w-full flex items-center justify-between border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <FaLock className="text-green-500" />
            </div>

            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Change Password</h3>

              <p className="text-sm text-gray-500">
                Update your account password
              </p>
            </div>
          </div>

          <FaChevronRight className="text-gray-400" />
        </button>
      </section>

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        server_url={server_url}
      />
    </>
  );
};

export default Account;
