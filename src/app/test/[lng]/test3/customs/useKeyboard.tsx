import { useEffect, useRef } from "react";

export default function useKeyboard() {
  const keyMap = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const onDocumentKey = (e: any) => {
      keyMap.current[e.code] = e.type === "keydown";
      console.log(e);
    };
    document.addEventListener("keydown", onDocumentKey);
    document.addEventListener("keyup", onDocumentKey);
    return () => {
      document.removeEventListener("keydown", onDocumentKey);
      document.removeEventListener("keyup", onDocumentKey);
    };
  }, []);

  return keyMap.current;
}
