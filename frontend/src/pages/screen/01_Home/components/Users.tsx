import { useState } from "react";
import { FetchAllUsers, FetchUserProfile } from "@/hooks/UseFetch";
import { UserTypeIcon } from "@/components";
import clsx from "clsx";
import helperService from "@/services/helper.service";

type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
  user_type: string;
  createdAt: string;
  updatedAt: string;
};

function Users() {
  const [showAll, setShowAll] = useState(false);
  const { userProfile } = FetchUserProfile();
  const { fetchingAllUsers, allUsers } = FetchAllUsers();

  const allExceptUser: User[] = allUsers.filter(
    (user: User) => user.email !== (userProfile as User).email
  );

  const itemsToShow = showAll ? allExceptUser : allExceptUser.slice(0, 2);

  console.log({ fetchingAllUsers, allUsers });

  return (
    <div className="flex flex-col items-start border border-gray-300 p-4 rounded-xl bg-white/50 h-auto gap-2">
      <h1 className="text-[20px] font-calSans font-[600] text-main mb-2">
        Who to follow
      </h1>

      {itemsToShow.map((user: User) => (
        <div
          key={user.id}
          className="flex justify-between items-center w-full hover:bg-primaryHover/50 cursor-pointer p-2 rounded-md"
        >
          <div className="flex items-center gap-2">
            <img src={user.picture} alt="" className="w-10 h-10 rounded-full" />
            <div className="flex flex-col leading-4 justify-center">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-main text-[15px]">{user.name}</h1>
                <span
                  className={clsx(
                    "rounded-full p-1",
                    helperService.getUserTypeBg(user.user_type)
                  )}
                >
                  <UserTypeIcon userType={user.user_type} size={8} />
                </span>
              </div>
              <p className="text-gray-500 text-[14px]">
                @{user.email.split("@"[0])}
              </p>
            </div>
          </div>

          <button className="bg-main hover:bg-primary text-white font-semibold px-5 py-1.5 text-[13px] rounded-full transition-all duration-300 ease-in-out cursor-not-allowed">
            Follow
          </button>
        </div>
      ))}

      {allUsers.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-sm font-semibold text-primary hover:text-main transition-colors duration-300 ease-in-out"
        >
          {showAll ? "Show Less" : "See More"}
        </button>
      )}
    </div>
  );
}

export default Users;
