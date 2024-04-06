interface IToolbarData {
  id: number;
  title: string;
  icon?: string;
  color?: string;
  mode: 'translate' | 'rotate' | 'scale' | undefined;
  position: { x: number; y: number; z: number };
}

interface IToolbarData2 {
  position_x: { value: number; min: number; max: number; step: number };
  position_y: { value: number; min: number; max: number; step: number };
  position_z: { value: number; min: number; max: number; step: number };
  rotation_x: { value: number; min: number; max: number; step: number };
  rotation_y: { value: number; min: number; max: number; step: number };
  rotation_z: { value: number; min: number; max: number; step: number };
  scale_x: { value: number; min: number; max: number; step: number };
  scale_y: { value: number; min: number; max: number; step: number };
  scale_z: { value: number; min: number; max: number; step: number };
  visible: boolean;
  wireframe: boolean;
  color: { value: string };
}
export const ToolbarData: IToolbarData[] = [
  {
    id: 1,
    title: 'Position',
    mode: 'translate',
    position: { x: 0, y: 0, z: 0 }
  },
  {
    id: 2,
    title: 'Rotate',
    icon: 'rotate',
    mode: 'rotate',
    position: { x: 0, y: 0, z: 0 }
  },
  {
    id: 3,
    title: 'Scale',
    icon: 'scale',
    mode: 'scale',
    position: { x: 0, y: 0, z: 0 }
  }
];

export const ToolbarData2: IToolbarData2 = {
  position_x: { value: 0, min: -5, max: 5, step: 0.01 },
  position_y: { value: 0, min: -5, max: 5, step: 0.01 },
  position_z: { value: 0, min: -5, max: 5, step: 0.01 },
  rotation_x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  rotation_y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  rotation_z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
  scale_x: { value: 1, min: 0, max: 5, step: 0.01 },
  scale_y: { value: 1, min: 0, max: 5, step: 0.01 },
  scale_z: { value: 1, min: 0, max: 5, step: 0.01 },
  visible: true,
  wireframe: false,
  color: { value: 'pink' }
};
