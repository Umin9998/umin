import { create } from 'zustand';
import * as THREE from 'three';

interface IThreeMesh {
  animations: any[];
  castShadow: boolean;
  children: any[];
  frustumCulled: boolean;
  geometry: any;
  isMesh: boolean;
  isObject3D: boolean;
  layers: THREE.Layers;
  material: THREE.Material;
  matrix: THREE.Matrix4;
  matrixAutoUpdate: boolean;
  matrixWorld: THREE.Matrix4;
  matrixWorldAutoUpdate: boolean;
  matrixWorldNeedsUpdate: boolean;
  name: string;
  parent: THREE.Object3D | null;
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  receiveShadow: boolean;
  renderOrder: number;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  type: string;
  up: THREE.Vector3;
  userData: any;
  uuid: string;
  visible: boolean;
}

interface IThreeObjectData {
  ThreeObjects: IThreeMesh[];
  target: IThreeMesh | null;
}
interface IObjectState {
  data: IThreeObjectData[];
  currentObjectIndex: number;
  addThreeObject: (newThreeObject: IThreeMesh) => void;
  removeThreeObject: (index: number) => void;
  updateThreeObjects: (ThreeObjects: IThreeMesh[]) => void;
  getThreeObjects: () => IThreeMesh[];
}

const useObjectStore = create<IObjectState>((set, get) => ({
  data: [{ ThreeObjects: [], target: null }],

  currentObjectIndex: 0,

  addThreeObject: (newThreeObject: IThreeMesh) => {
    set((state) => ({
      ...state,
      newThreeObject
    }));
  },

  removeThreeObject: (index: number) => {
    const currentObjectIndex = get().currentObjectIndex;

    set((state) => ({
      data: state.data.map((Object, i) => {
        if (i === currentObjectIndex) {
          return {
            ...Object,
            ThreeObjects: Object.ThreeObjects.filter((_, j) => j !== index)
          };
        }
        return Object;
      })
    }));
  },

  updateThreeObjects: (ThreeObjects: IThreeMesh[]) => {
    const currentObjectIndex = get().currentObjectIndex;

    set((state) => ({
      data: state.data.map((Object, index) => {
        if (index === currentObjectIndex) {
          return {
            ...Object,
            ThreeObjects
          };
        }
        return Object;
      })
    }));
  },

  getThreeObjects: () => get().data[get().currentObjectIndex].ThreeObjects
}));

export default useObjectStore;
