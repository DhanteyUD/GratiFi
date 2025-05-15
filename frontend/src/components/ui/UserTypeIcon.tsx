import { Fan, Star } from "lucide-react";

type UserTypeIconProps = {
  userType: string;
  size?: number;
};

const UserTypeIcon = ({ userType, size = 18 }: UserTypeIconProps) => {
  switch (userType) {
    case "GratiFan":
      return <Fan size={size} />;
    case "GratiStar":
      return <Star size={size} />;
    default:
      return null;
  }
};

export default UserTypeIcon;
