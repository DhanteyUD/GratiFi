import { FaMapPin } from "react-icons/fa";
import { VscCalendar } from "react-icons/vsc";
import { UserTypeIcon } from "@/components";
import { UseAppContext } from "@/hooks/UseAppContext";
import type { User } from "@/types";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";
import placeholderImage from "@/assets/image/header-placeholder.jpg";
import clsx from "clsx";
import helperService from "@/services/helper.service";
import moment from "moment";

type ProfileProp = {
  loading: boolean;
  data: User;
};

const ProfileHeader = ({ loading, data }: ProfileProp) => {
  const { user } = UseAppContext();

  if (loading) {
    return <ProfileHeaderSkeleton />;
  }

  return (
    <div className="w-full mx-auto">
      <div className="h-48 bg-gray-300 dark:bg-gray-600 relative">
        <img
          src={placeholderImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <img
          src={data.picture}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white dark:border-dark3 absolute -bottom-12 left-4"
        />

        <button
          disabled
          className="cursor-not-allowed absolute right-5 -bottom-14 px-5 py-2 font-calSans text-main dark:text-primary hover:bg-main hover:text-primary border border-primary hover:border-main rounded-full text-sm font-medium transition-colors duration-300"
        >
          {user?.app_user?.email === data?.email ? "Edit Profile" : "Follow"}
        </button>
      </div>

      <div className="mt-12 p-4">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-main dark:text-primary">
                {data.name}
              </h1>
              <span
                className={clsx(
                  "rounded-full p-1",
                  helperService.getUserTypeBg(data.user_type)
                )}
              >
                <UserTypeIcon userType={data.user_type} size={8} />
              </span>
            </div>
            <p className="text-gray-500 text-main/70 dark:text-primary/70">
              @{data ? data?.email?.split("@")[0] : ""}
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm text-main dark:text-gray-300">
          Software Developer. Building the future, one app at a time.
        </p>
        <div className="flex text-sm text-gray-500 gap-4 mt-2">
          <span className="flex gap-1 items-center">
            <FaMapPin />
            <p>Abuja, Nigeria</p>
          </span>
          <span className="flex gap-1 items-center">
            <VscCalendar />
            <span className="flex items-center gap-1">
              <p>Joined</p>
              <p>{moment(data?.createdAt).format("MMMM YYYY")}</p>
            </span>
          </span>
        </div>
        <div className="flex gap-4 text-sm mt-2 dark:text-gray-400">
          <span>
            <strong>0</strong> Following
          </span>
          <span>
            <strong>0</strong> Followers
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
