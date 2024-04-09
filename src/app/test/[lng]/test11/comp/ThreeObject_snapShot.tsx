import { useCursor } from "@react-three/drei";
import { filter } from "blockly/core/events/utils";
import { useState } from "react";
import { useSnapshot } from "valtio";

const ThreeObject_snapShot = ({
  state,
  name,
  modes,
  threeSceneRef,
  object,
  ...props
}: any) => {
  const snap = useSnapshot(state);
  // Fetching the GLTF, nodes is a collection of all the meshes
  // It's cached/memoized, it only gets loaded and parsed once

  // Feed hover state into useCursor, which sets document.body.style.cursor to pointer|auto
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  return (
    <>
      <mesh
        // Click sets the mesh as the new target
        onClick={(e) => (e.stopPropagation(), (state.current = name))}
        // If a click happened but this mesh wasn't hit we null out the target,
        // This works because missed pointers fire before the actual hits
        onPointerMissed={(e) => e.type === "click" && (state.current = null)}
        // Right click cycles through the transform modes
        onContextMenu={(e) =>
          snap.current === name &&
          (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
        }
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={(e) => setHovered(false)}
        name={name}
        geometry={object.geometry}
        material={object.material}
        material-color={snap.current === name ? "#ff6080" : "white"}
        {...props}
        dispose={null}
      />
    </>
  );
};

export default ThreeObject_snapShot;
