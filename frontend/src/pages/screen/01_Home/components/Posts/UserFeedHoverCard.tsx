import { useNavigate } from "react-router-dom";
import { UserTypeIcon } from "@/components";
import helperService from "@/services/helper.service";
import clsx from "clsx";

type Props = {
  image: string;
  name: string;
  username: string;
  userType: string;
  status?: string;
  followers: number;
  following: number;
};

const UserHoverCard = ({
  image,
  name,
  username,
  userType,
  status,
  followers,
  following,
}: Props) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/${username.split("@")[0]}`, {
      state: {
        name,
        email: username,
      },
    });
  };

  return (
    <div className="absolute z-50 p-4 w-[300px] rounded-xl bg-white dark:bg-backgroundDark border dark:border-gray-600 top-12 left-0 shadow-[0_0_0px_#ab9ff2,_0_0_10px_#ab9ff2]">
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleViewProfile();
        }}
        className="flex items-center gap-3"
      >
        <img
          src={image}
          className="w-12 h-12 rounded-full object-cover"
          alt="User"
        />
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-main dark:text-white hover:underline">
              {name}
            </p>
            <span
              className={clsx(
                "rounded-full p-1",
                helperService.getUserTypeBg(userType)
              )}
            >
              <UserTypeIcon userType={userType} size={8} />
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{username.split("@")[0]}
          </p>
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="mt-4 text-sm text-gray-600 dark:text-gray-300"
      >
        {status}
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="mt-4 flex justify-start gap-5 text-sm dark:text-gray-400"
      >
        <span>
          <strong>{following}</strong> Following
        </span>
        <span>
          <strong>{followers}</strong> Followers
        </span>
      </div>
      <div>
        {/* Followed by: section where these are mutuals */}
      </div>
      <button
        disabled
        className="cursor-not-allowed mt-3 w-full py-2 text-sm bg-main dark:bg-primary text-white dark:text-main rounded-full hover:bg-opacity-80 dark:hover:bg-opacity-50 transition font-calSans"
      >
        Follow
      </button>
    </div>
  );
};

export default UserHoverCard;
