import { useEffect, useState } from "react";
import { User, getUserData } from "@/lib/api/usersApi";
import ProfileDetailsEditForm from "./ProfileDetailsEditForm";

export const ProfileDetails = ({ params }: { params: { id: number } }) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    getUserData(params.id).then((user) => {
      setUserData(user);
    });
  }, [params.id]);

  // TODO: Mejorar el estado de carga!
  if (!userData) return <h1>loading</h1>;

  return (
    <div>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="grid grid-cols-4 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {userData.likes_count ?? 0}
                </p>
                <p className="text-gray-400">Likes</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {userData.dislikes_count ?? 0}
                </p>
                <p className="text-gray-400">Dislikes</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {userData.rides_given ?? 0}
                </p>
                <p className="text-gray-400">Colas dadas</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {userData.rides_recieved ?? 0}
                </p>
                <p className="text-gray-400">Colas recibidas</p>
              </div>
            </div>
            <div className="md:relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 mt-28 md:-mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {userData.first_name && userData.last_name
                ? `${userData.first_name ?? ""} ${userData.last_name ?? ""}`
                : userData.email}
            </h1>
            <p className="font-light text-gray-600 mt-3">{userData.email}</p>
            {userData && userData.is_currently_logged_user && (
              <ProfileDetailsEditForm userData={userData} />
            )}
          </div>

          {/* <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light lg:px-16">Titulos obtenidos</p>
            <>
            {userData.titles.map((title: string) => {
                return (
                <h1>{title}</h1>
                )
            })}
            </>
          </div> */}
        </div>
      </div>
    </div>
  );
};
