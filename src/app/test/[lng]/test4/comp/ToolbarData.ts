interface IToolbarData {
  id: number;
  title: string;
  icon?: string;
  color?: string;
  mode: "translate" | "rotate" | "scale" | undefined;
  position: { x: number; y: number; z: number };
}
export const ToolbarData: IToolbarData[] = [
  {
    id: 1,
    title: "Position",
    mode: "translate",
    position: { x: 0, y: 0, z: 0 },
  },
  {
    id: 2,
    title: "Rotate",
    icon: "rotate",
    mode: "rotate",
    position: { x: 0, y: 0, z: 0 },
  },
  {
    id: 3,
    title: "Scale",
    icon: "scale",
    mode: "scale",
    position: { x: 0, y: 0, z: 0 },
  },
];
