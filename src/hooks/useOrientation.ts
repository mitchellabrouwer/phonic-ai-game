import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

function useOrientation() {
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);

  const debouncedIsLandscape = useDebounce(isLandscape, 500);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkOrientation = () => window.innerWidth > window.innerHeight;

      setIsLandscape(checkOrientation());

      const handleResize = () => {
        setIsLandscape(checkOrientation());
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return debouncedIsLandscape;
}

export default useOrientation;
