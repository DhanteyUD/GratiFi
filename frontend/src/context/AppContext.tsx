import { useMemo, createContext } from "react";
// import { showToastSuccess } from "../utils/notification.utils.js";
// import { AxiosError } from "axios";
import type { ReactNode } from "react";
// import type { AxiosInstance, AxiosResponse, Method } from "axios";
// import { configKeys } from "@/config/index.js";
// import UseError from "@/hooks/UseError.js";
// import storageService from "../services/storage.service.js";
// import axiosInstances from "../services/api.service.js";
// import axios from "axios";
import moment from "moment";

const AppContext = createContext<AppContextValue | null>(null);

interface Token {
  app_token: string | null;
  access_token: string | null;
}

interface User {
  app_user: string | null;
  user: string | null;
}

// interface CustomAxiosResponse extends Omit<AxiosResponse, "data"> {
//   data: {
//     message?: string | string[];
//   };
// }

// interface CustomError extends AxiosError<unknown, Record<string, unknown>> {
//   response?: CustomAxiosResponse;
// }

interface AppContextValue {
  today: string;
  token: Token;
  user: User;
  [key: string]: unknown;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = (props: AppProviderProps) => {
  const today = useMemo(() => moment.utc().format("YYYY-MM-DD"), []);
  // const token: Token = {
  //   app_token: useMemo(() => storageService.getToken("app_token"), []),
  //   access_token: useMemo(() => localStorage.getToken("access_token"), []),
  // };
  // const user: User = {
  //   app_user: useMemo(() => {
  //     const user = storageService.getUser("app_user");
  //     return user ? JSON.stringify(user) : null;
  //   }, []),
  //   user: useMemo(() => JSON.parse(localStorage.getUser("user")), []),
  // };

  // const handleRequest = async (
  //   instance: AxiosInstance,
  //   method: Method,
  //   url: string,
  //   data: Record<string, unknown> | null = null,
  //   showSuccessToast: boolean = false,
  //   params: Record<string, unknown> | null = null
  // ): Promise<unknown> => {
  //   try {
  //     const config = {
  //       method,
  //       url,
  //       data,
  //       ...(params && { params }),
  //     };

  //     const response = await instance(config);

  //     if (showSuccessToast) {
  //       showToastSuccess(response?.data?.message, "top-center", 2000, true);
  //     }

  //     return response?.data || {};
  //   } catch (error) {
  //     UseError(error as CustomError);
  //     return error;
  //   }
  // };

  // const makeRequest = (
  //   method: Method,
  //   url: string,
  //   data: Record<string, unknown> | null = null,
  //   showSuccessToast: boolean = false,
  //   params: Record<string, unknown> | null = null
  // ) => handleRequest(axios, method, url, data, showSuccessToast, params);

  // const makeAuthRequest = (
  //   method: Method,
  //   url: string,
  //   data: Record<string, unknown> | null = null,
  //   showSuccessToast: boolean = false,
  //   params: Record<string, unknown> | null = null
  // ) =>
  //   handleRequest(axiosInstances, method, url, data, showSuccessToast, params);

  const apiMethods = {};

  return (
    <AppContext.Provider
      value={
        {
          today,
          // token,
          // user,

          ...apiMethods,
        } as AppContextValue
      }
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
