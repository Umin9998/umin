import { create } from "zustand";

interface IObjectInfo2 {
  target: any;
  setTarget: (target: any) => void;
}
const useObjectStore2 = create<IObjectInfo2>((set) => ({
  target: null,
  setTarget: (target: any) => set({ target }),
}));

export default useObjectStore2;
