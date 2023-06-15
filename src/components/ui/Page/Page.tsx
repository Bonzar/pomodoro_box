import styles from "./page.module.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useLocation, useOutlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigateSwipeContext } from "../../../context/navigateSwipeContext.tsx";

const animationClassnamesMap = {
  enter: styles.pageEnter,
  enterActive: styles.pageEnterActive,
  exit: styles.pageExit,
  exitActive: styles.pageExitActive,
};

export const Page = () => {
  const ref = useRef<HTMLDivElement>(null);
  const currentOutlet = useOutlet();
  const location = useLocation();

  const isNavigateSwipe = useNavigateSwipeContext();

  const [isNoAnimation, setIsNoAnimation] = useState(isNavigateSwipe);

  useEffect(() => {
    setIsNoAnimation(isNavigateSwipe);
  }, [isNavigateSwipe]);

  if (isNoAnimation) {
    return <div ref={ref}>{currentOutlet}</div>;
  }

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        nodeRef={ref}
        timeout={85}
        classNames={animationClassnamesMap}
        unmountOnExit
      >
        <div ref={ref}>{currentOutlet}</div>
      </CSSTransition>
    </SwitchTransition>
  );
};
