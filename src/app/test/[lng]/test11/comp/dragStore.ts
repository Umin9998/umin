import create from "zustand";

// 상태 유형 정의
interface DragState {
  isDragging: boolean;
  dragPosition: { x: number; y: number };
  newPosition: { x: number; y: number; z: number };
  setIsDragging: (isDragging: boolean) => void;
  setDragPosition: (position: { x: number; y: number }) => void;
  setNewPosition: (position: { x: number; y: number; z: number }) => void;
}

// 초기 상태

// Zustand 스토어 생성
// const useDragStore = create<DragState>((set) => ({
//   newPosition: { x: 0, y: 0, z: 0 },
//   dragPosition: { x: 0, y: 0 },
//   isDragging: false,
//   setIsDragging: (isDragging: boolean) => set({ isDragging }),
//   setDragPosition: (position: { x: number; y: number }) =>
//     set({ dragPosition: position }),
//   setNewPosition: (position: { x: number; y: number; z: number }) =>
//     set({ newPosition: position }),
// }));
const useDragStore = create<DragState>((set, get) => ({
  isDragging: false,
  dragPosition: { x: 0, y: 0 },
  newPosition: { x: 0, y: 0, z: 0 },
  setIsDragging: (isDragging: boolean) => set({ isDragging }),
  setDragPosition: (position: { x: number; y: number }) =>
    set({ dragPosition: position }),
  setNewPosition: (position: { x: number; y: number; z: number }) =>
    set({ newPosition: position }),
}));

export default useDragStore;
