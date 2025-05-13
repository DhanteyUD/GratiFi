import { useState, useCallback } from "react";
import { configKeys } from "@/config";
import { useQueryClient } from "@tanstack/react-query";
import { showToastSuccess, showToastError } from "@/utils/notification.utils";
import { CustomSpinner } from "@/components";
import UseScreenSize from "@/hooks/UseScreenSize";
import axios from "axios";
import storageService from "@/services/storage.service";

export default function CustomCreateAccountBtn({
  disabled,
  selectedProfile,
  className,
  setIsModalOpen,
  children,
}: {
  disabled?: boolean;
  selectedProfile?: string;
  className?: string;
  setIsModalOpen?: (value: boolean) => void;
  children?: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const { md } = UseScreenSize();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateProfile = useCallback(async () => {
    setLoading(true);

    try {
      const civicUser = JSON.parse(localStorage.getItem("user") || "{}");

      if (civicUser) {
        const payload = {
          name: civicUser.name,
          email: civicUser.email,
          picture: civicUser.picture,
          user_type: selectedProfile,
        };

        const api = `${configKeys.apiURL}/create-account`;
        const res = await axios.post(api, payload);
        const resData = res.data;

        const { app_token, data } = resData;

        if (res?.status === 201) {
          storageService.setToken(app_token);
          storageService.setUser(data);

          showToastSuccess(
            "Profile created successfully!",
            md ? "top-center" : "bottom-right",
            5000,
            true
          );

          if (setIsModalOpen) {
            setIsModalOpen(false);
          }
        }
      }
    } catch (error) {
      console.error("Create Profile Error:", error);

      const axiosError = error as import("axios").AxiosError<{
        message: string;
      }>;

      localStorage.clear();
      sessionStorage.clear();

      showToastError(
        axiosError?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    }
  }, [md, queryClient, selectedProfile, setIsModalOpen]);

  return (
    <button
      disabled={disabled}
      className={className}
      onClick={handleCreateProfile}
    >
      {loading ? <CustomSpinner theme="#3c315b" /> : children}
    </button>
  );
}
