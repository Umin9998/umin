import { create } from "zustand";

interface IObjectInfo {
  state: {
    current: any;
    mode: "translate" | "rotate" | "scale" | undefined;
  };
  actions: {
    setCurrent: (current: any | null) => void;
    setMode: (mode: "translate" | "rotate" | "scale" | undefined) => void; // 수정
  };
}

const useObjectStore = create<IObjectInfo>((set) => ({
  state: {
    current: null,
    mode: "translate",
  },
  actions: {
    setCurrent: (current) =>
      set((state) => ({
        state: { ...state.state, current },
      })),
    setMode: (mode) =>
      set((state) => ({
        state: { ...state.state, mode: mode },
      })),
  },
}));

export default useObjectStore;
