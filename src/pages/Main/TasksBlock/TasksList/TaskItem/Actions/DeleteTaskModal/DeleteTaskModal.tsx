import styles from "./deleteTaskModal.module.css";
import { Modal } from "../../../../../../../components/ui/Modal";
import { Icon } from "../../../../../../../components/ui/Icon/Icon.tsx";
import { TextEl } from "../../../../../../../components/ui/TextEl";
import { Indent } from "../../../../../../../components/ui/Indent";
import { Button } from "../../../../../../../components/ui/Button";
import { useAppDispatch } from "../../../../../../../store/hooks.ts";
import { deleteTaskThank } from "../../../../../../../store/deleteTaskThank.ts";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

interface IDeleteTaskModalProps {
  id: string | number;
  onClose: VoidFunction;
  isOpen: boolean;
}

export const DeleteTaskModal = ({
  id,
  onClose,
  isOpen,
}: IDeleteTaskModalProps) => {
  const dispatch = useAppDispatch();

  const handleConfirmDeleting = () => dispatch(deleteTaskThank({ id }));
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Modal onOutsideClick={onClose}>
      <CSSTransition
        in={isOpen}
        nodeRef={ref}
        timeout={175}
        classNames={{
          enter: styles.deleteModalEnter,
          enterActive: styles.deleteModalEnterActive,
          exit: styles.deleteModalExit,
          exitActive: styles.deleteModalExitActive,
        }}
        unmountOnExit
      >
        <div ref={ref}>
          <div className={styles.modalWrapper} />
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={onClose}>
              <Icon iconName="cross" iconColor="gray-C4" />
            </button>
            <TextEl textSize={24} textLineHeight={33}>
              Удалить задачу?
            </TextEl>
            <Indent size={25} />
            <Button
              btnColor="red"
              btnFilled
              onClick={() => {
                handleConfirmDeleting();
                onClose();
              }}
            >
              Удалить
            </Button>
            <Indent size={10} />
            <button>
              <TextEl
                textWeight={300}
                textLineHeight={24}
                className={styles.cancelBtn}
                onClick={onClose}
              >
                Отмена
              </TextEl>
            </button>
          </div>
        </div>
      </CSSTransition>
    </Modal>
  );
};
