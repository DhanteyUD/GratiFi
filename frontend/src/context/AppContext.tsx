import { useMemo, createContext } from "react";
import type { ReactNode } from "react";
import { FetchUserProfile } from "@/hooks/UseFetch.js";
import storageService from "../services/storage.service.js";
import moment from "moment";

const AppContext = createContext<AppContextValue | null>(null);

interface Token {
  app_token: string | null;
  access_token: string | null;
}

interface User {
  app_user: {
    id: string;
    name: string;
    email: string;
    picture: string;
    user_type: string;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    name: string;
    picture: string;
    email: string;
    at_hash: string;
    sid: string;
    jti: string;
    id: string;
    forwardedTokens: null;
  };
}

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
  const token: Token = {
    app_token: useMemo(() => storageService.getToken("app_token"), []),
    access_token: useMemo(() => localStorage.getItem("access_token"), []),
  };
  const user: User = {
    app_user: useMemo(
      () =>
        JSON.parse(JSON.stringify(storageService.getUser("app_user") ?? "{}")),
      []
    ),
    user: useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []),
  };
  const { fetchingUserProfile, userProfile } = FetchUserProfile();

  return (
    <AppContext.Provider
      value={
        {
          today,
          token,
          user,
          fetchingUserProfile,
          userProfile,
        } as AppContextValue
      }
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
