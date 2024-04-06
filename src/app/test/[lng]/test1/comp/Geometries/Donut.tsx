import { useState, useEffect, useRef, forwardRef, use } from 'react';

import { useCursor } from '@react-three/drei';

import useObjectStore_v6 from '../../store/useObjectStore_v6';

const Donut = forwardRef((props: any, ref: any) => {
  const [modeIndex, setModeIndex] = useState(1);
  const { selectObject, setMode } = useObjectStore_v6(); // useObjectStoresWithActions 훅 사용
  const [hovered, setHover] = useState(false);

  const handleClick = () => {
    const nextMode = modeIndex >= 3 ? 1 : modeIndex + 1;
    setModeIndex(nextMode);
  };
  useEffect(() => {
    if (modeIndex === 1) {
      setMode('translate');
    } else if (modeIndex === 2) {
      setMode('rotate');
    } else if (modeIndex === 3) {
      setMode('scale');
    }
  }, [modeIndex]);
  useCursor(hovered);

  return (
    <mesh
      onContextMenu={() => {
        handleClick();
      }}
      ref={ref}
      {...props}
      onClick={(e) => {
        ref.current = e.object;
        selectObject(ref.current);
      }}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={(e) => setHover(false)}
      dispose={null}
      castShadow>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial {...props} />
    </mesh>
  );
});
Donut.displayName = 'Donut';
export default Donut;
