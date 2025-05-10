import secureLocalStorage from "react-secure-storage";

class StorageService {
  setToken(token: string): void {
    secureLocalStorage.setItem("token", token);
  }

  setUser(user: Record<string, unknown>): void {
    secureLocalStorage.setItem("user", JSON.stringify(user));
  }

  getToken() {
    const token = secureLocalStorage.getItem("token");
    return token;
  }

  getUser() {
    const userString = secureLocalStorage.getItem("user");
    const user = typeof userString === "string" ? JSON.parse(userString) : null;
    return user;
  }

  removeToken() {
    secureLocalStorage.removeItem("token");
  }

  removeUser() {
    secureLocalStorage.removeItem("user");
  }

  clearStorage() {
    secureLocalStorage.clear();
  }
}

export default new StorageService();
