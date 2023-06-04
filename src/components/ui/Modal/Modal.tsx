import type { ReactNode } from "react";
import { useRef } from "react";
import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useIsMounted } from "../../../hooks/useIsMounted.ts";
import { useOutsideClick } from "../../../hooks/useOutsideClick.ts";

interface IModalProps {
  children: ReactNode;
  onOutsideClick?: (event: MouseEvent) => void;
}

export function Modal({ children, onOutsideClick }: IModalProps) {
  const isMounted = useIsMounted();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onOutsideClick);

  if (!isMounted) {
    return null;
  }

  const modalRoot = document.querySelector("#modal-root");
  if (!modalRoot) {
    throw new Error("Не найден элемент #modal-root для создания портала");
  }

  return createPortal(
    <div className={styles.modal} ref={ref}>
      {children}
    </div>,
    modalRoot
  );
}
