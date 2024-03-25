import ProfileCard from "@/components/Profile/ProfileCard";
import VehiclesCard from "@/components/Profile/Vehicles/VehiclesCard";
import { getUserInfo } from "@/lib/actions/users";

const ProfileInfoSection = async ({ id }: { id: string }) => {
  const userInfo = await getUserInfo(id);
  if (!userInfo) return;
  return (
    <section className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 mt-10 p-4">
      <ProfileCard user={userInfo} />
      {"id" in userInfo && <VehiclesCard />}
    </section>
  );
};

export default ProfileInfoSection;
