import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { stopPropagation } from "../../../helpers/react/stopPropagation.ts";
import { Modal } from "../Modal";
import { useIsMounted } from "../../../hooks/useIsMounted.ts";

interface IDropdownButtonProps {
  onClick: (event: React.MouseEvent) => void;
}

interface IDropdownProps {
  className: string;
  button: (props: IDropdownButtonProps) => React.ReactElement;
  children: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Dropdown = ({
  button,
  children,
  onOpen,
  onClose,
  className,
}: IDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted) {
      isDropdownOpen ? onOpen?.() : onClose?.();
    }
  }, [isDropdownOpen, isMounted, onClose, onOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsDropdownOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBtnClick = (e: React.MouseEvent) => {
    if (!isDropdownOpen) {
      const buttonCoors = e.currentTarget.getBoundingClientRect();
      setPosition({
        top: buttonCoors.top + buttonCoors.height + window.scrollY,
        left: buttonCoors.left + buttonCoors.width / 2,
      });
    } else {
      setPosition(null);
    }

    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {button({
        onClick: stopPropagation(handleBtnClick),
      })}
      {isDropdownOpen && (
        <Modal onOutsideClick={stopPropagation(() => setIsDropdownOpen(false))}>
          <div
            onClick={stopPropagation(() => setIsDropdownOpen(false))}
            style={{ ...position, position: "absolute" }}
            className={className}
          >
            {children}
          </div>
        </Modal>
      )}
    </>
  );
};
