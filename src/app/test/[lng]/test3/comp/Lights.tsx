import { Canvas } from "@react-three/fiber";
import Polyhedron from "./Polyhedron";
import * as THREE from "three";
import { Stats, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";

const Lights = () => {
  const ambientRef = useRef() as any;
  const directionalRef = useRef() as any;
  const pointRef = useRef() as any;
  const spotRef = useRef() as any;
  // useControls("Ambient Light", {
  //   visible: {
  //     value: false,
  //     onChange: (v) => {
  //       ambientRef.current.visible = v;
  //     },
  //   },
  //   color: {
  //     value: "white",
  //     onChange: (v) => {
  //       ambientRef.current.color = new THREE.Color(v);
  //     },
  //   },
  // });

  // useControls("Directional Light", {
  //   visible: {
  //     value: true,
  //     onChange: (v) => {
  //       directionalRef.current.visible = v;
  //     },
  //   },
  //   position: {
  //     value: { x: 1, y: 1, z: 1 },
  //     onChange: (v) => {
  //       directionalRef.current.position.copy(v);
  //     },
  //   },
  //   color: {
  //     value: "white",
  //     onChange: (v) => {
  //       directionalRef.current.color = new THREE.Color(v);
  //     },
  //   },
  // });

  // useControls("Point Light", {
  //   visible: {
  //     value: false,
  //     onChange: (v) => {
  //       pointRef.current.visible = v;
  //     },
  //   },
  //   position: {
  //     value: { x: 2, y: 0, z: 0 },
  //     onChange: (v) => {
  //       pointRef.current.position.copy(v);
  //     },
  //   },
  //   color: {
  //     value: "white",
  //     onChange: (v) => {
  //       pointRef.current.color = new THREE.Color(v);
  //     },
  //   },
  // });
  // useControls("Spot Light", {
  //   visible: {
  //     value: false,
  //     onChange: (v) => {
  //       spotRef.current.visible = v;
  //     },
  //   },
  //   position: {
  //     value: { x: 3, y: 2.5, z: 1 },

  //     onChange: (v) => {
  //       spotRef.current.position.copy(v);
  //     },
  //   },
  //   color: {
  //     value: "white",
  //     onChange: (v) => {
  //       spotRef.current.color = new THREE.Color(v);
  //     },
  //   },
  // });
  const ambientCtl = useControls("Ambient Light", {
    visible: false,
    intensity: {
      value: 1.0,
      min: 0,
      max: 1.0,
      step: 0.1,
    },
  });

  const directionalCtl = useControls("Directional Light", {
    visible: true,
    position: {
      x: 3.3,
      y: 1.0,
      z: 4.4,
    },
    castShadow: true,
  });

  const pointCtl = useControls("Point Light", {
    visible: false,
    position: {
      x: 2,
      y: 0,
      z: 0,
    },
    castShadow: true,
  });

  const spotCtl = useControls("Spot Light", {
    visible: false,
    position: {
      x: 3,
      y: 2.5,
      z: 1,
    },
    castShadow: true,
  });
  return (
    <>
      {" "}
      <ambientLight
        visible={ambientCtl.visible}
        intensity={ambientCtl.intensity}
      />
      <directionalLight
        visible={directionalCtl.visible}
        position={[
          directionalCtl.position.x,
          directionalCtl.position.y,
          directionalCtl.position.z,
        ]}
        castShadow={directionalCtl.castShadow}
      />
      <pointLight
        visible={pointCtl.visible}
        position={[
          pointCtl.position.x,
          pointCtl.position.y,
          pointCtl.position.z,
        ]}
        castShadow={pointCtl.castShadow}
      />
      <spotLight
        visible={spotCtl.visible}
        position={[spotCtl.position.x, spotCtl.position.y, spotCtl.position.z]}
        castShadow={spotCtl.castShadow}
      />
    </>
  );
};

export default Lights;
