import { useState, useEffect } from "react";
import { FetchAllUsers, FetchUserProfile } from "@/hooks/UseFetch";
import { UserTypeIcon } from "@/components";
import type { User } from "@/types";
import clsx from "clsx";
import helperService from "@/services/helper.service";
import UsersSkeleton from "./UsersSkeleton";

interface UserProps {
  title?: string;
  searchTerm?: string;
  show?: number;
  flatten?: boolean;
  minify?: boolean;
}

function Users({
  title = "Who to follow",
  searchTerm = "",
  show = 2,
  flatten = false,
  minify = true,
}: UserProps) {
  const [showAll, setShowAll] = useState(false);
  const { userProfile } = FetchUserProfile();
  const { fetchingAllUsers, allUsers } = FetchAllUsers();

  const otherUsers: User[] = allUsers.filter(
    (user: User) => user.email !== (userProfile as User).email
  );

  const searchedUsers = otherUsers.filter((user) => {
    if (!searchTerm) return true;

    const lowerSearch = searchTerm.toLowerCase();

    return (
      (user.name && user.name.toLowerCase().includes(lowerSearch)) ||
      (user.email && user.email.toLowerCase().includes(lowerSearch))
    );
  });

  const itemsToShow = showAll ? searchedUsers : searchedUsers.slice(0, show);

  useEffect(() => {
    if (searchTerm && searchTerm.length) {
      setShowAll(true);
    }
  }, [searchTerm, searchTerm?.length, showAll]);

  return (
    <>
      {fetchingAllUsers ? (
        <UsersSkeleton />
      ) : (
        <div
          className={clsx(
            "flex flex-col items-start p-4 rounded-xl h-auto gap-2",
            flatten
              ? "w-full"
              : "border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-dark3/50"
          )}
        >
          <h1 className="text-[20px] font-calSans font-[600] text-main dark:text-primary mb-2">
            {title}
          </h1>

          {itemsToShow.map((user: User) => (
            <div
              key={user.id}
              className="flex flex-col items-start gap-2 w-full hover:bg-primaryHover/50 dark:hover:bg-main/20 cursor-pointer p-2 rounded-md"
            >
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <img
                    src={user.picture}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col leading-4 justify-center">
                    <div className="flex items-center gap-2">
                      <h1 className="font-bold text-main dark:text-primary/80 text-[15px]">
                        {user.name}
                      </h1>
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
                      @{user.email.split("@")[0]}
                    </p>
                  </div>
                </div>

                <button className="bg-main dark:bg-main/50 hover:bg-primary dark:hover:bg-main/50 text-white dark:text-primary font-semibold px-5 py-1.5 text-[13px] rounded-full transition-all duration-300 ease-in-out cursor-not-allowed">
                  Follow
                </button>
              </div>

              {!minify && (
                <p className="pl-12 text-main dark:text-gray-300">
                  Software Developer. Building the future, one app at a time.
                </p>
              )}
            </div>
          ))}

          {allUsers.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-2 text-sm font-semibold text-primary hover:text-main dark:hover:text-gray-300 transition-colors duration-300 ease-in-out"
            >
              {showAll ? "Show Less" : "See More"}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Users;
