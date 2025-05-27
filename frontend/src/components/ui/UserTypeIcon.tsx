import { Fan, Star } from "lucide-react";

type UserTypeIconProps = {
  userType: string;
  size?: number;
};

const UserTypeIcon = ({ userType, size = 18 }: UserTypeIconProps) => {
  switch (userType) {
    case "GratiFan":
      return <Fan size={size} className="text-main" />;
    case "GratiStar":
      return <Star size={size} className="text-main" />;
    default:
      return null;
  }
};

export default UserTypeIcon;
