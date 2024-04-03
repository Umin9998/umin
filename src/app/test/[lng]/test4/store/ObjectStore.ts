import { create } from "zustand";

interface IObjectInfo {
  state: {
    current: any;
    mode: "translate" | "rotate" | "scale" | undefined;

    // position: [number, number, number];
    // rotation: [number, number, number];
    // scale: [number, number, number];
  };
  actions: {
    setCurrent: (current: any | null) => void;
    setMode: (mode: "translate" | "rotate" | "scale" | undefined) => void; // 수정

    // setPosition: (position: [number, number, number]) => void;
    // setRotation: (rotation: [number, number, number]) => void;
    // setScale: (scale: [number, number, number]) => void;
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

    // setPosition: (position) =>
    //   set((state) => ({
    //     state: { ...state.state, position },
    //   })),
    // setRotation: (rotation) =>
    //   set((state) => ({
    //     state: { ...state.state, rotation },
    //   })),
    // setScale: (scale) =>
    //   set((state) => ({
    //     state: { ...state.state, scale },
    //   })),
  },
}));

export default useObjectStore;
