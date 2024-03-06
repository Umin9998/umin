import { create } from "zustand";

interface IUserInfo {
  displayName: string;
  setDisplayName: (newValue: string) => void;
}

const useUserInfoStore = create<IUserInfo>((set) => ({
  displayName: "",
  setDisplayName: (newValue) => set({ displayName: newValue }),
}));

export default useUserInfoStore;
