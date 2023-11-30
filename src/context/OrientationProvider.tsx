"use-clent";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useDebounce from "../hooks/useDebounce";
import { Orientation } from "../types/types";

const OrientationContext = createContext<Orientation | null>(null);

interface OrientationProviderProps {
  children: ReactNode;
}

const checkOrientation = () =>
  window.innerWidth > window.innerHeight ? "landscape" : "portrait";

export function OrientationProvider({ children }: OrientationProviderProps) {
  const [orientation, setOrientation] = useState<Orientation | null>(null);

  const debouncedOrientation = useDebounce(orientation, 500);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setOrientation(checkOrientation());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <OrientationContext.Provider value={debouncedOrientation}>
      {children}
    </OrientationContext.Provider>
  );
}

export const useOrientation = () => useContext(OrientationContext);
