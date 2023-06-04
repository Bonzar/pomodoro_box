import type { RefObject } from "react";
import { useEffect } from "react";

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  onOutsideClick?: (event: MouseEvent) => void
) =>
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        onOutsideClick?.(event);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onOutsideClick, ref]);
