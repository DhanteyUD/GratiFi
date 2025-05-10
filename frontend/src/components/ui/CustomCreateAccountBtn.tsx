import { useUser } from "@civic/auth/react";
import { useCallback } from "react";
// import { configKeys } from "@/config";
// import { useNavigate } from "react-router-dom";
// import { showToastSuccess } from "@/utils/notification.utils";
// import axios from "axios";
// import storageService from "@/services/storage.service";

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

      const civicUser = JSON.parse(localStorage.getItem("user") || "{}");

      if (civicUser) {
        const payload = {
          name: civicUser.name,
          email: civicUser.email,
          picture: civicUser.picture,
          user_type: selectedProfile,
        };

        console.log("create this user", { payload });

        // const api = `${configKeys.apiURL}/api/create-account`;
        // const res = await axios.post(api, payload);
        // const resData = res?.data;

        // const { app_token, data: app_user } = resData;

        // if (res?.status === 200) {
        //   storageService.setToken(app_token);
        //   storageService.setUser(app_user);

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
  }, [selectedProfile, signIn]);

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
