import { useState, useCallback } from "react";
import { useUser } from "@civic/auth/react";
import { useNavigate } from "react-router-dom";
import { configKeys } from "@/config";
import { showToastSuccess, showToastError } from "@/utils/notification.utils";
import { CustomSpinner } from "@/components";
import UseScreenSize from "@/hooks/UseScreenSize";
import axios from "axios";
import storageService from "@/services/storage.service";

export default function CustomLoginBtn({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { signIn } = useUser();
  const { md } = UseScreenSize();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = useCallback(async () => {
    setLoading(true);

    try {
      await signIn();

      const civicUser = JSON.parse(localStorage.getItem("user") || "{}");

      if (civicUser) {
        const payload = {
          name: civicUser.name,
          email: civicUser.email,
          picture: civicUser.picture,
          user_type: "",
        };

        const api = `${configKeys.apiURL}/auth/login`;
        const res = await axios.post(api, payload);
        const resData = res.data;

        const { message, app_token, data } = resData;

        const acceptedStatus = [200, 201, 202];

        if (acceptedStatus.includes(res?.status)) {
          storageService.setToken(app_token);
          storageService.setUser(data);

          showToastSuccess(
            message,
            md ? "top-center" : "bottom-right",
            5000,
            true
          );
        }
      }
    } catch (error) {
      console.error("Login Error:", error);

      const axiosError = error as import("axios").AxiosError<{
        message: string;
      }>;

      showToastError(
        axiosError?.response?.data?.message || "Yikes! GratiFi glitched. One more time?"
      );
    } finally {
      setLoading(false);
      navigate("/home");
    }
  }, [md, navigate, signIn]);

  return (
    <button disabled={loading} className={className} onClick={handleLogin}>
      {loading ? <CustomSpinner theme="#3c315b" /> : children}
    </button>
  );
}
