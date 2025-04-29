import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const SMALL_DESKTOP_BREAKPOINT = 1360;

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<
    "mobile" | "desktop" | "largeDesktop"
  >("mobile");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        setScreenSize("mobile");
      } else if (window.innerWidth < SMALL_DESKTOP_BREAKPOINT) {
        setScreenSize("desktop");
      } else {
        setScreenSize("largeDesktop");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
