import { useUser } from "@civic/auth/react";
import { useCallback } from "react";
import storageService from "@/services/storage.service";
// import { configKeys } from "@/config";
// import { useNavigate } from "react-router-dom";
// import { showToastSuccess } from "@/utils/notification.utils";
// import axios from "axios";

export default function CustomCreateAccountBtn({
  disabled,
  selectedProfile,
  className,
  children,
}: {
  disabled?: boolean;
  selectedProfile?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  //   const navigate = useNavigate();
  const { signIn, user } = useUser();

  const handleCreateAccount = useCallback(async () => {
    try {
      await signIn();

      const createdUser = storageService.getUser();

      if (user) {
        const payload = {
          user_type: selectedProfile,
        };

        console.log("create this user", { createdUser, ...payload });

        // const api = `${configKeys.apiURL}/api/create-account`;
        // const res = await axios.post(api, payload);
        // const resData = res?.data;

        // const { access_token, data: user_data } = resData;

        // if (res?.status === 200) {
        //   storageService.setToken(access_token);
        //   storageService.setUser(user_data);

        //   showToastSuccess(
        //     "Welcome back! You've successfully logged in",
        //     "top-right",
        //     2000,
        //     true
        //   );

        //   const profilePath = (selectedProfile ?? "")
        //     .toLowerCase()
        //     .replace(" ", "-");
        //   navigate(`/dashboard/${profilePath}`);
        // }
      }
    } catch (error) {
      console.error("Create Account Error:", error);
    }
  }, [selectedProfile, signIn, user]);

  return (
    <>
      {!user && (
        <button
          disabled={disabled}
          className={className}
          onClick={handleCreateAccount}
        >
          {children}
        </button>
      )}
    </>
  );
}
