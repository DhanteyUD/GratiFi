import storageService from "./storage.service";

export function auth() {
  const app_user = storageService.getUser("app_user");
  const app_token = storageService.getToken("app_token");
  return app_user && app_token ? true : false;
}
