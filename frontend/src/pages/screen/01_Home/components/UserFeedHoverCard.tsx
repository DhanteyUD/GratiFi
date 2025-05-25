// import { UserTypeIcon } from "@/components";
// import clsx from "clsx";

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
//   userType,
  status,
  followers,
  following,
}: Props) => {
  return (
    <div className="absolute z-50 p-4 w-64 rounded-xl shadow-xl bg-white dark:bg-main border dark:border-gray-600 top-12 left-10">
      <div className="flex items-center gap-3">
        <img
          src={image}
          className="w-12 h-12 rounded-full object-cover"
          alt="User"
        />
        <div>
          <p className="font-bold text-main dark:text-white">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            @{username}
          </p>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {status}
      </div>
      <div className="mt-3 flex justify-between text-sm">
        <span>
          <strong>{followers}</strong> Followers
        </span>
        <span>
          <strong>{following}</strong> Following
        </span>
      </div>
      <button className="mt-3 w-full py-1 text-sm bg-main dark:bg-primary text-white rounded-full hover:bg-opacity-80 transition">
        Follow
      </button>
    </div>
  );
};

export default UserHoverCard;
