import { getUserEmail } from "@/lib/actions/users";
import DropdownNavigation from "./DropdownNavigation";

const UserInfo = async () => {
  const userData = await getUserEmail();
  return <DropdownNavigation userData={userData} />;
};

export default UserInfo;
