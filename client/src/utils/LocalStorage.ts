const STORAGE_KEY = "ChatLeap";

class LocalStorage {
  private readStorage = () => {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (storage) {
      return JSON.parse(storage);
    }
    return null;
  };

  private readValue = (key: string) => {
    const storage = this.readStorage();
    if (storage) {
      return storage[key];
    }
    return null;
  };

  private writeValue = (key: string, value: string | object) => {
    const storage = this.readStorage();
    if (storage) {
      storage[key] = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ [key]: value }));
    }
  };

  readMode = () => {
    return this.readValue("mode");
  };

  readAccent = () => {
    return this.readValue("accent");
  };

  readToken = () => {
    return this.readValue("token");
  };

  readUser = () => {
    return this.readValue("user");
  };

  writeMode = (mode: string) => {
    this.writeValue("mode", mode);
  };

  writeAccent = (accent: string) => {
    this.writeValue("accent", accent);
  };

  writeToken = (token: string) => {
    this.writeValue("token", token);
  };

  writeUser = (user: {
    id: string;
    userName: string;
    userSurname: string;
    userNick: string;
    photo: string;
  }) => {
    this.writeValue("user", user);
  };

  clearToken = () => {
    this.writeValue("token", "");
  };

  clearUser = () => {
    this.writeValue("user", {});
  };
}

export default LocalStorage;
