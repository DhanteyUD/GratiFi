import secureLocalStorage from "react-secure-storage";

class StorageService {
  setToken(token: string): void {
    secureLocalStorage.setItem("app_token", token);
  }

  setUser(user: Record<string, unknown>): void {
    secureLocalStorage.setItem("app_user", JSON.stringify(user));
  }

  getToken(token: string): string | null {
    const data = secureLocalStorage.getItem(token);
    return typeof data === "string" ? data : null;
  }

  getUser(user: string): Record<string, unknown> | null {
    const userString = secureLocalStorage.getItem(user);
    const data = typeof userString === "string" ? JSON.parse(userString) : null;
    return data;
  }

  removeToken() {
    localStorage.removeItem("access_token");
    secureLocalStorage.removeItem("app_token");
  }

  removeUser() {
    localStorage.removeItem("user");
    secureLocalStorage.removeItem("app_user");
  }

  clearStorage() {
    secureLocalStorage.clear();
  }
}

export default new StorageService();
