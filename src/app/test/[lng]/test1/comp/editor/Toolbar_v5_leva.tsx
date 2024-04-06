import { useControls } from 'leva';
import useObjectStore_v6 from '../../store/useObjectStore_v6';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
const Toolbar_v5_leva = () => {
  const { target, updateObject } = useObjectStore_v6();
  const [isEditing, setIsEditing] = useState(0);
  const [editedInput, setEditedInput] = useState<{ value: any; path: string } | null>(null);

  const onEditStart = (value: any, path: any, context: any) => {
    setIsEditing((i) => i + 1);
    setEditedInput({ value, path });
  };

  const onEditEnd = () => {
    setIsEditing((i) => i - 1);
  };

  const [testPositionx, setTestPositionx] = useState<number>(0);
  const [testPositiony, setTestPositiony] = useState<number>(0);
  const [testPositionz, setTestPositionz] = useState<number>(0);
  const [testRotationx, setTestRotationx] = useState<number>(0);
  const [testRotationy, setTestRotationy] = useState<number>(0);
  const [testRotationz, setTestRotationz] = useState<number>(0);
  const [testScalex, setTestScalex] = useState<number>(1);
  const [testScaley, setTestScaley] = useState<number>(1);
  const [testScalez, setTestScalez] = useState<number>(1);
  const [testColor, setTestColor] = useState<string>('#f00');
  useEffect(() => {
    if (
      target != null &&
      target.position != undefined &&
      target.rotation != undefined &&
      target.scale != undefined &&
      target.color != undefined
    ) {
      console.log(target);
      setTestPositionx(target.position.x);
      setTestPositiony(target.position.y);
      setTestPositionz(target.position.z);
      setTestRotationx(target.rotation.x);
      setTestRotationy(target.rotation.y);
      setTestRotationz(target.rotation.z);
      setTestScalex(target.scale.x);
      setTestScaley(target.scale.y);
      setTestScalez(target.scale.z);
      setTestColor(target.color);
    }
  }, [
    target,
    target?.position?.x,
    target?.position?.y,
    target?.position?.z,
    target?.rotation?.x,
    target?.rotation?.y,
    target?.rotation?.z,
    target?.scale?.x,
    target?.scale?.y,
    target?.scale?.z,
    target?.color
  ]);
  const data = useControls({
    Position: {
      value: [testPositionx, testPositiony, testPositionz],
      onChange: (value) => {
        const newPosition = new THREE.Vector3(value[0], value[1], value[2]);
        const newProps = { ...target, position: newPosition };
        updateObject(newProps);
      },
      onEditStart,
      onEditEnd
    },
    Rotation: {
      value: [testRotationx, testRotationy, testRotationz],
      onChange: (value) => {
        const newRotation = new THREE.Euler(value[0], value[1], value[2]);
        const newProps = { ...target, rotation: newRotation };
        updateObject(newProps);
      },
      onEditStart,
      onEditEnd
    },
    Scale: {
      value: [testScalex, testScaley, testScalez],
      onChange: (value) => {
        const newScale = new THREE.Vector3(value[0], value[1], value[2]);
        const newProps = { ...target, scale: newScale };
        updateObject(newProps);
      },
      onEditStart,
      onEditEnd
    },
    Color: {
      value: testColor,
      onChange: (value) => {
        const newProps = { ...target, color: value };
        updateObject(newProps);
      }
    }
  });
  return <></>;
};

export default Toolbar_v5_leva;
