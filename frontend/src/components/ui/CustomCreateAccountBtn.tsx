import { useState, useCallback } from "react";
import { useUser } from "@civic/auth/react";
import { useNavigate } from "react-router-dom";
import { configKeys } from "@/config";
import UseScreenSize from "@/hooks/UseScreenSize";
import { showToastSuccess, showToastError } from "@/utils/notification.utils";
import { CustomSpinner } from "@/components";
import axios from "axios";
import storageService from "@/services/storage.service";

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
  const navigate = useNavigate();
  const { signIn } = useUser();
  const { md } = UseScreenSize();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateAccount = useCallback(async () => {
    setLoading(true);

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

        const api = `${configKeys.apiURL}/auth/create-account`;
        const res = await axios.post(api, payload);
        const resData = res.data;

        const { message, app_token, data } = resData;

        if (res?.status === 201) {
          storageService.setToken(app_token);
          storageService.setUser(data);

          showToastSuccess(
            message,
            md ? "top-center" : "bottom-right",
            5000,
            true
          );

          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Create Account Error:", error);

      const axiosError = error as import("axios").AxiosError<{
        message: string;
      }>;

      localStorage.clear();
      sessionStorage.clear();

      showToastError(
        axiosError?.response?.data?.message || "Uh-oh! GratiFi’s feeling shy. Retry?"
      );
    } finally {
      setLoading(false);
    }
  }, [md, navigate, selectedProfile, signIn]);

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={handleCreateAccount}
    >
      {loading ? <CustomSpinner theme="#3c315b" /> : children}
    </button>
  );
}
