import { getUserEmail } from "@/lib/actions/users";
import DropdownNavigation from "./DropdownNavigation";
import HomeButton from "./HomeButton";

const NavigationButtons = async () => {
  const userData = await getUserEmail();
  return (
    <nav className="flex gap-4 justify-between items-center">
      <HomeButton />
      <DropdownNavigation userData={userData} />
    </nav>
  );
};

export default NavigationButtons;
