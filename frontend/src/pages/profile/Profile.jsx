import { useContext } from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { AuthContext } from "../../context/AuthProvider";
import Personal from "../../components/profile/Personal";
import Account from "../../components/profile/Account";

const Profile = () => {
  const { userData, setUserData, server_url } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <ProfileHeader
        userData={userData}
        setUserData={setUserData}
        server_url={server_url}
      />
      <Personal userData={userData} />
      <Account />
    </div>
  );
};

export default Profile;
