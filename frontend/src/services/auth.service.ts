import storageService from "./storage.service";

export function auth() {
  const user = storageService.getUser();
  const token = storageService.getToken();
  return user && token ? true : false;
}
