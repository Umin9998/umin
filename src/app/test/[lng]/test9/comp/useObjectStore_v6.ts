import { create } from "zustand";
import * as THREE from "three";
import { use } from "react";

interface IObjectInfo {
  animations?: any[];
  castShadow?: boolean;
  children?: any[];
  frustumCulled?: boolean;
  geometry?: any;
  isMesh?: boolean;
  isObject3D?: boolean;
  layers?: THREE.Layers;
  material?: THREE.Material;
  matrix?: THREE.Matrix4;
  matrixAutoUpdate?: boolean;
  matrixWorld?: THREE.Matrix4;
  matrixWorldAutoUpdate?: boolean;
  matrixWorldNeedsUpdate?: boolean;
  name?: string;
  parent?: THREE.Object3D | null;
  position?: THREE.Vector3;
  quaternion?: THREE.Quaternion;
  receiveShadow?: boolean;
  renderOrder?: number;
  rotation?: THREE.Euler;
  scale?: THREE.Vector3;
  type?: string;
  up?: THREE.Vector3;
  userData?: any;
  uuid?: string;
  visible?: boolean;
  color?: string;
}

// 선택된 오브젝트 및 모드 상태 인터페이스
// interface IObjectStoreState {
//   objects: any | null[];
//   target: any | null;
//   mode: 'translate' | 'rotate' | 'scale';
// }

// // 스토어 액션 인터페이스
// interface IObjectStoreActions {
//   addObject: (object: IObjectInfo) => void;
//   selectObject: (object: IObjectInfo | null) => void;
//   setMode: (mode: 'translate' | 'rotate' | 'scale') => void;
// }

// 오브젝트 정보와 선택된 오브젝트 상태를 포함하는 스토어 생성
// const useObjectStore = create<IObjectStoreState>((set) => ({
//   objects: [],
//   target: null,
//   mode: 'translate'
// }));

// // 액션 정의
// const actions: IObjectStoreActions = {
//   addObject: (object: any) => {
//     useObjectStore.setState((state) => ({
//       objects: { ...state.objects, object }
//     }));
//   },
//   // 오브젝트 선택 액션
//   selectObject: (object) => {
//     console.log(object);
//   },
//   // 모드 설정 액션
//   setMode: (mode) => {
//     console.log(mode, 'mode');
//   }
// };
// // 객체 추가 및 선택, 모드 설정 액션을 포함하는 스토어 반환
// const useObjectStoreWithActions = () => ({ ...useObjectStore.getState(), ...actions });
interface IThreeMeshStore {
  objects: THREE.Object3D[];
  target: THREE.Object3D | null;
  mode: "translate" | "rotate" | "scale";
  addObject: (object: THREE.Object3D) => void;
  selectObject: (object: THREE.Object3D | null) => void;
  setMode: (mode: "translate" | "rotate" | "scale") => void;
  updateObject: (object: THREE.Object3D) => void;
  clearObjects: () => void;
}

export const useObjectStore_v6 = create<IThreeMeshStore>((set, get) => ({
  objects: [],
  target: null,
  mode: "translate",
  addObject: (object: THREE.Object3D) => {
    console.log(...get().objects);

    if (object != null) {
      set({ objects: [...get().objects, object] });
    }
  },
  selectObject: (object) => {
    set((state) => ({
      ...state,
      target: object,
    }));
  },
  updateObject: (object) => {
    set((state) => ({
      ...state,
      objects: state.objects.map((o) => (o.uuid === object.uuid ? object : o)),
    }));
  },
  setMode: (mode) => {
    set({ mode });
  },
  clearObjects: () => {
    set({ objects: [] });
  },
}));

export default useObjectStore_v6;
