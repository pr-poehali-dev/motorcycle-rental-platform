
import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Начальная установка
    checkIfMobile();
    
    // Обработчик изменения размера окна
    function handleResize() {
      checkIfMobile();
    }

    function checkIfMobile() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }

    window.addEventListener("resize", handleResize);
    
    // Очистка
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
