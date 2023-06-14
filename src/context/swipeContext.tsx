import type { PropsWithChildren, RefObject } from "react";
import { createContext, useContext, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { useLocation } from "react-router-dom";

const swipeContext = createContext<RefObject<boolean> | null>(null);

export const SwipeProvider = ({ children }: PropsWithChildren) => {
  const isSwipingStarted = useRef(false);

  const resetSwipingState = () => (isSwipingStarted.current = false);

  const swipeHandlers = useSwipeable({
    onSwipeStart: () => {
      isSwipingStarted.current = true;
    },
    onSwiped: () => {
      setTimeout(resetSwipingState, 10);
    },
  });

  const location = useLocation();

  useEffect(() => {
    resetSwipingState();
  }, [location.pathname]);

  return (
    <div {...swipeHandlers}>
      <swipeContext.Provider value={isSwipingStarted}>
        {children}
      </swipeContext.Provider>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSwipeContext = () => {
  const swipe = useContext(swipeContext);

  if (swipe === null) {
    throw new Error("Can't use `useSwipeContext` outside of `SwipeProvider`");
  }

  return swipe.current;
};
