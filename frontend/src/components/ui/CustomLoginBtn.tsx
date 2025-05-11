import { useState, useCallback } from "react";
import { useUser } from "@civic/auth/react";
import { useNavigate } from "react-router-dom";
import { configKeys } from "@/config";
import { showToastSuccess, showToastError } from "@/utils/notification.utils";
import { CustomSpinner } from "@/components";
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
  const { signIn, user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = useCallback(async () => {
    setLoading(true);

    try {
      await signIn();

      const civicUser = JSON.parse(localStorage.getItem("user") || "{}");

      if (civicUser) {
        const payload = {
          email: civicUser.email,
        };

        const api = `${configKeys.apiURL}/login`;
        const res = await axios.post(api, payload);
        const resData = res.data;

        const { message, app_token, data } = resData;

        if (res?.status === 200) {
          storageService.setToken(app_token);
          storageService.setUser(data);

          showToastSuccess(message, "top-right", 5000, true);

          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);

      const axiosError = error as import("axios").AxiosError<{
        message: string;
      }>;

      showToastError(
        axiosError?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [navigate, signIn]);

  return (
    <>
      {!user && (
        <button disabled={loading} className={className} onClick={handleLogin}>
          {loading ? <CustomSpinner theme="#3c315b" /> : children}
        </button>
      )}
    </>
  );
}
