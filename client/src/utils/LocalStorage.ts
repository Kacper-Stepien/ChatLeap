import { read } from "fs";

class LocalStorage {
  readStorage = () => {
    const storage = localStorage.getItem("ChatLeap");
    if (storage) {
      return JSON.parse(storage);
    }
    return null;
  };
  readMode = () => {
    const storage = this.readStorage();
    if (storage) {
      return storage.mode;
    }
    return null;
  };
  readAccent = () => {
    const storage = this.readStorage();
    if (storage) {
      return storage.accent;
    }
    return null;
  };
  readToken = () => {
    const storage = this.readStorage();
    if (storage) {
      return storage.token;
    }
    return null;
  };
  writeMode = (mode: string) => {
    const storage = this.readStorage();
    if (storage) {
      storage.mode = mode;
      storage.theme = `${mode}${storage.accent}`;
      localStorage.setItem("ChatLeap", JSON.stringify(storage));
    } else {
      localStorage.setItem("ChatLeap", JSON.stringify({ mode: mode }));
    }
  };
  writeAccent = (accent: string) => {
    const storage = this.readStorage();
    if (storage) {
      storage.accent = accent;
      storage.theme = `${storage.mode}${accent}`;
      localStorage.setItem("ChatLeap", JSON.stringify(storage));
    } else {
      localStorage.setItem("ChatLeap", JSON.stringify({ accent: accent }));
    }
  };
  writeToken = (token: string) => {
    const storage = this.readStorage();
    if (storage) {
      storage.token = token;
      localStorage.setItem("ChatLeap", JSON.stringify(storage));
    } else {
      localStorage.setItem("ChatLeap", JSON.stringify({ token: token }));
    }
  };
}

export default LocalStorage;
