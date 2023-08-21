import { useSelector } from "react-redux";
import Avatar from "../../Avatar";


const ProfileSidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Avatar />
      <div>
        <span>{user.firstname}</span>
      </div>
    </>
  );
};

export default ProfileSidebar;
